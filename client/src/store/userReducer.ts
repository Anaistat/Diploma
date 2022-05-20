import {User} from "../types";

interface UserInterfase{
    user: User | undefined
}


export const userReducer = (state:UserInterfase = {user: undefined}, action:any)=>{
    switch(action.type){
        case "USER":
            return {...state, user: action.payload}
        default:
            return state
    }
}