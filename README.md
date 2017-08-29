# getenv2
[![Build Status](https://travis-ci.org/sauramirez/getenv2.svg?branch=master)](https://travis-ci.org/sauramirez/getenv2)

Node environment helper with fallbacks

Install with:

```bash
npm install getenv2
```

## Example

```javascript
const Getenv = require('getenv2');

// get the host url using localhost as the fallback
const dbHost = Getenv('DB_HOST', 'localhost');

// get the db password with no fallback for production environments
const dbPassword = Getenv('DB_HOST', {'dev': 'localpassword'});
```

## API

`Getenv.setObjectFallback`

Sets the key to be used as a fallback when sending a dictionary

`default = process.env.NODE_ENV`

```js
Getenv.setObjectFallback('staging');
Getenv('DB_PASSWORD', {'staging': 'stagingpass'});
```

## Validation

Getenv accepts joi objects to validate and parse environment variables.

```js
const Joi = require('joi');

Getenv('CONCURRENCY', Joi.number().max(5).default(1));
Getenv('HOST', Joi.string().uri());
Getenv('TODAY', Joi.date().iso());
```

For more information on the datatypes Joi supports see [https://github.com/hapijs/joi/blob/v10.6.0/API.md](https://github.com/hapijs/joi/blob/v10.6.0/API.md)

### Array

Getenv has a custom joi instance available in order to support arrays and
objects loaded from the environment variables.

```js
const Getenv = require('getenv2');

// if ARRAY is set to 1,2
Getenv('ARRAY', Getenv.joi.envarray()); // returns ['1', '2']
Getenv('ARRAY', Getenv.joi.envarray().number().length(5)); // returns [1, 2]
```

### Object

Runs JSON.parse on the variable

```js
const Getenv = require('getenv2');

// if OBJECT is set to { 'test': true }
Getenv('OBJECT', Getenv.joi.envobject()); // returns { test: true }
```
