<template>	
	<div>
		<div class="title">
			<span class="txt">{{ $t('login.Account_Security') }}</span>
		</div>
		<div class="retrieve_sign">
			<div class="tab">
				<div class="tab-item">
					<a href="#" class="router-link-exact-active is-active selected">{{ $t('project.Current') }}&nbsp;{{ $t('project.Operation') }}&nbsp;{{ $t('project._Failure') }}</a>
				</div>
			</div>
			<div class="retrieve">
				<div class="retrieve_con">
					<form method="post">
						<ul class="item-list">
							<div class="icon">
								<img src="../assets/failed.svg" />
							</div>
							<li class="f1" @click = "focusLi">
								<router-link  to="Reset">
									<label for="log" >
										<input type="submit" id="confirm" :value="$t('project.Try_again')"
											:disabled="isDisabled"
	          					 			:class="{disabled: isDisabled,focused: isFocus}">
									</label>
								</router-link>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	      isDisabled: false,
	      isFocus: false
	    }
	  },
	  methods: {
	  	focusLi(el) {
			//vue中不应该在代码中操作dom，除非不得不操作，待改善
			var node = el.target.parentNode;
			var node_parent = node.parentNode;
			if(node.nodeName == "LABEL"){
				node_parent = node.parentNode.parentNode;
			}
			if(node_parent.nodeName == "UL"){
				var lis = node_parent.querySelectorAll("li");
				for(var i = 0; i < lis.length; i++){
					lis[i].classList.remove("focus");
				}
			}
			if(node.nodeName == "LI"){
				node.classList.add("focus");
			}
		},
	  	beforeSubmit() {
			this.isDisabled = true;
		}
	  }
	  
}
</script>
<style scoped>
div.icon{
	margin-bottom:1.07rem;
}
.tab-item a.is-active{
	color: #000000;
	font-size:0.35rem;
}
.tab-item{
	display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: 0 1.6rem;
    margin-top: 1.06rem;
    margin-bottom: 0.45rem;
	}
div.tab-item a{
	font-size: .3rem;
	line-height:0.84rem;
	font-family: PingFangSC-Semibold;
	color: #000000;
	letter-spacing: -1px;
	text-align: center;
}
div.dsc{
	margin: auto;
	line-height: 0.33rem;
	width: 6.12rem;
	height: 0.99rem;
}
div.text{
	width: 5rem;
	height: 1.5rem;
	margin: auto;
	line-height: 0.33rem;
}
div.text p.f1{
	display: inline;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color: #000000;
	letter-spacing: 0;
	text-align: center;
}
div.bottom{
	position:relative; 
	width:100%; 
	height:5.7rem; 
	text-align: center;
}
div.bottom span{
	text-align:center;
	line-height: 8rem;
}
div.bottom span p.f1{
	display: inline;
	font-family: PingFangSC-Light;
	font-size: 0.26rem;
	color: #000000;
	letter-spacing: 0.15px;
	text-align: center;
}
div.bottom span p#login{
	display: inline;
	font-family: PingFangSC-Light;
	font-size: 0.28rem;
	color: #8F00FF;
	letter-spacing: 0.16px;
	text-align: center;
}
.border_bottom-1px.focus {
    border-color: #E3E3E3;
    border-width: 1px;
    z-index: 1;
}
#confirm.disabled {
    background: #9013FE;
}
#confirm{
    display: inline-block;
    width: 80%;
    height: 0.98rem;
    padding: 0;
    border-radius: .54rem;
    background: #9013FE;
    border: 1px solid #BBBBBB;
    color:  #FFFFFF;
}
div.title{
	position: relative;
	width: 100%;
	height: 1.14rem;
	background: #9013FE;
}
span.txt{
	width: 100%;
	height: 1rem;
    font-family: PingFangSC-Regular;
    color: #FFFFFF;
    text-align: center;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
}
.item-list div span.error{
    position: absolute;
    line-height: 0.7rem;
    left: 0.3rem;
    top: 0;
    background-size: 0.22rem;
    text-indent: 0.3rem;
    font-family: PingFangSC-Light;
    font-size: 0.24rem;
    color: #FF1A1A;
}
.item-list {
    width: 100%;
    height: auto;
    overflow: hidden;
}
.item-list li.f1{
	position: relative;
    width: 100%;
    height: 2.65rem;
    line-height: 1.26rem;
}
.item-list li input {    
	margin-top: 30px;
    display: block;
    width: 75%;
    height: 100%;
    line-height: 0.32rem;
    padding: 0 0 0.25rem 0.56rem;
    font-family: PingFangSC-Regular;
    color: #000;
    font-size: 0.32rem;
    outline: none;
    border: none;
}
</style>
