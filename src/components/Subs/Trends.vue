<template>
  <div id="left-container">
    <ElContainer id="left-container1" style="background-color:#1DA1F2;">
      <router-link :to="{ path: '/Zoom', query: { visitor_id: userID}}">
      <div style="float:left;margin-left:20px; margin-top:50px;">
      <Avatar
        v-bind:src="address"
        shape="circle"
        on-error
        size="large"
        style="height:60px; width:60px; border-radius:50%;"
      />
      </div>
      <div style="float:left; margin-top:70px;margin-left:10px;">
      <span style="font-weight:bold;font-size:20px;color:white">{{userName}}</span>
      </div>
      </router-link>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </ElContainer>

    <ElContainer id="left-container2">
      <el-header class="header-left-align">Trends for you</el-header>
      <ul>
        <div id="trends-container" v-for="topic in topics">
          <a>
            <div v-on:click="tapTopic(topic)">
              <div id="trends-name">{{topic.topic_content}}</div>
              <div id="tweets-times">{{ topic.topic_heat }} heat</div>
            </div>
          </a>
        </div>
      </ul>
    </ElContainer>
  </div>
</template>

<style>
#left-container {
  position: fixed;
  width: 16%;
  background-color: white;
  left: 12%;
  top: 70px;
}
#left-container1 {
  background-color: white;
}
#left-container2 {
  background-color: white;
  margin-top: 10px;
}
.header-left-align {
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  padding-top: 15px;
  padding-left: 15px;
}
#trends-container {
  line-height: 17px;
  margin-bottom: 10px;
  text-align: left;
}
#trends-name {
  font-weight: bold;
  color: #1da1f2;
  font-size: 15px;
  padding-left: 15px;
}
#tweets-times {
  color: #657786;
  font-size: 12px;
  padding-left: 15px;
}
.load-more:hover {
  cursor: pointer;
}
.no-more {
  width: 100%;
  color: #cccccc;
}
</style>

<script>
export default {
  name: "trends",
  props:{
    inject_topics: {
      required: false,
      default: null,
    }
  },
  data() {
    return {
      topics: undefined,
      address: "http://localhost:12293/avatars/0.jpg",
      userName:"userName",
      userID:"0"
    };
  },
  mounted() {
    var _this = this;
    this.userID = _this.getCookie("userID")
    console.log("登录：", this.userID)
    console.log(this.userID)
    this.getUserPublicInfo(this.userID).then(Response=>{
    console.log(Response)
    if(Response.data.code==200 && Response.data.message=="success")
      {
        this.userName = Response.data.data.nickname
        this.address = Response.data.data.avatar_url
        console.log(this.userName)
      }
      else{
        console.log("fail")
        this.userName="userName"
      }  
    })
    if(!_this.inject_topics){
      _this.queryTopicsBaseOnHeat(1, 5).then(Response => {
        console.log(Response);
        _this.topics = Response.data.data;
      })
    }else{
      _this.topics = _this.inject_topics 
    }
    
  },
  methods: {
    tapTopic(topic) {
      console.log("测试点击 topic_id:", topic.topic_id);
      this.$router.push({
        path: "/Topic",
        query: { topic_id: topic.topic_id, topic_name: topic.topic_content }
      });
    }
  },
  watch:{
    inject_topics: function(n, o){
      this.topics = n;
    }
  },
};
</script>
