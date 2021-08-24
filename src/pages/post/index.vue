<template>
  <div>
    <v-card v-for="post in posts" :key="post.id">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-1">{{ post.createdAt }}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ post.title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn text fab small :to="`/post/edit?id=${post.id}`">
            <v-icon> mdi-pencil-outline </v-icon>
          </v-btn>
          <v-btn text fab small> <v-icon> mdi-delete </v-icon></v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: { ...mapState('post-ma', ['posts']) },
  async mounted() {
    await this.$store.dispatch('post-ma/getPosts')
  },
}
</script>