import type { z } from 'zod'
import {
	AccountListResponseSchema,
	DefaultAccountListResponseSchema,
} from '@/schemas/account'
import type { Zaim } from '../client'

export type AccountResponse = z.infer<typeof AccountListResponseSchema>
export type DefaultAccountResponse = z.infer<
	typeof DefaultAccountListResponseSchema
>

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
	 * import { Zaim } from "node-zaim"
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

	/**
	 * Get default account list
	 *
	 * @see https://dev.zaim.net/home/api#account_get
	 *
	 * @param lang - Language code for the response (default: `'ja'`)
	 *
	 * @returns default account list
	 *
	 * @example
	 * ```typescript
	 * import { Zaim } from "node-zaim"
	 *
	 * const zaim = new Zaim({...});
	 *
	 * // Get default accounts in Japanese
	 * const defaultAccounts = await zaim.account.default();
	 * console.log(defaultAccounts[0].name); // 'お財布'
	 *
	 * // Get default accounts in English
	 * const defaultAccountsEn = await zaim.account.default('en');
	 * console.log(defaultAccountsEn[0].name); // 'Wallet'
	 * ```
	 */
	async default(
		lang: string = 'ja',
	): Promise<DefaultAccountResponse['accounts']> {
		const response = await this.client
			.getHttpClient()
			.get(`/v2/account?lang=${lang}`)
		const { accounts } = DefaultAccountListResponseSchema.parse(response)
		return accounts
	}
}
