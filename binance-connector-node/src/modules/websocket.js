'use strict'

const { validateRequiredParameters } = require('../helpers/validation');
const { isEmptyValue } = require('../helpers/utils')
const WebSocketClient = require('ws')


/**
 * API websocket endpoints
 * @module Websocket
 * @param {*} superclass
 */
const Websocket = superclass => class extends superclass {
    constructor (options) {
        super(options)
        this.wsURL = options.wsURL || 'wss://stream.binance.com:9443'
        this.reconnectDelay = 5000
    }

    aggTradeWS (symbol, callbacks) {
        validateRequiredParameters({symbol})

    }

}
