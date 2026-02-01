import type { z } from 'zod'
import { GenreListResponseSchema } from '@/schemas'
import type { Zaim } from '../client'

export type GenreResponse = z.infer<typeof GenreListResponseSchema>

export class GenreApi {
	constructor(private client: Zaim) {}

	/**
	 * Showing the list of your genres
	 *
	 * @see https://dev.zaim.net/home/api#genre_home_get
	 *
	 * @returns the list of your genres
	 *
	 * @example
	 * ```typescript
	 * import { Zaim } from "node-zaim"
	 *
	 * const zaim = new Zaim({...});
	 *
	 * const genres = await zaim.genre.list();
	 * console.log(genres[0].name); // 'Geocery'
	 * ```
	 */
	async list(): Promise<GenreResponse['genres']> {
		const response = await this.client.getHttpClient().get('/v2/home/genre')
		const { genres } = GenreListResponseSchema.parse(response)
		return genres
	}
}
