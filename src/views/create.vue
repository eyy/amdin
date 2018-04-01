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
    opts: { paths: {} },
    doc: {}
  }),
  async beforeRouteEnter (to, from, next) {
    let { model } = to.params
    let opts = await getOptions(model)

    next(vm => {
      vm.model = model
      vm.opts = opts
      vm.doc = emptyDoc(opts.paths)
    })
  },
  methods: { postDoc },
  components: { AForm }
}
</script>