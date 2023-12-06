<template>
    <div>
        <div class="background">
    <img :src="imglogin" width="100%" height="100%" alt="" />
  </div>
    <div style="margin-left:100px ;">
        <el-button style="width: 200px; font-size: 8px;"  type="primary" @click="a()">北京清河万象汇在营商户“警员”专属权益</el-button>
        <br>
        <el-button  style="width: 200px; font-size: 8px;" type="primary" @click="b()">华联万柳购物中心海淀分局品牌优惠活动</el-button>
        <br>
        <el-button  style="width: 200px; font-size: 8px;" type="primary" @click="c()">华熙优惠内容</el-button>
        <br>
        <el-button  style="width: 200px;font-size: 10px;" type="primary" @click="d()">英嘉国际影城（金源CINITY店）</el-button>
    </div>
</div>
    </template>
    <script>
    export default {
    components:{
     },
    data () {
     return {
        imglogin:require('../../assets/img/police.jpg'),
     }
    },
    methods:{
        a(){
            this.$router.push('/store1');
        },
        b(){
            this.$router.push('/store3');
        },
        c(){
            this.$router.push('/store4');
        },
        d(){
            this.$router.push('/store2');
        },
    },
    mounted(){
    }
    }
    </script>
    <style scoped>
    .el-button{
        margin-top: 20%;
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