<template>
	<div class="account-info min-height">
		<ul>
			<form action="post" @submit.prevent="onSubmit">
				<li v-show="lang != 'zh'"><div @click="showSexPicker"><router-link to='' >{{ $t('login.Sex')}}<span></span><b>{{ $t(template_object[template_gender]) }}</b></router-link></div></li>

				<li v-show="lang == 'zh'"><div @click="showSexPicker"><router-link to='' >{{ $t('login.Sex')}}<span></span><b>{{template_gender}}</b></router-link></div></li>

				<li><router-link :to="{path:'/account/new-email'}">{{ $t('login.Email')}}<span></span> <b class="editable">{{ user.email }}</b></router-link></li>
				<li><router-link :to="{path:'/account/new-nickname',query:{name: user.name}}">{{ $t('login.Name')}}<span></span> <b>{{ user.name }}</b></router-link> </li>
				<li><router-link :to="{path:'/account/new-mobile',query:{mobile: user.mobile}}"> {{ $t('login.Mobile')}}<span></span> <b>{{ user.mobile | hideMobile }}</b></router-link> </li>
				<li><router-link :to="{path:'/account/biography', query:{biography: user.biography}}"> {{ $t('login.Biography')}} <span></span> <b></b></router-link> </li>
				<li><router-link :to="{path:'/account/organization', query:{ organization: user.organization}}"> {{ $t('login.Organization')}}<span></span> <b></b></router-link> </li>

				<div class="sexPicker">
			       <mt-popup
			           v-model="sexVisible"
			            position="bottom">
			           <mt-picker :slots="slots"  :show-toolbar="true" ref='picker' v-show="lang != 'zh'"></mt-picker>
			           <mt-picker :slots="slots_zh"  :show-toolbar="true" ref='picker_zh' v-show="lang == 'zh'"></mt-picker>
			           <button @click="hideSexPicker" class="cancel"> {{ $t('app.Cancel') }}</button>
			           <button @click="handleConfirm" class="sure"> {{ $t('app.Confirm') }} </button>
			        </mt-popup>
				</div>
			</form>
		</ul>
	</div>
</template>
<script>
import i18n from '../i18n'
import { mapState } from 'vuex'
let pickerArray = {"Male":"1","Female":"2","Secret":"3"};
let temlpate_pickerArray = {"1":"Male","2":"Female","3":"Secret","0": "Secret"};
let pickerArray_zh = {"男":"1","女":"2","保密":"3"};
let temlpate_pickerArray_zh = {"1":"男","2":"女","3":"保密","0": "保密"};
export default{
	data() {
		return{
			sexVisible: false,
			isChange: false,
			url: this.GLOBAL.baseURL,
			template_gender:[],
			gender_num: '',
			/*slots: this.template_sort,*/
			template_object: {
				"Male": "login.Male",
				"Female": "login.Female",
				"Secret":"login.Secret"
			},
			slots:[{
				flex: 1,
	            values:Object.keys(pickerArray), //show pickerArray's keys
	            className: 'slot1',
	            textAlign: 'center',
			}],
			slots_zh:[{
				flex: 1,
	            values:Object.keys(pickerArray_zh), //show pickerArray's keys
	            className: 'slot1',
	            textAlign: 'center',
			}],
			i18n: i18n,
		}
	},
	computed:{
		...mapState({
			user: state => state.getUserInfo.userinfo
		}),
		lang() {
			if(i18n.locale == "zh"){
				this.template_gender = temlpate_pickerArray_zh[this.gender_num];
			}else{
				this.template_gender = temlpate_pickerArray[this.gender_num];
			}
			return i18n.locale
		}
		
	},
	mounted() {
		this.getUserinfo();
	},
	created() {
		if(this.i18n.locale == "zh"){
			this.zh = true;
		}
	},
	filters: {
		hideMobile: function(value){
			if(!value) return;
			value = value.toString();
			return value.substr(0,3) + "****" + value.substr(7);
		}
	},
	methods: {
		getUserinfo(){
			var that = this;
			this.$store.dispatch({
				type: "getUserinfo",
				token: that.$store.state.user.token
			})
			.then( response => {
				//console.log(response.body.data);
				this.gender_num = response.body.data.gender;
				if(that.i18n.locale == "zh"){
					that.template_gender = temlpate_pickerArray_zh[response.body.data.gender];
				}else{
					that.template_gender = temlpate_pickerArray[response.body.data.gender];
				}
				
			})
			.catch( err => {
				console.log(err);
			 	this.$router.push({path:"/login"});
			})
		},
		handleConfirm () {
	      if(this.i18n.locale == "zh"){
	      	this.sex = this.$refs.picker_zh.getValues()[0];
	      	this.gender = pickerArray_zh[this.sex];//找到对应的值
	      }else{
	      	 this.sex = this.$refs.picker.getValues()[0];
	      	this.gender = pickerArray[this.sex];//找到对应的值
	      }
    	  
	      this.gender_num = this.gender;
    	  this.onSubmit();
	      this.sexVisible = false
		},
		onSubmit() {
			this.beforeSubmit();
			var that = this;
			if(!this.sex){
				this.err = true;
				return;
			}
			this.$store.dispatch({
				type:"updateUserInfo",
				tag:"updateGender",
				gender: that.gender,
				token: that.$store.state.user.token
			}).then( response => {
				this.onSuccess(response);

			}).catch( err => {
				console.log(err);
			})
		},
		beforeSubmit(){
			this.isDisabled = true;
		},
		onSuccess(response) {
			if(!response.body.message.gender){ //Update success
				this.template_gender = this.sex;
			}
		},
		onError(err){
			var that = this;
			this.failure = true;
			setTimeout(function(){
				that.isDisabled = false;
				that.failure = false;
			},1000);
		},
		showSexPicker() {
			this.sexVisible = true;
		},
		hideSexPicker(){
			this.sexVisible = false
		}
	},
	beforeCreated(){
	}
}
</script>
<style scoped>
.account-info{
	width: 100%;
	height: auto;
	overflow: hidden;
	text-align: left;
}
.account-info ul{
	width: 100%;
}
.account-info ul li{
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
.account-info ul li a{
	display: inline-block;
	width: 100%;
	color: #000000;
	float: left;
}
.account-info ul li b{
	float: right;
	text-align: right;
	width: 65%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-right: .32rem;
	font-size: .32rem;
	color: #9B9B9B;
}
.account-info ul li b.editable{
	color: #4A4A4A;
}
.account-info ul li span{
	position: absolute;
	width: .16rem;
	height: .26rem;
	right: .32rem;
	top: .39rem;
	background: url(../assets/right.svg) no-repeat center;
	background-size: .16rem .26rem;
}
.mint-popup-bottom{
	width: 100%;
}
.sexPicker button{
	background: none;
	font-size: .3rem;
	color: #999999;
	outline: none;
	border: none 0;
}
.sexPicker .cancel{
	position: absolute;
	top: .18rem;
	left: .32rem;
}
.sexPicker .sure{
	position: absolute;
	right: .32rem;
	top: .18rem;
	color: #9013FE;
}

</style>