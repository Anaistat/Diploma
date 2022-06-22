import {combineReducers, createStore} from "redux";
import {languageReducer} from "./languageReducer";
import {userReducer} from "./userReducer";
import {productReducer} from "./productReducer";
import {dayModeReducer} from "./dayModeReducer";
import {searchReducer} from "./searchReducer";

const appReducer = combineReducers({
    language: languageReducer,
    user: userReducer,
    chosenProduct: productReducer,
    dayMode: dayModeReducer,
    search: searchReducer
})

export const store = createStore(appReducer)