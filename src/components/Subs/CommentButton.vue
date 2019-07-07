<style scoped>
.comment-div{
    width:100%;
    height:auto;
    text-align: center;
}

.comment-div:hover{
    cursor: pointer;
}



</style>



<template>
<div>
    <div class="comment-div" @click="showComment()">
        <Icon type="ios-chatboxes-outline" size="24"></Icon>
        <span>{{commentsNum}}</span>
    </div>
    
</div>
</template>


<script>
export default {
    props:{
        commentsNum:Number,
        twiId:Number,
    },
    data(){
        return {
        }
    },
    methods:{
        //显示或关闭评论
        showComment(){
            this.$emit("showComment");
        },
    },
    created(){
    }
}
</script>

