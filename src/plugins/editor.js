
const Editor = process.client ?
    class _Editor extends require('@editorjs/editorjs') {
        constructor(id, data) {
            super({
                holderId: id, data
            })
        }
    }
    : null

export { Editor }