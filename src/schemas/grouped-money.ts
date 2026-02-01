import { z } from 'zod'
import { MoneyModeSchema } from './common'

export const GroupedMoneyDataItemSchema: z.ZodPipe<
	z.ZodObject<
		{
			id: z.ZodNumber
			category_id: z.ZodNumber
			genre_id: z.ZodNumber
			amount: z.ZodNumber
			comment: z.ZodString
			active: z.ZodNumber
			created: z.ZodString
			name: z.ZodString
			receipt_id: z.ZodNumber
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			id: number
			categoryId: number
			genreId: number
			amount: number
			comment: string | null
			active: boolean
			created: Date
			name: string
			receiptId: number
		},
		{
			id: number
			category_id: number
			genre_id: number
			amount: number
			comment: string
			active: number
			created: string
			name: string
			receipt_id: number
		}
	>
> = z
	.object({
		id: z.number(),
		category_id: z.number(),
		genre_id: z.number(),
		amount: z.number(),
		comment: z.string(),
		active: z.number(),
		created: z.string(),
		name: z.string(),
		receipt_id: z.number(),
	})
	.transform((data) => ({
		id: data.id,
		categoryId: data.category_id,
		genreId: data.genre_id,
		amount: data.amount,
		comment: data.comment === '' ? null : data.comment,
		active: data.active === 1,
		created: new Date(data.created),
		name: data.name,
		receiptId: data.receipt_id,
	}))

export const GroupedMoneyItemSchema: z.ZodPipe<
	z.ZodObject<
		{
			amount: z.ZodNumber
			to_account_id: z.ZodNumber
			from_account_id: z.ZodNumber
			date: z.ZodString
			receipt_id: z.ZodNumber
			mode: z.ZodEnum<{
				income: 'income'
				payment: 'payment'
				transfer: 'transfer'
			}>
			place_uid: z.ZodString
			category_id: z.ZodNumber
			genre_id: z.ZodNumber
			currency_code: z.ZodString
			data: z.ZodOptional<
				z.ZodArray<
					z.ZodPipe<
						z.ZodObject<
							{
								id: z.ZodNumber
								category_id: z.ZodNumber
								genre_id: z.ZodNumber
								amount: z.ZodNumber
								comment: z.ZodString
								active: z.ZodNumber
								created: z.ZodString
								name: z.ZodString
								receipt_id: z.ZodNumber
							},
							z.core.$strip
						>,
						z.ZodTransform<
							{
								id: number
								categoryId: number
								genreId: number
								amount: number
								comment: string | null
								active: boolean
								created: Date
								name: string
								receiptId: number
							},
							{
								id: number
								category_id: number
								genre_id: number
								amount: number
								comment: string
								active: number
								created: string
								name: string
								receipt_id: number
							}
						>
					>
				>
			>
			place: z.ZodString
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			amount: number
			toAccountId: number | null
			fromAccountId: number | null
			date: string
			receiptId: number
			mode: 'income' | 'payment' | 'transfer'
			placeUid: string | null
			categoryId: number
			genreId: number
			currencyCode: string
			data:
				| {
						id: number
						categoryId: number
						genreId: number
						amount: number
						comment: string | null
						active: boolean
						created: Date
						name: string
						receiptId: number
				  }[]
				| undefined
			place: string | null
		},
		{
			amount: number
			to_account_id: number
			from_account_id: number
			date: string
			receipt_id: number
			mode: 'income' | 'payment' | 'transfer'
			place_uid: string
			category_id: number
			genre_id: number
			currency_code: string
			place: string
			data?:
				| {
						id: number
						categoryId: number
						genreId: number
						amount: number
						comment: string | null
						active: boolean
						created: Date
						name: string
						receiptId: number
				  }[]
				| undefined
		}
	>
> = z
	.object({
		amount: z.number(),
		to_account_id: z.number(),
		from_account_id: z.number(),
		date: z.string(),
		receipt_id: z.number(),
		mode: MoneyModeSchema,
		place_uid: z.string(),
		category_id: z.number(),
		genre_id: z.number(),
		currency_code: z.string(),
		data: z.array(GroupedMoneyDataItemSchema).optional(),
		place: z.string(),
	})
	.transform((data) => ({
		amount: data.amount,
		toAccountId: data.to_account_id === 0 ? null : data.to_account_id,
		fromAccountId: data.from_account_id === 0 ? null : data.from_account_id,
		date: data.date,
		receiptId: data.receipt_id,
		mode: data.mode,
		placeUid: data.place_uid === '' ? null : data.place_uid,
		categoryId: data.category_id,
		genreId: data.genre_id,
		currencyCode: data.currency_code,
		data: data.data,
		place: data.place === '' ? null : data.place,
	}))

export const GroupedMoneyListResponseSchema: z.ZodObject<
	{
		money: z.ZodArray<
			z.ZodPipe<
				z.ZodObject<
					{
						amount: z.ZodNumber
						to_account_id: z.ZodNumber
						from_account_id: z.ZodNumber
						date: z.ZodString
						receipt_id: z.ZodNumber
						mode: z.ZodEnum<{
							income: 'income'
							payment: 'payment'
							transfer: 'transfer'
						}>
						place_uid: z.ZodString
						category_id: z.ZodNumber
						genre_id: z.ZodNumber
						currency_code: z.ZodString
						data: z.ZodOptional<
							z.ZodArray<
								z.ZodPipe<
									z.ZodObject<
										{
											id: z.ZodNumber
											category_id: z.ZodNumber
											genre_id: z.ZodNumber
											amount: z.ZodNumber
											comment: z.ZodString
											active: z.ZodNumber
											created: z.ZodString
											name: z.ZodString
											receipt_id: z.ZodNumber
										},
										z.core.$strip
									>,
									z.ZodTransform<
										{
											id: number
											categoryId: number
											genreId: number
											amount: number
											comment: string | null
											active: boolean
											created: Date
											name: string
											receiptId: number
										},
										{
											id: number
											category_id: number
											genre_id: number
											amount: number
											comment: string
											active: number
											created: string
											name: string
											receipt_id: number
										}
									>
								>
							>
						>
						place: z.ZodString
					},
					z.core.$strip
				>,
				z.ZodTransform<
					{
						amount: number
						toAccountId: number | null
						fromAccountId: number | null
						date: string
						receiptId: number
						mode: 'income' | 'payment' | 'transfer'
						placeUid: string | null
						categoryId: number
						genreId: number
						currencyCode: string
						data:
							| {
									id: number
									categoryId: number
									genreId: number
									amount: number
									comment: string | null
									active: boolean
									created: Date
									name: string
									receiptId: number
							  }[]
							| undefined
						place: string | null
					},
					{
						amount: number
						to_account_id: number
						from_account_id: number
						date: string
						receipt_id: number
						mode: 'income' | 'payment' | 'transfer'
						place_uid: string
						category_id: number
						genre_id: number
						currency_code: string
						place: string
						data?:
							| {
									id: number
									categoryId: number
									genreId: number
									amount: number
									comment: string | null
									active: boolean
									created: Date
									name: string
									receiptId: number
							  }[]
							| undefined
					}
				>
			>
		>
		requested: z.ZodNumber
	},
	z.core.$strip
> = z.object({
	money: z.array(GroupedMoneyItemSchema),
	requested: z.number(),
})
