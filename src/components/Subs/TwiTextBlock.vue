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
    <p>
        <span class="twi-text">        
            {{fullText}}
        </span>
    </p>
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
            url:"http://localhost:12293/"
        }
    },
    methods:{
        doAtToUserHome(text){
            
        },
        doTopicToTopic(text){
            this.$router.push({path:'/Topic', query: { topic_id:text.id }});
        },
        solveText(){
            for(let i=0;i<this.ats.length;i++){
                let start=this.fullText.indexOf(this.ats[i].atName);
                
            //alert(this.fullText);
                
                this.fullText=this.fullText.substr(0,start)
                    +"<a href='"+this.url+"zoom?user_id="+this.ats[i].atIds+">"+this.fullText.substr(start,this.ats[i].atName)
                    +this.fullText.substr(start+this.ats[i].atName.length,this.fullText.length-start-this.ats[i].atName.length)+"</a>";

                    
            //alert(this.fullText);
            }
        }
    },
    created(){
        console.log("fulltext",this.fullText);
        console.log("this.ats",this.ats);
        this.solveText();
    },
    
}
        
</script>