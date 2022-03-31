/** 조건부 타입 (Conditional Type)
 * 조건부 타입: 입력된 제네릭 타입에 따라 타입을 결정할 수 있는 기능
 * 조건부 타입의 문법: T extends U ? X : Y
 * 제네릭으로 입력된 어떤 타입 T가 U에 할당 가능하다면 X, 아니면 Y 타입 사용
 */

export {};

type IsStringType<T> = T extends string ? 'yes' : 'no';
type T1 = IsStringType<string>;     // T1 = "yes"
type T2 = IsStringType<number>;     // T2 = "no"
/**
 * T가 문자열로 할당이 가능하다면 yes라는 문자열 리터럴 타입 사용
 * 아니라면 no 타입 사용
 * 주의할 점: 자바스크립트의 삼항연산자와 비슷해보이지만 다름!
 * 조건부 타입은 값을 다루는 것이 아니라 타입을 다루는 것임
 */


// 조건부 타입은 유니온 타입과 자주 사용됨
type T3 = IsStringType<string | number>;    // T3 = "yes" | "no"
type T4 = IsStringType<string> | IsStringType<number>;      // T4 = "yes" | "no"
/**
 * 조건부 타입은 유니온 타입과 같이 사용되면 T3, T4처럼 독특하게 사용 가능
 * 단, 조건부 타입 + 유니온 타입일 때만 이런 결과 나옴!
 */

type Array2<T> = Array<T>;
type T5 = Array2<string | number>;
/**
 * T5는 T3, T4처럼 조건부 타입을 쓰지 않았기 때문에 
 * string[] | number[] 이런 타입이 만들어지지 않음
 * 조건부 타입이 아니기 때문에 T5는 문자열 또는 숫자의 배열이 됨. (string | number)[]
 */


// Exclude, Extract
type T6 = number | string | never;  // 유니온 타입에 있는 never는 해당되는 속성을 제외시킴
// Exclude: T가 U에 할당 가능한 타입 제거
type Exclude<T, U> = T extends U ? never : T;
type T7 = Exclude<1 | 3| 5 | 7, 1| 5| 9>;   // T7 = 3 | 7
type T8 = Exclude<string | number | (() => void), Function>;    // Function에 해당되는 것은 제거. T8 = string | number
// Extract: T가 U에 할당 가능하지 않으면 타입 제거
type Extract<T, U> = T extends U ? T : never;
type T9 = Extract<1 | 3 | 5 | 7, 1 | 5 | 9>;     // T9 = 1 | 5


// Return Type: T가 함수일 때 T 함수의 반환 타입을 뽑아줌
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
/**
 * 함수 T가 extends 뒤의 함수에 할당 가능한 타입이면 R이라는 것을 사용
 * R: 이 함수의 반환 타입 의미
 * 타입 추론을 위해 infer라는 키워드 사용
 * infer 키워드는 조건부 타입을 사용할 때 extends 키워드 뒤에서 이렇게 사용됨 
 */

function f1(s: string): number {
    return s.length;
}
type T10 = ReturnType<typeof f1>;       // T10 = number;
/**
 * 리턴타입은 제네릭에 함수만 입력할 수 있기 때문에 값으로부터 타입을 가져오기 위해서 typeof 키워드 사용함
 */


// infer 키워드 자세히 알아보기
type Unpacked<T> = T extends (infer U) []           // T 타입이 어떤 값의 배열이면(어떤 배열인지는 아직 정해지지 않았기 때문에 infer)
    ? U                                             // U 배열의 타입을 사용하겠다
    : T extends (...args: any[]) => infer U         // 배열이 아닐 시, 함수에 할당 가능한 타입이라면 
    ? U                                             // 함수의 반환 타입을 사용하겠다
    : T extends Promise<infer U>                    // 아니라면 프로미스에 할당 가능한 타입이라면(프로미스의 어떤 값인지는 아직 결정X --> infer)
    ? U                                             // 프로미스의 값인 U를 사용하겠다
    : T;                                            // 모두 만족하지 않으면 자기 자신인 T 사용

type T11 = Unpacked<string>;
type T12 = Unpacked<string[]>;
type T13 = Unpacked<() => string>;
type T14 = Unpacked<Promise<string>>;
type T15 = Unpacked<Promise<string>[]>;
type T16 = Unpacked<Unpacked<Promise<string>[]>>;


// 조건부 타입 사용하여 몇 가지 유틸리티 타입 만들어보기

// 인터페이스에서 값이 문자열인 속성 이름을 추출하는 유틸리티 타입
type StringPropertyNames<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Person {
    name: string;
    age: number;
    nation: string;
}
type T17 = StringPropertyNames<Person>;

type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
type T18 = StringProperties<Person>;    // Pick을 통해 스트링 타입의 속성만 모아놓은 객체 생성


// Omit
type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
type T19 = Omit<Person, 'nation' | 'age'>;  // Person인터페이스에서 nation과 age를 제거한다 는 의미


// Overwrite
/**
 * 타입스크립트에 내장된 타입은 아님
 * 두 인터페이스를 받아서 T라는 인터페이스를 베이스로 해서 U를 T로 덮어쓰겠다!
 */
type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;  // T와 U 중에서 겹치는 것은 Exclude로 제거, 그후 U와 교집합

interface Person {
    name: string;
    age: number;
}
type T20 = Overwrite<Person, {age: string; nation: string}>;
const p: T20 = {
    name: 'mike',
    age: '23',
    nation: 'Korea'
};