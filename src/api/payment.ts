import type { Zaim } from '@/client'
import {
	CreatePaymentParamsSchema,
	MoneyCreateResponseSchema,
	MoneyDeleteResponseSchema,
	MoneyUpdateResponseSchema,
	UpdatePaymentParamsSchema,
} from '@/schemas'
import type {
	CreatePaymentParams,
	MoneyCreateResponse,
	MoneyDeleteResponse,
	MoneyUpdateResponse,
	UpdatePaymentParams,
} from '@/types'

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
	async create(params: CreatePaymentParams): Promise<MoneyCreateResponse> {
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
	): Promise<MoneyUpdateResponse> {
		const {
			amount,
			date,
			fromAccountId,
			genreId,
			categoryId,
			placeUid,
			comment,
		} = UpdatePaymentParamsSchema.parse(params)

		const body: Record<string, string | number> = {
			mapping: 1,
			amount: amount,
			date: date,
		}

		if (fromAccountId !== undefined) body.from_account_id = fromAccountId
		if (genreId !== undefined) body.genre_id = genreId
		if (categoryId !== undefined) body.category_id = categoryId
		if (placeUid !== undefined) body.place_uid = placeUid
		if (comment) body.comment = comment

		const response = await this.client
			.getHttpClient()
			.put(`/v2/home/money/payment/${id}`, body)
		return MoneyUpdateResponseSchema.parse(response)
	}

	/**
	 * Delete payment data
	 *
	 * @see https://dev.zaim.net/home/api#money_delete
	 *
	 * @param id - Payment record ID to delete
	 * @returns Payment deletion response
	 * @throws {Error} If the request fails
	 *
	 * @example
	 * ```typescript
	 * const result = await zaim.payment.delete(11820767);
	 * console.log(result.money.id); // 11820767
	 * ```
	 */
	async delete(id: number): Promise<MoneyDeleteResponse> {
		const response = await this.client
			.getHttpClient()
			.delete(`/v2/home/money/payment/${id}`)
		return MoneyDeleteResponseSchema.parse(response)
	}
}
