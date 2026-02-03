import type { z } from 'zod'
import type { Zaim } from '../client'
import { CurrencyListResponseSchema } from '../schemas'

export type CurrencyResponse = z.infer<typeof CurrencyListResponseSchema>

export class CurrencyApi {
	constructor(private client: Zaim) {}

	/**
	 * Showing the list of currencies
	 *
	 * @see https://dev.zaim.net/home/api#currency_get
	 *
	 * @returns the list of currencies
	 *
	 * @example
	 * ```typescript
	 * import { Zaim } from "node-zaim"
	 *
	 * const zaim = new Zaim({...});
	 *
	 * const currencies = await zaim.currency.list();
	 * console.log(currencies[0].currencyCode); // 'AUD'
	 * ```
	 */
	async list(): Promise<CurrencyResponse['currencies']> {
		const response = await this.client.getHttpClient().get('/v2/currency')
		const { currencies } = CurrencyListResponseSchema.parse(response)
		return currencies
	}
}
