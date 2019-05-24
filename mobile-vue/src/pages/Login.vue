<template>
  	<div class="login">
  		<div class="login_con">
  			<form @submit.prevent="onSubmit" method="post">
  				<ul class="item-list" ref="ruleForm" :model="ruleForm">
  					<li class="border_bottom-1px" @click = "focusLi" >
	  					<input type="text" :placeholder="$t('login.Email_Phone_Number')" id="username" name="username" v-model="username"
	  					 autocomplete="off" data-name="username" 
	  					@input="changeInput">
	  					<span class="clearText" @click.stop.prevent="clearText('username')"></span>
	  				</li>
	  				<li  class="border_bottom-1px" @click = "focusLi">
	  					<template v-if="passType === 'password'">
				            <input
				            v-model="password"
				            @input="changeInput"
				            type="password"
				            :placeholder="$t('login.Password')">
				        </template>
				        <template v-if="passType === 'text'">
				            <input
				            v-model="password"
				            @input="changeInput"
				            type="text"
				            :placeholder="$t('login.Password')">
				        </template>
				        <!-- <span  class="error" v-show="err">{{errMessage}}</span> -->
				        <span class="clearText" @click.stop.prevent="clearText('password')"></span>
				       	<span class="eye" :class="{show: isShow}" @click="showPwd()"></span>
	  				</li>
	  				<li @click = "focusLi">
	  					<label for="remember">
							<input type="checkbox" id="remember"  @click="toggleRemember()" name="remember" v-model="remember" autocomplete="off" data-name="remember">
							<span v-bind:class="{'remember_me': isRemember}" class="checkbox"  :v-model="isRemember"></span>
							<span class="remember">{{ $t('login.Remember_Me?') }}</span>
								<span class = "error" v-show = "err">{{ backErrMessage }}</span>
								<!-- <span   class = "error"  v-show="template[errMessage]">{{$t(template[errMessage].name) }}</span> -->

	  					</label>
	  					<router-link class="forget" to='/forgot'>{{ $t('login.Forgot?') }}</router-link>
	  				</li>
	  				<li @click = "focusLi">
	  					<label for="log">
	  						<input type="submit" id="login" :value="$t('login.Log_in')"
									:disabled="isDisabled || beforeFocus"
          				:class="{disabled: isDisabled,focused: isFocus,beforeFocus: beforeFocus}">
	  					</label>
	  				</li>
  				</ul>
  			</form>
  		</div>
  		
  	</div>
	
</template>

