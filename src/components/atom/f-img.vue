<template>
  <client-only>
    <v-img
      :src="src"
      :lazy-src="lazySrc"
      :height="height"
      :max-height="maxHeight"
      :min-height="minHeight"
      :contain="contain"
      :width="width"
      :max-width="maxWidth"
    >
      <slot />
    </v-img>
  </client-only>
</template>
<script>
export default {
  props: {
    path: { type: String, default: '' },
    height: { type: String, default: null },
    maxHeight: { type: String, default: null },
    minHeight: { type: String, default: null },
    width: { type: String, default: null },
    contain: { type: Boolean, default: false },
    maxWidth: { type: String, default: '' },
  },
  data: () => ({ src: '', lazySrc: '' }),
  computed: {
    pathList() {
      return this.path.split('/')
    },
  },
  watch: {
    path: {
      immediate: true,
      async handler(v) {
        try {
          if (!v) return

          const isURL = /http/g

          if (!isURL.test(v)) {
            const imageUrlCache = localStorage.getItem(v)
            if (imageUrlCache) {
              const { src, lazySrc } = JSON.parse(imageUrlCache)
              this.src = src
              this.lazySrc = lazySrc
            } else {
              try {
                await this.getResizedUrl(v)
              } catch (e) {
                await this.getSrcUrl()
              }
              // console.log(this.src, this.lazySrc)
            }
          } else {
            this.src = v
          }
        } catch (e) {
          console.log(e)
        }
      },
    },
  },

  methods: {
    async getResizedUrl(v) {
      const pathAry = v.split('/')
      const name = pathAry.pop()
      const root = pathAry.join('/')

      const getSrc = async () => {
        const nameAry = name.split('.')
        nameAry.pop()
        const resizedPath = `${root}/${nameAry.join('.') + '_1280x720.webp'}`
        this.src = await this.$fire.storage.ref(resizedPath).getDownloadURL()
      }
      const getLazySrc = async () => {
        const nameAry = name.split('.')
        nameAry.pop()
        const resizedPath = `${root}/${nameAry.join('.') + '_320x240.webp'}`
        this.lazySrc = await this.$fire.storage
          .ref(resizedPath)
          .getDownloadURL()
      }

      await Promise.all([getSrc(), getLazySrc()])
      const imageUrl = { src: this.src, lazySrc: this.lazySrc }
      localStorage.setItem(v, JSON.stringify(imageUrl))
    },
    async getSrcUrl() {
      const ref = this.$fire.storage.ref(this.path)
      this.src = await ref.getDownloadURL()
    },
  },
}
</script>
