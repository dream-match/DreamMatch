<template>
  <div id="editorjs" @keydown="keyDown" />
</template>

<script>
export default {
  props: {
    isSave: { type: Boolean, default: false },
    loadData: { type: Object, default: null },
  },
  data: () => ({ editor: null, timer: 0, editorLoaded: false, forLoad: {} }),

  watch: {
    async timer(v) {
      if (v === 1000) {
        await this.save()
      }
    },
    async isSave(v) {
      if (v) {
        await this.save()
      }
    },
    loadData: {
      handler(v) {
        if (!Object.keys(v).length) {
          return
        }
        this.forLoad = v
        if (this.editor && this.editor.blocks) {
          for (const block of this.forLoad.blocks) {
            const { type, data } = block
            this.editor.blocks.insert(type, data)
          }
          this.forLoad = {}
        }
      },
    },
  },

  async mounted() {
    this.editor = await this.$editor('editorjs')
    await this.editor.isReady
    if (Object.keys(this.forLoad).length) {
      for (const block of this.forLoad.blocks) {
        const { type, data } = block
        this.editor.blocks.insert(type, data)
      }
      this.forLoad = {}
    }
    this.$emit('editor', this.editor)
    setInterval(() => {
      this.timer++
    }, 1)
  },

  // "https://firebasestorage.googleapis.com/v0/b/snstest-9f2b5.appspot.com/o/images%2Fposts%2Fbg6VID6IdRag18DTfyqG5fSzKs33%2FIMG_20210709_183957.jpg?alt=media&token=77630ed9-12bc-461c-9c7b-ba93afd63f3d"
  methods: {
    keyDown() {
      this.timer = 0
    },
    async save() {
      const saveData = await this.editor.save()
      this.$emit('saved', saveData)
    },
  },
}
</script>