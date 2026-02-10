import type { z } from 'zod'
import {
	GroupedMoneyListResponseSchema,
	MoneyListResponseSchema,
	MoneyQueryParamsSchema,
} from '@/schemas'
import type { MoneyQueryParams } from '@/types'
import type { Zaim } from '../client'

type MoneyListResponse = z.infer<typeof MoneyListResponseSchema>
type GroupedMoneyListResponse = z.infer<typeof GroupedMoneyListResponseSchema>

export class MoneyApi {
	constructor(private client: Zaim) {}

	/**
	 * Showing the list of input data
	 *
	 * @see https://dev.zaim.net/home/api#money_get
	 *
	 * @param params - Optional query parameters to filter and paginate results
	 * @returns A promise that resolves to an array of money records
	 * @throws {ZodError} If validation fails for any parameter
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
	 * // Get all money records
	 * const allMoney = await zaim.money.list();
	 * console.log(allMoney[0].amount); // 10000
	 * console.log(allMoney[0].mode); // 'income'
	 *
	 * // Filter by date range and mode
	 * const payments = await zaim.money.list({
	 *   mode: 'payment',
	 *   startDate: '2024-01-01',
	 *   endDate: '2024-12-31',
	 *   limit: 50
	 * });
	 * ```
	 */
	async list(): Promise<MoneyListResponse['money']>
	async list(
		params: Omit<MoneyQueryParams, 'groupBy'> & { groupBy: 'receipt_id' },
	): Promise<GroupedMoneyListResponse['money']>
	async list(
		params?: MoneyQueryParams,
	): Promise<MoneyListResponse['money'] | GroupedMoneyListResponse['money']> {
		if (params) {
			MoneyQueryParamsSchema.parse(params)
		}

		const queryParams: Record<string, string> = { mapping: '1' }

		if (params) {
			if (params.categoryId !== undefined) {
				queryParams.category_id = String(params.categoryId)
			}
			if (params.genreId !== undefined) {
				queryParams.genre_id = String(params.genreId)
			}
			if (params.mode !== undefined) {
				queryParams.mode = params.mode
			}
			if (params.order !== undefined) {
				queryParams.order = params.order
			}
			if (params.startDate !== undefined) {
				queryParams.start_date = params.startDate
			}
			if (params.endDate !== undefined) {
				queryParams.end_date = params.endDate
			}
			if (params.page !== undefined) {
				queryParams.page = String(params.page)
			}
			if (params.limit !== undefined) {
				queryParams.limit = String(params.limit ?? 20)
			}
			if (params.groupBy !== undefined) {
				queryParams.group_by = params.groupBy
			}
		}

		const queryString = new URLSearchParams(queryParams).toString()
		const path = `/v2/home/money?${queryString}`
		const response = await this.client.getHttpClient().get(path)

		if (params?.groupBy === 'receipt_id') {
			const { money } = GroupedMoneyListResponseSchema.parse(response)
			return money
		}

		const { money } = MoneyListResponseSchema.parse(response)
		return money
	}
}
