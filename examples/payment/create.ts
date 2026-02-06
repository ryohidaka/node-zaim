import { type CreatePaymentParams, Zaim } from '../../src'

const zaim = new Zaim({
	consumerKey: String(process.env.CONSUMER_KEY),
	consumerSecret: String(process.env.CONSUMER_SECRET),
	accessToken: String(process.env.ACCESS_TOKEN),
	accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
})

const params: CreatePaymentParams = {
	categoryId: 101,
	genreId: 10101,
	amount: 1,
	date: '2026-02-04',
	fromAccountId: 1,
	comment: 'test',
	name: 'test',
	place: 'test',
}

const payment = await zaim.payment.create(params)
console.log(payment)
