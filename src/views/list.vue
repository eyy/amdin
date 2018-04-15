<template>
  <div>
    <h2>
      <router-link to="/">{{ ___('Admin') }}</router-link> /
      {{ opts.plural }}
    </h2>

    <router-link tag="button" :to="model + '/new'">
      {{ ___('Add a new $1', opts.label) }}
    </router-link>

    <button
      @click.prevent="sort"
      v-if="reordered"
      :disabled="reordered === 'saving'"
      class="other"
    >
      {{ ___('Save New Order') }}
    </button>

    <p v-if="!docs.length">
      <strong>{{ ___('No Documents.') }}</strong>
    </p>

    <table id="list" v-else>
      <tr>
        <th
          v-for="path in opts.list"
          :key="path"
          :class="{ sort: path === opts.sortable }"
        >
          {{ opts.paths[path].label }}
        </th>
        <th></th>
      </tr>

      <sortable-list
        tag="tbody"
        v-model="docs"
        :use-drag-handle="true"
        @input="reordered = true"
      >
        <sortable-tr
          v-for="(doc, index) in docs"
          :index="index"
          :key="doc._id"
        >
          <td
            v-for="path in opts.list"
            :key="path"
          >
            <span v-if="path === opts.sortable" v-handle class="sort">
              =
            </span>
            <div v-else-if="path === opts.title" class="title-field">
              <router-link :to="model + '/' + doc._id">
                {{ doc[path] }}
              </router-link>
            </div>
            <span v-else>
              {{ doc[path] }}
            </span>
          </td>
          <td>
            <router-link tag="button" :to="model + '/' + doc._id">{{ ___('Edit') }}</router-link>
            <button @click.prevent="del(doc._id, index)" class="danger">{{ ___('Delete') }}</button>
            <button
              v-for="(action, index) in opts.actions"
              :key="index"
              @click.prevent="act(index, doc)"
              class="other"
            >
              {{ action.label }}
            </button>
          </td>
        </sortable-tr>
      </sortable-list>
    </table>
  </div>
</template>

<script>
import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
import { getDocs, getOptions, deleteDoc, sortDocs, act } from '../rest'

const SortableList = {
  mixins: [ ContainerMixin ],
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  render (h) {
    return h(this.tag, this.$slots.default)
  }
}

const SortableTr = {
  mixins: [ ElementMixin ],
  render (h) {
    return h('tr', this.$slots.default)
  }
}

export default {
  data: () => ({
    model: '',
    opts: {},
    docs: [],
    reordered: false
  }),
  async beforeRouteEnter (to, from, next) {
    let { model } = to.params
    let [ opts, docs ] = await Promise.all([ getOptions(model), getDocs(model) ])

    if (opts.single)
      return next('/' + model + '/single')

    next(vm => {
      vm.model = model
      vm.opts = opts
      vm.docs = docs
    })
  },
  methods: {
    async act (index, doc) {
      let res = await act(this.model, index, doc._id)
      if (!res)
        return

      this.docs = await getDocs(this.model)
      this.$toasted.success(this.opts.actions[ index ].success)
    },
    async sort () {
      this.reordered = 'saving'
      let res = await sortDocs(
        this.model,
        this.docs.map((d, index) => [ d._id, index ])
      )
      this.reordered = false
      if (res.ok)
        this.$toasted.success(this.___('Saved!'))
    },
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
  },
  components: { SortableList, SortableTr },
  directives: { handle: HandleDirective }
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

  th.sort
    font-size 0
    width 2em

  span.sort
    user-select none
    cursor move

.title-field
  min-width 10em
</style>
