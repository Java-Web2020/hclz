<template>
  <div>
    <el-container>
  <el-header>
<el-menu
  
  class="el-menu-demo"
  mode="horizontal"
  router
  :default-active="activerouter"
  background-color="#1a21a0"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item  class="xt"><i class="el-icon-s-tools"></i>发票系统 >>></el-menu-item>
  <!-- <div :key="i" v-for="(item, i) in from"> 
    <el-menu-item style="float:right" class=" hidden-xs-only" :index="item">{{i}}</el-menu-item>
  </div> -->
  <div> 
    <el-menu-item style="float:right" class=" hidden-xs-only" index="/index_fp/Issue_fp">发票上传</el-menu-item>
    <el-menu-item style="float:right" class=" hidden-xs-only" index="/index_fp/Issue_fbfp">发票添加</el-menu-item>
    <el-menu-item style="float:right" class=" hidden-xs-only" index="/index_fp/view_fp">发票信息</el-menu-item>
    <!-- <el-menu-item style="float:right" class=" hidden-xs-only" index="/index_fp/Issue_fp">发票发布</el-menu-item>
    <el-menu-item style="float:right" class=" hidden-xs-only" index="/index_fp/Issue_fp">发票发布</el-menu-item>
    <el-menu-item style="float:right" class=" hidden-xs-only" index="/index_fp/Issue_fp">发票发布</el-menu-item> -->
  </div>

  
    
</el-menu>



  </el-header>
  <el-main>

        <!-- 二级路由出口 -->

        <div class="content">
          <transition name="fade" mode="out-in">
          <router-view v-slot="{ Component }">
  
         <keep-alive>
           <component :is="Component" />
         </keep-alive>
     
     </router-view>
    </transition>
    </div>
          <!-- <router-view></router-view> -->
            
  </el-main>
</el-container>
  </div>
</template>
<script>
import {reqqx}from '../../util/request'
export default {
  components: {},
  data() {
    return {
      imgUrl1: require("../../assets/img/1.jpeg"),
      imgUrl2: require("../../assets/img/2.png"),
       url: 'http://192.168.8.40:84/',
       drawer: false,

       from:{

       },
       activerouter:""
    };
  },
  methods: {
          tiaozhuan() {
        window.location.href = this.url;
      },
  },
  created(){
    this.activerouter = this.$route.path;
  },

  mounted() {
        reqqx().then(res=>{
            this.from=res.data
            localStorage.setItem("routerList",JSON.stringify(this.from))
        })
        console.log(this.$route.path)




        this.activerouter = this.$route.path;
    
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #1a21a0;
  color: #333;
  font-size: 12px;
  position: relative;
  padding-left: 100px;
  /* border-bottom: 3px solid #d26300; */
  
}
.el-header img {
  display: block;
  height: 65px;
  position: absolute;
  left: 0;
}
.el-aside {
  background-color: #1a21a0;
  color: #333;
  /* text-align: center; */
  height: 863px;
  position: relative;
}
.el-aside img {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.4;
}

.el-main {
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  padding: 0 10px;
}
/* 图标的样式 */
.el-icon-s-operation {
    color: white;
}
.el-menu-item.is-active {
  color: #fff !important;
  background-color: rgb(69, 49, 204) !important;
}
.fade-enter-from,
.fade-leave-to {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(20px);
}
.fade-enter-to {
  transform: translateX(-10px);
}
.fade-enter-to,
.fade-leave-from {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}
.fade-leave-active,.fade-enter-active {
  transition: all 0.5s ease-out;
}
.content{
  position: relative;
  overflow: hidden;
}
</style>  
<style lang='scss'>

  .el-header[data-v-1badc801]{
    padding: 0;
    
  }
  

</style>