'use strict'

const axios = require('axios')
const { Console } = require('console')
const constants = require('./constants')


const removeEmptyValue = obj => {
    Object.keys(obj).forEach(key => isEmptyValue(obj[key]) && delete obj[key])
}


const isEmptyValue = input => {
    return (!input && input !== false && input !== 0) ||
        ((typeof input === 'string' || input instanceof String) && /^\s+$/.test(input)) ||
        (input instanceof Object && !Object.keys(input).length) ||
        (Array.isArray(input) && !input.length)
}

const buildQueryString = params => {
    if (!params) return ''
    return Object.entries(params)
        .map(stringifyKeyValuePair)
        .join('&')
}

const stringifyKeyValuePair = ([key, value]) => {
    const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value
    return `${key}=${encodeURIComponent(valueString)}`
}

const getRequestInstance = (config) => {
    return axios.create({
        ...config
    })
}

const createRequest = (config) => {
    const { baseURL, apiKey, method, url, timeout, proxy, httpsAgent } = config
    return getRequestInstance({
        baseURL,
        timeout,
        proxy,
        httpsAgent,
        headers: {
            'Content-Type': 'application/json',
            'X-MBX-APIKEY': apiKey,
            'User-Agent': `${constants.appName}/${constants.appVersion}`
        }
    }).request({
        method,
        url
    })
}

const flowRight = (...functions) => input => functions.reduceRight(
    (input, fn) => fn(input),
    input
)

const defaultLogger = new Console({
    stdout: process.stdout,
    stderr: process.stderr
})


module.exports = {
    isEmptyValue,
    removeEmptyValue,
    buildQueryString,
    createRequest,
    flowRight,
    defaultLogger
}
