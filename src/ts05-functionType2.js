"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 타입스크립트에서 this 정의하는 방법
function getParam(index) {
    const params = this.split(",");
    if (index < 0 || params.length <= index) {
        return "";
    }
    return this.split(",")[index];
}
function add(x, y) {
    if (typeof x === 'number' && typeof y === 'number')
        return x + y;
    else {
        const result = Number(x) + Number(y);
        return result.toString();
    }
}
// const v1:number = add(1, 2);    // 매개변수 둘 다 숫자지만, v1이 number타입만 정의되어서 문제
// console.log(add(1, '2'));       // 매개변수가 서로 다른 타입이지만 에러가 발생하지 않음
/**
 * add함수 위에 코드 두 줄 넣으면 됨!
    function add(x: number, y: number): number;
    function add(x: string, y: string): string;
 */
// named parameters 방식
// 매개변수 타입 정의를 객체로 정의
function getText({ name, age = 15, language }) {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}
getText({ name: 'nike' });
getText({ name: 'dapsu', age: 30, language: 'ko' });
function getText2({ name, age = 15, language }) {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}
/**
 * 매개변수가 많아지면 가독성이 떨어지기 때문에 named parameters로 변경하는 것이 좋음
 * 하지만 위의 방법을 수동으로 하면 다소 번거로움
 * 타입스크립트에서 자체적으로 변환해주는 기능이 있음
 */
// function에 커서를 대면 좌측 상단에 전구 모양 표시됨. 클릭하면 Convert paramteters to destructed object 뜸!
function getText3(name, age = 15, language) {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}
