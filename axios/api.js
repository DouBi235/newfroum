import request from './request';
const api = {
    register: (params) => request.post('/register', params), //注册
    login: (params) => request.post('/login', params), //登录
    checkRouter: (params) => request.post('/checkRouter'),
    post: (params) => request.post('/post', params), //发布帖子
    postClass: (params) => request.post('/postClass', params), //发布帖子分类
    getPostClass: (params) => request.get('/getPostClass', {params: params}) //获得帖子分类
};
export default{
    install:Vue => {
        Vue.prototype.api = api;
    }
}
