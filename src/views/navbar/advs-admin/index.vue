<template>
  <div class="advs-admin">
      <!-- 操作区域 -->
      <div class="upload form-group">
        <div class="upimg">
          <input type="file" id="upgteimg" value="" multiple />
          <!-- <button class="btn btnfile" id="submit">开始上传</button> -->
        </div>
        <div id="showimg">
            <ul id="showui"></ul>
            <div id="showinput"></div>
        </div>
      </div>
      <button class="btn btn-success handle">保存修改</button>
      <button class="btn btn-primary handle">预览修改</button>
      <button class="btn btn-warning" @click="getData">撤销修改</button>
      <button class="btn btn-danger" @click="goback">返回</button>
      <br>
      <!-- 预览区域 -->
      <carousel :imgs="advs" />
  </div>
</template>

<script>
import Carousel from '../../../components/carousel'
export default {
  name: 'advs-admin',
  data () {
    return {
      advs: []        // 用于存放广告
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.axios.post('/api/advs/get').then((res)=>{
        var data = res.data
        this.advs = []
        data.forEach((e)=>{
          this.advs.push(e.advs)
        })
         // 上传图片显示
        $('#showui').empty()
        this.advs.forEach((e)=>{
          var result = `<div class="showdiv">
          <img class="left" src="http://img2.3png.com/c35019a17762745be21947e3e94829c05c6e.png" />
          <img class="center" src="http://img2.3png.com/d134d326ddd9a679b6baacdd90e5ef6d1aff.png" />
          <img class="right" src="http://img2.3png.com/07b1b824275f5deead241c24cf9e74060b88.png" />
          </div>`+
          '<img id="img'+ ''+ e.name +'" class="showimg" src="'+ e.base64 +'" />';
          var li = document.createElement('li');
          li.innerHTML = result;
          document.getElementById("showui").appendChild(li);
        })
        this.initUpload()
      })
    },
    initUpload(){
      var input = document.getElementById("upgteimg");
      var showui = document.getElementById("showui");
      var result;
      var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
      var fd; //FormData方式发送请求
      var showinput = document.getElementById("showinput");
      var handles = $('.handle');
      var dateli, dateinput;
      var _this = this;
      dataArr = _this.advs
      function randomString(len) {　　
        len = len || 32;　　
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
        var maxPos = $chars.length;　　
        var pwd = '';　　
        for(var i = 0; i < len; i++) {　　　　
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
        }　　
        return pwd;
      }
      if(typeof FileReader === 'undefined') {
        alert("抱歉，你的浏览器不支持 FileReader");
        input.setAttribute('disabled', 'disabled');
      } else {
        input.addEventListener('change', readFile, false);
      }

      function readFile() {
        fd = new FormData();
        var iLen = this.files.length;
        var index = 0;
        var currentReViewImgIndex = 0;
        for(var i = 0; i < iLen; i++) {
          if(!input['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {　　 //判断上传文件格式
            return alert("上传的图片格式不正确，请重新选择");
          }
          var reader = new FileReader();
          reader.index = i;
          fd.append(i, this.files[i]);
          reader.readAsDataURL(this.files[i]); //转成base64
          reader.fileName = this.files[i].name;
          reader.files = this.files[i];
          reader.onload = function(e) {
            var imgMsg = {
              name: randomString(5), //获取文件名
              base64: this.result, //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
            }
            dataArr.push(imgMsg);
            for(var j = 0; j < dataArr.length; j++) {
              currentReViewImgIndex = j
            }
            result = `<div class="showdiv">
            <img class="left" src="http://img2.3png.com/c35019a17762745be21947e3e94829c05c6e.png" />
            <img class="center" src="http://img2.3png.com/d134d326ddd9a679b6baacdd90e5ef6d1aff.png" />
            <img class="right" src="http://img2.3png.com/07b1b824275f5deead241c24cf9e74060b88.png" />
            </div>`+
            '<img id="img' +currentReViewImgIndex+randomString(1)+randomString(2) +randomString(5) + '" class="showimg" src="' + this.result + '" />';
            var li = document.createElement('li');
            li.innerHTML = result;
            showui.appendChild(li);
            index++;
          }
        }
      }

      function onclickimg() {
        var dataArrlist = dataArr.length;
        var lilength = document.querySelectorAll('ul#showui li');
        for(var i = 0; i < lilength.length; i++) {
          lilength[i].getElementsByTagName('img')[0].onclick = function(num) {
            return function() {
              if(num == 0) {} else {
                var list = 0;
                for(var j = 0; j < dataArr.length; j++) {
                  list = j
                }
                var up = num - 1;
                dataArr.splice(up, 0, dataArr[num]);
                dataArr.splice(num + 1, 1)
                var lists = $("ul#showui li").length;
                for(var j = 0; j < lists; j++) {
                  var usid = $("ul#showui li")[j].getElementsByTagName('img')[3];
                  $("#" +usid.id+ "").attr("src", dataArr[j].base64)
                }
              }
            }
          }(i)
          //删除图标
          lilength[i].getElementsByTagName('img')[1].onclick = function(num) {
            return function() {
              var confirm = window.confirm('确定删除吗，删除后将不可撤销')
              if(!confirm){
                return
              }
              alert('删除成功')
              if(dataArr.length == 1) {
                dataArr = [];
                $("ul#showui").html("")
              } else {
                $("ul#showui li:eq(" + num + ")").remove()
                dataArr.splice(num, 1)
              }
            }
          }(i)
          //右箭头图标
          lilength[i].getElementsByTagName('img')[2].onclick = function(num) {
            return function() {
              var list = 0;
              for(var j = 0; j < dataArr.length; j++) {
                list = j
              }
              var datalist = list + 1;
              dataArr.splice(datalist, 0, dataArr[num]);
              dataArr.splice(num, 1)
              var lists = $("ul#showui li").length;
              for(var j = 0; j < lists; j++) {
                var usid = $("ul#showui li")[j].getElementsByTagName('img')[3];
                $("#" + usid.id + "").attr("src", dataArr[j].base64)
              }
            }
          }(i)
        }
      }

      showui.addEventListener("click", function() {
        onclickimg();
      }, true)

      function send(e) {
        _this.submitImg(dataArr, e.innerText)
      }
      handles.on('click', function(e){
        if(!dataArr.length) {
          return alert('请至少选择一张图片');
        }
        send(e.target);
      })
    },
    submitImg(dataArr, text){
      this.advs = []
      for(var j = 0; j < dataArr.length; j++) {
        this.advs.push(dataArr[j])
      }
      if(text === '保存修改'){
        this.saveChange()
      }
    },
    saveChange(){
      var confirm = window.confirm('保存修改后，将不能撤销修改，确定保存么')
      if(!confirm){
        return
      }
      var params = this.$common.setParams([
        {name: 'advs', param: JSON.stringify(this.advs)},
      ])
      this.axios.post('/api/advs/set',params).then(function(res){
        alert('保存成功')
      })
    },

    goback(){
      this.$router.go(-1)
    }
  },
  components: {
    Carousel
  },
}
</script>


<style lang="less">
.advs-admin{
  padding-top: 50px;
  width: 800px;
  margin: 0 auto;
  .upload{
    display: flex;
    margin-bottom: 10px;
  }

  .btnfile {
    padding: 9px 18px;
    background: #40AFFE;
    color: #FFFFFF;
    border-radius: 5px;
    margin-top: 100px;
  }

  .upimg {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border: dashed #999999;
    background: url('../../../assets/img/addimg.svg') no-repeat;
    background-position: 33px;
    display: inline-block;
  }

  .upimg input {
    position: absolute;
    width: 100px;
    height: 100px;
    opacity: 0;
    cursor: pointer;
  }

  #showui {
    display: flex;
    justify-content: flex-start;
    margin: 0;
  }

  #showimg{
    display: inline-block;
  }

  #showui li {
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin-right: 5px;
  }

  #showui li img.showimg {
    width: 100%;
    height: 100%;
  }

  .showdiv {
    position: absolute;
    z-index: 9;
    bottom: 0;
    width: calc(100% - 20px);
    padding: 10px;
    display: flex;
    justify-content: space-around;
    background: rgba(0, 0, 0, .6);
    width: 100%;
  }

  .showdiv img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  #showui li:first-child img.left {
    opacity: .6;
    cursor: no-drop;
  }

  #showui li:last-child img.right {
    opacity: .6;
    cursor: no-drop;
  }

  .oneright {
    opacity: .6;
    cursor: no-drop !important;
  }
  .table.table-bordered{
    margin-bottom: 0;
    th{
      white-space:nowrap;
      text-align: center;
    }
    input{
      width: 100%;
    }
  }
  .btn{
    margin-bottom: 10px;
  }
}

</style>
