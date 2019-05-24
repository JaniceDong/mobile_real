<template>
	<div class="message-list min-height">
		<ul class="message-container">
			<li v-for="message in messages">
				<router-link :to="{path:'/message-list/detail', query:{message_id: message.id}}" >{{ message.organization_name }}</router-link> <span></span>
			</li>
		</ul>
		<p v-show="!messages.length">{{$t('login.messages')}}</p>
	</div>
</template>
<script>
import { mapState } from 'vuex'

export default{
	data() {
		return{
			messages:[],
			url: this.GLOBAL.baseURL,
		}
	},
	computed:{
		...mapState({

		})
	},
	created(){
		this.getMessages();
	},
	mounted() {
		
	},
	methods:{
		getMessages() {
			var that = this;
			this.$nextTick(function(){
				this.$http.get(this.url + '/v2/notices/index',{
					headers: {
						token: that.$store.state.user.token
					}
				})
				.then( response => {
					if(response.data)
						that.messages = response.data

				}).catch( err => {

				})
			})
		},
	}
}
</script>
<style scoped>
	.message-list{
		/* min-height: calc(100% - 112px); */
		text-align: left;
		overflow: hidden;
	}
	.message-list ul{
		width: 100%;
		min-height: calc(100% - 112px);
		overflow: hidden;
		background: #F5F5F5;
	}
	.message-list p{
		position: absolute;
	    left: 0;
	    top: 2rem;
	    width: 100%;
	    color: rebeccapurple;
	    font-family: PingFangSC-Regular;
	    font-size: .26rem;
	    color: #9B9B9B;
	    text-align: center;
	    
	}
	.message-container li{
		width: 100%;
		height: 1.04rem;
		line-height: 1.04rem;
		padding: 0 .32rem;
		background: #FFFFFF ;
		border-bottom: 1px solid #EEEEEE;
		position: relative;

	}
	.message-container li a{
		display: inline-block;
    	width: 100%;
		font-size: .34rem;
		color: #000000; 

	}
	.message-container li > span{
		position: absolute;
		width: .16rem;
		height: .26rem;
		right: .32rem;
		top: .39rem;
		background: url(../assets/right.svg) no-repeat center;
		background-size: .16rem .26rem;
	}
</style>