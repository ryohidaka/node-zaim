import type z from 'zod'
import type { Zaim } from '@/client'
import {
	CreateTransferParamsSchema,
	MoneyCreateResponseSchema,
	MoneyDeleteResponseSchema,
	MoneyUpdateResponseSchema,
	UpdateTransferParamsSchema,
} from '@/schemas'
import type { CreateTransferParams, UpdateTransferParams } from '@/types'

type TransferCreateResponse = z.infer<typeof MoneyCreateResponseSchema>
type TransferUpdateResponse = z.infer<typeof MoneyUpdateResponseSchema>
type TransferDeleteResponse = z.infer<typeof MoneyDeleteResponseSchema>

export class TransferApi {
	constructor(private client: Zaim) {}

	/**
	 * Input transfer data
	 *
	 * @param params - Transfer parameters
	 * @returns Transfer creation response including money ID and modification timestamp
	 * @throws {ZodError} If validation fails
	 *
	 * @example
	 * ```typescript
	 * const result = await zaim.transfer.create({
	 *   amount: 50000,
	 *   date: '2025-07-08',
	 *   fromAccountId: 1,
	 *   toAccountId: 2
	 * });
	 * console.log(result.money.id); // 11820767
	 * ```
	 */
	async create(params: CreateTransferParams): Promise<TransferCreateResponse> {
		const { amount, date, fromAccountId, toAccountId, comment } =
			CreateTransferParamsSchema.parse(params)

		const body: Record<string, string | number> = {
			mapping: 1,
			amount: amount,
			date: date,
			from_account_id: fromAccountId,
			to_accountId: toAccountId,
		}

		if (comment) body.comment = comment

		const response = await this.client
			.getHttpClient()
			.post('/v2/home/money/transfer', body)
		return MoneyCreateResponseSchema.parse(response)
	}

	/**
	 * Update transfer data
	 *
	 * @param id - Transfer record ID
	 * @param params - Transfer update parameters
	 * @returns Transfer update response including modification timestamp
	 * @throws {ZodError} If validation fails
	 *
	 * @example
	 * ```typescript
	 * const result = await zaim.transfer.update(11820767, {
	 *   amount: 60000,
	 *   date: '2025-07-09'
	 * });
	 * console.log(result.money.modified); // Updated timestamp
	 * ```
	 */
	async update(
		id: number,
		params: UpdateTransferParams,
	): Promise<TransferUpdateResponse> {
		const { amount, date, comment } = UpdateTransferParamsSchema.parse(params)

		const body: Record<string, string | number> = {
			mapping: 1,
			amount: amount,
			date: date,
		}

		if (comment) body.comment = comment

		const response = await this.client
			.getHttpClient()
			.put(`/v2/home/money/transfer/${id}`, body)
		return MoneyUpdateResponseSchema.parse(response)
	}

	/**
	 * Delete a transfer record
	 *
	 * @param id - Transfer record ID to delete
	 * @returns Transfer deletion response
	 * @throws {Error} If the request fails
	 *
	 * @example
	 * ```typescript
	 * const result = await zaim.transfer.delete(11820767);
	 * console.log(result.money.id); // 11820767
	 * ```
	 */
	async delete(id: number): Promise<TransferDeleteResponse> {
		const response = await this.client
			.getHttpClient()
			.delete(`/v2/home/money/transfer/${id}`)
		return MoneyDeleteResponseSchema.parse(response)
	}
}
