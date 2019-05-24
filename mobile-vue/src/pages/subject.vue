<template>
	<div class="detail min-height">
		<div class="center-container">
	      <div class="app-tab">
	        <div class="app-tab-item free-app">
	          <router-link to='/center/free-app'>{{ $t('layout.free_app') }}</router-link> 
	        </div>
	        <div class="app-tab-item my-favorite">
	          <router-link to='/center/my-favorite'>{{ $t("layout.My_favorite") }}</router-link> 
	        </div>  
	      </div>
	    </div>
	    <div class="detail-container">
	    	<div class="main-info">
	    		<div class="detail-bar">
	    			<div class="category-detail-list">
	    				<img :src="item.logo" />
	    				<p class="pro-name"> {{ item.name }}</p>
	    				<p class="version"> version: {{ item.version }} </p>
	    				<div class="operate"><span class="view">{{item.view_number}}</span>
							<span class="play">{{item.play_number}}</span>
							<span class="collected">{{ num || item.collect_number}}</span></div>
	    			</div>
	    			<div class="author">
	    				<div class="avatar" v-show="item.author_logo"><img :src="item.author_logo"/></div>
              <div class="avatar" v-show="!item.author_logo"><img src="../../static/imgs/default_avatar.svg"  /></div>
	    				<div class="name">{{item.author_name}}</div>
	    			</div>
	    		</div>
	    		<div class="mian-operation">
            <span @click="marker(item)" v-show="item.markers">{{ $t('project.Marker') }}</span>
            <span @click="play(item)">{{ $t('center.Play') }}</span>
            <span class="favorite nolike" :class="{collected: isCollected}" @click.stop="changeCollect(item)">{{ $t(templateState[itemState]) }}</span>
	    		</div>
	    	</div>
	    	<dl>
	    		<dt><h3>{{ $t('assets.Pictures') }}</h3></dt>
	    		<dd>
	    			<div class="banner" v-show="item.pictures">
						<mt-swipe :prevent="true" :stopPropagation="true">
              <mt-swipe-item v-for="(picture, index) in item.pictures" :key="index">
                  <img :src="picture" alt="">
              </mt-swipe-item>

						</mt-swipe>
					</div>
	    		</dd>
	    	</dl>
	    	<dl>
	    		<dt><h3>{{ $t('app.Description') }}</h3></dt>
	    		<dd>
	    			<p>{{item.description}}</p>
	    		</dd>
	    	</dl>
	    	<dl>
	    		<dt><h3>{{ $t('project.Change_Log') }}</h3></dt>
	    		<dd>
	    			<p>{{item.change_log}}</p>
	    		</dd>
	    	</dl>
	    </div>
      <div class="pop_marker" v-show="isShowMarkers" @click="hidePopMarker">
          <span class="close" @click="hidePopMarker"></span>
          <div class="markers">
            <mt-swipe ref="swipe" :prevent="false" :stopPropagation="true" :auto="0" @change="getSwipeIndex">
              <mt-swipe-item v-for="marker in markers" :key="marker.id">
                  <img :src="marker" alt=""> 
                
              </mt-swipe-item>
              <!-- <mt-swipe-item>
                  <img src="../../assets/cat3.jpg" alt="">
              </mt-swipe-item>
              <mt-swipe-item>
                 <img src="../../assets/cat4.png" alt="">
              </mt-swipe-item> -->
            </mt-swipe>
            <span class="bar">{{ activeIndex }}/{{ markers.length }} </span>
            <p>{{$t('project.item')}} Marker</p>
          </div>
        </div>
      </div>
	</div>
</template>
<script>
import { mapState } from 'vuex'

