<template>
  <div>
    <label v-for="opt in path.enum" :key="opt">
      <input
        type="radio"
        name="paths"
        :value="opt"
        :checked="opt === value"
        @change="$emit('input', $event.target.value)"
      />
      {{ opt }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    path: Object
  }
}
</script>
