async function executeFetch(url, options) {
    let response;
    try {
        response = await fetch(url, options);
    } catch (err) {
        return Promise.reject({httpStatus: '', httpText: err.message})
    }

    if (!response.ok) {
        const text = await response.text();
        return Promise.reject({httpStatus: response.status, httpText: text});
    }
    return await response.json();
}
