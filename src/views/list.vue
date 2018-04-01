<template>
  <div>
    <h2>
      <router-link to="/">Admin</router-link> /
      {{ opts.label }}
    </h2>

    <router-link tag="button" :to="model + '/new'">
      Add a new {{ opts.label }}
    </router-link>

    <p v-if="!docs.length">
      <strong>No Documents.</strong>
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
          <router-link tag="button" :to="model + '/' + doc._id">Edit</router-link>
          <button @click.prevent="del(doc._id, index)" class="danger">Delete</button>
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
        del = this.realDel

      this.$toasted.show(`Are you sure you want to delete ${title}?`, {
        duration: null,
        type: 'error',
        action: [
          {
            text: 'Delete',
            onClick (e, toastObject) {
              toastObject.goAway(0)
              setTimeout(() => del(id, index, title), 0)
            }
          },
          {
            text: 'Never mind',
            onClick (e, toastObject) {
              toastObject.goAway()
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
      this.$toasted.info(`${title} was deleted.`)
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

  td:first-child
    min-width 10em
</style>