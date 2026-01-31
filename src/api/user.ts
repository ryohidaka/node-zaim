import type { z } from 'zod'
import { VerifyResponseSchema } from '@/schemas'
import type { Zaim } from '../client'

export type VerifyResponse = z.infer<typeof VerifyResponseSchema>

export class UserApi {
	constructor(private client: Zaim) {}

	/**
	 * Representation of the requesting user if authentication was successful.

	 *
	 * @see https://dev.zaim.net/home/api#user_verify
	 *
	 * @returns A promise that resolves to the authenticated user's profile information
	 *
	 * @example
	 * ```typescript
	 * import { Zaim } from "node-zaim"
	 * 
	 * const zaim = new Zaim({
	 *   consumerKey: 'your-key',
	 *   consumerSecret: 'your-secret',
	 *   accessToken: 'token',
	 *   accessTokenSecret: 'token-secret'
	 * });
	 *
	 * const user = await zaim.user.verify();
	 * console.log(user.name); // 'MyName'
	 * console.log(user.inputCount); // 100
	 * console.log(user.currencyCode); // 'JPY'
	 * ```
	 */
	async verify(): Promise<VerifyResponse['me']> {
		const response = await this.client
			.getHttpClient()
			.get('/v2/home/user/verify')
		const { me } = VerifyResponseSchema.parse(response)
		return me
	}
}
