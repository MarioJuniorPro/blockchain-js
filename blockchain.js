const Block = require('./block')

class Blockchain {
  constructor() {
    // Start the chain with the initial block
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const lastIndex = this.chain.length - 1
    const block = Block.mineBlock(this.chain[lastIndex], data)
    this.chain.push(block)

    return block
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i - 1]

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false
      }
    }

    return true;
  }

  toString() {
    const formatedChain = this.chain
      .map(c => {
        return `${c.hash.substring(0, 10)}
    `
      })
      .join('')
    const template = `Blockchain - 
    ${formatedChain}
    `
    return template
  }
}

module.exports = Blockchain
