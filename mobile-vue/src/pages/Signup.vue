<template>
	<div class="signup">
		<div class="signup_con">
			<form @submit.prevent="onSubmit" method="post">
  				<ul class="item-list">
  					<li class="border_bottom-1px border_top-1px" @click="focusLi">
	  					<input type="text" :placeholder="$t('app.Nickname')" id="nickname" name="nickname" v-model="nickname" 
	  					autocomplete="off" data-name="nickname" 
	  						@focus="focus"
	  						@blur="blur"
	  						@input="changeInput">
	  					<span class="clearText" @click="clearText('nickname')"></span>
	  				</li>
	  				<li class="border_bottom-1px"  @click="focusLi">
	  					<input type="text" :placeholder="$t('app.Phone_Number')" id="phoneNumber" name="phoneNumber" v-model="mobile"
	  					 autocomplete="off" data-name="phoneNumber" 
	  						@focus="focus"
	  						@blur="blur"
	  						@input="changeInput">
	  					<span  class="error" v-show="err_name">{{ errMessage }}</span>
	  					<span class="clearText" @click="clearText('mobile')"></span>
	  				</li>
	  				<li class="border_bottom-1px" @click="focusLi" >
	  					<input type="text" :placeholder="$t('login.Email')" id="email" name="email" v-model="email"
	  					 autocomplete="off" data-name="email"
	  						@focus="focus"
	  						@blur="blur"
	  						@input="changeInput">

	  					<span  class="error" v-show="err_mobile">{{ errMessage }}</span>
  						<span class="clearText" @click="clearText('email')"></span>
	  				</li>
	  				<li  class="border_bottom-1px" @click="focusLi">
	  					<template v-if="passType === 'password'">
				            <input
				            v-model="password"
				            @focus="focus('password')"
				            type="password"
				            name="password"
				            ref="password"
				            :placeholder="$t('login.Password')"
				            @input="changeInput">
				        </template>
				        <template v-if="passType === 'text'">
				            <input
				            v-model="password"
				            @focus="focus('password')"
				            ref="password"
				            type="text"
				            :placeholder="$t('login.Password')"
				            @input="changeInput">
				        </template>

	  					<span  class="error" v-show="err_email">{{ errMessage }}</span>
	  					<span class="clearText" @click="clearText('password')"></span>
	  					<span class="eye " :class="{show: isShow}" @click="showPwd('password')" ></span>
	  				</li>
	  				<li  class="border_bottom-1px" @click="focusLi">
	  					<template v-if="re_passType === 'password'">
				            <input
				            v-model="password_confirm"
				            @focus="focus('password_confirm')"
				            type="password"
				            name="password"
				            ref="password"
				            :placeholder="$t('login.Confirm_Password')"
										Updated upstream
				            @input="changeInput">
				        </template>
				        <template v-if="re_passType === 'text'">
				            <input
				            v-model="password_confirm"
				            @focus="focus('password_confirm')"
				            ref="password"
				            type="text"
				            :placeholder="$t('login.Confirm_Password')"
										Updated upstream
				            @input="changeInput">
				        </template>
				       	<span  class="error" v-show="err_password">{{ errMessage }}</span>
	  					<span class="clearText" @click="clearText('password_confirm')"></span>
	  					<span class="eye " :class="{show: re_isShow}" @click="showPwd('password_confirm')"></span>
	  				</li>
	  				<li class="border_bottom-1px" @click="focusLi" >
	  					<input type="text" :placeholder="$t('login.Invitation_Code')" id="invitation" name="invitation" v-model="invitation" autocomplete="off" data-name="invitation"
	  						@focus="focus"
	  						@blur="blur"
	  						@input="changeInput"
	  						>
						<span  class="error" v-show="err_password_confirm">{{ errMessage }}</span>
	  					<span class="clearText" @click="clearText('invitation')"></span>
	  				</li>
	  				<li @click="focusLi">
	  					<label for="agree">
							<input type="checkbox" id="agree"  @click="toggleRemember()" name="agree" v-model="agree"
							 autocomplete="off" data-name="agree">
							<span v-bind:class="{'remember_me': isRemember}" class="checkbox"  :v-model="isRemember"></span>
							<span class="remember"> {{ $t('login.info1') }} <a><router-link to='site/terms-of-use'> {{ $t('login.info2') }} </router-link></a> {{ $t('login.info3') }} </a><router-link to='/site/privacy-policy'>  {{ $t('login.info4') }} </router-link></a></span>
	  					</label>
	  					<span  class="error" v-show="err_invite_code">{{ errMessage }}</span>
				       	
	  				</li>
	  				<li @click="focusLi">
	  					<label for="log">
	  						<input type="submit" id="Sign" :value="$t('login.Sign_up')" 
	  						:class="{disabled: isDisabled,focused: isFocus,beforeFocus: beforeFocus}"
	  						:disabled="isDisabled || beforeFocus">
	  					</label>
	  				</li>
  				</ul>
  			</form>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				hasBBorder: true,
				isRemember: false,
				isDisabled: false,
				isFocus: false,
				beforeFocus: true,
				errMessage: "",
				isShow: 0,
				re_isShow: 0,
				passType: 'password',
				re_passType: 'password',
				nickname: "",
				mobile: "",
				email: "",
				password: "",
				password_confirm: "",
				err_name: false,
				err_mobile: false,
				err_email: false,
				err_password: false,
				err_password_confirm: false,
				err_invite_code:false,
				invitation:"",
				agree: false
				
			}
		},
		directives: {
		  focus: {
		    inserted: function (el) {
		    	console.log(el);
		    }
		  }
		},
		mounted() {
			
		},
		created() {

		},
		methods: {
			toggleRemember() {
				this.isRemember = !this.isRemember;
				if(this.nickname && this.mobile&& this.email&& this.password && this.password_confirm&&this.isRemember){
					this.isFocus = true;
					this.beforeFocus = false;
				}else{
					this.isFocus = false;
					this.beforeFocus = true;
				}
			},
			focusLi(el) {
			var node = el.target.parentNode;
			var node_parent = node.parentNode;
			if(node.nodeName == "LABEL"){
				node_parent = node.parentNode.parentNode;
			}
			if(node_parent.nodeName == "UL"){
				var lis = node_parent.querySelectorAll("li");
				for(var i = 0; i < lis.length; i++){
					lis[i].classList.remove("focus");
				}
			}
			if(node.nodeName == "LI"){
				node.classList.add("focus");
			}
		},
		clearText(id) {
			this[id] = "";
			if(id !== "invitation"){
				this.isFocus = false;
				this.beforeFocus = true
			}
			
		},
		showPwd(id) {
			if(id == "password"){
				this.isShow = this.isShow ? 0 : 1
      			this.isShow ? this.passType = 'text' : this.passType = 'password'
			}else if( id == "password_confirm"){
				console.log(this.re_isShow);
				this.re_isShow = this.re_isShow ? 0 : 1
      			this.re_isShow ? this.re_passType = 'text' : this.re_passType = 'password'
			}
			

		},
			focus(el) {
				
				
			},
			blur(el) {
				
				
			},
			changeInput() { //输入表单内容时进行实时监测
				
				this.isDisabled = false;
				this.err_name = false;
				this.err_mobile = false;
				this.err_email = false;
				this.err_password_confirm = false;
				this.err_password = false;
				this.err_invite_code =false;
				if(this.nickname && this.mobile&& this.email&& this.password && this.password_confirm&&this.isRemember){
					this.isFocus = true;
					this.beforeFocus = false;
				}else{
					this.isFocus = false;
					this.beforeFocus = true;
				}
			},
			beforeSubmit() {
				this.isDisabled = true;
			},
			onSuccess(res) {
				var message = res.body.message;
				if(res.body.code == "0"){
					this.$router.push({path:'/index'});
				}
				if(message.name){
					this.err_name = true;
					this.errMessage = message.name;
				}else if(message.mobile){
					this.err_mobile = true;
					this.errMessage = message.mobile;
				}else if(message.email){
					this.err_email = true;
					this.errMessage = message.email;
				}else if(message.password){
					this.err_password = true;
					this.errMessage = message.password;
				}else if(message.password_confirm){
					this.err_password_confirm = true;
					this.errMessage = message.password_confirm;
				}else if(message.invite_code){
					this.err_invite_code = true;
					this.errMessage = message.invite_code;
				}
				
			},
			onError(res) {

			},
			onSubmit() {    //提交表单
				this.beforeSubmit();
				this.$store.dispatch({
			        type: 'register',
			        name: this.nickname,
	          		mobile: this.mobile,
	          		email: this.email,
	          		password: this.password,
	          		password_confirm: this.password_confirm,
	          		invite_code: this.invitation,
	          		agree_terms: this.isRemember
			      }).then(res => {
			        this.onSuccess(res);
			      }, err => {
			        // Error handle
			        console.log(err);
			        this.onError(err)
			      })
			}
		}
	}
