
// export const BASE_URL = process.env.NODE_ENV === 'development' ? `https://35.77.160.222/` : `https://api.cosmedicos.com/`;

export const API_VERSION = () => {
    return `api/v1/`
}

export const USER_LIST_ENDPOINT = () => {
    return `user/`;
}

export const SIGNUP_ENDPOINT = () => {
    return `auth/register/`;
}

export const LOGIN_ENDPOINT = () => {
    return `auth/login/`;
}

export const END_POINT = () => {
    return `items/`;
}

export const FAV_ENDPOINT = () => {
    return `favourite/items/`
}

export const SORT_ENDPOINT = () => {
    return `?ordering=`;
}

export const CATEGORY_ENDPOINT = () => {
    return `category/`;
}

export const CATEGORY_ITEMS_LIST_ENDPOINT = () => {
    return `?category__name=`;
}

export const ORDER_ENDPOINT = () => {
    return `orders/`;
}

export const ORDER_PLACED_ENDPOINT = () => {
    return `place_order/`;
}

export const ORDER_CANCEL = (id) => {
    return `${id}/canceled_order/`;
}

export const ADDRESS_ADD_ENDPOINT = () => {
    return `add_address/`;
}

export const ADDRESS_REMOVE_ENDPOINT = () => {
    return `remove_address/`;
}

export const SELLER_ENDPOINT = () => {
    return `seller/request/`
}

export const SELLER_ITEMS_ENDPOINT = () => {
    return `seller_items/`;
}

export const ADD_PRODUCT_ENDPOINT = () => {
    return `create_item/`;
}

export const changeUrl = () => {
    return 'http://127.0.0.1:8000/';
}
