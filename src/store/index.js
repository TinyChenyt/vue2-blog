/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 16:47:50
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 11:26:28
 * @FilePath: \vue-blog\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { setItem, removeItem } from '@/utils/auth'
import user from './modules/user'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,
        tagName: 'all'
    },
    getters: {
        getTagName(state) {
            return state.tagName
        },
        getToken(state) {
            return state.token
        }
    },
    mutations: {
        setTagName(state, tagName) {
            state.tagName = tagName
        },
        setToken(state, token) {
            state.token = token
            setItem('token', state.token)
        },
        removeToken(state) {
            state.token = null
            removeItem('token')
        }
    },
    actions: {
        setToken(context, token) {
            context.commit('setToken', token)
            setItem('token', token)
        },
        removeToken(context) {
            context.commit('removeToken', null)
        }
    },
    modules: {
        user
    }
})

export default store