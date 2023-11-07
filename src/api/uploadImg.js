/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 16:11:43
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-31 09:50:17
 * @FilePath: \vue-blog\src\api\uploadImg.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/request'

// 获取token
export function getUploadToken() {
    return request({
        url: 'uploadFile/upload',
        method: 'get'
    })
}

// 根据key值获取图片的url
export function getImgUrl(params) {
    return request({
        url: `uploadFile/getImgUrl?key=${params}`,
        method: 'get',
    })
}

// 批量删除图片
export function deleteImg(data) {
    return request({
        url: 'uploadFile/deleteImg',
        method: 'delete',
        data
    })
}

