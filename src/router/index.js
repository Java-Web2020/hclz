import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

//路由配置
const login = () =>import('../pages/login/login')
const index = () =>import('../pages/index/index')
const Issue = () =>import('../pages/Issue/Issue')
const View = () =>import('../pages/View/View')
const information = () =>import('../pages/information/information')
const leave = () =>import('../pages/leave/leave')
const shju = () =>import('../pages/shju/shju')
const zhuce = () =>import('../pages/zhuce/zhuce')
const Issue_yw = () =>import('../pages/Issue_yw/Issue_yw')
const dpm_img = () =>import('../pages/dpm_img/dpm_img')
// 商场
const shop = () =>import('../pages/shop/shop')
const choose = () =>import('../pages/choose/choose')
const store1 = () =>import('../pages/store1/choose')
const store2 = () =>import('../pages/store2/choose')
const store3 = () =>import('../pages/store3/choose')
const store4 = () =>import('../pages/store4/choose')

// 发票路由

const index_fp = () =>import('../pages/index_fp/index_fp')
const Issue_fp = () =>import('../pages/Issue_fp/Issue_fp')
const view_fp = () =>import('../pages/view_fp/view_fp')
const Issue_fbfp = () =>import('../pages/Issue_fbfp/Issue_fbfp')
// 微信授权
const wx_zhuce = () =>import('../pages/wx_zhuce/wx_zhuce')
const zhuce_sh = () =>import('../pages/zhuce_sh/zhuce_sh')
Vue.use(Router)

//扩展运算符设置路由
const indexRouters = [

  {
    path:'View',
    component:View,
    name:'查看工单'
  },
  {
    path:'information',
    component:information,
    name:'工单信息'
  },
  {
    path:'leave',
    component:leave,
    name:'人员请假'
  },
  {
    path:'shju',
    component:shju,
    name:'下单数据'
  },
  {
    path:'zhuce',
    component:zhuce,
    name:'下单数据'
  },
  {
    path:'Issue_yw',
    component:Issue_yw,
    name:'业务员发布'
  },

]
const indexRouters_fp = [

  {
    path:'view_fp',
    component:view_fp,
    name:'查看发票'
  },

  {
    path:'Issue_fbfp',
    component:Issue_fbfp,
    name:'添加发票'
  },

]







const router = new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      component:login
    },
    {
      path:'/dpm_img',
      component:dpm_img
    },
    {
      path:'/shop',
      component:shop,
    },
    {
      path:'/choose',
      component:choose,
    },
    {
      path:'/store1',
      component:store1,
    },
    {
      path:'/store2',
      component:store2,
    },
    {
      path:'/store3',
      component:store3,
    },
    {
      path:'/store4',
      component:store4,
    },
    {
      path:'/wx_zhuce',
      component:wx_zhuce,
    },
    {
      path:'/zhuce_sh',
      component:zhuce_sh,
    },
    {
      path:'/index',
      component:index,
      children:[
        {
          path:'Issue',
          component:Issue,
          name:'发布工单',
          beforeEnter:(to,from,next)=>{
            console.log(from);
            
            if(from.path=='/login'&&store.state.user.list||store.state.user.list){
              next()
            }else{
              next('/login')
              console.log(store.state.user.list);
            }
          }
        },
        {
          path:'',
          redirect:'Issue'
        },
        ...indexRouters    
      ]
    },
    {
      path:'*',
      redirect:'/login'
    },
// 发票路由
{
  path:'/index_fp',
  component:index_fp,
  children:[
    {
      path:'Issue_fp',
      component:Issue_fp,
      name:'发票发布',
      beforeEnter:(to,from,next)=>{
        console.log(from);
        
        if(from.path=='/index'&&store.state.user.list||store.state.user.list){
          next()
        }else{
          next('/index')
          console.log(store.state.user.list);
        }
      }
    },
    ...indexRouters_fp
  ]
},




    // {
    //   path:'/',
    //   component:login
    // },
    // {
    //   path:'*',
    //   redirect:'/login'
    // }
  ]
})


//全局守卫
router.beforeEach((to,from,next)=>{
  //去登陆页面
  if(to.path=='/login'){
    next()
  }else if(to.path=='/dpm_img'||to.path=='/choose'||to.path=='/shop'||to.path=='/store1'||to.path=='/store2'||to.path=='/store3'||to.path=='/store4'||to.path=='/wx_zhuce'||to.path=='/zhuce_sh'){
    next()
  }
  //去的不是登录，判断用户是否登陆
  if(store.state.user.list[0]){
    // console.log(store.state.user.list[0]);
      next()
  }else{

    // next(false); // 阻止路由导航
  }
})



// console.log(store);
export default router