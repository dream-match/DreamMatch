<template>
  <v-navigation-drawer
    v-if="!$vuetify.breakpoint.xs"
    permanent
    app
    dark
    mini-variant
    mini-variant-width="56"
  >
    <v-list-item class="px-2" :to="`/users/${userData.uid}`">
      <v-avatar size="40">
        <v-img :src="userData.photoURL"></v-img>
      </v-avatar>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item nuxt to="/">
        <v-icon>mdi-home</v-icon>
      </v-list-item>
      <v-list-item
        v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.sm"
        nuxt
        to="/search"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-list-item>
      <v-list-item nuxt to="/post">
        <v-icon>mdi-fountain-pen-tip</v-icon>
      </v-list-item>
      <v-list-item nuxt to="/setting">
        <v-icon>mdi-cog</v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    drawer: {
      get() {
        return this.openMainMenu
      },
      set(v) {
        return this.setMainMenu(v)
      },
    },
    ...mapState(['userData', 'openMainMenu']),
  },
  methods: { ...mapMutations(['setMainMenu']) },
}
</script>