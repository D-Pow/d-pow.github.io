(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{141:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n(0),o=n.n(r),i=n(15),a=n(7),u=o.a.createElement(i.a,{href:a.d.EtradeHome},o.a.createElement("img",{alt:"e-trade-icon",src:a.d.EtradeIcon,style:{marginTop:"-1%"}}),"E-Trade")},142:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n(0),o=n.n(r);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=o.a.createContext();return{Consumer:t.Consumer,Provider:function(n){var u=a(Object(r.useState)(e),2),c=u[0],f=u[1];return o.a.createElement(t.Provider,i({value:{contextState:c,setContextState:f}},n))},Context:t}}},335:function(e,t,n){e.exports={themeColors:'("primary": #3800ff, "secondary": #2800b0, "success": #28a745, "info": #17a2b8, "warning": #ffc107, "danger": #dc3545, "light": #e1e0e0, "dark": #282828, "tertiary": #190061, "lighter": #f1f0f0, "grey": #e8e8e8)',gridBreakpoints:"(xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1550px)",spinDurationMin:"3",spinDurationMax:"20",rippleAnimationTime:"2.3s"}},339:function(e,t,n){e.exports={themeColors:'("primary": #3800ff, "secondary": #2800b0, "success": #28a745, "info": #17a2b8, "warning": #ffc107, "danger": #dc3545, "light": #e1e0e0, "dark": #282828, "tertiary": #190061, "lighter": #f1f0f0, "grey": #e8e8e8)',gridBreakpoints:"(xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1550px)"}},37:function(e,t,n){"use strict";n.d(t,"b",function(){return f}),n.d(t,"a",function(){return s}),n.d(t,"c",function(){return l});var r=n(0),o=n(9);function i(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.nestedEventField,o=void 0===n?null:n,i=t.initialEventState,c=void 0===i?null:i,f=t.handleEvent,s=void 0===f?null:f,l=t.useEffectInputs,p=void 0===l?[]:l,d=u(Object(r.useState)(c),2),m=d[0],v=d[1],y=a(s)===a(function(){});function h(e){var t=o?e[o]:e;y?s(m,v,t):v(t)}return Object(r.useEffect)(function(){return window.addEventListener(e,h),function(){window.removeEventListener(e,h)}},p),[m,v]}function f(e,t){var n,r,i,a=u(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"down";return c("key".concat(e),{nestedEventField:"key"})}(),2),f=a[0],s=a[1],l=(n=u(c("click"),2),r=n[0],i=n[1],[Object(o.c)(r),i]),p=u(l,2),d=p[0],m=p[1],v="Escape"===f,y=Object(o.b)(e,d),h=Object(o.b)(t,d);return[v||h&&!y,function(){s(null),m([])}]}function s(){var e=Object(r.useRef)(null);var t=u(c("mousemove",{initialEventState:!1,handleEvent:function(t,n,r){var o=r.pageX,i=r.pageY;if(e.current){var a=window,u=a.pageXOffset,c=a.pageYOffset,f=e.current.getBoundingClientRect(),s=f.top,l=f.bottom,p=f.left,d=f.right;s+=c,l+=c,p+=u,n(o<=(d+=u)&&o>=p&&i<=l&&i>=s)}},useEffectInputs:[e.current]}),1)[0];return[e,t]}function l(e,t){var n=Array.from({length:e}).fill(!1),o=u(Object(r.useReducer)(function(e,t){var n=i(e);return n[t]=!0,n},n),2),a=o[0],c=o[1],f=u(Object(r.useState)(!1),2),s=f[0],l=f[1],p=u(Object(r.useState)(!1),2),d=p[0],m=p[1];if(s&&!d){m(!0);for(var v=function(e){setTimeout(function(){c(e)},t*e)},y=0;y<e;y++)v(y)}return[a,function(){l(!0)}]}},7:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"g",function(){return o}),n.d(t,"e",function(){return a}),n.d(t,"f",function(){return u}),n.d(t,"c",function(){return c}),n.d(t,"d",function(){return f}),n.d(t,"b",function(){return s});var r=["red","blue","purple","pink","orange","green","yellow","gray","teal","cyan","indigo","darkblue","deepskyblue","lawngreen","maroon","magenta","rosybrown","royalblue","salmon","sandybrown"],o=.75,i="(android|bb\\d+|meego){}|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino",a=new RegExp(i.replace("{}",".+mobile"),"i"),u=new RegExp(i.replace("{}","|ipad"),"i"),c=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,f={LinkedIn:"https://www.linkedin.com/in/devon-powell/",GitHub:"https://github.com/D-Pow",MutualFundsHome:"https://us.etrade.com/what-we-offer/investment-choices/mutual-funds",PrebuiltPortfolios:"https://us.etrade.com/etx/wm/prebuiltmutualfundportfolios",AutomaticInvesting:"https://us.etrade.com/etx/wm/automaticinvesting",EtradeAndroidApp:"https://play.google.com/store/apps/details?id=com.etrade.mobilepro.activity",MockRequests:"https://www.npmjs.com/package/mock-requests",AtomsOfConfusion:"https://atomsofconfusion.com",AnticancerPeptides:"https://www.ncbi.nlm.nih.gov/pubmed/29897657",TardigradeStratification:"https://bioone.org/journals/Transactions-of-the-Kansas-Academy-of-Science/volume-118/issue-3-4/062.118.0306/Tardigrades-of-the-Canopy-Evidence-of-Stratification/10.1660/062.118.0306.short",EtradeHome:"https://etrade.com",EtradeIcon:"https://cdn.etrade.net/1/19042220580.0/aempros/etc/designs/responsive-etrade/pagemeta/images/favicon-16x16.png"},s="https://formspree.io/xkdoqyjm"},9:function(e,t,n){"use strict";n.d(t,"e",function(){return a}),n.d(t,"a",function(){return u}),n.d(t,"f",function(){return c}),n.d(t,"g",function(){return s}),n.d(t,"c",function(){return l}),n.d(t,"b",function(){return p}),n.d(t,"d",function(){return d});var r=n(7),o=n(140);function i(e,t,n,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function a(){return(arguments.length>0&&void 0!==arguments[0]&&arguments[0]?r.f:r.e).test(navigator.userAgent||navigator.vendor||window.opera)}function u(e){return"function"==typeof e.type}function c(e){return f.apply(this,arguments)}function f(){var e;return e=regeneratorRuntime.mark(function e(t){var r,o,i,a=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=a.length>1&&void 0!==a[1]&&a[1],null==t||""===t){e.next=14;break}return e.prev=2,e.next=5,n(338)("./".concat(t));case 5:if(o=e.sent,i=o.default,!r){e.next=9;break}return e.abrupt("return",fetch(i).then(function(e){return e.blob()}).then(function(e){return new Promise(function(t,n){var r=new FileReader;r.onload=function(){t(r.result)},r.onerror=function(){n()},r.readAsDataURL(e)})}));case 9:return e.abrupt("return",i);case 12:e.prev=12,e.t0=e.catch(2);case 14:throw new Error("".concat(t," was not found"));case 15:case"end":return e.stop()}},e,null,[[2,12]])}),(f=function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function u(e){i(a,r,o,u,c,"next",e)}function c(e){i(a,r,o,u,c,"throw",e)}u(void 0)})}).apply(this,arguments)}function s(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=n[0]instanceof Array?n[0]:n,i=null!=e;if(0===o.length)return i;var a=o[0];return i&&e.hasOwnProperty(a)&&s(e[a],o.slice(1))}function l(e){if(!e||Array.isArray(e)&&0===e.length)return[];if(e.path)return e.path;for(var t=[],n=e.target;n;)t.push(n),n=n.parentElement;return t.push(document,window),t}function p(e,t){var n=e.attribute,r=e.value,o=!1,i=!0,a=!1,u=void 0;try{for(var c,f=t[Symbol.iterator]();!(i=(c=f.next()).done);i=!0){var s=c.value;if(s instanceof HTMLElement){var l=s.getAttribute(n);if(l&&l.includes(r)){o=!0;break}}}}catch(e){a=!0,u=e}finally{try{i||null==f.return||f.return()}finally{if(a)throw u}}return o}function d(){return e=o.themeColors,JSON.parse(e.replace("(","{").replace(")","}").replace(/: ([^,}]+)([,}])/g,': "$1"$2').replace(/([\s{])(?!")([^:\s]+)+:/g,'$1"$2":'));var e}}}]);