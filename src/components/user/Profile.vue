<template>
  <v-card class="mx-auto" tile flat>
    <div>
      <f-img :path="userData.headerImg" height="200px" class="bg-gray-200" />
      <div class="p-4">
        <div class="relative flex w-full">
          <div class="flex flex-1">
            <div style="margin-top: -6rem">
              <v-avatar size="140">
                <f-img
                  class="md rounded-full relative border-2 border-white"
                  :path="userData.uploadedPhotoPath || userData.photoURL"
                />
              </v-avatar>
            </div>
          </div>

          <div class="flex flex-col text-right">
            <div v-if="isMine">
              <v-btn outlined>プロフィール編集</v-btn>
            </div>
            <div v-else>
              <v-btn v-if="isFollow" outlined @click="unFollow">
                フォロー中
              </v-btn>
              <v-btn v-else dark @click="follow">フォロー</v-btn>
            </div>
          </div>
        </div>

        <div class="space-y-1 justify-center w-full mt-3 ml-3">
          <div>
            <h2 class="text-xl leading-6 font-bold">
              {{ userData.name }}
              <v-chip v-if="isFollow" small class="font-weight-medium ml-2">
                フォローされています
              </v-chip>
            </h2>
            <p class="text-sm leading-5 font-medium text-gray-600">
              @{{ userData.uid }}
            </p>
          </div>

          <pre class="mt-3 leading-tight mb-2 items-start">{{
            userData.prof
          }}</pre>

          <div class="mt-1">
            <v-chip
              v-for="skill in userData.skills"
              :key="skill"
              small
              class="mr-1"
              >{{ skill }}</v-chip
            >
          </div>
          <div
            class="
              pt-3
              flex
              justify-start
              items-start
              w-full
              divide-x divide-gray-800 divide-solid
            "
          >
            <v-dialog v-model="dialog" width="700">
              <template #activator="{ on, attrs }">
                <div class="text-center pr-3" v-bind="attrs" v-on="on">
                  <span class="font-bold">{{ fCnt.followingCnt }}</span
                  ><span class="text-gray-600"> Following</span>
                </div>
                <div class="text-center px-3" v-bind="attrs" v-on="on">
                  <span class="font-bolde">{{ fCnt.followerCnt }} </span
                  ><span class="text-gray-600"> Followers</span>
                </div>
              </template>
              <UserFollowInfo :uid="uid" />
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    userData: { type: Object, required: true },
    fCnt: { type: Object, required: true },
    isFollow: { type: Boolean, default: false },
    uid: { type: String, required: true },
  },
  data: () => ({ dialog: false, isFollower: false }),

  computed: {
    isMine() {
      return this.$store.state.userData.uid === this.$route.params.userID
    },
  },
  async mounted() {
    this.isFollower = await this.$store.dispatch('user/isFollower', this.uid)
  },
  methods: {
    follow() {
      this.$emit('follow')
    },
    unFollow() {
      this.$emit('un-follow')
    },
  },
}
</script>
