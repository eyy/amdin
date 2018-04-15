<template>
  <table>
    <tr
      v-for="(path, name) in paths"
      v-if="!path.hide"
      :key="name"
    >
      <th>
        {{ path.label }}&nbsp;<span v-if="path.required" class="required" title="Required">*</span>
      </th>
      <td>
        <component
          :is="matchField(path)"
          :path="path"
          v-model="value[name]"
        />
        <span class="error" v-if="errors[name]">
          {{ errors[name].message }}
        </span>
      </td>
    </tr>
  </table>
</template>

<script>
import { matchField } from './index'

export default {
  name: 'obj',
  props: {
    value: Object,
    paths: Object,
    errors: { type: Object, 'default': () => ({}) }
  },
  methods: { matchField }
}
</script>

<style lang="stylus">
th
  padding .7em 1em 1em 0
  vertical-align top
  text-align start
  [dir=rtl] &
    padding .7em 0 1em 1em

span.required
  color gray
</style>
