<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 10:56:29
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-06 09:29:24
 * @FilePath: \vue-blog\src\view\addArticle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-form>
            <el-form-item prop="title">
                <el-input style="display: inline-block;width: 80%;margin-right: 5%;" placeholder="输入文章标题"
                    v-model="addArticleForm.title"></el-input>
                <!-- <el-button type="primary" plain>草稿箱</el-button> -->
                <el-button type="primary" @click="openAdd">发布</el-button>
                <!-- <img style="height: 40px" src="../assets/logo.png" alt="" srcset=""> -->
                <el-avatar @click.native="goToArticle" style="vertical-align: -25%;margin-left: 1%;" :size="50"
                    :src="userImgUrl"></el-avatar>
            </el-form-item>
            <el-form-item prop="region">
                <!-- <mavon-editor v-model="content" ref="md" @change="change" @imgAdd="imgAdd" @imgDel="imgDel"
                    style="min-height: 800px; width: 95%;" /> -->
                <v-md-editor v-model="content" @change="change" :disabled-menus="[]" @upload-image="imgAdd" style="min-height: 800px; width: 95%;" />
            </el-form-item>
        </el-form>
        <!-- 弹窗 -->
        <el-dialog title="发布文章" :visible.sync="dialogVisible" width="30%" :modal="false" :before-close="handleClose">
            <el-form ref="form" :model="addArticleForm" :rules="rules" label-width="80px">
                <el-form-item label="添加标签" prop="keyword">
                    <el-select v-model="addArticleForm.keyword" size="small" multiple placeholder="添加标签">
                        <el-option v-for="item in tagOptions" :key="item._id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编辑摘要" prop="abstract">
                    <el-input type="textarea" rows="6" v-model="addArticleForm.abstract"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import *as qiniu from "qiniu-js"
