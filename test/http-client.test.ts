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
			post: mock(() => {}),
			put: mock(() => {}),
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

	describe('post', () => {
		test('should successfully post data and parse JSON response', async () => {
			// Arrange
			const testPath = '/test/create'
			const requestBody = { name: 'New User', age: 25 }
			const mockResponse = { id: 1, ...requestBody }

			mockOAuth.post = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(null, JSON.stringify(mockResponse))
				},
			) as OAuth['post']

			// Act
			const result = await httpClient.post(testPath, requestBody)

			// Assert
			expect(result).toEqual(mockResponse)
			expect(mockOAuth.post).toHaveBeenCalledTimes(1)
			expect(mockOAuth.post).toHaveBeenCalledWith(
				`${BASE_URL}${testPath}`,
				testAccessToken,
				testAccessTokenSecret,
				requestBody,
				'application/x-www-form-urlencoded',
				expect.any(Function),
			)
		})

		test('should post with empty body when not provided', async () => {
			// Arrange
			const testPath = '/test/create'
			const mockResponse = { success: true }

			mockOAuth.post = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(null, JSON.stringify(mockResponse))
				},
			) as OAuth['post']

			// Act
			const result = await httpClient.post(testPath)

			// Assert
			expect(result).toEqual(mockResponse)
			expect(mockOAuth.post).toHaveBeenCalledWith(
				`${BASE_URL}${testPath}`,
				testAccessToken,
				testAccessTokenSecret,
				{},
				'application/x-www-form-urlencoded',
				expect.any(Function),
			)
		})

		test('should reject when OAuth returns an error', async () => {
			// Arrange
			const testPath = '/test/create'
			const mockError = { statusCode: 400, data: 'Bad Request' }

			mockOAuth.post = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(mockError, undefined)
				},
			) as OAuth['post']

			// Act & Assert
			await expect(httpClient.post(testPath, { name: 'Test' })).rejects.toEqual(
				mockError,
			)
		})
	})

	describe('put', () => {
		test('should successfully update data and parse JSON response', async () => {
			// Arrange
			const testPath = '/test/update/1'
			const requestBody = { name: 'Updated User', age: 30 }
			const mockResponse = { id: 1, ...requestBody }

			mockOAuth.put = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(null, JSON.stringify(mockResponse))
				},
			) as OAuth['put']

			// Act
			const result = await httpClient.put(testPath, requestBody)

			// Assert
			expect(result).toEqual(mockResponse)
			expect(mockOAuth.put).toHaveBeenCalledTimes(1)
			expect(mockOAuth.put).toHaveBeenCalledWith(
				`${BASE_URL}${testPath}`,
				testAccessToken,
				testAccessTokenSecret,
				requestBody,
				'application/x-www-form-urlencoded',
				expect.any(Function),
			)
		})

		test('should put with empty body when not provided', async () => {
			// Arrange
			const testPath = '/test/update/1'
			const mockResponse = { success: true }

			mockOAuth.put = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(null, JSON.stringify(mockResponse))
				},
			) as OAuth['put']

			// Act
			const result = await httpClient.put(testPath)

			// Assert
			expect(result).toEqual(mockResponse)
			expect(mockOAuth.put).toHaveBeenCalledWith(
				`${BASE_URL}${testPath}`,
				testAccessToken,
				testAccessTokenSecret,
				{},
				'application/x-www-form-urlencoded',
				expect.any(Function),
			)
		})

		test('should reject when OAuth returns an error', async () => {
			// Arrange
			const testPath = '/test/update/1'
			const mockError = { statusCode: 404, data: 'Not Found' }

			mockOAuth.put = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(mockError, undefined)
				},
			) as OAuth['put']

			// Act & Assert
			await expect(httpClient.put(testPath, { name: 'Test' })).rejects.toEqual(
				mockError,
			)
		})
	})

	describe('delete', () => {
		test('should successfully delete data and parse JSON response', async () => {
			// Arrange
			const testPath = '/test/delete/1'
			const mockResponse = { success: true, deleted: 1 }

			mockOAuth.put = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(null, JSON.stringify(mockResponse))
				},
			) as OAuth['put']

			// Act
			const result = await httpClient.delete(testPath)

			// Assert
			expect(result).toEqual(mockResponse)
			expect(mockOAuth.put).toHaveBeenCalledTimes(1)
			expect(mockOAuth.put).toHaveBeenCalledWith(
				`${BASE_URL}${testPath}`,
				testAccessToken,
				testAccessTokenSecret,
				{},
				'application/x-www-form-urlencoded',
				expect.any(Function),
			)
		})

		test('should delete with body parameters', async () => {
			// Arrange
			const testPath = '/test/delete/1'
			const requestBody = { reason: 'No longer needed' }
			const mockResponse = { success: true }

			mockOAuth.put = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(null, JSON.stringify(mockResponse))
				},
			) as OAuth['put']

			// Act
			const result = await httpClient.delete(testPath, requestBody)

			// Assert
			expect(result).toEqual(mockResponse)
			expect(mockOAuth.put).toHaveBeenCalledWith(
				`${BASE_URL}${testPath}`,
				testAccessToken,
				testAccessTokenSecret,
				requestBody,
				'application/x-www-form-urlencoded',
				expect.any(Function),
			)
		})

		test('should reject when OAuth returns an error', async () => {
			// Arrange
			const testPath = '/test/delete/1'
			const mockError = { statusCode: 403, data: 'Forbidden' }

			mockOAuth.put = mock(
				(
					_url: string,
					_token: string,
					_secret: string,
					_body: Record<string, string | number | boolean>,
					_contentType: string,
					callback: (error: unknown, data?: string) => void,
				) => {
					callback(mockError, undefined)
				},
			) as OAuth['put']

			// Act & Assert
			await expect(httpClient.delete(testPath)).rejects.toEqual(mockError)
		})
	})
})
