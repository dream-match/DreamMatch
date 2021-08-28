<template>
  <v-bottom-navigation
    v-if="$vuetify.breakpoint.xs"
    v-model="value"
    :background-color="color"
    dark
    shift
    app
  >
    <v-btn to="/">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn to="/search">
      <span>Search</span>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn to="/post">
      <span>Write</span>
      <v-icon>mdi-lead-pencil</v-icon>
    </v-btn>
    <v-btn to="/messages">
      <span>Chat</span>
      <v-icon>mdi-forum</v-icon>
    </v-btn>
    <v-btn to="/setting">
      <span>Setting</span>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data: () => ({ value: 1 }),

  computed: {
    color() {
      switch (this.value) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
        case 4:
          return 'deep-purple'
        default:
          return 'blue-grey'
      }
    },
  },
}
</script>