

const state ={
    list:sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):{},//请求回来的数据
    // list:[]

}

const mutations = {
    changeList(state, obj) {
        state.list = obj
        sessionStorage.setItem('list',JSON.stringify(obj))
    },
}
const actions = {
 

    //请求获取总数
    reqestuserList(context,obj){
            context.commit('changeList',obj)
    },

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