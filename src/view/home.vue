<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 11:10:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-06 14:45:39
 * @FilePath: \vue-blog\src\view\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-container>
            <el-header>
                <mainHeader></mainHeader>
            </el-header>
        </el-container>
        <el-container style="background-color: rgb(242, 243, 245);min-height: 400px;">
            <el-aside width="200px" style="background-color: #fff;margin-right: 20px;margin-left: 5%;margin-top: 20px;">
                <el-menu default-active="0" class="el-menu-vertical-demo">
                    <el-menu-item index="0" @click="changeMenu(0)">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="1" @click="changeMenu(1)">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">文章管理</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="2" @click="changeMenu(2)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">文章管理</span>
                    </el-menu-item> -->
                    <el-menu-item index="3" @click="changeMenu(3)">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">3D模型</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container style="background-color: #fff;margin-top: 20px;">
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <el-aside width="300px"></el-aside>
        </el-container>
    </div>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue';

export default {
    components: {
        mainHeader
    },
    data() {
        return {
        }
    },
    methods: {
        changeMenu(index) {
            // console.log(index);
            if (index === 0) {
                this.$router.replace({
                    path: '/userInfo'
                })
            } else if (index === 1) {
                this.$router.replace({
                    path: '/myArticleList'
                })
            } else if(index === 2) {
                this.$router.replace({
                    path: '/test'
                })
            } else {
                this.$router.replace({
                    path: '/three'
                })
            }
        }
    }
}
</script>

<style scoped>
.el-header {
    text-align: center;
    line-height: 60px;
}
</style>