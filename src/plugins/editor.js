/* eslint new-cap:0 */
export default ({ $fire, store }, inject) => {
    const Editor = async (id, data) => {
        const EditorJS = await import("@editorjs/editorjs")
        const [Header, Embed, List, Delimiter, Quote, Code, Image] =
            (await import("~/plugins/editor-plugins")).default


        const editor = new EditorJS.default({
            holder: id,
            data,
            tools: {
                header: {
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                },
                embed: {
                    class: Embed,
                    inlineToolbar: true
                },
                link: {
                    class: List,
                    inlineToolbar: true,
                },
                delimiter: Delimiter,
                quote: Quote,
                code: Code,
                image: {
                    class: Image,
                    config: {
                        uploader: {
                            async uploadByFile(file) {
                                try {
                                    const storageRef = $fire.storage.ref(`images/posts/${store.state.userData.uid}`)
                                    const snapshot = await storageRef.child(file.name).put(file)
                                    const url = await snapshot.ref.getDownloadURL()
                                    return {
                                        success: 1, file: {
                                            url,
                                            resized_path: `images/posts/${store.state.userData.uid}/${file.name.replace(".", "_1280x720.")}`
                                        }
                                    }
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