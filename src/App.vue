<template xmlns:Content="http://www.w3.org/1999/html">
  <div id="app">
    <Layout>
      <Header>
    <section>
    <nav class="navBar">
     <Menu mode="horizontal" :theme="theme1" active-name="home" style="padding-left:15%;" @on-select="onSelect">
        <MenuItem name="home" v-link="{path: '/'}" key="Home">
            <Icon type="ios-home" size="24"></Icon>
            Home
        </MenuItem>
        <MenuItem name="notifications" v-link="{path: '/Notifications'}" key="Notifications">
            <Icon type="ios-notifications" size="24"></Icon>
            Notifications
        </MenuItem>
        <MenuItem name="message" v-link="{path: '/Message'}" key="Message">
            <Icon type="ios-mail" size="24"></Icon>
            Message
        </MenuItem>
        <Select
            v-model="model13" filterable remote:remote-method="remoteMethod1" :loading="loading1" placeholder="Search in twitter"  not-found-text="no matching result" prefix="ios-search" style="width:400px;">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
        <MenuItem name="personal" v-link="{path: '/Personal'}" key="Personal">
            <Icon type="ios-person" size="24"></Icon>
            Personal
        </MenuItem>
    </Menu>
    </nav>
  </section>
      </Header>
      <Layout>
      <Sider hide-trigger >
        <section>
        <Menu :theme="theme3" active-name="1" style="width: 200px">
          <MenuGroup title="Edit Profile">
            <MenuItem name="1">
              <Icon type="ios-create" />
              Account Information
            </MenuItem>
            <MenuItem name="2">
              <Icon type="md-contact" />
              Private Information
            </MenuItem>
            <MenuItem name="3">
              <Icon type="md-key" />
              Safety Information
            </MenuItem>
          </MenuGroup>
        </Menu>
        </section>
      </Sider>
      <Content>
        <section>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <br>
              <br>
              <FormItem label="Avatar" prop="Avatar">
                <div class="demo-upload-list" v-for="item in uploadList">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
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
              <FormItem label="Alias" prop="alias">
                <Input v-model="formValidate.alias" placeholder="Enter your alias" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="E-mail" prop="mail">
                <Input v-model="formValidate.mail" placeholder="Enter your e-mail"style="width: 270px"></Input>
              </FormItem>
              <FormItem label="Desc" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Say something about you..."></Input>
              </FormItem>
              <FormItem label="Birthday">
                    <FormItem prop="birthday">
                      <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                    </FormItem>
              </FormItem>
              <FormItem label="Name" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"style="width: 200px"></Input>
              </FormItem>
              <FormItem label="Gender" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                  <Radio label="male">Male</Radio>
                  <Radio label="female">Female</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="Address" prop="address">
                <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
              </FormItem>
<!-- 接下来是密码的验证-->
                <FormItem label="Used Password" prop="passwd">
                  <Input type="password" v-model="formCustom.passwd"style="width: 270px"></Input>
                </FormItem>
              <FormItem label="New Password" prop="passwd">
                <Input type="password" v-model="formCustom.passwdCheck"style="width: 270px"></Input>
              </FormItem>
                <FormItem label="Confirm Password" prop="passwdCheck">
                  <Input type="password" v-model="formCustom.passwdCheck"style="width: 270px"></Input>
                </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
              </FormItem>
            </Form>
        </section>
      </Content>
      </Layout>
    <Footer>

    </Footer>
    </Layout>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data(){
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'));
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
        return callback(new Error('Password cannot be empty'));
      }

    };
    return{
      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      theme1:"light",
      model13: '',
                loading1: false,
                options1: [],
                model14: [],
                loading2: false,
                options2: [],
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
      formValidate: {
        alias:'',
        name: '',
        mail: '',
        city: '',
        gender: '',
        birthday: '',
        time: '',
        des: ''
      },
      ruleValidate: {
        alias: [
          { required: true, message: 'The alias cannot be empty', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        birthday: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      formCustom: {
        passwd: '',
        passwdCheck: '',
      },
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
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
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        });
      }
      return check;
    }
  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: -webkit-left;
  color: #2c3e50;
  background-color: rgb(230, 236, 240);

}
</style>

<style scoped>
  .navBar{
    background-color: white;
    box-shadow:1px 1px 1px #333;
    height: 46px;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
  }

</style>
