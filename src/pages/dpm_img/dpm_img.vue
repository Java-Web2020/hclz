
<template>
  <div>
    <el-carousel
      ref="carousel"
      :interval="10000"
      arrow="never"
      height="1080px"
      @mouseenter.native="autoplayHandler"
    >
      <el-carousel-item v-for="(item, i) in list" :key="i">
        <div id="dpm_img">
          <!-- 头部 -->
          <header>
            <img :src="header" width="100%" alt="" />
          </header>
          <!-- 中间内容 -->
          <aside>
            <!-- 左部分 -->
            <div class="left" :style="bg_left">
              <!-- <img :src="tree" height="912px" alt=""> -->
              <!-- 头像 -->
              <div class="profile">
                <img
                  :src="item.user.head_port"
                  width="267px"
                  height="351px"
                  alt=""
                />
              </div>
              <!-- 姓名信息部分 -->
              <div class="info">
                <ul>
                  <li>
                    <span>姓名:</span
                    ><span v-text="item.user.username"></span>
                  </li>
                  <li>
                    <span>性别:</span><span v-text="item.user.sex"></span>
                  </li>
                  <li>
                    <span>年龄:</span><span v-text="item.user.age"></span>
                  </li>
                  <li>
                    <span>职务:</span><span v-text="item.user.duty"></span>
                  </li>
                  <li>
                    <span>电话:</span
                    ><span v-text="item.user.phone"></span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 右部分 -->
            <div class="right" :style="bg_right">
              <!-- 表格部分 -->
              <div class="frame">
                <!-- 第一个表格 -->
                <div class="data_d">
                  {{year}}<br />{{week_w}}<br />{{time}}
                </div>
                <div class="top">
                  <table
                    border="1"
                    width="89%"
                    height="150"
                    style="border-collapse: collapse; font-size: 22px"
                    bordercolor="#036eb8"
                  >
                    <tr style="color: red; font-weight: normal">
                      <th
                        style="font-weight: bold; font-size: 26px; padding: 6px"
                        width="12.5%"
                      >
                        今日处理工作数量
                      </th>
                      <th
                        style="font-weight: normal; font-size: 20px"
                        width="12.5%"
                      >
                        本周处理<br />工作数量
                      </th>
                      <th
                        style="font-weight: normal; font-size: 20px"
                        width="12.5%"
                      >
                        本月处理<br />工作数量
                      </th>
                      <th
                        style="font-weight: normal; font-size: 20px"
                        width="12.5%"
                      >
                        本季度处理<br />工作数量
                      </th>
                      <th
                        style="font-weight: normal; font-size: 20px"
                        width="12.5%"
                      >
                        本年度处理<br />工作数量
                      </th>
                      <th style="font-weight: normal" width="12.5%">
                        工作状况
                      </th>
                      <th style="font-weight: normal" width="12.5%">
                        责任星级
                      </th>
                      <th style="font-weight: normal" width="12.5%">
                        审批领导
                      </th>
                    </tr>
                    <tr
                      align="center"
                      style="height: 87px; color: rgb(0, 153, 67)"
                    >
                      <td style="color: rgb(0, 153, 67)">
                        <span
                          style="font-size: 50px; color: rgb(0, 153, 67)"
                          v-text="item.today_num"
                          ></span
                        >件
                      </td>
                      <td>
                        <span style="font-size: 32px" v-text="item.week_info"
                          ></span
                        >件
                      </td>
                      <td>
                        <span style="font-size: 32px" v-text="item.month_info"
                          ></span
                        >件
                      </td>
                      <td>
                        <span style="font-size: 32px" v-text="item.quarter_info"
                          ></span
                        >件
                      </td>
                      <td>
                        <span style="font-size: 32px" v-text="item.year_info"
                          ></span
                        >件
                      </td>
                      <td style="color: rgb(238, 79, 19)">在岗</td>
                      <td style="color: rgb(231, 0, 18)">★★★★★</td>
                      <td style="color: rgb(231, 0, 18)">陈晓芸</td>
                    </tr>
                  </table>
                </div>
                <!-- 第二个表格 -->
                <div class="mid">
                  <div class="test">今日个人处理工作</div>
                  <!-- 表头 -->
                  <table
                    border="1"
                    width="100%"
                    style="border-collapse: collapse"
                    bordercolor="#036eb8"
                  >
                    <tr style="height: 32px;background: linear-gradient(to bottom,rgb(0, 76, 159), rgb(0, 125, 200)); color: white;" >
                      <th style="width: 72.859px">序号</th>
                      <th style="width: 234.734px">日期编号</th>
                      <th style="width: 130.5px">项目名称</th>
                      <th style="width: 116.094px">客户单位</th>
                      <th style="width: 144.922px">对接业务员</th>
                      <th style="width: 116.094px">接活时间</th>
                      <th style="width: 116.094px">竣工时间</th>
                      <th style="width: 144.922px">项目工作量</th>
                      <th style="width: 173.781px">项目处理情况</th>
                    </tr>
                  </table>
                  <!-- 表格内容 -->
                  <vue-seamless-scroll
                    :data="item.today_info"
                    class="seamless-warps"
                    :class-option="optionsteps"
                  >
                    <ul>
                      <li v-for="itemss in item.today_info" :key="itemss.idc">
                        <table
                          border="1"
                          width="100%"
                          style="border-collapse: collapse"
                          bordercolor="#036eb8"
                        >
                          <tr>
                            <td style="width: 72.859px" v-text="itemss.idc"></td>
                            <td style="width: 234.734px" v-text="itemss.uid_order"></td>
                            <td style="width: 130.5px"   v-text="itemss.task_name"></td>
                            <td style="width: 116.094px"   v-text="itemss.client_name" ></td>
                            <td style="width: 144.922px"   v-text="itemss.business_person" ></td>
                            <td style="width: 116.094px"   v-text="itemss.today_date" ></td>
                            <td style="width: 116.094px"   v-text="itemss.issue_time" ></td>
                            <td style="width: 144.922px"   v-text="itemss.goods_number" ></td>
                            <td style="width: 173.781px; color: rgb(4, 152, 63)"   v-if="itemss.state == 1" >已完成 </td>
                            <td style="width: 173.781px; color: rgb(110, 23, 62)"   v-else >定稿中</td>
                          </tr>
                        </table>
                      </li>
                    </ul>
                  </vue-seamless-scroll>
                </div>
                <!-- 第三个表格 -->

                <div class="third">
                  <div class="performances"><span>{{month}}</span>月个人所有业绩</div>
                  <vue-seamless-scroll
                    :data="item.month_list"
                    class="seamless-warp"
                    :class-option="optionstep"
                  >
                    <ul>
                      <li v-for="items in item.month_list" :key="items.xuhao">
                        <table
                          border="1"
                          width="100%"
                          style="border-collapse: collapse"
                          bordercolor="#036eb8"
                        >
                          <tr>
                            <td style="width: 72.859px" v-text="items.idc"></td>
                            <td style="width: 234.734px" v-text="items.uid_order"></td>
                            <td style="width: 130.5px"   v-text="items.task_name"></td>
                            <td style="width: 116.094px"   v-text="items.client_name" ></td>
                            <td style="width: 144.922px"   v-text="items.business_person" ></td>
                            <td style="width: 116.094px"   v-text="items.today_date" ></td>
                            <td style="width: 116.094px"   v-text="items.issue_time" ></td>
                            <td style="width: 144.922px"   v-text="items.goods_number" ></td>
                            <td style="width: 173.781px; color: rgb(4, 152, 63)"   v-if="items.state == 1" >已完成 </td>
                            <td style="width: 173.781px; color: rgb(110, 23, 62)"   v-else >定稿中</td>
                          </tr>
                        </table>
                      </li>
                    </ul>
                  </vue-seamless-scroll>
                </div>
              </div>
            </div>
          </aside>
          <!-- 尾部 -->
          <footer :style="bg_footer"></footer>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { reqdpm } from "../../util/request";
