<template>
  <div>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户:">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码:">
    <el-input v-model="form.password1"></el-input>
  </el-form-item>
  <el-form-item label="确认密码:">
    <el-input v-model="form.password2"></el-input>
  </el-form-item>
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
    <el-button type="primary" @click="zhuce()">注册</el-button>
</el-form>




  </div>
</template>
<script>
import {reqzhuce} from "../../util/request"
export default {
  components: {},
  data() {
    return {
         form: {
          username: '',
          password1: '',
          password2: '',
          collect:'',
          grade:''
        },
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
    };
  },
  methods: {
zhuce(){
    reqzhuce(this.form).then((res)=>{
        if(res.data.code==200){
                this.$message({
                message: res.data.data,
                type: 'success'
        });
        }else{
            this.$message(res.data.data)
        }
            
    })

}
  },
  mounted() {

  },
};
</script>
<style scoped>
</style>