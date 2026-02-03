import { z } from 'zod'

export const CurrencyItemSchema: z.ZodPipe<
	z.ZodObject<
		{
			currency_code: z.ZodString
			unit: z.ZodString
			name: z.ZodString
			point: z.ZodNumber
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			currencyCode: string
			unit: string
			name: string
			point: number
		},
		{
			currency_code: string
			unit: string
			name: string
			point: number
		}
	>
> = z
	.object({
		currency_code: z.string(),
		unit: z.string(),
		name: z.string(),
		point: z.number(),
	})
	.transform((data) => ({
		currencyCode: data.currency_code,
		unit: data.unit,
		name: data.name,
		point: data.point,
	}))

export const CurrencyListResponseSchema: z.ZodObject<{
	currencies: z.ZodArray<
		z.ZodPipe<
			z.ZodObject<
				{
					currency_code: z.ZodString
					unit: z.ZodString
					name: z.ZodString
					point: z.ZodNumber
				},
				z.core.$strip
			>,
			z.ZodTransform<
				{
					currencyCode: string
					unit: string
					name: string
					point: number
				},
				{
					currency_code: string
					unit: string
					name: string
					point: number
				}
			>
		>
	>
	requested: z.ZodNumber
}> = z.object({
	currencies: z.array(CurrencyItemSchema),
	requested: z.number(),
})
