<template>
	<div class="header " :class="{header_white: !showFooter}" @click="hideMine" >
		<div class="content-wrapper">
			<ul class="header-content" v-show="showSearch">
				<li class="menu" @click="showMenuList" >
					<img src="../../assets/switch_menu.svg" alt="">
				</li>
				<li class="logo">
					<img src="../../assets/logo_white.svg" alt="" v-show="showFooter">
					<img src="../../assets/logo.svg" alt="" v-show="!showFooter">
				</li>
				<li class="search_btn" v-show="searchBtn">
					<span class="showSearchInput" @click="showSearchInput"></span>
				</li>
				<li class="language" @click.stop.prevent="showLang">
					<div class="switch_lang">
						<span class="lang">
							<img src="../../assets/zh.svg" alt="" v-show="chinese">
							<img src="../../assets/en.svg" alt="" v-show="!chinese">
						</span>
						<span class="lang_down" >
							<img src="../../assets/lang_down.svg" alt="" v-show="!isShowLang">
							<img src="../../assets/lang_up.svg" alt="" v-show="isShowLang">
						</span>
					</div>
					<ul class="lang_menu" v-show="isShowLang">
						<li data-lang="en" class="en" @click.stop.prevent="selectLang">English</li>
						<li data-lang="zh" class="zh" @click.stop.prevent="selectLang">中文</li>
					</ul>
				</li>
				<li class="log_tag" v-show="showLog">
					<!-- <user-bar v-show="isShowLogin" :isShowLogin="isShowLogin" v-on:showUserBar="showUser($event)" :isLog="isLog" v-on:isLog="changeLog($event)"></user-bar> -->
					<user-bar :isLog="isLog" v-on:isLog="changeLog($event)" 
					:isShowMine="isShowMine"
					v-on:isShowMine="changeShowMine($event)"
					></user-bar>
				</li>
			</ul>
			<div class="search" v-show="!showSearch">
				<span class="close_btn" @click="hideSearch"> {{ $t('project.Back')}} </span>
				<form class="search_form" onsubmit="return false">
					<input type="search"  :placeholder = "$t('project.Search_from')"
			          name="query"
			          autocomplete="off" 
			          v-model.trim.lazy="queryStr"
			          @keyup.enter="goSearch()"
			          @input="inputChange"
					>
					<span class="goSearch" v-show="queryStr" @click="goSearch">Search</span>
				</form>
			</div>
			<v-menu :isShowMenu="isShowMenu" v-show="isShowMenu" v-on:changeMenuState="menuState($event)"></v-menu>

		</div>
	</div>
</template>




<script>
import Menu from '../menu_list.vue'
import userBar from '../userbar/user_bar.vue'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default{
	props:["searchBtn","showSearch","isShowLang","showFooter","showLog"],
	components: {
		"v-menu": Menu,
		"user-bar": userBar
	},
	data() {
		return{
			chinese: true,
			en: false,
			isShowMenu: false,
			isShowLogin: false,
			isLog: false,
			queryStr: "",
			down: true,
			isShowMine: false
		}
	},
	computed: {
		...mapGetters(['currentUser']),
		...mapState({
			queryResults: function(state){
				console.log(state.queryResults.queryRes_freeApps);
			}
		})
	},
	methods: {
		selectLang(el) {
			var lang = el.target.dataset["lang"];
			if(lang == "zh"){
				this.chinese = true;
				localStorage.setItem("locale","zh");
			}else{
				this.chinese = false;
				this.en = true;
				localStorage.setItem("locale","en");
			}
			console.log(this);
			this.$i18n.locale = localStorage.getItem("locale");// modify lang
			this.$emit("isShowLang", false)
		},
		showLang() {
			//this.lang_menu_show = !this.lang_menu_show;
			let isShow = !this.isShowLang;
			this.$emit("isShowLang", isShow);
		},
		showMenuList() {
			this.isShowMenu = true;
		},
		menuState(ShowMenu) {
			this.isShowMenu = ShowMenu;
		},
		changeLog(isLog){
			this.isLog = isLog;
		},
		showUser(showUser) {
			this.isShowLogin = showUser;
		},
		goSearch() {
			var that = this;
			this.$router.push({
				name: "SearchResult",
				query:{
					keyword: that.queryStr
				}
			});
			this.queryStr="";
			//this.$router.go(0);
		},
		showSearchInput() {
			this.$emit("showSearch",false);
			//this.showSearch = false
		},
		onSuccess(res) {
			
		},
		inputChange(el) {
			this.queryStr = el.target.value;
		},
		hideSearch() {
			//this.showSearch = true
			this.$emit("showSearch",true);
		},
		changeShowMine(isShowMine){
			this.isShowMine = isShowMine;

		},
		hideMine() {
			this.isShowMine = false;
		}
	},
	created() {
		 if (localStorage.getItem('token')) {
	      this.$store.commit({
	        type: 'getLocalUser'
	      })
	    }
	},
	mounted() {
		this.$nextTick(function(){
			var locale = localStorage.getItem("locale");
			if(locale == undefined){  // locale is undefined
				this.chinese = true;
			}else{
				this.chinese = localStorage.getItem("locale") == "zh" ? true: false;
			}
		})
	},
	beforeUpdate(){
		var token = this.$store.state.user.token;
		if (token != undefined && token != null && token != "" && token != "undefined") { 
		   this.isLog = true
		 }else{
		 	this.isLog = false;
		 }
	}
}
</script>


