/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 16:07:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-30 14:06:35
 * @FilePath: \vue-blog\src\api\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/request'

// 登录
export function login(data) {
    return request({
        url: 'user/login',
        method: 'post',
        data: data
    })
}
// 注册
export function register(data) {
    return request({
        url: 'user/register',
        method: 'post',
        data: data
    })
}
