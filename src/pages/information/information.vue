<template>
  <div id="information">
    <!-- 客户 -->
    <div class="kh">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item label="客户名称">
              <el-input v-model="form.client_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户属性">
              <el-input v-model="form.cash_check"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="danger" @click="tijiao_hk()">提交</el-button>
        </el-row>
      </el-form>
      <div class="table">
        <el-table
          :data="kh_list"
          :header-cell-style="{
            background: 'rgb(210 , 85, 84)',
            color: 'white',
          }"
          border
          style="width: 100%"
        >
          <el-table-column prop="client_name" label="客户名称">
          </el-table-column>
          <el-table-column prop="cash_check" label="客户属性">
          </el-table-column>

          <el-table-column prop="linkman" label="联系人"> </el-table-column>

          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="handleEdit_kh(scope.row.id)"
                size="small"
                >修改</el-button
              >
              <el-popconfirm
                title="确认要删除这条数据？"
                @confirm="handleDelete_kh(scope.row.id)"
                @cancel="quxiao()"
              >
                <el-button type="danger" slot="reference" size="small"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        small
        layout="prev, pager, next"
        @current-change="currentPage_kh"
        :page-size="10"
        :total="kh_total"
      >
      </el-pagination>
    </div>

    <!-- 制作单位 -->
    <div class="dw">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item label="单位名称">
              <el-input v-model="form1.make_unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位属性">
              <el-input v-model="form1.cash_check"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="tijiao_dw()">提交</el-button>
        </el-row>
      </el-form>
      <div class="table">
        <el-table
          :data="dw_list"
          :header-cell-style="{ background: 'skyblue', color: 'white' }"
          border
          style="width: 100%"
        >
          <el-table-column prop="make_unit" label="单位名称"> </el-table-column>
          <el-table-column prop="cash_check" label="单位属性">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="handleEdit_dw(scope.row.id)"
                size="small"
                >修改</el-button
              >
              <el-popconfirm
                title="确认要删除这条数据？"
                @confirm="handleDelete_dw(scope.row.id)"
                @cancel="quxiao()"
              >
                <el-button slot="reference" type="danger" size="small"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        small
        layout="prev, pager, next"
        @current-change="currentPage_dw"
        :page-size="10"
        :total="dw_total"
      >
      </el-pagination>
    </div>

    <!-- 供应商 -->

    <div class="gys">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item label="供应商名称">
              <el-input v-model="form2.supplier_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商属性">
              <el-input v-model="form2.cash_check"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="tijiao_gys()">提交</el-button>
        </el-row>
      </el-form>
      <div class="table">
        <el-table
          :data="gys_list"
          :header-cell-style="{ background: '#2FA5B9', color: 'white' }"
          border
          style="width: 100%"
        >
          <el-table-column prop="supplier_name" label="单位名称"> </el-table-column>
          <el-table-column prop="cash_check" label="单位属性">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="handleEdit_gys(scope.row.id)"
                size="small"
                >修改</el-button
              >
              <el-popconfirm
                title="确认要删除这条数据？"
                @confirm="handleDelete_gys(scope.row.id)"
                @cancel="quxiao()"
              >
                <el-button slot="reference" type="danger" size="small"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        small
        layout="prev, pager, next"
        @current-change="currentPage_gys"
        :page-size="10"
        :total="gys_total"
      >
      </el-pagination>
    </div>

    <!-- 客户修改 -->
    <el-dialog title="客户修改" :visible.sync="dialogFormVisible_kh">
      <el-form :model="form">
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          <el-input v-model="form_kh.client_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户属性" :label-width="formLabelWidth">
          <el-input v-model="form_kh.cash_check" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form_kh.linkman" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qd_kh()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 单位修改 -->
    <el-dialog title="单位修改" :visible.sync="dialogFormVisible_dw">
      <el-form :model="form">
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form_dw.make_unit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位属性" :label-width="formLabelWidth">
          <el-input v-model="form_dw.cash_check" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qd_dw()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 供应商修改 -->
    <el-dialog title="供应商修改" :visible.sync="dialogFormVisible_gys">
      <el-form :model="form">
        <el-form-item label="供应商名称" :label-width="formLabelWidth">
          <el-input v-model="form_gys.supplier_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商属性" :label-width="formLabelWidth">
          <el-input v-model="form_gys.cash_check" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qd_gys()">确 定</el-button>
      </div>
    </el-dialog>

    <el-backtop>
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        顶部
      </div></el-backtop
    >
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqkhtj,
  reqzztj,
  reqgystj,
  reqkhedit,
  reqkhedit_e,
  reqdwedit,
  reqdwedit_e,
  reqgysedit,
  reqgysedit_e,
  reqkh_del,
  reqdw_del,
  reqgys_del,
} from "../../util/request";
export default {
  computed: {
    ...mapGetters({
      kh_list: "khinfo/kh_list",
      dw_list: "dwinfo/dw_list",
      gys_list: "gysinfo/gys_list",
      kh_total: "khinfo/kh_total",
      dw_total: "dwinfo/dw_total",
      gys_total: "gysinfo/gys_total",
    }),
  },
  components: {},
  data() {
    return {
      visible: false,
      dialogFormVisible_dw: false,
      dialogFormVisible_kh: false,
      dialogFormVisible_gys: false,
      formLabelWidth: "120px",
      form: {
        id: "",
        cash_check: "",
        client_name: "",
        linkman: "",
      },
      form_kh: {
        id: "",
        cash_check: "",
        client_name: "",
        linkman: "",
      },
      form1: {
        make_unit: "",
        cash_check: "",
      },
      //供应商
      form2: {
        supplier_name: "",
        cash_check: "",
      },
         form_gys: {
        id: "",
        supplier_name: "",
        cash_check: "",
      },
      //单位
      form_dw: {
        id: "",
        make_unit: "",
        cash_check: "",
      },
    };
  },
  methods: {
    ...mapActions({
      //客户
      requestkhinfo: "khinfo/requestkhinfo",
      requestkhcount: "khinfo/requestkhcount",
      changeCurrentPages_kh: "khinfo/changeCurrentPages_kh",
      //单位
      requestdwinfo: "dwinfo/requestdwinfo",
      requestdwcount: "dwinfo/requestdwcount",
      changeCurrentPages_dw: "dwinfo/changeCurrentPages_dw",
      //供应商
      requestgysinfo: "gysinfo/requestgysinfo",
      requestgyscount: "gysinfo/requestgyscount",
      changeCurrentPages_gys: "gysinfo/changeCurrentPages_gys",
    }),

    //取消删除

    quxiao() {
      this.$message("取消删除");
    },
    //客户
    tijiao_hk() {
      reqkhtj(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.data,
            type: "success",
          });
               this.requestkhinfo();
        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error",
          });
        }
      });
      this.requestkhinfo();
    },
    currentPage_kh(a) {
      // console.log(a);
      this.changeCurrentPages_kh(a);
    },
    //编辑
    handleEdit_kh(id) {
      this.dialogFormVisible_kh = true;
      // console.log(id);
      reqkhedit({ id: id }).then((res) => {
        this.form_kh = res.data;
      });
    },
    qd_kh() {
      reqkhedit_e({
        id: this.form_kh.id,
        cash_check: this.form_kh.cash_check,
        client_name: this.form_kh.client_name,
        linkman: this.form_kh.linkman,
      }).then((res) => {
        this.requestkhcount();
        this.requestkhinfo();
      });

      this.dialogFormVisible_kh = false;

      this.requestkhcount();
      this.requestkhinfo();
    },
    //删除
    handleDelete_kh(id) {
      reqkh_del({ id: id,delinformation:"client" }).then((res) => {
        if (res.data.code != 200) {
          this.$message({
            message: res.data.data,
            type: "error",
          });
          this.requestkhcount();
        this.requestkhinfo();
        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "success",
          });
          this.requestkhcount();
      this.requestkhinfo();
        }
      });

      this.requestkhcount();
      this.requestkhinfo();
    },
    //单位
    tijiao_dw() {
      reqzztj(this.form1).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.data,
            type: "success",
          });
          this.requestdwinfo();
          this.requestdwcount();
        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error",
          });
        }
      });

      this.form1.make_unit = "";
      this.form1.cash_check = "";
    },

    currentPage_dw(a) {
      // console.log();
      this.changeCurrentPages_dw(a);
    },
    //编辑
    handleEdit_dw(id) {
      this.dialogFormVisible_dw = true;
      // console.log(id);
      reqdwedit({ id: id }).then((res) => {
        this.form_dw = res.data;
      });
    },
    qd_dw() {
      reqdwedit_e({
        id: this.form_dw.id,
        make_unit: this.form_dw.make_unit,
        cash_check: this.form_dw.cash_check,
      }).then((res) => {
      this.requestdwcount();
      this.requestdwinfo();
      });
      this.dialogFormVisible_dw = false;

      this.requestdwcount();
      this.requestdwinfo();
    },
    //删除
    handleDelete_dw(id) {
      reqdw_del({ id: id,delinformation:"unit" }).then((res) => {
        if (res.data.code != 200) {
          this.$message({
            message: res.data.data,
            type: "error",
          });
          this.requestdwcount();
      this.requestdwinfo();
        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "success",
          });
          this.requestdwcount();
      this.requestdwinfo();
        }
      });


    },
    //供应商 要覆盖的
    tijiao_gys(){



      reqgystj(this.form2).then(res=>{
          
           if (res.data.code == 200) {
          this.$message({
            message: res.data.data,
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "error",
          });
        }


      this.requestgysinfo();
        this.requestgyscount();


      })
    },
       currentPage_gys(a) {
      // console.log();
      this.changeCurrentPages_gys(a);
    }, 
    handleEdit_gys(id){
      this.dialogFormVisible_gys=true
      reqgysedit({ id: id }).then((res) => {
        this.form_gys = res.data.data;
      });
    },
    qd_gys(){
          reqgysedit_e({
          id2:this.form_gys.id,
          supplier_name:this.form_gys.supplier_name,
          cash_check:this.form_gys.cash_check,
          }).then(res=>{
         this.requestgysinfo();
        this.requestgyscount();
          })
           this.dialogFormVisible_gys = false;
    },
        //删除
    handleDelete_gys(id) {
      reqgys_del({ id: id }).then((res) => {
        if (res.data.code != 200) {
          this.$message({
            message: res.data.data,
            type: "error",
          });

        } else {
          this.$message({
            showClose: true,
            message: res.data.data,
            type: "success",
          });
        }
      this.requestgyscount();
      this.requestgysinfo();
      });

      this.requestgyscount();
      this.requestgysinfo();
    },
  },
  mounted() {
    this.requestkhinfo();
    this.requestdwinfo();
    this.requestgysinfo();
    this.requestkhcount();
    this.requestdwcount();
    this.requestgyscount();
  },
};
</script>
<style scoped>
</style>
<style lang='scss'>
#information .el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  text-align: left;
}
#information .el-select {
  width: 100%;
}
#information .el-input__inner {
  margin-left: 10px;
}
#information .kh .el-form-item__label {
  background-color: rgb(210, 85, 84);
  color: white;
  border-radius: 10px;
}
#information .table {
  width: 950px;
  margin: 0 auto;
}
#information .kh .el-table__header-wrapper {
  line-height: 20px;
  background-color: rgb(210, 85, 84);
}
#information .el-row {
  line-height: 20px;
}
#information .kh .el-button--danger {
  background-color: rgb(210, 85, 84);
  margin-left: 10px;
}
#information .el-pagination {
  text-align: center;
}
//制作单位
#information .dw {
  margin-top: 20px;
}
#information .dw .el-form-item__label {
  background-color: skyblue;
  color: white;
  border-radius: 10px;
}
#information .dw .el-table__header-wrapper {
  line-height: 20px;
  background-color: skyblue;
}

#information .dw .el-button--primary {
  background-color: skyblue;
  margin-left: 10px;
}
#information .el-dialog__header {
  line-height: 10px;
  text-align: left;
}
#information {
  text-align: left;
}
//供应商
#information .gys {
  margin-top: 20px;
}
#information .gys .el-form-item__label {
  background-color: #2FA5B9;
  color: white;
  border-radius: 10px;
}
#information .gys .el-table__header-wrapper {
  line-height: 20px;
  background-color: #2FA5B9;
}

#information .gys .el-button--primary {
  background-color: #2FA5B9;
  margin-left: 10px;
}
#information .gys  .el-form-item__label {
padding: 0 4px 0 0;
}
</style>