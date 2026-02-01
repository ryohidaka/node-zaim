# node-zaim

Node.js client library for Zaim API

## Installation

```bash
bun add node-zaim
```

## Usage

### Initialization

If you already have an access token, you can initialize the client directly:

```typescript
import { Zaim } from 'node-zaim';

const zaim = new Zaim({
	consumerKey: 'your-consumer-key',
	consumerSecret: 'your-consumer-secret',
	accessToken: 'your-access-token',
	accessTokenSecret: 'your-access-token-secret',
});
```

### OAuth Authorization Flow

If you need to obtain an access token via OAuth, use the following flow:

```typescript
import Zaim from 'node-zaim';

const zaim = new Zaim({
	consumerKey: 'your-consumer-key',
	consumerSecret: 'your-consumer-secret',
});

// 1. Get a request token
const { token, tokenSecret } = await zaim.getRequestToken();

// 2. Redirect the user to the authorization URL
const authorizeUrl = zaim.getAuthorizeUrl(token);
console.log('Redirect user to:', authorizeUrl);

// 3. After the user authorizes, exchange for an access token
//    using the oauth_verifier from the callback
const { accessToken, accessTokenSecret } = await zaim.getAccessToken(
	token,
	tokenSecret,
	'oauth-verifier-from-callback'
);

// 4. Store the access token for future use
console.log('Access Token:', accessToken);
console.log('Access Token Secret:', accessTokenSecret);
```

You can also set the access token later on an existing instance:

```typescript
zaim.setAccessToken(accessToken, accessTokenSecret);
```

### User

#### `verify()`

Representation of the requesting user if authentication was successful.

```typescript
const user = await zaim.user.verify();
console.log(user.name); // 'MyName'
console.log(user.inputCount); // 100
console.log(user.currencyCode); // 'JPY'
```

### Money

#### `list()`

Showing the list of input data

```typescript
const money = await zaim.money.list();
console.log(money[0].amount); // 10000
console.log(money[0].mode); // 'income'
```

## API Reference

| Endpoint             | Method | Description                                                            |
| -------------------- | ------ | ---------------------------------------------------------------------- |
| `zaim.user.verify()` | GET    | Representation of the requesting user if authentication was successful |
| `zaim.money.list()`  | GET    | Showing the list of input data                                         |

For full details on each endpoint, refer to the [Zaim API documentation](https://dev.zaim.net/home/api).

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
