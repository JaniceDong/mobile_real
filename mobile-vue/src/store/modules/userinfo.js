import request from 'superagent'
import jsonp from 'superagent-jsonp'
import global_ from '../../global.js'
import i18n from '../../i18n'

const state = {
    userinfo:{},
    updateUser:{}
}

const mutations = {
    getUserinfo(state,payload){
        state.userinfo = payload.res;
        //console.log(state);
    },
    updateUser(state,payload){
        state.userinfo = payload.user;
    },
    getMessages( state, payload){
       // state.messages = payload.res; 
    },
   changeUser(state,payload){
    //console.log(payload);
    state.user  = payload.value 
   },
   changeAvatar( state, payload ){
        state.userinfo.avatar = payload.template_avatar;
   }
}


const actions = {
    /**
     * Getting movies
     * q: in_theaters, coming_soon, top250
     * count: 8
     */
    getUserinfo({commit}, payload) {
        //params 传过来的参数
        return new Promise((resolve, reject) => {
            request
                .get( global_.baseURL + '/v2/users/info')
                .set("token", payload.token)
				.set("i18n", i18n.locale)
                .end((err, res) => {
                    if (!err) {
                        commit({
                            type: 'getUserinfo',
                            res: res.body.data
                        });
                        resolve(res)
                    }else {
                        reject(err)
                    }
                })
        })
    },
    updateUserInfo({commit},payload){
        return new Promise((resolve,reject) => {
            request
            .post( global_.baseURL + '/v2/users/update-information')
            .type("form")
            .set("token", payload.token)
            .set("i18n", i18n.locale)
            .send({
                gender: payload.gender,
                email: payload.email,
                name: payload.name,
                mobile: payload.mobile,
                username: payload.username,
                biography: payload.biography,
                organization: payload.organization,
                password: payload.password,
                new_password: payload.new_password,
                re_new_password: payload.re_new_password
            })
            .end((err,res) => {
                if(!err){
                    /*commit({
                        type:"updateUser",
                        res: res.body
                    });*/
                    resolve(res);
                }else{
                    reject(err);
                }
            })
        })
    },
    getMessages({commit}, payload ){
        return new Promise((resolve,reject) => {
            request
            .get( global_.baseURL + '/v2/notices/index')
            .set("token", payload.token)
			.set("i18n", i18n.locale)
            .end((err,res) => {
                if(!err){
                    commit({
                        type: "getMessages",
                        res: res.body
                    });
                    resolve(res);
                }else{
                    reject(err);
                }
            })
            
        })
    },
    exitEnterprise({commit}, payload){
        return new Promise( (resolve, reject) => {
            request
            .post( global_.baseURL + '/v2/users/exit-enterprise')
            .set("token", payload.token)
            .end((err,res) => {
                if(!err){
                    resolve(res);
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
