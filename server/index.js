const express = require('express');
const router = express.Router();
const Index = require('./index/controller'); //用户注册路由句柄
const Post = require('./post/controller'); //帖子路由句柄

router.get('/', function(req, res) {
    res.send({Express: 'Express'});
});
router.post('/register', (req, res) => {
    Index.register(req,res)
});
router.post('/login', (req,res) => {
    Index.login(req,res);
});
router.post('/checkRouter', (req,res) => {
    res.send({code:1,msg: 'token未失效'})
})

/*用户发帖操作*/
router.post('/post', (req,res) => {
    Post.post(req,res);
});
/*用户帖子分类发布操作*/
router.post('/postClass', (req,res) => {
    Post.postClass(req,res);
});
/*获取帖子分类*/
router.get('/getPostClass', (req,res) => {
    Post.getPostClass(req,res);
})
module.exports = router;
