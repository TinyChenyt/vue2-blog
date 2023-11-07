<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 16:48:46
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 14:17:26
 * @FilePath: \vue-blog\src\view\main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-container>
            <el-header>
                <mainHeader style="height: 100%;"></mainHeader>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <mainAside></mainAside>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue';
import mainAside from '@/components/mainAside.vue';
export default  {
    components: {
        mainHeader,
        mainAside
    }
}
</script>

<style scoped>
  .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: rgb(242, 243, 245);
    color: #333;
    margin-left: 15%;
    margin-right: 20px;
    min-height: 550px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    margin-right: 15%;
    /* max-height: 800px; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  </style>