<template v-show="Model">
	<div class="category min-height">
    <div class="center-container">
      <div class="app-tab " >
        <div class="app-tab-item free-app">
          <router-link to='/center/free-app'>{{ $t('layout.free_app') }}</router-link> 
        </div>
        <div class="app-tab-item my-favorite">
          <router-link to='/center/my-favorite'>{{ $t("layout.My_favorite") }}</router-link> 
        </div>  
      </div>
    </div>
		<div class="app-tab ">
      <div class="header">
        <h2>{{$t(template[title].name)}}</h2>
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
        :auto-fill="true" 
        :bottomPullText=" $t('center.Pull_refresh')"
        :bottomDropText="$t('center.Release_update')"
        :bottomLoadingText="$t('center.Loading')"
        ref="loadmore">
          <ul class="hasCover">
              <v-item :items="list"></v-item>
            
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
        <ul class="border_top-1px">
          <li v-for="(category,key,index) in categorys" v-show="categorys[key].length"
           @click="selectCategory(key)"
           :class="{active : active == key}" >
            {{  $t(template[key].name) }}
          </li>
        </ul>
      </div>
    </template>

    <template>
      <div class="sort_list" v-show="show_sort_list"  @click= "hideList">
        <ul class="border_top-1px">
          <li v-for="sort in sorts" 
            @click="sortAZ(sort)"
            :class="{selected : selected == sort}">
							{{ sort }}
          </li>
					<li>{{ $t('center.All') }}</li>
        </ul>
      </div>
    </template>
    


	</div>
</template>
<script>

import Item from '../components/item/item.vue'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
	
