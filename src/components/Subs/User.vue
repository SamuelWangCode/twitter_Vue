<template>
  <div>
    <img v-bind:src="user_info.avatar_url"/>
    <span v-html="user_info.nickname"></span>
  </div>
</template>
<script>
export default {
  name: "User-Item",
  data() {
    return {
      user_info: {
        user_id: 8,
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
    load_info: function(user_id) {
      this.getUserPublicInfo(user_id).then(Response => {
        if (Response.data.message == "success") {
          user_info = Response.data.data;
        }
      });
    }
  }
};
</script>
