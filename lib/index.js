'use strict';

// uses the node env for the default fallback
let objectFallback = process.env.NODE_ENV;

const converters = {
  string: function(val) {
    return val.toString();
  }
};

const isObject = function isObject(obj) {
  var type = typeof obj;
  return !!obj && (type == 'object' || type == 'function') && !(obj instanceof Array);
};

const getFallback = function(fallback) {
  let _fallback = fallback;
  if (isObject(fallback) && objectFallback !== undefined) {
    _fallback = fallback[objectFallback];
  }
  return _fallback;
};

const getValue = function(envName, fallback) {
  let value = process.env[envName];
  if (value === undefined) {
    if (fallback === undefined) {
      throw new Error(`Getenv FallbackError: did not provide a fallback for ${envName}`);
    }

    value = getFallback(fallback);
  }
  return value;
};

/**
 * Arguments:
 * envName - The environment to be retrieved from process.env
 * fallback - The fallback value to be used
 * coerc (function) - the function to be used to convert the value
 */
const getenv = function (envName, fallback, coerce) {
  if (coerce === undefined) {
    coerce = converters.string;
  }
  else if (typeof coerce === 'string' || coerce instanceof String) {
    //use one of our coercion functions
    if (converters[coerce] === undefined) {
      throw new Error(`Getenv CoercionError: ${coerce} is not a valid converter`);
    }
    coerce = converters[coerce];
  }

  return coerce(getValue(envName, fallback));
};

module.exports = getenv;
