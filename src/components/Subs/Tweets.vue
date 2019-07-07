<style scoped>
.tweet-items{
    text-align: left;
    margin-top: 10px;
}
</style>




<template>
    <div class="tweet-items">
        <div v-for="item in items">
            <twiitem v-bind:item="item" class="tweet-items" @likeTwi="like(item)" @collectTwi="collect(item)" @follow="follow(item)"></Twiitem>
            <divider/>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import TwiItem from './TweetSingle'
export default {
    name:'twitter-items',
    props:{
        type:"",
        topic_id:""
    },
    data(){
        return {
            items:[],
            twiDatas:"",   
            userDatas:"",
            showBigImage:false,
            BigImageSource:"",


            burl:"http://localhost:12293/",
        }
    },
    methods:{
        //下载数据
        downloadData(){
            if(this.type=="explore"){
                let getData = {
                    startFrom: this.items.length,
                    limitation: 10,
                }
                axios.get(
                    'http://localhost:12293/api/Topic/queryTopicsBaseOnHeat',getData
                ).then(Response=>{
                    this.generateData();
                });
            }
            else if(this.type=="topic"){
                let getData = {
                    startFrom: this.items.length,
                    limitation: 10,
                }
                axios.get(
                    'http://localhost:12293/api/Topic/queryMessageIdsContains/'+this.topic_id,getData
                ).then(Response=>{
                    this.generateData();
                });
            }
            else if(this.type=="home"){
                let postData = {
                    startFrom: this.items.length,
                    limitation: 10,
                }
                axios.post(
                    'http://localhost:12293/api/Message/queryForIndex',postData
                ).then(Response=>{
                    this.generateData();
                });
            }
        },
        //下载数据后解析数据
        generateData(){
            //取得当前保存的推特总数
            let twiCount=this.items.length;
            for (let i=0;i<this.twiDatas.length;i++){
                let itemTemp=JSON.parse(this.twiDatas[i]);
                //还有一些属性需要自己去获取，包括是否被....以及用户的....
                itemTemp.ifShowComment=false;
                itemTemp.comments=[];
                itemTemp.userInfo={};
                itemTemp.collectByUser=false;
                itemTemp.likeByUser=false;
                itemTemp.followByUser=false;
                itemTemp.comments=[];
                //先解析已有内容
                this.items.push(itemTemp);
                //获取以上的数据，这里由于可能是第二次拿数据，因此i+twiCount才是当前要处理的推的索引
                this.items[i+twiCount].userInfo={user_id: 16, nickname: "qwe", avatar_url: "http://106.14.3.200:8090/bgimg.jpeg"};
                
                //求证是否点赞
                let tempData={
                    //这是登录用户的id不是发推用户的
                    user_id:0,
                    message_id:0,
                }
                this.$http.post(
                    "http://localhost:12293/api/Like/checkUserLikesMessage",tempData
                ).then(Response=>{
                    if('message'=='success'){
                        this.item[i+twiCount].likeByUser=Response.data.message;
                    }
                });
                //求证是否收藏
                tempData={
                    //这是登录用户的id不是发推用户的
                    user_id:1,
                    message_id:1,
                }
                this.$http.post(
                    "http://localhost:12293/api/Collection/checkUserLikesMessage",tempData
                ).then(Response=>{
                    if('message'=='success'){
                        this.item[i+twiCount].collectByUser=Response.data.message;
                    }
                });
                //求证是否关注了用户

                //求用户信息
                this.$http.get(
                    "http://localhost:12293/api/User/query/",this.items[i].message_sender_user_id
                ).then(Response=>{
                    if('message'=='success'){
                        //this.item[i].userInfo=JSON.parse(Response.data);
                    }
                });
            }
            //完成加入后清空twiDatas，必须有，否则验证出错
            this.twiDatas="";
            //console.log("asdads",this.items[0]);
        },

        like(item){
            item.likeByUser=!item.likeByUser;
            console.log("ok");
        },
        collect(item){
            item.collectByUser=!item.collectByUser;
        },
        follow(item){
            item.followByUser=!item.followByUser;
        }
    },
    created(){
        this.twiDatas=['{"message_transpond_message_id":4,"message_is_transpond":1,"message_sender_user_id":2,"message_id":1,"message_create_time":"2019-10-3","message_content":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg"],"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":0,"message_sender_user_id":3,"message_id":2,"message_create_time":"2019-3-2","message_content":"哦噢噢噢噢哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":1,"message_sender_user_id":3,"message_id":3,"message_create_time":"2019-3-2","message_content":"哦","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":0,"message_sender_user_id":3,"message_id":4,"message_create_time":"2019-3-2","message_content":"我要发4张图片","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            ];
        this.generateData();
    },
    components:{
        "twiitem":TwiItem,
    }
}
</script>
