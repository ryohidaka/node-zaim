import type { OAuth } from 'oauth'
import { ZaimAuth } from './auth'

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

	constructor(config: ZaimConfig) {
		this.auth = new ZaimAuth(
			config.consumerKey,
			config.consumerSecret,
			config.accessToken,
			config.accessTokenSecret,
			config.oauthClient,
		)
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
}
