import request from 'superagent'
import jsonp from 'superagent-jsonp'
import global_ from '../../global.js'

const state = {
  queryRes_freeApps: [],
  queryRes_myFavorite: [],
  queryRes_ByLetter:[]
}

const mutations = {
  query (state, payload) {
    switch (payload.tag) {
      case 'freeApps':
        state.queryRes_freeApps = payload.res
        break
      case 'myFavorite':
        state.queryRes_myFavorite = payload.res
        break
      default:
        console.log('[Error]:Api is error!')
    }
  },
  searchByLetter(state, payload){
    state.queryRes_ByLetter = payload.res;
  }
}

const actions = {
  /**
   * Search
   * queryStr: String
   * count: 3 default
   */
  queryApps ({ commit }, payload) {
   return new Promise((resolve, reject) => {
      request
        .get( global_.baseURL + '/v2/apps/search?keyword=' +
          payload.queryStr + '&sort=' + payload.sort)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'query',
              tag: 'freeApps',
              res: res.body.items
            })
            resolve(res)
          }
        })
        
    })
  },
  searchByLetter ({ commit }, payload) {
   return new Promise((resolve, reject) => {
      request
        .get( global_.baseURL + '/v2/apps/search-by-letter?page=' +
          payload.page + '&category=' + payload.category + '&keyword=' + payload.keyword)
        .end((err, res) => {
          if (!err) {
            commit({
              type: 'searchByLetter',
              tag: 'searchByLetter',
              res: res.body.items
            })
            resolve(res)
          }
        })
        
    })
  }
  /*queryFavorite({ commit },payload ){
    return new Promise((resolve, reject) => {
      request
      .get( global_.baseURL + '/v2/apps/favorite?keyword=' +
          payload.queryStr + '&sort=' )
      .set("token", payload.token)
      .end((err,res) => {
        if(!err){
          commit({
            type: "query",
            tag: "myFavorite",
            res: res.body.items
          })
        }
        resolve(res);
      })
    })
  }*/
}

export default {
  state,
  mutations,
  actions
}
