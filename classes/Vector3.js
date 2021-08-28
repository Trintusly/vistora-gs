'use strict'

class Vector3 {

    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    toObject() {
        return { x: this.x, y: this.y, z: this.y }
    }

}

module.exports = Vector3
