/** 타입 호환성
 * 타입 호환성: 어떤 타입을 다른 타입으로 취급해도 되는지 판단하는 것
 * 정적 타입 언어의 가장 중요한 역할은 타입 호환성을 통해 컴파일 타임에 호환되지 않는 타입을 찾아내는 것
 * 어떤 변수가 다른 변수에 할당 가능하기 위해서는 해당 변수의 타입이 다른 변수의 타입에 할당 가능해야 함
 * 할당 가능을 판단할 때는 타입이 가질 수 있는 값의 집합을 생각하면 이해하기 쉬움
 */

export {};

function func1(a: number, b: number | string) {
    // const v1: number | string = a;
    // const v2:number = b;    // 타입 number | string은 number형식에 할당 불가능, string형식은 number형식에 할당 불가능
}
/**
 * 매개변수 b는 숫자와 문자열로 이루어진 값의 집합인데 v2는 숫자 형식만 가능
 * 즉 b의 값의 집합이 v2의 값의 집합보다 더 크기 때문에 더 큰 값의 집합을 더 작은 값의 집합으로 넣을 수 없기 때문에 에러. 할당 불가능
 * 반대로 매개변수 a보다 v1의 값의 집합이 더 크기 때문에 할당 가능
 */

function func2(a: 1 | 2) {
    // const v1: 1 | 3 = a;    //1 | 2 형식은 1 | 3 형식에 할당 불가능, 2 형식은 1 | 3 형식에 할당 불가능
    // const v2: 1 | 2 | 3 = a;
}


// structural typing: 타입스크립트는 값 자체의 타입보다는 값이 가진 내부 구조에 기반해서 타입 호환성을 검사함
interface Person {
    name: string;
    age: number;
}

interface Product {
    name: string;
    age: number;
}
const person: Person = {name: 'mike', age: 23};
const product: Product = person;
/**
 * Person과 Product는 서로 타입 이름이 다르지만 내부 구조는 같기 때문에 Person과 Product는 서로 할당 가능
 * 많은 정적 타입 언어들은 이런 경우 할당 가능하지 않지만 타입스크립트는 structural typing을 사용하기 때문에 할당 가능
 * 
 * ** 인터페이스 A가 인터페이스 B로 할당 가능하기 위한 조건
 *     1. B에 있는 모든 필수 속성의 이름이 A에도 존재해야 한다.
 *     2. 같은 속성 이름에 대해 A의 속성이 B의 속성에 할당 가능해야 한다.
 */


interface Person1 {
    name: string;
}

interface Product1 {
    name: string;
    age: number;
}

const obj = {name: 'mike', age: '23', city: 'abc'};
// let person1: Person1 = obj;
// let product1: Product1 = obj;    // age가 문자열 값을 가지기 때문에 에러 발생
// product1 = person1;              // age가 person1에는 없지만, product1에서는 필수 형식이기 때문에 에러 발생
// person1 = product1;
/**
 * Person1의 값의 집합이 Product1 값의 집합보다 더 크다고 볼 수 있음
 * 즉 person1의 값의 집합이 더 크기 때문에 product1에 넣을 수 없음. 반대로 person1에는 product1 할당 가능
 */


// 인터페이스에 선택속성이 있는 경우
 interface Person2 {
    name: string;
    age?: number;
}

interface Product2 {
    name: string;
    age: number;
}

const obj2 = {
    name: 'mike'
};
// const person2: Person2 = obj2;
// const product2: Product2 = obj2;    // age속성이 없기 때문에 에러
/**
 * Person2같은 경우 age가 선택 속성이기 때문에 obj2를 넣어도 문제 없음
 * 반면에 product2는 age가 필수 속성이기 때문에 obj2보다 더 작은 값의 집합을 가지므로 할당 불가능
 */


// 함수의 타입 호환성
/** 다음은 함수 타입 A가 함수 타입 B로 할당 가능하기 위한 조건이다.
 * 1. A의 매개변수 개수가 B의 매개변수 개수보다 적어야 한다.
 * 2. 같은 위치의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당 가능해야 한다.
 * 3. A의 반환값은 B의 반환값으로 할당 가능해야 한다.
 */
type F1 = (a: number, b: string) => string;
type F2 = (a: number, b: string | number) => string;
type F3 = (a: number) => string;
type F4 = (a: number) => number | string;
let f1: F1 = (a, b) => `${a} ${b.length}`;
let f2: F2 = (a, b) => `${a} ${b}`;
let f3: F3 = a => `${a}`;
let f4: F4 = a => (a < 10 ? a : 'too big');

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