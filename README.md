# getenv2

Node environment helper with fallbacks

Install with:

```bash
npm install getenv2
```

## Example

```javascript
const Getenv = require('getenv2');

// get the host url using localhost as the fallback
let dbHost = Getenv('DB_HOST', 'localhost');

// get the db password with no fallback for production environments
// assuming NODE_ENV is set to 'dev'
let dbPassword = Getenv('DB_HOST', {'dev': 'localpassword'});
```

## API

`Getenv.setObjectFallback`

Sets the key to be used as a fallback when sending a dictionary

`default = process.env.NODE_ENV`

```js
Getenv.setObjectFallback('staging');
Getenv('DB_PASSWORD', {'staging': 'stagingpass'});
```

### Coercion

Getenv allows you to send functions in order to parse the environment variables

```js
Getenv('DB_HOSTS', undefined, function (v) {
  return [v + Math.random(), v + Math.random()];
})
```

We also have some default coercion options that you can pass as a string


```js
Getenv('DB_PORT', 3316, 'int');
Getenv('DB_HOSTS', ['localhost', '127.0.0.1], 'array');
Getenv('DB_PRIVATE', true, 'bool');
Getenv('DB_STRING', true, 'string'); // default
```
