<style scoped>
.tweet-items{
    text-align: left;
    margin-top: 10px;
    width:100%;
}
.load-more{
    font-size: 30px;
    color: #222222;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: white;
    width:100%;
}

.load-more:hover{
    cursor: pointer;
}
.no-more{
    width:100%;
    color: #CCCCCC;
}
</style>




<template>
    <div>
        <div v-for="item in items">
            <twiitem v-bind:item="item" class="tweet-items" @likeTwi="doLike(item)" @collectTwi="doCollect(item)" @follow="doFollow(item)"></Twiitem>
            <divider/>
        </div>
        <div v-if="ableShowMore" class="load-more" @click="loadMore()">加载更多</div>
        <div v-else class="no-more">已无更多内容</div>
    </div>
</template>


<script>
import axios from 'axios'
import TwiItem from './TweetSingle'
export default {
    name:'twitter-items',
    props:{
        type:"",
        //如果是topic就传入topic_id，search就search key，自己主页用户id，别人主页也是用户id
        info:""
    },
    data(){
        return {
            items:[],
            twiDatas:[],   
            userDatas:"",
            showBigImage:false,
            BigImageSource:"",
            ableShowMore:true,

            burl:"http://localhost:12293/",
        }
    },
    methods:{
        doLike(item){
            item.likeByUser=!item.likeByUser;
        },
        doCollect(item){
            item.collectByUser=!item.collectByUser;
        },
        doFollow(item){
            item.followByUser=!item.followByUser;
        },
        getCookies(name){
            return this.getCookie(name);
        },

        loadMore(){
            //测试时把整个函数替换成/**/里的内容
            /*
            this.twiDatas=['{"message_transpond_message_id":4,"message_is_transpond":1,"message_sender_user_id":2,"message_id":1,"message_create_time":"2019-10-3","message_content":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg"],"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":0,"message_sender_user_id":3,"message_id":2,"message_create_time":"2019-3-2","message_content":"哦噢噢噢噢哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":1,"message_sender_user_id":3,"message_id":3,"message_create_time":"2019-3-2","message_content":"哦","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":0,"message_sender_user_id":3,"message_id":4,"message_create_time":"2019-3-2","message_content":"我要发4张图片","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            ];
            this.generateData();
            */
            this.downloadData();
        },
        //下载数据
        downloadData(){
            if(this.type=="explore"){
                this.queryMessagesOf(this.getCookies("userID"),this.items.length + 1, 10).then(Response=>{
                    this.twiDatas=Response.data.data;
                    console.log(this.twiDatas);
                    this.generateData();
                });
            }
            else if(this.type=="topic"){
                this.queryMessagesContains(this.info, this.items.length + 1, 10).then(Response=>{
                    this.twiDatas=Response.data.data;
                    console.log(this.twiDatas);
                    this.generateData();
                });
            }
            else if(this.type=="home"){
                this.queryMessagesOf(this.getCookies("userID"),this.items.length + 1, 10).then(Response=>{
                    this.twiDatas=Response.data.data;
                    this.generateData();
                });
            }
            else if(this.type=="collection"){
                this.queryCollections(this.items.length + 1, 10).then(Response=>{
                    this.twiDatas=Response.data.data;
                    this.generateData();
                });
            }
            else if(this.type=="userhome"){
                this.queryMessagesOf(this.info, this.items.length + 1, 10).then(Response=>{
                    this.twiDatas=Response.data.data;
                    this.generateData();
                });
            }
            else if(this.type=="search"){
                this.search(this.info, this.items.length + 1, 10).then(Response=>{
                    this.twiDatas=Response.data.data.twitters;
                    this.generateData();
                });
            }
        },
        //下载数据后解析数据
        generateData(){
            //如果没有数据或者没有数据了
            if (this.twiDatas.length==0){
                this.ableShowMore==false;
                return ;
            }
            //取得当前保存的推特总数
            let twiCount=this.items.length;
            for (let i=0;i<this.twiDatas.length;i++){
                //还有一些属性需要自己去获取，包括是否被....以及用户的....
                let itemTemp=this.twiDatas[i];
                itemTemp.ifShowComment=false;
                itemTemp.comments=[];
                itemTemp.userName="用户";
                itemTemp.userAvt="";
                itemTemp.collectByUser=false;
                itemTemp.likeByUser=false;
                itemTemp.followByUser=false;
                itemTemp.comments=[];
                if(itemTemp.message_ats==null){
                    itemTemp.message_ats=[];
                }
                if(itemTemp.message_topics==null){
                    itemTemp.message_topics=[];
                }
                if (itemTemp.message_image_urls==null){
                    itemTemp.message_image_urls=[];
                }
                //可以先解析已有内容

                //取用户数据
                //获取以上的数据，这里由于可能是第二次拿数据，因此i+twiCount才是当前要处理的推的索引
                this.getUserPublicInfo(itemTemp.message_sender_user_id).then(Response=>{
                    itemTemp.userName=Response.data.data.nickname;
                    itemTemp.userAvt=Response.data.data.avatar_url;

                    //有了推文和用户基本信息后加入数组，其他信息tweetsingle自行判断
                    this.items.push(itemTemp);

                });
                

                
            }
            //完成加入后清空twiDatas，必须有，否则验证出错
            this.twiDatas=[];
            //console.log("asdads",this.items[0]);
        },
    },
    created(){
        //测试时把整个函数替换成/**/里的内容
        /*
        this.twiDatas=['{"message_transpond_message_id":4,"message_is_transpond":1,"message_sender_user_id":2,"message_id":1,"message_create_time":"2019-10-3","message_content":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg"],"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":0,"message_sender_user_id":3,"message_id":2,"message_create_time":"2019-3-2","message_content":"哦噢噢噢噢哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":1,"message_sender_user_id":3,"message_id":3,"message_create_time":"2019-3-2","message_content":"哦","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8086/userimg/1.jpg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            '{"message_transpond_message_id":4,"message_is_transpond":0,"message_sender_user_id":3,"message_id":4,"message_create_time":"2019-3-2","message_content":"我要发4张图片","message_image_urls":["http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg","http://106.14.3.200:8090/bgimg.jpeg"],"collectnum":5,"message_comment_num":4,"message_transpond_num":34,"message_agree_num":60}',
                            ];
        this.generateData();
        */
        this.downloadData();
    },
    components:{
        "twiitem":TwiItem,
    }
}
</script>
