<style scoped>
.unfollow {
  background-color: maroon;
  border:darkred;
}
.font{
    font-weight:bold;
}


</style>
<template>
  <Button
    class="font"
    type="primary"
    shape="circle"
    v-on:click="click_func()"
    v-bind:class="my_class"
    v-if="isShow"
  ><span style="font-size:14px;">{{content}}</span></Button>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isFollowing: {
      type: Boolean,
      default: false
    },
    followerCount: {
      type: Number,
      default: 0
    },
    visitor: Number
  },
  methods: {
    unfollowClick() {
      this.$emit("update:isFollowing", false);
      this.$emit("update:followerCount", this.followerCount - 1);
      console.log("取消关注");
      this.cancelFollowingTo(this.visitor).then(response => {
        if (response.data.message != "success") {
          this.$emit("update:isFollowing", true);
          this.$emit("update:followerCount", this.followerCount + 1);
        }
      });

      console.log("unfollowClicked");
    },
    followClick() {
      this.$emit("update:isFollowing", true);
      this.$emit("update:followerCount", this.followerCount + 1);
      console.log("follow谁：", this.visitor);
      this.followSb(this.visitor).then(response => {
        console.log("follow结果", response);
        if (response.data.message != "success") {
          this.$emit("update:isFollowing", false);
          this.$emit("update:followerCount", this.followerCount - 1);
        }
      });
      console.log("followClicked");
    },
    click_func() {
      if (this.isFollowing) {
        this.unfollowClick();
      } else {
        this.followClick();
      }
    }
  },
  computed: {
    is_following() {
      return this.isFollowing;
    },
    content() {
      return this.isFollowing ? "Unfollow" : "Follow";
    },
    my_class(){
        return this.isFollowing ? "unfollow" : "follow";
    },
    isShow(){
      if(!this.getCookie("userID")){
        return false;
      }
      return this.visitor.toString()!=this.getCookie("userID").toString();
    }
  }
};
</script>

