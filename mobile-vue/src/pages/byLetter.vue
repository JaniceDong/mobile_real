<template>
	<div class="search-result min-height">
		<div class="app-tab">
	        <div class="app-tab-item free-app">
		        <router-link to='/center/free-app'>{{ $t('layout.free_app') }}</router-link> 
		    </div>
		    <div class="app-tab-item my-favorite">
		          <router-link to='/center/my-favorite'>{{ $t("layout.My_favorite") }}</router-link> 
		    </div>  
	    </div>
	    <div>
	    	<div class="header">
	        	<h2 v-if="template[title]">{{ $t(template[title].name)}}</h2>
	            <div class="switch" v-show="headIcon"> 
					<div class="type" @click="showTypeDialog">
						<img src="../assets/resource_type.svg" alt="" v-show="!show_category_list">
						<img src="../assets/show_resource_type.svg" alt="" v-show="show_category_list">
					</div>
					<div class="sort" @click="showSortDialog">
						<img src="../assets/resource_sort.svg" alt="" v-show="!show_sort_list">
						<img src="../assets/show_resource_sort.svg" alt="" v-show="show_sort_list">
					</div>

	          	</div>
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
		              <v-item :items="queryByLetter" v-show="queryByLetter.length"></v-item>
		              <p v-show="!queryByLetter.length">{{ $t('center.Notification') }}</p>
		            
		          </ul>
		          <p class="title" v-show="allLoaded" style="width: 100%;height: 30px;">
		            <span>{{ $t('center.info') }}</span>
		          </p>
		        </mt-loadmore>  
	      	</div> 

	      	<div class="scrollTop" v-show="showTop" @click="toTop">
		         <img src="../assets/backtoTop.svg"/>
	     	 </div>
	    </div>
	    <template>
	      <div class="category_list"  v-show="show_category_list" @click= "hideList">
	        <ul class="">
	         <li v-for="(category,key,index) in categorys" v-show="category.length"
	           @click="selectCategory(key)"
	           :class="{active : active == key}" >
	            {{ $t(template[key].name) }}
          </li>
	        </ul>
	      </div>
	    </template>

	    <template>
	      <div class="sort_list" v-show="show_sort_list"  @click= "hideList">
	        <ul class="">
	          <li v-for="sort in sorts" 
	            @click="sortAZ(sort)"
	            :class="{selected : selected == sort}">
									{{ sort }}
				<li @click="sortAZ()" :class="{selected : selected == 'All'}">{{ $t('center.All') }}</li>
	          </li>
	        </ul>
	      </div>
	    </template>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import Item from '../components/item/item.vue'
