'use strict'

class Player {

    constructor() {
        this.ws       = null
        this.id       = null
        this.user     = null
        this.position = null
        this.rotation = null
    }

    private(type, data) {
        this.ws.send(JSON.stringify({ command: "PRIVATE-SIGNAL", type: type, data: data }))
    }

    showDialog(content) {
        this.private("SHOW-DIALOG", { content: content })
    }

}

module.exports = Player
