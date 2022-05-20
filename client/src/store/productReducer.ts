import {Product} from "../types";

interface ProductChoose{
    product: Product | undefined
}

export const productReducer = (state:ProductChoose = {product: undefined}, action:any) =>{
    switch (action.type) {
        case 'CHOSEN_PRODUCT':
            return {...state, product: action.payload}
        default:
            return state
    }
}