import { type UpdatePaymentParams, Zaim } from '../../src'

const zaim = new Zaim({
	consumerKey: String(process.env.CONSUMER_KEY),
	consumerSecret: String(process.env.CONSUMER_SECRET),
	accessToken: String(process.env.ACCESS_TOKEN),
	accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
})

const params: UpdatePaymentParams = {
	amount: 1,
	date: '2026-02-04',
	fromAccountId: 1,
	genreId: 10101,
	categoryId: 101,
	placeUid: 'test',
	comment: 'test',
}

const payment = await zaim.payment.update(11820767, params)
console.log(payment)
