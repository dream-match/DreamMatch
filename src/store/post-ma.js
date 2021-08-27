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
              const { description, title, titleImgPath } = d.data()
              return {
                id,
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
    } catch (e) {}
  },
}
