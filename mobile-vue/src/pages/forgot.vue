<template>	
	<div>
		<div class="title">
			<span class="txt">{{ $t('login.Account_Security') }}</span>
		</div>
		<div class="retrieve_sign">
			<div class="tab">
				<div class="tab-item">
					<a href="#" class="router-link-exact-active is-active selected">{{ $t('project.RETRIEVE') }}&nbsp;{{ $t('project.THE') }}&nbsp;{{ $t('project.PASSWORD') }}</a>
				</div>
			</div>
			<div>
		<div class="callbackPassword">
				<div class="retrieve">
					<div class="retrieve_con">
						<form method="post" @submit.prevent="onSubmit">
							<ul class="item-list">
								<li class="border_bottom-1px">
		  							<input type="text" 
										:placeholder="$t('login.email_or_mobile')"
										id="username" 
		  							name="username" 
		  							autocomplete="off" 
		  							data-name="username" 
		  							v-model='email_or_mobile'
		  							@input="changeInput"
										@blur="blur('username')">
									<span class="error" v-show="userNotFound">{{ errMessage }}</span>
								</li>
								<li >
									<label for="log">
										<input type="submit" id="confirm" :value="$t('login.Confirm')"
										 :disabled="isDisabled" 
										 :class="{disabled: isDisabled,focused: isFocus}" >
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
						<p id="login" :disabled="isDisabled" :class="{disabled: isDisabled,focused: isFocus}">{{$t('login.Now')}}</p>
					</router-link>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	  inject: ['reload'],
	  data () {
	    return {
	      isDisabled: false,
	      isFocus: false,
	      userNotFound: false,
	      email_or_mobile:"",
	      errMessage: "",
	      url: this.GLOBAL.baseURL,
	      lang:""
	    }
	  },

	  methods: {
	  	onSubmit(){
	  		var that = this;
	  		this.beforeSubmit();
	  		this.$store.dispatch({
	  			type:"forgetPassword",
	  			i18n:that.lang,
	  			email_or_mobile: that.email_or_mobile
	  		}).then( response => {
	  			that.onSuccess(response);
	  		}).catch( err => {
	  			console.log(err);
	  		})
	  	},
	  	onSuccess: function (res) {
	  		var that = this;
	  		if(res.body.code == "0"){
	  			that.email = res.body.data.email;
	  			this.$router.push({path:'/regain',query:{email:that.email}})
	  		}else{
	  			this.userNotFound = true;
	  			this.errMessage = res.body.message.email_or_mobile;
	  		}
	  		console.log(res);
	    },
	  	beforeSubmit() {
			this.isDisabled = true;
		},
		changeInput() {
			this.userNotFound = false;
			this.isDisabled = false;
		},
		blur(id) {
			if(id == "username"){
				if(!this.emailTest(this.username) && !this.mobileTest( this.username )){
					this.err = true;
					this.errMessage = "Incorrect format"
				}
			}else if(id == "password"){             //password blur
				if( !this.password ){
					this.err = true;
					this.errMessage = "Password can not be blank"
				}
			}
		}
	  },
	  mounted() {
	  	this.lang = localStorage.getItem("locale");
	  }
}
</script>
<style scoped>
.tab-item a.is-active{
	color: #000000;
	font-size: 0.35rem;
}
div.tab{
	margin-bottom:.6rem;
}
div.text{
	width: 5rem;
	height: 1.5rem;
	margin: auto;
	line-height: 0.33rem;
}
div.bottom{
	position:relative; 
	width:100%; 
	height:5.7rem; 
	text-align: center;
}
div.bottom span{
	text-align:center;
	line-height: 8rem;
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

#confirm{
	margin-top:120px;
    display: inline-block;
    width: 80%;
    height: 0.98rem;
    padding: 0;
    border-radius: .54rem;
    background: #9013FE;
    /* border: 1px solid #BBBBBB; */
	border: none;
    color:  #FFFFFF;
}
#confirm.disabled{
	background: #6401B1;
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
.item-list span.error{
    position: absolute;
    line-height: 0.7rem;
    left: 0.3rem;
    top: .6rem;
    background-size: 0.22rem;
    text-indent: 0.3rem;
    font-family: PingFangSC-Light;
    font-size: 0.24rem;
    color: #FF1A1A;
}
.item-list {
    width: 100%;
    height: auto;
    overflow: hidden;
}
.item-list li input {    
	margin-top: 30px;
    display: block;
    width: 75%;
    height: 100%;
    line-height: 0.32rem;
    padding: 0 0 0.25rem 0.56rem;
    font-family: PingFangSC-Regular;
    color: #000;
    font-size: 0.32rem;
    outline: none;
    border: none;
}
</style>
