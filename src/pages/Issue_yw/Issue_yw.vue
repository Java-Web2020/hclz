<template>
  <div id="Issue_yw">
    <el-form ref="form" :model="form" label-width="80px" >
      <el-form-item label="任务名称">
        <el-input v-model="form.task_name" ></el-input>
      </el-form-item>
      <el-form-item label="客户名称" class="khmc">
        <el-autocomplete
          v-model="form.client_name"
          :fetch-suggestions="querySearch_kh"
          placeholder="请输入内容"
          @select="handleSelect_kh"
        >
          <div slot-scope="{ item }" v-html="item.value1"></div>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="任务需求">
        <el-input
          type="textarea"
          v-model="form.client_ask"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="客户报价">
        <el-input v-model="form.client_offer" style="width: 80px"></el-input
        >&nbsp;<span>元</span>
      </el-form-item>
      <el-form-item label="选设计师" class="sjs">
        <el-autocomplete
          v-model="form.order_name"
          :fetch-suggestions="querySearch_sjs"
          placeholder="请输入内容"
          @select="handleSelect_sjs"
        >
          <div slot-scope="{ item }" v-html="item.value1"></div>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="选供应商" class="gys">
        <el-autocomplete
          v-model="form.make_unit"
          :fetch-suggestions="querySearch_gys"
          placeholder="请输入内容"
          @select="handleSelect_gys"
        >
          <div slot-scope="{ item }" v-html="item.value1"></div>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="物品数量"      prop="goods_number"
    :rules="[
      { required: true, message: '物品数量不能为空'},
      { type: 'number', message: '数量必须为数字值'}
    ]">
        <el-input  type="age"  v-model.number="form.goods_number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.business_person"></el-input>
      </el-form-item>
      <el-form-item label="完成期限">
        <el-input v-model="form.ap_time" style="width: 50px"></el-input
        >&nbsp;<span>天</span>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-input :disabled="true" v-model="form.today_date"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fabu('form')">发布任务</el-button>
        <el-popconfirm
          title="确认重置任务吗？"
          confirm-button-text="好的"
          cancel-button-text="不用了"
          @confirm="chongzhi()"
        >
          <el-button slot="reference">重置任务</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reqservicer, reqshouye, reqsjs, reqgys } from "../../util/request";
export default {
  components: {},
  data() {
    return {
      form: {
        task_name: "",
        client_name: "",
        business_person: "",
        make_unit: "",
        order_name: "",
        client_ask: "",
        ap_time: "",
        today_date: "",
        goods_number:''
      },
      //客户名称
      khmc: [],
      //设计师
      sjs: [],
      //供应商
      reqgys: [],

      value: "",
    };
  },
  methods: {
    //获取当前时间
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
      this.form.today_date = `${year}-${month}-${day} ${hour}:${minute}:${second} `;
    },
    //发布任务
    fabu(formName) {
      // console.log(this.$refs);
        this.$refs[formName].validate((valid) => {
          if (valid) {
                 reqservicer(this.form, this.today_date).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.error,
            type: "success",
          });
          this.form = {
            task_name: "",
            client_name: "",
            business_person: "",
            make_unit: "",
            order_name: "",
            client_ask: "",
            ap_time: "",
            today_date: "",
            goods_number:''
          };
        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error",
          });

          //  console.log(this.$options.methods.formatDate().bind(_this));
          // this.$options.methods.formatDate().bind(this)()
          // this.$options.methods.currentTime().bind(this)()
        }
      });
          } else {
            console.log();
           this.$refs.form.focus()
            return false;
          }
        });

    },
    //客户名称搜索
    querySearch_kh(queryString, cb) {
      if (queryString !== "") {
        reqshouye(this.form).then((res) => {
          const newHtml = `<span style="color:#ff5c70">${queryString}</span>`;
          this.khmc = res.data;
          this.khmc.forEach((item) => {
            item.value1 = item.value.replace(queryString, newHtml);
          });
          cb(this.khmc);
        });
      }
    },
    handleSelect_kh(value) {
      this.form.client_name = value.value;
    },
    //设计师搜索
    querySearch_sjs(queryString, cb) {
      if (queryString !== "") {
        reqsjs(this.form).then((res) => {
          const newHtml = `<span style="color:#ff5c70">${queryString}</span>`;
          this.sjs = res.data;
          this.sjs.forEach((item) => {
            item.value1 = item.value.replace(queryString, newHtml);
          });
          cb(this.sjs);
        });
      }
    },
    handleSelect_sjs(value) {
      this.form.order_name = value.value;
    },
    //供应商搜索
    querySearch_gys(queryString, cb) {
      if (queryString !== "") {
        reqgys(this.form).then((res) => {
          const newHtml = `<span style="color:#ff5c70">${queryString}</span>`;
          this.gys = res.data;
          this.gys.forEach((item) => {
            item.value1 = item.value.replace(queryString, newHtml);
          });
          cb(this.gys);
        });
      }
    },
    handleSelect_gys(value) {
      this.form.make_unit = value.value;
    },
    //搜索的赋值
    select() {
      reqshouye(this.form).then((res) => {
        this.khmc = res.data;
        // console.log(this.khmc);
      });
      reqsjs(this.form).then((res) => {
        this.sjs = res.data;
      });
      reqgys(this.form).then((res) => {
        this.gys = res.data;
      });
    },
    chongzhi() {
      this.form = {
        task_name: "",
        client_name: "",
        business_person: "",
        make_unit: "",
        order_name: "",
        client_ask: "",
        ap_time: "",
        today_date: "",
        goods_number:''
      };
    },
  },
  mounted() {
    this.currentTime();
    this.select();
  },
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  },
};
</script>
<style scoped>
</style>
<style >
#Issue_yw {
  color: #333;
  text-align: left;
  width: 800px;
  /* background-color: rosybrown; */
  margin: 0 auto;
}
#Issue_yw .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 40%;
}
#Issue_yw .el-input--suffix {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 288px;
}
#Issue_yw .khmc .el-input {
  width: 288px;
}
#Issue_yw .sjs .el-input {
  width: 288px;
}
#Issue_yw .gys .el-input {
  width: 288px;
}
</style>