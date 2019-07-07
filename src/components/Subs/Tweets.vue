<style scoped>
.tweet-items{
    text-align: left;
    margin-top: 10px;
}
</style>




<template>
    <div class="tweet-items">
        <div v-for="item in items">
            <twiitem v-bind:item="item" class="tweet-items"></Twiitem>
            <p>————————————————————————————————————————————————————————</p>
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
            for (let i=0;i<this.twiDatas.length;i++){
                let itemTemp=JSON.parse(this.twiDatas[i]);
                itemTemp.ifShowComment=false;
                itemTemp.comments=[];
                itemTemp.userInfo={};

                this.items.push(itemTemp);
                this.items[i].userInfo={user_id: 16, nickname: "qwe", avatar_url: "http://106.14.3.200:8090/bgimg.jpeg"};
                console.log("这里应该有用户信息",this.items[i]);
                this.$http.get(
                    "http://localhost:12293/api/User/query/",this.items[i].message_sender_user_id
                ).then(Response=>{
                    if('message'=='success'){
                        //this.item[i].userInfo=JSON.parse(Response.data);
                    }
                });
            }
            //console.log("asdads",this.items[0]);
        }
    },
    created(){
        this.twiDatas=['{"message_transpond_message_id":4,"message_is_transpond":1,"message_sender_user_id":2,"message_id":1,"message_create_time":"2019-10-3","message_content":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60,"collectbyuser":true,"likebyuser":false}',
                            '{"message_transpond_message_id":4,"message_is_transpond":0,"message_sender_user_id":3,"message_id":2,"message_create_time":"2019-3-2","message_content":"哦噢噢噢噢哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60,"collectbyuser":true,"likebyuser":true}',
                            '{"message_transpond_message_id":4,"message_is_transpond":1,"message_sender_user_id":3,"message_id":3,"message_create_time":"2019-3-2","message_content":"哦","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60,"collectbyuser":true,"likebyuser":false}',
                            '{"message_transpond_message_id":4,"message_is_transpond":0,"message_sender_user_id":3,"message_id":4,"message_create_time":"2019-3-2","message_content":"我要发4张图片","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60,"collectbyuser":true,"likebyuser":false}',
                            ];
        this.generateData();
    },
    components:{
        "twiitem":TwiItem,
    }
}
</script>