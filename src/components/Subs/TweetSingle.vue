<style scoped>
.twi-left{
    float: left;
    width: 10%;
    margin-left: 3%;
    margin-top: 10px;
    height: 80px;
}
.user-avatar-div{
    width: 60px;
    height:60px;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: #e9eaf1 0px 0px 4px;

}
.user-avatar-div:hover{
    box-shadow: #d1d3e5 0px 0px 8px;
}
.user-avatar{
    width: 60px;
}
.user-message{
    margin-top:8px;
    width: 60px;
    box-shadow: #d1d3e5 0px 0px 8px;
}


.twi-right{
    float: left;
    width: 84%;
    margin-left: 0;
}
.twi-right-top-div{
    display: inline-block;
    width: 100%;
    background-color: rgb(205, 214, 255);
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 0px;
    margin-right: 0px;
}
.user-name{
    font-weight:bold;
    font-size: 20px;
    height:40px;
}
.twi-title{
    float: left;
    width: 80%;
}
.follow-button-div{
    float: right;
    width:20%;
    line-height: 20px;
}
.follow-button{
    margin: 4px;
}
.follow-button-alt{
    margin: 4px;
    opacity: 0.3;
}


.twi-text-block{
    margin-top:10px;
    margin-bottom: 10px;
    display: inline-block;
    box-shadow: #edeef5 0px 0px 4px;
}
.twi-text-block:hover{
    box-shadow: #cacee6 0px 0px 8px;
}
.twi-text{
    margin-bottom: 10px;
    width: 100%;
}
.img-handler{
    margin-bottom: 20px;
}


.buttom-buttons{
    display: inline-block;
    background-color: antiquewhite;
    width:100%;
}
.collection-div{
    float: left;
    width:25%;
    height:auto;
    text-align: center;
}
.collection-div:hover{
    cursor: pointer;
}
.comment-div{
    float: left;
    width:25%;
    text-align: center;
}
.comment-div:hover{
    cursor: pointer;
}
.share-button{
    float: left;
    width:25%;
}
.likes-div{
    width:100%;
    height:auto;
    text-align: center;
}
.likes-div{
    cursor: pointer;
}


.shared-twi-div{
    width: 100%;
    float: left;
    padding-top:20px;
    margin-bottom:20px;
    background-color: rgb(236, 236, 236);
}

</style>



