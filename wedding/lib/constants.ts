/**
 * Key for the auth cookie.
 */
export const CFP_COOKIE_KEY = 'Wedding-Login-Key';

export const GUEST_STORAGE_KEY = "guest_list"

export const WEDDING_NAVIGATION = "Navigation-Tabs"

export const WEDDING_USER_KEY = "wedding-user"
/**
 * Max age of the auth cookie in seconds.
 * Default: 1 week.
 */
export const CFP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const CFP_COOKIE_MIN_AGE = 0;


let _URL = "/"
if (process.env.MYURL) {
    _URL = process.env.MYURL
}

export const CFP_URL = _URL;

let _API_URL = "/"
if (process.env.MONGO_BASE_URL) {
    _API_URL = process.env.MONGO_BASE_URL
}
export const MONGO_BASE_URL = _API_URL


let _API_KEY = ""
if (process.env.MONGO_API_KEY) {
    _API_KEY = process.env.MONGO_API_KEY
}
export const MONGO_API_KEY = _API_KEY

let _APP_ID = ""
if (process.env._APPID) {
    _APP_ID = process.env._APPID
}

export const REALM_APPID = _APP_ID


/**
 * Paths that don't require authentication.
 * The /cfp_login path must be included.
 */
export const CFP_ALLOWED_PATHS = ['/cfp_login'];