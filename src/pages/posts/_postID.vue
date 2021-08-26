 <template>
  <v-container>
    <v-card max-width="900">
      <PostCard v-if="post" :post="post" is-start-open />
    </v-card>
    <v-card max-width="900" flat>
      <v-card-title>コメント</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="message"
          outlined
          name="コメント送信"
          label="コメントを送信"
          :loading="uploading"
        >
        </v-textarea>
        <v-btn color="primary" @click="postMessage">送信</v-btn>
        <v-card flat>
          <v-list three-line>
            <v-list-item v-for="msg in messages" :key="msg.id">
              <nuxt-link :to="`/users/${msg.user.uid}`">
                <v-list-item-avatar size="48">
                  <f-img
                    :path="msg.user.uploadedPhotoPath || msg.user.photoURL"
                  />
                </v-list-item-avatar>
              </nuxt-link>
              <v-list-item-content>
                <v-list-item-title>{{
                  msg.user.displayName
                }}</v-list-item-title>
                <v-list-item-subtitle>
                  <pre>{{ msg.message }}</pre>
                </v-list-item-subtitle>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>
 <script>
export default {
  data: () => ({ post: null, uploading: false, messages: [], message: '' }),
  async mounted() {
    this.post = await this.$store.dispatch(
      'user/getPost',
      this.$route.params.postID
    )
    this.messages = await this.$store.dispatch('user/getMessage', this.post.id)
  },
  methods: {
    async postMessage() {
      this.uploading = true
      await this.$store.dispatch('user/postMessage', {
        id: this.post.id,
        message: this.message,
      })
      this.messages.push(this.message)
      this.message = ''
      this.uploading = false
    },
  },
}
</script>