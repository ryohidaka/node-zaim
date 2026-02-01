import type z from 'zod'
import { MoneyListResponseSchema } from '@/schemas'
import type { Zaim } from '../client'

type MoneyListResponse = z.infer<typeof MoneyListResponseSchema>

export class MoneyApi {
	constructor(private client: Zaim) {}

	/**
	 * Showing the list of input data
	 *
	 * @see https://dev.zaim.net/home/api#money_get
	 *
	 * @returns A promise that resolves to an array of money records
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
	 * const moneyList = await zaim.money.list();
	 * console.log(moneyList[0].amount); // 10000
	 * console.log(moneyList[0].mode); // 'income'
	 * ```
	 */
	async list(): Promise<MoneyListResponse['money']> {
		const queryParams: Record<string, string> = { mapping: '1' }

		const queryString = new URLSearchParams(queryParams).toString()
		const path = `/v2/home/money?${queryString}`
		const response = await this.client.getHttpClient().get(path)

		const { money } = MoneyListResponseSchema.parse(response)
		return money
	}
}
