module.exports = function(app, Exchange)
{
    // 모든 교류 게시판 정보 찾기
    app.get('/api/exchange', function(req, res){
        Exchange.find(function(err, exchange) {
            if(err) {
                return res.status(500).send({error: 'database failure'});
            }
            res.json(exchange);
        })
    });

    // 이름으로 조회
    app.get('/api/exchange/nick/:nick', function(req, res){
        Exchange.find({nick: req.params.nick}, function(err, exchange) {
            if(err) {
                return res.status(500).json({error: err});
            }
            if(!exchange) {
                return res.status(404).json({error: 'exchange not found'});
            }
            res.json(exchange);
        })
    });

    // title로 조회
    app.get('/api/exchange/title/:title', function(req, res){
        Exchange.find({title: req.params.title}, function(err, exchange) {
            if(err) {
                return res.status(500).json({error: err});
            }
            if(!exchange) {
                return res.status(404).json({error: 'exchange not found'});
            }
            res.json(exchange);
        })
    })

    // 게시판 생성
    app.post('/api/exchange', function(req, res){
        var exchange = new Exchange();
        exchange.nick = req.body.nick;
        exchange.title = req.body.title;
        exchange.content = req.body.content;

        exchange.save(function(err) {
            if(err){
                console.error(err);
                res.json({result : 'error'});
                return;
            }
        res.json({result: 'ok'});
        });
    });

    // Update posts
    app.post('/api/exchange/modify/:nick', function(req, res){
        Exchange.updateOne({nick: req.params.nick}, {$set: {"content": req.body.content}}, function(err, exchange){
          if(err){
              console.error(err);
              return res.json({result: 'we cannot modify docuements'});;
          }
        res.json(exchange)
        })
    });

    // DELETE posts
    app.post('/api/exchange/delete/:nick', function(req, res){
        Exchange.deleteOne({nick: req.params.nick}, function(err, exchange){
            if(err){
                return res.json({error: 'we cannot delete documents'});
            }
            res.json(exchange)
        });
    });
}