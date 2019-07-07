<style scoped>
div:hover{
    cursor: pointer;
}

</style>

<template>
<div @click="blockUser()">
    <Icon type="ios-alert-outline" size="24"></Icon>
    拉黑用户
</div>
</template>

<script>
export default {
    props:{
        userId:Number,
    },
    data(){
        return {

        }
    },
    methods:{
        blockUser(){
            console.log("拉黑",this.userId);
        }
    }
}
        
</script>