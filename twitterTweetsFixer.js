function startObserver() {
    if (!document.body) {
        console.warn("Body not found, retrying...");
        setTimeout(startObserver, 100); // Retry in 100ms
        return;
    }

    const SAUL_IMAGE = "https://static.wikia.nocookie.net/breakingbad/images/e/e0/Saul_2009.jpg/revision/latest/scale-to-width/360?cb=20220812220131";

    function replaceElonContent() {
        for (const el of document.querySelectorAll('*:not(script):not(style):not(meta):not(noscript):not(iframe)')) {
            if (el.childNodes.length) {
                for (const node of el.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE) { 
                        const replacedText = node.nodeValue
                            .replace(/\bElon Musk\b/gi, "Saul Goodman")
                            .replace(/\bMusk\b/gi, "Goodman")
                            .replace(/\belonmusk\b/gi, "SaulGoodman") 
                            .replace(/\b@elonmusk\b/gi, "@SaulGoodman") 
                            .replace(/\bElon's\b/gi, "Saul's") 
                            .replace(/\bElon\b/gi, "Saul") 
                            .replace(/\bTesla\b/gi, "Better Call Saul Inc.");

                        if (node.nodeValue !== replacedText) {
                            node.nodeValue = replacedText;
                        }
                    }
                }
            }
        }
    }

    // Run replacement immediately
    replaceElonContent();

    // Set up MutationObserver
    const observer = new MutationObserver(() => {
        replaceElonContent(); // Run on DOM changes
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return observer; // Return observer in case you need to stop it later
}

// Start observer when the page loads
document.addEventListener("DOMContentLoaded", startObserver);
