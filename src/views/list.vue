<template>
  <div>
    <h2>
      <router-link to="/">Admin</router-link> /
      {{ opts.label }}
    </h2>

    <router-link tag="button" :to="model + '/new'">
      Add a new {{ opts.label }}
    </router-link>

    <table>
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
  async created () {
    this.model = this.$route.params.model
    // this.opts.label = this.model

    this.opts = await getOptions(this.model)
    this.docs = await getDocs(this.model)
  },
  methods: {
    async del (id, index) {
      let res = await deleteDoc(this.model, id)
      if (res.ok)
        this.docs.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus">
  table
    margin-top 1em

  th, td
    text-align start
    padding 0 .5em .5em 0

</style>