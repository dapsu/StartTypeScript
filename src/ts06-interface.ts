/**
 * 자바와 같은 다른 언어에서 인터페이스는 클래스를 구현하기 전에 필요한 메소드를 정의하는 용도로 쓰임
 * 타입스크립트에서는 더 다양한 것들을 정의하는데 사용됨
 * 타입스크립트에서 인터페이스로 정의할 수 있는 타입의 종류와 인터페이스로 타입을 정의하는 방법에 대해서 알아보자.
 */

export {};

// 객체에 타입을 정의하는 방법
/**
 * 인터페이스 키워드 오른쪽에 타입의 이름을 적는다.
 * 괄호 안에 필요한 속성을 입력한다.
 * 선택속성은 속성 이름 오른쪽에 ? 기호를 붙인다.
 * readonly속성은 읽기 전용이기 때문에 변경 불가능
 */
interface Person {
    name: string;
    readonly nickname: string;
    age?: number;
    // age: number | undefined;     // 이 방식은 선택속성 아님. age 항상 입력해야 함
}
const p1: Person = {name: 'leo', nickname: 'dapsu', age: 30};
// p1.nickname = 'handsom guy';    // 읽기 전용 속성으로 에러 발생

// 객체가 정의되지 않은 속성값을 가지고 있어도 할당 가능
const p2 = {
    name: 'mike',
    nickname: 'nike',
    birthday: '2022-02-22'
}
const p3: Person = p2;  // 가능한 이유? p3타입이 p2타입을 포함하는 더 큰 타입이기 때문(타입 호환성 부분에서 자세히 다룰 예정)

// 인덱스 타입: 인터페이스에서 속성 이름을 구체적으로 정의하지 않고 값의 타입만 정의하는 것
interface Person2 {
    name: string;
    age: number;
    [key: string]: string | number; // 인덱스 타입
}
const p4: Person2 = {
    name: 'loo',
    birthday: "2022-02-22",     // 인덱스 타입에 의해 가능
    age: 25,
};


// 자바스크립트는 속성 이름이 숫자면 내부적으로 문자열로 변환해서 사용함
// 타입스크립트에서는 숫자인 속성 이름의 값이 문자열인 속성 이름의 값으로 할당 가능한지 검사함
interface YearPriceMap {
    [year: number]: number;             // 이 숫자의 값 A는 B로 할당이 가능해야 한다.
    [year: string]: string | number;    // 이게 가능하기 위해서는 문자열과 숫자 둘다 정의되어야 함
}
const yearMap: YearPriceMap = {};
// yearMap[1998] = 1000;
// yearMap[1998] = '1000';     // 에러
// yearMap['2000'] = 1234;
// yearMap['2000'] = '1234';   // 이것도 에러. 왜? 타입스크립트 4.4부터 스펙 변경. 인덱스로 문자열을 입력해도 숫자로 파싱 가능하면 숫자로 인식


// 인터페이스로 함수 타입 정의
interface getText {
    (name: string, age: number): string;
}
// 위의 인터페이스와 같은 것임: type GetText = (name: string, age: number) => string;
const getText: getText = function(name, age) {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}`;
}


// 자바스크립트에서는 함수도 속성값을 가질 수 있음
interface getText2 {
    (name: string, age: number): string;
    totalCall?: number;     // 인터페이스를 정의할 때 함수의 속성값도 이렇게 정의할 수 있음
}
const getText2: getText2 = function(name, age) {
    if (getText2.totalCall !== undefined) {
        getText2.totalCall++;
        console.log(`totalCall: ${getText2.totalCall}`);
    }
    return "";
}
// getText2.totalCall = 0;
// getText2('', 0);
// getText2('', 0);


// 인터페이스 class로 구현
interface Person3 {
    name: string;
    age: number;
    isYoungerThan(age: number): boolean;
}

class SomePerson implements Person3 {
    name: string;
    age: number;
    constructor(name:string, age: number) {
        this.name = name;
        this.age = age;
    }
    isYoungerThan(age: number) {
        return this.age < age;
    }
}


// 인터페이스 확장
interface Person4 {
    name: string;
    age: number;
}
interface Korean extends Person4 {
    isLiveInSeoul: boolean;
}
/**
 * Korean에는 Person4의 속성들과 isLiveSeoul의 속성이 들어있음
 interface Korean extends Person4 {
     name: string;
     age: number;
     isLiveInSeoul: boolean;
 }
 */

 // 인터페이스 여러 개로 확장도 가능
 interface Programmer {
     language: string;
 }

 interface Korean2 extends Person4, Programmer {
     city: string;
 }


 // &으로 속성값의 교집합
 interface Product {
     name: string;
     price: number;
 }
 type PP = Person4 & Product;
 const pp: PP = {
     name: 'a',
     age: 23,
     price: 1000
 };
 // 교집합이 속성에 대한 교집합이 아니라, 타입이 가질 수 있는 값의 집합에 대한 교집합이기 때문에 가능(자세한 것은 타입 호환성 부분에서!)