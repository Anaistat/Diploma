import {combineReducers, createStore} from "redux";
import {languageReducer} from "./languageReducer";
import {userReducer} from "./userReducer";
import {productReducer} from "./productReducer";
import {dayModeReducer} from "./dayModeReducer";

const appReducer = combineReducers({
    language: languageReducer,
    user: userReducer,
    chosenProduct: productReducer,
    dayMode: dayModeReducer
})

export const store = createStore(appReducer)