import { getUploadToken, getImgUrl, deleteImg } from '@/api/uploadImg';
import { addArticle, articleImg, getArticleDetails, updateArticleInfo, updateArticle, getArticleImg } from '@/api/articles'
import { getTags } from '@/api/tags'
import { getItem } from '@/utils/auth'
import { getStrUrl, getUrlKey } from '@/utils/str'
export default {
    data() {
        return {
            userImgUrl: getItem('userInfo').imgUrl,
            content: '',
            html: '',
            token: '',
            userInfo: {},
            imgUrl: '',
            pos: 0,
            imgList: [],
            dialogVisible: false,
            tagOptions: [],
            addArticleForm: {
                title: '',
                keyword: '',
                abstract: '',
                author_id: '',
                author_name: '',
                content: '',
                // article_id: ''
            },
            saveImgUrl: [],
            insertImage: function() {    
            },
            // 表单教研
            rules: {
                keyword: [
                    { required: true, message: '请输入标签', trigger: 'blur' },
                ],
                abstract: [
                    { required: true, message: '请输入摘要', trigger: 'blur' },
                ],
            },
        }
    },
    created() {
        this.userInfo = getItem('userInfo')
        let data = {
            article_id: this.$route.params.id
        }
        if (data.article_id !== 'v_0') {
            // 如果处于非新增的情况，则需加载已有的内容
            getArticleDetails(data).then(res => {
                this.content = res.data.data.content
                this.addArticleForm.title = res.data.data.title
                this.addArticleForm.abstract = res.data.data.abstract
                this.addArticleForm.author_id = res.data.data.author_id
                this.addArticleForm.author_name = res.data.data.author_name
                this.addArticleForm._id = res.data.data._id
                this.addArticleForm.keyword = res.data.data.keyword.split(',')
            })
        }
        // 获取上传图片的token
        getUploadToken().then(res => {
            this.token = res.data.token
        })
        getTags().then(res => {
            // console.log(res.data);
            this.tagOptions = res.data.data
        })
    },
    methods: {
        change(value, render) {
            // console.log(value,render);
            this.html = render;
        },
        goToArticle() {
            this.$router.push({
                path: '/article',
            })
        },
        next(res) {
            console.log(res);
        },
        error(err) {
            console.log(err);
        },
        // 上传图片完成的回调
        complete(res) {
            // console.log(res);
            // const _this = this;
            getImgUrl(res.key).then(imgRes => {
                // console.log(imgRes);
                if (imgRes.data.code === 200) {
                    this.imgUrl = imgRes.data.data
                    // _this.$refs.md.$img2Url(this.pos, this.imgUrl)
                    // this.imgList.push(this.imgUrl);
                    this.insertImage({
                        url: this.imgUrl,
                        desc: 'image.png'
                    })
                }
            })
        },
        // 上传图片
        imgAdd(event, insertImage, files) {
            this.insertImage = insertImage;
            // console.log(this.userInfo);
            let fileName = `${this.userInfo.username}_${Date.now()}_${Math.round(Math.random() * 100)}`
            // console.log(fileName);
            // console.log(fileName,pos, file);
            if (this.token) {
                // this.pos = pos
                let observable = qiniu.upload(
                    files[0],
                    fileName,
                    this.token,
                    { fname: fileName, params: {}, mimeType: null },
                    { useCdnDomain: true }
                );
                observable.subscribe(
                    this.next,
                    this.error,
                    this.complete
                )
            }
        },
        imgDel(pos) {
            console.log(pos, "this id del fun");
            let url = pos[0]
            console.log(url, 'this is del url');
        },
        openAdd() {
            this.dialogVisible = true;
        },
        // 上传文章前先删除没有的图片
        async deleteImg() {
            // 获取当前文章存在的图片列表
            let hasImgList = getStrUrl(this.content)
            this.saveImgUrl = hasImgList
            // 求本次文章书写过程中添加的所有图片列表与现有图片列表的非交集
            let hasImgKeyList = getUrlKey(hasImgList);
            let imgKeyList = getUrlKey(this.imgList);
            if (this.$route.params.id !== 'v_0') {
                let params = {
                    article_id: this.$route.params.id
                }
                let articleImgKeyList = await getArticleImg(params)
                // console.log(articleImgKeyList);
                if (articleImgKeyList.data.data !== null) {
                    articleImgKeyList = articleImgKeyList.data.data.img_key.split(',');
                    imgKeyList.push(...articleImgKeyList)
                }
            }
            let deleteImgKeyList = imgKeyList.filter(item => {
                return !hasImgKeyList.includes(item)
            })
            // if (deleteImgUrlList.length === 0) return
            // 获取的图片列表都未url形式，截取url的key部分
            // let deleteImgKeyList = getUrlKey(deleteImgUrlList)
            if (deleteImgKeyList.length === 0) return;
            // console.log(deleteImgKeyList);
            let res = await deleteImg(deleteImgKeyList);
            if (res.code == 200) {
                console.log('delete successfully');
            }
        },
        // 添加文章
        async addArticle() {
            let res = await addArticle(this.addArticleForm);
            if (res.data.code === 200) {
                // this.dialogVisible = false;
                if (this.saveImgUrl.length > 0) {
                    let saveImgKey = getUrlKey(this.saveImgUrl)
                    saveImgKey = saveImgKey.join(',');
                    let data = {
                        article_id: res.data.data._id,
                        img_key: saveImgKey
                    }
                    let saveImgRes = await articleImg(data);
                    if (saveImgRes.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        })
                    }
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                }
                this.$router.push({
                    path: '/article',
                })
            }
        },
        // 修改文章
        async updateArticleInfo() {
            let res = await updateArticleInfo(this.addArticleForm);
            if (res.data.code === 200) {
                let saveImgKey = []
                if (this.saveImgUrl.length > 0) {
                    saveImgKey = getUrlKey(this.saveImgUrl)
                }
                saveImgKey = saveImgKey.join(',');
                let data = {
                    article_id: this.$route.params.id,
                    img_key: saveImgKey
                }
                let saveImgRes = await updateArticle(data);
                if (saveImgRes.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                }
                this.$router.push({
                    path: '/article',
                })
            }
        },
        // 测试
        confirmAdd() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.addArticleForm.keyword = this.addArticleForm.keyword.join(',');
                    // this.userInfo = getItem('userInfo')
                    this.addArticleForm.author_id = this.userInfo._id
                    this.addArticleForm.author_name = this.userInfo.username
                    this.addArticleForm.content = this.content
                    this.addArticleForm.html = this.html
                    this.deleteImg();
                    if (this.$route.params.id === 'v_0') {
                        this.addArticle();
                    } else {
                        this.updateArticleInfo();
                    }
                    // this.addArticle()
                    this.dialogVisible = false;

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => { });
        }
    }
}
</script>