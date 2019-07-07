<style scoped>
.likes-div{
    width:100%;
    height:auto;
    text-align: center;
}
.likes-div{
    cursor: pointer;
}
</style>



<template>
<div>
    <div class="likes-div" @click="like(twiId)">
        <Icon type="ios-heart-outline" size="24" v-if="likeByUser==false"></Icon>
        <Icon type="ios-heart" size="24" v-if="likeByUser"></Icon>
        <span>{{likesNum}}</span>
    </div>
</div>
</template>


<script>
export default {
    props:{
        likeByUser:false,
        likesNum:Number,
        twiId:Number,
    },
    data(){
        return {
        }
    },
    methods:{
        //点赞
        like(id){
            if (this.likeByUser==false){
                this.$http.get(
                    'http://localhost:12293/api/Like/'+id
                ).then(Response=>{
                    //成功发送了点赞
                    if (Response.data.code==200){
                        //播放动画？
                        console.log("like了",Response);
                        this.$emit("likeTwi");
                    }
                    else{
                        window.alert("点赞失败");
                    }
                });
            }
            else{
                this.$http.get(
                    'http://localhost:12293/api/Like/cancel/'+id
                ).then(Response=>{
                    if (Response.data.code==200){
                        //播放动画？
                        this.$emit("likeTwi");
                        console.log("cancellike",Response);
                    }
                    else{
                        window.alert("取消点赞失败");
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

