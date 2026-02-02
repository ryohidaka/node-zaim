import { z } from 'zod'

export const AccountItemSchema: z.ZodPipe<
	z.ZodObject<
		{
			id: z.ZodNumber
			name: z.ZodString
			modified: z.ZodString
			sort: z.ZodNumber
			active: z.ZodNumber
			local_id: z.ZodNumber
			website_id: z.ZodNumber
			parent_account_id: z.ZodNumber
		},
		z.core.$strip
	>,
	z.ZodTransform<
		{
			id: number
			name: string
			modified: Date
			sort: number
			active: boolean
			localId: number
			websiteId: number | null
			parentAccountId: number | null
		},
		{
			id: number
			name: string
			modified: string
			sort: number
			active: number
			local_id: number
			website_id: number
			parent_account_id: number
		}
	>
> = z
	.object({
		id: z.number(),
		name: z.string(),
		modified: z.string(),
		sort: z.number(),
		active: z.number(),
		local_id: z.number(),
		website_id: z.number(),
		parent_account_id: z.number(),
	})
	.transform((data) => ({
		id: data.id,
		name: data.name,
		modified: new Date(data.modified),
		sort: data.sort,
		active: data.active === 1,
		localId: data.local_id,
		websiteId: data.website_id === 0 ? null : data.website_id,
		parentAccountId:
			data.parent_account_id === 0 ? null : data.parent_account_id,
	}))

export const AccountListResponseSchema: z.ZodObject<{
	accounts: z.ZodArray<
		z.ZodPipe<
			z.ZodObject<
				{
					id: z.ZodNumber
					name: z.ZodString
					modified: z.ZodString
					sort: z.ZodNumber
					active: z.ZodNumber
					local_id: z.ZodNumber
					website_id: z.ZodNumber
					parent_account_id: z.ZodNumber
				},
				z.core.$strip
			>,
			z.ZodTransform<
				{
					id: number
					name: string
					modified: Date
					sort: number
					active: boolean
					localId: number
					websiteId: number | null
					parentAccountId: number | null
				},
				{
					id: number
					name: string
					modified: string
					sort: number
					active: number
					local_id: number
					website_id: number
					parent_account_id: number
				}
			>
		>
	>
	requested: z.ZodNumber
}> = z.object({
	accounts: z.array(AccountItemSchema),
	requested: z.number(),
})
