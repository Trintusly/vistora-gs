'use strict'

const WebSocket = require('ws')

class Bridge {

    constructor(port) {
        this.port = port
        this.wss = new WebSocket.Server({ port: this.port }, () => console.log("Server started."))
    }

    test() {
        this.wss.on("connection", () => console.log("connected")) 
    }

}

module.exports = Bridge
