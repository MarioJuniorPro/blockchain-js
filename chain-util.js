const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class ChainUtil {

  static genKeyPair(){
    return ec.genKeyPair()
  }

  hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`)
  }
}

module.exports = ChainUtil
