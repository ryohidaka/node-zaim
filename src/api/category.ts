import type { z } from 'zod'
import { CategoryListResponseSchema } from '@/schemas'
import type { Zaim } from '../client'

export type CategoryResponse = z.infer<typeof CategoryListResponseSchema>

export class CategoryApi {
	constructor(private client: Zaim) {}

	/**
	 * Showing the list of your categories
	 *
	 * @see https://dev.zaim.net/home/api#category_home_get
	 *
	 * @returns the list of your categories
	 *
	 * @example
	 * ```typescript
	 * import { Zaim } from "node-zaim"
	 *
	 * const zaim = new Zaim({...});
	 *
	 * const categories = await zaim.category.list();
	 * console.log(categories[0].name); // 'Food'
	 * ```
	 */
	async list(): Promise<CategoryResponse['categories']> {
		const response = await this.client.getHttpClient().get('/v2/home/category')
		const { categories } = CategoryListResponseSchema.parse(response)
		return categories
	}
}
