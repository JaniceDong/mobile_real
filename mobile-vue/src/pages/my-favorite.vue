<template>
	<div class="my-favorite">
		<div class="my-favorite-container">
			<div class="search">
				<div class="search-favorite" @click="hideDialog">
					<input type="text" 
								:placeholder="$t('center.Search_App')" 
								name="query"
								autocomplete="off" 
			          v-model.trim.lazy="queryStr"
			          @keyup.enter="goSearch()" 
			          @input="inputChange">
					<span class="goSearch" v-show="queryStr" @click="goSearch()">{{ $t('project.Search') }}</span>
				</div>
				<span class="isfilter" :class="{filter:isFilter}" @click="showDialog()"></span>
			</div>
			<div class="main_body" ref="wrapper" :style="{ height: (wrapperHeight) + 'px' }">
		        <mt-loadmore  :bottom-method.prevent.stop="loadBottom" 
		        :bottom-all-loaded.prevent.stop="allLoaded"
		        :auto-fill="false" 
		        :bottomPullText=" $t('center.Pull_refresh')"
		        :bottomDropText="$t('center.Release_update')"
		        :bottomLoadingText="$t('center.Loading')"
		        ref="loadmore">
		          <ul class="hasCover">
					<v-item :items="items"></v-item>
		          </ul>
		         <p class="title disappear" v-show="allLoaded " style="width: 100%;height: 30px;">
							<span>{{ $t('center.info') }}</span>
						</p>
			      <div class="no_collected" v-show="!items.length">{{$t('center.collected_info')}}</div>
		        </mt-loadmore>  
		    </div>

		    <div class="filter_dialog" v-show="isFilter" @click="hideDialog()">
		    	<ul class="border_top-1px">
		    		<li v-for="filter in filterBys"
		    		@click="filterBy(filter.en)"
		    		:class="{ active: active == filter.en}">
							{{ $t(filter.name) }}
		    		</li>
		    	</ul>
		    </div>

		    <div class="scrollTop" v-show="showTop" @click="toTop">
	           <img src="../assets/backtoTop.svg"/>
	        </div>

		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import Item from '../components/item/item.vue'

