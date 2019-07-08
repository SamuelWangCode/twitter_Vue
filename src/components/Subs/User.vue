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
    p_user_id:{type:Number,default:null},
    p_user_info:{type:Object,default:null},
    p_follow_info:{type:Object,default:null}
  },
  methods: {
    get_info: function(user_id) {
      console.log(user_id)
      this.getUserPublicInfo(user_id).then(Response => {
        if (Response.data.message == "success") {
          this.load_info(Response.data.data);
          console.log("user_id:"+user_id);
          console.log(Response.data);
        }
      });
    },
    load_info: function(info) {
      console.log(info)
      this.user_info = info;
    },
    load_follow_info(info){
      console.log(info)
      this.user_info.user_id=info.user_id;
      this.user_info.nickname=info.user_nickname;
      this.user_info.avatar_url=info.avatar_url;
    }
  },
  mounted(){
    if(this.p_user_id){
      this.get_info(this.p_user_id);
    };
    if(this.p_user_info){
      this.load_info(this.p_user_info);
    };
    if(this.p_follow_info){
      this.load_follow_info(this.p_follow_info);
    }
  },
  watch:{
    p_user_info(nval,oval){
      this.load_info(nval);
    },
    p_user_id(nval,oval){
      this.get_info(nval);
    },
    p_follow_info(nval,oval){
      this.load_follow_info(nval);
    }
  }
  
    
  
};
</script>
