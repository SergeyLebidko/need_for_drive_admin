export const DOMEN = 'https://api-factory.simbirsoft1.com';
export const API_BASE = `${DOMEN}/api/db`;
export const AUTH_BASE = `${DOMEN}/api/auth`;

export const DEFAULT_REQUEST_HEADERS = {
    'X-Api-Factory-Application-Id': process.env.REACT_APP_X_API_FACTORY_APPLICATION_ID
};

// Адреса конечных точек api
export const CITY_URL = `${API_BASE}/city`;
export const CAR_URL = `${API_BASE}/car`;
export const STATUS_URL = `${API_BASE}/orderStatus`;
export const ORDER_URL = `${API_BASE}/order`;

export const LOGIN_URL = `${AUTH_BASE}/login`;
export const CHECK_URL = `${AUTH_BASE}/check`;
export const LOGOUT_URL = `${AUTH_BASE}/logout`;

// Адреса страниц приложения
export const LOGIN_APP_URL = 'login'
export const REGISTER_APP_URL = 'register';
export const ADMIN_APP_URL = 'admin'
export const ORDER_LIST_APP_URL = 'orders';