'use strict'

const WebSocket = require('ws')

class Bridge {

    constructor(port) {
        this.port = port
        this.wss = new WebSocket.Server({ port: this.port }, () => console.log(`VGS started at port ${ this.port }`))
    }

    instance() {
        return this.wss
    }

    listen() {
        this.wss.on("connection", ws => {
            console.log("Connection!")
        })
    }

}

module.exports = Bridge
