<template>
  <v-img :src="src" color="gray" />
</template>
<script>
export default {
  props: { path: { type: String, default: '' } },
  data: () => ({ src: '', lazySrc: '' }),
  computed: {
    pathList() {
      return this.path.split('/')
    },
  },
  watch: {
    async path(v) {
      if (!v) return
      const isURL =
        /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
      if (!isURL.test(v)) {
        await this.getSrcUrl()
      } else {
        this.src = v
      }
    },
  },

  methods: {
    async getSrcUrl() {
      const ref = this.$fire.storage.ref(this.path)
      this.src = await ref.getDownloadURL()
    },
  },
}
</script>