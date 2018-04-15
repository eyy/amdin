<template>
  <div>
    <h2>
      <router-link to="/">{{ ___('Admin') }}</router-link>
      / {{ opts.label }}
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
  async beforeRouteEnter (to, from, next) {
    let { model, id } = to.params
    let [ opts, doc ] = await Promise.all([ getOptions(model), getDoc(model) ])

    if (!opts.single)
      return next('/' + model)

    next(vm => {
      vm.model = model
      vm.id = id
      vm.opts = opts
      vm.doc = doc
    })
  },
  methods: { putDoc },
  components: { AForm }
}
</script>
