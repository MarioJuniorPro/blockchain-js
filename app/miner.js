class Miner {
  constructor(blockchain, transactionPool, wallet, p2pserver){
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.wallet = wallet
    this.p2pserver = p2pserver
  }

  mine(){
    const validTransctions = this.transactionPool.validTransctions()
    // include a reward for the miner
    // create a block consisting of the valid transactions
    // synchronize the chains in the peer-to-peer server
    // clear the transaction pool
    // broadcast to every miner to clear their transactions
  }
}