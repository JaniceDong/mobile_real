<template>
	
	<div>
		<div class="title">
			<span class="txt">{{ $t('login.Account_Security') }}</span>
		</div>
		<div class="retrieve_sign">
			<div class="tab">
				<div class="tab-item">
					<a href="#" class="selected">{{ $t('login.Reset_Password') }}</a>
				</div>
			</div>	
			<div class="callbackPassword" v-show="true">
				<div class="retrieve">
					<div class="retrieve_con">
						<form method="post" @submit.prevent="onSubmit">
							<ul class="item-list"> 
								<li class="border_bottom-1px">
		  							<input type="password" 
		  								:placeholder="$t('login.Password')"
		  								name="Password"
		  								v-model="obj.password"
		  								@click="changeInput"
		  								autocomplete="off" 
		  								data-name="Password">
		  								<span class="error" v-show="errPassword">{{ errMessagePassword }}</span>
								</li> 
								<li class="border_bottom-1px">
		  							<input type="password" 
											:placeholder="$t('login.Re-Password')"
		  								id="Password" 
		  								name="Password" 
		  								v-model="obj.re_password"
		  								@click="changeInput"
		  								autocomplete="off" 
		  								data-name="Password">
		  								<span class="error" v-show="errRePassword">{{ errMessageRePassword }}</span>
								</li> 
								<li class="information">
									<label for="log">
										<input type="submit" id="confirm" :value="$t('project.Confirm')"
										 :disabled="isDisabled || beforeFocus"
										 :class="{enable: isEnable,disabled: isDisabled ,beforeFocus: beforeFocus}">
									</label>
								</li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<span>
				<p class="f1">{{ $t('login.Existing_account,') }}</p>
				<router-link to="login">
					<p id="login" @click="tologin">{{$t('login.Now')}}</p>
				</router-link>	
			</span>
		</div>
	</div>
</template>
<script>
	export default { 
	  inject: ['reload'],
	  data () {
	    return {
			obj:{
				password:'',
	    		re_password:''
			},
	    	isEnable: false,
	    	isDisabled: false,
	    	beforeFocus: true,
	    	url: this.GLOBAL.baseURL,
	    	token:"",
	    	errPassword: true,
	    	errRePassword: true,
	    	errMessagePassword: "",
	    	errMessageRePassword: ""
	    }
	  },
	  watch: {
    	obj: {  // 这监听对象值的改变 和上面的不一样。
            handler(newVal,oldVal){
                this.obj.password = newVal.password;
                this.obj.re_password = newVal.re_password; 
                if(this.obj.password !== "" && this.obj.re_password !== ""){
                	this.isEnable = true;
                	this.beforeFocus = false;
                }else{
                	this.isEnable = false;
                	this.beforeFocus = false;
                }
            },
        	deep: true, 
    	},
    },

	methods:{
		onSubmit() {
			this.beforeSubmit();
			var that = this;
			this.$store.dispatch({
	  			type:"resetPassword",
	  			token: that.token,
	  			password: that.obj.password,
	  			password_confirm: that.obj.re_password
	  		}).then( response => {
	  			this.onSuccess(response);

	  		}).catch( err => {
	  			console.log(err);
	  		})
		},
		beforeSubmit() {
			this.isEnable = false;
			this.isDisabled = true;
		},
		onSuccess(res) {
			//token
			var message = res.body.message;
			if(message.password){
				this.errPassword = true;
				this.errMessagePassword = message.password
				}else if(message.password_confirm){
					this.errRePassword = true;
					this.errMessageRePassword = message.password_confirm
				}else if(res.body.code == "0"){
				this.$router.push({path:"/modify_success"})
			}else{
				this.$router.push({path: 'modify_fail'})
			}

		},
		onError(){
			this.$router.push({path:'/modify_fail'})
		},
        tologin(){
			this.$router.push({path: '/login'});
        },
        changeInput(){

	    },
	    getToken(){
            this.token = this.$route.query.token;
        }
	    
   },
   created() {
   	if(this.obj.password !== "" && this.obj.re_password !== "" ){
	    this.isEnable = true;
	    }
	this.getToken();
   }
}
</script>
</script>

