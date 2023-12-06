<template>
  <div id="Issue_fbfp">
    <el-row :gutter="30">
      <el-col :xs="24" :sm="12"><el-button type="primary">发票代码</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.code"
          placeholder="请输入发票代码"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">发票号码</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.number"
          placeholder="请输入发票号码"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">购方企业名称</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.buyer_name"
          placeholder="请输入购方企业名称"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">开票日期</el-button> <el-tag type="primary">必填项</el-tag>
        <el-date-picker
            v-model="from.issue_date"
            align="right"
            type="date"
            placeholder="对应负数发票日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
      </el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">商品名称</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.item_name"
          placeholder="请输入商品名称"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">金额</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.amount"
          placeholder="请输入金额"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">税率</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.tax_rate"
          placeholder="请输入税率"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">税额</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.tax_amount"
          placeholder="请输入税额"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">价税合计</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.total_amount"
          placeholder="请输入价税合计"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">领票人</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.receiver"
          placeholder="请输入领票人"
        ></el-input></el-col>

        <el-col :xs="24" :sm="12"><el-button type="primary">结账日期</el-button> 
        <el-date-picker
            v-model="from.settlement_date"
            align="right"
            type="date"
            placeholder="对应负数发票日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
      </el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">支票现金</el-button>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.cheque"
          placeholder="请输入支票现金"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">支票号</el-button>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.cheque_number"
          placeholder="请输入支票号"
          type="number"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">开票单位</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.issuing_unit"
          placeholder="请输入开票单位"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">发票类型</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.invoice_type"
          placeholder="请输入发票类型"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">备注</el-button> 
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.remarks"
          placeholder="请输入备注"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">明细</el-button> 
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.detail_cost"
          placeholder="请输入明细"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">成本</el-button>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.cost"
          placeholder="请输入成本"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">合同</el-button> <el-tag type="primary">必填项</el-tag>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.contract"
          placeholder="请输入合同"
        ></el-input></el-col>
      <el-col :xs="24" :sm="12"><el-button type="primary">外单位回款情况</el-button>
        <el-input
          suffix-icon="el-icon-edit"
          v-model="from.external_payment"
          placeholder="请输入外单位回款情况"
        ></el-input></el-col>

        <el-col :span="24"
        ><el-button type="primary" @click="tijiao">提交</el-button></el-col
      >
    </el-row>
  </div>
  </template>
  <script>
  import {reqfp_add} from "../../util/request"
  export default {
  components:{
   },
  data () {
   return {
    from:{
      code:"",
      number:"",
      buyer_name:"",
      issue_date:"",
      item_name:"",
      amount:"",
      tax_rate:"",
      tax_amount:"",
      total_amount:"",
      receiver:"",
      settlement_date:"",
      cheque:"",
      cheque_number:"",
      issuing_unit:"",
      invoice_type:"",
      remarks:"",
      detail_cost:"",
      cost:"",
      contract:"",
      external_payment:"",
      
    }
   }
  },
  methods:{
    tijiao(){
      reqfp_add(this.from).then((res) => {
      if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });}else{
            this.$message({
            showClose: true,
            message: res.data.data,
            type: "error",
          })
          }

      })

    }
  },
  mounted(){
  }
  }
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
  #Issue_fbfp .el-button {
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
#Issue_fbfp .el-autocomplete {
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
#Issue_fbfp .el-select {
  width: 100%;
}
#Issue_fbfp {
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