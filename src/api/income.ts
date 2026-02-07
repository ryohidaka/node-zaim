import type z from 'zod'
import type { Zaim } from '@/client'
import { CreateIncomeParamsSchema, MoneyCreateResponseSchema } from '@/schemas'
import type { CreateIncomeParams } from '@/types'

type IncomeCreateResponse = z.infer<typeof MoneyCreateResponseSchema>

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
}
