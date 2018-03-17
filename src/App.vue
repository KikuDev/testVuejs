<template>
  <div id="app">
    <router-link to="/">
      <img class="logo" src="./assets/Portfolio/abb.png" alt="logo" />
    </router-link>
    <Menu />
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style>
html {
    height: 100%;
}

body {
    height: 100%;
    overflow: hidden;
    margin: 0px;
    display: flex;
    box-sizing: border-box;
}

#app {
    width: 100%;
    padding: 35px 20px 20px;
}

.logo {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 78px;
    background-color: #fff;
}

@media (max-width: 767px) {
  .logo {
    display: none;
  }
}

</style>
