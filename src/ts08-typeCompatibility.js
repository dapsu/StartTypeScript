"use strict";
/** 타입 호환성
 * 타입 호환성: 어떤 타입을 다른 타입으로 취급해도 되는지 판단하는 것
 * 정적 타입 언어의 가장 중요한 역할은 타입 호환성을 통해 컴파일 타임에 호환되지 않는 타입을 찾아내는 것
 * 어떤 변수가 다른 변수에 할당 가능하기 위해서는 해당 변수의 타입이 다른 변수의 타입에 할당 가능해야 함
 * 할당 가능을 판단할 때는 타입이 가질 수 있는 값의 집합을 생각하면 이해하기 쉬움
 */
Object.defineProperty(exports, "__esModule", { value: true });
function func1(a, b) {
    // const v1: number | string = a;
    // const v2:number = b;    // 타입 number | string은 number형식에 할당 불가능, string형식은 number형식에 할당 불가능
}
/**
 * 매개변수 b는 숫자와 문자열로 이루어진 값의 집합인데 v2는 숫자 형식만 가능
 * 즉 b의 값의 집합이 v2의 값의 집합보다 더 크기 때문에 더 큰 값의 집합을 더 작은 값의 집합으로 넣을 수 없기 때문에 에러. 할당 불가능
 * 반대로 매개변수 a보다 v1의 값의 집합이 더 크기 때문에 할당 가능
 */
function func2(a) {
    // const v1: 1 | 3 = a;    //1 | 2 형식은 1 | 3 형식에 할당 불가능, 2 형식은 1 | 3 형식에 할당 불가능
    // const v2: 1 | 2 | 3 = a;
}
const person = { name: 'mike', age: 23 };
const product = person;
const obj = { name: 'mike', age: '23', city: 'abc' };
const obj2 = {
    name: 'mike'
};
let f1 = (a, b) => `${a} ${b.length}`;
let f2 = (a, b) => `${a} ${b}`;
let f3 = a => `${a}`;
let f4 = a => (a < 10 ? a : 'too big');
f1 = f3;
// f3 = f1;    // 1번 조건 위반
f1 = f2;
// f2 = f1;    // 2번 조건 위반
f4 = f3;
// f3 = f4;    // 3번 조건 위반
/**
 * 함수는 호출하는 시점에 문제가 없어야 할당 가능
 * 함수 타입의 호환성은 함수를 실제로 호출한다고 생각했을 때 문제가 없어야 가능!
 */ 