export default{
	components:{
		"v-item": Item
	},
	data(){
		return {
			headIcon:true,
			isCollected: false,
			allLoaded: false,
			wrapperHeight: 0,
			url: this.GLOBAL.baseURL ,
			moreData:[],
			keyword: "",
	    	letter:"",
			courrentPage: 1,
			scrollTop: 0,
			title:"",
		    show_category_list: false,
		    show_sort_list: false,
		    active: "",
		    url: this.GLOBAL.baseURL ,
		    selected:"All",
		    categorys: this.$store.state.freeApps,
			sorts:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"],
			template:{
		        "Education": {name: "center.Education",en:"Education"},
				"Industry": {name: "center.Industry",en:"Industry"},
				"Game": {name: "center.Game",en:"Game"},
				"Medical": {name: "center.Medical",en:"Medical"},
				"Business": {name: "center.Business",en:"Business"},
				"Culture": {name: "center.Culture",en:"Culture"},
				"Others": {name: "center.Others",en:"Others"}
      		},
      		bottomPullText: "Pull up refresh",
		    bottomDropText: "Release update",
		    bottomLoadingText: "Loading..."

		}
	},
	computed:{
		...mapState({
			queryByLetter: state => state.queryResults.queryRes_ByLetter
			
		}),
		showTop: function(){
	        let value = this.scrollTop>200?true:false;
	        return value;
      	},
		queryResults:{
			 get() {
	          if(this.moreData.length){
	            return this.moreData;
	          }else{
	            return this.$store.state.queryResults.queryRes_freeApps
	          }
	        },
	        set(){
	          this.queryResults = this.moreData;
	          return this.queryResults;
	       }
		}
	},
	created() {
		this.$nextTick(function(){
	    	this.getFreeApps();
	    });
		
	},
	methods: {
		getParams() {
			let params = this.$route.query;
			this.keyword = params.keyword;
			this.active = params.category;
			this.title = params.category;
			this.selected = params.keyword;
			var that = this;
			this.$store.dispatch({
				type:"searchByLetter",
				keyword: that.keyword,
				page: that.courrentPage,
				category: that.title

			}).then(res => {
				that.onSuccess(res);
			}).catch(err => {
				console.log(err);
			})
		},
		getFreeApps: function () {
	      this.$store.dispatch('getFreeApps')
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
	    hideList() {
	      this.show_sort_list = false;
	      this.show_category_list = false;
	    },
		showTypeDialog() {
	      this.show_sort_list = false;
	      this.show_category_list = true;

	    },
	    selectCategory(category) {
	      this.active = category;
	      this.$router.push({path: "/center/apps/" + category});
	      this.show_category_list = false;

	    },
	    showSortDialog(){
	      this.show_sort_list = true;
	      this.show_category_list = false;
	    },
      	loadBottom() {
	      this.courrentPage += 1;
	      this.loadMore(this.courrentPage);
	    },
	    loadMore(page) {
	      var that = this;
	      this.$http.get(this.url + "/v2/apps/search-by-letter",
	      {
	        params:{
	          page:page,
	          keyword:that.keyword,
	          category: that.title
	        }
	      })
	        .then(response => {
	        	
	          //如果所有数据全部获取完毕
	          if (this.courrentPage > response.data._meta.pageCount) {
	            this.allLoaded = true; // 若数据已全部获取完毕
	          }else{
	          	this.moreData = that.queryResults.concat(response.data.items);
	          }
	          this.$refs.loadmore.onBottomLoaded();
	        })
	        .catch(error => {
	          this.courrentPage --;
	          console.log(error);
	        });
	        return false;
	    },

	    sortAZ(sort){
	    	var that = this;
	    	that.allLoaded = false;
		    this.selected = sort;
		    if(this.sort == undefined || this.sort == ''){
	    		this.sort = 'All'
	    	}
		    this.show_sort_list = false;
		      if(sort == "#"){
		        sort = "hash";
		      }else if(sort == undefined){
		      	sort = "";
		      }
		      this.$router.push({
		        name: "ByLetter",
		        query:{
		          keyword: sort,
		          category: that.title,
		          page: 1
		        }
		      });
	    },
	    onSuccess(res){
	    	if(res.body.items){
	    		var items = res.body.items;
	    		this.moreData = this.queryResults.concat(items);
	    	}
	    }
	},
	mounted() {
		this.getParams();
		//可上拉加载区域高度
	    this.wrapperHeight = this.clientHeight - this.$refs.wrapper.getBoundingClientRect().top- 62; // 62 is footer's height

	    //回到顶部
	    document.querySelector(".main_body").addEventListener('scroll', this.getScrollTop);
	    document.querySelector(".search_btn").style.display = "block";
	},
	watch: {
      '$route': 'getParams'
    }

}
</script>
<style scoped>
.search-result{
	/* min-height: calc(100% - 112px); */
}
.header{
    height: 1rem;
    line-height: 1rem;
    padding: 0 .32rem;
    text-align: left;
}
.header h2{
  float: left;
  padding-left: .1rem;
  margin-top: .35rem;
  border-left: .06rem solid #9013FE;
  font-family: PingFangSC-Medium;
  font-size: .34rem;
  line-height: .34rem;
  text-align: left;
  color: #000000;
}
.header .switch{
  float: right;
  width: auto;
  height: .34rem;
  margin-top: .35rem;
  line-height: .34rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.switch div{
  margin-left: -webkit-calc(0.2rem);
  flex: 1;
  height: 100%;
}
.switch div img{
  width: 100%;
  height: 100%;
	max-width: 100%;
	max-height: 100%; 
	position: relative;
}
.switch span.type{
  background: url();
}
.switch span.sort{
  background: url();
}
.category_list,.sort_list{
  position: absolute;
  left: 0;
  top: 2.78rem;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.65);
  z-index: 1;
}

.category_list ul,.sort_list ul{
  overflow: hidden;
  background: #FFFFFF;
  padding: .34rem .24rem;
}
.category_list ul li{
  width: 100%;
  border: none;
  font-size: .34rem;
  color: #000000;
  margin: .2rem 0;
  line-height: .48rem;
  text-align: left;

}
.category_list ul li.active,
.sort_list ul li.selected{
  color: #9013FE;
}
.sort_list ul li{
  width: .97rem;
  height: .54rem;
  line-height: .54rem;
  float: left;
  margin: 0 .23rem .2rem 0;
  border: 1px solid #D8D8D8;
  border-radius: 4px;
  font-size: .28rem;
  color: #333333;
  text-align: center;
}

.sort_list ul li:nth-child(6n){
  margin-right: 0;
}

h2{
    padding-left: .1rem;
    border-left: .06rem solid #9013FE;
    font-family: PingFangSC-Medium;
    font-size: .34rem;
    line-height: .34rem;
    text-align: left;
    color: #000000;
    margin: .2rem auto .1rem .16rem;
}
.main_body {
   overflow: scroll;
  -webkit-overflow-scrolling: touch;
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
.app-tab{
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
  .app-tab-item.free-app a{
    color: #9013FE;
    padding-bottom: 3px;
    border-bottom: 0.06rem solid #9013FE; 
  }
  .app-tab a{
    display: inline-block;
    line-height: 0.68rem;
    font-family: PingFangSC-Medium;
    font-size: .32rem;
    color: #000000;
    letter-spacing: 0;
  }
  .app-tab a.is-active{
    color: #9013FE;
    padding-bottom: 0;
    border-bottom: 3px solid #9013FE; 
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
</style>