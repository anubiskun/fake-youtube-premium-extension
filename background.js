(() => {
    let api;

    if (isChrome()) api = chrome;
    else if (isFirefox()) api = browser;

    api.runtime.onInstalled.addListener((details) => {
        if (
            // No need to show changelog if its was a browser update (and not extension update)
            details.reason === "browser_update" ||
            // Chromium (e.g., Google Chrome Cannary) uses this name instead of the one above for some reason
            details.reason === "chrome_update" ||
            // No need to show changelog if developer just reloaded the extension
            details.reason === "update"
        ) {
            return;
        } else if (details.reason == "install") {
            api.tabs.create({
                url: "https://github.com/anubiskun",
            });
        }
    });

    api.action.onClicked.addListener(function (tab) {
        api.tabs.create({ url: "https://github.com/anubiskun" });
    });

    function isChrome() {
        return typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined";
    }

    function isFirefox() {
        return (
            typeof browser !== "undefined" && typeof browser.runtime !== "undefined"
        );
    }

})()