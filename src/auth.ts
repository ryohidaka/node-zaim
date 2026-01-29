import { OAuth } from 'oauth'
import { BASE_URL } from './constants'

export class ZaimAuth {
	private oauth: OAuth
	private accessToken: string
	private accessTokenSecret: string

	private static readonly REQUEST_TOKEN_URL = `${BASE_URL}/v2/auth/request`
	private static readonly ACCESS_TOKEN_URL = `${BASE_URL}/v2/auth/access`
	private static readonly API_VERSION = '1.0'
	private static readonly SIGNATURE_METHOD = 'HMAC-SHA1'

	constructor(
		consumerKey: string,
		consumerSecret: string,
		accessToken = '',
		accessTokenSecret = '',
		oauthClient?: OAuth,
	) {
		this.accessToken = accessToken
		this.accessTokenSecret = accessTokenSecret

		this.oauth =
			oauthClient ||
			new OAuth(
				ZaimAuth.REQUEST_TOKEN_URL,
				ZaimAuth.ACCESS_TOKEN_URL,
				consumerKey,
				consumerSecret,
				ZaimAuth.API_VERSION,
				null,
				ZaimAuth.SIGNATURE_METHOD,
			)
	}

	getAccessToken(): string {
		return this.accessToken
	}

	getAccessTokenSecret(): string {
		return this.accessTokenSecret
	}

	setAccessToken(token: string, tokenSecret: string): void {
		this.accessToken = token
		this.accessTokenSecret = tokenSecret
	}

	getOAuthClient(): OAuth {
		return this.oauth
	}
}
