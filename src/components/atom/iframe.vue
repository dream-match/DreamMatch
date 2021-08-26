<template>
  <v-card ref="card" height="300" max-width="600">
    <iframe :src="src" height="100%" width="100%" allowfullscreen />
  </v-card>
</template>
<script>
export default {
  props: { src: { type: String, default: '' } },
}
</script>