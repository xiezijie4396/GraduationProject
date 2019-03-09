<template>
  <div class="magnifier col-xs-4" @mousemove="squareMove">
    <div class="square" @mouseout="enterFlag = false" @mouseover="enterFlag = true"></div>
    <div class="small-box" @mouseover="enterFlag = true">
      <img :src="good.upLoadImg[0].base64" alt="">
    </div>
    <div class="big-box" v-show="false">
      <img src="../../assets/img/5bfbc05dN92384e05.jpg" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'magnifier',
  data () {
    return {
      enterFlag: false
    }
  },
  components: {
    
  },
  props: {
    good: Object,
  },
  methods: {
    squareMove(e){
      let $square = $('.square')
      if(!this.enterFlag){
        $square.css('display', 'none')
        return;
      }
      $square.css('display', 'block')
      let $smallbox = $('.small-box')
      let smallboxLeft = $smallbox.offset().left
      let smallboxTop = $smallbox.offset().top
      let smallboxWidth = $smallbox.width()
      let smallboxHeight = $smallbox.height()
      let squareLeft = e.clientX - 50
      let squareTop = e.clientY - 100
      // 不超过左边界
      if(squareLeft < smallboxLeft){
        squareLeft = smallboxLeft
      }
      // 不超过右边界
      if(squareLeft > smallboxLeft + smallboxWidth - 100){
        squareLeft = smallboxLeft + smallboxWidth - 100
      }
      // 不超过上边界
      if(squareTop < smallboxTop - 50){
        squareTop = smallboxTop - 50
      }
      // 不超过下边界
      if(squareTop > smallboxTop - 150 + smallboxHeight){
        squareTop = smallboxTop - 150 + smallboxHeight
      }
      $('.square').css({
        top: squareTop,
        left: squareLeft
      })
      $('.big-box img').css({
        top: -(squareTop - smallboxTop + 50) * 4,
        left: -(squareLeft - smallboxLeft) * 4
      })
    }
  }
}
</script>


<style scoped lang="less">
.magnifier{
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
  position: relative;
  div{
    box-sizing: border-box;
    &.small-box{
      width: 200px;
      height: 200px;
      img{
        width: 100%;
      }
    }
    &.big-box{
      width: 400px;
      height: 400px;
      border: 1px solid black;
      overflow: hidden;
      position: absolute;
      left: 200px;
      top: 10px;
      img{
        width: 800px;
        height: 800px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    &.square{
      width: 100px;
      height: 100px;
      position: absolute;
      top: 0;
      left: 0;
      background: #bbb;
      opacity: 0.5;
      cursor: zoom-in;
      display: none;
    }
    
  }
}

</style>
