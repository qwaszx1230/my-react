import * as request from "superagent";
import * as React from "react";
import * as Mock from "mockjs";
import * as moment from "moment";
import { AkRequestParam, AkGlobal } from "./common";
import { notification } from 'antd';
import { CommonLocale } from "../locales/localeid";

export class Request<TRequest, TResponse extends Response>{
    /**
   * 默认参数
   *
   * @type {AkRequestParam < TRequest >}
   * @memberOf Request
   */
    defaultParam: AkRequestParam<TRequest> = {
        Url: '',
        Data: null,
        Querys: null,
        IgnoreError: false,
        Headers: [],
        Prefix: null
    }

    /**
  * 处理Http请求
  *
  * @param {(url : string) => request.SuperAgentRequest} func
  * @param {AkRequestParam < TRequest >} [param]
  * @returns
  *
  * @memberOf Request
  */


    async  processResponse(func: (url: string) => request.SuperAgentRequest, param?: AkRequestParam<TRequest>, emptyData?: any) {
        let request = func(param.Prefix && !param.Url.startsWith("http") ? param.Prefix + param.Url : '' + param.Url);

        /**跨域请求带Cookie传递 */
        // request.withCredentials();
        if (param.Data) {
            request.send(JSON.stringify(param.Data));
        }

        if (param.Querys) {
            request.query(param.Querys);
        }

        if (param.FormData) {
            request.send(param.FormData);
        } else {
            request.type("json");
            request.set("Content-Type", "application/json; charset=utf-8");
        }

        // token
        if (param.RequireToken) {
            request.withCredentials();
        }

        request.set("ClientTimeZone", (moment().utcOffset() / 60).toString());

        if (param.Headers) {
            param.Headers.forEach((entry) => {
                request.set(entry);
            });
        }

        return new Promise<TResponse>((resolve: (response: TResponse) => void, reject: (errorResponse: TResponse) => void) => {
            request.end((error, response: request.Response) => {
                if (!response) {
                    if (!param.IgnoreError) {
                        notification.error({
                            message: AkGlobal.intl.formatMessage({ id: CommonLocale.Error }),
                            description: AkGlobal.intl.formatMessage({ id: CommonLocale.ResponseError })
                        });
                    }
                    resolve(({
                        Status: 1,
                        Data: emptyData
                            ? emptyData
                            : undefined
                    }) as any);
                    return;
                }
                if (response.ok) {
                    if (response.body) {
                        if (response.body.Message === "mock") {
                            resolve(Mock.mock(response.body))
                        }

                        resolve(response.body);
                    } else {
                        resolve({
                            Status: 1,
                            Data: response.text
                        } as any);
                    }
                } else {
                    if (!param.IgnoreError) {
                        if (response.unauthorized) {
                            notification.error({
                                message: AkGlobal.intl.formatMessage({ id: CommonLocale.Error }),
                                description: AkGlobal.intl.formatMessage({ id: CommonLocale.ResponseUnauthorized })
                            });

                        } else {
                            notification.error({
                                message: AkGlobal.intl.formatMessage({ id: CommonLocale.Error }),
                                description: AkGlobal.intl.formatMessage({ id: CommonLocale.RequestFail })
                            });
                        }
                    }
                    resolve(({
                        Status: 1,
                        Data: emptyData
                            ? emptyData
                            : undefined
                    }) as any);
                }
            })
        })
    }


    buildData(args: IArguments | any[]): AkRequestParam<TRequest> {
        if (typeof (args[0]) === "string") {
            return Object.assign({}, this.defaultParam, {
                Url: args[0],
                Data: args[1]
            })
        } else {
            return Object.assign({}, this.defaultParam, args[0])
        }
    }


    /**
     * 生成服务器请求
     * @param url
     * @param data 
     * @param addRandom 是否增加随机数避免加载旧数据
     */
    buildQueryParam(url, data, addRandom?) {
        if (data) {
            url += "?";
            Object.getOwnPropertyNames(data)
                .forEach(name => {
                    // if (data[name] !== undefined) 
                    {
                        url += name + "=" + encodeURI(data[name]) + "&";
                    }
                });
            if (addRandom) {
                url += Date.now() + "&";
            }

            url = url.slice(0, url.length - 1);
        }
        return url;
    }


    /**
 * Get method
 * @param url
 * @param data
 * @param emptyData response中的空数据，在服务器返回错误时保证前端功能
 * @returns {Promise<TResponse>}
 */
    get(url: string, data?: TRequest, emptyData?: any): Promise<TResponse> {
        return this.processResponse(request.get, this.buildData([
            this.buildQueryParam(url, data, true),
            data
        ]), emptyData)
    }

    /**
     * Post method
     * @param url
     * @param data
     * @param emptyData response中的空数据，在系统错误时保证前端功能
     * @returns {Promise<TResponse>}
     */
    post(url: string, data?: TRequest, emptyData?: any): Promise<TResponse> {
        return this.processResponse(request.post, this.buildData(arguments), emptyData);
    }

    /**
     * Put method
     * @param url
     * @param data
     * @param emptyData response中的空数据，在系统错误时保证前端功能
     * @returns {Promise<TResponse>}
     */
    put(url: string, data?: TRequest, emptyData?: any): Promise<TResponse> {
        return this.processResponse(request.put, this.buildData(arguments), emptyData);
    }

    /**
     * Delete method
     * 
     * @param {string} url 
     * @param {TRequest} [data] 
     * @param {*} [emptyData] 
     * @returns {Promise<TResponse>} 
     * @memberof Request
     */
    del(url: string, data?: TRequest, emptyData?: any): Promise<TResponse> {
        return this.processResponse(request.delete, this.buildData([
            this.buildQueryParam(url, data),
            data
        ]), emptyData);
    }

    /**
     * FormData post
     * 
     * @param {string} url 
     * @param {FormData} [formData] 
     * @returns 
     * @memberof Request
     */
    send(url: string, formData?: FormData, emptyData?: any) {
        return this.processResponse(request.post, {
            Url: url,
            FormData: formData,
            RequireToken: true
        }, emptyData || {});
    }

    /**
 * 
 * @param type  post、get
 * @param url  地址
 * @param data  参数
 * @param async true 异步，false 同步
 * @param sfuc  成功方法
 * @param error  失败方法
 */
    sendXMLHttpRequest(type: string, url: string, data: any, async: boolean, sfuc: (data) => void, error: (data) => void, isjson: boolean = true, header: any[] = null, hasToken: boolean = false) {
        var xmlhttp = new XMLHttpRequest;
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                var d;
                if (isjson) {
                    try {
                        d = JSON.parse(xmlhttp.responseText)
                    } catch (error) {
                        d = xmlhttp.responseText;
                    }
                } else {
                    d = xmlhttp.responseText;
                }
                if ((xmlhttp.status >= 200 && xmlhttp.status < 300) || xmlhttp.status === 304) {
                    sfuc(d);
                } else {
                    error(d);
                }

            }
        };
        xmlhttp.open(type, url, async);
        xmlhttp.setRequestHeader("content-type", "application/json");
        if (header) {
            header.forEach(function (element) {
                xmlhttp.setRequestHeader(element.key, element.value);
            });
        }
        if (type.toLocaleLowerCase() === "get") {//大小写
            xmlhttp.send(data);
        }
        else if (type.toLocaleLowerCase() === "post") {
            xmlhttp.send(JSON.stringify(data));
        }
    }

}