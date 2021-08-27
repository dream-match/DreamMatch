<template>
  <v-container>
    <v-card>
      <v-card-title class="text-sm-h5 text-lg-h4 font-weight-bold">
        プロフィール入力
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form>
          <v-file-input
            accept="image/*"
            label="プロフィール画像を変更"
            @change="changeIcon"
          />
          <v-text-field
            v-model="input.name"
            label="ユーザー名"
            hint="外部のユーザーに公開します"
            prepend-icon="mdi-account"
          />
          <v-text-field
            v-model="input.twitter"
            label="Twitter"
            prepend-icon="mdi-twitter"
          />
          <v-text-field
            v-model="input.github"
            label="Github"
            prepend-icon="mdi-github"
          />
          <v-text-field
            v-model="input.url"
            label="その他URL"
            hint="ポートフォトリオとか"
            prepend-icon="mdi-palette"
          />
          <v-file-input
            accept="image/*"
            label="ヘッダー画像を設定"
            @change="changeHeader"
          />
          <v-combobox
            v-model="input.skills"
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
        <v-btn :loading="uploading" @click="update">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  middleware: 'login',
  data: () => ({
    input: {
      uid: '',
      icon: null,
      header: null,
      name: '',
      twitter: '',
      github: '',
      url: '',
      skills: [],
      prof: '',
    },
    uploading: false,
  }),
  async mounted() {
    const userData = await this.$fire.firestore
      .collection('users')
      .doc(this.$store.state.userData.uid)
      .get()
    const {
      name = '',
      twitter = '',
      github = '',
      url = '',
      skills = {},
      prof = '',
    } = userData.data()
    this.input = {
      ...{ name, twitter, github, url, prof },
      skills: [...Object.keys(skills)],
    }
  },
  methods: {
    remove(item) {
      this.input.skills.splice(this.input.skills.indexOf(item), 1)
      this.input.skills = [...this.input.skills]
    },
    changeIcon(f) {
      if (!f) return null
      this.icon = f
    },
    changeHeader(f) {
      if (!f) return null
      this.header = f
    },
    async update() {
      this.uploading = true
      const { skills } = this.input
      const { icon, header } = this
      const uploadFunc = async (name, file) => {
        await this.$fire.storage.ref().child(name).put(file)
      }
      const iconName = icon
        ? `/images/profile/${this.$store.state.userData.uid}/${icon.name}`
        : null
      const headerName = header
        ? `/images/profile/${this.$store.state.userData.uid}/${header.name}`
        : null
      try {
        await Promise.all([
          iconName && uploadFunc(iconName, icon),
          headerName && uploadFunc(headerName, header),
        ])

        const images = {}
        if (icon) {
          images.uploadedPhotoPath = iconName
        }
        if (header) {
          images.headerImg = headerName
        }

        const skillsObj = skills.reduce((b, v) => {
          b[v] = true
          return b
        }, {})
        await this.$fire.firestore
          .collection('users')
          .doc(this.$store.state.userData.uid)
          .update({
            ...this.input,
            ...images,
            skills: skillsObj,
          })
      } catch (e) {
        console.error(e)
      }
      this.uploading = false
      this.$router.push('/')
    },
  },
}
</script>