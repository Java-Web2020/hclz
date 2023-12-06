<template>
  <div style="margin-top: 50px;">
    <div style="font-size:15px;font-weight: bolder;">英嘉国际影城（金源CINITY店）购票享受门市价四折优惠</div>
    <el-button
    
        type="primary"
       style="width: 100%;margin-top: 50px;"
          @click="handleEdit()">领取</el-button>
          <el-dialog title="领取优惠券" :visible.sync="dialogTableVisible"  width="100%">
<div class="aaa" >
    <vue-canvas-poster
      :widthPixels="0"
      :painting="painting"
      @success="success"
      @fail="fail"

    ></vue-canvas-poster>
    <!-- <img style="margin-left: 10%;" :src="posterImg" /> -->
    <el-image
      :src="posterImg"
     ></el-image>
  </div>
  <div>长按图片保存优惠券</div>
</el-dialog>
  </div>
  </template>
  <script>
  export default {
  components:{
   },
  data () {
   return {
    dialogTableVisible: false,
    painting: {
        // width: "319px",
        // height: "141px",
        width: "638px",
        height: "283px",
        views: [
          {
            type: "image",
            url: require("../../assets/img/movie.jpg"),
            css: {
            //   width: "319px",
            //   height: "141px",
            width: "638px",
            height: "283px",
            },
          },
          {
            type: "qrcode",
            content: "19263",
            css: {
              top: `${document.documentElement.clientWidth / 1}px`,
              left: `${document.documentElement.clientWidth / 2.5}px`,
              color: "#333",
              width: `${document.documentElement.clientWidth / 5}px`,
              height: `${document.documentElement.clientWidth / 5}px`,
            },
          },
        ],
      },
      posterImg: "",
   }
  },
  methods:{
    success(src) {
      console.log(src);
      this.posterImg = src;
    },
    fail(err) {
      console.log("fail", err);
    },
    handleEdit(a,b){
            this.dialogTableVisible=true
        }
  },
  mounted(){
  }
  }
  </script>
  <style scoped>
  </style>