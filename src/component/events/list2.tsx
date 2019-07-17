import * as React from "react";
import emitter from "./events";
import { Button } from "antd";

export class List2 extends React.Component<any, any>{

    onHandleClick() {
        emitter.emit("changeMessage", "List2")
    }

    render() {
        return <div>
            <Button onClick={() => this.onHandleClick()}>点击我要改变list1组件显示信息</Button>
        </div>
    }
}