<template>
  <div id="app" @click.stop="changeLang" >
     <v-header 
       :searchBtn="searchBtn" 
       :showSearch="showSearch"
        v-on:showSearch="changeShowSearch($event)"
        :isShowLang="isShowLang" 
        v-on:isShowLang="showLangMenu($event)"
        :showFooter="showFooter"
        :showLog="showLog">
      </v-header>
     <router-view v-if="isRouterAlive" />
    <v-footer :showFooter="showFooter"></v-footer>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/header/header.vue'
import Footer from './components/footer/footer.vue'


export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data () {
    return {
      itemList:[],
      isSelected: true,
      isShowFooter: true,
      hideLang: false,
      lang_menu: false,
      isShowLang: false,
      isRouterAlive:true,
      searchBtn: false,
      showSearch: true,
      showFooter: false,
      showLog:false,
    }
  },
  watch: {
    $route(to, from) {
      let _r = to;
      if(_r.meta.HFVisible){
        this.showFooter = true
        this.showLog = true
      }else if(!_r.meta.HFVisible){
        this.showFooter = false;
        this.showLog = false
      }
      if(_r.meta.searchBtn){
        this.searchBtn = true;
       
      }else if(!_r.meta.searchBtn){
        this.searchBtn = false;
        this.showSearch = true;
      }
    }, 

  },
  computed:{
   
  },
  mounted() {
    this.$nextTick(function(){
       var currentPath = this.$route.name;
       var currentRouter = this.$route;
       if(currentPath == "freeApp" || currentPath == "freeApps" || currentPath == "SearchResult"){
        this.searchBtn = true
       }
       if(currentRouter.meta.HFVisible){
          this.showFooter = true
          this.showLog = true
       }else if(!currentRouter.meta.HFVisible){
        this.showFooter = false;
        this.showLog = false
       }
    })
  },
  components:{
    'v-header': Header,
    'v-footer': Footer
  },
  methods: {
    
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      });
    },
    isShow(showFooter){
      this.isShowFooter = showFooter;
    },
    showLangMenu(isShow) {
      this.isShowLang = isShow;
     // this.lang_menu = false;
    },
    changeLang() {
      this.isShowLang = false;
    },
    changeShowSearch(showSearch){
      this.showSearch = showSearch;
    }
  },
  beforeUpdate() {
    //this.isShowFooter = (this.$route.name == "login" | this.$route.name == "register") ? false : true;
  }
}
</script>

<style>
 @media screen and  (max-width: 768px){ 
  /* 小于等于678px */
   html{
    font-size: 13.3333333333333333333333333333vw;
  }
  #app{
    max-width: 8.28rem;
  }
}
@media screen and  (min-width: 769px){
  /* 大于等于992px */
  html{
    font-size: 100px;
  }
  #app{
    max-width: 768px;
  }
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.32rem;
  font-family: PingFangSC-Semibold;
  margin: 0 auto;
}
.tab{
  width: 100%;
}
.tab-item{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.6rem;
  margin-top: 1.06rem;
  margin-bottom: 0.45rem;
}
.tab-item a{
  flex: 1;
  display: block;
  font-size: 0.32rem;
  color: #4A4A4A;
}

.tab-item a.is-active{
  color: #9013FE;
  font-size: .4rem;
}

</style>
