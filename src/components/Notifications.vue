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
#left-container {
  float: left;
  width: 20%;
  background-color: white;
  margin-left: 150px;
  margin-top: 70px;
}
#middle-container {
  float: left;
  width: 40%;
  background-color: white;
  margin-left: 10px;
  margin-top: 70px;
}
#right-container {
  float: left;
  width: 20%;
  background-color: white;
  margin-left: 10px;
  margin-top: 70px;
}
#trends-container {
  line-height: 17px;
  margin-bottom: 10px;
  text-align: left;
}
#trends-name {
  font-weight: bold;
  color: #1da1f2;
  font-size: 17px;
  padding-left: 15px;
}
#tweets-times {
  color: #657786;
  font-size: 13px;
  padding-left: 15px;
}
.header-left-align {
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  padding-top: 15px;
  padding-left: 15px;
}
.to-follow-list {
  text-align: left;
  line-height: 17px;
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
    <loadingAnimate v-if="loading" class="center-fix"/>
    <ElContainer id="left-container">
      <el-header class="header-left-align">Trends for you</el-header>
      <ul>
        <li id="trends-container" v-for="topic in topics">
          <a>
             <div v-on:click="tapTopic(topic)" >
             <span id='trends-name' >{{topic.topic_content}}</span>
             <div id='tweets-times'>{{ topic.topic_heat }} heat</div>
             </div>
           </a>
        </li>
      </ul>
    </ElContainer>

    <ElContainer id="middle-container">
      <tweets type="notification"></tweets>
    </ElContainer>

    <ElContainer id="right-container">
      <el-header class="header-left-align">Who to follow</el-header>
      <div class="to-follow-list" v-for="toFollow in toFollowList">
        <user v-bind:p_follow_info="toFollow"></user>
      </div>
    </ElContainer>
  </div>
</template>
<script>

import User from "./Subs/User"
import Tweets from "./Subs/Tweets"
import loadingAnimate from "./animate/loading"
export default {
  name: "Notifications",
  data() {
    return {
      sites: [{ name: "Runoob" }, { name: "Google" }, { name: "Taobao" }],
      topics: [],
      followingList: [],
      loading: false
    };
  },
  components: { "user":User, "tweets": Tweets, "loading":loadingAnimate },
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
    tapTopic(topic) {
      console.log("测试点击 topic_id:", topic.topic_id);
      //TODO 点击热点之后跳转
    },
    tapRecommendUser(visitor_id) {
      console.log("测试点击推荐用户 visitor_id", visitor_id);
      //TODO 跳转
      this.$router.push({ path: "/Zoom", query: { visitor_id: visitor_id } });
    }
  }
};
</script>
