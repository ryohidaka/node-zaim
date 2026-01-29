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
```

You can also set the access token later on an existing instance:

```typescript
zaim.setAccessToken(accessToken, accessTokenSecret);
```

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
