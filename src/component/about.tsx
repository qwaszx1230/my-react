import * as React from "react";

const LazyList2 = React.lazy(() =>
    import("./events/list2")
);

export class AboutPage extends React.Component<any, any>{
    render() {
        return <h2 style={{ color: "red" }}>
            <React.Suspense fallback={<div>正在加载中。。。</div>}>
                <LazyList2 />
            </React.Suspense>
            About  </h2>
    }
}

