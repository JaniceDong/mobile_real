// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios' 
import touch from './common/js/vueTouch.js'
import store from './store'
import global_ from './global.js'
/*import lang  from './language.js'*/
import i18n from './i18n'
import mobile_email from './mobile_email.js'



import { Swipe, SwipeItem, Loadmore, Actionsheet, Popup, Picker } from 'mint-ui'


import 'mint-ui/lib/style.css'
import './common/styles/index.css'
import './common/styles/my-mui.css'


Vue.use(touch)
Vue.use(mobile_email)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.GLOBAL = global_
Vue.prototype.clientHeight = window.innerHeight || document.documentElement.clientHeight;

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)
router.beforeEach((to, from, next) => {
 if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
  // console.log('need login');
  var token = localStorage.getItem("token");
  if (token != undefined && token != null && token != "" && token != "undefined") { // 判断当前的token是否存在 ； 登录存入的token
   next();
  }
  else {
   next({
    path: '/login',
    query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
   })
  }
 }
 else {
  next();
 }
 //window.location.reload(true);
 window.scrollTo(0, 0);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n: i18n,
  components: { App },
  template: '<App/>'
})
