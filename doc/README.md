<a name="module_@getenv2"></a>

## @getenv2
Getenv2 module.

<a name="module_@getenv2..getenv"></a>

### @getenv2~getenv(envName, joiValidation, defaults) ⇒ <code>string</code> \| <code>number</code> \| <code>object</code> \| <code>array</code>
Get and validate environment variables

**Kind**: inner method of [<code>@getenv2</code>](#module_@getenv2)  
**Returns**: <code>string</code> \| <code>number</code> \| <code>object</code> \| <code>array</code> - - The coerced value grabbed from the environment variables  

| Param | Type | Description |
| --- | --- | --- |
| envName | <code>string</code> | The name of the environment variable we'll be retrieving |
| joiValidation | <code>Joi</code> \| <code>string</code> \| <code>number</code> \| <code>object</code> \| <code>array</code> | Joi validation object to be used to validate and coerce the env variable. If not a joi instance it will be used as the default. |
| defaults | <code>string</code> \| <code>number</code> \| <code>object</code> \| <code>array</code> | The default value |

