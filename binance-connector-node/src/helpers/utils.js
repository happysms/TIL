'use strict'

const axios = require('axios')
const { Console } = require('console')
// const constants = require('./constants')

const removeEmptyValue = obj => {
    Object.keys(obj).forEach(key => isEmptyValue(obj[key]) && delete obj[key])
}


const isEmptyValue = input => {
    return (!input && input !== false && input !== 0) ||
        ((typeof input === 'string' || input instanceof String) && /^\s+$/.test(input)) ||
        (input instanceof Object && !Object.keys(input).length) ||
        (Array.isArray(input) && !input.length)
}




