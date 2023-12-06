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
          <span style="text-align:center" class="login-title">注册账号</span>
          <div style="margin-top: 5px"></div>
          <el-form-item label="用户名" prop="loginName">
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
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-col :span="22">
              <el-input type="text" v-model="loginForm.phone"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="code" prop="loginName">
            <el-col :span="22">
              <el-input :disabled="true" type="text" v-model="loginForm.code"></el-input>
            </el-col>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="loginSubmit()"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div></el-col>
    
    </el-row>
      
      </div>
    </template>
    <script>
    import{reqwxzhuce}from '../../util/request'
    import {mapGetters,mapActions}from 'vuex'
    export default {
      components: {
        
      },
      data() {
        return {
          loginForm: {
            username: "",
            password: "",
            phone: "",
            code:""
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
          loginSubmit(){
            reqwxzhuce(this.loginForm).then((res)=>{
          //     this.$message({
          //   showClose: true,
          //   message: res.data.error,
          //   type: "success",
          // });
          if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "success",
          });
          this.loginForm=""
        }
          if (res.data.code != 200) {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "warning",
          });
        }

          
            })
              // this.$router.push('/index/Issue')
          }
      },
      created(){

const params = new URLSearchParams(location.search);
this.loginForm.code = params.get('code');
  console.log(this.loginForm.code)
},
      mounted() {},
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