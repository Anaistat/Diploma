import {combineReducers, createStore} from "redux";
import {languageReducer} from "./languageReducer";
import {userReducer} from "./userReducer";
import {productReducer} from "./productReducer";

const appReducer = combineReducers({
    language: languageReducer,
    user: userReducer,
    chosenProduct: productReducer,
})

export const store = createStore(appReducer)