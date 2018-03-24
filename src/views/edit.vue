<template>
  <a-form
    :paths="opts.paths"
    :doc="doc"
    @submit="doc => save(doc)"
  />
</template>

<script>
import { getOptions, getDoc, putDoc } from '../rest'
import form from './form'

export default {
  components: { 'a-form': form },
  data: () => ({
    model: '',
    id: null,
    opts: { paths: {} },
    doc: {}
  }),
  async created () {
    this.model = this.$route.params.model
    this.id = this.$route.params.id

    this.opts = await getOptions(this.model)
    this.doc = await getDoc(this.model, this.id)
  },
  methods: {
    async save (doc) {
      let res = await putDoc(this.model, this.id, doc)
      console.log(res)
    }
  }
}
</script>