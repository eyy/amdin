<template>
  <div>
    <h2>
      <router-link to="/">{{ ___('Admin') }}</router-link>
      / <router-link :to="'/' + model">{{ opts.plural }}</router-link>
      / {{ ___('New') }}
    </h2>

    <a-form
      :paths="opts.paths"
      :doc="doc"
      :submit="d => postDoc(model, d)"
      @saved="saved"
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

    if (opts.single)
      return next('/' + model + '/single')

    next(vm => {
      vm.model = model
      vm.opts = opts
      vm.doc = emptyDoc(opts.paths)
    })
  },
  methods: {
    postDoc,
    saved (res) {
      this.$router.push({
        name: 'edit',
        params: { model: this.model, id: res._id }
      })
    }
  },
  components: { AForm }
}
</script>
