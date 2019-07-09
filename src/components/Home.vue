<style scoped>


.center-fix{
	position: fixed;/*固定位置*/
	z-index:99;/*设置优先级显示，保证不会被覆盖*/	
  margin:auto;
left:0;
right:0;
top:0;
bottom:0;
}
.PostSenderContainer {
  width:100%;
  border: 1px solid #e6ecf0;
  background-color: #E8F5FD;
  padding: 10px 12px;
  display: flex;
}

.EditerContainer {
  position: relative;
  left: 32px;
  width: 80%;
  line-height: 20px;
}

.Editer {
  position: relative;
  width: 90%;
  color: #1DA1F2;
  background: #fff;
  border: 1px solid #C6E7FB;
  border-radius: 8px;
  padding: 8px;
  word-wrap: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  letter-spacing: 0.03em;
  cursor: text;
}

.Editer:focus {
  outline: none;
  height: 100px;
  max-height: none;
  word-wrap: break-word;
  overflow-y: scroll;
  white-space: normal;
}

.Editer:empty:focus:before {
  content: attr(default-txt);
  display: block;
  color: #aab8c2;
  position: relative;
}

.PostBtn {
  margin: 5px 200px;
  border: 1px solid #1da1f2;
  color: #fff;
  background-color: #4AB3F4;
  padding: 2px 12px;
  font-size: 14px;
  border-radius: 100px;
  display: block;
}

.PostBtn.hide {
  display: none
}

ul li{
  list-style-type: none;
}
  #root-div{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgb(230, 236, 240);
    overflow: auto;
  }
   #left-container{
     float:left;
    width: 20%;
    background-color: white;
    margin-left: 150px;
    margin-top: 70px;
  }
  #left-container1{
    background-color: white;
  }
   #left-container2{
    background-color: white;
    margin-top: 10px;
  }
  #middle-container{
    float:left;
    width: 40%;
    background-color: white;
    margin-left: 10px;
    margin-top: 70px
  }
  #middle-container1{
    margin-top: 0px;

  }
  #middle-container2{
    margin-top: 0px;
  }
  #right-container{
    float: left;
    width: 20%;
    background-color: white;
    margin-left: 10px;
    margin-top: 70px
  }
  .infor-avatar{
    margin-top: 10px;
    margin-left: 15px;
    margin-bottom: 5px
  }



  /* -------------------------------------------------------------------------------- */
  .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    /* ----------------------------------------------------------------- */
</style>

<template >
  <div id='root-div'>

  

        <center>
        <loadingAnimate v-if="sendingTwitter" class="center-fix"/>
        </center>
        <loadingAnimate v-if="loading" style="margin-left:auto;margin-right:auto;margin-top:48px;"/>

    <div id=left-container>
     <ElContainer id = 'left-container1' style="background-color:#1DA1F2;">
       <Avatar v-bind:src=address shape="circle" on-error="" size="large" style="height:60px; width:60px; border-radius:50%;margin-left:10%;margin-top:20%;"/>
       <span style="margin-top:80px;margin-left:10px;font-weight:bold;font-size:20px;">
         {{userName}}
       </span>
       <br><br><br><br><br><br><br><br>
     </ElContainer>



     <ElContainer id = 'left-container2' >
       <Trends></Trends>
     </ElContainer>


    </div>

    <div id="middle-container">
     <ElContainer  id="middle-container1" >
        

        <div class="PostSenderContainer">
         <Avatar :src=address shape="circle" on-error="" size="large" style="width:50px;height:50px;border-radius:50%;margin-left:10px;margin-top:10px;"/>
          
          <div class="EditerContainer" style="margin-left:-5px;">
            <!--
              <div class="Editer" default-txt="What happens?" contenteditable @click.prevent="clickEditor" v-bind:focus="isEditerFocused" @input="editerInputEventHandler">
                What happens?
              </div>-->
            <Input :ref="'editor'" :rows="editor_content.length > 0 ? 4 : 1" v-model="editor_content" v-bind:maxlength="140" type="textarea" placeholder="Enter something..." 
            @v-bind:focus="isEditerFocused" @focus="editerFocusEventHandler"  @blur="editerBlurEventHandler" />
            <!-----TODO:AddPicture--- ----------------------------------------------->
            <div style="margin-top:5px;">
            <div v-show="editor_content.length > 0" style="float:left;" >
              <div class="demo-upload-list" v-for="item in uploadList">
                <template>
                  <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
              </div>
              <Upload 
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action=""
                style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
              </Upload>
              </div>
              <Modal title="View Image" v-model="visible">
                <img :src="img_preview" v-if="visible" style="width: 100%">
              </Modal>
            </div>
    
            <!-- sdadasdasdasdsad ---------------------------------------------------------------------------->
            <Button type="primary" size="large" shape="circle" :disabled="!editor_content.length" v-show="editor_content.length > 0" @click="sendPostBtnClickEventHandler" @focus="editerFocusEventHandler" @blur="editerBlurEventHandler" style="float:right;margin-top:10px;margin-right:20px;">Tweet</button>
          </div>

        </div>


     </ElContainer>
     
     <ElContainer  id="middle-container2" >
       <!--
       <div style="padding-top:10%;
       padding-left:20%;
       padding-bottom:10%;
       padding-right:20%;">
         <span style= "font-weight:bold;font-size:26px;">What? No Tweets yet?</span><br>
         <span style= "font-size:16px;font-color:#657180;">This empty timeline won’t be around for long. Start following people and you’ll see Tweets show up here.</span>
         <br><br><br>
       </div>
       -->

      <tweets type="home" style="width:100%;">
      </tweets>

     </ElContainer>
    </div>

      <ElContainer id="right-container" >
        <whoToFollows></whoToFollows>
      </ElContainer>
  </div>
