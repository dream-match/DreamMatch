<template>
  <v-app>
    <v-main style="background: #f5f5f5; height: auto" class="pa-0 fill-height">
      <v-container
        :class="{ 'pa-0': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs }"
      >
        <nuxt />
      </v-container>
    </v-main>
    <footer style="background: #f5f5f5">
      <div class="pa-8 d-flex flex-warp justify-center fill-wdith">
        <nuxt-link to="privacy" class="link-caption mr-8"
          >プライバシーポリシー</nuxt-link
        >
        <nuxt-link to="tos" class="link-caption mr-8">利用規約</nuxt-link>
      </div>
    </footer>
  </v-app>
</template>
<script>
export default {
  middleware({ redirect, $fire }) {
    $fire.auth.onAuthStateChanged((user) => {
      if (user) {
        return redirect('/')
      }
    })
  },
  mounted() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      }
    })
  },
}
</script>