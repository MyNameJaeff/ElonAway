function startObserver() {
    if (!document.body) {
        console.warn("Body not found, retrying...");
        setTimeout(startObserver, 100);
        return;
    }

    const SAUL_IMAGE_URL = "https://i.imgur.com/4K3fL6d.jpeg";
    const SAUL_VIDEO_URL = "https://www.youtube.com/watch?v=iId5WDsYxZ4";

    function replaceContent(article) {
        requestIdleCallback(() => {
            document.title = "Saul Goodman (@SaulGoodman) / X";
            for(const test of document.body.querySelectorAll("*:not(script):not(style):not(meta):not(noscript):not(iframe)")) {
                for (const el of test.querySelectorAll("div.css-175oi2r.r-1niwhzg.r-vvn4in.r-u6sd8q.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-13qz1uu.r-1wyyakw.r-4gszlv")) {
                    if (window.getComputedStyle(el).backgroundImage !== "none") {
                        el.style.backgroundImage = `url(${SAUL_IMAGE_URL})`;
                    }
                }

                for(const video of test.querySelectorAll("video")) {
                    const img = document.createElement("img");
                    video.parentElement.parentElement.nextSibling.remove();
                    img.src = SAUL_IMAGE_URL;
                    video.parentNode.replaceChild(img, video);
                }
            }
    
            // Replace text content
            for (const el of document.body.querySelectorAll("*:not(script):not(style):not(meta):not(noscript):not(iframe)")) {
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

            // Replace all <img> elements inside the article
            for (const img of article.querySelectorAll("img")) {
                img.src = SAUL_IMAGE_URL;
            }

            // Process divs with the specified class for text replacement
            for (const div of article.querySelectorAll("div.r-bnwqim")) {
                const spans = Array.from(div.querySelectorAll("span"));
                if (spans.length > 1) {
                    for (const span of spans.slice(1)) {
                        span.textContent = "";
                    }
                }
                if (spans.length > 0) {
                    spans[0].textContent = "I'm Saul Goodman. Did you know that you have rights? The Constitution says you do!";
                }
            }

            // Mark article as processed
            article.dataset.processed = "true";
        });
    }

    function processAllArticles() {
        document.querySelectorAll("article:not([data-processed])").forEach(replaceContent);
    }

    processAllArticles();

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1 && node.tagName === "ARTICLE") {
                    replaceContent(node);
                } else if (node.nodeType === 1) {
                    for (const article of node.querySelectorAll("article:not([data-processed])")) {
                        replaceContent(article);
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log("Observer started.");
    return observer;
}

document.addEventListener("DOMContentLoaded", startObserver);
