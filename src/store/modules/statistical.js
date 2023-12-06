import {reqstatistical} from '../../util/request'

const state ={
    list:[]
    // list:[]

}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
}
const actions = {
    requeststatistical(context,total_time){
        reqstatistical({total_time:total_time}).then(res=>{
            
            context.commit('changeList', res.data)

            
        })
    }

    //请求获取总数

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