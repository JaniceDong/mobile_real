<template>
	<div id="Prompt" class="min-height">
		<div class="title">
			<p class="list">
				{{ $t('project.INVITATIONS') }}
			</p>
			<p class="list1">
				{{ $t('layout.received') }}<br/>
				{{ $t('layout.check') }}
			</p>
			<p class="list2">
				{{ $t('layout.Notice') }}
			</p>
		</div> 
		<div class="title">
			<p class="point">
				{{ $t(' login.Company ') }}：
			</p>
			<p class="point1">
				{{ message.organization_name }}
			</p>
			
		</div> 
		<div class="title">
			<p class="point">
				{{ $t(' login.Description ') }}：
			</p>
			<p class="point2">
				{{ message.description }}
			</p>	
		</div> 	
		<div class="button">
			<form >
				<label for="accept">
					<input  type="button" id="accept" :value="$t('app.Accept')"
					:disabled="isDisabled" 
					:class="{disabled: isDisabled}" @click.stop.prevent="onSubmit(1)">
				</label>
				<label for="refuse">
					<input  type="button" id="refuse" :value="$t('app.Refuse')"
					:disabled="disabled"
					:class="{disabled: disabled}" @click.stop.prevent="onSubmit(0)">
				</label>
			</form>
		</div>
		<div class="information">
			<p id="info" v-show='success'>
				{{ $t('layout.Successfully_joined') }}
				{{ message.organization_name }}
				{{ $t('layout.enterprise') }}
			</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default{
	data() {
		return {
			message:{},
			result:0,
			success: false,
			isDisabled: false,
			disabled: false,
			url: this.GLOBAL.baseURL,
		}
	},
	computed:{
		...mapState({
			user: state => state.getUserInfo.userinfo,

			
		})
	},
	created(){
		this.getQuerys();
	},
	mounted(){
		this.getQuerys();
		this.justify();
	},
	methods:{
		getQuerys() {
			var that = this;
			var query = this.$route.query.message_id;
			this.$nextTick(function(){
				this.$http.get(this.url + '/v2/notices/index',{
					headers: {
						token: that.$store.state.user.token
					}
				})
				.then( response => {
					if(response.data){
						for(var i in response.data){
							if(response.data[i].id == query){
								that.message = response.data[i];
							}
						}
						//that.message = response.data
					}

				}).catch( err => {

				})
			})
		},
		justify(){
			var that = this;
			this.$store.dispatch({
				type:"getUserinfo",
				token: that.$store.state.user.token
			}).then( response =>{
				if(response.body.data){
					var userinfo = response.body.data;
					if(userinfo.organization_id){
						that.isDisabled = true;
					}
				}
			}).catch( err =>{
				console.log(err);
				this.$router.push({path:"/login"});
			})
		},
		onSubmit(result) {
			this.beforeSubmit();
			var that = this;
			var id = this.$route.query.message_id;
			var params = new FormData();
		    params.append("result", result);

			this.$http.post( this.url + '/v2/users/accept-invite?id='+ id,params,{
				headers: {
					token: that.$store.state.user.token
				}
			}).then( response =>{
				this.onSuccess(response);

			}).catch( err => {
				this.onError(err);
				console.log(err);
			})
		},
		beforeSubmit(){
			this.isDisabled = true;
			this.disabled = true;
		},
		onSuccess(response) {
			var that = this;
			
			if(response.data.code == "0" && response.data.message == "Have joined"){
				this.success = true;
				setTimeout(function(){
					that.$router.go(-1);
				},1000)
			}else{
				setTimeout(function(){
					that.$router.go(-1);
				},1000)
			}
		},
		onError(err) {
			console.log(err);
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
#accept{
	margin-top: .3rem;
    width:45%;
    line-height: 0.32rem;
    padding-left: .05rem;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    display: inline-block;
    height: 0.98rem;
    border-radius: .04rem;
    background: #9013FE;
    color: #FFFFFF;
}
#accept.disabled{
	background: #6401B1;
}
#refuse.disabled{
	opacity: .5;
}
#refuse{
	margin-top: .3rem;
    width:45%;
    line-height: 0.32rem;
    padding-left: .05rem;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    display: inline-block;
    height: 0.98rem;
    border-radius: .04rem;
    color: #666666;
    background: #FFFFFF;
	border: 1px solid #BCBCBC;
}
#Prompt{
	width: 100%;
}
div.title p.list{
	margin-top: .2rem;
	width: 95%;
	height: .4rem ;
	padding-left: .2rem;
	letter-spacing: 0;
	font-weight:bold;
	font-family: PingFangSC-Medium;
	font-size: .28rem;
	line-height: .56rem;
	color: #000000;
}
div.title p.list1{
	margin-top: .48rem;
	padding-right: 0.58rem;
	height: .66rem ;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: .24rem;
	line-height:.33rem;
	color: #000000;
	word-break:break-word;
}
div.title p.list2{
	margin-top: .2rem;
	width: 100%;
	height: .3rem ;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: 0.22rem;
	color: #ED4021;
	text-align: center;
}
div.title p.point{
	margin-top: .3rem;
	font-weight:bold;
	line-height: 37px;
	letter-spacing: 0;
	padding-left: .5rem;
	text-align: left;
	font-family: PingFangSC-Medium;
	font-size:0.28rem;
	color: #000000;
}
div.title p.point1{
	line-height: 37px;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: 0.26rem;
	padding-left: .5rem;
	color: #4A4A4A;
	text-align: justify;
}
div.title p.point2{
	width:95%;
	line-height: .6rem;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: 0.26rem;
	padding-left: .5rem;
	color: #4A4A4A;
	word-break:normal;
	text-align: justify;
}
</style>