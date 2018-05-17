const Blockchain = require('./blockchain')
const Block = require('./block')

describe('Blockchain', () => {
  let bc, bc2

  beforeEach(() => {
    bc = new Blockchain()
    bc2 = new Blockchain()
  })

  it('starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis())
  })

  it('adds a new block', () => {
    const data = 'foo'
    bc.addBlock(data)
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
  })

  it('validates a valid chain', () => {
    bc2.addBlock({ name: 'a object' })

    expect(bc.isValidChain(bc2.chain)).toBeTruthy()
  })

  it('invalidates a chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'Bad data'

    expect(bc.isValidChain(bc2.chain)).toBeFalsy()
  })

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo')
    bc2.chain[1].data = 'Not foo'

    expect(bc.isValidChain(bc2.chain)).toBeFalsy()
  })

  it('replaces the chain with a valid chain.', () => {
    bc2.addBlock('replacer')
    bc.replaceChain(bc2.chain)

    expect(bc.chain).toEqual(bc2.chain)
  })

  it('it not replace de chain with one of less than or equal to length', () => {
    bc.addBlock('test')
    bc.replaceChain(bc2.chain)

    console.log(bc.toString())
    
    console.log(bc2.toString())
    expect(bc.chain).not.toEqual(bc2.chain)
  })

  // it('', () => {

  // })
})
