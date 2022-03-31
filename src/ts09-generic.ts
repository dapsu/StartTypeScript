/**
 * 제네릭(Generic): 타입 정보가 동적으로 결정되는 타입
 * 제네릭을 통해 같은 규칙을 여러 타입에 적용할 수 있기 때문에 타입 코드를 작성할 때 발생할 수 있는 중복 코드를 제거할 수 있음
 */

export {};

function makeNumberArray(defaultValue: number, size: number): number[] {
    const arr: number[] = [];
    for (let i = 0; i < size; i++) arr.push(defaultValue);
    return arr;
}
function makeStringArray(defaultValue: string, size: number): string[] {
    const arr: string[] = [];
    for (let i = 0; i < size; i++) arr.push(defaultValue);
    return arr;
}
const arr1 = makeNumberArray(1, 10);
const arr2 = makeStringArray('empty', 10);
console.log(arr1);      // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
console.log(arr2);      // ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']


// 함수 오버로드. 위의 두 함수를 이처럼 하나로 만들 수 있음
// 필요한 타입 정의
function makeArray(defaultValue: number, size: number): number[];
function makeArray(defaultValue: string, size: number): string[];
// 로직 정의
function makeArray(defaultValue: number | string, size: number): Array<number | string> {
    const arr: Array<number | string> = [];
    for (let i = 0; i < size; i++) arr.push(defaultValue);
    return arr;
}
const arr3 = makeArray(1, 10);
const arr4 = makeArray('empty', 10);
/**
 * 하지만 이 방법은 number와 string만 입력 가능함
 * 타입을 추가하고 싶으면 타입 정의, 매개변수들의 타입 정의 등 많은 코드 수정해야 하기 때문에 번거로워질 수 있음
 * 이를 해결할 수 있는 것이 제네릭!
 */


// 제네릭
function makeArr<T>(defaultValue: T, size: number): T[] {
    const arr: T[] = [];
    for (let i = 0; i < arr.length; i++) arr.push(defaultValue);
    return arr;
}
const arr5 = makeArr<number>(1, 10);
const arr6 = makeArr<string>('empty', 10);
const arr7 = makeArr(1, 10);
const arr8 = makeArr('empty', 10);
/**
 * 제네릭은 함수 이름 오른쪽에 <>를 이용해서 입력할 수 있음
 * T는 원하는 이름으로 정할 수 있고, 현재 T라는 것의 타입은 정해지지 않음
 * T의 타입은 나중에 동적으로 결정될 것
 * T는 매개변수 쪽과 구현하는 쪽 모두 사용할 수 있음
 * arr5, arr6처럼 함수를 호출할 때 <>를 이용하여 타입 정의
 * 하지만 타입스크립트는 유연하기 때문에 arr7, arr8처럼 타입을 따로 정의하지 않아서 자동으로 숫자와 문자열로 정의됨
 */


// 제네릭은 데이터의 타입에 다양성을 부여해주기 때문에 자료구조에서 많이 사용됨
class Stack<D> {
    private items: D[] = [];
    push(item: D) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
}

const numStack = new Stack<number>();
numStack.push(10);
const v1 = numStack.pop();
const strStack = new Stack<string>();
strStack.push('a');
const v2 = strStack.pop();

let myStack: Stack<number>;
myStack = numStack;
// myStack = strStack;     // string 형식은 number 형식에 할당 불가능하기 때문에 에러!


// 리액트와 같은 라이브러리의 API는 입력 가능한 값의 범위를 제한함
// 이를 위해 제네릭은 타입의 종류를 제한할 수 있는 기능을 제공
function identity<T extends number | string>(p1: T): T {    // A extends B : A가 B에 할당 가능해야 한다
    return p1;
}
identity(1);
identity('a');
// identity(true);       // never[]형식의 인수는 number | string 형식의 매개변수에 할당 불가능


// extends 키워드 자세히 알아보기
interface Person {
    name: string;
    age: number;
}

interface Korean extends Person {
    liveInSeoul: boolean;
}

function swapProperty<T extends Person, K extends keyof Person> (p1: T, p2: T, key: K): void {  
    const tmp = p1[key];
    p1[key] = p2[key];
    p2[key] = tmp;
}
/**
 * keyof? Person의 모든 속성의 이름을 나열한 것
 * type T1 = keyof Person;  // type T1 = "name" | "age"
 * 즉 K는 name과 age에 할당 가능한 값이어야 함 
 */

const p1: Korean = {
    name: '기리',
    age: 30,
    liveInSeoul: true
};

const p2: Korean = {
    name: '우니',
    age: 29,
    liveInSeoul: false
};
swapProperty(p1, p2, 'age');    // 세 번째 매개변수에는 age, name만 나옴. 다른 키 입력 불가능
console.log(p1);    // { name: '기리', age: 29, liveInSeoul: true }
console.log(p2);    // { name: '우니', age: 30, liveInSeoul: false }