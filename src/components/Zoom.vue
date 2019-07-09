<style scoped>
.root-div {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
}
#background-top-container {
  height: 320px;
  width: 100%;
  background-color: deepskyblue;
}
.PersonalWall {
  position: relative;
  height: 380px;
  z-index: 1;
}
.WallImgContainer {
  height: 320px;
}
.BkgImgContainer {
  height: 320px;
  background: #dedede no-repeat center;
}
.ProfileImgContainer {
  position: relative;
  margin-left: 122px;
}

.active {
  border-bottom: 1px solid #0084b4;
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
  margin-top: 0px;
  height: 100%;
  position: relative;
  border: 0px;
  width: 25%;
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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
  background-color: white;
}
#middle-container {
  float: left;
  height: 100%;
  width: 100%;
  background-color: rgb(230, 236, 240);
}

#middle-left-container {
  float: left;
  height: 80px;
  width: 30%;
  background-color: white;
}

#nickname-container {
  height: 40px;
  font-size: 30px;
  font-weight: bold;
  color: black;
  float: top;
}

#selfIntroduction-container {
  font-size: 15px;
  margin-top: 10px;
  background-color: rgb(230, 236, 240);
}

#introduction{
  height: 200px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
}

#middle-middle-container {
  float: left;
  height: 100%;
  width: 40%;
  background-color: white;
}

#display-container {
  margin-top: 0px;
}

#middle-right-container {
  float: left;
  width: 30%;
  background-color: rgb(230, 236, 240);
}

#middle-right-top-container {
  height: 80px;
  background-color: white;
}

#follow-button-container {
  margin-bottom: 20px;
  margin-left: 70px;
  height: 80px;
  width: 30%;
  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.TabContainer {
  margin-top: 0px;
  margin-right: 0px;
  display: flex;
  width: 100%;
  height: 80px;
  background-color: white;
}
.TabItem {
  background-color: white;
  margin-top: 0px;
  display: block;
  height: 100%;
  position: relative;
  border: 0px;
  width: 25%;
}

.to-follow-list {
  text-align: left;
  margin-top: 20px;
  line-height: 50px;
}

.TabItem:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  opacity: 0;
  transition: 400ms;
  background-color: #0084b4;
}

.TabTxt {
  background-color: white;
  position: relative;
  top: 30%;
  transform: translateY(-50%);
  margin-top: 30px;
  padding: 0 30px;

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

#ad:hover {
  text-decoration: underline;
  transition: margin-left;
}

#content-container {
  height: 100%;
  float: left;
  margin-left: 20px;
  background-color: darkred;
}

.infor-avatar {

}

.follow-button-style{
  height: 45px;
  width:100px;
  font-weight:bold;
  font-size: 16px;
}

</style>
<style>
.el-tabs__item {
  white-space: pre-line !important;
  font-weight: bold !important;
}
</style>
<template>
  <div class="root-div">

      <div class="WallImgContainer">
        <div class="BkgImgContainer">
          <img :src="personBkgImg" style="height: 320px;width: 100%"/>
        </div>
        <div class="ProfileImgContainer">
          <div class="ProfileImg">
            <a href="#" class="ProfileImgLink">
              <img :src="avatar" alt />
            </a>
          </div>
        </div>
      </div>

    <div id="middle-container">
      <div id="middle-left-container">

        <div>
          <div id="selfIntroduction-container">
            <div id="introduction-container">
              <div id="decoration" style="height: 70px;background-color: white;padding-top: 0px"></div>
              <div id="nickname-container">
                {{nickname}}
                <img :src="confirm_url" style="height: 20px"/>
              </div>
              <div style="font-size: 20px;padding-right: 20px">@ {{nickname}}</div>
            </div>
            <div id="introduction">
              {{selfIntroduction}}
            </div>
          </div>
        </div>
      </div>

      <div id="middle-middle-container">
        <div class="TabContainer">
          <Button
            v-bind:style="navStatus.tweetsShow ? 'border-radius:0; border-left:0px solid white; border-bottom:1px solid blue' : 'border-radius:0;'"
            v-bind:class="!navStatus.tweetsShow ? 'TabItem' : 'active'"
            @click="tweetsClicked"
          >
            <div class="TabTxt">
              <div class="TabTitle">Tweets</div>
              <div class="Count">{{postsCount}}</div>
            </div>
          </Button>
          <Button
            v-bind:style="navStatus.followingShow ? 'border-radius:0; border-bottom:1px solid blue' : 'border-radius:0;'"
            v-bind:class="!navStatus.followingShow ? 'TabItem' : 'active'"
            exact-active-class="active"
            @click="followingClicked"
          >
            <div class="TabTxt">
              <div class="TabTitle">Following</div>
              <div class="Count">{{followingCount}}</div>
            </div>
          </Button>
          <Button
            v-bind:style="navStatus.followersShow ? 'border-radius:0; border-bottom:1px solid blue' : 'border-radius:0;'"
            v-bind:class="!navStatus.followersShow ? 'TabItem' : 'active'"
            exact-active-class="active"
            @click="followersClicked"
          >
            <div class="TabTxt">
              <div class="TabTitle">Followers</div>
              <div class="Count">{{followerCount}}</div>
            </div>
          </Button>
          <Button
            v-bind:style="navStatus.collectionsShow ? 'border-radius:0; border-bottom:1px solid blue' : 'border-radius:0;'"
            v-bind:class="!navStatus.collectionsShow ? 'TabItem' : 'active'"
            v-show="visitor==user"
            exact-active-class="active"
            @click="collectionsClicked"
          >
            <div class="TabTxt">
              <div class="TabTitle">Collections</div>
              <div class="Count">{{collectCount}}</div>
            </div>
          </Button>
        </div>

        <div id="display-container">
          <hr />

          <!--display tweets-->
          <div v-if="navStatus.tweetsShow" id="tweets-container">
            <tweets :ref="'twe1'"v-on:change_following="change_follow($event)" type="userhome" v-bind:info="visitor"></tweets>
          </div>

          <!--display following-->
          <div v-show="navStatus.followingShow" id="following-container">
            <div  v-for="user in followingList" v-bind:key="user.user_id">
              <userForZoom v-bind:p_user_id="user.user_id">
              </userForZoom>
            </div>
          </div>

          <!--display followers-->
          <div v-show="navStatus.followersShow" id="followers-container">
            <div v-for="user in followersList" v-bind:key="user.user_id">
              <userForZoom v-bind:p_user_id="user.user_id">
              </userForZoom>
            </div>
          </div>

          <!--display collections-->
          <div v-show="navStatus.collectionsShow" id="collections" >
            <tweets :ref="'twe2'" v-on:change_following="change_follow($event)" type="collection" v-bind:info="user"></tweets>
          </div>
        </div>
      </div>
      <div id="middle-right-container">
        <div id="middle-right-top-container">
          <div v-if="visitor!=user" id="follow-button-container">
            <FollowButton class="follow-button-style" v-bind:followerCount.sync="followerCount" v-bind:isFollowing.sync="isFollowing" v-bind:visitor="Number(visitor)"></FollowButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import loadingAnimate from "./animate/loading";