</template>
<script>
  import axios from "axios"
  axios.defaults.withCredentials = true;
  import loadingAnimate from "./animate/loading"
  import Tweets from "./Subs/Tweets"
  import Trends from "./Subs/Trends"
  import whoToFollows from "./Subs/whoToFollows"
  export default {
    name:'Home',
    
    data(){
      return{
        sendingTwitter: false,
        editor_content:"",
        visible:false,
        img_preview:"",
        uploadList: [],
        loading:true,
        userName: "username",
        sites: [
          { name: 'Runoob' },
          { name: 'Google' },
          { name: 'Taobao' }
        ],
        informationList:[
        ],
        isEditerFocused: false,
        contentEl: null,
        inputContent: '',
        address: "http://localhost:12293/avatars/0.jpg",
      }
    },
    components:{
      loadingAnimate,
      "tweets":Tweets,
      Trends,whoToFollows
    },
    mounted(){
      this.loading = true;
      this.isEditerFocused = true;
      //this.loading=true;
      var userID = this.getCookies("userID")
      console.log("登录：", userID)
      //let userID=user.userID
      //使用cookie
      this.uploadList = this.$refs.upload.fileList;
      
        
        //nickname
        try{
          console.log(userID)
          this.getUserPublicInfo(userID).then(Response=>{
            console.log(Response)
          if(Response.data.code==200 && Response.data.message=="success")
            {
              this.loading=false;
              this.userName = Response.data.data.nickname
              console.log(this.userName)
            }
            else{
              this.loading=false;
              console.log("fail")
              this.userName="userName"
            }
            
          })
        }
        catch(e){
            this.loading=false;
            return {
          result: false,
          errMsg: "Can't connect with server"
        };
        }
   
    
        
        
        
    
    },
    methods:{
      flashCom()
      {
        this.$router.go(0);  
      },
      uploadTapped(){
        console.log("调用uploadTapped");
        this.isEditerFocused = true;
      },
      handleView (url) {
                this.img_preview = url;
                this.visible = true;
      },
      handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
                file.url = '';
                file.name = '';
      },
      handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
      },
      handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
      },
      handleBeforeUpload (file) {
              
                const check =  this.$refs.upload.fileList.length < 4;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to four pictures can be uploaded.'
                    });
                }else{
                  let _this = this
                  let reader = new FileReader()
                  reader.readAsDataURL(file) // 这里是最关键的一步，转换就在这里
                  reader.onloadend = function () {
                    file.url = this.result
                    _this.$refs.upload.fileList.push(file);
                  }
                  
                }
                console.log("handleBeforeUpload");
                return check;
      },
      editerFocusEventHandler (e) {
        this.isEditerFocused = true
        this.contentEl = e.target
        console.log("Focus");
        if (e.target.innerText.trim() === e.target.getAttribute('default-txt')) {
          e.target.innerText = ''
        }
      },
      editerBlurEventHandler (e) {
      this.isEditerFocused = false
      console.log("Blur");
      if (!e.target.innerText.trim()) {
        e.target.innerText = e.target.getAttribute('default-txt')
      }
    },
    editerInputEventHandler (e) {
      this.inputContent = e.target.innerText.trim()
    },
    getCookies(a){
      return this.getCookie(a)
    },

    tapTopic(topic){
      console.log("测试点击 topic_id:", topic);
      this.$router.push({path:'/Topic', query: { topic_id:topic.topic_id,topic_name:topic.topic_content }})
      //TODO 点击热点之后跳转
    },

    sendPostBtnClickEventHandler(){
      this.sendingTwitter = true;
      console.log("点击发送推特", this.editor_content, this.uploadList);
      var formData = new FormData();
      formData.append("message_content", this.editor_content);
      formData.append("message_has_image", this.uploadList.length > 0 ? 1 : 0);
      formData.append("message_image_count", this.uploadList.length);
      for(let i = 0; i < this.uploadList.length; i++){
        formData.append("file"+i, this.uploadList[i]);
      }
      this.sendMessage(formData).then(response=>{
        setTimeout(()=>{this.sendingTwitter = false;}, 2000);
        //this.sendingTwitter = false;
        console.log(response);
        if(response.data.message == "success"){
          this.editor_content = "";
          this.uploadList = [];
        }
      })
      this.$router.go(0)
    }
      
    }
  }
</script>
