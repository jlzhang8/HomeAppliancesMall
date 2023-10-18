import Vue from 'vue'

// 移动端大小自适应
import 'lib-flexible/flexible'

// 全局组件引入
import {
  Tabbar,
  TabbarItem,
  Search,
  Sidebar,
  SidebarItem,
  Toast,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Lazyload,
  ImagePreview,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Overlay,
  NavBar,
  Grid,
  GridItem,
  Empty,
  ContactEdit,
  Form,
  Field,
  Button,
  Sku,
  Stepper,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
} from 'vant';

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 组成全局组件 链式调用
Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(ImagePreview)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Overlay)
  .use(NavBar)
  .use(Grid)
  .use(GridItem)
  .use(Empty)
  .use(ContactEdit)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Toast)
  .use(Sku)
  .use(Stepper)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup);


Vue.use(VueAxios, axios);

//设置请求基础路劲
axios.defaults.baseURL = 'https://apic.netstart.cn/xmsc';

// // 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //
  //启动加载提示
  Toast({
    type: 'loading',
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })

  return config;

}, function (error) {
  // 对请求错误做些什么
  //关闭加载提示
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //关闭加载提示
  Toast.clear();

  return response;

}, function (error) {
  // 对响应错误做点什么
  //关闭加载提示
  Toast.clear();

  return Promise.reject(error);
});

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


new Vue({
  router,
  render: h => h(App),
  data: {
    zuji: 0,
    shocan: 0,
    gowu: 0,
    last: false,
  },
  created() {
    //收藏
    let shochan = JSON.parse(localStorage.getItem('shochan'))
    let che = JSON.parse(localStorage.getItem('gowuche'))
    let ls = JSON.parse(localStorage.getItem('lishi'))
    //收藏
    if (shochan) {
      this.shocan = shochan.length
    } 

    //足迹(历史记录)
    if(ls){
      this.zuji = ls.length
    }

    //购物车
    if (che) {
      che.forEach(v => {
        this.gowu += v.value
      })

    } 
  }
}).$mount('#app')
