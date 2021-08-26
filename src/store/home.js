export const state = () => ({ posts: [], following: [] })

export const mutations = {
  setPosts(state, v) {
    state.posts = v
  },
  joinPosts(state, v) {
    state.posts = [...state.posts, ...v]
  },
  joinfollowing(state, v) {
    state.following = [...state.following, ...v]
  },
}

export const actions = {
  getFollowing({ commit, rootState }) {
    this.$fire.firestore
      .collection('users')
      .doc(rootState.userData.uid)
      .collection('following')
      .onSnapshot((querySnapshot) => {
        querySnapshot
          .docChanges()
          .filter((c) => c.type === 'added')
          .map((c) => c.doc.data().uid)
      })
  },
}
