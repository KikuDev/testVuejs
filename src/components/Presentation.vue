<template>
  <div :class="currentPage">
    <ul>
     <TeamMember v-for="item in teamNumber" :key="item.id"/>
    </ul>
  </div>
</template>

<script>
import TeamMember from './TeamMember.vue'

export default {
  name: 'Presentation',
  components: {
    TeamMember
  },
  data () {
    return {
      currentPage: 'Presentation',
      teamNumber: [...Array(18).keys()]
    }
  },
  mounted () {
    let self = this
    setTimeout(function () {
      self.currentPage += ' transition'
    }, 100)
  },
  beforeRouteLeave (to, from, next) {
    this.currentPage = 'Presentation'
    setTimeout(function () {
      next()
    }, 100)
  }
}
</script>

<style lang="scss">
  @import "variables.scss";

  .Presentation {
    height: calc(100% - 20px);
    border: 1px solid transparent;
    box-shadow: inset 0px 0px 0px 10px $theme-color;
    font-family: 'PT Sans', sans-serif;
    transition: 0.1s;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 30px;
    ul {
      padding: 20px 0;
      height: auto;
      display: flex;
      list-style-type: none;
      height: 100%;
      margin: 0;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    h1 {
      font-family: 'PT Sans', sans-serif;
    }
    p {
      font-family: 'PT Sans', sans-serif;
      text-align: center;
    }
  }
  .Presentation.transition {
      box-shadow: none;
      height: 100%;
      border: 1px solid $theme-color;
      padding: 0 30px;
      overflow-y: scroll;
    }
</style>
