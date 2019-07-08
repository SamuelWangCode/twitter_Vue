<style scoped>

.show-comment-div{
    float:left;
    width: 100%;
    margin:0px;
    padding-top: 20px;
    background-color: white;
}
.send-comm-div{
  height: 40px;
    width:100%;
    margin-bottom: 20px;
  background-color: #2c3e50;
}
.send-comm-input{
  margin-left: 55px;
    width:80%;
    background-color: white;
}
.comm-avt-div{
    float: left;
  margin-left: 40px;
    margin-top:15px;
    background-color: white;
    overflow: hidden;
}
.comm-useravt{
}
.comm-content-div{
    float: left;
    width:70%;
    margin-top:10px;
  margin-bottom: 10px;
  margin-left: 40px;
    background-color:white;
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
            <input type="text" style="width: 60%;margin-left: 125px;margin-top:10px;" v-model="commTextToSend">
            <Button type="primary" @click="sendComment()" style="background-color: white ;color: #14171a;margin-left: 10px;">发送</Button>
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
          <divider/>
        </div>
    </div>
</div>
</template>

<script>
import Divider from "iview/src/components/divider/divider";
export default {
  components: {Divider},
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
