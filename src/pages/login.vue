<template>
  <section class="ma-6">
    <AuthForm
      title="ログイン"
      btn-text="ログイン"
      class="pa-6"
      @submit="loginByMail"
      @loginGoogle="loginByGoogle"
    >
      <div class="ma-2">
        アカウントを作成していませんか? こちらで
        <nuxt-link to="/register">作成</nuxt-link>
      </div></AuthForm
    >
  </section>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'auth',
  methods: {
    ...mapActions('auth', ['loginByMail', 'loginByGoogle']),
  },
}
</script>