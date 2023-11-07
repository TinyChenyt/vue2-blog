/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 10:37:28
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 11:26:45
 * @FilePath: \vue-blog\src\api\tags.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/request'
// 获取标签
export function getTags() {
    return request({
        url: 'tags/list',
        method: 'get'
    })
}

// 添加标签
export function addTags(data) {
    return request({
        url: 'tags/add',
        method: 'post',
        data
    })
}