<style scoped>
  .root-div{
    position: fixed;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  #background-top-container{
    height:400px;
    width: 100%;
    background-color: deepskyblue;
  }
  .PersonalWall {
    position: relative;
    height: 380px;
    z-index: 1;
  }
  .WallImgContainer {
    position: relative;

  }
  .BkgImgContainer {
    height: 320px;
    background-size: cover;
    background: #dedede no-repeat center;
  }
  .ProfileImgContainer {
    position: relative;
    margin-left: 122px;
  }

  .TabItem:hover:after,
  .TabItem.active:after {
    opacity: 1;
  }
  .ProfileImg {
    position: absolute;
    bottom: -70px;
    background: #fff;
    border: 5px solid #fff;
    border-radius: 50%;
    transition: 300ms;
    transform: translateY(0);
    overflow: hidden;
  }
  .ProfileImgContainer .ProfileImgLink {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: black;
    display: inline-block;
    position: relative;
  }
  .ProfileImgContainer img {
    position: relative;
    width: 100%;
  }
  .ProfileInfoContainer {
    height: 60px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    background-color: white;
  }
  #middle-container {
    float: left;
    height: 100%;
    width: 100%;
    background-color: rgb(230, 236, 240);
  }

  #middle-left-container{
    float:left;
    height:80px;
    width:30%;
    background-color: white;
  }

  #nickname-container{
    height:60px;
    font-size:30px;
    font-weight: bold;
  }

  #selfIntroduction-container{
    font-size: 15px;
    padding-top: 0px;

  }

  #middle-middle-container{
    float:left;
    height:100%;
    width: 40%;
    background-color: white;
  }

  #display-container{
    margin-top:0px
  }

  #middle-right-container{
    float:left;
    width:30%;
    background-color: rgb(230, 236, 240);
  }

  #middle-right-top-container{
    height: 80px;
    background-color: white;
  }

  #follow-button-container{
    margin-top: 0px;
    margin-left: 70px;
    height:80px;
    width:30%;
  }
  .TabContainer {
    margin-top: 0px;
    margin-left: 40px;
    display: flex;
    width: 80%;
    height: 80px;
    background-color: blueviolet;
  }
  .TabItem {
    background-color: white;
    margin-top: 0px;
    display: block;
    height: 100%;
    position: relative;
  }

  .to-follow-list{
    text-align: left;
    margin-top: 20px;
    line-height: 50px;
  }

  .TabItem:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    opacity: 0;
    transition: 400ms;
    background-color: #0084B4;
  }


  .TabTxt {
    background-color: white;
    position: relative;
    top: 30%;
    transform: translateY(-50%);
    margin-top: 10px;
    padding:0 30px;

    text-align: center;
  }
  .TabTitle {
    color: #657786;
    font-weight: bold;
    font-size: 15px;
  }
  .Count {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  #ad:hover{
    text-decoration:underline;
    transition: margin-left;
  }

  #content-container{
    height: 100%;
    float: left;
    margin-left: 20px;
    background-color: darkred;
  }

  .infor-avatar{

  }
</style>
<style>

  .el-tabs__item{
    white-space: pre-line !important;
    font-weight: bold !important;
  }
