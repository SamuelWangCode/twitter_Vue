<template>
    <div id="recusers">
            <li class='useritems' v-for="item in items">
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
            this.datas= "{\"str\":\"user1\"}\n{\"str\":\"user2\"}";
            
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
.useritems{
    background-color: rgb(255, 255, 255);
    margin:5px;
}
</style>

