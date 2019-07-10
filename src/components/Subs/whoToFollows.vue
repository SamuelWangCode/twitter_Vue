<template>
  <div>
    <ElContainer id="right-container">
      <el-header class="header-left-align">Who to follow</el-header>
      <div class="to-follow-list" v-for="toFollow in toFollowList">
        <User v-bind:p_follow_info="toFollow"></User>
      </div>
    </ElContainer>
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
.to-follow-list {
  text-align: left;
  line-height: 17px;
}
#right-container{
    position: fixed;
    width: 20%;
    background-color: white;
    right: 9%;
    top: 70px;
  }
</style>
<script>
import User from "./User";
export default {
  name: "whoToFollows",
  data() {
    return {
      toFollowList: []
    };
  },
  components: {
    User
  },
  methods: {},
  created() {
    var _this = this;
    this.getRecommendUsers().then(Response => {
      console.log("getRecommendUsers");
      console.log(Response);
      _this.toFollowList = Response.data.data;
    });
  }
};
</script>

