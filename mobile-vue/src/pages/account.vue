<template>
	<div class="info min-height">
		<ul>
			<li> <!-- 事件写在li上点击蒙层时弹出框一直跳动，并不会隐藏 -->
				<div class="avatar" @click="showSheet">  
					<div class="account_avatar">
						<img :src="user.avatar || defaultAvatar" alt="">
						<input type="text" id="img" v-model="avatar">
					</div>
					<span>{{ user.name }}</span>
				</div>
				<span></span>
				<div class="sheetAction" v-show="sheetVisible" @click="hideSheet"></div>
				<div class="mint-actionsheet" v-show="sheetVisible">
					<ul class="actionsheet-list" style="margin-bottom: 5px;">
						<li class="mint-actionsheet-listitem"  >
							<label for="camera"><input id="camera" type="file" accept="image/*" capture="camera" class="cameraInput" @change="uploadImg" ></label>
							<p @click="uploadHeadImg">   {{ $t('layout.Camera') }}</p>
						</li>
						<li class="mint-actionsheet-listitem"  >
							<label for="library"><input id="library" type="file" accept="image/*" multiple="multiple" class="libraryInput" @change="uploadImg" ></label>
							<p @click="getLibrary"> {{ $t('layout.Photo_Album') }}</p>
						</li>
					</ul>
				 <a class="mint-actionsheet-button" @click="hideSheet"> {{ $t('login.Cancel') }} </a>
				</div>
			</li>
			<li><router-link to='/account/info'> {{ $t('login.Accouont_Info') }} </router-link> <span></span></li>
			<!-- <li @click="pageJump"><router-link> {{ $t('login.Accouont_Info') }} </router-link> <span></span></li> -->
			<li v-show="user.organization_id"><router-link to='/account/company'> {{ $t('login.My_business') }} </router-link> <span></span></li>
			<li><router-link to='/account/new-password'>{{ $t('login.Password') }} </router-link> <span></span></li>
			<li>{{ $t(' login.Usage') }}<b>{{user.used_space}} / {{ user.total_space}}</b></li>
		</ul>
		<div class="loading" v-show="loading">
			<img  src="../assets/loading.gif" alt="">
		</div>
		<span class="oversize" v-show="oversize">图片大小请不要超过5M。</span>
	</div>
</template>
<script>
import { mapState } from "vuex"

