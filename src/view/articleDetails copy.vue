<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-31 14:03:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-03 10:44:44
 * @FilePath: \vue-blog\src\view\articleDetails.vue
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
                    <h1>{{ article.title }}</h1>
                    <div>
                        <span class="author_name">{{ article.author_name }}</span>
                        <span class="createTime">{{ article.createTime }}</span>
                    </div>
                    <!-- <div v-html="article.html"></div> -->
                    <div>
                        <mavon-editor v-model="article.content" ref="md" :subfield="false" defaultOpen="preview"
                            :editable="false" code-style="vs2015" :ishljs="false" :toolbarsFlag="false"
                            style="min-height: 800px; width: 95%;" />
                    </div>
                </el-main>
            </el-container>
            <el-aside class="fixed-sidebar" style="background-color: #fff;margin-top: 20px;margin-left: 10px;"
                width="300px">

            </el-aside>
        </el-container>
    </div>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue';
import { getArticleDetails } from '@/api/articles'
export default {
    components: {
        mainHeader
    },
    data() {
        return {
            article: {}
        }
    },
    created() {
        // console.log(this.$route.params.id);
        let data = {
            article_id: this.$route.params.id
        }
        getArticleDetails(data).then(res => {
            this.article = res.data.data;
            let date = new Date(this.article.createTime)
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            this.article.createTime = `${year}-${month}-${day}`
        })
    }
}
</script>

<style scoped>
.el-header,
.el-footer {
    text-align: center;
    line-height: 60px;
}

.author_name {
    cursor: pointer;
    color: rgb(81, 87, 103);
    margin-right: 20px;
}

.author_name:hover {
    color: rgb(30, 128, 255)
}

.createTime {
    color: rgb(138, 145, 159);
}
</style>