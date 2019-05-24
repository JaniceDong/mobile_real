<template>
	<div class="search-bar">
		<div class="search" >
			<span class="close_btn" @click="hideSearch">{{ $t('project.Back') }}</span>
			<form class="search_form" onsubmit="return false">
				<input type="search"
							:placeholder=" $t('project.Search_from') "
		          name="query"
		          v-model.trim.lazy="queryStr"
		          @keyup.enter="goSearch()"
		          @input="inputChange"
				>
				<span class="goSearch" v-show="queryStr">{{ $t('project.Search') }}</span>
			</form>
		</div>
	</div>
</template>
<script>
export default { 
	props:{
	    showSearch:{ 
	      type: Boolean
	    }
	  },
	data(){
		return{
			queryStr: ""
		}
	},
	created() {
		console.log(this.showSearch);
	},
	methods: {
		goSearch() {

		},
		showSearchInput() {
			this.$emit("showSearchBar",)
		},
		inputChange(el) {
			this.queryStr = el.target.value;
		},
		hideSearch() {
			this.showSearch = true
		}
	}

}
</script>
<style scoped>
.search-bar{
	width: 100%;
	height: 100%;
}
.showSearchInput{
	display: inline-block;
	width: 100%;
	height: 100%;
	background: url(../../assets/search_header.svg) no-repeat center;
	background-size: .38rem .4rem;
}
</style>