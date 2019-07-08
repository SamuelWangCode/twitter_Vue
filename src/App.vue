<template>
  <div id="app" >
    <section v-if="$route.meta.keepAlive">
      <nav class="navBar" style="z-index: 1">
        <Menu mode="horizontal" :theme="theme1" active-name="home" style="padding-left:15%;" @on-select="onSelect">
          <MenuItem name="home" v-link="{path: '/'}" key="Home">
            <Icon type="ios-home" size="24"></Icon>
            Home
          </MenuItem>
          <MenuItem name="notifications" v-link="{path: '/Notifications'}" key="Notifications">
            <Icon type="ios-notifications" size="24"></Icon>
            Notifications
          </MenuItem>
          <MenuItem name="message" v-link="{path: '/Message'}" key="Message">
            <Icon type="ios-mail" size="24"></Icon>
            Message
          </MenuItem>
          <MenuItem name="personal" v-link="{path: '/Personal'}" key="Personal">
            <Icon type="ios-person" size="24"></Icon>
            Personal
          </MenuItem>
          <MenuItem name="explore" v-link="{path: '/Explore'}" key="Explore">
            <Icon type="ios-person" size="24"></Icon>
            Explore
          </MenuItem>
          <Select
            v-model="model13" filterable remote:remote-method="remoteMethod1" :loading="loading1" placeholder="Search in twitter"  not-found-text="no matching result" prefix="ios-search" style="width:300px;">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
          <Button shape="circle" type="error" style="margin-left:20px;" @click="signOut">log out</Button>

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
        options1: [],
        model14: [],
        loading2: false,
        options2: [],
        list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
      }
    },
    methods:{
      onSelect (d){
        this.$router.push({path:"/"+ d})
      },
      async signOut(){
        try {
          console.log("start")
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
