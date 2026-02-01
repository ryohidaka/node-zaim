import { z } from 'zod'
import { MoneyModeSchema } from './common'

export const MoneyItemSchema: z.ZodPipe<
	z.ZodObject<
		{
			id: z.ZodNumber
			mode: z.ZodEnum<{
				income: 'income'
				payment: 'payment'
				transfer: 'transfer'
			}>
			user_id: z.ZodNumber
			date: z.ZodString
			category_id: z.ZodNumber
			genre_id: z.ZodNumber
			to_account_id: z.ZodNumber
			from_account_id: z.ZodNumber
			amount: z.ZodNumber
			comment: z.ZodString
			active: z.ZodNumber
			name: z.ZodString
			receipt_id: z.ZodNumber
			place: z.ZodString
			place_uid: z.ZodString
			created: z.ZodString
			currency_code: z.ZodString
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			id: number
			mode: 'income' | 'payment' | 'transfer'
			userId: number
			date: string
			categoryId: number
			genreId: number
			toAccountId: number | null
			fromAccountId: number | null
			amount: number
			comment: string | null
			active: boolean
			name: string
			receiptId: number
			place: string | null
			placeUid: string | null
			created: Date
			currencyCode: string
		},
		{
			id: number
			mode: 'income' | 'payment' | 'transfer'
			user_id: number
			date: string
			category_id: number
			genre_id: number
			to_account_id: number
			from_account_id: number
			amount: number
			comment: string
			active: number
			name: string
			receipt_id: number
			place: string
			place_uid: string
			created: string
			currency_code: string
		}
	>
> = z
	.object({
		id: z.number(),
		mode: MoneyModeSchema,
		user_id: z.number(),
		date: z.string(),
		category_id: z.number(),
		genre_id: z.number(),
		to_account_id: z.number(),
		from_account_id: z.number(),
		amount: z.number(),
		comment: z.string(),
		active: z.number(),
		name: z.string(),
		receipt_id: z.number(),
		place: z.string(),
		place_uid: z.string(),
		created: z.string(),
		currency_code: z.string(),
	})
	.transform((data) => ({
		id: data.id,
		mode: data.mode,
		userId: data.user_id,
		date: data.date,
		categoryId: data.category_id,
		genreId: data.genre_id,
		toAccountId: data.to_account_id === 0 ? null : data.to_account_id,
		fromAccountId: data.from_account_id === 0 ? null : data.from_account_id,
		amount: data.amount,
		comment: data.comment === '' ? null : data.comment,
		active: data.active === 1,
		name: data.name,
		receiptId: data.receipt_id,
		place: data.place === '' ? null : data.place,
		placeUid: data.place_uid === '' ? null : data.place_uid,
		created: new Date(data.created),
		currencyCode: data.currency_code,
	}))

export const MoneyListResponseSchema: z.ZodObject<{
	money: z.ZodArray<
		z.ZodPipe<
			z.ZodObject<
				{
					id: z.ZodNumber
					mode: z.ZodEnum<{
						income: 'income'
						payment: 'payment'
						transfer: 'transfer'
					}>
					user_id: z.ZodNumber
					date: z.ZodString
					category_id: z.ZodNumber
					genre_id: z.ZodNumber
					to_account_id: z.ZodNumber
					from_account_id: z.ZodNumber
					amount: z.ZodNumber
					comment: z.ZodString
					active: z.ZodNumber
					name: z.ZodString
					receipt_id: z.ZodNumber
					place: z.ZodString
					place_uid: z.ZodString
					created: z.ZodString
					currency_code: z.ZodString
				},
				z.core.$strip
			>,
			z.ZodTransform<
				{
					id: number
					mode: 'income' | 'payment' | 'transfer'
					userId: number
					date: string
					categoryId: number
					genreId: number
					toAccountId: number | null
					fromAccountId: number | null
					amount: number
					comment: string | null
					active: boolean
					name: string
					receiptId: number
					place: string | null
					placeUid: string | null
					created: Date
					currencyCode: string
				},
				{
					id: number
					mode: 'income' | 'payment' | 'transfer'
					user_id: number
					date: string
					category_id: number
					genre_id: number
					to_account_id: number
					from_account_id: number
					amount: number
					comment: string
					active: number
					name: string
					receipt_id: number
					place: string
					place_uid: string
					created: string
					currency_code: string
				}
			>
		>
	>
	requested: z.ZodNumber
}> = z.object({
	money: z.array(MoneyItemSchema),
	requested: z.number(),
})

export const MoneyQueryParamsSchema: z.ZodObject<{
	categoryId: z.ZodOptional<z.ZodNumber>
	genreId: z.ZodOptional<z.ZodNumber>
	mode: z.ZodOptional<
		z.ZodEnum<{
			income: 'income'
			payment: 'payment'
			transfer: 'transfer'
		}>
	>
	order: z.ZodOptional<
		z.ZodEnum<{
			date: 'date'
			id: 'id'
		}>
	>
	startDate: z.ZodOptional<z.ZodString>
	endDate: z.ZodOptional<z.ZodString>
	page: z.ZodOptional<z.ZodNumber>
	limit: z.ZodOptional<z.ZodNumber>
}> = z.object({
	/** narrow down by category_id */
	categoryId: z
		.number()
		.positive('categoryId must be a positive number')
		.optional(),
	/** narrow down by genre_id */
	genreId: z.number().positive('genreId must be a positive number').optional(),
	/** narrow down by type (`payment` or `income` or `transfer`) */
	mode: z.enum(['payment', 'income', 'transfer']).optional(),
	/** sort by id or date (default : `date`) */
	order: z.enum(['id', 'date']).optional(),
	/** the first date (`Y-m-d` format) */
	startDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'startDate must be in YYYY-MM-DD format')
		.optional(),
	/** the last date (`Y-m-d` format) */
	endDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'endDate must be in YYYY-MM-DD format')
		.optional(),
	/** number of current page (default `1`) */
	page: z.number().int().positive('page must be a positive number').optional(),
	/** number of items per page (default `20`, max `100`) */
	limit: z
		.number()
		.int()
		.min(1, 'limit must be between 1 and 100')
		.max(100, 'limit must be between 1 and 100')
		.optional(),
})
