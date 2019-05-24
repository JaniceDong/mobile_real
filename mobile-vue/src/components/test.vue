<template>
  <router-link class="user-bar" :to="{ name: currentLink}" tag="div">
    <div class="avatar">
      <template v-if="currentUser.name">
        <img src="../assets/avatar.png" alt="avatar">
      </template>
      <template v-else>
        <span @click="jumpToLog">登录 |</span>
        <span @click="jumpToSign">注册</span>
      </template>
    </div>
    <div class="holder">{{holder}}</div>
    <div class="icon icon-camera"></div>
    <div class="icon icon-pen"></div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'userBar',
  data () {
    return {
    }
  },
  computed: {
    currentLink: function () {
      return this.currentUser.name ? 'HomeView' : 'LoginView'
    },
    holder: function () {
      return this.currentUser.name ? this.currentUser.name : '请先登录'
    },
    // Map store/user state
    ...mapGetters(['currentUser'])
  },
  created () {
    // Get local user filling store/user
    if (localStorage.getItem('email')) {
      this.$store.commit({
        type: 'getLocalUser'
      })
    }
  }
}
</script>

<style scoped>

</style>
