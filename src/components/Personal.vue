<style scoped>
  #root-div{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgb(230, 236, 240);
    overflow: auto;
  }
  #middle-container {
    float:left;
    width: 70%;
    background-color: white;
    margin-left: 15%;
    margin-top: 70px
  }
  .header-left-align {
    font-weight: bold;
    font-size: 24px;
    text-align: left;
    padding-top: 15px;
    padding-left: 15px
  }

</style>

<template>
    <div id='root-div'>
      <ElContainer id="middle-container">
        <el-header class='header-left-align'>Edit Profile</el-header>
        <div class="el-header" style="border-bottom: 1px solid #e6ecf0;width: 100%">
        <Tabs active-key="key1" style="float: left;width: 100%">
          <Tab-pane label="Account Information" key="key1" >
            <ElContainer>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
              <br>
              <br>
              <!--头像更改-->
              <FormItem label="Avatar" prop="Avatar">
                <div class="demo-upload-list" v-for="item in uploadList">
                  <div v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </div>
                  <div v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </div>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                  <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                </Modal>
              </FormItem>

              <!--账号名称更改-->
              <FormItem label="Alias" prop="alias" >
                <Input v-model="formValidate.alias" placeholder="Enter your alias" style="width: 400px;object-position: 100px"></Input>
              </FormItem>

              <!--个人描述更改-->
              <FormItem label="Desc" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Say something about you..."style="width: 400px"></Input>
              </FormItem>

              <!--生日更改-->
              <FormItem label="Birthday">
                <FormItem prop="birthday">
                  <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                </FormItem>
              </FormItem>

              <!--真实姓名更改-->
              <FormItem label="Name" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"style="width: 400px"></Input>
              </FormItem>

              <!--性别-->
              <FormItem label="Gender" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                  <Radio label="male">Male</Radio>
                  <Radio label="female">Female</Radio>
                </RadioGroup>
              </FormItem>

              <!--个人地址-->
              <FormItem label="Address" prop="address">
                <Input v-model="formValidate.address" placeholder="Enter your address" style="width: 400px"></Input>
              </FormItem>

              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
              </FormItem>
            </Form>
            </ElContainer>
          </Tab-pane>
          <Tab-pane label="Safety Information" key="key2">

            <!--密码验证部分-->
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" style="float: left">
              <!--旧密码-->
              <FormItem label="Used Password" prop="passwd">
                <Input type="password" v-model="formCustom.passwd"placeholder="Enter your Used password" style="width: 400px" ></Input>
              </FormItem>
              <!--新密码-->
              <FormItem label="New Password" prop="passwd">
                <Input type="password" v-model="formCustom.passwd"placeholder="Enter your New password"style="width: 400px"></Input>
              </FormItem>
              <FormItem label="Confirm New Password" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck"placeholder="Enter your New password again"style="width: 400px"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
                <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
              </FormItem>
            </Form>
          </Tab-pane>
        </Tabs>
        </div>
      </ElContainer>
  </div>
</template>

<script>
     export default {
       name: 'Personal',
       data() {
         const validatePass = (rule, value, callback) => {
           if (value === '') {
             callback(new Error('Please enter your new password'));
           } else {
             if (this.formCustom.passwdCheck !== '') {
               // 对第二个密码框单独验证
               this.$refs.formCustom.validateField('passwdCheck');
             }
             callback();
           }
         };
         const validatePassCheck = (rule, value, callback) => {
           if (value === '') {
             callback(new Error('Please enter your password again'));
           } else if (value !== this.formCustom.passwd) {
             callback(new Error('The two input passwords do not match!'));
           } else {
             callback();
           }
         };
         const validateAge = (rule, value, callback) => {
           if (!value) {
             return callback(new Error('Age cannot be empty'));
           }
           // 模拟异步验证效果
           setTimeout(() => {
             if (!Number.isInteger(value)) {
               callback(new Error('Please enter a numeric value'));
             } else {
               if (value < 18) {
                 callback(new Error('Must be over 18 years of age'));
               } else {
                 callback();
               }
             }
           }, 1000);
         };
         return {
           defaultList: [
             {
               'name': 'a42bdcc1178e62b4694c830f028db5c0',
               'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
             }
           ],
           imgName: '',
           visible: false,
           uploadList: [],
           theme1: "light",
           theme3: "light",
           model13: '',
           loading1: false,
           options1: [],
           model14: [],
           loading2: false,
           options2: [],
           list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
           formValidate: {
             alias: '',
             name: '',
             mail: '',
             city: '',
             gender: '',
             birthday: '',
             des: ''
           },
           ruleValidate: {
             alias: [
               {required: true, message: 'The alias cannot be empty', trigger: 'blur'}
             ],
             name: [
               {required: true, message: 'The name cannot be empty', trigger: 'blur'}
             ],
             mail: [
               {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
               {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
             ],
             gender: [
               {required: true, message: 'Please select gender', trigger: 'change'}
             ],
             birthday: [
               {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
             ],
             desc: [
               {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
               {type: 'string', min: 20, message: 'Introduction no less than 20 words', trigger: 'blur'}
             ]
           },
           formCustom: {
             passwd: '',
             passwdCheck: '',
             age: ''
           },
           ruleCustom: {
             passwd: [
               { validator: validatePass, trigger: 'blur' }
             ],
             passwdCheck: [
               { validator: validatePassCheck, trigger: 'blur' }
             ],
             age: [
               { validator: validateAge, trigger: 'blur' }
             ]
           }
         }
       },
       methods:
         {
           onSelect (d){
             this.$router.push({path:"/"+ d})
           },
           handleSubmit (name) {
             this.$refs[name].validate((valid) => {
               if (valid) {
                 this.$Message.success('Success!');
               } else {
                 this.$Message.error('Fail!');
               }
             })
           },
           handleReset (name) {
             this.$refs[name].resetFields();
           },
           handleView (name) {
             this.imgName = name;
             this.visible = true;
           },
           handleRemove (file) {
             const fileList = this.$refs.upload.fileList;
             this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
           },
           handleSuccess (res, file) {
             file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
             file.name = '7eb99afb9d5f317c912f08b5212fd69a';
           },
           handleFormatError (file) {
             this.$Notice.warning({
               title: 'The file format is incorrect',
               desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
             });
           },
           handleMaxSize (file) {
             this.$Notice.warning({
               title: 'Exceeding file size limit',
               desc: 'File  ' + file.name + ' is too large, no more than 2M.'
             });
           },
           handleBeforeUpload () {
             const check = this.uploadList.length < 1;
             if (!check) {
               this.$Notice.warning({
                 title: 'Up to one pictures can be uploaded.'
               });
             }
             return check;
           }
         }
     }
</script>

