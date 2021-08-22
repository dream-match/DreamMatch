/* eslint new-cap:0 */
export default ({ $fire, store }, inject) => {
    const Editor = async (id, data) => {
        const EditorJS = await import("@editorjs/editorjs")
        const [Header, Embed, List, Quote, Code, Image, InlineCode, LinkTool] =
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
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                quote: Quote,
                code: Code,

                InlineCode: { class: InlineCode, shortcut: 'CMD+SHIFT+M', },
                linkTool: { class: LinkTool, config: { endpoint: "https://asia-northeast1-snstest-9f2b5.cloudfunctions.net/getOgp" } },
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
                                            resized_path: `images/posts/${store.state.userData.uid}/${file.name}`
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