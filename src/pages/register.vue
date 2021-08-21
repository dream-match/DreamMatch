<template>
  <section>
    <v-stepper v-model="step" max-width="960px" class="mx-auto fill-width">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"> 認証</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">
          プロフィール
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3"> 完了 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <AuthForm
            title="登録"
            btn-text="登録"
            flat
            @submit="registerByMail"
            @loginGoogle="registerByGoogle"
          />
          <div class="ma-2">
            既にアカウントがありますか? こちらで
            <nuxt-link to="/login">ログイン</nuxt-link>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-title class="text-sm-h5 text-lg-h4 font-weight-bold">
              プロフィール入力
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-avatar size="72" color="primary">
                <v-img v-if="input.image" :src="input.image" />
              </v-avatar>
              <v-form>
                <v-file-input
                  accept="image/*"
                  label="プロフィール画像を変更"
                  @change="setUserImage"
                />
                <v-text-field
                  v-model="input.name"
                  label="ユーザー名"
                  hint="外部のユーザーに公開します"
                  prepend-icon="mdi-account"
                />
                <v-combobox
                  v-model="input.skill"
                  :items="items"
                  chips
                  clearable
                  label="スキル"
                  multiple
                  hint="あなたの得意なことを書こう"
                  prepend-icon="mdi-hammer-wrench"
                >
                  <template #selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="remove(item)"
                    >
                      <strong>{{ item }}</strong>
                    </v-chip>
                  </template>
                </v-combobox>
                <v-textarea
                  v-model="input.prof"
                  label="プロフィール"
                  prepend-icon="mdi-comment"
                  placeholder="ギターを練習しています"
                  hint="自分について短くまとめましょう"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" :loading="loading" @click="submit">
                登録</v-btn
              >

              <v-btn text to="/"> Cancel </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card>
            <v-card-title class="text-sm-h5 text-lg-h4 font-weight-bold">
              完了
            </v-card-title>
            <v-card-actions>
              <v-btn color="primary" to="/"> ホーム戻る </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  layout: 'auth',
  data: () => ({
    input: {
      skill: [],
      name: '',
      prof: '',
      image: '',
      imageFile: null,
    },
    loading: false,
    items: ['プログラミング', '執筆', '作曲', 'ギター'],
  }),
  computed: {
    ...mapState('auth', ['registerStep', 'userData']),
    step: {
      get() {
        return this.registerStep
      },
      set(v) {
        return this.setRegisterStep(v)
      },
    },
  },
  watch: {
    userData: {
      immediate: true,
      handler(v) {
        this.input.name = v.name
        this.input.image = v.photoURL
      },
    },
    step(v) {
      v === 3 && this.getUserData()
    },
  },
  methods: {
    submit() {
      this.registerProf(this.input)
      this.loading = true
    },
    remove(item) {
      this.chips.splice(this.input.skill.indexOf(item), 1)
      this.chips = [...this.input.skill]
    },
    setUserImage(img) {
      if (img) {
        this.input.imageFile = img
        this.input.image = URL.createObjectURL(img)
      }
    },
    ...mapMutations('auth', ['setRegisterStep']),
    ...mapActions('auth', [
      'registerByMail',
      'registerByGoogle',
      'registerProf',
    ]),
    ...mapActions(['getUserData']),
  },
}
</script>