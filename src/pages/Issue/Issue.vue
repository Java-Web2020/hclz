<template >
  <div id="Issue">
    <!-- 响应式分栏 -->
    <el-row :gutter="30">
      <el-col :xs="24" :sm="12"
        ><el-button type="danger">客户名称 </el-button>
          <el-tag type="danger">必填项</el-tag>
        <br />
        <!-- <el-select v-model="from.khmc_name" filterable placeholder="请选择"    :filter-method='remoteMethod'>
    <el-option
 
      v-for="item in khmc"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
        <el-autocomplete
          v-model="from.client_name"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
       
          <div slot-scope="{ item }" v-html="item.value1"></div>
        </el-autocomplete>

      </el-col>
      <el-col :xs="24" :sm="12"
        ><el-button type="danger">任务名称</el-button>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.task_name"
          placeholder="请输入任务名称"
        ></el-input
      ></el-col>
      <el-col :xs="24" :sm="12"
        ><el-button type="danger">物品名称</el-button
        > <el-tag type="danger">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.goods_name"
          placeholder="请输入物品名称"
        ></el-input
      ></el-col>
      <el-col :xs="24" :sm="12"
        ><el-button type="danger">今日日期</el-button
        >
        <el-input
          suffix-icon="el-icon-date"
          v-model="from.today_date"
        ></el-input
      ></el-col>
      <el-col :xs="24" :sm="12"
        > 
        <el-button type="danger">制作单位</el-button>
<el-tag type="danger">必填项</el-tag>
        <!-- <el-select v-model="from.zzdw_name" filterable placeholder="请选择">
    <el-option
      v-for="item in zzdw"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
        <el-autocomplete
          v-model="from.make_unit"
          :fetch-suggestions="querySearchs"
          placeholder="请输入内容"
          @select="handleSelects"
        >
          <div slot-scope="{ item }" v-html="item.value1"></div>
        </el-autocomplete>
      </el-col>
      <el-col :xs="24" :sm="12"
        ><el-button type="danger">下单姓名</el-button
        ><el-input
          suffix-icon="el-icon-edit"
          :disabled="true"
          v-model="from.order_name"
          placeholder="下单姓名"
        ></el-input
      ></el-col>

      <el-col :xs="24" :sm="12"
        ><el-button type="warning">规格</el-button
        >    <el-tag type="danger">必填项</el-tag><el-input
          type="textarea"
          :rows="3"
          placeholder="规格"
          v-model="from.specification"
        ></el-input
      ></el-col>

      <el-col :xs="24" :sm="12"
        ><el-button type="warning">工艺</el-button
        >    <el-tag type="danger">必填项</el-tag><el-input
        :rows="3"
          type="textarea"
          placeholder="工艺"
          v-model="from.craft"
        ></el-input
      ></el-col>


      <el-col :xs="24" :sm="12"
        ><el-button type="warning">重做原因</el-button
        ><el-input
        type="textarea"
        :rows="3"
          placeholder="重做原因"
          v-model="from.reason"
        ></el-input
      ></el-col>
      <el-col :xs="24" :sm="12"
        ><el-button type="warning">客户要求</el-button
        ><el-tag type="danger">必填项</el-tag>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入客户要求"
          v-model="from.client_ask"
        ></el-input
      ></el-col>
      <el-col :xs="24" :sm="12"
        ><el-button type="warning">重做次数 </el-button
        ><el-input
          placeholder="重做次数"
          type="number"
          v-model="from.frequency"
        ></el-input
      ></el-col>
      <el-col :xs="24" :sm="12"
        > <el-button type="danger">业务人员</el-button
        ><el-tag type="danger">必填项</el-tag><el-input
          suffix-icon="el-icon-edit"
          v-model="from.business_person"
          placeholder="请输入业务人员"
        ></el-input
      ></el-col>

      <!-- <el-col :xs="24" :sm="12"><el-button type="danger">现金支票</el-button>
  <el-input suffix-icon='el-icon-edit' v-model="from.cash_check" placeholder="请输入现金支票">
    </el-input>

    <el-select v-model="from.money_check" placeholder="请选择支付方式">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    
  </el-col> -->

      <el-col :xs="24" :sm="12"
        > <el-button type="danger">物品数量</el-button
        ><el-tag type="danger">必填项</el-tag><el-input
          suffix-icon="el-icon-edit"
          v-model="from.goods_number"
          type="number"
          placeholder="请输入物品数量"
        ></el-input
      ></el-col>
      <el-col :xs="24" :sm="12"
        ><el-button type="primary">供应商报价</el-button
        ><el-tag type="danger">必填项</el-tag><el-input
          suffix-icon="el-icon-edit"
          v-model="from.supplier_offer"
          type="number"
          placeholder="请输入供应商报价"
        ></el-input
      ></el-col>
      <el-col :xs="24" :sm="12"
        ><el-button type="primary">客户报价</el-button
        ><el-input
          suffix-icon="el-icon-edit"
          type="number"
          v-model="from.client_offer"
          placeholder="请输入客户报价"
        ></el-input
      ></el-col>
      <!--  <el-col :xs="24" :sm="12"><el-button type="primary">开票日期</el-button><el-date-picker
      v-model="from.make_date"
      align="right"
       type="datetime"
      placeholder="开票日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker></el-col>-->
      <!--<el-col :xs="24" :sm="12"><el-button type="primary">结账日期</el-button> <el-date-picker
      v-model="from.settle_date"
      align="right"
     type="datetime"
      placeholder="结账日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker></el-col>-->

      <el-col :xs="24" :sm="12"
        ><el-button type="primary">备注</el-button>
        <el-input
          placeholder="请输入内容"
          v-model="from.remark"
          type="textarea"
          :rows="5"
        >
        </el-input>
      </el-col>
      <!-- 上传图片 -->
      <el-col :xs="24" :sm="6"
        ><el-button type="primary">上传图片</el-button>
        <el-upload
          class="avatar-uploader"
          action="#"
          drag
          :show-file-list="false"
          :on-change="changeImage"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
     
      </el-col>
      <!-- 上传原文件 -->
      <el-col v-if="false" :xs="24" :sm="6"
        ><el-button type="primary">上传原文件</el-button>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :on-change="handleChange"
        
           :on-remove="handleRemove"
            drag
          :auto-upload="false"
          multiple
        >
          <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处或<em>点击上传</em></div>
          <!-- <el-button slot="trigger" size="mini" type="primary"
            >选取文件</el-button
          > -->
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <!-- <div slot="tip" class="el-upload__tip">上传原文件</div> -->
        </el-upload>
           <el-progress :percentage="percentage" :format="format" v-if="jdt"></el-progress>
      </el-col>
      <!-- 提交 -->
      <el-col :span="24"
        ><el-button type="primary" @click="tijiao">提交</el-button></el-col
      >
    </el-row>
    <!-- 图片放大 -->
    <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imageUrl" alt="">
        </el-dialog> -->

    <!-- <el-input suffix-icon='el-icon-edit' v-model="from.update_pic" placeholder="下单姓名"></el-input> -->
  </div>
  
