<template>
  <div id="View">
    <div class="left">
      <el-date-picker
        v-model="form.total_time"
        type="datetimerange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>

      &nbsp; &nbsp;
      <el-button
        type="primary"
        v-model="form.auth_sh"
        @click="ys_y()"
        plain
        v-if="cwsy"
        >已审阅</el-button
      >
      <el-button
        type="warning"
        v-model="form.auth_sh"
        @click="ws_y()"
        plain
        v-if="cwsy"
        >未审阅</el-button
      >
      <el-button
      type="success"
        v-model="form.auth_sh"
        @click="qb_y()"
        plain
        v-if="cwsy"
        >全部数据</el-button
      >
      <!-- <el-badge :value="dwc_num" class="item"> -->
        <el-button size="small" v-model="form.state" @click="dwc()"
          >待完成</el-button
        >
      <!-- </el-badge> -->
      &nbsp;&nbsp;&nbsp;&nbsp;
     
        <el-button size="small" v-model="form.state" @click="ywc()"
          >已完成</el-button
        >
      
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-select v-model="form.order_name" filterable  clearable  placeholder="请选择下单人">
        <el-option
        
          v-for="item in xdrList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @focus='focus'
        >
        </el-option>
      </el-select>

    <!-- 客户名称搜索 -->
        <el-autocomplete
          v-model="form.client_name"
          :fetch-suggestions="querySearch_kh"
          placeholder="请输入客户名称"
          @select="handleSelect_kh"
        >
          <div slot-scope="{ item }" v-html="item.value1"></div>
        </el-autocomplete>
    <!-- 制作单位搜索 -->
        <el-autocomplete
          v-model="form.make_unit"
          :fetch-suggestions="querySearch_gys"
          placeholder="请输入制作单位"
          @select="handleSelect_gys"
        >
          <div slot-scope="{ item }" v-html="item.value1"></div>
        </el-autocomplete>
        <!-- 查询工单号 -->
        <el-input v-model="form.uid_order" placeholder="请输入查询单号"></el-input>

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

    <!-- table表格 -->
    
    <el-table
    ref = "table"
    id="my-table"
      class="hidden-xs-only"
      :data="list"
      v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)"
      :border="true"
      style="width: 100%; text-align:center;"
      align="center"
      height="676"
      :row-class-name="tableRowClassName"
    >
      <el-table-column align="center"  prop="idc" label="编号">
        
        <template #header>
          <i
            class="el-icon-setting"
            style="font-size: 22px; cursor: pointer"
            @click="visible = true"
          ></i>
        </template>




        
      </el-table-column>
      <el-table-column prop="audit_sh" label="审核"  v-if="false"> </el-table-column>
      <el-table-column  prop="client_name"  v-if="showColumn.client_name" width="150" label="客户名称"> </el-table-column>
      <el-table-column prop="today_date" v-if="showColumn.today_date"  width="150" label="日期"> </el-table-column>
      <el-table-column prop="goods_name" v-if="showColumn.goods_name" width="100" label="物品名称"></el-table-column>
      <el-table-column prop="client_ask" v-if="showColumn.client_ask" width="150" label="客户要求"> </el-table-column>
      <el-table-column prop="specification" v-if="showColumn.specification" width="150" label="规格">
      </el-table-column>

      <el-table-column prop="craft" v-if="showColumn.craft" width="150" label="工艺">
      </el-table-column>
      <el-table-column prop="reason" v-if="showColumn.reason" width="150" label="重做原因">
      </el-table-column>
      <el-table-column prop="frequency" v-if="showColumn.frequency" width="150" label="第几次重做">
      </el-table-column>

      <el-table-column prop="goods_number" v-if="showColumn.goods_number" width="50" label="数量"> </el-table-column>
      <!-- 筛选制作单位 -->
      <el-table-column prop="make_unit"  v-if="showColumn.make_unit" width="150"  label="制作单位"> </el-table-column>
      <el-table-column prop="order_name" v-if="showColumn.order_name" width="80" label="下单人">
        <!--         :column-key="' aStatus'"
        :filters="filterList_xd"
        :filter-method="filterHandler_xd" -->
      </el-table-column>
      <el-table-column prop="business_person" v-if="showColumn.business_person" label="业务人员">
      </el-table-column>
      <el-table-column prop="supplier_offer" v-if="showColumn.supplier_offer" label="供应商报价">
      </el-table-column>
      <el-table-column prop="client_offer" v-if="showColumn.client_offer" label="客户报价"> </el-table-column>
      <el-table-column prop="money_check" v-if="showColumn.money_check" label="现金/支票"> </el-table-column>
      <el-table-column prop="remark" v-if="showColumn.remark" label="备注"> </el-table-column>
      <el-table-column prop="yp" width="150" label="样品">
        <template slot-scope="scope">
        <div class="demo-image__preview">
          <el-image
          scroll-container=".el-table__body-wrapper"
          style="width: 100px; height: 100px"
            :src="scope.row.pic_ture"
            :preview-src-list="srcList"
            lazy
          >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
            
              <div style="font-size: 14px;">该用户没有上传图片</div>
          </div>
          </el-image>
          <!-- {{srcList}} -->
        </div>
        <!-- <img style="width:80px" :src="scope.row.pic_ture" alt=""> -->
        </template>
      </el-table-column>
      <el-table-column  width="120"    label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" @click="handleClick(scope.row.id)" size="small" v-if="scope.row.audit_sh==0">审阅</el-button>
      <el-button @click="handleClick(scope.row.id)" size="small" type="warning" v-else>反审</el-button> -->
          <!-- <el-button
          @click="del(scope.row.id)"
          size="small">移除</el-button> -->
          <el-popconfirm
            title="确认要删除这条数据？"
            @confirm="del(scope.row.id)"
            @cancel="quxiao()"
          >
            <el-button type="danger" slot="reference" size="small"
             v-if="del_qx" >删除</el-button
            >
            <el-button
              class="xgjj"
              type="primary"
              slot="reference"
              v-if="xgqx"
              @click="handleEdit_dwc(scope.row.id)"
              size="small"
              >补充/修改</el-button
            >
            <el-button
              class="xgjj"
              type="primary"
              slot="reference"
              v-if="xgqx_wwc"
              @click="handleEdit_dwc(scope.row.id)"
              size="small"
              >补充/修改</el-button
            >
            <!-- 财务审核 -->
            <el-button
              class="xgjj"
              type="primary"
              slot="reference"
              v-if="cwsh"
              @click="handleEdit(scope.row.id)"
              size="small"
              >财务审核</el-button
            >
            
          </el-popconfirm>
            <el-button @click="danhao(scope.row.uid_order)" type="success" size="small" plain>查看单号</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出单号 -->
