/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 10:38:49
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 16:26:45
 * @FilePath: \vue-blog\src\api\articles.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/request'

// 获取文章列表
export function getArticlesList(params) {
    return request({
        url: 'articles/list',
        method: 'get',
        params
    })
}

// 分类获取文章列表
export function searchArticlesList(params) {
    return request({
        url: 'articles/query',
        method: 'get',
        params
    })
}

// 关键词搜索文章列表
export function searchKeywordsList(params) {
    return request({
        url: 'articles/search',
        method: 'get',
        params
    })
}
// 添加文章
export function addArticle(data) {
    return request({
        url: 'articles/add',
        method: 'post',
        data: data
    })
}
// 获取文章详情
export function getArticleDetails(params) {
    return request({
        url: 'articles/detail',
        method: 'get',
        params: params
    })
}
// 添加文章的图片
export function articleImg(data) {
    return request({
        url: 'articleImg/addImg',
        method: 'post',
        data: data
    })
}

// 删除文章
export function deleteArticle(data) {
    return request({
        url: 'articles/delete',
        method: 'delete',
        data: data
    })
}

// 删除文章图片
export function deleteArticleImg(data) {
    return request({
        url: 'articleImg/deleteImg',
        method: 'delete',
        data: data
    })
}

// 获取当前用户的文章列表
export function getUserArticleList(params) {
    return request({
        url: 'articles/myArticle',
        method: 'get',
        params: params
    })
}

// 获取对应文章的已有图片
export function getArticleImg(params) {
    return request({
        url: 'articleImg/getImg',
        method: 'get',
        params
    })
}

// 修改文章的url
export function updateArticle(data) {
    return request({
        url: 'articleImg/updateImg',
        method: 'put',
        data: data
    })
}

// 修改文章
export function updateArticleInfo(data) {
    return request({
        url: 'articles/update',
        method: 'put',
        data: data
    })
}