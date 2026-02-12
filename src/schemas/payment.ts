import z from 'zod'

export const CreatePaymentParamsSchema: z.ZodObject<{
	categoryId: z.ZodNumber
	genreId: z.ZodNumber
	amount: z.ZodNumber
	date: z.ZodString
	fromAccountId: z.ZodOptional<z.ZodNumber>
	comment: z.ZodOptional<z.ZodString>
	name: z.ZodOptional<z.ZodString>
	place: z.ZodOptional<z.ZodString>
}> = z.object({
	categoryId: z.number().positive('categoryId must be a positive number'),
	genreId: z.number().positive('genreId must be a positive number'),
	amount: z.number().positive('amount must be a positive number'),
	date: z
		.string()
		.refine(
			(dateStr) => {
				const date = new Date(dateStr)
				return !Number.isNaN(date.getTime())
			},
			{ message: 'invalid date format' },
		)
		.refine(
			(dateStr) => {
				const date = new Date(dateStr)
				const now = new Date()
				const fiveYearsAgo = new Date(now)
				fiveYearsAgo.setFullYear(now.getFullYear() - 5)
				return date >= fiveYearsAgo
			},
			{ message: 'date must not be more than 5 years in the past' },
		)
		.refine(
			(dateStr) => {
				const date = new Date(dateStr)
				const now = new Date()
				const fiveYearsLater = new Date(now)
				fiveYearsLater.setFullYear(now.getFullYear() + 5)
				return date <= fiveYearsLater
			},
			{ message: 'date must not be more than 5 years in the future' },
		),
	fromAccountId: z
		.number()
		.positive('fromAccountId must be a positive number')
		.optional(),
	comment: z
		.string()
		.max(100, 'comment must not exceed 100 characters')
		.optional(),
	name: z.string().max(100, 'name must not exceed 100 characters').optional(),
	place: z.string().max(100, 'place must not exceed 100 characters').optional(),
})

export const UpdatePaymentParamsSchema: z.ZodObject<{
	amount: z.ZodNumber
	date: z.ZodString
	fromAccountId: z.ZodOptional<z.ZodNumber>
	genreId: z.ZodOptional<z.ZodNumber>
	categoryId: z.ZodOptional<z.ZodNumber>
	placeUid: z.ZodOptional<z.ZodString>
	comment: z.ZodOptional<z.ZodString>
}> = z.object({
	amount: z.number().positive('amount must be a positive number'),
	date: z
		.string()
		.refine(
			(dateStr) => {
				const date = new Date(dateStr)
				return !Number.isNaN(date.getTime())
			},
			{ message: 'invalid date format' },
		)
		.refine(
			(dateStr) => {
				const date = new Date(dateStr)
				const now = new Date()
				const fiveYearsAgo = new Date(now)
				fiveYearsAgo.setFullYear(now.getFullYear() - 5)
				return date >= fiveYearsAgo
			},
			{ message: 'date must not be more than 5 years in the past' },
		)
		.refine(
			(dateStr) => {
				const date = new Date(dateStr)
				const now = new Date()
				const fiveYearsLater = new Date(now)
				fiveYearsLater.setFullYear(now.getFullYear() + 5)
				return date <= fiveYearsLater
			},
			{ message: 'date must not be more than 5 years in the future' },
		),
	fromAccountId: z
		.number()
		.positive('fromAccountId must be a positive number')
		.optional(),
	genreId: z.number().positive('genreId must be a positive number').optional(),
	categoryId: z
		.number()
		.positive('categoryId must be a positive number')
		.optional(),
	placeUid: z.string().optional(),
	comment: z
		.string()
		.max(100, 'comment must not exceed 100 characters')
		.optional(),
})
