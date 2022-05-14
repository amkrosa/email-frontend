const url = 'http://localhost:8080'

export const get = async (path: string, token: string | null = null, setData: any & null = null, setError: any & null, setLoading: any & null) => {
    let actualData;
    try {
        const response = await fetch(url + path, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: token != null ? {
                'Authorization': token
            } : {},
        });
        if (!response.ok) {
            throw new Error(
                `This is an HTTP error: The status is ${response.status}`
            );
        }
        actualData = await response.json();
        if (setData) setData(actualData);
        if (setError) setError(null);
    } catch (err: any) {
        if (setError) setError(err.message);
        setData({emails: []});
    } finally {
        if (setLoading) setLoading(false);
    }
    if (!setData) return actualData;
}

export const post = async (path: string, body: any, token: string | null = null, setData: any & null = null, setError: any & null = null, setLoading: any & null = null) => {
    let actualData;
    try {
        const response = await fetch(url + path, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: token == null ? {
                'Content-Type': 'application/json',
            } :
                {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        });
        if (!response.ok) {
            throw new Error(
                `This is an HTTP error: The status is ${response.status}`
            );
        }
        actualData = await response.json();
        if (setData) setData(actualData);
        if (setError) setError(null);
    } catch (err: any) {
        if (setError) setError(err.message);
        if (setData) setData({emails: []});
    } finally {
        if (setLoading) setLoading(false);
    }
    if (!setData) return actualData;
}