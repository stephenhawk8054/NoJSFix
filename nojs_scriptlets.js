/// setsrc.js
/// alias ss.js
(function () {
    const target = "{{1}}";
    const replace = "{{2}}";
    const mode = "{{3}}";
    const attribute = "{{4}}";
    window.addEventListener("load", function () {
        const attr_json = {
            "iframe": "src",
            "img": "src",
            "source": "srcset",
            "video": "poster",
        };
        const regexp = /(?:https?:)?\/\/\S+/g;
        for (const imgEl of document.querySelectorAll(target)) {
            let replaceData = imgEl;
            for (const r of replace.split(" ")) {
                if (!(r in replaceData)) { continue; }
                replaceData = replaceData[r];
            }
            if (typeof replaceData != "string") { continue; }
            if (mode != "" && mode != "{{3}}") {
                const matches = [...replaceData.matchAll(regexp)];
                if (matches.length > 0) {
                    if (mode === "0") {
                        replaceData = matches[0][0].trim(" ");
                    }
                    else {
                        replaceData = matches[matches.length - 1][0].trim(" ");
                    }
                }
            }
            if (attribute === "" || attribute === "{{4}}") {
                if (imgEl.localName in attr_json) {
                    imgEl[attr_json[imgEl.localName]] = replaceData;
                }
                else {
                    imgEl.style.backgroundImage = `url("${replaceData}")`;
                }
            }
            else {
                imgEl[attribute] = replaceData;
            }
        }
    });
})();


/// rename-tag.js
/// alias rt.js
(function () {
    const target = '{{1}}';
    const replace = '{{2}}';
    window.addEventListener("load", function () {
        for (var imgEl of document.querySelectorAll(target)) {
            imgEl.outerHTML = imgEl.outerHTML.trim()
                .replace(/^<[-a-z]+/, '<' + replace)
                .replace(/<\/[-a-z]+>$/, '</' + replace + '>');
        }
    });
})();


/// bi-fix.js
(function () {
    window.addEventListener("load", function () {
        for (const imgEl of document.querySelectorAll("img.lazy-image[data-srcs]")) {
            let srcs = imgEl.dataset.srcs;
            if (srcs.startsWith("{")) {
                let imgJSON = JSON.parse(srcs);
                imgEl.src = Object.keys(imgJSON)[0];
            }
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