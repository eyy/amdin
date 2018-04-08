<template>
  <div id="app">
    <router-view v-if="ready"/>
  </div>
</template>

<script>
import { bus, start } from '../rest'

export default {
  data: () => ({
    ready: false
  }),
  async created () {
    let { conf } = await start()
    this.$setLang(conf.lang)
    this.ready = true

    bus.$on('error', err => {
      this.$toasted.error(this.___('There was a problem :('))
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
  [dir=rtl] &
    margin-right 0
    margin-left .5em

[dir=rtl] h2 a
  direction rtl
  display inline-block

.toasted-amdin
  box-shadow none !important
  border-radius 3px !important
  a
    color white !important
  [dir=rtl] &
    .action
      margin 5px 7px 5px -7px
</style>
