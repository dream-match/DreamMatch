<template><div id="editorjs" /></template>
<script>
import { Editor } from '~/plugins/editor'
export default {
  data: () => ({ editor: null }),
  mounted() {
    this.editor = new Editor('editorjs')
  },
}
</script>