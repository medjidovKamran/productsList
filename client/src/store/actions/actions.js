import {SET_EDITABLE_ITEM, SET_IS_OPEN, SET_PRODUCTS} from "../actionTypes/actionTypes";

export function setProducts(payload) {
    return { type: SET_PRODUCTS, payload }
};

export function setEditable(payload) {
    return { type: SET_EDITABLE_ITEM, payload }
};

export function setIsOpen(payload) {
    return { type: SET_IS_OPEN, payload }
};