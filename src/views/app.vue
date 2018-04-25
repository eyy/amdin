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
    bus.$on('error', err => {
      this.$toasted.error(this.___('There was a problem :('))
      console.error(err)
    })

    let { conf } = await start()
    if (!conf)
      return bus.$emit('error', 'No config.')

    this.$setLang(conf.lang)
    this.ready = true
  }
}
</script>

<style lang="stylus">
$font-color = #2d2d45
$blue = #6180ff
$dark_blue = #53419a
$light_blue = #e8eef6
$red = #c7324b
$dark_red = #972551
$light_red = #f9e2ef

html
  padding 2em

html, input, select, textarea
  font-family Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color $font-color
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

button, .button
  display inline-block
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
  &.other
    color $blue
    border 1px solid $blue
    background white
    &:hover
      color $font-color
      border-color $font-color
      background $light_blue
    &.danger
      color $red
      border-color $red
      &:hover
        color $dark_red
        border-color $dark_red
        background $light_red

[dir=rtl] h2 a
  direction rtl
  display inline-block

#app
  max-width 1000px
  margin 0 auto

.toasted-amdin
  box-shadow none !important
  border-radius 3px !important
  a
    color white !important
  [dir=rtl] &
    .action
      margin 5px 7px 5px -7px

.box
  margin-top .5em
  padding .5em
  border-radius 3px
  border 1px solid #e3e3e3
  background white

  .box-controls
    text-align end
    a.reorder
      cursor move
</style>
