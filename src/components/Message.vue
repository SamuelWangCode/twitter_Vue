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
#chat-name {
  color: #333333;
  margin-left: 10px;
  font-size: 20px;
}
#chat-content {
  margin-left: 30px;
  color: #657786;
  margin-top: 18px;
  font-size: 15px;
  width: 400px;
}
.center-fix {
  position: fixed; /*固定位置*/
  z-index: 99; /*设置优先级显示，保证不会被覆盖*/
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>

<template>
  <div id="root-div">
    <div v-if="visible">
      <wxChat
        :ref="'subChat'"
        @closeChat="closeChat"
        :sendPrivateLetter="send"
        :data="wxChatData"
        :showShade="true"
        contactNickname="聊天"
        :getUnderData="getUnderData"
        :ownerAvatarUrl="ownerAvatarUrl"
        :maxHeight="400"
        :contactAvatarUrl="contactAvatarUrl"
        :contact_user_id="chating_contact_user_id"
        :my_user_id="chating_my_user_id"
        :width="chatWidth"
      ></wxChat>
    </div>

    <loadingAnimate v-if="loading" class="center-fix" />
    <ElContainer id="middle-container">
      <el-header class="header-left-align">Message</el-header>
      <Divider style="margin:0;" />
      <ul>
        <ElContainer
          id="chat-container"
          v-for="contact in contactList"
          :key="contact.contact_person_id"
        >
          <el-container>
            <div style="margin-left: 10px">
              <router-link
                class="user-container"
                :to="{ path: '/Zoom', query: { visitor_id: contact.contact_person_id }}"
              >
                <Avatar
                  :src="contact.contact_person_avator_url"
                  style="margin-top: 15px;margin-left: 15px;margin-bottom: 1px;"
                  size="large"
                ></Avatar>
              </router-link>
            </div>
            <div>
              <div id="chat-content">
                <router-link
                  class="user-container"
                  :to="{ path: '/Zoom', query: { visitor_id: contact.contact_person_id }}"
                >
                  <p style="font-size: 20px;margin-bottom:15px;">{{contact.contact_nickname}}</p>
                </router-link>
                <p>{{contact.contact_time}}</p>
              </div>
            </div>
            <div style="position: fixed;left: 1100px;margin-top: 10px">
              <Button style="height: 50%;margin-top:12px;" @click="startChat(contact)">Chat</Button>
            </div>
            <!--私信文字排版还有问题-->
            <!--<Button type="primary" @click="reply=true">reply</Button>-->
            <!--
            <Modal  v-model="reply" title="Reply:" @on-ok="ok(contact.private_letter_id, contact.private_letter_sender_id)" @on-cancel="cancel">
              <input v-model="replycontent" placeholder="Enter yout reply" />
            </Modal>
            -->
          </el-container>
          <Divider style="margin:0; margin-bottom: 15px;width: 100%; "></Divider>
        </ElContainer>
      </ul>
    </ElContainer>
    <backToTop></backToTop>
  </div>
</template>
<script>
import wxChat from "./wxChat";
import loadingAnimate from "./animate/loading";
import backToTop from "./Subs/BackToTop";
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
      chatWidth: 400,
      contactAvatarUrl: "",
      ownerAvatarUrl: "",
      contactNickname: "",
      chating_my_user_id: 0,
      chating_contact_user_id: 0,
      loading: false,
      wxChatData: [
        {
          direction: 2,
          id: 1,
          type: 1,
          content: "你好!![呲牙]",
          ctime: new Date().toLocaleString()
        },
        {
          direction: 1,
          id: 2,
          type: 1,
          content: "你也好。[害羞]",
          ctime: new Date().toLocaleString()
        },
        {
          direction: 2,
          id: 3,
          type: 1,
          content: "这是我的简历头像：",
          ctime: new Date().toLocaleString()
        },
        {
          direction: 2,
          id: 4,
          type: 2,
          content: "./src/assets/wyz.jpg",
          ctime: new Date().toLocaleString()
        },
        {
          direction: 1,
          id: 5,
          type: 1,
          content: "你开心就好。[微笑]",
          ctime: new Date().toLocaleString()
        }
      ]
    };
  },
  components: {
    wxChat,
    loadingAnimate,
    backToTop
  },
  created() {
    var _this = this;
    this.getUserPublicInfo(this.getCookies("userID")).then(response => {
      _this.my_user_info = response.data.data;
    });
  },
  mounted() {
    this.queryLatestContact(1, 10).then(response => {
      console.log(response);
      this.contactList = response.data.data;
    });
  },
  methods: {
    getCookies(a) {
      return this.getCookie(a);
    },
    ok(private_letter_sender_id) {
      this.$Message.info("hello");
      console.log(this.replycontent, private_letter_sender_id);
      this.sendPrivateLetter(private_letter_sender_id, this.replycontent).then(
        response => {
          console.log("发送", response);
        }
      );
    },
    cancel() {},
    closable() {
      this.$Message.info({
        content: "Please enter your reply",
        duration: 10,
        closable: true
      });
    },
    handleReachBottom() {
      console.log("加载到底部");
      if (this.contactList.length < this.pageNum * 10) {
        return null;
      } else {
        return this.queryForMe(
          this.pageNum * 10 + 1,
          (this.pageNum + 1) * 10
        ).then(response => {
          this.contactList = this.contactList.concat(response.data.data);
          this.pageNum += 1;
        });
      }
    },
    startChat(contact) {
      this.contactAvatarUrl = contact.contact_person_avator_url;
      this.ownerAvatarUrl = this.my_user_info.avatar_url;
      this.chating_my_user_id = this.my_user_info.user_id;
      this.chating_contact_user_id = contact.contact_person_id;
      //TODO 獲取數據

      this.visible = true;

      //console.log(this.$refs.subChat);
      //this.wxChatData = this.$refs.subChat.data;
    },
    getUnderData() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          return resolve([]);
        }, 0);
      });
    },
    closeChat() {
      this.visible = false;
    },
    send(contact_id, send_content) {
      console.log("準備發送私信", contact_id, send_content);
      this.sendPrivateLetter(contact_id, send_content).then(response => {
        console.log(response);
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.getCookie("userID")) {
        console.log("请先登录");
        vm.$router.push("index");
      }
    });
  }
};
</script>
