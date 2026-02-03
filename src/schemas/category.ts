import { z } from 'zod'
import { MoneyModeSchema } from './common'

export const CategoryItemSchema: z.ZodPipe<
	z.ZodObject<
		{
			id: z.ZodNumber
			name: z.ZodString
			mode: z.ZodEnum<{
				income: 'income'
				payment: 'payment'
				transfer: 'transfer'
			}>
			sort: z.ZodNumber
			parent_category_id: z.ZodNumber
			active: z.ZodNumber
			modified: z.ZodString
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			id: number
			name: string
			mode: 'income' | 'payment' | 'transfer'
			sort: number
			parentCategoryId: number
			active: boolean
			modified: Date
		},
		{
			id: number
			name: string
			mode: 'income' | 'payment' | 'transfer'
			sort: number
			parent_category_id: number
			active: number
			modified: string
		}
	>
> = z
	.object({
		id: z.number(),
		name: z.string(),
		mode: MoneyModeSchema,
		sort: z.number(),
		parent_category_id: z.number(),
		active: z.number(),
		modified: z.string(),
	})
	.transform((data) => ({
		id: data.id,
		name: data.name,
		mode: data.mode,
		sort: data.sort,
		parentCategoryId: data.parent_category_id,
		active: data.active === 1,
		modified: new Date(data.modified),
	}))

export const CategoryListResponseSchema: z.ZodObject<{
	categories: z.ZodArray<
		z.ZodPipe<
			z.ZodObject<
				{
					id: z.ZodNumber
					name: z.ZodString
					mode: z.ZodEnum<{
						income: 'income'
						payment: 'payment'
						transfer: 'transfer'
					}>
					sort: z.ZodNumber
					parent_category_id: z.ZodNumber
					active: z.ZodNumber
					modified: z.ZodString
				},
				z.core.$strip
			>,
			z.ZodTransform<
				{
					id: number
					name: string
					mode: 'income' | 'payment' | 'transfer'
					sort: number
					parentCategoryId: number
					active: boolean
					modified: Date
				},
				{
					id: number
					name: string
					mode: 'income' | 'payment' | 'transfer'
					sort: number
					parent_category_id: number
					active: number
					modified: string
				}
			>
		>
	>
	requested: z.ZodNumber
}> = z.object({
	categories: z.array(CategoryItemSchema),
	requested: z.number(),
})

export const DefaultCategoryItemSchema: z.ZodObject<{
	id: z.ZodNumber
	mode: z.ZodEnum<{
		income: 'income'
		payment: 'payment'
		transfer: 'transfer'
	}>
	name: z.ZodString
}> = z.object({
	id: z.number(),
	mode: MoneyModeSchema,
	name: z.string(),
})

export const DefaultCategoryListResponseSchema: z.ZodObject<{
	categories: z.ZodArray<
		z.ZodObject<
			{
				id: z.ZodNumber
				mode: z.ZodEnum<{
					income: 'income'
					payment: 'payment'
					transfer: 'transfer'
				}>
				name: z.ZodString
			},
			z.core.$strip
		>
	>
	requested: z.ZodNumber
}> = z.object({
	categories: z.array(DefaultCategoryItemSchema),
	requested: z.number(),
})