export default {
  components: {
    vueSeamlessScroll,
  },
  computed: {
    optionstep() {
      return {
        step: 0.5,
      };
    },
    optionsteps() {
      return {
        step: 1,
      };
    },
  },
  data() {
    return {
      //年周时间
      year:'',
      week_w:'',
      time:'',
      //月
      month:"",
      //列表
      list: "",
      header: require("../../assets/img/header.jpg"),
      zjl: require("../../assets/img/zjl.jpg"),
      footer: require("../../assets/img/footer.jpg"),
      bg_left: {
        backgroundImage: "url(" + require("../../assets/img/tree.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "560px 880px",
        backgroundPosition: "50% 100%",
      },
      bg_right: {
        backgroundImage: "url(" + require("../../assets/img/footer.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1330px",
        backgroundPosition: "100% 99.7%",
      },
      bg_footer: {
        backgroundImage:
          "url(" + require("../../assets/img/footer_f.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1920px",
        // backgroundPosition: "100% 99.7%",
      },
      data: [],
      busy: false,
    };
  },
  methods: {
    //当前时间
       currentTime() {
      setInterval(this.formatDate, 50);
    },
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.year = `${year}年${month}月${day}日`;
      this.week_w = `${weekArr[week]}`;
      this.time = `${hour}:${minute}:${second}`;
      this.month=`${month}`
    },

  //定时刷新
  getData(){
   reqdpm().then((res) => {
      // console.log(res.data);
      this.list = res.data.user_info;
    })
  },
       timer() {
        return setTimeout(()=>{
          this.getData()
        },10000)
      },



    autoplayHandler() {
      console.log((this.$refs.carousel.handleMouseEnter = this.qq));
        this.$refs.carousel.handleMouseEnter= this.qq
    },
    qq() {
      console.log("修改成功");
    },
    //无限滚动
  },
  mounted() {
    this.currentTime();
    reqdpm().then((res) => {
      console.log(res.data);
      this.list = res.data.user_info;
      console.log(this.list);
    });
    console.log(this.year);
  },
      created() {
      this.getData()
    },
    beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  },
      watch: {
      list() {
      this.timer()
      }
    },
        destroyed() {
  clearTimeout(this.timer)
    }
};
</script>
<style scoped>
</style>
<style >
#dpm_img {
  width: 1920px;
  height: 1080px;
  position: relative;
}
/* 轮播图 */
.el-carousel--horizontal {
  width: 1920px;
}
/* 设置头部 */
#dpm_img header {
  width: 1920px;
  height: 139px;
  background-color: blueviolet;
}
/* -----设置中间内容区域----- */
#dpm_img aside {
  width: 1920px;
  height: 912px;
  background: rgb(230, 0, 18);
  display: flex;
  justify-content: space-between;
  /* overflow: hidden; */
}
/* 左区域 */
#dpm_img aside .left {
  width: 580px;
  height: 912px;
  background-color: white;
  position: relative;
}
#dpm_img aside .left .profile {
  width: 277px;
  height: 361px;
  background-color: rgb(230, 0, 18);
  margin: 0 auto;
  margin-top: 30px;
}
#dpm_img aside .left .profile img {
  margin-left: 5px;
  margin-top: 5px;
}
#dpm_img aside .left .info {
  width: 420px;
  height: 363px;
  /* background-color: white; */
  margin: 20px auto;
}
#dpm_img aside .left li {
  /* width: 420px; */
  height: 72px;
  line-height: 72px;
  font-size: 20px;
  font-weight: bolder;
}
#dpm_img aside .left li > :first-child {
  color: rgb(230, 0, 18);
}
#dpm_img aside .left li > :last-child {
  color: black;
  text-align: center;
  width: 300px;
  line-height: 40px;
  border-bottom: 2px solid rgb(230, 0, 18);
  display: inline-block;
}

