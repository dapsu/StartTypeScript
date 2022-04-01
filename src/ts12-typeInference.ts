/**
 * 정적 타입 언어 단점: 타입을 정의하는데 시간과 노력이 많이 들기 때문에 생산성 저하될 수 있음
 * 타입스크립트는 다양한 경우에 대해 타입 추론을 제공하기 때문에 꼭 필요한 경우에만 타입 정의를 할 수 있음
 * 타입 추론 덕분에 코드를 덜 작성하면서도 같은 수준의 타입 안정성을 유지할 수 있음
 * 타입 추론: 타입을 정의하지 않아도 타입을 추론해 줌
 */

export {};

let v1 = 123;
let v2 = "abc";
// v1 = 'a';       // number 형식에 string 할당 불가능
// v2 = 456;       // string 형식에 number 할당 불가능
/**
 * v1, v2 변수에 타입을 정의하지 않았음에도 불구하고 v1은 숫자, v2는 문자열로 타입이 정의됨
 * 즉 자동으로 타입을 추론해 줌
 */

const v4 = 123;     // v4의 타입은 number가 되는 것이 아니고 123타입을 가지게 됨
const v5 = 'abc';
let v6: typeof v1 = 234;
// let v7: typeof v4 = 234;    // v7은 123타입을 가지기 때문에 에러 발생
/**
 * let은 재할당이 가능한 반면 const는 재할당이 불가능하기 때문에 let변수보다 엄격하게 타입이 결정됨 (물론 let도 재선언은 불가)
 *  v7같은 경우도 123 타입만 사용 가능
 */


// 배열과 객체의 타입 추론
const arr1 = [10, 20, 30];      // 배열의 타입을 정의하지 않아도 숫자 원소들만 있으면 타입은 number로 정의됨
const [n1, n2, n3] = arr1;      // 비구조화(destructing) 할당을 하는 경우에도 각 변수는 자동으로 타입 추론이 됨
// arr1.push('a');             // string 형식이기 때문에 에러

const obj = { id: 'asdf', age: 123, langauage: 'ko' };      // 객체 역시 자동으로 타입 추론이 됨
const { id, age, langauage } = obj;     // 마찬가지로 비구조화 할당을 했을 때도 자동으로 타입 추론 됨
// console.log(id === age);    // error TS2367: This condition will always return 'false' since the types 'string' and 'number' have no overlap


// 인터페이스에서의 타입 추론
interface Person {
    name: string;
    age: number;
}
interface Korean extends Person {
    liveInSeoul: boolean;
}
interface Japanese extends Person {
    liveInTokyo: boolean;
}

const p1: Person = {name: 'mike', age: 23};
const p2: Korean = {name: 'mike', age: 25, liveInSeoul: true};
const p3: Japanese = {name: 'mike', age: 27, liveInTokyo: false};
const arr2 = [p1, p2, p3];      // const arr2: Person[]
const arr3 = [p2, p3];          // const arr3: (Korean | Japanese)[]
/**
 * 배열의 각 원소들의 타입이 다를 때는? 여러 가지 타입을 하나로 통합하는 과정을 거침
 * 다른 타입으로 할당 가능한 타입은 제거됨
 * arr1의 경우 Korean과 Japanese 타입은 둘 다 Person에 할당 가능하기 때문에 제거되고 Person만 남음
 * arr2은 서로 할당관계에 있지 않기 때문에 제거되는 것은 없고 유니온 타입으로 묶여서 나옴 
 */


// 함수의 타입 추론
function func1(a= 'abc', b = 10) {
    return `${a}, ${b}`;
}
// func1(3, 6);    // 첫 번째 매개변수는 문자열 타입이기 때문에 에러
// const v8: number = func1('a', 1);   // 함수는 문자열 타입을 반환하기 때문에 에러
/**
 * 매개변수에 타입을 정의하지 않아도 값의 타입에 따라 자동으로 타입 선언됨
 * 즉 a는 string, b는 number 타입으로 정의됨
 * 또한 함수가 문자열을 반환하기 때문에 함수의 타입은 string으로 자동 정의됨
 */

function func2(value: number) {
    if (value < 10) return value;
    else return `${value} is too big`;
}
/**
 * 반환이 여러 개 있는 함수도 타입 추론 가능
 * func2의 타입은 number | string 으로 정의됨
 * 이렇게 반환이 많은 경우 타입을 따로 입력하지 않아도 자동으로 타입이 추론되기 때문에 편하게 코드 작성 가능
 * 물론 필요한 경우 명시적으로 입력하면 됨!
 */