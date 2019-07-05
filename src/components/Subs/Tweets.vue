<template>
    <div id="tweets">
            <div class='tweet-items' v-for="item in items">
                <div class="twi-left">
                    <Avatar class="user-avatar" :src="item.useravt" alt="no"></Avatar>
                </div>
                <div class="twi-right">
                    <div class="user-name">{{item.username}}</div>
                    <div class="twi-text">{{item.text}}</div>
                    <div class="twi-img" v-if="item.imgs.length==1">
                        <img id="img1-1" src="@/assets/timg.jpg" alt="1-1">
                    </div>
                    <div class="twi-img" v-else-if="item.imgs.length==2">
                        <img id="img2-1" src="@/assets/timg.jpg" alt="2-1">
                        <img id="img2-2" src="@/assets/timg.jpg" alt="2-2">
                    </div>
                    <div class="twi-img" v-else-if="item.imgs.length==3">
                        <img id="img3-1" src="@/assets/timg.jpg" alt="3-1">
                        <img id="img3-2" src="@/assets/timg.jpg" alt="3-2">
                        <img id="img3-3" src="@/assets/timg.jpg" alt="3-3">
                    </div>
                    <div class="twi-img" v-else-if="item.imgs.length==4">
                        <img id="img4-1" src="@/assets/timg.jpg" alt="4-1">
                        <img id="img4-2" src="@/assets/timg.jpg" alt="4-2">
                        <img id="img4-3" src="@/assets/timg.jpg" alt="4-3">
                        <img id="img4-4" src="@/assets/timg.jpg" alt="4-4">
                    </div>
                    <div>
                        <div class="comment-div" @click="showComment(item.twiid)">
                            <span>comment</span>
                            <span>{{item.commentnum}}</span>
                        </div>
                        <div class="share-div" @click="share(item.twiid)">
                            <span>share</span>
                            <span>{{item.sharenum}}</span>
                        </div>
                        <div class="likes-div" @click="like(item.twiid)">
                            <span>likes</span>
                            <span>{{item.likesnum}}</span>
                        </div>
                        <div>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div class="show-comment" v-show="item.ifShowComment">
                    <div v-for="comm in item.comments">
                        <div>
                            1tiaopinglun
                        </div>
                    </div>
                </div>
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
        }
    },
    methods:{
        generateData(){
            this.datas= ['{"twiid":1,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊","imgs":["1"],"commentnum":4,"sharenum":34,"likesnum":60}',
                        '{"twiid":2,"username":"hey","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"哦","imgs":["1","2"],"commentnum":4,"sharenum":34,"likesnum":60}',
                        '{"twiid":3,"username":"heyy","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"哦","imgs":["1","2","3"],"commentnum":4,"sharenum":34,"likesnum":60}',
                        '{"twiid":4,"username":"hello","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"我他妈要发4张图片","imgs":["1","2","3","4"],"commentnum":4,"sharenum":34,"likesnum":60}',
                        ];
            for (let i=0;i<this.datas.length;i++){
                let temp=JSON.parse(this.datas[i]);
                temp.ifShowComment=false;
                temp.comments=[];
                this.items.push(temp);
                
                
            }
            console.log("asdads",this.items[0]);
        },
        showComment(twiId){
            console.log("showComment",twiId);
        },
        share(twiId){
            console.log("share",twiId);
        },
        like(twiId){
            console.log("like",twiId);
        }
    },
    created(){
        this.generateData();
    },
    beforeMount() {
    },
}
</script>
<style scoped>
.tweet-items{
    background-color: rgb(153, 107, 107);
    margin:5px;
    text-align: left;
}
.twi-left{
    float: left;
    width: 8%;
    background-color: aquamarine;
    height: 100%;
}
.twi-right{
    float: left;
    width: 90%;
    margin-left: 2%;
    background-color: cadetblue;
}
.user-avatar{
    background-color: aqua;
}
.user-name{
    font-weight:bold;
}
.twi-text{

}
#img1-1{
    width:100%;
}
#img2-1{
    width: 50%;
    float: left;
    margin-bottom: 5%;
}
#img2-2{
    width: 50%;
    float: left;
    margin-bottom: 5%;
}
#img3-1{
    width: 60%;
    float: left;
    margin-right: 3%;
    margin-bottom: 5%;
}
#img3-2{
    width: 33%;
    float: left;
}
#img3-3{
    width: 33%;
    float: left;
    margin-bottom: 5%;
}
#img4-1{
    width: 70%;
    float: left;
    margin-right: 1%;
}
#img4-2{
    width: 27%;
    float: left;
}
#img4-3{
    width: 27%;
    float: left;
}
#img4-4{
    width: 27%;
    float: left;
    margin-bottom: 5%;
}
.comment-div{
    float: left;
    background-color: antiquewhite;
}
.share-div{
    float: left;
    background-color: yellowgreen;
}
.likes-div{
    float: left;
    background-color: violet;
}
</style>

