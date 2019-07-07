<style scoped>
.comment-div{
    float: left;
    width:120px;
    height:auto;
    background-color: rgb(184, 124, 47);
    text-align: center;
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



<template>
<div>
    <div class="comment-div" @click="showComment(twiId)">
        <Icon type="ios-chatboxes-outline" size="24"></Icon>
        <span>{{commentsNum}}</span>
    </div>
    <div class="show-comment-div" v-show="ifShowComment">
        <div class="send-comm-div">
            <form action="localhost:8080" method="get">
                <input class="send-comm-input" type="text">
                <input class="send-comm-button" type="submit" value="发表你的评论">
            </form>
        </div>
        <div v-for="comm in comments">
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
            comments:[],
            ifShowComment:false,
        }
    },
    methods:{
        //显示或关闭评论
        showComment(){
            if (this.ifShowComment==false){
                this.ifShowComment=true;
            }
            else{
                this.ifShowComment=false;
            }
        },
        getComment(){
            let commStr=['{"commid":1,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊哦","time":"2019-4-3 19:40"}',
                    '{"commid":2,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","time":"2019-4-3 19:40"}',
                    '{"commid":3,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊","time":"2019-4-3 19:40"}',
                    '{"commid":4,"username":"hi","useravt":"http://106.14.3.200:8090/bgimg.jpeg","text":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","time":"2019-4-3 19:40"}'];
            for (let j=0;j<commStr.length;j++){
                this.comments.push(JSON.parse(commStr[j]));
            }
            
        }
    },
    created(){
        this.getComment();
    }
}
</script>

