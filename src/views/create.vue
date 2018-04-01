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
      :submit="d => postDoc(model, d)"
    />
  </div>
</template>

<script>
import { getOptions, postDoc } from '../rest'
import { emptyDoc } from '../common'
import AForm from '../components/form'

export default {
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
  methods: { postDoc },
  components: { AForm }
}
</script>