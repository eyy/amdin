<template>
  <input
    type="checkbox"
    :checked="value"
    :required="path.required"
    @change="$emit('input', $event.target.checked)"
  />
</template>

<script>
export default {
  props: {
    value: Boolean,
    path: Object
  }
}
</script>