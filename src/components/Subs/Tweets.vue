<style scoped>
.tweet-items{
    text-align: left;
    margin-top: 10px;
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





.img1-1-div{
    height:360px;
    width:480px;
    overflow: hidden;
    border-radius: 10px;
}
.img1-1{
    width:500px;
}

.img-div-for2{
    width: 480px;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
}
.img2-12-div{
    height:100%;
    width:50%;
    overflow: hidden;
    float: left;
}
.img2-1{
    width: 100%;
    height: 100%;
}
.img2-2{
    width: 100%;
    height: 100%;
}

.img-div-for3{
    width: 480px;
    height: 320px;
    overflow: hidden;
    border-radius: 10px;
}
.img3-1-div{
    height:100%;
    width:67%;
    overflow: hidden;
    float: left;
}
.img3-1{
    width:100%;
    height: 100%;
}
.img3-23-div{
    height:50%;
    width:33%;
    overflow: hidden;
    float: left;
}
.img3-23{
    height:100%;
    width:100%;
}

.img-div-for4{
    width: 480px;
    height: 360px;
    overflow: hidden;
    border-radius: 10px;
}
.img4-1-div{
    height:100%;
    width:75%;
    overflow: hidden;
    float: left;
}
.img4-1{
    width:100%;
    height:99%;
}
.img4-234-div{
    height:33%;
    width:25%;
    overflow: hidden;
    float: left;
}
.img4-234{
    height:100%;
    width:100%;
}

.button-div{
    float: left;
    width:480px;
    height:auto;
    margin-top:5px;
    margin-bottom: 20px;
    text-align: center;
}
.button-div:hover{
    cursor: pointer;
}

.comment-div{
    float: left;
    width:120px;
    height:auto;
    background-color: rgb(184, 124, 47);
}
.share-div{
    float: left;
    width:120px;
    height:auto;
    background-color: yellowgreen;
}
.likes-div{
    float: left;
    width:120px;
    height:auto;
    background-color: violet;
}
.message-div{
    float: left;
    width:120px;
    height:auto;
    background-color: beige;
}



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
    background-color: aquamarine;
}
.send-comm-input{
    width:80%;
    background-color: aquamarine;
}
.send-comm-button{
    width:18%;
    background-color: aquamarine;
}
.comm-avt-div{
    float: left;
    width: 12%;
    margin-top:15px;
    background-color: aquamarine;
    overflow: hidden;
}
.comm-useravt{
}
.comm-content-div{
    float: left;
    width:86%;
    margin-top:15px;
    background-color:rgb(99, 80, 53);
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




<style scoped>
#share-page{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    opacity: 0.3;
    background-color: rgb(180, 220, 220);
}
#share-dialog{
    position:absolute;
    z-index:9999;
    background-color: aquamarine;
}
</style>




