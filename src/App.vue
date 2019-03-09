<template>
  <div id="app">
    <top/>
    <router-view/>
  </div>
</template>

<script>
import Top from './components/Top'
import Bottom from './components/Bottom'

export default {
  name: 'App',
  components: {
    Top,
    Bottom,
  },
  created(){    // 处理vuex刷新时数据消失的问题
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
     
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
#app{
  padding-top: 50px;
}
</style>
