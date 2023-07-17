# NoJSFix
Fix sites with error images loading in noscript mode for uBlock Origin

1. Link to add to ["userresourceslocation"](https://github.com/gorhill/uBlock/wiki/Advanced-settings#userresourceslocation):  
https://raw.githubusercontent.com/stephenhawk8054/NoJSFix/main/nojs_scriptlets.js

2. Filter list link to add to uBlock Origin:  
https://raw.githubusercontent.com/stephenhawk8054/NoJSFix/main/nojs_fix.txt

3. Declutter filter list - remove all distracting elements of the article  
*Warning: This could cause unexpected behavior/breakages. Use at your own risk*  
https://raw.githubusercontent.com/stephenhawk8054/NoJSFix/main/declutter.txt

4. Dark mode filter lists - Set dark mode for Firefox' users with resistfingerprint or noscript mode  
*Important: dark_mode_truted.txt contains trusted scriptlets from uBO. Therefore they can only be used in "My filters" pane. It cannot be used as an external list. Please just copy the filters to "My filters" pane.*  
https://raw.githubusercontent.com/stephenhawk8054/NoJSFix/main/dark_mode.txt  
https://raw.githubusercontent.com/stephenhawk8054/NoJSFix/main/dark_mode_trusted.txt