<template>
<div>
    <div v-if="messageIsShared">
        <div class="twi-left">
            <Avatar style="width:60px;height:60px;border-radius:50%;" v-bind:src="item.userAvt"></Avatar>
        </div>

        <div class="twi-right">
            <div class="twi-right-top-div">
                <div class="twi-title">
                    <p class="user-name">{{item.userName}}</p>
                    <p class="time">{{item.message_create_time}}<Icon type="ios-flame-outline" size="18"></Icon>{{item.message_heat}}</p>
                </div>
                <div class="follow-button-div" @click="doFollow()">
                    <Button type="primary" class="follow-button" v-if="followByUser==false">关注</Button>
                    <Button type="primary" class="follow-button-alt" v-else>已关注</Button>
                </div>  
                <usermessage class="user-message" v-bind:userId="item.message_sender_user_id"></usermessage>
            </div>
            <div class="twi-text-block">
                <twitextblock class="twi-text" v-bind:fullText="item.message_content" :ats="item.message_ats" :topics="item.message_topics"></twitextblock>
            </div>
            
        </div>

        <div class="shared-twi-div">
            <div style="float:left;width:8%;margin-left:6%">
                <Avatar style="width:40px;height:40px;border-radius:50%;" v-bind:src="rawItemUserAvt"></Avatar>
            </div>
            
            <div style="float:left;width:70%;margin-left:2%;margin-right:6%">
                <div>
                    <p style="text-size:30px;">{{rawItemUserName}}</p>
                    <p style="text-size:24px;">{{item.rawItem.message_create_time}}<Icon type="ios-flame-outline" size="18"></Icon>{{item.message_heat}}</p>
                </div>
                <div class="twi-text-block">
                    <twitextblock class="twi-text" v-bind:fullText="item.rawItem.message_content" :ats="item.rawItem.message_ats" :topics="item.rawItem.message_topics"></twitextblock>
                </div>
                
                <imagehandler class="img-handler" :imgUrls="item.rawItem.message_image_urls" :twiId="item.rawItem.message_id"></imagehandler>

            </div>
            <div class="buttom-buttons">
                <div class="collection-div" @click="doCollect()">
                    <Icon type="ios-star" size="24" v-if="collectByUser" style="margin-bottom: 3px"></Icon>
                    <Icon type="ios-star-outline" size="24" v-else style="margin-bottom: 3px"></Icon>
                </div>
                <div class="comment-div" @click="showComment()">
                    <Icon v-if="commented" type="ios-chatboxes" size="24"></Icon>
                    <Icon v-else type="ios-chatboxes-outline" size="24"></Icon>
                    <span>{{commentsNum}}</span>
                </div>
                <sharebutton class="share-button" v-bind:item="item" :twiId="item.message_id"></sharebutton>
                <div class="likes-div" @click="doLike()">
                    <Icon type="ios-heart" size="24" v-if="likeByUser"></Icon>
                    <Icon type="ios-heart-outline" size="24" v-else></Icon>
                    <span>{{item.message_like_num}}</span>
                </div>
            </div>
            <commentblock class="comment-block" @sendComm="doSendComment" v-bind:ifShowComment="ifShowComment" :comments="comments"></commentblock>
    
        </div>
    </div>




    <div v-else>
        <div class="twi-left">
            <Avatar  size=large v-bind:src="item.userAvt"></Avatar>
        </div>
        
        <div class="twi-right">
            <div class="twi-right-top-div">
                <div class="twi-title">
                    <p class="user-name">{{item.userName}}</p>
                    <p class="time">{{item.message_create_time}}<Icon type="ios-flame-outline" size="18"></Icon>{{item.message_heat}}</p>
                </div>
                <div class="follow-button-div" @click="doFollow()">
                    <Button type="primary" class="follow-button" v-if="followByUser==false">关注</Button>
                    <Button type="primary" class="follow-button-alt" v-else>已关注</Button>
                    <usermessage class="user-message" v-bind:userId="item.message_sender_user_id"></usermessage>
                </div>

            </div>
            <div class="twi-text-block">
                <twitextblock class="twi-text" v-bind:fullText="item.message_content" :ats="item.message_ats" :topics="item.message_topics"></twitextblock>
            </div>
            
            <imagehandler class="img-handler" :imgData="item.message_image_urls" :twiId="item.message_id"></imagehandler>

        </div>
        <div class="buttom-buttons">
            <div class="collection-div" @click="doCollect()">
                <Icon type="ios-star" size="24" v-if="collectByUser" style="margin-bottom: 3px"></Icon>
                <Icon type="ios-star-outline" size="24" v-else style="margin-bottom: 3px"></Icon>
            </div>
            <div class="comment-div" @click="showComment()">
                <Icon v-if="commented" type="ios-chatboxes" size="24"></Icon>
                <Icon v-else type="ios-chatboxes-outline" size="24"></Icon>
                <span>{{commentsNum}}</span>
            </div>
            <sharebutton class="share-button" v-bind:item="item" :twiId="item.message_id"></sharebutton>
            <div class="likes-div" @click="doLike()">
                <Icon type="ios-heart" size="24" v-if="likeByUser"></Icon>
                <Icon type="ios-heart-outline" size="24" v-else></Icon>
                <span>{{item.message_like_num}}</span>
            </div>
        </div>
        <commentblock class="comment-block" @sendComm="doSendComment" v-bind:ifShowComment="ifShowComment" :comments="comments"></commentblock>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import ShareButton from "./ShareButton"
import ImageHandler from "./ImageHandler"
import CommentBlock from "./CommentBlock"
import UserMessage from './UserMessage'
import BlockUser from './BlockUser'
import TwiTextBlock from './TwiTextBlock'

