import request from 'superagent'
import jsonp from 'superagent-jsonp'
import global_ from '../../global.js'

const state = {

}

const mutations = {
	getReleaseInformation(state ,payload){
		state.releaseInformation = payload.res;
	}

}

const actions = {
	getReleaseInformation({ commit }, payload){
		return new Promise( (resolve ,reject) => {
			request
			.get(global_.baseURL + '/v2/update-logs/index')
			.type("form")
			.query("page=" + payload.page)
			.end( (err ,res)=> {
				if(!err){
					commit({
						type:"getReleaseInformation",
						res: res.body.items
					});
					resolve(res)
				}
			})
		})
	}
}

export default{
	state,
	mutations,
	actions
}