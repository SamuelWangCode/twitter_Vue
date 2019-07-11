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
  <div id="root-div"><div id="topAnchor"></div>
    <loadingAnimate  v-if="loading" class="center-fix"/>
      <Trends></Trends>

    <ElContainer id="middle-container">
      <tweets @stop_loading="stop_loading" type="notification"></tweets>
    </ElContainer>

    <ElContainer id="right-container">
      <whoToFollows></whoToFollows>
    </ElContainer>
    <backToTop></backToTop>
  </div>
</template>
<script>

import Tweets from "./Subs/Tweets"
import loadingAnimate from "./animate/loading"
import Trends from "./Subs/Trends"
import whoToFollows from "./Subs/whoToFollows"
import backToTop from "./Subs/BackToTop"
export default {
  name: "Notifications",
  data() {
    return {
      sites: [{ name: "Runoob" }, { name: "Google" }, { name: "Taobao" }],
      topics: [],
      followingList: [],
      loading: true
    };
  },
  components: {"tweets": Tweets, "loading":loadingAnimate, Trends,
    whoToFollows,backToTop},
  created(){
    var p1 = this.queryTopicsBaseOnHeat(0, 5).then(response=>{
      console.log("测试topics", response);
        this.topics = response.data.data;
      });
    var p2 = this.getRecommendUsers().then(response => {
      console.log("测试getRecommendUsers", response);
        this.toFollowList = response.data.data;
        console.log(this.toFollowList)
    });
    
    
  },
  methods: {
    stop_loading(){
      this.loading = false;
    },
    tapTopic(topic) {
      console.log("测试点击 topic_id:", topic.topic_id);
      //TODO 点击热点之后跳转
    },
    tapRecommendUser(visitor_id) {
      console.log("测试点击推荐用户 visitor_id", visitor_id);
      //TODO 跳转
      this.$router.push({ path: "/Zoom", query: { visitor_id: visitor_id } });
    }
  },
  beforeRouteEnter(to,from,next){
      next(vm=>{
        if(!vm.getCookie("userID"))
        {
          console.log("请先登录")
          vm.$router.push("index")
        }
      })
    }
};
</script>
