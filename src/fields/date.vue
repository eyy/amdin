<template>
  <input
    type="date"
    :value="value"
    :required="path.required"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: [ 'value', 'path' ]
}
</script>