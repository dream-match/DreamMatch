<template>
  <div
    v-if="!(message.user.uid === $store.state.userData.uid)"
    class="line__left"
  >
    <figure>
      <v-avatar>
        <f-img :path="message.user.uploadedPhotoPath" />
      </v-avatar>
    </figure>
    <div class="line__left-text">
      <div class="name">{{ message.user.name }}</div>
      <div
        class="text black--text"
        style="white-space: pre-wrap"
        v-text="text"
      ></div>
    </div>
    <div class="stamp ml-16">
      <v-card>
        <f-img :path="message.image" max-width="350" contain />
      </v-card>
    </div>
  </div>
  <div v-else class="line__right">
    <div
      class="text black--text"
      style="white-space: pre-wrap"
      v-text="text"
    ></div>
    <div class="stamp">
      <v-card>
        <f-img :path="message.image" max-width="350" contain />
      </v-card>
    </div>
  </div>
</template>
<script>
import fImg from '../atom/f-img.vue'
export default {
  components: { fImg },
  props: { message: { type: Object, required: true } },
  computed: {
    text() {
      return this.message.message
    },
  },
}
</script>
