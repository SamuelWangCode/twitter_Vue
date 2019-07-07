<style scoped>
.PostSenderContainer {
  width:100%;
  border: 1px solid #e6ecf0;
  background-color: #E8F5FD;
  padding: 10px 12px;
  display: flex;
}

.UserImg {
  border-radius: 50%;
  overflow: hidden;
  width: 32px;
  height: 32px;
  left: 16px;
  position: relative;
  flex-shrink: 0;
}

.EditerContainer {
  position: relative;
  left: 26px;
  width: 100%;
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
    background-color: rgb(230, 236, 240)
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
    margin-top: 0px
  }
  #middle-container2{
    margin-top: 50px
  }
  #right-container{
    float: left;
    width: 20%;
    background-color: white;
    margin-left: 10px;
    margin-top: 70px
  }
  #trends-container{
    line-height: 17px;
    margin-bottom: 10px;
    text-align: left;
  }
  #trends-name{
    font-weight: bold;
    color: #1DA1F2;
    font-size: 17px;
    padding-left: 15px;
  }
  #tweets-times{
    color: #657786;
    font-size: 13px;
    padding-left: 15px;
  }
  .header-left-align{
    font-weight: bold;
    font-size: 24px;
    text-align: left;
    padding-top: 15px;
    padding-left: 15px
}
  .to-follow-list{
    text-align: left;
    line-height: 17px;
  }
  .infor-avatar{
    margin-top: 10px;
    margin-left: 15px;
    margin-bottom: 5px
  }
</style>

<template>
  <div id='root-div'>
    <div id=left-container>
    <ElContainer id = 'left-container1' style="background-color:#1DA1F2;">
       <Avatar :src=address shape="circle" on-error="" size="large" style="height:60px; width:60px; border-radius:50%;margin-left:10%;margin-top:20%;"/>
       <span style="margin-top:80px;margin-left:10px;font-weight:bold;font-size:20px;">
         UserName
       </span>
       <br><br><br><br><br><br><br><br>
     </ElContainer>

     <ElContainer id = 'left-container2' >
       <el-header class='header-left-align'>Trends for you</el-header>
       <ul>
         <li id="trends-container" v-for="trends in tweets">
           <a >
             <span id='trends-name' >Trends Name</span>
             <div id='tweets-times'>{{trends}} Tweets</div>
           </a>
         </li>
       </ul>
     </ElContainer>
    </div>
    <div id="middle-container">
     <ElContainer  id="middle-container1" >
       <div class="PostSenderContainer">
    <Avatar :src=address shape="circle" on-error="" size="large" />
    <div class="EditerContainer">
      <div class="Editer" default-txt="What happens?" contenteditable @focus="editerFocusEventHandler" @blur="editerBlurEventHandler" @input="editerInputEventHandler">
        What happens?
      </div>
      <button type="button" class="btn PostBtn" :disabled="!inputContent.length" v-if="isEditerFocused" @mousedown="sendPostBtnClickEventHandler">Tweet</button>
    </div>
  </div>
     </ElContainer>
     <ElContainer  id="middle-container2" >
       <div style="padding-top:10%;
       padding-left:20%;
       padding-bottom:10%;
       padding-right:20%;">
         <span style= "font-weight:bold;font-size:32px;">What? No Tweets yet?</span>
         <span style= "font-size:16px;font-color:#657180;">This empty timeline won’t be around for long. Start following people and you’ll see Tweets show up here.</span>
         <br><br><br>
         <Button type="primary" shape="circle"><span style="font-weight:bold;">Find people to follow</span></Button>
       </div>
     </ElContainer>
    </div>

      <ElContainer id="right-container" >
        <el-header class="header-left-align">Who to follow</el-header>
        <div class='to-follow-list'v-for= "toFollow in toFollowList" >
          <a>
          <Avatar class='infor-avatar':src='toFollow.avatarUrl' ></Avatar>
          {{toFollow.name}}
          </a>
        </div>
      </ElContainer>


  </div>
</template>
<script>
  import ElUploadList from "element-ui/packages/upload/src/upload-list";
  import Caspanel from "iview/src/components/cascader/caspanel";
  import axios from "axios"
  import user from "./store/user"
  axios.defaults.withCredentials = true;
  export default {
    name:'Notifications',
    components: {Caspanel, ElUploadList},
    data(){
      return{
        sites: [
          { name: 'Runoob' },
          { name: 'Google' },
          { name: 'Taobao' }
        ],
        tweets:[
          24564564,356,89084,98785,65567234,82342,92342,2324234
        ],
        toFollowList:[
          {name:'皮卡丘', avatarUrl:'/static/logo'},
          {name:'杰尼龟', avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'},
          {name:'喷火龙', avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'},
          {name:'超梦', avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'},
          {name:'伊布',avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'},
          {name:'梦幻',avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'}
        ],
        informationList:[
          {name:'妙蛙种子',content:'阳光烈焰',avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'},
          {name:'百变怪',content:'变身',avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'},
          {name:'小锯鳄',content:'撞击',avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'},
          {name:'果然翁',content:'反弹',avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg'}
        ],
        isEditerFocused: false,
        contentEl: null,
        inputContent: '',
        address: "http://localhost:12293/avatars/0"
      }
    },
    mounted:function setUserHeadIcon() {
        try{
          let userID=user.userID
          let front="http://localhost:12293"
          axios.get("http://localhost:12293/api/User/getAvatarImageSrc/{userID}").then(Response=>{
            console.log(Response)
          if(Response.data.code==200 && Response.data.message=="success")
            {
              this.address = front + Response.data.data
              console.log(this.address)
            }
            else{
              this.address="http://localhost:12293/avatars/0"
            }
          })
        }
        catch(e){
            return {
          result: false,
          errMsg: "Can't connect with server"
        };
        }
    },
    methods:{
      editerFocusEventHandler (e) {
      this.isEditerFocused = true
      this.contentEl = e.target

      if (e.target.innerText.trim() === e.target.getAttribute('default-txt')) {
        e.target.innerText = ''
      }
    },
    editerBlurEventHandler (e) {
      this.isEditerFocused = false

      if (!e.target.innerText.trim()) {
        e.target.innerText = e.target.getAttribute('default-txt')
      }
    },
    editerInputEventHandler (e) {
      this.inputContent = e.target.innerText.trim()
    },
    //TODO
    //async sendPostBtnClickEventHandler (e) {}

    }
  }
</script>