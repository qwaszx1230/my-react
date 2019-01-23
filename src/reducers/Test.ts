import { PROJECY_TEST } from "../actions/ActionTypes";

const initialState = {
    Nmae: "张三",
    Age: 10
}

export const testReduce = (state = initialState, action) => {
    switch (action.type) {
        case PROJECY_TEST:
            return { ...state, Nmae: action.payload }
        default:
            return state;
    }
}