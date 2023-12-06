
import {reqleave} from '../../util/request'
const state ={
    list:[]//请求回来的数据
    // list:[]

}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
}
const actions = {
 

    //请求获取总数
    requestleave(context){
        reqleave().then(res=>{

            
            context.commit('changeList', res.data.data)
            
        })
    }

}
const getters = {
    list(state) {
        return state.list
    },

}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}