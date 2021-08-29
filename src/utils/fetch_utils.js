import {
    LIMIT,
    LIMIT_FILTER_NAME,
    DATE_FROM_FILTER_NAME,
    PAGE_FILTER_NAME,
    CAR_FILTER_NAME,
    CITY_FILTER_NAME,
    STATUS_FILTER_NAME,
    PER_DAY,
    PER_WEEK,
    PER_MONTH,
    BEGIN_DAY,
    BEGIN_WEEK,
    BEGIN_MONTH,
    SALT,
    SALT_SIZE,
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../constants/settings';
import {
    DEFAULT_REQUEST_HEADERS,
    ORDER_URL,
    STATUS_URL,
    CAR_URL,
    CITY_URL,
    LOGIN_URL,
    CHECK_URL,
    REFRESH_URL,
    LOGOUT_URL,
    REGISTER_URL
} from '../constants/urls';
import {extractDateParts, getRandomString} from './common_utils';
import cookie from 'cookie_js';

function prepareDateRange(dateFilterValue) {
    const msInSec = 1000;
    const msInMin = msInSec * 60;
    const msInHour = msInMin * 60;
    const msInDay = msInHour * 24;
    const msInWeek = msInDay * 7;
    const msInMonth = msInDay * 30;

    const now = Date.now();
    switch (dateFilterValue) {
        case PER_DAY:
            return [now - msInDay, now];
        case PER_WEEK:
            return [now - msInWeek, now];
        case PER_MONTH:
            return [now - msInMonth, now];
        case BEGIN_DAY: {
            const [year, mon, day] = extractDateParts(new Date(now));
            return [+(new Date(year, mon, day)), null];
        }
        case BEGIN_WEEK: {
            const _now = new Date(now);
            const [, , , hour, min, sec, ms] = extractDateParts(_now);

            // Учитываем, что в js неделя начинается с воскресения, а в РФ - с понедельника :)
            const numberDay = _now.getDay() ? _now.getDay() - 1 : 6;
            return [now - ((numberDay * msInDay) + (hour * msInHour) + (min * msInMin) + (sec * msInSec) + ms), null];
        }
        case BEGIN_MONTH: {
            const [year, mon] = extractDateParts(new Date(now));
            return [+(new Date(year, mon)), null];
        }
        default:
            return [null, null];
    }
}

function getAuthorizationHeaders() {
    const accessToken = cookie.get(ACCESS_TOKEN);
    return {headers: {'Authorization': `Bearer ${accessToken}`}};
}

async function executeFetch(url, options = {}) {
    let {headers} = options;
    headers = headers ? {...headers, ...DEFAULT_REQUEST_HEADERS} : DEFAULT_REQUEST_HEADERS;

    const _options = {...options, headers};

    let response;
    try {
        response = await fetch(url, _options);
    } catch (err) {
        return Promise.reject({httpStatus: 0, httpText: err.message})
    }

    if (!response.ok) {
        const text = await response.text();
        return Promise.reject({httpStatus: response.status, httpText: text});
    }

    if (response.status === 204) return;
    return await response.json();
}

async function executeFetchWithRefresh(func, url, options) {
    let attempts = 0;
    let response;
    do {
        if (attempts === 1) await refresh();
        try {
            response = await func(url, options);
        } catch (err) {
            if (err.httpStatus !== 401) throw err;
        }
        attempts++;
    } while (!response && attempts < 2);
    return response;
}

export async function login(loginValue, passwordValue) {
    const salt = getRandomString(SALT_SIZE, true);
    const basic = btoa(`${salt}:${process.env.REACT_APP_SECRET}`);

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basic}`
        },
        body: JSON.stringify({username: loginValue, password: passwordValue}),
        method: 'POST'
    }

    const {access_token: accessToken, refresh_token: refreshToken} = await executeFetch(LOGIN_URL, options);
    cookie.set(ACCESS_TOKEN, accessToken);
    cookie.set(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(SALT, salt);
}

export async function register(loginValue, passwordValue) {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: loginValue, password: passwordValue}),
        method: 'POST'
    }

    await executeFetch(REGISTER_URL, options);
}

export async function check() {
    const accessToken = cookie.get(ACCESS_TOKEN);
    if (!accessToken) return null;

    const options = {headers: {'Authorization': `Bearer ${accessToken}`}};

    try {
        const response = await executeFetch(CHECK_URL, options);
        return response.username;
    } catch (err) {
        if (err.httpStatus === 0) throw err;
        cookie.remove(ACCESS_TOKEN);
    }
}

export async function refresh() {
    const salt = localStorage.getItem(SALT);
    const refreshToken = cookie.get(REFRESH_TOKEN);
    if (!salt || !refreshToken) return;

    const basic = btoa(`${salt}:${process.env.REACT_APP_SECRET}`);
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basic}`
        },
        body: JSON.stringify({'refresh_token': refreshToken}),
        method: 'POST'
    }

    try {
        const {access_token: _accessToken, refresh_token: _refreshToken} = await executeFetch(REFRESH_URL, options);
        cookie.set(ACCESS_TOKEN, _accessToken);
        cookie.set(REFRESH_TOKEN, _refreshToken);
    } catch (err) {
        if (err.httpStatus === 0) throw err;
        cookie.remove([ACCESS_TOKEN, REFRESH_TOKEN]);
        localStorage.removeItem(SALT);
    }
}

export async function logout() {
    const options = {method: 'POST', ...getAuthorizationHeaders()};

    try {
        await executeFetch(LOGOUT_URL, options);
    } catch (err) {
        if (err.httpStatus === 0) throw err;
    }
    cookie.remove(ACCESS_TOKEN);
    cookie.remove(REFRESH_TOKEN);
    localStorage.removeItem(SALT);
}

export async function fetchOrderList(page, date, car, city, status) {
    const params = new URLSearchParams();

    params.set(LIMIT_FILTER_NAME, '' + LIMIT);
    params.set(PAGE_FILTER_NAME, '' + page);

    if (car) params.set(CAR_FILTER_NAME, '' + car);
    if (city) params.set(CITY_FILTER_NAME, '' + city);
    if (status) params.set(STATUS_FILTER_NAME, '' + status);
    if (date) {
        const [dateFrom, dateTo] = prepareDateRange(date);
        if (dateFrom) params.set(`${DATE_FROM_FILTER_NAME}[$gt]`, dateFrom);
        if (dateTo) params.set(`${DATE_FROM_FILTER_NAME}[$lt]`, dateTo);
    }

    const options = {...getAuthorizationHeaders()};

    return await executeFetchWithRefresh(executeFetch, `${ORDER_URL}/?${params}`, options);
}

export async function fetchStatusList() {
    return await executeFetch(STATUS_URL);
}

export async function fetchCarList() {
    return await executeFetch(CAR_URL);
}

export async function fetchCityList() {
    return await executeFetch(CITY_URL);
}

export async function fetchUsername(){
    return await executeFetchWithRefresh(check);
}