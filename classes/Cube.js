'use strict'

const Vector3 = require('./Vector3')

class Cube {

    constructor() {
        this.command  = "ADD-OBJECT"
        this.type     = "CUBE"
        this.position = new Vector3()
        this.rotation = new Vector3()
        this.scale    = new Vector3()
    }

}

module.exports = Cube
