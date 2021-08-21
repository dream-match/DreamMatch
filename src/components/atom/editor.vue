<template>
  <div id="editorjs"></div>
</template>

<script>
export default {
  data: () => ({ editor: null }),
  async mounted() {
    const _editor = await this.$editor('editorjs')
    await console.log(_editor)
  },
}
</script>