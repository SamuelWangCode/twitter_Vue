<style scoped>
#root-div {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: rgb(230, 236, 240);
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
  width: 100%;
  background-color: rgb(230, 236, 240);
}

#middle-left-container {
  float: left;
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
  background-color: rgb(230, 236, 240);
}

#introduction {
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  display:block;
  word-break: break-all;
  word-wrap: break-word;
}

#middle-middle-container {
  float: left;
  height: 100%;
  width: 40%;
  background-color: white;
}

#display-container {
  padding-top:2%;
  margin-top: 0px;
  z-index: 100;
}

#middle-right-container {
  float: left;
  width: 30%;
  background-color: rgb(230, 236, 240);
}

#middle-right-top-container {
  height: 81px;
  background-color: white;
  
}

/* #follow-button-container {
  margin-bottom: 20px;
  margin-left: 70px;
  height: 80px;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
} */
.TabContainer {
  margin-top: 0px;
  margin-right: 0px;
  display: flex;
  width: 100%;
  height: 80px;
  background-color: white;
}
.TabItem-four {
  background-color: white;
  margin-top: 0px;
  display: block;
  height: 100%;
  position: relative;
  border: 0px;
  width: 25%;
  border-radius:0;
}
.TabItem-four-Show{
  background-color: white;
  margin-top: 0px;
  display: block;
  height: 100%;
  position: relative;
  width: 25%;
  border-radius:0;  
  border-bottom:1px solid blue;
}
.TabItem-three {
  background-color: white;
  margin-top: 0px;
  display: block;
  height: 100%;
  position: relative;
  border: 0px;
  width: 33%;
  border-radius:0;
}
.TabItem-three-Show{
  background-color: white;
  margin-top: 0px;
  display: block;
  height: 100%;
  position: relative;
  width: 33%;
  border-radius:0;  
  border-bottom:1px solid blue;
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

.message-button-container {
  margin-top: 20px;
  height: 45px;
  width: 100px;
  font-weight: bold;
  font-size: 16px;
    margin-left: 60px;
  float:left;
}

.follow-button-container {
  margin-top: 20px;
  height: 45px;
  width: 100px;
  font-weight: bold;
  font-size: 17px;
  margin-left: 20px;
  float:left;
}
.center-fix{
	position: fixed;/*固定位置*/
	z-index:99;/*设置优先级显示，保证不会被覆盖*/
  margin:auto;
left:0;
right:0;
top:0;
bottom:0;
}
</style>
<style>
.el-tabs__item {
  white-space: pre-line !important;
  font-weight: bold !important;
}
.following-container{
  height: 20%
}
.followers-container{

}
</style>
<template>
  <div id="root-div">
    <div id="topAnchor"></div>
    <loadingAnimate v-if="loading" class="center-fix" />
    <div class="WallImgContainer">
      <div class="BkgImgContainer">
        <img :src="personBkgImg" style="height: 320px;width: 100%" />
      </div>
      <div class="ProfileImgContainer">
        <div class="ProfileImg">
          <a href="#" class="ProfileImgLink">
            <Avatar style="width:200px;height:200px;border-radius:50%;" :src="avatar"></Avatar>
          </a>
        </div>
      </div>
    </div>

    <div id="middle-container">
      <div id="middle-left-container">
        <div id="decoration" style="height: 80px;background-color: white;"></div>
          <div id="selfIntroduction-container">
            <div id="introduction-container">
              <div id="nickname-container">
                {{nickname}}
                <img :src="confirm_url" style="height: 20px" />
              </div>
              <div style="font-size: 20px;padding-right: 20px">@ {{nickname}}</div>
            </div>
            <div id="introduction">{{selfIntroduction}}</div>
          </div>
      </div>

      <div id="middle-middle-container">
        <div class="TabContainer">
          <Button
            v-bind:class="getRightClass('tweetsShow')"
            @click="tweetsClicked"
          >
            <div class="TabTxt">
              <div class="TabTitle">Tweets</div>
              <div class="Count">{{postsCount}}</div>
            </div>
          </Button>
          <Button
            v-bind:class="getRightClass('followingShow')"
            exact-active-class="active"
            @click="followingClicked"
          >
            <div class="TabTxt">
              <div class="TabTitle">Following</div>
              <div class="Count">{{followingCount}}</div>
            </div>
          </Button>
          <Button
            v-bind:class="getRightClass('followersShow')"
            exact-active-class="active"
            @click="followersClicked"
          >
            <div class="TabTxt">
              <div class="TabTitle">Followers</div>
              <div class="Count">{{followerCount}}</div>
            </div>
          </Button>
          <Button
            v-bind:class="!navStatus.collectionsShow ? 'TabItem-four' : 'TabItem-four-Show'"
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
<hr />
        <div id="display-container">
          

          <!--display tweets-->
          <div v-if="navStatus.tweetsShow" id="tweets-container">
            <tweets
              @stop_loading="stop_loading"
              :ref="'twe1'"
              v-on:change_following="change_follow(arguments)"
              type="userhome"
              v-bind:info="visitor"
            ></tweets>
          </div>

          <!--display following-->
          <div v-show="navStatus.followingShow" id="following-container">
            <div v-for="user in followingList" v-bind:key="user.user_id">
              <userForZoom
                v-bind:p_user_id="user.user_id"
                :ref="'following'+user.user_id"
                @change_my_follow="change_my_follow(arguments)"
              ></userForZoom>
            </div>
          </div>

          <!--display followers-->
          <div v-show="navStatus.followersShow" id="followers-container">
            <div v-for="user in followersList" v-bind:key="user.user_id">
              <userForZoom
                v-bind:p_user_id="user.user_id"
                :ref="'follower'+user.user_id"
                @change_my_follow="change_my_follow(arguments)"
              ></userForZoom>
            </div>
          </div>

          <!--display collections-->
          <div v-show="navStatus.collectionsShow" id="collections">
            <tweets
              @stop_loading="stop_loading"
              :ref="'twe2'"
              v-on:change_following="change_follow(arguments)"
              type="collection"
              v-bind:info="user"
            ></tweets>
          </div>
        </div>
      </div>
      <div id="middle-right-container">
        <div id="middle-right-top-container">

          <UserMessage v-if="visitor!=getCookies('userID')" :userId="visitor" class="message-button-container">
          </UserMessage>

          <div v-if="visitor!=user" class="follow-button-container">
            <FollowButton
              v-bind:followerCount.sync="followerCount"
              v-bind:isFollowing.sync="isFollowing"
              @finish_update="follow_visitor($event)"
              v-bind:visitor="Number(visitor)"
            ></FollowButton>
          </div>
        </div>
      </div>
    </div>
    <backToTop></backToTop>
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
import backToTop from "./Subs/BackToTop"
import UserMessage from "./Subs/UserMessage"

export default {
  name: "Zoom",

  data() {
    return {
      loading: true,
      num: 0,
      visitor: 0,
      user: 0,
      confirm_url: "static/confirmed.png",
      user_info: {},
      avatar: null,
      nickname: "NickName",
      personBkgImg: "/static/background.png",
      postsCount: 0,
      followerCount: 0,
      followingCount: 0,
      collectCount: 0,
      isFollowing: null,
      personAccount: null,
      joinTime: null,
      showName: "tweetsShow",
      bindTabItemStyle: "",
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
      user_info: null,
      my_info: null
    };
  },
  components: {
    loadingAnimate,
    Tweets,
    userForZoom: UserForZoom,
    User,
    FollowButton,
    backToTop,
    UserMessage
  },
  created() {
    
    this.visitor = Number(this.$route.query.visitor_id);
    this.user = this.getCookies("userID");
    console.log("user", this.user);
    try {
      var _this = this;
      this.getUserPublicInfo(this.visitor).then(response => {
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
      var p1 = this.if_following_by_me(this.visitor);
      var p2 = this.queryFollowingFor(this.visitor, 1, 10);
      var p3 = this.queryFollowersFor(this.visitor, 1, 10);

      Promise.all([p1, p2, p3]).then(res => {
        console.log("完成数据加载", res);
        _this.isFollowing = res[0].data.data.if_following;
        _this.followingList = res[1].data.data;
        _this.followersList = res[2].data.data;
        console.log("这个人的followersList", _this.followersList);
      });
      this.getUserPublicInfo(this.user).then(response => {
        this.my_info = response.data.data;
      });
    } catch (e) {
      return {
        result: false,
        errMsg: "Can't connect with server"
      };
    }
  },
  mounted: function getUser() {
    // this.loading = true;
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
    stop_loading(){
      this.loading = false;
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
    change_follow(event) {
      console.log("change_follow", event[1]);
      if (this.isFollowing != event[0] && this.visitor == event[1]) {
        this.isFollowing = event[0];
        if (event[0]) {
          this.followerCount++;
        } else {
          this.followerCount--;
        }
      }
      this.change_my_follow(event);
    },
    change_my_follow(event) {
      console.log(event);
      for (var i = 0; i < this.followingList.length; ++i) {
        if (this.followingList[i].user_id == event[1]) {
          this.$refs["following" + event[1]][0].change_follow(event[0]);
          break;
        }
      }
      for (var i = 0; i < this.followersList.length; ++i) {
        if (this.followersList[i].user_id == event[1]) {
          this.$refs["follower" + event[1]][0].change_follow(event[0]);
          break;
        }
      }
      
      if (this.$refs.twe1) {
        this.$refs.twe1.change_follow2(event[0], event[1]);
      }
      if (this.$refs.twe2) {
        this.$refs.twe2.change_follow2(event[0], event[1]);
      }
      if (this.visitor == this.getCookie("userID")) {
        var k = [];
        for (var i = 0; i < this.followingList.length; ++i) {
          if (this.followingList[i].user_id.toString() != event[1].toString()) {
            k.push(this.followingList[i]);
          }
        }
        if (event[0] && event[1]!=-1) {
          var temp = new Object();
          temp.user_id = event[1];
          k.push(temp);
        }
        this.followingList = k;
        this.followingCount = k.length;
      }
    },
    follow_visitor(val){
      var k = [];
      for (var i = 0; i < this.followersList.length; ++i) {
        if (this.followersList[i].user_id != this.user) {
          k.push(this.followersList[i]);
        }
      }
      if (val) {
        var temp = new Object();
        temp.user_id = this.my_info.user_id;
        temp.avatar_url = this.my_info.avatar_url;
        temp.nickname = this.my_info.nickname;
        k.push(temp);
      }
      this.followersList = k;
      var temp=new Array();
      temp[0]=val;
      temp[1]=this.visitor;
      this.change_follow(temp);
    },
    getRightClass(typeName){
      if(this.navStatus[typeName] == true){
        if(this.visitor == this.user)
          return "TabItem-four-Show"
        else
          return "TabItem-three-Show"
      }else{
        if(this.visitor == this.user)
          return "TabItem-four"
        else
          return "TabItem-three"
      }
    }
  },
  watch: {
    "$route.params.PersonAccount": "initUserID",
    isFollowing(val) {
      /*if (this.$refs.twe1) {
        this.$refs.twe1.change_follow2(val, this.visitor);
      }
      if (this.$refs.twe2) {
        this.$refs.twe2.change_follow2(val, this.visitor);
      }*/
      
    }
  },
  beforeRouteEnter(to,from,next){
      next(vm=>{
        if(!vm.getCookie("userID"))
        {
          console.log("请先登录")
          vm.$router.push("index")
        }
      })
    }
};
</script>


