<template>
  <div class="home">
    <div class="login">
      <el-form label-position="left" label-width="50px" v-model="from">
        <el-form-item label="账号" >
          <el-input type="text" v-model="from.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="text" v-model="from.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleLogin">Register</el-button>
      <el-button type="warning" @click="handleCheck">Login</el-button>
      <el-button type="danger" @click="handlerCheckToken">检查to</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      from: {
        account: '',
        password: '',
        name: ''
      }

    }
  },
  methods: {
    async init() {

    },
    async handleLogin() {
      let  minNum = 10000, maxNum = 99999, currentRegisterName = '';
      currentRegisterName = parseInt(Math.random()*(maxNum - minNum + 1) + minNum);
      this.from.name = `逗比${ currentRegisterName }`
      let res = await this.api.register(this.from);
      console.log(res)
    },
    async handleCheck () {
      let res = await this.api.login(this.from);
      this.$store.commit('setToken',res.data.token);
    },
    async handlerCheckToken () {
      let res = await this.api.checkRouter()
    }
  },
  mounted () {

  }
}
</script>
<style scoped lang="scss">
.login {
  width:30%;
  height:300px;
  box-shadow:0 0 5px 5px #eee;
  position:absolute;
  top:0;right:0;
  left:0;bottom:0;
  margin:auto;
  padding:10px 20px;
  box-sizing: border-box;
}
</style>
