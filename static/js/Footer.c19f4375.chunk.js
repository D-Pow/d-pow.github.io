"use strict";(self.webpackChunkd_pow_github_io=self.webpackChunkd_pow_github_io||[]).push([[97],{8797:function(e,r,t){t.r(r),t.d(r,{default:function(){return u}});var n=t(3038),o=t.n(n),c=t(5893),a=t(7294),i=t(6103),s=t(2012);var u=function(e){var r=(0,a.useState)(!1),t=o()(r,2),n=t[0],u=t[1],l=[(0,c.jsxs)(a.Fragment,{children:["You just discovered the ",s.mH,"!"]},"discovered-src-code"),""],p=function(e){var r=o()(e,2),t=r[0],i=r[1];return(0,c.jsxs)(a.Fragment,{children:[(0,c.jsx)("div",{className:"d-block h5 text-dark",children:t}),(0,c.jsxs)("div",{className:"d-block h5 text-dark",children:[i,(0,c.jsx)(s.ld,{className:"cursor-pointer",onClick:function(){return u(!n)}})]})]})};return(0,c.jsx)("footer",{className:"bg-light py-3 w-100",children:(0,c.jsx)(i.Z,{isFlipped:n,showDefault:p(["There are 3 easter eggs on this site.","Can you find them all?"]),showOnClick:p(l)})})}},6103:function(e,r,t){t.d(r,{Z:function(){return i}});t(2222),t(2479);var n=t(5893),o=t(5697),c=t.n(o);function a(e){var r="flip-".concat(e.axis,"-full"),t="d-none",o=(0,n.jsx)("div",{className:"".concat(e.durationCls," ").concat(e.isFlipped?t:r),children:e.showDefault}),c=(0,n.jsx)("div",{className:"".concat(e.durationCls," ").concat(e.isFlipped?r:t),children:e.showOnClick});return(0,n.jsxs)("div",{className:e.className,children:[o,c]})}a.AXES={X:"x",Y:"y"},a.propTypes={axis:c().oneOf(Object.values(a.AXES)),className:c().string,durationCls:c().string,isFlipped:c().bool,showDefault:c().node,showOnClick:c().node},a.defaultProps={axis:a.AXES.X,className:"",durationCls:"duration-5",isFlipped:!1};var i=a},3960:function(e,r,t){t.d(r,{Z:function(){return v}});t(7941),t(2526),t(7327),t(1539),t(8449),t(2490),t(9849),t(5003),t(5581),t(4514),t(4747),t(9337),t(3321),t(9070);var n=t(9713),o=t.n(n),c=t(8926),a=t.n(c),i=t(3038),s=t.n(i),u=t(7757),l=t.n(u),p=(t(2222),t(5893)),f=t(7294),d=t(5697),O=t.n(d),b=t(7352),h=t(2954);function j(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function m(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?j(Object(t),!0).forEach((function(r){o()(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):j(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function g(e){var r=(0,f.useState)(""),t=s()(r,2),n=t[0],c=t[1],i=(0,f.useContext)(h.Z.Context).setContextState;function u(){return u=a()(l().mark((function r(){var t;return l().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,b.VA)(e.image);case 2:t=r.sent,c(t);case 4:case"end":return r.stop()}}),r)}))),u.apply(this,arguments)}function d(){var r=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e.updateAppContext){var t=r?h.O.IMAGES_LOADED:h.O.IMAGES_REQUESTED;i((function(e){return m(m({},e),{},o()({},t,e[t]+1))}))}}return(0,f.useEffect)((function(){d(),function(){u.apply(this,arguments)}()}),[e.image]),(0,p.jsx)("img",m({className:"".concat(e.fluidImage?"img-fluid":""," ").concat(e.className),src:n,alt:e.image,onLoad:function(r){d(!0),e.onLoad(r)}},e.aria))}g.propTypes={className:O().string,image:O().string,fluidImage:O().bool,updateAppContext:O().bool,onLoad:O().func,aria:O().object},g.defaultProps={className:"",image:"",fluidImage:!0,updateAppContext:!0,onLoad:function(){},aria:{}};var v=f.memo(g)},5712:function(e,r,t){t.d(r,{Z:function(){return p}});t(7941),t(2526),t(7327),t(1539),t(8449),t(2490),t(9849),t(5003),t(5581),t(4514),t(4747),t(9337),t(3321),t(9070);var n=t(9713),o=t.n(n),c=t(5893),a=t(5697),i=t.n(a);function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function u(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){o()(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e){var r=[e.className];return e.underlineText&&r.push("underline"),(0,c.jsx)("a",u(u({className:r.join(" "),href:e.href,target:"_blank",rel:"noopener noreferrer"},e.aria),{},{children:e.children}))}l.propTypes={className:i().string,href:i().string,children:i().node,underlineText:i().bool,aria:i().object},l.defaultProps={className:"",href:"",children:"",underlineText:!0,aria:{}};var p=l},2012:function(e,r,t){t.d(r,{MO:function(){return b},ld:function(){return h},mH:function(){return O}});t(7941),t(2526),t(7327),t(1539),t(8449),t(2490),t(9849),t(5003),t(5581),t(4514),t(4747),t(9337),t(3321),t(9070);var n=t(9713),o=t.n(n),c=t(6479),a=t.n(c),i=t(5893),s=t(5712),u=t(3960),l=t(411),p=["className"];function f(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?f(Object(t),!0).forEach((function(r){o()(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var O=(0,i.jsx)(s.Z,{href:l.BA.SrcCode,children:"source code"}),b=(0,i.jsxs)(s.Z,{href:l.BA.EtradeHome,children:[(0,i.jsx)(u.Z,{image:"etrade_icon.png",aria:{style:{marginTop:"-1%"}}}),"E-Trade"]});function h(e){var r=e.className,t=void 0===r?"":r,n=a()(e,p);return(0,i.jsx)("h4",d(d({className:"d-inline-block margin-clear ".concat(t)},n),{},{children:"🐣"}))}}}]);