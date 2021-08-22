import {LIMIT} from '../settings';
import {DEFAULT_REQUEST_HEADERS, ORDER_URL, STATUS_LIST_URL} from '../urls';

async function executeFetch(url, options = {}) {
    let {headers} = options;
    headers = headers ? {...headers, ...DEFAULT_REQUEST_HEADERS} : DEFAULT_REQUEST_HEADERS;

    // TODO При реализации авторизации создать код подстановки токена пользователя. Сейчас использую временный токен из Insomnia
    headers = {...headers, 'Authorization': 'Bearer 2bbd3778ab116f192d9a5c0c02cd47e433159393'};

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

export async function fetchOrderList(page) {
    return await executeFetch(`${ORDER_URL}/?limit=${LIMIT}&page=${page}`);
}

export async function fetchStatusList() {
    return await executeFetch(STATUS_LIST_URL);
}
