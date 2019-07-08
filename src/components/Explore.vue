<template>
    <div id="explore">
        <div id="hottopic" >
            <p>热门话题</p>
            <hottopics></hottopics>
        </div>
        <div id="tweetitems" >
            <tweets type="explore"></tweets>
        </div>
        <div id="recommendusers">
            <p>推荐关注</p>
            <recommendusers></recommendusers>
        </div>
    </div>
</template>


<script>
import HotTopics from "./Subs/HotTopics"
import RecommendUsers from "./Subs/RecommendUsers"
import Tweets from "./Subs/Tweets"

export default {
    name:'explore',
    props:{
        
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
    components:{
        "tweets":Tweets,
        "recommendusers":RecommendUsers,
        "hottopics":HotTopics
    }
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
#hottopic{
  margin-top: 70px;
  margin-left: 7%;
    width:20%;
    float: left;
    height:500px;
  background-color: white;
    border-radius: 4px;
    font-size: 25px;
}
#tweetitems{
  margin-top: 70px;
    width:48%;
  margin-left: 5px;
    float: left;
  background-color: white;
    border-radius: 4px;
    overflow: hidden;
}
#recommendusers{

    margin-top: 70px;
  margin-left: 5px;
    width:20%;
    float: left;
     height:500px;
  background-color: white;
    font-size: 25px;
    border-radius: 4px;
}
</style>

