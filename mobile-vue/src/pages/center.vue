<template>
	<div class="center min-height">
		<div class="center-container">
			<div class="app-tab">
				<div class="app-tab-item">
					<router-link to='/center/free-app'>{{ $t('layout.free_app') }}</router-link>	
				</div>
				<div class="app-tab-item">
					<router-link to='/center/my-favorite' @click.native="reload">{{ $t("layout.My_favorite") }}</router-link>
				</div>	
			</div>
			<router-view/>
		</div>	
	</div>
</template>
<script>
	export default{
		data(){
			return {
				msg: "center.vue"
			}
		},
		methods: {
			reload() {
				location.reload();
			}
		}
	}
</script>

<style scoped>
	.center{
		width: 100%;
		/* min-height: calc(100% - 112px); */
		height: auto;

	}
	.center .app-tab{
		display: flex;
		width: 100%;
		height: 0.78rem;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #E3E3E3;
	}
	.app-tab-item{
		flex: 1;
		
	}
	.app-tab a{
		display: inline-block;
		line-height: 0.68rem;
		font-family: PingFangSC-Medium;
		font-size: .32rem;
		color: #000000;
		letter-spacing: 0;
		padding-bottom: 3px;
	}
	.app-tab a.is-active{
		color: #9013FE;
		padding-bottom: 0;
		border-bottom: 3px  solid #9013FE; 
	}
</style>