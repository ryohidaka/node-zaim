import type z from 'zod'
import type { Zaim } from '@/client'
import {
	CreatePaymentParamsSchema,
	MoneyCreateResponseSchema,
	MoneyUpdateResponseSchema,
	UpdatePaymentParamsSchema,
} from '@/schemas'
import type { CreatePaymentParams, UpdatePaymentParams } from '@/types'

type PaymentCreateResponse = z.infer<typeof MoneyCreateResponseSchema>
type PaymentUpdateResponse = z.infer<typeof MoneyUpdateResponseSchema>

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

	/**
	 * Update payment data
	 *
	 * @see https://dev.zaim.net/home/api#money_put
	 *
	 * @param id - Payment record ID
	 * @param params - Payment update parameters
	 * @returns Payment update response including modification timestamp
	 * @throws {ZodError} If validation fails
	 *
	 * @example
	 * ```typescript
	 * const result = await zaim.payment.update(11820767, {
	 *   amount: 2000,
	 *   date: '2025-07-09'
	 * });
	 * console.log(result.money.modified); // Updated timestamp
	 * ```
	 */
	async update(
		id: number,
		params: UpdatePaymentParams,
	): Promise<PaymentUpdateResponse> {
		const { amount, date, fromAccountId, genreId, categoryId, comment } =
			UpdatePaymentParamsSchema.parse(params)

		const body: Record<string, string | number> = {
			mapping: 1,
			amount: amount,
			date: date,
		}

		if (fromAccountId !== undefined) body.from_account_id = fromAccountId
		if (genreId !== undefined) body.genre_id = genreId
		if (categoryId !== undefined) body.category_id = categoryId
		if (comment) body.comment = comment

		const response = await this.client
			.getHttpClient()
			.put(`/v2/home/money/payment/${id}`, body)
		return MoneyUpdateResponseSchema.parse(response)
	}
}
