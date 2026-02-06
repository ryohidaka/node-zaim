import z from 'zod'
import { MoneyModeSchema } from './common'

export const PlaceSchema: z.ZodPipe<
	z.ZodObject<
		{
			id: z.ZodNumber
			user_id: z.ZodNumber
			genre_id: z.ZodNumber
			category_id: z.ZodNumber
			account_id: z.ZodNumber
			mode: z.ZodEnum<{
				income: 'income'
				payment: 'payment'
				transfer: 'transfer'
			}>
			place_uid: z.ZodString
			service: z.ZodString
			name: z.ZodString
			original_name: z.ZodString
			tel: z.ZodOptional<z.ZodString>
			count: z.ZodNumber
			calc_flag: z.ZodNumber
			place_pattern_id: z.ZodNumber
			transfer_account_id: z.ZodNumber
			edit_flag: z.ZodNumber
			active: z.ZodNumber
			modified: z.ZodOptional<z.ZodString>
			created: z.ZodString
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			id: number
			userId: number
			genreId: number
			categoryId: number
			accountId: number | null
			mode: 'income' | 'payment' | 'transfer'
			placeUid: string
			service: string
			name: string
			originalName: string
			tel: string | null | undefined
			count: number
			calcFlag: number
			placePatternId: number | null
			transferAccountId: number | null
			editFlag: boolean
			active: boolean
			modified: Date | undefined
			created: Date
		},
		{
			id: number
			user_id: number
			genre_id: number
			category_id: number
			account_id: number
			mode: 'income' | 'payment' | 'transfer'
			place_uid: string
			service: string
			name: string
			original_name: string
			count: number
			calc_flag: number
			place_pattern_id: number
			transfer_account_id: number
			edit_flag: number
			active: number
			created: string
			tel?: string | undefined
			modified?: string | undefined
		}
	>
> = z
	.object({
		id: z.number(),
		user_id: z.number(),
		genre_id: z.number(),
		category_id: z.number(),
		account_id: z.number(),
		mode: MoneyModeSchema,
		place_uid: z.string(),
		service: z.string(),
		name: z.string(),
		original_name: z.string(),
		tel: z.string().optional(),
		count: z.number(),
		calc_flag: z.number(),
		place_pattern_id: z.number(),
		transfer_account_id: z.number(),
		edit_flag: z.number(),
		active: z.number(),
		modified: z.string().optional(),
		created: z.string(),
	})
	.transform((data) => ({
		id: data.id,
		userId: data.user_id,
		genreId: data.genre_id,
		categoryId: data.category_id,
		accountId: data.account_id === 0 ? null : data.account_id,
		mode: data.mode,
		placeUid: data.place_uid,
		service: data.service,
		name: data.name,
		originalName: data.original_name,
		tel: data.tel === '' ? null : data.tel,
		count: data.count,
		calcFlag: data.calc_flag,
		placePatternId: data.place_pattern_id === 0 ? null : data.place_pattern_id,
		transferAccountId:
			data.transfer_account_id === 0 ? null : data.transfer_account_id,
		editFlag: data.edit_flag === 1,
		active: data.active === 1,
		modified: data.modified ? new Date(data.modified) : undefined,
		created: new Date(data.created),
	}))
