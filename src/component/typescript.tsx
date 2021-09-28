import { Button } from 'antd';
import * as React from 'react';
import { AnalogClock, cerateClock, Clock, DigitalClock, Control, SelectControl, Student, TextBox } from "../util/greeter";

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;//额外属性
}
export class TypescriptPage extends React.Component<any, any>{
    constructor(props, context) {
        super(props, context);

    }

    readFun() {
        //创建只读数组
        let a: number[] = [1, 2, 3, 4];
        let ro: ReadonlyArray<number> = a;
        // ro[2] = 5;

        let mySquare: SquareConfig = {
            width: 5,
            height: 5,
            test: 4
        }
    }

    stadent() {
        let user = new Student("Jane", "M.", "User");
        console.log(user);
        let clock = new Clock(15, 20);
        console.log(clock);
        clock.setTime(new Date().toString());
        console.log(clock);
        let digital = cerateClock(DigitalClock, 15, 20);
        let analog = cerateClock(AnalogClock, 14, 20);
        digital.tick();
        analog.tick();
        console.log(digital);
        console.log(analog);

        const control: TextBox = null;

    }

    //类 继承
    extendsClass() {
        class Animal {
            name: string;
            constructor(theName: string) {
                this.name = theName;
            }
            move(distanceInMeters: number = 0) {
                console.log(`${this.name} moved ${distanceInMeters}`);
            }
        }

        class Snake extends Animal {
            constructor(name: string) {
                super(name); //此时的super 当作函数使用，this指向Snake
            }
            move(distanceInMeters: number = 5) {
                console.log("Slithering...");
                super.move(distanceInMeters);//这里的super 被当作对象使用，在普通方法中，指向父类的原型对象；在静态方法中，指向父类 this指向Animal
            }
        }

        class Horse extends Animal {
            constructor(name: string) {
                super(name);
            }
            move(distanceInMeters: number = 45) {
                console.log("Galloping...");
                super.move(distanceInMeters);
            }
        }

        class Orange {
            name: string;
            constructor() {
                this.name = "Fruits";
            }
        }

        class Apple extends Animal {
            constructor(name: string) {
                super(name);
                this.name = "test";
                super.name = "Bob";
            }

        }

        let sam = new Snake("Sammy the phthon");
        let tom: Animal = new Horse("Tommy the Palomino");
        sam.move();
        tom.move();
    }


    render() {
        return <div className="ts-content">
            <h2 className="ts-title">开始学习Typescript</h2>

            <Button onClick={() => this.stadent()}>学习类</Button>
            <Button onClick={() => this.extendsClass()}>继承类</Button>
        </div>
    }

}