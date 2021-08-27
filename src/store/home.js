const sliceByNumber = (array, number) => {
  const length = Math.ceil(array.length / number)
  return new Array(length)
    .fill()
    .map((_, i) => array.slice(i * number, (i + 1) * number))
}

export const state = () => ({ posts: [], following: [], dispatched: false })

export const mutations = {
  setDispatch(state, v) {
    state.dispatched = v
  },
  joinPosts(state, v) {
    state.posts = [...v, ...state.posts]
  },
  joinfollowing(state, v) {
    state.following = [...state.following, ...v]
  },
}

export const actions = {
  getFollowing({ dispatch, rootState, state, commit }) {
    if (state.dispatched) return
    commit('setDispatch', true)
    this.$fire.firestore
      .collection('users')
      .doc(rootState.userData.uid)
      .collection('following')
      .onSnapshot((querySnapshot) => {
        const uids = querySnapshot
          .docChanges()
          .filter((c) => c.type === 'added')
          .map((c) => c.doc.data().uid)
        dispatch('getTimeLine', uids)
      })
  },
  getTimeLine({ commit }, uids) {
    const sliced = sliceByNumber(uids, 10)
    sliced.forEach((sUids) => {
      this.$fire.firestore
        .collection('posts')
        .where('uid', 'in', sUids)
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const addPosts = querySnapshot
            .docChanges()
            .filter((c) => c.type === 'added')
            .map((c) => {
              const {
                createdAt,
                description,
                title,
                titleImgPath,
                user,
                tags,
                save,
              } = c.doc.data()
              return {
                createdAt: createdAt.toDate(),
                description,
                title,
                titleImgPath,
                user,
                tags,
                save,
                id: c.doc.id,
              }
            })
          commit('joinPosts', addPosts)
        })
    })
  },
}
