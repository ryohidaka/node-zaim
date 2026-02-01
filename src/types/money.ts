import type z from 'zod'
import type { MoneyQueryParamsSchema } from '@/schemas'

export type MoneyQueryParams = z.infer<typeof MoneyQueryParamsSchema>
