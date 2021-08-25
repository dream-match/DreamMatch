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
        skills,
        name,
      } = res.data()

      commit('setUserData', {
        uid,
        photoURL,
        email,
        displayName,
        skills,
        uploadedPhotoPath,
        prof,
        name,
      })
    } catch (err) {
      console.error(err)
    }
  },
  async follow({ rootState }, id) {
    try {
      const usersRef = this.$fire.firestore.collection('users')
      const res = await usersRef.doc(id).get()
      if (res) {
        const { name, prof, skills, photoURL, uploadedPhotoPath, uid } =
          res.data()
        await usersRef
          .doc(id)
          .collection('follower')
          .doc(rootState.userData.uid)
          .set(rootState.userData)
        await usersRef
          .doc(rootState.userData.uid)
          .collection('following')
          .doc(id)
          .set({ name, prof, skills, photoURL, uploadedPhotoPath, uid })
      }
    } catch (err) {
      console.error(err)
    }
  },
  async unFollow({ rootState }, id) {
    const usersRef = this.$fire.firestore.collection('users')
    await usersRef
      .doc(id)
      .collection('follower')
      .doc(rootState.userData.uid)
      .delete()
    await usersRef
      .doc(rootState.userData.uid)
      .collection('following')
      .doc(id)
      .delete()
  },
  async getFCnt({ commit }, id) {
    const res = await fetch(
      `https://asia-northeast1-snstest-9f2b5.cloudfunctions.net/exports-getFcnt?uid=${id}`
    )
    return await res.json()
  },
  async isFollow({ rootState }, id) {
    const follow = await this.$fire.firestore
      .collection('users')
      .doc(rootState.userData.uid)
      .collection('following')
      .where('uid', '==', id)
      .get()

    return !follow.empty
  },
}
