import {SET_EDITABLE_ITEM, SET_PRODUCTS, SET_IS_OPEN, SET_IS_LOADING} from "../actionTypes/actionTypes";

const initialState = {
    products: [],
    editableItem: {},
    isOpen: false,
    isLoading: false,
};

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
            case SET_EDITABLE_ITEM:
            return {
                ...state,
                editableItem: action.payload,
            }
            case SET_IS_OPEN:
            return {
                ...state,
                isOpen: action.payload,
            }
            case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state
    }
};