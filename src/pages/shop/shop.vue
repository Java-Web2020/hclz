<template>
    <div>
        <div class="background">
    <img :src="imglogin" width="100%" height="100%" alt="" />
  </div>
    <div style="width: 200px; margin: 0 auto; margin-top: 50%;">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <el-input maxlength="6" style="width: 200px;" v-model="input"  type="text" pattern="[0-9]*"  placeholder="请输入警号" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        <br>
        <el-button style="margin-top: 50px;width: 200px;" type="success" @click="btn">提交</el-button>

    </div>
    </div>
    </template>
        <script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
        <script>
    $(document).ready(function(){
        function onBridgeReady(){
         WeixinJSBridge.call('hideOptionMenu');
        }
        
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else{
            onBridgeReady();
        }
    })
    </script>
    <script>
    export default {
    components:{
     },
    data () {
     return {
        input:"",
        imglogin:require('../../assets/img/police.jpg'),

     }
    },
    computed: {

},
    methods:{
        btn(){
            console.log(this.input.length);
                if(this.input.length<6){
                    this.$message.error('请输入正确的警号');
                } else{
                    this.$router.push('/choose')
                }
        },
        
    },
    mounted(){
       




        
    }
    }
    </script>
    <style scoped>
    .background{
     left: 0;
    top: 0;
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute
}
    </style>