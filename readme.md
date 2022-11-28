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
- 연산을 어떻게 효율적으로 하는지?
- 로깅을 어떻게 하는지?
- 코드를 어떻게 예쁘게(남들이 이해할 수 있도록) 작성하는지?

