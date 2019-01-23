import { ReducersMapObject, Reducer, combineReducers } from "redux";
import { testReduce } from "./Test";


export function rootReducers<S>(reducers?: ReducersMapObject): Reducer<S> {
    const re = Object.assign({}, { testReduce }, reducers);
    return combineReducers<S>(re)
}