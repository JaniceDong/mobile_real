<template>
  <div class="log_sign min-height">
     <div class="tab">
       <div class="tab-item">
         <router-link to="/login" v-bind:class='{selected: isSelected}'>{{ $t('login.Log_in') }}</router-link>
         <router-link to="/register">{{ $t('login.Sign_up') }}</router-link>
       </div>
     </div>
    
   <router-view/>
  </div>
</template>

<script>
import Login from './Login.vue'
import Sign from './Signup.vue'


export default {
  name:"Log_Sign",
  data () {
    return {
      itemList:[],
      isSelected: true,
    }
  },
  mounted() {
   
  },
  created() {

  },
  components:{
  	"Login": Login,
  	"Sign": Sign

  }
}
</script>

<style scoped>
.log_sign{
  /* min-height: calc(100% - 112px); */
}
header{
	background: white;
}
.tab{
  width: 100%;
  overflow: hidden;
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
