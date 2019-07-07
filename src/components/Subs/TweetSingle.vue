<style scoped>
.twi-single-div{
    width:100%;
    background-color: #fff;
}

.twi-left{
    float: left;
    width: 12%;
    margin-left: 1%;
    margin-top: 10px;
    height: 80px;
}
.user-avatar-div{
    width: 60px;
    height:60px;
    border-radius: 30px;
    overflow: hidden;
}
.user-avatar{
    width: 60px;
}


.twi-right{
    float: left;
    width: 84%;
    margin-left: 1%;
    margin-top: 10px;
}
.twi-right-top-div{
    width: 100%;
    background-color: blanchedalmond;
}
.user-name{
    font-weight:bold;
    font-size: 20px;
    height:40px;
    width:70%;
    float: left;
}
.follow-button-div{
    float: right;
    width:20%;
    line-height: 20px;
    height:40px;
}
.follow-button{
    float: right;
    width:80%;
    margin: 4px;
}
.follow-button:hover{
    float: right;
    width:80%;
    margin: 4px;
}
.follow-button-alt{
    float: right;
    width:80%;
    margin: 4px;
    opacity: 0.3;

    box-shadow: #c7c7c7 0px 0px 8px;
}
.item-menu{
    line-height:40px;
    list-style-type:none;
    padding:0px;
    width:10%;
    overflow: hidden;
    float: right;
}
.item-menu-icon{
    float: right;
}
.item-menu ul{
    line-height:40px;
    position:absolute;
    display: none;
    padding:0px;
}
.item-menu:hover ul{
    display:block;
    right:auto;
}
.item-menu li{
    background-color: beige;
    width: 80px;
    list-style-type: none;
}
.item-menu li:hover{
    background-color: rgb(83, 83, 83);
}

.twi-text{
    margin-bottom: 10px;
    width: 100%;
}

.button-div{
    margin-top:10px;
}
.button-div:hover{
    cursor: pointer;
}

.message-div{
    float: left;
    width:120px;
    height:auto;
    background-color: beige;
}



</style>



<template>
<div class="twi-single-div">
    <div v-if="showBigImage"></div>

    <div class="twi-left">
        <div class="user-avatar-div">
            <img class="user-avatar" :src="item.userInfo.avatar_url" alt="no">
        </div>
    </div>
    
    <div class="twi-right">
        <div class="twi-right-top-div">
            <div class="user-name">{{item.userInfo.nickname}}</div>
            <div class="item-menu">
                <Icon type="ios-arrow-down" size='24' class="item-menu-icon"></Icon>
                <ul v-if="ifBeMyTwi(item)">
                    <li @click="delTwi(item)">我的推特</li>
                    <li>可以删除</li>
                </ul>
                <ul v-if="ifBeMyTwi(item)==false">
                    <li @click="blockUser(item)">拉黑用户</li>
                    <li>不再看到这条微博</li>
                </ul>
            </div>

            <div class="follow-button-div" @click="follow(item)">
                <Button type="primary" class="follow-button" v-if="item.followbyuser==false">关注</Button>
                <Button type="primary" class="follow-button-alt" v-if="item.followbyuser">已关注</Button>
            </div>
                        
        </div>
        <div class="twi-text">
            {{item.message_content}}
        </div>
        
        
            <imagehandler :imgData="item.message_image_urls" :twiId="item.message_id" class="img-component"></imagehandler>

            <div class="button-div">
                <commentbutton v-bind:commentsNum="item.message_comment_num" :twiId="item.message_id"></commentbutton>
                <sharebutton v-bind:shareNum="item.message_transpond_num" :twiId="item.message_id"></sharebutton>
                <likebutton v-bind:likeByUser="item.likebyuser" v-bind:likesNum="item.message_agree_num" :twiId="item.message_id"></likebutton>
                <div class="message-div" @click="sendMessage(item)">
                    <Icon type="ios-mail-outline" size="24"></Icon>
                </div>
            </div>
        </div>
                
        <div class="show-comment-div" v-show="item.ifShowComment">
            <div class="send-comm-div">
                        <form action="localhost:8080" method="get">
                            <input class="send-comm-input" type="text">
                            <input class="send-comm-button" type="submit" value="发表你的评论">
                        </form>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import LikeButton from './LikeButton'
import CommentButton from "./CommentButton"
import ShareButton from "./ShareButton"
import ImageHandler from "./ImageHandler"
export default {
    name:'twitter-items',
    props:{
        item:{},
    },
    data(){
        return {
            
            
            showBigImage:false,
            BigImageSource:"",

        }
    },
    methods:{
        //辅助函数，判断是不是这个浏览器cookies里用户的推特
        ifBeMyTwi(item){
            let myId=document.cookie;
            if(item.message_sender_user_id==233){
                return true;
            }
            else{
                return false;
            }
        },
        //关注谁谁
        follow(item){

        },
        
        
        //发私信
        sendMessage(item){
            console.log("私信");

        },
        //删除自己的推特
        delTwi(item){
            console.log("删除",item.message_content);
        },
        //拉黑用户
        blockUser(item){
            console.log("拉黑",item.message_sender_user_id);
        }
    },
    created(){
        console.log("this.item",this.item);
    },
    beforeMount() {
    },
    components:{
        "likebutton":LikeButton,
        "commentbutton":CommentButton,
        "sharebutton":ShareButton,
        "imagehandler":ImageHandler,
    }
}
</script>