export default {
    name:'twitter-item',
    props:{
        item:Object,
    },
    data(){
        return {
            showMenu:false,
            ifShowComment:false,
            comments:[],
            collectByUser:false,
            likeByUser:false,
            followByUser:false,
            commentsNum:0,
            commented:false,
            messageIsShared:false,

            rawItemUserAvt:"",
            rawItemUserName:"",
        }
    },
    methods:{
        //辅助函数，判断是不是这个浏览器cookies里用户的推特
        getCookies(name){
            return this.getCookie(name);
        },
        ifBeMyTwi(){
            if(this.item.message_sender_user_id==this.getCookies("userID")){
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
                //调用接口请求数据
                this.getComment();
            }
            this.ifShowComment=!this.ifShowComment;
        },
        //关注谁谁
        doFollow(){
            if(this.followByUser==false){
                this.followByUser=true;
                this.followSb(this.item.message_sender_user_id).then(Response=>{
                    if (Response.data.message=="success"){
                        this.$emit("follow");
                        console.log("取消关注1/2");
                    }
                    else{
                        this.followByUser=false;
                        alert("关注失败");
                    }
                });
            }
            if(this.followByUser==true){
                this.followByUser=false;
                this.cancelFollowingTo(this.item.message_sender_user_id).then(Response=>{
                    if (Response.data.message=="success"){
                        this.$emit("follow");
                        console.log("取消关注1/2");
                    }
                    else{
                        this.followByUser=true;
                        alert("失败");
                    }
                });
            }
        },
        doLike(){
            console.log("like_message_id:", this.item.message_id);
            if(this.likeByUser==false){
                this.likeByUser=true;
                this.item.message_like_num++;
                this.like(this.item.message_id).then(Response=>{
                    if (Response.data.message=="success"){
                    }
                    //失败了就返回来
                    else{
                        this.likeByUser=false;
                        this.item.message_like_num--;
                        alert("点赞失败");
                    }
                });
            }
            else if(this.likeByUser==true){
                this.likeByUser=false;
                item.message_like_num--;
                this.cancelLike(this.item.message_id).then(Response=>{
                    if (Response.data.message=="success"){
                        this.$emit("follow");
                    }
                    //失败了就返回来
                    else{
                        item.message_like_num++;
                        item.likeByUser=true;
                        alert("失败");
                    }
                });
            }
            this.$emit("likeTwi");
        },
        doCollect(){
            if(this.collectByUser==false){
                this.collectByUser=true;
                this.addCollection(this.item.message_id).then(Response=>{
                    if (Response.data.message=="success"){
                        console.log("收藏");
                        this.$emit("collectTwi");
                    }
                    //失败了就返回来
                    else{
                        this.collectByUser=false;
                        
                        alert("收藏失败");
                    }
                });
            }
            else if(this.collectByUser==true){
                this.collectByUser=false;
                this.deleteCollection(this.item.message_id).then(Response=>{
                    if (Response.data.message=="success"){
                        console.log("取消收藏");
                        this.$emit("collectTwi");
                    }
                    //失败了就返回来
                    else{
                        this.collectByUser=true;
                        alert("失败");
                    }
                });
            }
        },
        getComment(){
            let data={
                startFrom: this.comments.length,
                limitation: 10,
            }
            this.queryComment(
                    this.item.message_id,data
                ).then(Response=>{
                    this.comments=Response.data.data;
                });
        },
        doSendComment(content){
            let data={
                comment_content:content,
            }
            this.addComment(
                this.item.message_id,data
            ).then(Response=>{
                if(Response.data.message=="success"){
                    this.commentsNum+=1;
                    this.commented=true;
                    this.getUserPublicInfo(this.getCookies("userID")).then(Response=>{
                        let timeObj=new Date();
                        if(Response.data.message=="success"){
                            let commTemp={
                                userPublicInfo:{
                                    nickname:Response.data.data.nickname,
                                    avatar_url:Response.data.data.avatar_url,
                                },
                                comment:{
                                    comment_content:content,
                                    comment_create_time:"刚刚",
                                }
                            };
                            this.comments.unshift(commTemp);
                        }
                        else{
                            alert("评论失败");
                        }
                    });
                }
                else{
                    alert("转发失败");
                }
            });
        }
    },
    created(){
        this.collectByUser=this.item.collectByUser;
        this.likeByUser=this.item.likeByUser;
        this.followByUser=this.item.followByUser;
        this.commentsNum=this.item.message_comment_num;
        //求证是否点赞收藏关注
        this.checkUserLikesMessage(this.getCookies("userID"),this.item.message_id).then(Response=>{
            this.likeByUser=Response.data.data.like;
        });
        this.checkUserCollectMessage(this.getCookies("userID"),this.item.message_id).then(Response=>{
            this.collectByUser=Response.data.data.favor;
        });
        this.if_following_by_me(this.item.message_sender_user_id).then(Response=>{
            this.followByUser=Response.data.data.if_following;
        });

        //如果是转发的就取原推特条
        if (this.item.message_transpond_message_id>0){
            this.queryMessage(this.item.message_transpond_message_id).then(Response=>{
                if (Response.data.message=="success"){
                    this.item.rawItem=Response.data.data;
                    this.messageIsShared=true;
                    this.getUserPublicInfo(this.item.rawItem.message_sender_user_id).then(Response=>{
                        
                        this.rawItemUserName=Response.data.data.nickname;
                        this.rawItemUserAvt=Response.data.data.avatar_url;
                        console.log("转发的推特",this.item.rawItem);
                    });
                }
                else{
                    alert("请求被转发推特失败");
                }
            });
        }
    },
    computed:{
        Message_heat:function(){
            return this.item.message_heat*65335+Math.floor(Math.random()*100);
        }
    },
    beforeMount() {
    },
    components:{
        "sharebutton":ShareButton,
        "imagehandler":ImageHandler,
        "commentblock":CommentBlock,
        "usermessage":UserMessage,
        "blockuser":BlockUser,
        "twitextblock":TwiTextBlock,
    },
}
</script>
