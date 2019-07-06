<template lang="html">
  <div id="RegistPage">
    <loadingAnimation v-if="loading"/>
    <div class="RegistFormContainer">
      <div class="Wrapper">
        <div class="RegistText">
          <span>Set up your account</span>
        </div>
        <div class="ErrHint alert alert-danger" v-if="errHint">
          {{ errHint }}
        </div>
        <div class="RegistInput">
          <div class="username">
            <input type="text" v-model="name" placeholder="user name">
          </div>
          <div class="account">
            <input type="text" v-model="email" placeholder="email">
          </div>
          <div class="password">
            <input type="password" v-model="password" placeholder="password">
          </div>
          <div class="password-confirm">
            <input type="password" v-model="password2" placeholder="password-confirm">
          </div>
        </div>
        <div class="Submit">
          <button class="btn submit" type="button" @click="registEventHandler">Regist</button>
        </div>
      </div>
    </div>
    <div class="LoginHint">
      <div class="Wrapper">
        <div class="hint">
          <span>Has an account?</span>
          <router-link to="/login">Log in now! »</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import loadingAnimation from './animate/loading'
axios.defaults.withCredentials = true;
export default {
  name: "Register",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      password2: null,
      errHint: "",
      loading: false
    };
  },
  components: {
    loadingAnimation
  },
  methods: {
    async registEventHandler() {
      this.loading=true;
      var regAccount=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      var regPassword=/^[0-9a-zA-Z_#@!\?\-\\]{6,20}$/
      if(!regAccount.test(this.email))
      {
        this.loading=false;
        this.errHint = "Your account should be a valid e-mail.";
        this.$Notice.error({
              title: 'Please input your e-mail again.',
              desc:''
            })
        return;
      }
      else if(!this.name)
      {
        this.loading=false;
        this.errHint = "You should have a nickname.";
        this.$Notice.error({
              title: 'Please input your name again.',
              desc:''
            }) 
        return;
      }
      else if(!regPassword.test(this.password))
      {
        this.loading=false;
        this.errHint = "Your password should be more than 6 characters, and don't use special character.";
        this.$Notice.error({
              title: 'Please input your password again.',
              desc:''
            }) 
        return;
      }
      else if(this.password!=this.password2)
      {
        this.loading=false;
        this.errHint = "The two passwords did not match!";
        this.$Notice.error({
              title: 'Please input your password again.',
              desc:''
            }) 
        return;
      }
      
      try {
        console.log("start")
        let data = {
          nickname: this.name,
          email: this.email,
          password: this.password
        }
        axios.post(
          `http://localhost:12293/api/User/signUp`,
          data
        ).then(Response=>{
          console.log(Response.data);
          
          if(Response.data.code==200 && Response.data.message=="success")
          {
            //成功
            //this.errHint="Success!";
            this.$Notice.success({
              title: 'Register Success!',
              desc:''
            })
            this.loading=false 
            this.$router.push("/login");
          }
          else if(Response.data.code==200 && Response.data.message=="The email is used")
          {
            //邮箱已被使用
            this.loading=false
            this.$Notice.error({
              title: 'This email is used.',
              desc:''
            })
            this.errHint="The email is used!"
          }
          else{
            this.loading=false
            this.$Notice.error({
              title: "Can't connect with server.",
              desc:''
            })
            this.errHint="Can't connect with server."
          }
        });
      } catch (e) {
        this.loading=false;   
        return {
          result: false,
          errMsg: "Can't connect with server"
        };
      }
    }
  }
};
</script>

<style lang="css" scoped>
.ErrHint{
  color:red;
  font-size: 16px;
}
#RegistPage {
  height: calc(100vh - 46px);
  padding-top: 10px;
  background-color: #e6ecf0;
}

.RegistFormContainer {
  max-width: 840px;
  padding: 15px;
  margin: 0 auto;
}

.RegistFormContainer {
  background-color: white;
}

.Wrapper {
  max-width: 585px;
  padding: 0 10px;
  margin: 0 auto;
}

.RegistText {
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0 20px;
}

.RegistInput input {
  width: 97%;
  max-width: 280px;
  padding: 4px;
  border: 1px solid #e6ecf0;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
  line-height: 20px;
}

.RegistInput input:focus {
  outline: 0;
  color: #14171a;
  border-color: rgba(0, 132, 180, 0.5);
}

.RegistInput .username,
.RegistInput .account,
.RegistInput .password {
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

.LoginHint {
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
</style>
