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
        const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@aggTrade`
        return this.subscribe(url, callbacks)
    }


    tradeWS (symbol, callbacks) {
        validateRequiredParameters({ symbol })
        const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@trade`
        return this.subscribe(url, callbacks)
    }

    klineWS (symbol, interval, callbacks) {
        validateRequiredParameters({symbol, interval})
        const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@kline_${interval}`
        return this.subscribe(url, callbacks)
    }

    bookTickerWS (symbol = null, callbacks) {
        let path = '!bookTicker'
        if (!isEmptyValue(symbol)) {
            path = `${symbol.toLowerCase()}@bookTicker`
        }
        const url = `${this.wsURL}/ws/${path}`
        return this.subscribe(url, callbacks)
    }

    partialBookDepth(symbol, levels, speed, callbacks) {
        validateRequiredParameters({symbol, levels, speed})

        const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@depth${levels}@${speed}`
        return this.subscribe(url, callbacks)
    }


    subscribe (url, callbacks) {
        const wsRef = {}
        wsRef.closeInitiated = false
        const initConnect = () => {
            const ws = new WebSocketClient(url)
            wsRef.ws = ws

            ws.on('open', () => {
                this.logger.info(`Connected to the Websocket Server: ${url}`)
                callbacks.open && callbacks.open()
            })


            // handle data message. Pass the data to the call back method from user
            // It could be useful to store the original messages from server for debug
            ws.on('message', data => {
                callbacks.message && callbacks.message(data.toString())
            })

            ws.on('ping', () => {
                // As ping pong is very important for maintaining the connection, log them as INFO level
                this.logger.info(`Received PING from server`)
                callbacks.ping && callbacks.ping()
                ws.pong()
                this.logger.info('Responsed PONG to server \`s PING message')
            })

            ws.on('pong', () => {
                this.logger.info('Received PONG from server')
                callbacks.pong & callbacks.pong()
            })

            ws.on('error', err => {
                this.logger.error('Received error from server')
                callbacks.error && callbacks.error()
                this.logger.error(err)
            })

            ws.on('close', (closeEventCode, reason) => {
                if (!wsRef.closeInitiated) {
                    this.logger.error(`Connection close due to ${closeEventCode}: ${reason}`)

                    setTimeout(() => {
                        this.logger.debug('Reconnect to the server')
                        initConnect()
                    }, this.reconnectDelay)
                } else {
                    wsRef.closeInitiated = false
                }
            })
        }

        this.logger.debug(`Connecting to: ${url}`)
        initConnect()
        return wsRef
    }

    pingServer(wsRef) {
        if (!wsRef || !wsRef.ws || wsRef.ws.readyState !== WebSocketClient.OPEN) this.logger.warn('Ping only can be sent when connection is ready.')
        else {
            this.logger.info('Send PING to the Websocket Server')
            wsRef.ws.ping()
        }
    }
}


module.exports = Websocket