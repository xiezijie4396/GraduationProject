<template>
  <div class="goodsdetails">
    <!-- if作用 用于处理当this.good里面没有值时传入子组件发生的错误 -->
    <template v-if="JSON.stringify(good)!=='{}'">
      <magnifier :good="good"/>
      <profile :good="good"/>
      <tab :good="good"/>  
    </template>
  </div>
</template>

<script>
import Top from '../../components/Top'
import Magnifier from './magnifier'
import Profile from './profile'
import Tab from './tab'
export default {
  name: 'goodsdetails',
  data () {
    return {
      good: {},           // 当前商品      
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){  
      var uid = this.$route.query.id
      var params = this.$common.setParams([
        {name: 'uid', param: uid},
      ])
      this.axios.post('/api/goods/getOne', params).then((res)=>{
        this.good = res.data[0]
      })
    }
  },
  components: {
    Magnifier,
    Profile,
    Tab,
    Top
  },

}
</script>


<style scoped lang="less">
.goodsdetails{
  width: 800px;
  margin: 0 auto;
}
</style>
