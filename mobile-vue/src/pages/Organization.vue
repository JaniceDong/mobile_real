<template>
	<div id="Organization" class="min-height">
		<form class="list-item" @submit.prevent="onSubmit">
				<li>
					<input type="text" 
						:placeholder="organization" 
						v-model="organization"
						id="organization" 
						name="organization" 
						autocomplete="off" 
						data-name="organization">
				</li>
				<li class="bottom">
					<label for="log">
						<input  type="submit" id="form" :value="$t('login.Save')"  class=""
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
export default{
	data(){
		return{
			organization:"",
			success: false,
			failure: false,
			isDisabled: false, //disabled submit button
			isFocus: false,
		}
	},
	mounted(){
		this.organization = this.$route.query.organization
	},
	methods: {
		onSubmit() {
			this.beforeSubmit();
			var that = this;
			this.$store.dispatch({
				type:"updateUserInfo",
				tag:"updateOrganization",
				organization: that.organization,
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
		onSuccess() {
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
		}
	}
}
</script>

<style scoped>
#Organization{
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
#form{
	margin: 1.5rem auto 0;
	display: inline-block;
    width: 5.6rem;
    height: 0.78rem;
    padding: 0;
    line-height: 0.78rem;
    border-radius: 4px;
    background: #9013fe;
    border: 1px solid #BBBBBB;
	border:none;
    color: #fafafa;
}
#form.disabled{
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