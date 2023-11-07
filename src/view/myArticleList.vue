<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-31 15:05:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-06 09:29:12
 * @FilePath: \vue-blog\src\view\myArticleList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="文章" name="article">
                <div v-for="(item, index) in articleList" :key="item._id + index">
                    <h1 style="cursor: pointer;" @click="toDetails(item)">{{ item.title }}</h1>
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <div style="color: rgb(134, 144, 156);margin-top: 20px;">{{ handleTime(item.createTime) }}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="text" @click="editor(item)">编辑</el-button>
                            <el-button type="text" @click="confirmDelete(item)">删除</el-button>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="草稿" name="draft">draft</el-tab-pane>? -->
        </el-tabs>

        <el-dialog title="删除文章" :visible.sync="deleteDialogVisible" width="20%" center>
            <span>确定删除该文章？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteArticle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getItem } from '../utils/auth'
import { getUserArticleList, deleteArticle, deleteArticleImg } from '@/api/articles'
import { deleteImg } from '@/api/uploadImg.js'
export default {
    data() {
        return {
            userInfo: getItem('userInfo'),
            articleList: [],
            activeName: 'article',
            // date: new Date
            deleteDialogVisible: false,
            deleteArticleData: {},
            params: {
                page: 1,
                pageSize: 10
            }
        }
    },
    created() {
        this.getArticleList()
    },
    mounted: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy: function () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        getArticleList() {
            // console.log(this.userInfo);
            let data = {
                user_id: this.userInfo._id,
                page: this.params.page,
                pageSize: this.params.pageSize,
            }
            getUserArticleList(data).then(res => {
                // console.log(res)
                if (res.data.code == 200) {
                    this.articleList = res.data.data
                    // this.articleList = this.articleList.filter(item => {
                    //     let date = new Date(item.createTime);
                    //     let year = date.getFullYear();
                    //     let month = date.getMonth() + 1;
                    //     let day = date.getDate();
                    //     return `${year}-${month}-${day}`;
                    // })
                }
                // console.log(this.articleList)
            })
        },
        confirmDelete(item) {
            this.deleteDialogVisible = true;
            this.deleteArticleData = item;
        },
        async deleteArticle() {
            // console.log(item);
            let articleData = {
                article_id: this.deleteArticleData._id,
                author_id: this.deleteArticleData.author_id
            }
            let articleImgData = {
                article_id: this.deleteArticleData._id,
                // author_id: item.author_id
            }
            let res = await deleteArticle(articleData);
            let imgRes = await deleteArticleImg(articleImgData)
            if (res.data.code === 200 && imgRes.data.code === 200) {
                if (imgRes.data.data !== null) {
                    let deleteKeyRes = await deleteImg(imgRes.data.data.img_key.split(','))
                    if (deleteKeyRes.data.code === 200) {
                        this.getArticleList()
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    }
                } else {
                    this.getArticleList()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                }
                // if (deleteKeyRes.data.code === 200) {}
            }
            this.deleteDialogVisible = false;
        },
        editor(item) {
            // console.log(item);
            let routeUrl = this.$router.resolve({
                path: `/editor/${item._id}`,
            })
            window.open(routeUrl.href, '_blank')
        },
        toDetails(item) {
            let routeUrl = this.$router.resolve({
                path: `/articleDetails/${item._id}`,
            })
            window.open(routeUrl.href, '_blank')
        },
        handleScroll() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition + windowHeight >= documentHeight) {
                this.params.page += 1
                this.getArticleList()
            }
        },
        handleTime(time) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            return `${year}-${month}-${day}`;
        },
        handleClick(tab, event) {
            console.log(event);
        }
    }
}
</script>