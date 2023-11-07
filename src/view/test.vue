<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 11:40:13
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 14:16:33
 * @FilePath: \vue-blog\src\view\test.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <button @click="addTags">提交tags</button>
    </div>
</template>

<script>
import { addTags } from '@/api/tags'

export default {
    data() {
        return {
            tags: {
                name: 'React',
                logo_url: 'http://s34k4xd0u.hn-bkt.clouddn.com/logo_react.png?e=1698906067&token=UmOYW40oWGETiQbkRk7wtFCoCm1p9igWNdUflAGx:TVfMh1HPDR6cEZQRnNhlkImbGVI=',
            }
        }
    },
    methods: {
        addTags() {
            addTags(this.tags).then(res => {
                console.log(res)
            })
        }
    }
}
</script>