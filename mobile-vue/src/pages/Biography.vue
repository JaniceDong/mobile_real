<template>
	<div id="Biography" class="min-height">
		<div class="bio-info" >
			<form class="list-item" @submit.prevent="onSubmit">
				<textarea id="source" 
					name="text" 
					tabindex="0" 
					dir="ltr" 
					:placeholder="biography" 
					v-model="biography"
					spellcheck="false" 
					autocapitalize="off" 
					autocomplete="off" 
					autocorrect="off" >
				</textarea>
				<li class="bottom">
					<label for="log">
						<input  type="submit" id="biography" :value="$t('login.Save')" class=""
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
	</div>
</template>

<script>
export default{
	data(){
		return{
			biography:"",
			success: false,
			failure: false,
			isDisabled: false, //disabled submit button
			isFocus: false,
		}
	},
	mounted(){
		this.biography = this.$route.query.biography
	},
	methods: {
		onSubmit() {
			this.beforeSubmit();
			var that = this;
			this.$store.dispatch({
				type:"updateUserInfo",
				tag:"updateBiography",
				biography: that.biography,
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
div.bio-info{
	width: 100%;
	background: #F5F5F5;
}
textarea{
	width: 100%;
	min-height: 3.04rem;
	padding: .32rem;
	line-height: .3rem;
	resize: none;
	outline: none;
	border: none;
	font-size: .32rem;
	color: #4A4A4A;
	word-break: break-all;
}
div.bio-info input{
	height: 3.04rem;
	width: 100%;
}
#Biography{
	background: #F5F5F5;
}
#biography{
	margin-top:0.96rem;
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
#biography.disabled{
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