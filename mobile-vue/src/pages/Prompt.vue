<template>
	<div id="Prompt">
		<div class="title">
			<p class="list">
				{{$t('project.INVITATIONS')}}
			</p>
			<p class="list1">
				You have received an invitation from an enterprise.<br/>
				Please check to see if you will accept the invitation.
			</p>
			<p class="list2">
				{{ $t('project.') }}
			</p>
		</div> 
		<div class="title">
			<p class="point">
				{{ $t('login.Company_name') }}：
			</p>
			<p class="point1">
				Apple China
			</p>
			
		</div> 
		<div class="title">
			<p class="point">
				{{ $t('app.Description') }}：
			</p>
			<p class="point2">
				Enterprise description area,Enterprise description area，balal，Enterprise description 
				area交互及Enterprise description areae description area，Enterprise description 
				area，balal，Enterprise description area交互及Enterprise description area
			</p>	
		</div> 	
		<div class="button">
			<label for="log">
				<input  type="submit" id="accept" :value="$t('app.Accept')"  class="">
			</label>
			<label for="log">
				<input  type="submit" id="refuse" :value="$t('app.Refuse')" class="">
			</label>
		</div>
		<div class="information">
			<label for="log">
				<input  type="submit" id="info" :value="$('app.info')" 
				class="">
			</label>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
#info{
	margin-top: .6rem;
	width: 70%;
	height: .48rem;
	opacity: 0.5;
	background: #000000;
	border-radius: 0.04rem;
	font-family: PingFangSC-Regular;
	font-size:0.2rem;
	color: #FFFFFF;
	text-align: center;
}
#accept{
	margin-top: .3rem;
    width:45%;
    line-height: 0.32rem;
    padding-left: .05rem;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    display: inline-block;
    height: 0.98rem;
    border-radius: .04rem;
    background: #9013FE;
    border: 1px solid #BBBBBB;
    color: #FFFFFF;
}
#refuse{
	margin-top: .3rem;
    width:45%;
    line-height: 0.32rem;
    padding-left: .05rem;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    display: inline-block;
    height: 0.98rem;
    border-radius: .04rem;
    color: #666666;
    background: #FFFFFF;
	border: 1px solid #BCBCBC;
}
#Prompt{
	width: 100%;
	height: 10.9rem;
}
div.title p.list{
	margin-top: .2rem;
	width: 95%;
	height: .4rem ;
	padding-left: .2rem;
	letter-spacing: 0;
	font-weight:bold;
	font-family: PingFangSC-Medium;
	font-size: .28rem;
	line-height: .56rem;
	color: #000000;
}
div.title p.list1{
	margin-top: .48rem;
	padding-right: 0.58rem;
	height: .66rem ;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: .24rem;
	line-height:.33rem;
	color: #000000;
	word-break:break-word;
}
div.title p.list2{
	margin-top: .2rem;
	width: 100%;
	height: .3rem ;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: 0.22rem;
	color: #ED4021;
	text-align: center;
}
div.title p.point{
	margin-top: .3rem;
	font-weight:bold;
	line-height: 37px;
	letter-spacing: 0;
	padding-left: .5rem;
	text-align: left;
	font-family: PingFangSC-Medium;
	font-size:0.28rem;
	color: #000000;
}
div.title p.point1{
	line-height: 37px;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: 0.26rem;
	padding-left: .5rem;
	color: #4A4A4A;
	text-align: justify;
}
div.title p.point2{
	width:95%;
	line-height: .6rem;
	letter-spacing: 0;
	font-family: PingFangSC-Regular;
	font-size: 0.26rem;
	padding-left: .5rem;
	color: #4A4A4A;
	word-break:normal;
	text-align: justify;
}
</style>