<template>
  <section>
    <v-stepper v-model="step" max-width="960px" class="mx-auto fill-width">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"> Step 1 </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2"> Step 3 </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> 確認 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <AuthForm
            title="登録"
            btn-text="登録"
            @submit="registerByMail"
            @loginGoogle="registerByGoogle"
          />
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
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['registerStep']),
    step: {
      get() {
        return this.registerStep
      },
      set(v) {
        return this.setRegisterStep(v)
      },
    },
  },
  methods: {
    ...mapMutations('auth', ['setRegisterStep']),
    ...mapActions('auth', ['registerByMail', 'registerByGoogle']),
  },
}
</script>