import { type CreateIncomeParams, Zaim } from '../../src'

const zaim = new Zaim({
	consumerKey: String(process.env.CONSUMER_KEY),
	consumerSecret: String(process.env.CONSUMER_SECRET),
	accessToken: String(process.env.ACCESS_TOKEN),
	accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
})

const params: CreateIncomeParams = {
	categoryId: 101,
	amount: 1,
	date: '2026-02-04',
	toAccountId: 1,
	place: 'test',
	comment: 'test',
}

const income = await zaim.income.create(params)
console.log(income)
