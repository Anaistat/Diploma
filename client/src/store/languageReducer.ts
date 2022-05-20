interface Language{
    language: string,
}

export const languageReducer = (state:Language = {language: "en"}, action:any) =>{
    switch(action.type){
        case "EN_LANGUAGE":
            return {...state, language:  'en'}
        case "RU_LANGUAGE":
            return {...state, language: 'ru'}
        default:
            return state
    }
}