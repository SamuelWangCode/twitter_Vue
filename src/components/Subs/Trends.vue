<template>
<div>
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
</div>
</template>

<style>
.header-left-align {
  font-weight: bold;
  font-size: 24px;
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
  font-size: 17px;
  padding-left: 15px;
}
#tweets-times {
  color: #657786;
  font-size: 13px;
  padding-left: 15px;
}
</style>

<script>
export default {
  name: "trends",
  data() {
    return {
      topics: []
    };
  },
  created() {
    var _this = this;
    this.queryTopicsBaseOnHeat(0, 5).then(Response => {
      console.log(Response);
      _this.topics = Response.data.data;
    });
  },
  methods: {
    tapTopic(topic) {
      console.log("测试点击 topic_id:", topic.topic_id);
      this.$router.push({
        path: "/Topic",
        query: { topic_id: topic.topic_id, topic_name: topic.topic_content }
      });
    }
  }
};
</script>
