import { firestoreAction } from 'vuexfire'

export const state = () => ({
  chats: [],
})

export const actions = {
  getChats: firestoreAction(async function ({ bindFirestoreRef }) {
    const uid = process.client ? localStorage.getItem('uid') : ''
    if (uid) {
      const ref = this.$fire.firestore
        .collection('chats')
        .where(
          'members',
          'array-contains',
          this.$fire.firestore.collection('users').doc(uid)
        )
      await bindFirestoreRef('chats', ref)
    }
  }),

  async createChat({ state }, { uids, name, imagePath = '' }) {
    const ref = await this.$fire.firestore.collection('chats').add({
      name,
      imagePath,
      members: uids.map((uid) =>
        this.$fire.firestore.collection('users').doc(uid)
      ),
    })
    return ref
  },
  async sendMessage({ rootState }, { message, id, image }) {
    await this.$fire.firestore
      .collection('chats')
      .doc(id)
      .collection('messages')
      .add({
        user: this.$fire.firestore
          .collection('users')
          .doc(rootState.userData.uid),
        message,
        image,
        createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      })
  },
  async joinWith({ rootState, state, dispatch }, uid) {
    try {
      let chat = state.chats.find(
        (chat) =>
          chat.members.length === 2 && chat.members.some((e) => e.uid === uid)
      )
      if (!chat) {
        const res = await this.$fire.firestore
          .collection('users')
          .doc(uid)
          .get()
        const { uploadedPhotoPath, name } = res.data()
        chat = await dispatch('createChat', {
          name,
          imagePath: uploadedPhotoPath,
          uids: [uid, rootState.userData.uid],
        })
      }

      this.$router.push(`/messages/${chat.id}`)
    } catch (e) {
      console.error(e)
    }
  },
  async joinChat({ rootState }, id) {
    try {
      if (!id) return
      await this.$fire.firestore
        .collection('chats')
        .doc(id)
        .update({
          members: this.$fireModule.firestore.FieldValue.arrayUnion(
            this.$fire.firestore.collection('users').doc(rootState.userData.uid)
          ),
        })
      this.$router.push(`/messages/${id}`)
    } catch (e) {
      console.error(e)
    }
  },
}
