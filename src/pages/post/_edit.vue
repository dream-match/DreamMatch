<template>
  <div>
    <v-card>
      <v-card-text>
        <v-text-field
          label="Title"
          placeholder="歌ってみた"
          outlined
        ></v-text-field>
        <v-combobox
          v-model="tags"
          :items="list"
          chips
          clearable
          label="スキル"
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
        <Editor
      /></v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({ tags: [], list: ['歌ってみた', 'Webサイト', 'ボカロ'] }),
  methods: {
    removeTag(name) {
      this.tags.splice(this.tags.indexOf(name), 1)
      this.tags = [...this.tsgs]
    },
  },
}
</script>
