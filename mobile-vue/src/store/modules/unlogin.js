import request from 'superagent'
import jsonp from 'superagent-jsonp'
import global_ from '../../global.js'
import i18n from '../../i18n'

const state ={

}

const mutations = {
   
}

const actions = {
	 resetPassword({commit}, payload ){
        return new Promise((resolve,reject) => {
            request
            .post( global_.baseURL + '/v2/users/reset-password')
            .type("form")
            .set("i18n", i18n.locale)
            .query("token="+ payload.token )
            .send({
            	password: payload.password,
            	password_confirm: payload.password_confirm
            })
            .end((err,res) => {
                if(!err){
                    /*commit({
                        type: "resetPassword",
                        res: res.body
                    });*/
                    resolve(res);
                }else{
                    reject(err);
                }
            })
            
        })
    },
    forgetPassword( {commit}, payload){
    	return new Promise((resolve ,reject) => {
    		request
    		.post( global_.baseURL + '/v2/users/send-email')
    		.type("form")
    		.set("i18n", i18n.locale)
    		.send({
    			email_or_mobile: payload.email_or_mobile
    		}).end((err,res) => {
    			if(!err){
    				resolve(res);
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