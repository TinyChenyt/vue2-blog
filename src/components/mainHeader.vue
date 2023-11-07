
import router from '@/router';
<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 17:00:32
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-06 18:45:08
 * @FilePath: \vue-blog\src\components\main-header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box">
        <el-row :gutter="18">
            <el-col :span="3">
                <div>
                    <img src="../assets/logo.png" alt="" srcset="">
                </div>
            </el-col>
            <el-col :span="1">
                <div>
                    <router-link to="/article">首页</router-link>
                </div>
            </el-col>
            <!-- <el-col :span="1">
                <div>
                    <span>
                        <router-link to = "/three">3D</router-link>
                    </span>
                </div>
            </el-col> -->
            <el-col :span="6" :offset="4">
                <div>
                    <el-input v-model="searchKeyWord" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="searchArticleList">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="3" :offset="4">
                <div>
                    <el-button type="primary" size="medium" icon="el-icon-edit" @click="toAddArticle">创作</el-button>
                </div>
            </el-col>
            <el-col :span="2">
                <!-- <div @click="toMyHome">
                    <img src="../assets/logo.png" alt="" srcset="">
                </div> -->
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <img :src="imgUrl" alt="" srcset="">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">个人信息</el-dropdown-item>
                        <el-dropdown-item command="b">代码中心</el-dropdown-item>
                        <el-dropdown-item command="c">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { removeItem, getItem } from '@/utils/auth'
export default {
    name: "MainHeader",
    data() {
        return {
            searchKeyWord: '',
            imgUrl: getItem('userInfo').imgUrl
        }
    },
    methods: {
        // 回到首页
        toMyHome() {
            this.$router.push({
                path: '/userInfo'
            })
        },
        handleCommand(command) {
            switch (command) {
                case 'a':
                    this.$router.push({
                        path: '/userInfo'
                    })
                    break;
                case 'b':
                    break;
                case 'c':
                    this.$store.commit('removeToken');
                    removeItem('token');
                    removeItem('userInfo')
                    this.$router.push({
                        path: '/login'
                    })
                    break;
            }
  
      },
    //   前往文章编辑页面，当处于新增时，id为v_0
      toAddArticle() {
        let routeUrl = this.$router.resolve({
            path: '/editor/v_0'
        })
        window.open(routeUrl.href, '_blank');
      },
      searchArticleList() {
        // console.log(this.searchKeyWord);
        this.$router.push({
            path: '/search',
            query: {
                keyword: this.searchKeyWord
            }
        })
      }
    }
}
</script>

<style scoped>
.box {
    height: 60px !important;
}

.el-col div img {
    height: 40px;
    margin-top: 10px;
}

.el-col div span {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>