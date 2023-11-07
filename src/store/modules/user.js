/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 14:08:21
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-30 15:02:44
 * @FilePath: \vue-blog\src\store\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { setItem } from '@/utils/auth'
const user = {
    namespaced: true,
    state: {
        userInfo: {
            username:'',
            password: '',
            sex: '',
            imgUrl: ''
        }
    },
    mutations: {
        setUserInfo(state, data) {
            state.userInfo = data
            setItem('userInfo', state.userInfo)
        }
    },
    actions: {
        setUserInfo(context, data) {
            context.commit('setUserInfo', data)
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    }
}

export default user