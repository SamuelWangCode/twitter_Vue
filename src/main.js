// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios'
import iView from 'iview'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
//写cookies
Vue.prototype.setCookie = function (name,value)
{
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//读取cookies
Vue.prototype.getCookie = function (name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg)) return unescape(arr[2]);
else return null;
}
//删除cookies
Vue.prototype.delCookie = function (name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//developed by 杨紫超
function checkNumber(){
  for(var i=0; i<arguments.length; i++){
    if(!arguments[i] instanceof Number){
      return false;
    }
  }
  return true;
}
function checkString(){
  for(var i=0; i<arguments.length; i++){
    if(!arguments[i] instanceof String){
      return false;
    }
  }
  return true;
}
function post(url, data){
  return axios({
    method: "POST",
    url: "http://localhost:12293/" + url,
    data: data,
  })
}
function get(url){
  return axios.get("http://localhost:12293/" + url);
}
///////////////////////////////////////////
//USER
//getUserPublicInfo
Vue.prototype.getUserPublicInfo = function (user_id)
{
  if(!checkNumber(user_id)){
    return null;
  }
  return get("api/User/query/" + user_id);
}
//register(data : {email, password, nickname})
Vue.prototype.register = function (data){
  if(!checkString(data.email, email.password, data.nickname)){
    return null;
  }
  return post("api/User/signUp", data);
}
//signIn(data : {email, password})
Vue.prototype.signIn = function (data){
  if(!checkString(data.email, data.password)){
    return null;
  }
  return post("api/User/signIn", data);
}
//editInfo(data: {nickname, password. realname, gender, self_introduction})
Vue.prototype.editInfo = function (data){
  if(!checkString(data.nickname, data.password, data.realname, data.gender, data.self_introduction)){
    return null;
  }
  return post("api/User/editInfo", data);
}
//setAvatar(avatar_id)
Vue.prototype.setAvatar = function (avatar_id){
  if(!checkNumber(avatar_id)){
    return null;
  }
  return get("api/User/setAvatar/" + avatar_id);
}
//getAvatarImageSrc(user_id)
Vue.prototype.getAvatarImageSrc = function (user_id){
  if(!checkNumber(user_id)){
    return null;
  }
  return get("api/User/getAvatarImageSrc/" + user_id);
}
//logOut()
Vue.prototype.logOut = function (){
  return get("api/User/logOut");
}
//uploadAvatar(formData)
// formData : {'file': file}
Vue.prototype.uploadAvatar = function (formData){
  return post("api/User/uploadAvatar", formData);
}
///////////////////////////////////////////
//RECOMMEND
//getRecommendUsers()
Vue.prototype.getRecommendUsers = function(){
  return get("api/Recommend/getRecommendUsers");
}
///////////////////////////////////////////
//SEARCH
//search(searchKey)
Vue.prototype.search = function(searchKey){
  if(!checkString(searchKey)){
    return null;
  }
  return get("api/Search/" + searchKey);
}

/////////////////////////////////////////////
//TOPIC
//queryMessagesContains(topic_id)
Vue.prototype.queryMessagesContains = function(topic_id, startFrom, limitation){
  if(!checkNumber(topic_id)){
    return null;
  }
  startFrom = startFrom || 0;
  limitation = limitation || 10;
  var data = {
    startFrom : startFrom,
    limitation : limitation
  }
  return post("api/Topic/queryMessagesContains/" + topic_id, data);
}
//queryTopicsBaseOnHeat(startFrom, limitation)
Vue.prototype.queryTopicsBaseOnHeat = function(startFrom, limitation){
  startFrom = startFrom || 0;
  limitation = limitation || 10;
  var data = {
    startFrom : startFrom,
    limitation : limitation
  }
  return post("api/Topic/queryTopicsBaseOnHeat", data);
}
/////////////////////////////////////////////
//RELATION
var RELATION = "api/Relation/";
//follow(user_id)
Vue.prototype.follow = function(user_id){
  if(!checkNumber(user_id)){
    return null;
  }
  return get(RELATION + "follow/" + user_id);
}
//queryFollowingFor(user_id, startFrom, limitation)
Vue.prototype.queryFollowingFor = function(user_id, startFrom, limitation){
  if(!checkNumber(user_id)){
    return null;
  }
  startFrom = startFrom || 0;
  limitation = limitation || 10;
  var data = {
    startFrom : startFrom,
    limitation : limitation
  }
  return post(RELATION + "queryFollowingFor/" + user_id, data);
}
//queryFollowersFor(user_id, startFrom, limitation)
Vue.prototype.queryFollowersFor = function(user_id, startFrom, limitation){
  if(!checkNumber(user_id)){
    return null;
  }
  startFrom = startFrom || 0;
  limitation = limitation || 10;
  var data = {
    startFrom : startFrom,
    limitation : limitation
  }
  return post(RELATION + "queryFollowersFor/" + user_id, data);
}
//cancelFollowingTo(user_id)
Vue.prototype.cancelFollowingTo = function(user_id){
  if(!checkNumber(user_id)){
    return null;
  }
  return get(RELATION + "cancelFollowingTo" + user_id);
}
//if_following(follower_id, be_followed_id)
Vue.prototype.if_following = function(follower_id, be_followed_id){
  if(!checkNumber(follower_id, be_followed_id)){
    return null;
  }
  return post(RELATION + "if_following?follower_id="+ follower_id +"&be_followed_id=" + be_followed_id);
}
//if_following_by_me(be_followed_id)
Vue.prototype.if_following_by_me = function (be_followed_id){
  if(!checkNumber(be_followed_id)){
    return null;
  }
  return get(RELATION + "if_following_by_me/" + be_followed_id);
}
/////////////////////////////////////////////////////
//LIKE点赞
//like(message_id)
var LIKE = "api/Like/";
Vue.prototype.like = function (message_id){
  if(!checkNumber(message_id)){
    return null;
  }
  return get(LIKE + "message");
}
//cancelLike(message_id)
Vue.prototype.cancelLike = function (message_id){
  if(!checkNumber(message_id)){
    return null;
  }
  return get(LIKE + "cancel/" + message_id);
}
//queryLikes(user_id)
Vue.prototype.queryLikes = function (user_id){
  if(!checkNumber(user_id)){
    return null;
  }
  return get(
    LIKE + "query/" + user_id + "?startFrom=" + startFrom + "&limitation=" + limitation
  )
}
//checkUserLikesMessage(user_id, message_id)
Vue.prototype.checkUserLikesMessage = function (user_id, message_id){
  if(!checkNumber(user_id, message_id)){
    return null;
  }
  //return post()
  //TODO
}




Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(iView, {
  transfer: true,
  select: {
      arrowSize: 0
  }
});
Vue.use(ElementUI)
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
  