<script>
import { mapState } from 'vuex'
export default{
	data(){
		return {
			ruleForm:{
				uesname:'',//用户名
				password:''//密码
			},
			isRemember: false,
			logBtnIsFocused: true,
			isDisabled: false, //disabled submit button
			beforeFocus: true,
			isFocus: false,
			response: {},
			isShow: 0,
			err: '',
			accountErr: '',
			passType: 'password',
			remember: true,
			username:'',
			password:'',
			backErrMessage:"",
			errMessage:"The Email/Phone Number and password you entered do not match!",
			/*templateErr:{
				"The Email/Phone Number and password you entered do not match!": "center.Info",
				"Password can not be blank.": "center.Info2"
			}*/
		}
	},
	watch: {
    	username(curr,old){
    		if(this.password && curr){
    			this.isFocus = true;
    			this.beforeFocus = false;
    		}
    	},
    	password(curr,old){
    		if(this.username && curr){
    			this.isFocus = true;
    			this.beforeFocus = false;
    		}
    	}
    },
	inject: ['reload'],
	computed: {},
	 //页面加载调用获取cookie值
    mounted() {
        this.getCookie();
    },
	methods: {
		toggleRemember() {
			this.isRemember = !this.isRemember;
			this.isDisabled = false
		},
		//点击登录调用方法
		focusLi(el) {
			//vue中不应该在代码中操作dom，除非不得不操作，待改善
			var node = el.target.parentNode;
			var node_parent = node.parentNode;
			//保存的账号
			/* var name = this.username;
			//保存的密码
			var pass = this.password;
			if(name == '' || name == null){
				console.log("请输入正确的用户名");
				return;
			}else if(pass == '' || pass == null){
				console.log("请输入正确的密码");
				return;
			}
			//判断复选框是否被勾选，若被勾选则调用配置cookie方法
			if(this.isRemember = true){
				//传入账号名，密码，和保存天数3个参数
				this.setCookie(name, pass, 1);
				}else {
                    //清空Cookie
                    this.clearCookie();
                }	
			//接口
			// console.log(this.$route.path);
			var url = this.$route.path;
			this.$http.post(url,this.ruleForm,{emulateJSON:true})
			.then(res=>{
				//判断用户名与密码是否正确，若正确则进入index首页
				if(res.body == "fail"){
					name = '';
					pass = '';
					return;
				}else{
					console.log("登录成功");
					this.$router.push("/index");
				}
			}); */
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
		/* //设置cookie
		setCookie(c_name, c_pwd, exdays) {
		    var exdate = new Date(); //获取时间
		    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
		    //字符串拼接cookie
		    window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
		    window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
		},
		//读取cookie
		getCookie: function() {
		    if (document.cookie.length > 0) {
		        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
		        for (var i = 0; i < arr.length; i++) {
		            var arr2 = arr[i].split('='); //再次切割
		            //判断查找相对应的值
		            if (arr2[0] == 'userName') {
		                this.ruleForm.username = arr2[1]; //保存到保存数据的地方
		            } else if (arr2[0] == 'userPwd') {
		                this.ruleForm.password = arr2[1];
		            }
		        }
		    }
		},
		//清除cookie
		clearCookie: function() {
		    this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
		}, */
		clearText(id) {
			this[id] = "";
			this.isFocus = false;
			this.beforeFocus = true;
		},
		showPwd() {
			this.isShow = this.isShow ? 0 : 1
	  		this.isShow ? this.passType = 'text' : this.passType = 'password'

		},
		changeInput() { //输入表单内容时进行实时监测
			if(!this.username || !this.password){
				this.isFocus = false;
				this.beforeFocus = true;
			}
		      this.isDisabled = false;
		      this.err = false;
		},
		beforeSubmit() {
			if(!this.password || !this.username){

			}
			this.isDisabled = true;
		},
	    onSuccess: function (res) {
	    	var message = res.body.message;
	    	var data = res.body.data;
	    	if(message){
	    		this.errMessage = "";
	    		if(message.password){
	    			this.err = true;
	    			this.backErrMessage = message.password;
	    		}else if(message.username){
	    			this.err = true;
	    			this.backErrMessage = message.username;
	    		}
	    	}
	    	if(data){
	    		//this.$router.go(0);
	    		this.getUserinfo();
	    		this.$router.push({path: '/center/free-app'});
	    	}
	    	

	    },
	    getUserinfo() {
	      var that = this;
	      this.$store.dispatch({
	        type: "getUserinfo",
	        token: that.$store.state.user.token
	      })
	      .then( response => {
	        if(response.body.data){
	          that.$store.commit('changeUser', response.body.data);
	        }
	      })
	      .catch( err => {
	        console.log(err);
	        this.$router.push({path:"/login"});
	      })
	    },
	    onError: function (err) {
	       console.log(err)
	      
	    },
	    onSubmit: function () {
	      // Disabled submit button
	      this.beforeSubmit()
	      // Login...
	      this.$store.dispatch({
	        type: 'login',
	        email_or_mobile: this.username,
	        password: this.password,
	        remember: this.isRemember
	      }).then(res => {
	        // Success handle
	        this.onSuccess(res)
	      }, err => {
	        // Error handle
	        this.onError(err)
	      })
	    },
	    getData() {
	      /*this.$http.get("./static/login.json",{}).then(response => {

	      });*/
	    }
	},
 created () {
    // Getting local user automatic filling
    if (localStorage.getItem('token')) {
      this.$store.commit({
        type: 'getLocalUser'
      })
    }
  },
  mounted() {
		//console.log(this.$route);
	},
	destroyed() {
		//console.log(this.$route);
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
	height: 1.26rem;
	line-height: 1.26rem;
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
	font-size: 0.20rem;
	color: #FF1A1A;
}
.item-list li span.remember{
	position: absolute;
	left: 1.05rem;
	font-size: 0.26rem;
	color: #9B9B9B;
}
.item-list li span.invisible{
	display: none;
}
.item-list li a.forget{
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
	display: block;
	width: 74%;
	height: 100%;
	line-height: 0.32rem;
	padding: 0 0 0 0.56rem;
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
    bottom: 0.5rem;
    left: 0.56rem;
    background: url(../assets/unchecked_bg.svg) no-repeat center center;
    background-size: 100%;
}
.item-list li span.remember_me{
	background: url('../assets/checked_bg.svg');
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
#login{
	display: inline-block;
	width: 80%;
	height: 0.98rem;
	padding: 0;
	border-radius: .54rem;	
}
#login.focused{
	background: #9013FE;
	color: white;
}

#login.disabled{
	background: #6401B1;
}
#login.beforeFocus{
	background: white;
	border: 1px solid #BBBBBB;
	color: #9B9B9B;
}
</style>