<el-dialog title="单号" :visible.sync="dialogTableVisible_danhao">
  {{copyTxt.danhao}}
      <el-button type="success" id="copy_text"
            :data-clipboard-text="copyTxt.danhao"
            @click="handleCopyFun">复制</el-button>
</el-dialog>

    <!-- 修改弹出 -->

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-table
        class="tanchu"
        :data="form2"
        default-expand-all
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="日期 :">
                <span>{{ props.row.today_date }}</span>
              </el-form-item>

              <el-form-item label="开票日期:">
                <span>{{ props.row.make_date }}</span>
              </el-form-item>
              <el-form-item label="结账日期:">
                <span>{{ props.row.settle_date }}</span>
              </el-form-item>

              <el-form-item label="客户要求:">
                <span>{{ props.row.client_ask }}</span>
              </el-form-item>
              <el-form-item label="规格及工艺:">
                <span>{{ props.row.specification }}</span>
              </el-form-item>
              <el-form-item label="数量:">
                <span>{{ props.row.goods_number }}</span>
              </el-form-item>
              <el-form-item label="制作单位:">
                <span>{{ props.row.make_unit }} </span>
              </el-form-item>
              <el-form-item label="业务人员:">
                <span>{{ props.row.business_person }}</span>
              </el-form-item>
              <el-form-item label="供应商报价:">
                <span>{{ props.row.supplier_offer }}</span>
              </el-form-item>
              <el-form-item label="客户报价:">
                <span>{{ props.row.client_offer }}</span>
              </el-form-item>
              <el-form-item label="现金/支票:">
                <span>{{ props.row.money_check }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
              <el-form-item label="样品:">
                <span>
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="props.row.pic_ture"
                      :preview-src-list="srcList"
                    >
                    
                    <div slot="error" class="image-slot">
        该用户没有上传图片
      </div>
    
                    </el-image>
                  </div>
                </span>
              </el-form-item>

              <el-form-item label="操作">
                <el-button
                  type="primary"
                  @click="handleClick(props.row.id)"
                  size="small"
                  v-if="props.row.audit_sh == 0"
                  >审阅</el-button
                >
                <el-button
                  @click="handleClick(props.row.id)"
                  size="small"
                  type="warning"
                  v-else
                  >反审</el-button
                >
                <el-popconfirm
                  title="确认要删除这条数据？"
                  @confirm="del(props.row.id)"
                  @cancel="quxiao()"
                >
                  <el-button slot="reference" size="small">删除</el-button>
                </el-popconfirm>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="id"> </el-table-column>
        <el-table-column label="客户名称" prop="client_name"> </el-table-column>
        <el-table-column label="物品名称" prop="goods_name"> </el-table-column>
        <el-table-column label="下单人" prop="order_name"> </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qd()">确 定</el-button>
      </div>

      <el-form :model="form3" class="tanchu1">
        <el-form-item label="开票日期：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form3.make_date"
            align="right"
            type="datetime"
            placeholder="开票日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结账日期：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form3.settle_date"
            align="right"
            type="datetime"
            placeholder="结账日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <!-- <el-input v-model="form3.settle_date " autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="现金支票：" :label-width="formLabelWidth">
          <el-select
            v-model="form3.money_check"
            placeholder="请选择支付方式"
            :change="remoteMethod"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商报价：" :label-width="formLabelWidth">
          <el-input
            v-model="form3.supplier_offer"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户报价：" :label-width="formLabelWidth">
          <el-input v-model="form3.client_offer" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹出显示隐藏列 -->

    <el-dialog title="字段配置" :visible.sync="visible">
      <transition name="fade">
        <div>
          <div>选择显示字段</div>
          <div>
            <el-checkbox v-model="showColumn.client_name" disabled>客户名称</el-checkbox>
            <el-checkbox v-model="showColumn.today_date">日期</el-checkbox>
            <el-checkbox v-model="showColumn.goods_name">物品名称</el-checkbox>
            <el-checkbox v-model="showColumn.client_ask">客户要求</el-checkbox>
            <el-checkbox v-model="showColumn.specification">规格</el-checkbox>
            <el-checkbox v-model="showColumn.craft">工艺</el-checkbox>
            <el-checkbox v-model="showColumn.reason">重做原因</el-checkbox>
            <el-checkbox v-model="showColumn.frequency">第几次重做</el-checkbox>
            <el-checkbox v-model="showColumn.goods_number">数量</el-checkbox>
            <el-checkbox v-model="showColumn.make_unit">制作单位</el-checkbox>
            <el-checkbox v-model="showColumn.order_name">下单人</el-checkbox>
            <el-checkbox v-model="showColumn.business_person">业务人员</el-checkbox>
            <el-checkbox v-model="showColumn.supplier_offer">供应商报价</el-checkbox>
            <el-checkbox v-model="showColumn.client_offer">客户报价</el-checkbox>
            <el-checkbox v-model="showColumn.money_check">现金/支票</el-checkbox>
            <el-checkbox v-model="showColumn.remark">备注</el-checkbox>



  
          </div>
        </div>
      </transition>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveColumn">确 定</el-button>
        </span>
      </template>
    </el-dialog>



    <!--响应式表格  -->
    <el-table :data="list" class="hidden-sm-and-up" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="日期 :">
              <span>{{ props.row.today_date }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-time"></i></el-divider>
            <el-form-item label="客户要求:">
              <span>{{ props.row.client_offer }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-user"></i></el-divider>
            <el-form-item label="规格及工艺:">
              <span>{{ props.row.specification }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-scissors"></i></el-divider>
            <el-form-item label="数量:">
              <span>{{ props.row.goods_number }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-edit-outline"></i></el-divider>
            <el-form-item label="制作单位:">
              <span>{{ props.row.make_unit }} </span>
            </el-form-item>
            <el-divider><i class="el-icon-s-home"></i></el-divider>
            <el-form-item label="业务人员:">
              <span>{{ props.row.business_person }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-s-custom"></i></el-divider>
            <el-form-item label="供应商报价:">
              <span>{{ props.row.supplier_offer }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-coffee-cup"></i></el-divider>
            <el-form-item label="客户报价:">
              <span>{{ props.row.supplier_offer }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-tableware"></i></el-divider>
            <el-form-item label="现金/支票:">
              <span>{{ props.row.cash_check }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-collection-tag"></i></el-divider>
            <el-form-item label="备注:">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
            <el-divider><i class="el-icon-chat-dot-square"></i></el-divider>
            <el-form-item label="样品:">
              <span>
                <img style="width: 80px" :src="props.row.pic_ture" alt="" />
              </span>
            </el-form-item>
            <el-divider><i class="el-icon-picture-outline"></i></el-divider>

            <el-form-item label="操作">
                     <el-button @click="danhao(props.row.uid_order)" type="success" size="small" plain>查看单号</el-button>
              <el-button @click="handleClick(props.row)" size="small"
                >审阅</el-button
              >
              <!-- <el-button
          @click="del(scope.row.id)"
          size="small">移除</el-button> -->
              <el-popconfirm
                title="确认要删除这条数据？"
                @confirm="del(props.row.id)"
                @cancel="quxiao()"
              >
                <el-button slot="reference" size="small">删除</el-button>
              </el-popconfirm>
            </el-form-item>
            <el-divider><i class="el-icon-thumb"></i></el-divider>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="idc"> </el-table-column>
      <el-table-column label="客户名称" prop="client_name"> </el-table-column>
      <el-table-column label="物品名称" prop="goods_name"> </el-table-column>
      <el-table-column label="下单人" prop="order_name"> </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      class="block hidden-xs-only"
      background
      @current-change="currentPage"
      @size-change="handleSizeChange"
      :page-sizes="[20, 50, 100]"
      :page-size="50"
      layout="sizes,total,prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 响应式分页 -->
    <el-row>
      <el-col :span="24">
        <div class="block hidden-sm-and-up">
          <el-pagination
            small
            background
            @current-change="currentPage"
            :page-size="10"
            layout="total,prev, pager, next"
            :total="total"
          >
          </el-pagination></div
      ></el-col>
    </el-row>
    <!-- 遮罩 -->
    <div id="background">
      <!-- 弹框 (模态框) -->
      <span class="el-image-viewer__close" @click="guanbi">
             <i class="el-icon-circle-close" style="color:white;margin-top:7.5px"></i>
      </span>
      <!-- <i class="el-icon-circle-close"></i> -->
     
      <!-- <div   @click="guanbi" class="img_a">
 <img  :src="srcList1" alt="" />
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Clipboard from 'clipboard'
import {
  reqdelete,
  reqapprove,
  reqsearch,
  reqedit_gd,
  reqdwcedit,
  reqbig,
  reqshouye,
  reqgys
} from "../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "ckgd/list",
      list_d: "ckgd/list_d",
      total: "ckgd/total",
      srcList: "ckgd/srcList",
      xdList: "ckgd/xdList",
      xdrList: "ckgd/xdrList",
      dwc_num: "ckgd/dwc_num",
      ywc_num: "ckgd/ywc_num",
      list_qx: "user/list",
    }),
  },
  components: {},
  data() {
    return {

      // 展示列

      showColumn: {
        client_name: true,//客户名称
        today_date: true,//日期
        goods_name: true,//物品名称
        client_ask: true,//客户要求
        specification: true,//规格
        craft: true,//工艺
        reason: true,//重做原因
        frequency: true,//第几次重做
        goods_number: true,//数量
        make_unit: true,//制作单位
        order_name: true,//下单人
        business_person: true,//业务人员
        supplier_offer: true,//供应商报价
        client_offer: true,//客户报价
        money_check: true,//现金/支票
        remark: true,//备注
      },
      visible: false,


      copyTxt:{
        danhao:''
      },
      //单号
      // danhao:'',
      //excel导出数据
      json_fields:{
           "编号": "idc", 
           "日期":"today_date",
           "客户名称":"client_name",
           "物品名称": "goods_name", 
           "客户要求":"client_ask",
           "规格及工艺": "specification", 
           "数量":"goods_number",
           "制作单位": "make_unit", 
           "下单人":"order_name",
           "业务人员": "business_person", 
           "供应商报价":"supplier_offer",
           "客户报价": "audit_sh", 
           "现金支票":"money_check",
           "备注": "remark", 
           "单号": "uid_order", 
           "样品":{

          field: "pic_ture",
                    //自定义回调函数
          callback: value => {
            return `${value}`;
          }
           }
      },
      loading:false,
      srcList1: [
       
      ],
      //查看图片
      header: require("../../assets/img/header.jpg"),
      //修改权限
      xgqx: false,
      xgqx_wwc: false,
      cwsh: false,
      //审阅权限
      cwsy: true,
      //
      del_qx:false,
      //  visible: false,
      //图片
      imgUrl1: require("../../assets/img/1.jpeg"),
      //大图片

      //筛选所有数据
      listQuery: {
        status: "",
      },
      formLabelWidth: "120px",
      //
      dialogFormVisible: false,
      dialogTableVisible_danhao:false,
      //  from2:{
      //       auth_sh:"",
      //  },
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
              picker.$emit("pick", data);
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
      form: {
        total_time: "",
        auth_sh: 0,
        state: 1,
        order_name:'',
        client_name:'',
        make_unit:'',
        uid_order:'',
        page:1
      },
      form2: [],
      form3: {},
      filterList_xd: [],
      //修改现金支票
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
        khmc:'',
        gys:'',
      //下拉人员

      //表格

      //分页
      pagesize: 1,
      value2: "",
    };
  },
  methods: {
    remoteMethod(query) {
      console.log(123);
    },
    ...mapActions({
      reqestreqckgd: "ckgd/reqestreqckgd",
      requestcount: "ckgd/requestcount",
      changeCurrentPages: "ckgd/changeCurrentPages",
      requestSrclist: "ckgd/requestSrclist",
      requestXdList: "ckgd/requestXdList",
      requestdwc_num: "ckgd/requestdwc_num",
      requestywc_num: "ckgd/requestywc_num",
      reqestreqckgd_d: "ckgd/reqestreqckgd_d",
      reqestpage_num: "ckgd/reqestpage_num",
    }),
    openFullScreen2() {
      this.loading=true
        setTimeout(() => {
          this.loading=false
        }, 1500);
      },

    openFullScreen3() {
     
      this.loading=true
        setTimeout(() => {
          this.loading=false
          this.requestSrclist();
        }, 1500);
      },
    
      //展示列
      saveColumn() {
      localStorage.setItem("columnSet",JSON.stringify(this.showColumn))
      this.visible = false;
    },



    //日期搜索
    search() {
      // reqsearch(this.form).then(res =>{
      //   // 2021-05-27 17:45:13
      // })
      // this.form.page="1"

      this.reqestreqckgd(this.form);
      this.requestcount(this.form);

    this.openFullScreen2()
      // this.currentPage()
      // this.requestSrclist();  
      // this.form.auth=0;
      // this.changeCurrentPages(1);
      this.requestSrclist();
    },

    //筛选制作单位

    //修改当前页
    currentPage(a) {
        // this.form.page=a
          console.log(a)
          this.changeCurrentPages(a,this.form);
          this.search()
          this.requestSrclist();
          // this.search()
          // this.search()
          // this.search()
          // this.search()

          
      console.log(this.form.page);
    },
    handleSizeChange(a){
      console.log(a)
      this.reqestpage_num(a)
      this.search()
      this.requestSrclist();
    },
    
    //修改数据
    handleEdit(id) {
      console.log(id);
      this.dialogFormVisible = true;
      reqedit_gd({ id: id }).then((res) => {
        this.form2 = [res.data.data];
        // this.form2.money_check=this.options.label
        this.form3 = res.data.data;
        console.log(this.form2[0].money_check);
        // console.log(this.form3);
      });
    },
    //待完成数据
    handleEdit_dwc(id) {
      this.$router.push({
        // path:"/index/Issue",
        name: "发布工单",
        query: {
          id: id,
        },
      });
      console.log(id);
    },
    qd() {
      console.log(this.form3.money_check);
      reqedit_gd({
        id2: this.form3.id,
        settle_date: this.form3.settle_date,
        make_date: this.form3.make_date,
        money_check: this.form3.money_check,
        client_offer: this.form3.client_offer,
        supplier_offer: this.form3.supplier_offer,
      }).then((res) => {
        this.$message({
          showClose: true,
          message: res.data.data,
          type: "success",
        });
        this.reqestreqckgd();
        this.requestcount();
        this.requestSrclist();
        // this.requestXdList();
      });
      this.reqestreqckgd();
      this.requestcount();
      this.requestSrclist();
      // this.requestXdList();
      this.dialogFormVisible = false;
    },

    //移除
    del(id) {
      reqdelete({ id: id }).then((res) => {
        // this.reqestreqckgd();
        // this.requestcount();
        // this.requestdwc_num();
        // this.requestywc_num();
        this.search()
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
     
    },
    //审阅
    handleClick(id) {
      this.dialogFormVisible = false;
      reqapprove({ id: id }).then((res) => {
        
      });
      this.search()
    },

    quxiao() {
      this.$message("取消删除");
    },


    // 改变某一行的颜色


    tableRowClassName({row,column,rowIndex,columnIndex}){

if(row.audit_sh == 1){
    return 'warning-row';
}

},


    //已审阅
    ys_y() {
      this.form.auth_sh = "1";
      this.form.state = "1";
      // console.log(this.auth_sh);
      this.reqestreqckgd(this.form);
      this.requestcount(this.form);
      this.requestSrclist();
      this.search(this.form)
      // this.requestXdList();
      //  console.log(this.form);
    },
    
    //未审阅
    ws_y() {
      this.form.auth_sh = "0";
      this.form.state = "1";
      // console.log(this.auth_sh);
      this.reqestreqckgd(this.form);
      this.requestcount(this.form);
      this.requestSrclist(this.form);
      this.search(this.form)
      // this.search()
      // this.requestXdList();
      // console.log(this.form);
    },
    qb_y() {
      this.form.auth_sh = "";
      this.form.state = "1";
      // console.log(this.auth_sh);
      this.reqestreqckgd(this.form);
      this.requestcount(this.form);
      this.requestSrclist(this.form)
      this.search(this.form)
      // this.search();
      // this.requestXdList();
      // console.log(this.form);
    },
 
    //待完成
    dwc() {
      this.form.state = 0;

      if (this.list_qx[2] == 1) {
        this.xgqx_wwc = false;
        this.xgqx = false;
        this.cwsh = false;
        this.del_qx=true;
      }else if(this.list_qx[2]==2){
                this.xgqx_wwc = false;
        this.xgqx = true;
        this.cwsh = false;
        this.del_qx=true;
      }else if(this.list_qx[2]==3){
        this.xgqx_wwc = true;
        this.xgqx = false;
        this.cwsh = false;
        this.del_qx=false;
      }

      // this.xgqx_wwc = true;
      // this.xgqx = false;
      console.log(this.form.state);
      this.reqestreqckgd(this.form);
      this.requestcount(this.form);
      this.requestSrclist();
            this.requestdwc_num(this.form)
      // this.requestXdList();
      //  console.log(this.form);
    },
    //已完成
    ywc() {
      this.form.state = 1;
      this.xgqx_wwc = false;
      if (this.list_qx[2] == 1) {
        this.cwsh = true;
        this.del_qx=true;
      } else {
        this.cwsh = false;
        this.del_qx=false;
      }
      if(this.list_qx[2]==2){
        this.del_qx=true;
      }
      console.log(this.form.state);
      this.reqestreqckgd(this.form);
      this.requestcount(this.form);
      this.requestSrclist();
      // this.requestXdList();
      //  console.log(this.form);
    },
    //查看图片
    img_i(e) {
      console.log(e);

            // reqbig({pic_name:e}).then(res=>{

            // })
            this.srcList1 = [e];
          //   if(e==""){
          //     this.srcList1=""
          //   }
          //   var background  = document.getElementById('background')
          //  background.style.display = "block";
      
    

      console.log(this.srcList1);
    },
    //关闭图片
    guanbi(){
      var background  = document.getElementById('background')
           background.style.display = "none";
             this.srcList1 = [];
      
    },
    // 查看单号
    danhao(uid_order){
      this.dialogTableVisible_danhao=true
      console.log(uid_order);
      this.copyTxt.danhao=uid_order
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

    //搜索赋值
     select() {
      reqshouye(this.form).then((res) => {
        this.khmc = res.data;
        // console.log(this.khmc);
      });
        reqgys(this.form).then((res) => {
        this.gys = res.data;
      });
    },
    focus(){
      alert(111)
    },
      getData(){
        this.xdrList
        this.list
  },
           timer() {
        return setTimeout(()=>{
          this.getData()
        },1000)
      },

      // 点击复制
         handleCopyFun() {
      let clipboard = new Clipboard('#copy_text')
      clipboard.on('success', e => {
        alert('复制成功')
        clipboard.destroy() // 释放内存
      })
      clipboard.on('error', e => {
        // 不支持复制
        alert('该浏览器不支持自动复制')
        clipboard.destroy() // 释放内存
      })
    }
  },
  beforeUpdate() {
  /** 在数据加载完，重新渲染表格 */
  this.$nextTick(() => {
    this.$refs.table.doLayout()
  })
},
  mounted() {
// this.list


    //固定图片
    // reqckgd().then(res=>{
    //   this.header=res.data.
    // })

     this.select();
     this.requestSrclist(this.form); 
    this.reqestreqckgd(this.form);
    this.requestcount(this.form);
    // this.requestSrclist();
    this.requestXdList();   
    this.openFullScreen3()
    // this.requestdwc_num(this.form);
    // this.requestywc_num();
    //  this.reqestreqckgd_d();
     console.log(this.srcList);
    //  console.log(this.filterList_xd)

    //  console.log(this.list_qx[2]);
    if (this.list_qx[2] == 1) {
      this.cwsh = true;
      // this.cwsy = true;
              this.del_qx=true;
    } else {
      this.cwsh = false;
      // this.cwsy = false;
              this.del_qx=false;
    }
    console.log(this.list_qx[1]);
    if (this.list_qx[2] == 2) {
      this.xgqx = true;
      this.del_qx=true;
    } else {
      this.xgqx = false;
    }

    // console.log(localStorage.getItem("columnSet"))
    if(localStorage.getItem("columnSet")){
      this.showColumn = JSON.parse(localStorage.getItem("columnSet"))
    }else{
      this.showColumn = {
        client_name: true,//客户名称
        today_date: true,//日期
        goods_name: true,//物品名称
        client_ask: true,//客户要求
        specification: true,//规格
        craft: true,//工艺
        reason: true,//重做原因
        frequency: true,//第几次重做
        goods_number: true,//数量
        make_unit: true,//制作单位
        order_name: true,//下单人
        business_person: true,//业务人员
        supplier_offer: true,//供应商报价
        client_offer: true,//客户报价
        money_check: true,//现金/支票
        remark: true,//备注
      };
    }

  },
        watch: {
      list() {
      this.timer() 
      }
    },
};
</script>
<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}

/* 响应式表格 */
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #bf99ab;
}
.demo-table-expand .el-form-item {
  margin-bottom: 0;
  width: 100%;
}
</style>
<style lang="scss">
#View .el-button + .el-button {
  margin-left: 0px;
  margin-top: 10px;
}
#View .el-form-item__content {
  line-height: 68px;
  position: relative;
  font-size: 12px;
  color: #409eff;
}
#View .left {
  color: #333;
  text-align: left;
  line-height: 68px;
}
#View .left .el-badge {
  color: #333;
  text-align: left;
  line-height: 0px;
}
// table边框颜色
.demo-table-expand label {
  width: 90px;
  color: #8c8c8f;
  font-weight: bolder;
}
.el-table {
  font-size: 12px;
}
.el-table-filter {
  max-height: 200px;
  overflow: auto;
}
.el-pagination {
  text-align: center;
}
#View .tanchu .el-form-item__content {
  line-height: 40px;
}
#View .tanchu1 .el-form-item {
  margin-bottom: 0px;
}
#View .tanchu1 .el-form-item__label {
  line-height: 60px;
}
#View .tanchu .el-table__expanded-cell {
  line-height: 40px;
}
#View .xgjj {
  margin-top: 10px;
}
#View .el-form-item {
  text-align: left;
}
#View .export-excel-wrapper {
  width: 100px;
}
// #View .el-table {
//   // position: relative;
// }
#background {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2021;
  display: none;
  position: fixed;
  top: 0px;
  left: 0px;
}
#close {
  float: right;
  font-size: 25px;
  margin-top: 5px;
  margin-right: 8px;
}

#background .box {
  width: 200px;
  height: 300px;
  background-color: rgb(250, 9, 9);
  border-radius: 5px;
  z-index: 200;
  /* 固定位置 到中间 */
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -100px;
  display: none;
}
#background img {
  display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    max-height: 100%;
    max-width: 100%;
    transition: width .2s,opacity .4s;
}
// #background .img_a {
// position: relative;
// width: 100%;
// height: 100%;
// }
// #background .el-image-viewer__close {
//   border-radius: 50%;
//   position: absolute;
//   font-size: 24px;
//   color: #fff;
//   background-color: #606266;
//   cursor:pointer
// }
#View .left .el-input{
  width: 202px;
}
.demo-image__preview .image-slot, .demo-image__placeholder .image-slot{
  display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 14px
}
.demo-image__preview  .image-slot{
  font-size: 30px;
}
.el-image-viewer__prev{
  display: none;
}
.el-image-viewer__next{
  display: none;
}
.el-image-viewer__wrapper{
  // display: none;
  z-index: 2035!important;
}
.el-table .warning-row {
    background: #ecf5ff;
  }
  #my-table {
  margin: 0 auto;
  text-align: center;
}
</style>