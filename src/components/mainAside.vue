<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 09:08:26
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 11:35:28
 * @FilePath: \vue-blog\src\components\mainAside.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="0" @click="setTagName('all')">
                <i class="el-icon-menu"></i>
                <span slot="title">综合</span>
            </el-menu-item>
            <el-menu-item v-for="(item, index) in tags" :key="item._id" :index="index + 1 + ''" @click="setTagName(item.name)">
                <img class="logo-img" :src="item.logo_url" alt="" srcset="">
                <span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { getTags } from "@/api/tags.js"
import { mapMutations } from "vuex"
export default {
    data() {
        return {
            tags: []
        }
    },
    created() {
        this.getTags()
    },
    methods: {
        /**
         * 点击左边菜单栏，讲tag保存到VueX中
         */
        ...mapMutations(['setTagName']),
        getTags() {
            getTags().then(res => {
                if (res.data.code === 200) {
                    this.tags = res.data.data
                }
            })
        },
        // changTag(name) {
        //     console.log(name);
        //     ...mapMutations
        // },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
.tagsTopDiv {
    color: aqua;
}

.tagsDiv {
    height: 50px;
    text-align: left;
    /* margin-left: 10px; */
    line-height: 50px;
    margin-left: 10px;
    margin-right: 10px;
}

.tagsDiv:hover {
    cursor: pointer;
    color: rgb(30, 128, 255);
}

.tagsDiv:focus {
    background-color: rgb(164, 195, 235);
    color: rgb(30, 128, 255);
}
.logo-img {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
}
</style>