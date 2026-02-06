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

		test('should create payment successfully with place', async () => {
			const now = new Date()
			const placeModified = new Date('2017-06-28 18:24:51')
			const placeCreated = new Date('2016-12-07 23:37:48')
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				stamps: null,
				banners: [],
				money: {
					id: 11820767,
					modified: now.toISOString(),
				},
				place: {
					id: 58,
					user_id: 1,
					genre_id: 10101,
					category_id: 7,
					account_id: 3,
					transfer_account_id: 0,
					mode: 'payment',
					place_uid: 'zm-098f6bcd4621d373',
					service: 'place',
					name: 'test',
					original_name: 'test',
					tel: '',
					count: 2,
					place_pattern_id: 0,
					calc_flag: 10,
					edit_flag: 0,
					active: 1,
					modified: placeModified.toISOString(),
					created: placeCreated.toISOString(),
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
			const result = await zaim.payment.create({
				categoryId: 101,
				genreId: 10101,
				amount: 1,
				date: '2025-07-08',
				comment: 'test',
				name: 'test',
			})

			// Assert - Check money fields
			expect(result.stamps).toBe(null)
			expect(result.banners).toBeEmpty()
			expect(result.money.id).toBe(11820767)
			expect(result.money.modified).toBeInstanceOf(Date)
			expect(result.money.modified.getTime()).toBe(now.getTime())

			// Assert - Check user fields
			expect(result.user.inputCount).toBe(12)
			expect(result.user.dataModified).toBeInstanceOf(Date)
			expect(result.user.dataModified?.getTime()).toBe(now.getTime())

			// Assert - Check place fields
			expect(result.place).toBeDefined()
			expect(result.place?.id).toBe(58)
			expect(result.place?.userId).toBe(1)
			expect(result.place?.genreId).toBe(10101)
			expect(result.place?.categoryId).toBe(7)
			expect(result.place?.accountId).toBe(3)
			expect(result.place?.transferAccountId).toBe(null)
			expect(result.place?.mode).toBe('payment')
			expect(result.place?.placeUid).toBe('zm-098f6bcd4621d373')
			expect(result.place?.service).toBe('place')
			expect(result.place?.name).toBe('test')
			expect(result.place?.originalName).toBe('test')
			expect(result.place?.tel).toBe(null)
			expect(result.place?.count).toBe(2)
			expect(result.place?.placePatternId).toBe(null)
			expect(result.place?.calcFlag).toBe(10)
			expect(result.place?.editFlag).toBe(false)
			expect(result.place?.active).toBe(true)
			expect(result.place?.modified).toBeInstanceOf(Date)
			expect(result.place?.modified.getTime()).toBe(placeModified.getTime())
			expect(result.place?.created).toBeInstanceOf(Date)
			expect(result.place?.created.getTime()).toBe(placeCreated.getTime())

			// Assert - Check requested timestamp
			expect(result.requested).toBe(Math.floor(now.getTime() / 1000))
		})
	})

	describe('update', () => {
		test('should update payment successfully', async () => {
			const now = new Date()
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
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
				'https://api.zaim.net/v2/home/money/payment/11820767',
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
			const result = await zaim.payment.update(11820767, {
				amount: 1,
				date: '2025-07-08',
				fromAccountId: 1,
				genreId: 10101,
				categoryId: 101,
				comment: 'test',
			})

			// Assert
			expect(result.money.id).toBe(11820767)
			expect(result.money.modified).toBeInstanceOf(Date)
			expect(result.money.modified.getTime()).toBe(now.getTime())
			expect(result.user.inputCount).toBe(12)
			expect(result.user.dataModified).toBeInstanceOf(Date)
			expect(result.user.dataModified?.getTime()).toBe(now.getTime())
			expect(result.requested).toBe(Math.floor(now.getTime() / 1000))
		})
	})

	describe('delete', () => {
		test('should delete payment successfully', async () => {
			const now = new Date()
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
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
				'https://api.zaim.net/v2/home/money/payment/11820767',
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
			const result = await zaim.payment.delete(11820767)

			// Assert
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
