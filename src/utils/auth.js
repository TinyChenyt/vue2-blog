/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 10:23:14
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-30 15:02:00
 * @FilePath: \vue-blog\src\utils\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const setItem = (key, val)  => {
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
}

export const getItem = (key) => {
    const data = localStorage.getItem(key)
    try {
        return JSON.parse(data)
    }catch {
        return data
    }
}

export const removeItem = (key) => {
    localStorage.removeItem(key)
}