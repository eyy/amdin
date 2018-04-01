<template>
  <textarea
    type="text"
    :value="value"
    :maxlength="path.maxlength"
    :minlength="path.minlength"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  props: [ 'value', 'path' ]
}
</script>