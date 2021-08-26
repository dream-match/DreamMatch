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
  > * {
    margin: 1rem;
  }
  h1 {
    font-size: 3.5rem;
    border-bottom: 6px double #000;
  }
  h2 {
    font-size: 3rem;
    border-bottom: 3px solid #000;
  }
  h3 {
    font-size: 2.125rem;
    border-bottom: 3px dotted #000;
  }
  h4,
  h5,
  h6 {
    font-size: 1.5rem;
    border-bottom: 1px solid #222;
  }
  pre {
    border-radius: 5px;
    padding: 3px;
    background: #222;
    color: white;
  }
}
</style>