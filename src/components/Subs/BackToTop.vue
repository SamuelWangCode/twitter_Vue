<template>
    <a href="#topAnchor"><Button shape="circle" size="large" icon="ios-arrow-up" class="backTop" @click="buttonTapped"></Button></a>
</template>
<script>
    export default {
        name:"backToTop",
        methods:{
            buttonTapped(){
                scrollTo(0,0);
            }
        }
    }
</script>
<style>
.backTop{
    color:"#1DA1F2";
    position: fixed;
    right: 70px;
    bottom:80px;
}
</style>
