<template>
  <form @submit.prevent="$emit('submit', doc)">
    <obj
      :paths="paths"
      :value="doc"
    />

    <button type="submit">Save</button>
  </form>
</template>

<script>
export default {
  props: {
    doc: Object,
    paths: Object
  }
}
</script>

<style lang="stylus">
input, select, textarea
  padding .5em
  min-width 15em

input
  &[type=checkbox],
  &[type=radio]
    min-width auto

button[type=submit]
  font-size 1em
  margin-top 1em
</style>