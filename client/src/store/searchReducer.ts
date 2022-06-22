interface Search{
    word: string
}

export const searchReducer = (state: Search = {word: ''}, action:any) =>{
    switch (action.type){
        case 'SEARCH':
            return {...state, word: action.payload}
        default:
            return state
    }
}
