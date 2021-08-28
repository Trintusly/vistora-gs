'use strict'

const Vector3 = require('../Vector3')

class Base {

    constructor() {
        this.name     = "Object"
        this.color    = "FFFFFF"
        this.position = new Vector3()
        this.rotation = new Vector3()
        this.scale    = new Vector3()
    }

}

module.exports = Base
