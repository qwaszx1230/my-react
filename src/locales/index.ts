import { AppLocaleStatic } from "../util/common";
import { addLocaleData } from "react-intl";
import * as antdEn from "antd/lib/locale-provider/en_US";
import * as antdZh_TW from 'antd/lib/locale-provider/zh_TW';
import * as antdZh from 'antd/lib/locale-provider/zh_CN';
// import  from "./zh";
// import antdZh_TW from "./zh_tw";

import en = require("react-intl/locale-data/en");
import zh = require("react-intl/locale-data/zh");

export async function getLocale(language?: string): Promise<AppLocaleStatic> {
    if (!language) {
        //Default local_lanΩguage
        let DEFAULT_LOCALE = 'zh-CN';
        language = navigator.language || (navigator as any).browserLanguage || DEFAULT_LOCALE;
    }
    let languageWithoutRegionCode = language;

    let appLocaleStatic: AppLocaleStatic;
    return new Promise<AppLocaleStatic>((resolve: (locale) => void, reject: (reason: any) => void) => {
        switch (languageWithoutRegionCode) {
            case 'en':
                addLocaleData([...en]);
                appLocaleStatic = new AppLocaleStatic({
                    locale: languageWithoutRegionCode,
                    messages: require("./en.json"),
                    antd: antdEn
                });
                resolve(appLocaleStatic)
                break;
            case 'zh-Hant-HK':
                // 繁体字语言包
                addLocaleData([...zh]);
                appLocaleStatic = new AppLocaleStatic({
                    locale:languageWithoutRegionCode,
                    messages:  require("./zh_TW.json"),
                    antd: antdZh_TW
                });
                resolve(appLocaleStatic)
                break;
            case 'zh-cn':
            default:
                addLocaleData([...zh]);
                appLocaleStatic = new AppLocaleStatic({
                    locale: languageWithoutRegionCode,
                    messages: require("./zh.json"),
                    antd: antdZh
                });
                resolve(appLocaleStatic);
                break;
        }
    });
}
