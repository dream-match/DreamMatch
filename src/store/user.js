export const state = () => ({ userData: {}, posts: [], docIn: null })

export const mutations = {
  setUserData(state, userData) {
    state.userData = userData
  },
  joinPosts(state, posts) {
    state.posts = [...state.posts, ...posts]
  },
  insertionPosts(state, posts) {
    state.posts = [...posts, ...state.posts]
  },
  setPosts(state, posts) {
    state.posts = posts
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
        headerImg,
        twitter,
        github,
        url,
        name,
      } = res.data()

      commit('setUserData', {
        uid,
        photoURL,
        email,
        displayName,
        skills: [...Object.keys(skills)],
        uploadedPhotoPath,
        headerImg,
        twitter,
        github,
        url,
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
        const { name, prof, skills, uploadedPhotoPath, uid } = res.data()
        await usersRef
          .doc(id)
          .collection('follower')
          .doc(rootState.userData.uid)
          .set(rootState.userData)
        await usersRef
          .doc(rootState.userData.uid)
          .collection('following')
          .doc(id)
          .set({
            name,
            prof,
            skills: [...Object.keys(skills)],

            uploadedPhotoPath,
            uid,
          })
      }
    } catch (err) {
      console.error(err)
    }
  },
  async unFollow({ rootState }, id) {
    const usersRef = this.$fire.firestore.collection('users')
    await Promise.all([
      usersRef
        .doc(id)
        .collection('follower')
        .doc(rootState.userData.uid)
        .delete(),
      usersRef
        .doc(rootState.userData.uid)
        .collection('following')
        .doc(id)
        .delete(),
    ])
  },
  async getFCnt({ commit }, id) {
    const res = await fetch(
      `https://asia-northeast1-dreammatch-c9d8c.cloudfunctions.net/exports-getFcnt?uid=${id}`
    )
    return await res.json()
  },

  async getFollowList({ rootState }, uid) {
    const userRef = this.$fire.firestore.collection('users').doc(uid)
    const [follower, following] = (
      await Promise.all([
        userRef
          .collection('follower')
          .where('uid', '!=', rootState.userData.uid)
          .limit(100)
          .get(),
        userRef
          .collection('following')
          .where('uid', '!=', rootState.userData.uid)
          .limit(100)
          .get(),
      ])
    ).map((users) => users.docs.map((doc) => doc.data()))
    console.log(follower)
    return { follower, following }
  },

  async isFollow({ rootState }, id, from) {
    if (!rootState.userData.uid) return false
    const follow = await this.$fire.firestore
      .collection('users')
      .doc(from || rootState.userData.uid)
      .collection('following')
      .where('uid', '==', id)
      .get()

    return !follow.empty
  },
  async isFollower({ rootState }, id, from) {
    if (!rootState.userData.uid) return false
    const follow = await this.$fire.firestore
      .collection('users')
      .doc(from || rootState.userData.uid)
      .collection('follower')
      .where('uid', '==', id)
      .get()

    return !follow.empty
  },
  async getFirstPosts({ commit }, uid) {
    try {
      const res = await this.$fire.firestore
        .collection('posts')
        .where('uid', '==', uid)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get()
      const posts = res.docs.map((d) => {
        const { id } = d
        const {
          createdAt,
          description,
          title,
          titleImgPath,
          user,
          tags,
          save,
        } = d.data()
        return {
          id,
          tags,
          createdAt: createdAt.toDate(),
          description,
          title,
          save,
          titleImgPath,
          user,
        }
      })

      commit('setPosts', posts)
    } catch (e) {
      console.error(e)
    }
  },
  async getPosts({ commit }, { uid, page }) {
    const res = await fetch(
      `https://asia-northeast1-dreammatch-c9d8c.cloudfunctions.net/exports-getUserPost?per=50&page=${
        page || 0
      }&uid=${uid}`
    )
    commit('setPosts', await res.json())
  },
  async getPost({ commit }, id) {
    const res = await this.$fire.firestore.collection('posts').doc(id).get()

    const { createdAt, description, title, titleImgPath, user, tags, save } =
      res.data()
    return {
      id: res.id,
      tags,
      createdAt: createdAt.toDate(),
      description,
      title,
      save,
      titleImgPath,
      user,
    }
  },
  async postMessage({ rootState }, { id, message }) {
    const s = message.replace(/\s/g, '')
    if (!s) {
      return
    }

    await this.$fire.firestore
      .collection('posts')
      .doc(id)
      .collection('messages')
      .add({
        message,
        user: rootState.userData,
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      })
  },
  async getMessage({ commit }, id) {
    const res = await this.$fire.firestore
      .collection('posts')
      .doc(id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get()
    return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  },
}
