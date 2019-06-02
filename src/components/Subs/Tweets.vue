<template>
    <div id="tweets">
            <li class='tweetitems' v-for="item in items">
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
            this.datas= "{\"str\":\"1\"}\n{\"str\":\"2\"}";
            
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
.tweetitems{
    background-color: rgb(255, 255, 255);
    margin:5px;
}
</style>

