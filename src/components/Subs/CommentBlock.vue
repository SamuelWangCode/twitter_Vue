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
        ifShowComment:false,
        comments:Array,
    },
    data(){
        return {
            TwiId:Number,
        }
    },
    methods:{
        
    },
}
        
</script>
