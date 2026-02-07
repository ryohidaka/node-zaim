import { type UpdateTransferParams, Zaim } from '../../src'

const zaim = new Zaim({
	consumerKey: String(process.env.CONSUMER_KEY),
	consumerSecret: String(process.env.CONSUMER_SECRET),
	accessToken: String(process.env.ACCESS_TOKEN),
	accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
})

const params: UpdateTransferParams = {
	amount: 1,
	date: '2026-02-04',
	comment: 'test',
}

const transfer = await zaim.transfer.update(11820767, params)
console.log(transfer)
