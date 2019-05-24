<template>
	<div class="email min-height">
		<h3>{{ $t('login.title') }}</h3>
		<div class="new-address">
			<form action="post" @submit.prevent="onSubmit">
				<label for="new-address">
					<input type="text" :placeholder="$t('login.Email_address')" id="new-address" v-model='email' @input="changeInput" >
					<span class="err" v-show="err">{{ backErrMessage || $t('login.errMessage_info')}}</span>
				</label>
				<label for="submit">
					<input type="submit" :value="$t('login.Save')" id="submit" 
						:disabled="isDisabled"
	          			:class="{disabled: isDisabled,focused: isFocus}">
				</label>
			</form>
			<div class="state">
				<span class="success" v-show="success">{{$t('login.Save_Success')}}</span>
				<span class="failure" v-show="failure">{{$t('login.Save_Failure')}}</span>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data() {
		return{
			email: "",
			success: false,
			failure: false,
			isDisabled: false, //disabled submit button
			isFocus: false,
			err: false,
			errMessage_info:'Please enter your email',
			backErrMessage: ""
		}
	},
	methods: {
		onSubmit() {
			this.beforeSubmit();
			var that = this;
			if(!this.email){
				this.err = true;
				return;
			}
			this.$store.dispatch({
				type:"updateUserInfo",
				tag:"updateEmail",
				email: that.email,
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
			var result = response.body.code;   //code == 0  success
			var errMessage = response.body.message.email;
			this.backErrMessage = "";
			if(result != "0"){
				this.backErrMessage = errMessage;
				this.err = true;
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
		}
	}
}
</script>
<style scoped>
.email{
	width: 100%;
	overflow: hidden;
	background: #F5F5F5;
}
.email h3{
	height: 1.05rem;
	line-height: 1.05rem;
}
.new-address{
	height: auto;
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
.new-address input[type="text"]{
	display: inline-block;
    width: 100%;
    height: 1.04rem;
    padding: 0 .32rem;
    color: #4A4A4A;
}
.new-address input[type="submit"]{
	width: 5.6rem;
	height: .78rem;
	margin: .7rem auto 0;
	background: #9013FE;
	border-radius: 4px;
	color: #FFFFFF;
	font-size: .32rem;
	color: #FFFFFF;
}
#submit.disabled{
	background: #6401B1;
}
.state{
	width: 100%;
	height: .5rem;
	margin-top: .5rem;
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
}
</style>