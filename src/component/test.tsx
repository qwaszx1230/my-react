import * as React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { List1 } from "./events/lists1";
import List2 from "./events/list2";
import { Button } from "antd";
import { Dispatch } from "redux";
import { ProjectAction } from "../actions";
const md5 = require('js-md5');

interface TestPageProps {
    name: string;
    onIncrement?: () => void;
}

const mapStateToProps = (state) => {
    return {
        name: state.testReduce.Nmae
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onIncrement: () => dispatch(ProjectAction.testAction("Holly")),
    }
}

class TestInternalPage extends React.Component<TestPageProps, any>{
    List: any;
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        let m = md5("我拿到redux里面的Name了");
        console.log(m);
    }


    onHandleClick() {
        // 组件通信之onRef方法
        alert(this.List.state.info)
    }

    render() {
        return <div>Home
            <h2>我拿到redux里面的Name了  {this.props.name}</h2>
            <Link to="/about">about</Link><br />
            <Link to="/test">drag</Link>
            <List1 onRef={(child) => this.List = child} />
            <List2 />
            <Button type="primary" onClick={() => this.onHandleClick()}>父组件按钮</Button>
            <Button type="primary" onClick={() => this.props.onIncrement()}>点击更换名字</Button>
            <div>
                <Link to="/typescript">点击学习Typescript</Link>
            </div>
        </div>
    }
}

export const TestPage = connect(mapStateToProps, mapDispatchToProps)(TestInternalPage);