<template>
	<div id="Company" class="min-height">
			<div class="information">
				<div class="name">
					<span class="title">{{ $t(' login.Company ') }}</span>
					<span class="specific">{{ organization.name }}</span>
				</div>
			</div>
		<div class="description">
			<p class="point">{{ $t(' login.Description ') }}</p>
			<p class="specific" >
				{{ organization.description }}
			</p>
		</div>
		<div class="button" v-if="!isEnterprise">
			<form >
				<label for="log">
					<input  type="submit" id="exit" :value="$t('login.Exit')"
					:class="{disabled: isDisabled}"
					:disabled="isDisabled" 
					@click.stop.prevent="onSubmit">
				</label>
			</form>
		</div>
		<div class="info">
			<p id="info" v-show='success'>
			{{ $t('layout.success') }}
			{{ organization.name }}
			{{ $t('layout.enterprise') }}
			</p>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'

export default{
	inject: ['reload'],
	data(){
		return{
			organization:{},
			isDisabled: false,
			success: false,
			isEnterprise: false
		}
	},
	computed:{
		...mapState({
		})
	},
	created() {
		this.getUserinfo();
	},
	methods:{
		getUserinfo() {
			var that = this;
			this.$store.dispatch({
				type: "getUserinfo",
				token: that.$store.state.user.token
			})
			.then( response => {
				if(response.body.data){
					var responseData = response.body.data;
					that.isEnterprise = responseData.enterprise;
					var organization = responseData.organizationInfo;
					if(!organization){
						this.$router.go(-1);//没有加入企业时回到上级
					}else{
						this.organization = organization;
					}
				}
			})
			.catch( err => {
				console.log(err);
				this.$router.push({path:"/login"});
			})
		},
		beforeSubmit(){
			this.isDisabled = true;
		},
		onSubmit() {
			var that = this;
			this.beforeSubmit();
			this.$store.dispatch({
				type:"exitEnterprise",
				token: that.$store.state.user.token
			})
			.then( response => {
				that.onSuccess(response);
				console.log(response);
			}).catch(err => {
				console.log(err);
			})
		},
		onSuccess(res){
			var that = this;
			if(res.body.code == "0"){
				that.success = true;
				setTimeout( function(){
					that.$router.go(-1);
				},1000)
			}
		}
	}
}
</script>

<style scoped>
#info{
	width: 70%;
	overflow: hidden;
	margin: .6rem auto 0;
    line-height: .48rem;
	opacity: 0.5;
	background: #000000;
	border-radius: 0.04rem;
	font-family: PingFangSC-Regular;
	font-size:0.2rem;
	color: #FFFFFF;
	text-align: center;
}
#exit{
	margin-top: .7rem;
    width:75%;
    line-height: 0.32rem;
    padding-left: .05rem;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    display: inline-block;
    height: 0.98rem;
    border-radius: .04rem;
    background: #9013FE;
    /* border: 1px solid #BBBBBB; */
    color: #FFFFFF;
}
#exit.disabled{
	background: #6401B1;
}
#Company{
	width: 100%;
	background: #F5F5F5;
	
}
div.information{
	width: 100%;
	height: 1.2rem;
	background: #FFFFFF;
	padding:0 .32rem 0;
}
div.description{
	background: #FFFFFF;
	padding:0 .32rem 0;
	margin-top: .24rem;
}
div.name span.title{
	font-weight:bold;
	font-family: PingFangSC-Medium;
	float: left;
	line-height: 1.4rem;
	font-size: .3rem;
	color: #000000;
}
div.name span.specific{
	font-family: PingFangSC-Regular;
	line-height: 1.4rem;
	float: right;
	font-size: .28rem;
	color: #4A4A4A;
}
div.description p.point{
	text-align: left;
	font-weight:bold;
	line-height: 37px;
	font-family: PingFangSC-Medium;
	font-size:0.3rem;
	color: #000000;
}
div.description p.specific{
	line-height: .6rem;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: 0.26rem;
	text-align: left;
	color: #4A4A4A;
}
</style>