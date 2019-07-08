<style scoped>


</style>

<template>
<div>
    <div class="twi-text">
        {{fullText}}
    </div>
</div>
</template>

<script>
export default {
    props:{
    },
    data(){
        return {

        fullText:String,
        ats:Array,
        topics:Array,
        textArr:Array,//用于保存普通字符、at的字符、topic的字符组成的数组。
        }
    },
    methods:{
        solveText(){
            //保存找到的topic和at的字符串的索引位置
            this.fullText="呜呜呜呜呜呜呜呜无@1哈哈哈哈哈哈哈哈#2#呃呃呃呃呃呃@3的顶顶顶顶顶的顶顶顶顶顶#4#@5啦啦啦啦啦啦啦";
            this.topics=[{topicId:2,topicName:"#2#"},{topicId:4,topicName:"#4#"}];
            this.ats=[{atId:1,atName:"@1"},{atId:3,atName:"@3"},{atId:5,atName:"@5"}];
            let index=[];
            //查找fullText的topic子字符串
            for (let i=0;i<this.topics.length;i++){
                let start = this.fullText.indexOf(this.topics[i].topicName);//获得字符串的开始位置
                //index中加入对象，type保存是topic话题还是at还是normal普通内容，s是开始位置，l长度，id是at的或topic的id
                index.push({type:"topic",id:this.topics[i].topicId,s:start,l:this.topics[i].topicName.length});
            }
            //查找at子字符串
            for (let i=0;i<this.ats.length;i++){
                let start = this.fullText.indexOf(this.ats[i].atName);//获得字符串的开始位置
                index.push({type:"at",id:this.ats[i].atId,s:start,l:this.ats[i].atName.length});
            }
            //冒泡排序
            for(let i=0;i<index.length;i++){
                for (let j=i+1;j<index.length;j++){
                    if (index[j-1].s>index[j].s){
                        let temp=index[j-1];
                        index[j-1]=index[j];
                        index[j]=temp;
                    }
                }
            }
            console.log("排序后的推文",index);
            //把所有内容加入textArr
            /*
            let start=0;
            for (let i=0;i<index.length-1;i++){
                this.textArr.push({type:"normal",content:this.fullText.substr(start,index[i].s)});
                this.textArr.push({type:"at",content:this.fullText.substr(start,index[i].s)});
                this.textArr.push({type:"topic",content:this.fullText.substr(start,index[i].s)});
            }
            */
        }
    },
    created(){
        this.solveText();
    },
}
        
</script>