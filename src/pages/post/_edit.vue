<template><div id="editorjs" /></template>
<script>
export default {
  data: () => ({ editor: null }),
  mounted() {
    this.editor = new this.$editor('editorjs')
  },
}
</script>