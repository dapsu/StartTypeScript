export {};

// enum 타입
enum Fruit {
    Apple,
    Banana = 5,
    Orange,
}

const v1: Fruit = Fruit.Apple;
const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana;

console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);   // output: 0 5 6

// 이름과 값이 양방향으로 매핑됨
console.log(Fruit.Banana);      // 5
console.log(Fruit["Banana"]);   // 5
console.log(Fruit[5]);          // Banana
/**
 * enum타입은 js에는 없고 ts에만 있음
 * 보통 자바와 같은 다른 언어에서는 enum이 존재함
 * enum 안에 있는 원소는 타입뿐만 아니라 값으로도 사용 가능. 첫 번째 원소에 값을 할당하지 않으면 자동으로 0이 할당
 * enum의 각 원소에는 숫자 또는 문자열을 할당할 수 있음
 * 명시적으로 값을 입력하지 않으면 이전 원소에서 1만큼 증가한 값이 할당됨
 * enum의 각 원소는 이름과 값이 양방향으로 매핑이 됨

    *** 컴파일했을 때 ***
    var Fruit;
    (function (Fruit) {
        Fruit[Fruit["Apple"] = 0] = "Apple";
        Fruit[Fruit["Banana"] = 5] = "Banana";
        Fruit[Fruit["Orange"] = 6] = "Orange";
    })(Fruit || (Fruit = {}));

 * enum은 객체로 사용되기 때문에 해당 객체를 런타임에 사용할 수도 있음
 */

enum Language {
    Korean = "ko",
    English = "en",
    Japanese = "jp",
}
/**
 * enum 아이템의 값은 숫자뿐만 아니라 문자열로도 입력 가능
 * 문자열은 컴파일했을 때 숫자와 다른 코드가 나옴

    *** 컴파일 ***
    var Language;
    (function (Language) {
        Language["Korean"] = "ko";
        Language["English"] = "en";
        Language["Japanese"] = "jp";
    })(Language || (Language = {}));

 * enum의 원소에 숫자를 할당하면 양방향으로 매핑된 것과 다르게
 * 문자열을 할당하는 경우에는 단방향으로 매핑됨
 */

function getIsValidEnumValue(enumObject: any, value: number | string) {
    return Object.keys(enumObject)                  // enum 객체에서 모든 키를 뽑아냄
        .filter(key => isNaN(Number(key)))          // 양방향 매핑 때문에 filter를 이용하여 키가 숫자인 경우는 삭제
        .some(key => enumObject[key] === value);    // enum 객체 안에 입력된 value가 있는지 검사
}
/**
 * enum을 제대로 이해했으면 위와 같은 유틸리티 함수를 작성할 수 있음
 * 위 함수는 어떤 객체에 특정 value가 있는지 검사하는 함수
 * 
 */

// enum의 아이템의 이름은 false가 나오고 value는 true 나옴
console.log("1 in Fruit: ", getIsValidEnumValue(Fruit, 1));                     // 1 in Fruit:  false
console.log("5 in Fruit: ", getIsValidEnumValue(Fruit, 5));                     // 5 in Fruit:  true
console.log("Orange in Fruit: ", getIsValidEnumValue(Fruit, "Orange"));         // Orange in Fruit:  false
console.log("ko in Language: ", getIsValidEnumValue(Language, "ko"));           // ko in Language:  true
console.log("Korean in Language: ", getIsValidEnumValue(Language, "Korean"));   // Korean in Language:  false


// const enum 사용하기
const enum Books {
    book1,
    book2,
    book3
}
const books: Books = Books.book1;

const enum Menu {
    Menu1 = "samgyeopsal",
    Menu2 = "hangjeongsal",
    Menu3 = "gabrisal"
}
const menu: Menu = Menu.Menu1;
/**
 * enum을 사용하면 컴파일 후에도 enum 객체가 남아있기 때문에 번들 파일의 크기가 불필요하게 커질 수 있음
 * enum객체에 접근하지 않는다면 굳이 컴파일 후에 객체로 남겨 놓을 필요가 없음
 * 이럴때는 const enum을 사용해서 컴파일 결과에 enum의 객체를 남겨 놓지 않을 수 있음
 * 위의 코드 컴파일 결과:
 * const books = 0 /* book1 *\/;
 * const menu = "samgyeopsal" /* Menu1 *\/;
 * enum객체는 없고 사용한 값만 노출됨!
 * const enum을 사용하면 유틸리티 함수 사용할 수 없음. 이럴 때 Ts에서 const enum이라서 사용할 수 없다고 에러 줌
 */