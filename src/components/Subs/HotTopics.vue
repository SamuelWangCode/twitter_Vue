<template>
    <div id="hottopics">
            <li class='topicitems' v-for="item in items">
                <p>{{item.str}}</p>
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
            items:[],
            datas:""
        }
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
<style scoped>
.topicitems{
    background-color: white;
  color: black;
  margin-top: 3px;
}
</style>

