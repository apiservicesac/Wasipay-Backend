export const ROUTE_VERSION = '/api/v1'

const SHOP : string = '/shop'
const SHOP_CREATE : string = '/create'
const SHOP_GET_ALL : string = '/get-all'
const SHOP_GET_BY_ID : string = '/get-by-id/:id'
const SHOP_DELETE : string = '/delete'
const SHOP_UPDATE : string = '/update'
const SHOP_UPDATE_FIELD : string = '/update-field'

export const ROUTES_SHOP = {
    SHOP,
    SHOP_CREATE,
    SHOP_GET_ALL,
    SHOP_GET_BY_ID,
    SHOP_DELETE,
    SHOP_UPDATE,
    SHOP_UPDATE_FIELD,
}

const USER : string = '/user'
const USER_CREATE : string = '/create'
const USER_GET_ALL : string = '/get-all'
const USER_GET_BY_ID : string = '/get-by-id/:id'
const USER_DELETE : string = '/delete'
const USER_UPDATE : string = '/update'
const USER_UPDATE_FIELD : string = '/update-field'

export const ROUTES_USER = {
    USER,
    USER_CREATE,
    USER_GET_ALL,
    USER_GET_BY_ID,
    USER_DELETE,
    USER_UPDATE,
    USER_UPDATE_FIELD,
}

const FILE_SERVICE : string = '/file-service'
const FILE_SAVE : string = '/upload'
export const ROUTES_FILE_SERVICE = {
    FILE_SERVICE,
    FILE_SAVE
}