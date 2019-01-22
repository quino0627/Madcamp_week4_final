module.exports = function(app, Notice)
{
    // 모든 교류 게시판 정보 찾기
    app.get('/api/notice', function(req, res){
        Notice.find(function(err, notice) {
            if(err) {
                return res.status(500).send({error: 'database failure'});
            }
            res.json(notice);
        })
    });

    // 이름으로 조회
    app.get('/api/notice/nick/:nick', function(req, res){
        Notice.find({nick: req.params.nick}, function(err, notice) {
            if(err) {
                return res.status(500).json({error: err});
            }
            if(!notice) {
                return res.status(404).json({error: 'notice not found'});
            }
            res.json(notice);
        })
    });

    // title로 조회
    app.get('/api/notice/title/:title', function(req, res){
        Notice.find({title: req.params.title}, function(err, notice) {
            if(err) {
                return res.status(500).json({error: err});
            }
            if(!notice) {
                return res.status(404).json({error: 'notice not found'});
            }
            res.json(notice);
        })
    })

    // 게시판 생성
    app.post('/api/notice', function(req, res){
        var notice = new Notice();
        notice.nick = req.body.nick;
        notice.title = req.body.title;
        notice.content = req.body.content;
        notice.date = req.body.date;

        notice.save(function(err) {
            if(err){
                console.error(err);
                res.json({result : 'error'});
                return;
            }
        res.json({result: 'ok'});
        });
    });

    // Update posts
    app.post('/api/notice/modify/:nick', function(req, res){
        Notice.updateOne({nick: req.params.nick}, {$set: {"content": req.body.content}}, function(err, notice){
          if(err){
              console.error(err);
              return res.json({result: 'we cannot modify docuements'});;
          }
        res.json(notice)
        })
    });

    // DELETE posts
    app.post('/api/notice/delete/:nick', function(req, res){
        Notice.deleteOne({nick: req.params.nick}, function(err, notice){
            if(err){
                return res.json({error: 'we cannot delete documents'});
            }
            res.json(notice)
        });
    });
}