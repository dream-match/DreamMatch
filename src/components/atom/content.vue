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
    font-size: 2.5rem;
    border-bottom: 2px solid;
    &::first-letter {
      font-size: 1.25em;
    }
  }

  h2 {
    font-size: 2.125rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
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