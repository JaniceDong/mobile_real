<template>	
	<div>
		<div class="title">
			<span class="txt">{{ $t('login.Account_Security') }}</span>
		</div>
		<div class="retrieve_sign">
			<div class="tab">
				<div class="tab-item">
					<a href="#" class="router-link-exact-active is-active selected">{{ $t('project.RETRIEVE') }}&nbsp;{{ $t('project.THE') }}&nbsp;{{ $t('project.PASSWORD') }}</a>
				</div>
			</div>
			<div>
				<div class="retrieve">
					<div class="retrieve_con"> 
						<form method="post">
							<ul class="item-list">
								<div class="text">
									<p class="f1">{{ $t('login.Prompt1') }}<span class="email">{{ email }}</span>{{ $t('login.Prompt2') }}</p>
									<!-- <p class="f2">{{ $t('login.Prompt3') }}</p> -->
								</div>
								<li>
									<label for="log">
										<input type="submit" id="confirm2"  :value="$t('login.Mailbox')"
										class="disabled" disabled="disabled" @click="toMailbox">
									</label>
								</li>
								<div class="dsc" style="margin-top: 0.2rem;">
									<p class="f1">{{$t('project.title')}}</p>
									<p class="f2" @click="tryagain">{{ $t('login.resend') }}</p>
								</div>
							</ul>
						</form>
					</div>
				</div>
			</div>
			<div class="bottom">
				<span>
					<p class="f1">{{ $t('login.Existing_account,') }}</p>
					<router-link to="login">
						<p id="login" @click="tologin">{{$t('login.Now')}}</p>
					</router-link>	
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	  inject: ['reload'],
	  data () {
	    return {
				
	      isDisabled: false,
	      isFocus: false,
	      email:""
	    }
	  },
	  methods: {
	  	onSuccess: function (res) {
	    	this.$router.push({path: 'login'});
	    },
	  	beforeSubmit() {
			this.isDisabled = true;
		},
		tryagain(){
			this.$router.push({path:'/forgot'});
		},
		getEmail(){
			var params = this.$route.query;
			this.email = params.email;
		},
		tologin(){
			this.$router.push({path:'login'})
		}
	  },
	  created(){
	  	this.getEmail();
	  }
}
</script>
<style scoped>
div.dsc{
	margin-top:10px;
}
div.tab{
	margin-bottom:.6rem;
}
.tab-item a.is-active{
	color: #000000;
	font-size: 0.35rem;
}
div.tab{
	margin-bottom:.6rem;
}
div.dsc{
	margin: auto;
	line-height: 0.33rem;
	width: 6.12rem;
	height: 0.99rem;
}
div.dsc p.f1{
	display: inline;
	letter-spacing: 0.92px;
	line-height: 0.3rem;
	font-family: PingFangSC-Regular;
	font-size: 0.22rem;
	color: #9B9B9B;
	letter-spacing: 0.92px;
	text-align: center;
}
div p.f1 span.email{
	color: red;
}
div.dsc p.f2{
	display: inline;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color: #ff0000;
	letter-spacing: 0.92px;
	text-align: center;
	line-height: 0.34rem;
}
div.text{
	width: 5rem;
	height: 1.5rem;
	margin: auto;
	line-height: 0.33rem;
}
div.text p.f1{
	display: inline;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color: #000000;
	letter-spacing: 0;
	text-align: center;
}
div.text p.f2{
	display: inline;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color:  #ff0000;
	letter-spacing: 0;
	text-align: center;
	line-height: 0.33rem;
}
div.bottom{
	position:relative; 
	width:100%; 
	height:5.7rem; 
	text-align: center;
}
div.bottom span{
	text-align:center;
	line-height: 8rem;
}
div.bottom span p.f1{
	display: inline;
	font-family: PingFangSC-Light;
	font-size: 0.26rem;
	color: #000000;
	letter-spacing: 0.15px;
	text-align: center;
}
div.bottom span p#login{
	display: inline;
	font-family: PingFangSC-Light;
	font-size: 0.28rem;
	color: #8F00FF;
	letter-spacing: 0.16px;
	text-align: center;
}
.border_bottom-1px.focus {
    border-color: #E3E3E3;
    border-width: 1px;
    z-index: 1;
}
#confirm.disabled {
    background: #6401B1;
}

#confirm{
	margin-top:120px;
    display: inline-block;
    width: 80%;
    height: 0.98rem;
    padding: 0;
    border-radius: .54rem;
    background: #9013FE;
    border: 1px solid #BBBBBB;
    color:  #FFFFFF;
}
#confirm2{
    display: inline-block;
    width: 80%;
    height: 0.98rem;
    padding: 0;
    border-radius: .54rem;
    background: #9013FE;
    border: 1px solid #BBBBBB;
    color:  #FFFFFF;
}
div.title{
	position: relative;
	width: 100%;
	height: 1.14rem;
	background: #9013FE;
}
span.txt{
	width: 100%;
	height: 1rem;
    font-family: PingFangSC-Regular;
    color: #FFFFFF;
    text-align: center;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
}
</style>
