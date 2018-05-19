const Transaction = require('./transaction')
const Wallet = require('./wallet')

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet()
    amount = 50
    recipient = 'alvaro'
    transaction = Transaction.newTransaction(wallet, recipient, amount)
  })

  it('outputs the `amount` subtracted from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount);
  });

  it('outputs the `amount`added to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount)
      .toEqual(amount);
  })

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance)
  })

  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBeTruthy()
  })

  it('invaldiates a corrupt transaction', () => {
    transaction.outputs[0].amount = 500000
    expect(Transaction.verifyTransaction(transaction)).toBeFalsy()
  })

  describe('transacting with an amount tha exceeds the balance', () => {
    beforeEach(() => {
      amount = 50000
      transaction = Transaction.newTransaction(wallet, recipient, amount)
    })

    it('does not create the transaction', () => {
      expect(transaction).toBeUndefined();
    })
  })

  describe('and updating a transaction', () => {
    let nextAmount, nextRecipient
    beforeEach(() => {
      nextAmount = 20
      nextRecipient = 'd9asd0-ad--fgag'
      transaction = transaction.update(wallet, nextRecipient, nextAmount)
    })

    it(`subtracts the next amount from the sender's output`, () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount - nextAmount)
    })

    it('outputs an amount for the next recipient', () => {
      expect(transaction.outputs.find(output => output.address === nextRecipient).amount).toEqual(nextAmount)
    })
  })

})