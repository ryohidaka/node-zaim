import type z from 'zod'
import type {
	AccountListResponseSchema,
	CategoryListResponseSchema,
	CreateIncomeParamsSchema,
	CreatePaymentParamsSchema,
	CreateTransferParamsSchema,
	CurrencyListResponseSchema,
	DefaultAccountListResponseSchema,
	DefaultCategoryListResponseSchema,
	DefaultGenreListResponseSchema,
	GenreListResponseSchema,
	GroupedMoneyListResponseSchema,
	MoneyCreateResponseSchema,
	MoneyDeleteResponseSchema,
	MoneyListResponseSchema,
	MoneyQueryParamsSchema,
	MoneyUpdateResponseSchema,
	UpdateIncomeParamsSchema,
	UpdatePaymentParamsSchema,
	UpdateTransferParamsSchema,
	VerifyResponseSchema,
} from '@/schemas'

// --- Query params ---
export type MoneyQueryParams = z.infer<typeof MoneyQueryParamsSchema>
export type CreatePaymentParams = z.infer<typeof CreatePaymentParamsSchema>
export type UpdatePaymentParams = z.infer<typeof UpdatePaymentParamsSchema>
export type CreateIncomeParams = z.infer<typeof CreateIncomeParamsSchema>
export type UpdateIncomeParams = z.infer<typeof UpdateIncomeParamsSchema>
export type CreateTransferParams = z.infer<typeof CreateTransferParamsSchema>
export type UpdateTransferParams = z.infer<typeof UpdateTransferParamsSchema>

// --- Item types ---
export type Account = z.infer<
	typeof AccountListResponseSchema
>['accounts'][number]
export type DefaultAccount = z.infer<
	typeof DefaultAccountListResponseSchema
>['accounts'][number]
export type Category = z.infer<
	typeof CategoryListResponseSchema
>['categories'][number]
export type DefaultCategory = z.infer<
	typeof DefaultCategoryListResponseSchema
>['categories'][number]
export type Currency = z.infer<
	typeof CurrencyListResponseSchema
>['currencies'][number]
export type Genre = z.infer<typeof GenreListResponseSchema>['genres'][number]
export type DefaultGenre = z.infer<
	typeof DefaultGenreListResponseSchema
>['genres'][number]
export type Money = z.infer<typeof MoneyListResponseSchema>['money'][number]
export type GroupedMoney = z.infer<
	typeof GroupedMoneyListResponseSchema
>['money'][number]
export type MoneyCreateResponse = z.infer<typeof MoneyCreateResponseSchema>
export type MoneyUpdateResponse = z.infer<typeof MoneyUpdateResponseSchema>
export type MoneyDeleteResponse = z.infer<typeof MoneyDeleteResponseSchema>
export type User = z.infer<typeof VerifyResponseSchema>['me']
