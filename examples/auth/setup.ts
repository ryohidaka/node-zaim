import fs from 'node:fs'
import readline from 'readline'
import { Zaim } from '../../src'

const zaim = new Zaim({
	consumerKey: String(process.env.CONSUMER_KEY),
	consumerSecret: String(process.env.CONSUMER_SECRET),
})

/**
 * Main flow for obtaining Zaim OAuth access tokens.
 */
async function main() {
	try {
		// 1️⃣ Get request token
		const { token: requestToken, tokenSecret: requestTokenSecret } =
			await zaim.getRequestToken()
		console.log('\n🔑 Request token obtained')

		// 2️⃣ Get authorization URL
		const authorizationUrl = zaim.getAuthorizeUrl(requestToken)
		console.log(
			'\n🔗 Open the following URL in your browser to log in to Zaim and get a PIN:',
		)
		console.log(authorizationUrl)

		// 3️⃣ Prompt user for PIN (OAuth verifier)
		const oauthVerifier = await promptPin(
			'\n📥 Enter the PIN displayed on Zaim: ',
		)

		// 4️⃣ Exchange PIN for access token
		const { accessToken, accessTokenSecret } = await zaim.getAccessToken(
			requestToken,
			requestTokenSecret,
			oauthVerifier.trim(),
		)

		console.log('\n✅ Access token retrieved successfully!')
		console.log('AccessToken:', accessToken)
		console.log('AccessTokenSecret:', accessTokenSecret)

		// 5️⃣ Update .env file
		updateEnvFile(accessToken, accessTokenSecret)

		console.log(
			"\n🎉 Tokens saved to .env. You won't need to enter a PIN next time.",
		)
	} catch (err) {
		console.error('\n❌ Failed to retrieve token:', err)
	}
}

/**
 * Prompt the user for the PIN code via stdin.
 * @param message - Message to display in the console.
 * @returns Promise resolving to the user input string.
 */
function promptPin(message: string): Promise<string> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	return new Promise((resolve) => {
		rl.question(message, (answer) => {
			rl.close()
			resolve(answer)
		})
	})
}

const ENV_PATH = '.env'

/**
 * Update or add access tokens in the .env file.
 * @param accessToken - OAuth access token
 * @param accessTokenSecret - OAuth access token secret
 */
function updateEnvFile(accessToken: string, accessTokenSecret: string) {
	let content = ''

	// Read existing .env file if it exists
	if (fs.existsSync(ENV_PATH)) {
		content = fs.readFileSync(ENV_PATH, 'utf-8')
	}

	// Parse current env variables
	const lines = content.split(/\r?\n/).filter(Boolean)
	const map = Object.fromEntries(
		lines.map((line) => {
			const idx = line.indexOf('=')
			return idx > 0 ? [line.slice(0, idx), line.slice(idx + 1)] : [line, '']
		}),
	)

	// Update tokens
	map.ACCESS_TOKEN = accessToken
	map.ACCESS_TOKEN_SECRET = accessTokenSecret

	// Write back to .env
	const newContent = `${Object.entries(map)
		.map(([key, value]) => `${key}=${value}`)
		.join('\n')}\n`
	fs.writeFileSync(ENV_PATH, newContent)

	console.log(`\n📝 Updated .env file (${ENV_PATH})`)
}

// Execute main flow
main()
