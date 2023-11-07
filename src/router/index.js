/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 14:46:35
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-06 14:43:22
 * @FilePath: \vue-blog\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { getItem } from '@/utils/auth'

import Login from '../view/login.vue'
import Main from '../view/main.vue'

import article from '../view/article.vue'
import three from '../view/three.vue'
import home from '../view/home.vue'
import editor from '../view/editor.vue'
import articleDetails from '../view/articleDetails.vue'
import search from '../view/search.vue'

import myArticleList from '../view/myArticleList.vue'
import userInfo from '../view/userInfo.vue'
import test from '../view/test.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        redirect: '/Article',
        children: [{
            path: '/article',
            name: 'Article',
            component: article
        }]
    },
    {
        path: '/home',
        name: 'Home',
        component: home,
        // redirect: { name: 'userInfo' },
        children: [{
            path: '/userInfo',
            name: 'UserInfo',
            component: userInfo
        }, {
            path: '/myArticleList',
            name: 'MyArticleList',
            component: myArticleList,
        }, {
            path: '/test',
            name: 'Test',
            component: test
        }, {
            path: '/three',
            name: 'Three',
            component: three
        },]
    },
    {
        path: '/editor/:id',
        name: 'Editor',
        component: editor
    },
    {
        path: '/articleDetails/:id',
        name: 'ArticleDetails',
        component: articleDetails,
    },
    {
        path: '/search',
        name: 'Search',
        component: search
    }
]

const router = new VueRouter({
    routes,
})

// 路由守卫，当没有token时，重定向回login
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next()
    } else {
        const token = getItem('token')
        if (!token) {
            return next('/login')
        } else {
            next()
        }
    }
})
// router.beforeRouteLeave((to, from, next) => {
//     this.$store.commit('removeToken');
//     next();
// })

export default router