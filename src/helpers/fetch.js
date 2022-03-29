//fetch con token y sin token


const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = async (endpoint, data, method) => {
    const url = `${baseUrl}${endpoint}`; //localhost:4000/api/...
    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type:': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export {fetchSinToken}