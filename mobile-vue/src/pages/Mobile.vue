<template>
	<div id="Mobile" class="min-height">
		<form class="list-item" @submit.prevent="onSubmit">
				<li>
					<input type="text" 
						:placeholder="mobile" 
						v-model="mobile"
						id="mobileTel" 
						name="mobileTel" 
						autocomplete="off" 
						@input="changeInput"
						data-name="mobileTel">
						<span class="err" v-show="err">{{ backErrMessage || $t('login.format') }}</span>
				</li>
				<li class="bottom">
					<label for="log">
						<input  type="submit" id="mobile"
						:value="$t('login.Save')" class=""
						:disabled="isDisabled"
          				:class="{disabled: isDisabled,focused: isFocus}">
					</label>
				</li>
		</form>	
		<div class="state">
			<span class="success" v-show="success">{{$t('login.Save_Success')}}</span>
			<span class="failure" v-show="failure">{{$t('login.Save_Failure')}}</span>
		</div>	
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default{
	data(){
		return{
			mobile:"",
			success: false,
			failure: false,
			isDisabled: false, 
			isFocus: false,
			err: false,
			// errFormat: "Phone number format is not correct!",
			errFormat:{
				"Format" : "login.format"
			},
			backErrMessage: ''
		}
	},
	computed:{
		
	},
	created(){

	},
	mounted(){
		this.mobile = this.$route.query.mobile
	},
	methods: {
		onSubmit() {
			this.beforeSubmit();
			var that = this;
			if(!this.mobileTest(this.mobile)){
				this.err = true;
				return;
			}
			this.$store.dispatch({
				type:"updateUserInfo",
				tag:"updateMobile",
				mobile: that.mobile,
				token: that.$store.state.user.token
			} ).then( response => {
				this.onSuccess(response);
			} ).catch( err => {
				console.log(err);
			} )
		},
		beforeSubmit(){
			this.isDisabled = true;
		},
		onSuccess(res) {
			var that = this;
			if(res.body.code == "0"){
				this.success = true;
				setTimeout(function(){
					that.$router.go(-1);
				},1000)
			}else{
				this.failure = true;
				setTimeout(function(){
					that.isDisabled = false;
					that.failure = false;
				},1000);
				that.err = true;
				that.backErrMessage = res.body.message.mobile;
			}
		},
		onError(err){
			var that = this;
			this.failure = true;
			setTimeout(function(){
				that.isDisabled = false;
				that.failure = false;
			},1000);
		},
		changeInput() {
			this.isDisabled = false;
			this.err = false;
		}
	}
}
</script>

<style scoped>
#Mobile{
	position: relative;
	background: #F5F5F5;
}
.list-item li{
	width: 100%;
	list-style: none;
    width: 100%;
    height: 1.26rem;
    line-height: 1.26rem;	
    display: list-item;
    text-align: left;	
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
#mobile{
	margin-top: 1.5rem;
	display: inline-block;
    width: 5.6rem;
    height: 0.78rem;
    padding: 0;
    line-height: 0.78rem;
    border-radius: 4px;
    background: #9013fe;
    /* border: 1px solid #BBBBBB; */
    color: #fafafa;
}
#mobile.disabled{
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