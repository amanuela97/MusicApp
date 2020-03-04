import {apiUrl} from "../constants/UrlConst";

const getUserMedia = async (token) => {
    console.log('getUserMedia');
    try {
        const json = await fetchGET('media/user', '', token);
        json.reverse();
        return await Promise.all(json.map(async (item) => {
            return await fetchGET('media', item.file_id).catch(error => {
                console.log(error);
            })
        }));
    }catch (e) {
        console.log('error msg from getUserMedia', e.message);
    }
};

const getUserFavourites = async (token) => {
    console.log('getUserFavourites');
    try {
        const json = await fetchGET('favourites', '', token);
        json.reverse();
        return await Promise.all(json.map(async (item) => {
            return await fetchGET('favourites', item.file_id).catch(error => {
                console.log(error);
            })
        }));
    }catch (e) {
        console.log('error msg from getUserFavourites', e.message);
    }
};

const getAllMedia = async () => {
    console.log('getAllMedia');
    try {
        const json = await fetchGET('tags','mussy');
        json.reverse();
        json.splice(5);
        return await Promise.all(json.map(async (item) => {
                return await fetchGET('media', item.file_id)
        }));
    } catch (e) {
        console.log('error msg from getAllMedia', e.message);
    }
};

const fetchGET = async (endpoint = '', params = '', token = '') => {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'x-access-token': token,
        },
    };
    //console.log(apiUrl+ endpoint + '/' + params);
    const response = await fetch(apiUrl + endpoint + '/' + params,
        fetchOptions);
    if (!response.ok) {
        throw new Error('fetchGET error: ' + response.status);
    }
    return await response.json();
};

const fetchPOST = async (endpoint = '', data = {}, token = '') => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(apiUrl + endpoint, fetchOptions);
    const json = await response.json();
    console.log(json);
    if (response.status === 400 || response.status === 401) {
        const message = Object.values(json).join();
        throw new Error(message);
    } else if (response.status > 299) {
        throw new Error('fetchPOST error: ' + response.status);
    }
    return json;
};

const fetchFormData = async (
    endpoint = '', data = new FormData(), token = '') => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'x-access-token': token,
        },
        body: data,
    };
    const response = await fetch(apiUrl + endpoint, fetchOptions);
    const json = await response.json();
    console.log(json);
    if (response.status === 400 || response.status === 401) {
        const message = Object.values(json).join();
        throw new Error(message);
    } else if (response.status > 299) {
        throw new Error('fetchPOST error: ' + response.status);
    }
    return json;
};

const fetchDelete = async (endpoint = '', param = '', token = '') => {
    const fetchOptions = {
        method: 'DELETE',
        headers: {
            'x-access-token': token,
        },
    };
    const response = await fetch(apiUrl + endpoint + '/' + params,
        fetchOptions);
    if (!response.ok) {
        throw new Error('fetchDelete error: ' + response.status);
    }
    return await response.json();
};

const fetchModify = async (endpoint = '', param = '', token = '', data = {} ) => {

    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(apiUrl + 'media/' + param, fetchOptions);
    return await response.json();
};

export { getAllMedia, fetchGET, fetchPOST, fetchDelete, getUserMedia, fetchFormData, fetchModify, getUserFavourites};