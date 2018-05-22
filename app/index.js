const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain/blockchain')
const P2pServer = require('./p2p-server')
const TransactionPool = require('../wallet/transaction-pool')
const Wallet = require('../wallet/wallet')

const app = express()

app.use(bodyParser.json({extended: true}))

const HTTP_PORT = process.env.HTTP_PORT || 3000

const bc = new Blockchain()
const wallet = new Wallet()
const tp = new TransactionPool()
const p2pServer = new P2pServer(bc, tp)

app.get('/', (req,res) => {
  res.end('Blockchain')
})

app.get('/blocks', (req,res) => {
  res.json(bc.chain)
})

app.get('/transactions', (req,res) => {
  res.json(tp.transactions)
})


app.get('/public-key', (req,res) => {
  res.json({publicKey: wallet.publicKey})
})

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body
  const transaction = wallet.createTransaction(recipient, amount, tp)

  p2pServer.broadcastTransaction(transaction)
  res.redirect('/transactions')
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  console.log(`New Block added: ${block}`);
  p2pServer.syncChains()
  res.redirect('/blocks')
})

//set HTTP_PORT=3003 && set P2P_PORT=5003 && set PEERS=ws://localhost:5001 && npm run dev

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
})

p2pServer.listen()