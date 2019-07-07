<style scoped>
.likes-div{
    float: left;
    width:120px;
    height:auto;
    background-color: violet;
    text-align: center;
}
</style>



<template>
    <div class="likes-div" @click="like(twiId)">
        <Icon type="ios-heart-outline" size="24" v-if="likeByUser==false"></Icon>
        <Icon type="ios-heart" size="24" v-if="likeByUser"></Icon>
        <span>{{likesNum}}</span>
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
            if (this.likeByUser==true){
                this.$http.get(
                    'http://localhost:12293/api/Like/cancel'+id
                ).then(Response=>{
                    console.log(Response);
                    //直接修改心为黑
                    this.likeByUser=false;
                    //成功发送了点赞
                    if (Response.data.code==200){
                        //播放动画？
                    }
                    //失败了要改回红的心
                    else{
                        window.alert("发送失败");
                        this.likeByUser=true;
                        //改回空的心
                    }
                });
            }
            else{
                this.$http.get(
                    'http://localhost:12293/api/Like/'+id
                ).then(Response=>{
                    console.log(Response);
                    //直接修改心为红
                    this.likeByUser=true;
                    //成功发送了点赞
                    if (Response.data.code==200){
                        //播放动画？
                    }
                    //失败了要改回空的心
                    else{
                        window.alert("发送失败");
                        this.likeByUser=false;
                        //改回空的心
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

