export const state = () => ({ userData: {}, posts: [], docIn: null })

export const mutations = {
  setUserData(state, userData) {
    state.userData = userData
  },
  joinPosts(state, posts) {
    state.posts = [...state.posts, ...posts]
  },
  setDocIndex(state, doc) {
    state.docIn = doc
  },
}

export const actions = {
  async getUserData({ commit, state }, id) {
    try {
      const res = await this.$fire.firestore.collection('users').doc(id).get()

      const {
        uid,
        photoURL,
        email,
        displayName,
        uploadedPhotoPath,
        prof,
        name,
      } = res.data()

      commit('setUserData', {
        uid,
        photoURL,
        email,
        displayName,
        uploadedPhotoPath,
        prof,
        name,
      })
    } catch (err) {
      console.error(err)
    }
  },
}
