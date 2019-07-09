<style scoped>


.img-handler-div{
    width:100%;
    height:100%;
    box-shadow: #ecedf3 0px 0px 4px;
}
.img-handler-div:hover{
    box-shadow: #cacee6 0px 0px 8px;
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
.cover{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9995;
    background-color: rgb(210, 220, 220);
}

.big-img{
    position: fixed;
    z-index: 9999;
    align-self: center;
}
</style>

<template>
<div>
<div class="img-handler-div">
    <div v-show="showBigImage" class="cover" v-bind:style='{"height":coverHeight,"width":coverWidth}'>
    </div>
    <div v-show="showBigImage">
        <img @click="doShowBigImg()" class="big-img" v-bind:src="bigImgSource" :style='{"height":bigImgHeight,"width":bigImgWidth}'>
    </div>


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
            showBigImage:false,
            bigImgSource:"",
            coverHeight:"",
            coverWidth:"",
            //要展示的大图的长和宽
            bigImgHeight:"",
            bigImgWidth:"",
            //开始时就计算出小图的长和宽
            smallSize:[],
            //开始时就计算出大图的长和宽
            bigSize:[],
        }
    },
    methods:{
        doShowBigImg(obj){
            let h=document.documentElement.offsetHeight;
            let w=document.documentElement.offsetWidth;
            this.coverHeight=h.toString()+"px";
            this.coverWidth=w.toString()+"px";
            this.bigImgHeight="100px";
            this.bigImgWidth="200px";
            
            this.showBigImage=!this.showBigImage;
            this.bigImgSource=obj.src;
            console.log("展示",this.bigImgSource);
        },
        //下一张图片
        next(){

        },
        //上一张图片
        pre(){

        }
    },
    created(){
        /*
        if (this.imgData.length==1){

        }
        else if(this.imgData.length==2){

        }
        else if(this.imgData.length==3){

        }
        else if(this.imgData.length==4){

        }
        */
       //console.log(this.imgData);
    },
    mounted(){
        
    }
}
</script>

