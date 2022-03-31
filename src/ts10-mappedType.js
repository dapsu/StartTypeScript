"use strict";
/** Mapped Type
 * A라는 인터페이스가 있을 때 A에 있는 모든 속성을 optional로 바꾸거나 readonly로 바꾸는 이러한 일을 맵드타입을 이용해서 할 수 있음
 */
Object.defineProperty(exports, "__esModule", { value: true });
const pMap = {}; // MakeBoolean안에 Person 입력
pMap.name = true; // 원래 string타입인데 boolean으로 바뀜. 선택 속성이기 때문에 undefined도 가능
pMap.age = false; // 원래 number타입인데 boolean으로 바뀜. 선택 속성이기 때문에 undefined도 가능
// enum 타입 활용도 높이기
var Fruit;
(function (Fruit) {
    Fruit[Fruit["Apple"] = 0] = "Apple";
    Fruit[Fruit["Banana"] = 1] = "Banana";
    Fruit[Fruit["Orange"] = 2] = "Orange";
})(Fruit || (Fruit = {}));
const fruitPrice = {
    [Fruit.Apple]: 1000,
    [Fruit.Banana]: 1500,
    [Fruit.Orange]: 2000
};
// 만약 Fruit enum에 새로운 과일을 추가하게 되면 fruitPrice 객체에 새로 추가된 과일 속성을 추가해야 하는 번거로움이 있음
const fruitPrice2 = {
    [Fruit.Apple]: 1000,
    [Fruit.Banana]: 1500,
    [Fruit.Orange]: 2000,
};
// 객체를 맵드 타입으로 활용하면 enum의 모든 속성을 적지 않으면 에러가 나기 때문에 실수로 누락해도 바로 정정할 수 있음
