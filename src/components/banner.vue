<template>
  <div class="banner">
    <div class="bannerContent">
      <a href="" class="bannerText">前端贴吧论坛</a>
      <!--<div style="float:right;">-->
        <a class="sign" href="">Sign in</a>
        <a class="sign" href="">Sign up</a>
      <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted () {
    console.log();
  },
  methods: {

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
    .bannerContent {
      width:1200px;height:inherit;
      margin:0 auto;
      display:flex;
      justify-content: space-between;
      align-items: center;
      a.bannerText {
        color:#777;
        font-size:20px;
      }
      a.sign {
        display:flex;
        justify-content: center;
        line-height:30px;
        width:80px;
        border:solid 1px #777;
        color:#777;
        position:relative;

      }
      a.sign:first-of-type  {
        margin-right:20px;
      }
      a.sign::before {
        border-bottom:solid 1px red;
        border-left: solid 1px green;
      }
      a.sign:hover a.sign::after {
        border-top:solid 1px blue;
        border-right:solid 1px #ff5857;
      }
      a.sign::before, a.sign::after {
        width:100%;height:100%;
        z-index:3;
        content: '';
        position:absolute;
        top:0;
        lert:0;
      }
    }
  }
</style>
