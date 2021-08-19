export const state = () => ({
    userData: { uid: "", photoURL: "", email: "" },
    logined: false,
    registerStep: 1,
    errorCode: ""

})

export const mutations = {
    setRegisterStep(state, step) {
        state.registerStep = step
    },
    addRegisterStep(state) {
        state.registerStep++
    },
    setUser(state, user) {
        state.userData = user
    },
    setErrorCode(state, code) {
        state.errorCode = code
    }
}

export const actions = {
    async registerByMail({ commit }, { mail, pass }) {
        try {
            const userCredential = await this.$fire.auth.createUserWithEmailAndPassword(mail, pass)
            const { uid, photoURL, email, displayName } = userCredential.user
            commit("setUser", { uid, photoURL, email, displayName })
            commit("addRegisterStep")
        }
        catch (e) {
            commit("setErrorCode", e.code)
        }
    },
    async registerByGoogle({ commit }) {
        console.log("do login with google")
        try {
            const provider = new this.$fireModule.auth.GoogleAuthProvider();
            const userCredential = await this.$fire.auth.signInWithPopup(provider);
            const { uid, photoURL, email, displayName } = userCredential
            commit("setUser", { uid, photoURL, email, displayName })
            commit("addRegisterStep")
        }
        catch (e) {
            console.error(e)
            commit("setErrorCode", e.code)
        }
    }
}



