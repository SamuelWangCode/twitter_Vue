<template>
<div id="root-div">
  <div id=topAnchor></div>
  <loadingAnimate v-if="loading" class="center-fix"/>
  <div class="topic-name-container">#{{topicName}}</div>
  <div class="topic-container">
    <tweets type="topic" v-bind:info="topicId"></tweets>
  </div>
  <backToTop></backToTop>
</div>
</template>

<script>
  import axios from "axios"
  import Tweets from "./Subs/Tweets"
  import loadingAnimate from "./animate/loading"
  import backToTop from "./Subs/BackToTop"
  axios.defaults.withCredentials = true
    export default {
        name: "Topic",
    data(){
         return{
           topicId:null,
           topicName: "Topic Name",
           loading:false
         }
    },

      mounted(){
          this.topicId = this.$route.query.topic_id;
          this.topicName=this.$route.query.topic_name;
      },

      components:{
        "tweets":Tweets,
        loadingAnimate,backToTop
      }

    }

</script>

<style scoped>
  #root-div{
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgb(230, 236, 240);
}
  .topic-container{
    margin: 0 auto;
    width: 40%;
    height: 100%;
    overflow: auto;
    background-color: white
  }
  .topic-name-container{
    margin-top: 60px;
    width: 100%;
    height:80px;
    background-color: #1DA1F2;
    font-size: 35px;
    padding-top: 10px;
    padding-left: 20px;
    font-weight: bold;
    color: white;
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
