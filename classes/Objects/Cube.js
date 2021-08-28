'use strict'

const Base = require('./Base')

class Cube extends Base {

    constructor() {
        super()
        this.command  = "ADD-OBJECT"
        this.type     = "CUBE"
    }

}

module.exports = Cube
