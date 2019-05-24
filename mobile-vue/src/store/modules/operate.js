import request from 'superagent'
import jsonp from 'superagent-jsonp'
import global_ from '../../global.js'

const state = {
    collect_number:""
}

const mutations = {
    changeCollectNumber(state, payload){
        state.collect_number = payload.num;
    }

}
const actions ={
	getMarker({commit}, payload ){
        return new Promise((resolve,reject) => {
            request
            .get( global_.baseURL + '/v2/apps/marker')
            .type("form")
            .query("fixed_url="+ payload.fixed_url )
            .end((err,res) => {
                if(!err){
                    resolve(res);
                }else{
                    reject(err);
                }
            })
            
        })
    },
    changeCollect({}, payload){
    	return new Promise( (resolve ,reject) => {
    		request
    		.post( global_.baseURL + '/v2/apps/collect')
    		.type("form")
    		.set({"token": payload.token})
    		.send({
    			status: payload.status,
    			fixed_url: payload.fixed_url
    		})
    		.end( (err,res) => {
    			if(!err){
    				resolve(res)
    			}else{
    				reject(err);
    			}
    		})
    	})
    },
    getStatus( {}, payload){
    	return new Promise( (resolve ,reject) => {
    		request
    		.get( global_.baseURL + '/v2/apps/collect-status')
    		.type("form")
    		.set({"token": payload.token})
    		.query("fixed_url="+ payload.fixed_url)
    		.end( (err, res) =>{
    			if(!err){
    				resolve(res)
    			}else{
    				reject(err);
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