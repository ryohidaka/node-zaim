import { Zaim } from '../../src'

const zaim = new Zaim({
	consumerKey: String(process.env.CONSUMER_KEY),
	consumerSecret: String(process.env.CONSUMER_SECRET),
	accessToken: String(process.env.ACCESS_TOKEN),
	accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
})

const me = await zaim.user.verify()
console.log(me)
