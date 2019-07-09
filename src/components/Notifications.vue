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
      <div class="el-header" style="border-bottom: 1px solid #e6ecf0;width: 100%">
        <Tabs active-key="key1" style="float: left;width: 100%">
          <Tab-pane label="All" key="key1">
            <ElContainer v-for="infor in informationList">
              <a>
                <Avatar
                  :src="infor.avatarUrl"
                  style="margin-top: 10px;margin-left: 15px;margin-bottom: 5px"
                ></Avatar>
                {{infor.name}}: {{infor.content}}
              </a>
            </ElContainer>
          </Tab-pane>
          <Tab-pane label="Mention" key="key2">标签二的内容</Tab-pane>
        </Tabs>
      </div>
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
export default {
  name: "Notifications",
  data() {
    return {
      sites: [{ name: "Runoob" }, { name: "Google" }, { name: "Taobao" }],
      topics: [],
      toFollowList: [],
      informationList: [
        
      ]
    };
  },
  components: { "user":User },
  mounted(){
    this.queryTopicsBaseOnHeat(0, 5).then(response=>{
          console.log("测试topics", response);
          this.topics = response.data.data;
        });
        this.getRecommendUsers().then(response => {
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