#dpm_img aside .left ul {
  display: flex;

  /* flex-wrap:wrap; */
  align-content: space-between;
  flex-direction: column;
  /* justify-content: space-between; */
}
/* 右区域 */
#dpm_img aside .right {
  width: 1330px;
  height: 912px;
  background-color: white;
}
#dpm_img aside .right .frame {
  width: 1260px;
  height: 720px;
  margin: 0 auto;
  margin-top: 15px;
  border: 1px solid #036eb8;
  /* background-color: palevioletred; */
}
#dpm_img aside .right .frame .has-gutter {
  color: red;
  text-align: center;
  font-size: 20px;
  /* background-color: palevioletred; */
}
#dpm_img .top table {
  margin-left: 153px;
}
#dpm_img .data_d {
  width: 151px;
  height: 149px;
  border: solid #036eb8 1px;
  position: absolute;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: rgb(230, 0, 18);
  padding-top: 20px;
}
#dpm_img .mid .test {
  width: 1260px;
  text-align: center;
  color: rgb(26, 36, 136);
  font-size: 18px;
  font-weight: bold;
}
#dpm_img .mid {
  text-align: center;
  color: black;
}
#dpm_img .mid td {
  height: 35px;
  font-size: 12px;
  font-weight: bold;
}
#dpm_img .mid tr > :first-child {
  font-size: 20px;
}
#dpm_img .mid th {
  font-weight: normal;
}
#dpm_img .third {
  text-align: center;
  color: black;
}
#dpm_img .third .performances {
  width: 1260px;
  text-align: center;
  color: white;
  font-size: 18px;
  /* font-weight: bold; */
  background: linear-gradient(to bottom, rgb(0, 76, 159), rgb(0, 125, 200));
}
#dpm_img .third td {
  height: 35px;
  font-size: 12px;
  font-weight: bold;
}
#dpm_img .third tr > :first-child {
  font-size: 20px;
}
/* -----设置尾部----- */
#dpm_img footer {
  width: 1920px;
  height: 29px;
  background-color: yellow;
  position: absolute;
  bottom: 0;
}
.seamless-warp {
  height: 288px;
  overflow: hidden;
}
.seamless-warps {
  height: 180px;
  overflow: hidden;
}
</style>