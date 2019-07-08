<template>
  <div id="app" >
    <section v-if="$route.meta.keepAlive">
      <nav class="navBar" style="z-index: 1">
        <Menu mode="horizontal" :theme="theme1" active-name="home" style="padding-left:15%;" @on-select="onSelect">
          <MenuItem name="home" router-link="{path: '/'}" key="Home">
            <Icon type="ios-home" size="24"></Icon>
            Home
          </MenuItem>
          <MenuItem name="notifications" router-link="{path: '/Notifications'}" key="Notifications">
            <Icon type="ios-notifications" size="24"></Icon>
            Notifications
          </MenuItem>
          <MenuItem name="message" router-link="{path: '/Message'}" key="Message">
            <Icon type="ios-mail" size="24"></Icon>
            Message
          </MenuItem>
          <MenuItem name="personal" router-link="{path: '/Personal'}" key="Personal">
            <Icon type="ios-person" size="24"></Icon>
            Personal
          </MenuItem>
          <MenuItem name="explore" router-link="{path: '/Explore'}" key="Explore">
            <Icon type="ios-eye" size="24"></Icon>
            Explore
          </MenuItem>
          <Input v-model = "model13" icon="ios-search" @keyup.enter.native="handleSearch" placeholder="search in twitter" style="width: 300px"/>
          <Button shape="circle" type="error" style="margin-left:20px;" @click = "signOut">log out</Button>
        </Menu>
      </nav>
    </section>
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'
  axios.defaults.withCredentials = true;
  export default {
    name: 'App',
    data(){
      return{
        theme1:"light",
        model13: '',
        loading1: false,
        list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
      }
    },
    methods:{
      handleSearch()
      {
        this.$router.push({
          path:'/searchResult',
          query:{
            searchKey:this.model13
          }
        })
      },

      onSelect (d){
        this.$router.push({path:"/"+ d})
      },
      async signOut(){
        try {
          console.log("startLogOut")
          this.logOut().then(Response=>{
            console.log(Response);
            if(Response.data.code==200 && Response.data.message=="success")
            {
              //成功
              //this.errHint="Success!";
              this.$Notice.success({
                title: 'Log out Success!',
                desc:''
              })
              this.$router.push("/index");
              this.delCookie('userID')
              return
            }
            else{
              this.$Notice.error({
                title: "Can't connect with server.",
                desc:''
              })
            }
          });
        } catch (e) {
          return {
            result: false,
            errMsg: "Can't connect with server"
          };
        }
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: rgb(230, 236, 240);
  }
</style>

<style scoped>
  .navBar{
    background-color: white;
    box-shadow:1px 1px 1px #333;
    height: 46px;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
  }
</style>
