<template>
  <table>
    <tr v-for="(path, name) in paths" :key="name">
      <th>
        {{ path.label }}
        <span v-if="path.required" class="required">*</span>
      </th>
      <td>
        <component
          :is="matchField(path)"
          :paths="path"
          v-model="value[name]"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import { matchField } from './index'

export default {
  name: 'obj',
  props: [ 'value', 'paths' ],
  methods: { matchField }
}
</script>

<style lang="stylus">
th
  padding .55em 1em 1em 0
  text-align left
  vertical-align top

span.required
  color gray
</style>