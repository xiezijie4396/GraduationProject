<template>
  <div class="goods-add">
    <form>
      <div class="form-group">
        <label>商品名称</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <label>商品图片</label>
      <div class="upload form-group">
        <div class="upimg">
          <input type="file" id="upgteimg" value="" multiple />
        </div>
        <div id="showimg">
            <ul id="showui"></ul>
            <div id="showinput"></div>
        </div>
      </div>
      <div class="form-group">
        <label>商品价格</label>
        <input type="text" class="form-control" v-model="price">
      </div>
      <div class="form-group">
        <label>商品数量</label>
        <input type="number" class="form-control" v-model="num">
      </div>
      <div class="form-group">
        <label>详情参数</label>
        <div class="tab">
          <ul id="myTab" class="nav nav-tabs">
              <li><a href="#details" data-toggle="tab">基本参数</a></li>
              <li><a href="#ios" data-toggle="tab">存储</a></li>
              <li><a href="#rated" data-toggle="tab">显示</a></li>
              <li class="active"><a href="#rateaa" data-toggle="tab">包装清单</a></li>
          </ul>
          <div id="myTabContent" class="tab-content">
              <!-- 基本参数 -->
              <div class="tab-pane fade" id="details">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>品牌</th>
                        <th>系列</th>
                        <th>操作系统</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" v-model="brand"></td>
                        <td><input type="text" v-model="series"></td>
                        <td><input type="text" v-model="OS"></td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>显卡类型</th>
                        <th>CPU</th>
                        <th>厚度</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" v-model="videoType"></td>
                        <td><input type="text" v-model="CPU"></td>
                        <td><input type="text" v-model="ply"></td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <!-- 存储 -->
              <div class="tab-pane fade" id="ios">
                <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>显存容量</th>
                        <th>机械硬盘容量</th>
                        <th>固态硬盘</th>
                        <th>内存容量</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" v-model="video"></td>
                        <td><input type="text" v-model="mechanical"></td>
                        <td><input type="text" v-model="solidState"></td>
                        <td><input type="text" v-model="memory"></td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <!-- 显示 -->
              <div class="tab-pane fade" id="rated">
                <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>屏幕尺寸</th>
                        <th>分辨率</th>
                        <th>是否触摸屏</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" v-model="screen"></td>
                        <td><input type="text" v-model="resolution"></td>
                        <td><input type="text" v-model="touch"></td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <!-- 包装清单 -->
              <div class="tab-pane fade in active" id="rateaa">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#goodsModal" style="margin: 10px 0">添加包装件</button>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>包装件名称</th>
                      <th>包装件数量</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(pack, index) in packList" :key="index">
                      <td>{{pack.packName}}</td>
                      <td>{{pack.packNum}}</td>
                      <td align="center">
                        <a href="#">修改</a>
                        <a href="#">删除</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div> 
        </div>
      </div>
      <div class="form-group">
        <label>商品详情</label>
        <div id="editor"></div>
      </div>
      <div class="form-group text-right">
        <button type="button" id="add" class="btn btn-success">添加</button>
        <button type="button" class="btn btn-danger" @click="goBack">返回</button>
      </div>
    </form>
    <div class="modal fade" id="goodsModal" tabindex="-1" role="dialog" style="z-index:30000">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">添加包装件</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="packName">包装件名称</label>
              <input type="text" class="form-control" id="packName" v-model="packName">
            </div>
            <div class="form-group">
              <label for="packNum">包装件数量</label>
              <input type="number" class="form-control" id="packNum" v-model="packNum">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="savaPack">保存</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
