<style scoped>
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

  #middle-container{
    float:left;
    width: 40%;
    background-color: white;
    margin-left: 10px;
    margin-top: 70px
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

     <ElContainer id = 'left-container' >
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

     <ElContainer  id="middle-container" >
       <div class="el-header" style="border-bottom: 1px solid #e6ecf0;width: 100%">
         <Tabs active-key="key1" style="float: left;width: 100%" >
           <Tab-pane label="All" key="key1" >
             <ElContainer v-for="infor in informationList">
              <a>
                <Avatar :src="infor.avatarUrl" style="margin-top: 10px;margin-left: 15px;margin-bottom: 5px"></Avatar>
                {{infor.name}}: {{infor.content}}
              </a>
           </ElContainer>
           </Tab-pane>
           <Tab-pane label="Mention" key="key2">标签二的内容</Tab-pane>
         </Tabs>
       </div>
     </ElContainer>


      <ElContainer id="right-container" >
        <el-header class="header-left-align">Who to follow</el-header>
        <div class='to-follow-list'v-for="toFollow in toFollowList" >
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
        ]
      }

    }

  }
</script>
