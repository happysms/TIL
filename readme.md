# TIL(Today I learned)

## Binacne Connector Node
목적: 아비트라지 & 시스템트레이딩 & 거래소 소켓 프로그램을 유용하게 사용하기 위함. 

방식: 오픈소스 분석

reference
- 링크: https://github.com/binance/binance-connector-node

Topic
- 에러 핸들링을 어떻게 하는지? (소켓이 중단되더라도 어떻게 프로그램 자체적으로 유지를 하는지?)
  - 에러 정의 방법 Flow
  > 기본 Error 클래스 선언 -> 이 객체를 상속받아 custom 에러 클래스 생성 -> custom 에러 클래스를 validation.js 에서 받아 validate 함수 생성

- 프로그램의 신뢰성을 어떻게 보장하는지?
  - 소켓 통신 중 에러가 발생했을 경우
    - 에러 자체를 이벤트로 받아 callback 함수를 실행하게 한다. callback 함수에서는 당연히 소켓을 재연결시키는 기능이 존재하여야 한다.
  ```javascript
  ws.on('error', err => {
                  this.logger.error('Received error from server')
                  callbacks.error && callbacks.error()
                  this.logger.error(err)
              })
  ```    

- 연산을 어떻게 효율적으로 하는지?
- 로깅을 어떻게 하는지?
  - callback 함수에 logger를 등록하여 사용한다.
  
  ```javascript
    'use strict'
  
  const { Console } = require('console')
  const Spot = require('../../../src/spot')
  
  const logger = new Console({ stdout: process.stdout, stderr: process.stderr })
  const client = new Spot('', '', { logger })
  
  const callbacks = {
    open: () => logger.debug('Connnected with Websocket server'),
    close: () => logger.debug('Disconnected with Websocket server'),
    message: data => logger.info(data)
  }
  
  const wsRef = client.partialBookDepth('bnbusdt', '5', '100ms', callbacks)
  
  setTimeout(() => client.unsubscribe(wsRef), 60000)
  ```

- 코드를 어떻게 예쁘게(남들이 이해할 수 있도록) 작성하는지?


