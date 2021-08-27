<template>
  <v-card class="mx-auto" max-width="900" flat>
    <f-img :path="post.titleImgPath" max-height="280" class="relative">
      <div :class="[post.titleImgPath ? ' inline-block ' : '']">
        <v-card-title
          class="bg-gray-800 text-white pa-2"
          :class="[post.titleImgPath ? 'rounded-br-lg' : '']"
        >
          <nuxt-link :to="`/users/${post.user.uid}`">
            <v-avatar class="mr-2" size="36">
              <f-img :path="post.user.uploadedPhotoPath" />
            </v-avatar>
          </nuxt-link>

          {{ post.user.displayName }}
          <span class="font-weight-regular text-body-1 ml-2">{{
            uploadedAt
          }}</span>
        </v-card-title>
      </div>
      <div
        class="bottom-0 left-0 bg-gray-800 text-white"
        :class="[
          post.titleImgPath
            ? subtitle.length > 80
              ? 'max-w-xs sm:max-w-sm'
              : 'max-w-xs '
            : '',
          post.titleImgPath ? 'absolute rounded-tr-lg inline-block' : '',
        ]"
      >
        <v-list-item>
          <nuxt-link :to="`/posts/${post.id}`" class="white--text">
            <v-card-title>{{ post.title }} </v-card-title>
            <v-card-subtitle class="text-caption max-w-md">
              <v-chip v-for="tag in tags" :key="tag" x-small class="mr-1">
                {{ tag }}
              </v-chip>
              {{ subtitle }}
            </v-card-subtitle>
          </nuxt-link>
          <v-spacer />
          <v-list-item-action
            v-if="$vuetify.breakpoint.xs"
            class="bg-gray-800 p-2"
          >
            <v-btn icon :href="getTweetPath">
              <v-icon color="white"> mdi-twitter </v-icon>
            </v-btn>
            <v-btn
              v-if="content.blocks.length && !isStartOpen"
              icon
              @click="maContent"
            >
              <v-icon color="white">
                {{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </div>

      <v-card-actions
        v-if="!$vuetify.breakpoint.xs"
        class="absolute bottom-0 right-0 bg-gray-800 rounded-tl-lg"
      >
        <v-btn icon :href="getTweetPath">
          <v-icon color="white"> mdi-twitter </v-icon>
        </v-btn>
        <v-btn
          v-if="content.blocks.length && !isStartOpen"
          icon
          @click="maContent"
        >
          <v-icon color="white">
            {{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </f-img>
    <v-expand-transition>
      <article v-if="isOpen || isStartOpen">
        <Content :doc="content" />
      </article>
    </v-expand-transition>
  </v-card>
</template>
<script>
import fImg from './f-img.vue'
export default {
  components: { fImg },
  props: {
    post: { type: Object, required: true },
    isStartOpen: { type: Boolean, default: false },
  },
  data: () => ({ isOpen: false }),

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
      return `https://twitter.com/intent/tweet?url=${
        location.origin + this.$route.path
      }&hashtags=DreamMatch`
    },
    tags() {
      return [...Object.keys(this.post.tags)]
    },
  },
  methods: {
    maContent() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>