<template>
  <div class='[pageName]'>
    <img class='logo' :src='logo' />
    <h1 class='welcome'>Welcome to Dubo!</h1>
  </div>
</template>

<script lang='ts'>
import logo from 'assets/img/logo.svg';

export default {
  data() {
    return {
      logo,
    }
  }
}
</script>

<style lang='less'>
  .[pageName] {
    // .r(width, 100);
    .logo {
      width: 100%;
    }

    .welcome {
      font-size: 30px;
      text-align: center;
    }
  }
</style>