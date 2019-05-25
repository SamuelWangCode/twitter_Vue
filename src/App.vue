
<template>
  <div id="app">
    <section>
    <nav class="navBar">
     <Menu mode="horizontal" :theme="theme1" active-name="home" style="padding-left:15%;" @on-select="onSelect">
        <MenuItem name="home" key="Home">
            <Icon type="ios-home" size="24"></Icon>
            <router-link to="/home">
            Home
            </router-link>
        </MenuItem>
        <MenuItem name="notifications" key="Notifications">
            <Icon type="ios-notifications" size="24"></Icon>
            <router-link to="/notifications">
            Notifications
            </router-link>
        </MenuItem>
        <MenuItem name="message" key="Message">
            <Icon type="ios-mail" size="24"></Icon>
            <router-link to="/message">
            Message
            </router-link>
        </MenuItem>
        <Select
            v-model="model13" filterable remote:remote-method="remoteMethod1" :loading="loading1" placeholder="Search in twitter"  not-found-text="no matching result" prefix="ios-search" style="width:400px;">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
        <MenuItem name="personal" key="Personal">
          <router-link to="/personal">
            <Icon type="ios-person" size="24"></Icon>
            Personal
            </router-link>
        </MenuItem>
        <MenuItem name="explore" key="Explore">
          <router-link to="/explore">
            <Icon type="ios-person" size="24"></Icon>
            #
          </router-link>
        </MenuItem>
    </Menu>
    
    </nav>
  </section>
    <router-view/>
  </div>
</template>

<script>
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
