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
chat-name {
  color: #333333;
  margin-left: 2px;
  font-size: 20px;
}
chat-content {
  color: #657786;
  margin-left: 30px;
  margin-top: 18px;
  font-size: 15px;
}
</style>

<template>
  <div id="root-div">
    <scroll height="1000">
      <ElContainer id="middle-container">
        <el-header class="header-left-align">Message</el-header>
        <Divider />
        <ul>


          <ElContainer id="chat-container" v-for="contact in contactList">
            <el-container>
              <div>
                <a>
                  <Avatar
                    :src="contact.sender_info.avatar_url"
                    style="margin-top: 10px;margin-left: 15px;margin-bottom: 5px"
                  ></Avatar>
                </a>
              </div>
              <div>
                <a>
                  <chat-name>{{contact.sender_info.nickname}}</chat-name>
                </a>
                <chat-content>{{contact.private_letter_content}}</chat-content>
              </div>
              <div style="position: absolute;left: 1000px;">
                <Button @click="handleReply">Reply</Button>
              </div>
              <!--私信文字排版还有问题-->
            </el-container>
            <Divider style="margin-top: 55px; margin-bottom: 2px;width: 100%; "></Divider>
          </ElContainer>


        </ul>
      </ElContainer>
    </scroll>
  </div>
</template>
<script>
export default {
  name: "Message",
  data() {
    return {
      contactList: [
        
      ],
      value: ""
    };
  },
  mounted(){
    this.queryForMe(0, 10).then(response=>{
      console.log("测试获取私信列表", response);
      this.contactList = response.data.data;
      
    });
  },

  methods: {
    handleReply() {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              width: 30,
              value: this.value,
              autofocus: true,
              placeholder: "Reply..."
            },
            on: {
              input: val => {
                if (val === "") this.closable();
                else this.value = val;
              },
              ok: val=>{
                console.log(val);
              }
            }
          });
        },
      });



    },
    closable() {
      this.$Message.info({
        content: "Please enter your reply",
        duration: 10,
        closable: true
      });
    }
  }
};
</script>
