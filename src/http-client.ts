import type { OAuth } from 'oauth'
import { BASE_URL } from './constants'

export class HttpClient {
	constructor(
		private oauth: OAuth,
		private accessToken: string,
		private accessTokenSecret: string,
	) {}

	/**
	 * Executes the OAuth request, handles the Promise wrapper, and parses JSON.
	 */
	private execute<T>(
		fn: (
			cb: (
				e: { statusCode: number; data?: string },
				d?: string | Buffer<ArrayBufferLike>,
			) => void,
		) => void,
	): Promise<T> {
		return new Promise((resolve, reject) => {
			fn((err, data) => {
				if (err) return reject(err)
				try {
					const json = JSON.parse(data as string)
					// Validate: must be a non-null object and not an array
					if (typeof json === 'object' && json && !Array.isArray(json)) {
						resolve(json as T)
					} else {
						reject(new Error('Response is not a JSON object'))
					}
				} catch (e) {
					reject(new Error(`Failed to parse JSON: ${e}`))
				}
			})
		})
	}

	async get<T extends Record<string, unknown>>(path: string): Promise<T> {
		return this.execute<T>((cb) =>
			this.oauth.get(
				`${BASE_URL}${path}`,
				this.accessToken,
				this.accessTokenSecret,
				cb,
			),
		)
	}

	async post<T extends Record<string, unknown>>(
		path: string,
		body: Record<string, string | number | boolean> = {},
	): Promise<T> {
		return this.execute<T>((cb) =>
			this.oauth.post(
				`${BASE_URL}${path}`,
				this.accessToken,
				this.accessTokenSecret,
				body,
				'application/x-www-form-urlencoded',
				cb,
			),
		)
	}
}