export default{
  inject: ['reload'],
  props: ['title'],	
  components:{
  	"v-item": Item
	},
	data() {
  	return {
			begin:true,
			headIcon:true,
  	  scrollTop: 0,
      time: 0,
      dParams: 20,
      scrollState: 0,
      isCollected: false,
  	  timeOutEvent: 0,
  	  isShowPop: false,
			itemState:"Collect",
      templateState:{
          "Collect": "center.Collect",
         "Collected": "center.Collected"
        },
      allLoaded: false,
      topStatus: "loading",
      topStatus: "drag",
      wrapperHeight: 0,
      courrentPage: 1,
      moreData:[],
      show_category_list: false,
      show_sort_list: false,
      active: "",
      url: this.GLOBAL.baseURL ,
      selected:"All",
      sort: false,
      categorys:this.$store.state.freeApps,
      category:'',
      sorts:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      list:[],
      template:{
        Education: {name: "center.Education",en:"education"},
        Industry: {name: "center.Industry",en:"industry"},
        Game: {name: "center.Game",en:"game"},
        Medical: {name: "center.Medical",en:"medical"},
        Business: {name: "center.Business",en:"business"},
        Culture: {name: "center.Culture",en:"culture"},
        Others: {name: "center.Others",en:"others"}
      },
      bottomPullText: "Pull up refresh",
      bottomDropText: "Release update",
      bottomLoadingText: "Loading..."
    }
	},
	computed:{
    // Getting Vuex State from store/modules/freeApps.js
      ...mapState({
        education: state => state.freeApps.Education,
        industry: state => state.freeApps.Industry,
        game: state => state.freeApps.Game,
        medical: state => state.freeApps.Medical,
        business: state => state.freeApps.Business,
        culture: state => state.freeApps.Culture,
        others: state => state.freeApps.Others,
        queryResults: state => state.queryResults.queryRes_freeApps
            
      }),
      ...mapGetters(['currentUser']),
      items: {
        get() {
          if(this.sort){
            return this.moreData;
          }else{
            if(this.moreData.length){
              return this.moreData;
            }else{
              for(var index in this.$store.state.freeApps){
                if(this.title == index){
                  return this.$store.state.freeApps[index];
                }else{
                  continue;
                }
              }
            }
          }

        },
        set(){
          this.items = this.moreData;
          return this.items;
       }
      },
      showTop: function(){
        let value = this.scrollTop>200?true:false;
        return value;
      } 
  },
  mounted() {
    //可上拉加载区域高度
    this.$nextTick(function(){
      this.wrapperHeight =this.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 62;   //62 is footer's height
    })
    

    //回到顶部
    document.querySelector(".main_body").addEventListener('scroll', this.getScrollTop);
   // document.querySelector(".search_btn").style.display = "block";
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.commit({
        type: 'getLocalUser'
      })
    };
    this.category = this.title;
    this.getMore();
    this.getFreeApps();
    this.active = this.title;

  },
  
  destroyed() {

  },
  watch: {
    "$route": "changeTitle"
  },
	methods: {
    getFreeApps: function () {
      this.$store.dispatch('getFreeApps');
    },
    loadBottom() {
      this.courrentPage += 1;
      this.loadMore(this.courrentPage);
    },
    getMore(){
      var that = this;
      this.$store.dispatch({
        "type":"getMore",
        "page": that.courrentPage,
        "category": that.category,
        "keyword":""
      }).then( response => {
        if(response.body.items){
          that.list = that.list.concat( response.body.items);
        }
      })
    },
    loadMore(page) {
      var that = this;
        this.$store.dispatch({
          "type":"getMore",
          "page": page,
          "category": that.category,
          "keyword":""
        }).then(response => {
          //console.log(response);
          //如果所有数据全部获取完毕
          if (page > response.body._meta.pageCount) {
            this.allLoaded = true; // 若数据已全部获取完毕
          }else{
            that.list = that.list.concat(response.body.items);
          }
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch(error => {
          this.courrentPage --;
          console.log(error);
        });
    },
    player() { 
		
    },
    mark() {
		
    },
    showMore() {
    	
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
    showTypeDialog() {
      this.show_sort_list = false;
      this.show_category_list = true;

    },
    selectCategory(category) {
      this.active = category;
      this.$router.push({path: "/center/apps/" + category});
      this.show_category_list = false;
      this.list = [];
      this.allLoaded = false;
      this.category = category;
      this.courrentPage = 1;
      this.getMore();

    },
    showSortDialog(){
      this.show_sort_list = true;
      this.show_category_list = false;
    },
    sortAZ(sort) {
      var that = this;
      that.allLoaded = false;
      this.selected = sort;
      this.show_sort_list = false;
      if(sort == "#"){
        sort = "hash";
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
    hideList() {
      this.show_sort_list = false;
      this.show_category_list = false;
    },
		Model:function (doc,win) {
			var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function () {
					var clientWidth = docEl.clientWidth;
					if (!clientWidth) return;
					if(clientWidth>800){
							docEl.style.fontSize = '800px';
					}else{
							docEl.style.fontSize = 100 * (clientWidth / 800) + 'px';
					}
			};
			if (!doc.addEventListener) return;
			win.addEventListener(resizeEvt, recalc, false);
			doc.addEventListener('DOMContentLoaded', recalc, false);
			},
      changeTitle() {
        this.category = this.$route.query.title;
        location.reload();
      }
		}
	}
</script>
<style scoped>
	
div.category{
	box-sizing: content-box;
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
.main_body {
  overflow: scroll;
}
ul.hasCover{
	overflow-x: auto;
	white-space: nowrap;  
	text-align: center;
  overflow-y: hidden;
}
.hasCover li{
	position: relative;
	display: inline-block;
	width: 3.34rem;
	margin: .2rem;
	text-align: left;
	border: 1px solid #D8D8D8;
  
}
.main_body ul li a{
  width: 100%;
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
  background-position: 7px center;
}
.play{
  background: url(../assets/play.svg) no-repeat left center;
  background-size: .24rem;
  background-position: 7px center;
}
.collect{
  background: url(../assets/collect.svg) no-repeat left center;
  background-size: .24rem;
  background-position: 7px center;
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

.center-container{
    width: 100%;
    height: auto;

  }
  .center-container .app-tab{
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
  .app-tab a{
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
</style>
