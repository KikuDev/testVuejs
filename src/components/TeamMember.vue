<template>
  <li class="TeamMember">
    <img src="../assets/seb2.png"/>
  </li>
</template>

<script>
export default {
  name: 'TeamMember',
  data () {
    return {
      componentName: 'Team Member'
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .TeamMember {
    width: 30%;
    margin: 20px 0;
    img {
      width: 100%;
    }
    p {
      padding: 0 10px;
    }
  }
</style>
