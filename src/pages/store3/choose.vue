<template>
    <div id="choose">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <el-table
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
            url: require("../../assets/img/hl.jpg"),
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
                top: "215px",
                left: "470px",
                width:"160px",
                color: "white",
                fontSize: "20px",
                fontWeight:"900",
                textAlign:"center"
              },
            ],
          },
          {
            type: "text",
            text: "",
            css: [
              {
                top: "80px",
                left: "470px",
                color: "black",
                fontSize: "70px",
                width:"150px",
                fontWeight:"900",
                textAlign:"center"
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

      tableData:    [
    {
        "dj": "B1",
        "name": "宝岛眼镜",
        "zk": "全场7.5折优惠（隐形眼镜与护理液除外）",
        "bz": "段恬恬18334786355"
    },
    {
        "dj": "B1",
        "name": "面包新语",
        "zk": "9折",
        "bz": "张莉娟15210176103"
    },
    {
        "dj": "B1",
        "name": "柠檬茶",
        "zk": "9折",
        "bz": "苏东泉17600722036"
    },
    {
        "dj": "F2",
        "name": "马博士婴儿游泳馆",
        "zk": "办卡赠送2节课＋赠送定制速干浴巾1条",
        "bz": "宋允18501073802"
    },
    {
        "dj": "F2",
        "name": "兔子小姐小儿推拿",
        "zk": "会员价基础上八折",
        "bz": "沛沛15810160893"
    },
    {
        "dj": "F2",
        "name": "艾涂图",
        "zk": "办卡九五折并赠送4课时",
        "bz": "校长18910821978"
    },
    {
        "dj": "F2",
        "name": "MTA",
        "zk": "办卡八折",
        "bz": "石立13146639894"
    },
    {
        "dj": "F2",
        "name": "大玩家",
        "zk": "指定200元套餐，充200送200元",
        "bz": "王金磊15840835943"
    },
    {
        "dj": "F3",
        "name": "蓝马乐园",
        "zk": "1388元10次卡加赠送一次，单次238元打8.5折",
        "bz": "田玺歌18515423731"
    },
    {
        "dj": "F3",
        "name": "乐客VR",
        "zk": "原价：68元/人次   凭证件享单次：48元/人次\n充值：500多加送3次   充值：1000多加送5次",
        "bz": "乔春叶15930179047"
    },
    {
        "dj": "F3",
        "name": "蜂一把蜜蜂小镇",
        "zk": "DIY制作口红原价199元          优惠：158元\n十二花香面膜面膜108元         优惠：88元\n洋槐山花蜜原价388元           优惠：308元\n宝宝霜198元                   优惠：158元\n眼贴原价58元                  优惠：46元\n",
        "bz": "齐云霞17600425923"
    },
    {
        "dj": "F3",
        "name": "吉姆鱼/小火车票价 （火车、捞鱼、喂鱼、桌游）",
        "zk": "普通会员：200元8次；300元15次；500元25次\n优惠：200元8次➕2次，300元15次➕2次，500元25次➕3次",
        "bz": "李健15500175670"
    },
    {
        "dj": "F3",
        "name": "莫莉幻想",
        "zk": "原价：98.6元100枚长期币。98.6元130枚期限币，199元300枚期限币，期限币有效期至8月31日 \n独享优惠：100元150枚长期币，长期有效不限时",
        "bz": "冯海磊18301495233"
    },
    {
        "dj": "F3",
        "name": "淘杰克",
        "zk": "全场6折优惠",
        "bz": "王焕13609238673"
    },
    {
        "dj": "F3",
        "name": "海阔蓝天",
        "zk": "零售全场8折",
        "bz": "王静18209875474"
    },
    {
        "dj": "F5",
        "name": "华联影院",
        "zk": "门市价5折，现场购买、选座",
        "bz": "刘晨18610363389"
    }
],
    search:""
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
            // if(b.name.length>7){
            //     this.painting.views[2].css[0].left=100-(b.name.length-7)*8+"px"
            // }else if(b.name.length<7){
            //     this.painting.views[2].css[0].left=100+(7-b.name.length)*20+"px"
            // }else{
            //     this.painting.views[2].css[0].left="100px"
            // }
            console.log(b.zk.length);
            if(b.zk.length<4){
                this.painting.views[3].css[0].fontSize="70px"
                
            }else if(b.zk.length>=4&&b.zk.length<30){
                this.painting.views[3].css[0].fontSize="27px"
            }else{
                this.painting.views[3].css[0].fontSize="14px"
            }

        },
        success(src) {
      console.log(src);
      this.posterImg = src;
    },
    fail(err) {
      console.log("fail", err);
    },

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