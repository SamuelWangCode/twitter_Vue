<template>
    <el-upload :action="actionUrl" :auto-upload="false" :multiple="true" :file-list="fileList" :on-change="onChange" :on-remove="onRemove" :on-exceed="OnExceed" ref="upload" list-type="picture" :limit="10">
    <button>上传附件文档</button>
    <span>注意：支持jpg，png格式</span>
    </el-upload>
</template>

<script>
export default {
    name:'test',
    onChange(file, fileList) { //这里做一些文件控制，注意：就算一次选取多个文件，这里依旧会执行多次
　　const isJPG = file.raw.type === 'image/jpeg';
　　if (!isJPG) {
　　　　this.$message.error('上传头像图片只能是 JPG 格式!');
　　　　fileList.pop()
　　}
　　let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)
　　if (existFile) {
　　　　this.$message.error('当前文件已经存在!');
　　　　fileList.pop()
　　}
　　this.fileList = fileList
},

onRemove(file, fileList) {
　　this.fileList = fileList
},

OnExceed(file, fileList) {
　　this.$message.error(`最多只能上传10张图片!`);
},

submitUpload() {   //上传函数，如果把提交函数用在http-request钩子中，fileList多长就执行请求多少次接口，依旧是无法做到只请求一次上传多文件
　　var formData = new FormData();  //  用FormData存放上传文件
　　this.fileList.forEach(file => { 
　　　　　　formData.append('reportFile', file.raw, file.raw.name); //此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上 
　　}) 
　　uploadFiles(formData).then(res => { //手动上传貌似无法触发成功或失败的钩子函数，因此这里手动调用 
　　this.onSuccess() 
}).catch(err => {
　　 console.log(err)
　　 this.onError() 
})
}
}

</script>
