export const state = () => ({
  saveData: {},
  uploading: false,
  id: null,
  errCode: '',
})

export const mutations = {
  mergeSave: (state, v) => (state.saveData = { ...state.saveData, ...v }),
  reset(state) {
    state.storeRef = null
    state.saveData = {}
    state.uploading = false
    state.errCode = ''
    state.id = null
  },
  setId(state, id) {
    state.id = id
  },
  setErrCode(state, code) {
    state.errCode = code
  },
}

export const actions = {
  async prepare({ commit }, id) {
    commit('reset')
    try {
      const saveData = await (async () => {
        if (id) {
          const res = await this.$fire.firestore
            .collection('posts')
            .doc(id)
            .get()
          const { title, tags, description, save } = res.data()
          return { title, tags, description, save }
        } else {
          return {
            createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
            updateAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
          }
        }
      })()
      commit('setId', id)
      commit('mergeSave', saveData)
    } catch (e) {
      console.error(e)
      commit('setErrCode', e.code)
    }
  },
  async upload({ commit, state, rootState }, saveData) {
    const { title, tags, description, save, file } = saveData
    if (file) {
      const storageRef = this.$fire.storage.ref(
        `images/posts/${rootState.userData.uid}`
      )
      await storageRef.child(file.name).put(file)
    }

    commit('mergeSave', {
      title,
      tags,
      description,
      save,
      titleImgPath: file
        ? `images/posts/${rootState.userData.uid}/${file.name}`
        : '',
      uid: rootState.userData.uid,
      user: rootState.userData,
    })
    try {
      if (state.id) {
        await this.$fire.firestore
          .collection('posts')
          .doc(state.id)
          .set(state.saveData, { merge: true })
      } else {
        const docRef = await this.$fire.firestore
          .collection('posts')
          .add(state.saveData)
        commit('setId', docRef.id)
        this.$router.push({ query: { id: docRef.id } })
      }
    } catch (e) {
      console.error(e)
      commit('setErrCode', e.code)
    }
  },
}
