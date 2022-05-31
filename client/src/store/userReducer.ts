import {User} from "../types";

interface UserInterface{
    user: User | undefined
}


export const userReducer = (state:UserInterface = {user: undefined}, action:any)=>{
    switch(action.type){
        case "USER":
            return {...state, user: action.payload}
        default:
            return state
    }
}