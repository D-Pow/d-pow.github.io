!function(e){function t(t){for(var r,i,c=t[0],u=t[1],s=t[2],f=0,d=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(l&&l(t);d.length;)d.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={6:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(e){return i.p+"static/js/"+({2:"About",3:"Footer",4:"Header",5:"Home"}[e]||e)+".ec617b89.chunk.js"}(e);var u=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(s);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",u.name="ChunkLoadError",u.type=r,u.request=a,n[1](u)}o[e]=void 0}};var s=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var l=u;a.push([213,0,1]),n()}({115:function(e,t,n){"use strict";n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return u}));n(73);var r=n(53),o=n(152);function a(e){return JSON.parse(e.replace("(","{").replace(")","}").replace(/: ?([^,}]+)([,}])/g,': "$1"$2').replace(/([\s{,])(?!")([^:\s]+)+:/g,'$1"$2":'))}function i(){return a(o.themeColors)}function c(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=a(o.gridBreakpoints);return e?Object.keys(t).reduce((function(e,n){return e[n]=Object(r.a)(t[n]),e}),{}):t}function u(e){var t=new RegExp("(duration-)(\\d+)"),n=e.match(t);return!!n&&100*Number(n[2])}},155:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return c}));var r=n(73),o=n(115);function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.includeTablets,n=void 0!==t&&t,a=e.onlyXsScreenSizes,i=void 0!==a&&a,c=n?r.f:r.e,u=c.test(navigator.userAgent||navigator.vendor||window.opera);if(i){var s=window.innerWidth<Object(o.b)().sm;return u&&s}return u}function i(){return null!=window.safari||navigator.vendor.toLocaleLowerCase().includes("apple")}function c(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=["trident","msie"];e&&t.push("edge");var n="(".concat(t.join("|"),")");return Boolean(navigator.userAgent.toLowerCase().match(new RegExp(n)))}},208:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(90),o=n.n(r),a=n(20),i=n.n(a),c=n(1),u=n.n(c);function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=u.a.createContext(),n=function(n){var r=Object(c.useState)(e),a=i()(r,2),s=a[0],l=a[1];return u.a.createElement(t.Provider,o()({value:{contextState:s,setContextState:l}},n))};return{Consumer:t.Consumer,Provider:n,Context:t}}},213:function(e,t,n){n(214),n(581),e.exports=n(603)},46:function(e,t,n){"use strict";n.d(t,"d",(function(){return c})),n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return f})),n.d(t,"e",(function(){return d})),n.d(t,"f",(function(){return p}));var r=n(116),o=n.n(r),a=n(156),i=n.n(a);function c(e){return u.apply(this,arguments)}function u(){return(u=i()(o.a.mark((function e(t){var r,a,i,c=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=c.length>1&&void 0!==c[1]&&c[1],null==t||""===t){e.next=14;break}return e.prev=2,e.next=5,n(597)("./".concat(t));case 5:if(a=e.sent,i=a.default,!r){e.next=9;break}return e.abrupt("return",fetch(i).then((function(e){return e.blob()})).then((function(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(){t(r.result)},r.onerror=function(){n()},r.readAsDataURL(e)}))})));case 9:return e.abrupt("return",i);case 12:e.prev=12,e.t0=e.catch(2);case 14:throw new Error("".concat(t," was not found"));case 15:case"end":return e.stop()}}),e,null,[[2,12]])})))).apply(this,arguments)}function s(e,t){var n,r,o=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=a.callOnFirstFuncCall,c=void 0!==i&&i,u=a.bindThis,s=void 0!==u&&u;return s&&(r=this),function(){for(var a=arguments.length,i=new Array(a),u=0;u<a;u++)i[u]=arguments[u];s||(r=o);var l=c&&null==n;clearTimeout(n),n=setTimeout((function(){n=null,l||e.call.apply(e,[r].concat(i))}),t),l&&e.call.apply(e,[r].concat(i))}}function l(e){if(!e||Array.isArray(e)&&0===e.length)return[];if(e.path)return e.path;for(var t=[],n=e.target;n;)t.push(n),n=n.parentElement;return t.push(document,window),t}function f(e,t){var n=e.attribute,r=e.value,o=!1,a=!0,i=!1,c=void 0;try{for(var u,s=t[Symbol.iterator]();!(a=(u=s.next()).done);a=!0){var l=u.value;if(l instanceof HTMLElement){var f=l.getAttribute(n);if(f&&f.includes(r)){o=!0;break}}}}catch(e){i=!0,c=e}finally{try{a||null==s.return||s.return()}finally{if(i)throw c}}return o}function d(){window.scrollTo(0,0)}function p(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];document.body.style.overflow=e?"auto":"hidden"}},53:function(e,t,n){"use strict";function r(e){return Number(e.replace(/[^\d.]/g,""))}function o(e,t){return null==t&&(t=e,e=0),e=Number(e),t=Number(t),isNaN(e)||isNaN(t)?Math.random():Math.random()*(t-e)+e}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}))},597:function(e,t,n){var r={"./atoms_of_confusion.jpg":[613,7],"./automatic_investing.jpg":[614,8],"./blue_horizon.svg":[615,9],"./blue_mountains.svg":[616,10],"./edge_panel_widget.png":[617,11],"./etrade_icon.png":[618,12],"./favicon-144.png":[619,13],"./favicon-192.png":[620,14],"./favicon.ico":[621,15],"./favicon.png":[622,16],"./fonts/BrushScript.eot":[623,17],"./fonts/BrushScript.ttf":[624,18],"./fonts/BrushScript.woff":[625,19],"./github_logo.svg":[626,20],"./linkedin_logo.svg":[627,21],"./mock_requests.png":[628,22],"./night_forest.svg":[629,23],"./peptide_nmr.jpg":[630,24],"./prebuilt_portfolios.jpg":[631,25],"./premarket_modal.png":[632,26],"./profile_pic.jpg":[633,27],"./react_logo.svg":[634,28],"./tardigrade.jpg":[635,29]};function o(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],o=t[0];return n.e(t[1]).then((function(){return n.t(o,7)}))}o.keys=function(){return Object.keys(r)},o.id=597,e.exports=o},603:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(151),i=n.n(a),c=n(90),u=n.n(c),s=n(32),l=n.n(s),f=n(20),d=n.n(f),p=n(58),m=n(150),v=n(24),b=n.n(v);n(592);function g(e){var t=e.numElectrons,n=e.electronColors,r=180/t,a=function(e){return"rotate(".concat(r*e,"deg)")},i=function(e){return"-".concat(e/(2*t),"s")};return o.a.createElement("div",{className:"m-auto absolute-center atom-container"},Array.from({length:t}).map((function(e,t){return o.a.createElement("div",{className:"atom-orbit-path",style:{transform:a(t)},key:t})})),Array.from({length:t}).map((function(e,t){return o.a.createElement("div",{className:"atom-orbit-path-invisible",style:{transform:a(t)},key:t},o.a.createElement("div",{className:"atom-electron atom-electron-orbit ".concat((r=t,"bg-".concat(n[r%n.length]))),style:{animationDelay:i(t)}}));var r})))}g.propTypes={numElectrons:b.a.number,electronColors:b.a.arrayOf(b.a.string)},g.defaultProps={numElectrons:3,electronColors:["primary","secondary","tertiary"]};var h=g,E=n(91),w=n(115);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){var t=e.className,n=e.fullScreen,a=e.show,i=e.preventDocumentScrolling,c=e.onClose,u=e.onUnmount,s=e.numElectrons,l=e.electronColors,f=Object(r.useState)(!1),p=d()(f,2),m=p[0],v=p[1],b=["bg-dark","absolute-center","position-fixed","animated","fade-out-disappear","duration-8"];n&&b.push("full-screen"),t&&b.push(t),a&&b.push("show");var g=b.join(" "),O=Object(w.a)(g)+200;return Object(E.b)((function(){return a&&i})),Object(r.useEffect)((function(){var e=!a&&m;a&&v(!0),e&&(setTimeout((function(){v(!1),u()}),O),c())}),[a,O]),a||m?o.a.createElement("div",{className:g},o.a.createElement("div",{className:"m-auto"},o.a.createElement(h,{numElectrons:s,electronColors:l}))):null}y.propTypes=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({className:b.a.string,fullScreen:b.a.bool,show:b.a.bool,preventDocumentScrolling:b.a.bool,onClose:b.a.func,onUnmount:b.a.func},h.propTypes),y.defaultProps={className:"",fullScreen:!0,show:!1,preventDocumentScrolling:!0,onClose:function(){},onUnmount:function(){}};var S=y;var j=function(e){return o.a.createElement("div",{className:"text-center position-absolute top-20 w-100"},o.a.createElement("h1",{className:"w-80 m-auto"},"Please use a modern browser (e.g. Chrome, Firefox, Safari) to view this website."))},_=n(155),A=n(46),N=n(66);function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var L=Promise.all([n.e(0),n.e(1),n.e(5)]).then(n.bind(null,641)),P=o.a.lazy((function(){return L})),I=Promise.all([n.e(0),n.e(2)]).then(n.bind(null,642)),D=o.a.lazy((function(){return I})),T=Promise.all([n.e(0),n.e(1),n.e(4)]).then(n.bind(null,643)),x=(o.a.lazy((function(){return T})),Promise.all([n.e(0),n.e(3)]).then(n.bind(null,644))),C=o.a.lazy((function(){return x})),G=[{path:"/",component:P,name:"Home",exact:!0},{path:"/about",component:D,name:"About"}];var M=function(){var e=Object(r.useContext)(N.b.Context),t=e.contextState,n=e.setContextState,a=t[N.a.GET_IMAGES_STILL_LOADING](),i=Object(r.useState)(!1),c=d()(i,2),s=c[0],f=c[1],v=Object(r.useState)(!1),b=d()(v,2),g=b[0],h=b[1],w=Object(r.useState)(!0),O=d()(w,2),y=O[0],L=O[1],P=a||y;Object(r.useEffect)((function(){n((function(e){var t;return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,(t={},l()(t,N.a.GLOBAL_SPINNER_CLOSED,s),l()(t,N.a.GLOBAL_SPINNER_UNMOUNTED,g),t))}))}),[s,g]),Object(r.useEffect)((function(){a||setTimeout((function(){L(!1)}),1750)}),[a]),Object(r.useEffect)((function(){return window.addEventListener("unload",A.e),function(){window.removeEventListener("unload",A.e)}}),[]);var I=Object(E.g)();d()(I,1)[0]&&window.location.reload();var D=G.map((function(e){return o.a.createElement(p.d,u()({key:e.path},e))}));if(Object(_.a)())return o.a.createElement(j,null);var T=o.a.createElement(S,{show:P,onClose:function(){return f(!0)},onUnmount:function(){return h(!0)}});return o.a.createElement("div",{className:"App text-center font-didot-serif"},o.a.createElement(o.a.Suspense,{fallback:T},o.a.createElement(m.HashRouter,null,o.a.createElement(o.a.Fragment,null,D,o.a.createElement(C,null))),T))},R=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function U(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(600);var B=N.b.Provider,z=o.a.createElement(B,null,o.a.createElement(M,null)),H=document.getElementById("root");i.a.render(z,H),function(){if("serviceWorker"in navigator){if(new URL("static",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="./ServiceWorker.js";R?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):U(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),U(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):U(e)}))}}()},66:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r,o=n(32),a=n.n(o),i=n(208),c={IMAGES_REQUESTED:"imagesRequested",IMAGES_LOADED:"imagesLoaded",GET_IMAGES_HAVE_BEEN_REQUESTED:"getImagesHaveBeenRequested",GET_IMAGES_STILL_LOADING:"getImagesStillLoading",GET_IMAGES_FINISHED_LOADING:"getImagesFinishedLoading",GLOBAL_SPINNER_CLOSED:"globalSpinnerClosed",GLOBAL_SPINNER_UNMOUNTED:"globalSpinnerUnmounted"},u=(r={},a()(r,c.IMAGES_REQUESTED,0),a()(r,c.IMAGES_LOADED,0),a()(r,c.GET_IMAGES_HAVE_BEEN_REQUESTED,(function(){return this[c.IMAGES_REQUESTED]>0})),a()(r,c.GET_IMAGES_FINISHED_LOADING,(function(){return this[c.IMAGES_LOADED]===this[c.IMAGES_REQUESTED]})),a()(r,c.GET_IMAGES_STILL_LOADING,(function(){var e=!this[c.GET_IMAGES_HAVE_BEEN_REQUESTED](),t=!this[c.GET_IMAGES_FINISHED_LOADING]();return e||t})),a()(r,c.GLOBAL_SPINNER_CLOSED,!1),a()(r,c.GLOBAL_SPINNER_UNMOUNTED,!1),r),s=Object(i.a)(u);t.b=s},73:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"g",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"f",(function(){return c})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return l}));var r=["red","blue","purple","pink","orange","green","yellow","gray","teal","cyan","indigo","darkblue","deepskyblue","lawngreen","maroon","magenta","rosybrown","royalblue","salmon","sandybrown"],o=.75,a="(android|bb\\d+|meego){}|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino",i=new RegExp(a.replace("{}",".+mobile"),"i"),c=new RegExp(a.replace("{}","|ipad"),"i"),u=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,s={SrcCode:"https://github.com/D-Pow/website",LinkedIn:"https://www.linkedin.com/in/devon-powell/",GitHub:"https://github.com/D-Pow",MutualFundsHome:"https://us.etrade.com/what-we-offer/investment-choices/mutual-funds",PrebuiltPortfolios:"https://us.etrade.com/etx/wm/prebuiltmutualfundportfolios",AutomaticInvesting:"https://us.etrade.com/etx/wm/automaticinvesting",EtradeAndroidApp:"https://play.google.com/store/apps/details?id=com.etrade.mobilepro.activity",MockRequests:"https://www.npmjs.com/package/mock-requests",AtomsOfConfusion:"https://atomsofconfusion.com",AnticancerPeptides:"https://www.ncbi.nlm.nih.gov/pubmed/29897657",TardigradeStratification:"https://bioone.org/journals/Transactions-of-the-Kansas-Academy-of-Science/volume-118/issue-3-4/062.118.0306/Tardigrades-of-the-Canopy-Evidence-of-Stratification/10.1660/062.118.0306.short",EtradeHome:"https://etrade.com",EtradeIcon:"https://cdn.etrade.net/1/19042220580.0/aempros/etc/designs/responsive-etrade/pagemeta/images/favicon-16x16.png"},l="https://formspree.io/xkdoqyjm"},91:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"e",(function(){return m})),n.d(t,"g",(function(){return v})),n.d(t,"b",(function(){return b})),n.d(t,"d",(function(){return g})),n.d(t,"f",(function(){return h})),n.d(t,"c",(function(){return E}));var r=n(157),o=n.n(r),a=n(92),i=n.n(a),c=n(20),u=n.n(c),s=n(1),l=n(53),f=n(46);function d(e){var t=e.hook,n=e.hookArgs;return(0,e.children)(t(n))}function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.nestedEventField,r=void 0===n?null:n,o=t.initialEventState,a=void 0===o?null:o,c=t.handleEvent,l=void 0===c?null:c,f=t.useEffectInputs,d=void 0===f?[]:f,p=Object(s.useState)(a),m=u()(p,2),v=m[0],b=m[1],g=i()(l)===i()((function(){}));function h(e){var t=r?e[r]:e;g?l(v,b,t):b(t)}return Object(s.useEffect)((function(){return window.addEventListener(e,h),function(){window.removeEventListener(e,h)}}),d),[v,b]}function m(e,t){var n,r,o,a,i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"down";return p("key".concat(e),{nestedEventField:"key"})}(),c=u()(i,2),s=c[0],l=c[1],d=(n=p("click"),r=u()(n,2),o=r[0],a=r[1],[Object(f.c)(o),a]),m=u()(d,2),v=m[0],b=m[1],g="Escape"===s,h=Object(f.b)(e,v),E=Object(f.b)(t,v);return[g||E&&!h,function(){l(null),b([])}]}function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;function t(e,t){t(!0)}var n=p("resize",{initialEventState:!1,handleEvent:Object(f.a)(t,e)}),r=u()(n,2),o=r[0],a=r[1];function i(){a(!1)}return[o,i]}function b(e){Object(s.useEffect)((function(){e()?Object(f.f)(!1):Object(f.f)()}),[e])}function g(e){var t=Object(s.useRef)(e);var n=p("mousemove",{initialEventState:!1,handleEvent:function(n,r,o){var a=o.pageX,i=o.pageY;if(t.current){var c=window,u=c.pageXOffset,s=c.pageYOffset,l=e||t.current.getBoundingClientRect(),f=l.top,d=l.bottom,p=l.left,m=l.right;f+=s,d+=s,p+=u,r(a<=(m+=u)&&a>=p&&i<=d&&i>=f)}},useEffectInputs:[t.current]}),r=u()(n,1)[0];return[t,r]}function h(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=function(e,t){var n=o()(e);return n[t]=!n[t],n},a=Array.from({length:e}).fill(!1),i=Object(s.useReducer)(r,a),c=u()(i,2),l=c[0],f=c[1],d=Object(s.useState)(!1),p=u()(d,2),m=p[0],v=p[1],b=Object(s.useState)(!1),g=u()(b,2),h=g[0],E=g[1],w=function(){n&&setTimeout((function(){v(!1),E(!1)}),e*t)};if(m&&!h){E(!0);for(var O=function(e){setTimeout((function(){f(e)}),t*e)},y=0;y<e;y++)O(y);w()}var S=function(){v(!0)};return[l,S]}function E(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{current:document.body},t=Object(s.useRef)(null),n=Object(s.useRef)(null),r=getComputedStyle(e.current).fontSize,o=Object(s.useState)(r),a=u()(o,2),i=a[0],c=a[1],f=v(800),d=u()(f,2),p=d[0],m=d[1];return Object(s.useEffect)((function(){if(t.current&&n.current){var e=getComputedStyle(t.current),r=getComputedStyle(n.current),o=Object(l.a)(e.height),a=Object(l.a)(e.width),i=Object(l.a)(r.height),u=Object(l.a)(r.width);if(i>o||u>a){var s=Object(l.a)(r.fontSize),f="".concat(s-1,"px");c(f)}m()}}),[t.current,n.current,p,i]),[t,n,i]}}});