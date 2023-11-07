<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 14:32:04
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-03 16:07:23
 * @FilePath: \vue-blog\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      timer: null,
    }
  },
  mounted() {
    const tokenTimeout = 1800000; // 30min  
    // 页面加载时启动计时器  
    this.timer = setTimeout(() => {  
      // 令牌过期时间（以毫秒为单位）  
  
      // 判断令牌是否过期  
      const currentTime = Date.now();  
      if (currentTime - this.token.timestamp > tokenTimeout) {  
        // 令牌过期，销毁令牌并跳转到登录页面  
        this.$store.commit('removeToken'); 
        this.$router.push('/login');
      } else {  
        // 令牌未过期，重新设置计时器  
        this.timer = setTimeout(this.timer, tokenTimeout);  
      }  
    }, tokenTimeout);  
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.$store.commit('removeToken');
  }
}
</script>

<style>
#app {
  border-color: rgb(229, 232, 235);
}
</style>
