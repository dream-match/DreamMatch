<template>
  <v-card class="ma-0">
    <v-card-title class="text-sm-h5 text-lg-h4 font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-alert v-if="errorMsg" dense outlined type="error"
        >{{ errorMsg }}
      </v-alert>
      <v-form ref="mail_form">
        <v-text-field
          v-model="input.mail"
          type="email"
          label="メールアドレス"
          prepend-icon="mdi-at"
          placeholder="your@email.com"
          :error="error"
          :disabled="loading || loadingGoogle"
          :rules="mailrules"
        />
        <v-text-field
          v-model="input.pass"
          label="パスワード"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
          :disabled="loading || loadingGoogle"
          :type="showPassword ? 'text' : 'password'"
          :rules="passRules"
          :error="error"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        depressed
        color="primary"
        large
        class="subtitle-1"
        :error="error"
        :disabled="loadingGoogle"
        :loading="loading"
        @click="submit"
        >{{ btnText }}</v-btn
      >
      <div class="px-5">または</div>
      <v-btn
        class="fill-width text-capitalize caption"
        large
        outlined
        :disabled="loading"
        :loading="loadingGoogle"
        @click="google"
      >
        <img
          class="button-logo-img mr-4 subtitle-1"
          src="https://madeby.google.com/static/images/google_g_logo.svg"
          style="height: 24px"
        />
        Googleで{{ btnText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: { type: String, default: '何かしらのフォーム' },
    btnText: { type: String, default: '続行しちゃう' },
  },
  data: () => ({
    showPassword: false,

    passRules: [
      (v) => !!v || '',
      (v) => /^[\w-]{6,72}$/.test(v) || '6文字以上にしてください',
    ],
    mailrules: [(v) => !!v || '', (v) => /.+@.+\..+/.test(v) || ''],
    input: { mail: '', pass: '' },
    error: false,
    loading: false,
    loadingGoogle: false,
    errorMsg: '',
    suc: false,
  }),
  computed: {
    ...mapState('auth', ['errorCode']),
  },
  watch: {
    errorCode(v) {
      if (v) {
        this.errorCodeToMsg()
        this.loading = this.loadingGoogle = false
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.mail_form.validate()) {
        this.loading = true
        this.$emit('submit', this.input)
      }
    },
    google() {
      this.loadingGoogle = true
      this.$emit('loginGoogle')
    },
    errorCodeToMsg() {
      const msg = (() => {
        switch (this.errorCode) {
          case 'auth/invalid-email':
            return 'メールアドレスが正しくないです'
          case 'auth/user-disabled':
            return 'ユーザーが無効です'
          case 'auth/user-not-found':
            return 'メールアドレスまたはパスワードが違います'
          case 'auth/wrong-password':
            return 'パスワードが違います'
          case 'auth/too-many-requests':
            return 'パスワードを間違えすぎです'
          case 'auth/email-already-in-use':
            return 'このメールアドレスは既に使用されています'
          case 'auth/popup-blocked':
            return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください'
          case 'auth/popup-closed-by-user':
            return 'ポップアップを閉じないでください'
          default:
            return '不明なエラーでs'
        }
      })()

      this.errorMsg = msg
    },
  },
}
</script>