</template>
<script>
import {
  reqshouye,
  reqzzdw,
  reqsctp,
  reqgongdantj,
  reqdwcedit,
  reqfile,
  reqpou_pu
} from "../../util/request";
import { uploadByPieces } from "@/assets/js/upload";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "user/list",
    }),
  },
  components: {},
  data() {
    return {
      //弹框数据
      list_tksj:'',
      //进度条
      jdt:false,
      percentage:0,
      //文件名字
      file_name: "",
      imageUrl: "",
      dialogVisible: false,
      from: {
        task_name: "",
        client_name: "",
        make_unit: "",
        client_ask: "",
        goods_name: "",
        order_name: this.list,
        business_person: "",
        goods_number: "",
        specification: "",
        supplier_offer: "0",
        today_date: "",
        money_check: "",
        //  make_date:'',
        remark: "",
        craft:"",
        reason:"",
        frequency:"",
        // settle_date :'',
        pic_ture: null,
        update_pic: "",
        id_put: 0,
        wj_file:null,
        file_file:''
      },
      fileList:[],
      fileList1:[],
      from1: {},
      options: [
        {
          value: "1",
          label: "现金",
        },
        {
          value: "2",
          label: "支票",
        },
      ],
      //客户名称
      khmc: [],
      zzdw: [],
      //开始结束日期封装方法
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      reqestuserList: "user/reqestuserList",
    }),
    changeImage(e) {
      //获取到的文件也就是上传的图片
      console.log(e)
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.from.pic_ture = file;
      reqsctp(this.from).then((res) => {
         console.log(res.data.url);
        this.from.update_pic = res.data.file_name;
      });
    },
    //大图
    datu() {
      this.dialogVisible = true;
    },
    //进度条
          get() {
            
        this.percentage++;
        if(this.percentage>89){
          console.log(this.percentage);
          clearInterval(this.timer);
        }
        console.log(this.value);
      },
    // 上传文件
    handleChange(e) {
    //  this.fileList.push([e.raw])
      this.from.wj_file=e.raw
       console.log(  this.from.wj_file);

this.timer = setInterval(this.get, 1000);
       this.jdt=true
    reqfile(this.from).then(res=>{
          this.from.file_file=res.data.file
  this.percentage=100
    clearInterval(this.timer);
              if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.error,
            type: "success",
          });
              }
    })
    },
         handleRemove(e) {
         console.log(e.raw);
          this.jdt=false
          this.percentage=0;
          console.log( this.from.file_file);
      },
    //客户名称
    querySearch(queryString, cb) {
      if (queryString !== "") {
        reqshouye(this.from).then((res) => {
          const newHtml = `<span style="color:#ff5c70">${queryString}</span>`;
          this.khmc = res.data;
          this.khmc.forEach((item) => {
            item.value1 = item.value.replace(queryString, newHtml);
          });
          cb(this.khmc);
        });
      }
    },
    querySearchs(query, cb) {
      if (query !== "") {
        reqzzdw(this.from).then((res) => {
          const newHtmls = `<span style="color:#ff5c70">${query}</span>`;
          this.zzdw = res.data;
          this.zzdw.forEach((item) => {
            item.value1 = item.value.replace(query, newHtmls);
          });
          cb(this.zzdw);
        });
      }
    },
    handleSelect(value) {
      this.from.client_name = value.value;
    },
    handleSelects(value) {
      this.from.make_unit = value.value;
    },

    select() {
      reqshouye(this.from).then((res) => {
        this.khmc = res.data;
        // console.log(this.khmc);
      });
    },
    select1() {
      reqzzdw(this.from).then((res) => {
        this.zzdw = res.data;
        // console.log(  this.zzdw);
      });
    },
    tijiao() {
      reqgongdantj(this.from).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.error,
            type: "success",
          });

          this.from = {
            task_name: "",
            client_name: "",
            make_unit: "",
            client_ask: "",
            goods_name: "",
            // order_name: this.list,
            business_person: "",
            goods_number: "",
            specification: "",
            supplier_offer: "",
            today_date: "",
            money_check: "",
            //  make_date:'',
            remark: "",
            // settle_date :'',
            update_pic: "",
            wj_file:'',
            craft:"",
          reason:"",
          frequency:"",
          };
          this.from.order_name=this.list[0]
          this.imageUrl = "";
        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error",
          });
        }
      });
    },
    //获取现在的时间--封装的函数
    currentTime() {
      setInterval(this.formatDate, 50);
    },
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      // let week = date.getDay(); // 星期
      // let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.from.today_date = `${year}-${month}-${day} ${hour}:${minute}:${second} `;
    },
    //进度条
          format(percentage) {
        return percentage === 100 ? '100%' : `${percentage}%`;
      },
      //发布任务提示
            open3() {
        reqpou_pu().then(res=>{
          if(res.data.num!=0){
              this.$notify.info({
          title: '您好,'+res.data.name,  
          dangerouslyUseHTMLString: true,
          message: '<strong >'+res.data.data+'</strong>'+'给您发了新任务,共'+'<span style="color:red;font-size:29px">'+res.data.num+'</span>'+'个待完成。'+'<br>'+'请注意查收!',
           position: 'bottom-right',
            duration: 0
        });
          }

      })

      },
      //刷新弹框数据
        getData(){
            reqpou_pu().then(res=>{
       this.list_tksj=res.data.data
       console.log(this.list_tksj);
  })
            this.open3()
  },
        timer() {
        return setTimeout(()=>{
          this.getData()
        },300000)
      },

  },
  mounted() {

  reqpou_pu().then(res=>{
       this.list_tksj=res.data.data
       console.log(this.list_tksj);
  })


    this. open3()
    console.log(this.from.id_put);
console.log(this.fileList);
    this.currentTime();
    //  this.restaurants = this.loadAll();
    // this.reqestshouye()
    // console.log(this.loadAll());
    this.select();
    this.select1();
    
    //防止刷新没有保存
    //  window.onbeforeunload = function (e) {
    //     e = e || window.event;
    //     // 兼容IE8和Firefox 4之前的版本
    //     if (e) {
    //         e.returnValue = '关闭提示';
    //     }
    //     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //     return '关闭提示';
    // }
    // console.log(this.list[0]);

    console.log(this.list[0]);
  },
  created() {
    this.from.id_put = this.$router.currentRoute.query.id;
    console.log(this.from.id_put);
    if (this.from.id_put == undefined) {
      this.from.order_name = this.list[0];
    } else {
      reqdwcedit({id:this.from.id_put }).then((res) => {
        this.from = res.data.data;
        this.imageUrl = res.data.data.pic_ture;
      });
    }
  },
  // 销毁定时器
  beforeDestroy() {
     clearInterval(this.timer);
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  },
        watch: {
      "list_tksj":"timer"

      
    },
};
</script>
<style   scoped>
.el-date-editor.el-input {
  width: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style lang='scss'>
.el-main[data-v-1badc801] {
  // color: #333;
  // text-align: left;
  // line-height: 68px;

  .el-icon-edit,
  .el-icon-date {
    color: red;
  }
  .el-input__inner {
    border: #ccc solid 1px;
  }
  #Issue .el-button {
    font-size: 20px;
  }
}
.el-upload-dragger {
  width: 148px;
  height: 148px;
}
.el-autocomplete-suggestion {
  width: auto !important;
}
#Issue .el-autocomplete {
  width: 100% !important;
}
.el-picker-panel [slot="sidebar"],
.el-picker-panel__sidebar {
  width: 70px;
}
.el-date-picker.has-sidebar {
  width: 388px;
}
.el-picker-panel [slot="sidebar"] + .el-picker-panel__body,
.el-picker-panel__sidebar + .el-picker-panel__body {
  margin-left: 62px;
}
#Issue .el-select {
  width: 100%;
}
#Issue {
  color: #333;
  text-align: left;
  line-height: 68px;
}
.el-notification {
height: 277px;
}
// #Issue  .el-icon-close{
// display: none;
// }
.el-upload-dragger {
  width: 178px;
  height: 178px;
}
.el-notification__title{
font-size: 29px;
}
.el-icon-info{
line-height: 2;
}
.el-notification__content p{
font-size: 20px;
line-height: 1.2;
}
</style>