<style scoped>
ul li {
  list-style-type: none;
}
#root-div {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgb(230, 236, 240);
  overflow: auto;
}
#middle-container {
  float: left;
  width: 70%;
  background-color: white;
  margin-left: 15%;
  margin-top: 70px;
}
.header-left-align {
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  padding-top: 15px;
  padding-left: 15px;
}
#chat-container {
  line-height: 15px;
  margin-bottom: 10px;
  text-align: left;
}
#chat-name
{
  color: #333333;
  margin-left: 10px;
  font-size: 20px;
}
#chat-content {
  margin-left: 30px;
  color: #657786;
  margin-top: 18px;
  font-size: 15px;
  width:400px;
}
</style>

<template>

  <div id="root-div">
    <div v-if="visible">
    <wxChat 
      ref="subChat"
      @closeChat="closeChat"
      :sendPrivateLetter="send"
      :data="wxChatData"
      :showShade="true"
      contactNickname="聊天"
      :getUpperData="getUpperData"
      :getUnderData="getUnderData"
      :ownerAvatarUrl="ownerAvatarUrl"
      :maxHeight=400
      :contactAvatarUrl="contactAvatarUrl"
      :contact_user_id="chating_contact_user_id"
      :my_user_id="chating_my_user_id"
      :width="chatWidth">
    </wxChat>
    </div>
    


    <ElContainer id="middle-container">
      <el-header class="header-left-align">Message</el-header>
      <Divider />
      <ul>
        <ElContainer id="chat-container"  v-for="contact in contactList"  :key="contact.private_letter_id">
          <el-container>
            <div style="margin-left: 10px">
              <a>
                <Avatar
                  :src="contact.sender_info.avatar_url"
                  style="margin-top: 10px;margin-left: 15px;margin-bottom: 1px;"
                  size="large"
                ></Avatar>
              </a>
            </div>
            <div>
              <div id="chat-content">
              <p style="font-size: 20px;">
              <a style="color: black">{{contact.sender_info.nickname}}</a>
              </p>
                <p style=" margin-top:2px;font-size: 15px">
              {{contact.private_letter_content}}
                </p>
              </div>
            </div>
            <div style="position: fixed;left: 1100px;margin-top: 10px">
              <Button style="height: 50%; ;" @click="startChat(contact)">Chat</Button>
            </div>
            <!--私信文字排版还有问题-->
            <!--<Button type="primary" @click="reply=true">reply</Button>-->
            <!--
            <Modal  v-model="reply" title="Reply:" @on-ok="ok(contact.private_letter_id, contact.private_letter_sender_id)" @on-cancel="cancel">
              <input v-model="replycontent" placeholder="Enter yout reply" />
            </Modal>
            -->
          </el-container>
          <Divider style="margin-top: 70px; margin-bottom: 15px;width: 100%; "></Divider>
        </ElContainer>
      </ul>
    </ElContainer>
  </div>

</template>
<script>
import wxChat from "./wxChat"
export default {
  name: "Message",
  data() {
    return {
      visible: false,
      pageNum: 1,
      reply: false,
      replycontent: "",
      contactList: [],
      my_user_info: {},
      chatWidth: 300,
      contactAvatarUrl: "",
      ownerAvatarUrl: "",
      contactNickname: "",
      chating_my_user_id: 0,
      chating_contact_user_id: 0,
      wxChatData: [{
        direction: 2,
        id: 1,
        type: 1,
        content: '你好!![呲牙]',
        ctime: new Date().toLocaleString()
      },
      {
        direction: 1,
        id: 2,
        type: 1,
        content: '你也好。[害羞]',
        ctime: new Date().toLocaleString()
      },
      {
        direction: 2,
        id: 3,
        type: 1,
        content: '这是我的简历头像：',
        ctime: new Date().toLocaleString()
      },
      {
        direction: 2,
        id: 4,
        type: 2,
        content: './src/assets/wyz.jpg',
        ctime: new Date().toLocaleString()
      },
      {
        direction: 1,
        id: 5,
        type: 1,
        content: '你开心就好。[微笑]',
        ctime: new Date().toLocaleString()
      }]
    };
  },
  components:{
    wxChat
  },
  created(){
    var _this = this;
    this.getUserPublicInfo(this.getCookies("userID")).then(response=>{
      _this.my_user_info = response.data.data;
    })
  },
  mounted(){
    this.queryForMe(1, 10).then(response=>{
      console.log(response);
      this.contactList = response.data.data;
    });
  },
  methods: {
    getCookies(a){
      return this.getCookie(a)
    },
    ok(private_letter_sender_id) {
      this.$Message.info("hello");
      console.log(this.replycontent, private_letter_sender_id);
      this.sendPrivateLetter(private_letter_sender_id, this.replycontent).then(response=>{
        console.log("发送", response);
      });
    },
    cancel(){

    },
    closable() {
      this.$Message.info({
        content: "Please enter your reply",
        duration: 10,
        closable: true
      });
    },
    handleReachBottom(){
      console.log("加载到底部")
      if(this.contactList.length < this.pageNum * 10){
        return null;
      }else{
        return this.queryForMe(this.pageNum*10 + 1, (this.pageNum+1)*10).then(response=>{
          this.contactList = this.contactList.concat(response.data.data);
          this.pageNum += 1;
        })
      } 
    },
    startChat(contact){
      this.visible = true;
      this.contactAvatarUrl = contact.sender_info.avatar_url;
      this.ownerAvatarUrl = this.my_user_info.avatar_url;
      this.contactNickname = contact.sender_info.nickname;
      this.chating_my_user_id = this.my_user_info.user_id;
      this.chating_contact_user_id = contact.sender_info.user_id,
      this.wxChatData; //TODO 獲取數據
      this.wxChatData = this.$refs.subChat.data;
    },
    getUpperData(){

    },
    getUnderData(){

    },
    closeChat(){
      this.visible = false;
    },
    send(contact_id, send_content){
      console.log("準備發送私信", contact_id, send_content);
      this.wxChatData.push({
        direction: 1,
        id: this.wxChatData[this.wxChatData.length-1].id + 1,
        type: 1,
        content: send_content,
        ctime: new Date().toLocaleString()
      });
      this.sendPrivateLetter(contact_id, send_content).then(response=>{
        console.log(response);
      })
    }
  }
};
</script>
