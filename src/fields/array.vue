<template>
  <div>
    <button type="button" @click.prevent="add">Add</button>
    <div v-for="(doc, index) in value" :key="doc._id" class="box">
      <div class="controls">
        <a href="#" @click="remove(index)">Remove</a>
      </div>
      <obj
        :paths="paths.schema"
        :value="value[index]"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    paths: Object
  },
  methods: {
    add () {
      this.value.push({})
    },
    remove (index) {
      this.value.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus">
.box
  border 1px solid #e3e3e3
  margin-top .5em
  padding .5em
  border-radius 3px
  .controls
    font-size .8em
    text-align right
</style>