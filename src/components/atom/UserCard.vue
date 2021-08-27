<template>
  <v-list-item>
    <nuxt-link :to="`/users/${userData.uid}`">
      <v-list-item-avatar color="blue-grey lighten-3" size="48" class="mr-6">
        <f-img :path="userData.uploadedPhotoPath || userData.photoURL" />
      </v-list-item-avatar>
    </nuxt-link>
    <v-list-item-content>
      <v-list-item-title>
        {{ userData.name || userData.displayName }}
        <span class="mt-1">
          <v-chip v-if="isisFollower" x-small>フォロワー</v-chip>
          <v-chip v-for="skill in skills" :key="skill" x-small class="mx-1"
            >{{ skill }}
          </v-chip>
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>{{ userData.prof }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn v-if="isFollowing" outlined @click="unFollow(userData.uid)">
        フォロー中
      </v-btn>
      <v-btn v-else dark @click="follow(userData.uid)">フォロー</v-btn>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: { userData: { type: Object, required: true } },
  data: () => ({ isisFollower: false, isFollowing: false }),
  computed: {
    skills() {
      return [...Object.keys(this.userData.skills)]
    },
  },
  async mounted() {
    this.isFollowing = await this.isFollow(this.userData.uid)
    this.isisFollower = await this.isFollower(this.userData.uid)
  },

  methods: {
    ...mapActions('user', ['isFollow', 'isFollower']),
    async follow(uid) {
      await this.$store.dispatch('user/follow', uid)
      this.isFollowing = true
    },
    async unFollow(uid) {
      await this.$store.dispatch('user/unFollow', uid)
      this.isFollowing = false
    },
  },
}
</script>