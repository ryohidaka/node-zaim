import { z } from 'zod'

export const GenreItemSchema: z.ZodPipe<
	z.ZodObject<
		{
			id: z.ZodNumber
			name: z.ZodString
			sort: z.ZodNumber
			active: z.ZodNumber
			category_id: z.ZodNumber
			parent_genre_id: z.ZodNumber
			modified: z.ZodString
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			id: number
			name: string
			sort: number
			active: boolean
			categoryId: number
			parentGenreId: number
			modified: Date
		},
		{
			id: number
			name: string
			sort: number
			active: number
			category_id: number
			parent_genre_id: number
			modified: string
		}
	>
> = z
	.object({
		id: z.number(),
		name: z.string(),
		sort: z.number(),
		active: z.number(),
		category_id: z.number(),
		parent_genre_id: z.number(),
		modified: z.string(),
	})
	.transform((data) => ({
		id: data.id,
		name: data.name,
		sort: data.sort,
		active: data.active === 1,
		categoryId: data.category_id,
		parentGenreId: data.parent_genre_id,
		modified: new Date(data.modified),
	}))

export const GenreListResponseSchema: z.ZodObject<{
	genres: z.ZodArray<
		z.ZodPipe<
			z.ZodObject<
				{
					id: z.ZodNumber
					name: z.ZodString
					sort: z.ZodNumber
					active: z.ZodNumber
					category_id: z.ZodNumber
					parent_genre_id: z.ZodNumber
					modified: z.ZodString
				},
				z.core.$strip
			>,
			z.ZodTransform<
				{
					id: number
					name: string
					sort: number
					active: boolean
					categoryId: number
					parentGenreId: number
					modified: Date
				},
				{
					id: number
					name: string
					sort: number
					active: number
					category_id: number
					parent_genre_id: number
					modified: string
				}
			>
		>
	>
	requested: z.ZodNumber
}> = z.object({
	genres: z.array(GenreItemSchema),
	requested: z.number(),
})
