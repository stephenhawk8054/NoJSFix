/// srcset.js
(function () {
    const target = "{{1}}";
    const replace = "{{2}}";
    const attribute = "{{3}}";
    const mode = "{{4}}";
    let attr = "src";
    if (attribute != "" && attribute != "{{3}}") { attr = attribute };
    window.addEventListener("load", function () {
        for (const imgEl of document.querySelectorAll(target)) {
            if (mode === "" || mode === "{{4}}") {
                imgEl[attr] = imgEl.dataset[replace]
            }
            else {
                let imgSplit = imgEl.dataset[replace].split("http");
                imgEl[attr] = "http" + imgSplit[imgSplit.length - 1].trim().split(" ")[0];
            }
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


/// ie-fix.js
(function () {
    window.addEventListener("load", function () {
        const selectorStr = '.right_container_flip img[loading="lazy"], #article_box img[loading="lazy"]';

        for (let imgEl of document.querySelectorAll(selectorStr)) {
            let imgSplit = imgEl.previousElementSibling.dataset.srcset.split(",");
            imgEl.src = imgSplit[imgSplit.length - 1].trim().split(" ")[0];
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