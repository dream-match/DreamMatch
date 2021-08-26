<template>
  <v-app-bar app flat dark color="dark.primary">
    <v-btn v-if="isUsers || isTweets" fab text small @click="$router.back()">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
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
      if (this.isTweets) {
        return '投稿'
      }
      switch (this.$route.path) {
        case '/':
        case '/users':
          return 'Home'
        case '/post':
          return '投稿一覧'
        case '/post/edit':
          return '投稿＆編集'
        default:
          return this.bar || 'Home'
      }
    },
    isUsers() {
      return this.$route.path.includes('/users')
    },
    isTweets() {
      return this.$route.path.includes('/posts')
    },
    drawer: {
      get() {
        return this.openMainMenu
      },
      set(v) {
        return this.setMainMenu(v)
      },
    },
    ...mapState(['openMainMenu', 'userData', 'bar']),
  },
  methods: { ...mapMutations(['setMainMenu']) },
}
</script>