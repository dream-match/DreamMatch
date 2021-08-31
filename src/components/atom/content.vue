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
  background-color: #1f2937;
  @apply p-2;
  h1 {
    font-weight: bold;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid;
  }

  h2 {
    font-weight: bold;
    margin-bottom: 1rem;
    font-size: 2.125rem;
  }

  h3 {
    font-weight: bold;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  h4 {
    font-weight: bold;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  pre {
    border-radius: 5px;
    padding: 3px;
    background: #1f1f1f;
    color: white;
    overflow-x: scroll;
  }
}
</style>