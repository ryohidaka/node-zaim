export class ZaimAuth {
	private accessToken: string
	private accessTokenSecret: string

	constructor(
		_consumerKey: string,
		_consumerSecret: string,
		accessToken = '',
		accessTokenSecret = '',
	) {
		this.accessToken = accessToken
		this.accessTokenSecret = accessTokenSecret
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
}
