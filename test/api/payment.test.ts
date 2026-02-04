import { describe, expect, test } from 'bun:test'
import { type CreatePaymentParams, Zaim } from '../../src'
import { MockOAuthClient } from '../mocks'

describe('PaymentApi', () => {
	describe('create', () => {
		test('should create payment successfully without place', async () => {
			const now = new Date()
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				stamps: null,
				banners: [],
				money: {
					id: 11820767,
					modified: now.toISOString(),
				},
				user: {
					input_count: 12,
					data_modified: now.toISOString(),
				},
				requested: Math.floor(now.getTime() / 1000),
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/home/money/payment',
				mockResponse,
			)

			const zaim = new Zaim({
				consumerKey: 'test-key',
				consumerSecret: 'test-secret',
				accessToken: 'test-token',
				accessTokenSecret: 'test-secret',
				oauthClient: mockOAuth.asOAuth(),
			})

			// Act
			const params: CreatePaymentParams = {
				categoryId: 101,
				genreId: 10101,
				amount: 1,
				date: '2025-07-08',
				fromAccountId: 1,
				comment: 'test',
				name: 'test',
			}

			const result = await zaim.payment.create(params)

			// Assert
			expect(result.stamps).toBe(null)
			expect(result.banners).toBeEmpty()
			expect(result.money.id).toBe(11820767)
			expect(result.money.modified).toBeInstanceOf(Date)
			expect(result.money.modified.getTime()).toBe(now.getTime())
			expect(result.user.inputCount).toBe(12)
			expect(result.user.dataModified).toBeInstanceOf(Date)
			expect(result.user.dataModified?.getTime()).toBe(now.getTime())
			expect(result.requested).toBe(Math.floor(now.getTime() / 1000))
		})
	})
})
