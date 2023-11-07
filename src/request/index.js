/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 16:01:45
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-30 10:32:58
 * @FilePath: \vue-blog\src\request\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
const token = localStorage.getItem('token');

const service = axios.create({
    baseURL: 'http://localhost:5002/',
    headers: {
        'Authorization': token
    },
    timeout: 10000
})

service.interceptors.request.use(config => {
    return config;
}, error => Promise.reject(error))

export default service;