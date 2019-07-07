<style scoped>

.share-div{
    float: left;
    width:120px;
    height:auto;
    background-color: yellowgreen;
    text-align: center;
}

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
<div>

    <div v-show="showSharePage" id="share-page" v-bind:style='{"height":sharePageHeight,"width":sharePageWidth}'>
    </div>
    
    <div v-show="showSharePage" id="share-dialog" ref="sharedialog">
        <div>转发微博</div>
        <Icon type="ios-close" @click="closeSharePage()"></Icon>
        <div>
            <form action="localhost:8080" method="get">
                <input class="share-text-inputer" type="text">
                <input class="share-button" type="submit" value="发表你的评论">
            </form>
        </div>
    </div>


    <div class="share-div" @click="share()">
        <Icon type="ios-share-alt-outline" size="24"></Icon>
        <span>{{shareNum}}</span>
    </div>

</div>
</template>


<script>
export default {
     props:{
        shareNum:Number,
        twiId:Number,
    },
    data(){
        return {
            showSharePage:false,
            sharePageHeight:"900px",
            sharePageWidth:"1000px",
            shareDialogLeft:"200px",
            shareDialogTop:"200px",
        }
    },
    methods:{
        //展示转发的覆盖页
        share(){
            this.showSharePage=true;
            let h=document.documentElement.offsetHeight;
            let w=document.documentElement.offsetWidth;
            this.sharePageHeight=h.toString()+"px";
            this.sharePageWidth=(w).toString()+"px";
        },
        //关掉转发的覆盖页
        closeSharePage(){
            this.showSharePage=false;
        },
        
    }
    
}
</script>

