import axios from 'axios'
import qs from 'qs'

const baseUrl = ''
const baseurl = 'https://jk.hclz.cc:1597/'
const ceshi = 'http://m.hclz.top:443/'

//响应拦截
axios.interceptors.response.use(res=>{
    console.log('===========请求的路径'+res.config.url+'===========')
    console.log(res)  
    return res
})
// axios.interceptors.request.use(
//       config => {
//         console.log(localStorage.getItem('token'))
//         if (localStorage.getItem('token')) {
//           config.headers.Authorization = localStorage.getItem('token');
//         }
//          console.log(config)
//         return config;
//       },
//       error => {
//         return Promise.reject(error);
//       });

    
export const reqshouye =(params)=>{
    return axios({
        url:baseurl+'workorderinformation/check_client_name/',
        method:'get',
        params:params
    })
}
export const reqzzdw =(params)=>{
    return axios({
        url:baseurl+'workorderinformation/check_make_unit/',
        method:'get',
        params:params
    })
}
export const reqkhtj =(data)=>{
    return axios({
        url:baseurl+'workorderinformation/client/',
        method:'post',
        data:qs.stringify(data)
    })
}
export const reqzztj =(data)=>{
    return axios({
        url:baseurl+'workorderinformation/unit/',
        method:'post',
        data:qs.stringify(data)
    })
}

export const reqgystj =(data)=>{
    return axios({
        url:baseUrl+'/inq_gys',
        method:'post',
        data:qs.stringify(data)
    })
}

export const reqsctp =(data)=>{

    //由于上传的是文件，所以需要qs转一下
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseurl+'task/picture/',
        method:'post',
        data:form
    })
}
export const reqfile =(data)=>{

    //由于上传的是文件，所以需要qs转一下
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/file_file',
        method:'post',
        data:form
    })
}
// 工单提交
export const reqgongdantj=(data)=>{
    return axios({
        url:baseurl+'task/create_work_order/	',
        method:'post',
        data:qs.stringify(data)
    })
}
export const reqdwcedit=(id)=>{
    return axios({
        url:baseurl+'order/alterorder/',
        method:'get',
        params:id
    })
}

// 查看工单


export const reqckgd =(params)=>{
    return axios({
        url:baseurl+'order/checkorder/',
        method:'get',
        params:params
    })
}
export const reqdelete =(id)=>{
    return axios({
        url:baseurl+'order/deleteorder/',
        method:'get',
        params:id
    })
}
export const reqapprove  =(id)=>{
    return axios({
        url:baseurl+'order/alterorder_audit_sh/',
        method:'post',
        data:qs.stringify(id)
    })
}

export const reqsearch =(params)=>{
    return axios({
        url:baseUrl+'/c_work',
        method:'get',
        params:params
    })
}
//////////////////////登录/////////////////////////////////
export const requserLogin=(data)=>{
    return axios({
        url:baseurl+'user/login/',
        method:'post',
        data:qs.stringify(data)
    })
    
}
//////////////////////注册/////////////////////////////////
export const reqzhuce=(data)=>{
    return axios({
        url:baseurl+"user/registered/",
        method:'post',
        data:qs.stringify(data)
    })
}

///////////工单统计//////////////////////////////////////
export const reqstatistical=(params)=>{
    return axios({
        url:baseurl+'task/orde/',
        method:'get',
        params:params
    })
}
//////////////////////工单信息/////////////////////////////////
export const reqkhinfo=(params)=>{
    return axios({
        url:baseurl+'workorderinformation/client/',
        method:'get',
        params:params
    })
}
export const reqdwinfo=(params)=>{
    return axios({
        url:baseurl+'workorderinformation/unit/',
        method:'get',
        params:params
    })
}
export const reqgysinfo=(params)=>{
    return axios({
        url:baseUrl+'/inq_gys',
        method:'get',
        params:params
    })
}
//////////////////////修改工单信息/////////////////////////////////
//客户
export const reqkhedit=(id)=>{
    return axios({
        url:baseurl+'workorderinformation/changeclient/',
        method:'get',
        params:id
    })
}
export const reqkhedit_e=(id)=>{
    return axios({
        url:baseurl+'workorderinformation/changeclient/',
        method:'post',
        data:qs.stringify(id)
    })
}
//单位
export const reqdwedit=(id)=>{
    return axios({
        url:baseurl+'workorderinformation/changeunit/',
        method:'get',
        params:id
    })
}
export const reqdwedit_e=(id)=>{
    return axios({
        url:baseurl+'workorderinformation/changeunit/',
        method:'post',
        data:qs.stringify(id)
    })
}
//供应商
export const reqgysedit=(id)=>{
    return axios({
        url:baseUrl+'/inq_gys',
        method:'put',
        params:id
    })
}
export const reqgysedit_e=(id)=>{
    return axios({
        url:baseUrl+'/inq_gys',
        method:'put',
        params:id
    })
}
//////////////////////删除/////////////////////////////////
export const reqkh_del=(id)=>{
    return axios({
        url:baseurl+'workorderinformation/delinformation/',
        method:'post',
        data:qs.stringify(id)
    })
}
export const reqdw_del=(id)=>{
    return axios({
        url:baseurl+'workorderinformation/delinformation/',
        method:'post',
        data:qs.stringify(id)
    })
}
export const reqgys_del=(id)=>{
    return axios({
        url:baseUrl+'/inq_gys',
        method:'post',
        data:qs.stringify(id)
    })
}
export const reqqx=(id)=>{
    return axios({
        url:baseurl+'nav/Home/',
        method:'get',
        params:id
    })
}
//////////////////////修改工单/////////////////////////////////

