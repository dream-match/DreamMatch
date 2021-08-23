<template>
  <div>
    <v-card :tile="isSmallWin" :flat="isSmallWin">
      <v-card-actions>
        <v-spacer />
        <v-btn large color="primary" class="font-weight-black"> 投稿</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-text-field
          v-model="input.title"
          label="Title"
          placeholder="歌ってみた"
          outlined
          prepend-icon="mdi-subtitles"
        />
        <v-file-input
          outlined
          accept="image/*"
          label="タイトル画像"
          @change="setFile"
        />
        <v-combobox
          v-model="input.tags"
          :items="list"
          :hide-no-data="!search"
          :search-input.sync="search"
          chips
          outlined
          clearable
          label="タグ"
          multiple
          hint="あなたの得意なことを書こう"
          prepend-icon="mdi-tag"
        >
          <template #no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  リストにTag:"
                  <strong>{{ search }}</strong>
                  "が見つかりませんでした
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
        <v-textarea
          v-model="input.description"
          outlined
          name="input-7-4"
          label="概要"
          placeholder="Georgeの冒険を歌ってみた"
          prepend-icon="mdi-image-text"
        />
        <v-card outlined>
          <v-tabs v-model="tab">
            <v-tab>Write</v-tab>
            <v-tab>Preview</v-tab>
          </v-tabs>
          <v-card-text class="black--text">
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <Editor @saved="setSavedata" />
              </v-tab-item>
              <v-tab-item>
                <Content :doc="input.save" />
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    input: { title: '', file: null, tags: [], description: '', save: {} },
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
    isSaving: false,
    isUploading: false,
    tab: null,
  }),

  computed: {
    isSmallWin() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
  },
  async mounted() {},
  methods: {
    removeTag(name) {
      this.input.tags.splice(this.input.tags.indexOf(name), 1)
      this.input.tags = [...this.input.tsgs]
    },
    setSavedata(v) {
      this.isSaving = true
      this.input.save = v
      this.isupported = false
    },
    setFile(f) {
      this.input.file = f
    },
    save() {
      this.isUploading = true
      this.isSaving = true
    },
    upload() {
      this.isUploading = true
    },
  },
}
</script>
