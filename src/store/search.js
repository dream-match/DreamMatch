export const actions = {
  async searchUsers({ commit }, { searchQuery, tags, isS = true }) {
    const ref = this.$fire.firestore.collection('users')
    const queryTag = tags.reduce(
      (b, v) =>
        b.where(
          new this.$fireModule.firestore.FieldPath('skills', v),
          '==',
          true
        ),
      ref
    )

    const queryString =
      searchQuery.length === 0
        ? ref
        : ref
            .orderBy('name')
            .startAt(searchQuery)
            .endAt(searchQuery + '\uF8FF')
    const query = !(searchQuery.length === 0) && isS ? queryString : queryTag
    const res = await query.limit(50).get()
    const result = res.docs.map((doc) => doc.data())
    return result
  },

  async searchPosts({ commit }, { searchQuery, tags, isS = true }) {
    const ref = this.$fire.firestore.collection('posts')
    const queryTag = tags.reduce(
      (b, v) =>
        b.where(
          new this.$fireModule.firestore.FieldPath('tags', v),
          '==',
          true
        ),
      ref
    )

    const queryString =
      searchQuery.length === 0
        ? ref
        : ref
            .orderBy('title')
            .startAt(searchQuery)
            .endAt(searchQuery + '\uF8FF')
    const query = !(searchQuery.length === 0) && isS ? queryString : queryTag
    const res = await query.limit(50).get()
    const result = res.docs.map((doc) => {
      const { createdAt } = doc.data()
      return { ...doc.data(), createdAt: createdAt.toDate() }
    })
    return result
  },
}
