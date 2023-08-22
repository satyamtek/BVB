
/**
* Parses the JSON returned by a network request
*
* @param {object} response A response from a network request
*
* @return {object} The parsed JSON from the request
*/
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

/**
* Checks if a network request came back fine, and throws an error if not
*
* @param {object} response A response from a network request
*
* @return {object|undefined} Returns either the response, or throws an error
*/
function checkStatus(response) {
    // console.log("checkStatus+++", response);
    if (response.status >= 200 && response.status <= 400) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
* Requests a URL, returning a promise
*
* @param {string} url The URL we want to request
* @param {object} [options] The options we want to pass to "fetch"
*
* @return {object} The response data
*/
export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}

export function createQueryString(queryParams) {
    // console.log("queryParams :", queryParams)
    const keyValuePairs = [];

    for (const key in queryParams) {
        // console.log("Loop queryParams :", key, queryParams[key])
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]));
    }
    return keyValuePairs.join('&');
    // return JSON.stringify(queryParams);
}



export function createHeadersWithAuth() {
    const authToken = ""
    return {
        Authorization: 'Bearer ' + authToken,
        app_id: 'thr'
    };
}

export function createHeaders() {
    return {
        'Content-Type': 'application/json',
    };
}

export async function requestPromise(url, options) {
    try {
        console.log("requestPromise+++", url, options);
        const response = await fetch(url, options)
            .then(checkStatus)
            .then(parseJSON);
        return response;
    } catch (error) {
        throw error;
    }
}

