<template>
	<div class="change min-height">
		<form class="list-item" @submit.prevent="onSubmit">
				<ul>
					<li class="current_password">
						<input type="text" 
							:placeholder="$t('login.Current_Password')" 
							name="password" 
							v-model="password"
							autocomplete="off" 
							data-name="password" 
							maxlength="20"
							@input="changeInput">
					</li>
					<li class="new_password">
						<input type="text" 
							:placeholder="$t('login.New_Password')" 
							name="new password" 
							v-model="new_password"
							autocomplete="off" 
							data-name="new password" 
							maxlength="20"
							@input="changeInput">
					</li> 
					<li class="confirm_password">
						<input type="text" 
							:placeholder="$t('login.Confirm_Password')" 
							name="new password" 
							v-model="re_new_password"
							autocomplete="off" 
							data-name="new password" 
							maxlength="20"
							@input="changeInput">
							<span class="err" v-show="err">{{ backErrMessage || $t(templateErr[errMessage]) }}</span>
					</li>
					<li class="submit">
						<label for="log">
							<input  type="submit" id="changepassword" :value="$t('login.Save')" class=" "
							:disabled="isDisabled"
	          				:class="{disabled: isDisabled,focused: isFocus}">
						</label>
					</li>
				</ul>
		</form>
		
		<div class="state">
			<span class="success" v-show="success">{{$t('login.Save_Success')}}</span>
			<span class="failure" v-show="failure">{{$t('login.Save_Failure')}}</span>
		</div>
	</div>
</template>

<script>

export default {
	data(){
		return{
			errMessage:"",
			templateErr:{
				"Please enter your current password.": "login.Enter_Current_Password",
				"New password and confirmation password do not match.": "login.Enter_New_Password",
				"Please enter a new password." : "login.Confirm_New_Password",
			},
			err: false,
			password:"",
			re_new_password:"",
			new_password:"",
			success: false,
			failure: false,
			isDisabled: false, //disabled submit button
			isFocus: false,
			backErrMessage: ''
		}
	},
	computed:{
		
	},
	created(){
		
	},
	methods:{
		onSubmit() {
			this.beforeSubmit();
			var that = this;
			this.backErrMessage = "";
			this.errMessage = "";
			if(!this.password &&!this.new_password && !this.re_new_password){
				this.$router.push({path:'/account'});
				return;
				//this.$router.go(-1);
			}else if( !this.password ){
				this.errMessage = "Please enter your current password.";
				this.err = true;
				return;
			}else if(this.password && (this.new_password != this.re_new_password)){
				this.errMessage = "New password and confirmation password do not match."
				this.err = true;
				return;
			}else if(this.password && !this.new_password){
				this.errMessage = "Please enter a new password."
				this.err = true;
				return;
			}
			this.$store.dispatch({
				type:"updateUserInfo",
				tag:"updatePassword",
				password: that.password,
				new_password: that.new_password,
				re_new_password: that.re_new_password,
				token: that.$store.state.user.token
			}).then( response => {
				this.onSuccess(response);
			}).catch( err => {
				console.log(err);
			})
		},
		beforeSubmit(){
			this.isDisabled = true;
		},
		onSuccess(response) {
			console.log(response.body.message);
			var result = response.body.code;   //code == 0  success
			var errPwd = response.body.message.password;
			var errNewPwd = response.body.message.new_password;
			var errRNPwd = response.body.message.re_new_password;

			if(errPwd){
				this.backErrMessage = errPwd
			}else if(errNewPwd){
				this.backErrMessage = errNewPwd
			}else if(errRNPwd){
				this.backErrMessage = errRNPwd
			}
			if(result != "0"){
				this.err = true;
				this.errMessage = "";
				// this.errMessage = message.password_confirm;
				return;
			}
			var that = this;
			this.success = true;
			setTimeout(function(){
				that.$router.go(-1);
			},1000)
		},
		onError(err){
			var that = this;
			this.failure = true;
			setTimeout(function(){
				that.isDisabled = false;
				that.failure = false;
			},1000);
		},
		changeInput(){
			this.err = false;
			this.isDisabled = false;
			this.success = false;
			this.failure = false
		}
	}
}
</script>

<style scoped>
.change{
	position: relative;
	background: #F5F5F5;
}
.list-item li.current_password,.list-item li.new_password,.list-item li.confirm_password{
	width: 100%;
	list-style: none;
    width: 100%;
    height: 1.26rem;
    line-height: 1.26rem;	
    display: list-item;
    text-align: left;
	border-bottom: 1px solid #EEEEEE;
}
.list-item li.submit{
	list-style: none;
	width: 100%;
	height: 1.26rem;
	line-height: 1.26rem;	
	display: list-item;
	text-align: left;
}
.list-item li:last-child{
	margin-top: 1.64rem;
}
.list-item li input{
    display: block;
    width: 100%;
    height: 100%;
    line-height: 0.32rem;
    padding: 0 0 0 0.32rem;
    font-family: PingFangSC-Regular;
    color:#4A4A4A;
    font-size: 0.32rem;
    outline: none;
    border: none;
}
li.bottom{
	padding: 0;
	text-align: center;
}
.err{
	display: inline-block;
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    margin-top: .08rem;
    padding: 0 .7rem;
    font-size: .22rem;
	color: #FF1A1A;
    text-align: left;
    background: url(../assets/err.svg) no-repeat .32rem center;
    background-size: .22rem;
}
#changepassword{
	display: block;
    width: 5.6rem;
    height: 0.78rem;
    margin: 0 auto;
    line-height: 0.78rem;
    border-radius: 4px;
    background: #9013fe;
    /* border: 1px solid #BBBBBB; */
    color: #fafafa;
}
#changepassword.disabled{
	background: #6401B1;
}
.state{
	width: 100%;
	height: .5rem;
	margin-top: 1.4rem;
}
.state span{
	display: inline-block;
	width: 1.6rem;
	line-height: .5rem;
	font-size: .2rem;
	color: #FFFFFF;
	opacity: .5;
	background: #000000;
	border-radius: 4px;
	-webkit-transition: opacity 1s ease-in; /* Saf3.2+, Chrome */  
	-moz-transition: opacity 1s ease-in; /* FF4+ */  
	-ms-transition: opacity 1s ease-in; /* IE10? */  
	-o-transition: opacity 1s ease-in; /* Opera 10.5+ */  
	transition: opacity 1s ease-in;
}
</style>