<template>
  <v-app-bar app flat dark>
    <v-btn v-if="isUsers || isTweets" fab text small @click="$router.back()">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <nuxt-link :to="`/users/${userData.uid}`">
      <v-avatar
        v-if="$vuetify.breakpoint.xs"
        color="blue-grey lighten-3"
        size="48"
        class="mr-6"
      >
        <f-img :path="userData.uploadedPhotoPath" />
      </v-avatar>
    </nuxt-link>
    <v-toolbar-title class="font-weight-black">{{ title }}</v-toolbar-title>
    <v-spacer />

    <UserCreateChat v-if="isMessages" />
    <UserJoinChannel v-if="isMessages" />

    <v-btn v-show="!$store.state.isLogin" text to="/register">
      登録・ログイン
    </v-btn>
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
        case '/setting':
          return '設定'
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
    isMessages() {
      return this.$route.path === '/messages'
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