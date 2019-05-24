import request from 'superagent'
import jsonp from 'superagent-jsonp'
import global_ from '../../global.js'


const state = {
  Education: [],
  Industry:[],
  Game:[],
  Medical:[],
  Business:[],
  Culture:[],
  Others:[]
}
const mutations = {
  getFreeApps (state, payload) {
    for(var i in payload.res){
      state[i] = payload.res[i] ;
    }
  },
  getMore(state, payload){
    //console.log(state);
   // console.log(payload);
  }
}

const actions = {
  /**
   * Getting movies
   * q: in_theaters, coming_soon, top250
   * count: 8
   */
  getFreeApps ({ commit }) {
    return new Promise(( resolve, reject) => {
      request
        .get(global_.baseURL+ '/v2/apps/index')
        .type("form")
        .query('page=&category=&keyword=')
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'getFreeApps',
              res: res.body.data
            });
            resolve(res);
          }
        })
    })
  },
  getMore({ commit }, payload) {
   return new Promise((resolve,reject) => {
     request
      .get( global_.baseURL + '/v2/apps/search')
      .type("form")
      .query("page="+ payload.page + "&category=" + payload.category + "&keyword=" + payload.keyword)
      .end((err,res) => {
        if(!err){
          commit({
            type:"getMore",
            res: res.body.items
          });
          resolve(res)
        }
      })
   })
  }
}

export default {
  state,
  mutations,
  actions
}
