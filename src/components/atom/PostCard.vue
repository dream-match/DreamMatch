<template>
  <v-card
    class="mx-auto"
    max-width="900"
    flat
    @click="push(`/posts/${post.id}`)"
  >
    <div class="z-30">
      <v-card-title class="bg-gray-800 text-white pa-2">
        <div @click.stop="push(`/users/${post.user.uid}`)">
          <v-avatar class="mr-2" size="36" color="blue-grey lighten-3">
            <f-img :path="post.user.uploadedPhotoPath || post.user.photoURL" />
          </v-avatar>
        </div>

        {{ post.user.displayName }}
        <span class="font-weight-regular text-body-1 ml-2">
          {{ uploadedAt }}
        </span>
      </v-card-title>
    </div>
    <div class="left-0 bg-gray-800 text-white z-30">
      <v-list-item>
        <div class="white--text" @click.stop="push(`/posts/${post.id}`)">
          <v-card-title>{{ post.title }} </v-card-title>
          <v-card-subtitle class="text-caption max-w-md">
            <v-chip v-for="tag in tags" :key="tag" x-small class="mr-1">
              {{ tag }}
            </v-chip>
            {{ subtitle }}
          </v-card-subtitle>
        </div>
      </v-list-item>
    </div>

    <f-img
      :path="post.titleImgPath"
      :to="`/posts/${post.id}`"
      :height="post.titleImgPath ? `280` : ``"
      class="relative"
    >
    </f-img>
    <v-card-actions
      class="static sm:absolute bottom-0 right-0 bg-gray-800 rounded-tl-lg z-30"
    >
      <v-btn icon :href="getTweetPath">
        <v-icon color="white"> mdi-twitter </v-icon>
      </v-btn>
      <v-btn
        v-if="content.blocks.length && !isStartOpen"
        icon
        @click.stop="maContent"
      >
        <v-icon color="white">
          {{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <article v-if="isOpen || isStartOpen">
        <Content class="px-4" :doc="content" />
      </article>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  props: {
    post: { type: Object, required: true },
    isStartOpen: { type: Boolean, default: false },
  },
  data: () => ({ isOpen: false, clickRoot: false }),

  computed: {
    isSmallWin() {
      return this.$vuetify.breakpoint.xs
    },
    content() {
      return JSON.parse(this.post.save)
    },
    subtitle() {
      const text = this.post.description.slice(0, 140)
      return text.length === 140 ? text + '...' : text
    },
    uploadedAt() {
      const now = new Date()
      const u = this.post.createdAt
      const diff = (now.getTime() - u.getTime()) / 1000
      const diffMin = diff / 60
      const diffHour = diffMin / 600
      const difdDay = diffHour / 24

      if (Math.floor(difdDay)) {
        return u.getMonth() + '/' + u.getDate()
      } else {
        return u.getHours() + ':' + u.getMinutes()
      }
    },
    getTweetPath() {
      return `https://twitter.com/intent/tweet?url=${location.origin}/posts/${this.post.id}&hashtags=DreamMatch`
    },
    tags() {
      return [...Object.keys(this.post.tags)]
    },
  },
  methods: {
    maContent() {
      this.isOpen = !this.isOpen
    },
    push(to) {
      this.$router.push(to)
    },
  },
}
</script>