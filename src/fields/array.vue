<template>
  <div>
    <button type="button" @click.prevent="add">Add</button>

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
        <div class="controls">
          <span v-show="here.length > 1">
            <a href="#" v-handle class="reorder">Order</a>,
          </span>
          <a href="#" @click.prevent="remove(index)">Remove</a>
        </div>
        <obj
          :paths="path.schema"
          :value="here[index]"
        />
      </sortable-item>
    </sortable-list>
  </div>
</template>

<script>
import { HandleDirective } from 'vue-slicksort'
import { emptyDoc } from '../common'
import SortableList from '../components/sortable-list'
import SortableItem from '../components/sortable-item'

export default {
  props: {
    value: {
      type: Array,
      'default': () => []
    },
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
.box
  margin-top .5em
  padding .5em
  border-radius 3px
  border 1px solid #e3e3e3
  background white
  .controls
    font-size .8em
    text-align right
    a.reorder
      cursor move
</style>