import request from './request';
const api = {
    register: (params) => request.post('/register', params), //注册
    login: (params) => request.post('/login', params), //登录
    checkRouter: (params) => request.post('/checkRouter')
};
export default{
    install:Vue => {
        Vue.prototype.api = api;
    }
}
