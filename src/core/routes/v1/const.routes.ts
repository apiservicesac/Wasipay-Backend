export const ROUTE_VERSION = '/api/v1'


const SHOP : string = '/shop'
const SHOP_CREATE : string = '/create'
const SHOP_GET_ALL : string = '/get-all'
const SHOP_GET_BY_ID : string = '/get-by-id/:id'
const SHOP_DELETE : string = '/delete/:id'
const SHOP_UPDATE : string = '/update/:id'
const SHOP_UPDATE_IMAGE : string = '/update-image/:id'
const SHOP_UPDATE_FIELD : string = '/update-field/:id'

export const ROUTES_SHOP = {
    SHOP,
    SHOP_CREATE,
    SHOP_GET_ALL,
    SHOP_GET_BY_ID,
    SHOP_DELETE,
    SHOP_UPDATE,
    SHOP_UPDATE_IMAGE,
    SHOP_UPDATE_FIELD,
}

const PRODUCT : string = '/product'
const PRODUCT_GET_ALL : string = '/get-all/:shop_id'
const PRODUCT_GET_BY_ID : string = '/get-by-id/:id'

export const ROUTES_PRODUCT = {
    PRODUCT,
    PRODUCT_GET_ALL,
    PRODUCT_GET_BY_ID,
}

const USER : string = '/user'
const USER_CREATE : string = '/create'
const USER_LOGIN : string = '/login'
const USER_GET_ALL : string = '/get-all'
const USER_GET_BY_ID : string = '/get-by-id/:id'
const USER_DELETE : string = '/delete/:id'
const USER_UPDATE : string = '/update/:id'
const USER_UPDATE_FIELD : string = '/update-field/:id'

export const ROUTES_USER = {
    USER,
    USER_CREATE,
    USER_LOGIN,
    USER_GET_ALL,
    USER_GET_BY_ID,
    USER_DELETE,
    USER_UPDATE,
    USER_UPDATE_FIELD,
}