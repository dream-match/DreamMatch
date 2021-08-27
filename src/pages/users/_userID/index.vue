<template>
  <div>
    <client-only>
      <UserProfile
        :user-data="userData"
        :f-cnt="fCnt"
        :is-follow="isFollow"
        :uid="$route.params.userID"
        @follow="follow"
        @un-follow="unFollow"
      /><v-divider />
    </client-only>
    <v-container class="mx-auto">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        class="mx-6 my-3"
      />
    </v-container>
    <v-btn v-if="isNext" @click="loadNextPosts">もっと読み込む</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware({ redirect, params }) {
    if (!params.userID) {
      return redirect('/')
    }
  },
  data: () => ({ fCnt: {}, isFollow: false, page: 2 }),
  computed: {
    isNext() {
      return this.posts.length > (this.page - 1) * 50
    },
    ...mapState('user', ['userData', 'posts']),
  },
  async mounted() {
    const loadMain = async () => {
      await this.$store.dispatch('user/getUserData', this.$route.params.userID)
      this.$store.commit(
        'setBarText',
        this.userData.name || this.userData.displayName
      )
    }
    const laodFcnt = async () => {
      this.fCnt = await this.$store.dispatch(
        'user/getFCnt',
        this.$route.params.userID
      )
    }
    const loadIsFollow = async () => {
      this.isFollow = await this.$store.dispatch(
        'user/isFollow',
        this.$route.params.userID
      )
    }

    this.$store.dispatch('user/getFirstPosts', this.$route.params.userID)
    await Promise.all([loadMain(), laodFcnt(), loadIsFollow()])
  },
  methods: {
    async follow() {
      console.log('follow')
      await this.$store.dispatch('user/follow', this.$route.params.userID)
      this.isFollow = true
    },
    async unFollow() {
      console.log('unfollow')
      await this.$store.dispatch('user/unFollow', this.$route.params.userID)
      this.isFollow = false
    },
    async loadNextPosts() {
      await this.$store.dispatch('user/getPosts', {
        uid: this.$route.params.userID,
        page: this.page,
      })
      this.page++
    },
  },
}
</script>
