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
    right:-500px;
    padding:0px;
}
.item-menu:hover ul{
    right:auto;
}
.item-menu li{
    background-color: beige;
    width: 80px;
    list-style-type: none;
}
.item-menu li:hover{
    background-color: rgb(119, 119, 55);
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
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 20px;
    padding-top: 20px;
    background-color: aqua;
}
.send-comm-div{
    width:100%;
    margin-bottom: 20px;
}
.send-comm{
    width:80%;
}
.send-comm-button{
    width:18%
}
.comm-avt-div{
    float: left;
    width: 8%;
}
.comm-content-div{
    float: left;
    width:90%;
    margin-top: 10px;
}

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
                                <li>我的推特</li>
                                <li>可以删除</li>
                            </ul>
                            <ul v-if="ifBeMyTwi(item)==false">
                                <li>不是我的推特</li>
                                <li>这个用户可以拉黑</li>
                            </ul>
                        </div>
                        <div class="follow-button-div" @click="follow(item)">
                            <button class="follow-button">关注</button>
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
                            <Icon type="ios-heart-outline" size="24"></Icon>
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
                            <input class="send-comm" type="text">
                            <input class="send-comm-button" type="submit" value="发表你的评论">
                        </form>
                    </div>
                    <div v-for="comm in item.comments">
                        <div class="comm-avt-div">
                            <Avatar v-bind:src="comm.useravt"></Avatar>
                        </div>
                        <div class="comm-content-div">
                            <div class="comm-name">
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
export default {
    name:'twitter-items',
    props:{
        url:String,
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
        }
    },
    methods:{
        generateData(){
            this.datas= ['{"twiid":1,"userid":230,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","imgs":["http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"commentnum":4,"sharenum":34,"likesnum":60,"collectbyuser":true,"likebyuser":false}',
                        '{"twiid":2,"userid":233,"username":"hey","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"哦噢噢噢噢哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦","imgs":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg"],"collectnum":5,"commentnum":4,"sharenum":34,"likesnum":60,"collectbyuser":true,"likebyuser":false}',
                        '{"twiid":3,"userid":666,"username":"heyy","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"哦","imgs":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"commentnum":4,"sharenum":34,"likesnum":60,"collectbyuser":true,"likebyuser":false}',
                        '{"twiid":4,"userid":213,"username":"hello","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"我要发4张图片","imgs":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"commentnum":4,"sharenum":34,"likesnum":60,"collectbyuser":true,"likebyuser":false}',
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
            //console.log("asdads",this.items[0]);
        },
        ifBeMyTwi(item){
            let myId=document.cookie;
            if(item.userid==233){
                return true;
            }
            else{
                return false;
            }
        },
        follow(item){

        },
        showComment(item){
            if (item.ifShowComment==false){
                item.ifShowComment=true;
            }
            else{
                item.ifShowComment=false;
            }
        },
        share(item){
            this.showSharePage=true;
            this.itemToShare=item;
            let h=document.documentElement.offsetHeight;
            let w=document.documentElement.offsetWidth;
            this.sharePageHeight=h.toString()+"px";
            this.sharePageWidth=(2*w).toString()+"px";
        },
        closeSharePage(){
            this.showSharePage=false;
        },
        like(item){
            console.log("like",twiId);
        },
        sendMessage(item){
            console.log()
        },
        
    },
    created(){
        this.generateData();
    },
    beforeMount() {
    },
}
</script>