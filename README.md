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

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
