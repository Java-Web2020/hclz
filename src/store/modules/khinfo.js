import {reqkhinfo} from '../../util/request'


const state ={
    kh_list:[],
    kh_total:0,
    page:1,

}

const mutations = {
    changekh_list(state, arr) {
        state.kh_list = arr
    },
    changekhCount(state,num){
        state.kh_total=num
},
changePage(state,page){
    state.page=page
},

}
const actions = {
    requestkhinfo(context){
        reqkhinfo({page:context.state.page}).then(res=>{       
            context.commit('changekh_list', res.data.data)
        })
    },
    requestkhcount(context){
        reqkhinfo().then(res => {
            context.commit('changekhCount', res.data.count)
        })
    },
    //修改当前页
    changeCurrentPages_kh(context,page){
        context.commit('changePage',page)
        context.dispatch('requestkhinfo')
    },
    //请求获取总数

}
const getters = {
    kh_list(state) {
        return state.kh_list
    },
    kh_total(state) {
        return state.kh_total
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