<style scoped>
.header{
	width: 100%;
	height: 50px;
	line-height: 50px;
	font-size: 0.32rem;
	color: white;
	background: #413D47;
}
.header_white{
	background: #FFFFFF;
}
.content-wrapper{
	width: 100%;
	height: 100%;
}
.content-wrapper ul.header-content{
	width: 100%;
	height: 100%;
	display: flex;
}
.content-wrapper ul.header-content li{
	height: 100%;
	float: left;
}
img{
	vertical-align: middle;
}
.menu{
	flex: 1;

}
.menu img{
	width: 0.34rem;
	margin-left: 0.3rem;
}
.logo{
	flex: 6;
}
.logo img{
	width: 2.4rem;
	margin-left: .7rem;
}
.language{
	flex: 1.5;
	position: relative;
}
.language span{
	display: inline-block;
}
.avatar{
	background: red;
	flex: 1;
}
.search_btn{
	flex: 1;
}
.search_btn .showSearchInput{
	display: inline-block;
	width: 100%;
	height: 100%;
	background: url(../../assets/search_header.svg) no-repeat center;
	background-size: .38rem .4rem;
}
.content-wrapper ul.lang_menu{
	position: absolute;
	right: 0;
	z-index: 2;
	width: 1.58rem;
	height: 1.06rem;
	border: 1px solid #D8D8D8;
	border-radius: 4px;
	padding-left: .1rem;
	background: #FFFFFF;
}
.content-wrapper .language .lang_menu li{
	float: none;
	width: 100%;
	height: 50%;
	line-height: 0.5rem;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color: #4A4A4A;
	text-indent: 0.42rem;
}
.lang_menu .zh{
	background: url('../../assets/zh.svg') no-repeat left center;
	background-size: 0.42rem;
}
.lang_menu .en{
	background: url('../../assets/en.svg') no-repeat left center;
	background-size: 0.42rem;
}
.lang img{
	width: 0.42rem;
}
.lang_down img{
	width: 0.19rem;
}
.log_tag{
	margin-right: .3rem;
}
.search{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.search span.close_btn{
	flex: 2;
	height: 100%;
	text-indent: -999999px;
	background: url(../../assets/back.svg) no-repeat center center;
	background-size: .18rem .3rem;
}

.search .search_form{
	position: relative;
	flex: 8;
	height: 100%;
	padding-right: .52rem;
}
.search_form input{
	width: 100%;
	height: .7rem;
	line-height: .7rem;
	color: #FFFFFF;
	font-size: .26rem;
	padding-left: .92rem;
	border: 1px solid #BBBBBB;
	border-radius: .35rem;
	background: transparent url(../../assets/search_input.svg) no-repeat .35rem center;
	background-size: .4rem;
}
.search_form span.goSearch{
	width: 1rem;
    height: 0.68rem;
    line-height: .68rem;
    display: inline-block;
    position: absolute;
    right: .54rem;
    border-radius: 0 .35rem .35rem 0;
    top: 0.18rem;
    background: #9013FE;
    color: #FFFFFF;
    font-size: .2rem;
    text-align: center;
    line-height: .68rem;
}
</style>