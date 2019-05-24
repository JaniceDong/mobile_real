<template>
	<div class="wrapper">
		<div class="content-wrapper">
			<div class="banner">
				<!-- 轮播插件，图片放到 mt-swipe-item中 -->
				<mt-swipe :prevent="true" :stopPropagation="true">
					<mt-swipe-item>
					  	<img src="../assets/banner1.png" alt="">
					</mt-swipe-item>
					<mt-swipe-item>
					  	<img src="../assets/banner2.png" alt="">
					</mt-swipe-item>
					<mt-swipe-item>
					   <img src="../assets/banner3.png" alt="">
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="content-show" >
				<!-- 展示的图片列表 -->
				<div class="img-show" v-for="img in imgList">
					<img :src="img" alt="" />
				</div>
				<div class="img-show">
					<img v-if="lang == 'en'" :src="contact_en" alt="">
					<img v-else :src="contact_zh" alt="">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import i18n from '../i18n'
export default{
	inject: ['reload'],
	data() {
		return {
			imgList: [],
			isShowPop: false,
			contact_en: '../static/imgs/contact_en.png',
			contact_zh: '../static/imgs/contact_zh.png'
		}
	},
	computed: {
		lang() {
			return i18n.locale
		}
	},
	mounted() {
		//this.$router.go(0);
    	this.getData();
  	},
	methods: {
	    getData() {
	      this.$http.get("./static/list.json",{}).then(response => {
	        this.imgList = response.data.imgs;
	      });
	    },
	    showPop(el) {
	    	console.log(el);
	    	this.$set(el,"isShowPop",true )
		}
  	},
  	created() {
  		
  	}
}
</script>
<style scoped>
.wrapper{
	width: 100%;
	height: auto;
	min-height: 20rem;
}
.banner{                        
	width: 100%;
	height: 2.86rem;
}
.banner img{
	width: 100%;
	height: 100%;
}
.mint-swipe-indicator{
	width: .4rem;
	height: 0.04rem;
	opacity: 1;
	margin: 0;
	border-radius: 0;
	background: #F0DEFF;
}
.mint-swipe-indicator.is-active{
	background: #9013FE;
}
.content-show{
	width: 100%;
	height: auto;
}
.img-show{
	width: 100%;
	/* height: 5.44rem; */
	overflow: hidden;
}
.img-show img{
	display: block;
	width: 100%;
	height: 100%;
}
.applications{
	width: 100%;
	height: auto;
	background: #F5F5F5;
	padding: .5rem 0 .6rem;
}
 .title{
	width: 100%;
	padding: 0 0.38rem 0.3rem 0.38rem;
}
.title span{
	display: inline-block;
	width: 100%;
	text-align: center;
	font-size: .3rem;
	color: #000000;
}

.app-list ul{
	display: flex;
	flex-wrap:wrap;
	justify-content: space-between;
	width: 100%;
	padding: 0 0.07rem;
	height: 4.88rem;
}
.app-list ul li{
	position: relative;
	height: 2.4rem;
	width: 2.4rem;
}
.app-list img{
	width: 100%;
	height: 100%;
}
.app-list ul li p{
	position: absolute;
	left: 0;
	top: 0;
	padding: .14rem;
	width: 100%;
	height: 100%;
	background: rgba(144,19,254,.9);
}
.app-list p a{
	font-family: PingFangSC-Regular;
    font-size: .2rem;
    color: #FFFFFF;
    position: absolute;
    right: 0.14rem;
}
.partner{
	width: 100%;
	height: 5.42rem;
	padding: .6rem .53rem;
	background: white;
}
.partner-list ul{
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap:wrap;
	justify-content: space-between;
	align-items: center;
}
.partner-list ul li{
	width: 1rem;
	height: 1rem;
	margin-right: 0.36rem;
	margin-bottom: .24rem;
	display: flex;
}
.partner-list ul li:nth-child(5n){
	margin-right: 0;
}
.partner-list img{
	width: 1rem;
	height: 100%;
}
.experience{
	width: 100%;
	height: 4.08rem;
	background: #9013FE;
	padding: 0.56rem 0.65rem 0;
}
.experience p{
	font-family: PingFangSC-Medium;
	font-size: 0.34rem;
	color: #FFFFFF;
	text-align: center; 
	line-height: 0.48rem;
}
.experience p.font-small{
	font-size: 0.24rem;
	line-height: 0.32rem;
}
.experience span.btn{
	display: inline-block;
	width: 2.8rem;
	height: 0.54rem;
	text-align: center;
	line-height: 0.54rem;
	font-size: 0.24rem;
	color: #FFFFFF;
	margin-top: .2rem;
	border: 1px solid #FFFFFF;
}
</style>