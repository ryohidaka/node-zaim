import { beforeEach, describe, expect, mock, test } from 'bun:test'
import type { OAuth } from 'oauth'
import { BASE_URL } from '../src/constants'
import { HttpClient } from '../src/http-client'

describe('HttpClient', () => {
	let mockOAuth: OAuth
	let httpClient: HttpClient
	const testAccessToken = 'test-access-token'
	const testAccessTokenSecret = 'test-access-token-secret'

	beforeEach(() => {
		// Create a mock OAuth instance
		mockOAuth = {
			get: mock(() => {}),
		} as unknown as OAuth

		httpClient = new HttpClient(
			mockOAuth,
			testAccessToken,
			testAccessTokenSecret,
		)
	})

	describe('get', () => {
		test('should successfully fetch and parse JSON data', async () => {
			// Arrange
			const testPath = '/test/endpoint'
			const mockResponse = { id: 1, name: 'Test User' }

			mockOAuth.get = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					callback: (error: unknown, data?: string | Buffer) => void,
				) => {
					callback(null, JSON.stringify(mockResponse))
				},
			) as OAuth['get']

			// Act
			const result = await httpClient.get(testPath)

			// Assert
			expect(result).toEqual(mockResponse)
			expect(mockOAuth.get).toHaveBeenCalledTimes(1)
			expect(mockOAuth.get).toHaveBeenCalledWith(
				`${BASE_URL}${testPath}`,
				testAccessToken,
				testAccessTokenSecret,
				expect.any(Function),
			)
		})

		test('should reject when OAuth returns an error', async () => {
			// Arrange
			const testPath = '/test/endpoint'
			const mockError = { statusCode: 401, data: 'Unauthorized' }

			mockOAuth.get = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					callback: (error: unknown, data?: string | Buffer) => void,
				) => {
					callback(mockError, undefined)
				},
			) as OAuth['get']

			// Act & Assert
			await expect(httpClient.get(testPath)).rejects.toEqual(mockError)
		})

		test('should reject when response is not valid JSON', async () => {
			// Arrange
			const testPath = '/test/endpoint'
			const invalidJSON = 'not a json'

			mockOAuth.get = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					callback: (error: unknown, data?: string | Buffer) => void,
				) => {
					callback(null, invalidJSON)
				},
			) as OAuth['get']

			// Act & Assert
			await expect(httpClient.get(testPath)).rejects.toThrow(
				'Failed to parse JSON:',
			)
		})

		test('should reject when response is an array', async () => {
			// Arrange
			const testPath = '/test/endpoint'
			const arrayResponse = JSON.stringify([1, 2, 3])

			mockOAuth.get = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					callback: (error: unknown, data?: string | Buffer) => void,
				) => {
					callback(null, arrayResponse)
				},
			) as OAuth['get']

			// Act & Assert
			await expect(httpClient.get(testPath)).rejects.toThrow(
				'Response is not a JSON object',
			)
		})

		test('should reject when response is null', async () => {
			// Arrange
			const testPath = '/test/endpoint'
			const nullResponse = JSON.stringify(null)

			mockOAuth.get = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					callback: (error: unknown, data?: string | Buffer) => void,
				) => {
					callback(null, nullResponse)
				},
			) as OAuth['get']

			// Act & Assert
			await expect(httpClient.get(testPath)).rejects.toThrow(
				'Response is not a JSON object',
			)
		})

		test('should reject when response is a primitive value', async () => {
			// Arrange
			const testPath = '/test/endpoint'
			const primitiveResponse = JSON.stringify('string value')

			mockOAuth.get = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					callback: (error: unknown, data?: string | Buffer) => void,
				) => {
					callback(null, primitiveResponse)
				},
			) as OAuth['get']

			// Act & Assert
			await expect(httpClient.get(testPath)).rejects.toThrow(
				'Response is not a JSON object',
			)
		})

		test('should handle complex nested objects', async () => {
			// Arrange
			const testPath = '/user/profile'
			const complexResponse = {
				user: {
					id: 123,
					name: 'John Doe',
					settings: {
						theme: 'dark',
						notifications: true,
					},
				},
				meta: {
					timestamp: '2024-01-01T00:00:00Z',
				},
			}

			mockOAuth.get = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					callback: (error: unknown, data?: string | Buffer) => void,
				) => {
					callback(null, JSON.stringify(complexResponse))
				},
			) as OAuth['get']

			// Act
			const result = await httpClient.get(testPath)

			// Assert
			expect(result).toEqual(complexResponse)
		})

		test('should handle Buffer response', async () => {
			// Arrange
			const testPath = '/test/endpoint'
			const mockResponse = { data: 'test' }
			const buffer = Buffer.from(JSON.stringify(mockResponse))

			mockOAuth.get = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					callback: (error: unknown, data?: string | Buffer) => void,
				) => {
					callback(null, buffer)
				},
			) as OAuth['get']

			// Act
			const result = await httpClient.get(testPath)

			// Assert
			expect(result).toEqual(mockResponse)
		})
	})
})
