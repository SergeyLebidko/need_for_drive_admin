export const DOMEN = 'https://api-factory.simbirsoft1.com';
export const BASE = `${DOMEN}/api/db`;

export const DEFAULT_REQUEST_HEADERS = {
    'X-Api-Factory-Application-Id': process.env.REACT_APP_X_API_FACTORY_APPLICATION_ID
};

export const CITY_LIST_URL = `${BASE}/city`;
export const POINT_LIST_URL = `${BASE}/point`;
export const CAR_LIST_URL = `${BASE}/car`;
export const CATEGORY_LIST_URL = `${BASE}/category`;
export const RATE_LIST_URL = `${BASE}/rate`;
export const STATUS_LIST_URL = `${BASE}/orderStatus`;
export const ORDER_URL = `${BASE}/order`;