export const reqedit_gd=(id)=>{
    return axios({
        url:baseurl+'order/alterorder/',
        method:'get',
        params:id
    })
}
// //////////////////////人员请假/////////////////////////////////

export const reqleave=(id)=>{
    return axios({
        url:baseurl+'nav/ryqj/',
        method:'get',
        params:id
    })
}
////////////////////////人员请假修改/////////////////////////////////
export const reqry_edit=(id)=>{
    return axios({
        url:baseurl+'nav/ryqj/',
        method:'post',
        data:qs.stringify(id)
    })
}

////////////////////////人员密码修改/////////////////////////////////
export const reqrymm_edit=(data)=>{
    return axios({
        url:baseUrl+'/leave',
        method:'post',
        data:qs.stringify(data)
    })
}
////////////////////////业务人员发布工单/////////////////////////////////
export const reqservicer=(data)=>{
    return axios({
        url:baseUrl+'/servicer',
        method:'post',
        data:qs.stringify(data)
    })
}
////////////////////////设计师/////////////////////////////////
export const reqsjs =(params)=>{
    return axios({
        url:baseUrl+'/api/sjs',
        method:'get',
        params:params
    })
}
////////////////////////供应商/////////////////////////////////
export const reqgys =(params)=>{
    return axios({
        url:baseurl+'workorderinformation/check_make_unit/',
        method:'get',
        params:params
    })
}
////////////////////////大屏幕/////////////////////////////////
export const reqdpm =(params)=>{
    return axios({
        url:baseurl+'rool/',
        method:'get',
        params:params
    })
}
////////////////////////大屏幕的信息修改/////////////////////////////////
export const requser_up =(id)=>{
    return axios({
        url:baseurl+'modifythe/xgpersonal/',
        method:'get',
        params:id
    })
}
////////////////////////大屏幕的信息修改/////////////////////////////////
export const requser_up_qd =(data)=>{
    return axios({
        url:baseurl+'modifythe/xgpersonal/',
        method:'post',
        data:qs.stringify(data)
    })
}
////////////////////////查看大图/////////////////////////////////
export const reqbig =(params)=>{
    return axios({
        url:baseurl+'order/workpic_ture/',
        method:'get',
        params:params
    })
}
////////////////////////删除文件/////////////////////////////////
export const reqdel_fail =(params)=>{
    return axios({
        url:baseUrl+'/oss_del',
        method:'get',
        params:params
    })
}
////////////////////////发布任务弹窗/////////////////////////////////
export const reqpou_pu =(params)=>{
    return axios({
        url:baseurl+'task/bounced/',
        method:'get',
        params:params
    })
}


////////////////////////下单人/////////////////////////////////
export const reqxiadanren =(params)=>{
    return axios({
        url:baseurl+'modifythe/check_username/',
        method:'get',
        params:params
    })
}



////////////////////////查看发票/////////////////////////////////
export const reqckfp =(params)=>{
    return axios({
        url:baseurl+'Invoice/Revise_invice/',
        method:'get',
        params:params
    })
}
////////////////////////上传发票/////////////////////////////////
export const reqscfp =(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseurl+'upload_Invoice/Invoice_upload/',
        method:'post',
        data:form
    })
}
////////////////////////开票企业名称/////////////////////////////////
export const reqkpqy =(params)=>{
    return axios({
        url:baseurl+'Invoice/buyer_name/',
        method:'get',
        params:params
    })
}
////////////////////////开票企业名称/////////////////////////////////
export const reqkpdw =(params)=>{
    return axios({
        url:baseurl+'Invoice/invoicingunits/',
        method:'get',
        params:params
    })
}
////////////////////////发票修改/////////////////////////////////
export const reqfp_qd =(id)=>{
    return axios({
        url:baseurl+'Invoice/get_invoice_details/',
        method:'post',
        data:qs.stringify(id)
    })
}
////////////////////////发票添加/////////////////////////////////
export const reqfp_add =(data)=>{
    return axios({
        url:baseurl+'Invoice/add_invoice/',
        method:'post',
        data:qs.stringify(data)
    })
}
////////////////////////发票修改/////////////////////////////////
export const reqfpedit =(params)=>{
    return axios({
        url:baseurl+'Invoice/get_invoice_details/',
        method:'get',
        params:params
    })
}
////////////////////////微信绑定注册/////////////////////////////////
export const reqwxzhuce =(params)=>{
    return axios({
        url:baseurl+'user/save_user_info_to_db/',
        method:'get',
        params:params
    })
}
////////////////////////微信登录/////////////////////////////////
export const reqwxdl=(data)=>{
    return axios({
        url:baseurl+'user/wx_login/',
        method:'post',
        data:qs.stringify(data)
    })
}
////////////////////////微信登录/////////////////////////////////
export const reqwxsmdl=(data)=>{
    return axios({
        url:baseurl+'user/sm_login/',
        method:'post',
        data:qs.stringify(data)
    })
}
export const reqzhuce_sh =(params)=>{
    return axios({
        url:baseurl+'user/get_users/',
        method:'get',
        params:params
    })
}
export const reqzhuce_shtj =(data)=>{
    return axios({
        url:baseurl+'user/review_user/',
        method:'post',
        data:qs.stringify(data)
    })
}