/// setsrc.js
/// alias ss.js
(function () {
    const target = '{{1}}';
    window.addEventListener("load", function () {
        console.log(target);
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