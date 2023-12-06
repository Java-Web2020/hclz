import {reqckfp} from '../../util/request'
import {reqkpqy} from '../../util/request'
import {reqkpdw} from '../../util/request'

const state ={
    list:[],//请求回来的数据
    list_total_amount:"",
    list_settled_amount:"",
    list_unsettled_amount:"",
    // 开票企业    
    list_kpqy:[],
    list_kpqy1:[],
    // 开票单位
    list_kpdw:[],
    list_kpdw1:[]



    // list_d:[],//请求回来的数据
    // total:0,
    // page:1,
    // page_num:50,
    // srcList: [],//大图
    // xdList:[],
    // dwc_num:0,
    // ywc_num:0,
    // xdrList:[],
}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeList_total_amount(state, arr) {
        state.list_total_amount = arr
    },
    changeList_settled_amount(state, arr) {
        state.list_settled_amount = arr
    },
    changeList_unsettled_amount(state, arr) {
        state.list_unsettled_amount = arr
    },
    // 开票企业
    changeList_kpqy(state, arr) {
        state.list_kpqy = arr
    },
    changeList_kpdw(state, arr) {
        state.list_kpdw = arr
    },

    // changeList_d(state, arr) {
    //     state.list_d = arr
    // },
    // changexdList(state, arr) {
    //     state.xdList = arr
    // },
    // //获取总数
    // changeCount(state,num){
    //     state.total=num
    // },
    // //修改当前页
    // changePage(state,page){
    //     state.page=page
    // },
    // //修改每页显示数量
    // changePage_num(state,page_num){
    //     state.page_num=page_num
    // },
    // //查看大图
    // changeSrcList(state,arr){
    //     state.srcList = arr
    // },
    // //待完成数量
    // changedwc_num(state,num){
    //     state.dwc_num = num
    // },
    // //已完成数量
    // changeywc_num(state,num){
    //     state.ywc_num = num
    // }

}
const actions = {
    reqestreqckfp(context,data) {
        reqckfp({
            // page:context.state.page,
            // limit:context.state.page_num,
            data
        }).then(res => {
            context.commit('changeList', res.data.data)

        })
    },
    reqestreqckfpta(context,data) {
        reqckfp({
            // page:context.state.page,
            // limit:context.state.page_num,
            data
        }).then(res => {
            context.commit('changeList_total_amount', res.data.total_amount)


        })
    },
    reqestreqckfpsa(context,data) {
        reqckfp({
            // page:context.state.page,
            // limit:context.state.page_num,
            data
        }).then(res => {
            context.commit('changeList_settled_amount', res.data.settled_amount)

        })
    },
    reqestreqckfpua(context,data) {
        reqckfp({
            // page:context.state.page,
            // limit:context.state.page_num,
            data
        }).then(res => {
            context.commit('changeList_unsettled_amount', res.data.unsettled_amount)


        })
    },
    // 开票企业
    requestkpqy(context){
        reqkpqy().then(res=>{
            state.list_kpqy=[]
            state.list_kpqy1=[]

            if(state.list_kpqy ==""){
                context.commit('changeList_kpqy', res.data.data)
                state.list_kpqy.forEach((item)=>{
                       
                    state.list_kpqy1.push({
                        value:item,
                        label:item
                    })
                   
                })
            }
              
        })
    },
    // 开票单位
    requestkpdw(context){
        reqkpdw().then(res=>{
            state.list_kpdw=[]
            state.list_kpdw1=[]

            if(state.list_kpdw ==""){
                context.commit('changeList_kpdw', res.data.data)
                state.list_kpdw.forEach((item)=>{
                       
                    state.list_kpdw1.push({
                        value:item,
                        label:item
                    })
                   
                })
            }
              
        })
    },

    // //请求获取总数
    // requestcount(context,total_time){
    //     reqckgd({
    //         page:context.state.page,
    //         limit:context.state.page_num,
    //         total_time:total_time,
    //     }).then(res => {
    //         context.commit('changeCount', res.data.len)
    //     })
    // },
    // //获取导出总数
    // reqestreqckgd_d(context,total_time,auth_sh,order_name,client_name,make_unit) {
    //     reqckgd({
    //         // total_time:total_time,
    //         // auth_sh:auth_sh,
    //         // order_name:order_name,
    //         // client_name:client_name,
    //         // make_unit:make_unit
    //     }).then(res => {
    //         context.commit('changeList_d', res.data.data)
    //     })
    // },
    // //修改当前的页码数
    // changeCurrentPages(context,page,total_time,auth_sh,order_name,client_name,make_unit){
    //     context.commit('changePage',page)
    //     context.commit('requestSrclist',total_time)
    //     // context.dispatch('reqestreqckgd',total_time)
    //     // reqckgd({
    //     //     page:context.state.page,
    //     //     page_num:context.state.page_num,
    //     //     total_time:total_time,
    //     //     // auth_sh:auth_sh,
    //     //     order_name:"豆晓帅",
    //     //     // client_name:client_name,
    //     //     // make_unit:make_unit
    //     // }).then(res => {
    //     //     context.commit('changeList', res.data.data)
    //     // })
    // },
    // //请求获取图片总数
    // requestSrclist(context,total_time){
        
    //     reqckgd(
    //         total_time
    //     ).then(res=>{
    //         context.commit('changeSrcList',[])
    //         state.list.forEach((item)=>{
    //             state.srcList.push(item.pic_ture)
                
    //         })
    //         console.log( state.srcList);
    //     })
    // },
    // // requestSrclist(context,total_time){
    // //     reqckgd({
    // //         total_time
    // //         // auth_sh:auth_sh,
    // //         // order_name:order_name,
    // //         // client_name:client_name,
    // //         // make_unit:make_unit
    // //     }).then(res => {
    // //         context.commit('changeSrcList', res.data.data)
    // //     })
    // // },
    // //获取下单人
    // requestXdList(context){
    //     reqxiadanren().then(res=>{
    //         state.xdList=[]
    //         state.xdrList=[]
    //         if(state.xdList ==""){
    //             context.commit('changexdList', res.data.data)
    //             state.xdList.forEach((item)=>{
                       
    //                 state.xdrList.push({
    //                     value:item,
    //                     label:item
    //                 })
                   
    //             })
    //         }
        
           

        
                

                   
    //     })
    // },
    // //待完成数量
    // requestdwc_num(context,total_time,order_name,client_name,make_unit){
    //     reqckgd({
    //         total_time:total_time,
    //         order_name:order_name,
    //         client_name:client_name,
    //         make_unit:make_unit
    //     }).then(res=>{

    //         context.commit('changedwc_num', res.data.comp)
    //     })
    // },
    // requestywc_num(context,total_time,order_name,client_name,make_unit){
    //     reqckgd({
    //         total_time:total_time,
    //         order_name:order_name,
    //         client_name:client_name,
    //         make_unit:make_unit
    //     }).then(res=>{
            
    //         context.commit('changeywc_num', res.data.lete)
    //     })
    // },

    // reqestpage_num(context,a) {
    //     context.commit('changePage_num', a)
    // },
}
const getters = {
    list(state) {
        return state.list
    },
    list_settled_amount(state) {
        return state.list_settled_amount
    },
    list_total_amount(state) {
        return state.list_total_amount
    },
    list_unsettled_amount(state) {
        return state.list_unsettled_amount
    },
    list_kpqy(state) {
        return state.list_kpqy
    },
    list_kpqy1(state) {
        return state.list_kpqy1
    },
    list_kpdw(state) {
        return state.list_kpdw
    },
    list_kpdw1(state) {
        return state.list_kpdw1
    },

    // list_d(state) {
    //     return state.list_d
    // },
    // total(state) {
    //     return state.total
    // },
    // page(state){
    //     return state.page
    // },
    // srcList(state){
    //     return state.srcList
    // },
    // xdList(state){
    //     return state.xdList
    // },
    // dwc_num(state){
    //     return state.dwc_num
    // },
    // ywc_num(state){
    //     return state.ywc_num
    // },
    // xdrList(state){
    //     return state.xdrList
    // }
}

export default {
    state,
    mutations,  
    actions,
    getters,
    namespaced: true
}