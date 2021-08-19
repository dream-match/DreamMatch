<template>
  <v-card>
    <v-card-title class="text-sm-h5 text-lg-h4 font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form v-model="isValid">
        <v-text-field
          v-model="mail"
          type="email"
          label="メールアドレス"
          prepend-icon="mdi-at"
          placeholder="your@email.com"
          :rules="mailrules"
        />
        <v-text-field
          v-model="pass"
          label="パスワード"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
          :type="showPassword ? 'text' : 'password'"
          :rules="passRules"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn depressed color="primary" large class="subtitle-1">{{
        btnText
      }}</v-btn>
      <div class="px-5">または</div>
      <v-btn class="fill-width text-capitalize caption" large outlined>
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
export default {
  props: {
    title: { type: String, default: '何かしらのフォーム' },
    btnText: { type: String, default: '続行しちゃう' },
  },
  data: () => ({
    showPassword: false,
    isValid: false,
    passRules: [
      (v) => !!v || '',
      (v) => /^[\w-]{6,72}$/.test(v) || '6文字以上にしてください',
    ],
    mailrules: [(v) => !!v || '', (v) => /.+@.+\..+/.test(v) || ''],
    mail: '',
    pass: '',
  }),

  watch: {
    isValid(v) {
      this.$emit('update:valid', this.isValid)
    },
    mail() {
      this.emitData()
    },
    pass() {
      this.emitData()
    },
  },
  methods: {
    emitData() {
      this.$emit('update:i', { mail: this.mail, pass: this.pass })
    },
  },
}
</script>