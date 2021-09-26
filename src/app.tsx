import * as React from 'react';
import { render } from 'react-dom';
import { AppBase } from './appbase';
import { router } from './config/router';


require("./thems/default.less");
// require("~antd/lib/style/themes/default.less");

render(<AppBase>{router}</AppBase>, document.getElementById("app_content"))