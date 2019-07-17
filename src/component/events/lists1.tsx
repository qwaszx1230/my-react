import * as React from "react";
import emitter from "./events"

export class List1 extends React.Component<any, any>{
    eventEmitter: any;
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: "list1"
        }
    }

    componentDidMount() {
        this.eventEmitter = emitter.addListener("changeMessage", (message) => {
            this.setState({ message });
        })
    }

    componentWillUnmount() {
        emitter.removeListener(this.eventEmitter, null);
    }

    render() {
        return <div>{this.state.message}</div>
    }

}