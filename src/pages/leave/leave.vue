<template>
<div id="leave">
  <div class="table">
  <el-table
      :data="list"
      :span-method="objectSpanMethod" 
        :cell-class-name="changeCellStyle"
        border
      style="width: 100%">
      
      <el-table-column
        prop="collect"
        label="分组"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        label="是否请假"
        width="180">
        <template  slot-scope="scope">
          <el-button  v-if="scope.row.check_sh==0"  @click="handleClick(scope.row.id)" type="primary" size="mini">请假</el-button>
          <el-button v-else type="info" @click="handleClick(scope.row.id)" size="mini">销假</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
         width="180">
      <template slot-scope="scope">
      <el-button   type="primary" slot="reference" @click="handleEdit(scope.row.id)" size="mini">修改密码</el-button>
      <br>
      <br>
      <el-button  type="success" slot="reference" @click="handleEdit_info(scope.row.id)" size="small">修改信息</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>

<!-- 弹出修改密码 -->
  <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
<el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="旧密码" :label-width="formLabelWidth">
      <el-input v-model="form.old_password" show-password autocomplete="off"></el-input>
    </el-form-item>

        <el-form-item label="新密码" :label-width="formLabelWidth">
      <el-input v-model="form.new_password" show-password autocomplete="off"></el-input>
    </el-form-item>
</el-form>

     <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="qdmm()">确 定</el-button>
  </div>
</el-dialog>
<!-- 弹出修改信息 -->
  <el-dialog title="修改信息" :visible.sync="dialogTableVisible_info">
<el-form :model="form_info">
        <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form_info.username" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
      <!-- <el-input v-model="form_info.sex"  autocomplete="off"></el-input> -->
    <el-radio-group v-model="form_info.sex">
      <el-radio label="男">男</el-radio>
      <el-radio label="女">女</el-radio>
    </el-radio-group>
    </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
      <el-input v-model="form_info.age" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="职务" :label-width="formLabelWidth">
      <el-input v-model="form_info.duty" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form_info.phone" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
<el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="changeImage">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-form-item>
</el-form>

     <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible_info = false">取 消</el-button>
    <el-button type="primary" @click="qd_info()">确 定</el-button>
  </div>
</el-dialog>

</div>

</template>
<style>
</style>