export default{
  inject: ['reload'],
	data(){
		return{
			msg:"detail",
      url: this.GLOBAL.baseURL,
			item:{},
      isCollected: false,
      itemState:"Collect",
      templateState:{
          "Collect": "center.Collect",
         "Collected": "center.Collected"
        },
      isShowMarkers: false,
      markers:[],
      activeIndex: 1,
      collect_number:0
				
		}
	},
  computed:{
    ...mapState({
      num: state => state.operate.collect_number
    })
  },
  created(){

  },
  mounted(){
    this.getSubject();
    if(this.$store.state.user.token){
      this.getStatus();
    }
    
  },
  methods:{
    getSubject() {
      var fixed_url = this.$route.params.id;
      var that = this;
      this.$http.get(this.url + "/v2/apps/detail",{
        params:{
          fixed_url: fixed_url
        }
      }).then(response => {
        if(response.data.data){
          that.item = response.data.data;
          that.collect_number = response.data.data.collect_number;
        }
        

      }).catch(err => {
        console.log(err);
      })
    },
    getStatus() {
      var that = this;
      this.$store.dispatch({
        type: "getStatus",
        token: that.$store.state.user.token,
        fixed_url: that.$route.params.id
      }).then( response =>{
        if(response.body){
          var res = response.body;
          that.isCollected = (res.code == "0" && res.message == "Un collect") ? false : true;
          that.itemState = that.isCollected ? "Collected" : "Collect";
        }
      }).catch( err => {
        console.log(err);
      })
    },
    changeCollect(item) {
      var that = this;
      if(this.$store.state.user.token){
        this.isCollected = !this.isCollected;
        this.itemState = this.isCollected?"Collected":"Collect";
        item.status = this.isCollected ? 1 : 0;
        if(item.status){
          that.collect_number ++;
        }else{
          that.collect_number --;
        }

        this.$store.dispatch({
          type: 'changeCollect',
          status: item.status,
          fixed_url: item.fixed_url,
          token: that.$store.state.user.token
        }).then( response => {
          if(response.body.code == "0"){
             that.$store.commit({
                type: "changeCollectNumber",
                num: that.collect_number
             });
          }
        }).catch( err => {
          this.$router.push({path:"/login"});
          console.log( err );
        })
      }else{
        this.$router.push({path:'/login'});
      }
      
    },
    marker(item) {
      this.isShowMarkers = true;
      var that = this;
      this.$store.dispatch({
        type: "getMarker",
        fixed_url: item.fixed_url
      }).then( response => {
        if(response.body.data){
          that.markers = response.body.data;
        }
      }).catch( err => {
        console.log(err);
      })

    },
    getSwipeIndex(){
      if(this.$refs){
        this.activeIndex = this.$refs.swipe.index + 1
      }
    },
    hidePopMarker() {
      this.isShowMarkers = false;
    },
    play(item) {
      var play_url = item.play_url;
      if(play_url){
        //window.location.href = play_url;
        window.open(play_url);
      }
    }
  }
}
</script>
<style scoped>
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
  .detail{
    overflow: hidden;
  }
  .detail-container{
  	width: 6.86rem;
  	margin: 0 auto;
  }
  .main-info{
  	width: 100%;
  	height: 4.9rem;
  	margin: .24rem auto;
  	background-image: linear-gradient(-180deg, #FFFFFF 0%, #FAFAFA 100%);
	box-shadow: 0 10px 30px 0 rgba(0,0,0,0.08);
	border-radius: 12px;
	overflow: hidden;
  }
  .detail-bar{
  	width: 6.3rem;
  	height: 3.57rem;
  	margin: 0 auto;
  	position: relative;
  	border-bottom: 1px solid #EEEEEE;
  	text-align: center;
  }
  .category-detail-list{
  	overflow: hidden;
  }
  .category-detail-list img{
  	width: 1.8rem;
  	height: 1.8rem;
  	margin: 0.23rem 0;
  }
  .category-detail-list .pro-name{
  	min-width: 80%;
  	margin: 0 auto;
  	color: #000000;
  	font-size: .34rem;
  	line-height: 18px;
  	font-weight: bold;
  	overflow: hidden;
  	white-space: nowrap;
  	text-overflow: ellipsis;
  }
  .category-detail-list .version{
  	font-size: .22rem;
  	line-height: 18px;
	color: #9B9B9B;
  }
 .category-detail-list .operate{
 	font-size: .22rem;
	color: #4A4A4A;
	line-height: 20px;
 }
 .operate span{
 	display: inline-block;
 	width: 1.2rem;
 	overflow: hidden;
 	white-space: nowrap;
 	text-overflow: ellipsis;
 	margin-right: 6px;
 	padding: 0 0 0 .3rem;
 }
 .operate span:last-child{
 	margin-right: 0;
 }
 .operate span.view{
  	background: url(../assets/views.svg) no-repeat left center;
  	background-size: .3rem;
  }
  .operate span.play{
  	background: url(../assets/play.svg) no-repeat left center;
  	background-size: .24rem;
  }
  .operate span.collected{
  	background: url(../assets/collect.svg) no-repeat left center;
  	background-size: .24rem;
  }
  .detail-bar .author{
  	position: absolute;
  	right: 0;
  	top: .32rem;
  	height: 1rem;
  	overflow: hidden;
  }
  .author .avatar{
  	width: .3rem;
  	height: .3rem;
  	border-radius: 50%;
  	margin-right: .1rem;
  	float: left;
  }
  .author .name{
  	width: .8rem;
  	overflow: hidden;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  	font-size: .26rem;
	color: #9B9B9B;
  	float: left;
  }
  .author .avatar img{
	width: 100%;
	height: 100%;
  border-radius: 50%;
  }
  .mian-operation{
  	margin-top: .3rem;
  }
  .mian-operation span{
  	display: inline-block;
  	text-align: center;
  	font-family: PingFangSC-Regular;
  	width: 1.82rem;
  	line-height: .68rem;
  	border: none 0;
  	background: #9013FE;
  	font-size: .28rem;
	color: #FFFFFF;
	border-radius: 4px;
  }
  .mian-operation span.favorite{
    padding-left: .46rem;
    background: #9013FE url(./../assets/collect.svg) no-repeat .2rem center;
    background-size: .26rem;
  }
  .mian-operation span.collected{
  	padding-left: .46rem;
  	background: #9013FE url(./../assets/collected_pop.svg) no-repeat .2rem center;
  	background-size: .26rem;
  }
  
  dl dt{
  	width: 100%;
    text-align: left;
    font-size: .34rem;
    line-height: .48rem;
    border-left: .06rem solid #9013FE;
    padding-left: .1rem;
    margin: .34rem 0 .2rem 0;
  }
  dl dd{
  	margin:.24rem 0 .34rem 0;
  	font-size: .24rem;
	color: #000000;
  	text-align: left;
  }
.banner{                        
	width: 100%;
	height: 3.83rem;
	border-radius: .1rem;
}
.banner img{
	width: 100%;
	height: 100%;
	border-radius: .1rem;
}
.pop_marker{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.8);
  z-index: 10;
}
.pop_marker .markers{
  width: 6.86rem;
  margin: 1.56rem auto 0;
  height: 7.48rem;
}
.markers img{
  width: 100%;
  height: 6.86rem;
}
.markers p{
  opacity: 0.9;
  font-family: PingFangSC-Regular;
  font-size: .24rem;
  color: #FFFFFF;
  text-align: center;
  margin-top: 2.3rem;
}
.markers span.bar{
  font-family: PingFangSC-Regular;
  font-size: .24rem;
  color: #FFFFFF;
}
.pop_marker span.close{
  position: absolute;
  right: .394rem;
  top: 1.12rem;
  width: .252rem;
  height: .252rem;
  background:  url(../assets/close_menu.svg) no-repeat center;
  background-size: .252rem .252rem;
}
</style>