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

/// add-class.js
/// alias ac.js
/// world ISOLATED
// example.com##+js(ac, class, [selector])
function addClass(
	needle = '',
	selector = '' 
) {
	if ( needle === '' ) { return; }
	const needles = needle.split(/\s*\|\s*/);
	if ( selector === '' ) { selector = '.' + needles.map(a => CSS.escape(a)).join(',.'); }
	const addclass = ev => {
		if (ev) { self.removeEventListener(ev.type, addclass, true);  }
		const nodes = document.querySelectorAll(selector);
		try {
			for ( const node of nodes ) {
			      node.classList.add(...needles);
			}
		} catch { }
	};
	if (document.readyState === 'loading') {
	      self.addEventListener('DOMContentLoaded', addclass, true);
	} else {
	      addclass();
	}
}

/// replace-attr.js
/// alias rpa.js
/// world ISOLATED
/// dependency run-at.fn
// example.com##+js(rpa, [selector], oldattr, newattr, newvalue)
function replaceAttr(
	selector = '',
	oldattr = '',
	newattr = '',
	value = '',
	run = '' 
) {
	if ( selector === '' || oldattr === '' || newattr === '' ) { return; }
	let timer;
	const replaceattr = ( ) => {
		timer = undefined;
		const elems = document.querySelectorAll(selector);
		try {
			for ( const elem of elems ) {
				if ( elem.hasAttribute( oldattr ) ) {
				     elem.removeAttribute( oldattr );		
				     elem.setAttribute( newattr, value );
				}
			}	
		} catch { }
	};
	const mutationHandler = mutations => {
		if ( timer !== undefined ) { return; }
		let skip = true;
		for ( let i = 0; i < mutations.length && skip; i++ ) {
		    const { type, addedNodes, removedNodes } = mutations[i];
		    if ( type === 'attributes' ) { skip = false; }
		    for ( let j = 0; j < addedNodes.length && skip; j++ ) {
			if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		    for ( let j = 0; j < removedNodes.length && skip; j++ ) {
			if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		}
		if ( skip ) { return; }
		timer = self.requestAnimationFrame(replaceattr);
	};
	const start = ( ) => {
		replaceattr();
		if ( /\bloop\b/.test(run) === false ) { return; }
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.documentElement, {
		    childList: true,
		    subtree: true,
		});
	};
	runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
}
