<template>
    <div id="twiitems">
            <li v-for="item in items">
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
        getDatas(){
            this.datas= "{\"str\":\"1\"}\n{\"str\":\"2\"}";
        },
        generateItems(){
            let jsonArr=this.datas.split('\n');
            console.log(jsonArr);
            for (let i=0;i<jsonArr.length;i++){
                this.items.push(JSON.parse(jsonArr[i]));
            }
            console.log(this.items);
        }
    },
    created(){
    },
    beforeMount() {
        console.log(this.url);
        this.getDatas();
        this.generateItems();
    },
}
</script>
