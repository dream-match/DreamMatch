<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template #activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> 会話グループに入る </v-card-title>
        <v-card-subtitle>
          チャットIDはチャットスペースの末尾のアルファベットの羅列です
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="name"
            outlined
            label="チャットID"
            prepend-icon="mdi-account-group"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text :loading="loading" @click="join">
            入る
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
    async join() {
      this.loading = true
      await this.$store.dispatch('message/joinChat', this.name)
      this.loading = false
    },
  },
}
</script>