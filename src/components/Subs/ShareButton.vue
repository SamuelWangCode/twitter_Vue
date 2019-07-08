<style scoped>

.share-div{
    width:100%;
    height:auto;
    text-align: center;
}
.share-div:hover{
    cursor: pointer;
}

#share-page{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    opacity: 0.3;
    background-color: rgb(210, 220, 220);
}
#share-dialog{
    width:33%;
    height: 300px;
    background-color: #fff;
    left: 33%;
    top: 100px;
    position:fixed;
    z-index:9999;

    box-shadow: #c7c7c7 0px 0px 8px;
    border-radius: 10px;
    overflow: hidden;

}

.share-block-title{
    float: left;
    width: 100%;
    text-align: center;
    font-size: 20px;
    background-color: #2c3e50;
  color: white;
}
.close-icon{
    float: right;
  background-color: #2c3e50;
}
/*
.share-text-inputer{
  width: 90%;
    margin:5%;
  font-size:20px;
}
*/
.send-share-button{
    width: 20%;
    float: left;
    margin-left: 20%;
}
.cancel-share-button{
    width: 20%;
    float: right;
    margin-right: 20%;
}
</style>


<template>
<div>

    <div v-show="showSharePage" id="share-page" v-bind:style='{"height":sharePageHeight,"width":sharePageWidth}'>
    </div>
    
    <div v-show="showSharePage" id="share-dialog" ref="sharedialog">
        <div class="share-block-title">转发微博
            <Icon class="close-icon" type="ios-close" size="30" @click="closeSharePage()"></Icon>
        </div>
        <div>
            <input type="textarea":rows="4" style="height: 100px;width: 90%;margin:5%;  font-size:20px;" v-model="shareText">
            <Button class="send-share-button" type="primary" @click="share()">发送</Button>
            <Button class="cancel-share-button" type="primary" @click="closeSharePage()">取消</Button>
        </div>
    </div>


    <div class="share-div" @click="doShowSharePage()">
        <Icon type="ios-share-alt-outline" size="24"></Icon>
        <span>{{item.message_transpond_num}}</span>
    </div>

</div>
</template>


<script>
export default {
     props:{
        item:Object,
    },
    data(){
        return {
            showSharePage:false,
            sharePageHeight:"",
            sharePageWidth:"",
            shareText:"",
        }
    },
    methods:{
        //转发
        share(){ 
            let formData={
                message_content:this.shareText,
                message_source_is_transpond:this.item.message_is_transpond,
                message_transpond_message_id:this.item.message_id,
            }
            this.transpond(formData);
        },
        //展示转发的覆盖页
        doShowSharePage(){
            let h=document.documentElement.offsetHeight;
            let w=document.documentElement.offsetWidth;
            this.sharePageHeight=h.toString()+"px";
            this.sharePageWidth=w.toString()+"px";
            
            this.showSharePage=true;
        },
        //关掉转发的覆盖页
        closeSharePage(){
            this.showSharePage=false;
        },
        
    },
    created(){
            
    },
    mounted(){
        
    }
    
}
</script>

