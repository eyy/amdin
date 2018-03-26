<template>
  <input
    type="number"
    :value="value"
    :min="paths.min"
    :max="paths.max"
    @input="$emit('input', Number($event.target.value))"
  />
</template>

<script>
export default {
  props: [ 'value', 'paths' ]
}
</script>