import type { OAuth } from 'oauth'
import {
	AccountApi,
	CategoryApi,
	CurrencyApi,
	GenreApi,
	MoneyApi,
	PaymentApi,
	UserApi,
} from './api'
import { ZaimAuth } from './auth'
import { HttpClient } from './http-client'

export interface ZaimConfig {
	/**
	 * Consumer Key provided by Zaim
	 */
	consumerKey: string
	/**
	 * Consumer Secret provided by Zaim
	 */
	consumerSecret: string
	/**
	 * Access Token
	 *
	 * optional, can be set later
	 */
	accessToken?: string
	/**
	 * Access Token Secret
	 *
	 * optional, can be set later
	 */
	accessTokenSecret?: string
	/**
	 * Custom OAuth client
	 */
	oauthClient?: OAuth
}

/**
 * Zaim API Client
 *
 * @param config Zaim config
 * @param config.consumerKey Consumer Key provided by Zaim
 * @param config.consumerSecret Consumer Secret provided by Zaim
 * @param config.accessToken (Optional) Access Token
 * @param config.accessTokenSecret (Optional) Access Token Secret
 * @param config.oauthClient (Optional) Custom OAuth client
 */
export class Zaim {
	private auth: ZaimAuth
	private http: HttpClient

	public readonly user: UserApi
	public readonly money: MoneyApi
	public readonly category: CategoryApi
	public readonly genre: GenreApi
	public readonly account: AccountApi
	public readonly currency: CurrencyApi
	public readonly payment: PaymentApi

	constructor(config: ZaimConfig) {
		this.auth = new ZaimAuth(
			config.consumerKey,
			config.consumerSecret,
			config.accessToken,
			config.accessTokenSecret,
			config.oauthClient,
		)

		this.http = new HttpClient(
			this.auth.getOAuthClient(),
			this.auth.getAccessToken(),
			this.auth.getAccessTokenSecret(),
		)

		this.user = new UserApi(this)
		this.money = new MoneyApi(this)
		this.category = new CategoryApi(this)
		this.genre = new GenreApi(this)
		this.account = new AccountApi(this)
		this.currency = new CurrencyApi(this)
		this.payment = new PaymentApi(this)
	}

	/**
	 * setAccessToken
	 *
	 * @param token Access Token
	 * @param tokenSecret Access Token Secret
	 */
	setAccessToken(token: string, tokenSecret: string): void {
		this.auth.setAccessToken(token, tokenSecret)
	}

	getRequestToken(
		callback = 'oob',
	): Promise<{ token: string; tokenSecret: string }> {
		return this.auth.getRequestToken(callback)
	}

	getAuthorizeUrl(requestToken: string): string {
		return this.auth.getAuthorizeUrl(requestToken)
	}

	getAccessToken(
		requestToken: string,
		requestTokenSecret: string,
		oauthVerifier: string,
	): Promise<{ accessToken: string; accessTokenSecret: string }> {
		return this.auth.getOAuthAccessToken(
			requestToken,
			requestTokenSecret,
			oauthVerifier,
		)
	}

	getHttpClient(): HttpClient {
		return this.http
	}
}
