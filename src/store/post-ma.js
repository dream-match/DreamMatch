const formatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
export const state = () => ({ posts: [] })

export const mutations = {
  setPosts(state, v) {
    state.posts = v
  },
}

export const actions = {
  getPosts({ commit, rootState }) {
    try {
      this.$fire.firestore
        .collection('posts')
        .where('uid', '==', rootState.userData.uid)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .onSnapshot((res) => {
          if (res) {
            const posts = res.docs.map((d) => {
              const { id } = d
              const { createdAt, description, title, titleImgPath } = d.data()
              return {
                id,
                createdAt: createdAt
                  .toDate()
                  .toLocaleDateString('ja-JP', formatOptions),
                description,
                title,
                titleImgPath,
              }
            })
            commit('setPosts', posts)
          }
        })
    } catch (e) {
      console.error(e)
    }
  },
  async deletePost({ commit }, id) {
    try {
      await this.$fire.firestore.collection('posts').doc(id).delete()
    } catch (e) {
      console.error(e)
    }
  },
}
