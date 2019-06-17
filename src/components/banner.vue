<template>
  <div class="banner">
    <div class="bannerContent">
      <router-link to="/register" class="bannerText">前端贴吧论坛</router-link>
      <div class="right">
        <el-button type="text" @click="postBefore">发布新贴</el-button>
        <el-button type="text" v-if="!userName" @click="isShowLogin = true">登录</el-button>
        <el-button type="text" v-else>{{userName}}</el-button>
      </div>
    </div>

    <!-- login dialog start-->
      <el-dialog
        :title="loginTitle"
        :visible.sync="isShowLogin"
        center
        width="40%"
        @close="resetOption"
      >
        <el-form :model="login" :rules="rules" ref='login' label-position="left" label-width="90px">
          <div v-if="status">
            <el-form-item label="用户账号:" prop="account">
              <el-input v-model.number="login.account"></el-input>
            </el-form-item>
            <el-form-item label="用户密码:" prop="password">
              <el-input type="password" v-model="login.password"></el-input>
            </el-form-item>
            <div style="text-align:center;">
              <el-button type="primary" @click="handleLogin('login')">登录</el-button>
              <el-button type="success" @click="handleRegister">注册</el-button>
            </div>
          </div>
          <div v-else>
            <el-form-item label="手机号码:" prop="account">
              <el-input v-model.number="login.account" autofocus></el-input>
            </el-form-item>
            <el-form-item label="用户密码:" prop="password">
              <el-input type="password" v-model="login.password"></el-input>
            </el-form-item>
            <div style="text-align:center;">
              <el-button type="primary" @click="confirmRegister('login')">确认注册</el-button>
            </div>
          </div>
        </el-form>
      </el-dialog>
    <!-- login dialog end -->


    <!-- start port dialog -->
      <el-dialog
        title="发布新贴"
        :visible.sync="isShowPortDialog"
        center
        width="45%"
        v-loading="postLoading"
      >
        <el-form
            label-position="top"
            label-width="80px"
        >
            <el-form-item label="帖子分类:">
                <el-select v-model="classValue" placeHolder="请选择帖子分类" style="width:100%;">
                    <option
                        v-for="item in options"
                        value=""
                    ></option>
                </el-select>
            </el-form-item>
            <el-form-item label="帖子标题:">
                <el-input v-model="postTitle"></el-input>
            </el-form-item>
            <el-form-item label="帖子详情:">
                <Editor @catchData="getFwbContent"/>
            </el-form-item>
        </el-form>
        <div style="text-align:center;">
            <el-button type="primary" @click="post">发帖</el-button>
        </div>
      </el-dialog>
    <!-- end port dialog -->
  </div>
</template>

<script>
    import Editor from '@/components/fwb/index'
export default {
  name: 'HelloWorld',
    components: {
        Editor
    },
  data () {
    return {
        userName: '',
        loginTitle: '登录',
        isShowLogin: false,
        login: {
        account: '',
        password: ''
        },
        mes: '用户账号',
        rules: {
        account: [
          {required: true, message: `请输入账号`},
          {type: 'number', message: '必须为数值'}
        ],
        password: [
          {required: true, message: '请输入密码'}
        ]
        },
        status: 1, //1、表示登录, 0、表示注册
        isShowPortDialog: false, //发布新贴弹框
        value: '',
        postTitle: '',

        classValue: '',
        options: [],
        postLoading: false

    }
  },
  methods: {
    async handleLogin (form) { //处理用户登录
      this.$refs[form].validate((valid) => {
        if(valid) {
          let params = {
            account: this.login['account'],
            password: this.login['password']
          };
          this.api.login(params).then((res) => {
            if(!res.code) return;
            this.$message.success('登录成功');
            this.userName = res.data.result.name;
            this.isShowLogin = false;
          });
        }else {
          return false
        }
      })
    },
    handleRegister() { //处理用户注册账号
      this.status = 0;
      this.loginTitle = '注册';
      Object.keys(this.login).forEach(key => this.login[key] = '');
    },
    async confirmRegister (form) {
      let self = this;
      this.$refs[form].validate((valid) => {
        if(!valid) return;
        this.api.register(Object.assign(this.login,{name: `程序猿${Number.parseInt(Math.random()*(9999-1000)+100)}`})).then(res => {
          if(res.code) {
            self.$confirm('恭喜您、注册成功！，您可以进行以下操作', '提示',{
              confirmButtonText: '登录',
              cancelButtonText: '首页',
              type: 'success'
            }).then(() => {
              self.status = 1;
              self.login.password = '';
              self.loginTitle = '登录';
            }).catch(() => {
              self.isShowLogin = false;
              self.$router.push('/')
            })
          }
        })
      })
    },
    resetOption () { //重置一些数据
      this.$refs['login'].resetFields();
      this.loginTitle = '登录';
      this.status = 1;
    },
    getFwbContent (value) {
        this.value = value;
    },

    async postBefore () {
        // this.postLoading = true;
        this.isShowPortDialog = true;
    },
    async post () {
        let params = {
            title: this.postTitle,
            content: this.value,
            postClassId: '123456',
            userId: '789654'
        }
        let res = await this.api.post(params);
        console.log(res);
    }
  },
  computed: {

  },
  mounted () {
    console.log();
  },
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  a {text-decoration:none;}
  .banner {
    width:100%;height:50px;
    background-color:#e7e7e7;
    box-shadow:0 1px 2px 2px #aaa;
    .bannerContent {
      width:1200px;height:inherit;
      margin:0 auto;
      .bannerText {
        line-height:50px;
        font-size:22px;
        color:#aaa;
        float:left;
      }
      .right {
        float:right;
        line-height:50px;
      }
    }
  }
  .banner /deep/ .el-dialog__body {
        border-top:solid 1px #eee;
    }
</style>
