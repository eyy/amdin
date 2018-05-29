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
        :class="{ box: true, delete: doc.__deleted }"
      >
        <div class="box-controls">
          {{ doc.__deleted ? ___('Deleted') : '' }}
          <a href="#" v-handle v-show="here.length > 1" class="reorder" :title="___('Order')">&updownarrow;</a>
          <a href="#" @click.prevent="remove(doc)" :title="___('Remove')">&times;</a>
        </div>
        <obj
          :path="path.schema"
          :value="here[index]"
          :errors="errors[index]"
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
    value: Array,
    path: Object,
    errors: { type: Object, default: () => ({}) }
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
      this.here = [ emptyDoc(this.path.schema, { __deleted: false }) ].concat(this.value)
    },
    remove (doc) {
      this.$set(doc, '__deleted', !doc.__deleted)
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
.box.delete
  //filter grayscale(1) blur(2px)
  opacity .5
  > table
    display none
</style>
