<template>
  <div>
    <h2>
      <router-link to="/">Admin</router-link>
      / <router-link :to="'/' + model">{{ opts.label }}</router-link>
      / New
    </h2>

    <a-form
      :paths="opts.paths"
      :doc="doc"
      @submit="save()"
    />
  </div>
</template>

<script>
import { getOptions, postDoc } from '../rest'
import form from '../components/form'
import { emptyDoc } from '../common'

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
    this.opts = await getOptions(this.model)
    this.doc = emptyDoc(this.opts.paths)
  },
  methods: {
    async save () {
      let res = await postDoc(this.model, this.doc)
      console.log(res)
    }
  }
}
</script>