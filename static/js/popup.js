$(function () {
    $("#fixPrintMedia").on("click", function () {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id,{state: true});
        });
    });
});
