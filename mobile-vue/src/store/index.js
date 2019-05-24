import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import freeApps from './modules/freeApps'
import queryResults from './modules/search'
import getUserInfo from './modules/userinfo'
import getRelease from './modules/releaseInformations'
import unLogin from './modules/unlogin'
import operate from './modules/operate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    freeApps,
    queryResults,
    getUserInfo,
    getRelease,
    unLogin,
    operate
  }
})
