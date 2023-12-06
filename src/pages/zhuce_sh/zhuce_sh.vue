<template>
  <div>

      <el-card class="box-card">
<div slot="header" class="clearfix">
  <span>注册审核</span>
</div>
<div v-for="(item, i) in list" :key="i" class="text item">
  <el-descriptions :labelStyle="labelStyle" :contentStyle="contentStyle" class="margin-top"  direction="vertical" :column="3" style="text-align: center;" border>
  <el-descriptions-item>
    <template slot="label">
      <i class="el-icon-user"></i>
      微信名称
    </template>
    {{item.nickname}}
  </el-descriptions-item>
  <el-descriptions-item>
    <template slot="label">
      <i class="el-icon-mobile-phone"></i>
      性别
    </template>
    {{item.sex}}
  </el-descriptions-item>
  <el-descriptions-item>
    <template slot="label">
      <i class="el-icon-location-outline"></i>
      手机号
    </template>
    {{item.phone}}
  </el-descriptions-item>
  <el-descriptions-item>
    <template slot="label">
      <i class="el-icon-tickets"></i>
      姓名
    </template>
  {{item.username}}
  </el-descriptions-item>
  <el-descriptions-item>
    <template slot="label">
      <i class="el-icon-office-building"></i>
      头像
    </template>
    <img style="margin:0 auto ;" :src="item.headimgurl" alt="">
  </el-descriptions-item>
  <el-descriptions-item>
    <template slot="label">
      <i class="el-icon-office-building"></i>
      操作
    </template>
      <!-- <el-button  type="primary" size="small" @click="a(item.id)" >绑定</el-button> -->
      <el-button  v-if="item.is_admin" type="primary" size="small"  @click="a(item.id)" >绑定</el-button>
      <el-button v-else type="primary" size="small" @click="b(item.id)" >审核</el-button>
   
  </el-descriptions-item>
</el-descriptions>

<!-- 绑定弹出框 -->
<el-dialog
title="提示"
:visible.sync="dialogVisible"
width="30%"
>
<span>是否同意该用户微信登录权限</span>
<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible = false">取 消</el-button>
  <el-button type="primary" @click="qd_bd()">确 定</el-button>
</span>
</el-dialog>
<!-- 注册权限弹出框 -->
<el-dialog
title="提示"
:visible.sync="dialogVisible_zc"
width="30%"
>
<el-form ref="form" :model="form" label-width="80px">
<el-form-item label="选择组别:">
  
  <el-select v-model="form.collect" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  </el-form-item>

  <el-form-item label="选择等级:">
    
  <el-select v-model="form.grade" placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  </el-form-item>
  <el-form-item label="发票权限:">
    
    <el-select v-model="form.lnvoice" placeholder="请选择">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  
    </el-form-item>
    <el-form-item label="发票分组:">
    
    <el-select v-model="form.lnvoiceuser" placeholder="请选择">
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  
    </el-form-item>
</el-form>

<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible_zc = false">取 消</el-button>
  <el-button type="primary" @click="qd_zhuce()">确 定</el-button>
</span>
</el-dialog>



</div>
</el-card>



  </div>
  </template>
  <script>
import {reqzhuce_sh,reqzhuce_shtj} from "../../util/request"
  export default {
  components:{
   },
  data () {
   return {
      dialogVisible:false,
      dialogVisible_zc:false,
      form: {
        id:"",
        is_admin:false,
        collect:'',
        grade:'',
        lnvoice:"",
        lnvoiceuser:"",

      },
      form2: {
        id:"",
        is_admin:true,
      },
      list:[],
      contentStyle:{
                  "text-align":"center"
      },
      labelStyle:{
                  "text-align":"center"
      },
      // 注册权限
      options: [
                  {
        value: '0',
        label: '零组'
      },
          {
        value: '1',
        label: '一组'
      }, 
      {
        value: '2',
        label: '二组'
      },

      ],
        options1: [{
        value: '1',
        label: '管理员'
      },
       {
        value: '2',
        label: '组长'
      },
       {
        value: '3',
        label: '成员'
      }
      ],
      options2: [{
        value: '1',
        label: '查询所有人发票'
      },
       {
        value: '2',
        label: '查看个人发票'
      },
      ],
      options3: [{
        value: '1',
        label: '一组'
      }, 
      {
        value: '2',
        label: '二组'
      },
      ],
      

   }
  },
  methods:{
    shuaxin(){
      reqzhuce_sh().then((res)=>{
          this.list=res.data.users
      })
    },
      a(a){
          console.log(a);
          this.form2.id=a
          this.dialogVisible=true
      },
      b(b){
        this.form.id=b
          console.log(this.form)
          this.dialogVisible_zc=true

      },
      qd_bd(){
        this.dialogVisible=false
        reqzhuce_shtj(this.form2).then((res)=>{
          if (res.data.code = 200) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "warning",
          });
          this.shuaxin()
        }
          })
      },
      qd_zhuce(){
        this.dialogVisible_zc=false
        reqzhuce_shtj(this.form).then((res)=>{
          if (res.data.code = 200) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "success",
          });
          this.shuaxin()
        }
          })
      },
  },
  mounted(){
      reqzhuce_sh().then((res)=>{
          this.list=res.data.users
      })
  }
  }
  </script>
  <style scoped>
  .margin-top{
      margin: 0 auto;
      text-align: center;
  }
  .box-card{
      width: 50%;
      margin: 0 auto;
  }
  .l-descriptions-item__contentP{
      width: 200px;
  }
  </style>
<style>
.el-descriptions .is-bordered {
 table-layout:fixed!important;
margin-bottom: 20px;
 }</style>