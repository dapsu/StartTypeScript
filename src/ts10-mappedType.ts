/** Mapped Type
 * A라는 인터페이스가 있을 때 A에 있는 모든 속성을 optional로 바꾸거나 readonly로 바꾸는 이러한 일을 맵드타입을 이용해서 할 수 있음
 */

export {};

// mapped type의 문법
type T1 = { [K in 'prop1' | 'prop2']: boolean};
/**
 * 맵드타입으로 만드는 것은 객체타입이기 때문에 중괄호 있고, 그안에 대괄호가 있음
 * 대괄호는 key 부분을 나타냄
 * 대괄호 안에 in 이라는 키워드를 사용함
 * 변수명 K는 아무거나 해도 상관 없음
 * in 오른쪽에 있는 키워드들이 전체 객체의 속성으로 만들어짐
 * T1에 마우스를 올리면 다음과 같이 나옴
    type T1 = {
        prop1: boolean;}
        prop2: boolean;
    }   
 */


// 인터페이스의 모든 속성을 boolean 타입으로 만들어주는 맵드 타입
interface Person {
    name: string;
    age: number;
}

type MakeBoolean<T> = { [P in keyof T]?: boolean};  // keyoffh 제너릭T의 키들이 유니온 타입으로 만들어짐. ?를 사용했기 때문에 선택 속성
const pMap: MakeBoolean<Person> = {};               // MakeBoolean안에 Person 입력
pMap.name = true;       // 원래 string타입인데 boolean으로 바뀜. 선택 속성이기 때문에 undefined도 가능
pMap.age = false;       // 원래 number타입인데 boolean으로 바뀜. 선택 속성이기 때문에 undefined도 가능


// readonly 맵드 타입 정의
type T2 = Person['name'];
type Readonly<T> = { readonly [P in keyof T]: T[P] };       // T의 모든 키의 속성에 readonly 붙임
type Partial<T> = { [P in keyof T]?: T[P] };
type T3 = Partial<Person>;
type T4 = Readonly<Person>;
/**
 * T[P]? T2처럼 인터페이스에 속성 이름을 적어주면 그 속성의 값의 타입을 의미함. T2는 문자열임
 * 즉 T[P]는 각 속성의 원래 값의 타입을 적어준 것. name은 string, age는 number  (값의 변화를 주지 않은 것)
 * 이렇게 맵드 타입을 이용하면 함수처럼 사용할 수 있는데, 일종의 유틸리티 타입이라고 보면 됨
 * 사실 Readonly와 Partial은 타입스크립트에 내장되어 있기 때문에 주석 처리해도 사용 가능
 */


// Pick 타입
type Pick<T, K extends keyof T> = { [P in K]: T[P]};    // Pick도 내장타입

interface Person {
    name: string;
    age: number;
    language: string;
}
type T5 = Pick<Person, 'name' | 'language'>;


// Record 타입. 역시 내장 타입
type Record<K extends string, T> = { [P in K]: T };
type T6 = Record<'p1' | 'p2', Person>;      // p1과 p2 속성으로 이루어지고 Person 타입을 값으로 가지는 객체를 만들겠다


// enum 타입 활용도 높이기
enum Fruit {
    Apple,
    Banana,
    Orange
}

const fruitPrice = {
    [Fruit.Apple]: 1000,
    [Fruit.Banana]: 1500,
    [Fruit.Orange]: 2000
};
// 만약 Fruit enum에 새로운 과일을 추가하게 되면 fruitPrice 객체에 새로 추가된 과일 속성을 추가해야 하는 번거로움이 있음

const fruitPrice2: { [key in Fruit]: number} = {
    [Fruit.Apple]: 1000,
    [Fruit.Banana]: 1500,
    [Fruit.Orange]: 2000,
};
// 객체를 맵드 타입으로 활용하면 enum의 모든 속성을 적지 않으면 에러가 나기 때문에 실수로 누락해도 바로 정정할 수 있음