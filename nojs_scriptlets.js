/// setsrc.js
/// alias ss.js
/// world ISOLATED
function setSrc(
    target = "",
    replace = "",
    mode = "",
    attribute = ""
) {
    if (target === "" || replace === "") { return; }
    window.addEventListener("load", function () {
        const attr_json = {
            "iframe": "src",
            "img": "src",
            "source": "srcset",
            "video": "poster",
        };
        const imgExts = [
            "jpg",
            "JPG"
        ]
        const regexp = /(?:https?:)?\/\/\S+/g;
        for (const imgEl of document.querySelectorAll(target)) {
            let replaceData = imgEl;
            for (const r of replace.split(" ")) {
                if (!(r in replaceData)) { continue; }
                replaceData = replaceData[r];
            }
            if (typeof replaceData != "string") { continue; }
            if (mode != "") {
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
            for (const ext of imgExts) {
                if (replaceData.includes(`.${ext}|`)) {
                    replaceData = replaceData.split(`.${ext}|`)[0] + `.${ext}`;
                    break;
                }
            }
            if (attribute === "") {
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
}

/// rename-tag.js
/// alias rt.js
/// world ISOLATED
function renameTag(
    target = "",
    replace = ""
) {
    window.addEventListener("load", function () {
        for (var imgEl of document.querySelectorAll(target)) {
            imgEl.outerHTML = imgEl.outerHTML.trim()
                .replace(/^<[-a-z]+/, "<" + replace)
                .replace(/<\/[-a-z]+>$/, "</" + replace + ">");
        }
    });
}