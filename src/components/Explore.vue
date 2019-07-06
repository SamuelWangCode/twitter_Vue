<template>
    <div id="explore">
        <div id="hottopic">
            <p>热门话题</p>
            <hottopics></hottopics>
        </div>
        <div id="tweetitems">
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
    margin-top: 80px;
}
#hottopic{
    width:20%;
    float: left;
    margin:1% 1% 1% 3%;
    height:500px;
    background-color: rgb(212, 212, 212);
    border-radius: 4px;
    font-size: 25px;
}
#tweetitems{
    width:48%;
    float: left;
     margin:1% 2% 1% 2%;
    background-color: rgb(216, 216, 216);
    border-radius: 4px;
    overflow: hidden;
}
#recommendusers{
    width:20%;
    float: left;
     margin:1% 3% 1% 1%;
     height:500px;
    background-color: #cfcfcf;
    font-size: 25px;
    border-radius: 4px;
}
</style>

