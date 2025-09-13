// ==UserScript==
// @name        No JS
// @namespace   User Scripts
// @match       https://www.forbes.com/*
// @grant       none
// @run-at      document-end
// @version     1.0
// @author      -
// @description Restore frames and images in no-scripting mode
// @downloadURL https://raw.githubusercontent.com/stephenhawk8054/NoJSFix/refs/heads/main/sandbox.user.js
// ==/UserScript==

// General -----------------------------------------------------------------
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

// Sites
const hostname = location.hostname;
if (hostname.includes("forbes.com")) { forbes() }