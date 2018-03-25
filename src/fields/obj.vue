<template>
  <table>
    <tr v-for="(path, name) in paths" :key="name">
      <th>{{ path.label }}</th>
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
import text from './text'
import checkbox from './checkbox'
import array from './array'
import radio from './radio'

export default {
  name: 'obj',
  props: [ 'value', 'paths' ],
  methods: {
    matchField
  }
}

function matchField (path) {
  let type = path.field || path.type.toLowerCase()

  if (path.enum)
    return radio

  if ('boolean' === type)
    return checkbox

  if ('array' === type)
    return array

  return text
}
</script>

<style lang="stylus">
th
  padding .55em 1em 1em 0
  text-align left
  vertical-align top
</style>