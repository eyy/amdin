<template>
  <form @submit.prevent="save" :class="{ saving }">
    <obj
      :path="paths"
      :value="doc"
      :errors="errors"
    />

    <button
      type="submit"
      :disabled="saving"
    >
      {{ ___('Save') }}
      <span v-if="saving">...</span>
    </button>

    <div class="error" v-if="errors">
      {{ errors.message }}
    </div>
  </form>
</template>

<script>
export default {
  props: {
    doc: Object,
    paths: Object,
    submit: Function
  },
  data: () => ({
    errors: {},
    saving: false,
    preSave: []
  }),
  provide: function () {
    return {
      preSave: this.preSave
    }
  },
  methods: {
    async save () {
      let { ___ } = this

      this.saving = true
      try {
        await Promise.all(this.preSave.map(fn => fn()))
      }
      catch (err) {
        console.error('preSave error', err)
        return this.$toasted.error(___('There was a problem :('))
      }

      let res = await this.submit(this.doc)
      this.saving = false

      if (res.status === 500 && res.name === 'ValidationError') {
        this.errors = res.errors
        console.error('submit error', res)
        this.$toasted.error(___('There was a problem :('))
      }
      else {
        this.errors = {}
        this.$toasted.success(___('Saved!'))
        this.$emit('saved', res)
      }
    }
  }
}
</script>

<style lang="stylus">
form
  margin-bottom 1em

input, select, textarea
  padding .5em
  min-width 25em
  box-sizing border-box

input
  &[type=checkbox],
  &[type=radio]
    min-width auto

textarea
  width 20em
  height 10em

button[type=submit]
  font-size 1em
  margin-top 1em
  &[disabled]
    background lightslategray !important

.saving
  cursor progress
</style>
