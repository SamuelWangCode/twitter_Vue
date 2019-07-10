<style scoped>

/*.share-div{*/
/*  float: left;*/
/*    width:20%;*/
/*    height:40px;*/
/*    text-align: center;*/
/*}*/
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
    height: 220px;
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
    
    <!--
    <div v-show="showSharePage" id="share-dialog" ref="sharedialog">
        <div class="share-block-title">转发微博
            <Icon class="close-icon" type="ios-close" size="30" @click="closeSharePage()"></Icon>
        </div>
        <div>
            <Input type="textarea" :rows="4" style="height: 100px;width: 90%;margin:5%;  font-size:20px;" v-model="shareText"/>
            <Button class="send-share-button" type="primary" @click="share()">发送</Button>
            <Button class="cancel-share-button" type="primary" @click="closeSharePage()">取消</Button>
        </div>
    </div>
    -->

    <Modal
        v-model="showSharePage"
        title="Share"
        :loading="loading"
        @on-ok="share">
        <Input type="textarea" :maxlength="140" :rows="4" style="height: 100px;width: 90%; margin:5%; font-size:20px;" v-model="shareText"/>
    </Modal>


    <div class="share-div" @click="doShowSharePage()">
        <Icon style="float:left;" v-if="shared==false" type="ios-share-alt-outline" size="24"></Icon>
        <Icon style="float:left;" v-else type="ios-share-alt" size="24"></Icon>
        <span style="float:left;">{{shareNum}}</span>
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
            loading: true,
            showSharePage:false,
            sharePageHeight:"",
            sharePageWidth:"",
            shareText:"",
            shareNum:0,
            shared:false,
        }
    },
    methods:{
        //转发
        share(){ 
            if(!this.shareText)
            {
                this.$Notice.error({
                 title: "You should enter something to share.",
                desc:''
                })
                this.loading=false
                return 
            }
            let formData={
                message_content:this.shareText,
                message_transpond_message_id:this.item.message_id,
            }
            console.log(formData);
            //调用接口上传数据
            this.transpond(formData).then(Response=>{
                this.shareNum+=1;
                if(Response.data.message=="success"){
                    this.$Notice.success({
                 title: "Share success!.",
                desc:''
                })
                    this.shared=true;
                    this.$router.go(0)
                }
                else{
                    this.shareNum-=1;
                    this.shared=false;
                    alert("Share failed");
                }
                console.log("close")
                this.closeSharePage();
            });
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
        this.shareNum=this.item.message_transpond_num;
    },
    mounted(){
        
    }
    
}
</script>

