<style scoped>
.collection-div{
    width:100%;
    height:auto;
    text-align: center;
}
.collection-div:hover{
    cursor: pointer;
}

</style>



<template>
<div>
    <div class="collection-div" @click="doCollect()">
      <vue-star animate="animated rubberBand" color="#F05654">
        <icon slot="icon" type="ios-star" size="24"  v-if="collectByUser" style="margin-bottom: 3px"></icon>
        <icon slot="icon" type="ios-star-outline" size="24"  v-else style="margin-bottom: 3px"></icon>
      </vue-star>
    </div>
</div>
</template>


<script>
  import VueStar from 'vue-star'
export default {
  components:{
    VueStar
  },
    props:{
        collectByUser:false,
        twiId:Number,
    },
    data(){
        return {
        }
    },
    methods:{
        //收藏与取消收藏
        doCollect(){
            if(this.collectByUser==false){
                this.addCollection(this.twiId).then(Response=>{
                    this.$emit('collectTwi');
                });
            }
            if(this.collectByUser==true){
                this.deleteCollection(this.twiId).then(Response=>{
                    this.$emit('collectTwi');
                });
            }
        }
    },
    created(){
    },
    beforeMount() {
    },
}
</script>

