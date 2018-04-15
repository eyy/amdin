<template>
  <div>
    <button type="button" @click.prevent="add">
      {{ ___('Add') }}
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
        <div class="controls">
          <span v-show="here.length > 1">
            <a href="#" v-handle class="reorder">{{ ___('Order') }}</a>,
          </span>
          <a href="#" @click.prevent="remove(index)">{{ ___('Remove') }}</a>
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
import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
import { emptyDoc } from '../common'

const SortableList = {
  mixins: [ ContainerMixin ],
  render (h) {
    return h('div', this.$slots.default)
  }
}

const SortableItem = {
  mixins: [ ElementMixin ],
  render (h) {
    return h('div', this.$slots.default)
  }
}

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
