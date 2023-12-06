<template>


<div id="Issue_fp">
  <el-upload
  class="upload-demo"
  drag
  action="https://jk.hclz.cc:1597/upload_Invoice/Invoice_upload/"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处s，或<em>点击上传</em></div>
</el-upload>
<!-- <a href={{}}></a> -->
<a style="color: red;" v-if="link" :href="link">{{ error  }}</a>
</div>
</template>
<script>
import{reqscfp} from "../../util/request"
export default {

  data() {
    return {
      file: [],
      link:"",
      error:""
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarSuccess(res){
        console.log(res);
        if(res.code=="202"){
          this.$message({
          message: res.message,
          type: 'warning'
        });
        }
        if(res.code=="304"){
          this.$message({
          message: res.message,
          type: 'warning'
        });
        }
        if(res.code=="404"){
          this.$message({
          message: res.message,
          type: 'warning'
        });
        }
        if(res.code=="201"){
          this.$message({
          message: res.message,
          type: 'warning'
        });
        this.error = res.message
        }
        if(res.code=="200"){
          this.$message({
          message: res.message,
          type: 'success'
        });
        }
        if(res.code=="500"){
          this.$message({
          message: res.message,
          type: 'warning'
        });
        }
        this.link=res.filename
      },

      beforeAvatarUpload(file) {
    // 允许上传的文件格式列表
    let acceptList = ["xlsx", "xls"]
    // 根据文件名获取文件的后缀名
    let fileType = file.name.split('.').pop().toLowerCase()
    console.log(file);
    // 判断文件格式是否符合要求
    if (acceptList.indexOf(fileType) === -1) {
        this.$message.error('只能上传 xlsx/xls 格式的文件 !');
        return false
    }
    // 判断文件大小是否符合要求
    if (file.size / 1024 / 1024 > 1) {
        this.$message.error('上传文件大小不能超过 1M !');
        return false
    }
}
  },
  
  mounted() {


    
  },
};
</script>
<style scoped>

</style>