chrome.runtime.onInstalled.addListener(function () {
    console.log("Extension installed or updated");

    if (chrome.webNavigation) {
        console.log("chrome.webNavigation API is available");

        chrome.webNavigation.onCompleted.addListener(function handleNavigation(details) {
            console.log("Web navigation completed for URL:", details.url);

            const visitedUrl = details.url;
            const backendUrl = "https://search-track-frontend.vercel.app/search"; // Replace with your actual backend URL

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: visitedUrl,
                }),
            };

            try {
                fetch(backendUrl, requestOptions)
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
            } catch (error) {
                console.error("Fetch error:", error);
            }
        });
    } else {
        console.error("chrome.webNavigation API is not available");
    }
});
