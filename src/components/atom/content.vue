<script>
import { Parser } from '~/plugins/parser'
export default {
  props: { doc: { type: Object, required: true } },

  render(h) {
    const parsed = new Parser(this.doc).get()
    return h(
      'div',
      parsed.map((i) => h(i.tag, i.p, i.v))
    )
  },
}
</script>