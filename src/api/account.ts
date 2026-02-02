import type { z } from 'zod'
import { AccountListResponseSchema } from '@/schemas/account'
import type { Zaim } from '../client'

export type AccountResponse = z.infer<typeof AccountListResponseSchema>

export class AccountApi {
	constructor(private client: Zaim) {}

	/**
	 * Showing the list of your accounts
	 *
	 * @see https://dev.zaim.net/home/api#account_home_get
	 *
	 * @returns the list of your accounts
	 *
	 * @example
	 * ```typescript
	 * import Zaim from "node-zaim"
	 *
	 * const zaim = new Zaim({...});
	 *
	 * const accounts = await zaim.account.list();
	 * console.log(accounts[0].name); // 'Credit card'
	 * ```
	 */
	async list(): Promise<AccountResponse['accounts']> {
		const response = await this.client.getHttpClient().get('/v2/home/account')
		const { accounts } = AccountListResponseSchema.parse(response)
		return accounts
	}
}
