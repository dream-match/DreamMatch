/* eslint new-cap:0 */
export default ({ $fire, store }, inject) => {
    const Editor = async (id, data) => {
        const EditorJS = await import("@editorjs/editorjs")
        const editor = new EditorJS.default({
            holder: id,
            data,
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
                delimiter: require("@editorjs/delimiter"),
                quote: require('@editorjs/quote'),
                code: require("@editorjs/code"),
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
        return editor

    }
    inject("editor", Editor)
}