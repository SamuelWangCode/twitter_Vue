<style scoped>
.twi-single-div{
    width:100%;
  background-color: #2c3e50;
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
.item-menu li{
    background-color: beige;
    width: 80px;
    list-style-type: none;
}
.item-menu li:hover{
    background-color: rgb(255, 182, 182);
}

.twi-text-block{
    margin-bottom: 10px;
    width: 100%;
}
.twi-text{
    margin-bottom: 10px;
    width: 100%;
}
.img-handler{
    margin-bottom: 20px;
}


.buttom-buttons{
    width:100%;
}
.collection-button{
    float: left;
    width: 25%;
}
.comment-button{
    float: left;
    width:25%;
}
.share-button{
    float: left;
    width:25%;
}
.like-button{
    float: left;
    width:25%;
}

</style>



<template>
<div class="twi-single-div">
    
    <div class="twi-left">
        <div class="user-avatar-div">
            <img class="user-avatar" :src="item.userAvt" alt="no">
        </div>
    </div>
    
    <div class="twi-right">
        <div class="twi-right-top-div">
            <div class="user-name">{{item.userName}}</div>
            <div class="item-menu">
                <Icon type="ios-arrow-down" size='24' class="item-menu-icon" @click="doShowMenu()"></Icon>
                <div class="menu" v-show="showMenu">
                    <ul v-if="ifBeMyTwi(item)">
                        <li @click="delTwi(item)">我的推特</li>
                        <li>可以删除</li>
                    </ul>
                    <ul v-if="ifBeMyTwi(item)==false">
                        <li>
                            <blockuser v-bind:userId="item.message_sender_user_id"></blockuser>
                        </li>
                        <li>
                            <usermessage v-bind:userId="item.message_sender_user_id"></usermessage>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="follow-button-div" @click="doFollow()">
                <Button type="primary" class="follow-button" v-if="item.followByUser==false">关注</Button>
                <Button type="primary" class="follow-button-alt" v-else>已关注</Button>
            </div>
                        
        </div>
        <div class="twi-text-block">
            <twitextblock class="twi-text" v-bind:fullText="item.message_content" :ats="item.message_ats" :topics="item.message_topics"></twitextblock>
        </div>
        
        <imagehandler class="img-handler" :imgData="item.message_image_urls" :twiId="item.message_id"></imagehandler>

    </div>
    <div class="buttom-buttons">
        <collectionbutton class="collection-button" @collectTwi="doCollect()" v-bind:twiId="item.message_id" :collectByUser="item.collectByUser"></collectionbutton>
        <commentbutton class="comment-button" @showComment="showComment()" v-bind:commentsNum="item.message_comment_num" :twiId="item.message_id"></commentbutton>
        <sharebutton class="share-button" v-bind:shareNum="item.message_transpond_num" :twiId="item.message_id"></sharebutton>
        <likebutton class="like-button" @likeTwi="doLike()" v-bind:likeByUser="item.likeByUser" v-bind:likesNum="item.message_agree_num" :twiId="item.message_id"></likebutton>
    </div>
    <commentblock class="comment-block" @sendComm="doSendComment" v-bind:ifShowComment="ifShowComment" :comments="comments"></commentblock>

</div>
</template>

<script>
import axios from 'axios'
import LikeButton from './LikeButton'
import CommentButton from "./CommentButton"
import ShareButton from "./ShareButton"
import ImageHandler from "./ImageHandler"
import CollectionButton from "./CollectionButton"
import CommentBlock from "./CommentBlock"
import UserMessage from './UserMessage'
import BlockUser from './BlockUser'
import TwiTextBlock from './TwiTextBlock'

export default {
    name:'twitter-items',
    props:{
        item:{},
    },
    data(){
        return {
            showMenu:false,
            ifShowComment:false,
            comments:[],
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
        doShowMenu(){
            this.showMenu=!this.showMenu;
        },
        //展示评论或者取消展示评论
        showComment(){
            if (this.comments.length==0){
                this.getComment();
            }
            this.ifShowComment=!this.ifShowComment;
        },
        //关注谁谁
        doFollow(){
            if(this.item.followByUser==false){
                this.follow(this.item.message_sender_user_id).then(Response=>{
                    this.$emit("follow");
                    console.log("关注1/2");
                });
            }
            if(this.item.followByUser==true){
                this.cancelFollowingTo(this.item.message_sender_user_id).then(Response=>{
                    this.$emit("follow");
                    console.log("取消关注1/2");
                });
            }
        },
        doLike(){
            this.$emit("likeTwi");
            console.log("点赞取消点赞 2/3");
        },
        doCollect(){
            this.$emit("collectTwi")
            console.log("收藏取消收藏 2/3");
        },
        //删除自己的推特
        delTwi(item){
            console.log("删除",item.message_content);
        },
        getComment(){
            let data={
                startFrom: this.comments.length,
                limitation: 10,
            }
            this.$http.post(
                    'http://localhost:12293/api/Comment/queryComments/'+this.item.message_id,data
                ).then(Response=>{
                    this.comments=Response.data.data;
                });
        },
        doSendComment(content){
            let data={
                comment_content:content,
            }
            this.$http.post(
                    'http://localhost:12293/api/Comment/add/'+this.item.message_id,data
                ).then(Response=>{
                });
        }
    },
    created(){
        
    },
    beforeMount() {
    },
    components:{
        "likebutton":LikeButton,
        "commentbutton":CommentButton,
        "sharebutton":ShareButton,
        "imagehandler":ImageHandler,
        "collectionbutton":CollectionButton,
        "commentblock":CommentBlock,
        "usermessage":UserMessage,
        "blockuser":BlockUser,
        "twitextblock":TwiTextBlock,
    },
}
</script>
