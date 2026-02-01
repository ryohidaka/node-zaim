import { describe, expect, test } from 'bun:test'
import { Zaim } from '../../src'
import { MockOAuthClient } from '../mocks'

describe('MoneyApi', () => {
	describe('list', () => {
		test('should get money list successfully', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				money: [
					{
						id: 381,
						mode: 'income',
						user_id: 1,
						date: '2011-11-07',
						category_id: 11,
						genre_id: 0,
						to_account_id: 34555,
						from_account_id: 0,
						amount: 10000,
						comment: '',
						active: 1,
						name: '',
						receipt_id: 0,
						place: 'xxx',
						place_uid: 'yh-xxx',
						created: '2011-11-07 01:10:50',
						currency_code: 'JPY',
					},
				],
				requested: 1321782829,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/home/money?mapping=1',
				mockResponse,
			)

			const zaim = new Zaim({
				consumerKey: 'test-key',
				consumerSecret: 'test-secret',
				accessToken: 'test-token',
				accessTokenSecret: 'test-secret',
				oauthClient: mockOAuth.asOAuth(),
			})

			const result = await zaim.money.list()

			// Check all fields are properly transformed
			expect(result[0].id).toBe(381)
			expect(result[0].mode).toBe('income')
			expect(result[0].userId).toBe(1)
			expect(result[0].date).toBe('2011-11-07')
			expect(result[0].categoryId).toBe(11)
			expect(result[0].genreId).toBe(0)
			expect(result[0].toAccountId).toBe(34555)
			expect(result[0].fromAccountId).toBeNull()
			expect(result[0].amount).toBe(10000)
			expect(result[0].comment).toBeNull()
			expect(result[0].active).toBe(true)
			expect(result[0].name).toBe('')
			expect(result[0].receiptId).toBe(0)
			expect(result[0].place).toBe('xxx')
			expect(result[0].placeUid).toBe('yh-xxx')
			expect(result[0].created).toEqual(new Date('2011-11-07 01:10:50'))
			expect(result[0].currencyCode).toBe('JPY')
		})
	})
})
