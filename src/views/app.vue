<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { bus } from '../rest'

export default {
  async created () {
    bus.$on('error', err => {
      this.$toasted.show('There was a problem :(', {
        type: 'error'
      })
      console.error(err)
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
  padding 2em

html, input, select, textarea
  font-family Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2d2d45
  font-size 1em

h1, h2, h3
  margin 0 0 1em
  a
    text-decoration none
    &:hover
      text-decoration underline

a
  color $blue
  &:hover
    color $dark_blue

.error
  color $red

button
  font-size .8em
  margin-right .5em
  padding .3em 1em
  background $blue
  color white
  border 0
  border-radius 3px
  cursor pointer
  &:hover
    background $dark_blue
  &.danger
    background $red
    &:hover
      background $dark_red

.toasted-amdin
  box-shadow none !important
  border-radius 3px !important
  a
    color darkslategray !important
</style>
