<template>
  <input
    type="number"
    :value="value"
    :required="path.required"
    :min="path.min"
    :max="path.max"
    @input="$emit('input', Number($event.target.value))"
  />
</template>

<script>
export default {
  props: [ 'value', 'path' ]
}
</script>
