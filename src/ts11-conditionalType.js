"use strict";
/** 조건부 타입 (Conditional Type)
 * 조건부 타입: 입력된 제네릭 타입에 따라 타입을 결정할 수 있는 기능
 * 조건부 타입의 문법: T extends U ? X : Y
 * 제네릭으로 입력된 어떤 타입 T가 U에 할당 가능하다면 X, 아니면 Y 타입 사용
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 함수 T가 extends 뒤의 함수에 할당 가능한 타입이면 R이라는 것을 사용
 * R: 이 함수의 반환 타입 의미
 * 타입 추론을 위해 infer라는 키워드 사용
 * infer 키워드는 조건부 타입을 사용할 때 extends 키워드 뒤에서 이렇게 사용됨
 */
function f1(s) {
    return s.length;
}
const p = {
    name: 'mike',
    age: '23',
    nation: 'Korea'
};
