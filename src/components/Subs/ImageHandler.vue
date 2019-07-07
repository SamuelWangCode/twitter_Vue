<style scoped>


.img-handler-div{
    width:100%;
    height:100%,
}

.img1-1-div{
    height:360px;
    width:480px;
    overflow: hidden;
    border-radius: 10px;
}
.img1-1{
    width:500px;
}

.img-div-for2{
    width: 480px;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
}
.img2-12-div{
    height:100%;
    width:50%;
    overflow: hidden;
    float: left;
}
.img2-1{
    width: 100%;
    height: 100%;
}
.img2-2{
    width: 100%;
    height: 100%;
}

.img-div-for3{
    width: 480px;
    height: 320px;
    overflow: hidden;
    border-radius: 10px;
}
.img3-1-div{
    height:100%;
    width:67%;
    overflow: hidden;
    float: left;
}
.img3-1{
    width:100%;
    height: 100%;
}
.img3-23-div{
    height:50%;
    width:33%;
    overflow: hidden;
    float: left;
}
.img3-23{
    height:100%;
    width:100%;
}

.img-div-for4{
    width: 480px;
    height: 360px;
    overflow: hidden;
    border-radius: 10px;
}
.img4-1-div{
    height:100%;
    width:75%;
    overflow: hidden;
    float: left;
}
.img4-1{
    width:100%;
    height:99%;
}
.img4-234-div{
    height:33%;
    width:25%;
    overflow: hidden;
    float: left;
}
.img4-234{
    height:100%;
    width:100%;
}

.button-div{
    float: left;
    width:480px;
    height:auto;
    margin-top:5px;
    margin-bottom: 20px;
    text-align: center;
}
</style>

<template>
<div class="img-handler-div">
    <div class="twi-img" v-if="imgData.length==1">
        <div class="img1-1-div">
            <img class="img1-1" v-bind:src="imgData[0]" alt="1-1">
        </div>
    </div>



    <div class="twi-img" v-else-if="imgData.length==2">
        <div class="img-div-for2">
            <div class="img2-12-div">
                <img class="img2-1" v-bind:src="imgData[0]" alt="2-1">
            </div>
            <div class="img2-12-div">
                <img class="img2-2" v-bind:src="imgData[1]" alt="2-2">
            </div>
        </div>
    </div>



    <div class="twi-img" v-else-if="imgData.length==3">
        <div class="img-div-for3">
            <div class="img3-1-div">
                <img class="img3-1" v-bind:src="imgData[0]" alt="3-1">
            </div>
            <div class="img3-23-div">
                <img class="img3-2" v-bind:src="imgData[1]" alt="3-2">
            </div>
            <div class="img3-23-div">
                <img class="img3-3" v-bind:src="imgData[2]" alt="3-3">
            </div>
        </div>
    </div>

    <div class="twi-img" v-else-if="imgData.length==4">
                <div class="img-div-for4">
                    <div class="img4-1-div">
                        <img class="img4-1" v-bind:src="imgData[0]" alt="4-1">
                    </div>
                    <div class="img4-234-div">
                        <img class="img4-234" v-bind:src="imgData[1]" alt="4-2">
                    </div>
                    <div class="img4-234-div">
                        <img class="img4-234" v-bind:src="imgData[2]" alt="4-3">
                    </div>
                    <div class="img4-234-div">
                        <img class="img4-234" v-bind:src="imgData[3]" alt="4-4">
                    </div>
                </div>
    </div>

</div>

</template>


<script>
export default {
    props:{
        imgData:Array,
        twiId:Number,
    },
    data(){
        return {

        }
    },
    methods:{
    }
}
</script>

