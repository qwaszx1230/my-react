import * as React from "react";
import emitter from "./events"
import { Button } from "antd";

export class List1 extends React.Component<any, any>{
    eventEmitter: any;
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: "list1",
            info: "快点点击子组件按钮哈哈哈"
        }
    }

    componentDidMount() {
        this.eventEmitter = emitter.addListener("changeMessage", (message) => {
            this.setState({ message });
        })
        this.props.onRef(this);
    }

    componentWillUnmount() {
        emitter.removeListener(this.eventEmitter, null);
    }

    onClick() {
        this.setState({
            info: "通过父组件按钮获取子组件信息啦啦啦啦"
        })
    }

    render() {
        return <div>
            {this.state.message}
            <Button type="primary" onClick={() => this.onClick()}>子组件按钮</Button>
        </div>
    }

}