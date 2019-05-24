<template>
  <div class="scroller">
    <div class="header">
      <h2>{{$t(title.name)}}</h2>
      <router-link :to=" 'apps/' + title.en">{{ $t('center.More') }}</router-link>
    </div>
    <div class="content">
      <slot name="promItem"></slot>
      <ul class="hasCover">

           <v-item :items="items"></v-item>
        
      </ul>
    </div>
  </div>
</template>

<script>
import Item from '../item/item.vue'

export default {
  name: 'scroller',
  props: ['title', 'type', 'items'],

  components:{
    "v-item": Item
  },
  data () {
    return {
      isCollected: false,
      timeOutEvent: 0,
      isShowPop: false,
      itemState:"Collect",
      templateState:{
          "Collect": "center.Collect",
         "Collected": "center.Collected"
        }
    }
  },
  created() {
    
  },
  methods:{
    
  }
}
</script>

<style scoped>
.header{
    height: 1rem;
    line-height: 1rem;
    padding: 0 .32rem;
    text-align: left;
}
.header h2{
  display: inline-block;
  padding-left: .1rem;
  border-left: .06rem solid #9013FE;
  font-family: PingFangSC-Medium;
  font-size: .34rem;
  line-height: .34rem;
  text-align: left;
  color: #000000;
}
.header a{
  float: right;
  font-size: .24rem;
  color: #9013FE;
}
.content{
  box-sizing: content-box;
}
.content .hasCover{
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;
  overflow-y: hidden;
}
.content ul{
  padding: .1rem 0;
}
.hasCover li {
  position: relative;
  display: inline-block;
  width: 3.34rem;
  margin-left: .16rem;
  text-align: left;
  border: 1px solid #D8D8D8;
}

.hasCover img{
  height: 3.34rem;
  width: 100%;
}
.hasCover .author,.hasCover .title{
  display: block;
  padding-left: .12rem;
  letter-spacing: 0;
  line-height: .3rem;
  max-width: 100%;
  margin-top: .1rem;
  color: #111;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.hasCover .author{
  font-size: .26rem;
  line-height: .34rem;
  color: #9B9B9B;
}
.hasCover .title{
  font-size: .3rem;
 color: #000000;
}
.pro_type{
  width: 100%;
  line-height: .4rem;
  padding-left: .12rem;
}
.inline_block{
  display: inline-block;
  width: 24%;
  font-size: .22rem;
  color: #9B9B9B;
  text-indent: .3rem;
}
.pageviews{
  background: url(../../assets/views.svg) no-repeat left center;
  background-size: .24rem;
}
.play{
  background: url(../../assets/play.svg) no-repeat left center;
  background-size: .24rem;
}
.collect{
  background: url(../../assets/collect.svg) no-repeat left center;
  background-size: .24rem;
}
.collected{
  background: url(../../assets/collected.svg) no-repeat left center;
  background-size: .24rem;
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
.pop_container{
  width: 100%;
  height: 100%;
  text-align: center;
  display: inline-block;
  
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
}
</style>
