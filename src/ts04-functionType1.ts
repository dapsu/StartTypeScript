export {};

function getText(name: string, age: number): string {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? "senior" : "junior";
    return `name: ${nameText}, age: ${ageText}`;
}

// const v1: string = getText("mike", 23);
// const v2: string = getText("mike", "23");   // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
// const v3: number = getText("mike", 23);     // error TS2322: Type 'string' is not assignable to type 'number'.
/**
 * 위의 함수는 string타입이기 때문에 반환값이 string이어야 함
 */


// 화살표함수로는 이렇게 표현 가능
const getText2: (name: string, age: number) => string = (name, age) => {    // 함수를 구현하는 코드에서는 타입을 정의할 필요 없음
    return "";
}


// 선택 매개변수(optional parameters)
function getText3(name: string, age: number, language?: string): string {
    const nameText = name.substring(0, 10);
    const ageText = age >= 35 ? "senior" : "junior";
    const languageText = language ? language.substring(0, 10) : "";
    return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}

// getText3("dapus", 30, "ko");
// getText3("dapus", 30);
// getText3("dapus", 30, 123);     // error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
/**
 * 매개변수 이름 오른쪽에 물음표 기호를 입력하면 선택 매개변수가 됨
 * language는 문자열도 가능하고 undefined일수도 있음
 * 단, 문자열이 아닌 타입은 에러 발생
 * 선택 매개변수는 마지막 순서에만 있어야 함
 * 다만 
    unction getText3(name: string, age: number | undefined, language: string): string { ...
    getText3("dapsu", undefined, "ko");
 * 이렇게 사용이 가능하지만, 사용성과 가독성이 좋지 않음
 */


// 매개변수 디폴트값 설정
function getText4(name: string, age: number = 15, language = "ko"): string {
    return "";
}
console.log(getText4('dapsu'));
/**
 * age 매개변수 같은 경우, 변수에 값을 부여하지 않아도 15라는 디폴트값이 있음
 * language는 string으로 타입을 정의하지 않았지만, 기본값이 "ko"라는 문자열이 있기 때문에 자동으로 string으로 정의
 * 
 */


// 나머지 매개변수(rest parameters)
function getText5(name: string, ...rest: number[]): string {
    return "";
}
// console.log(getText5("dapsu", 1, 2, 3));
// console.log(getText5("dapsu", 1, 2, "3"));  // <---  error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
/**
 * rest parameters의 타입은 항상 배열로 정의해야 함
 * 위에서는 number의 배열로 정의되어 있기 때문에 문자열이 변수로 들어가면 에러남
 */