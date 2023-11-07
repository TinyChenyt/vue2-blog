/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 18:30:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 18:23:47
 * @FilePath: \vue-blog\src\utils\str.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 切割md格式的字符串获取图片的url
export const getStrUrl = (str) => {
    let url = str.match(/!\[(image.png)\]\((.*?)\)/g);
    if(url == null) return [];
    let reg = /\((.+?)\)/gi;

    let res = url.map(item => {
        return item.match(reg)[0].replace(/\(|\)/g, "");
    })
    return res;
}
// 切割七牛云图片的url，获取其中的key值
export const getUrlKey = (urlList) => {
    if(urlList.length === 0) return [];
    return urlList.map(item => {
        let match = item.match(/.com\/([^?]+)/);
        return match ? match[1] : null;
    })
}