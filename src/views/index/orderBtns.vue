<template>
  <div class="orderBtns">
    <!-- Single button -->
    <div class="btn-group">
      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        销量 <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a @click="sort(2)">从高往低</a></li>
        <li><a @click="sort(1)">从低往高</a></li>
      </ul>
    </div>
    <!-- Single button -->
    <div class="btn-group">
      <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        价格 <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a @click="sort(4)">从高往低</a></li>
        <li><a @click="sort(3)">从低往高</a></li>
      </ul>
    </div>
    <!-- Single button -->
    <div class="btn-group">
      <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        评论数 <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a @click="sort(6)">从多往少</a></li>
        <li><a @click="sort(5)">从少往多</a></li>
      </ul>
    </div>
    <!-- Single button -->
    <div class="btn-group">
      <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        时间 <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a @click="sort(8)">最新发布</a></li>
        <li><a @click="sort(7)">发布最久</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'orderBtns',
  data () {
    return {
      
    }
  },
  methods:{
    sort(type){
      this.$store.dispatch('changeType', type)
    }
  }
}
</script>


<style scoped>
.orderBtns{
  margin-bottom: 10px;
}
</style>
