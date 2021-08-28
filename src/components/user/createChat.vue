<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template #activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          新しく会話グループを作成する
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            outlined
            label="グループ名"
            prepend-icon="mdi-account-group"
          />
          <v-file-input outlined label="ロゴ" @change="setFile" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text :loading="loading" @click="create"
            >作成
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    name: '',
    file: null,
    loading: false,
  }),
  methods: {
    setFile(v) {
      this.file = v
    },
    async create() {
      this.loading = true
      if (this.file) {
        const storageRef = this.$fire.storage.ref(
          `images/posts/${this.$store.state.userData.uid}`
        )
        await storageRef.child(this.file.name).put(this.file)
      }

      await this.$store.dispatch('message/createChat', {
        uids: [this.$store.state.userData.uid],
        imagePath: this.file
          ? `images/posts/${this.$store.state.userData.uid}/${this.file.name}`
          : '',
        name: this.name,
      })
      this.dialog = false
      this.loading = false
    },
  },
}
</script>