<template>
    <div id="tweets">
            <li class='tweetitems' v-for="item in items">
                <img v-bind:src="item.useravt">
                <p>{{item.username}}</p>
                
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
            this.datas= ['{"userid":1223,"username":"hi","useravt":"/src/assets/a.jpg","text":"啊","imgs":["/src/assets/1.jpg"]}',
                        '{"userid":1223,"username":"hey","useravt":"/src/assets/a.jpg","text":"哦","imgs":["/src/assets/2.jpg","/assets/3.jpg"]}'];
            for (let i=0;i<this.datas.length;i++){
                this.items.push(JSON.parse(this.datas[i]));
                console.log("asdads",this.items[i]);
            }
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