var E = require('wangeditor')  // 使用 npm 安装
export default {
  name: 'goodsAdd',
  data () {
    return {
      upLoadImg: [],      // 用户上传的图片
      name: '',      // 商品名称
      price: '',     // 商品价格
      num: 0,        // 商品数量
      params: [],    // 基本参数
        brand: '',       // 品牌
        series: '',      // 系列
        OS: '',          // 操作系统
        videoType: '',   // 显卡类型
        CPU: '',         // CPU
        ply: '',         // 厚度
      storage: [],   // 存储
        video: '',       // 显存容量
        mechanical: '',  // 机械硬盘容量
        solidState: '',  // 固态硬盘
        memory: '',      // 内存容量
      show: [],      // 显示
        screen: '',      // 屏幕尺寸
        resolution: '',  // 分辨率
        touch: '',       // 是否触摸屏
      packList: [],       // 包装清单
        packName: '',         // 包装件名称
        packNum: 0,           // 包装件数量
      detail: ''     // 商品详情
    }
  },
  components: {
    
  },
  mounted(){
    this.initEditor()
    this.initUpload()
  },
  computed: {
    salerId(){
      return this.$store.state.login.userId
    },
    userName(){
      return this.$store.state.login.username
    }
  },
  methods:{
    //  初始化富文本编辑器
    initEditor(){
      var editor = new E('#editor')
      editor.customConfig.uploadImgShowBase64 = true    // 使用 base64 保存图片
      editor.customConfig.showLinkImg = false           // 隐藏“网络图片”tab
      editor.create()
    },
    // 初始化上传图片插件
    initUpload(){
      var input = document.getElementById("upgteimg");
      var showui = document.getElementById("showui");
      var result;
      var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
      var fd; //FormData方式发送请求
      var showinput = document.getElementById("showinput");
      var oSubmit = document.getElementById("add");
      var dateli, dateinput;
      var _this = this;
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
        if (dataArr.length >= 1) {
          alert("图片最多只能选择一张！如果想更换图片请先删除原有的图片...");
          return;
        }
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
            <img class="center" src="http://img2.3png.com/d134d326ddd9a679b6baacdd90e5ef6d1aff.png" />
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
          //删除图标
          lilength[i].getElementsByTagName('img')[0].onclick = function(num) {
            return function() {
              if(dataArr.length == 1) {
                dataArr = [];
                $("ul#showui").html("")
              } else {
                $("ul#showui li:eq(" + num + ")").remove()
                dataArr.splice(num, 1)
              }
            }
          }(i)
        }
      }

      showui.addEventListener("click", function() {
        onclickimg();
      }, true)

      function send() {
        _this.submitImg(dataArr)
      }
      oSubmit.onclick = function() {
        if(!dataArr.length) {
          return alert('请先选择文件');
        }
        send();
      }
    },
    // 保存包装清单
    savaPack(){
      if(this.packName === ''){
        alert('请输入包装件名称')
        return
      }
      if(this.packNum === 0){
        alert('包装件数量不能为0')
        return
      }
      this.packList.push({
        packName: this.packName,
        packNum: this.packNum
      })
      alert('保存成功')
      $('#goodsModal').modal('hide')
      this.packName = ''
      this.packNum = 0
    },
    // 添加
    add(){
      this.params = []
      this.params.push({
        brand: this.brand,
        series: this.series,
        OS: this.OS,
        videoType: this.videoType,
        CPU: this.CPU,
        ply: this.ply,
      })
      this.storage = []
      this.storage.push({
        video: this.video,
        mechanical: this.mechanical,
        solidState: this.solidState,
        memory: this.memory,
      })
      this.show = []
      this.show.push({
        screen: this.screen,
        resolution: this.resolution,
        touch: this.touch,
      })
      this.detail = $('.w-e-text').html()

      var params = this.$common.setParams([
        {name: 'params', param: JSON.stringify(this.params[0])},
        {name: 'storage', param: JSON.stringify(this.storage[0])},
        {name: 'show', param: JSON.stringify(this.show[0])},
        {name: 'detail', param: this.detail},
        {name: 'upLoadImg', param: JSON.stringify(this.upLoadImg)},
        {name: 'name', param: this.name},
        {name: 'price', param: this.price},
        {name: 'num', param: this.num},
        {name: 'packList', param: JSON.stringify(this.packList)},
        {name: 'saler', param: this.userName},
        {name: 'salerId', param: this.salerId},
        {name: 'originalNum', param: this.num},
      ])

      this.axios.post('/api/goods/add',params).then((res)=>{
        alert(res.data.msg)
        if(res.data.status > 0){
          this.$router.push({
            path: '/goods-admin'
          })
        }
      })
    },
    submitImg(dataArr){
      this.upLoadImg = []
      for(var j = 0; j < dataArr.length; j++) {
        this.upLoadImg.push(dataArr[j])
      }
      this.add()
    },
    goBack(){
      this.$router.go(-1)
    }
  },
  
}
</script>


<style lang="less">
.goods-add{
  padding-top: 50px;
  width: 800px;
  margin: 0 auto;
  .upload{
    display: flex;
    margin-bottom: 20px;
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
    th, td{
      white-space:nowrap;
      text-align: center;
    }
    input{
      width: 100%;
      text-align: center;
    }
  }
}
</style>
