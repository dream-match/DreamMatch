<template>
  <div>
    <v-tabs v-show="$store.state.isLogin" v-model="tab">
      <v-tab>全体</v-tab>
      <v-tab>フォロー中のみ</v-tab>
    </v-tabs>
    <v-container>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <PostCard
            v-for="post in globalPosts"
            :key="post.id"
            :post="post"
            class="mx-6 my-3"
          />
        </v-tab-item>
        <v-tab-item>
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            class="mx-6 my-3"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({ tab: null }),
  computed: {
    ...mapState('home', ['posts', 'globalPosts']),
    ...mapState(['userData']),
  },
  mounted() {
    this.$store.dispatch('home/getFollowing')

    this.$store.dispatch('home/getGlobalPosts')
  },
}
</script>


