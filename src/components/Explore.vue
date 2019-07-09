<template>
    <div id="explore">
        <ElContainer id="left-container">
      <Trends></Trends>
      </ElContainer>
        <div id="middle-container" >
            <tweets type="home"></tweets>
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
    name:'explore',
    components:{
      Trends,whoToFollows,
      "tweets":Tweets
    },
    data(){
        return {
        }
    },
    methods:{
    },
    created(){
    },
    beforeMount() {
    },
}
</script>


<style scope>
#explore{
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
</style>

