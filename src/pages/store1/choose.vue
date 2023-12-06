<template>
    <div id="choose">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <el-table 
        @row-click="clickTable"
        ref="refTable"
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="备注：">
            <span>{{ props.row.bz }}</span>
          </el-form-item>
          <el-divider><i class="el-icon-time"></i></el-divider>
          <el-form-item label="店铺号：">
            <span>{{ props.row.dj }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商店名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="折扣信息(折)"
      prop="zk">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="店铺搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
        type="primary"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">领取</el-button>
      </template>

    </el-table-column>
  </el-table>

<!-- 图片 -->
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
    import QRCode from 'qrcodejs2'
    import html2canvas from 'html2canvas'
    import VueCanvasPoster from "vue-canvas-poster";
    export default {
    components:{
     },
    data () {
     return {
        // 弹出框
        dialogTableVisible: false,
        painting: {
        // width: "319px",
        // height: "141px",
        width: "638px",
        height: "283px",
        views: [
          {
            type: "image",
            url: require("../../assets/img/hb.jpg"),
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
          {
            type: "text",
            text: "",
            css: [
              {
                top: "190px",
                left:"100px",
                color: "#d70d18",
                fontSize: "19px",
                fontWeight:"900"
              },
            ],
          },
          {
            type: "text",
            text: "",
            css: [
              {
                top: "180px",
                left: "295px",
                color: "#d70d18",
                fontSize: "30px",
                width:"80px",
                fontWeight:"900"
              },
            ],
          },
          {
            type: "text",
            text: "",
            css: [
              {
                top: "214px",
                left: "130px",
                color: "white",
                fontSize: "17px",
              },
            ],
          },
        ],
      },
      posterImg: "",

      tableData:[
    {
        "dj": "L564",
        "name": "眉州东坡",
        "zk": "8.8折",
        "bz": " "
    },
    {
        "dj": "L653A",
        "name": "肉问屋",
        "zk": "8折",
        "bz": "不与其他活动同享（含套餐）"
    },
    {
        "dj": "L566",
        "name": "羲和雅苑",
        "zk": "9折",
        "bz": " "
    },
    {
        "dj": "L650A",
        "name": "水木锦堂",
        "zk": "9.5折",
        "bz": " "
    },
    {
        "dj": "L650B",
        "name": "莆田",
        "zk": "9折",
        "bz": "套餐除外"
    },
    {
        "dj": "L551",
        "name": "蔡澜",
        "zk": "8折",
        "bz": " "
    },
    {
        "dj": "L662",
        "name": "泰香米",
        "zk": "8折",
        "bz": "不与其他活动同享"
    },
    {
        "dj": "L101",
        "name": "奈雪的茶",
        "zk": "9.5折",
        "bz": " "
    },
    {
        "dj": "L124",
        "name": "多乐之日",
        "zk": "9折",
        "bz": "不与其他优惠同享"
    },
    {
        "dj": "L1S0101",
        "name": "GODIVA",
        "zk": "9折",
        "bz": "不与其他活动同享"
    },
    {
        "dj": "L402",
        "name": "西堤牛排",
        "zk": "9折",
        "bz": "不与其他优惠同享"
    },
    {
        "dj": "L651",
        "name": "黑牛的场",
        "zk": "单点8.8折",
        "bz": "套餐除外，不可与其他优惠同享"
    },
    {
        "dj": "L654",
        "name": "滇大池",
        "zk": "9折",
        "bz": "不与其他活动同享"
    },
    {
        "dj": "L369",
        "name": "必胜客",
        "zk": "8折",
        "bz": " "
    },
    {
        "dj": "L391",
        "name": "Taco Bell",
        "zk": "8.5折",
        "bz": " "
    },
    {
        "dj": "L562",
        "name": "外婆家",
        "zk": "每桌赠送1扎扎酸梅汁",
        "bz": " "
    },
    {
        "dj": "L504",
        "name": "江边城外",
        "zk": "9折",
        "bz": "不与其他优惠同享"
    },
    {
        "dj": "L4K10",
        "name": "西村叔叔の店",
        "zk": "8.5折",
        "bz": " "
    },
    {
        "dj": "L505",
        "name": "西贝莜面村",
        "zk": "9折",
        "bz": "不与其他优惠同享"
    },
    {
        "dj": "L407",
        "name": "南京大牌档",
        "zk": "8.8折",
        "bz": " "
    },
    {
        "dj": "L656",
        "name": "汤城小厨",
        "zk": "9折",
        "bz": "酒水、饮料、甜品不享受折扣"
    },
    {
        "dj": "L567",
        "name": "六丁烧锅",
        "zk": "8.5折",
        "bz": " "
    },
    {
        "dj": "L658",
        "name": "一麻一辣",
        "zk": "9折",
        "bz": "不与其他活动同享"
    },
    {
        "dj": "L306",
        "name": "阿芮烤鸡爪",
        "zk": "9折",
        "bz": "酒水除外，不与其他活动同享"
    },
    {
        "dj": "L307",
        "name": "夸父炸串",
        "zk": "8.8折",
        "bz": "不与其他优惠同享"
    },
    {
        "dj": "L312",
        "name": "拾烧",
        "zk": "9折",
        "bz": " "
    },
    {
        "dj": "L313",
        "name": "野人牧坊",
        "zk": "9折",
        "bz": " "
    },
    {
        "dj": "L316",
        "name": "DQ",
        "zk": "9折",
        "bz": " "
    },
    {
        "dj": "L371B",
        "name": "软软星球",
        "zk": "门票半价，餐费8折",
        "bz": " "
    },
    {
        "dj": "L4k02",
        "name": "yomi",
        "zk": "8折",
        "bz": "手工冰糕除外"
    },
    {
        "dj": "L305",
        "name": "鱼本鱼",
        "zk": "8.8折",
        "bz": "不与其他优惠同享"
    },
    {
        "dj": "L563",
        "name": "九割",
        "zk": "8.8折",
        "bz": "不与其它优惠同享"
    },
    {
        "dj": "L0311",
        "name": "金烫烫",
        "zk": "全场串品8折",
        "bz": "酒水除外，不与其他优惠同享"
    },
    {
        "dj": "L561",
        "name": "披云云小馆",
        "zk": "9折",
        "bz": "不与其他优惠同享"
    },
    {   "dj": " ",
        "name": "奥睿杰",
        "zk": "所有项目都包括在内，立减500元",
        "bz": " "
    }
],
    search:"",
     }
    },
    methods:{
        handleEdit(a,b){
            console.log(b);
            this.painting.views[2].text=b.name
            this.painting.views[3].text=b.zk
            this.painting.views[4].text=b.bz
            this.dialogTableVisible=true
            console.log( this.painting.views[2].css[0].left);
            if(b.name.length>7){
                this.painting.views[2].css[0].left=100-(b.name.length-7)*8+"px"
            }else if(b.name.length<7){
                this.painting.views[2].css[0].left=100+(7-b.name.length)*20+"px"
            }else{
                this.painting.views[2].css[0].left="100px"
            }
            if(b.zk.length>5){
                this.painting.views[3].css[0].fontSize="16px"
                this.painting.views[3].css[0].top="190px"
                this.painting.views[3].css[0].left="284px"
                this.painting.views[3].css[0].width="90px"
            }else{
                this.painting.views[3].css[0].fontSize="30px"
                this.painting.views[3].css[0].top="180px"
                this.painting.views[3].css[0].left="295px"
            }

        },
        success(src) {
      console.log(src);
      this.posterImg = src;
    },
    fail(err) {
      console.log("fail", err);
    },
    clickTable(row,index,e){ this.$refs.refTable.toggleRowExpansion(row)}

    },
    mounted(){
     
    }
    }
    </script>
    <style scoped>

.el-dialog{
    width: 100% !important;
}
.demo-table-expand{
  padding: 20px 50px!important;
}
    </style>