export default{
	inject: ['reload'],
	components:{
		"v-item": Item
	},
	data() {
		return {
			scrollTop: 0,
		    time: 0,
		    dParams: 20,
		    scrollState: 0,
		    isCollected: false,
		  	timeOutEvent: 0,
		  	isShowPop: false,
		  	itemState:"Favorite",
		    allLoaded: false,
		    topStatus: "loading",
		    topStatus: "drag",
		    wrapperHeight: 0,
		    courrentPage: 1,
		   	items: [],
		   	isFilter:false,
		   	active: "",
		   	filterBys:[
					{"name":'assets.info1', "en": "Recent Use↓"},
					{"name":'assets.info2', "en": "By Collection Date↓"},
					{"name":'assets.info3', "en":"By Name↑"},
					{"name":'assets.info4', "en": "By Frequency↓"}
					],
		   	queryStr: "",
		   	sort:"",
		   	url: this.GLOBAL.baseURL,
		   	bottomPullText: "Pull up refresh",
		    bottomDropText: "Release update",
		    bottomLoadingText: "Loading..."
		}
	},
	created(){
		if (localStorage.getItem('token')) {
	      this.$store.commit({
	        type: 'getLocalUser'
	      })
	    };
		this.getMyFacorite();

	},
	mounted() {

	    //可上拉加载区域高度
	    this.wrapperHeight = this.clientHeight - this.$refs.wrapper.getBoundingClientRect().top- 62;   //62 is footer's height

	    //回到顶部
	    document.querySelector(".main_body").addEventListener('scroll', this.getScrollTop);
	},
	computed: {
		 ...mapGetters(['currentUser']),
	    showTop: function(){
	       let value = this.scrollTop>200?true:false;
	       return value;
	    }
	},
	methods:{
		getMyFacorite(){
			this.getSearchResult("","");
		},
		loadBottom() {
		  this.courrentPage += 1;
	      this.loadMore(this.courrentPage);
	    },
	    getSearchResult(sort,keyword) {
	    	var that = this;
	    	that.allLoaded = false; //每次重新搜索时设置可上拉
	    	that.courrentPage = 1;
	    	this.$http.get( that.url + "/v2/apps/favorite",{
				headers:{
					token: that.currentUser.token
				},
				params:{
					sort:sort,
					keyword: keyword
				}
			})
	        .then(response => {
	          	this.items =  response.data.items;
	          	if(response.data._meta.pageCount == 0){
	          		that.allLoaded = false;
	          	}else if (that.courrentPage >= response.data._meta.pageCount) {
		            that.allLoaded = true; 
		          }
	        })
	        .catch(error => {
	          console.log(error);
	        });
	    },
	    loadMore(page) {
	    	var that = this;
	      	this.$http.get( that.url + "/v2/apps/favorite",{
	      	headers:{
				token: that.currentUser.token
			},
			params:{
				page: page,
				sort: that.sort,
				keyword: that.queryStr
			}
	      })
	        .then(response => {
	          
	          //如果所有数据全部获取完毕
	          //this.allLoaded = true;
	          
	          if (page > response.data._meta.pageCount) {
	            //this.allLoaded = true; // 若数据已全部获取完毕
							if(this.items == null){
								this.allLoaded = false;
							}else{
								this.allLoaded = true;
							}
	          }else{
	          	this.items = this.items.concat(response.data.items);
	          }
	          this.$refs.loadmore.onBottomLoaded();
	        })
	        .catch(error => {
	        	this.courrentPage --;
	          console.log(error);
	          alert("网络错误，不能访问");
	        });
	    },
	    toTop(e) {
	      if(!!this.scrollState){
	        return;
	      }
	      this.scrollState = 1;
	      e.preventDefault();
	      let distance = document.querySelector(".main_body").scrollTop;
	      let _this = this;
	      this.time = setInterval(function(){
	        _this.gotoTop(_this.scrollTop-_this.dParams)
	       }, 10);
	    },
	    gotoTop(distance){
	      this.dParams += 20;
	      distance = distance>0 ? distance : 0;
	      document.querySelector(".main_body").scrollTop = distance;
	      if(this.scrollTop < 10){
	          clearInterval(this.time);
	          this.dParams = 20;
	          this.scrollState = 0;
	        }
	      },
	    getScrollTop() {
	      this.scrollTop = document.querySelector(".main_body").scrollTop;
	      return false;
	    },
	    showDialog() {
	    	this.isFilter = !this.isFilter;
	    },
	    hideDialog() {
	    	this.isFilter = false;
	    },
	    filterBy(filter) {
	    	this.active = filter;
	    	this.queryStr = "";
	    	var that = this;
	    	switch(filter){
	    		case "Recent Use↓":
	    			that.sort = "-last_play_timestamp";
	    			break;
	    		case "By Frequency↓":
	    			that.sort = "-play_number";
	    			break;
	    		case "By Collection Date↓":
	    			that.sort = "-create_timestamp";
	    			break;
	    		case "By Name↑":
	    			that.sort = "name";
	    			break;
	    		default:
	    			that.sort = "-create_timestamp";
	    			break;
	    	}
			that.getSearchResult(that.sort,that.queryStr);
	    },
	    goSearch() {
	    	this.active = "";
	    	this.sort = "";
	    	this.getSearchResult(this.sort,this.queryStr);
		},
		showSearchInput() {
			this.showSearch = false
		},
		inputChange(el) {
			this.queryStr = el.target.value;
		},
		hideSearch() {
			this.showSearch = true
		}
	},
	beforeUpdate() {
		
	},
	destroyed() {
		/* document.querySelector(".search_btn").style.display = "block"; */
	}
}
</script>
<style scoped>
.my-favorite-container{
	position: relative;
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	-webkit-transform: translate3d(0,0,0);
	transform: translate3d(0,0,0);
}
.search{
	width: 100%;
	height: .7rem;
	line-height: .7rem;
	padding: 0 .32rem;
	margin: .2rem 0;
	position: relative;
}
.search-favorite{
	width: 4.94rem;
	margin: 0 auto;
	position: relative;
}
.search-favorite input{
	width: 100%;
	border: 1px solid #BBBBBB;
	border-radius: 1rem;
	font-size: .26rem;
	padding: 0 .5rem 0 .8rem;
	background: url(../assets/search_input.svg) no-repeat 15px center;
	background-size: .3rem;
}
.search-favorite span.goSearch{
	width: 1rem;
    height: 100%;
    display: inline-block;
    position: absolute;
    right: 0;
    border-radius: 0 .35rem .35rem 0;
    background: #9013FE;
    color: #FFFFFF;
    font-size: .2rem;
    text-align: center;
    line-height: .68rem;
}
.search span{
	position: absolute;
	width: .30rem;
	height: .34rem;
	right: .32rem;
	top: 50%;
	transform: translateY(-50%);
	
}
.search span.isfilter{
	background: url(../assets/filter.svg) no-repeat center center;
	background-size: 100%;
}
.search span.filter{
	background: url(../assets/showFilter.svg) no-repeat center center;
	background-size: 100%;
}
.main_body {
  overflow: scroll;
}
ul .hasCover{
	overflow-x: auto;
	white-space: nowrap;  
	text-align: center;
}
li{
	position: relative;
	display: inline-block;
	width: 3.34rem;
	margin: .16rem;
	text-align: left;
	border: 1px solid #D8D8D8;
	float: left;
}
a{
	text-decoration: none;
	outline: none;
	-webkit-tap-highlight-color: rgba(255,255,255,0);
}
.hasCover img{
	height: 3.34rem;
	width: 100%;
}
.title{
		display: block;
    padding-left: .12rem;
    letter-spacing: 0;
    line-height: .3rem;
    max-width: 100%;
    margin-top: .1rem;
    color: #111;
    line-height: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}
