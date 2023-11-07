/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 14:06:42
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 16:27:21
 * @FilePath: \vue-blog\src\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/request'
// 获取用户信息
export function getUserInfo(params) {
    return request({
        url: `user/info?user_id=${params.user_id}`,
        method: 'get',
    })
}

// 修改用户信息
export function updateUserInfo(data) {
    return request({
        url: `user/update`,
        method: 'put',
        data: data
    })
}