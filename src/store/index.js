export const state = () => ({ openMainMenu: false, userData: { uid: "", photoURL: "", email: "", name: "" } })

export const mutations = {
    setUserData(state, data) { state.userData = data },
    setMainMenu(state, boolen) {
        state.openMainMenu = boolen
    }
}

export const actions = {
    getUserData({ commit }) {
        this.$fire.auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, photoURL, email, displayName } = user;
                commit("setUserData", { uid, photoURL, email, displayName })
            }
        })
    }
}