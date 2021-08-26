<template>
  <v-card max-width="700" height="800">
    <v-tabs v-model="tab">
      <v-tab>フォロー中</v-tab>
      <v-tab>フォロワー</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <UserCard
          v-for="data in followimg"
          :key="data.uid + `wer`"
          :user-data="data"
        />
      </v-tab-item>
      <v-tab-item>
        <UserCard
          v-for="data in follower"
          :key="data.uid + `ing`"
          :user-data="data"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  props: {
    uid: { type: String, required: true },
  },
  data: () => ({ tab: null, followimg: [], follower: [] }),
  async mounted() {
    const { following, follower } = await this.$store.dispatch(
      'user/getFollowList',
      this.uid
    )

    this.followimg = following || []
    this.follower = follower || []
  },
}
</script>