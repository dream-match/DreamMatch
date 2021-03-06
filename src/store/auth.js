export const state = () => ({
  userData: { uid: '', photoURL: '', email: '', name: '' },
  userProf: null,
  logined: false,
  registerStep: 1,
  errorCode: '',
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
  setProf(state, prof) {
    state.userProf = prof
  },
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    console.log(authUser)
  },
}

export const actions = {
  async registerByMail({ commit }, { mail, pass }) {
    try {
      const userCredential =
        await this.$fire.auth.createUserWithEmailAndPassword(mail, pass)
      const { uid, photoURL, email, displayName } = userCredential.user
      commit('setUser', { uid, photoURL, email, name: displayName })
      await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .set({ name: displayName || '未登録' }, { merge: true })
      commit('addRegisterStep')
    } catch (e) {
      commit('setErrorCode', e.code)
    }
  },
  async registerByGoogle({ commit }) {
    try {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      const userCredential = await this.$fire.auth.signInWithPopup(provider)
      const { uid, photoURL, email, displayName } = userCredential.user

      commit('setUser', { uid, photoURL, email, name: displayName })

      await this.$fire.firestore
        .collection('users')
        .doc(uid)
        .set({ name: displayName || '未登録' }, { merge: true })
      commit('addRegisterStep')
    } catch (e) {
      commit('setErrorCode', e.code)
    }
  },

  async registerProf({ commit, state }, input) {
    try {
      const user = this.$fire.auth.currentUser
      let uploadedPath = ''
      if (input.imageFile) {
        uploadedPath = `/images/profile/${user.uid}/${input.imageFile.name}`
        await this.$fire.storage.ref().child(uploadedPath).put(input.imageFile)
      }
      await user.updateProfile({
        displayName: input.name,
      })
      const { uid, photoURL, email, displayName } = user

      const skillsObj = input.skill.reduce((b, v) => {
        b[v] = true
        return b
      }, {})

      await this.$fire.firestore
        .collection('users')
        .doc(user.uid)
        .set(
          {
            prof: input.prof,
            skills: skillsObj,
            uid,
            photoURL,
            email,
            name: displayName,
            uploadedPhotoPath: uploadedPath,
            createdAt: this.$fireModule.firestore.Timestamp.fromDate(
              new Date()
            ),
          },
          { merge: true }
        )

      commit('setUser', {
        uid,
        photoURL,
        email,
        name: displayName,
        uploadedPath,
      })
      commit('addRegisterStep')
    } catch (e) {
      console.error(e)
      this.$router.push('/')
    }
  },
  async loginByMail({ commit }, { mail, pass }) {
    try {
      const userCredential = await this.$fire.auth.signInWithEmailAndPassword(
        mail,
        pass
      )
      const { uid, photoURL, email, displayName } = userCredential.user
      commit('setUser', { uid, photoURL, email, name: displayName })
      this.$router.push('/')
    } catch (e) {
      commit('setErrorCode', e.code)
    }
  },
  async loginByGoogle({ commit }) {
    try {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      const userCredential = await this.$fire.auth.signInWithPopup(provider)
      const { uid, photoURL, email, displayName } = userCredential.user
      commit('setUser', { uid, photoURL, email, name: displayName })
      this.$router.push('/')
    } catch (e) {
      commit('setErrorCode', e.code)
    }
  },
}
