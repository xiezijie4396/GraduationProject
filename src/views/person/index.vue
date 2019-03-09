<template>
  <div class="index">
    <detail/>
  </div>
</template>

<script>
import Detail from './detail'
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  components: {
    Detail
  }
}
</script>


<style scoped>
.index{
  width: 800px;
  margin: 0 auto;
}
</style>
