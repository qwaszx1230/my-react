import { createAction } from "redux-actions";
import { PROJECY_TEST } from "./ActionTypes";
export class ProjectAction {
    static testAction = createAction(PROJECY_TEST, (data) => {
        return data
    })
}

