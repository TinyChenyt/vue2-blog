<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-01 10:25:32
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 11:15:00
 * @FilePath: \vue-blog\src\view\searchArticle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-container>
            <el-header>
                <mainHeader></mainHeader>
            </el-header>
        </el-container>
        <el-container style="background-color: rgb(242, 243, 245);">
            <el-aside width="200px">

            </el-aside>
            <el-container style="background-color: #fff;margin-left: 20px;margin-top: 20px;">
                <el-main>
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
                                    v-for="(keyword, keyIndex) in keyword[index]" :key="keyword + keyIndex">{{ keyword
                                    }}</el-link>
                            </div>
                            <!-- <el-divider></el-divider> -->
                        </div>
                        <!-- <el-button type="primary" plain @click="deleteArticle(item)">主要按钮</el-button> -->
                        <el-divider></el-divider>
                    </div>
                </el-main>
            </el-container>
            <el-aside style="background-color: #fff;margin-left: 20px;margin-top: 20px;margin-right: 20px;" width="400px">

            </el-aside>
        </el-container>
    </div>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue';
import { searchKeywordsList } from '@/api/articles.js';
export default {
    components: {
        mainHeader
    },
    data() {
        return {
            // keyword: this.$route.query.keyword,
            params: {
                keyword: this.$route.query.keyword,
                page: 1,
                pageSize: 10
            },
            list: [],
            keyword: []
        }
    },
    created() {
        // console.log(this.keyword);
        this.getSearchArticleList()
    },
    watch: {
        $route(to) {
            this.params.keyword = to.query.keyword
            this.getSearchArticleList('change')
        }
    },
    methods: {
        async getSearchArticleList(item) {
            if (item === 'change') {
                this.list = []
            }
            this.list = []
            let res = await searchKeywordsList(this.params);
            // console.log(res,res.data,res.data.data);
            if (res.data.code == 200) {
                this.list.push(...res.data.data);
                this.list.forEach(item => {
                    this.keyword.push(item.keyword.split(","));
                })
            }
        },
        toDetails(item) {
            let routeUrl = this.$router.resolve({
                path:  `/articleDetails/${item._id}`,
            })
            window.open(routeUrl.href, '_blank')
        },
    }
}
</script>

<style scoped>
.el-header,
.el-footer {
    text-align: center;
    line-height: 60px;
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