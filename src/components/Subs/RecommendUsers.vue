<template>
    <div id="recusers">
            <li class='useritems' v-for="item in toFollowList">
              <a>
                <Avatar
                  :src="item.avatarUrl"
                  style="margin-top: 10px;margin-left: 15px;margin-bottom: 5px"
                ></Avatar>
                {{item.name}}: {{item.content}}
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
          toFollowList: [],
            datas:""
        }
    },
  mounted(){
    this.getRecommendUsers().then(response => {
      console.log("测试getRecommendUsers", response);
      this.toFollowList = response.data.data;
      console.log(this.toFollowList)
    });
  },
    methods:{

        generateData(){
            this.datas= "{\"str\":\"user1\"}\n{\"str\":\"user2\"}";
            
            let jsonArr=this.datas.split('\n');
            //console.log(jsonArr);
            for (let i=0;i<jsonArr.length;i++){
                this.items.push(JSON.parse(jsonArr[i]));
            }
            //console.log(this.items);
        },
      tapRecommendUser(visitor_id) {
        console.log("测试点击推荐用户 visitor_id", visitor_id);
        //TODO 跳转
        this.$router.push({ path: "/Zoom", query: { visitor_id: visitor_id } });
      }
    },
    created(){
        this.generateData();
    },
    beforeMount() {
    },
}
</script>
<style scoped>
.useritems{
    background-color: #C6E7FB;
    margin:5px;
}
</style>

