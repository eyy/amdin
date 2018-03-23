<template>
  <div>
    <h1>Welcome!</h1>

    <h2 v-for="model in models" :key="model.name">
      <router-link :to="model.name">{{ model.label }}</router-link>
    </h2>
  </div>
</template>

<script>
// import { listModels } from '../rest'

export default {
  data: () => ({
    models: [
      { name: 'author', label: 'Author' },
      { name: 'book', label: 'Book' }
    ]
  })
  // async created () {
  //   this.models = await listModels()
  // }
}
</script>
