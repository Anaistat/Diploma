interface DayMode{
    toggleColorMode: () => void
}

export const dayModeReducer = (state:DayMode = {toggleColorMode: ()=>{}}, action:any)=>{
    switch (action.type){
        case 'DAY_MODE':
            return {...state, toggleColorMode: action.payload}
        default:
            return state
    }
}