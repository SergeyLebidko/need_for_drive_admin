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
import {extractDateParts} from './common_utils';

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

async function executeFetch(url, options = {}) {
    let {headers} = options;
    headers = headers ? {...headers, ...DEFAULT_REQUEST_HEADERS} : DEFAULT_REQUEST_HEADERS;

    // TODO При реализации авторизации создать код подстановки токена пользователя.
    // Сейчас временно использую access-токен полученный с помощью из Insomnia
    headers = {...headers, 'Authorization': 'Bearer b8524cc83224df94606279ce4296beff6c6e948d'};

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
        const [dateFrom, dateTo] = prepareDateRange(date);
        if (dateFrom) params.set(`${DATE_FROM_FILTER_NAME}[$gt]`, dateFrom);
        if (dateTo) params.set(`${DATE_FROM_FILTER_NAME}[$lt]`, dateTo);
    }
    return await executeFetch(`${ORDER_URL}/?${params}`);
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
