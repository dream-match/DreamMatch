<template><div id="editorjs" /></template>
<script>
export default {
  data: () => ({ editor: null }),
  mounted() {
    console.log(this.$editor)
    this.editor = new this.$editor('editorjs')
  },
}
</script>