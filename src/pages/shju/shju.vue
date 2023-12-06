<template>
  <div id="shju">
   <div class="block">
    <span class="demonstration">时间查询</span>
    <el-date-picker
      v-model="from.total_time"
      type="datetimerange"
      value-format="yyyy-MM-dd HH:MM:SS"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      <el-button icon="el-icon-search" @click="change()" circle ></el-button>
    <div class="biaoti">
        鸿创平面设计部下单工规
    </div>
    
    <div class="content">
        鸿创是一个大家庭，每一位员工都是我们亲爱的家人。一个优秀的团队一定会有好的制度和执行力，有了好的执行力我们的各个齿轮环节才能紧密结合，咬合自如，这样才会有最大的效能。 每一位平面设计部成员坚决做到不丢一单，不漏一单，下好每一个业务工单是每一位员工应尽的责任和义务。丢单漏单和不按规定写工单的，每发现一次罚款<span>30</span>元，部门领导罚<span>50</span>元，当月做到不丢单不漏单的员工下单总数是本月下单平均数2倍给予<span>300</span>元现金奖励。各部门经理负责监督。 感谢每一位鸿创家人，严于律己、恪尽职守、兢兢业业、成就自我、壮大公司、幸福家人。
    </div>
  </div>
      <!-- <el-table
            border
            size="mini"
            height="100%"
            show-summary
:span-method="objectSpanMethod" 
            :data="list"
             :cell-style="cellStyle" 
          >
            <el-table-column
              label="分组"
              align="center"
              prop="collect"
              :filters="[{text: '一组', value: '一组'}, {text: '二组', value: '二组'}]"
              :filter-method="filterHandler"
            />
            <el-table-column
              label="下单人"
              align="center"
              prop="username"
            />
            <el-table-column
              label="下单数"
              align="num"
              prop="number"
            />
          </el-table> -->

        <ul class="first" v-for="(item,i) in list" :key="i" >
              <p>平面设计部</p>
          <li :style="item1.number==0?'color:red':'color:black'"  class="first_li" style="float:left"  v-for="(item1,i) in list[i]" :key="i"> {{item1.username}}({{item1.number}})&nbsp;&nbsp;&nbsp;{{item1[i]}}<div class="aunt">总共{{item[item.length-1]}}条</div></li>
            <!-- <div class="aunt" v-for="(item1,i) in list[i]" :key="i" >总共条{{item1.data_1_num}}</div>
            <div class="aunt" v-for="(item1,i) in list[i]" :key="i" >总共条{{item1.data_1_num}}</div> -->
        </ul>
 
  </div>
</template>
<script>
import {reqstatistical} from '../../util/request'
import {mapGetters,mapActions}from 'vuex'
export default {
  computed:{
       ...mapGetters({
         list:'statistical/list'
    
    })
    
  },
  data() {
    return {
      //开始结束日期

      from:{
        total_time: '',
      },

        value2: '',
         tabPosition: 'left',

         spanArr: [],
         pos: 0,
         
    };
  },
   methods: {
     ...mapActions({
       requeststatistical:'statistical/requeststatistical'
     }),
cellStyle(row,column,rowIndex,columnIndex){
console.log(row.row.number);
console.log(row.column);
        if(row.column.label==="下单数"&&row.row.number===0){
          return 'color:red'
        }
        if(row.column.label==="下单人"&&row.row.number===0){
          return 'color:red'
        }
},
       //筛选组别
     filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
        
      },

	  getSpanArr(data) {
        // data就是我们从后台拿到的数据
      for (var i = 0; i < data.length; i++) {
        if (i == 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].collect == data[i - 1].collect) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
        console.log(this.spanArr);
      }
    
    },
     objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 ) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        // console.log(`rowspan:${_row} colspan:${_col}`);
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        };
      }
    //  this.requeststatistical()
    },
    //日期选定后触发的函数
    change(){
         this.requeststatistical(this.from)
    }
  },

  
  mounted() {
      if(this.list.length==0){
        reqstatistical().then(res=>{
          this.list=res.data.data
        })
      }

        
        //  this.objectSpanMethod()
   this.requeststatistical()

     this.requeststatistical()
     this.getSpanArr(this.list);
 
  },
  created(){
          // this.getSpanArr(this.list);
  }

};
</script>
<style scoped>
.biaoti{
    background-color: red;
    font-size: 20px;
    font-weight: bold;
    color: white;
}
.content{
    background-color: rgb(255, 245, 225);
    text-align: left;
    line-height: 30px;
    color: red;
}
span{
color: #000;
}
</style>
<style lang='scss'>
#shju .block{
    text-align: center;
}
#shju .first{
    width: 1200px;
    height: 100px;
    border: 1px solid #000;
    position: relative;
    margin: 0 auto;
}
#shju .aunt{
  // float: right;
  position: absolute;
  right: 0;
  bottom: 0;
}
  .el-table .warning-row {
    background: oldlace;
  }
  
</style>