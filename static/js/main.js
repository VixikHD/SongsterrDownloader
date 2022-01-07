chrome.runtime.onMessage.addListener(message => {
    fixPrintMedia();
});

function remove(node) {
    if(node === null || node === undefined) {
        return;
    }

    node.parentNode.removeChild(node);
}

function fixStylesheet() {
    remove(document.head.querySelector("link"));

    let link = document.head.querySelector("link");
    link.setAttribute("href", "static/css/songsterr.css");
}

function fixPrintMedia() {
    console.log("Fixing...");

    // Stuff found by id
    remove(document.getElementById("showroom"));
    remove(document.getElementById("tablist").parentNode);
    remove(document.getElementById("favorite"));
    remove(document.getElementById("revisions"));
    remove(document.getElementById("fullscreen"));
    remove(document.getElementById("text-showroom"));
    remove(document.getElementById("controls"));
    remove(document.getElementById("CursorShadow").parentNode.parentNode.parentNode);

    // Stuff found with class, seems like dev forgotten adjust id
    remove(document.getElementsByClassName("C6c2vy").item(0));
    remove(document.getElementsByClassName("Bls16p").item(0));
    remove(document.getElementsByClassName("Bajee").item(0));

    // Others...
    remove(document.querySelector("footer"));

    fixStylesheet();

    // window.scrollTo(0, document.body.scrollHeight);

    // Preloading the whole page
    const pages = Math.ceil(document.body.scrollHeight / 1000);

    let timeout = 0;
    for(let i = 1; i < pages; ++i) {
        timeout += 100;

        setTimeout(function () {
            window.scrollTo(0, i * 1000);
        }, timeout);
    }

    setTimeout(function () {
        window.print();
    }, timeout + 100);
}
