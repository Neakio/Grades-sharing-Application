import React from "react";

function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;
            }
        }
    }

    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;


async function getCSRFToken() {
    const response = await fetch("http://localhost:8000/api/csrf-token/", {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    const csrftoken = data.csrfToken;
    document.cookie = `csrftoken=${csrftoken}; path=/`;
    return data.csrfToken;
}

// Inside your function or request handler
export async function makeRequest() {
    const csrftoken = await getCSRFToken();

    const url = "http://localhost:8000/api/csrf-token"; // Specify your API endpoint URL

    const requestOptions = {
        credentials: "include",
        method: "POST",
        mode: "same-origin",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({}),
    };

    try {
        const response = await fetch(url, requestOptions);
        // Handle the response
    } catch (error) {
        // Handle the error
    }
}
