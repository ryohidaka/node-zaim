import type z from 'zod'
import type { Zaim } from '@/client'
import { CreatePaymentParamsSchema, MoneyCreateResponseSchema } from '@/schemas'
import type { CreatePaymentParams } from '@/types'

type PaymentCreateResponse = z.infer<typeof MoneyCreateResponseSchema>

export class PaymentApi {
	constructor(private client: Zaim) {}

	/**
	 * Input payment data
	 *
	 * @see https://dev.zaim.net/home/api#payment_post
	 *
	 * @param params - Payment parameters
	 * @returns Payment creation response including money ID and modification timestamp
	 * @throws {ZodError} If validation fails
	 *
	 * @example
	 * ```typescript
	 * const result = await zaim.payment.create({
	 *   categoryId: 101,
	 *   genreId: 10101,
	 *   amount: 1500,
	 *   date: '2025-07-08'
	 * });
	 * console.log(result.money.id); // 11820767
	 * ```
	 */
	async create(params: CreatePaymentParams): Promise<PaymentCreateResponse> {
		const {
			categoryId,
			genreId,
			amount,
			date,
			fromAccountId,
			comment,
			name,
			place,
		} = CreatePaymentParamsSchema.parse(params)

		const body: Record<string, string | number> = {
			mapping: 1,
			category_id: categoryId,
			genre_id: genreId,
			amount: amount,
			date: date,
		}

		if (fromAccountId !== undefined) body.from_account_id = fromAccountId
		if (comment) body.comment = comment
		if (name) body.name = name
		if (place) body.place = place

		const response = await this.client
			.getHttpClient()
			.post('/v2/home/money/payment', body)
		return MoneyCreateResponseSchema.parse(response)
	}
}
