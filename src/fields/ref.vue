<template>
  <select
    @change="$emit('input', $event.target.value)"
  >
    <option
      v-if="!path.require"
    ></option>
    <option
      v-for="doc in options"
      :key="doc[0]"
      :value="doc[0]"
      :selected="doc[0] === value"
    >
      {{ doc[1] }}
    </option>
  </select>
</template>

<script>
import { getRef } from '../rest'

export default {
  props: {
    value: String,
    path: Object
  },
  data: () => ({
    options: []
  }),
  async created () {
    this.options = await getRef(this.path.ref)
  }
}
</script>