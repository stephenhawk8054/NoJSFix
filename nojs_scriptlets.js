/// lazy-van.js
(function () {
    window.addEventListener("load", function() {
        for (const imgEl of document.querySelectorAll("img.lazy-image-van")) {
            let imgSplit = imgEl.dataset.srcset.split(",");
            imgEl.src = imgSplit[imgSplit.length - 1].trim().split(" ")[0];
        }
      });
})();