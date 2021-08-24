<template>
  <v-app-bar app flat color="white">
    <v-avatar
      v-if="$vuetify.breakpoint.xs"
      color="blue-grey lighten-3"
      size="48"
      class="mr-6"
      @click="drawer = !drawer"
    >
      <f-img :path="userData.uploadedPhotoPath || userData.photoURL" />
    </v-avatar>
    <v-toolbar-title class="font-weight-black">{{ title }}</v-toolbar-title>
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
        case '/post':
          return '投稿一覧'
        case '/post/edit':
          return '投稿＆編集'
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