</script>
<style scoped>
.login{
	width: 100%;
	height: auto;
	overflow: hidden;
}
.item-list{
	width: 100%;
	height: auto;
	overflow: hidden;
}
.item-list li{
	position: relative;
	width: 100%;
	height: 1.06rem;
	line-height: 1.06rem;
}
/* .item-list li.focus{
	border-bottom: 2px solid #9013FE;
} */
.item-list li label{
	display: block;
	width: 100%;
	height: 100%;
}
.item-list li span.error{
	position: absolute;
	line-height: 0.3rem;
	left: 0.5rem;
	top: 0;
	background: url('../assets/error.svg') no-repeat left center;
	background-size: 0.22rem;
	text-indent: 16px;
	font-family: PingFangSC-Light;
	font-size: 0.22rem;
	color: #FF1A1A;
}
/* .item-list li span.error{
	display: block;
	position: absolute;
	line-height: 0.3rem;
	left: 0.28rem;
	top: 0;
	font-family: PingFangSC-Light;
	font-size: 0.22rem;
	color: #FF1A1A;
} */
.item-list li span.remember{
	position: absolute;
	left: 1.05rem;
	font-size: 0.26rem;
	color: #9B9B9B;
}
.item-list li span.remember a{
	color: #9013FE;
}
/* .item-list li span.term , .item-list li span.protocol{
	position: absolute;
	left: 1.05rem;
	font-size: 0.26rem;
	color: #9013FE;
} */
.item-list li span.invisible{
	display: none;
}
.item-list li span.forget{
	position: absolute;
	right: 0.56rem;
	top: 0; 
	font-size: 0.26rem;
	color: #9B9B9B;
}
.item-list li label{
	position: relative;
}
.item-list li input{
	width: 100%;
	height: 100%;
	line-height: 0.32rem;
	padding: 0 0.56rem;
	font-family: PingFangSC-Regular;
	color: #000;
	font-size: 0.32rem;
	outline: none;
	border: none;
}
.item-list li span.checkbox{
	width: 0.34rem;
	height: 0.34rem;
	background: black;
	position: absolute;
    bottom: 0.4rem;
    left: 0.56rem;
    background: url(../assets/unchecked.svg) no-repeat center center;
    background-size: 100%;
}
.item-list li span.remember_me{
	background: url('../assets/checked.svg');
	background-repeat: no-repeat;
	background-size: 100%;
}
.item-list li input[type="checkbox"]{
	opacity: 0;
	width: 50% !important;
	padding: 0;
    width: 10%;
    position: absolute;
    bottom: 0;
    left: 0.56rem;
}
#Sign{
	display: inline-block;
	width: 80%;
	height: 0.98rem;
	border-radius: .54rem;
	background: white;
	/* border: 1px solid #BBBBBB; */
	color: #9B9B9B;
}
#Sign.focused{
	background: #9013FE;
	color: white;
	border: none;
}
#Sign.disabled{
	background: #6401B1;
}
#Sign.beforeFocus{
	background: white;
	border: 1px solid #BBBBBB;
	color: #9B9B9B;
}
b{
	font-style: normal;
	color: #9013FE;
}
</style>