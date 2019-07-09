<style scoped>
.twi-text{
    font-size: 20px;
}
.normal-text{
}
.at-text{
    color: rgb(167, 90, 45);
}
.at-text:hover{
    cursor: pointer;
}
.topic-text{
    color:rgb(83, 142, 170);
}
.topic-text:hover{
    cursor: pointer;
}

</style>

<template>
<div>
    <span class="twi-text" v-for="text in textArr">
        
        <span v-if="text.type=='normal'" class="normal-text">
            {{text.content}}
        </span>
        <span v-if="text.type=='at'" class="at-text" @click="doAtToUserHome(text.id)">
            {{text.content}}
        </span>
        <span v-if="text.type=='topic'" class="topic-text" @click="doTopicToTopic(text.id)">
            {{text.content}}
        </span>
    </span>
</div>
</template>

<script>
/*
        <span v-if="text.type=='normal'" class="normal-text">
            {{text.content}}
        </span>
        <span v-if="text.type=='at'" class="at-text" @click="doAtToUserHome(text.id)">
            {{text.content}}
        </span>
        <span v-if="text.type=='topic'" class="topic-text" @click="doTopicToTopic(text.id)">
            {{text.content}}
        </span>
*/
export default {
    props:{
        fullText:String,
        ats:Array,
        topics:Array,
    },
    data(){
        return {
            textArr:[],//用于保存普通字符、at的字符、topic的字符组成的数组。
        }
    },
    methods:{
        doAtToUserHome(userId){
            console.log("去的用户id是",userId);
        },
        doTopicToTopic(topicId){
            console.log("去的话题id是",topicId);
        },
        solveText(){
            //保存找到的topic和at的字符串的索引位置
            let index=[];
            //查找fullText的topic子字符串
            if (this.topics!=null){
                //设置辅助数组判断这个起始位置是否被使用，如果使用则在这个位置+1开始找下一个
                let startArr=[];
                for (let i=0;i<this.topics.length;i++){
                    let start = this.fullText.indexOf(this.topics[i].topicName);//获得字符串的开始位置
                    while(startArr.indexOf(start)>=0){
                        start= this.fullText.indexOf(this.topics[i].topicName,start+1);
                    }
                    startArr.push(start);
                    //index中加入对象，type保存是topic话题还是at还是normal普通内容，s是开始位置，l长度，id是at的或topic的id
                    index.push({type:"topic",id:this.topics[i].topicId,s:start,l:this.topics[i].topicName.length});
                }
            }

            if (this.ats!=null){
            //查找at子字符串
                let startArr=[];
                for (let i=0;i<this.ats.length;i++){
                    let start = this.fullText.indexOf(this.ats[i].atName);//获得字符串的开始位置
                    while(startArr.indexOf(start)>=0){
                        start= this.fullText.indexOf(this.ats[i].atName,start+1);
                    }
                    startArr.push(start);
                    index.push({type:"at",id:this.ats[i].atIds,s:start,l:this.ats[i].atName.length});
                }
            }

            //冒泡排序
            for(let i=0;i<index.length;i++){
                for (let j=1;j<index.length;j++){
                    if (index[j-1].s>index[j].s){
                        let temp=index[j-1];
                        index[j-1]=index[j];
                        index[j]=temp;
                    }
                }
            }
            //console.log("排序后的推文",index);

            //把所有内容加入textArr
            //如果有at或者topic，即index不为空
            if (index.length>0){
                //第一个at或者topic前的文字，可以为空加入
                let firstText=this.fullText.substr(0,index[0].s);
                this.textArr.push({type:"normal",content:firstText});
                //第一个at或者topic
                if (index[0].type=="at"){
                    //推文的at或者topic之间的那些内容先保存在tempNormalStr里
                    let tempNormalStr=this.fullText.substr(index[0].s,index[0].l);
                    this.textArr.push({type:"at",id:index[0].id,content:tempNormalStr});
                }
                else if(index[0].type=="topic"){
                    //推文的at或者topic之间的那些内容先保存在tempNormalStr里
                    let tempNormalStr=this.fullText.substr(index[0].s,index[0].l);
                    this.textArr.push({type:"topic",id:index[0].id,content:tempNormalStr});
                }
                
                //console.log("第一个",this.textArr);
                //循环加入后面的每一个at和topic和之前的到上一个at和topic的普通文字
                //第二段开始的文字和at和topic，


                for (let i=1;i<index.length;i++){
                    //加入后面的每一个at和topic和之前的到上一个at和topic的普通文字
                    let start=index[i-1].s + index[i-1].l;
                    let len=index[i].s - start;
                    let tempNormalStr=this.fullText.substr(start, len);
                    this.textArr.push({type:"normal",content:tempNormalStr});
                    if (index[i].type=="at"){
                        //推文的at或者topic之间的那些内容先保存在tempNormalStr里
                        tempNormalStr=this.fullText.substr(index[i].s,index[i].l);
                        this.textArr.push({type:"at",id:index[i].id,content:tempNormalStr});
                    }
                    else if(index[i].type=="topic"){
                        //推文的at或者topic之间的那些内容先保存在tempNormalStr里
                        tempNormalStr=this.fullText.substr(index[i].s,index[i].l);
                        this.textArr.push({type:"topic",id:index[i].id,content:tempNormalStr});
                    }
                }
                //console.log("最后的数组",this.textArr);

            }
            //如果没有那就一个普通文字
            else{
                this.textArr.push({type:"normal",content:this.fullText});
            }
            
        }
    },
    created(){
        //console.log("fulltext",this.fullText);
        //console.log("this.ats",this.ats);
        this.solveText();
        
    },
}
        
</script>