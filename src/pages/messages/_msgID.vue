<template>
  <v-card flat>
    <div class="line__container mx-4">
      <UserMessage v-for="msg in messages" :key="msg.id" :message="msg" />
    </div>
    <div id="end"></div>
    <v-footer app inset>
      <div class="px-4 pt-4 mb-2 sm:mb-0 w-full">
        <div class="relative flex">
          <textarea
            v-model="input"
            type="text"
            placeholder="Write Something"
            class="
              w-full
              focus:outline-none
              focus:placeholder-gray-400
              text-gray-600
              placeholder-gray-600
              pl-12
              bg-gray-200
              rounded-full
              py-3
            "
          />
          <div class="absolute right-0 items-center inset-y-0 flex">
            <input
              ref="input"
              type="file"
              class="hidden"
              accept="image/*"
              @change="setFile"
            />
            <v-btn icon color="black" type="file" @click="clickFile">
              <v-icon>mdi-camera</v-icon>
            </v-btn>

            <button
              type="button"
              class="
                inline-flex
                items-center
                justify-center
                rounded-full
                h-12
                w-12
                transition
                duration-500
                ease-in-out
                text-white
                bg-blue-500
                hover:bg-blue-400
                focus:outline-none
              "
              @click="send"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-6 w-6 transform rotate-90"
              >
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </v-footer>
  </v-card>
</template>
<script>
export default {
  data: () => ({ input: '', sending: false, file: null, messages: [] }),

  async mounted() {
    const { name } = this.$store.state.message.chats.find(
      (chat) => chat.id === this.$route.params.msgID
    )
    this.$store.commit('setBarText', name)
    await this.$bind(
      'messages',
      this.$fire.firestore
        .collection('chats')
        .doc(this.$route.params.msgID)
        .collection('messages')
        .orderBy('createdAt')
    )
    this.$vuetify.goTo('#end')
  },

  methods: {
    clickFile() {
      this.$refs.input.click()
    },
    setFile(v) {
      const file = this.$refs.input.files[0]

      this.file = file
    },
    async send() {
      try {
        if (this.sending || this.input.trim().length === 0) return
        this.sending = true
        if (this.file) {
          const storageRef = this.$fire.storage.ref(
            `images/posts/${this.$store.state.userData.uid}`
          )
          await storageRef.child(this.file.name).put(this.file)
        }
        await this.$store.dispatch('message/sendMessage', {
          message: this.input.trim(),
          image: this.file
            ? `images/posts/${this.$store.state.userData.uid}/${this.file.name}`
            : '',
          id: this.$route.params.msgID,
        })
        this.input = ''
        this.sending = false
      } catch (e) {}
    },
  },
}
</script>