.author{
	padding-left: .12rem;
	font-family: PingFangSC-Regular;
	font-size: .26rem;
	margin-top: .1rem;
	color: #9B9B9B;
	line-height: .34rem;
	display: block;
    letter-spacing: 0;
    line-height: .3rem;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
   
}

span.inline_block{
	padding-left: .12rem;
	display: inline-block;
    width: 24%;
    font-size: .22rem;
    color: #9B9B9B;
    text-indent: .3rem;
    line-height: .4rem;
}
.pageviews{
  background: url(../assets/views.svg) no-repeat left center;
  background-size: .24rem;
  background-position: 7px 7px;
}
.play{
  background: url(../assets/play.svg) no-repeat left center;
  background-size: .24rem;
  background-position: 7px 6px;
}
.collect{
  background: url(../assets/collect.svg) no-repeat left center;
  background-size: .24rem;
  background-position: 7px 6px;
}
.collected{
  background: url(../assets/collected.svg) no-repeat left center;
  background-size: .24rem;
}
.pop_container .collect{
    text-indent: .38rem;
  background: #9013FE url(../assets/collect.svg) no-repeat 8px center;
  background-size: .26rem;
}
.pop_container .collected{
  text-indent: .38rem;
  background: #9013FE url(../assets/collected_pop.svg) no-repeat 8px center;
  background-size: .26rem; 
}
.pop_container{
    width: 100%;
    height: 100%;
    text-align: center;
    display: inline-block;
}
.pop_container span{
    display: block;
    width: 1.82rem;
    height: 0.76rem;
    line-height: .76rem;
    background-color: #9013FE;
    border-radius: 4px;
    margin: .56rem auto;
    font-size: .28rem;
    color: #FFFFFF;
    text-align: center;
}
.free_app_pop{
  display: none;
}
.free_app_pop.show{
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.4);
}
.scrollTop {
	width: 30px;
	height: 30px;
	position: fixed;
    right: 15px;
    bottom: 62px;
  	opacity: 0.5;
  	background: #FFFFFF;
}
.scrollTop img{
	width: 100%;
	height: 100%;
}
p.title span {
    display: block;    
	font-family: PingFangSC-Regular;
	font-size: 15px;
	color: #CCCCCC;
	text-align: center;
    position: relative; 
}
p.title span:before, p.title span:after {
    content: '';              
    position: absolute;      
    top: 52%;
    background: #DDDDDD;  
    width: 15%;
    height: 1px;
}
p.title span:before{
    left: 20%;  
}
p.title span:after {
    right: 20%;
}
.filter_dialog{
	position: absolute;
	left: 0;
	top: .9rem;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.65);
	z-index: 1;
}
.filter_dialog ul{
	overflow: hidden;
	background:#FFFFFF;
}
.filter_dialog ul li{
	width: 100%;
	border: none;
	font-size: .34rem;
	color: #000000;
	line-height: .48rem;
	padding: 0 .24rem;
}
.filter_dialog ul li.active{
	color: #9013FE;
}
.no_collected{
	font-size: .26rem;
	color: #9B9B9B;
	text-align: center;
	margin-top: 1.57rem;
}
</style>
