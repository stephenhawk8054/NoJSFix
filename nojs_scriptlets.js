/// setsrc.js
/// alias ss.js
(function () {
    const target = "{{1}}";
    const replace = "{{2}}";
    const mode = "{{3}}";
    const attribute = "{{4}}";
    // let attr, attr_json;
    // if (attribute != "" && attribute != "{{3}}") {
    //     attr = attribute;
    // }
    const attr_json = {
        "img": "src",
        "video": "poster",
        "source": "srcset"
    };
    const regexp = /(?:https?:)?\/\/\S+/g;
    window.addEventListener("load", function () {
        for (const imgEl of document.querySelectorAll(target)) {
            let attr = attr_json[imgEl.localName];
            if (attribute != "" || attribute != "{{4}}") {
                attr = attribute;
            }

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

            imgEl[attr] = replaceData;
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
                .replace(/^<[a-z\-]+/, '<' + replace)
                .replace(/<\/[a-z\-]+>$/, '</' + replace + '>');
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