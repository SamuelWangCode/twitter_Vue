<template>
  <div>
    <router-link :to="{ path: '/Zoom', query: { visitor_id: user_info.user_id }}">
      <Avatar v-bind:src="user_info.avatar_url"  />
    </router-link>
    <span>{{user_info.nickname}}</span>
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
  props: {
    user_id:Number
  },
  methods: {
    get_info: function(user_id) {
      this.getUserPublicInfo(user_id).then(Response => {
        if (Response.data.message == "success") {
          this.load_info(Response.data.data);
          console.log("user_id:"+user_id);
          console.log(Response.data);
        }
      });
    },
    load_info: function(info) {
      this.user_info = info;
    }
  },
  mounted(){
    this.get_info(this.user_id);
  },
  
    
  
};
</script>
