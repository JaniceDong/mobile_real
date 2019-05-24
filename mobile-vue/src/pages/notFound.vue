<template>
	<div class="not-found min-height">
		<div class="container">
			<img src="../assets/404.png" alt="">
		</div>
		<div class="refresh">
			<p>{{ $t('page.news') }}</p>
			<p><span @click.stop.prevent="refresh" >{{ $t('page.news1') }}</span>{{ $t('page.news2') }}<span @click="back">{{ $t('page.news3') }}</span></p>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods: {
			refresh() {
				this.$router.go(0);
			},
			back() {
				this.$router.go(-1);
			}
		}
	}
</script>
<style scoped>
.not-found{
	/* min-height: calc(100% - 112px); */
}
.container{
	width: 7.09rem;
	height: 5.15rem;
	margin: .73rem auto .42rem;
}
.container img{
	width: 100%;
	height: 100%;
}
.refresh p{
	font-family: PingFangSC-Regular;
	font-size: .24rem;
	color: #9B9B9B;
	text-align: center;
	line-height: .33rem;
}
.refresh p span{
	color: #4A90E2;
	text-decoration: underline;
}
</style>