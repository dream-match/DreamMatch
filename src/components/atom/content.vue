<script>
import { Parser } from '~/plugins/parser'
export default {
  props: { doc: { type: Object, required: true } },

  render(h) {
    const parsed = new Parser(this.doc).get()
    return h(
      'article',
      { class: 'content-root' },
      parsed.map((i) => h(i.tag, i.p, i.v))
    )
  },
}
</script>
<style  lang="scss" scoped>
.content-root {
  h2 {
    @apply text-4xl p-0 m-0;
  }
  pre {
    border-radius: 5px;
    padding: 3px;
    background: #222;
    color: white;
  }
}
</style>