<style scoped>
a.selected{
	font-size: .4rem;
	color: #000000;
}
li.information{
	margin-top:40px;
}
.item-list li span{
	padding: 0px;
	margin-right: 250px;
	font-family: PingFangSC-Regular;
	font-size: .35rem;
	color: #000000;
	line-height: .32rem;
}

div.dsc{
	margin: auto;
	line-height: 0.33rem;
	width: 6.12rem;
	height: 0.99rem;
}
div.dsc p.f1{
	display: inline;
	letter-spacing: 0.92px;
	line-height: 0.3rem;
	font-family: PingFangSC-Regular;
	font-size: 0.22rem;
	color: #9B9B9B;
	letter-spacing: 0.92px;
	text-align: center;
}
div.dsc p.f2{
	display: inline;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color: #ff0000;
	letter-spacing: 0.92px;
	text-align: center;
	line-height: 0.34rem;
}
div.text{
	width: 5rem;
	height: 1.5rem;
	margin: auto;
	line-height: 0.33rem;
}
div.text p.f1{
	display: inline;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color: #000000;
	letter-spacing: 0;
	text-align: center;
}
div.text p.f2{
	display: inline;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color:  #ff0000;
	letter-spacing: 0;
	text-align: center;
	line-height: 0.33rem;
}
div.bottom{
	position:relative; 
	width:100%; 
	height:5.6rem; 
	text-align: center;
}
div.bottom span{
	text-align:center;
	line-height: 7rem;
}
div.bottom span p.f1{
	display: inline;
	font-family: PingFangSC-Light;
	font-size: 0.26rem;
	color: #000000;
	letter-spacing: 0.15px;
	text-align: center;
}
div.bottom span p#login{
	display: inline;
	font-family: PingFangSC-Light;
	font-size: 0.28rem;
	color: #8F00FF;
	letter-spacing: 0.16px;
	text-align: center;
}
.border_bottom-1px.focus {
    border-color: #E3E3E3;
    border-width: 1px;
    z-index: 1;
}
#confirm.disabled {
	color:  #fafafa;
    background: #6401B1; 
}

#confirm{
    display: inline-block;
    width: 85%;
    height: 0.98rem;
    padding: 0;
    border-radius: .54rem;
    background: #fafafa;
    border: 1px solid #BBBBBB;
    color:  #9B9B9B;
}
#confirm.enable {
    display: inline-block;
    width: 85%;
    height: 0.98rem;
    padding: 0;
    border-radius: .54rem;
    background: #9013FE;
    border: 1px solid #BBBBBB;
    color:  #fafafa;
}
div.title{
	position: relative;
	width: 100%;
	height: 1.14rem;
	background: #9013FE;
}
span.txt{
	width: 100%;
	height: 1rem;
    font-family: PingFangSC-Regular;
    color: #FFFFFF;
    text-align: center;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
}
.Email{
	display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: 0 1.6rem;
    margin-top: 1rem;
    margin-bottom: 0.45rem;
}
.retrievepassword{
	width: 425px;
	font-weight: bold;
	line-height: 42px;
    font-family: PingFangSC-Semibold;
	font-size:30px;
	color: #000000;
	letter-spacing: 1.25px;
	text-align: center;
}
.item-list li span.error {
    position: absolute;
    line-height: 0.7rem;
    left: 0.32rem;
    bottom: -.52rem;
    width: 100%;
    background-size: 0.22rem;
    text-indent: 0.3rem;
    font-family: PingFangSC-Light;
    font-size: 0.24rem;
    color: #FF1A1A;
    text-align: left;
}
.item-list {
    width: 100%;
    height: auto;
    overflow: hidden;
}
.item-list li {
    position: relative;
    width: 100%;
    height: 1.26rem;
    line-height: 1.26rem;
}
.item-list li input {
    display: block;
    width: 74%;
    height: 100%;
    line-height: 0.32rem;
    padding: 0 0 0 0.56rem;
    font-family: PingFangSC-Regular;
    color: #000;
    font-size: 0.32rem;
    outline: none;
    border: none;
}
</style>
