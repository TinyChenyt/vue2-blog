<template>
    <div>
        <el-card class="card-body" shadow="hover">
            <div v-for="(item, index) in list" :key="item._id">
                <div @click="toDetails(item)">
                    <div class="articleTitle">
                    {{ item.title }}
                </div>
                <div class="articleDec">
                    {{ item.abstract }}
                </div>
                </div>
                <div class="articleFooter">
                    <div class="authorName">
                        <el-link :underline="false">{{ item.author_name }}</el-link>
                    </div>
                    <div class="keyword">
                        <el-link :underline="false" style="margin-left: 10px;"
                            v-for="(keyword, keyIndex) in keywords[index]" :key="keyword + keyIndex">{{ keyword }}</el-link>
                    </div>
                    <!-- <el-divider></el-divider> -->
                </div>
                <!-- <el-button type="primary" plain @click="deleteArticle(item)">主要按钮</el-button> -->
                <el-divider></el-divider>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getArticlesList, searchArticlesList } from "@/api/articles.js"
import { mapGetters } from "vuex"
export default {
    data() {
        return {
            list: [],
            keywords: [],
            params: {
                page: 1,
                pageSize:10
            },
            tagName: 'all'
        }
    },
    computed: {
        ...mapGetters(["getTagName"])
    },
    watch: {
        getTagName(val) {
            if(this.tagName !== val) {
                this.list = []
            }
            this.tagName = val
            this.params.page = 1
            if (val === 'all') {
                this.getArticlesListVue(this.params)
            } else {
                let params = {
                    keyword: val,
                    page: this.params.page,
                    pageSize: this.params.pageSize
                }
                searchArticlesList(params).then(res => {
                    if (res.data.code === 200) {
                        // this.list = res.data.data
                        this.list.push(...res.data.data)
                        this.list.forEach(item => {
                            this.keywords.push(item.keyword.split(','))
                        })
                    }
                })
            }

        }
    },
    created() {
        this.getArticlesListVue(this.params)
        // console.log(this.getTagName);
    },
    mounted: function() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy: function() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async getArticlesListVue(params) {
            // console.log(this.tagName);
            let res = await getArticlesList(params);
            if (res.data.code === 200) {
                // this.list = res.data.data
                this.list.push(...res.data.data)
                this.list.forEach(item => {
                    this.keywords.push(item.keyword.split(','))
                })
            }
        },
        toDetails(item) {
            let routeUrl = this.$router.resolve({
                path:  `/articleDetails/${item._id}`,
            })
            window.open(routeUrl.href, '_blank')
        },
        // 触底请求设置，监听浏览器窗口的滚动条，触底时页数加1
        handleScroll() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition + windowHeight >= documentHeight) {
                this.params.page += 1
                this.getArticlesListVue(this.params)
            }
        }
        // async deleteArticle(item) {
        //     // console.log(item);
        //     let articleData = {
        //         article_id: item._id,
        //         author_id: item.author_id
        //     }
        //     let articleImgData = {
        //         article_id: item._id,
        //         // author_id: item.author_id
        //     }
        //     let res = await deleteArticle(articleData);
        //     let imgRes = await deleteArticleImg(articleImgData)
        //     if (res.data.code === 200 && imgRes.data.code === 200) {
        //         if (imgRes.data.data !== null) {
        //             let deleteKeyRes = await deleteImg(imgRes.data.data.img_key.split(','))
        //             if (deleteKeyRes.data.code === 200) {
        //                 this.getArticlesListVue()
        //                 this.$message({
        //                     message: '删除成功',
        //                     type: 'success'
        //                 })
        //             }
        //         } else {
        //             this.getArticlesListVue()
        //             this.$message({
        //                 message: '删除成功',
        //                 type: 'success'
        //             })
        //         }
        //         // if (deleteKeyRes.data.code === 200) {}
        //     }
        // }
    }
}
</script>

<style>
.card-body {
    width: 100%;
    min-height: 400px;
    margin-top: 5px;
}

.articleTitle {
    min-height: 20px;
    line-height: 20px;
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
}

.articleDec {
    font-size: 13px;
    color: rgb(138, 145, 159);
    min-height: 20px;
    line-height: 20px;
    text-align: left;
    margin-top: 5px;
    /* font-weight: 200; */
    cursor: pointer;
}

.articleFooter {
    min-height: 20px;
    line-height: 20px;
    font-size: 13px;
    color: rgb(138, 145, 159);
    /* font-weight: 200; */
}

.authorName {
    float: left;
    font-size: 13px;
    color: rgb(138, 145, 159);
}

.keywords {
    float: right;
    text-align: left;
}

.el-divider--horizontal {
    margin-top: 5px !important;
}
</style>