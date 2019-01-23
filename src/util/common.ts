import { SagaMiddleware } from "redux-saga";
import { Store } from "redux";
import { InjectedIntlProps } from "react-intl";

export interface Base {
}

export interface Response {
    /**
     * 数据
     *
     * @type {任意类型}
     * @memberOf AkResponse
     */
    Data?: any;
    /**
     * 状态
     */
    Status?: number;
    /**
     * 消息
     */
    Message?: string;
    /**服务器错误消息 */
    ServerMessage?: string;
    /**
     * 总记录数
     */
    TotalCount?: number;
}


export interface AkRequestParam<T> {
    /**
     * URL 请求访问的路径
     *
     * @type {string}
     * @memberOf RequestParam
     */
    Url?: string;
    /**
 * 是否需要Token
 */
    RequireToken?: boolean;
    /**
     * 头信息
     */
    Headers?: {
        [key: string]: string
    }[];
    /**
     * 请求的数据
     *
     * @type {WObject}
     * @memberOf RequestParam
     */
    Data?: T;
    /**
     * 查询参数
     *
     * @type {WObject}
     * @memberOf RequestParam
     */
    Querys?: Base;
    /**
     * 访问接口前缀
     *
     * @type {string}
     * @memberOf RequestParam
     */
    Prefix?: string;
    /**
     * 是否需要错误消息
     */
    IgnoreError?: boolean;
    /**
     * FormData
     */
    FormData?: FormData;
}

export class AkGlobal {
    static store: Store<any>;
    static intl: ReactIntl.InjectedIntl;
    static saga: SagaMiddleware<any>;
}

/**
 * 国际化
 */
export class AppLocaleStatic {
    constructor(options: AppLocaleStatic) {
        this.locale = options.locale;
        this.formats = options.formats;
        this.defaultFormats = options.defaultFormats;
        this.defaultLocale = options.defaultLocale;
        this.messages = options.messages;
        this.antd = options.antd;
    }

    antd?: any;
    locale?: string;
    formats?: Object;
    messages?: Object;
    defaultLocale?: string;
    defaultFormats?: Object;
}

export class AkContext {
   
}