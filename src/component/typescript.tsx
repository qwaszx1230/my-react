import { Button } from 'antd';
import * as React from 'react';
import { Student } from "../util/greeter";

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
    }


    render() {
        return <div className="ts-content">
            <h2 className="ts-title">开始学习Typescript</h2>

            <Button onClick={() => this.stadent()}>学习类</Button>
        </div>
    }

}