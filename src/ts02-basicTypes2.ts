export {};

// undefined와 null 역시 타입으로 정의 가능
let v1: undefined = undefined;
let v2: null = null;
// v1 = 123;   // <--- error TS2322: Type '123' is not assignable to type 'undefined'. 

// undefined와 null은 보통 다른 타입과 같이 사용됨
// 기호 " | " 은 유니온 타입
let v3: number | undefined = undefined;
v3 = 123;

console.log("typeof undefined =>", typeof undefined);       // typeof undefinde => undefined
console.log("typeof null =>", typeof null);                 // typeof null => object
/**
 * js에서 undefined는 undefined라는 타입으로 존재하지만, 
 * null은 타입으로 존재하지 않고 object로 표현됨
 */


// TS는 숫자와 문자열의 리터럴도 타입으로 정의 가능
let v4: 10 | 20 | 30;   // v1은 10 or 20 or 30을 가질 수 있는 타입
v4 = 10;
// v4 = 15;    // <--- error TS2322: Type '15' is not assignable to type '10 | 20 | 30'.

let v5: "경찰관" | "소방관";
// v5 = "의사";    // <--- error TS2322: Type '"의사"' is not assignable to type '"경찰관" | "소방관"'.


// any타입을 통해 모든 값을 포함하는 타입 사용 가능
let value: any;
value = 123;
value = "456";
value = () => {};
/**
 * any타입은 기존에 자바스크립트 코드로 작성된 프로젝트를 타입스크립트로 포팅하는 경우 유용하게 사용 가능
 * 기존 프로젝트의 모든 코드에 타입을 한 번에 정의하는 것은 부담되기 때문에 타입 에러가 나는 부분은
 * 임시로 any타입으로 정의하면 됨
 * any타입은 타입을 알 수 없는 경우나 타입 정의가 안 된 외부 패키지를 사용하는 경우에도 사용하기 좋음
 * 단, any타입을 남발하면 TS 사용 의미가 퇴색되기 때문에 되도록 피하는 것이 좋음
 */


// void, never 타입
function f1(): void {
    console.log("hello");
}

function f2(): never {
    throw new Error("some error");
}

function f3(): never {
    while (true) {
        // ..
    }
}
/** 
 * void: 아무 값도 반환하지 않고 종료되는 함수의 반환 타입은 void타입으로 정의할 수 있음
 * never: 항상 예외가 발생해서 비정상적으로 종료되거나 무한루프 때문에 종료되지 않는 함수의 반환 타입은 never타입으로 정의
 * 보통 never는 거의 사용하지 않음
 */


// 객체 타입 object
let v6: object;
v6 = {name: "dapsu"};
// console.log(v6.age);    // <--- error TS2339: Property 'age' does not exist on type 'object'.


// 유니온( | ), 인터섹션( & )
let v7: (1 | 3 | 5) & (3 | 5 | 7);
v7 = 3;
// v7 = 1; // <--- error TS2322: Type '1' is not assignable to type '3 | 5'. 3과 5만 사용 가능하다는 문구 나옴
/**
 * 유니온과 인터섹션을 이용하여 여러 타입의 교집합과 합집합을 표현할 수 있음
 */


// type키워드로 타입 별칭 주기
type width = number | string;
let width: width;
width = 100;
width = "100px";