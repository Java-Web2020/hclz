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
              <el-form-item label="联系人：">
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
                url: require("../../assets/img/hx.jpg"),
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
                    top: "150px",
                    left:"180px",
                    color: "#d70d18",
                    width:"100px",
                    fontSize: "13px",
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
                    top: "140px",
                    left: "350px",
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
                    top: "180px",
                    left: "150px",
                    color: "black",
                    fontSize: "17px",
                  },
                ],
              },
            ],
          },
          posterImg: "",
    
          tableData: [
        
        {
            "name": "重庆李记串串香",
            "zk": "8折",
            "bz": "不能和其他优惠同享",
            "dj": "谢贵财"
        },
        {
            "name": "朱记顺德菜",
            "zk": "8.5折",
            "bz": " ",
            "dj": "赵照"
        },
        {
            "name": "俄式厨房",
            "zk": "8.8折",
            "bz": " ",
            "dj": "栗晓风"
        },
        {
            "name": "倍喜大排档",
            "zk": "8.8折",
            "bz": " ",
            "dj": "邱二娃"
        },
        {
            "name": "九本居酒屋",
            "zk": "8.8折",
            "bz": " ",
            "dj": "李振亚"
        },
        {
            "name": "BONGBONG",
            "zk": "8.8折",
            "bz": " ",
            "dj": "郑景远"
        },
        {
            "name": "四眼仔车仔面",
            "zk": "9折",
            "bz": " ",
            "dj": "罗华"
        },
        {
            "name": "鲜有基参鸡汤",
            "zk": "8.8折",
            "bz": " ",
            "dj": "瞿璐"
        },
        {
            "name": "甲丁坊",
            "zk": "8折",
            "bz": " ",
            "dj": "穆兵强"
        },
        {
            "name": "京A",
            "zk": "8.8折",
            "bz": " ",
            "dj": "寇亚亚"
        },
        {
            "name": "Deep深",
            "zk": "9折",
            "bz": " ",
            "dj": "杨飞"
        },
        {
            "name": "聚点串吧",
            "zk": "8.8折",
            "bz": " ",
            "dj": "陈胜虎"
        },
        {
            "name": "啤不二",
            "zk": "8.5折",
            "bz": " ",
            "dj": "张超"
        },
        {
            "name": "伊尹宴",
            "zk": "9折",
            "bz": " ",
            "dj": "郝夕"
        },
        {
            "name": "辣尚瘾",
            "zk": "8.8折",
            "bz": " ",
            "dj": "尚雪迎"
        },
        {
            "name": "渝是乎",
            "zk": "9折",
            "bz": " ",
            "dj": "高虹"
        },
        {
            "name": "牛角",
            "zk": "9折",
            "bz": " ",
            "dj": "王园"
        },
        {
            "name": "牛三哥",
            "zk": "8折",
            "bz": " ",
            "dj": "高源"
        },
        {
            "name": "分米鸡",
            "zk": "8.5折",
            "bz": " ",
            "dj": "卢晓刚"
        },
        {
            "name": "能人居",
            "zk": "9折",
            "bz": " ",
            "dj": "常晓策"
        },
        {
            "name": "爸爸糖",
            "zk": "9折",
            "bz": " ",
            "dj": "杨天龙"
        },
        {
            "name": "球球奶",
            "zk": "8折",
            "bz": " ",
            "dj": "石红艳"
        },
        {
            "name": "小湖南岸",
            "zk": "9折",
            "bz": " ",
            "dj": "黄俊清"
        },
        {
            "name": "犟牛家",
            "zk": "9折",
            "bz": " ",
            "dj": "宋天宇"
        },
        {
            "name": "豪丽斯",
            "zk": "8.8折",
            "bz": " ",
            "dj": "廉宝环"
        },
        {
            "name": "小吊梨汤",
            "zk": "9折",
            "bz": " ",
            "dj": "王国瑞"
        },
        {
            "name": "烧将",
            "zk": "8折",
            "bz": " ",
            "dj": "杨苗玲"
        },
        {
            "name": "蜀主江湖",
            "zk": "8.8折",
            "bz": " ",
            "dj": "候会杰"
        },
        {
            "name": "乌巢",
            "zk": "8.5折",
            "bz": " ",
            "dj": "张春珂"
        },
        {
            "name": "NIKE",
            "zk": "8-9折",
            "bz": " ",
            "dj": "郝丹"
        },
        {
            "name": "Mood bar",
            "zk": "开瓶8.5折",
            "bz": " ",
            "dj": "王帅"
        },
        {
            "name": "Lift",
            "zk": "开瓶8.5折",
            "bz": " ",
            "dj": "靳凯伟"
        },
        {
            "name": "FAMOUS肥猫",
            "zk": "8折",
            "bz": " ",
            "dj": "穆兵强"
        },
        {
            "name": "KONG",
            "zk": "9折",
            "bz": " ",
            "dj": "张磊"
        },
        {
            "name": "牛啤堂",
            "zk": "8.8折",
            "bz": " ",
            "dj": " 马喜乐"
        },
        {
            "name": "燕京9号",
            "zk": "7折",
            "bz": " ",
            "dj": "梁育"
        },
        {
            "name": "零屿",
            "zk": "8.8折",
            "bz": " ",
            "dj": "张前忠"
        },
        {
            "name": "沪上阿姨",
            "zk": "8折",
            "bz": " ",
            "dj": "邓齐齐"
        },
        {
            "name": "锅说",
            "zk": "8.5折",
            "bz": " ",
            "dj": "尚博康"
        },
        {
            "name": "茶太良品",
            "zk": "8折",
            "bz": " ",
            "dj": "刘宝微"
        },
        {
            "name": "火鬼披萨",
            "zk": "8.5折",
            "bz": " ",
            "dj": "丁杨"
        },
        {
            "name": "户户韩式料理",
            "zk": "8折",
            "bz": " ",
            "dj": "张琦琦"
        },
        {
            "name": "下酒小酒馆",
            "zk": "8折",
            "bz": " ",
            "dj": "胡泽雄"
        },
        {
            "name": "板前十胜",
            "zk": "8折",
            "bz": " ",
            "dj": "王亚洲"
        },
        {
            "name": "行运",
            "zk": "8.8折",
            "bz": " ",
            "dj": "王贝贝"
        },
        {
            "name": "温野菜",
            "zk": "9折",
            "bz": " ",
            "dj": "刘玲"
        },
        {
            "name": "春莱",
            "zk": "8折",
            "bz": " ",
            "dj": "杨军"
        },
        {
            "name": "闹川",
            "zk": "8.8折",
            "bz": "整单含酒水",
            "dj": "田志龙"
        },
        {
            "name": "香猪坊",
            "zk": "8.8折",
            "bz": " ",
            "dj": "代军"
        },
        {
            "name": "汤城小厨",
            "zk": "9折",
            "bz": "主食酒水除外",
            "dj": "任延粉"
        },
        {
            "name": "鲜潭石锅鱼",
            "zk": "8.8折",
            "bz": "整单含酒水",
            "dj": "王勇"
        },
        {
            "name": "小大董",
            "zk": "9折",
            "bz": "不含酒水",
            "dj": "季卫东"
        },
        {
            "name": "云尊府",
            "zk": "9折",
            "bz": " ",
            "dj": "徐小清"
        },
        {
            "name": "卡莫瑜伽",
            "zk": "办卡8折",
            "bz": " ",
            "dj": "赵爽"
        },
        {
            "name": "姥姥家春饼",
            "zk": "9折",
            "bz": "不含酒水",
            "dj": "黄大鹏"
        },
        {
            "name": "阿迪达斯",
            "zk": "8.8折",
            "bz": "不稳定会有变动",
            "dj": "申云鹏"
        },
        {
            "name": "嘻哈包袱铺",
            "zk": "9折",
            "bz": " ",
            "dj": "刘洋"
        },
        {
            "name": "Phở爺越南料理",
            "zk": "8.8折",
            "bz": " ",
            "dj": "李文华"
        },
        {
            "name": "迷你椰",
            "zk": "8.8折",
            "bz": "整单含酒水",
            "dj": "李萧剑"
        },
        {
            "name": "张牙舞爪",
            "zk": "8折",
            "bz": " ",
            "dj": "冯冰"
        },
        {
            "name": "楠火锅",
            "zk": "8.8折",
            "bz": "不含酒水",
            "dj": "庞许"
        },
        {
            "name": "巴黎贝甜",
            "zk": "8.8折",
            "bz": "正价商品9折，不予其他优惠不叠加",
            "dj": "张妍"
        },
        {
            "name": "神作鱼头",
            "zk": "9折",
            "bz": "不含酒水",
            "dj": "王晨"
        },
        {
            "name": "苏小牛",
            "zk": "9折",
            "bz": " ",
            "dj": "康壮"
        },
        {
            "name": "德川家",
            "zk": "9折",
            "bz": " ",
            "dj": "许晓辉"
        },
        {
            "name": "探路者",
            "zk": "7折",
            "bz": " ",
            "dj": "王博"
        },
        {
            "name": "李宁",
            "zk": "8.8折",
            "bz": "限量款不参与",
            "dj": "李娜"
        },
        {
            "name": "茶百道",
            "zk": "9折",
            "bz": " ",
            "dj": "房娟娟"
        },
        {
            "name": "皮羽",
            "zk": "8.5折",
            "bz": " ",
            "dj": "牛明"
        },
        {
            "name": "野人牧坊",
            "zk": "8折",
            "bz": " ",
            "dj": "梁双"
        },
        {
            "name": "海宝屋咖啡",
            "zk": "8折",
            "bz": " ",
            "dj": "姜鹤"
        },
        {
            "name": "关东煮/炒酸奶",
            "zk": "8折",
            "bz": " ",
            "dj": "冯莉"
        },
        {
            "name": "热狗车",
            "zk": "9折",
            "bz": " ",
            "dj": "冯云飞"
        },
        {
            "name": "YOMI冰激凌",
            "zk": "8折",
            "bz": "除冰棍以外产品",
            "dj": "赵俊超"
        },
        {
            "name": "儿食客",
            "zk": "8折",
            "bz": " ",
            "dj": "王宾"
        },
        {
            "name": "旋木时光",
            "zk": "9折",
            "bz": " ",
            "dj": "蔡显莉"
        },
        {
            "name": "梵花",
            "zk": "鲜花 9折",
            "bz": "生态瓶和永生花作品不参与折扣",
            "dj": "赵明"
        },
        {
            "name": "TOMI冰激凌",
            "zk": "9.5折",
            "bz": " ",
            "dj": "程楠"
        },
        {
            "name": "糖果荟",
            "zk": "9折",
            "bz": " ",
            "dj": "杨连群"
        },
        {
            "name": "名创优品",
            "zk": "无",
            "bz": "全国统一 无折扣"
        },
        {
            "name": "索尼游戏",
            "zk": "9折",
            "bz": "限指定产品",
            "dj": "陈景岗"
        },
        {
            "name": "悦尚美甲",
            "zk": "8折",
            "bz": " ",
            "dj": "董鑫"
        },
        {
            "name": "THINKPAID联想",
            "zk": "配件打八折",
            "bz": "指定笔记本减500",
            "dj": "梁孟中"
        },
        {
            "name": "迪士尼",
            "zk": "9折",
            "bz": " ",
            "dj": "张东升"
        },
        {
            "name": "没完没了",
            "zk": "9折",
            "bz": " ",
            "dj": "王玉香"
        },
        {
            "name": "3CE",
            "zk": "9折",
            "bz": " ",
            "dj": "张洋洋"
        },
        {
            "name": "大爱金工",
            "zk": "8折",
            "bz": " ",
            "dj": "李利波"
        },
        {
            "name": "蔓秀",
            "zk": "8折",
            "bz": " ",
            "dj": "娜娜"
        },
        {
            "name": "ACC饰品",
            "zk": "8.5折",
            "bz": "购物500以上8.5折，仅限正价商品",
            "dj": "田晓迪"
        },
        {
            "name": "夸迪",
            "zk": "走内部员工价",
            "bz": " ",
            "dj": "高洁"
        },
        {
            "name": "爱心护肤",
            "zk": "8.5折",
            "bz": "限指定产品",
            "dj": "李春燕"
        },
        {
            "name": "老山咖啡",
            "zk": "8.5折",
            "bz": " ",
            "dj": "张建"
        },
        {
            "name": "柠檬茶",
            "zk": "8.8折",
            "bz": " ",
            "dj": "陆鸿年"
        },
        {
            "name": "黑色经典",
            "zk": "除套餐外8.5折",
            "bz": " ",
            "dj": "任灿"
        },
        {
            "name": "手艺制作",
            "zk": "8.8折",
            "bz": " ",
            "dj": "高雪书"
        },
        {
            "name": "玛丽莲",
            "zk": "8.5折",
            "bz": " ",
            "dj": "曹平"
        },
        {
            "name": "西奥多冰激凌",
            "zk": "8折",
            "bz": " ",
            "dj": "田旭东"
        },
        {
            "name": "小蹄大作",
            "zk": "9折",
            "bz": " ",
            "dj": "李欣莹"
        },
        {
            "name": "金茂斋",
            "zk": "待定",
            "bz": " "
        },
        {
            "name": "奶奶的美食",
            "zk": "8折",
            "bz": " ",
            "dj": "吴显顺"
        },
        {
            "name": "椒太后",
            "zk": "8折",
            "bz": " ",
            "dj": "吴显顺"
        },
        {
            "name": "薛娇",
            "zk": "8折",
            "bz": " ",
            "dj": "吴显顺"
        },
        {
            "name": "螺大喜",
            "zk": "8折",
            "bz": " ",
            "dj": "吴显顺"
        },
        {
            "name": "阿芮烤鸡爪",
            "zk": "8折",
            "bz": " ",
            "dj": "吴显顺"
        },
        {
            "name": "卤山川",
            "zk": "8折",
            "bz": " ",
            "dj": "吴显顺"
        },
        {
            "name": "阿甘锅盔",
            "zk": "8折",
            "bz": " ",
            "dj": "吴显顺"
        },
        {
            "name": "澜熊",
            "zk": "8折",
            "bz": " ",
            "dj": "赵艺"
        },
        {
            "name": "coco欣饮",
            "zk": "8折",
            "bz": " ",
            "dj": "傅新婷"
        },
        {
            "name": "桐味小时",
            "zk": "8折",
            "bz": " ",
            "dj": "傅新婷"
        },
        {
            "name": "及时",
            "zk": "8.8折",
            "bz": " ",
            "dj": "何静"
        },
        {
            "name": "轻探险项目",
            "zk": "5折",
            "bz": "滑道、网绳、探洞",
            "dj": "何文斌"
        },
        {
            "name": "晋至源",
            "zk": "8.8折",
            "dj": "高禹"
        },
        {
            "name": "厚有蛋",
            "zk": "8.8折",
            "dj": "王秀娟"
        },
        {
            "name": "和合谷",
            "zk": "8.5折",
            "dj": "白鹏"
        },
        {
            "name": "香橙美甲",
            "zk": "7折",
            "dj": "汪研"
        },
        {
            "name": "汎歌国际",
            "zk": "冰点脱毛5折",
            "dj": "张君党"
        },
        {
            "name": "劲松口腔",
            "zk": "8.8折",
            "dj": "郝经纬"
        },
        {
            "name": "丝域养发",
            "zk": "5折",
            "dj": "高颖"
        },
        {
            "name": "湘味淳",
            "zk": "8.8折",
            "dj": "张亚平"
        },
        {
            "name": "杏花堂",
            "zk": "9.5折",
            "dj": "韩梦瑶"
        },
        {
            "name": "桃心玛丽",
            "zk": "9.5折",
            "dj": "金老师"
        },
        {
            "name": "哈鲁托",
            "zk": "店内优惠基础上，额外赠2张攀岩畅玩门票",
            "dj": "殷悦"
        },
        {
            "name": "童画森林",
            "zk": "报名的当天赠送2节课优惠",
            "dj": "段校长"
        },
        {
            "name": "归位瑜伽",
            "zk": "8.5折",
            "dj": "姚云"
        },
        {
            "name": "冰场",
            "zk": "门票7折",
            "dj": "刘爽"
        },
        {
            "name": "英思蓓儿",
            "zk": "送俱乐部定制书袋",
            "dj": "李小黎"
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
                if(b.name.length>=7){
                    this.painting.views[2].css[0].fontSize=13-(b.name.length-7)+"px"
                }else if(b.name.length<5){
                    this.painting.views[2].css[0].fontSize=20+(7-b.name.length)+"px"
                }
                if(b.zk.length>4){
                    this.painting.views[3].css[0].fontSize="16px"
                    this.painting.views[3].css[0].top="145px"
                }else{
                    this.painting.views[3].css[0].fontSize="30px"
                    this.painting.views[3].css[0].top="140px"
                    
                    // this.painting.views[3].css[0].left="295px"
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