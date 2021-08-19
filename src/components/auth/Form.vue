<template>
  <v-card>
    <v-card-title class="text-sm-h5 text-lg-h4 font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <AuthMailForm :valid.sync="isValid" :i.sync="input" />
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
  data: () => ({ isValid: false, input: { mail: '', pass: '' } }),
  watch: {
    isValid() {},
  },
}
</script>