import {LIMIT} from '../settings';
import {DEFAULT_REQUEST_HEADERS, ORDER_URL} from '../urls';

async function executeFetch(url, options = {}) {
    let {headers} = options;
    headers = headers ? {...headers, ...DEFAULT_REQUEST_HEADERS} : DEFAULT_REQUEST_HEADERS;
    const _options = {...options, headers};

    let response;
    try {
        response = await fetch(url, _options);
    } catch (err) {
        return Promise.reject({httpStatus: '', httpText: err.message})
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
