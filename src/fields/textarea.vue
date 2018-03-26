<template>
  <textarea
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>


<script>
export default {
  props: [ 'value' ]
}
</script>