import Tweets from "./Subs/Tweets.vue";
import User from "./Subs/User";
import UserForZoom from "./Subs/UserForZoom";
import FollowButton from "./Subs/FollowButoon"

export default {
  name: "Zoom",

  data() {
    return {
      num: 0,
      visitor: 0,
      user: 0,
      confirm_url:"static/confirmed.png",
      user_info: {},
      avatar: null,
      nickname: "NickName",
      personBkgImg: "/static/background.png",
      postsCount: 0,
      followerCount: 0,
      followingCount: 0,
      collectCount: 0,
      isFollowing: false,
      personAccount: null,
      joinTime: null,
      showName: "tweetsShow",
      status: [
        "tweetsShow",
        "followingShow",
        "followersShow",
        "collectionsShow"
      ],
      navStatus: {
        tweetsShow: true,
        followingShow: false,
        followersShow: false,
        collectionsShow: false
      },
      selfIntroduction: "The man is lazy,leaving nothing.",
      toFollowList: [],
      followingList: [],
      followersList: [],
      user_info:null
    };
  },
  components: {
    loadingAnimate,
    Tweets,
    "userForZoom":UserForZoom,
    User,
    FollowButton
  },
  created() {
    this.loading = true;
    this.visitor = Number(this.$route.query.visitor_id);
    this.user = this.getCookies("userID");
    console.log("user", this.user);
    try {
      var _this = this;
      this.getUserPublicInfo(this.visitor).then(response=>{
        _this.user_info = response.data.data;
        _this.nickname = response.data.data.nickname;
        console.log(this.nickname);
        _this.avatar = response.data.data.avatar_url;
        _this.postsCount = response.data.data.messages_num;
        _this.followerCount = response.data.data.followers_num;
        _this.followingCount = response.data.data.follows_num;
        _this.collectCount = response.data.data.collection_num;
        _this.selfIntroduction = response.data.data.self_introction;
        _this.joinTime = response.data.data.register_time;
      });
      var p1 = this.if_following_by_me(this.visitor)
      var p2 = this.queryFollowingFor(this.visitor, 1, 10)
      var p3 = this.queryFollowersFor(this.visitor, 1, 10)


      Promise.all([p1, p2, p3]).then(res => {
        console.log("完成数据加载", res)
        _this.isFollowing = res[0].data.data.if_following;
        _this.followingList = res[1].data.data;
        _this.followersList = res[2].data.data;
        console.log("这个人的followersList", _this.followersList);
      });
    } catch (e) {
      return {
        result: false,
        errMsg: "Can't connect with server"
      };
    }
  },
  mounted: function getUser() {
    this.loading = true;
    this.visitor = Number(this.$route.query.visitor_id);
    this.user = this.getCookies("userID");
    console.log("user", this.user);
  },
  methods: {
    setFalseStatus() {
      this.navStatus.followersShow = false;
      this.navStatus.collectionsShow = false;
      this.navStatus.followingShow = false;
      this.navStatus.tweetsShow = false;
    },
    getCookies(a) {
      return this.getCookie(a);
    },

    tweetsClicked() {
      console.log("tweetsClicked");
      this.setFalseStatus();
      this.navStatus.tweetsShow = true;
      this.showName = "tweetsShow";
      console.log(this.navStatus);
    },

    followingClicked() {
      console.log("followingClicked");
      this.setFalseStatus();
      this.navStatus.followingShow = true;
      this.showName = "followingShow";
      console.log(this.navStatus);
    },

    followersClicked() {
      console.log("followersClicked");
      this.setFalseStatus();
      this.showName = "followersShow";
      this.navStatus[this.showName] = true;
      console.log(this.navStatus.followersShow);
    },

    collectionsClicked() {
      console.log("collectionsClicked");
      this.setFalseStatus();
      this.showName = "collectionsShow";
      this.navStatus[this.showName] = true;
      console.log(this.navStatus.collectionsShow);
    },
    change_follow(event){
      console.log('afasa');
      this.isFollowing=event;
    }
  },
  watch: {
    "$route.params.PersonAccount": "initUserID",
    isFollowing(val){
      this.$refs.twe1.change_follow2(val,this.visitor);
      this.$refs.twe2.change_follow2(val,this.visitor);
    }
  }
};
</script>


