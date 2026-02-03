import type { z } from 'zod'
import {
	CategoryListResponseSchema,
	DefaultCategoryListResponseSchema,
} from '@/schemas'
import type { Zaim } from '../client'

export type CategoryResponse = z.infer<typeof CategoryListResponseSchema>
export type DefaultCategoryResponse = z.infer<
	typeof DefaultCategoryListResponseSchema
>

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

	/**
	 * Get default category list
	 *
	 * @see https://dev.zaim.net/home/api#category_get
	 *
	 * @param lang - Language code for the response (default: `'ja'`)
	 *
	 * @returns default category list
	 *
	 * @example
	 * ```typescript
	 * import { Zaim } from "node-zaim"
	 *
	 * const zaim = new Zaim({...});
	 *
	 * // Get default categories in Japanese
	 * const defaultCategories = await zaim.category.default();
	 * console.log(defaultCategories[0].name); // '食料品'
	 *
	 * // Get default categories in English
	 * const defaultCategoriesEn = await zaim.category.default('en');
	 * console.log(defaultCategoriesEn[0].name); // 'Food'
	 * ```
	 */
	async default(
		lang: string = 'ja',
	): Promise<DefaultCategoryResponse['categories']> {
		const response = await this.client
			.getHttpClient()
			.get(`/v2/category?lang=${lang}`)
		const { categories } = DefaultCategoryListResponseSchema.parse(response)
		return categories
	}
}
