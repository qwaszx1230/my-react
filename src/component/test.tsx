import * as React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { List1 } from "./events/lists1";
import { List2 } from "./events/list2";

interface TestPageProps {
    name: string
}

const mapStateToProps = (state) => {
    return {
        name: state.testReduce.Nmae
    }
}

class TestInternalPage extends React.Component<TestPageProps, any>{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>Home
            <h2>我拿到redux里面的Name了  {this.props.name}</h2>
            <Link to="/about">about</Link>
            <List1 />
            <List2 />
        </div>
    }
}

export const TestPage = connect(mapStateToProps)(TestInternalPage);