<template>
  <v-app-bar app flat color="white">
    <v-avatar
      v-if="$vuetify.breakpoint.xs"
      color="blue-grey lighten-3"
      size="48"
      class="mr-6"
    >
      <v-img :src="userData.photoURL" @click="drawer = !drawer" />
    </v-avatar>
    <v-app-bar-title class="font-weight-black">{{ title }}</v-app-bar-title>
  </v-app-bar>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    title() {
      switch (this.$route.path) {
        case '/':
          return 'Home'
        case '/bookmark':
          return 'Bookmark'
        default:
          return '不明'
      }
    },
    drawer: {
      get() {
        return this.openMainMenu
      },
      set(v) {
        return this.setMainMenu(v)
      },
    },
    ...mapState(['openMainMenu', 'userData']),
  },
  methods: { ...mapMutations(['setMainMenu']) },
}
</script>