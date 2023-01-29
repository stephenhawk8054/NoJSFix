/// srcset.js
(function () {
    const target = "{{1}}";
    const replace = "{{2}}";
    const attribute = "{{3}}";
    const mode = "{{4}}";
    let attr = "src";
    if (attribute != "" && attribute != "{{3}}") {
        attr = attribute;
    }
    // const regexp = /(?<=\d[a-z],)(?:.*?)(?= \d{1,4}w)|(?<=^)(?:.*?)(?= \d{1,4}[a-z])/g;
    const regexp = /https?:\/\/\S+/g;
    window.addEventListener("load", function () {
        for (const imgEl of document.querySelectorAll(target)) {
            let replaceData = imgEl;
            for (const r of replace.split(" ")) {
                if (!(r in replaceData)) { continue; }
                replaceData = replaceData[r];
            }
            if (typeof replaceData != "string") { continue; }
            if (mode != "" && mode != "{{4}}") {
                const matches = [...replaceData.matchAll(regexp)];
                if (matches.length > 0) {
                    replaceData = matches[matches.length - 1][0].trim(" ");
                }
            }
            imgEl[attr] = replaceData;
        }
    });
})();


/// replace-tag.js
(function () {
    const target = '{{1}}';
    const replace = '{{2}}';
    let tagName;
    window.addEventListener("load", function () {
        for (var imgEl of document.querySelectorAll(target)) {
            tagName = imgEl.tagName.toLowerCase();
            imgEl.outerHTML = imgEl.outerHTML.trim()
                .replace(`<${tagName} `, `<${replace} `)
                .replace(`</${tagName}>`, `</${replace}>`)
        }
    });
})();


/// bi-fix.js
(function () {
    window.addEventListener("load", function () {
        for (const imgEl of document.querySelectorAll("img.lazy-image")) {
            let imgJSON = JSON.parse(imgEl.dataset.srcs);
            imgEl.src = Object.keys(imgJSON)[0];
        }
    });
})();


/// vice-fix.js
(function () {
    window.addEventListener("load", function () {
        for (let srcEl of document.querySelectorAll("picture > source")) {
            srcEl.srcset = srcEl.srcset.split("?")[0];
        }
    });
})();


/// windowscentral-fix.js
(function () {
    window.addEventListener("load", function () {
        let scriptEl = document.querySelector('script[id^="vanilla-slice-imageGallery"]');
        let imgEl = document.querySelector("#article-body img.image-wrapped__image");

        let dictStr = scriptEl.innerHTML.split("var data = ")[1].split(";\n")[0];
        imgEl.src = JSON.parse(dictStr).galleryData[0].image.src;
    });
})();