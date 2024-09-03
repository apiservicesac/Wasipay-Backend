export const ROUTE_VERSION = '/api/v1'

const PRODUCT : string = '/product'
const PRODUCT_GET_ALL : string = '/get-all'
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