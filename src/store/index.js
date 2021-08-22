export const state = () => ({ openMainMenu: false, userData: { uid: "", photoURL: "", email: "", name: "", uploadedPhotoPath: "" }, })

export const mutations = {
    setUserData(state, data) { state.userData = data },
    setMainMenu(state, boolen) {
        state.openMainMenu = boolen
    }
}

export const actions = {
    getUserData({ commit, state }) {

        this.$fire.auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, photoURL, email, displayName } = user;
                commit("setUserData", { ...state.userData, uid, photoURL, email, displayName })
                this.$fire.firestore.collection('users').doc(uid).get().then(d => {
                    if (d.exists) {
                        const { uploadedPhotoPath } = d.data()

                        commit("setUserData", { ...state.userData, uploadedPhotoPath })
                    }
                })
            }
        })


    }
}