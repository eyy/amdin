<template>
  <div>
    <button type="button" @click.prevent="add">
      &plus; {{ ___('Add') }}
    </button>

    <sortable-list
      v-model="here"
      lock-axis="y"
      :use-drag-handle="true"
    >
      <sortable-item
        v-for="(doc, index) in here"
        :index="index"
        :key="doc._id"
        class="box"
      >
        <div class="box-controls">
          <a href="#" v-handle v-show="here.length > 1" class="reorder" :title="___('Order')">&updownarrow;</a>
          <a href="#" @click.prevent="remove(index)" :title="___('Remove')">&times;</a>
        </div>
        <obj
          :path="path.schema"
          :value="here[index]"
        />
      </sortable-item>
    </sortable-list>
  </div>
</template>

<script>
import { SortableList, SortableItem, HandleDirective } from '../components/sort'
import { emptyDoc } from '../common'

export default {
  props: {
    value: { type: Array, 'default': () => [] },
    path: Object
  },
  computed: {
    here: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    add () {
      this.here = [ emptyDoc(this.path.schema) ].concat(this.value)
    },
    remove (index) {
      this.value.splice(index, 1)
    }
  },
  components: { SortableList, SortableItem },
  directives: { handle: HandleDirective }
}
</script>

<style lang="stylus">
.box-controls a
  display inline-block
  padding 0 .4em
  text-decoration none
</style>
