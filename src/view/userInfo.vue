<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-31 15:43:33
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 16:05:02
 * @FilePath: \vue-blog\src\view\userInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="nav-text">个人资料</div>
        <div class="user-infos">
            <div class="info-input">
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <div class="profile-title">基本信息</div>
                    <el-form-item label="用户名" prop="username">
                        <el-input maxlength="10" show-word-limit v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.sex" placeholder="性别">
                            <el-option label="男" value="male"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="update">保存修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="avatar-input">
                <div class="avatar-info">
                    <el-upload class="avatar-uploader" :action="uploadUrl" :data="qiniuToken" :before-upload="beforeUpload"
                        :on-success="handleAvatarSuccess" :show-file-list="false">
                        <img v-if="imgUrl" :src="imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div>上传头像</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUploadToken, getImgUrl, deleteImg } from '@/api/uploadImg';
import { updateUserInfo } from '@/api/user'
import { getItem } from '@/utils/auth'
export default {
    data() {
        return {
            form: {
                username: '',
                sex: ''
            },
            userInfo: {},
            imgUrl: '',
            qiniuToken: {
                token: "",
                key: ""
            },
            uploadUrl: 'https://upload-z2.qiniup.com', // 华南地区
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            }
        }
    },
    created() {
        this.userInfo = getItem('userInfo')
        this.form.username = this.userInfo.username
        this.form.sex = this.userInfo.sex
        if (this.userInfo.imgUrl) {
            this.imgUrl = this.userInfo.imgUrl
        }
        // 修改上传文件名
        this.qiniuToken.key = `${this.userInfo.username}_${Date.now()}_${Math.round(Math.random() * 100)}`
    },
    methods: {
        async beforeUpload() {
            // getUploadToken().then(res => {
            //     this.qiniuToken.token = res.data.token;
            // })
            let res = await getUploadToken()
            this.qiniuToken.token = res.data.token;
        },
        // 回调图片地址  
        async handleAvatarSuccess(res) {
            // this.imageUrl = this.domain + "/" + res.key; // 将成功返回的地址拼接成可访问的链接地址  
            // getImgUrl(res.key).then(imgRes => {
            //     this.imgUrl = imgRes.data.data
            // })
            // 删除七牛云上原有的头像
            let deleteImgKey = [this.userInfo.imgKey];
            // 删除
            let deleteImgRes = await deleteImg(deleteImgKey)
            if (deleteImgRes.data.code === 200) {
                console.log('ok');
            }
            let imgUrlRes = await getImgUrl(res.key)
            this.imgUrl = imgUrlRes.data.data
            this.userInfo.imgKey = res.key;
            this.userInfo.imgUrl = imgUrlRes.data.data
            let updateUserInfoRes = await updateUserInfo(this.userInfo);
            if (updateUserInfoRes.data.code === 200) {
                this.$store.commit('user/setUserInfo', this.userInfo)
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
            }

            // console.log(res.key,this.imgUrl);
        },
        async update() {
            // console.log(this.form,this.userInfo);
            const _this = this;
            _this.$refs.form.validate(async (valid) => {
                if (valid) {
                    _this.userInfo.username = this.form.username;
                    _this.userInfo.sex = this.form.sex;
                    let updateUserInfoRes = await updateUserInfo(_this.userInfo);
                    if (updateUserInfoRes.data.code === 200) {
                        this.$store.commit('user/setUserInfo', this.userInfo)
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
    },
}
</script>

<style scoped>
.nav-text {
    color: rgb(37, 41, 51);
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    padding: 16px 20px;
    border-bottom: 1px solid rgb(228, 230, 235);
}

.user-infos {
    padding: 0 20px 40px;
    display: flex;
}

.info-input {
    min-width: 240px;
    width: calc(100% - 346px);
    box-sizing: border-box;
}

.el-input {
    width: 400px;
}

.el-select {
    width: 400px;
}

.profile-title {
    padding: 20px 0;
    color: rgb(37, 41, 51);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
}

.avatar-input {
    flex: 1;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
}

.avatar-info {
    width: auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.avatar-uploader {
    border: 1px dashed rgb(140, 147, 157);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
}
</style>