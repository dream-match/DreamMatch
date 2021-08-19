<template>
  <v-card class="ma-0">
    <v-card-title class="text-sm-h5 text-lg-h4 font-weight-bold">
      ユーザー情報登録
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form v-model="isValid">
        <v-text-field
          v-model="input.mail"
          type="email"
          label="メールアドレス"
          prepend-icon="mdi-at"
          placeholder="your@email.com"
        />
        <v-text-field
          v-model="input.pass"
          label="パスワード"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn depressed color="primary" large class="subtitle-1">{{
        btnText
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({}),
}
</script>