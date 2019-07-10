<template>
<div id="root-div">
  <div id="topAnchor"></div>
   <div id="explore">
      <loadingAnimate v-if="loading" class="center-fix"/>
      <Trends></Trends>
        <div id="middle-container" >
            <tweets type="home"></tweets>
        </div>
      <whoToFollows></whoToFollows>
      <backToTop></backToTop>
    </div>
</div>
</template>


<script>
import Tweets from "./Subs/Tweets"
import Trends from "./Subs/Trends"
import whoToFollows from "./Subs/whoToFollows"
import backToTop from "./Subs/BackToTop"
import loadingAnimation from "./animate/loading"

export default {
    name:'explore',
    components:{
      Trends,whoToFollows,
      "tweets":Tweets,backToTop,loadingAnimation
    },
    data(){
        return {
          loading:false
        }
    },
    methods:{
    },
    created(){
    },
    beforeMount() {
    },
}
</script>


<style scope>
#explore{
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgb(230, 236, 240);
  overflow: auto;
}
#middle-container{
    width: 40%;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 70px
  }
  .center-fix{
	position: fixed;/*固定位置*/
	z-index:99;/*设置优先级显示，保证不会被覆盖*/	
  margin:auto;
left:0;
right:0;
top:0;
bottom:0;
}
</style>

