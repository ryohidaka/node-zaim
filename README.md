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
// Get all records
const allMoney = await zaim.money.list();
console.log(allMoney[0].amount); // 10000
console.log(allMoney[0].mode); // 'income'

// Filter by date range and type
const payments = await zaim.money.list({
	mode: 'payment',
	startDate: '2024-01-01',
	endDate: '2024-12-31',
	limit: 50,
});
```

### Payment

#### `create()`

Input payment data

```typescript
const payment = await zaim.payment.create({
	categoryId: 101,
	genreId: 10101,
	amount: 1,
	date: '2026-02-04',
	comment: 'test',
	name: 'test',
	place: 'test',
});
console.log(payment);
```

#### `update()`

Update payment data

```typescript
const payment = await zaim.payment.update({
	amount: 1,
	date: '2026-02-04',
	genreId: 10101,
	categoryId: 101,
	comment: 'test',
});
console.log(payment);
```

#### `delete()`

Delete payment data

```typescript
const payment = await zaim.payment.delete(11820767);
console.log(payment);
```

### Income

#### `create()`

Input income data

```typescript
const income = await zaim.income.create({
	categoryId: 101,
	amount: 1,
	date: '2026-02-04',
	place: 'test'
	comment: 'test',
});
console.log(income);
```

#### `update()`

Update income data

```typescript
const income = await zaim.income.update({
	categoryId: 101,
	amount: 1,
	date: '2026-02-04',
	place: 'test'
	comment: 'test',
});
console.log(income);
```

### Category

#### `list()`

Showing the list of your categories

```typescript
const categories = await zaim.category.list();
console.log(categories[0].name); // 'Food'
```

#### `default()`

Get default category list

```typescript
const categories = await zaim.category.default('en');
console.log(categories[0].name); // 'Food'
```

### Genre

#### `list()`

Showing the list of your genres

```typescript
const genres = await zaim.genre.list();
console.log(genres[0].name); // 'Geocery'
```

#### `default()`

Get default genre list

```typescript
const genres = await zaim.genre.default('en');
console.log(genres[0].name); // 'Geocery'
```

### Account

#### `list()`

Showing the list of your accounts

```typescript
const accounts = await zaim.account.list();
console.log(accounts[0].name); // 'Credit card'
```

#### `default()`

Get default account list

```typescript
const accounts = await zaim.account.default('en');
console.log(accounts[0].name); // 'Wallet'
```

### Currency

#### `list()`

```typescript
const currencies = await zaim.currency.list();
console.log(currencies[0].currencyCode); // 'AUD'
console.log(currencies[0].name); // 'Australian dollar'
```

## API Reference

| Endpoint                          | Method | Description                                                            |
| --------------------------------- | ------ | ---------------------------------------------------------------------- |
| `zaim.user.verify()`              | GET    | Representation of the requesting user if authentication was successful |
| `zaim.money.list(params?)`        | GET    | Showing the list of input data                                         |
| `zaim.payment.create(params)`     | POST   | Input payment data                                                     |
| `zaim.payment.update(id, params)` | PUT    | Update payment data                                                    |
| `zaim.payment.delete(id)`         | DELETE | Delete payment data                                                    |
| `zaim.income.create(params)`      | POST   | Input income data                                                      |
| `zaim.income.update(id, params)`  | PUT    | Update income data                                                     |
| `zaim.category.list()`            | GET    | Showing the list of your categories                                    |
| `zaim.genre.list()`               | GET    | Showing the list of your genres                                        |
| `zaim.account.list()`             | GET    | Showing the list of your accounts                                      |
| `zaim.account.default(lang?)`     | GET    | List default accounts                                                  |
| `zaim.category.default(lang?)`    | GET    | List default categories                                                |
| `zaim.genre.default(lang?)`       | GET    | List default genres                                                    |
| `zaim.currency.list()`            | GET    | List available currencies                                              |

For full details on each endpoint, refer to the [Zaim API documentation](https://dev.zaim.net/home/api).

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
