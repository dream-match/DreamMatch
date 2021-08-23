export const state = () => ({
    storeRef: null,
    saveData: {},
    uploading: false,
    errCode: ""
})

export const mutations = {
    setSave: (state, v) => (state.saveData = v),
    reset(state) {
        state.storeRef = null;
        state.saveData = {}
        state.uploading = false
        state.errCode = ""
    },
    prepare(state, id) {
        state.storeRef = this.$fire.firestore.collection("posts").doc(id)
    },
    setErrCode(state, code) {
        state.errCode = code
    }
}

export const actions = {
    async prepare({ commit, }, id) {
        commit("prepare", id)
        try {
            const saveData = await this.$fire.firestore.get()
            commit("setSave", saveData)
        } catch (e) { commit("setErrCode", e) }
    }
}