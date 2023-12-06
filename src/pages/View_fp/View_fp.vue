<template>
  <div id="View">
    <div class="left">
    <el-date-picker
        v-model="form.date_range"
        type="daterange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-radio v-model="form.is_deleted" :label="true">作废</el-radio>
      <el-radio v-model="form.is_deleted" :label="false">未作废</el-radio>
      <!-- 客户 -->


      <el-select v-model="form.client" filterable  clearable  placeholder="请选择购方企业名称">
        <el-option
        
          v-for="item in list_kpqy1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- 业务员 -->
      <el-input v-model="form.receiver" placeholder="请输入业务员"></el-input>
      <!-- 开票单位 -->
      <!-- <el-input v-model="form.issuing_unit" placeholder="请输入开票单位"></el-input> -->

      <el-select v-model="form.issuing_unit" filterable  clearable  placeholder="请选择开票公司">
        <el-option
        
          v-for="item in list_kpdw1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="form.is_settled" placeholder="结账状态">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      <el-select v-model="form.invoice_type" placeholder="发票类型">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

      <el-button
        type="primary"
        icon="el-icon-search"
        circle
        @click="search"
      ></el-button>

      <download-excel
      class = "export-excel-wrapper"
      :data = "list"
      :fields = "json_fields"
      name = "工单报表.xls">
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button type="primary" size="small">导出EXCEL</el-button>
</download-excel>


    </div>

    <el-table  :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="700" border style="width: 100%"
    :row-class-name="tableRowClassName"     class="hidden-xs-only"
    >
    <el-table-column prop="code" label="发票代码" width="180">
    </el-table-column>
    <el-table-column prop="number" label="发票号码" width="180">
    </el-table-column>
    <el-table-column prop="buyer_name" label="购方企业名称">
    </el-table-column>
    <el-table-column prop="issue_date" label="开票日期">
    </el-table-column>
    <el-table-column prop="item_name" label="商品名称">
    </el-table-column>                                                                              

    <el-table-column prop="amount" label="金额">
    </el-table-column>
    <el-table-column prop="tax_rate" label="税率">
    </el-table-column>
    <el-table-column prop="tax_amount" label="税额">
    </el-table-column>
    <el-table-column prop="total_amount" label="价税合计">
    </el-table-column>
    <el-table-column prop="receiver" label="领票人">
    </el-table-column>
    <el-table-column prop="settlement_date" label="结账日期">
    </el-table-column>
    <el-table-column prop="cheque" label="支票/现金">
    </el-table-column>
    <el-table-column prop="cheque_number" label="支票号">
    </el-table-column>
    <el-table-column prop="positive_invoice" label="对应正数发票">

    </el-table-column>
    <el-table-column prop="positive_invoice_date" label="对应正数发票日期">
    </el-table-column>
    <el-table-column prop="negative_invoice" label="对应负数发票">
    </el-table-column>
    <el-table-column prop="negative_invoice_date" label="对应负数发票日期">
    </el-table-column>

    <el-table-column prop="issuing_unit" label="开票单位">
    </el-table-column>
    <el-table-column prop="invoice_type" label="发票类别">
    </el-table-column>
    <el-table-column prop="remarks" label="备注">
    </el-table-column>
    <el-table-column prop="detail_cost" label="明细">
    </el-table-column>
    <el-table-column prop="cost" label="成本">
    </el-table-column>
    <el-table-column prop="contract" label="合同">
    </el-table-column>
    <el-table-column prop="external_payment" label="外单位回款情况">
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="scope">
        <el-button
              class="xgjj"
              type="primary"
              slot="reference"
              v-if="xgqx"
              @click="handleEdit_dwc(scope.$index,scope.row)"
              size="small"
              >修改</el-button>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="is_settled" label="是否结账">
    </el-table-column>
    <el-table-column prop="is_imported" label="是否为导入发票">
    </el-table-column> -->
  </el-table>


