<style scoped>
#root-div {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgb(230, 236, 240);
  overflow: auto;
}
#middle-container {
  float: left;
  width: 50%;
  background-color: white;
  margin-left: 25%;
  margin-top: 70px;
}
.header-left-align {
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  padding-top: 15px;
  padding-left: 15px;
}
.img_preview {
  size: 20px;
  border-radius: 100px;
}
.center-fix{
	position: fixed;/*固定位置*/
	z-index:99;/*设置优先级显示，保证不会被覆盖*/	
  margin:auto;
left:0;
right:0;
top:0;
bottom:0;
}
/* -------------------------------------------------------------------------------- */
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
/* ----------------------------------------------------------------- */
</style>

<template>
  <div id="root-div"><div id="topAnchor"></div>
  <loadingAnimate v-if="loading" class="center-fix"/>
    <ElContainer id="middle-container">
      <el-header class="header-left-align">Edit Profile</el-header>
      <div class="el-header" style="border-bottom: 1px solid #e6ecf0;width: 100%">
        <Tabs active-key="key1" style="float: left;width: 100%">
          <Tab-pane label="Account Information" key="key1">
            <ElContainer>
              <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="80"
                style="width: 100%"
              >
                <br />
                <br />
                <!--头像更改-->

                <!--
                <FormItem label="Avatar: ">
                  <div class="uploadBox">
                    <div class="img_preview">
                      <img :src="img_src" />
                    </div>
                    <input type="file" ref="file" @change="getFile" id="avatar" />
                    <Icon type="ios-plus-empty" class="uploadIcon"></Icon>
                  </div>
                </FormItem>-->
                <FormItem label="Avatar" prop="avatar">
                <div class="demo-upload-list" v-for="item in uploadList">
                  <template>
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action
                  style="display: inline-block;width:58px;"
                >
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                  <img :src="img_preview" v-if="visible" style="width: 100%" />
                </Modal>
                </FormItem>
                <!--账号名称更改-->
                <FormItem label="Alias" prop="alias">
                  <Input
                    v-model="formValidate.alias"
                    placeholder="Enter your alias"
                    style="width: 400px;object-position: 100px"
                    maxlength="10"
                  ></Input>
                </FormItem>

                <!--个人描述更改-->
                <FormItem label="Desc" prop="desc">
                  <Input
                    v-model="formValidate.desc"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    placeholder="Say something about you..."
                    style="width: 400px"
                  ></Input>
                </FormItem>

                <!--真实姓名更改-->
                <FormItem label="Name" prop="name">
                  <Input
                    v-model="formValidate.name"
                    placeholder="Enter your name"
                    style="width: 400px"
                  ></Input>
                </FormItem>

                <!--性别-->
                <FormItem label="Gender" prop="gender">
                  <RadioGroup v-model="formValidate.gender">
                    <Radio label="Male">Male</Radio>
                    <Radio label="Female">Female</Radio>
                  </RadioGroup>
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
            <Form
              ref="formCustom"
              :model="formCustom"
              :rules="ruleCustom"
              :label-width="80"
              style="float: left;width: 100%"
            >
              <!--新密码-->
              <FormItem label="New Password" prop="passwd">
                <Input
                  type="password"
                  v-model="formCustom.passwd"
                  placeholder="Enter your New password"
                  style="width: 400px"
                ></Input>
              </FormItem>
              <FormItem label="Confirm New Password" prop="passwdCheck">
                <Input
                  type="password"
                  v-model="formCustom.passwdCheck"
                  placeholder="Enter your New password again"
                  style="width: 400px"
                ></Input>
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
    <backToTop></backToTop>
  </div>
</template>

