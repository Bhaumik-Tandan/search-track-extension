/* The code you provided is a listener that is triggered when the Chrome extension is installed or
updated. It adds an event listener for the `webNavigation.onCompleted` event, which is fired when a
navigation is completed in the browser. */
chrome.runtime.onInstalled.addListener(function () {
    console.log("Extension installed or updated");

    // Add an event listener for the webNavigation
    if (chrome.webNavigation) {
        console.log("chrome.webNavigation API is available");
        
        chrome.webNavigation.onCompleted.addListener(function (details) {
            console.log("Web navigation completed for URL:", details.url);

            const visitedUrl = details.url;
            const backendUrl = "https://search-track-frontend.vercel.app/search"; // Replace with your actual backend URL

            fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: visitedUrl,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        });
    } else {
        console.error("chrome.webNavigation API is not available");
    }
});
