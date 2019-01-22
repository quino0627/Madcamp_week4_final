module.exports = function(app, Food)
{
    // 모든 음식 게시판 정보 찾기
    app.get('/api/food', function(req, res){
        Food.find(function(err, food) {
            if(err) {
                return res.status(500).send({error: 'database failure'});
            }
            res.json(food);
        })
    });

    // 이름으로 조회
    app.get('/api/food/nick/:nick', function(req, res){
        Food.find({nick: req.params.nick}, function(err, food) {
            if(err) {
                return res.status(500).json({error: err});
            }
            if(!food) {
                return res.status(404).json({error: 'food not found'});
            }
            res.json(food);
        })
    });

    // title로 조회
    app.get('/api/food/title/:title', function(req, res){
        Food.find({title: req.params.title}, function(err, food) {
            if(err) {
                return res.status(500).json({error: err});
            }
            if(!food) {
                return res.status(404).json({error: 'food not found'});
            }
            res.json(food);
        })
    })

    // 게시판 생성
    app.post('/api/food', function(req, res){
        var food = new Food();
        food.nick = req.body.nick;
        food.title = req.body.title;
        food.content = req.body.content;

        food.save(function(err) {
            if(err){
                console.error(err);
                res.json({result : 'error'});
                return;
            }
        res.json({result: 'ok'});
        });
    });

    // Update posts
    app.post('/api/food/modify/:nick', function(req, res){
        Food.updateOne({nick: req.params.nick}, {$set: {"content": req.body.content}}, function(err, food){
          if(err){
              console.error(err);
              return res.json({result: 'we cannot modify docuements'});;
          }
        res.json(food)
        })
    });

    // DELETE posts
    app.post('/api/food/delete/:nick', function(req, res){
        Food.deleteOne({nick: req.params.nick}, function(err, food){
            if(err){
                return res.json({error: 'we cannot delete documents'});
            }
            res.json(food)
        });
    });
}