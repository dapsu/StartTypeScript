"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const size = 123;
const isBig = size >= 100;
const msg = isBig ? "크다" : "작다";
// 배열의 타입 선언 방법은 아래와 같이 두 가지 방법이 있음
const values = [1, 2, 3];
const values2 = [1, 2, 3];
// values.push("a");   // <--- error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
// tuple타입: 각 인덱스 별로 타입을 미리 정의
const data = [msg, size];
data[0].substring(1);
// data[1].substring(1);   // <--- error TS2339: Property 'substring' does not exist on type 'number'.
console.log("typeof 123 =>", typeof 123);
console.log("typeof 'abc' =>", typeof 'abc');
console.log("typeof [1,2,3] =>", typeof [1, 2, 3]);
