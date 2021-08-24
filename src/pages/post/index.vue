<template>
  <div>
    <v-card
      v-for="post in posts"
      :key="post.id"
      class="mb-2"
      :disabled="post.id === deleting"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-1">{{ post.createdAt }}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ post.title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
            text
            :to="`/post/edit?id=${post.id}`"
            width="40"
            height="40"
            ::disabled="post.id === deleting"
          >
            <v-icon> mdi-pencil-outline </v-icon>
          </v-btn>
          <v-btn
            :text="!(deleteId === post.id)"
            dark
            color="red"
            width="40"
            height="40"
            :loading="post.id === deleting"
            @click="deletePost(post.id)"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <v-btn
      fab
      large
      right
      fixed
      darl
      color="primary"
      :to="`/post/edit`"
      class="plusBtn"
    >
      <v-icon> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({ deleteId: '', deleting: '' }),
  computed: { ...mapState('post-ma', ['posts']) },
  async mounted() {
    await this.$store.dispatch('post-ma/getPosts')
  },
  methods: {
    deletePost(id) {
      console.log(id === this.deleteId)
      if (id === this.deleteId) {
        this.deleting = id
        this.$store.dispatch('post-ma/deletePost', id)
      } else {
        this.deleteId = id
      }
    },
  },
}
</script>
<style scoped>
.plusBtn {
  bottom: 80px;
}
</style>