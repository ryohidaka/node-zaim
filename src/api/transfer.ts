import type z from 'zod'
import type { Zaim } from '@/client'
import {
	CreateTransferParamsSchema,
	MoneyCreateResponseSchema,
} from '@/schemas'
import type { CreateTransferParams } from '@/types'

type TransferCreateResponse = z.infer<typeof MoneyCreateResponseSchema>

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
}
