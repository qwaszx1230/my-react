import * as React from 'react';
import { AppLocaleStatic, AkGlobal } from './util/common';
import { Action, createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { rootReducers } from './reducers';
import { injectIntl, IntlProvider } from 'react-intl';
import { getLocale } from './locales';
import { LocaleProvider } from 'antd';
import { CommonLocale } from './locales/localeid';

export interface AppBaseProps {
    onLoaded?: (appLocale?: AppLocaleStatic, theme?: string) => Promise<any>;
}

export interface AppBaseState {
    appLocale?: AppLocaleStatic;
}

declare global {
    interface Window {
        akDispatch<A extends Action>(action: A);
    }
}

let sagaInitialized = false;

export class AppBase extends React.Component<AppBaseProps, AppBaseState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            appLocale: null
        }
        this.initRedux();
    }


    componentDidMount() {
        // let language = AkContext.getLanguage();
        // 暂时设置默认中文
        let language = "zh-Hant-HK";
        this.loadLanguage(language);
    }


    loadLanguage(language: string) {
        // 看不懂 
        let theme;
        // getTheme(theme);
        return new Promise((resolve, reject) => {
            getLocale(language).then(data => {
                if (this.props.onLoaded) {
                    this.props.onLoaded(data, theme).then(d => {
                        data.messages = { ...data.messages, ...d };
                        console.log(data);
                        this.setState({ appLocale: data }, () => resolve());
                    });
                } else {
                    this.setState({ appLocale: data }, () => resolve());
                }
            });
        })
    }

    // initSaga() {
    //     if (!sagaInitialized) {
    //         AkGlobal.saga.run(rootSaga);
    //         this.props.onSagaInit && this.props.onSagaInit(AkGlobal.saga);
    //         sagaInitialized = true;
    //     }
    // }

    initRedux() {
        AkGlobal.saga = createSagaMiddleware();
        AkGlobal.store = createStore(rootReducers(), applyMiddleware(AkGlobal.saga)); //创建store
        Window.prototype.akDispatch = (action) => AkGlobal.store.dispatch(action); //给window对象增加dispatch action方法
    }

    GlobalIntlInject = injectIntl((props, options) => {
        AkGlobal.intl = props.intl;
        return <div className="ak-container"> Redux 出来了
           <h2>
                {AkGlobal.intl.formatMessage({ id: CommonLocale.Error })}
            </h2>
            {this.props.children}
        </div>
    })

    render() {
        const { appLocale } = this.state;
        let content = appLocale ? <LocaleProvider locale={appLocale.antd}>
            <IntlProvider
                key={appLocale.locale}
                locale={appLocale.locale}
                messages={appLocale.messages}>
                <this.GlobalIntlInject />
            </IntlProvider>
        </LocaleProvider>
            : <div>
            </div>;
        return <Provider store={AkGlobal.store}>
            {content}
        </Provider>;
    }
}