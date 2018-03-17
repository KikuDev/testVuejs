<template>
  <div :class="currentPage">
  </div>
</template>

<script>
export default {
  name: 'Portfolio',
  data () {
    return {
      currentPage: 'Portfolio'
    }
  },
  mounted () {
    let self = this
    setTimeout(function () {
      self.currentPage += ' transition'
    }, 100)
  },
  beforeRouteLeave (to, from, next) {
    this.currentPage = 'Portfolio'
    setTimeout(function () {
      next()
    }, 100)
  }
}
</script>

<style lang="scss">
  @import "variables.scss";

  .Portfolio {
    height: calc(100% - 20px);
    border: 10px $theme-color solid;
    font-family: 'PT Sans', sans-serif;
    transition: 0.1s;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 21px;
    overflow: scroll;
    &.transition {
      height: 100%;
      border: 1px solid $theme-color;
      padding: 0 30px;
    }
  }
</style>
