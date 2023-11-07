<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 15:59:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-30 14:45:21
 * @FilePath: \vue-blog\src\view\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="container">
      <!-- <div class="logo-box"><img src="../../assets/one.png" alt="" /></div> -->
      <div class="login-box">
        <div class="login-text"></div>
        <el-tabs class="tabs" v-model="activeName">
          <el-tab-pane label="登录" name="login">
            <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" class="login-form">
              <el-form-item prop="username" class="login-form-item1">
                <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom" placeholder="请输入用户名" @input="change($event)"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="login-form-item2">
                <el-input v-model="loginForm.password" prefix-icon="el-icon-unlock" placeholder="请输入密码" @input="change($event)" type="password" @keyup.enter.native="handleLoginForm()"></el-input>
              </el-form-item>
              <el-form-item class="login-form-item3">
                <el-button type="primary" @click="handleLoginForm">登录</el-button>
                <el-button type="primary" @click="loginFormReset">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <!-- 注册表单 -->
            <el-form :model="registerForm" ref="registerFormRef" :rules="loginFormRules" class="login-form">
              <el-form-item prop="username" class="login-form-item1">
                <el-input v-model="registerForm.username" prefix-icon="el-icon-s-custom" placeholder="请输入用户名" @input="change($event)"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="login-form-item2">
                <el-input
                  v-model="registerForm.password"
                  prefix-icon="el-icon-unlock"
                  placeholder="请输入密码"
                  @input="change($event)"
                  type="password"
                  @keyup.enter.native="handleRegisterForm()"
                ></el-input>
              </el-form-item>
              <el-form-item class="login-form-item3">
                <el-button type="primary" @click="handleRegisterForm">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </template>
  <script>
  import { login, register } from '@/api/login.js'
  import { getUserInfo } from '@/api/user.js'
  export default {
    data() {
      return {
        activeName: 'login',
        // 登录表单数据对象
        loginForm: {
          username: '',
          password: '',
        },
        // 注册表单数据对象
        registerForm: {
        },
        // 注册表单的校验对象
        registerFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          ],
        },
        // 登录表单的校验对象
        loginFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      // 表单重置方法
      loginFormReset() {
        this.$refs.loginFormRef.resetFields()
      },
      change() {
        this.$forceUpdate();
      },
      // 注册方法
      async handleRegisterForm() {
        this.$refs.registerFormRef.validate(async (valid) => {
          // console.log(valid)
          if (!valid) return
          let res = await register(this.registerForm);
          if(res.data.code === 200) {
            this.$message.success(res.data.msg)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 登录方法
      async handleLoginForm() {
        this.$refs.loginFormRef.validate(async (valid) => {
          // console.log(valid)
          if (!valid) return
          let res = await login(this.loginForm);
          if(res.data.code === 200) {
            // 登录成功
            // window.localStorage.setItem('token', this.loginForm.password)
            let params = {
              user_id: res.data.data.id
            }
            let userInfo = await getUserInfo(params)
            this.$store.commit('user/setUserInfo', userInfo.data.data)
            this.$store.dispatch('setToken', res.data.token)
            this.$message.success(res.data.msg)
            this.$router.push('/main')
          }else {
            this.$message.error(res.data.msg)
            this.loginFormReset();
          }
        })
  
      },
    },
  }
  </script>
  <style  scoped>
  .container {
    width: 100%;
    height: 100%;
  }
  .logo-box {
    position: absolute;
    top: 30px;
    left: 30px;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .login-box {
    position: absolute;
    top: 50%;
    right: 5%;
    width: 400px;
    height: 400px;
    transform: translate(-50%, -50%);
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .login-text {
    width: 100%;
    font-size: 24px;
    text-align: center;
    color: #fff;
    margin-bottom: 50px;
    box-sizing: border-box;
    padding: 20px;
  }
  .el-form-item {
    width: 90%;
    margin: 20px auto;
  }
  .login-text span {
    line-height: 30px;
    font-size: 18px;
    color: #666666;
  }
  .login-form-item3 {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  ::v-deep .el-tabs__header {
    margin-top: -50px;
    margin-bottom: 40px;
    margin-left: 25px;
  }
  ::v-deep .el-tabs__content {
    overflow: visible;
  }
  ::v-deep .el-tabs__item {
    font-size: 16px;
  }
  ::v-deep .el-tabs__item.is-active {
    color: #15cbf3;
  }
  ::v-deep .el-icon-arrow-left {
    color: white;
  }
  ::v-deep .el-icon-arrow-right {
    color: white;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    height: 0;
  }
  ::v-deep .el-tabs__active-bar {
    background-color: #15cbf3;
  }
  </style>
  