<style scoped>

.message-div{
    /* width:105%; */
    height:auto;
    text-align: left;
}
.message-div:hover{
    cursor: pointer;
}

#message-page{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    opacity: 0.3;
    background-color: rgb(210, 220, 220);
}
#message-dialog{
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

.message-block-title{
    float: left;
    width: 100%;
    text-align: center;
    font-size: 20px;
    background-color: #2c3e50;
    color:white;
}
.close-icon{
    float: right;
}
.message-text-inputer{
    width: 90%;
    margin:5%;
}
.send-message-button{
    width: 20%;
    float: left;
    margin-left: 20%;
}
.cancel-message-button{
    width: 20%;
    float: right;
    margin-right: 20%;
}
</style>

<template>
<div>
    <div v-show="showPage" id="message-page" v-bind:style='{"height":pageHeight,"width":pageWidth}'>
    </div>
  <Modal
    v-model="showPage"
    title="Message"
    :loading="loading"
    @on-ok="message()">
    <Input type="textarea" :maxlength="140" :rows="4" style="height: 100px;width: 90%; margin:5%; font-size:20px;" v-model="text"/>
  </Modal>
  <!--
    <div v-show="showPage" id="message-dialog">
        <div class="message-block-title">发送私信
            <Icon class="close-icon" type="ios-close" size="30" @click="closePage()"></Icon>
        </div>
        <div >
            <input class="message-text-inputer" type="textarea" maxlength="140" :rows="4" style="height: 100px;width: 90%; margin:5%; font-size:20px;" v-model="text">
            <Button class="send-message-button" type="primary" @click="message()">发送</Button>
            <Button class="cancel-message-button" type="primary" @click="closePage()">取消</Button>
        </div>
        </div>
        -->


    <Button type="primary" class="message-div" shape="circle" @click="doShowPage()" style="font-weight: bold">Message</Button>
</div>
</template>



<script>
export default {
     props:{
        userId:Number,
    },
    data(){
        return {
            showPage:false,
            pageHeight:"",
            pageWidth:"",
            text:"",
        }
    },
    methods:{
        //转发
        message(){ 
            let data={
                private_letter_content:this.text,
            }
            this.sendPrivateLetter(this.userId,this.text
            ).then(Response=>{
            //成功发送了
                if (Response.data.code==200){
                    //播放动画？
                    this.$Notice.success({
              title: 'Send message success!',
              desc:''
            })
                    this.closePage();
                }
                else{
                    this.$Notice.error({
              title: 'You should say something.',
              desc:''
            })
                }
            });
        },
        //展示转发的覆盖页
        doShowPage(){
            let h=document.documentElement.offsetHeight;
            let w=document.documentElement.offsetWidth;
            this.pageHeight=h.toString()+"px";
            this.pageWidth=w.toString()+"px";
            this.showPage=true;
        },
        //关掉转发的覆盖页
        closePage(){
            this.showPage=false;
            this.text='';
        },
        
    },
    created(){
           
    }
    
}   
</script>