<script>
import {reqry_edit,reqrymm_edit,requser_up,reqsctp,requser_up_qd } from'../../util/request'
import {mapGetters,mapActions}from 'vuex'
  export default {
  computed:{
    ...mapGetters({
      list:'leave/list'
    }),
    groupNum(){  //获取分组数据
      return new Set(this.list.map(o => o.collect));
    }
  },
    data() {
      return {
        formLabelWidth: '120px',
        dialogTableVisible:false,
        dialogTableVisible_info:false,
        form:{
          id:'',
          username:'',
          new_password:'',
          old_password:'',
        },
        form_info:{
          id:'',
          username:'',
           duty:'',
           phone:'',
           age:'',
           sex:'',
          head_port:null,
          pic_ture:''
        },
          imageUrl: "",
      }
         
    },
    methods:{
          ...mapActions({
      //客户
      requestleave:'leave/requestleave',
    }),


    nameGroup(collect){  // 获取相同名称的数量
      return this.list.filter(o => o.collect == collect).length;
    },

    nameLen(collect){  //根据名称获取名称第一个数据在全部数据中的偏移位置
      const tmp = Array.from(this.groupNum);
      console.log('tmp',tmp); // ["王小虎", "王小虎2", "王小虎5"] 打印了6次,每条数据打印一次
      
      const index = tmp.indexOf(collect);  //该名称在全名称中的偏移位置
      console.log('index',index); // 0 0 1 1 1 2  分别对应名称的下标
      
      let len = 0;
      for (let i = 0;i < index;i++){
        len += this.nameGroup(tmp[i]);
      }
      console.log('len1',len); // 0 0 2 2 2 5 分别对应每个名称的行数
      
      return len;
    },
    
    objectSpanMethod(data) { //对于表格数据进行分组合并操作，UI组件回调函数
     const {row,rowIndex,columnIndex,} = data;
     console.log(columnIndex);
      if (columnIndex == 0 ) {  //名称列 合并展示区
        const len = this.nameGroup(row.collect);
        console.log('len2' , len); // 2 2 3 3 3 1 
        const lenName = this.nameLen(row.collect);
        console.log('lenName',lenName); // 0 0 2 2 2 5
        
        if (rowIndex === lenName) {   //该名称在首位名称行
          return {
            rowspan:len,
            colspan:1
          }
        } else return {   //该名称不在首位名称行
          rowspan: 0,
          colspan: 0
        };
      } else {  //其他列
       return {
          rowspan: 1,
          colspan: 1
        };
      }
    },

 handleClick(id){
    console.log(id);
    reqry_edit({id:id}).then((res)=>{
        this.requestleave()
    })
       this.requestleave()
},

  //修改密码
    handleEdit(id){
          console.log(id);
          this.dialogTableVisible=true
        reqrymm_edit({id:id}).then(res=>{
              this.form=res.data.code
              this.form.id=id
        })
    
    },
  //确定修改密码
  qdmm(){
    console.log(this.form.id);
            reqrymm_edit({id2:this.form.id,new_password:this.form.new_password,old_password:this.form.old_password,}).then(res=>{
                if(res.data.code==200){
                        this.dialogTableVisible=false
                        this.$message({
                          showClose: true,
                          message: res.data.data,
                          type: 'success'
                        });
                }else{
                          this.$message({
                          showClose: true,
                          message: res.data.data,
                          type: 'error'
                        });
                }
        })
  },
  //修改信息
      handleEdit_info(id){
          console.log(id);
          this.dialogTableVisible_info=true
                  requser_up({id:id}).then(res=>{
              this.form_info=res.data.data
              this.form_info.id=id
              this.imageUrl=res.data.data.head_port
              // console.log(this.imageUrl);
        })
        // reqrymm_edit({id:id}).then(res=>{
        //       this.form=res.data.code
        //       this.form.id=id
        // })
    },
     //确定修改信息
  qd_info(){
    // console.log(this.form.id);
    this.dialogTableVisible_info=false 
    requser_up_qd({id:this.form_info.id,duty:this.form_info.duty,phone:this.form_info.phone,sex:this.form_info.sex,age:this.form_info.age,head_port:this.form.head_port}).then(res=>{

                if(res.data.code==200){
                        this.dialogTableVisible=false
                        this.$message({
                          showClose: true,
                          message: res.data.data,
                          type: 'success'
                        });
                }else{
                          this.$message({
                          showClose: true,
                          message: res.data.data,
                          type: 'error'
                        });
                }
        })
  },
  //修改图片
      changeImage(e) {
      //获取到的文件也就是上传的图片
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.pic_ture = file;
       console.log(this.form.pic_ture );
      reqsctp(this.form).then((res) => {
     
        this.form.head_port = res.data.file_name;
           console.log(this.form.head_port);
      });
    },
        sortsort:function() {
      this.list.sort(this.sortId);
    },
        sortId(a, b) {
            let list = ["管理员","设计二组", "设计一组", "外勤", ];
      return list.indexOf(a.collect) - list.indexOf(b.collect);
    },
//     sortList(list){                // lists传的是数组
//  	return list.sort((a, b) => {
//    	 	return a['collect'].localeCompare(b['collect'])     // grapheme为字母对应的属性名
//   	})
// }
changeCellStyle(row){
if(row.column.label=="分组"){
  return 'fenzu';
  }
}
},
    mounted(){
this.$nextTick(()=>{

  this.sortsort()

});
      this.requestleave()
      
},created(){
    //  this.sortsort()
      // this.list.sort(this.sortId);
}
  }
</script>
<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
<style  lang='scss'>
#leave .table{
  width: 722px;
  margin: 0 auto;
}
#leave .el-form-item__content{
  text-align: left;
}
#leave .el-table__row .el-table_1_column_11{
  border-bottom: solid 3px #000;
  // margin-bottom: 10px;
}
.fenzu{
  border-bottom: 3px solid #000!important;
  
}
</style>