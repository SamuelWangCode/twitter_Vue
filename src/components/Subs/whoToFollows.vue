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
  font-size: 20px;
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
    width: 16%;
    background-color: white;
    right: 13%;
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
  props:{
    inject_toFollowList:{
      default: null,
      required: false
    }
  },
  components: {
    User
  },
  methods: {},
  watch:{
    inject_toFollowList: function(n, o){
      this.toFollowList = n;
    }
  },
  mounted() {
    var _this = this;
    if(!_this.inject_toFollowList){
        this.getRecommendUsers().then(Response => {
        console.log("getRecommendUsers", Response.data.data);
        _this.toFollowList = Response.data.data;
      });
    }else{
      console.log("inject_toFollowList", _this.inject_toFollowList)
      _this.toFollowList = _this.inject_toFollowList;
    }
  }
};
</script>

