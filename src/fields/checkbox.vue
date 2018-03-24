<template>
  <input
    type="checkbox"
    :checked="value"
    @change="$emit('input', $event.target.checked)"
  />
</template>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>