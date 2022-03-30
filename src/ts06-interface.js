"use strict";
/**
 * 자바와 같은 다른 언어에서 인터페이스는 클래스를 구현하기 전에 필요한 메소드를 정의하는 용도로 쓰임
 * 타입스크립트에서는 더 다양한 것들을 정의하는데 사용됨
 * 타입스크립트에서 인터페이스로 정의할 수 있는 타입의 종류와 인터페이스로 타입을 정의하는 방법에 대해서 알아보자.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const p1 = { name: 'leo', nickname: 'dapsu', age: 30 };
// p1.nickname = 'handsom guy';    // 읽기 전용 속성으로 에러 발생
// 객체가 정의되지 않은 속성값을 가지고 있어도 할당 가능
const p2 = {
    name: 'mike',
    nickname: 'nike',
    birthday: '2022-02-22'
};
const p3 = p2; // 가능한 이유? p3타입이 p2타입을 포함하는 더 큰 타입이기 때문(타입 호환성 부분에서 자세히 다룰 예정)
const p4 = {
    name: 'loo',
    birthday: "2022-02-22",
    age: 25,
};
const yearMap = {};
// 위의 인터페이스와 같은 것임: type GetText = (name: string, age: number) => string;
const getText = function (name, age) {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}`;
};
const getText2 = function (name, age) {
    if (getText2.totalCall !== undefined) {
        getText2.totalCall++;
        console.log(`totalCall: ${getText2.totalCall}`);
    }
    return "";
};
class SomePerson {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    isYoungerThan(age) {
        return this.age < age;
    }
}
const pp = {
    name: 'a',
    age: 23,
    price: 1000
};
// 교집합이 속성에 대한 교집합이 아니라, 타입이 가질 수 있는 값의 집합에 대한 교집합이기 때문에 가능(자세한 것은 타입 호환성 부분에서!)
