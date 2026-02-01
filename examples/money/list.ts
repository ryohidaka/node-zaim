import { type MoneyQueryParams, Zaim } from '../../src'

const zaim = new Zaim({
	consumerKey: String(process.env.CONSUMER_KEY),
	consumerSecret: String(process.env.CONSUMER_SECRET),
	accessToken: String(process.env.ACCESS_TOKEN),
	accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
})

const params: MoneyQueryParams = {
	categoryId: 101,
	genreId: 10101,
	mode: 'payment',
	order: 'id',
	startDate: '2026-01-01',
	endDate: '2026-01-31',
	page: 1,
	limit: 3,
}

const money = await zaim.money.list(params)
console.log(money)
