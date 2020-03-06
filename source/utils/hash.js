const hash256 = require('crypto-js/sha256')

const hashit = (params) => {
    const data = params
    return hash256(data).toString()
}

module.exports = hashit