
<template>
  <div id="app">
    <section>
    <nav class="navBar">
<<<<<<< HEAD
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
    
=======
    <Row style="padding-top:10px;">
      <Col :span="2" :order="0" :offset="1" class="HomeBar">
      <Icon type="ios-home" :size="30" color="rgb(29,161,242)">
      </Icon><span class="BarName">Home</span>
      </Col>
      <Col :span="2">
      <Icon type="ios-notifications" :size="30" color="rgb(120, 133, 142)">
      </Icon><span class="BarName">Notifications</span>
      </Col>
      <Col :span="2">
      <Icon type="ios-mail" :size="30" color="rgb(120, 133, 142)">
      </Icon><span class="BarName">Message</span>
      </Col>
      <Col :span="7"> &nbsp;
      <Icon type="logo-twitter" :size="30" color="rgb(29,161,242)">
      </Icon>
      </Col>
      <Col :span="6">
        <Select v-model="model11" filterable placeholder="search..." not-found-text="No matching search." clearable prefix="ios-search">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col :span="1">;
      <img src=".\assets\timg (1).jpg" alt="headIcon" style="border-radius:50%; width:32px; height:32px; border:solid 1px #66757f;">
      </Col>
      <Col :span="1"> 
        <Button><b>Tweets</b>
        </Button>
      </Col>
    </Row>
>>>>>>> parent of faee1c6... change Nav to Menu, add routers
    </nav>
  </section>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
  .BarName {
    color: rgb(120, 133, 142);

  }
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