<template>
    <div id="tweets">
        <div v-show="showSharePage" id="share-page" v-bind:style='{"height":sharePageHeight,"width":sharePageWidth}'>
            
        </div>
        <div v-show="showSharePage" id="share-dialog" ref="sharedialog">
                <div>转发微博</div>
                <div>
                    <form action="localhost:8080" method="get">
                        <input class="share-text-inputer" type="text">
                        <input class="share-button" type="submit" value="发表你的评论">
                    </form>
                </div>
            </div>

        <div v-if="showBigImage"></div>





            <div class='tweet-items' v-for="(item,index) in items">
                <div class="twi-left">
                    <div class="user-avatar-div">
                    <img class="user-avatar" :src="item.useravt" alt="no">
                    </div>
                </div>
                <div class="twi-right">
                    <div class="twi-right-top-div">
                        <div class="user-name">{{item.username}}</div>
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
                            <Button type="primary" size="20" class="follow-button" v-if="item.followbyuser==false">关注</Button>
                            <Button type="primary" size="20" class="follow-button-alt" v-if="item.followbyuser">已关注</Button>
                        </div>
                        
                    </div>
                    <div class="twi-text">
                        {{item.text}}
                    </div>
                    <div class="twi-img" v-if="item.imgs.length==1">
                        <div class="img1-1-div">
                            <img class="img1-1" v-bind:src="item.imgs[0]" alt="1-1">
                        </div>
                    </div>
                    <div class="twi-img" v-else-if="item.imgs.length==2">
                        <div class="img-div-for2">
                            <div class="img2-12-div">
                                <img class="img2-1" v-bind:src="item.imgs[0]" alt="2-1">
                            </div>
                            <div class="img2-12-div">
                                <img class="img2-2" v-bind:src="item.imgs[1]" alt="2-2">
                            </div>
                        </div>
                    </div>
                    <div class="twi-img" v-else-if="item.imgs.length==3">
                        <div class="img-div-for3">
                            <div class="img3-1-div">
                                <img class="img3-1" v-bind:src="item.imgs[0]" alt="3-1">
                            </div>
                            <div class="img3-23-div">
                                <img class="img3-2" v-bind:src="item.imgs[1]" alt="3-2">
                            </div>
                            <div class="img3-23-div">
                                <img class="img3-3" v-bind:src="item.imgs[2]" alt="3-3">
                            </div>
                        </div>
                    </div>
                    <div class="twi-img" v-else-if="item.imgs.length==4">
                        <div class="img-div-for4">
                            <div class="img4-1-div">
                                <img class="img4-1" v-bind:src="item.imgs[0]" alt="4-1">
                            </div>
                            <div class="img4-234-div">
                                <img class="img4-234" v-bind:src="item.imgs[1]" alt="4-2">
                            </div>
                            <div class="img4-234-div">
                                <img class="img4-234" v-bind:src="item.imgs[2]" alt="4-3">
                            </div>
                            <div class="img4-234-div">
                                <img class="img4-234" v-bind:src="item.imgs[3]" alt="4-4">
                            </div>
                        </div>
                    </div>

                    <div class="button-div">
                        <div class="comment-div" @click="showComment(item)">
                            <Icon type="ios-chatboxes-outline" size="24"></Icon>
                            <span>{{item.commentnum}}</span>
                        </div>
                        <div class="share-div" @click="share(item)">
                            <Icon type="ios-share-alt-outline" size="24"></Icon>
                            <span>{{item.sharenum}}</span>
                        </div>
                        <div class="likes-div" @click="like(item)">
                            <Icon type="ios-heart-outline" size="24" v-if="item.likebyuser==false"></Icon>
                            <Icon type="ios-heart" size="24" v-if="item.likebyuser"></Icon>
                            <span>{{item.likesnum}}</span>
                        </div>
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
                    <div v-for="comm in item.comments">
                        <div class="comm-avt-div">
                            <Avatar v-bind:src="comm.useravt" class="comm-useravt"></Avatar>
                        </div>
                        <div class="comm-content-div">
                            <div class="comm-name-div">
                                {{comm.username}}
                            </div>
                            <div class="comm-text-div">
                                {{comm.text}}
                            </div>
                            <div class="comm-time-div" >
                                {{comm.time}}
                            </div>
                        </div>
                    </div>
                </div>
                <p class="item-divider">——————————————————————————————————————————————————</p>
            </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name:'twitter-items',
    props:{
        type:"",
        topic_id:""
    },
    data(){
        return {
            items:[],
            datas:"",
            showSharePage:false,
            itemToShare:Object,
            sharePageHeight:"900px",
            sharePageWidth:"1000px",
            shareDialogLeft:"200px",
            shareDialogTop:"200px",
            
            showBigImage:false,
            BigImageSource:"",


            burl:"http://localhost:12293/",
        }
    },
    methods:{
        generateData(){
            //取数据
            if(this.type=="explore"){
                let getData = {
                    startFrom: 0,
                    limitation: 10,
                }
                axios.get(
                    'http://localhost:12293/api/Topic/queryTopicsBaseOnHeat',getData
                    ).then(Response=>{
                    console.log(Response);
                    });
                //先用数据测试
                this.datas= ['{"twiid":1,"userid":230,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","followbyuser":false,"text":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","imgs":["http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"commentnum":4,"sharenum":34,"likesnum":60,"collectbyuser":true,"likebyuser":false}',
                            '{"twiid":2,"userid":233,"username":"hey","useravt":"http://106.14.3.200:8090/bgimg.jpeg","followbyuser":true,"text":"哦噢噢噢噢哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦","imgs":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg"],"collectnum":5,"commentnum":4,"sharenum":34,"likesnum":60,"collectbyuser":true,"likebyuser":true}',
                            '{"twiid":3,"userid":666,"username":"heyy","useravt":"http://106.14.3.200:8090/bgimg.jpeg","followbyuser":true,"text":"哦","imgs":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"commentnum":4,"sharenum":34,"likesnum":60,"collectbyuser":true,"likebyuser":false}',
                            '{"twiid":4,"userid":213,"username":"hello","useravt":"http://106.14.3.200:8090/bgimg.jpeg","followbyuser":false,"text":"我要发4张图片","imgs":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"commentnum":4,"sharenum":34,"likesnum":60,"collectbyuser":true,"likebyuser":false}',
                            ];
                for (let i=0;i<this.datas.length;i++){
                    let temp=JSON.parse(this.datas[i]);
                    temp.ifShowComment=false;
                    temp.comments=[];
                    //伪造评论
                    let commStr=['{"commid":1,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊哦","time":"2019-4-3 19:40"}',
                    '{"commid":2,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","time":"2019-4-3 19:40"}',
                    '{"commid":3,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊","time":"2019-4-3 19:40"}',
                    '{"commid":4,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","time":"2019-4-3 19:40"}'];
                    for (let j=0;j<commStr.length;j++){
                        temp.comments.push(JSON.parse(commStr[j]));
                    }
                    this.items.push(temp);
                }
            }
            else if(this.type=="topic"){
                let getData = {
                    startFrom: 0,
                    limitation: 10,
                }
                axios.get(
                    'http://localhost:12293/api/Topic/queryMessageIdsContains/'+this.topic_id,getData
                    ).then(Response=>{
                    console.log(Response);
                    });
            }
            else if(this.type=="home"){
                let postData = {
                    startFrom: 0,
                    limitation: 10,
                }
                axios.post(
                    'http://localhost:12293/api/Message/queryForIndex',postData
                ).then(Response=>{
                    console.log(Response);
                });
            }
            //console.log("asdads",this.items[0]);
        },
        //辅助函数，判断是不是这个浏览器cookies里用户的推特
        ifBeMyTwi(item){
            let myId=document.cookie;
            if(item.userid==233){
                return true;
            }
            else{
                return false;
            }
        },
        //关注谁谁
        follow(item){

        },
        //显示或关闭评论
        showComment(item){
            if (item.ifShowComment==false){
                item.ifShowComment=true;
            }
            else{
                item.ifShowComment=false;
            }
        },
        //展示转发的覆盖页
        share(item){
            this.showSharePage=true;
            this.itemToShare=item;
            let h=document.documentElement.offsetHeight;
            let w=document.documentElement.offsetWidth;
            this.sharePageHeight=h.toString()+"px";
            this.sharePageWidth=(2*w).toString()+"px";
        },
        //关掉转发的覆盖页
        closeSharePage(){
            this.showSharePage=false;
        },
        //点赞
        like(item){
            if (item.likebyuser==true){
                axios.get(
                    'http://localhost:12293/api/Like/cancel'+item.twiid
                ).then(Response=>{
                    console.log(Response);
                    //直接修改心为黑
                    item.likebyuser=false;
                    //成功发送了点赞
                    if (Response.data.code==200){
                        //播放动画？
                    }
                    //失败了要改回红的心
                    else{
                        window.alert("发送失败");
                        item.likebyuser=true;
                        //改回空的心
                    }
                });
            }
            else{
                axios.get(
                    'http://localhost:12293/api/Like/'+item.twiid
                ).then(Response=>{
                    console.log(Response);
                    //直接修改心为红
                    item.likebyuser=true;
                    //成功发送了点赞
                    if (Response.data.code==200){
                        //播放动画？
                    }
                    //失败了要改回空的心
                    else{
                        window.alert("发送失败");
                        item.likebyuser=false;
                        //改回空的心
                    }
                });
            }
        },
        //发私信
        sendMessage(item){
            console.log("私信");

        },
        //删除自己的推特
        delTwi(item){
            console.log("删除",item.text);
        },
        //拉黑用户
        blockUser(item){
            console.log("拉黑",item.userid);
        }
    },
    created(){
        this.generateData();
    },
    beforeMount() {
    },
}
</script>