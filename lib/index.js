'use strict';

// uses the node env for the default fallback
let objectFallback = process.env.NODE_ENV;

const converters = {
  string: function(val) {
    return val.toString();
  },
  int: function (val) {
    return +val;
  },
  /**
   * Convert to boolean
   * strings 0 and false return false
   * everything else is handled by the Boolean object
   */
  bool: function (val) {
    if (val === 'false' || val === '0') {
      return false;
    }
    return Boolean(val);
  },
  array: function (val) {
    return val.split(/\s*,\s*/);
  }
};

const isObject = function isObject(obj) {
  var type = typeof obj;
  return !!obj && (type == 'object') && !(obj instanceof Array);
};

const getFallback = function(fallback) {
  let _fallback = fallback;
  if (isObject(fallback) && objectFallback !== undefined) {
    _fallback = fallback[objectFallback];
  }
  return _fallback;
};

const getValue = function(envName, fallback, coerce) {
  let value = process.env[envName];
  if (value === undefined) {
    if (fallback === undefined) {
      throw new Error(`Getenv FallbackError: did not provide a fallback for ${envName}`);
    }

    value = getFallback(fallback);

    if (value === undefined) {
      throw new Error(`Getenv FallbackError: did not provide a fallback for ${envName}`);
    }
  }
  else {
    // coerce the value
    value = coerce(value);
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

  return getValue(envName, fallback, coerce);
};

getenv.setObjectFallback = function (fallbackName) {
  objectFallback = fallbackName;
};

module.exports = getenv;
