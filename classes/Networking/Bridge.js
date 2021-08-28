'use strict'

const WebSocket = require('ws')
const Events    = require('events')
const Player    = require('../Player')

class Bridge extends Events {

    constructor(port) {
        super()
        this.port    = port
        this.wss     = new WebSocket.Server({ port: this.port }, () => console.log(`VGS started at port ${ this.port }`))
        this.clients = []
    }

    instance() {
        return this.wss
    }

    listen() {
        this.wss.on("connection", ws => {
            ws.id = this.rand();
            
            let player = new Player()
            player.id = ws.id
            player.ws = ws

            this.clients.push(player)

            this.send(ws, 
                "REGISTER-PLAYER", { id: ws.id }
            )
        
            this.broadcast(
                "REGISTER-CLIENTS", this.pack()
            )

            this.emit("player-joined", player)

            ws.on("message", msg => {
                this.parse(msg)
            })

            ws.on("close", () => {
                this.emit("player-left", ws.id)
                this.clients.splice(this.clients.findIndex(cl => cl.id === ws.id) , 1)
            })
        })
    }

    parse(data) {
        let json = JSON.parse(data)
        
        switch (json.command) {

            case "SYNC-STATE":
                this.clients.forEach(cl => {
                    if (cl.id == json.data.sender) {
                        cl.position = json.data.data.position
                        cl.rotation = json.data.data.rotation
                    }
                })

                this.broadcast("REGISTER-CLIENTS", this.pack())
            break;

        }
    }

    rand() {
        return (Math.random() + 1).toString(36).substring(7)
    }

    broadcast( type, data ) {
        this.clients.forEach(cl => {
            cl.ws.send(JSON.stringify({ "command": type, "data": data }))
        })
    }

    send(ins, command, data) {
        ins.send(JSON.stringify({ command: command, data: data }))
    }

    pack() {
        let pack = []

        this.clients.forEach(cl => {
            pack.push({ "id": cl.id, "position": cl.position, "rotation": cl.rotation })
        })

        return pack
    }

    add(object) {
        switch (object.command) {
            case "ADD-OBJECT":
                this.broadcast("ADD-OBJECT", object)
            break;
        }
    }

}

module.exports = Bridge
