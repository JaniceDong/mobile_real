<template>
	<div class="footer" ref="footer" v-show="showFooter">
		<p>
			<router-link  to="/site/privacy-policy">
				{{ $t('login.info4') }}
			</router-link>
			<!--<a href="https://test.realmax.com/site/privacy-policy">Privacy Policy</a>-->
			<b></b>
			<router-link  to="/site/terms-of-use">
				{{ $t('login.info5') }}
			</router-link>
			<!--<a href="https://test.realmax.com/site/terms-of-use">Terms Of Use</a> -->
			<b></b> 
			<router-link  to="/site/cookie-policy">
				{{ $t('login.info6') }}
			</router-link>
			<b></b>
			<router-link  to="/site/release-information">
				{{ $t('login.info7') }}
			</router-link>
			<!--<a href="https://test.realmax.com/site/cookie-policy">Cookie Policy</a>-->
		</p>
		<p class="bei"><a href="http://www.miitbeian.gov.cn/" target="_blank">沪ICP备13033468号-9</a></p>
	</div>
</template>

<script>
	export default{
		props:["showFooter"],
		data(){
			return {
				msg: "footer"
			}
		}
	}
</script>
<style>
.footer{
	width: 100%;
	height: 62px;
	background: #413D47;
	padding: 0.24rem 0;
}
.footer p a{
	font-size: 0.2rem;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: center;
}
.footer p.bei a{
	font-size: 0.24rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center
}
p b{
	display: inline-block;
	width: 1px;
	height: 0.1rem;
	background: #FFFFFF;
	margin: 0 ;
}
.footer p.bei{
	margin-top: 0.12rem;
	opacity: 0.5;
}
</style>