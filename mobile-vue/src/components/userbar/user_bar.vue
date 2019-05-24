<template>
  <div class="user-bar">
    <div class="isLog">
      <template v-if="isLog">
        <div class="avatar" @click.stop.prevent="showMine">
         <img :src="user.avatar || defaultAvatar" alt="">
         <span :class="{hasMessage: user.new_message}"></span>
        </div>
      </template>
      <template v-else>
        <div class="log">
          <span @click="jumpToLog">{{ $t('login.Login') }}|</span>
          <span @click="jumpToSign">{{ $t('login.Signup') }}</span>
        </div>
      </template>
    </div>
    <div class="my-info" @click.stop.prevent= "hideMine" v-show="isShowMine">
      <div class="my-container">
        <div>
          <div class="my-avatar">
            <img :src="user.avatar || defaultAvatar" alt="">
          </div>
          <span> {{ user.name }}</span>
        </div>
        <ul class="infos">
          <li class="my-favorite"><router-link to='/center/my-favorite'>{{ $t('layout.My_favorite') }}</router-link></li>
          <li class="account-info"><router-link to='/account'>{{ $t('layout.Account_Information') }}</router-link></li>
          <li class="message"><router-link to='/message-list'>{{ $t('layout.Message')}}</router-link><span :class="{hasMessage: user.new_message}"></span></li>
          <li class="log-out"><a to='' @click.prevent='logout()'>{{ $t('layout.Log_Out')}}</a></li>
        </ul>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'


export default {
  props:["isLog","isShowMine"],
  name: 'userBar',
 
  data () {
    return {
      defaultAvatar: require("../../../static/imgs/default_avatar.svg")

    }
  },
  /*计算属性在页面刷新的时候加载了两次，使用message.length时message不存在，第二次message存在*/
  computed: {
    // Map store/user state
    ...mapGetters(['currentUser']),
    ...mapState({
      user: state => state.getUserInfo.userinfo
    })

  },
  created () {
    // Get local user filling store/user
    this.$nextTick(function(){
      this.updateData();
    })
    
  },
  mounted() {
    
  },
  
  methods: {
    getUserinfo() {
      var that = this;
      this.$store.dispatch({
        type: "getUserinfo",
        token: that.$store.state.user.token
      })
      .then( response => {
        if(response.body.data){
          that.$store.commit('changeUser', response.body.data);
        }
      })
      .catch( err => {
        this.$router.push({path:"/login"});
      })
    },
    updateData(){
      if (localStorage.getItem('token')) {
        this.$store.commit({
          type: 'getLocalUser'
        });
        var token = this.currentUser.token;
        if(token != "undefined" && token != null && token != "" && token != undefined){
          this.$emit("isLog",true) ;
          this.getUserinfo();
        }else{
          this.$emit("isLog",false) ;
        }
      }
    },
    jumpToLog() {
      this.$router.push({path:"/login"});
    },
    jumpToSign() {
      this.$router.push({path:"/register"});
    },
    showMine() {
       this.$emit("isShowMine",true);
      if(!this.user.name){
        this.getUserinfo();
      }
    },
    hideMine() {
      this.$emit("isShowMine", false);
    },
    logout(){
      this.$store.commit({
        type: "logout"
      });
      
      this.$router.push({path:"/login"});
      this.$router.go(0);
     
    }
  },
  mounted(){

  },
  updated(){
  }

}
</script>

<style scoped>
  .user-bar,.isLog{
    width: 100%;
    height: 100%;
  }
  .avatar{
    flex: 0 0 .4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
  }
  .avatar img{
    width: .4rem;
    height: .4rem;
    vertical-align: middle;
    border-radius: 50%;
  }
  .isLog{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .log span{
    display: inline-block;
    color: white;
    font-size: .2rem;
    vertical-align: top;
  }

  .log{
    flex: 0 0 1.26rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: .4rem !important;
    border: 1px solid #FFFFFF;
    border-radius: 1rem;
    padding: 0 .08rem;
  }
 .my-info{
  position: absolute;
  width: 100%;
  height: calc(100% - 1rem);
  right: 0;
  top: 1rem;
  z-index: 2;
 }
 .my-info .my-container{
  position: absolute;
  right: 0;
  top: 0;
  width: 5.96rem;
  height: 100%;
  opacity: 0.98;
  background: #413D47;
 }
 .my-avatar{
  width: 1.6rem;
  height: 1.6rem;
  margin: .64rem auto 0;
 }
 .my-avatar img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
 }
 .my-container span{
  font-family: PingFangSC-Regular;
  font-size: .4rem;
 }
 .my-container ul{
  width: 100%;
  height: auto;
  overflow: hidden;
 }
.my-container li{
  padding-left: 1.42rem;
  text-align: left;
  position: relative;
}
.my-container li span.hasMessage,
.avatar span.hasMessage
{
  position: absolute;
  left: .91rem;
  top: .31rem;
  width: .1rem;
  height: .1rem;
  border: 1px solid #FFFFFF;
  border-radius: 50%;
  background: red;
}
.avatar span.hasMessage{
  right: 0;
  left: auto;
}
.my-container li a{
  display: inline-block;
  width: 100%;
  color: #FFFFFF;
  font-family: PingFangSC-Regular;
  font-size: .32rem;
  letter-spacing: 1px;
}
.infos li.my-favorite{
  background: url(../../assets/my-collect.svg) no-repeat .59rem center;
  background-size: .42rem;
}
.infos li.message{
  background: url(../../assets/message.svg) no-repeat .59rem center;
  background-size: .38rem;
}
.infos li.account-info{
  background: url(../../assets/account-info.svg) no-repeat .59rem center;
  background-size: .44rem;
}
.infos li.log-out{
  background: url(../../assets/log-out.svg) no-repeat .59rem center;
  background-size: .44rem;
}
</style>
