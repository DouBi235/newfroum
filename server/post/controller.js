const Model = require('./model');
const controllers = {
    post(req,res) {
        let isNext = checkParams(req.body);
        if(isNext) {
            res.send(isNext)
        }else {
            let params = req.body;
            console.log(params);
            new Post.Post({
                title: params['title'],
                content: params['content'],
                postDate: params['postDate'],
                postClassId: params['postClassId'],
                userId: params['userId']
            }).save((err,result) => {
                if(err) {
                    res.send({code: 0, msg: '发帖失败！'})
                }else {
                    res.send({code: '1', msg: '发帖成功'})
                }
            })
        }
    }
}