</style>
<template>
  <div class="root-div">
    <div id = "background-top-container" >
      <div class="WallImgContainer">
        <div class="BkgImgContainer" :style="`background-image: url({{personBkgImg}})`"></div>
        <div class="ProfileImgContainer">
          <div class="ProfileImg">
            <a href="#" class="ProfileImgLink">
              <img :src="avatar" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id = "middle-container">
      <div id = "middle-left-container">
        <div id="introduction-container">
          <div id="nickname-container">{{nickname}}</div>
          <div id="selfIntroduction-container">{{selfIntroduction}}</div>
        </div>
      </div>

      <div id="middle-middle-container">

        <div class="TabContainer">
          <!--<router-link :to="{name: 'PersonPosts', params: {PersonAccount: personAccount}}" class="TabItem" exact-active-class="active">-->
            <!--<div class="TabTxt">-->
              <!--<div class="TabTitle">Tweets</div>-->
              <!--<div class="Count">{{postsCount}}</div>-->
            <!--</div>-->
          <!--</router-link>-->
          <router-link :to="{name: 'PersonPosts', params: {PersonAccount: personAccount}}" class="TabItem" exact-active-class="active">
            <div class="TabTxt">
              <div class="TabTitle">Tweets</div>
              <div class="Count">{{postsCount}}</div>
            </div>
          </router-link>
          <router-link :to="{name: 'PersonFollowing', params: {PersonAccount: personAccount}}" class="TabItem" exact-active-class="active">
            <div class="TabTxt">
              <div class="TabTitle">Following</div>
              <div class="Count">{{followingCount}}</div>
            </div>
          </router-link>
          <router-link :to="{name: 'PersonFollower', params: {PersonAccount: personAccount}}" class="TabItem" exact-active-class="active">
            <div class="TabTxt">
              <div class="TabTitle">Followers</div>
              <div class="Count">{{followerCount}}</div>
            </div>
          </router-link>
          <router-link :to="{name: 'likes', params: {PersonAccount: personAccount}}" class="TabItem" exact-active-class="active">
            <div class="TabTxt">
              <div class="TabTitle">Collections</div>
              <div class="Count">{{collectCount}}</div>
            </div>
          </router-link>
        </div>
        <div id="display-container">
          <hr>
          <div>sfasfsdfas</div>
          <div>sdagasgas</div>
          <div id="content-container">
            <div class='to-follow-list' v-for= "toFollow in toFollowList" >
              <a id="ad">
                <Avatar class='infor-avatar':src='toFollow.avatarUrl' ></Avatar>
                {{toFollow.name}}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="middle-right-container">
        <div id = "middle-right-top-container">
          <div id="follow-button-container">
            <Button v-if="isFollowing===true" class ="follow-button"type="primary" shape="circle" style="height: 45px;margin-top: 15px">
              <span style="font-weight:bold;font-size: 16px">Following</span>
            </Button>
            <Button v-else-if="isFollowing===false" class ="follow-button"type="primary" shape="circle" style="background-color: maroon;border:darkred; height: 45px;margin-top: 15px">
              <span style="font-weight:bold;font-size: 16px">Unfollowed</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import axios from "axios"
  import loadingAnimate from "./animate/loading"
  axios.defaults.withCredentials = true;
    export default {
        name: "Zoom",

        data(){
          return{
            num:0,
            avatar:null,
            nickname:"NickName",
            personBkgImg:"/static/logo",
            postsCount: 0,
            followerCount:0,
            followingCount:0,
            collectCount:0,
            isFollowing:false,
            personAccount:null,
            joinTime:null,
            selfIntroduction:"The man is lazy,leaving nothing.",
            toFollowList:[
              {name:'皮卡丘', avatarUrl:'/static/logo',introduction:"How are you"},
              {name:'杰尼龟', avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg',introdutcion:"Let us make the world a better place"},
              {name:'喷火龙', avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg',introduction:"I love coding"},
              {name:'超梦', avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg',introduction:"Database Course Design...."},
              {name:'伊布',avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg',introduction:"nmsl"},
              {name:'梦幻',avatarUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg',introduction:"nmzdsl"}
            ]
          }
        },
      components:{
          loadingAnimate
      },
      mounted: function getUser(){
          this.loading=true;

          var selfID = this.getCookies("userID")
          var visitID = this.getCookie("userID")
          console.log(selfID)
          try{
            // let selfID=userID
            // let visitID=userID
            let front="http://localhost:12293"
            axios.get(`http://localhost:12293/api/User/query/${visitID}`).then(response=>{
              console.log(visitID)
              console.log(response.data.data)
              if(response.data.code===200 && response.data.message==="success")
              {
                this.nickname=response.data.data.nickname
                console.log(this.nickname)
                this.avatar = front + response.data.data.avatar_url
                this.postsCount = response.data.data.messages_num
                this.followerCount=response.data.data.followers_num
                this.followingCount=response.data.data.follows_num
                this.collectCount=response.data.data.collection_num
                this.selfIntroduction=response.data.data.self_introction
                this.joinTime=response.data.data.register_time
                console.log(this.nickname)
              }
            })

            axios.get(`http://localhost:12293/api/Relation/if_following?follower_id=${selfID}&be_followed_id=${visitID}`).then(response=>{
              if(response.data.code==200&&response.data.message=="success"){
                this.isFollowing=response.data.data.if_following
                console.log(this.isFollowing)
              }
            })
          }

          catch (e) {
            return {
              result: false,
              errMsg: "Can't connect with server"
            };
          }
      },
      methods:{
        getCookies(a){
          return this.getCookie(a)
        }
      },
      // computed: {
      //   isLoginedUser: function () {
      //     return this.personAccount === this.$store.getters.userAccount
      //   },
      //   postsCount: function () {
      //     return this.person ? this.person.posts.length : 0
      //   },
      //   followingCount: function () {
      //     return this.person ? this.person.following.length : 0
      //   },
      //   followerCount: function () {
      //     return this.person ? this.person.follower.length : 0
      //   },
      //   likesCount: function(){
      //     return this.person ? this.person.likesNum.length: 0
      //   },
      //   personName: function () {
      //     return this.person ? this.person.name : ''
      //   },
      //   personID: function () {
      //     return this.person ? this.person._id : null
      //   },
      //   personImg: function () {
      //     return this.person ? this.person.profileImg : ''
      //   },
      //   personBkgImg: function () {
      //     return this.person ? this.person.bkgWallImg : ''
      //   }
      // },
      // created () {
      //   this.initUserID()
      //   window.addEventListener('scroll', this.windowScrollEventHandler)
      // },
      watch: {
        '$route.params.PersonAccount': 'initUserID'
      }
      // methods: {
      //   async initUserID () {
      //     this.personAccount = this.$route.params.PersonAccount
      //     let res = await personInfo.GetPersonBasicInfo(this.personAccount)
      //     if (!res.result) {
      //       this.errorMessage = res.errMsg
      //       document.title = 'Twitter Clone'
      //       return
      //     }
      //     this.person = res.person
      //     this.isFollowing = res.isFollowing
      //     document.title = `${this.person.name} (@${this.person.account})`
      //   },
      //   windowScrollEventHandler (e) {
      //     this.needPersonalWallFix = $(window).scrollTop() > 300
      //   }
      // }

    }
</script>


