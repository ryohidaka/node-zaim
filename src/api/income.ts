import type z from 'zod'
import type { Zaim } from '@/client'
import {
	CreateIncomeParamsSchema,
	MoneyCreateResponseSchema,
	MoneyUpdateResponseSchema,
	UpdateIncomeParamsSchema,
} from '@/schemas'
import type { CreateIncomeParams, UpdateIncomeParams } from '@/types'

type IncomeCreateResponse = z.infer<typeof MoneyCreateResponseSchema>
type IncomeUpdateResponse = z.infer<typeof MoneyUpdateResponseSchema>

export class IncomeApi {
	constructor(private client: Zaim) {}

	/**
	 * Input income data
	 *
	 * @see https://dev.zaim.net/home/api#income_post
	 *
	 * @param params - Income parameters
	 * @returns Income creation response including money ID and modification timestamp
	 * @throws {ZodError} If validation fails
	 *
	 * @example
	 * ```typescript
	 * const result = await zaim.income.create({
	 *   categoryId: 11,
	 *   amount: 300000,
	 *   date: '2025-07-25'
	 * });
	 * console.log(result.money.id); // 11820767
	 * ```
	 */
	async create(params: CreateIncomeParams): Promise<IncomeCreateResponse> {
		const { categoryId, amount, date, toAccountId, place, comment } =
			CreateIncomeParamsSchema.parse(params)

		const body: Record<string, string | number> = {
			mapping: 1,
			category_id: categoryId,
			amount: amount,
			date: date,
		}

		if (toAccountId !== undefined) body.to_account_id = toAccountId
		if (place) body.place = place
		if (comment) body.comment = comment

		const response = await this.client
			.getHttpClient()
			.post('/v2/home/money/income', body)
		return MoneyCreateResponseSchema.parse(response)
	}

	/**
	 * Update an existing income record
	 *
	 * @see https://dev.zaim.net/home/api#money_put
	 *
	 * @param id - Income record ID
	 * @param params - Income update parameters
	 * @returns Income update response including modification timestamp
	 * @throws {ZodError} If validation fails
	 *
	 * @example
	 * ```typescript
	 * const result = await zaim.income.update(11820767, {
	 *   amount: 350000,
	 *   date: '2025-07-26'
	 * });
	 * console.log(result.money.modified); // Updated timestamp
	 * ```
	 */
	async update(
		id: number,
		params: UpdateIncomeParams,
	): Promise<IncomeUpdateResponse> {
		const { amount, date, toAccountId, categoryId, comment } =
			UpdateIncomeParamsSchema.parse(params)

		const body: Record<string, string | number> = {
			mapping: 1,
			amount: amount,
			date: date,
		}

		if (toAccountId !== undefined) body.from_account_id = toAccountId
		if (categoryId !== undefined) body.category_id = categoryId
		if (comment) body.comment = comment

		const response = await this.client
			.getHttpClient()
			.put(`/v2/home/money/income/${id}`, body)
		return MoneyUpdateResponseSchema.parse(response)
	}
}
