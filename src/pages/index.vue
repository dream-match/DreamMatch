<template>
  <v-container>
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="mx-6 my-3"
    />
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: { ...mapState('home', ['posts']) },
  mounted() {
    this.$store.dispatch('home/getFollowing')
  },
}
</script>


