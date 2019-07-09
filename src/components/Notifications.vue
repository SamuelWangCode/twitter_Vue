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
</style>

<template>
  <div id="root-div">
    <ElContainer id="left-container">
      <Trends></Trends>
    </ElContainer>

    <ElContainer id="middle-container">
      <tweets type="notification"></tweets>
    </ElContainer>

    <ElContainer id="right-container">
      <whoToFollows></whoToFollows>
    </ElContainer>
  </div>
</template>
<script>

import Tweets from "./Subs/Tweets"
import Trends from "./Subs/Trends"
import whoToFollows from "./Subs/whoToFollows"
export default {
  name: "Notifications",
  data() {
    return {
      sites: [{ name: "Runoob" }, { name: "Google" }, { name: "Taobao" }],
    };
  },
  components: { "tweets": Tweets,
    Trends,
    whoToFollows
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
