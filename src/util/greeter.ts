//implements是一个类实现一个接口用的关键字.实现一个接口，必须实现接口中的所有方法。

//类  在构造函数的参数上使用public等同于创建了同名的成员变量。
export class Student {
    fullName: string;
    constructor(public firstName: string, public middleName: string, public lastName: string) {
        this.fullName = firstName + " " + middleName + " " + lastName;
    }
}
//可索引类型(只支持数字和字符串)
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray = ["aa", "bb"];
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}


interface NotOkay {
    [x: number]: Animal;
    // [x: string]: Dog;// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
}

//索引签名设置只读
interface ReadonlyString {
    readonly [index: string]: string;
}

//类 类型
interface ClockInterface {
    currtentTime: string;
}

export class Clock implements ClockInterface {
    currtentTime: string;
    setTime(d: string) {
        this.currtentTime = d;
    }
    constructor(h: number, m: number) {
        this.currtentTime = `${h}:${m}`
    }
}

interface ClockInterface2 {
    tick();
}

interface ClockConstructure {
    new(h: number, m: number): ClockInterface2;
}

//错误的调用
// class Clock2 implements ClockConstructure {
//     currentTime: string;
//     constructor(h: number, m: number) { }
// }

//constructor为静态函数，不在检查类型范围，createClock的第一个参数为构造函数，createClock(AnalogClock, 7, 32)里 会检查AnalogClock是个符合构造函数的类型签名
export function cerateClock(ctor: ClockConstructure, h: number, m: number): ClockInterface2 {
    return new ctor(h, m);
}

export class DigitalClock implements ClockInterface2 {
    currtentTime: string;
    constructor(h: number, m: number) {
        this.currtentTime = `${h}:${m}`
    }
    tick() {
        console.log("beep beep");
    }
}

export class AnalogClock implements ClockInterface2 {
    currtentTime: string;
    constructor(h: number, m: number) {
        this.currtentTime = `${h}:${m}`
    }
    tick() {
        console.log("tick tock");
    }
}

//接口继承类
export class Control {
    private state: string;
}
//SelectableControl包含了Control的所有成员
export interface SelectControl extends Control {
    select(): void;
}

export class TextBox extends Control {
    select() { };
}


//在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的
export class Button extends Control implements SelectControl {
    select() { };
}
