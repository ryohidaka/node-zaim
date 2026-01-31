import { z } from 'zod'

export const ZaimUserSchema: z.ZodPipe<
	z.ZodObject<
		{
			id: z.ZodNumber
			login: z.ZodString
			name: z.ZodString
			input_count: z.ZodNumber
			day_count: z.ZodNumber
			repeat_count: z.ZodNumber
			day: z.ZodNumber
			week: z.ZodNumber
			month: z.ZodNumber
			currency_code: z.ZodString
			profile_image_url: z.ZodString
			cover_image_url: z.ZodString
			profile_modified: z.ZodString
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			id: number
			login: string
			name: string
			inputCount: number
			dayCount: number
			repeatCount: number
			day: number
			week: number
			month: number
			currencyCode: string
			profileImageUrl: string
			coverImageUrl: string
			profileModified: Date
		},
		{
			id: number
			login: string
			name: string
			input_count: number
			day_count: number
			repeat_count: number
			day: number
			week: number
			month: number
			currency_code: string
			profile_image_url: string
			cover_image_url: string
			profile_modified: string
		}
	>
> = z
	.object({
		id: z.number(),
		login: z.string(),
		name: z.string(),
		input_count: z.number(),
		day_count: z.number(),
		repeat_count: z.number(),
		day: z.number(),
		week: z.number(),
		month: z.number(),
		currency_code: z.string(),
		profile_image_url: z.string(),
		cover_image_url: z.string(),
		profile_modified: z.string(),
	})
	.transform((data) => ({
		id: data.id,
		login: data.login,
		name: data.name,
		inputCount: data.input_count,
		dayCount: data.day_count,
		repeatCount: data.repeat_count,
		day: data.day,
		week: data.week,
		month: data.month,
		currencyCode: data.currency_code,
		profileImageUrl: data.profile_image_url,
		coverImageUrl: data.cover_image_url,
		profileModified: new Date(data.profile_modified),
	}))

export const VerifyResponseSchema: z.ZodObject<
	{
		me: z.ZodPipe<
			z.ZodObject<
				{
					id: z.ZodNumber
					login: z.ZodString
					name: z.ZodString
					input_count: z.ZodNumber
					day_count: z.ZodNumber
					repeat_count: z.ZodNumber
					day: z.ZodNumber
					week: z.ZodNumber
					month: z.ZodNumber
					currency_code: z.ZodString
					profile_image_url: z.ZodString
					cover_image_url: z.ZodString
					profile_modified: z.ZodString
				},
				z.core.$strip
			>,
			z.ZodTransform<
				{
					id: number
					login: string
					name: string
					inputCount: number
					dayCount: number
					repeatCount: number
					day: number
					week: number
					month: number
					currencyCode: string
					profileImageUrl: string
					coverImageUrl: string
					profileModified: Date
				},
				{
					id: number
					login: string
					name: string
					input_count: number
					day_count: number
					repeat_count: number
					day: number
					week: number
					month: number
					currency_code: string
					profile_image_url: string
					cover_image_url: string
					profile_modified: string
				}
			>
		>
		requested: z.ZodNumber
	},
	z.core.$strip
> = z.object({
	me: ZaimUserSchema,
	requested: z.number(),
})
