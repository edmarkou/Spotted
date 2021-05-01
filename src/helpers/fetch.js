import { retrieveUserSession } from "./userSessionHelper";

export async function makeRequest(url = '', data = {}, method = 'GET') {
    let settings = {
        method,
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    if (Object.keys(data).length) {
        settings.body = JSON.stringify(data);
    };
    const response = await fetch(url, settings);
    return response.json();
};

export async function makeAuthRequest(url = '', data = {}, method = 'GET') {
    const session = await retrieveUserSession();
    if (session) {
        let settings = {
            method,
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cookie": `authToken=${JSON.parse(session).token}`
            }
        };
        if (Object.keys(data).length) {
            settings.body = JSON.stringify(data);
        };
        const response = await fetch(url, settings);
        return response.json();
    }
    throw new Error('No session found');
};