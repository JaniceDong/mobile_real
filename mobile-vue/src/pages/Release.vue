<template>
	<div id="list">
		<div class="list-page min-height">
			<dl>
				<dt>
					<span></span>
						{{ $t('page.Release_information') }}
				</dt>
				<div class="main_body" ref="wrapper" :style="{ height: (wrapperHeight) + 'px' }">
			        <mt-loadmore  :bottom-method.prevent.stop="loadBottom"
			         :bottom-all-loaded.prevent.stop="allLoaded"
			         :auto-fill="false"
			         :bottomPullText=" $t('center.Pull_refresh')"
			         :bottomDropText="$t('center.Release_update')"
			         :bottomLoadingText="$t('center.Loading')"
			         ref="loadmore">
			          	<div class="logo_content" v-for="release in releaseinfos" :key="release.id" ref="logo_content">
							<div class="content">
									<div class="logo_con">
										<div class="logo1 logo">
											<img src="../../static/imgs/realmax_logo.svg" alt="">
										</div>
										<p class="version">{{$t('page.Version')}}:{{ release.version}}</p>
										<p class="datetime"> {{ release.create_timestamp }}</p>	
									</div>
							</div>
							<dd class="display">
								<div class="log_content_display LOG_CONTENT" style="display: block" ref="log_content_display" v-html="release.log">
								</div>
								<span class="gradient"  v-show="release.isShowMore"></span>
								<a class="fold_btn" @click="showMore( release )" v-show="release.isShowMore">{{ $t('center.More') }}</a>
							</dd>
						</div>
			          	<p class="title"  v-show="allLoaded" style="width: 100%;height: 30px;">
				       	 <span>{{ $t('center.info') }}</span>
				      	</p>
				      	<div class="scrollTop" v-show="showTop" @click="toTop">
				           <img src="../assets/backtoTop.svg"/>
				        </div>
			        </mt-loadmore>  
			    </div>

				
			</dl>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default{
	data() {
		return{
			scrollTop: 0,
			releaseinfos:"",
			allLoaded: false,
			wrapperHeight: 0,
		    courrentPage: 1,
		    perPage: 0,
		    bottomPullText: "Pull up refresh",
	      	bottomDropText: "Release update",
	      	bottomLoadingText: "Loading..."
		}
	},
	computed: {
		showTop: function(){
	       let value = this.scrollTop>200?true:false;
	       return value;
	    }

	},
	methods: {
		getReleaseInformation(){
			var that = this;
			this.$store.dispatch({
				type: "getReleaseInformation",
				page:""
			}).then( response =>{
				if(response.body.items){
					that.releaseinfos = response.body.items;
					that.updateReleaseInfo(that.releaseinfos);
				}
			}).catch(err => {
				console.log(err);
			})
		},
		updateReleaseInfo: function(releaseinfos){
	    	var that = this;
	    	
			for(var i in releaseinfos){
				this.$set(releaseinfos[i],"isShowMore",false);
			}
			
			setTimeout(function() {
				var displays = that.$refs.log_content_display;
				var k = (that.courrentPage - 1) * (that.perPage);
				var j = 0;
				
				for(k ; k < displays.length; k++){
					if(displays[k].clientHeight > 200 && (releaseinfos[j].isShowMore == false)){  //对新增的列表进行设置
						that.$set(releaseinfos[j],"isShowMore", true);
					}
					j++;
				}
			},0)
	    },
	    //显示更多
		showMore( release ) {
			var event = window.event;
			var target = event.target || event.srcElement;
			var parentNode = target.parentNode;
			parentNode.style.height = "auto";
			this.$set(release,"isShowMore", false)

		},
		loadBottom() {
		  this.courrentPage += 1;
	      this.loadMore(this.courrentPage);
	    },
	    loadMore(page) {
	    	var that = this;
	      	this.$store.dispatch({
				type: "getReleaseInformation",
				page: page,
			})
	        .then(response => {
	          
	          //如果所有数据全部获取完毕
	          //this.allLoaded = true;
	          
	          if (page > response.body._meta.pageCount) {
	            this.allLoaded = true; // 若数据已全部获取完毕
	          }else{
	          	this.releaseinfos = this.releaseinfos.concat(response.body.items);
	          	this.perPage = response.body._meta.perPage;
	          	this.updateReleaseInfo(response.body.items);
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
	    }
	},
	beforeCreate() {

	},
	created() {
		
	},
	beforeMount() {
		this.getReleaseInformation();
	},
	mounted() {
		
		this.wrapperHeight = this.clientHeight - this.$refs.wrapper.getBoundingClientRect().top- 62;   //62 is footer's height
		document.querySelector(".main_body").addEventListener('scroll', this.getScrollTop);

	}
}
</script>

<style scoped>
span.gradient{
	position: absolute;
	bottom: .1rem;
	right: .91rem;
	width: .94rem;
	height: 24px;
	background-image: linear-gradient(60deg, rgba(255,255,255,0.00) 1%, #FFFFFF 76%);
}
a.fold_btn{
    position: absolute;
	right: .32rem;
    bottom: .1rem;
    background: #FFFFFF;
	font-size: .24rem;
    color: #9013FE;
    line-height: .24rem;
    height: 24px;
    font-family: PingFangSC-Regular;
}
div.logo_content{
	position: relative;
	overflow: hidden;
	padding-bottom: .34rem;
	padding-top: .34rem;
	border-bottom: 1px solid #CDCDCD;
	}
#list{
	text-align: left ;
}
.main_body {
  overflow: scroll;
}
div#list{
	width: 100%;
}
dl dt {
	text-align: left;
	padding-top:20px ;
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    letter-spacing: 0.08px;
    border-bottom: 1px solid #CDCDCD;
    line-height: 26px;
    padding-bottom: 12px;
}
dl dt span {
	font-family: Microsoft YaHei;
	margin: 0 0 .24rem .32rem;
	font-size: 0.3rem;
    float: left;
    display: block;
    width: 4px;
    height: 26px;
    background-color: #9013FE;
    margin-right: 10px;
}

 dl  div.logo1 {
	margin: 0 0 .24rem .32rem;
	width: .8rem;
	height: .8rem;
	background: #FFFFFF;
	border-radius: 50%;
    
    float: left;
}
dl div.logo img{
	width: 100%;
	height: 100%;
	border-radius:50%;
}
dd div.log_content_display{
	padding-left: .32rem;
	word-break: break-all; /* 只对英文起作用，以字母作为换行依据 */
    word-wrap: break-word; /* 只对英文起作用，以单词作为换行依据 */
}
 
div.logo_con{
	overflow: hidden;
}
dl  div p.version {
	width: 300px;
	margin-left: 1.36rem;
	font-size: .3rem;
	letter-spacing: 0;
	line-height: 26px;
	color: #000000;
	font-family: PingFangSC-Medium;
}
dl div p.datetime{
	width: 300px;
	margin-left: 1.36rem;
	font-size: .26rem;
	color: #9B9B9B;
	letter-spacing: 0;
	line-height: 24px;
	font-family: PingFangSC-Regular;
}
.LOG_CONTENT  p{
	width: 100%;
	display: list-item;
	font-family: PingFangSC-Regular;
	font-size: .26rem;
	color: #000000;
	letter-spacing: 0;
	line-height: .3rem;
	margin-bottom: .14rem;
}
div#list dd.display{
	width: 100%;
	height: 120px;
    overflow: hidden;
    padding: 0 .42rem .34rem .32rem;
    color: #000000;
    letter-spacing: 0.08px;
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
    margin-top: .2rem;
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