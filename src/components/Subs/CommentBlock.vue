<style scoped>

.show-comment-div{
    float:left;
    width: 100%;
    margin:0px;
    padding-top: 20px;
    background-color: aqua;
}
.send-comm-div{
    width:100%;
    margin-bottom: 20px;
    background-color: rgb(229, 252, 244);
}
.send-comm-input{
    width:80%;
    background-color: rgb(227, 241, 237);
}
.send-comm-button{
    width:18%;
    background-color: rgb(223, 243, 236);
}
.comm-avt-div{
    float: left;
    width: 12%;
    margin-top:15px;
    background-color: rgb(225, 243, 237);
    overflow: hidden;
}
.comm-useravt{
}
.comm-content-div{
    float: left;
    width:86%;
    margin-top:15px;
    background-color:rgb(188, 213, 229);
}
.comm-name-div{

}
.comm-text-div
.comm-time-div

.item-divider{
    text-align: center;
    color: beige;
}
</style>

<template>
<div>
    <div class="show-comment-div" v-show="ifShowComment">
        <div class="send-comm-div">
            <input class="send-comm-input" type="text" v-model="commTextToSend">
            <Button type="primary" @click="sendComment()">发送</Button>
        </div>
        <div v-for="comm in comments">
            <div class="comm-avt-div">
                <Avatar v-bind:src="comm.userPublicInfo.avatar_url" class="comm-useravt"></Avatar>
            </div>
            <div class="comm-content-div">
                <div class="comm-name-div">
                    {{comm.userPublicInfo.nickname}}
                </div>
                <div class="comm-text-div">
                    {{comm.comment.comment_content}}
                </div>
                <div class="comm-time-div" >
                    {{comm.comment.comment_create_time}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        ifShowComment:false,
        comments:Array,
    },
    data(){
        return {
            commTextToSend:""
        }
    },
    methods:{
        sendComment(){
            this.$emit("sendComm",this.commTextToSend);
        },
    },
}
        
</script>
