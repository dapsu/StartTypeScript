"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    // private name: string;
    // #name: string;  // 속성 이름 앞에 # 붙이면 private으로 정의한다는 것과 동일함
    constructor(name) {
        this.name = name;
        // this.#name = name;
    }
    sayHello() {
        console.log(`Hola!! Me yamo ${this.name}`);
        // console.log(`Hola!! Me yamo ${this.#name}`);
    }
}
class Programmer extends Person {
    constructor(name) {
        super(name); // 자식 클래스의 컨스트럭터에서는 반드시 super를 호출해야 함(부모 클래스의 컨스트럭터가 호출됨  )
    }
    // method override: 부모의 sayHello가 아닌 자식의 함수가 호출됨
    sayHello() {
        // this.name;      // 만약 부모 클래스의 name이 private이면 에러 발생
        // this.#name;      // 만약 부모 클래스의 name이 private이면 에러 발생
        super.sayHello(); // 부모의 함수를 호출하기 위해서는 super.sayHello()를 호출해야 함
        console.log('난 프로그래머다');
    }
}
const programmer = new Programmer('dapsu');
programmer.sayHello();
// Hola!! Me yamo dapus
// 난 프로그래머다
const person = new Person('홍길동');
console.log(person.name); // private일 때 에러남
// 접근범위 설정 키워드: public, protected, private
/**
 * public: 외부에도 노출하면서 상속받는 쪽에도 노출을 하는 것
 * private: 외부에도 노출하지 않고 상속받는 쪽에도 노출하지 않는 것
 * protected: 외부에는 노출하지 않지만 상속받는 쪽에만 노출
 * 메소드를 정의할 때 따로 설정하지 않으면 기본값으로 public이 사용됨
 */
// 타입스크립트 접근범위 편의 기능
class Person2 {
    // 변수 선언, 초기화하는 코드도 필요 없음. 자동으로 해줌
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const person2 = new Person2('dapsu', 30);
console.log(person2.name, person2.age); // dapsu 30
// getter, setter
class Person3 {
    constructor() {
        this._name = '';
    }
    // getter 정의
    get name() {
        console.log('getter called');
        return this._name;
    }
    // setter 정의
    set name(newName) {
        if (newName.length > 10) {
            throw new Error('최대 길이를 넘었습니다');
        }
        this._name = newName;
    }
}
let person3 = new Person3();
person3.name = "dapsu"; // getter called
console.log(person3.name); // dapsu
// person3.name = "우주제일초절정킹갓미소년";      //   Error: 최대 길이를 넘었습니다
// static키워드 이용하여 정적 멤버 변수와 정적 메소드 정의
class Person4 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log(`안녕하세요 저는 ${this.name}입니다`);
        console.log(Person4.getIsAdult(this.age) ? '삐빅! 성인입니다' : "삐빅! 청소년입니다");
    }
    static getIsAdult(age) {
        return Person4.adultAge <= age;
    }
}
Person4.adultAge = 20;
const person4 = new Person4('killdong', 24);
person4.sayHello();
console.log(`성인 판단 기준 나이: ${Person4.adultAge}`);
