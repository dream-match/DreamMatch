 <template>
  <v-container>
    <v-card max-width="900" flat>
      <PostCard v-if="post" :post="post" is-start-open />
    </v-card>
    <v-card>
      <v-card-title>コメント</v-card-title>
      <v-card-text>
        <v-textarea outlined name="コメント送信" label="コメントを送信">
        </v-textarea>
        <v-btn color="primary">送信</v-btn>
        <v-divider />
      </v-card-text>
    </v-card>
  </v-container>
</template>
 <script>
export default {
  data: () => ({ post: null }),
  async mounted() {
    this.post = await this.$store.dispatch(
      'user/getPost',
      this.$route.params.postID
    )
  },
}
</script>