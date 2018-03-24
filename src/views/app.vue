<template>
  <div id="app">
    <router-view/>

    <div v-if="error" class="error">
      <h2>Error</h2>
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
import { bus } from '../rest'

export default {
  data: () => ({
    error: null
  }),
  async created () {
    bus.$on('error', err => {
      this.error = err
    })
  }
}
</script>

<style lang="stylus">
$blue = #6180ff
$dark_blue = #53419a
$red = #c7324b
$dark_red = #972551

html
  font-family Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2d2d45
  padding 2em

h1, h2, h3
  margin 0 0 1em
  a
    text-decoration none

a
  color $blue
  &:hover
    color $dark_blue

.error
  color $red
</style>
