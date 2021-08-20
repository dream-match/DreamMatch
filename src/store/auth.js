export const state = () => ({
    userData: { uid: "", photoURL: "", email: "", name: "" },
    userProf: null,
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
    },
    setProf(state, prof) { state.userProf = prof },
    ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) { console.log(authUser) }
}

export const actions = {
    async registerByMail({ commit }, { mail, pass }) {
        try {
            commit("setRegisterStep", 1)
            const userCredential = await this.$fire.auth.createUserWithEmailAndPassword(mail, pass)
            const { uid, photoURL, email, displayName } = userCredential.user
            commit("setUser", { uid, photoURL, email, name: displayName })
            commit("addRegisterStep")
        }
        catch (e) {

            commit("setErrorCode", e.code)
        }
    },
    async registerByGoogle({ commit }) {
        try {
            commit("setRegisterStep", 1)
            const provider = new this.$fireModule.auth.GoogleAuthProvider();
            const userCredential = await this.$fire.auth.signInWithPopup(provider);
            const { uid, photoURL, email, displayName } = userCredential.user
            commit("setUser", { uid, photoURL, email, name: displayName })
            commit("addRegisterStep")
        }
        catch (e) {
            commit("setErrorCode", e.code)
        }
    },
    async registerProf({ commit }, input) {
        try {
            commit("setRegisterStep", 1)
            const user = this.$fire.auth.currentUser;
            let uploadedImgUrl = ""
            if (input.imageFile) {
                const snapshot = await this.$fire.storage.ref().child(`images/profile/${user.uid}`).put(input.imageFile)
                uploadedImgUrl = await snapshot.ref.getDownloadURL();
            }
            await user.updateProfile({
                displayName: input.name,
                photoURL: uploadedImgUrl || input.image
            })
            const { uid, photoURL, email, displayName } = user
            await this.$fire.firestore.collection('users').doc(user.uid).set({
                prof: input.prof,
                skills: input.skill, uid,
                photoURL, email, name: displayName, createdAt: this.$fireModule.firestore.Timestamp.fromDate(new Date()),
            }, { merge: true });


            commit("setUser", { uid, photoURL, email, name: displayName })
            commit("addRegisterStep")
        } catch (e) {
            console.error(e)
            this.$router.push('/')
        }
    },
    async loginByMail({ commit }, { mail, pass }) {
        try {

            const userCredential = await this.$fire.auth.signInWithEmailAndPassword(mail, pass)
            const { uid, photoURL, email, displayName } = userCredential.user
            commit("setUser", { uid, photoURL, email, name: displayName })
            this.$router.push('/')
        }
        catch (e) {
            commit("setErrorCode", e.code)
        }
    },
    async loginByGoogle({ commit }) {
        try {

            const provider = new this.$fireModule.auth.GoogleAuthProvider();
            const userCredential = await this.$fire.auth.signInWithPopup(provider);
            const { uid, photoURL, email, displayName } = userCredential.user
            commit("setUser", { uid, photoURL, email, name: displayName })
            this.$router.push('/')
        }
        catch (e) {
            commit("setErrorCode", e.code)
        }
    },
}

