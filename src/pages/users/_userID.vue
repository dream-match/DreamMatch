<template>
  <div><UserProfile :user-data="userData" /><v-divider /></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware({ redirect, params }) {
    if (!params.userID) {
      return redirect('/')
    }
  },
  computed: { ...mapState('user', ['userData']) },
  async mounted() {
    await this.$store.dispatch('user/getUserData', this.$route.params.userID)
    this.$store.commit(
      'setBarText',
      this.userData.name || this.userData.displayName
    )
  },
}
</script>
