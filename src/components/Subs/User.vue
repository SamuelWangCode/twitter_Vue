<template>
  <div>
    <router-link :to="{ path: '/Zoom', query: { visitor_id: user_info.user_id }}">
    <Avatar v-bind:src="user_info.avatar_url" v-on:click="jump"/>
    </router-link>
    <span >{{user_info.nickname}}</span>
  </div>
</template>
<script>
export default {
  name: "User-Item",
  data() {
    return {
      user_info: {
        user_id: -1,
        nickname: "",
        register_time: "",
        self_introction: "",
        followers_num: 0,
        follows_num: 0,
        avatar_url: "/avatars/0.jpg",
        messages_num: 0,
        collection_num: 0
      }
    };
  },
  methods: {
    get_info: function(user_id) {
      this.getUserPublicInfo(user_id).then(Response => {
        if (Response.data.message == "success") {
          this.load_info(Response.data.data);
          console.log("fafsdf")
          console.log(Response.data);
        }
      });
    },
    load_info: function(info){
        this.user_info=info;
    },
    jump: function(){
        //this.$router.push({ path: '/Zoom', query: { visitor_id: user_info.user_id }})
    }
  }
};
</script>
