import type z from 'zod'
import type {
	CreateIncomeParamsSchema,
	CreatePaymentParamsSchema,
	CreateTransferParamsSchema,
	MoneyQueryParamsSchema,
	UpdateIncomeParamsSchema,
	UpdatePaymentParamsSchema,
	UpdateTransferParamsSchema,
} from '@/schemas'

export type MoneyQueryParams = z.infer<typeof MoneyQueryParamsSchema>
export type CreatePaymentParams = z.infer<typeof CreatePaymentParamsSchema>
export type UpdatePaymentParams = z.infer<typeof UpdatePaymentParamsSchema>
export type CreateIncomeParams = z.infer<typeof CreateIncomeParamsSchema>
export type UpdateIncomeParams = z.infer<typeof UpdateIncomeParamsSchema>
export type CreateTransferParams = z.infer<typeof CreateTransferParamsSchema>
export type UpdateTransferParams = z.infer<typeof UpdateTransferParamsSchema>
