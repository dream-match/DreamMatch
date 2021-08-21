<template>
  <v-img :src="src" :lazy-src="lazySrc" color="gray" />
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
        await this.getResizedUrl(v)

        !this.src && (await this.getSrcUrl())
      } else {
        this.src = v
      }
    },
  },

  methods: {
    async getResizedUrl(v) {
      const pathAry = v.split('/')
      const name = pathAry.pop()
      const root = pathAry.join('/')

      const getSrc = async () => {
        const nameAry = name.split('.')
        nameAry[0] += '_1280x720'
        const resizedPath = `${root}/${nameAry.join('.')}`
        this.src = await this.$fire.storage.ref(resizedPath).getDownloadURL()
      }
      const getLazySrc = async () => {
        const nameAry = name.split('.')
        nameAry[0] += '_320x240'
        const resizedPath = `${root}/${nameAry.join('.')}`
        this.lazySrc = await this.$fire.storage
          .ref(resizedPath)
          .getDownloadURL()
      }

      await Promise.all([getSrc(), getLazySrc()])
    },
    async getSrcUrl() {
      const ref = this.$fire.storage.ref(this.path)
      this.src = await ref.getDownloadURL()
    },
  },
}
</script>