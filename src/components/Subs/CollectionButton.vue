<style scoped>
.collection-div{
    width:100%;
    height:auto;
    text-align: center;
}
.collection-div:hover{
    cursor: pointer;
}

</style>



<template>
<div>
    <div class="collection-div" @click="collect()">
        <Icon type="ios-star" size="24"  v-if="collectByUser"></Icon>
        <Icon type="ios-star-outline" size="24" v-else></Icon>
    </div>
</div>
</template>


<script>
export default {
    props:{
        collectByUser:false,
        twiId:Number,
    },
    data(){
        return {
        }
    },
    methods:{
        //收藏与取消收藏
        collect(){
            let data={
                message_id:this.twiId,
            }
            if (this.collectByUser==false){
                
                this.$http.post(
                    'http://localhost:12293/api/Collection/add',data
                ).then(Response=>{
                    //成功发送了
                    if (Response.data.code==200){
                        //播放动画？
                        console.log("collect了",Response);
                        this.$emit("collectTwi");
                    }
                    else{
                        window.alert("收藏失败");
                    }
                });
            }
            else{
                this.$http.post(
                    'http://localhost:12293/api/Collection/delete',data
                ).then(Response=>{
                    if (Response.data.code==200){
                        //播放动画？
                        this.$emit("collectTwi");
                        console.log("cancelcollect",Response);
                    }
                    else{
                        window.alert("取消收藏失败");
                    }
                });
            }
        },
    },
    created(){
    },
    beforeMount() {
    },
}
</script>

