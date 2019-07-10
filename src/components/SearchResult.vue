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
</style>

<template>
  <div id="root-div">
      <Trends></Trends>

    <div id="middle-container">
      <tweets type="search" v-bind:info="searchKey"></tweets>
    </div>

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
  name: "SearchResult",
  components:{
    "tweets": Tweets,
    Trends,
    whoToFollows
  },
  data() {
    return {
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
