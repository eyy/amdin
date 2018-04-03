<template>
  <div>
    <h1>{{ ___('Welcome!') }}</h1>

    <h2 v-for="model in models" :key="model.name">
      <router-link :to="model.name">{{ model.plural }}</router-link>
    </h2>
  </div>
</template>

<script>
import { start } from '../rest'

export default {
  data: () => ({
    models: []
  }),
  async created () {
    let { models } = await start()
    this.models = models
  }
}
</script>
