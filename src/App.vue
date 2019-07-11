<template>
  <div id="app" >
    <section v-if="$route.meta.keepAlive">
      <nav class="navBar" style="z-index: 1">
        <Menu mode="horizontal" :theme="theme1" active-name="home" style="padding-left:10%;" @on-select="onSelect">
          <MenuItem name="home" router-link="{path: '/'}" style="width:9%" key="Home">
            <div class="over"><Icon type="ios-home" class="menuIcon"></Icon>
            <span class="menuWords">Home</span></div>
          </MenuItem>
          <MenuItem  name="notifications" router-link="{path: '/Notifications'}" style="width:13%" key="Notifications" @click.native="isRead"  >
            <div class="over"><Icon type="ios-notifications" class="menuIcon" ></Icon>
            <span class="menuWords">Notifications</span>
            <Badge v-bind:count="mentionedCount"></Badge></div>
          </MenuItem>
          <MenuItem name="message" router-link="{path: '/Message'}" style="width:11%" key="Message">
            <div class="over"><Icon type="ios-mail" class="menuIcon"></Icon>
            <span class="menuWords">Message</span></div>
          </MenuItem>
          <MenuItem name="personal" router-link="{path: '/Personal'}" style="width:11%" key="Personal">
            <div class="over"><Icon type="ios-person" class="menuIcon"></Icon>
            <span class="menuWords">Personal</span></div>
          </MenuItem>
          <MenuItem name="explore" router-link="{path: '/Explore'}" style="width:10%" key="Explore">
            <div class="over"><Icon type="ios-eye" class="menuIcon"></Icon>
            <span class="menuWords">Explore</span></div>
          </MenuItem>
          <Input v-model = "model13" @keyup.enter.native="handleSearch" placeholder="search in twitter" style="width: 25%;"></Input><Button shape="circle" @click="handleSearch" icon="ios-search" size="small" style="border:0;"></Button>
          <Button shape="circle" type="error" style="margin-left:20px;" @click = "signOut">Log out</Button>
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
        mentionedCount:0,
        theme1:"light",
        model13: '',
        loading1: false,
        list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
      }
    }
    ,
    mounted(){
      let _this=this;
      this.getAt();
        setInterval(function () {
          _this.getAt();
        },5000)
        },

    methods:{
      isRead(){
        this.mentionedCount = 0;
        console.log("读了")
      }
      ,

      handleSearch()
      {
        this.$router.push({
          path:'/searchResult',
          query:{
            searchKey:this.model13
          }
        })
        this.$router.go(0)
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
      },
      getAt(){
        try{
          console.log("艾特")
            this.queryUnreadAt().then((response)=>{
              console.log("艾特數量", response)
              if(response.data.code==200&&response.data.message=="success"){
                console.log("設置mentionedCount")
                this.mentionedCount=response.data.data
              }
            })
        }
        catch (e) {
          console.log("cannot connect to server!")
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
  .menuIcon{
    font-size: 20px;
    margin-top: 18px;
    margin-right: 0;
    float:left;
  }
  .menuWords{
    float: left;
    font-size: 14px;
    margin-left: 5%;
    display: inline;
  }
  .over{
    width:120%;
    display: inline-block;
    height: 100%;
    overflow: hidden;
  }
</style>
