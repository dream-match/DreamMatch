<template>
  <div>
    <client-only>
      <UserProfile
        :user-data="userData"
        :f-cnt="fCnt"
        :is-follow="isFollow"
        @follow="follow"
        @un-follow="unFollow"
      /><v-divider />
    </client-only>
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
  data: () => ({ fCnt: {}, isFollow: false }),
  computed: { ...mapState('user', ['userData']) },
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
  },
}
</script>
