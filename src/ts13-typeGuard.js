"use strict";
/**
 * 타입가드(Type Guard): 자동으로 타입의 범위를 좁혀 주는 타입스크립트의 기능
 * 타입가드를 잘 활용하면 as와 같은 타입 단언 코드를 피할 수 있기 때문에 생산성과 가독성이 높아짐
 */
Object.defineProperty(exports, "__esModule", { value: true });
function print(value) {
    if (typeof value === 'number' || typeof value === 'object')
        console.log(value.toFixed(2));
    else
        console.log(value.trim());
}
/**
 * as? as 앞에 있는 값의 타입을 개발자가 확신하는 경우에 그 타입을 적어줌으로써 타입스크립트에게 오른쪽에 있는 타입을 강제하는 기능
 * 타입스크립트는 number라고 생각하고 있지 않지만 개발자는 number라고 타입스크립트한테 주입하는 것
 * 이 키워드는 정말 어쩔 수 없는 경우에만 사용. as를 많이 사용할수록 버그의 위험도 높아짐
 * 위의 함수를 예로 들면, value의 타입이 number이거나 object일 수 있는데 as를 통해 number로 강제함 --> 버그 위험
 */
function print2(value) {
    if (typeof value === 'number')
        console.log((value).toFixed(2));
    else
        console.log((value).trim());
}
/**
 * 위 함수에서의 typeof는 자바스크립트의 typeof로 타입스크립트의 그것과는 다름
 * 위 함수의 typeof는 오른쪽 변수의 타입을 문자열로 반환하는 기능
 * 타입가드 기능 덕분에 as를 사용하지 않아도 if문의 value가 각각 number, string인 것을 인식하기 때문에 각각의 메소드 사용 가능
 */
// class 타입가드
/**
 * 클래스의 경우 instanceof라는 키워드 사용 가능
 * instanceof는 자바스크립트에도 있는 기능(값의 영역에서 사용하는 기능)
 * 아래 함수 print3의 instanceof를 예시로 보면, value가 Person 클래스에 포함된 속성인지 검사함
 */
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
function print3(value) {
    console.log(value.name);
    if (value instanceof Person)
        console.log(value.age);
    else
        console.log(value.price);
}
function print4(value) {
    console.log(value.name);
    // if (value instanceof Person1) console.log(value.age);    // Person1은 형식만 참조, 값으로 사용되지 않기 때문에 에러!
    // else console.log(value.price);
}
function print5(value) {
    if (value.type === 'a')
        console.log(value.age);
    else
        console.log(value.price);
}
/**
 * 인터페이스를 구별하기 위한 방법: 식별 가능한 유니온 타입을 이용하는 것(영어로 discriminated union이라 불림)
 * 인터페이스에서 식별 가능한 유니온 타입은 같은 이름의 속성을 정의하고 속성의 타입은 모두 겹치지 않게 정의하면 됨
 * 위의 print5 함수를 예로 들면, Person과 Product에는 type이라는 같은 이름의 속성을 정의하고, 각각 a와 b라는 타입으로 겹치지 않게 정의함
 * print5에서 value.type이 'a'이면 Person타입, 아니면 Product 타입
 * as와 같은 타입 단언 코드를 작성하지 않았음에도 Person에만 있는 age라는 속성을 사용하려고 할 때 에러가 나지 않음
 * 왜? 타입가드가 동작하기 때문
 */
// 식별 가능한 유니온 타입은 서로 겹치지 않기 때문에  switch문에서 사용하기 좋음
function print6(value) {
    switch (value.type) {
        case 'a':
            console.log(value.age);
            break;
        case 'b':
            console.log(value.price);
            break;
    }
}
function isPerson(x) {
    return x.age !== undefined;
}
function print7(value) {
    if (isPerson(value))
        console.log(value.age);
    else
        console.log(value.price);
}
/**
 * 위의 인터페이스에는 type 속성이 없고, age와 price 속성의 차이로 구별할 수 있음
 */
//위의 방법보다 속성 이름을 검사하는 방법이 더 간편함
function print8(value) {
    if ('age' in value)
        console.log(value.age);
    else
        console.log(value.price);
}
/**
 * 하지만 속성의 수가 많고, 같은 이름이 중복되면 이런 방법은 사용하기 힘들기 때문에 그럴 때는 식별 가능한 유니온 타입을 사용하면 더 좋음
 */ 
