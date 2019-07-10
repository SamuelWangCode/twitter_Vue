<style scoped>
ul li {
  list-style-type: none;
}
#root-div {
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
.infor-avatar {
  margin-top: 10px;
  margin-left: 15px;
  margin-bottom: 5px;
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

<template>
  <div id="root-div">
    <div id="topAnchor"></div>
    <loadingAnimate v-if="loading" class="center-fix"/>
      <Trends></Trends>

    <div id="middle-container">
      <tweets type="search" v-bind:info="searchKey"></tweets>
    </div>

    <ElContainer id="right-container">
      <whoToFollows></whoToFollows>
    </ElContainer>
    <backToTop></backToTop>
  </div>
</template>
<script>
import Tweets from "./Subs/Tweets"
import Trends from "./Subs/Trends"
import whoToFollows from "./Subs/whoToFollows"
import loadingAnimate from "./animate/loading"
import backToTop from "./Subs/BackToTop"
export default {
  name: "SearchResult",
  components:{
    "tweets": Tweets,
    Trends,
    whoToFollows,
    loadingAnimate,backToTop
  },
  data() {
    return {
      loading:false,
      searchKey : this.$route.query.searchKey,
      sites: [{ name: "Runoob" }, { name: "Google" }, { name: "Taobao" }],
      users: [],
    };
  },
  mounted(){
    console.log("搜索码为,", this.searchKey)
    this.search(this.searchKey, 0, 10).then(response=>{
          console.log("测试topics", response);
          this.topics = response.data.data.topics;
          this.users = response.data.data.users;
    });
  },
};
</script>