<!-- 响应式 -->
<el-table
:data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
     class="hidden-sm-and-up"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="发票代码：">
            <span>{{ props.row.code }}</span>
          </el-form-item>
          <el-form-item label="发票号码：">
            <span>{{ props.row.number }}</span>
          </el-form-item>
          <el-form-item label="开票日期：">
            <span>{{ props.row.issue_date }}</span>
          </el-form-item>
          <el-form-item label="金额：">
            <span>{{ props.row.amount }}</span>
          </el-form-item>
          <el-form-item label="商品税率分类：">
            <span>{{ props.row.tax_rate }}</span>
          </el-form-item>
          <el-form-item label="税额：">
            <span>{{ props.row.tax_amount }}</span>
          </el-form-item>
          <el-form-item label="价税合计：">
            <span>{{ props.row.total_amount }}</span>
          </el-form-item>
          <el-form-item label="商品税率分类：">
            <span>{{ props.row.tax_rate }}</span>
          </el-form-item>
          <el-form-item label="税额：">
            <span>{{ props.row.tax_amount }}</span>
          </el-form-item>


          <el-form-item label="结账日期：">
            <span>{{ props.row.settlement_date }}</span>
          </el-form-item>
          <el-form-item label="对应正数发票：">
            <span>{{ props.row.positive_invoice }}</span>
          </el-form-item>
          <el-form-item label="对应正数发票日期：">
            <span>{{ props.row.positive_invoice_date }}</span>
          </el-form-item>
          <el-form-item label="对应负数发票：">
            <span>{{ props.row.negative_invoice }}</span>
          </el-form-item>
          <el-form-item label="对应负数发票日期：">
            <span>{{ props.row.negative_invoice_date }}</span>
          </el-form-item>
          <el-form-item label="支票号：">
            <span>{{ props.row.cheque_number }}</span>
          </el-form-item>
          <el-form-item label="开票单位：">
            <span>{{ props.row.issuing_unit }}</span>
          </el-form-item>

          <el-form-item label="发票类别：">
            <span>{{ props.row.invoice_type }}</span>
          </el-form-item>
          <el-form-item label="备注：">
            <span>{{ props.row.remarks }}</span>
          </el-form-item>
          <el-form-item label="明细：">
            <span>{{ props.row.detail_cost }}</span>
          </el-form-item>
          <el-form-item label="成本：">
            <span>{{ props.row.cost }}</span>
          </el-form-item>
          <el-form-item label="合同：">
            <span>{{ props.row.contract }}</span>
          </el-form-item>
          <el-form-item label="外单位回款情况：">
            <span>{{ props.row.external_payment }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="购方企业名称"
      prop="buyer_name">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="item_name">
    </el-table-column>
    <el-table-column
      label="支票/现金"
      prop="cheque">
    </el-table-column>
    <el-table-column
      label="领票人"
      prop="receiver">
    </el-table-column>
  </el-table>








<div class="hidden-xs-only" style="float:right;font-weight: bold;color: red;">
  <span>总金额</span><span>{{list_total_amount}}</span>&nbsp;
  <span>已结账金额</span><span>{{list_settled_amount}}</span>&nbsp;
  <span>未结账金额</span><span>{{list_unsettled_amount}}</span>
</div>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.list.length">
    </el-pagination>

<!-- 修改弹窗 -->

<el-dialog id="edit" title="发票修改" :visible.sync="dialogFormVisible_edit">
      <el-form :model="form_edit">
        <el-form-item label="购方企业名称:" :label-width="formLabelWidth">
          <el-select v-model="form_edit.buyer_name" filterable  clearable  placeholder="请选择购方企业名称">
        <el-option
        
          v-for="item in list_kpqy1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
        </el-form-item>
        <el-form-item label="开票日期:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form_edit.issue_date"
            align="right"
            type="date"
            placeholder="开票日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <!-- <el-input v-model="form3.settle_date " autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="商品名称:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.item_name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="金额:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="税率:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.tax_rate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="税额:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.tax_amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领票人:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.receiver" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结账日期:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form_edit.settlement_date"
            align="right"
            type="date"
            placeholder="结账日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <!-- <el-input v-model="form3.settle_date " autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="对应正数发票:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.positive_invoice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="对应正数发票日期:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form_edit.positive_invoice_date"
            align="right"
            type="date"
            placeholder="对应正数发票日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="对应负数发票:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.negative_invoice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="对应负数发票日期:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form_edit.negative_invoice_date"
            align="right"
            type="date"
            placeholder="对应负数发票日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="支票/现金:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.cheque" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支票号:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.cheque_number" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="开票单位:" :label-width="formLabelWidth">
          <el-select v-model="form_edit.issuing_unit" filterable  clearable  placeholder="请选择购方企业名称">
        <el-option
        
          v-for="item in list_kpdw1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
        </el-form-item>
        <el-form-item label="发票类别:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.invoice_type" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.remarks" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="明细:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.detail_cost" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="成本:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.cost" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="合同:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.contract" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="外单位回款情况:" :label-width="formLabelWidth">
          <el-input v-model="form_edit.external_payment" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_edit = false">取 消</el-button>
        <el-button type="primary" @click="qd()">确 定</el-button>
      </div>
    </el-dialog>


  </div>



  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import{reqfpedit,reqfp_qd} from  "../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "ckfp/list",
      list_total_amount: "ckfp/list_total_amount",
      list_settled_amount: "ckfp/list_settled_amount",
      list_unsettled_amount: "ckfp/list_unsettled_amount",
      list_kpqy1: "ckfp/list_kpqy1",
      list_kpdw1: "ckfp/list_kpdw1",

    }),
  },
  components: {
    

  },
  data() {
    return {
      // 修改权限
      xgqx:true,
      dialogFormVisible_edit:false,
      formLabelWidth: "140px",
      table_index:"",
      // 
      form:{
        date_range:"",
        is_deleted:false,
        client:"",
        receiver:"",
        issuing_unit:"",
        invoice_type:"",
        is_settled:"all"
      },
      form_edit:{

      },
      options: [{
          value: 'settled',
          label: '已结账'
        }, {
          value: 'unsettled',
          label: '未结账'
        }, {
          value: 'all',
          label: '全部'
        }],
      options1: [{
          value: '普票',
          label: '普票'
        }, 
        {
          value: '专票',
          label: '专票'
        },
        {
          value: '',
          label: '全部'
        },
       ],
        currentPage: 1,
        pagesize: 20, 
// 导出发票
        json_fields:{
           "发票代码": "code", 
           "发票号码":"number",
           "购方企业名称":"buyer_name",                                               
           "开票日期": "issue_date", 
           "商品名称":"item_name",
           "金额": "amount", 
           "税率":"tax_rate",
           "税额": "tax_amount", 
           "价税合计":"total_amount",
           "领票人": "receiver", 
           "结账日期":"settlement_date",
           "对应正数发票": "positive_invoice", 
           "对应正数发票日期":"positive_invoice_date",
           "对应负数发票": "negative_invoice", 
           "对应负数发票日期": "negative_invoice_date", 
           "支票/现金":"cheque",
           "支票号": "cheque_number", 
           "开票单位": "issuing_unit", 
           "发票类别":"invoice_type",
           "备注": "remarks", 
           "明细/成本":"detail_cost",


    },

  }

  },
  methods: {
    ...mapActions({
      reqestreqckfp: "ckfp/reqestreqckfp",
      reqestreqckfpta: "ckfp/reqestreqckfpta",
      reqestreqckfpsa: "ckfp/reqestreqckfpsa",
      reqestreqckfpua: "ckfp/reqestreqckfpua",
      requestkpqy: "ckfp/requestkpqy",
      requestkpdw: "ckfp/requestkpdw",
      // requestcount: "ckgd/requestcount",
      // changeCurrentPages: "ckgd/changeCurrentPages",
      // requestSrclist: "ckgd/requestSrclist",
      // requestXdList: "ckgd/requestXdList",
      // requestdwc_num: "ckgd/requestdwc_num",
      // requestywc_num: "ckgd/requestywc_num",
      // reqestreqckgd_d: "ckgd/reqestreqckgd_d",
      // reqestpage_num: "ckgd/reqestpage_num",
    }),
          //开始结束日期封装方法
          search() {
      // reqsearch(this.form).then(res =>{
      //   // 2021-05-27 17:45:13
      // })
      // this.form.page="1"

      this.reqestreqckfp(this.form);
    this.reqestreqckfpta(this.form);
    this.reqestreqckfpsa(this.form);
    this.reqestreqckfpua(this.form);
    },
    // 分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        
      this.pagesize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.list.length);
        this.currentPage = val;
      },
      // 修改
      handleEdit_dwc(index,row){
        this.dialogFormVisible_edit=true
        console.log(index);
        reqfpedit({id:row.id}).then(res=>{
       console.log(res.data.data[0]); 
       this.form_edit=res.data.data[0]
        })


        
      this.table_index=index;
      },
      qd(){
        reqfp_qd({
          id:this.form_edit.id,
          amount:this.form_edit.amount,
          buyer_name:this.form_edit.buyer_name,
          issue_date:this.form_edit.issue_date,
          item_name:this.form_edit.item_name,
          tax_rate:this.form_edit.tax_rate,
          tax_amount:this.form_edit.tax_amount,
          receiver:this.form_edit.receiver,
          settlement_date:this.form_edit.settlement_date,
          positive_invoice:this.form_edit.positive_invoice,
          positive_invoice_date:this.form_edit.positive_invoice_date,
          negative_invoice:this.form_edit.negative_invoice,
          negative_invoice_date:this.form_edit.negative_invoice_date,
          cheque:this.form_edit.cheque,
          issuing_unit:this.form_edit.issuing_unit,
          invoice_type:this.form_edit.invoice_type,
          remarks:this.form_edit.remarks,
          detail_cost:this.form_edit.detail_cost,
          cost:this.form_edit.cost,
          cheque_number:this.form_edit.cheque_number,
          contract:this.form_edit.contract,
          external_payment:this.form_edit.external_payment,
        }).then(res=>{
this.search()
this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
        })

        this.dialogFormVisible_edit=false
      },
      tableRowClassName({row,column,rowIndex,columnIndex}){

if(row.is_deleted == true){
    return 'warning-row';
}

},


  },
  mounted() {
    this.reqestreqckfp(this.form)
    this.reqestreqckfpta(this.form);
    this.reqestreqckfpsa(this.form);
    this.reqestreqckfpua(this.form);
    this.requestkpqy();
    this.requestkpdw();
    
    // console.log(this.list_total_amount);
    // console.log(this.list_settled_amount);
    // console.log(this.list_unsettled_amount);
  },
  create(){
 
  }
}
</script>
<style scoped>
  #View .left{
    color: #333;
    text-align: left;
    line-height: 68px;
  }
  #View .el-input{
width: 200px;
  }
  #View .export-excel-wrapper {
  width: 100px;
}
#edit .el-input{
  width: 100%;
}
#edit .el-select{
  width: 100%;
}
.el-table::before{
background-color: #fff;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .el-form-item__label{
    color: #99a9bf!important;
  }
 .el-table__expanded-cell{
  padding: 0px!important;
}
</style>
<style>
#View .el-table .warning-row {
    background: #FFB6C1;
  }
  .el-table::before{
background-color: #fff;
}
.el-form--inline .el-form-item__label {
  color: #99a9bf!important;
  font-size: 9px;
  }
.el-form-item__content {
 font-size: 9px;
  }
.el-table__expanded-cell{
  padding: 10px!important;
}
</style>