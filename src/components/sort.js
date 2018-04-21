import { ContainerMixin, ElementMixin } from 'vue-slicksort'
export { HandleDirective } from 'vue-slicksort'

export const SortableList = {
  mixins: [ ContainerMixin ],
  props: {
    tag: { type: String, default: 'div' }
  },
  render (h) {
    return h(this.tag, this.$slots.default)
  }
}

export const SortableItem = {
  mixins: [ ElementMixin ],
  props: {
    tag: { type: String, default: 'div' }
  },
  render (h) {
    return h(this.tag, this.$slots.default)
  }
}
