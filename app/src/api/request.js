// 对于axios进行二次封装
import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css";
// start:进度条开始 done:进度条结束

// 1.利用axios对象的方法create,创建axios实例
// 2.request就是axios,只不过稍微配置一下
const requests=axios.create({
    // 配置对象
    baseURL:'/api',
    // 代表请求超时的时间5s
    timeout:5000
})

// 请求拦截器::发请求之前处理一些业务
requests.interceptors.request.use((config)=>{
    // config:配置对象,对象里的属性很重要,headers请求头
    nprogress.start();
    return config;
});

// 相应拦截器:当服务器数据返回以后可以处理一些事情
requests.interceptors.response.use((res)=>{
    // 成功的回调函数
nprogress.done();
    return res.data;
},(error)=>{
    // 相应失败的回调函数
    return Promise.reject(new Error('fail'));
});
// 对外暴露
export default requests;