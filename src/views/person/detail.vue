<template>
  <div class="detail">
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 col-sm-offset-2 control-label">用户名</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="username" readonly>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 col-sm-offset-2 control-label">密码</label>
            <div class="col-sm-6">
              <input type="password" class="form-control" v-model="password">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 col-sm-offset-2 control-label">姓名</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="name">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 col-sm-offset-2 control-label">手机</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" v-model="phone">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 col-sm-offset-2 control-label">住址</label>
            <div class="col-sm-6">
              <textarea class="form-control" rows="3" v-model="address"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 col-sm-offset-2 control-label">简介</label>
            <div class="col-sm-6">
              <textarea class="form-control" rows="3" v-model="profile"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 col-sm-offset-2 control-label">头像</label>
            <div class="col-sm-6">
              <div class="upload">
                <div class="upimg">
                  <input type="file" id="upgteimg" value>
                  <!-- <button class="btn btnfile" id="submit">开始上传</button> -->
                </div>
                <div id="showimg">
                  <ul id="showui"></ul>
                  <div id="showinput"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-6 col-sm-offset-4">
              <button class="btn btn-success" type="button" id="submit">保存资料</button>
              <button class="btn btn-warning" type="button">重置资料</button>
              <button class="btn btn-danger" type="button">返回</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      username: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      profile: "",
      headImg: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 初始化数据
      var params = this.$common.setParams([
        {name: 'id', param: this.$route.query.id},
      ])
      this.axios.post("/api/user/register/getdetail", params).then(res => {
        this.username = res.data.username;
        this.password = res.data.password;
        this.name = res.data.name;
        this.phone = res.data.phone;
        this.address = res.data.address;
        this.profile = res.data.profile;
        this.headImg = res.data.headImg;
        if(this.headImg){
            var result =
            `<div class="showdiv">
                    <img class="center" src="http://img2.3png.com/d134d326ddd9a679b6baacdd90e5ef6d1aff.png" />
                </div>` +
            '<img id="img' +
            "" +
            this.headImg.name +
            '" class="showimg" src="' +
            this.headImg.base64 +
            '" />';
            var li = document.createElement("li");
            li.innerHTML = result;
            document.getElementById("showui").appendChild(li);
        }
        this.initUpload();
      });
    },
    initUpload() {
      // 初始化图片插件
      var input = document.getElementById("upgteimg");
      var showui = document.getElementById("showui");
      var result;
      var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
      var fd; //FormData方式发送请求
      var showinput = document.getElementById("showinput");
      var oSubmit = document.getElementById("submit");
      var dateli, dateinput;
      var _this = this;
      //  初始化的时候将原有图片数据保存起来
      if(_this.headImg !== 'undefined'){
        dataArr.push(_this.headImg);
      }
      function randomString(len) {
        len = len || 32;
        var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ var maxPos =
          $chars.length;
        var pwd = "";
        for (var i = 0; i < len; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
      }
      if (typeof FileReader === "undefined") {
        alert("抱歉，你的浏览器不支持 FileReader");
        input.setAttribute("disabled", "disabled");
      } else {
        input.addEventListener("change", readFile, false);
      }

      function readFile() {
        if (dataArr.length >= 2) {
          alert("头像最多只能选择一张！如果想更换头像请先删除原有的头像...");
          return;
        }
        fd = new FormData();
        var iLen = this.files.length;
        var index = 0;
        var currentReViewImgIndex = 0;
        for (var i = 0; i < iLen; i++) {
          if (!input["value"].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {
            //判断上传文件格式
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
              base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
            };
            dataArr.push(imgMsg);
            for (var j = 0; j < dataArr.length; j++) {
              currentReViewImgIndex = j;
            }
            result =
              `<div class="showdiv">
            <img class="center" src="data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgaWQ9IiVFNSU4OCVBMCVFOSU5OSVBNCIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHN0eWxlPSJ3aWR0aDoyNTZweDtoZWlnaHQ6MjU2cHg7IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAyNCAxMDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsPSIjNjY2IiBkPSJNNjgxLjkgMzQwLjk1IGwwIDQ1NS4zNyBsNTcuMjEgMCBsMCAtNDU1LjM3IGwtNTcuMjEgMCBsMCAwIFpNNDgzLjk3IDc5Ni4zMiBsMCAtNDU1LjM3IGw1Ni4wNiAwIGwwIDQ1NS4zNyBsLTU2LjA2IDAgbDAgMCBaTTI4NC44OSAzNDAuOTUgbDAgNDU1LjM3IGw1Ni4wNiAwIGwwIC00NTUuMzcgbC01Ni4wNiAwIGwwIDAgWk03MzkuMTEgMTcwLjQ4IGwyODQuODkgMCBsMCA1Ny4yIGwtMTE0LjQxIDAgbDAgNzM5LjExIHEwIDI0LjAzIC0xNi4wMiA0MC4wNSBxLTE2LjAyIDE2LjAyIC00MS4xOSAxNi4wMiBsLTY4MS45IDAgcS0yNC4wMyAwIC00MC4wNSAtMTYuMDIgcS0xNi4wMiAtMTYuMDIgLTE2LjAyIC00MC4wNSBsMCAtNzM5LjExIGwtMTE0LjQxIDAgbDAgLTU3LjIgbDI4NC44OSAwIGwwIC0xMTMuMjcgcTAgLTI0LjAzIDE2LjAyIC00MC4wNSBxMTYuMDIgLTE2LjAyIDQwLjA0IC0xNy4xNiBsMzQwLjk1IDAgcTI1LjE3IDEuMTQgNDEuMTkgMTcuMTYgcTE2LjAyIDE2LjAyIDE2LjAyIDQwLjA1IGwwIDExMy4yNyBsMCAwIFpNMzQwLjk1IDU3LjIxIGwwIDExMy4yNyBsMzQwLjk1IDAgbDAgLTExMy4yNyBsLTM0MC45NSAwIGwwIDAgWk04NTIuMzggOTY2Ljc5IGwwIC03MzkuMTEgbC02ODEuOSAwIGwwIDczOS4xMSBsNjgxLjkgMCBsMCAwIFoiLz48L3N2Zz4=" />
            </div>` +
              '<img id="img' +
              currentReViewImgIndex +
              randomString(1) +
              randomString(2) +
              randomString(5) +
              '" class="showimg" src="' +
              this.result +
              '" />';
            var li = document.createElement("li");
            li.innerHTML = result;
            showui.appendChild(li);
            index++;
          };
        }
      }

      function onclickimg() {
        var dataArrlist = dataArr.length;
        var lilength = document.querySelectorAll("ul#showui li");
        for (var i = 0; i < lilength.length; i++) {
          //删除图标
          lilength[i].getElementsByTagName("img")[0].onclick = (function(num) {
            return function() {
              if (dataArr.length == 1) {
                dataArr = [];
                $("ul#showui").html("");
              } else {
                $("ul#showui li:eq(" + num + ")").remove();
                dataArr.splice(num, 1);
              }
            };
          })(i);
        }
      }

      showui.addEventListener(
        "click",
        function() {
          onclickimg();
        },
        true
      );

      function send() {
        _this.submitImg(dataArr);
      }
      oSubmit.onclick = function() {
        if (!dataArr.length) {
          return alert("请先选择文件");
        }
        send();
      };
    },
    submitImg(dataArr) {
      // 上传图像
      this.headImg = [];
      for (var j = 0; j < dataArr.length; j++) {
        this.headImg.push(dataArr[j]);
      }
      this.submitData();
    },
    submitData() {
      // 提交数据
      var params = this.$common.setParams([
        {name: 'id', param: this.$route.query.id},
        {name: 'headImg', param: JSON.stringify(this.headImg[0])},
        {name: 'username', param: this.username},
        {name: 'password', param: this.password},
        {name: 'name', param: this.name},
        {name: 'phone', param: this.phone},
        {name: 'address', param: this.address},
        {name: 'profile', param: this.profile},
      ])
      var result = window.confirm('保存后，将不能进行重置操作，确定保存吗？')
      if(result){
        this.axios.post("/api/user/register/setdetail", params).then((res)=>{
          alert('保存成功')
          this.$store.dispatch('setDetail', {
            name: this.name,
            address: this.address,
            phone: this.phone
          })
        });
      }
    }
  }
};
</script>


<style lang="less">
.detail {
  padding-top: 80px;
  .upload {
    display: flex;
    margin-bottom: 50px;
  }

  .btnfile {
    padding: 9px 18px;
    background: #40affe;
    color: #ffffff;
    border-radius: 5px;
    margin-top: 100px;
  }

  .upimg {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border: dashed #999999;
    background: url("../../assets/img/addimg.svg") no-repeat;
    background-position: 33px;
    display: inline-block;
  }

  .upimg input {
    position: absolute;
    width: 100px;
    height: 100px;
    opacity: 0;
  }

  #showui {
    display: flex;
    justify-content: flex-start;
    margin: 0;
  }

  #showimg {
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
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
  }

  .showdiv img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  #showui li:first-child img.left {
    opacity: 0.6;
    cursor: no-drop;
  }

  #showui li:last-child img.right {
    opacity: 0.6;
    cursor: no-drop;
  }
  .oneright {
    opacity: 0.6;
    cursor: no-drop !important;
  }
}
</style>
