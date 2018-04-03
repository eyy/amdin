<template>
  <div>
    <h2>
      <router-link to="/">{{ ___('Admin') }}</router-link> /
      {{ opts.plural }}
    </h2>

    <router-link tag="button" :to="model + '/new'">
      {{ ___('Add a new $1', opts.label) }}
    </router-link>

    <p v-if="!docs.length">
      <strong>{{ ___('No Documents.') }}</strong>
    </p>

    <table id="list" v-else>
      <tr>
        <th v-for="path in opts.list" :key="path">
          {{ opts.paths[path].label }}
        </th>
        <th></th>
      </tr>

      <tr v-for="(doc, index) in docs" :key="doc._id">
        <td v-for="path in opts.list" :key="path">
          <span v-if="path === opts.title">
            <router-link :to="model + '/' + doc._id">
              {{ doc[path] }}
            </router-link>
          </span>
          <span v-else>
            {{ doc[path] }}
          </span>
        </td>
        <td>
          <router-link tag="button" :to="model + '/' + doc._id">{{ ___('Edit') }}</router-link>
          <button @click.prevent="del(doc._id, index)" class="danger">{{ ___('Delete') }}</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getDocs, getOptions, deleteDoc } from '../rest'

export default {
  data: () => ({
    model: '',
    opts: {},
    docs: []
  }),
  async beforeRouteEnter (to, from, next) {
    let { model } = to.params
    let [ opts, docs ] = await Promise.all([ getOptions(model), getDocs(model) ])

    next(vm => {
      vm.model = model
      vm.opts = opts
      vm.docs = docs
    })
  },
  methods: {
    async del (id, index) {
      let title = this.docs[index][this.opts.title],
        del = this.realDel,
        ___ = this.___

      this.$toasted.show(___('Are you sure you want to delete $1?', title), {
        duration: null,
        type: 'error',
        action: [
          {
            text: ___('Delete'),
            onClick (e, toastObject) {
              toastObject.goAway(0)
              setTimeout(() => del(id, index, title), 500)
            }
          },
          {
            text: ___('Never mind'),
            onClick (e, toastObject) {
              toastObject.goAway(0)
            }
          }
        ]
      })
    },
    async realDel (id, index, title) {
      let res = await deleteDoc(this.model, id)
      if (!res.ok)
        return

      this.docs.splice(index, 1)
      this.$toasted.info(this.___('$1 was deleted.', title))
    }
  }
}
</script>

<style lang="stylus">
table#list
  margin-top 1em

  th, td
    text-align start
    padding 0 .5em .5em 0
    [dir=rtl] &
      padding 0 0 .5em .5em

  td:first-child
    min-width 10em
</style>