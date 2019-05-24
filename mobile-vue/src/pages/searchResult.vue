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
	    <div class="main_body" ref="wrapper" :style="{ height: (wrapperHeight) + 'px' }">
	        <mt-loadmore  :bottom-method.prevent.stop="loadBottom" 
	        :bottom-all-loaded.prevent.stop="allLoaded" 
	        :auto-fill="false"
	        :bottomPullText=" $t('center.Pull_refresh')"
	        :bottomDropText="$t('center.Release_update')"
	        :bottomLoadingText="$t('center.Loading')" 
	        ref="loadmore">
	          <h2>{{$t('project.Search_Keyword')}}:{{ keyword }} </h2>
	          <ul class="hasCover">
	              <v-item :items="queryResults" v-show="queryResults.length"></v-item>
	              <p v-show="!queryResults.length">{{ $t('center.Application') }}</p>
	            
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
			isCollected: false,
			allLoaded: false,
			wrapperHeight: 0,
			url: this.GLOBAL.baseURL ,
			moreData:[],
			keyword: "",
			courrentPage: 1,
			scrollTop: 0,
			bottomPullText: "Pull up refresh",
	        bottomDropText: "Release update",
	        bottomLoadingText: "Loading..."
		}
	},
	computed:{
		...mapState({
			queryResults: state => state.queryResults.queryRes_freeApps
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

	},
	methods: {
		getParams() {
			let params = this.$route.query;
			this.keyword = params.keyword;
			var that = this;
			this.$store.dispatch({
				type:"queryApps",
				queryStr: params.keyword
			}).then(res => {
				//that.onSuccess(res);
			}).catch(err => {
				console.log(err);
			})
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
		
      	loadBottom() {
	      this.courrentPage += 1;
	      this.loadMore(this.courrentPage);
	    },
	    loadMore(page) {
	      var that = this;
	      this.$http.get(this.url + "/v2/apps/search",
	      {
	        params:{
	          page:page,
	          keyword:that.keyword
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
	    }
	},
	mounted() {
		this.getParams();
		this.$nextTick(() =>{
			//可上拉加载区域高度
			// // 获取浏览器可视区域高度
	       this.wrapperHeight = this.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 62;
        	
		    //回到顶部
		    document.querySelector(".main_body").addEventListener('scroll', this.getScrollTop);
		})
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
    border-bottom: 0.06rem solid #9013FE; 
  }
  ..app-tab a{
    display: inline-block;
    line-height: 0.68rem;
    font-family: PingFangSC-Medium;
    font-size: .32rem;
    color: #000000;
    letter-spacing: 0;
    padding-bottom: 3px;
  }
  .app-tab a.is-active{
    color: #9013FE;
    padding-bottom: 0;
    border-bottom: 3px  solid #9013FE; 
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