<script>
import axios from "axios";
import backToTop from "./Subs/BackToTop"
import loadingAnimate from "./animate/loading"
axios.defaults.withCredentials = true;
export default {
  name: "Personal",
  components:{
    backToTop,loadingAnimate
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your new password"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Age cannot be empty"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          if (value < 18) {
            callback(new Error("Must be over 18 years of age"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      loading:false,
      uploadList: [],
      visible: false,
      img_preview: "",
      img_src: "/avatars/0.jpg",
      defaultList: [
        {
          name: "a42bdcc1178e62b4694c830f028db5c0",
          url:
            "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
        }
      ],
      user_id: 0,
      imgName: "",
      visible: false,
      theme1: "light",
      theme3: "light",
      model13: "",
      loading1: false,
      options1: [],
      model14: [],
      loading2: false,
      options2: [],
      formValidate: {
        avatar:"",
        alias: "",
        name: "",
        gender: "",
        desc: "",
        avatar:""
      },
      ruleValidate: {
        avatar:[
          {
            required: false,
            message: "The avatar cannot be empty",
            trigger: "blur"
          }
        ],
        alias: [
          {
            required: true,
            message: "The alias cannot be empty",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 15,
            message: "Introduction no less than 15 words",
            trigger: "blur"
          }
        ]
      },
      formCustom: {
        passwd: "",
        passwdCheck: "",
        age: ""
      },
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        age: [{ validator: validateAge, trigger: "blur" }]
      }
    };
  },
  created(){
    // var _this = this
    // var user_id = _this.getCookies("userID");
    // console.log(user_id);
    // this.user_id = user_id;
    // this.uploadList = this.$refs.upload.fileList;
    // console.log(this.formValidate);
    // _this.getUserPublicInfo(this.user_id).then(response => {
    //   console.log(response);
    // });
    // _this.getUserAllInfo().then(response => {
    //   console.log("获取用户全部信息", response);
    //   var user_info = response.data.data;
    //   _this.formValidate.alias = user_info.userPublicInfo.nickname;
    //   _this.formValidate.name = user_info.user_Private_Info.user_realname;
    //   _this.formValidate.gender = user_info.user_Private_Info.user_gender;
    //   _this.formValidate.desc = user_info.userPublicInfo.self_introction;
    //   _this.uploadList
    // });
  },
  mounted() {
    var _this = this
    var user_id = _this.getCookies("userID");
    console.log(user_id);
    this.user_id = user_id;
    this.uploadList = this.$refs.upload.fileList;
    console.log(this.formValidate);
    _this.getUserPublicInfo(this.user_id).then(response => {
      console.log(response);
    });
    _this.getUserAllInfo().then(response => {
      console.log("获取用户全部信息", response);
      var user_info = response.data.data;
      _this.formValidate.alias = user_info.userPublicInfo.nickname;
      _this.formValidate.name = user_info.user_Private_Info.user_realname;
      _this.formValidate.gender = user_info.user_Private_Info.user_gender;
      _this.formValidate.desc = user_info.userPublicInfo.self_introction;
      _this.uploadList.push({
        url: user_info.userPublicInfo.avatar_url,
        dont_upload: true
      });
    });
  },
  methods: {
    getFile(e) {
      let _this = this;
      console.log("有图片");
      var files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.img_src = this.result;
      };
    },
    getCookies(userId) {
      return this.getCookie(userId);
    },
    onSelect(d) {
      this.$router.push({ path: "/" + d });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          if (name === "formValidate") {
            var formData = {
              nickname: this.formValidate.alias,
              password: "",
              realname: this.formValidate.name,
              gender: this.formValidate.gender,
              self_introduction: this.formValidate.desc
            };
            console.log(formData);
            this.editInfo(formData).then(response => {
              console.log("修改信息", response);
            });

            //let x = document.getElementById("avatar").files[0];
            let x = this.uploadList[0];
            console.log(x);
            if(x.dont_upload){
              return;
            }
            if (x) {
              console.log("有图片");

              let params = new FormData(); //创建一个form对象

              params.append("file", x, x.name); //append 向form表单添加数据
              params.append("user_id", this.user_id);

              //添加请求头 通过form添加的图片和文件的格式必须是multipart/form-data

              let config = {
                headers: { "Content-Type": "multipart/form-data" }
              };

              this.uploadAvatar(params,config)
                .then(response => {
                  console.log("头像", response);
                });
            }
          } else {
            console.log(this.formCustom);
            var formData = {
              nickname: "",
              password: this.formCustom.passwd,
              realname: "",
              gender: "",
              self_introduction: ""
            };
            console.log(formData);
            this.editInfo(formData).then(response => {
              console.log("修改信息", response);
            });
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
      console.log("name", name);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleView(url) {
      this.img_preview = url;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {},
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 1;
      
      let _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        file.url = this.result;
        _this.uploadList.splice(0,1);
        _this.uploadList.push(file);
      };
      return false;
    }
  },
  beforeRouteEnter(to,from,next){
      next(vm=>{
        if(!vm.getCookie("userID"))
        {
          console.log("请先登录")
          vm.$router.push("index")
        }
      })
    }
};
</script>

