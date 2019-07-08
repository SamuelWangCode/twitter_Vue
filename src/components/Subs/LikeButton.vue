<style scoped>
.likes-div{
    width:100%;
    height:auto;
    text-align: center;
}
.likes-div{
    cursor: pointer;
}
</style>



<template>
<div>
    <div class="likes-div" @click="like()">
      <vue-star animate="animated rubberBand" color="#F05654">
        <Icon type="ios-heart-outline" size="24" v-if="likeByUser==false"></Icon>
        <Icon type="ios-heart" size="24" v-if="likeByUser"></Icon>
        <span>{{likesNum}}</span>
      </vue-star>
    </div>
</div>
</template>


<script>
export default {
    props:{
        likeByUser:false,
        likesNum:Number,
        twiId:Number,
    },
    data(){
        return {
        }
    },
    methods:{
        //点赞
        doLike(){
            if(this.likeByUser==false){
                this.like(this.twiId).then(Response=>{
                    this.$emit('likeTwi');
                });
            }
            if(this.likeByUser==true){
                this.cancelLike(this.twiId).then(Response=>{
                    this.$emit("likeTwi");
                });
            }
        },
    },
    created(){
    },
    beforeMount() {
    },
}
</script>

