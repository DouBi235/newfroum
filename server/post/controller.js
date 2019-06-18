const Model = require('./model'); //帖子模型
const checkParams = require('../checkParams'); //检查请求参数完整性
const session = require('express-session');

const controllers = {
    post(req,res) {
        let isNext = checkParams(req.body);
        if(isNext) {
            res.send(isNext)
        }else {
            let params = req.body;
            new Model.Post({
                title: params['title'],
                content: params['content'],
                postClassId: params['postClassId'],
                userId: session.userInfo._id,
            }).save((err) => {
                // console.log(err + ',' + JSON.stringify(userId));
                let success= {code: 1, msg: '发帖成功！'};
                let error = {code: 0, msg: '发帖失败！'};
                res.send(err ? error : success);
            })
        }
    },
    postClass(req,res) {
        let isNext = checkParams(req.body);
        if(isNext) {
            res.send(isNext);
        }else {
            let params = req.body;
            new Model.PostClass({
                title: params['title'],
                desc: params['desc']
            }).save((err) => {
                let success = {code: 1, msg: '帖子分类发布成功！'};
                let error = {code: 0, msg: '帖子分类发布失败！'};
                res.send(err ? error : success);
            })
        }
    },
    getPostClass(req,res) {
        Model.PostClass.find({},(err,result) => {
            if(err) {
                res.send({code: 0, msg: '获取帖子分类失败！'});
            }else {
                res.send({code: 1,msg: '获取成功',data: {result}});
            }
        })
    }
};
module.exports = controllers;