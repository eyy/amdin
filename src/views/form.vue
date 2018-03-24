<template>
  <div>
    <h2>
      <router-link to="/">Admin</router-link> /
      <router-link :to="'/' + model">{{ opts.label }}</router-link> /
      <em>{{ title || doc[opts.title] }}</em>
    </h2>

    <pre style="float: right">{{ doc }}</pre>

    <form @submit.prevent="$emit('submit', doc)">
      <obj
        :paths="paths"
        :value="doc"
      />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
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