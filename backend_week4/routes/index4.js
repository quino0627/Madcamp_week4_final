module.exports = function(app, Review)
{
    // 모든 교류 게시판 정보 찾기
    app.get('/api/review', function(req, res){
        Review.find(function(err, review) {
            if(err) {
                return res.status(500).send({error: 'database failure'});
            }
            res.json(review);
        })
    });

    // 이름으로 조회
    app.get('/api/review/nick/:nick', function(req, res){
        Review.find({nick: req.params.nick}, function(err, review) {
            if(err) {
                return res.status(500).json({error: err});
            }
            if(!review) {
                return res.status(404).json({error: 'review not found'});
            }
            res.json(review);
        })
    });

    // title로 조회
    app.get('/api/review/title/:title', function(req, res){
        Review.find({title: req.params.title}, function(err, review) {
            if(err) {
                return res.status(500).json({error: err});
            }
            if(!review) {
                return res.status(404).json({error: 'review not found'});
            }
            res.json(review);
        })
    })

    // 게시판 생성
    app.post('/api/review', function(req, res){
        var review = new Review();
        review.nick = req.body.nick;
        review.title = req.body.title;
        review.content = req.body.content;
        review.date = req.body.date;

        review.save(function(err) {
            if(err){
                console.error(err);
                res.json({result : 'error'});
                return;
            }
        res.json({result: 'ok'});
        });
    });

    // Update posts
    app.post('/api/review/modify/:nick', function(req, res){
        Review.updateOne({nick: req.params.nick}, {$set: {"content": req.body.content}}, function(err, review){
          if(err){
              console.error(err);
              return res.json({result: 'we cannot modify docuements'});;
          }
        res.json(review)
        })
    });

    // DELETE posts
    app.post('/api/review/delete/:nick', function(req, res){
        Review.deleteOne({nick: req.params.nick}, function(err, review){
            if(err){
                return res.json({error: 'we cannot delete documents'});
            }
            res.json(review)
        });
    });
}