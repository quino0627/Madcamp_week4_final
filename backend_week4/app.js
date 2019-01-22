//Load packages
var express = require('express');
var http = require('http');
var cors = require('cors');

var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const publicRoot = "../frontend/"
app.use(express.static(publicRoot))

var server = http.createServer(app);
var io = require('socket.io').listen(server);

const JSON = require('circular-json');
var router = express.Router();



//Configure app to use bodyParser
app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // for parsing application/x-www-form-urlencoded

var corsOptions = {
    origin: 'http://143.248.36.137:3000',
    optionsSuccessStatus: 200,
    credentials:true,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin':true
}

app.use(cors(corsOptions));


/* configure CORS issue */
app.use((req, res, next) => {
    const whiteList = [
        'localhost',
        'ssal.sparcs.org',
        'http://143.248.36.137:3000',
        'http://143.248.36.102:3000'
    ];
    const origin = req.header['origin'];
    whiteList.every(el => {
        if (!origin) return false;
        if (origin.indexOf(el) !== -1) {
            res.set('Access-Control-Allow-Origin', origin);
            return false;
        }
        return true;
    });
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-timebase, Link');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
    res.set('Access-Control-Expose-Headers', 'Link');
    return next();
});


app.use(cookieSession({
    name : 'mysession', 
    keys: ['vueauthrandomkey'],
    maxAge : 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());

//Connect to mongodb server
var db = mongoose.connection;

db.on('error', function(){
    console.log('Connection failed!');
});

db.once('open', function() {
    console.log('Connected to mongod server!');
});

mongoose.connect('mongodb://localhost/mydb', {useNewUrlParser: true});

var Exchange = require('./models/exchange');
var Food = require('./models/food');
var Notice = require('./models/notice');
var Review = require('./models/review');
// var Chat = require('./models/chat');
var User = require('./models/user');

var router1 = require('./routes/index1')(app, Exchange);
var router2 = require('./routes/index2')(app, Food);
var router3 = require('./routes/index3')(app, Notice);
var router4 = require('./routes/index4')(app, Review);
// var router5 = require('./routes/index5')(app, Chat);
// var router6 = require('./routes/index6')(app, User);

server.listen(80, function() {
	console.log('Server is listening on port 80(680)');
});	

app.get('/', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://143.248.140.106:680')
    res.sendFile("index.js", { root: publicRoot })
})

// invalidate our cookie if exists
app.get('/api/logout', function(req, res){
    console.log('logout 실행')
    req.logout()
    return res.send()
})

app.post('/api/', function(req, res){
    console.log("main"+req.body)
    if(req.user && req.user.name){
        return res.send("hello " + req.user.name)
    }
    else{}
})

passport.serializeUser(function(user, done){
    console.log('serializeUser'.user)
    done(null, user.name)
})

passport.deserializeUser(function(name, done){
    console.log('deserializeUser', name)
    User.find({ 'name' : name }, function(err, user){
        console.log(user)
        email = user.email;
        return done(null, user)
    })
})

passport.use(
    new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "passwd"
    },
    function(email, passwd, done){
        User.find({ 'email': email }).countDocuments(function(err, number){
            if(number == 0){
                console.log('등록된 사용자가 아닙니다')
                return done('등록된 사용자가 아닙니다', false)
            }
            else{
                User.findOne({ 'email': email }, function(err, user){
                    console.log(email)
                    console.log(passwd)
                    console.log(user)
                    if(passwd == user.passwd){
                        console.log('There is user')
                        done(null, user)
                    }
                    else{
                        console.log('local2, no user')
                        console.log(user.passwd, user.email)
                        done(null, false, { message: '잘못된 email 또는 password 입니다'})
                    }
                })
            }
        })
    }
))

app.post('/api/login', function(req, res, next){
    // passport: checking of credentials(자격)
    passport.authenticate('local', function(err, user, info){
        if(err) {
            console.log('Err')
            return next(err);
        }
        if(!user){
            console.log('Error 400')
            return res.status(400).send([user, "Cannot log in", info])
        }
        req.login(user, err => {
            console.log('login ok')
            console.log(req.body)
            console.log(req.session.passport.user)
            return res.send('login 완료')
            // res.cookie('foo',req.session.passport.user);
        })
    })(req, res, next)
})

app.post('/api/register', function(req, res, next){
    var user = new User();
    console.log(req.body)
    User.find({ 'email': req.body.email }).countDocuments(function(err, number){
        if(number != 0){
            res.send('이미 가입된 email입니다')
            console.log('이미 가입된 email입니다')
        }
        else{
            user.name = req.body.name,
            user.nick = req.body.nick,
            user.email = req.body.email,
            user.passwd = req.body.passwd
            user.save(function(err){
                if(err){
                    console.error(err);
                    res.json({result : 'error'});
                    return;
                }
            })
            console.log('register 완료')
            return res.send()
        }
    })
})

// session이 유효한지 확인한다
const authMiddleware = (req, res, next) => {
    if(!req.isAuthenticated()) {
        console.log(req.session)
        console.log('session is not valid')
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
}

// passport.js가 cookie를 이용해 식별자로 사용하여 request에 user object 추가
app.get('/api/user', authMiddleware, (req, res) => {
    // url 보호하기 위해 middleware filter를 거친다
    User.find({ 'name': req.session.passport.user }).countDocuments(function(err, number){
        if(number == 0){
            console.log(req.session.passport.user)
            console.log('api/user 0')
        }
        else {
            console.log('api/user')
            console.log(req.session.passport.user)
            User.findOne({ 'name': req.session.passport.user }, function(err, user){
                console.log([user, req.session])
                return res.send({ user: user})
            })
        }
    })
})

app.get('/api/sess', (req, res) => {
    console.log(req.session.passport.user)
    res.send(req.session.passport.user)
})
