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
            
            ws.on("message", msg => this.parse(msg))
        })
    }

    parse(data) {
        let json = JSON.parse(data)
        
        switch (data) {
            case "REGISTER-PLAYER":
                console.log("Register player")
            break;
        }
    }

}

module.exports = Bridge
