(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n.p+"static/media/react_logo.5d5d9eef.svg"},16:function(e,t,n){e.exports=n(30)},21:function(e,t,n){},27:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(12),c=n.n(r),i=(n(21),n(3)),s=n(4),l=n(6),u=n(5),f=n(7),m=n(33),d=n(32),h=(n(23),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,"Home")}}]),t}(o.a.Component)),p=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,"About")}}]),t}(o.a.Component),b=n(31),v=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(s.a)(t,[{key:"renderRouteButtons",value:function(){return this.props.routes.map(function(e){var t=e.path,n=e.component.name,a=window.location.hash.slice(1)===t,r=["nav-link"];return a&&r.push("active"),o.a.createElement(b.a,{to:t,className:r.join(" "),key:t,replace:a},n)})}},{key:"render",value:function(){return o.a.createElement("nav",{className:"nav justify-content-end"},this.renderRouteButtons())}}]),t}(o.a.Component),j=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("header",{className:"d-flex w-100 justify-content-center"},o.a.createElement("div",{className:"navbar-brand"},"Header"),o.a.createElement(v,{routes:this.props.navRoutes}))}}]),t}(o.a.Component),g=n(13),w=n.n(g),O=(n(27),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(s.a)(t,[{key:"renderReactLogo",value:function(){return o.a.createElement("span",{className:"d-flex justify-content-center"},o.a.createElement("h4",{className:"footer-title"},"Made with React 16"),o.a.createElement("img",{src:w.a,className:"react-logo",alt:"logo"}))}},{key:"render",value:function(){return o.a.createElement("footer",{className:"footer-container w-100"},this.renderReactLogo())}}]),t}(o.a.Component)),y=[{path:"/",component:h,exact:!0},{path:"/about",component:p}];function E(e){var t=y.map(function(e){return o.a.createElement(m.a,Object.assign({key:e.path},e))});return o.a.createElement(d.a,{basename:e.basedir},o.a.createElement(o.a.Fragment,null,o.a.createElement(j,{basedir:e.basedir,navRoutes:y}),o.a.createElement("div",{className:"justify-content-center flex-grow-1"},t),o.a.createElement(O,null)))}var k=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App text-center h-100 d-flex flex-column flex-grow-1"},o.a.createElement(E,null))}}]),t}(o.a.Component),N=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function x(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}var C=document.getElementById("root");c.a.render(o.a.createElement(k,null),C),function(){if("serviceWorker"in navigator){if(new URL("/website",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/website","/ServiceWorker.js");N?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):x(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):x(e)})}}()}},[[16,2,1]]]);
//# sourceMappingURL=main.4f2cec0c.chunk.js.map