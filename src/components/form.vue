<template>
  <form @submit.prevent="save">
    <obj
      :paths="paths"
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
    saving: false
  }),
  methods: {
    async save () {
      this.saving = true
      let res = await this.submit(this.doc)
      this.saving = false
      let ___ = this.___

      if (res.status === 500 && res.name === 'ValidationError') {
        this.errors = res.errors
        console.error('error', res)
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
  min-width 15em
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
</style>