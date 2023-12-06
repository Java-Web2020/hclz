import {reqdwinfo} from '../../util/request'


const state ={
    dw_list:[],
    dw_total:0,
    page:1,
}

const mutations = {
    changedw_list(state, arr) {
        state.dw_list = arr
    },
    changedwCount(state,num){
        state.dw_total=num
    },
    changePage(state,page){
        state.page=page
    },

}
const actions = {
    requestdwinfo(context){
        reqdwinfo({
            page:context.state.page,
        }).then(res=>{
            context.commit('changedw_list', res.data.data)
        })
    },
    requestdwcount(context){
        reqdwinfo().then(res => {
            context.commit('changedwCount', res.data.count)
        })
    },
    //修改当前页
    changeCurrentPages_dw(context,page){
        context.commit('changePage',page)
        context.dispatch('requestdwinfo')
    },
    //请求获取总数

}
const getters = {
    dw_list(state) {
        return state.dw_list
    },
    dw_total(state){
        return state.dw_total
    },
    page(state){
        return state.page
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}