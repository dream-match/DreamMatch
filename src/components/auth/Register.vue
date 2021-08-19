<template>
  <section>
    <v-stepper v-model="step" max-width="960px" class="mx-auto fill-width">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          メールアドレス入力
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          Name of step 2
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Name of step 3 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <AuthMailForm title="登録" btn-text="登録" />
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="step = 3"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="step = 1"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['registerStep']),
    step: {
      get() {
        return this.registerStep
      },
      set(v) {
        console.log(v)
        return this.setRegisterStep(v)
      },
    },
  },
  methods: {
    ...mapMutations('auth', ['setRegisterStep']),
  },
}
</script>