<template>
  <v-card flat>
    <v-card-text class="pb-0 mb-0">
      <v-tabs v-model="searchTab">
        <v-tab>テキスト検索</v-tab>
        <v-tab>タグ、スキル検索</v-tab>
      </v-tabs>
      <v-tabs-items v-model="searchTab" class="pt-2">
        <v-tab-item>
          <v-text-field
            v-model="searchQuery"
            label="Search"
            prepend-icon="mdi-magnify"
            outlined
          />
        </v-tab-item>
        <v-tab-item
          ><v-combobox
            v-model="tags"
            :hide-no-data="!search"
            outlined
            clearable
            label="Tags"
            multiple
            prepend-icon="mdi-tag-multiple"
          >
            <template #selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeTag(item)"
              >
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-tabs v-model="tab">
      <v-tab>ユーザー</v-tab>
      <v-tab>投稿</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <UserCard v-for="user in users" :key="user.id" :user-data="user" />
      </v-tab-item>
      <v-tab-item>
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="mx-6 my-3"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    tab: null,
    onlyFollowing: false,
    searchQuery: '',
    tags: [],
    users: [],
    posts: [],
    searchTab: null,
  }),
  watch: {
    tab() {
      this.search()
    },
    onlyFollowing() {
      this.search()
    },
    tags() {
      this.search()
    },
    searchQuery() {
      this.search()
    },
    searchTab() {
      this.search()
    },
  },
  methods: {
    async search() {
      if (this.tab === 0) {
        this.users = await this.$store.dispatch('search/searchUsers', {
          searchQuery: this.searchQuery,
          tags: this.tags,
          isS: this.searchTab === 0,
        })
      } else {
        console.log('search')
        this.posts = await this.$store.dispatch('search/searchPosts', {
          searchQuery: this.searchQuery,
          tags: this.tags,
          isS: this.searchTab === 0,
        })
      }
    },

    removeTag(name) {
      this.tags.splice(this.tags.indexOf(name), 1)
      this.tags = [...this.tags]
    },
  },
}
</script>