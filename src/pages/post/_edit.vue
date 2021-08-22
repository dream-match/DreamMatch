<template>
  <div>
    <v-card :tile="isSmallWin" :flat="isSmallWin">
      <v-card-text>
        <v-text-field
          label="Title"
          placeholder="歌ってみた"
          outlined
        ></v-text-field>
        <v-combobox
          v-model="tags"
          :items="list"
          :hide-no-data="!search"
          :search-input.sync="search"
          chips
          clearable
          label="タグ"
          multiple
          hint="あなたの得意なことを書こう"
          prepend-icon="mdi-hammer-wrench"
        >
          <template #no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  リストにTag:"<strong>{{ search }}</strong
                  >"が見つかりませんでした
                  <kbd>enter</kbd> を押すと新たに追加できます。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template #selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click="select"
              @click:close="remove(item)"
            >
              <strong>{{ item }}</strong>
            </v-chip>
          </template>
        </v-combobox>
        <v-card outlined max-width="700" class="mx-auto">
          <v-card-text class="px-8">
            <Editor />
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    tags: [],
    list: [
      '歌ってみた',
      'Webサイト',
      'ボカロ',
      '動画',
      'プログラミング',
      'ゲーム',
      '記事',
    ],
    search: '',
  }),
  computed: {
    isSmallWin() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
  },
  methods: {
    removeTag(name) {
      this.tags.splice(this.tags.indexOf(name), 1)
      this.tags = [...this.tsgs]
    },
  },
}
</script>
