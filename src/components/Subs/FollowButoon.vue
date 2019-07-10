<style scoped>
.unfollow {
  background-color: maroon;
  border:darkred;
}
.font{
    font-weight:bold;
    /* font-size: 20px; */
}


</style>
<template>
  <Button
    class="font"
    type="primary"
    shape="circle"
    v-bind:disabled="typeof(isFollowing) == 'object' ? true : false "
    v-on:click="click_func()"
    v-bind:class="my_class"
    v-if="isShow"
  ><span style="font-size:12px;">{{content}}</span></Button>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  props: {
    isFollowing: {
      default: null
    },
    followerCount: {
      type: Number,
      default: 0
    },
    visitor: {
      type: Number,
      default: 0
    }
  },
  watch:{
    isFollowing(newVal){

    }
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
        }else{
          this.$emit("finish_update",false);
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
        }else{
          this.$emit("finish_update",true);
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
      if(this.getCookie('userID')&&this.visitor&&this.getCookie('userID').toString()!=this.visitor.toString()){
        return true;
      }else{
        return false;
      }
    }
  }
};
</script>

