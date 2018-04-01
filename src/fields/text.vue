<template>
  <input
    type="text"
    :value="value"
    :required="path.required"
    :maxlength="path.maxlength"
    :minlength="path.minlength"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: [ 'value', 'path' ]
}
</script>