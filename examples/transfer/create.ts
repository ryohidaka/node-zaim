import { type CreateTransferParams, Zaim } from '../../src'

const zaim = new Zaim({
	consumerKey: String(process.env.CONSUMER_KEY),
	consumerSecret: String(process.env.CONSUMER_SECRET),
	accessToken: String(process.env.ACCESS_TOKEN),
	accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
})

const params: CreateTransferParams = {
	amount: 1,
	date: '2026-02-04',
	fromAccountId: 1,
	toAccountId: 2,
	comment: 'test',
}

const transfer = await zaim.transfer.create(params)
console.log(transfer)
