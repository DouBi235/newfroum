<template>
  <div class="home">
    <bodyS />
  </div>
</template>

<script>
import bodyS from '@/views/bodys.vue'
export default {
  name: 'home',
  components: {
    bodyS
  },
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
      let res = await this.api.checkRouter();
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
