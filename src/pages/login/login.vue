<template>
<div class="login">
         <div class="background">
    <img :src="imglogin" width="100%" height="100%" alt="" />
  </div>
      <el-row>
  <el-col :span="24">
  

      <div class="login-box">
    <el-form
      :rules="loginFormRules"
      ref="loginForm"
      :model="loginForm"
      label-position="right"
      label-width="auto"
      show-message
    >
      <span style="text-align:center" class="login-title">欢迎登录</span>
      <div style="margin-top: 5px"></div>
      <!-- <el-form-item label="用户名" prop="loginName">
        <el-col :span="22">
          <el-input type="text" v-model="loginForm.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password" @keyup.enter.native='submit($event)'>
        <el-col :span="22">
          <el-input
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-col>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button type="primary" @click="loginSubmit()"
          >登录</el-button
        > -->
       <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33662b971bf8e076&redirect_uri=http%3A%2F%2Fwww.hclz.top%2Fwx_zhuce&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect">
        <el-button id="btn_zc" type="primary" style="margin-top: 5px;" @click="onRegit()">微信绑定注册</el-button>
       </a> 
      <br id="br1">

        <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33662b971bf8e076&redirect_uri=http%3A%2F%2Fwww.hclz.top%2Flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect">
          <el-button id="btn_bd" style="margin-top: 5px;" type="primary" >微信授权登录</el-button>
       </a> 
      <br id="br2">

  <el-button style="margin-top: 5px;" type="primary" @click="saoma()">微信扫码登录</el-button>

  
      </el-form-item>
    </el-form>
  </div></el-col>

</el-row>

  <div id="close" @click="close()" style="display: none; color: black; font-size: 30px; position: absolute; top: 50%;  left: 50%;margin-left: -127px; margin-top: -200px;  z-index: 99999;">X</div>
  <div  style="position: absolute; display: none; top: 50%; left: 50%; background-color: white; margin-left: -150px; margin-top: -200px; "  id="login_container"></div>


  </div>
</template>
<script>
import{requserLogin,reqwxdl,reqwxsmdl}from '../../util/request'
import wxlogin from 'vue-wxlogin'
import {mapGetters,mapActions}from 'vuex'
export default {
  components: {
    
  },
  data() {
    return {
      drawer:false,
      code:"",
      sm_code:"",
      state:"",
      loginForm: {
        username: "",
        password: "",
        
      },
imglogin:require('../../assets/img/login.jpg'),
      loginFormRules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      reqestuserList:'user/reqestuserList'
    }),

    getUrlCode() { // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        var strs = str.split("&")
        for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
        }
      }
      return theRequest
    },
    
submit(ev){
  if(ev.keyCode==13){
            requserLogin(this.loginForm).then((res)=>{
          if(res.data.code==200){
                this.reqestuserList(res.data.lists)
                 this.$router.push('/index/Issue')
                // sessionStorage.setItem("token", JSON.stringify(res.data.token));
                 localStorage.setItem("token", res.data.token);
          }else{
          this.$message({
            showClose: true,
          message:res.data.data,
          type: 'warning'
        });
          }
        })
  }
},
      loginSubmit(){
        requserLogin(this.loginForm).then((res)=>{
          if(res.data.code==200){
                this.reqestuserList(res.data.lists)
                 this.$router.push('/index/Issue')
                // sessionStorage.setItem("token", JSON.stringify(res.data.token));
                 localStorage.setItem("token", res.data.token);
          }else{
          this.$message({
            showClose: true,
          message:res.data.data,
          type: 'warning'
        });
          }
        
        })
          // this.$router.push('/index/Issue')
      },
      wxdl(){
        reqwxdl({code:this.code}).then((res)=>{
          if(res.data.code==200){
                this.reqestuserList(res.data.lists)
                 this.$router.push('/index/Issue')
                // sessionStorage.setItem("token", JSON.stringify(res.data.token));
                 localStorage.setItem("token", res.data.token);
          }else{
          this.$message({
            showClose: true,
          message:res.data.data,
          type: 'warning'
        });
          }
        
        })
      },
      wxsmdl(){
        reqwxsmdl({code:this.sm_code}).then((res)=>{
          if(res.data.code==200){
                this.reqestuserList(res.data.lists)
                 this.$router.push('/index/Issue')
                // sessionStorage.setItem("token", JSON.stringify(res.data.token));
                 localStorage.setItem("token", res.data.token);
          }else{
          this.$message({
            showClose: true,
          message:res.data.data,
          type: 'warning'
        });
          }
        
        })
      },


      saoma(){
        var login_container=document.getElementById("login_container")
        var close=document.getElementById("close")
        login_container.style.display="block"
        close.style.display="block"
        
          },
          close(){
            var login_container=document.getElementById("login_container")
        var close=document.getElementById("close")
        login_container.style.display="none"
        close.style.display="none"
          },
      saoma_pic(){
  
        var obj = new WxLogin
        ({
            id:"login_container",//div的id
            appid: "wxa3e4a35b198059c4",
            scope: "snsapi_login",//写死
            redirect_uri:"http%3A%2F%2Fwww.hclz.top%2Flogin" ,
            state: "1",
            style: "black",//二维码黑白风格        
            href: ""
        });
          }
      
  },
  created(){

    const params = new URLSearchParams(location.search);
			this.code = params.get('code');
			this.state = params.get('state');
			this.sm_code = params.get('code');
      console.log(this.code)
      
  },
  mounted() {

    if(this.sm_code!=null&&this.state==1){
  this.wxsmdl()
}
if(this.code!=null&&this.state=="STATE"){
  this.wxdl()
}
this.saoma_pic()

if (/(micromessenger)/i.test(navigator.userAgent)) { 
 //是否电脑微信或者微信开发者工具
  if(/(WindowsWechat)/i.test(navigator.userAgent) || /(wechatdevtools)/i.test(navigator.userAgent)){
  }else{
    //手机微信打开的浏览器
  }
} else {
    this.saoma()
    var btn_zc=document.getElementById("btn_zc")
        var btn_bd=document.getElementById("btn_bd")
    var br1=document.getElementById("br1")
        var br2=document.getElementById("br2")
        btn_zc.style.display="none"
        btn_bd.style.display="none"
        br1.style.display="none"
        br2.style.display="none"
}
  }
  


  
};
</script>
<style scoped>
.login{
    height: 100vh;
}
.login-box {
    text-align: center;
  border: 1px solid #dcdfe6;
  width: 280px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px rgb(0, 0, 0);
}
.el-col .login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #f76a0cd3;
  font-size: 30px;
  font-weight: bold;
}
.background{
     left: 0;
    top: 0;
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute
}

</style>
<style lang="scss">

.el-col .login-title {
    width: 100%;
  text-align: center;
  margin: 0 auto 40px auto;
  color: #66cd00;
  font-size: 30px;
  font-weight: bold;
}
.login .el-form-item__content{
    margin-left: 0px;
}
</style>