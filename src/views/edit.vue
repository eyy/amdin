<template>
  <div>
    <h2>
      <router-link to="/">Admin</router-link>
      / <router-link :to="'/' + model">{{ opts.label }}</router-link>
      / <em>{{ doc[opts.title] || 'Untitled' }}</em>
    </h2>

    <a-form
      :paths="opts.paths"
      :doc="doc"
      :submit="d => putDoc(model, id, d)"
    />
  </div>
</template>

<script>
import { getOptions, getDoc, putDoc } from '../rest'
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
    this.id = this.$route.params.id

    this.opts = await getOptions(this.model)
    this.doc = await getDoc(this.model, this.id)
  },
  methods: { putDoc },
  components: { AForm }
}
</script>