<template>
  <ul id="Menu">
    <router-link v-for="item in menuItems" :key="item.name" tag="li" :to="item.link" class="bloc">
      <a>{{item.name}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menuItems: [
        {
          name: `Présentation`,
          link: 'about'
        },
        {
          name: 'Projets',
          link: 'portfolio'
        },
        {
          name: 'Contact',
          link: 'contact'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "variables.scss";

  #Menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
    position: absolute;
    height: 100%;
    right: 10px;
    top: 0px;
    width: 30px;
  }

  .bloc {
    width: 100%;
    height: auto;
    margin: 10px 0;
    writing-mode: vertical-rl;
    background-color: $white;
    border: 1px solid $theme-color;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'PT Sans', sans-serif;
    transition: 0.3s;
    &:hover {
      box-shadow: 0px 0px 3px -1px $theme-color;
    }
    a, a:hover, a:focus, a:visited {
      height: 100%;
      width: 100%;
      padding: 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $theme-color;
      text-decoration-line: none;
    }
    &.router-link-exact-active {
      background-color: $theme-color;
      a {
        color: $white;
      }
    }
  }
</style>
