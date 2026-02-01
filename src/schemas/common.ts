import z from 'zod'

export const MoneyModeSchema: z.ZodEnum<{
	income: 'income'
	payment: 'payment'
	transfer: 'transfer'
}> = z.enum(['income', 'payment', 'transfer'])
