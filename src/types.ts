import type z from 'zod'
import type {
	CreatePaymentParamsSchema,
	MoneyQueryParamsSchema,
	UpdatePaymentParamsSchema,
} from '@/schemas'

export type MoneyQueryParams = z.infer<typeof MoneyQueryParamsSchema>
export type CreatePaymentParams = z.infer<typeof CreatePaymentParamsSchema>
export type UpdatePaymentParams = z.infer<typeof UpdatePaymentParamsSchema>
