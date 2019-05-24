import request from 'superagent'
import global_ from '../../global.js'
import i18n from '../../i18n'


const state = {
   token:""
}

const getters = {
  // Filtering currentUser
  currentUser: state => {
    return {
      token: state.token
    }
  }
}

const mutations = {
  updateData (state, payload) {
    switch (payload.name) {
      case 'token':
        state.temp_token = payload.value
        break
      default:
        console.log('Error:Dont directly mutate Vuex store')
    }
  },
  getLocalUser (state) {
    state.token = localStorage.getItem('token');
  },
  setUser (state, payload) {
    if(payload.token){
      state.token = payload.token;
    }
  },
  logout (state) {
    localStorage.removeItem('token');
    state.token = ''
  }
}

const actions = {
  /**
   * Login
   * new Promise((resolve, reject) => {})
   * Authorization: 'Bearer ' + token
   * email: payload.email
   * pass: payload.pass
   * name: payload.name
   */
  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      request
        .post( global_.baseURL + '/v2/users/login')
        .type("form")
        .set("i18n", i18n.locale)
        .send({
          email_or_mobile: payload.email_or_mobile,
          password: payload.password,
          remember: payload.remember
        })
        .then(res => {
          localStorage.setItem('token', res.body.data.token);
          commit({
            type: 'setUser',
            token: res.body.data.token
          })
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  },
  /**
   * Register
   * new Promise((resolve, reject) => {})
   * email: payload.email
   * pass: payload.pass
   * name: payload.name
   */
  register ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      request
        .post( global_.baseURL + '/v2/users/signup')
        .type("form") //formdata格式
        .set("i18n", i18n.locale)
        .send({
          name: payload.name,
          mobile: payload.mobile,
          email: payload.email,
          password: payload.password,
          password_confirm: payload.password_confirm,
          invite_code: payload.invite_code,
          agree_terms: payload.agree_terms
        })
        .then(res => {
          localStorage.setItem('token', res.body.data.token);
          commit({
            type: 'setUser',
            email: res.body.email,
            password: res.body.password,
            name: res.body.name,
            token: res.body.data.token
          })
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
