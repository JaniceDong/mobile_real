<template>
	<div class="menu-list">
		<div class="menu-container">
			<div class="title">
				<span class="close-menu" @click="closeMenu"></span>
				<img src="../assets/logo_black.svg" alt="">
			</div>
			<div class="list">
				<ul class="list-item">
					<li v-for='(item,index) in listMenu' class="border_bottom-1px"  @click="navigateTo(item)" :class="{selected: selected == item}">
						{{ item }}
						<span></span>
					</li>
		       </ul> 
			</div>
		</div>
	</div>
</template>
<script>

export default{
	props: {
		isShowMenu: {
			type: Boolean
		}
	},
	data() {
		return{
			menuIndex:0,
			selected: "Home",
			listMenu:["Home","App Center"]
			
		}
	},
	methods: {
		navigateTo(item) {
			this.selected = item;
			
			this.$emit("changeMenuState",false);
			switch(item){
				case "Home":
					this.$router.push({path: '/index'});
					break;
				case "App Center":
					this.$router.push({path: '/center/free-app'});
					break;
				default:
					this.$router.push({path: '/index'});
			}
		},
		closeMenu() {
			//isShowMenu = false;
			this.$emit("changeMenuState",false);
		}
	}
}
</script>
<style scoped>
	.menu-list{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 10;
		background: white;
	}
	.menu-container{
		width: 100%;
		height: 100%;
	}
	.menu-container .title{
		width: 100%;
		height: 1rem;
		text-align: center;
	}
	.menu-list .title .close-menu{
		float: left;
		width: 0.624rem;
		height: 0.624rem;
		padding: 0.374rem;
		background: url(../assets/close_menu.svg) no-repeat center center;
		background-size: 0.25rem;
		background-position: 0.374rem;
	}
	.menu-list .title img{
		float: left;
		width: 1.6rem;
		height: 0.48rem;
		margin: 0.374rem 0 0  2.21rem;
		vertical-align: middle;
	}
	.menu-container .list{
		margin-top: 0.6rem;
	}
	.list-item li{
		height: 0.96rem;
		line-height: 0.96rem;
		text-align: left;
		padding: 0 .5rem;
		font-family: PingFangSC-Regular;
		font-size: .34rem;
		color: #000000;
		letter-spacing: 0;
		position: relative;
	}
	.list-item li.selected{
		color: #9013FE;;
	}
	.list-item li.selected span{
		position: absolute;
		display: inline-block;
		right: .5rem;
		top: .37rem;
		width: 0.32rem;
		height: 0.32rem;
		background: url(../assets/menu_selected.svg) no-repeat center center;
		background-size: 0.32rem;
	}
</style>