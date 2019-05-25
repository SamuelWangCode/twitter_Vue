<template>
    <div id="trend">
        <div style="margin-top:80px;">Trend</div>
        <div id="hottopic">
            热门话题
        </div>
        <div id="twiitems">
            <twi-items></twi-items>
        </div>
        <div id="recusers">
            推荐关注
        </div>
    </div>
</template>


<script>
import Twiitems from "./Subs/TwiItems"

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
        "twi-items":Twiitems
    }
}
</script>


<style scope>
#hottopic{
    width:22%;
    float: left;
    margin:1% 1% 1% 3%;
    background-color: #CCC444;
}
#twiitems{
    width:44%;
    float: left;
     margin:1% 2% 1% 2%;
    background-color: rgb(68, 204, 204);
}
#recusers{
    width:22%;
    float: left;
     margin:1% 3% 1% 1%;
    background-color: #884444;
}
</style>

