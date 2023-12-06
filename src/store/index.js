import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import ckgd from './modules/ckgd'
import user from './modules/user'
import khinfo from './modules/khinfo'
import dwinfo from './modules/dwinfo'
import gysinfo from './modules/gysinfo'
import statistical from './modules/statistical'
import leave from './modules/leave'
import ckfp from './modules/ckfp'

export default new Vuex.Store({
    modules:{
        ckgd,
        user,
        khinfo,
        dwinfo,
        gysinfo,
        statistical,
        leave,
        ckfp
    }
})