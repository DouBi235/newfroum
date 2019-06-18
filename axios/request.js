import axios from 'axios';
import qs from 'qs';
import ElementUi from 'element-ui';
import store from '../src/vuex/store';

const service = axios.create({
    baseURL: '/api',//api的base_url,
    timeout: 5000 //请求超时时间

});
/****** request拦截器==> 对请求参数做处理 ******/
service.interceptors.request.use( config => {
    // this.$message('数据加载中');
    config.method === 'post'
        ?  config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // config.headers.x_access_token = store.getters.getToken || '';
    config.headers.x_access_token = store.getters.token || '';
    return config;
},error => { //请求错无处理
    ElementUi.Message({
        type: 'error',
        message: error
    });
    return Promise.reject(error)
});


/****** response拦截器==> 对相应做处理 ******/
service.interceptors.response.use(
    response => { //成功请求道数据
        console.log('数据请求成功');
        if(response.data.code === 0) {
            ElementUi.Message({
                type: 'error',
                message: response.data.msg
            })
        }
        return Promise.resolve(response.data);
    },
    error => { //相应错误处理
        console.log('error');
        console.log(error)
        console.log(JSON.parse(JSON.stringify(error)));
        // let text = JSON.parse(JSON.stringify(error)).response.code === 0
        //     ? '404'
        //     : '网络异常，请重试';
        ElementUi.Message({
            type: 'error',
            message: '123'
        });
        return Promise.reject(error);
    }
);
export default service;
