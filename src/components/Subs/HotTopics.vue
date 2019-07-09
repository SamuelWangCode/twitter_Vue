<style scoped>
  .topicitems{
    background-color: white;
    color: black;
    margin-top: 3px;
    font-size: 15px;
  }
  #topic-name
  {
    margin-top: 10px;
  }
  #topic-heat
  {
    margin-top: 5px;
  }
</style>

<template>
    <div id="hottopics">
            <li class='topicitems' v-for="item in topics">
              <a>
              <span id="topic-name">{{item.topic_content}}</span>
              <div id="topic-heat">{{ item.topic_heat }} heat</div>
              </a>
            </li>
    </div>
</template>


<script>
export default {
    name:'twitter-items',
    props:{
        url:String,
    },
    data(){
        return {
            topics:[],
            datas:""
        }
    },
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
    methods:{
        generateData(){
            this.datas= "{\"str\":\"topic1\"}\n{\"str\":\"topic2\"}";
            let jsonArr=this.datas.split('\n');
            console.log(jsonArr);
            for (let i=0;i<jsonArr.length;i++){
                this.items.push(JSON.parse(jsonArr[i]));
            }
            console.log(this.items);
        }
    },
    created(){
        this.generateData();
    },
    beforeMount() {
    },
}
</script>
