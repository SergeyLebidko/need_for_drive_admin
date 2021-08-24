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
    BEGIN_MONTH
} from '../settings';
import {DEFAULT_REQUEST_HEADERS, ORDER_URL, STATUS_LIST_URL, CAR_LIST_URL, CITY_LIST_URL} from '../urls';

function prepareDateRange(dateFilterValue) {
    switch (dateFilterValue) {
        case :

        default:
            return null;
    }
}

async function executeFetch(url, options = {}) {
    let {headers} = options;
    headers = headers ? {...headers, ...DEFAULT_REQUEST_HEADERS} : DEFAULT_REQUEST_HEADERS;

    // TODO При реализации авторизации создать код подстановки токена пользователя.
    // Сейчас временно использую access-токен полученный с помощью из Insomnia
    headers = {...headers, 'Authorization': 'Bearer c506dd9149fed245590605562ba263cae2b131e4'};

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
    return await response.json();
}

export async function fetchOrderList(page, date, car, city, status) {
    const params = new URLSearchParams();

    params.set(LIMIT_FILTER_NAME, '' + LIMIT);
    params.set(PAGE_FILTER_NAME, '' + page);

    if (car) params.set(CAR_FILTER_NAME, '' + car);
    if (city) params.set(CITY_FILTER_NAME, '' + city);
    if (status) params.set(STATUS_FILTER_NAME, '' + status);
    if (date) {
        const dateFrom = prepareDateRange(date);
        if (dateFrom) params.set(`${DATE_FROM_FILTER_NAME}[$gt]`, dateFrom);
    }

    const url = `${ORDER_URL}/?${params}`;

    // TODO Тестовый вывод
    console.log('date for fetch', date);
    console.log('URL for fetch', url);

    return await executeFetch(url);
}

export async function fetchStatusList() {
    return await executeFetch(STATUS_LIST_URL);
}

export async function fetchCarList() {
    return await executeFetch(CAR_LIST_URL);
}

export async function fetchCityList() {
    return await executeFetch(CITY_LIST_URL);
}
