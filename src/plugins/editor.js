
const Editor = process.client ?
    class _Editor extends require('@editorjs/editorjs') {
        constructor(id, data) {
            super({
                holderId: id, data,
                tools: {
                    header: {
                        class: require('@editorjs/header'),
                        shortcut: 'CMD+SHIFT+H',
                    }, embed: {
                        class: require("@editorjs/embed"),
                        inlineToolbar: true
                    },
                }
            })
        }
    }
    : null

export { Editor }