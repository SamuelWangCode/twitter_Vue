<style scoped>
div{
    margin: 0;
    padding: 0;
}

.img-handler-div{
    width:100%;
    box-shadow: #ecedf3 0px 0px 4px;
    display: inline-block;
    overflow: hidden;
    border-radius: 10px;
}
.img-handler-div:hover{
    box-shadow: #cacee6 0px 0px 8px;
    cursor: zoom-in;
}

.img1-1-div{
    height:100%;
    width:100%;
    overflow: hidden;
}
.img1-1{
    width:100%;
}

.img-div-for2{
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    display: inline-block;
}
.img2-12-div{
    width:50%;
    overflow: hidden;
    float: left;
}
.img2-1{
    max-width: 100%;
    max-height: 100%;
}
.img2-2{
    max-width: 100%;
    max-height: 100%;
}

.img-div-for3{
    overflow: hidden;
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
    width: 100%;
    height: 100%;
    overflow: hidden;
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
<div class="img-handler-div" ref="wholediv" v-bind:style="{height:handlerHeight}" >

    <div class="twi-img" v-if="imgNum==1">
        <div class="img1-1-div">
            <img class="img1-1" v-bind:src="imgData[0]" ref="img1" alt="1-1">
        </div>
    </div>



    <div class="twi-img" v-else-if="imgNum==2">
        <div class="img-div-for2">
            <div class="img2-12-div">
                <img class="img2-1" v-bind:src="imgData[0]" v-bind:style="{height:sizeH[0],width:sizeW[0]}" ref="img1" alt="2-1">
            </div>
            <div class="img2-12-div">
                <img class="img2-2" v-bind:src="imgData[1]" v-bind:style="{height:sizeH[1],width:sizeW[1]}" ref="img2" alt="2-2">
            </div>
        </div>
    </div>



    <div class="twi-img" v-else-if="imgNum==3">
        <div class="img-div-for3">
            <div class="img3-1-div">
                <img class="img3-1" v-bind:src="imgData[0]" ref="img1" alt="3-1">
            </div>
            <div class="img3-23-div">
                <img class="img3-2" v-bind:src="imgData[1]" ref="img2" alt="3-2">
            </div>
            <div class="img3-23-div">
                <img class="img3-3" v-bind:src="imgData[2]" ref="img3" alt="3-3">
            </div>
        </div>
    </div>

    <div class="twi-img" v-else-if="imgNum==4">
                <div class="img-div-for4">
                    <div class="img4-1-div">
                        <img class="img4-1" v-bind:src="imgData[0]" ref="img1" alt="4-1">
                    </div>
                    <div class="img4-234-div">
                        <img class="img4-234" v-bind:src="imgData[1]" ref="img2" alt="4-2">
                    </div>
                    <div class="img4-234-div">
                        <img class="img4-234" v-bind:src="imgData[2]" ref="img3" alt="4-3">
                    </div>
                    <div class="img4-234-div">
                        <img class="img4-234" v-bind:src="imgData[3]" ref="img4" alt="4-4">
                    </div>
                </div>
    </div>

</div>
</div>
</template>


<script>
export default {
    props:{
        twiId:Number,
        imgData:Array,
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
            //开始时就计算出小图的长和宽，第一张图片的长和宽分别保存在size[0]、size[1]
            sizeW:[],
            sizeH:[],
            handlerWidth:"0px",
            handlerHeight:"0px",
            imgNum:0,
        }
    },
    watch:{
        handlerHeight(val){
            console.log("handlerheight变了");
            if(this.imgNum==1){
                this.sizeW[0]= this.handlerWidth;

                this.sizeH[0]= this.handlerHeight;
            }
            if(this.imgNum==2){
                this.sizeW[0]= this.handlerWidth*0.5;
                this.sizeW[1]= this.handlerWidth*0.5;

                this.sizeH[0]= this.handlerHeight;
                this.sizeH[1]= this.handlerHeight;
            }
            if(this.imgNum==3){
                this.sizeW[0]= this.handlerWidth*0.67;
                this.sizeW[1]= this.handlerWidth*0.33;
                this.sizeW[2]= this.handlerWidth*0.33;

                this.sizeH[0]= this.handlerHeight;
                this.sizeH[1]= this.handlerHeight*0.5;
                this.sizeH[2]= this.handlerHeight*0.5;
            }
            if(this.imgNum==4){
                this.sizeW[0]= this.handlerWidth*0.75;
                this.sizeW[1]= this.handlerWidth*0.25;
                this.sizeW[2]= this.handlerWidth*0.25;
                this.sizeW[3]= this.handlerWidth*0.25;

                this.sizeH[0]= this.handlerHeight*0.99;
                this.sizeH[1]= this.handlerHeight*0.33;
                this.sizeH[2]= this.handlerHeight*0.33;
                this.sizeH[3]= this.handlerHeight*0.33;
            }
        }
    },
    methods:{
    },
    created(){
    },
    mounted(){
        if (this.imgData&&this.imgData.length){
                this.imgNum=this.imgData.length;
                this.handlerWidth=this.$refs.wholediv.offsetWidth;
                if (this.imgData.length==1){
                    this.handlerHeight=this.handlerWidth+"px";
                }
                if (this.imgData.length==2) {
                    this.handlerHeight=0.5*this.handlerWidth+"px";
                }
                if (this.imgData.length==3) {
                    this.handlerHeight=0.67*this.handlerWidth+"px";
                }
                if (this.imgData.length==4) {
                    this.handlerHeight=0.75*this.handlerWidth+"px";
            }
            console.log("mount里",this.handlerHeight);
        }
    },
}
</script>

