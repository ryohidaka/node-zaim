import { describe, expect, test } from 'bun:test'
import { Zaim } from '../../src'
import { MockOAuthClient } from '../mocks'

describe('UserApi', () => {
	describe('verify', () => {
		test('should get user data successfully', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				me: {
					id: 10000000, // unique user id
					login: 'XXXXXXX', // unique string for user login
					name: 'MyName', // user name
					input_count: 100, // total number of inputs
					day_count: 10, // total number of days
					repeat_count: 2, // days continuous recording
					day: 1, // start date of the month
					week: 3, // first day of the week
					month: 7, // start date of the year
					currency_code: 'JPY', // default currency code
					profile_image_url: 'http://xxx.xxxx/yyy.jpg',
					cover_image_url: 'http://xxx.xxxx/xxx.jpg',
					profile_modified: '2011-11-07 16:47:43', // modified time
				},
				requested: 1367902710,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/home/user/verify',
				mockResponse,
			)

			const zaim = new Zaim({
				consumerKey: 'test-key',
				consumerSecret: 'test-secret',
				accessToken: 'test-token',
				accessTokenSecret: 'test-secret',
				oauthClient: mockOAuth.asOAuth(),
			})

			const result = await zaim.user.verify()

			expect(result.id).toBe(10000000)
			expect(result.login).toBe('XXXXXXX')
			expect(result.name).toBe('MyName')
			expect(result.inputCount).toBe(100)
			expect(result.dayCount).toBe(10)
			expect(result.repeatCount).toBe(2)
			expect(result.day).toBe(1)
			expect(result.week).toBe(3)
			expect(result.month).toBe(7)
			expect(result.currencyCode).toBe('JPY')
			expect(result.profileImageUrl).toBe('http://xxx.xxxx/yyy.jpg')
			expect(result.coverImageUrl).toBe('http://xxx.xxxx/xxx.jpg')
			expect(result.profileModified).toEqual(new Date('2011-11-07 16:47:43'))
		})
	})
})
