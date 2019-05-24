<template>
	<div class="item-container">
		<li v-for="item in items" 
	          :key="item.id"
	          v-longtap="function(e){return showPop(item) }">
			<router-link :to="'/free-app/subject/detail/' + item.fixed_url" append>
		        <div class="app-logo">
              <img v-if="item.logo" 
              :src="item.logo" alt="" :onerror="defaultImg" >  
            </div>   
		        <span class="title">{{item.name}}</span>
		        <span class="author">{{item.author_name}}</span>
		        <div class="pro_type">
		          <span  class="inline_block pageviews">{{ item.view_number }}</span>
		          <span  class="inline_block play">{{ item.play_number }}</span>
		          <span  class="inline_block collect">{{item.collect_number}}</span>
		        </div>
		    </router-link>
		    <div class="free_app_pop" :class="{show: item.isShowPop}" @click.stop="hidePop(item)">
	          <div class="pop_container">
	            <span class="collect" :class="{collected: isCollected}" @click.stop="changeCollect(item)">
              {{ $t(templateState[itemState]) }}
              </span>
	            <span @click="marker(item)" v-show="item.markers">{{ $t('project.Marker') }}</span>
	            <span @click="play(item)">{{ $t('center.Play') }}</span>
	          </div>
		    </div>
		</li>
    <div class="pop_marker" v-show="isShowMarkers" @click="hidePopMarker">
      <span class="close" @click="hidePopMarker"></span>
      <div class="markers">
        <mt-swipe ref="swipe" :prevent="false" :stopPropagation="true" :auto="0" @change="getSwipeIndex">
          <mt-swipe-item v-for="marker in markers" :key="marker.id">
              <img :src="marker" alt=""> 
            
          </mt-swipe-item>
        </mt-swipe>
        <span class="bar">{{ activeIndex }}/{{ markers.length }} </span>
        <p>{{$t('project.item')}} Marker</p>
      </div>
    </div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'


export default{
	name: "list-item",
	props:["items"],
	data(){
		return{
    		isCollected: false,
    		itemState:"Collect",
        templateState:{
          "Collect": "center.Collect",
         "Collected": "center.Collected"
        },
        url: this.GLOBAL.baseURL ,
        isShowMarkers: false,
        markers:[],
        activeIndex: 1,
        markLength:0,
        defaultImg: 'this.src="' + require("../../../static/imgs/default_app_logo.png") + '"'
		}
	},
	computed: {
	    ...mapGetters(['currentUser'])
	  },
	create() {
		if (localStorage.getItem('token')) {
        this.$store.commit({
          type: 'getLocalUser'
        })
      };
	},
	methods: {
    showPop(item) {  
      var that = this;
      var token = that.currentUser.token;
      if(token != undefined && token != "undefined" && token != ""){
          this.$http.get( this.url + "/v2/apps/collect-status",{
            headers:{
              token: that.currentUser.token
            },
            params:{   //query
              fixed_url: item.fixed_url
            },
            
          })
          .then(response => {
            if(response.data){
              var data = response.data;
              this.isCollected  = (data.message == "Un collect") ? false : true;
              this.itemState = this.isCollected?"Collected":"Collect";
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      
      
      //set other item isShowPop is false
      for(var i in that.items){
        that.$set(that.items[i],"isShowPop",false);
      }
      this.$set(item,"isShowPop",true);
      return false;
    },
    hidePop(item) {
      this.$set(item,"isShowPop",false);
    },
    changeCollect(item) {

      var that = this;
      var token = that.currentUser.token;
      if(token == undefined || token == "undefined" || token == ""){
          that.$router.push({path:"/login"});
          return;
      }
      this.isCollected = !this.isCollected;

      this.itemState = this.isCollected?"Collected":"Collect";
      item.status = this.isCollected ? 1 : 0;

      var params = new FormData();
      params.append("status", item.status);
      params.append("fixed_url",item.fixed_url);

      this.$http.post( this.url + "/v2/apps/collect",params,{
         headers:{
          token: that.currentUser.token
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
      
    },
    play(item) {
      var play_url = item.play_url;
      if(play_url){
        //window.location.href = play_url;
        window.open(play_url);
      }
    },
    marker(item) {
      this.isShowMarkers = true;
      this.$http.get(this.url + '/v2/apps/marker',{
        params:{
          fixed_url: item.fixed_url
        }
      })
      .then( response => {
        if(response.data.data){
          this.markers = response.data.data;
        }
      }).catch( err => {
        console.log( err );
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
    CheckImgExists(imgurl) {  
        var ImgObj = new Image(); //判断图片是否存在  
        ImgObj.src = imgurl;  
        //没有图片，则返回-1  
        if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
            return imgurl;  
        } else {  
            return this.defaultLogo;
        }  
      }

  }
}
</script>
<style scoped>
ul.hasCover{
	overflow-x: auto;
	white-space: nowrap;  
	text-align: center;
}
.hasCover li{
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
.hasCover .app-logo{
  width: 100%;
  height: 3.34rem;
}
.hasCover img{
	height: 100%;
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
  background: url(../../assets/views.svg) no-repeat left center;
  background-size: .24rem;
  background-position: 7px center;
}
.play{
  background: url(../../assets/play.svg) no-repeat left center;
  background-size: .24rem;
  background-position: 7px center;
}
.collect{
  background: url(../../assets/collect.svg) no-repeat left center;
  background-size: .24rem;
  background-position: 7px center;
}
.collected{
  background: url(../../assets/collected.svg) no-repeat left center;
  background-size: .24rem;
}
.pop_container .collect{
    text-indent: .38rem;
  background: #9013FE url(../../assets/collect.svg) no-repeat 8px center;
  background-size: .26rem;
}
.pop_container .collected{
  text-indent: .38rem;
  background: #9013FE url(../../assets/collected_pop.svg) no-repeat 8px center;
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
  background:  url(../../assets/close_menu.svg) no-repeat center;
  background-size: .252rem .252rem;
}
</style>