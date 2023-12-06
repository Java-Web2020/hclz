import {reqgysinfo} from '../../util/request'


const state ={
    gys_list:[],
    gys_total:0,
    page:1,

}

const mutations = {
    changegys_list(state, arr) {
        state.gys_list = arr
    },
    changegysCount(state,num){
        state.gys_total=num
},
changePage(state,page){
    state.page=page
},

}
const actions = {
    requestgysinfo(context){
        reqgysinfo({page:context.state.page}).then(res=>{       
            context.commit('changegys_list', res.data.data)
        })
    },
    requestgyscount(context){
        reqgysinfo().then(res => {
            context.commit('changegysCount', res.data.count)
        })
    },
    //修改当前页
    changeCurrentPages_gys(context,page){
        context.commit('changePage',page)
        context.dispatch('requestgysinfo')
    },
    //请求获取总数

}
const getters = {
    gys_list(state) {
        return state.gys_list
    },
    gys_total(state) {
        return state.gys_total
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