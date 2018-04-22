<template>
  <div>
    <div v-if="path.type === 'Boolean'" style="text-align: center;">
      <span v-if="value">&check;</span>
    </div>
    <span v-else>
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  props: [ 'path', 'value' ]
}
</script>
