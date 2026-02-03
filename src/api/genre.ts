import type { z } from 'zod'
import {
	DefaultGenreListResponseSchema,
	GenreListResponseSchema,
} from '@/schemas'
import type { Zaim } from '../client'

export type GenreResponse = z.infer<typeof GenreListResponseSchema>
export type DefaultGenreResponse = z.infer<
	typeof DefaultGenreListResponseSchema
>

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

	/**
	 * Get default genre list
	 *
	 * @see https://dev.zaim.net/home/api#genre_get
	 *
	 * @param lang - Language code for the response (default: `'ja'`)
	 *
	 * @returns default genre list
	 *
	 * @example
	 * ```typescript
	 * import { Zaim } from "node-zaim"
	 *
	 * const zaim = new Zaim({...});
	 *
	 * // Get default genres in Japanese
	 * const defaultGenres = await zaim.genre.default();
	 * console.log(defaultGenres[0].name); // '食料品'
	 *
	 * // Get default genres in English
	 * const defaultGenresEn = await zaim.genre.default('en');
	 * console.log(defaultGenresEn[0].name); // 'Geocery'
	 * ```
	 */
	async default(lang: string = 'ja'): Promise<DefaultGenreResponse['genres']> {
		const response = await this.client
			.getHttpClient()
			.get(`/v2/genre?lang=${lang}`)
		const { genres } = DefaultGenreListResponseSchema.parse(response)
		return genres
	}
}
