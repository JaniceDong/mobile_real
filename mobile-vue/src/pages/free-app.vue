<template>
	<div class="free-app">
		<div class="free-app-container">
			<template>
				<!-- <scroller  :title=" $t('center.Education') " type="hasCover" :items="education" v-show="education.length"></scroller>
				<scroller  :title=" $t('center.Industry') " type="hasCover" :items="industry" v-show="industry.length"></scroller>
				<scroller  :title=" $t('center.Game') " type="hasCover" :items="game" v-show="game.length"></scroller>
				<scroller  :title=" $t('center.Medical') " type="hasCover" :items="medical" v-show="medical.length"></scroller>
				<scroller  :title=" $t('center.Business') " type="hasCover" :items="business" v-show="business.length"></scroller>
				<scroller  :title=" $t('center.Culture') " type="hasCover" :items="culture" v-show="culture.length"></scroller>
				<scroller  :title=" $t('center.Others') " type="hasCover" :items="others" v-show="others.length"></scroller> -->
				<scroller  :title="Education" type="hasCover" :items="education" v-show="education.length"></scroller>
				<scroller  :title="Industry" type="hasCover" :items="industry" v-show="industry.length"></scroller>
				<scroller  :title="Game" type="hasCover" :items="game" v-show="game.length"></scroller>
				<scroller  :title="Medical" type="hasCover" :items="medical" v-show="medical.length"></scroller>
				<scroller  :title="Business" type="hasCover" :items="business" v-show="business.length"></scroller>
				<scroller  :title="Culture" type="hasCover" :items="culture" v-show="culture.length"></scroller>
				<scroller  :title="Others" type="hasCover" :items="others" v-show="others.length"></scroller>

			</template>
		</div>
		
	</div>
</template>
<script>
import { mapState } from 'vuex'
import Scroller from '../components/scroller/Scroller.vue'
import Category from './category.vue'

export default{
	inject: ['reload'],
	components:{
		"Scroller": Scroller,
		"Category": Category
	},
	data() {
		return {
			msg: 'free-app',
			showMore: true,
			Education: {name: "center.Education",en:"Education"},
			Industry: {name: "center.Industry",en:"Industry"},
			Game: {name: "center.Game",en:"Game"},
			Medical: {name: "center.Medical",en:"Medical"},
			Business: {name: "center.Business",en:"Business"},
			Culture: {name: "center.Culture",en:"Culture"},
			Others: {name: "center.Others",en:"Others"},
		}
	},
	 computed: {
	    // Getting Vuex State from store/modules/freeApps.js
	    ...mapState({
	      education: state => state.freeApps.Education,
	      industry: state => state.freeApps.Industry,
	      game: state => state.freeApps.Game,
	      medical: state => state.freeApps.Medical,
	      business: state => state.freeApps.Business,
	      culture: state => state.freeApps.Culture,
	      others: state => state.freeApps.Others,
	    })
	  },
	methods: {
    // Dispatching getMovie
    getFreeApps: function () {
      this.$store.dispatch('getFreeApps')
    }
  },
  created () {
    // Getting movies data on created
    this.$nextTick(function(){
    	this.getFreeApps();
    });
    //this.getFreeApps()
  },
  mounted() {
  	//document.querySelector(".search_btn").style.display = "block";
  },
  destroyed() {
  	//document.querySelector(".search_btn").style.display = "none";
  }
}
</script>
<style scoped>
.app_category{
	box-sizing: content-box;	
}
</style>