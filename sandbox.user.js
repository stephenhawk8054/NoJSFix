// ==UserScript==
// @name        No JS
// @namespace   User Scripts
// @match       https://www.forbes.com/*
// @match       https://www.cnbc.com/*
// @match       https://thanhnien.vn/*
// @grant       none
// @run-at      document-end
// @version     3.0
// @author      -
// @description Restore frames and images in no-scripting mode
// @downloadURL https://raw.githubusercontent.com/stephenhawk8054/NoJSFix/refs/heads/main/sandbox.user.js
// @updateURL   https://raw.githubusercontent.com/stephenhawk8054/NoJSFix/refs/heads/main/sandbox.user.js
// ==/UserScript==

// General -----------------------------------------------------------------
const parser = new DOMParser();
const addNode = (nodeStr, source, parent) => {
  if (source) {
    let node = document.createElement(nodeStr);
    node.src = source;
    parent.appendChild(node);
  }
}

// Forbes -----------------------------------------------------------------
const forbes = () => {
  document.querySelectorAll("fbs-embedly").forEach(fbsEmbed => {
    addNode("iframe", fbsEmbed.attributes["iframe-src"]?.value, fbsEmbed)
  });
  document.querySelectorAll("progressive-image").forEach(imageProg => {
    const imageSrc = imageProg.attributes["src"]?.value;
    const imageBg = imageProg.attributes["background-image"]?.value;
    if (imageSrc) { addNode("img", imageSrc, imageProg) }
    else if (imageBg) { addNode("img", imageBg, imageProg) }
  })
}

// CNBC -------------------------------------------------------------------
const cnbc = () => {
  document.querySelectorAll('script[charset="UTF-8"]').forEach(scriptEl => {
    let scriptTxt = scriptEl.textContent
    if (scriptTxt.includes("window.__s_data")) {
      new Function(scriptTxt)();
      __s_data.page.page.layout.forEach(layout => {
        layout.columns.forEach(column => {
          column.modules.forEach(module => {
            if (module.name === "articleBody") {
              module.data.body.content.forEach(content => {
                if (content.tagName === "image") {
                  let imagePlaceholder = document.querySelector(`#ArticleBody-InlineImage-${content.attributes.id} .InlineImage-imagePlaceholder`);
                  imagePlaceholder.removeAttribute("style");
                  addNode("img", content.attributes.url, imagePlaceholder);
                }
              })
            }
          })
        })
      })
    }
  })
}

// thanhnien.vn -----------------------------------------------------------
const thanhnien = () => {
  document.querySelectorAll(".VCSortableInPreviewMode[data-vid]").forEach(dataVid => {
    const dataset = dataVid.dataset;
    const video = parser.parseFromString(
      `<video poster="${dataset.thumb}" width="${dataset.width}" controls><source src="https://${dataset.vid}" type="video/mp4"></video>`,
      "text/html"
    );
    dataVid.insertBefore(video.body.children[0], dataVid.firstChild);
  })
}

// Sites
const hostname = location.hostname;
if (hostname.includes("forbes.com")) { forbes() }
else if (hostname.includes("cnbc.com")) { cnbc() }
else if (hostname.includes("thanhnien.vn")) { thanhnien() }