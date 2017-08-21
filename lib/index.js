'use strict';

const Joi = require('joi');
const Errors = require('./errors');

let objectFallback = 'dev';
const NO_DEFAULT = 'NO_DEFAULT';

const isObject = function isObject(obj) {

    const type = typeof obj;
    return !!obj && (type === 'object') && !(obj instanceof Array);
};

const getValue = function (envName, validation, defaults) {

    const value = process.env[envName];
    let defaultVal;
    if (typeof defaults !== 'undefined') {
        if (isObject(defaults)) {
            defaultVal = defaults[objectFallback];
        }
        else {
            defaultVal = defaults;
        }
    }
    if (typeof defaultVal !== 'undefined') {
        validation = validation.default(defaultVal);
    }
    const result = Joi.validate(value, validation);
    if (result.error !== null) {
        throw result.error;
    }
    if (result.value === NO_DEFAULT) {
        throw new Errors.NoDefaultError('No default specified');
    }
    return result.value;
};

const getenv2 = function (envName, joiValidation, defaults) {

    if (typeof joiValidation !== 'undefined') {
        if (joiValidation.isJoi !== true) {
            defaults = joiValidation;
            joiValidation = Joi.default(NO_DEFAULT);
        }
        else {
            // using private API need to be careful with updates here
            if (typeof joiValidation._flags.default === 'undefined') {
                joiValidation = joiValidation.default(NO_DEFAULT);
            }
        }
    }
    else {
        joiValidation = Joi.default(NO_DEFAULT);
    }
    return getValue(envName, joiValidation, defaults);
};

getenv2.setObjectFallback = function (fallbackName) {

    objectFallback = fallbackName;
};

getenv2.joi = Joi.extend((joi) => {

    return {
        base: joi.array(),
        name: 'envarray',
        coerce(value, state, options) {

            if (typeof value === 'undefined') {
                return value;
            }
            return value.split(',');
        }
    };
}).extend((joi) => {

    return {
        base: joi.object(),
        name: 'envobject',
        coerce(value, state, options) {

            if (typeof value === 'undefined') {
                return value;
            }
            return JSON.parse(value);
        }
    };
});

module.exports = getenv2;
