<template>
<div>
    
<el-dialog title="收货地址" :visible.sync="dialogFormVisible_dw">
        <el-form-item label="单位名称" :label-width="formLabelWidth">
      <el-input v-model="form1.make_unit" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="单位属性" :label-width="formLabelWidth">
      <el-input v-model="form1.cash_check" autocomplete="off"></el-input>
    </el-form-item>
</el-dialog>
</div>

</template>
<style>

</style>

<script>
  export default {
    data() {
      return {
            dialogFormVisible_dw:false,
          formLabelWidth: '120px',
      }
      
    },
    methods:{
},
    mounted(){
        // this.getchioce()
}
  }
</script>