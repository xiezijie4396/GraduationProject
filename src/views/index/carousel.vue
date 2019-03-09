<template>
  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <!-- <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
      <li data-target="#carousel-example-generic" data-slide-to="1"></li>
      <li data-target="#carousel-example-generic" data-slide-to="2"></li> -->
      <li v-for="(item, i) in imgs" :key="i" :class="[i===0 ? 'active' : '']" data-target="#carousel-example-generic" :data-slide-to="i"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
        <div v-for="(item, i) in imgs" :class="[i===0 ? 'active' : '', 'item']" :key="i">
          <img :src="item.base64" :alt="item.base64">
        </div>
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>    
</template>

<script>

export default {
  name: 'carousel',
  data () {
    return {
      
    }
  },
  props: {
    imgs: Array
  }
}
</script>


<style scoped lang="less">
.carousel{
  height: 400px;
  img{
    width: 100%;
    height: 400px;
  }
}

</style>
