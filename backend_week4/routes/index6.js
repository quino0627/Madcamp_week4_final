module.exports = function(app, User)
{
    var express = require('express');
    var app = express();
    const cookieSession = require('cookie-session');
    const bodyParser = require('body-parser')
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;

    const publicRoot = "../frontend/"
    app.use(express.static(publicRoot))

    // initialize body-parser
    app.use(bodyParser.json({limit: '50mb'}));

    // initialize cookie-session
    app.use(cookieSession({
        name : 'mysession', 
        keys: ['vueauthrandomkey'],
        maxAge : 24 * 60 * 60 * 1000 // 24 hours
    }))

    app.use(passport.initialize());
    app.use(passport.session());    


    app.get('/', function(req, res, next){
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
            User.find({ 'email': email }.count(function(err, number){
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
            }))
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
                //return res.send('login 완료')
                res.send('login 완료')
            })
        })(req, res, next)
    })

    app.post('/api/register', function(req, res, next){
        var user = new User();
        console.log(req.body)
        User.find({ 'eamil': req.body.email }).count(function(err, number){
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
                    console.error(err);
                    res.json({result : 'error'});
                    return;
                })
                console.log('register 완료')
                return res.send()
            }
        })
    })

    // session이 유효한지 확인한다
    const authMiddleware = (req, res, next) => {
        if(!req.isAuthenticated()) {
            res.status(401).send('You are not authenticated')
        } else {
            return next()
        }
    }

    // passport.js가 cookie를 이용해 식별자로 사용하여 request에 user object 추가
    app.get('/api/user', authMiddleware, (req, res) => {
        // url 보호하기 위해 middleware filter를 거친다
        User.find({ 'name': req.session.passport.user }.count(function(err, number){
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
        }))
    })


}