export default {
	inject: ['reload'],
	name: "myInfo",
	data(){
		return {
			num: 260,
			defaultAvatar: require("../../static/imgs/default_avatar.svg"),
			cancelText: "Cancel",
			sheetVisible: false,
			/*user:{},*/
			url: this.GLOBAL.baseURL,
			avatar:"",
			loading: false,
			oversize: false,
			temp_avatar: ""
		}
	},
	mounted() {
		this.$nextTick(function(){
			this.getUserinfo();
		})
		
	},
	computed:{
		...mapState({
			user: state => state.getUserInfo.userinfo
		})
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
					that.$store.commit({
						type:'updateUser',
						user: response.body.data
					})
					//this.user = response.body.data;
				}
			})
			.catch( err => {
				console.log(err);
				this.$router.push({path:"/login"});
			})
		},
		uploadHeadImg() {
			this.sheetVisible = false;
		},
		getLibrary() {
			this.sheetVisible = false;	
		},
	    uploadImg(e) {
	    	var that = this;
		    this.sheetVisible = false;
		    this.loading = true;
			let $target = e.target || e.srcElement;
		    let file = $target.files[0];
		    if (!/image\/\w+/.test(file.type)) {
		        alert("image only please.");
		        return false;
		    }
		    var reader = new FileReader();
		    reader.readAsDataURL(file);
		    reader.onload = function(e) {
		        var img = new Image,
		            width = 640, //image resize
		            canvas = document.createElement("canvas"),
		            drawer = canvas.getContext("2d");
		        img.src = this.result;//this == reader
		        img.onload = function() {
		            canvas.width = width;
		            canvas.height = width * (img.height / img.width);
		            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
		            that.temp_avatar = canvas.toDataURL("image/jpeg");// to url
		            
		      	var temp_file = that.dataURLtoFile(that.temp_avatar,'avatar.png');// to file
		      	var size = temp_file.size;
			    if(size > 5 * 1024 * 1024){
			    	that.oversize = true;
			    	setTimeout(function(){
			    		that.oversize = false;

			    	},1000);
			    	that.loading = false;
			    	return;
			    }
		        that.uploadImage(temp_file);
		        }
		        

		    }
	    },
	    dataURLtoFile(dataurl, filename) {
		    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		    while(n--){
		        u8arr[n] = bstr.charCodeAt(n);
		    }
		    return new File([u8arr], filename, {type:mime});
		},
		uploadImage(file) {
		  var that = this;
	      var params = new FormData();
	      params.append("avatar", file);
	      that.$http.post(that.url + "/v2/users/upload-avatar",params,{
	      	headers:{
	      		token: that.$store.state.user.token,
	      		//提交file类型文件时必须设置此类型，在原生form里面enctype="multipart/form-data"
	      		'Content-Type': 'multipart/form-data'

	      	}
	      }).then( response => {
	      	var avatar = response.data.data.avatar;
	      	if(avatar){
	      		that.$store.commit({
	      			type: "changeAvatar",
	      			template_avatar: that.temp_avatar
	      		})
	      		this.loading = false;
	      	}
	      }).catch( err => {
	      	this.loading = false;
	      	console.log(err);
	      })
		},
		showSheet(){
			this.sheetVisible = true;
		},
		hideSheet( ){
			this.sheetVisible = false;
		}
		
	}
}
</script>
<style scoped>
.loading{
	position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.3);
}
.loading img{
	position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
}
.oversize{
	width: 4.76rem;
	height: .48rem;
	line-height: .48rem;
	position: absolute;
	left: 50%;
	top: 55%;
	transform: translate(-50%);
	opacity: 0.5;
	background: #000000;
	border-radius: 4px;
	font-family: PingFangSC-Regular;
	font-size: .2rem;
	color: #FFFFFF;
	text-align: center;
}
.info{
	width: 100%;
	background: #F5F5F5;
	overflow: hidden;
	text-align: left;
}
.info ul{
	width: 100%;
}
.info ul li{
	position: relative;
	background: #FFFFFF;
	overflow: hidden;
	min-height: 1.03rem;
	line-height: 1.03rem;
	padding: 0 .32rem;
	font-family: PingFangSC-Regular;
	font-size: .34rem;
	border-bottom: 1px solid #EEEEEE;
}
.info ul li a{
	display: inline-block;
	width: 100%;
	color: #000000;
}
.info ul li:first-child{
	margin-bottom: .34rem;
	line-height: auto;
}
.info ul li:first-child > span{
	top: .77rem;
}
.info ul li:nth-child(4){
	margin-bottom: .34rem;
}
.info ul li b{
	float: right;
	margin-right: .32rem;
	color: #4A4A4A;
}
.info ul li > span{
	position: absolute;
	width: .16rem;
	height: .26rem;
	right: .32rem;
	top: .39rem;
	background: url(../assets/right.svg) no-repeat center;
	background-size: .16rem .26rem;
}
.avatar{
	width: 100%;
	height: 1.8rem;
	padding: .3rem .32rem;
}
.avatar .account_avatar{
	display: inline-block;
	width: 1.2rem;
	height: 1.2rem;
	margin-right: .32rem;
	overflow: hidden;
}
.avatar img{
	width: 100%;
	height: 100%;	
	border-radius: 50%;
}
.avatar span{
	display: inline-block;
	height: 100%;
	line-height: 100%;
	vertical-align: middle;
	font-family: PingFangSC-Medium;
	font-size: .34rem;
	color: #333333;
	letter-spacing: 0.55px; 
}
.sheetAction{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 10;
	background: rgba(0,0,0,.4);
}
.actionsheet-list{

}
.mint-actionsheet {
  position: fixed;
  background: #e0e0e0;
  width: 100%;
  text-align: center;
  bottom: 0;
  left: 50%;
  z-index: 20;
}
.mint-actionsheet input{
	opacity: 0;
}
.mint-actionsheet-listitem, .mint-actionsheet-button {
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  color: #333;
  background-color: #fff;
}
.mint-actionsheet-listitem:active, .mint-actionsheet-button:active {
  background-color: #f0f0f0;
}
.mint-actionsheet p{
	position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: .36rem;
    color: #333333;
}
.mint-actionsheet ul li:first-child{
	margin-bottom: 0;
}
.mint-actionsheet label{
	position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}
    
</style>
