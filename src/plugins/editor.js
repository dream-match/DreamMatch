export default ({ $fire, store }, inject) => {
    class Editor extends require('@editorjs/editorjs') {
        constructor(id, data) {
            super({
                holderId: id, data,
                tools: {
                    header: {
                        class: require('@editorjs/header'),
                        shortcut: 'CMD+SHIFT+H',
                    },
                    embed: {
                        class: require("@editorjs/embed"),
                        inlineToolbar: true
                    },
                    link: {
                        class: require("@editorjs/list"),
                        inlineToolbar: true,
                    },
                    image: {
                        class: require("@editorjs/image"),
                        config: {
                            uploader: {
                                async uploadByFile(file) {
                                    try {
                                        const storageRef = $fire.storage.ref(`images/posts/${store.state.userData.uid}`)
                                        const snapshot = await storageRef.child(file.name).put(file)
                                        const url = await snapshot.ref.getDownloadURL()
                                        return { success: 1, file: { url } }
                                    } catch (e) {
                                        return { success: false, file: { url: false } }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
    }
    inject("editor", Editor)
}
