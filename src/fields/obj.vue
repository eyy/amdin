<template>
  <table>
    <tr
      v-for="(p, name) in path"
      v-if="!p.hide"
      :key="name"
    >
      <th>
        {{ p.label || capitalize(name) }}&nbsp;<span v-if="p.required" class="required" title="Required">*</span>
      </th>
      <td>
        <component
          :is="matchField(p)"
          :path="p"
          v-model="value[name]"
          :errors="errors[name]"
        />
        <span class="error" v-if="errors[name] && errors[name].$isValidatorError">
          {{ errors[name].message }}
        </span>
      </td>
    </tr>
  </table>
</template>

<script>
import { matchField } from './index'
import capitalize from 'lodash/capitalize'

export default {
  name: 'obj',
  props: {
    value: Object,
    path: Object,
    errors: { type: Object, 'default': () => ({}) }
  },
  methods: { matchField, capitalize }
}
</script>

<style lang="stylus">
th
  padding .7em 1em .7em 0
  vertical-align top
  text-align start
  [dir=rtl] &
    padding .7em 0 1em 1em

span.required
  color gray
</style>
