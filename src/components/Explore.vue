<template>
    <div id="explore">
      <Trends></Trends>
        <div id="middle-container" >
            <tweets type="home"></tweets>
        </div>
      <whoToFollows></whoToFollows>
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
#middle-container{
    width: 40%;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 70px
  }
</style>

