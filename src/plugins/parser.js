import Fimg from "@/components/atom/f-img"

class Item {
    constructor(tag, p, v) {
        this.tag = tag
        this.p = p
        this.v = v
    }
}


export class Parser {
    constructor(data) {
        this.items = data.blocks ? data.blocks.map(i => {
            return (() => {
                for (const pa of parsers) {
                    const parsed = pa.parse(i)
                    if (parsed) {
                        return parsed
                    }
                }
            })()
        }) : []
    }

    get() {
        return this.items
    }
}

class Header {
    static parse(i) {
        return i.type === "header" && new Item(`h${i.data.level}`, null, i.data.text)
    }
}

class Image {
    static parse(i) {

        return i.type === "image" && new Item(Fimg, { props: { path: i.data.file.resized_path || i.data.file.url } })
    }
}

class Embed {
    static parse(i) {
        return i.type === "embed" && new Item("iframe", { domProps: { width: i.data.width, height: i.data.height, src: i.data.embed } })
    }
}

class Text {
    static parse(i) {
        return i.type === "paragraph" && new Item("p", null, i.data.text)
    }
}
const parsers = [Header, Image, Embed, Text]