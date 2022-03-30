export {};

// 타입스크립트에서 this 정의하는 방법
function getParam(this: string, index: number): string {
    const params = this.split(",");
    if (index < 0 || params.length <= index) {
        return "";
    }
    return this.split(",")[index];
}
/**
 * this의 타입은 매개변수 맨 앞에 정의할 수 있음
 * 타입스크립트는 this가 있으면 맨 앞의 매개변수를 this의 타입이라고 인식함
 * 그래서 함수의 매개변수는 두 번째부터 시작함
 */


// 인터페이스를 이용하여 String에 getParam 메소드 추가
// interface String {
//     getParam(this: string, index: number): string;
// }

// String.prototype.getParam = getParam;
// console.log("asdf, 1234, ok".getParam(1));      // 1234
/**
 * 자바스크립트에 내장된 타입에 기능을 주입하고 싶을 때는 프로토타입을 이용해서 주입할 수 있음
 * 그러나 내장 타입에 getParam이라는 속성이 없기 때문에 interface를 이용하여 속성 추가 가능
 */


// // Object에 메소드 추가하기
// interface Object {
//     getShortKeys(this: object): string[];
// }

// Object.prototype.getShortKeys = function () {
//     return Object.keys(this).filter(key => key.length <= 3);
// };

// const obj = {
//     a: 1,
//     bb: 2,
//     ccc: 3,
//     dddd: 4
// };
// console.log(obj.getShortKeys());        // [ 'a', 'bb', 'ccc' ]


// add함수
/** 조건
 * 두 매개변수가 모두 문자열이면 문자열 반환
 * 두 매개변수가 모두 숫자이면 숫자 반환
 * 두 매개변수를 서로 다른 타입으로 입력하면 안 된다.
 */
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: number | string, y: number | string): number | string {
    if (typeof x === 'number' && typeof y === 'number') return x + y;
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
function getText({
    name,
    age = 15,
    language
}: {
    name: string;
    age?: number;
    language?: string;
}): string {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}
getText({name: 'nike'})
getText({name: 'dapsu', age: 30, language: 'ko'})


// 인터페이스로 타입 정의를 따로 만들수도 있음
interface Param {
    name: string;
    age?: number;
    language?: string;
}

function getText2({name, age = 15, language}: Param): string {
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
 function getText3(name: string, age: number = 15, language?: string): string {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}

