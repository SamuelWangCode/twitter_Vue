<template lang="html">
  <div id="LoginPage">
    <loadingAnimate v-if="loading" class="center-fix"/>
    <div id="head-div">
      <div id="logo" >
        <img src="static/icons8_planet_on_the_dark_side_128px.png" width="80" height="80">
      </div>
      <div id="WebName" style="font-size: 30px;color: white;float: left;margin-top: 43px;margin-left: 10px">
        MicroAround
      </div>
    </div>
    <div class="LoginFormContainer">
      <div class="Wrapper">
        <div class="LoginText">
          <span>Log in</span>
        </div>
        <div class="ErrHint alert alert-danger" v-if="errHint">
          {{ errHint }}
        </div>
        <div class="LoginInput" >
          <div class="account">
            <input size="large" type="text" v-model="email" placeholder="email" @keyup.enter="loginEventHandeler"></input>
          </div>
          <div class="password">
            <input size="large" type="password" v-model="password" placeholder="password" @keyup.enter="loginEventHandeler"></input>
          </div>
        </div>
        <div class="Submit">
          <button class="btn submit" type="button" @click="loginEventHandeler">Log in</button>
        </div>
      </div>
    </div>
    <div class="RegistHint">
      <div class="Wrapper">
        <div class="hint">
          <span>New?</span>
          <router-link to="/regist">Join now! »</router-link>
        </div>
      </div>
    </div>
    <div id="buttom-div">
      <div id="buttom-content" style="color: white;">
        <p>Contact us</p>
        <p>Address: School of Software, Tongji University, 4800 Caoan Road, Shanghai, China</p>
        <p>Zip code: 201804</p>
        <p> Contact number: 86-21-69589585, 69589932 (FAX)</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import loadingAnimate from "./animate/loading"
//import User from "./store/user"
axios.defaults.withCredentials = true;
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      errHint: '',
      loading:false
    }
  },
  created() {

},
  components:{
    loadingAnimate
  },
  methods: {
    async loginEventHandeler () {
      this.loading=true;
      try {
        console.log("start")
        let data = {
          email: this.email,
          password: this.password
        }
        this.signIn(data).then(Response=>{
          console.log(Response);
          if(Response.data.code==200 && Response.data.message=="Sign in success")
          {
            this.checkLogin().then(Response=>{
              console.log('aa',Response)
            })
            //成功
            //this.errHint="Success!";
            this.loading=false
            this.$Notice.success({
              title: 'Login Success!',
              desc:''
            })
            var i = Response.data.data.user_id
            //User.userID = i;
            //console.log(User.userID)
            //加入coockie
            this.setCookie("userID", i, 30)
            console.log(document.cookie)
            this.$router.push("/home");
          }
          else if(Response.data.code==200 && Response.data.message=="E-mail or Password Wrong")
          {
            //失败
            this.loading=false
            this.$Notice.error({
              title: 'E-mail or Password Wrong.',
              desc:''
            })
            this.errHint="E-mail or Password is Wrong!"
          }
          else{
            this.loading=false
            this.$Notice.error({
              title: "You have already loged in.",
              desc:''
            })
            this.errHint="You have already loged in."
          }
        });
      } catch (e) {
        this.loading=false
        return {
          result: false,
          errMsg: "Can't connect with server"
        };
      }
    }
  },
  beforeRouteEnter(to,from,next){
      next(vm=>{
        if(vm.getCookie("userID"))
        {
          console.log("请先登出")
          vm.$router.push("home")
        }
      })
    }
}

</script>

<style lang="css" scoped>
#LoginPage {
  height: calc(100vh - 46px);
  /* padding-top: 10px; */
  background-color: #e6ecf0;
}
#head-div
{
  top:0;
  height: 15%;
  width: 100%;
  background-color: #1da1f2;
  margin-bottom: 100px;
}
#buttom-div
{
  height: 15%;
  width: 100%;
  background-color: #1da1f2;
  position: fixed;
  bottom: 0;
}
#logo
{
  size: 20px;
  margin-top: 20px;
  margin-left: 20px;
  float: left;
}
#buttom-content
{
  margin-top: 10px;
  margin-left: 40px;
  float: left;
  font-size: 17px;
  text-align: left;
}
.LoginFormContainer {
  max-width: 840px;
  padding: 15px;
  margin: 0 auto;
}

.LoginFormContainer {
  background-color: white;
}

.Wrapper {
  max-width: 585px;
  padding: 0 10px;
  margin: 0 auto;
}

.LoginText {
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0 20px;
}

.LoginInput input {
  width: 97%;
  max-width: 280px;
  padding: 4px;
  border: 1px solid #e6ecf0;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
  line-height: 20px;
}

.LoginInput input:focus {
  outline: 0;
  color: #14171a;
  border-color: rgba(0,132,180,0.5);
}

.LoginInput .account {
  margin-bottom: 15px;
}

.Submit {
  margin-top: 30px;
}

.Submit button {
  background-color: #1da1f2;
  border: 1px solid #1da1f2;
  color: #fff;
  border-radius: 100px;
  box-shadow: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  white-space: nowrap;
}

.Submit button:hover {
  border-color: #1da1f2;
  background-color: #006dbf;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #71c9f8;
}

.RegistHint {
  padding: 20px 10px;
  background-color: #f5f8fa;
  font-size: 14px;
  line-height: 20px;
  color: #657786;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  max-width: 840px;
  margin: 0 auto;
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
