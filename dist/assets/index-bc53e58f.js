function ed(t,e){for(var r=0;r<e.length;r++){const n=e[r];if(typeof n!="string"&&!Array.isArray(n)){for(const s in n)if(s!=="default"&&!(s in t)){const i=Object.getOwnPropertyDescriptor(n,s);i&&Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:()=>n[s]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();function Bp(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function td(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var r=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};r.prototype=e.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(t).forEach(function(n){var s=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(r,n,s.get?s:{enumerable:!0,get:function(){return t[n]}})}),r}var rd={exports:{}},Mi={},nd={exports:{}},V={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gs=Symbol.for("react.element"),Up=Symbol.for("react.portal"),Mp=Symbol.for("react.fragment"),Fp=Symbol.for("react.strict_mode"),Wp=Symbol.for("react.profiler"),Vp=Symbol.for("react.provider"),Hp=Symbol.for("react.context"),qp=Symbol.for("react.forward_ref"),Kp=Symbol.for("react.suspense"),Gp=Symbol.for("react.memo"),Jp=Symbol.for("react.lazy"),ac=Symbol.iterator;function Qp(t){return t===null||typeof t!="object"?null:(t=ac&&t[ac]||t["@@iterator"],typeof t=="function"?t:null)}var sd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},id=Object.assign,ad={};function fn(t,e,r){this.props=t,this.context=e,this.refs=ad,this.updater=r||sd}fn.prototype.isReactComponent={};fn.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};fn.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function od(){}od.prototype=fn.prototype;function el(t,e,r){this.props=t,this.context=e,this.refs=ad,this.updater=r||sd}var tl=el.prototype=new od;tl.constructor=el;id(tl,fn.prototype);tl.isPureReactComponent=!0;var oc=Array.isArray,ld=Object.prototype.hasOwnProperty,rl={current:null},cd={key:!0,ref:!0,__self:!0,__source:!0};function ud(t,e,r){var n,s={},i=null,o=null;if(e!=null)for(n in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)ld.call(e,n)&&!cd.hasOwnProperty(n)&&(s[n]=e[n]);var l=arguments.length-2;if(l===1)s.children=r;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];s.children=c}if(t&&t.defaultProps)for(n in l=t.defaultProps,l)s[n]===void 0&&(s[n]=l[n]);return{$$typeof:gs,type:t,key:i,ref:o,props:s,_owner:rl.current}}function Yp(t,e){return{$$typeof:gs,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function nl(t){return typeof t=="object"&&t!==null&&t.$$typeof===gs}function Xp(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(r){return e[r]})}var lc=/\/+/g;function aa(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Xp(""+t.key):e.toString(36)}function Qs(t,e,r,n,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case gs:case Up:o=!0}}if(o)return o=t,s=s(o),t=n===""?"."+aa(o,0):n,oc(s)?(r="",t!=null&&(r=t.replace(lc,"$&/")+"/"),Qs(s,e,r,"",function(u){return u})):s!=null&&(nl(s)&&(s=Yp(s,r+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(lc,"$&/")+"/")+t)),e.push(s)),1;if(o=0,n=n===""?".":n+":",oc(t))for(var l=0;l<t.length;l++){i=t[l];var c=n+aa(i,l);o+=Qs(i,e,r,c,s)}else if(c=Qp(t),typeof c=="function")for(t=c.call(t),l=0;!(i=t.next()).done;)i=i.value,c=n+aa(i,l++),o+=Qs(i,e,r,c,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ks(t,e,r){if(t==null)return t;var n=[],s=0;return Qs(t,n,"","",function(i){return e.call(r,i,s++)}),n}function Zp(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(r){(t._status===0||t._status===-1)&&(t._status=1,t._result=r)},function(r){(t._status===0||t._status===-1)&&(t._status=2,t._result=r)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Oe={current:null},Ys={transition:null},em={ReactCurrentDispatcher:Oe,ReactCurrentBatchConfig:Ys,ReactCurrentOwner:rl};function dd(){throw Error("act(...) is not supported in production builds of React.")}V.Children={map:ks,forEach:function(t,e,r){ks(t,function(){e.apply(this,arguments)},r)},count:function(t){var e=0;return ks(t,function(){e++}),e},toArray:function(t){return ks(t,function(e){return e})||[]},only:function(t){if(!nl(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};V.Component=fn;V.Fragment=Mp;V.Profiler=Wp;V.PureComponent=el;V.StrictMode=Fp;V.Suspense=Kp;V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=em;V.act=dd;V.cloneElement=function(t,e,r){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var n=id({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=rl.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(c in e)ld.call(e,c)&&!cd.hasOwnProperty(c)&&(n[c]=e[c]===void 0&&l!==void 0?l[c]:e[c])}var c=arguments.length-2;if(c===1)n.children=r;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];n.children=l}return{$$typeof:gs,type:t.type,key:s,ref:i,props:n,_owner:o}};V.createContext=function(t){return t={$$typeof:Hp,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Vp,_context:t},t.Consumer=t};V.createElement=ud;V.createFactory=function(t){var e=ud.bind(null,t);return e.type=t,e};V.createRef=function(){return{current:null}};V.forwardRef=function(t){return{$$typeof:qp,render:t}};V.isValidElement=nl;V.lazy=function(t){return{$$typeof:Jp,_payload:{_status:-1,_result:t},_init:Zp}};V.memo=function(t,e){return{$$typeof:Gp,type:t,compare:e===void 0?null:e}};V.startTransition=function(t){var e=Ys.transition;Ys.transition={};try{t()}finally{Ys.transition=e}};V.unstable_act=dd;V.useCallback=function(t,e){return Oe.current.useCallback(t,e)};V.useContext=function(t){return Oe.current.useContext(t)};V.useDebugValue=function(){};V.useDeferredValue=function(t){return Oe.current.useDeferredValue(t)};V.useEffect=function(t,e){return Oe.current.useEffect(t,e)};V.useId=function(){return Oe.current.useId()};V.useImperativeHandle=function(t,e,r){return Oe.current.useImperativeHandle(t,e,r)};V.useInsertionEffect=function(t,e){return Oe.current.useInsertionEffect(t,e)};V.useLayoutEffect=function(t,e){return Oe.current.useLayoutEffect(t,e)};V.useMemo=function(t,e){return Oe.current.useMemo(t,e)};V.useReducer=function(t,e,r){return Oe.current.useReducer(t,e,r)};V.useRef=function(t){return Oe.current.useRef(t)};V.useState=function(t){return Oe.current.useState(t)};V.useSyncExternalStore=function(t,e,r){return Oe.current.useSyncExternalStore(t,e,r)};V.useTransition=function(){return Oe.current.useTransition()};V.version="18.3.1";nd.exports=V;var _=nd.exports;const hd=Bp(_),tm=ed({__proto__:null,default:hd},[_]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rm=_,nm=Symbol.for("react.element"),sm=Symbol.for("react.fragment"),im=Object.prototype.hasOwnProperty,am=rm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,om={key:!0,ref:!0,__self:!0,__source:!0};function fd(t,e,r){var n,s={},i=null,o=null;r!==void 0&&(i=""+r),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(n in e)im.call(e,n)&&!om.hasOwnProperty(n)&&(s[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps,e)s[n]===void 0&&(s[n]=e[n]);return{$$typeof:nm,type:t,key:i,ref:o,props:s,_owner:am.current}}Mi.Fragment=sm;Mi.jsx=fd;Mi.jsxs=fd;rd.exports=Mi;var a=rd.exports,Wa={},pd={exports:{}},Ge={},md={exports:{}},gd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(R,B){var W=R.length;R.push(B);e:for(;0<W;){var Y=W-1>>>1,le=R[Y];if(0<s(le,B))R[Y]=B,R[W]=le,W=Y;else break e}}function r(R){return R.length===0?null:R[0]}function n(R){if(R.length===0)return null;var B=R[0],W=R.pop();if(W!==B){R[0]=W;e:for(var Y=0,le=R.length,bt=le>>>1;Y<bt;){var st=2*(Y+1)-1,Qe=R[st],C=st+1,D=R[C];if(0>s(Qe,W))C<le&&0>s(D,Qe)?(R[Y]=D,R[C]=W,Y=C):(R[Y]=Qe,R[st]=W,Y=st);else if(C<le&&0>s(D,W))R[Y]=D,R[C]=W,Y=C;else break e}}return B}function s(R,B){var W=R.sortIndex-B.sortIndex;return W!==0?W:R.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var c=[],u=[],d=1,f=null,h=3,g=!1,x=!1,b=!1,j=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(R){for(var B=r(u);B!==null;){if(B.callback===null)n(u);else if(B.startTime<=R)n(u),B.sortIndex=B.expirationTime,e(c,B);else break;B=r(u)}}function N(R){if(b=!1,m(R),!x)if(r(c)!==null)x=!0,$(v);else{var B=r(u);B!==null&&oe(N,B.startTime-R)}}function v(R,B){x=!1,b&&(b=!1,y(P),P=-1),g=!0;var W=h;try{for(m(B),f=r(c);f!==null&&(!(f.expirationTime>B)||R&&!z());){var Y=f.callback;if(typeof Y=="function"){f.callback=null,h=f.priorityLevel;var le=Y(f.expirationTime<=B);B=t.unstable_now(),typeof le=="function"?f.callback=le:f===r(c)&&n(c),m(B)}else n(c);f=r(c)}if(f!==null)var bt=!0;else{var st=r(u);st!==null&&oe(N,st.startTime-B),bt=!1}return bt}finally{f=null,h=W,g=!1}}var S=!1,E=null,P=-1,A=5,I=-1;function z(){return!(t.unstable_now()-I<A)}function H(){if(E!==null){var R=t.unstable_now();I=R;var B=!0;try{B=E(!0,R)}finally{B?k():(S=!1,E=null)}}else S=!1}var k;if(typeof p=="function")k=function(){p(H)};else if(typeof MessageChannel<"u"){var w=new MessageChannel,T=w.port2;w.port1.onmessage=H,k=function(){T.postMessage(null)}}else k=function(){j(H,0)};function $(R){E=R,S||(S=!0,k())}function oe(R,B){P=j(function(){R(t.unstable_now())},B)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(R){R.callback=null},t.unstable_continueExecution=function(){x||g||(x=!0,$(v))},t.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<R?Math.floor(1e3/R):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return r(c)},t.unstable_next=function(R){switch(h){case 1:case 2:case 3:var B=3;break;default:B=h}var W=h;h=B;try{return R()}finally{h=W}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(R,B){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var W=h;h=R;try{return B()}finally{h=W}},t.unstable_scheduleCallback=function(R,B,W){var Y=t.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?Y+W:Y):W=Y,R){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=W+le,R={id:d++,callback:B,priorityLevel:R,startTime:W,expirationTime:le,sortIndex:-1},W>Y?(R.sortIndex=W,e(u,R),r(c)===null&&R===r(u)&&(b?(y(P),P=-1):b=!0,oe(N,W-Y))):(R.sortIndex=le,e(c,R),x||g||(x=!0,$(v))),R},t.unstable_shouldYield=z,t.unstable_wrapCallback=function(R){var B=h;return function(){var W=h;h=B;try{return R.apply(this,arguments)}finally{h=W}}}})(gd);md.exports=gd;var lm=md.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cm=_,Ke=lm;function O(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var vd=new Set,Gn={};function _r(t,e){nn(t,e),nn(t+"Capture",e)}function nn(t,e){for(Gn[t]=e,t=0;t<e.length;t++)vd.add(e[t])}var Ct=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Va=Object.prototype.hasOwnProperty,um=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,cc={},uc={};function dm(t){return Va.call(uc,t)?!0:Va.call(cc,t)?!1:um.test(t)?uc[t]=!0:(cc[t]=!0,!1)}function hm(t,e,r,n){if(r!==null&&r.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function fm(t,e,r,n){if(e===null||typeof e>"u"||hm(t,e,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function De(t,e,r,n,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=n,this.attributeNamespace=s,this.mustUseProperty=r,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var je={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){je[t]=new De(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];je[e]=new De(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){je[t]=new De(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){je[t]=new De(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){je[t]=new De(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){je[t]=new De(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){je[t]=new De(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){je[t]=new De(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){je[t]=new De(t,5,!1,t.toLowerCase(),null,!1,!1)});var sl=/[\-:]([a-z])/g;function il(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(sl,il);je[e]=new De(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(sl,il);je[e]=new De(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(sl,il);je[e]=new De(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){je[t]=new De(t,1,!1,t.toLowerCase(),null,!1,!1)});je.xlinkHref=new De("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){je[t]=new De(t,1,!1,t.toLowerCase(),null,!0,!0)});function al(t,e,r,n){var s=je.hasOwnProperty(e)?je[e]:null;(s!==null?s.type!==0:n||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(fm(e,r,s,n)&&(r=null),n||s===null?dm(e)&&(r===null?t.removeAttribute(e):t.setAttribute(e,""+r)):s.mustUseProperty?t[s.propertyName]=r===null?s.type===3?!1:"":r:(e=s.attributeName,n=s.attributeNamespace,r===null?t.removeAttribute(e):(s=s.type,r=s===3||s===4&&r===!0?"":""+r,n?t.setAttributeNS(n,e,r):t.setAttribute(e,r))))}var Dt=cm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ss=Symbol.for("react.element"),$r=Symbol.for("react.portal"),Lr=Symbol.for("react.fragment"),ol=Symbol.for("react.strict_mode"),Ha=Symbol.for("react.profiler"),yd=Symbol.for("react.provider"),wd=Symbol.for("react.context"),ll=Symbol.for("react.forward_ref"),qa=Symbol.for("react.suspense"),Ka=Symbol.for("react.suspense_list"),cl=Symbol.for("react.memo"),It=Symbol.for("react.lazy"),xd=Symbol.for("react.offscreen"),dc=Symbol.iterator;function bn(t){return t===null||typeof t!="object"?null:(t=dc&&t[dc]||t["@@iterator"],typeof t=="function"?t:null)}var ae=Object.assign,oa;function Tn(t){if(oa===void 0)try{throw Error()}catch(r){var e=r.stack.trim().match(/\n( *(at )?)/);oa=e&&e[1]||""}return`
`+oa+t}var la=!1;function ca(t,e){if(!t||la)return"";la=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var n=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){n=u}t.call(e.prototype)}else{try{throw Error()}catch(u){n=u}t()}}catch(u){if(u&&n&&typeof u.stack=="string"){for(var s=u.stack.split(`
`),i=n.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var c=`
`+s[o].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=o&&0<=l);break}}}finally{la=!1,Error.prepareStackTrace=r}return(t=t?t.displayName||t.name:"")?Tn(t):""}function pm(t){switch(t.tag){case 5:return Tn(t.type);case 16:return Tn("Lazy");case 13:return Tn("Suspense");case 19:return Tn("SuspenseList");case 0:case 2:case 15:return t=ca(t.type,!1),t;case 11:return t=ca(t.type.render,!1),t;case 1:return t=ca(t.type,!0),t;default:return""}}function Ga(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Lr:return"Fragment";case $r:return"Portal";case Ha:return"Profiler";case ol:return"StrictMode";case qa:return"Suspense";case Ka:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case wd:return(t.displayName||"Context")+".Consumer";case yd:return(t._context.displayName||"Context")+".Provider";case ll:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case cl:return e=t.displayName||null,e!==null?e:Ga(t.type)||"Memo";case It:e=t._payload,t=t._init;try{return Ga(t(e))}catch{}}return null}function mm(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ga(e);case 8:return e===ol?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Xt(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function bd(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function gm(t){var e=bd(t)?"checked":"value",r=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),n=""+t[e];if(!t.hasOwnProperty(e)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var s=r.get,i=r.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ns(t){t._valueTracker||(t._valueTracker=gm(t))}function jd(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var r=e.getValue(),n="";return t&&(n=bd(t)?t.checked?"true":"false":t.value),t=n,t!==r?(e.setValue(t),!0):!1}function ci(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ja(t,e){var r=e.checked;return ae({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??t._wrapperState.initialChecked})}function hc(t,e){var r=e.defaultValue==null?"":e.defaultValue,n=e.checked!=null?e.checked:e.defaultChecked;r=Xt(e.value!=null?e.value:r),t._wrapperState={initialChecked:n,initialValue:r,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function _d(t,e){e=e.checked,e!=null&&al(t,"checked",e,!1)}function Qa(t,e){_d(t,e);var r=Xt(e.value),n=e.type;if(r!=null)n==="number"?(r===0&&t.value===""||t.value!=r)&&(t.value=""+r):t.value!==""+r&&(t.value=""+r);else if(n==="submit"||n==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Ya(t,e.type,r):e.hasOwnProperty("defaultValue")&&Ya(t,e.type,Xt(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function fc(t,e,r){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var n=e.type;if(!(n!=="submit"&&n!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,r||e===t.value||(t.value=e),t.defaultValue=e}r=t.name,r!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,r!==""&&(t.name=r)}function Ya(t,e,r){(e!=="number"||ci(t.ownerDocument)!==t)&&(r==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+r&&(t.defaultValue=""+r))}var Pn=Array.isArray;function Gr(t,e,r,n){if(t=t.options,e){e={};for(var s=0;s<r.length;s++)e["$"+r[s]]=!0;for(r=0;r<t.length;r++)s=e.hasOwnProperty("$"+t[r].value),t[r].selected!==s&&(t[r].selected=s),s&&n&&(t[r].defaultSelected=!0)}else{for(r=""+Xt(r),e=null,s=0;s<t.length;s++){if(t[s].value===r){t[s].selected=!0,n&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Xa(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(O(91));return ae({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function pc(t,e){var r=e.value;if(r==null){if(r=e.children,e=e.defaultValue,r!=null){if(e!=null)throw Error(O(92));if(Pn(r)){if(1<r.length)throw Error(O(93));r=r[0]}e=r}e==null&&(e=""),r=e}t._wrapperState={initialValue:Xt(r)}}function kd(t,e){var r=Xt(e.value),n=Xt(e.defaultValue);r!=null&&(r=""+r,r!==t.value&&(t.value=r),e.defaultValue==null&&t.defaultValue!==r&&(t.defaultValue=r)),n!=null&&(t.defaultValue=""+n)}function mc(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Sd(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Za(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Sd(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Es,Nd=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,r,n,s){MSApp.execUnsafeLocalFunction(function(){return t(e,r,n,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Es=Es||document.createElement("div"),Es.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Es.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Jn(t,e){if(e){var r=t.firstChild;if(r&&r===t.lastChild&&r.nodeType===3){r.nodeValue=e;return}}t.textContent=e}var An={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},vm=["Webkit","ms","Moz","O"];Object.keys(An).forEach(function(t){vm.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),An[e]=An[t]})});function Ed(t,e,r){return e==null||typeof e=="boolean"||e===""?"":r||typeof e!="number"||e===0||An.hasOwnProperty(t)&&An[t]?(""+e).trim():e+"px"}function Cd(t,e){t=t.style;for(var r in e)if(e.hasOwnProperty(r)){var n=r.indexOf("--")===0,s=Ed(r,e[r],n);r==="float"&&(r="cssFloat"),n?t.setProperty(r,s):t[r]=s}}var ym=ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function eo(t,e){if(e){if(ym[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(O(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(O(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(O(61))}if(e.style!=null&&typeof e.style!="object")throw Error(O(62))}}function to(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ro=null;function ul(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var no=null,Jr=null,Qr=null;function gc(t){if(t=ws(t)){if(typeof no!="function")throw Error(O(280));var e=t.stateNode;e&&(e=qi(e),no(t.stateNode,t.type,e))}}function Td(t){Jr?Qr?Qr.push(t):Qr=[t]:Jr=t}function Pd(){if(Jr){var t=Jr,e=Qr;if(Qr=Jr=null,gc(t),e)for(t=0;t<e.length;t++)gc(e[t])}}function Od(t,e){return t(e)}function Dd(){}var ua=!1;function Rd(t,e,r){if(ua)return t(e,r);ua=!0;try{return Od(t,e,r)}finally{ua=!1,(Jr!==null||Qr!==null)&&(Dd(),Pd())}}function Qn(t,e){var r=t.stateNode;if(r===null)return null;var n=qi(r);if(n===null)return null;r=n[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(t=t.type,n=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!n;break e;default:t=!1}if(t)return null;if(r&&typeof r!="function")throw Error(O(231,e,typeof r));return r}var so=!1;if(Ct)try{var jn={};Object.defineProperty(jn,"passive",{get:function(){so=!0}}),window.addEventListener("test",jn,jn),window.removeEventListener("test",jn,jn)}catch{so=!1}function wm(t,e,r,n,s,i,o,l,c){var u=Array.prototype.slice.call(arguments,3);try{e.apply(r,u)}catch(d){this.onError(d)}}var In=!1,ui=null,di=!1,io=null,xm={onError:function(t){In=!0,ui=t}};function bm(t,e,r,n,s,i,o,l,c){In=!1,ui=null,wm.apply(xm,arguments)}function jm(t,e,r,n,s,i,o,l,c){if(bm.apply(this,arguments),In){if(In){var u=ui;In=!1,ui=null}else throw Error(O(198));di||(di=!0,io=u)}}function kr(t){var e=t,r=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(r=e.return),t=e.return;while(t)}return e.tag===3?r:null}function Ad(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function vc(t){if(kr(t)!==t)throw Error(O(188))}function _m(t){var e=t.alternate;if(!e){if(e=kr(t),e===null)throw Error(O(188));return e!==t?null:t}for(var r=t,n=e;;){var s=r.return;if(s===null)break;var i=s.alternate;if(i===null){if(n=s.return,n!==null){r=n;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===r)return vc(s),t;if(i===n)return vc(s),e;i=i.sibling}throw Error(O(188))}if(r.return!==n.return)r=s,n=i;else{for(var o=!1,l=s.child;l;){if(l===r){o=!0,r=s,n=i;break}if(l===n){o=!0,n=s,r=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===r){o=!0,r=i,n=s;break}if(l===n){o=!0,n=i,r=s;break}l=l.sibling}if(!o)throw Error(O(189))}}if(r.alternate!==n)throw Error(O(190))}if(r.tag!==3)throw Error(O(188));return r.stateNode.current===r?t:e}function Id(t){return t=_m(t),t!==null?$d(t):null}function $d(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=$d(t);if(e!==null)return e;t=t.sibling}return null}var Ld=Ke.unstable_scheduleCallback,yc=Ke.unstable_cancelCallback,km=Ke.unstable_shouldYield,Sm=Ke.unstable_requestPaint,ue=Ke.unstable_now,Nm=Ke.unstable_getCurrentPriorityLevel,dl=Ke.unstable_ImmediatePriority,zd=Ke.unstable_UserBlockingPriority,hi=Ke.unstable_NormalPriority,Em=Ke.unstable_LowPriority,Bd=Ke.unstable_IdlePriority,Fi=null,wt=null;function Cm(t){if(wt&&typeof wt.onCommitFiberRoot=="function")try{wt.onCommitFiberRoot(Fi,t,void 0,(t.current.flags&128)===128)}catch{}}var ft=Math.clz32?Math.clz32:Om,Tm=Math.log,Pm=Math.LN2;function Om(t){return t>>>=0,t===0?32:31-(Tm(t)/Pm|0)|0}var Cs=64,Ts=4194304;function On(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function fi(t,e){var r=t.pendingLanes;if(r===0)return 0;var n=0,s=t.suspendedLanes,i=t.pingedLanes,o=r&268435455;if(o!==0){var l=o&~s;l!==0?n=On(l):(i&=o,i!==0&&(n=On(i)))}else o=r&~s,o!==0?n=On(o):i!==0&&(n=On(i));if(n===0)return 0;if(e!==0&&e!==n&&!(e&s)&&(s=n&-n,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(n&4&&(n|=r&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=n;0<e;)r=31-ft(e),s=1<<r,n|=t[r],e&=~s;return n}function Dm(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rm(t,e){for(var r=t.suspendedLanes,n=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-ft(i),l=1<<o,c=s[o];c===-1?(!(l&r)||l&n)&&(s[o]=Dm(l,e)):c<=e&&(t.expiredLanes|=l),i&=~l}}function ao(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ud(){var t=Cs;return Cs<<=1,!(Cs&4194240)&&(Cs=64),t}function da(t){for(var e=[],r=0;31>r;r++)e.push(t);return e}function vs(t,e,r){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ft(e),t[e]=r}function Am(t,e){var r=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var n=t.eventTimes;for(t=t.expirationTimes;0<r;){var s=31-ft(r),i=1<<s;e[s]=0,n[s]=-1,t[s]=-1,r&=~i}}function hl(t,e){var r=t.entangledLanes|=e;for(t=t.entanglements;r;){var n=31-ft(r),s=1<<n;s&e|t[n]&e&&(t[n]|=e),r&=~s}}var G=0;function Md(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Fd,fl,Wd,Vd,Hd,oo=!1,Ps=[],Wt=null,Vt=null,Ht=null,Yn=new Map,Xn=new Map,Lt=[],Im="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function wc(t,e){switch(t){case"focusin":case"focusout":Wt=null;break;case"dragenter":case"dragleave":Vt=null;break;case"mouseover":case"mouseout":Ht=null;break;case"pointerover":case"pointerout":Yn.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xn.delete(e.pointerId)}}function _n(t,e,r,n,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[s]},e!==null&&(e=ws(e),e!==null&&fl(e)),t):(t.eventSystemFlags|=n,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function $m(t,e,r,n,s){switch(e){case"focusin":return Wt=_n(Wt,t,e,r,n,s),!0;case"dragenter":return Vt=_n(Vt,t,e,r,n,s),!0;case"mouseover":return Ht=_n(Ht,t,e,r,n,s),!0;case"pointerover":var i=s.pointerId;return Yn.set(i,_n(Yn.get(i)||null,t,e,r,n,s)),!0;case"gotpointercapture":return i=s.pointerId,Xn.set(i,_n(Xn.get(i)||null,t,e,r,n,s)),!0}return!1}function qd(t){var e=hr(t.target);if(e!==null){var r=kr(e);if(r!==null){if(e=r.tag,e===13){if(e=Ad(r),e!==null){t.blockedOn=e,Hd(t.priority,function(){Wd(r)});return}}else if(e===3&&r.stateNode.current.memoizedState.isDehydrated){t.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Xs(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var r=lo(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(r===null){r=t.nativeEvent;var n=new r.constructor(r.type,r);ro=n,r.target.dispatchEvent(n),ro=null}else return e=ws(r),e!==null&&fl(e),t.blockedOn=r,!1;e.shift()}return!0}function xc(t,e,r){Xs(t)&&r.delete(e)}function Lm(){oo=!1,Wt!==null&&Xs(Wt)&&(Wt=null),Vt!==null&&Xs(Vt)&&(Vt=null),Ht!==null&&Xs(Ht)&&(Ht=null),Yn.forEach(xc),Xn.forEach(xc)}function kn(t,e){t.blockedOn===e&&(t.blockedOn=null,oo||(oo=!0,Ke.unstable_scheduleCallback(Ke.unstable_NormalPriority,Lm)))}function Zn(t){function e(s){return kn(s,t)}if(0<Ps.length){kn(Ps[0],t);for(var r=1;r<Ps.length;r++){var n=Ps[r];n.blockedOn===t&&(n.blockedOn=null)}}for(Wt!==null&&kn(Wt,t),Vt!==null&&kn(Vt,t),Ht!==null&&kn(Ht,t),Yn.forEach(e),Xn.forEach(e),r=0;r<Lt.length;r++)n=Lt[r],n.blockedOn===t&&(n.blockedOn=null);for(;0<Lt.length&&(r=Lt[0],r.blockedOn===null);)qd(r),r.blockedOn===null&&Lt.shift()}var Yr=Dt.ReactCurrentBatchConfig,pi=!0;function zm(t,e,r,n){var s=G,i=Yr.transition;Yr.transition=null;try{G=1,pl(t,e,r,n)}finally{G=s,Yr.transition=i}}function Bm(t,e,r,n){var s=G,i=Yr.transition;Yr.transition=null;try{G=4,pl(t,e,r,n)}finally{G=s,Yr.transition=i}}function pl(t,e,r,n){if(pi){var s=lo(t,e,r,n);if(s===null)ba(t,e,n,mi,r),wc(t,n);else if($m(s,t,e,r,n))n.stopPropagation();else if(wc(t,n),e&4&&-1<Im.indexOf(t)){for(;s!==null;){var i=ws(s);if(i!==null&&Fd(i),i=lo(t,e,r,n),i===null&&ba(t,e,n,mi,r),i===s)break;s=i}s!==null&&n.stopPropagation()}else ba(t,e,n,null,r)}}var mi=null;function lo(t,e,r,n){if(mi=null,t=ul(n),t=hr(t),t!==null)if(e=kr(t),e===null)t=null;else if(r=e.tag,r===13){if(t=Ad(e),t!==null)return t;t=null}else if(r===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return mi=t,null}function Kd(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Nm()){case dl:return 1;case zd:return 4;case hi:case Em:return 16;case Bd:return 536870912;default:return 16}default:return 16}}var Ut=null,ml=null,Zs=null;function Gd(){if(Zs)return Zs;var t,e=ml,r=e.length,n,s="value"in Ut?Ut.value:Ut.textContent,i=s.length;for(t=0;t<r&&e[t]===s[t];t++);var o=r-t;for(n=1;n<=o&&e[r-n]===s[i-n];n++);return Zs=s.slice(t,1<n?1-n:void 0)}function ei(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Os(){return!0}function bc(){return!1}function Je(t){function e(r,n,s,i,o){this._reactName=r,this._targetInst=s,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(r=t[l],this[l]=r?r(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Os:bc,this.isPropagationStopped=bc,this}return ae(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Os)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Os)},persist:function(){},isPersistent:Os}),e}var pn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},gl=Je(pn),ys=ae({},pn,{view:0,detail:0}),Um=Je(ys),ha,fa,Sn,Wi=ae({},ys,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vl,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Sn&&(Sn&&t.type==="mousemove"?(ha=t.screenX-Sn.screenX,fa=t.screenY-Sn.screenY):fa=ha=0,Sn=t),ha)},movementY:function(t){return"movementY"in t?t.movementY:fa}}),jc=Je(Wi),Mm=ae({},Wi,{dataTransfer:0}),Fm=Je(Mm),Wm=ae({},ys,{relatedTarget:0}),pa=Je(Wm),Vm=ae({},pn,{animationName:0,elapsedTime:0,pseudoElement:0}),Hm=Je(Vm),qm=ae({},pn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Km=Je(qm),Gm=ae({},pn,{data:0}),_c=Je(Gm),Jm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Qm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ym={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xm(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Ym[t])?!!e[t]:!1}function vl(){return Xm}var Zm=ae({},ys,{key:function(t){if(t.key){var e=Jm[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ei(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Qm[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vl,charCode:function(t){return t.type==="keypress"?ei(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ei(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),eg=Je(Zm),tg=ae({},Wi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kc=Je(tg),rg=ae({},ys,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vl}),ng=Je(rg),sg=ae({},pn,{propertyName:0,elapsedTime:0,pseudoElement:0}),ig=Je(sg),ag=ae({},Wi,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),og=Je(ag),lg=[9,13,27,32],yl=Ct&&"CompositionEvent"in window,$n=null;Ct&&"documentMode"in document&&($n=document.documentMode);var cg=Ct&&"TextEvent"in window&&!$n,Jd=Ct&&(!yl||$n&&8<$n&&11>=$n),Sc=String.fromCharCode(32),Nc=!1;function Qd(t,e){switch(t){case"keyup":return lg.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yd(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var zr=!1;function ug(t,e){switch(t){case"compositionend":return Yd(e);case"keypress":return e.which!==32?null:(Nc=!0,Sc);case"textInput":return t=e.data,t===Sc&&Nc?null:t;default:return null}}function dg(t,e){if(zr)return t==="compositionend"||!yl&&Qd(t,e)?(t=Gd(),Zs=ml=Ut=null,zr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Jd&&e.locale!=="ko"?null:e.data;default:return null}}var hg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ec(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!hg[t.type]:e==="textarea"}function Xd(t,e,r,n){Td(n),e=gi(e,"onChange"),0<e.length&&(r=new gl("onChange","change",null,r,n),t.push({event:r,listeners:e}))}var Ln=null,es=null;function fg(t){ch(t,0)}function Vi(t){var e=Mr(t);if(jd(e))return t}function pg(t,e){if(t==="change")return e}var Zd=!1;if(Ct){var ma;if(Ct){var ga="oninput"in document;if(!ga){var Cc=document.createElement("div");Cc.setAttribute("oninput","return;"),ga=typeof Cc.oninput=="function"}ma=ga}else ma=!1;Zd=ma&&(!document.documentMode||9<document.documentMode)}function Tc(){Ln&&(Ln.detachEvent("onpropertychange",eh),es=Ln=null)}function eh(t){if(t.propertyName==="value"&&Vi(es)){var e=[];Xd(e,es,t,ul(t)),Rd(fg,e)}}function mg(t,e,r){t==="focusin"?(Tc(),Ln=e,es=r,Ln.attachEvent("onpropertychange",eh)):t==="focusout"&&Tc()}function gg(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Vi(es)}function vg(t,e){if(t==="click")return Vi(e)}function yg(t,e){if(t==="input"||t==="change")return Vi(e)}function wg(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var mt=typeof Object.is=="function"?Object.is:wg;function ts(t,e){if(mt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var r=Object.keys(t),n=Object.keys(e);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var s=r[n];if(!Va.call(e,s)||!mt(t[s],e[s]))return!1}return!0}function Pc(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Oc(t,e){var r=Pc(t);t=0;for(var n;r;){if(r.nodeType===3){if(n=t+r.textContent.length,t<=e&&n>=e)return{node:r,offset:e-t};t=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Pc(r)}}function th(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?th(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function rh(){for(var t=window,e=ci();e instanceof t.HTMLIFrameElement;){try{var r=typeof e.contentWindow.location.href=="string"}catch{r=!1}if(r)t=e.contentWindow;else break;e=ci(t.document)}return e}function wl(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function xg(t){var e=rh(),r=t.focusedElem,n=t.selectionRange;if(e!==r&&r&&r.ownerDocument&&th(r.ownerDocument.documentElement,r)){if(n!==null&&wl(r)){if(e=n.start,t=n.end,t===void 0&&(t=e),"selectionStart"in r)r.selectionStart=e,r.selectionEnd=Math.min(t,r.value.length);else if(t=(e=r.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=r.textContent.length,i=Math.min(n.start,s);n=n.end===void 0?i:Math.min(n.end,s),!t.extend&&i>n&&(s=n,n=i,i=s),s=Oc(r,i);var o=Oc(r,n);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>n?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=r;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<e.length;r++)t=e[r],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var bg=Ct&&"documentMode"in document&&11>=document.documentMode,Br=null,co=null,zn=null,uo=!1;function Dc(t,e,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;uo||Br==null||Br!==ci(n)||(n=Br,"selectionStart"in n&&wl(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),zn&&ts(zn,n)||(zn=n,n=gi(co,"onSelect"),0<n.length&&(e=new gl("onSelect","select",null,e,r),t.push({event:e,listeners:n}),e.target=Br)))}function Ds(t,e){var r={};return r[t.toLowerCase()]=e.toLowerCase(),r["Webkit"+t]="webkit"+e,r["Moz"+t]="moz"+e,r}var Ur={animationend:Ds("Animation","AnimationEnd"),animationiteration:Ds("Animation","AnimationIteration"),animationstart:Ds("Animation","AnimationStart"),transitionend:Ds("Transition","TransitionEnd")},va={},nh={};Ct&&(nh=document.createElement("div").style,"AnimationEvent"in window||(delete Ur.animationend.animation,delete Ur.animationiteration.animation,delete Ur.animationstart.animation),"TransitionEvent"in window||delete Ur.transitionend.transition);function Hi(t){if(va[t])return va[t];if(!Ur[t])return t;var e=Ur[t],r;for(r in e)if(e.hasOwnProperty(r)&&r in nh)return va[t]=e[r];return t}var sh=Hi("animationend"),ih=Hi("animationiteration"),ah=Hi("animationstart"),oh=Hi("transitionend"),lh=new Map,Rc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function er(t,e){lh.set(t,e),_r(e,[t])}for(var ya=0;ya<Rc.length;ya++){var wa=Rc[ya],jg=wa.toLowerCase(),_g=wa[0].toUpperCase()+wa.slice(1);er(jg,"on"+_g)}er(sh,"onAnimationEnd");er(ih,"onAnimationIteration");er(ah,"onAnimationStart");er("dblclick","onDoubleClick");er("focusin","onFocus");er("focusout","onBlur");er(oh,"onTransitionEnd");nn("onMouseEnter",["mouseout","mouseover"]);nn("onMouseLeave",["mouseout","mouseover"]);nn("onPointerEnter",["pointerout","pointerover"]);nn("onPointerLeave",["pointerout","pointerover"]);_r("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));_r("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));_r("onBeforeInput",["compositionend","keypress","textInput","paste"]);_r("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));_r("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));_r("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kg=new Set("cancel close invalid load scroll toggle".split(" ").concat(Dn));function Ac(t,e,r){var n=t.type||"unknown-event";t.currentTarget=r,jm(n,e,void 0,t),t.currentTarget=null}function ch(t,e){e=(e&4)!==0;for(var r=0;r<t.length;r++){var n=t[r],s=n.event;n=n.listeners;e:{var i=void 0;if(e)for(var o=n.length-1;0<=o;o--){var l=n[o],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==i&&s.isPropagationStopped())break e;Ac(s,l,u),i=c}else for(o=0;o<n.length;o++){if(l=n[o],c=l.instance,u=l.currentTarget,l=l.listener,c!==i&&s.isPropagationStopped())break e;Ac(s,l,u),i=c}}}if(di)throw t=io,di=!1,io=null,t}function Z(t,e){var r=e[go];r===void 0&&(r=e[go]=new Set);var n=t+"__bubble";r.has(n)||(uh(e,t,2,!1),r.add(n))}function xa(t,e,r){var n=0;e&&(n|=4),uh(r,t,n,e)}var Rs="_reactListening"+Math.random().toString(36).slice(2);function rs(t){if(!t[Rs]){t[Rs]=!0,vd.forEach(function(r){r!=="selectionchange"&&(kg.has(r)||xa(r,!1,t),xa(r,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Rs]||(e[Rs]=!0,xa("selectionchange",!1,e))}}function uh(t,e,r,n){switch(Kd(e)){case 1:var s=zm;break;case 4:s=Bm;break;default:s=pl}r=s.bind(null,e,r,t),s=void 0,!so||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),n?s!==void 0?t.addEventListener(e,r,{capture:!0,passive:s}):t.addEventListener(e,r,!0):s!==void 0?t.addEventListener(e,r,{passive:s}):t.addEventListener(e,r,!1)}function ba(t,e,r,n,s){var i=n;if(!(e&1)&&!(e&2)&&n!==null)e:for(;;){if(n===null)return;var o=n.tag;if(o===3||o===4){var l=n.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=n.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;o=o.return}for(;l!==null;){if(o=hr(l),o===null)return;if(c=o.tag,c===5||c===6){n=i=o;continue e}l=l.parentNode}}n=n.return}Rd(function(){var u=i,d=ul(r),f=[];e:{var h=lh.get(t);if(h!==void 0){var g=gl,x=t;switch(t){case"keypress":if(ei(r)===0)break e;case"keydown":case"keyup":g=eg;break;case"focusin":x="focus",g=pa;break;case"focusout":x="blur",g=pa;break;case"beforeblur":case"afterblur":g=pa;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=jc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=Fm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=ng;break;case sh:case ih:case ah:g=Hm;break;case oh:g=ig;break;case"scroll":g=Um;break;case"wheel":g=og;break;case"copy":case"cut":case"paste":g=Km;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=kc}var b=(e&4)!==0,j=!b&&t==="scroll",y=b?h!==null?h+"Capture":null:h;b=[];for(var p=u,m;p!==null;){m=p;var N=m.stateNode;if(m.tag===5&&N!==null&&(m=N,y!==null&&(N=Qn(p,y),N!=null&&b.push(ns(p,N,m)))),j)break;p=p.return}0<b.length&&(h=new g(h,x,null,r,d),f.push({event:h,listeners:b}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout",h&&r!==ro&&(x=r.relatedTarget||r.fromElement)&&(hr(x)||x[Tt]))break e;if((g||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,g?(x=r.relatedTarget||r.toElement,g=u,x=x?hr(x):null,x!==null&&(j=kr(x),x!==j||x.tag!==5&&x.tag!==6)&&(x=null)):(g=null,x=u),g!==x)){if(b=jc,N="onMouseLeave",y="onMouseEnter",p="mouse",(t==="pointerout"||t==="pointerover")&&(b=kc,N="onPointerLeave",y="onPointerEnter",p="pointer"),j=g==null?h:Mr(g),m=x==null?h:Mr(x),h=new b(N,p+"leave",g,r,d),h.target=j,h.relatedTarget=m,N=null,hr(d)===u&&(b=new b(y,p+"enter",x,r,d),b.target=m,b.relatedTarget=j,N=b),j=N,g&&x)t:{for(b=g,y=x,p=0,m=b;m;m=Cr(m))p++;for(m=0,N=y;N;N=Cr(N))m++;for(;0<p-m;)b=Cr(b),p--;for(;0<m-p;)y=Cr(y),m--;for(;p--;){if(b===y||y!==null&&b===y.alternate)break t;b=Cr(b),y=Cr(y)}b=null}else b=null;g!==null&&Ic(f,h,g,b,!1),x!==null&&j!==null&&Ic(f,j,x,b,!0)}}e:{if(h=u?Mr(u):window,g=h.nodeName&&h.nodeName.toLowerCase(),g==="select"||g==="input"&&h.type==="file")var v=pg;else if(Ec(h))if(Zd)v=yg;else{v=gg;var S=mg}else(g=h.nodeName)&&g.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(v=vg);if(v&&(v=v(t,u))){Xd(f,v,r,d);break e}S&&S(t,h,u),t==="focusout"&&(S=h._wrapperState)&&S.controlled&&h.type==="number"&&Ya(h,"number",h.value)}switch(S=u?Mr(u):window,t){case"focusin":(Ec(S)||S.contentEditable==="true")&&(Br=S,co=u,zn=null);break;case"focusout":zn=co=Br=null;break;case"mousedown":uo=!0;break;case"contextmenu":case"mouseup":case"dragend":uo=!1,Dc(f,r,d);break;case"selectionchange":if(bg)break;case"keydown":case"keyup":Dc(f,r,d)}var E;if(yl)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else zr?Qd(t,r)&&(P="onCompositionEnd"):t==="keydown"&&r.keyCode===229&&(P="onCompositionStart");P&&(Jd&&r.locale!=="ko"&&(zr||P!=="onCompositionStart"?P==="onCompositionEnd"&&zr&&(E=Gd()):(Ut=d,ml="value"in Ut?Ut.value:Ut.textContent,zr=!0)),S=gi(u,P),0<S.length&&(P=new _c(P,t,null,r,d),f.push({event:P,listeners:S}),E?P.data=E:(E=Yd(r),E!==null&&(P.data=E)))),(E=cg?ug(t,r):dg(t,r))&&(u=gi(u,"onBeforeInput"),0<u.length&&(d=new _c("onBeforeInput","beforeinput",null,r,d),f.push({event:d,listeners:u}),d.data=E))}ch(f,e)})}function ns(t,e,r){return{instance:t,listener:e,currentTarget:r}}function gi(t,e){for(var r=e+"Capture",n=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Qn(t,r),i!=null&&n.unshift(ns(t,i,s)),i=Qn(t,e),i!=null&&n.push(ns(t,i,s))),t=t.return}return n}function Cr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Ic(t,e,r,n,s){for(var i=e._reactName,o=[];r!==null&&r!==n;){var l=r,c=l.alternate,u=l.stateNode;if(c!==null&&c===n)break;l.tag===5&&u!==null&&(l=u,s?(c=Qn(r,i),c!=null&&o.unshift(ns(r,c,l))):s||(c=Qn(r,i),c!=null&&o.push(ns(r,c,l)))),r=r.return}o.length!==0&&t.push({event:e,listeners:o})}var Sg=/\r\n?/g,Ng=/\u0000|\uFFFD/g;function $c(t){return(typeof t=="string"?t:""+t).replace(Sg,`
`).replace(Ng,"")}function As(t,e,r){if(e=$c(e),$c(t)!==e&&r)throw Error(O(425))}function vi(){}var ho=null,fo=null;function po(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var mo=typeof setTimeout=="function"?setTimeout:void 0,Eg=typeof clearTimeout=="function"?clearTimeout:void 0,Lc=typeof Promise=="function"?Promise:void 0,Cg=typeof queueMicrotask=="function"?queueMicrotask:typeof Lc<"u"?function(t){return Lc.resolve(null).then(t).catch(Tg)}:mo;function Tg(t){setTimeout(function(){throw t})}function ja(t,e){var r=e,n=0;do{var s=r.nextSibling;if(t.removeChild(r),s&&s.nodeType===8)if(r=s.data,r==="/$"){if(n===0){t.removeChild(s),Zn(e);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=s}while(r);Zn(e)}function qt(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function zc(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var r=t.data;if(r==="$"||r==="$!"||r==="$?"){if(e===0)return t;e--}else r==="/$"&&e++}t=t.previousSibling}return null}var mn=Math.random().toString(36).slice(2),yt="__reactFiber$"+mn,ss="__reactProps$"+mn,Tt="__reactContainer$"+mn,go="__reactEvents$"+mn,Pg="__reactListeners$"+mn,Og="__reactHandles$"+mn;function hr(t){var e=t[yt];if(e)return e;for(var r=t.parentNode;r;){if(e=r[Tt]||r[yt]){if(r=e.alternate,e.child!==null||r!==null&&r.child!==null)for(t=zc(t);t!==null;){if(r=t[yt])return r;t=zc(t)}return e}t=r,r=t.parentNode}return null}function ws(t){return t=t[yt]||t[Tt],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Mr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(O(33))}function qi(t){return t[ss]||null}var vo=[],Fr=-1;function tr(t){return{current:t}}function ee(t){0>Fr||(t.current=vo[Fr],vo[Fr]=null,Fr--)}function Q(t,e){Fr++,vo[Fr]=t.current,t.current=e}var Zt={},Ne=tr(Zt),Le=tr(!1),yr=Zt;function sn(t,e){var r=t.type.contextTypes;if(!r)return Zt;var n=t.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===e)return n.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in r)s[i]=e[i];return n&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function ze(t){return t=t.childContextTypes,t!=null}function yi(){ee(Le),ee(Ne)}function Bc(t,e,r){if(Ne.current!==Zt)throw Error(O(168));Q(Ne,e),Q(Le,r)}function dh(t,e,r){var n=t.stateNode;if(e=e.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var s in n)if(!(s in e))throw Error(O(108,mm(t)||"Unknown",s));return ae({},r,n)}function wi(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Zt,yr=Ne.current,Q(Ne,t),Q(Le,Le.current),!0}function Uc(t,e,r){var n=t.stateNode;if(!n)throw Error(O(169));r?(t=dh(t,e,yr),n.__reactInternalMemoizedMergedChildContext=t,ee(Le),ee(Ne),Q(Ne,t)):ee(Le),Q(Le,r)}var kt=null,Ki=!1,_a=!1;function hh(t){kt===null?kt=[t]:kt.push(t)}function Dg(t){Ki=!0,hh(t)}function rr(){if(!_a&&kt!==null){_a=!0;var t=0,e=G;try{var r=kt;for(G=1;t<r.length;t++){var n=r[t];do n=n(!0);while(n!==null)}kt=null,Ki=!1}catch(s){throw kt!==null&&(kt=kt.slice(t+1)),Ld(dl,rr),s}finally{G=e,_a=!1}}return null}var Wr=[],Vr=0,xi=null,bi=0,Ye=[],Xe=0,wr=null,St=1,Nt="";function or(t,e){Wr[Vr++]=bi,Wr[Vr++]=xi,xi=t,bi=e}function fh(t,e,r){Ye[Xe++]=St,Ye[Xe++]=Nt,Ye[Xe++]=wr,wr=t;var n=St;t=Nt;var s=32-ft(n)-1;n&=~(1<<s),r+=1;var i=32-ft(e)+s;if(30<i){var o=s-s%5;i=(n&(1<<o)-1).toString(32),n>>=o,s-=o,St=1<<32-ft(e)+s|r<<s|n,Nt=i+t}else St=1<<i|r<<s|n,Nt=t}function xl(t){t.return!==null&&(or(t,1),fh(t,1,0))}function bl(t){for(;t===xi;)xi=Wr[--Vr],Wr[Vr]=null,bi=Wr[--Vr],Wr[Vr]=null;for(;t===wr;)wr=Ye[--Xe],Ye[Xe]=null,Nt=Ye[--Xe],Ye[Xe]=null,St=Ye[--Xe],Ye[Xe]=null}var qe=null,He=null,te=!1,ht=null;function ph(t,e){var r=Ze(5,null,null,0);r.elementType="DELETED",r.stateNode=e,r.return=t,e=t.deletions,e===null?(t.deletions=[r],t.flags|=16):e.push(r)}function Mc(t,e){switch(t.tag){case 5:var r=t.type;return e=e.nodeType!==1||r.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,qe=t,He=qt(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,qe=t,He=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(r=wr!==null?{id:St,overflow:Nt}:null,t.memoizedState={dehydrated:e,treeContext:r,retryLane:1073741824},r=Ze(18,null,null,0),r.stateNode=e,r.return=t,t.child=r,qe=t,He=null,!0):!1;default:return!1}}function yo(t){return(t.mode&1)!==0&&(t.flags&128)===0}function wo(t){if(te){var e=He;if(e){var r=e;if(!Mc(t,e)){if(yo(t))throw Error(O(418));e=qt(r.nextSibling);var n=qe;e&&Mc(t,e)?ph(n,r):(t.flags=t.flags&-4097|2,te=!1,qe=t)}}else{if(yo(t))throw Error(O(418));t.flags=t.flags&-4097|2,te=!1,qe=t}}}function Fc(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;qe=t}function Is(t){if(t!==qe)return!1;if(!te)return Fc(t),te=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!po(t.type,t.memoizedProps)),e&&(e=He)){if(yo(t))throw mh(),Error(O(418));for(;e;)ph(t,e),e=qt(e.nextSibling)}if(Fc(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(O(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var r=t.data;if(r==="/$"){if(e===0){He=qt(t.nextSibling);break e}e--}else r!=="$"&&r!=="$!"&&r!=="$?"||e++}t=t.nextSibling}He=null}}else He=qe?qt(t.stateNode.nextSibling):null;return!0}function mh(){for(var t=He;t;)t=qt(t.nextSibling)}function an(){He=qe=null,te=!1}function jl(t){ht===null?ht=[t]:ht.push(t)}var Rg=Dt.ReactCurrentBatchConfig;function Nn(t,e,r){if(t=r.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(O(309));var n=r.stateNode}if(!n)throw Error(O(147,t));var s=n,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(O(284));if(!r._owner)throw Error(O(290,t))}return t}function $s(t,e){throw t=Object.prototype.toString.call(e),Error(O(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Wc(t){var e=t._init;return e(t._payload)}function gh(t){function e(y,p){if(t){var m=y.deletions;m===null?(y.deletions=[p],y.flags|=16):m.push(p)}}function r(y,p){if(!t)return null;for(;p!==null;)e(y,p),p=p.sibling;return null}function n(y,p){for(y=new Map;p!==null;)p.key!==null?y.set(p.key,p):y.set(p.index,p),p=p.sibling;return y}function s(y,p){return y=Qt(y,p),y.index=0,y.sibling=null,y}function i(y,p,m){return y.index=m,t?(m=y.alternate,m!==null?(m=m.index,m<p?(y.flags|=2,p):m):(y.flags|=2,p)):(y.flags|=1048576,p)}function o(y){return t&&y.alternate===null&&(y.flags|=2),y}function l(y,p,m,N){return p===null||p.tag!==6?(p=Pa(m,y.mode,N),p.return=y,p):(p=s(p,m),p.return=y,p)}function c(y,p,m,N){var v=m.type;return v===Lr?d(y,p,m.props.children,N,m.key):p!==null&&(p.elementType===v||typeof v=="object"&&v!==null&&v.$$typeof===It&&Wc(v)===p.type)?(N=s(p,m.props),N.ref=Nn(y,p,m),N.return=y,N):(N=oi(m.type,m.key,m.props,null,y.mode,N),N.ref=Nn(y,p,m),N.return=y,N)}function u(y,p,m,N){return p===null||p.tag!==4||p.stateNode.containerInfo!==m.containerInfo||p.stateNode.implementation!==m.implementation?(p=Oa(m,y.mode,N),p.return=y,p):(p=s(p,m.children||[]),p.return=y,p)}function d(y,p,m,N,v){return p===null||p.tag!==7?(p=vr(m,y.mode,N,v),p.return=y,p):(p=s(p,m),p.return=y,p)}function f(y,p,m){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Pa(""+p,y.mode,m),p.return=y,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Ss:return m=oi(p.type,p.key,p.props,null,y.mode,m),m.ref=Nn(y,null,p),m.return=y,m;case $r:return p=Oa(p,y.mode,m),p.return=y,p;case It:var N=p._init;return f(y,N(p._payload),m)}if(Pn(p)||bn(p))return p=vr(p,y.mode,m,null),p.return=y,p;$s(y,p)}return null}function h(y,p,m,N){var v=p!==null?p.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return v!==null?null:l(y,p,""+m,N);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Ss:return m.key===v?c(y,p,m,N):null;case $r:return m.key===v?u(y,p,m,N):null;case It:return v=m._init,h(y,p,v(m._payload),N)}if(Pn(m)||bn(m))return v!==null?null:d(y,p,m,N,null);$s(y,m)}return null}function g(y,p,m,N,v){if(typeof N=="string"&&N!==""||typeof N=="number")return y=y.get(m)||null,l(p,y,""+N,v);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case Ss:return y=y.get(N.key===null?m:N.key)||null,c(p,y,N,v);case $r:return y=y.get(N.key===null?m:N.key)||null,u(p,y,N,v);case It:var S=N._init;return g(y,p,m,S(N._payload),v)}if(Pn(N)||bn(N))return y=y.get(m)||null,d(p,y,N,v,null);$s(p,N)}return null}function x(y,p,m,N){for(var v=null,S=null,E=p,P=p=0,A=null;E!==null&&P<m.length;P++){E.index>P?(A=E,E=null):A=E.sibling;var I=h(y,E,m[P],N);if(I===null){E===null&&(E=A);break}t&&E&&I.alternate===null&&e(y,E),p=i(I,p,P),S===null?v=I:S.sibling=I,S=I,E=A}if(P===m.length)return r(y,E),te&&or(y,P),v;if(E===null){for(;P<m.length;P++)E=f(y,m[P],N),E!==null&&(p=i(E,p,P),S===null?v=E:S.sibling=E,S=E);return te&&or(y,P),v}for(E=n(y,E);P<m.length;P++)A=g(E,y,P,m[P],N),A!==null&&(t&&A.alternate!==null&&E.delete(A.key===null?P:A.key),p=i(A,p,P),S===null?v=A:S.sibling=A,S=A);return t&&E.forEach(function(z){return e(y,z)}),te&&or(y,P),v}function b(y,p,m,N){var v=bn(m);if(typeof v!="function")throw Error(O(150));if(m=v.call(m),m==null)throw Error(O(151));for(var S=v=null,E=p,P=p=0,A=null,I=m.next();E!==null&&!I.done;P++,I=m.next()){E.index>P?(A=E,E=null):A=E.sibling;var z=h(y,E,I.value,N);if(z===null){E===null&&(E=A);break}t&&E&&z.alternate===null&&e(y,E),p=i(z,p,P),S===null?v=z:S.sibling=z,S=z,E=A}if(I.done)return r(y,E),te&&or(y,P),v;if(E===null){for(;!I.done;P++,I=m.next())I=f(y,I.value,N),I!==null&&(p=i(I,p,P),S===null?v=I:S.sibling=I,S=I);return te&&or(y,P),v}for(E=n(y,E);!I.done;P++,I=m.next())I=g(E,y,P,I.value,N),I!==null&&(t&&I.alternate!==null&&E.delete(I.key===null?P:I.key),p=i(I,p,P),S===null?v=I:S.sibling=I,S=I);return t&&E.forEach(function(H){return e(y,H)}),te&&or(y,P),v}function j(y,p,m,N){if(typeof m=="object"&&m!==null&&m.type===Lr&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Ss:e:{for(var v=m.key,S=p;S!==null;){if(S.key===v){if(v=m.type,v===Lr){if(S.tag===7){r(y,S.sibling),p=s(S,m.props.children),p.return=y,y=p;break e}}else if(S.elementType===v||typeof v=="object"&&v!==null&&v.$$typeof===It&&Wc(v)===S.type){r(y,S.sibling),p=s(S,m.props),p.ref=Nn(y,S,m),p.return=y,y=p;break e}r(y,S);break}else e(y,S);S=S.sibling}m.type===Lr?(p=vr(m.props.children,y.mode,N,m.key),p.return=y,y=p):(N=oi(m.type,m.key,m.props,null,y.mode,N),N.ref=Nn(y,p,m),N.return=y,y=N)}return o(y);case $r:e:{for(S=m.key;p!==null;){if(p.key===S)if(p.tag===4&&p.stateNode.containerInfo===m.containerInfo&&p.stateNode.implementation===m.implementation){r(y,p.sibling),p=s(p,m.children||[]),p.return=y,y=p;break e}else{r(y,p);break}else e(y,p);p=p.sibling}p=Oa(m,y.mode,N),p.return=y,y=p}return o(y);case It:return S=m._init,j(y,p,S(m._payload),N)}if(Pn(m))return x(y,p,m,N);if(bn(m))return b(y,p,m,N);$s(y,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,p!==null&&p.tag===6?(r(y,p.sibling),p=s(p,m),p.return=y,y=p):(r(y,p),p=Pa(m,y.mode,N),p.return=y,y=p),o(y)):r(y,p)}return j}var on=gh(!0),vh=gh(!1),ji=tr(null),_i=null,Hr=null,_l=null;function kl(){_l=Hr=_i=null}function Sl(t){var e=ji.current;ee(ji),t._currentValue=e}function xo(t,e,r){for(;t!==null;){var n=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,n!==null&&(n.childLanes|=e)):n!==null&&(n.childLanes&e)!==e&&(n.childLanes|=e),t===r)break;t=t.return}}function Xr(t,e){_i=t,_l=Hr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&($e=!0),t.firstContext=null)}function tt(t){var e=t._currentValue;if(_l!==t)if(t={context:t,memoizedValue:e,next:null},Hr===null){if(_i===null)throw Error(O(308));Hr=t,_i.dependencies={lanes:0,firstContext:t}}else Hr=Hr.next=t;return e}var fr=null;function Nl(t){fr===null?fr=[t]:fr.push(t)}function yh(t,e,r,n){var s=e.interleaved;return s===null?(r.next=r,Nl(e)):(r.next=s.next,s.next=r),e.interleaved=r,Pt(t,n)}function Pt(t,e){t.lanes|=e;var r=t.alternate;for(r!==null&&(r.lanes|=e),r=t,t=t.return;t!==null;)t.childLanes|=e,r=t.alternate,r!==null&&(r.childLanes|=e),r=t,t=t.return;return r.tag===3?r.stateNode:null}var $t=!1;function El(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function wh(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Et(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Kt(t,e,r){var n=t.updateQueue;if(n===null)return null;if(n=n.shared,K&2){var s=n.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),n.pending=e,Pt(t,r)}return s=n.interleaved,s===null?(e.next=e,Nl(n)):(e.next=s.next,s.next=e),n.interleaved=e,Pt(t,r)}function ti(t,e,r){if(e=e.updateQueue,e!==null&&(e=e.shared,(r&4194240)!==0)){var n=e.lanes;n&=t.pendingLanes,r|=n,e.lanes=r,hl(t,r)}}function Vc(t,e){var r=t.updateQueue,n=t.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var s=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var o={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?s=i=o:i=i.next=o,r=r.next}while(r!==null);i===null?s=i=e:i=i.next=e}else s=i=e;r={baseState:n.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:n.shared,effects:n.effects},t.updateQueue=r;return}t=r.lastBaseUpdate,t===null?r.firstBaseUpdate=e:t.next=e,r.lastBaseUpdate=e}function ki(t,e,r,n){var s=t.updateQueue;$t=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,u=c.next;c.next=null,o===null?i=u:o.next=u,o=c;var d=t.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==o&&(l===null?d.firstBaseUpdate=u:l.next=u,d.lastBaseUpdate=c))}if(i!==null){var f=s.baseState;o=0,d=u=c=null,l=i;do{var h=l.lane,g=l.eventTime;if((n&h)===h){d!==null&&(d=d.next={eventTime:g,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var x=t,b=l;switch(h=e,g=r,b.tag){case 1:if(x=b.payload,typeof x=="function"){f=x.call(g,f,h);break e}f=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=b.payload,h=typeof x=="function"?x.call(g,f,h):x,h==null)break e;f=ae({},f,h);break e;case 2:$t=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,h=s.effects,h===null?s.effects=[l]:h.push(l))}else g={eventTime:g,lane:h,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(u=d=g,c=f):d=d.next=g,o|=h;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;h=l,l=h.next,h.next=null,s.lastBaseUpdate=h,s.shared.pending=null}}while(1);if(d===null&&(c=f),s.baseState=c,s.firstBaseUpdate=u,s.lastBaseUpdate=d,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);br|=o,t.lanes=o,t.memoizedState=f}}function Hc(t,e,r){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var n=t[e],s=n.callback;if(s!==null){if(n.callback=null,n=r,typeof s!="function")throw Error(O(191,s));s.call(n)}}}var xs={},xt=tr(xs),is=tr(xs),as=tr(xs);function pr(t){if(t===xs)throw Error(O(174));return t}function Cl(t,e){switch(Q(as,e),Q(is,t),Q(xt,xs),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Za(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Za(e,t)}ee(xt),Q(xt,e)}function ln(){ee(xt),ee(is),ee(as)}function xh(t){pr(as.current);var e=pr(xt.current),r=Za(e,t.type);e!==r&&(Q(is,t),Q(xt,r))}function Tl(t){is.current===t&&(ee(xt),ee(is))}var se=tr(0);function Si(t){for(var e=t;e!==null;){if(e.tag===13){var r=e.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ka=[];function Pl(){for(var t=0;t<ka.length;t++)ka[t]._workInProgressVersionPrimary=null;ka.length=0}var ri=Dt.ReactCurrentDispatcher,Sa=Dt.ReactCurrentBatchConfig,xr=0,ie=null,me=null,ve=null,Ni=!1,Bn=!1,os=0,Ag=0;function _e(){throw Error(O(321))}function Ol(t,e){if(e===null)return!1;for(var r=0;r<e.length&&r<t.length;r++)if(!mt(t[r],e[r]))return!1;return!0}function Dl(t,e,r,n,s,i){if(xr=i,ie=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ri.current=t===null||t.memoizedState===null?zg:Bg,t=r(n,s),Bn){i=0;do{if(Bn=!1,os=0,25<=i)throw Error(O(301));i+=1,ve=me=null,e.updateQueue=null,ri.current=Ug,t=r(n,s)}while(Bn)}if(ri.current=Ei,e=me!==null&&me.next!==null,xr=0,ve=me=ie=null,Ni=!1,e)throw Error(O(300));return t}function Rl(){var t=os!==0;return os=0,t}function vt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ve===null?ie.memoizedState=ve=t:ve=ve.next=t,ve}function rt(){if(me===null){var t=ie.alternate;t=t!==null?t.memoizedState:null}else t=me.next;var e=ve===null?ie.memoizedState:ve.next;if(e!==null)ve=e,me=t;else{if(t===null)throw Error(O(310));me=t,t={memoizedState:me.memoizedState,baseState:me.baseState,baseQueue:me.baseQueue,queue:me.queue,next:null},ve===null?ie.memoizedState=ve=t:ve=ve.next=t}return ve}function ls(t,e){return typeof e=="function"?e(t):e}function Na(t){var e=rt(),r=e.queue;if(r===null)throw Error(O(311));r.lastRenderedReducer=t;var n=me,s=n.baseQueue,i=r.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}n.baseQueue=s=i,r.pending=null}if(s!==null){i=s.next,n=n.baseState;var l=o=null,c=null,u=i;do{var d=u.lane;if((xr&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),n=u.hasEagerState?u.eagerState:t(n,u.action);else{var f={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=f,o=n):c=c.next=f,ie.lanes|=d,br|=d}u=u.next}while(u!==null&&u!==i);c===null?o=n:c.next=l,mt(n,e.memoizedState)||($e=!0),e.memoizedState=n,e.baseState=o,e.baseQueue=c,r.lastRenderedState=n}if(t=r.interleaved,t!==null){s=t;do i=s.lane,ie.lanes|=i,br|=i,s=s.next;while(s!==t)}else s===null&&(r.lanes=0);return[e.memoizedState,r.dispatch]}function Ea(t){var e=rt(),r=e.queue;if(r===null)throw Error(O(311));r.lastRenderedReducer=t;var n=r.dispatch,s=r.pending,i=e.memoizedState;if(s!==null){r.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);mt(i,e.memoizedState)||($e=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),r.lastRenderedState=i}return[i,n]}function bh(){}function jh(t,e){var r=ie,n=rt(),s=e(),i=!mt(n.memoizedState,s);if(i&&(n.memoizedState=s,$e=!0),n=n.queue,Al(Sh.bind(null,r,n,t),[t]),n.getSnapshot!==e||i||ve!==null&&ve.memoizedState.tag&1){if(r.flags|=2048,cs(9,kh.bind(null,r,n,s,e),void 0,null),ye===null)throw Error(O(349));xr&30||_h(r,e,s)}return s}function _h(t,e,r){t.flags|=16384,t={getSnapshot:e,value:r},e=ie.updateQueue,e===null?(e={lastEffect:null,stores:null},ie.updateQueue=e,e.stores=[t]):(r=e.stores,r===null?e.stores=[t]:r.push(t))}function kh(t,e,r,n){e.value=r,e.getSnapshot=n,Nh(e)&&Eh(t)}function Sh(t,e,r){return r(function(){Nh(e)&&Eh(t)})}function Nh(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!mt(t,r)}catch{return!0}}function Eh(t){var e=Pt(t,1);e!==null&&pt(e,t,1,-1)}function qc(t){var e=vt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:t},e.queue=t,t=t.dispatch=Lg.bind(null,ie,t),[e.memoizedState,t]}function cs(t,e,r,n){return t={tag:t,create:e,destroy:r,deps:n,next:null},e=ie.updateQueue,e===null?(e={lastEffect:null,stores:null},ie.updateQueue=e,e.lastEffect=t.next=t):(r=e.lastEffect,r===null?e.lastEffect=t.next=t:(n=r.next,r.next=t,t.next=n,e.lastEffect=t)),t}function Ch(){return rt().memoizedState}function ni(t,e,r,n){var s=vt();ie.flags|=t,s.memoizedState=cs(1|e,r,void 0,n===void 0?null:n)}function Gi(t,e,r,n){var s=rt();n=n===void 0?null:n;var i=void 0;if(me!==null){var o=me.memoizedState;if(i=o.destroy,n!==null&&Ol(n,o.deps)){s.memoizedState=cs(e,r,i,n);return}}ie.flags|=t,s.memoizedState=cs(1|e,r,i,n)}function Kc(t,e){return ni(8390656,8,t,e)}function Al(t,e){return Gi(2048,8,t,e)}function Th(t,e){return Gi(4,2,t,e)}function Ph(t,e){return Gi(4,4,t,e)}function Oh(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Dh(t,e,r){return r=r!=null?r.concat([t]):null,Gi(4,4,Oh.bind(null,e,t),r)}function Il(){}function Rh(t,e){var r=rt();e=e===void 0?null:e;var n=r.memoizedState;return n!==null&&e!==null&&Ol(e,n[1])?n[0]:(r.memoizedState=[t,e],t)}function Ah(t,e){var r=rt();e=e===void 0?null:e;var n=r.memoizedState;return n!==null&&e!==null&&Ol(e,n[1])?n[0]:(t=t(),r.memoizedState=[t,e],t)}function Ih(t,e,r){return xr&21?(mt(r,e)||(r=Ud(),ie.lanes|=r,br|=r,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,$e=!0),t.memoizedState=r)}function Ig(t,e){var r=G;G=r!==0&&4>r?r:4,t(!0);var n=Sa.transition;Sa.transition={};try{t(!1),e()}finally{G=r,Sa.transition=n}}function $h(){return rt().memoizedState}function $g(t,e,r){var n=Jt(t);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},Lh(t))zh(e,r);else if(r=yh(t,e,r,n),r!==null){var s=Pe();pt(r,t,n,s),Bh(r,e,n)}}function Lg(t,e,r){var n=Jt(t),s={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(Lh(t))zh(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,r);if(s.hasEagerState=!0,s.eagerState=l,mt(l,o)){var c=e.interleaved;c===null?(s.next=s,Nl(e)):(s.next=c.next,c.next=s),e.interleaved=s;return}}catch{}finally{}r=yh(t,e,s,n),r!==null&&(s=Pe(),pt(r,t,n,s),Bh(r,e,n))}}function Lh(t){var e=t.alternate;return t===ie||e!==null&&e===ie}function zh(t,e){Bn=Ni=!0;var r=t.pending;r===null?e.next=e:(e.next=r.next,r.next=e),t.pending=e}function Bh(t,e,r){if(r&4194240){var n=e.lanes;n&=t.pendingLanes,r|=n,e.lanes=r,hl(t,r)}}var Ei={readContext:tt,useCallback:_e,useContext:_e,useEffect:_e,useImperativeHandle:_e,useInsertionEffect:_e,useLayoutEffect:_e,useMemo:_e,useReducer:_e,useRef:_e,useState:_e,useDebugValue:_e,useDeferredValue:_e,useTransition:_e,useMutableSource:_e,useSyncExternalStore:_e,useId:_e,unstable_isNewReconciler:!1},zg={readContext:tt,useCallback:function(t,e){return vt().memoizedState=[t,e===void 0?null:e],t},useContext:tt,useEffect:Kc,useImperativeHandle:function(t,e,r){return r=r!=null?r.concat([t]):null,ni(4194308,4,Oh.bind(null,e,t),r)},useLayoutEffect:function(t,e){return ni(4194308,4,t,e)},useInsertionEffect:function(t,e){return ni(4,2,t,e)},useMemo:function(t,e){var r=vt();return e=e===void 0?null:e,t=t(),r.memoizedState=[t,e],t},useReducer:function(t,e,r){var n=vt();return e=r!==void 0?r(e):e,n.memoizedState=n.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},n.queue=t,t=t.dispatch=$g.bind(null,ie,t),[n.memoizedState,t]},useRef:function(t){var e=vt();return t={current:t},e.memoizedState=t},useState:qc,useDebugValue:Il,useDeferredValue:function(t){return vt().memoizedState=t},useTransition:function(){var t=qc(!1),e=t[0];return t=Ig.bind(null,t[1]),vt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,r){var n=ie,s=vt();if(te){if(r===void 0)throw Error(O(407));r=r()}else{if(r=e(),ye===null)throw Error(O(349));xr&30||_h(n,e,r)}s.memoizedState=r;var i={value:r,getSnapshot:e};return s.queue=i,Kc(Sh.bind(null,n,i,t),[t]),n.flags|=2048,cs(9,kh.bind(null,n,i,r,e),void 0,null),r},useId:function(){var t=vt(),e=ye.identifierPrefix;if(te){var r=Nt,n=St;r=(n&~(1<<32-ft(n)-1)).toString(32)+r,e=":"+e+"R"+r,r=os++,0<r&&(e+="H"+r.toString(32)),e+=":"}else r=Ag++,e=":"+e+"r"+r.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Bg={readContext:tt,useCallback:Rh,useContext:tt,useEffect:Al,useImperativeHandle:Dh,useInsertionEffect:Th,useLayoutEffect:Ph,useMemo:Ah,useReducer:Na,useRef:Ch,useState:function(){return Na(ls)},useDebugValue:Il,useDeferredValue:function(t){var e=rt();return Ih(e,me.memoizedState,t)},useTransition:function(){var t=Na(ls)[0],e=rt().memoizedState;return[t,e]},useMutableSource:bh,useSyncExternalStore:jh,useId:$h,unstable_isNewReconciler:!1},Ug={readContext:tt,useCallback:Rh,useContext:tt,useEffect:Al,useImperativeHandle:Dh,useInsertionEffect:Th,useLayoutEffect:Ph,useMemo:Ah,useReducer:Ea,useRef:Ch,useState:function(){return Ea(ls)},useDebugValue:Il,useDeferredValue:function(t){var e=rt();return me===null?e.memoizedState=t:Ih(e,me.memoizedState,t)},useTransition:function(){var t=Ea(ls)[0],e=rt().memoizedState;return[t,e]},useMutableSource:bh,useSyncExternalStore:jh,useId:$h,unstable_isNewReconciler:!1};function lt(t,e){if(t&&t.defaultProps){e=ae({},e),t=t.defaultProps;for(var r in t)e[r]===void 0&&(e[r]=t[r]);return e}return e}function bo(t,e,r,n){e=t.memoizedState,r=r(n,e),r=r==null?e:ae({},e,r),t.memoizedState=r,t.lanes===0&&(t.updateQueue.baseState=r)}var Ji={isMounted:function(t){return(t=t._reactInternals)?kr(t)===t:!1},enqueueSetState:function(t,e,r){t=t._reactInternals;var n=Pe(),s=Jt(t),i=Et(n,s);i.payload=e,r!=null&&(i.callback=r),e=Kt(t,i,s),e!==null&&(pt(e,t,s,n),ti(e,t,s))},enqueueReplaceState:function(t,e,r){t=t._reactInternals;var n=Pe(),s=Jt(t),i=Et(n,s);i.tag=1,i.payload=e,r!=null&&(i.callback=r),e=Kt(t,i,s),e!==null&&(pt(e,t,s,n),ti(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var r=Pe(),n=Jt(t),s=Et(r,n);s.tag=2,e!=null&&(s.callback=e),e=Kt(t,s,n),e!==null&&(pt(e,t,n,r),ti(e,t,n))}};function Gc(t,e,r,n,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(n,i,o):e.prototype&&e.prototype.isPureReactComponent?!ts(r,n)||!ts(s,i):!0}function Uh(t,e,r){var n=!1,s=Zt,i=e.contextType;return typeof i=="object"&&i!==null?i=tt(i):(s=ze(e)?yr:Ne.current,n=e.contextTypes,i=(n=n!=null)?sn(t,s):Zt),e=new e(r,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ji,t.stateNode=e,e._reactInternals=t,n&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function Jc(t,e,r,n){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(r,n),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(r,n),e.state!==t&&Ji.enqueueReplaceState(e,e.state,null)}function jo(t,e,r,n){var s=t.stateNode;s.props=r,s.state=t.memoizedState,s.refs={},El(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=tt(i):(i=ze(e)?yr:Ne.current,s.context=sn(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(bo(t,e,i,r),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Ji.enqueueReplaceState(s,s.state,null),ki(t,r,s,n),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function cn(t,e){try{var r="",n=e;do r+=pm(n),n=n.return;while(n);var s=r}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function Ca(t,e,r){return{value:t,source:null,stack:r??null,digest:e??null}}function _o(t,e){try{console.error(e.value)}catch(r){setTimeout(function(){throw r})}}var Mg=typeof WeakMap=="function"?WeakMap:Map;function Mh(t,e,r){r=Et(-1,r),r.tag=3,r.payload={element:null};var n=e.value;return r.callback=function(){Ti||(Ti=!0,Ro=n),_o(t,e)},r}function Fh(t,e,r){r=Et(-1,r),r.tag=3;var n=t.type.getDerivedStateFromError;if(typeof n=="function"){var s=e.value;r.payload=function(){return n(s)},r.callback=function(){_o(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){_o(t,e),typeof n!="function"&&(Gt===null?Gt=new Set([this]):Gt.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),r}function Qc(t,e,r){var n=t.pingCache;if(n===null){n=t.pingCache=new Mg;var s=new Set;n.set(e,s)}else s=n.get(e),s===void 0&&(s=new Set,n.set(e,s));s.has(r)||(s.add(r),t=tv.bind(null,t,e,r),e.then(t,t))}function Yc(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Xc(t,e,r,n,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(e=Et(-1,1),e.tag=2,Kt(r,e,1))),r.lanes|=1),t)}var Fg=Dt.ReactCurrentOwner,$e=!1;function Ce(t,e,r,n){e.child=t===null?vh(e,null,r,n):on(e,t.child,r,n)}function Zc(t,e,r,n,s){r=r.render;var i=e.ref;return Xr(e,s),n=Dl(t,e,r,n,i,s),r=Rl(),t!==null&&!$e?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Ot(t,e,s)):(te&&r&&xl(e),e.flags|=1,Ce(t,e,n,s),e.child)}function eu(t,e,r,n,s){if(t===null){var i=r.type;return typeof i=="function"&&!Wl(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(e.tag=15,e.type=i,Wh(t,e,i,n,s)):(t=oi(r.type,null,n,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(r=r.compare,r=r!==null?r:ts,r(o,n)&&t.ref===e.ref)return Ot(t,e,s)}return e.flags|=1,t=Qt(i,n),t.ref=e.ref,t.return=e,e.child=t}function Wh(t,e,r,n,s){if(t!==null){var i=t.memoizedProps;if(ts(i,n)&&t.ref===e.ref)if($e=!1,e.pendingProps=n=i,(t.lanes&s)!==0)t.flags&131072&&($e=!0);else return e.lanes=t.lanes,Ot(t,e,s)}return ko(t,e,r,n,s)}function Vh(t,e,r){var n=e.pendingProps,s=n.children,i=t!==null?t.memoizedState:null;if(n.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Q(Kr,Fe),Fe|=r;else{if(!(r&1073741824))return t=i!==null?i.baseLanes|r:r,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Q(Kr,Fe),Fe|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=i!==null?i.baseLanes:r,Q(Kr,Fe),Fe|=n}else i!==null?(n=i.baseLanes|r,e.memoizedState=null):n=r,Q(Kr,Fe),Fe|=n;return Ce(t,e,s,r),e.child}function Hh(t,e){var r=e.ref;(t===null&&r!==null||t!==null&&t.ref!==r)&&(e.flags|=512,e.flags|=2097152)}function ko(t,e,r,n,s){var i=ze(r)?yr:Ne.current;return i=sn(e,i),Xr(e,s),r=Dl(t,e,r,n,i,s),n=Rl(),t!==null&&!$e?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Ot(t,e,s)):(te&&n&&xl(e),e.flags|=1,Ce(t,e,r,s),e.child)}function tu(t,e,r,n,s){if(ze(r)){var i=!0;wi(e)}else i=!1;if(Xr(e,s),e.stateNode===null)si(t,e),Uh(e,r,n),jo(e,r,n,s),n=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var c=o.context,u=r.contextType;typeof u=="object"&&u!==null?u=tt(u):(u=ze(r)?yr:Ne.current,u=sn(e,u));var d=r.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==n||c!==u)&&Jc(e,o,n,u),$t=!1;var h=e.memoizedState;o.state=h,ki(e,n,o,s),c=e.memoizedState,l!==n||h!==c||Le.current||$t?(typeof d=="function"&&(bo(e,r,d,n),c=e.memoizedState),(l=$t||Gc(e,r,l,n,h,c,u))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=n,e.memoizedState=c),o.props=n,o.state=c,o.context=u,n=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),n=!1)}else{o=e.stateNode,wh(t,e),l=e.memoizedProps,u=e.type===e.elementType?l:lt(e.type,l),o.props=u,f=e.pendingProps,h=o.context,c=r.contextType,typeof c=="object"&&c!==null?c=tt(c):(c=ze(r)?yr:Ne.current,c=sn(e,c));var g=r.getDerivedStateFromProps;(d=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==f||h!==c)&&Jc(e,o,n,c),$t=!1,h=e.memoizedState,o.state=h,ki(e,n,o,s);var x=e.memoizedState;l!==f||h!==x||Le.current||$t?(typeof g=="function"&&(bo(e,r,g,n),x=e.memoizedState),(u=$t||Gc(e,r,u,n,h,x,c)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,x,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,x,c)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=n,e.memoizedState=x),o.props=n,o.state=x,o.context=c,n=u):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),n=!1)}return So(t,e,r,n,i,s)}function So(t,e,r,n,s,i){Hh(t,e);var o=(e.flags&128)!==0;if(!n&&!o)return s&&Uc(e,r,!1),Ot(t,e,i);n=e.stateNode,Fg.current=e;var l=o&&typeof r.getDerivedStateFromError!="function"?null:n.render();return e.flags|=1,t!==null&&o?(e.child=on(e,t.child,null,i),e.child=on(e,null,l,i)):Ce(t,e,l,i),e.memoizedState=n.state,s&&Uc(e,r,!0),e.child}function qh(t){var e=t.stateNode;e.pendingContext?Bc(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Bc(t,e.context,!1),Cl(t,e.containerInfo)}function ru(t,e,r,n,s){return an(),jl(s),e.flags|=256,Ce(t,e,r,n),e.child}var No={dehydrated:null,treeContext:null,retryLane:0};function Eo(t){return{baseLanes:t,cachePool:null,transitions:null}}function Kh(t,e,r){var n=e.pendingProps,s=se.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),Q(se,s&1),t===null)return wo(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=n.children,t=n.fallback,i?(n=e.mode,i=e.child,o={mode:"hidden",children:o},!(n&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Xi(o,n,0,null),t=vr(t,n,r,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=Eo(r),e.memoizedState=No,t):$l(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return Wg(t,e,o,n,l,s,r);if(i){i=n.fallback,o=e.mode,s=t.child,l=s.sibling;var c={mode:"hidden",children:n.children};return!(o&1)&&e.child!==s?(n=e.child,n.childLanes=0,n.pendingProps=c,e.deletions=null):(n=Qt(s,c),n.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=Qt(l,i):(i=vr(i,o,r,null),i.flags|=2),i.return=e,n.return=e,n.sibling=i,e.child=n,n=i,i=e.child,o=t.child.memoizedState,o=o===null?Eo(r):{baseLanes:o.baseLanes|r,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~r,e.memoizedState=No,n}return i=t.child,t=i.sibling,n=Qt(i,{mode:"visible",children:n.children}),!(e.mode&1)&&(n.lanes=r),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n}function $l(t,e){return e=Xi({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ls(t,e,r,n){return n!==null&&jl(n),on(e,t.child,null,r),t=$l(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Wg(t,e,r,n,s,i,o){if(r)return e.flags&256?(e.flags&=-257,n=Ca(Error(O(422))),Ls(t,e,o,n)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=n.fallback,s=e.mode,n=Xi({mode:"visible",children:n.children},s,0,null),i=vr(i,s,o,null),i.flags|=2,n.return=e,i.return=e,n.sibling=i,e.child=n,e.mode&1&&on(e,t.child,null,o),e.child.memoizedState=Eo(o),e.memoizedState=No,i);if(!(e.mode&1))return Ls(t,e,o,null);if(s.data==="$!"){if(n=s.nextSibling&&s.nextSibling.dataset,n)var l=n.dgst;return n=l,i=Error(O(419)),n=Ca(i,n,void 0),Ls(t,e,o,n)}if(l=(o&t.childLanes)!==0,$e||l){if(n=ye,n!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(n.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Pt(t,s),pt(n,t,s,-1))}return Fl(),n=Ca(Error(O(421))),Ls(t,e,o,n)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=rv.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,He=qt(s.nextSibling),qe=e,te=!0,ht=null,t!==null&&(Ye[Xe++]=St,Ye[Xe++]=Nt,Ye[Xe++]=wr,St=t.id,Nt=t.overflow,wr=e),e=$l(e,n.children),e.flags|=4096,e)}function nu(t,e,r){t.lanes|=e;var n=t.alternate;n!==null&&(n.lanes|=e),xo(t.return,e,r)}function Ta(t,e,r,n,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=n,i.tail=r,i.tailMode=s)}function Gh(t,e,r){var n=e.pendingProps,s=n.revealOrder,i=n.tail;if(Ce(t,e,n.children,r),n=se.current,n&2)n=n&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&nu(t,r,e);else if(t.tag===19)nu(t,r,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}n&=1}if(Q(se,n),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(r=e.child,s=null;r!==null;)t=r.alternate,t!==null&&Si(t)===null&&(s=r),r=r.sibling;r=s,r===null?(s=e.child,e.child=null):(s=r.sibling,r.sibling=null),Ta(e,!1,s,r,i);break;case"backwards":for(r=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&Si(t)===null){e.child=s;break}t=s.sibling,s.sibling=r,r=s,s=t}Ta(e,!0,r,null,i);break;case"together":Ta(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function si(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ot(t,e,r){if(t!==null&&(e.dependencies=t.dependencies),br|=e.lanes,!(r&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(O(153));if(e.child!==null){for(t=e.child,r=Qt(t,t.pendingProps),e.child=r,r.return=e;t.sibling!==null;)t=t.sibling,r=r.sibling=Qt(t,t.pendingProps),r.return=e;r.sibling=null}return e.child}function Vg(t,e,r){switch(e.tag){case 3:qh(e),an();break;case 5:xh(e);break;case 1:ze(e.type)&&wi(e);break;case 4:Cl(e,e.stateNode.containerInfo);break;case 10:var n=e.type._context,s=e.memoizedProps.value;Q(ji,n._currentValue),n._currentValue=s;break;case 13:if(n=e.memoizedState,n!==null)return n.dehydrated!==null?(Q(se,se.current&1),e.flags|=128,null):r&e.child.childLanes?Kh(t,e,r):(Q(se,se.current&1),t=Ot(t,e,r),t!==null?t.sibling:null);Q(se,se.current&1);break;case 19:if(n=(r&e.childLanes)!==0,t.flags&128){if(n)return Gh(t,e,r);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Q(se,se.current),n)break;return null;case 22:case 23:return e.lanes=0,Vh(t,e,r)}return Ot(t,e,r)}var Jh,Co,Qh,Yh;Jh=function(t,e){for(var r=e.child;r!==null;){if(r.tag===5||r.tag===6)t.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};Co=function(){};Qh=function(t,e,r,n){var s=t.memoizedProps;if(s!==n){t=e.stateNode,pr(xt.current);var i=null;switch(r){case"input":s=Ja(t,s),n=Ja(t,n),i=[];break;case"select":s=ae({},s,{value:void 0}),n=ae({},n,{value:void 0}),i=[];break;case"textarea":s=Xa(t,s),n=Xa(t,n),i=[];break;default:typeof s.onClick!="function"&&typeof n.onClick=="function"&&(t.onclick=vi)}eo(r,n);var o;r=null;for(u in s)if(!n.hasOwnProperty(u)&&s.hasOwnProperty(u)&&s[u]!=null)if(u==="style"){var l=s[u];for(o in l)l.hasOwnProperty(o)&&(r||(r={}),r[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Gn.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in n){var c=n[u];if(l=s!=null?s[u]:void 0,n.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(r||(r={}),r[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(r||(r={}),r[o]=c[o])}else r||(i||(i=[]),i.push(u,r)),r=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Gn.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&Z("scroll",t),i||l===c||(i=[])):(i=i||[]).push(u,c))}r&&(i=i||[]).push("style",r);var u=i;(e.updateQueue=u)&&(e.flags|=4)}};Yh=function(t,e,r,n){r!==n&&(e.flags|=4)};function En(t,e){if(!te)switch(t.tailMode){case"hidden":e=t.tail;for(var r=null;e!==null;)e.alternate!==null&&(r=e),e=e.sibling;r===null?t.tail=null:r.sibling=null;break;case"collapsed":r=t.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:n.sibling=null}}function ke(t){var e=t.alternate!==null&&t.alternate.child===t.child,r=0,n=0;if(e)for(var s=t.child;s!==null;)r|=s.lanes|s.childLanes,n|=s.subtreeFlags&14680064,n|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)r|=s.lanes|s.childLanes,n|=s.subtreeFlags,n|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=n,t.childLanes=r,e}function Hg(t,e,r){var n=e.pendingProps;switch(bl(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ke(e),null;case 1:return ze(e.type)&&yi(),ke(e),null;case 3:return n=e.stateNode,ln(),ee(Le),ee(Ne),Pl(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Is(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ht!==null&&($o(ht),ht=null))),Co(t,e),ke(e),null;case 5:Tl(e);var s=pr(as.current);if(r=e.type,t!==null&&e.stateNode!=null)Qh(t,e,r,n,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!n){if(e.stateNode===null)throw Error(O(166));return ke(e),null}if(t=pr(xt.current),Is(e)){n=e.stateNode,r=e.type;var i=e.memoizedProps;switch(n[yt]=e,n[ss]=i,t=(e.mode&1)!==0,r){case"dialog":Z("cancel",n),Z("close",n);break;case"iframe":case"object":case"embed":Z("load",n);break;case"video":case"audio":for(s=0;s<Dn.length;s++)Z(Dn[s],n);break;case"source":Z("error",n);break;case"img":case"image":case"link":Z("error",n),Z("load",n);break;case"details":Z("toggle",n);break;case"input":hc(n,i),Z("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!i.multiple},Z("invalid",n);break;case"textarea":pc(n,i),Z("invalid",n)}eo(r,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?n.textContent!==l&&(i.suppressHydrationWarning!==!0&&As(n.textContent,l,t),s=["children",l]):typeof l=="number"&&n.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&As(n.textContent,l,t),s=["children",""+l]):Gn.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&Z("scroll",n)}switch(r){case"input":Ns(n),fc(n,i,!0);break;case"textarea":Ns(n),mc(n);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(n.onclick=vi)}n=s,e.updateQueue=n,n!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Sd(r)),t==="http://www.w3.org/1999/xhtml"?r==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof n.is=="string"?t=o.createElement(r,{is:n.is}):(t=o.createElement(r),r==="select"&&(o=t,n.multiple?o.multiple=!0:n.size&&(o.size=n.size))):t=o.createElementNS(t,r),t[yt]=e,t[ss]=n,Jh(t,e,!1,!1),e.stateNode=t;e:{switch(o=to(r,n),r){case"dialog":Z("cancel",t),Z("close",t),s=n;break;case"iframe":case"object":case"embed":Z("load",t),s=n;break;case"video":case"audio":for(s=0;s<Dn.length;s++)Z(Dn[s],t);s=n;break;case"source":Z("error",t),s=n;break;case"img":case"image":case"link":Z("error",t),Z("load",t),s=n;break;case"details":Z("toggle",t),s=n;break;case"input":hc(t,n),s=Ja(t,n),Z("invalid",t);break;case"option":s=n;break;case"select":t._wrapperState={wasMultiple:!!n.multiple},s=ae({},n,{value:void 0}),Z("invalid",t);break;case"textarea":pc(t,n),s=Xa(t,n),Z("invalid",t);break;default:s=n}eo(r,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?Cd(t,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Nd(t,c)):i==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&Jn(t,c):typeof c=="number"&&Jn(t,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Gn.hasOwnProperty(i)?c!=null&&i==="onScroll"&&Z("scroll",t):c!=null&&al(t,i,c,o))}switch(r){case"input":Ns(t),fc(t,n,!1);break;case"textarea":Ns(t),mc(t);break;case"option":n.value!=null&&t.setAttribute("value",""+Xt(n.value));break;case"select":t.multiple=!!n.multiple,i=n.value,i!=null?Gr(t,!!n.multiple,i,!1):n.defaultValue!=null&&Gr(t,!!n.multiple,n.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=vi)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return ke(e),null;case 6:if(t&&e.stateNode!=null)Yh(t,e,t.memoizedProps,n);else{if(typeof n!="string"&&e.stateNode===null)throw Error(O(166));if(r=pr(as.current),pr(xt.current),Is(e)){if(n=e.stateNode,r=e.memoizedProps,n[yt]=e,(i=n.nodeValue!==r)&&(t=qe,t!==null))switch(t.tag){case 3:As(n.nodeValue,r,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&As(n.nodeValue,r,(t.mode&1)!==0)}i&&(e.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[yt]=e,e.stateNode=n}return ke(e),null;case 13:if(ee(se),n=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(te&&He!==null&&e.mode&1&&!(e.flags&128))mh(),an(),e.flags|=98560,i=!1;else if(i=Is(e),n!==null&&n.dehydrated!==null){if(t===null){if(!i)throw Error(O(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(O(317));i[yt]=e}else an(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;ke(e),i=!1}else ht!==null&&($o(ht),ht=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=r,e):(n=n!==null,n!==(t!==null&&t.memoizedState!==null)&&n&&(e.child.flags|=8192,e.mode&1&&(t===null||se.current&1?ge===0&&(ge=3):Fl())),e.updateQueue!==null&&(e.flags|=4),ke(e),null);case 4:return ln(),Co(t,e),t===null&&rs(e.stateNode.containerInfo),ke(e),null;case 10:return Sl(e.type._context),ke(e),null;case 17:return ze(e.type)&&yi(),ke(e),null;case 19:if(ee(se),i=e.memoizedState,i===null)return ke(e),null;if(n=(e.flags&128)!==0,o=i.rendering,o===null)if(n)En(i,!1);else{if(ge!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Si(t),o!==null){for(e.flags|=128,En(i,!1),n=o.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),e.subtreeFlags=0,n=r,r=e.child;r!==null;)i=r,t=n,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),r=r.sibling;return Q(se,se.current&1|2),e.child}t=t.sibling}i.tail!==null&&ue()>un&&(e.flags|=128,n=!0,En(i,!1),e.lanes=4194304)}else{if(!n)if(t=Si(o),t!==null){if(e.flags|=128,n=!0,r=t.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),En(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!te)return ke(e),null}else 2*ue()-i.renderingStartTime>un&&r!==1073741824&&(e.flags|=128,n=!0,En(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(r=i.last,r!==null?r.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=ue(),e.sibling=null,r=se.current,Q(se,n?r&1|2:r&1),e):(ke(e),null);case 22:case 23:return Ml(),n=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==n&&(e.flags|=8192),n&&e.mode&1?Fe&1073741824&&(ke(e),e.subtreeFlags&6&&(e.flags|=8192)):ke(e),null;case 24:return null;case 25:return null}throw Error(O(156,e.tag))}function qg(t,e){switch(bl(e),e.tag){case 1:return ze(e.type)&&yi(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ln(),ee(Le),ee(Ne),Pl(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Tl(e),null;case 13:if(ee(se),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(O(340));an()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ee(se),null;case 4:return ln(),null;case 10:return Sl(e.type._context),null;case 22:case 23:return Ml(),null;case 24:return null;default:return null}}var zs=!1,Se=!1,Kg=typeof WeakSet=="function"?WeakSet:Set,L=null;function qr(t,e){var r=t.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){ce(t,e,n)}else r.current=null}function To(t,e,r){try{r()}catch(n){ce(t,e,n)}}var su=!1;function Gg(t,e){if(ho=pi,t=rh(),wl(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else e:{r=(r=t.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var s=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var o=0,l=-1,c=-1,u=0,d=0,f=t,h=null;t:for(;;){for(var g;f!==r||s!==0&&f.nodeType!==3||(l=o+s),f!==i||n!==0&&f.nodeType!==3||(c=o+n),f.nodeType===3&&(o+=f.nodeValue.length),(g=f.firstChild)!==null;)h=f,f=g;for(;;){if(f===t)break t;if(h===r&&++u===s&&(l=o),h===i&&++d===n&&(c=o),(g=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=g}r=l===-1||c===-1?null:{start:l,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(fo={focusedElem:t,selectionRange:r},pi=!1,L=e;L!==null;)if(e=L,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,L=t;else for(;L!==null;){e=L;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var b=x.memoizedProps,j=x.memoizedState,y=e.stateNode,p=y.getSnapshotBeforeUpdate(e.elementType===e.type?b:lt(e.type,b),j);y.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var m=e.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(O(163))}}catch(N){ce(e,e.return,N)}if(t=e.sibling,t!==null){t.return=e.return,L=t;break}L=e.return}return x=su,su=!1,x}function Un(t,e,r){var n=e.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var s=n=n.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&To(e,r,i)}s=s.next}while(s!==n)}}function Qi(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var r=e=e.next;do{if((r.tag&t)===t){var n=r.create;r.destroy=n()}r=r.next}while(r!==e)}}function Po(t){var e=t.ref;if(e!==null){var r=t.stateNode;switch(t.tag){case 5:t=r;break;default:t=r}typeof e=="function"?e(t):e.current=t}}function Xh(t){var e=t.alternate;e!==null&&(t.alternate=null,Xh(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[yt],delete e[ss],delete e[go],delete e[Pg],delete e[Og])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Zh(t){return t.tag===5||t.tag===3||t.tag===4}function iu(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Zh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Oo(t,e,r){var n=t.tag;if(n===5||n===6)t=t.stateNode,e?r.nodeType===8?r.parentNode.insertBefore(t,e):r.insertBefore(t,e):(r.nodeType===8?(e=r.parentNode,e.insertBefore(t,r)):(e=r,e.appendChild(t)),r=r._reactRootContainer,r!=null||e.onclick!==null||(e.onclick=vi));else if(n!==4&&(t=t.child,t!==null))for(Oo(t,e,r),t=t.sibling;t!==null;)Oo(t,e,r),t=t.sibling}function Do(t,e,r){var n=t.tag;if(n===5||n===6)t=t.stateNode,e?r.insertBefore(t,e):r.appendChild(t);else if(n!==4&&(t=t.child,t!==null))for(Do(t,e,r),t=t.sibling;t!==null;)Do(t,e,r),t=t.sibling}var xe=null,ut=!1;function Rt(t,e,r){for(r=r.child;r!==null;)ef(t,e,r),r=r.sibling}function ef(t,e,r){if(wt&&typeof wt.onCommitFiberUnmount=="function")try{wt.onCommitFiberUnmount(Fi,r)}catch{}switch(r.tag){case 5:Se||qr(r,e);case 6:var n=xe,s=ut;xe=null,Rt(t,e,r),xe=n,ut=s,xe!==null&&(ut?(t=xe,r=r.stateNode,t.nodeType===8?t.parentNode.removeChild(r):t.removeChild(r)):xe.removeChild(r.stateNode));break;case 18:xe!==null&&(ut?(t=xe,r=r.stateNode,t.nodeType===8?ja(t.parentNode,r):t.nodeType===1&&ja(t,r),Zn(t)):ja(xe,r.stateNode));break;case 4:n=xe,s=ut,xe=r.stateNode.containerInfo,ut=!0,Rt(t,e,r),xe=n,ut=s;break;case 0:case 11:case 14:case 15:if(!Se&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){s=n=n.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&To(r,e,o),s=s.next}while(s!==n)}Rt(t,e,r);break;case 1:if(!Se&&(qr(r,e),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(l){ce(r,e,l)}Rt(t,e,r);break;case 21:Rt(t,e,r);break;case 22:r.mode&1?(Se=(n=Se)||r.memoizedState!==null,Rt(t,e,r),Se=n):Rt(t,e,r);break;default:Rt(t,e,r)}}function au(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var r=t.stateNode;r===null&&(r=t.stateNode=new Kg),e.forEach(function(n){var s=nv.bind(null,t,n);r.has(n)||(r.add(n),n.then(s,s))})}}function it(t,e){var r=e.deletions;if(r!==null)for(var n=0;n<r.length;n++){var s=r[n];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:xe=l.stateNode,ut=!1;break e;case 3:xe=l.stateNode.containerInfo,ut=!0;break e;case 4:xe=l.stateNode.containerInfo,ut=!0;break e}l=l.return}if(xe===null)throw Error(O(160));ef(i,o,s),xe=null,ut=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(u){ce(s,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)tf(e,t),e=e.sibling}function tf(t,e){var r=t.alternate,n=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(it(e,t),gt(t),n&4){try{Un(3,t,t.return),Qi(3,t)}catch(b){ce(t,t.return,b)}try{Un(5,t,t.return)}catch(b){ce(t,t.return,b)}}break;case 1:it(e,t),gt(t),n&512&&r!==null&&qr(r,r.return);break;case 5:if(it(e,t),gt(t),n&512&&r!==null&&qr(r,r.return),t.flags&32){var s=t.stateNode;try{Jn(s,"")}catch(b){ce(t,t.return,b)}}if(n&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=r!==null?r.memoizedProps:i,l=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&_d(s,i),to(l,o);var u=to(l,i);for(o=0;o<c.length;o+=2){var d=c[o],f=c[o+1];d==="style"?Cd(s,f):d==="dangerouslySetInnerHTML"?Nd(s,f):d==="children"?Jn(s,f):al(s,d,f,u)}switch(l){case"input":Qa(s,i);break;case"textarea":kd(s,i);break;case"select":var h=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var g=i.value;g!=null?Gr(s,!!i.multiple,g,!1):h!==!!i.multiple&&(i.defaultValue!=null?Gr(s,!!i.multiple,i.defaultValue,!0):Gr(s,!!i.multiple,i.multiple?[]:"",!1))}s[ss]=i}catch(b){ce(t,t.return,b)}}break;case 6:if(it(e,t),gt(t),n&4){if(t.stateNode===null)throw Error(O(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(b){ce(t,t.return,b)}}break;case 3:if(it(e,t),gt(t),n&4&&r!==null&&r.memoizedState.isDehydrated)try{Zn(e.containerInfo)}catch(b){ce(t,t.return,b)}break;case 4:it(e,t),gt(t);break;case 13:it(e,t),gt(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Bl=ue())),n&4&&au(t);break;case 22:if(d=r!==null&&r.memoizedState!==null,t.mode&1?(Se=(u=Se)||d,it(e,t),Se=u):it(e,t),gt(t),n&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!d&&t.mode&1)for(L=t,d=t.child;d!==null;){for(f=L=d;L!==null;){switch(h=L,g=h.child,h.tag){case 0:case 11:case 14:case 15:Un(4,h,h.return);break;case 1:qr(h,h.return);var x=h.stateNode;if(typeof x.componentWillUnmount=="function"){n=h,r=h.return;try{e=n,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(b){ce(n,r,b)}}break;case 5:qr(h,h.return);break;case 22:if(h.memoizedState!==null){lu(f);continue}}g!==null?(g.return=h,L=g):lu(f)}d=d.sibling}e:for(d=null,f=t;;){if(f.tag===5){if(d===null){d=f;try{s=f.stateNode,u?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=f.stateNode,c=f.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Ed("display",o))}catch(b){ce(t,t.return,b)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(b){ce(t,t.return,b)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:it(e,t),gt(t),n&4&&au(t);break;case 21:break;default:it(e,t),gt(t)}}function gt(t){var e=t.flags;if(e&2){try{e:{for(var r=t.return;r!==null;){if(Zh(r)){var n=r;break e}r=r.return}throw Error(O(160))}switch(n.tag){case 5:var s=n.stateNode;n.flags&32&&(Jn(s,""),n.flags&=-33);var i=iu(t);Do(t,i,s);break;case 3:case 4:var o=n.stateNode.containerInfo,l=iu(t);Oo(t,l,o);break;default:throw Error(O(161))}}catch(c){ce(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Jg(t,e,r){L=t,rf(t)}function rf(t,e,r){for(var n=(t.mode&1)!==0;L!==null;){var s=L,i=s.child;if(s.tag===22&&n){var o=s.memoizedState!==null||zs;if(!o){var l=s.alternate,c=l!==null&&l.memoizedState!==null||Se;l=zs;var u=Se;if(zs=o,(Se=c)&&!u)for(L=s;L!==null;)o=L,c=o.child,o.tag===22&&o.memoizedState!==null?cu(s):c!==null?(c.return=o,L=c):cu(s);for(;i!==null;)L=i,rf(i),i=i.sibling;L=s,zs=l,Se=u}ou(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,L=i):ou(t)}}function ou(t){for(;L!==null;){var e=L;if(e.flags&8772){var r=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Se||Qi(5,e);break;case 1:var n=e.stateNode;if(e.flags&4&&!Se)if(r===null)n.componentDidMount();else{var s=e.elementType===e.type?r.memoizedProps:lt(e.type,r.memoizedProps);n.componentDidUpdate(s,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&Hc(e,i,n);break;case 3:var o=e.updateQueue;if(o!==null){if(r=null,e.child!==null)switch(e.child.tag){case 5:r=e.child.stateNode;break;case 1:r=e.child.stateNode}Hc(e,o,r)}break;case 5:var l=e.stateNode;if(r===null&&e.flags&4){r=l;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&Zn(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(O(163))}Se||e.flags&512&&Po(e)}catch(h){ce(e,e.return,h)}}if(e===t){L=null;break}if(r=e.sibling,r!==null){r.return=e.return,L=r;break}L=e.return}}function lu(t){for(;L!==null;){var e=L;if(e===t){L=null;break}var r=e.sibling;if(r!==null){r.return=e.return,L=r;break}L=e.return}}function cu(t){for(;L!==null;){var e=L;try{switch(e.tag){case 0:case 11:case 15:var r=e.return;try{Qi(4,e)}catch(c){ce(e,r,c)}break;case 1:var n=e.stateNode;if(typeof n.componentDidMount=="function"){var s=e.return;try{n.componentDidMount()}catch(c){ce(e,s,c)}}var i=e.return;try{Po(e)}catch(c){ce(e,i,c)}break;case 5:var o=e.return;try{Po(e)}catch(c){ce(e,o,c)}}}catch(c){ce(e,e.return,c)}if(e===t){L=null;break}var l=e.sibling;if(l!==null){l.return=e.return,L=l;break}L=e.return}}var Qg=Math.ceil,Ci=Dt.ReactCurrentDispatcher,Ll=Dt.ReactCurrentOwner,et=Dt.ReactCurrentBatchConfig,K=0,ye=null,he=null,be=0,Fe=0,Kr=tr(0),ge=0,us=null,br=0,Yi=0,zl=0,Mn=null,Ae=null,Bl=0,un=1/0,jt=null,Ti=!1,Ro=null,Gt=null,Bs=!1,Mt=null,Pi=0,Fn=0,Ao=null,ii=-1,ai=0;function Pe(){return K&6?ue():ii!==-1?ii:ii=ue()}function Jt(t){return t.mode&1?K&2&&be!==0?be&-be:Rg.transition!==null?(ai===0&&(ai=Ud()),ai):(t=G,t!==0||(t=window.event,t=t===void 0?16:Kd(t.type)),t):1}function pt(t,e,r,n){if(50<Fn)throw Fn=0,Ao=null,Error(O(185));vs(t,r,n),(!(K&2)||t!==ye)&&(t===ye&&(!(K&2)&&(Yi|=r),ge===4&&zt(t,be)),Be(t,n),r===1&&K===0&&!(e.mode&1)&&(un=ue()+500,Ki&&rr()))}function Be(t,e){var r=t.callbackNode;Rm(t,e);var n=fi(t,t===ye?be:0);if(n===0)r!==null&&yc(r),t.callbackNode=null,t.callbackPriority=0;else if(e=n&-n,t.callbackPriority!==e){if(r!=null&&yc(r),e===1)t.tag===0?Dg(uu.bind(null,t)):hh(uu.bind(null,t)),Cg(function(){!(K&6)&&rr()}),r=null;else{switch(Md(n)){case 1:r=dl;break;case 4:r=zd;break;case 16:r=hi;break;case 536870912:r=Bd;break;default:r=hi}r=df(r,nf.bind(null,t))}t.callbackPriority=e,t.callbackNode=r}}function nf(t,e){if(ii=-1,ai=0,K&6)throw Error(O(327));var r=t.callbackNode;if(Zr()&&t.callbackNode!==r)return null;var n=fi(t,t===ye?be:0);if(n===0)return null;if(n&30||n&t.expiredLanes||e)e=Oi(t,n);else{e=n;var s=K;K|=2;var i=af();(ye!==t||be!==e)&&(jt=null,un=ue()+500,gr(t,e));do try{Zg();break}catch(l){sf(t,l)}while(1);kl(),Ci.current=i,K=s,he!==null?e=0:(ye=null,be=0,e=ge)}if(e!==0){if(e===2&&(s=ao(t),s!==0&&(n=s,e=Io(t,s))),e===1)throw r=us,gr(t,0),zt(t,n),Be(t,ue()),r;if(e===6)zt(t,n);else{if(s=t.current.alternate,!(n&30)&&!Yg(s)&&(e=Oi(t,n),e===2&&(i=ao(t),i!==0&&(n=i,e=Io(t,i))),e===1))throw r=us,gr(t,0),zt(t,n),Be(t,ue()),r;switch(t.finishedWork=s,t.finishedLanes=n,e){case 0:case 1:throw Error(O(345));case 2:lr(t,Ae,jt);break;case 3:if(zt(t,n),(n&130023424)===n&&(e=Bl+500-ue(),10<e)){if(fi(t,0)!==0)break;if(s=t.suspendedLanes,(s&n)!==n){Pe(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=mo(lr.bind(null,t,Ae,jt),e);break}lr(t,Ae,jt);break;case 4:if(zt(t,n),(n&4194240)===n)break;for(e=t.eventTimes,s=-1;0<n;){var o=31-ft(n);i=1<<o,o=e[o],o>s&&(s=o),n&=~i}if(n=s,n=ue()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*Qg(n/1960))-n,10<n){t.timeoutHandle=mo(lr.bind(null,t,Ae,jt),n);break}lr(t,Ae,jt);break;case 5:lr(t,Ae,jt);break;default:throw Error(O(329))}}}return Be(t,ue()),t.callbackNode===r?nf.bind(null,t):null}function Io(t,e){var r=Mn;return t.current.memoizedState.isDehydrated&&(gr(t,e).flags|=256),t=Oi(t,e),t!==2&&(e=Ae,Ae=r,e!==null&&$o(e)),t}function $o(t){Ae===null?Ae=t:Ae.push.apply(Ae,t)}function Yg(t){for(var e=t;;){if(e.flags&16384){var r=e.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var s=r[n],i=s.getSnapshot;s=s.value;try{if(!mt(i(),s))return!1}catch{return!1}}}if(r=e.child,e.subtreeFlags&16384&&r!==null)r.return=e,e=r;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function zt(t,e){for(e&=~zl,e&=~Yi,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var r=31-ft(e),n=1<<r;t[r]=-1,e&=~n}}function uu(t){if(K&6)throw Error(O(327));Zr();var e=fi(t,0);if(!(e&1))return Be(t,ue()),null;var r=Oi(t,e);if(t.tag!==0&&r===2){var n=ao(t);n!==0&&(e=n,r=Io(t,n))}if(r===1)throw r=us,gr(t,0),zt(t,e),Be(t,ue()),r;if(r===6)throw Error(O(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,lr(t,Ae,jt),Be(t,ue()),null}function Ul(t,e){var r=K;K|=1;try{return t(e)}finally{K=r,K===0&&(un=ue()+500,Ki&&rr())}}function jr(t){Mt!==null&&Mt.tag===0&&!(K&6)&&Zr();var e=K;K|=1;var r=et.transition,n=G;try{if(et.transition=null,G=1,t)return t()}finally{G=n,et.transition=r,K=e,!(K&6)&&rr()}}function Ml(){Fe=Kr.current,ee(Kr)}function gr(t,e){t.finishedWork=null,t.finishedLanes=0;var r=t.timeoutHandle;if(r!==-1&&(t.timeoutHandle=-1,Eg(r)),he!==null)for(r=he.return;r!==null;){var n=r;switch(bl(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&yi();break;case 3:ln(),ee(Le),ee(Ne),Pl();break;case 5:Tl(n);break;case 4:ln();break;case 13:ee(se);break;case 19:ee(se);break;case 10:Sl(n.type._context);break;case 22:case 23:Ml()}r=r.return}if(ye=t,he=t=Qt(t.current,null),be=Fe=e,ge=0,us=null,zl=Yi=br=0,Ae=Mn=null,fr!==null){for(e=0;e<fr.length;e++)if(r=fr[e],n=r.interleaved,n!==null){r.interleaved=null;var s=n.next,i=r.pending;if(i!==null){var o=i.next;i.next=s,n.next=o}r.pending=n}fr=null}return t}function sf(t,e){do{var r=he;try{if(kl(),ri.current=Ei,Ni){for(var n=ie.memoizedState;n!==null;){var s=n.queue;s!==null&&(s.pending=null),n=n.next}Ni=!1}if(xr=0,ve=me=ie=null,Bn=!1,os=0,Ll.current=null,r===null||r.return===null){ge=1,us=e,he=null;break}e:{var i=t,o=r.return,l=r,c=e;if(e=be,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=l,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var h=d.alternate;h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}var g=Yc(o);if(g!==null){g.flags&=-257,Xc(g,o,l,i,e),g.mode&1&&Qc(i,u,e),e=g,c=u;var x=e.updateQueue;if(x===null){var b=new Set;b.add(c),e.updateQueue=b}else x.add(c);break e}else{if(!(e&1)){Qc(i,u,e),Fl();break e}c=Error(O(426))}}else if(te&&l.mode&1){var j=Yc(o);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Xc(j,o,l,i,e),jl(cn(c,l));break e}}i=c=cn(c,l),ge!==4&&(ge=2),Mn===null?Mn=[i]:Mn.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var y=Mh(i,c,e);Vc(i,y);break e;case 1:l=c;var p=i.type,m=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Gt===null||!Gt.has(m)))){i.flags|=65536,e&=-e,i.lanes|=e;var N=Fh(i,l,e);Vc(i,N);break e}}i=i.return}while(i!==null)}lf(r)}catch(v){e=v,he===r&&r!==null&&(he=r=r.return);continue}break}while(1)}function af(){var t=Ci.current;return Ci.current=Ei,t===null?Ei:t}function Fl(){(ge===0||ge===3||ge===2)&&(ge=4),ye===null||!(br&268435455)&&!(Yi&268435455)||zt(ye,be)}function Oi(t,e){var r=K;K|=2;var n=af();(ye!==t||be!==e)&&(jt=null,gr(t,e));do try{Xg();break}catch(s){sf(t,s)}while(1);if(kl(),K=r,Ci.current=n,he!==null)throw Error(O(261));return ye=null,be=0,ge}function Xg(){for(;he!==null;)of(he)}function Zg(){for(;he!==null&&!km();)of(he)}function of(t){var e=uf(t.alternate,t,Fe);t.memoizedProps=t.pendingProps,e===null?lf(t):he=e,Ll.current=null}function lf(t){var e=t;do{var r=e.alternate;if(t=e.return,e.flags&32768){if(r=qg(r,e),r!==null){r.flags&=32767,he=r;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{ge=6,he=null;return}}else if(r=Hg(r,e,Fe),r!==null){he=r;return}if(e=e.sibling,e!==null){he=e;return}he=e=t}while(e!==null);ge===0&&(ge=5)}function lr(t,e,r){var n=G,s=et.transition;try{et.transition=null,G=1,ev(t,e,r,n)}finally{et.transition=s,G=n}return null}function ev(t,e,r,n){do Zr();while(Mt!==null);if(K&6)throw Error(O(327));r=t.finishedWork;var s=t.finishedLanes;if(r===null)return null;if(t.finishedWork=null,t.finishedLanes=0,r===t.current)throw Error(O(177));t.callbackNode=null,t.callbackPriority=0;var i=r.lanes|r.childLanes;if(Am(t,i),t===ye&&(he=ye=null,be=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Bs||(Bs=!0,df(hi,function(){return Zr(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=et.transition,et.transition=null;var o=G;G=1;var l=K;K|=4,Ll.current=null,Gg(t,r),tf(r,t),xg(fo),pi=!!ho,fo=ho=null,t.current=r,Jg(r),Sm(),K=l,G=o,et.transition=i}else t.current=r;if(Bs&&(Bs=!1,Mt=t,Pi=s),i=t.pendingLanes,i===0&&(Gt=null),Cm(r.stateNode),Be(t,ue()),e!==null)for(n=t.onRecoverableError,r=0;r<e.length;r++)s=e[r],n(s.value,{componentStack:s.stack,digest:s.digest});if(Ti)throw Ti=!1,t=Ro,Ro=null,t;return Pi&1&&t.tag!==0&&Zr(),i=t.pendingLanes,i&1?t===Ao?Fn++:(Fn=0,Ao=t):Fn=0,rr(),null}function Zr(){if(Mt!==null){var t=Md(Pi),e=et.transition,r=G;try{if(et.transition=null,G=16>t?16:t,Mt===null)var n=!1;else{if(t=Mt,Mt=null,Pi=0,K&6)throw Error(O(331));var s=K;for(K|=4,L=t.current;L!==null;){var i=L,o=i.child;if(L.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(L=u;L!==null;){var d=L;switch(d.tag){case 0:case 11:case 15:Un(8,d,i)}var f=d.child;if(f!==null)f.return=d,L=f;else for(;L!==null;){d=L;var h=d.sibling,g=d.return;if(Xh(d),d===u){L=null;break}if(h!==null){h.return=g,L=h;break}L=g}}}var x=i.alternate;if(x!==null){var b=x.child;if(b!==null){x.child=null;do{var j=b.sibling;b.sibling=null,b=j}while(b!==null)}}L=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,L=o;else e:for(;L!==null;){if(i=L,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Un(9,i,i.return)}var y=i.sibling;if(y!==null){y.return=i.return,L=y;break e}L=i.return}}var p=t.current;for(L=p;L!==null;){o=L;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,L=m;else e:for(o=p;L!==null;){if(l=L,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Qi(9,l)}}catch(v){ce(l,l.return,v)}if(l===o){L=null;break e}var N=l.sibling;if(N!==null){N.return=l.return,L=N;break e}L=l.return}}if(K=s,rr(),wt&&typeof wt.onPostCommitFiberRoot=="function")try{wt.onPostCommitFiberRoot(Fi,t)}catch{}n=!0}return n}finally{G=r,et.transition=e}}return!1}function du(t,e,r){e=cn(r,e),e=Mh(t,e,1),t=Kt(t,e,1),e=Pe(),t!==null&&(vs(t,1,e),Be(t,e))}function ce(t,e,r){if(t.tag===3)du(t,t,r);else for(;e!==null;){if(e.tag===3){du(e,t,r);break}else if(e.tag===1){var n=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Gt===null||!Gt.has(n))){t=cn(r,t),t=Fh(e,t,1),e=Kt(e,t,1),t=Pe(),e!==null&&(vs(e,1,t),Be(e,t));break}}e=e.return}}function tv(t,e,r){var n=t.pingCache;n!==null&&n.delete(e),e=Pe(),t.pingedLanes|=t.suspendedLanes&r,ye===t&&(be&r)===r&&(ge===4||ge===3&&(be&130023424)===be&&500>ue()-Bl?gr(t,0):zl|=r),Be(t,e)}function cf(t,e){e===0&&(t.mode&1?(e=Ts,Ts<<=1,!(Ts&130023424)&&(Ts=4194304)):e=1);var r=Pe();t=Pt(t,e),t!==null&&(vs(t,e,r),Be(t,r))}function rv(t){var e=t.memoizedState,r=0;e!==null&&(r=e.retryLane),cf(t,r)}function nv(t,e){var r=0;switch(t.tag){case 13:var n=t.stateNode,s=t.memoizedState;s!==null&&(r=s.retryLane);break;case 19:n=t.stateNode;break;default:throw Error(O(314))}n!==null&&n.delete(e),cf(t,r)}var uf;uf=function(t,e,r){if(t!==null)if(t.memoizedProps!==e.pendingProps||Le.current)$e=!0;else{if(!(t.lanes&r)&&!(e.flags&128))return $e=!1,Vg(t,e,r);$e=!!(t.flags&131072)}else $e=!1,te&&e.flags&1048576&&fh(e,bi,e.index);switch(e.lanes=0,e.tag){case 2:var n=e.type;si(t,e),t=e.pendingProps;var s=sn(e,Ne.current);Xr(e,r),s=Dl(null,e,n,t,s,r);var i=Rl();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ze(n)?(i=!0,wi(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,El(e),s.updater=Ji,e.stateNode=s,s._reactInternals=e,jo(e,n,t,r),e=So(null,e,n,!0,i,r)):(e.tag=0,te&&i&&xl(e),Ce(null,e,s,r),e=e.child),e;case 16:n=e.elementType;e:{switch(si(t,e),t=e.pendingProps,s=n._init,n=s(n._payload),e.type=n,s=e.tag=iv(n),t=lt(n,t),s){case 0:e=ko(null,e,n,t,r);break e;case 1:e=tu(null,e,n,t,r);break e;case 11:e=Zc(null,e,n,t,r);break e;case 14:e=eu(null,e,n,lt(n.type,t),r);break e}throw Error(O(306,n,""))}return e;case 0:return n=e.type,s=e.pendingProps,s=e.elementType===n?s:lt(n,s),ko(t,e,n,s,r);case 1:return n=e.type,s=e.pendingProps,s=e.elementType===n?s:lt(n,s),tu(t,e,n,s,r);case 3:e:{if(qh(e),t===null)throw Error(O(387));n=e.pendingProps,i=e.memoizedState,s=i.element,wh(t,e),ki(e,n,null,r);var o=e.memoizedState;if(n=o.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=cn(Error(O(423)),e),e=ru(t,e,n,r,s);break e}else if(n!==s){s=cn(Error(O(424)),e),e=ru(t,e,n,r,s);break e}else for(He=qt(e.stateNode.containerInfo.firstChild),qe=e,te=!0,ht=null,r=vh(e,null,n,r),e.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(an(),n===s){e=Ot(t,e,r);break e}Ce(t,e,n,r)}e=e.child}return e;case 5:return xh(e),t===null&&wo(e),n=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,po(n,s)?o=null:i!==null&&po(n,i)&&(e.flags|=32),Hh(t,e),Ce(t,e,o,r),e.child;case 6:return t===null&&wo(e),null;case 13:return Kh(t,e,r);case 4:return Cl(e,e.stateNode.containerInfo),n=e.pendingProps,t===null?e.child=on(e,null,n,r):Ce(t,e,n,r),e.child;case 11:return n=e.type,s=e.pendingProps,s=e.elementType===n?s:lt(n,s),Zc(t,e,n,s,r);case 7:return Ce(t,e,e.pendingProps,r),e.child;case 8:return Ce(t,e,e.pendingProps.children,r),e.child;case 12:return Ce(t,e,e.pendingProps.children,r),e.child;case 10:e:{if(n=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,Q(ji,n._currentValue),n._currentValue=o,i!==null)if(mt(i.value,o)){if(i.children===s.children&&!Le.current){e=Ot(t,e,r);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var c=l.firstContext;c!==null;){if(c.context===n){if(i.tag===1){c=Et(-1,r&-r),c.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}i.lanes|=r,c=i.alternate,c!==null&&(c.lanes|=r),xo(i.return,r,e),l.lanes|=r;break}c=c.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(O(341));o.lanes|=r,l=o.alternate,l!==null&&(l.lanes|=r),xo(o,r,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Ce(t,e,s.children,r),e=e.child}return e;case 9:return s=e.type,n=e.pendingProps.children,Xr(e,r),s=tt(s),n=n(s),e.flags|=1,Ce(t,e,n,r),e.child;case 14:return n=e.type,s=lt(n,e.pendingProps),s=lt(n.type,s),eu(t,e,n,s,r);case 15:return Wh(t,e,e.type,e.pendingProps,r);case 17:return n=e.type,s=e.pendingProps,s=e.elementType===n?s:lt(n,s),si(t,e),e.tag=1,ze(n)?(t=!0,wi(e)):t=!1,Xr(e,r),Uh(e,n,s),jo(e,n,s,r),So(null,e,n,!0,t,r);case 19:return Gh(t,e,r);case 22:return Vh(t,e,r)}throw Error(O(156,e.tag))};function df(t,e){return Ld(t,e)}function sv(t,e,r,n){this.tag=t,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ze(t,e,r,n){return new sv(t,e,r,n)}function Wl(t){return t=t.prototype,!(!t||!t.isReactComponent)}function iv(t){if(typeof t=="function")return Wl(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ll)return 11;if(t===cl)return 14}return 2}function Qt(t,e){var r=t.alternate;return r===null?(r=Ze(t.tag,e,t.key,t.mode),r.elementType=t.elementType,r.type=t.type,r.stateNode=t.stateNode,r.alternate=t,t.alternate=r):(r.pendingProps=e,r.type=t.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=t.flags&14680064,r.childLanes=t.childLanes,r.lanes=t.lanes,r.child=t.child,r.memoizedProps=t.memoizedProps,r.memoizedState=t.memoizedState,r.updateQueue=t.updateQueue,e=t.dependencies,r.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},r.sibling=t.sibling,r.index=t.index,r.ref=t.ref,r}function oi(t,e,r,n,s,i){var o=2;if(n=t,typeof t=="function")Wl(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Lr:return vr(r.children,s,i,e);case ol:o=8,s|=8;break;case Ha:return t=Ze(12,r,e,s|2),t.elementType=Ha,t.lanes=i,t;case qa:return t=Ze(13,r,e,s),t.elementType=qa,t.lanes=i,t;case Ka:return t=Ze(19,r,e,s),t.elementType=Ka,t.lanes=i,t;case xd:return Xi(r,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case yd:o=10;break e;case wd:o=9;break e;case ll:o=11;break e;case cl:o=14;break e;case It:o=16,n=null;break e}throw Error(O(130,t==null?t:typeof t,""))}return e=Ze(o,r,e,s),e.elementType=t,e.type=n,e.lanes=i,e}function vr(t,e,r,n){return t=Ze(7,t,n,e),t.lanes=r,t}function Xi(t,e,r,n){return t=Ze(22,t,n,e),t.elementType=xd,t.lanes=r,t.stateNode={isHidden:!1},t}function Pa(t,e,r){return t=Ze(6,t,null,e),t.lanes=r,t}function Oa(t,e,r){return e=Ze(4,t.children!==null?t.children:[],t.key,e),e.lanes=r,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function av(t,e,r,n,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=da(0),this.expirationTimes=da(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=da(0),this.identifierPrefix=n,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Vl(t,e,r,n,s,i,o,l,c){return t=new av(t,e,r,l,c),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Ze(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},El(i),t}function ov(t,e,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:$r,key:n==null?null:""+n,children:t,containerInfo:e,implementation:r}}function hf(t){if(!t)return Zt;t=t._reactInternals;e:{if(kr(t)!==t||t.tag!==1)throw Error(O(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(ze(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(O(171))}if(t.tag===1){var r=t.type;if(ze(r))return dh(t,r,e)}return e}function ff(t,e,r,n,s,i,o,l,c){return t=Vl(r,n,!0,t,s,i,o,l,c),t.context=hf(null),r=t.current,n=Pe(),s=Jt(r),i=Et(n,s),i.callback=e??null,Kt(r,i,s),t.current.lanes=s,vs(t,s,n),Be(t,n),t}function Zi(t,e,r,n){var s=e.current,i=Pe(),o=Jt(s);return r=hf(r),e.context===null?e.context=r:e.pendingContext=r,e=Et(i,o),e.payload={element:t},n=n===void 0?null:n,n!==null&&(e.callback=n),t=Kt(s,e,o),t!==null&&(pt(t,s,o,i),ti(t,s,o)),o}function Di(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function hu(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var r=t.retryLane;t.retryLane=r!==0&&r<e?r:e}}function Hl(t,e){hu(t,e),(t=t.alternate)&&hu(t,e)}function lv(){return null}var pf=typeof reportError=="function"?reportError:function(t){console.error(t)};function ql(t){this._internalRoot=t}ea.prototype.render=ql.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(O(409));Zi(t,e,null,null)};ea.prototype.unmount=ql.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;jr(function(){Zi(null,t,null,null)}),e[Tt]=null}};function ea(t){this._internalRoot=t}ea.prototype.unstable_scheduleHydration=function(t){if(t){var e=Vd();t={blockedOn:null,target:t,priority:e};for(var r=0;r<Lt.length&&e!==0&&e<Lt[r].priority;r++);Lt.splice(r,0,t),r===0&&qd(t)}};function Kl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ta(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function fu(){}function cv(t,e,r,n,s){if(s){if(typeof n=="function"){var i=n;n=function(){var u=Di(o);i.call(u)}}var o=ff(e,n,t,0,null,!1,!1,"",fu);return t._reactRootContainer=o,t[Tt]=o.current,rs(t.nodeType===8?t.parentNode:t),jr(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof n=="function"){var l=n;n=function(){var u=Di(c);l.call(u)}}var c=Vl(t,0,!1,null,null,!1,!1,"",fu);return t._reactRootContainer=c,t[Tt]=c.current,rs(t.nodeType===8?t.parentNode:t),jr(function(){Zi(e,c,r,n)}),c}function ra(t,e,r,n,s){var i=r._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var c=Di(o);l.call(c)}}Zi(e,o,t,s)}else o=cv(r,e,t,s,n);return Di(o)}Fd=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var r=On(e.pendingLanes);r!==0&&(hl(e,r|1),Be(e,ue()),!(K&6)&&(un=ue()+500,rr()))}break;case 13:jr(function(){var n=Pt(t,1);if(n!==null){var s=Pe();pt(n,t,1,s)}}),Hl(t,1)}};fl=function(t){if(t.tag===13){var e=Pt(t,134217728);if(e!==null){var r=Pe();pt(e,t,134217728,r)}Hl(t,134217728)}};Wd=function(t){if(t.tag===13){var e=Jt(t),r=Pt(t,e);if(r!==null){var n=Pe();pt(r,t,e,n)}Hl(t,e)}};Vd=function(){return G};Hd=function(t,e){var r=G;try{return G=t,e()}finally{G=r}};no=function(t,e,r){switch(e){case"input":if(Qa(t,r),e=r.name,r.type==="radio"&&e!=null){for(r=t;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<r.length;e++){var n=r[e];if(n!==t&&n.form===t.form){var s=qi(n);if(!s)throw Error(O(90));jd(n),Qa(n,s)}}}break;case"textarea":kd(t,r);break;case"select":e=r.value,e!=null&&Gr(t,!!r.multiple,e,!1)}};Od=Ul;Dd=jr;var uv={usingClientEntryPoint:!1,Events:[ws,Mr,qi,Td,Pd,Ul]},Cn={findFiberByHostInstance:hr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},dv={bundleType:Cn.bundleType,version:Cn.version,rendererPackageName:Cn.rendererPackageName,rendererConfig:Cn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Dt.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Id(t),t===null?null:t.stateNode},findFiberByHostInstance:Cn.findFiberByHostInstance||lv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Us=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Us.isDisabled&&Us.supportsFiber)try{Fi=Us.inject(dv),wt=Us}catch{}}Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=uv;Ge.createPortal=function(t,e){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Kl(e))throw Error(O(200));return ov(t,e,null,r)};Ge.createRoot=function(t,e){if(!Kl(t))throw Error(O(299));var r=!1,n="",s=pf;return e!=null&&(e.unstable_strictMode===!0&&(r=!0),e.identifierPrefix!==void 0&&(n=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=Vl(t,1,!1,null,null,r,!1,n,s),t[Tt]=e.current,rs(t.nodeType===8?t.parentNode:t),new ql(e)};Ge.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(O(188)):(t=Object.keys(t).join(","),Error(O(268,t)));return t=Id(e),t=t===null?null:t.stateNode,t};Ge.flushSync=function(t){return jr(t)};Ge.hydrate=function(t,e,r){if(!ta(e))throw Error(O(200));return ra(null,t,e,!0,r)};Ge.hydrateRoot=function(t,e,r){if(!Kl(t))throw Error(O(405));var n=r!=null&&r.hydratedSources||null,s=!1,i="",o=pf;if(r!=null&&(r.unstable_strictMode===!0&&(s=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(o=r.onRecoverableError)),e=ff(e,null,t,1,r??null,s,!1,i,o),t[Tt]=e.current,rs(t),n)for(t=0;t<n.length;t++)r=n[t],s=r._getVersion,s=s(r._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[r,s]:e.mutableSourceEagerHydrationData.push(r,s);return new ea(e)};Ge.render=function(t,e,r){if(!ta(e))throw Error(O(200));return ra(null,t,e,!1,r)};Ge.unmountComponentAtNode=function(t){if(!ta(t))throw Error(O(40));return t._reactRootContainer?(jr(function(){ra(null,null,t,!1,function(){t._reactRootContainer=null,t[Tt]=null})}),!0):!1};Ge.unstable_batchedUpdates=Ul;Ge.unstable_renderSubtreeIntoContainer=function(t,e,r,n){if(!ta(r))throw Error(O(200));if(t==null||t._reactInternals===void 0)throw Error(O(38));return ra(t,e,r,!1,n)};Ge.version="18.3.1-next-f1338f8080-20240426";function mf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mf)}catch(t){console.error(t)}}mf(),pd.exports=Ge;var hv=pd.exports,pu=hv;Wa.createRoot=pu.createRoot,Wa.hydrateRoot=pu.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ds(){return ds=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},ds.apply(this,arguments)}var Ft;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Ft||(Ft={}));const mu="popstate";function fv(t){t===void 0&&(t={});function e(n,s){let{pathname:i,search:o,hash:l}=n.location;return Lo("",{pathname:i,search:o,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function r(n,s){return typeof s=="string"?s:Ri(s)}return mv(e,r,null,t)}function fe(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function gf(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function pv(){return Math.random().toString(36).substr(2,8)}function gu(t,e){return{usr:t.state,key:t.key,idx:e}}function Lo(t,e,r,n){return r===void 0&&(r=null),ds({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?gn(e):e,{state:r,key:e&&e.key||n||pv()})}function Ri(t){let{pathname:e="/",search:r="",hash:n=""}=t;return r&&r!=="?"&&(e+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function gn(t){let e={};if(t){let r=t.indexOf("#");r>=0&&(e.hash=t.substr(r),t=t.substr(0,r));let n=t.indexOf("?");n>=0&&(e.search=t.substr(n),t=t.substr(0,n)),t&&(e.pathname=t)}return e}function mv(t,e,r,n){n===void 0&&(n={});let{window:s=document.defaultView,v5Compat:i=!1}=n,o=s.history,l=Ft.Pop,c=null,u=d();u==null&&(u=0,o.replaceState(ds({},o.state,{idx:u}),""));function d(){return(o.state||{idx:null}).idx}function f(){l=Ft.Pop;let j=d(),y=j==null?null:j-u;u=j,c&&c({action:l,location:b.location,delta:y})}function h(j,y){l=Ft.Push;let p=Lo(b.location,j,y);r&&r(p,j),u=d()+1;let m=gu(p,u),N=b.createHref(p);try{o.pushState(m,"",N)}catch(v){if(v instanceof DOMException&&v.name==="DataCloneError")throw v;s.location.assign(N)}i&&c&&c({action:l,location:b.location,delta:1})}function g(j,y){l=Ft.Replace;let p=Lo(b.location,j,y);r&&r(p,j),u=d();let m=gu(p,u),N=b.createHref(p);o.replaceState(m,"",N),i&&c&&c({action:l,location:b.location,delta:0})}function x(j){let y=s.location.origin!=="null"?s.location.origin:s.location.href,p=typeof j=="string"?j:Ri(j);return p=p.replace(/ $/,"%20"),fe(y,"No window.location.(origin|href) available to create URL for href: "+p),new URL(p,y)}let b={get action(){return l},get location(){return t(s,o)},listen(j){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(mu,f),c=j,()=>{s.removeEventListener(mu,f),c=null}},createHref(j){return e(s,j)},createURL:x,encodeLocation(j){let y=x(j);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:h,replace:g,go(j){return o.go(j)}};return b}var vu;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(vu||(vu={}));function gv(t,e,r){return r===void 0&&(r="/"),vv(t,e,r,!1)}function vv(t,e,r,n){let s=typeof e=="string"?gn(e):e,i=Gl(s.pathname||"/",r);if(i==null)return null;let o=vf(t);yv(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let u=Tv(i);l=Ev(o[c],u,n)}return l}function vf(t,e,r,n){e===void 0&&(e=[]),r===void 0&&(r=[]),n===void 0&&(n="");let s=(i,o,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&(fe(c.relativePath.startsWith(n),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(n.length));let u=Yt([n,c.relativePath]),d=r.concat(c);i.children&&i.children.length>0&&(fe(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),vf(i.children,e,d,u)),!(i.path==null&&!i.index)&&e.push({path:u,score:Sv(u,i.index),routesMeta:d})};return t.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,o);else for(let c of yf(i.path))s(i,o,c)}),e}function yf(t){let e=t.split("/");if(e.length===0)return[];let[r,...n]=e,s=r.endsWith("?"),i=r.replace(/\?$/,"");if(n.length===0)return s?[i,""]:[i];let o=yf(n.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...o),l.map(c=>t.startsWith("/")&&c===""?"/":c)}function yv(t){t.sort((e,r)=>e.score!==r.score?r.score-e.score:Nv(e.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const wv=/^:[\w-]+$/,xv=3,bv=2,jv=1,_v=10,kv=-2,yu=t=>t==="*";function Sv(t,e){let r=t.split("/"),n=r.length;return r.some(yu)&&(n+=kv),e&&(n+=bv),r.filter(s=>!yu(s)).reduce((s,i)=>s+(wv.test(i)?xv:i===""?jv:_v),n)}function Nv(t,e){return t.length===e.length&&t.slice(0,-1).every((n,s)=>n===e[s])?t[t.length-1]-e[e.length-1]:0}function Ev(t,e,r){r===void 0&&(r=!1);let{routesMeta:n}=t,s={},i="/",o=[];for(let l=0;l<n.length;++l){let c=n[l],u=l===n.length-1,d=i==="/"?e:e.slice(i.length)||"/",f=wu({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},d),h=c.route;if(!f&&u&&r&&!n[n.length-1].route.index&&(f=wu({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},d)),!f)return null;Object.assign(s,f.params),o.push({params:s,pathname:Yt([i,f.pathname]),pathnameBase:Rv(Yt([i,f.pathnameBase])),route:h}),f.pathnameBase!=="/"&&(i=Yt([i,f.pathnameBase]))}return o}function wu(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[r,n]=Cv(t.path,t.caseSensitive,t.end),s=e.match(r);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:n.reduce((u,d,f)=>{let{paramName:h,isOptional:g}=d;if(h==="*"){let b=l[f]||"";o=i.slice(0,i.length-b.length).replace(/(.)\/+$/,"$1")}const x=l[f];return g&&!x?u[h]=void 0:u[h]=(x||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:o,pattern:t}}function Cv(t,e,r){e===void 0&&(e=!1),r===void 0&&(r=!0),gf(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let n=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c)=>(n.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(n.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),n]}function Tv(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return gf(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Gl(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let r=e.endsWith("/")?e.length-1:e.length,n=t.charAt(r);return n&&n!=="/"?null:t.slice(r)||"/"}function Pv(t,e){e===void 0&&(e="/");let{pathname:r,search:n="",hash:s=""}=typeof t=="string"?gn(t):t;return{pathname:r?r.startsWith("/")?r:Ov(r,e):e,search:Av(n),hash:Iv(s)}}function Ov(t,e){let r=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?r.length>1&&r.pop():s!=="."&&r.push(s)}),r.length>1?r.join("/"):"/"}function Da(t,e,r,n){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Dv(t){return t.filter((e,r)=>r===0||e.route.path&&e.route.path.length>0)}function wf(t,e){let r=Dv(t);return e?r.map((n,s)=>s===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function xf(t,e,r,n){n===void 0&&(n=!1);let s;typeof t=="string"?s=gn(t):(s=ds({},t),fe(!s.pathname||!s.pathname.includes("?"),Da("?","pathname","search",s)),fe(!s.pathname||!s.pathname.includes("#"),Da("#","pathname","hash",s)),fe(!s.search||!s.search.includes("#"),Da("#","search","hash",s)));let i=t===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=r;else{let f=e.length-1;if(!n&&o.startsWith("..")){let h=o.split("/");for(;h[0]==="..";)h.shift(),f-=1;s.pathname=h.join("/")}l=f>=0?e[f]:"/"}let c=Pv(s,l),u=o&&o!=="/"&&o.endsWith("/"),d=(i||o===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}const Yt=t=>t.join("/").replace(/\/\/+/g,"/"),Rv=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),Av=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,Iv=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function $v(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const bf=["post","put","patch","delete"];new Set(bf);const Lv=["get",...bf];new Set(Lv);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function hs(){return hs=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},hs.apply(this,arguments)}const Jl=_.createContext(null),zv=_.createContext(null),Sr=_.createContext(null),na=_.createContext(null),Nr=_.createContext({outlet:null,matches:[],isDataRoute:!1}),jf=_.createContext(null);function Bv(t,e){let{relative:r}=e===void 0?{}:e;bs()||fe(!1);let{basename:n,navigator:s}=_.useContext(Sr),{hash:i,pathname:o,search:l}=kf(t,{relative:r}),c=o;return n!=="/"&&(c=o==="/"?n:Yt([n,o])),s.createHref({pathname:c,search:l,hash:i})}function bs(){return _.useContext(na)!=null}function js(){return bs()||fe(!1),_.useContext(na).location}function _f(t){_.useContext(Sr).static||_.useLayoutEffect(t)}function Ql(){let{isDataRoute:t}=_.useContext(Nr);return t?Xv():Uv()}function Uv(){bs()||fe(!1);let t=_.useContext(Jl),{basename:e,future:r,navigator:n}=_.useContext(Sr),{matches:s}=_.useContext(Nr),{pathname:i}=js(),o=JSON.stringify(wf(s,r.v7_relativeSplatPath)),l=_.useRef(!1);return _f(()=>{l.current=!0}),_.useCallback(function(u,d){if(d===void 0&&(d={}),!l.current)return;if(typeof u=="number"){n.go(u);return}let f=xf(u,JSON.parse(o),i,d.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Yt([e,f.pathname])),(d.replace?n.replace:n.push)(f,d.state,d)},[e,n,o,i,t])}function kf(t,e){let{relative:r}=e===void 0?{}:e,{future:n}=_.useContext(Sr),{matches:s}=_.useContext(Nr),{pathname:i}=js(),o=JSON.stringify(wf(s,n.v7_relativeSplatPath));return _.useMemo(()=>xf(t,JSON.parse(o),i,r==="path"),[t,o,i,r])}function Mv(t,e){return Fv(t,e)}function Fv(t,e,r,n){bs()||fe(!1);let{navigator:s}=_.useContext(Sr),{matches:i}=_.useContext(Nr),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let u=js(),d;if(e){var f;let j=typeof e=="string"?gn(e):e;c==="/"||(f=j.pathname)!=null&&f.startsWith(c)||fe(!1),d=j}else d=u;let h=d.pathname||"/",g=h;if(c!=="/"){let j=c.replace(/^\//,"").split("/");g="/"+h.replace(/^\//,"").split("/").slice(j.length).join("/")}let x=gv(t,{pathname:g}),b=Kv(x&&x.map(j=>Object.assign({},j,{params:Object.assign({},l,j.params),pathname:Yt([c,s.encodeLocation?s.encodeLocation(j.pathname).pathname:j.pathname]),pathnameBase:j.pathnameBase==="/"?c:Yt([c,s.encodeLocation?s.encodeLocation(j.pathnameBase).pathname:j.pathnameBase])})),i,r,n);return e&&b?_.createElement(na.Provider,{value:{location:hs({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:Ft.Pop}},b):b}function Wv(){let t=Yv(),e=$v(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),r=t instanceof Error?t.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},i=null;return _.createElement(_.Fragment,null,_.createElement("h2",null,"Unexpected Application Error!"),_.createElement("h3",{style:{fontStyle:"italic"}},e),r?_.createElement("pre",{style:s},r):null,i)}const Vv=_.createElement(Wv,null);class Hv extends _.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,r){return r.location!==e.location||r.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:r.error,location:r.location,revalidation:e.revalidation||r.revalidation}}componentDidCatch(e,r){console.error("React Router caught the following error during render",e,r)}render(){return this.state.error!==void 0?_.createElement(Nr.Provider,{value:this.props.routeContext},_.createElement(jf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function qv(t){let{routeContext:e,match:r,children:n}=t,s=_.useContext(Jl);return s&&s.static&&s.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=r.route.id),_.createElement(Nr.Provider,{value:e},n)}function Kv(t,e,r,n){var s;if(e===void 0&&(e=[]),r===void 0&&(r=null),n===void 0&&(n=null),t==null){var i;if(!r)return null;if(r.errors)t=r.matches;else if((i=n)!=null&&i.v7_partialHydration&&e.length===0&&!r.initialized&&r.matches.length>0)t=r.matches;else return null}let o=t,l=(s=r)==null?void 0:s.errors;if(l!=null){let d=o.findIndex(f=>f.route.id&&(l==null?void 0:l[f.route.id])!==void 0);d>=0||fe(!1),o=o.slice(0,Math.min(o.length,d+1))}let c=!1,u=-1;if(r&&n&&n.v7_partialHydration)for(let d=0;d<o.length;d++){let f=o[d];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(u=d),f.route.id){let{loaderData:h,errors:g}=r,x=f.route.loader&&h[f.route.id]===void 0&&(!g||g[f.route.id]===void 0);if(f.route.lazy||x){c=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((d,f,h)=>{let g,x=!1,b=null,j=null;r&&(g=l&&f.route.id?l[f.route.id]:void 0,b=f.route.errorElement||Vv,c&&(u<0&&h===0?(Zv("route-fallback",!1),x=!0,j=null):u===h&&(x=!0,j=f.route.hydrateFallbackElement||null)));let y=e.concat(o.slice(0,h+1)),p=()=>{let m;return g?m=b:x?m=j:f.route.Component?m=_.createElement(f.route.Component,null):f.route.element?m=f.route.element:m=d,_.createElement(qv,{match:f,routeContext:{outlet:d,matches:y,isDataRoute:r!=null},children:m})};return r&&(f.route.ErrorBoundary||f.route.errorElement||h===0)?_.createElement(Hv,{location:r.location,revalidation:r.revalidation,component:b,error:g,children:p(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):p()},null)}var Sf=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(Sf||{}),Ai=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(Ai||{});function Gv(t){let e=_.useContext(Jl);return e||fe(!1),e}function Jv(t){let e=_.useContext(zv);return e||fe(!1),e}function Qv(t){let e=_.useContext(Nr);return e||fe(!1),e}function Nf(t){let e=Qv(),r=e.matches[e.matches.length-1];return r.route.id||fe(!1),r.route.id}function Yv(){var t;let e=_.useContext(jf),r=Jv(Ai.UseRouteError),n=Nf(Ai.UseRouteError);return e!==void 0?e:(t=r.errors)==null?void 0:t[n]}function Xv(){let{router:t}=Gv(Sf.UseNavigateStable),e=Nf(Ai.UseNavigateStable),r=_.useRef(!1);return _f(()=>{r.current=!0}),_.useCallback(function(s,i){i===void 0&&(i={}),r.current&&(typeof s=="number"?t.navigate(s):t.navigate(s,hs({fromRouteId:e},i)))},[t,e])}const xu={};function Zv(t,e,r){!e&&!xu[t]&&(xu[t]=!0)}function ey(t,e){t==null||t.v7_startTransition,(t==null?void 0:t.v7_relativeSplatPath)===void 0&&(!e||e.v7_relativeSplatPath),e&&(e.v7_fetcherPersist,e.v7_normalizeFormMethod,e.v7_partialHydration,e.v7_skipActionErrorRevalidation)}function Me(t){fe(!1)}function ty(t){let{basename:e="/",children:r=null,location:n,navigationType:s=Ft.Pop,navigator:i,static:o=!1,future:l}=t;bs()&&fe(!1);let c=e.replace(/^\/*/,"/"),u=_.useMemo(()=>({basename:c,navigator:i,static:o,future:hs({v7_relativeSplatPath:!1},l)}),[c,l,i,o]);typeof n=="string"&&(n=gn(n));let{pathname:d="/",search:f="",hash:h="",state:g=null,key:x="default"}=n,b=_.useMemo(()=>{let j=Gl(d,c);return j==null?null:{location:{pathname:j,search:f,hash:h,state:g,key:x},navigationType:s}},[c,d,f,h,g,x,s]);return b==null?null:_.createElement(Sr.Provider,{value:u},_.createElement(na.Provider,{children:r,value:b}))}function bu(t){let{children:e,location:r}=t;return Mv(zo(e),r)}new Promise(()=>{});function zo(t,e){e===void 0&&(e=[]);let r=[];return _.Children.forEach(t,(n,s)=>{if(!_.isValidElement(n))return;let i=[...e,s];if(n.type===_.Fragment){r.push.apply(r,zo(n.props.children,i));return}n.type!==Me&&fe(!1),!n.props.index||!n.props.children||fe(!1);let o={id:n.props.id||i.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(o.children=zo(n.props.children,i)),r.push(o)}),r}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Bo(){return Bo=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},Bo.apply(this,arguments)}function ry(t,e){if(t==null)return{};var r={},n=Object.keys(t),s,i;for(i=0;i<n.length;i++)s=n[i],!(e.indexOf(s)>=0)&&(r[s]=t[s]);return r}function ny(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function sy(t,e){return t.button===0&&(!e||e==="_self")&&!ny(t)}const iy=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],ay="6";try{window.__reactRouterVersion=ay}catch{}const oy="startTransition",ju=tm[oy];function ly(t){let{basename:e,children:r,future:n,window:s}=t,i=_.useRef();i.current==null&&(i.current=fv({window:s,v5Compat:!0}));let o=i.current,[l,c]=_.useState({action:o.action,location:o.location}),{v7_startTransition:u}=n||{},d=_.useCallback(f=>{u&&ju?ju(()=>c(f)):c(f)},[c,u]);return _.useLayoutEffect(()=>o.listen(d),[o,d]),_.useEffect(()=>ey(n),[n]),_.createElement(ty,{basename:e,children:r,location:l.location,navigationType:l.action,navigator:o,future:n})}const cy=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",uy=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Wn=_.forwardRef(function(e,r){let{onClick:n,relative:s,reloadDocument:i,replace:o,state:l,target:c,to:u,preventScrollReset:d,viewTransition:f}=e,h=ry(e,iy),{basename:g}=_.useContext(Sr),x,b=!1;if(typeof u=="string"&&uy.test(u)&&(x=u,cy))try{let m=new URL(window.location.href),N=u.startsWith("//")?new URL(m.protocol+u):new URL(u),v=Gl(N.pathname,g);N.origin===m.origin&&v!=null?u=v+N.search+N.hash:b=!0}catch{}let j=Bv(u,{relative:s}),y=dy(u,{replace:o,state:l,target:c,preventScrollReset:d,relative:s,viewTransition:f});function p(m){n&&n(m),m.defaultPrevented||y(m)}return _.createElement("a",Bo({},h,{href:x||j,onClick:b||i?n:p,ref:r,target:c}))});var _u;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(_u||(_u={}));var ku;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(ku||(ku={}));function dy(t,e){let{target:r,replace:n,state:s,preventScrollReset:i,relative:o,viewTransition:l}=e===void 0?{}:e,c=Ql(),u=js(),d=kf(t,{relative:o});return _.useCallback(f=>{if(sy(f,r)){f.preventDefault();let h=n!==void 0?n:Ri(u)===Ri(d);c(t,{replace:h,state:s,preventScrollReset:i,relative:o,viewTransition:l})}},[u,c,d,n,s,r,t,i,o,l])}const en={MEMBER:"member",LEADER:"leader",DIRECTOR:"director"},hy={[en.MEMBER]:["view_schedules","view_team","view_announcements"],[en.LEADER]:["view_schedules","view_team","view_announcements","edit_schedules","submit_orders","edit_team"],[en.DIRECTOR]:["view_schedules","view_team","view_announcements","edit_schedules","submit_orders","edit_team","edit_announcements","approve_orders","manage_users"]},li=(t,e="solarpack2024")=>btoa(t+e).replace(/[^a-zA-Z0-9]/g,""),fy={[li("director")]:en.DIRECTOR,[li("leader")]:en.LEADER,[li("member")]:en.MEMBER};class py{constructor(){this.currentUser=this.loadFromStorage()}authenticate(e){const r=li(e),n=fy[r];return n?(this.currentUser={level:n,permissions:hy[n],loginTime:Date.now(),expiresAt:Date.now()+24*60*60*1e3},this.saveToStorage(),!0):!1}logout(){this.currentUser=null,localStorage.removeItem("solarpack_auth")}isAuthenticated(){return this.currentUser?Date.now()>this.currentUser.expiresAt?(this.logout(),!1):!0:!1}hasPermission(e){return this.isAuthenticated()?this.currentUser.permissions.includes(e):!1}getLevel(){return this.isAuthenticated()?this.currentUser.level:null}saveToStorage(){localStorage.setItem("solarpack_auth",JSON.stringify(this.currentUser))}loadFromStorage(){try{const e=localStorage.getItem("solarpack_auth");return e?JSON.parse(e):null}catch{return null}}extendSession(){this.isAuthenticated()&&(this.currentUser.expiresAt=Date.now()+24*60*60*1e3,this.saveToStorage())}}const re=new py;const my=()=>{const[t,e]=_.useState(!1),[r,n]=_.useState(!1),[s,i]=_.useState(!1),[o,l]=_.useState(!1),[c,u]=_.useState(""),[d,f]=_.useState(""),[h,g]=_.useState(!1),x=js(),b=Ql();_.useEffect(()=>{i(re.isAuthenticated())},[x]),_.useEffect(()=>{i(re.isAuthenticated())},[]),_.useEffect(()=>{const z=H=>{o&&!H.target.closest(".auth-dropdown")&&l(!1)};return document.addEventListener("mousedown",z),()=>{document.removeEventListener("mousedown",z)}},[o]);const j=()=>{e(!t)},y=()=>{e(!1)},p=()=>{s?l(!o):v()},m=()=>{l(!1),b("/admin")},N=()=>{re.logout(),i(!1),l(!1),b("/")},v=()=>{n(!0),u(""),f("")},S=()=>{n(!1),u(""),f("")},E=z=>{z.preventDefault(),g(!0),f(""),setTimeout(()=>{re.authenticate(c)?(i(!0),S(),b("/admin")):f("Invalid password. Please try again."),g(!1)},500)};_.useEffect(()=>{e(!1)},[x]),_.useEffect(()=>{const z=()=>{window.innerWidth>767&&t&&e(!1)};return window.addEventListener("resize",z),()=>window.removeEventListener("resize",z)},[t]),_.useEffect(()=>(document.body.style.overflow=t?"hidden":"",()=>{document.body.style.overflow=""}),[t]);const P=z=>!!(z==="/"&&x.pathname==="/"||z!=="/"&&x.pathname.startsWith(z)),A=[{path:"/",label:"Home"},{path:"/app",label:"App"},{path:"/team",label:"Team"},{path:"/alumni",label:"Alumni"},{path:"/sponsors",label:"Sponsors"},{path:"/donate",label:"Donate"},{path:"/contact",label:"Contact"}],I=s?[...A.slice(0,5),{path:"/schedules",label:"Schedules"},...A.slice(5)]:A;return a.jsxs(a.Fragment,{children:[a.jsxs("header",{className:"header",children:[a.jsxs(Wn,{to:"/",className:"logo",children:[a.jsx("img",{src:"/solarpack_logo.png",alt:"SolarPack logo"}),"SolarPack"]}),a.jsx("nav",{className:"nav",children:I.map(({path:z,label:H})=>a.jsx(Wn,{to:z,className:P(z)?"active":"",children:H},z))}),a.jsx("div",{className:"auth-section",children:s?a.jsxs("div",{className:"auth-dropdown",children:[a.jsxs("button",{className:"account-btn authenticated",onClick:p,children:[a.jsx("i",{className:"fas fa-user-check","aria-hidden":"true"}),a.jsx("span",{className:"auth-text",children:"Account"}),a.jsx("i",{className:"fas fa-chevron-down dropdown-arrow","aria-hidden":"true"})]}),o&&a.jsxs("div",{className:"dropdown-menu",children:[a.jsxs("button",{onClick:m,className:"dropdown-item",children:[a.jsx("i",{className:"fas fa-tachometer-alt","aria-hidden":"true"}),"Dashboard"]}),a.jsxs("button",{onClick:N,className:"dropdown-item logout",children:[a.jsx("i",{className:"fas fa-sign-out-alt","aria-hidden":"true"}),"Logout"]})]})]}):a.jsxs("button",{className:"account-btn",onClick:p,children:[a.jsx("i",{className:"fas fa-user","aria-hidden":"true"}),a.jsx("span",{className:"auth-text",children:"Sign In"})]})}),a.jsx("button",{className:"burger",onClick:j,"aria-label":"Toggle navigation",children:a.jsx("i",{className:`fas ${t?"fa-times":"fa-bars"}`,"aria-hidden":"true"})})]}),a.jsx("div",{className:`mobile-panel ${t?"open":""}`,onClick:y,children:a.jsxs("nav",{className:"m-nav",onClick:z=>z.stopPropagation(),children:[I.map(({path:z,label:H})=>a.jsx(Wn,{to:z,className:P(z)?"active":"",onClick:y,children:H},z)),a.jsx("div",{className:"mobile-auth",children:s?a.jsxs(a.Fragment,{children:[a.jsxs("button",{className:"mobile-auth-btn authenticated",onClick:m,children:[a.jsx("i",{className:"fas fa-tachometer-alt","aria-hidden":"true"}),"Dashboard"]}),a.jsxs("button",{className:"mobile-auth-btn logout",onClick:N,children:[a.jsx("i",{className:"fas fa-sign-out-alt","aria-hidden":"true"}),"Logout"]})]}):a.jsxs("button",{className:"mobile-auth-btn",onClick:v,children:[a.jsx("i",{className:"fas fa-user","aria-hidden":"true"}),"Sign In"]})})]})}),r&&a.jsx("div",{className:"modal-overlay",onClick:S,children:a.jsxs("div",{className:"login-modal",onClick:z=>z.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{children:"Dashboard Sign In"}),a.jsx("button",{className:"close-btn",onClick:S,children:a.jsx("i",{className:"fas fa-times","aria-hidden":"true"})})]}),a.jsxs("form",{onSubmit:E,className:"login-form",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{htmlFor:"password",children:"Password"}),a.jsx("input",{type:"password",id:"password",value:c,onChange:z=>u(z.target.value),placeholder:"Enter dashboard password",disabled:h,autoFocus:!0})]}),d&&a.jsxs("div",{className:"error-message",children:[a.jsx("i",{className:"fas fa-exclamation-triangle","aria-hidden":"true"}),d]}),a.jsx("button",{type:"submit",className:`submit-btn ${h?"loading":""}`,disabled:h||!c.trim(),children:h?a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"fas fa-spinner fa-spin","aria-hidden":"true"}),"Signing In..."]}):a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"fas fa-sign-in-alt","aria-hidden":"true"}),"Sign In"]})})]})]})})]})},gy=({children:t})=>a.jsxs(a.Fragment,{children:[a.jsx(my,{}),a.jsx("main",{children:t}),a.jsx("footer",{className:"footer",children:"© 2025 NC State SolarPack. All rights reserved."})]});const vy=()=>(_.useEffect(()=>{document.title="SolarPack"},[]),a.jsxs(a.Fragment,{children:[a.jsxs("section",{className:"hero",children:[a.jsx("img",{src:"/solarpack_logo.gif",alt:"SolarPack Logo"}),a.jsxs("div",{className:"hero-content",children:[a.jsx("h1",{children:"SolarPack"}),a.jsx("div",{className:"subtitle",children:"Solar Vehicle Team at NC State"}),a.jsx("p",{children:"Striving to break barriers in the sustainable vehicle industry with a hardworking group of over 80 passionate students. Join us in our journey to a more sustainable future for transportation."}),a.jsxs("a",{className:"donate-btn",href:"https://www.paypal.com/fundraiser/charity/3728956",target:"_blank",rel:"noopener","aria-label":"Donate to SolarPack via PayPal",children:[a.jsx("i",{className:"fab fa-paypal","aria-hidden":"true"}),"Donate"]})]})]}),a.jsxs("section",{className:"section",children:[a.jsx("img",{src:"/hero_shot.jpg",alt:"SolarPack Team"}),a.jsx("h2",{children:"Sustainable, Efficient, and Powerful."}),a.jsx("p",{children:"As NC State's first solar vehicle team, we are aiming to show the world that solar energy can be used to power a car. Along the way, we are making a solar vehicle no other team has done before."})]}),a.jsxs("section",{className:"section features",children:[a.jsxs("div",{className:"feature",children:[a.jsx("ion-icon",{name:"earth-outline"}),a.jsx("h3",{children:"Global Impact"}),a.jsx("p",{children:"We're showing the world that solar energy can power a multi-occupancy car. By building a vehicle no one has seen before, we hope to prove that sustainability and power can go hand in hand."})]}),a.jsxs("div",{className:"feature",children:[a.jsx("ion-icon",{name:"cog-outline"}),a.jsx("h3",{children:"Engineering Excellence"}),a.jsx("p",{children:"Our team thrives on creative problem solving. Members develop real-world skills as they tackle unique engineering challenges throughout our build process."})]}),a.jsxs("div",{className:"feature",children:[a.jsx("ion-icon",{name:"bulb-outline"}),a.jsx("h3",{children:"Innovation"}),a.jsx("p",{children:"Pioneering new solutions, our members are always innovating—using every resource to bring big ideas to life and push the boundaries of solar vehicle technology."})]}),a.jsxs("div",{className:"feature",children:[a.jsx("ion-icon",{name:"hand-left-outline"}),a.jsx("h3",{children:"Collaboration"}),a.jsx("p",{children:"We partner with companies and alumni to guide our journey, building strong relationships as we promote the future of energy-efficient vehicles."})]}),a.jsxs("div",{className:"feature",children:[a.jsx("ion-icon",{name:"location-outline"}),a.jsx("h3",{children:"Rooted in the Triangle"}),a.jsx("p",{children:"Proudly representing the Research Triangle, we embody the spirit of innovation and excellence that defines our region—driving forward as leaders in sustainable technology."})]})]}),a.jsx(yy,{}),a.jsxs("div",{className:"socials",children:[a.jsx("a",{href:"https://www.instagram.com/solarpacknc/",target:"_blank",rel:"noopener",children:a.jsx("i",{className:"fab fa-instagram"})}),a.jsx("a",{href:"https://www.linkedin.com/company/solarpack-nc-state/",target:"_blank",rel:"noopener",children:a.jsx("i",{className:"fab fa-linkedin"})}),a.jsx("a",{href:"https://www.facebook.com/SolarPackNC/",target:"_blank",rel:"noopener",children:a.jsx("i",{className:"fab fa-facebook"})})]})]})),yy=()=>{const[t,e]=_.useState(0),r=_.useRef(null),n=_.useRef(null),[s,i]=_.useState(320),[o,l]=_.useState(0),[c,u]=_.useState(0),d=["/race2025/race2025_1.jpg","/race2025/race2025_2.jpg","/race2025/race2025_3.jpg","/race2025/race2025_4.jpg","/race2025/race2025_5.jpg","/race2025/race2025_6.jpg","/race2025/race2025_7.jpg","/race2025/race2025_8.jpg","/race2025/race2025_9.jpg"],f=()=>{if(r.current&&n.current){const v=r.current.querySelector(".carousel-slide");if(v){const S=v.getBoundingClientRect(),E=n.current.getBoundingClientRect();i(S.width),l(E.width),u(Math.round((E.width-S.width)/2))}}};_.useEffect(()=>{f();const v=new ResizeObserver(f);return n.current&&v.observe(n.current),()=>v.disconnect()},[]);const h=19.2,g=v=>{e(v)},x=()=>{e(v=>(v+1)%d.length)},b=()=>{e(v=>(v-1+d.length)%d.length)},j=-Math.round(t*(s+h))+c,[y,p]=_.useState(null),m=v=>{p(v)},N=v=>{if(y!==null){const S=v-y;S<-30?x():S>30&&b(),p(null)}};return a.jsxs("section",{className:"section race-carousel",children:[a.jsx("h2",{children:"2025 Race Highlights"}),a.jsxs("div",{className:"carousel-container",children:[a.jsx("button",{className:"carousel-arrow left",onClick:b,"aria-label":"Previous",children:a.jsx("i",{className:"fas fa-chevron-left"})}),a.jsx("div",{className:"carousel-viewport",ref:n,onMouseDown:v=>m(v.pageX),onMouseUp:v=>N(v.pageX),onTouchStart:v=>m(v.touches[0].pageX),onTouchEnd:v=>N(v.changedTouches[0].pageX),children:a.jsx("div",{className:"carousel-track",ref:r,style:{transform:`translateX(${j}px)`},children:d.map((v,S)=>a.jsx("div",{className:"carousel-slide",children:a.jsx("img",{src:v,alt:`Race 2025 Image ${S+1}`})},S))})}),a.jsx("button",{className:"carousel-arrow right",onClick:x,"aria-label":"Next",children:a.jsx("i",{className:"fas fa-chevron-right"})}),a.jsx("div",{className:"carousel-dots",children:d.map((v,S)=>a.jsx("span",{className:`dot ${S===t?"active":""}`,onClick:()=>g(S)},S))})]})]})},wy=()=>{const[t,e]=_.useState(null);_.useEffect(()=>{document.title="SolarPack · App"},[]);const r=i=>{e(i),document.body.style.overflow="hidden"},n=()=>{e(null),document.body.style.overflow=""};_.useEffect(()=>{const i=o=>{o.key==="Escape"&&n()};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[]);const s={ipad1:{image:"/images/ipad-app/Ipad 1.png",title:"Home Page",description:"The Home Page is the main dashboard for the app, providing a real-time overview of all critical vehicle and system stats. It is designed for quick-glance monitoring and immediate access to the most important data.",features:["Live Gauges: Speed, RPM, and current draw with animated arc gauges","Battery & Solar Info: Battery voltage, wattage, solar voltage, and solar power","Temperature Readouts: Motor and inverter temperatures","System Status Indicator: Animated status dot and label","Responsive Layout: Optimized for iPad with large, easy-to-read values"]},ipad2:{image:"/images/ipad-app/Ipad 2.png",title:"BMS Page",description:"The BMS (Battery Management System) Page provides a detailed, real-time overview of battery pack health, cell-level data, and system status. Essential for monitoring, diagnostics, and troubleshooting of the battery system.",features:["Pack Overview: Total battery voltage, current draw, wattage, and 12V battery voltage","State Badges: Charging/discharging status and enable signals","Cell Grid: 10×10 grid of all cell voltages and temperatures, labeled and color-coded","Fault Codes: Lists active BMS fault codes","Status Indicator: Animated status dot and label for BMS power state"]},ipad3:{image:"/images/ipad-app/Ipad 3.png",title:"Motor Controller Page",description:"The Motor Controller Page provides a comprehensive, real-time view of the traction motor and its controller, including RPM, temperatures, voltages, and cooling system status. Essential for monitoring drive performance and diagnosing issues.",features:["RPM Gauge: Large animated arc gauge for motor RPM","Temperature Readouts: Motor and controller (inverter) temperatures","Voltage Monitoring: High-voltage and 12V system voltages","Cooling System Status: Visual indicators for radiator and pump status","System Status Indicator: Header with animated status dot and label"]},ipad4:{image:"/images/ipad-app/Ipad 4.png",title:"Charging Page",description:"The Charging Page provides a comprehensive, real-time overview of battery pack and solar charging status, including charge rates, voltages, estimated time remaining, and solar-only mode controls. Essential for monitoring charging performance and managing energy sources.",features:["Charging Status: Charger plugged in, requested current, charge rate, and pack voltage","Solar Charging: Solar voltage, amps, power, and charger status","Battery Visualization: Large battery icon with animated fill","Estimated Time Remaining: Calculates time to full charge","Solar-Only Mode: Toggle switch for solar-only charging","Rolling Line Chart: Real-time chart of charge rates"]},ipad5:{image:"/images/ipad-app/Ipad 5.png",title:"Low Voltage Page",description:"The Low Voltage Page provides a real-time overview of board health and auxiliary systems, including a grid of board status indicators and ignition mode controls. Essential for monitoring the health of low-voltage electronics and managing ignition states.",features:["Board Health Grid: 2×3 grid of board cards showing status (OK, Fault, Offline)","Ignition Mode Control: View and adjust ignition mode (OFF, ACC, ON, START)","Status Indicators: Animated status dots for live feedback","Responsive Layout: Optimized for iPad with grid-based design and large icons"]}};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        /* Page-specific styles */
        :root {
          --card: #1a1a1a;
          --subtxt: #c9c9c9;
        }
        
        .section {
          background: var(--card);
          border-radius: var(--radius);
          padding: 2rem 1.5rem;
          margin: 2.5rem auto 0;
          max-width: 1200px;
          box-shadow: 0 1px 6px #0003;
        }
        
        .footer {
          text-align: center;
          color: #888;
          font-size: 1rem;
          margin: 3.5rem 0 1.5rem;
        }

        /* App Screenshots Grid */
        .screenshots-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .screenshots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
          justify-content: center;
          padding: 0 1rem;
        }

        .screenshot-card {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
          border-radius: var(--radius);
          overflow: hidden;
          background: #222;
        }

        .screenshot-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .screenshot-card img {
          width: 100%;
          height: auto;
          max-width: 100%;
          border-radius: var(--radius);
          display: block;
        }

        .screenshot-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.9));
          color: white;
          padding: 1.5rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .screenshot-card:hover .screenshot-overlay {
          transform: translateY(0);
        }

        .screenshot-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .screenshot-preview {
          font-size: 0.9rem;
          color: #ccc;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: ${t?"flex":"none"};
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: var(--surface);
          border-radius: var(--radius);
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        .modal-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-image img {
          max-width: 100%;
          max-height: 500px;
          border-radius: var(--radius);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }

        .modal-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .modal-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .modal-description {
          color: var(--muted);
          line-height: 1.6;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .modal-features {
          list-style: none;
          padding: 0;
        }

        .modal-features li {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
          color: var(--text);
        }

        .modal-features li::before {
          content: "✓";
          color: var(--accent);
          font-weight: bold;
          margin-right: 0.8rem;
          font-size: 1.2rem;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text);
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s ease;
          z-index: 1001;
        }

        .close-btn:hover {
          color: var(--accent);
        }

        .app-buttons-row {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .app-buttons-row a {
          display: flex;
          align-items: center;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modal-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 2rem;
          }

          .screenshots-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .section {
            margin: 1.5rem auto 0;
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .modal-overlay {
            padding: 1rem;
          }

          .modal-content {
            padding: 1rem;
          }

          .app-buttons-row {
            flex-direction: column;
            gap: 1rem;
          }

          .app-buttons-row a {
            justify-content: center;
          }
        }
      `}),a.jsxs("section",{className:"section",style:{textAlign:"center"},children:[a.jsx("h1",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"3rem",color:"var(--accent)",marginBottom:"1.2rem"},children:"SolarPack App"}),a.jsx("p",{style:{color:"var(--subtxt)",fontSize:"1.2rem",maxWidth:"600px",margin:"0 auto 2.2rem"},children:"Welcome to the SolarPack App page! Here you'll find information about our mobile and web applications, features, and how to get involved as a user or developer."}),a.jsxs("div",{className:"app-buttons-row",children:[a.jsx("a",{href:"https://apps.apple.com/us/app/solarpack/id6748289347",children:a.jsx("img",{src:"/images/app_store.png",alt:"Download on the App Store",style:{height:"60px",width:"auto",boxShadow:"none",background:"none"}})}),a.jsx("a",{href:"https://solarpack-app-server-alyv.onrender.com/#",style:{textDecoration:"none"},target:"_blank",rel:"noopener noreferrer",children:a.jsxs("button",{style:{background:"var(--accent)",color:"#fff",fontFamily:"'Bebas Neue', sans-serif",fontSize:"1.3rem",fontWeight:"bold",letterSpacing:"2px",padding:"1.0rem 2.2rem",display:"flex",alignItems:"center",gap:"0.7rem",border:"none",borderRadius:"10px",boxShadow:"0 2px 12px #0003",cursor:"pointer",transition:"background 0.2s",textTransform:"uppercase"},children:[a.jsx("i",{className:"fas fa-satellite-dish",style:{fontSize:"1.5rem"}}),"VIEW LIVE TELEMETRY"]})})]}),a.jsx("div",{className:"screenshots-container",children:a.jsx("div",{className:"screenshots-grid",children:Object.entries(s).map(([i,o])=>a.jsxs("div",{className:"screenshot-card",onClick:()=>r(i),children:[a.jsx("img",{src:o.image,alt:`iPad Screenshot ${i.slice(-1)}`}),a.jsxs("div",{className:"screenshot-overlay",children:[a.jsx("div",{className:"screenshot-title",children:o.title}),a.jsxs("div",{className:"screenshot-preview",children:["Click to learn more about the ",o.title.toLowerCase()," features..."]})]})]},i))})}),t&&s[t]&&a.jsx("div",{className:"modal-overlay",onClick:i=>i.target===i.currentTarget&&n(),children:a.jsxs("div",{className:"modal-content",children:[a.jsx("button",{className:"close-btn",onClick:n,children:"×"}),a.jsx("div",{className:"modal-image",children:a.jsx("img",{src:s[t].image,alt:s[t].title})}),a.jsxs("div",{className:"modal-details",children:[a.jsx("h2",{className:"modal-title",children:s[t].title}),a.jsx("p",{className:"modal-description",children:s[t].description}),a.jsx("ul",{className:"modal-features",children:s[t].features.map((i,o)=>a.jsx("li",{children:i},o))})]})]})})]}),a.jsx("div",{style:{textAlign:"center",margin:"2.5rem 0 0",fontSize:"0.98rem"},children:a.jsx("a",{href:"/privacy-policy",style:{color:"var(--accent)",textDecoration:"none",opacity:"0.8",transition:"opacity 0.2s"},children:"Privacy & Data Policy"})})]})};var Uo=function(t,e){return Uo=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(r[s]=n[s])},Uo(t,e)};function Ef(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");Uo(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}var Ii=function(){return Ii=Object.assign||function(e){for(var r,n=1,s=arguments.length;n<s;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},Ii.apply(this,arguments)};function vn(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(t);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(r[n[s]]=t[n[s]]);return r}function Cf(t,e,r,n){var s=arguments.length,i=s<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,r):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,n);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(i=(s<3?o(i):s>3?o(e,r,i):o(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i}function Tf(t,e){return function(r,n){e(r,n,t)}}function Pf(t,e,r,n,s,i){function o(y){if(y!==void 0&&typeof y!="function")throw new TypeError("Function expected");return y}for(var l=n.kind,c=l==="getter"?"get":l==="setter"?"set":"value",u=!e&&t?n.static?t:t.prototype:null,d=e||(u?Object.getOwnPropertyDescriptor(u,n.name):{}),f,h=!1,g=r.length-1;g>=0;g--){var x={};for(var b in n)x[b]=b==="access"?{}:n[b];for(var b in n.access)x.access[b]=n.access[b];x.addInitializer=function(y){if(h)throw new TypeError("Cannot add initializers after decoration has completed");i.push(o(y||null))};var j=(0,r[g])(l==="accessor"?{get:d.get,set:d.set}:d[c],x);if(l==="accessor"){if(j===void 0)continue;if(j===null||typeof j!="object")throw new TypeError("Object expected");(f=o(j.get))&&(d.get=f),(f=o(j.set))&&(d.set=f),(f=o(j.init))&&s.unshift(f)}else(f=o(j))&&(l==="field"?s.unshift(f):d[c]=f)}u&&Object.defineProperty(u,n.name,d),h=!0}function Of(t,e,r){for(var n=arguments.length>2,s=0;s<e.length;s++)r=n?e[s].call(t,r):e[s].call(t);return n?r:void 0}function Df(t){return typeof t=="symbol"?t:"".concat(t)}function Rf(t,e,r){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(t,"name",{configurable:!0,value:r?"".concat(r," ",e):e})}function Af(t,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(t,e)}function U(t,e,r,n){function s(i){return i instanceof r?i:new r(function(o){o(i)})}return new(r||(r=Promise))(function(i,o){function l(d){try{u(n.next(d))}catch(f){o(f)}}function c(d){try{u(n.throw(d))}catch(f){o(f)}}function u(d){d.done?i(d.value):s(d.value).then(l,c)}u((n=n.apply(t,e||[])).next())})}function If(t,e){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,s,i,o=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return o.next=l(0),o.throw=l(1),o.return=l(2),typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(u){return function(d){return c([u,d])}}function c(u){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,u[0]&&(r=0)),r;)try{if(n=1,s&&(i=u[0]&2?s.return:u[0]?s.throw||((i=s.return)&&i.call(s),0):s.next)&&!(i=i.call(s,u[1])).done)return i;switch(s=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return r.label++,{value:u[1],done:!1};case 5:r.label++,s=u[1],u=[0];continue;case 7:u=r.ops.pop(),r.trys.pop();continue;default:if(i=r.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){r=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){r.label=u[1];break}if(u[0]===6&&r.label<i[1]){r.label=i[1],i=u;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(u);break}i[2]&&r.ops.pop(),r.trys.pop();continue}u=e.call(t,r)}catch(d){u=[6,d],s=0}finally{n=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}var sa=Object.create?function(t,e,r,n){n===void 0&&(n=r);var s=Object.getOwnPropertyDescriptor(e,r);(!s||("get"in s?!e.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,s)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]};function $f(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&sa(e,t,r)}function $i(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Yl(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),s,i=[],o;try{for(;(e===void 0||e-- >0)&&!(s=n.next()).done;)i.push(s.value)}catch(l){o={error:l}}finally{try{s&&!s.done&&(r=n.return)&&r.call(n)}finally{if(o)throw o.error}}return i}function Lf(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(Yl(arguments[e]));return t}function zf(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var n=Array(t),s=0,e=0;e<r;e++)for(var i=arguments[e],o=0,l=i.length;o<l;o++,s++)n[s]=i[o];return n}function Bf(t,e,r){if(r||arguments.length===2)for(var n=0,s=e.length,i;n<s;n++)(i||!(n in e))&&(i||(i=Array.prototype.slice.call(e,0,n)),i[n]=e[n]);return t.concat(i||Array.prototype.slice.call(e))}function dn(t){return this instanceof dn?(this.v=t,this):new dn(t)}function Uf(t,e,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=r.apply(t,e||[]),s,i=[];return s=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),l("next"),l("throw"),l("return",o),s[Symbol.asyncIterator]=function(){return this},s;function o(g){return function(x){return Promise.resolve(x).then(g,f)}}function l(g,x){n[g]&&(s[g]=function(b){return new Promise(function(j,y){i.push([g,b,j,y])>1||c(g,b)})},x&&(s[g]=x(s[g])))}function c(g,x){try{u(n[g](x))}catch(b){h(i[0][3],b)}}function u(g){g.value instanceof dn?Promise.resolve(g.value.v).then(d,f):h(i[0][2],g)}function d(g){c("next",g)}function f(g){c("throw",g)}function h(g,x){g(x),i.shift(),i.length&&c(i[0][0],i[0][1])}}function Mf(t){var e,r;return e={},n("next"),n("throw",function(s){throw s}),n("return"),e[Symbol.iterator]=function(){return this},e;function n(s,i){e[s]=t[s]?function(o){return(r=!r)?{value:dn(t[s](o)),done:!1}:i?i(o):o}:i}}function Ff(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=t[Symbol.asyncIterator],r;return e?e.call(t):(t=typeof $i=="function"?$i(t):t[Symbol.iterator](),r={},n("next"),n("throw"),n("return"),r[Symbol.asyncIterator]=function(){return this},r);function n(i){r[i]=t[i]&&function(o){return new Promise(function(l,c){o=t[i](o),s(l,c,o.done,o.value)})}}function s(i,o,l,c){Promise.resolve(c).then(function(u){i({value:u,done:l})},o)}}function Wf(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}var xy=Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e},Mo=function(t){return Mo=Object.getOwnPropertyNames||function(e){var r=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[r.length]=n);return r},Mo(t)};function Vf(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r=Mo(t),n=0;n<r.length;n++)r[n]!=="default"&&sa(e,t,r[n]);return xy(e,t),e}function Hf(t){return t&&t.__esModule?t:{default:t}}function qf(t,e,r,n){if(r==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return r==="m"?n:r==="a"?n.call(t):n?n.value:e.get(t)}function Kf(t,e,r,n,s){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?t!==e||!s:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?s.call(t,r):s?s.value=r:e.set(t,r),r}function Gf(t,e){if(e===null||typeof e!="object"&&typeof e!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof t=="function"?e===t:t.has(e)}function Jf(t,e,r){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var n,s;if(r){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");n=e[Symbol.asyncDispose]}if(n===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");n=e[Symbol.dispose],r&&(s=n)}if(typeof n!="function")throw new TypeError("Object not disposable.");s&&(n=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),t.stack.push({value:e,dispose:n,async:r})}else r&&t.stack.push({async:!0});return e}var by=typeof SuppressedError=="function"?SuppressedError:function(t,e,r){var n=new Error(r);return n.name="SuppressedError",n.error=t,n.suppressed=e,n};function Qf(t){function e(i){t.error=t.hasError?new by(i,t.error,"An error was suppressed during disposal."):i,t.hasError=!0}var r,n=0;function s(){for(;r=t.stack.pop();)try{if(!r.async&&n===1)return n=0,t.stack.push(r),Promise.resolve().then(s);if(r.dispose){var i=r.dispose.call(r.value);if(r.async)return n|=2,Promise.resolve(i).then(s,function(o){return e(o),s()})}else n|=1}catch(o){e(o)}if(n===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return s()}function Yf(t,e){return typeof t=="string"&&/^\.\.?\//.test(t)?t.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(r,n,s,i,o){return n?e?".jsx":".js":s&&(!i||!o)?r:s+i+"."+o.toLowerCase()+"js"}):t}const jy={__extends:Ef,__assign:Ii,__rest:vn,__decorate:Cf,__param:Tf,__esDecorate:Pf,__runInitializers:Of,__propKey:Df,__setFunctionName:Rf,__metadata:Af,__awaiter:U,__generator:If,__createBinding:sa,__exportStar:$f,__values:$i,__read:Yl,__spread:Lf,__spreadArrays:zf,__spreadArray:Bf,__await:dn,__asyncGenerator:Uf,__asyncDelegator:Mf,__asyncValues:Ff,__makeTemplateObject:Wf,__importStar:Vf,__importDefault:Hf,__classPrivateFieldGet:qf,__classPrivateFieldSet:Kf,__classPrivateFieldIn:Gf,__addDisposableResource:Jf,__disposeResources:Qf,__rewriteRelativeImportExtension:Yf},_y=Object.freeze(Object.defineProperty({__proto__:null,__addDisposableResource:Jf,get __assign(){return Ii},__asyncDelegator:Mf,__asyncGenerator:Uf,__asyncValues:Ff,__await:dn,__awaiter:U,__classPrivateFieldGet:qf,__classPrivateFieldIn:Gf,__classPrivateFieldSet:Kf,__createBinding:sa,__decorate:Cf,__disposeResources:Qf,__esDecorate:Pf,__exportStar:$f,__extends:Ef,__generator:If,__importDefault:Hf,__importStar:Vf,__makeTemplateObject:Wf,__metadata:Af,__param:Tf,__propKey:Df,__read:Yl,__rest:vn,__rewriteRelativeImportExtension:Yf,__runInitializers:Of,__setFunctionName:Rf,__spread:Lf,__spreadArray:Bf,__spreadArrays:zf,__values:$i,default:jy},Symbol.toStringTag,{value:"Module"})),ky="modulepreload",Sy=function(t){return"/"+t},Su={},yn=function(e,r,n){if(!r||r.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(r.map(i=>{if(i=Sy(i),i in Su)return;Su[i]=!0;const o=i.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(!!n)for(let d=s.length-1;d>=0;d--){const f=s[d];if(f.href===i&&(!o||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${l}`))return;const u=document.createElement("link");if(u.rel=o?"stylesheet":ky,o||(u.as="script",u.crossOrigin=""),u.href=i,document.head.appendChild(u),o)return new Promise((d,f)=>{u.addEventListener("load",d),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})},Ny=t=>{let e;return t?e=t:typeof fetch>"u"?e=(...r)=>yn(()=>Promise.resolve().then(()=>Er),void 0).then(({default:n})=>n(...r)):e=fetch,(...r)=>e(...r)};class Xl extends Error{constructor(e,r="FunctionsError",n){super(e),this.name=r,this.context=n}}class Nu extends Xl{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Eu extends Xl{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Cu extends Xl{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Fo;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(Fo||(Fo={}));class Ey{constructor(e,{headers:r={},customFetch:n,region:s=Fo.Any}={}){this.url=e,this.headers=r,this.region=s,this.fetch=Ny(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return U(this,arguments,void 0,function*(r,n={}){var s;try{const{headers:i,method:o,body:l,signal:c}=n;let u={},{region:d}=n;d||(d=this.region);const f=new URL(`${this.url}/${r}`);d&&d!=="any"&&(u["x-region"]=d,f.searchParams.set("forceFunctionRegion",d));let h;l&&(i&&!Object.prototype.hasOwnProperty.call(i,"Content-Type")||!i)?typeof Blob<"u"&&l instanceof Blob||l instanceof ArrayBuffer?(u["Content-Type"]="application/octet-stream",h=l):typeof l=="string"?(u["Content-Type"]="text/plain",h=l):typeof FormData<"u"&&l instanceof FormData?h=l:(u["Content-Type"]="application/json",h=JSON.stringify(l)):h=l;const g=yield this.fetch(f.toString(),{method:o||"POST",headers:Object.assign(Object.assign(Object.assign({},u),this.headers),i),body:h,signal:c}).catch(y=>{throw y.name==="AbortError"?y:new Nu(y)}),x=g.headers.get("x-relay-error");if(x&&x==="true")throw new Eu(g);if(!g.ok)throw new Cu(g);let b=((s=g.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),j;return b==="application/json"?j=yield g.json():b==="application/octet-stream"||b==="application/pdf"?j=yield g.blob():b==="text/event-stream"?j=g:b==="multipart/form-data"?j=yield g.formData():j=yield g.text(),{data:j,error:null,response:g}}catch(i){return i instanceof Error&&i.name==="AbortError"?{data:null,error:new Nu(i)}:{data:null,error:i,response:i instanceof Cu||i instanceof Eu?i.context:void 0}}})}}var Te={};const wn=td(_y);var Ms={},Fs={},Ws={},Vs={},Hs={},Cy=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},hn=Cy();const Ty=hn.fetch,Xf=hn.fetch.bind(hn),Zf=hn.Headers,Py=hn.Request,Oy=hn.Response,Er=Object.freeze(Object.defineProperty({__proto__:null,Headers:Zf,Request:Py,Response:Oy,default:Xf,fetch:Ty},Symbol.toStringTag,{value:"Module"})),Dy=td(Er);var qs={},Tu;function ep(){if(Tu)return qs;Tu=1,Object.defineProperty(qs,"__esModule",{value:!0});class t extends Error{constructor(r){super(r.message),this.name="PostgrestError",this.details=r.details,this.hint=r.hint,this.code=r.code}}return qs.default=t,qs}var Pu;function tp(){if(Pu)return Hs;Pu=1,Object.defineProperty(Hs,"__esModule",{value:!0});const t=wn,e=t.__importDefault(Dy),r=t.__importDefault(ep());class n{constructor(i){var o,l;this.shouldThrowOnError=!1,this.method=i.method,this.url=i.url,this.headers=new Headers(i.headers),this.schema=i.schema,this.body=i.body,this.shouldThrowOnError=(o=i.shouldThrowOnError)!==null&&o!==void 0?o:!1,this.signal=i.signal,this.isMaybeSingle=(l=i.isMaybeSingle)!==null&&l!==void 0?l:!1,i.fetch?this.fetch=i.fetch:typeof fetch>"u"?this.fetch=e.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(i,o){return this.headers=new Headers(this.headers),this.headers.set(i,o),this}then(i,o){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const l=this.fetch;let c=l(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async u=>{var d,f,h,g;let x=null,b=null,j=null,y=u.status,p=u.statusText;if(u.ok){if(this.method!=="HEAD"){const S=await u.text();S===""||(this.headers.get("Accept")==="text/csv"||this.headers.get("Accept")&&(!((d=this.headers.get("Accept"))===null||d===void 0)&&d.includes("application/vnd.pgrst.plan+text"))?b=S:b=JSON.parse(S))}const N=(f=this.headers.get("Prefer"))===null||f===void 0?void 0:f.match(/count=(exact|planned|estimated)/),v=(h=u.headers.get("content-range"))===null||h===void 0?void 0:h.split("/");N&&v&&v.length>1&&(j=parseInt(v[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(b)&&(b.length>1?(x={code:"PGRST116",details:`Results contain ${b.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},b=null,j=null,y=406,p="Not Acceptable"):b.length===1?b=b[0]:b=null)}else{const N=await u.text();try{x=JSON.parse(N),Array.isArray(x)&&u.status===404&&(b=[],x=null,y=200,p="OK")}catch{u.status===404&&N===""?(y=204,p="No Content"):x={message:N}}if(x&&this.isMaybeSingle&&(!((g=x==null?void 0:x.details)===null||g===void 0)&&g.includes("0 rows"))&&(x=null,y=200,p="OK"),x&&this.shouldThrowOnError)throw new r.default(x)}return{error:x,data:b,count:j,status:y,statusText:p}});return this.shouldThrowOnError||(c=c.catch(u=>{var d,f,h;return{error:{message:`${(d=u==null?void 0:u.name)!==null&&d!==void 0?d:"FetchError"}: ${u==null?void 0:u.message}`,details:`${(f=u==null?void 0:u.stack)!==null&&f!==void 0?f:""}`,hint:"",code:`${(h=u==null?void 0:u.code)!==null&&h!==void 0?h:""}`},data:null,count:null,status:0,statusText:""}})),c.then(i,o)}returns(){return this}overrideTypes(){return this}}return Hs.default=n,Hs}var Ou;function rp(){if(Ou)return Vs;Ou=1,Object.defineProperty(Vs,"__esModule",{value:!0});const e=wn.__importDefault(tp());class r extends e.default{select(s){let i=!1;const o=(s??"*").split("").map(l=>/\s/.test(l)&&!i?"":(l==='"'&&(i=!i),l)).join("");return this.url.searchParams.set("select",o),this.headers.append("Prefer","return=representation"),this}order(s,{ascending:i=!0,nullsFirst:o,foreignTable:l,referencedTable:c=l}={}){const u=c?`${c}.order`:"order",d=this.url.searchParams.get(u);return this.url.searchParams.set(u,`${d?`${d},`:""}${s}.${i?"asc":"desc"}${o===void 0?"":o?".nullsfirst":".nullslast"}`),this}limit(s,{foreignTable:i,referencedTable:o=i}={}){const l=typeof o>"u"?"limit":`${o}.limit`;return this.url.searchParams.set(l,`${s}`),this}range(s,i,{foreignTable:o,referencedTable:l=o}={}){const c=typeof l>"u"?"offset":`${l}.offset`,u=typeof l>"u"?"limit":`${l}.limit`;return this.url.searchParams.set(c,`${s}`),this.url.searchParams.set(u,`${i-s+1}`),this}abortSignal(s){return this.signal=s,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:s=!1,verbose:i=!1,settings:o=!1,buffers:l=!1,wal:c=!1,format:u="text"}={}){var d;const f=[s?"analyze":null,i?"verbose":null,o?"settings":null,l?"buffers":null,c?"wal":null].filter(Boolean).join("|"),h=(d=this.headers.get("Accept"))!==null&&d!==void 0?d:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${u}; for="${h}"; options=${f};`),u==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(s){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${s}`),this}}return Vs.default=r,Vs}var Du;function Zl(){if(Du)return Ws;Du=1,Object.defineProperty(Ws,"__esModule",{value:!0});const e=wn.__importDefault(rp()),r=new RegExp("[,()]");class n extends e.default{eq(i,o){return this.url.searchParams.append(i,`eq.${o}`),this}neq(i,o){return this.url.searchParams.append(i,`neq.${o}`),this}gt(i,o){return this.url.searchParams.append(i,`gt.${o}`),this}gte(i,o){return this.url.searchParams.append(i,`gte.${o}`),this}lt(i,o){return this.url.searchParams.append(i,`lt.${o}`),this}lte(i,o){return this.url.searchParams.append(i,`lte.${o}`),this}like(i,o){return this.url.searchParams.append(i,`like.${o}`),this}likeAllOf(i,o){return this.url.searchParams.append(i,`like(all).{${o.join(",")}}`),this}likeAnyOf(i,o){return this.url.searchParams.append(i,`like(any).{${o.join(",")}}`),this}ilike(i,o){return this.url.searchParams.append(i,`ilike.${o}`),this}ilikeAllOf(i,o){return this.url.searchParams.append(i,`ilike(all).{${o.join(",")}}`),this}ilikeAnyOf(i,o){return this.url.searchParams.append(i,`ilike(any).{${o.join(",")}}`),this}is(i,o){return this.url.searchParams.append(i,`is.${o}`),this}in(i,o){const l=Array.from(new Set(o)).map(c=>typeof c=="string"&&r.test(c)?`"${c}"`:`${c}`).join(",");return this.url.searchParams.append(i,`in.(${l})`),this}contains(i,o){return typeof o=="string"?this.url.searchParams.append(i,`cs.${o}`):Array.isArray(o)?this.url.searchParams.append(i,`cs.{${o.join(",")}}`):this.url.searchParams.append(i,`cs.${JSON.stringify(o)}`),this}containedBy(i,o){return typeof o=="string"?this.url.searchParams.append(i,`cd.${o}`):Array.isArray(o)?this.url.searchParams.append(i,`cd.{${o.join(",")}}`):this.url.searchParams.append(i,`cd.${JSON.stringify(o)}`),this}rangeGt(i,o){return this.url.searchParams.append(i,`sr.${o}`),this}rangeGte(i,o){return this.url.searchParams.append(i,`nxl.${o}`),this}rangeLt(i,o){return this.url.searchParams.append(i,`sl.${o}`),this}rangeLte(i,o){return this.url.searchParams.append(i,`nxr.${o}`),this}rangeAdjacent(i,o){return this.url.searchParams.append(i,`adj.${o}`),this}overlaps(i,o){return typeof o=="string"?this.url.searchParams.append(i,`ov.${o}`):this.url.searchParams.append(i,`ov.{${o.join(",")}}`),this}textSearch(i,o,{config:l,type:c}={}){let u="";c==="plain"?u="pl":c==="phrase"?u="ph":c==="websearch"&&(u="w");const d=l===void 0?"":`(${l})`;return this.url.searchParams.append(i,`${u}fts${d}.${o}`),this}match(i){return Object.entries(i).forEach(([o,l])=>{this.url.searchParams.append(o,`eq.${l}`)}),this}not(i,o,l){return this.url.searchParams.append(i,`not.${o}.${l}`),this}or(i,{foreignTable:o,referencedTable:l=o}={}){const c=l?`${l}.or`:"or";return this.url.searchParams.append(c,`(${i})`),this}filter(i,o,l){return this.url.searchParams.append(i,`${o}.${l}`),this}}return Ws.default=n,Ws}var Ru;function np(){if(Ru)return Fs;Ru=1,Object.defineProperty(Fs,"__esModule",{value:!0});const e=wn.__importDefault(Zl());class r{constructor(s,{headers:i={},schema:o,fetch:l}){this.url=s,this.headers=new Headers(i),this.schema=o,this.fetch=l}select(s,i){const{head:o=!1,count:l}=i??{},c=o?"HEAD":"GET";let u=!1;const d=(s??"*").split("").map(f=>/\s/.test(f)&&!u?"":(f==='"'&&(u=!u),f)).join("");return this.url.searchParams.set("select",d),l&&this.headers.append("Prefer",`count=${l}`),new e.default({method:c,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch})}insert(s,{count:i,defaultToNull:o=!0}={}){var l;const c="POST";if(i&&this.headers.append("Prefer",`count=${i}`),o||this.headers.append("Prefer","missing=default"),Array.isArray(s)){const u=s.reduce((d,f)=>d.concat(Object.keys(f)),[]);if(u.length>0){const d=[...new Set(u)].map(f=>`"${f}"`);this.url.searchParams.set("columns",d.join(","))}}return new e.default({method:c,url:this.url,headers:this.headers,schema:this.schema,body:s,fetch:(l=this.fetch)!==null&&l!==void 0?l:fetch})}upsert(s,{onConflict:i,ignoreDuplicates:o=!1,count:l,defaultToNull:c=!0}={}){var u;const d="POST";if(this.headers.append("Prefer",`resolution=${o?"ignore":"merge"}-duplicates`),i!==void 0&&this.url.searchParams.set("on_conflict",i),l&&this.headers.append("Prefer",`count=${l}`),c||this.headers.append("Prefer","missing=default"),Array.isArray(s)){const f=s.reduce((h,g)=>h.concat(Object.keys(g)),[]);if(f.length>0){const h=[...new Set(f)].map(g=>`"${g}"`);this.url.searchParams.set("columns",h.join(","))}}return new e.default({method:d,url:this.url,headers:this.headers,schema:this.schema,body:s,fetch:(u=this.fetch)!==null&&u!==void 0?u:fetch})}update(s,{count:i}={}){var o;const l="PATCH";return i&&this.headers.append("Prefer",`count=${i}`),new e.default({method:l,url:this.url,headers:this.headers,schema:this.schema,body:s,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch})}delete({count:s}={}){var i;const o="DELETE";return s&&this.headers.append("Prefer",`count=${s}`),new e.default({method:o,url:this.url,headers:this.headers,schema:this.schema,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch})}}return Fs.default=r,Fs}var Au;function Ry(){if(Au)return Ms;Au=1,Object.defineProperty(Ms,"__esModule",{value:!0});const t=wn,e=t.__importDefault(np()),r=t.__importDefault(Zl());class n{constructor(i,{headers:o={},schema:l,fetch:c}={}){this.url=i,this.headers=new Headers(o),this.schemaName=l,this.fetch=c}from(i){const o=new URL(`${this.url}/${i}`);return new e.default(o,{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch})}schema(i){return new n(this.url,{headers:this.headers,schema:i,fetch:this.fetch})}rpc(i,o={},{head:l=!1,get:c=!1,count:u}={}){var d;let f;const h=new URL(`${this.url}/rpc/${i}`);let g;l||c?(f=l?"HEAD":"GET",Object.entries(o).filter(([b,j])=>j!==void 0).map(([b,j])=>[b,Array.isArray(j)?`{${j.join(",")}}`:`${j}`]).forEach(([b,j])=>{h.searchParams.append(b,j)})):(f="POST",g=o);const x=new Headers(this.headers);return u&&x.set("Prefer",`count=${u}`),new r.default({method:f,url:h,headers:x,schema:this.schemaName,body:g,fetch:(d=this.fetch)!==null&&d!==void 0?d:fetch})}}return Ms.default=n,Ms}Object.defineProperty(Te,"__esModule",{value:!0});var sp=Te.PostgrestError=pp=Te.PostgrestBuilder=hp=Te.PostgrestTransformBuilder=up=Te.PostgrestFilterBuilder=lp=Te.PostgrestQueryBuilder=ap=Te.PostgrestClient=void 0;const xn=wn,ip=xn.__importDefault(Ry());var ap=Te.PostgrestClient=ip.default;const op=xn.__importDefault(np());var lp=Te.PostgrestQueryBuilder=op.default;const cp=xn.__importDefault(Zl());var up=Te.PostgrestFilterBuilder=cp.default;const dp=xn.__importDefault(rp());var hp=Te.PostgrestTransformBuilder=dp.default;const fp=xn.__importDefault(tp());var pp=Te.PostgrestBuilder=fp.default;const mp=xn.__importDefault(ep());sp=Te.PostgrestError=mp.default;var gp=Te.default={PostgrestClient:ip.default,PostgrestQueryBuilder:op.default,PostgrestFilterBuilder:cp.default,PostgrestTransformBuilder:dp.default,PostgrestBuilder:fp.default,PostgrestError:mp.default};const Ay=ed({__proto__:null,get PostgrestBuilder(){return pp},get PostgrestClient(){return ap},get PostgrestError(){return sp},get PostgrestFilterBuilder(){return up},get PostgrestQueryBuilder(){return lp},get PostgrestTransformBuilder(){return hp},default:gp},[Te]),{PostgrestClient:Iy,PostgrestQueryBuilder:Mx,PostgrestFilterBuilder:Fx,PostgrestTransformBuilder:Wx,PostgrestBuilder:Vx,PostgrestError:Hx}=gp||Ay;class $y{static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if(typeof process<"u"){const r=process.versions;if(r&&r.node){const n=r.node,s=parseInt(n.replace(/^v/,"").split(".")[0]);return s>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${s} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${s} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let r=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(r+=`

Suggested solution: ${e.workaround}`),new Error(r)}static createWebSocket(e,r){const n=this.getWebSocketConstructor();return new n(e,r)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const Ly="2.78.0",zy=`realtime-js/${Ly}`,By="1.0.0",Wo=1e4,Uy=1e3,My=100;var Vn;(function(t){t[t.connecting=0]="connecting",t[t.open=1]="open",t[t.closing=2]="closing",t[t.closed=3]="closed"})(Vn||(Vn={}));var pe;(function(t){t.closed="closed",t.errored="errored",t.joined="joined",t.joining="joining",t.leaving="leaving"})(pe||(pe={}));var dt;(function(t){t.close="phx_close",t.error="phx_error",t.join="phx_join",t.reply="phx_reply",t.leave="phx_leave",t.access_token="access_token"})(dt||(dt={}));var Vo;(function(t){t.websocket="websocket"})(Vo||(Vo={}));var ur;(function(t){t.Connecting="connecting",t.Open="open",t.Closing="closing",t.Closed="closed"})(ur||(ur={}));class Fy{constructor(){this.HEADER_LENGTH=1}decode(e,r){return e.constructor===ArrayBuffer?r(this._binaryDecode(e)):r(typeof e=="string"?JSON.parse(e):{})}_binaryDecode(e){const r=new DataView(e),n=new TextDecoder;return this._decodeBroadcast(e,r,n)}_decodeBroadcast(e,r,n){const s=r.getUint8(1),i=r.getUint8(2);let o=this.HEADER_LENGTH+2;const l=n.decode(e.slice(o,o+s));o=o+s;const c=n.decode(e.slice(o,o+i));o=o+i;const u=JSON.parse(n.decode(e.slice(o,e.byteLength)));return{ref:null,topic:l,event:c,payload:u}}}class vp{constructor(e,r){this.callback=e,this.timerCalc=r,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=r}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var J;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(J||(J={}));const Iu=(t,e,r={})=>{var n;const s=(n=r.skipTypes)!==null&&n!==void 0?n:[];return e?Object.keys(e).reduce((i,o)=>(i[o]=Wy(o,t,e,s),i),{}):{}},Wy=(t,e,r,n)=>{const s=e.find(l=>l.name===t),i=s==null?void 0:s.type,o=r[t];return i&&!n.includes(i)?yp(i,o):Ho(o)},yp=(t,e)=>{if(t.charAt(0)==="_"){const r=t.slice(1,t.length);return Ky(e,r)}switch(t){case J.bool:return Vy(e);case J.float4:case J.float8:case J.int2:case J.int4:case J.int8:case J.numeric:case J.oid:return Hy(e);case J.json:case J.jsonb:return qy(e);case J.timestamp:return Gy(e);case J.abstime:case J.date:case J.daterange:case J.int4range:case J.int8range:case J.money:case J.reltime:case J.text:case J.time:case J.timestamptz:case J.timetz:case J.tsrange:case J.tstzrange:return Ho(e);default:return Ho(e)}},Ho=t=>t,Vy=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},Hy=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},qy=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch(e){return console.log(`JSON parse error: ${e}`),t}return t},Ky=(t,e)=>{if(typeof t!="string")return t;const r=t.length-1,n=t[r];if(t[0]==="{"&&n==="}"){let i;const o=t.slice(1,r);try{i=JSON.parse("["+o+"]")}catch{i=o?o.split(","):[]}return i.map(l=>yp(e,l))}return t},Gy=t=>typeof t=="string"?t.replace(" ","T"):t,wp=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class Ra{constructor(e,r,n={},s=Wo){this.channel=e,this.event=r,this.payload=n,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,r){var n;return this._hasReceived(e)&&r((n=this.receivedResp)===null||n===void 0?void 0:n.response),this.recHooks.push({status:e,callback:r}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=r=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=r,this._matchReceive(r)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,r){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:r})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:r}){this.recHooks.filter(n=>n.status===e).forEach(n=>n.callback(r))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var $u;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})($u||($u={}));class Hn{constructor(e,r){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const n=(r==null?void 0:r.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},s=>{const{onJoin:i,onLeave:o,onSync:l}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Hn.syncState(this.state,s,i,o),this.pendingDiffs.forEach(c=>{this.state=Hn.syncDiff(this.state,c,i,o)}),this.pendingDiffs=[],l()}),this.channel._on(n.diff,{},s=>{const{onJoin:i,onLeave:o,onSync:l}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=Hn.syncDiff(this.state,s,i,o),l())}),this.onJoin((s,i,o)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:i,newPresences:o})}),this.onLeave((s,i,o)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:i,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,r,n,s){const i=this.cloneDeep(e),o=this.transformState(r),l={},c={};return this.map(i,(u,d)=>{o[u]||(c[u]=d)}),this.map(o,(u,d)=>{const f=i[u];if(f){const h=d.map(j=>j.presence_ref),g=f.map(j=>j.presence_ref),x=d.filter(j=>g.indexOf(j.presence_ref)<0),b=f.filter(j=>h.indexOf(j.presence_ref)<0);x.length>0&&(l[u]=x),b.length>0&&(c[u]=b)}else l[u]=d}),this.syncDiff(i,{joins:l,leaves:c},n,s)}static syncDiff(e,r,n,s){const{joins:i,leaves:o}={joins:this.transformState(r.joins),leaves:this.transformState(r.leaves)};return n||(n=()=>{}),s||(s=()=>{}),this.map(i,(l,c)=>{var u;const d=(u=e[l])!==null&&u!==void 0?u:[];if(e[l]=this.cloneDeep(c),d.length>0){const f=e[l].map(g=>g.presence_ref),h=d.filter(g=>f.indexOf(g.presence_ref)<0);e[l].unshift(...h)}n(l,d,c)}),this.map(o,(l,c)=>{let u=e[l];if(!u)return;const d=c.map(f=>f.presence_ref);u=u.filter(f=>d.indexOf(f.presence_ref)<0),e[l]=u,s(l,u,c),u.length===0&&delete e[l]}),e}static map(e,r){return Object.getOwnPropertyNames(e).map(n=>r(n,e[n]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((r,n)=>{const s=e[n];return"metas"in s?r[n]=s.metas.map(i=>(i.presence_ref=i.phx_ref,delete i.phx_ref,delete i.phx_ref_prev,i)):r[n]=s,r},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var Lu;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(Lu||(Lu={}));var qn;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(qn||(qn={}));var _t;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(_t||(_t={}));class ec{constructor(e,r={config:{}},n){var s,i;if(this.topic=e,this.params=r,this.socket=n,this.bindings={},this.state=pe.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.timeout=this.socket.timeout,this.joinPush=new Ra(this,dt.join,this.params,this.timeout),this.rejoinTimer=new vp(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=pe.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(o=>o.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=pe.closed,this.socket._remove(this)}),this._onError(o=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,o),this.state=pe.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=pe.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",o=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,o),this.state=pe.errored,this.rejoinTimer.scheduleTimeout())}),this._on(dt.reply,{},(o,l)=>{this._trigger(this._replyEventName(l),o)}),this.presence=new Hn(this),this.broadcastEndpointURL=wp(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((i=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||i===void 0)&&i.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,r=this.timeout){var n,s,i;if(this.socket.isConnected()||this.socket.connect(),this.state==pe.closed){const{config:{broadcast:o,presence:l,private:c}}=this.params,u=(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(g=>g.filter))!==null&&s!==void 0?s:[],d=!!this.bindings[qn.PRESENCE]&&this.bindings[qn.PRESENCE].length>0||((i=this.params.config.presence)===null||i===void 0?void 0:i.enabled)===!0,f={},h={broadcast:o,presence:Object.assign(Object.assign({},l),{enabled:d}),postgres_changes:u,private:c};this.socket.accessTokenValue&&(f.access_token=this.socket.accessTokenValue),this._onError(g=>e==null?void 0:e(_t.CHANNEL_ERROR,g)),this._onClose(()=>e==null?void 0:e(_t.CLOSED)),this.updateJoinPayload(Object.assign({config:h},f)),this.joinedOnce=!0,this._rejoin(r),this.joinPush.receive("ok",async({postgres_changes:g})=>{var x;if(this.socket.setAuth(),g===void 0){e==null||e(_t.SUBSCRIBED);return}else{const b=this.bindings.postgres_changes,j=(x=b==null?void 0:b.length)!==null&&x!==void 0?x:0,y=[];for(let p=0;p<j;p++){const m=b[p],{filter:{event:N,schema:v,table:S,filter:E}}=m,P=g&&g[p];if(P&&P.event===N&&P.schema===v&&P.table===S&&P.filter===E)y.push(Object.assign(Object.assign({},m),{id:P.id}));else{this.unsubscribe(),this.state=pe.errored,e==null||e(_t.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=y,e&&e(_t.SUBSCRIBED);return}}).receive("error",g=>{this.state=pe.errored,e==null||e(_t.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(g).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(_t.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,r={}){return await this.send({type:"presence",event:"track",payload:e},r.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,r,n){return this.state===pe.joined&&e===qn.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,r,n)}async httpSend(e,r,n={}){var s;const i=this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"";if(r==null)return Promise.reject("Payload is required for httpSend()");const o={method:"POST",headers:{Authorization:i,apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:r,private:this.private}]})},l=await this._fetchWithTimeout(this.broadcastEndpointURL,o,(s=n.timeout)!==null&&s!==void 0?s:this.timeout);if(l.status===202)return{success:!0};let c=l.statusText;try{const u=await l.json();c=u.error||u.message||c}catch{}return Promise.reject(new Error(c))}async send(e,r={}){var n,s;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:o}=e,c={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:o,private:this.private}]})};try{const u=await this._fetchWithTimeout(this.broadcastEndpointURL,c,(n=r.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=u.body)===null||s===void 0?void 0:s.cancel()),u.ok?"ok":"error"}catch(u){return u.name==="AbortError"?"timed out":"error"}}else return new Promise(i=>{var o,l,c;const u=this._push(e.type,e,r.timeout||this.timeout);e.type==="broadcast"&&!(!((c=(l=(o=this.params)===null||o===void 0?void 0:o.config)===null||l===void 0?void 0:l.broadcast)===null||c===void 0)&&c.ack)&&i("ok"),u.receive("ok",()=>i("ok")),u.receive("error",()=>i("error")),u.receive("timeout",()=>i("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=pe.leaving;const r=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(dt.close,"leave",this._joinRef())};this.joinPush.destroy();let n=null;return new Promise(s=>{n=new Ra(this,dt.leave,{},e),n.receive("ok",()=>{r(),s("ok")}).receive("timeout",()=>{r(),s("timed out")}).receive("error",()=>{s("error")}),n.send(),this._canPush()||n.trigger("ok",{})}).finally(()=>{n==null||n.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=pe.closed,this.bindings={}}async _fetchWithTimeout(e,r,n){const s=new AbortController,i=setTimeout(()=>s.abort(),n),o=await this.socket.fetch(e,Object.assign(Object.assign({},r),{signal:s.signal}));return clearTimeout(i),o}_push(e,r,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new Ra(this,e,r,n);return this._canPush()?s.send():this._addToPushBuffer(s),s}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>My){const r=this.pushBuffer.shift();r&&(r.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${r.event}`,r.payload))}}_onMessage(e,r,n){return r}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,r,n){var s,i;const o=e.toLocaleLowerCase(),{close:l,error:c,leave:u,join:d}=dt;if(n&&[l,c,u,d].indexOf(o)>=0&&n!==this._joinRef())return;let h=this._onMessage(o,r,n);if(r&&!h)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(g=>{var x,b,j;return((x=g.filter)===null||x===void 0?void 0:x.event)==="*"||((j=(b=g.filter)===null||b===void 0?void 0:b.event)===null||j===void 0?void 0:j.toLocaleLowerCase())===o}).map(g=>g.callback(h,n)):(i=this.bindings[o])===null||i===void 0||i.filter(g=>{var x,b,j,y,p,m;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in g){const N=g.id,v=(x=g.filter)===null||x===void 0?void 0:x.event;return N&&((b=r.ids)===null||b===void 0?void 0:b.includes(N))&&(v==="*"||(v==null?void 0:v.toLocaleLowerCase())===((j=r.data)===null||j===void 0?void 0:j.type.toLocaleLowerCase()))}else{const N=(p=(y=g==null?void 0:g.filter)===null||y===void 0?void 0:y.event)===null||p===void 0?void 0:p.toLocaleLowerCase();return N==="*"||N===((m=r==null?void 0:r.event)===null||m===void 0?void 0:m.toLocaleLowerCase())}else return g.type.toLocaleLowerCase()===o}).map(g=>{if(typeof h=="object"&&"ids"in h){const x=h.data,{schema:b,table:j,commit_timestamp:y,type:p,errors:m}=x;h=Object.assign(Object.assign({},{schema:b,table:j,commit_timestamp:y,eventType:p,new:{},old:{},errors:m}),this._getPayloadRecords(x))}g.callback(h,n)})}_isClosed(){return this.state===pe.closed}_isJoined(){return this.state===pe.joined}_isJoining(){return this.state===pe.joining}_isLeaving(){return this.state===pe.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,r,n){const s=e.toLocaleLowerCase(),i={type:s,filter:r,callback:n};return this.bindings[s]?this.bindings[s].push(i):this.bindings[s]=[i],this}_off(e,r){const n=e.toLocaleLowerCase();return this.bindings[n]&&(this.bindings[n]=this.bindings[n].filter(s=>{var i;return!(((i=s.type)===null||i===void 0?void 0:i.toLocaleLowerCase())===n&&ec.isEqual(s.filter,r))})),this}static isEqual(e,r){if(Object.keys(e).length!==Object.keys(r).length)return!1;for(const n in e)if(e[n]!==r[n])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(dt.close,{},e)}_onError(e){this._on(dt.error,{},r=>e(r))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=pe.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const r={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(r.new=Iu(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(r.old=Iu(e.columns,e.old_record)),r}}const Aa=()=>{},Ks={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},Jy=[1e3,2e3,5e3,1e4],Qy=1e4,Yy=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Xy{constructor(e,r){var n;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Wo,this.transport=null,this.heartbeatIntervalMs=Ks.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=Aa,this.ref=0,this.reconnectTimer=null,this.logger=Aa,this.conn=null,this.sendBuffer=[],this.serializer=new Fy,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=s=>{let i;return s?i=s:typeof fetch>"u"?i=(...o)=>yn(()=>Promise.resolve().then(()=>Er),void 0).then(({default:l})=>l(...o)).catch(l=>{throw new Error(`Failed to load @supabase/node-fetch: ${l.message}. This is required for HTTP requests in Node.js environments without native fetch.`)}):i=fetch,(...o)=>i(...o)},!(!((n=r==null?void 0:r.params)===null||n===void 0)&&n.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey,this.endPoint=`${e}/${Vo.websocket}`,this.httpEndpoint=wp(e),this._initializeOptions(r),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=$y.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const r=e.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:By}))}disconnect(e,r){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const n=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(n),this._setConnectionState("disconnected")},e?this.conn.close(e,r??""):this.conn.close(),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const r=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),r}async removeAllChannels(){const e=await Promise.all(this.channels.map(r=>r.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,r,n){this.logger(e,r,n)}connectionState(){switch(this.conn&&this.conn.readyState){case Vn.connecting:return ur.Connecting;case Vn.open:return ur.Open;case Vn.closing:return ur.Closing;default:return ur.Closed}}isConnected(){return this.connectionState()===ur.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,r={config:{}}){const n=`realtime:${e}`,s=this.getChannels().find(i=>i.topic===n);if(s)return s;{const i=new ec(`realtime:${e}`,r,this);return this.channels.push(i),i}}push(e){const{topic:r,event:n,payload:s,ref:i}=e,o=()=>{this.encode(e,l=>{var c;(c=this.conn)===null||c===void 0||c.send(l)})};this.log("push",`${r} ${n} (${i})`,s),this.isConnected()?o():this.sendBuffer.push(o)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(r){this.log("error","error in heartbeat callback",r)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(r){this.log("error","error in heartbeat callback",r)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(Uy,"heartbeat timeout"),setTimeout(()=>{var r;this.isConnected()||(r=this.reconnectTimer)===null||r===void 0||r.scheduleTimeout()},Ks.HEARTBEAT_TIMEOUT_FALLBACK);return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(r){this.log("error","error in heartbeat callback",r)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let r=this.channels.find(n=>n.topic===e&&(n._isJoined()||n._isJoining()));r&&(this.log("transport",`leaving duplicate topic "${e}"`),r.unsubscribe())}_remove(e){this.channels=this.channels.filter(r=>r.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,r=>{if(r.topic==="phoenix"&&r.event==="phx_reply")try{this.heartbeatCallback(r.payload.status==="ok"?"ok":"error")}catch(u){this.log("error","error in heartbeat callback",u)}r.ref&&r.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:n,event:s,payload:i,ref:o}=r,l=o?`(${o})`:"",c=i.status||"";this.log("receive",`${c} ${n} ${s} ${l}`.trim(),i),this.channels.filter(u=>u._isMember(n)).forEach(u=>u._trigger(s,i,o)),this._triggerStateCallbacks("message",r)})}_clearTimer(e){var r;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((r=this.reconnectTimer)===null||r===void 0||r.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){this.conn&&(this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null),this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),this.flushSendBuffer(),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this.workerRef.terminate()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var r;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(r=this.reconnectTimer)===null||r===void 0||r.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(dt.error))}_appendParams(e,r){if(Object.keys(r).length===0)return e;const n=e.match(/\?/)?"&":"?",s=new URLSearchParams(r);return`${e}${n}${s}`}_workerObjectUrl(e){let r;if(e)r=e;else{const n=new Blob([Yy],{type:"application/javascript"});r=URL.createObjectURL(n)}return r}_setConnectionState(e,r=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=r)}async _performAuth(e=null){let r;e?r=e:this.accessToken?r=await this.accessToken():r=this.accessTokenValue,this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(n=>{const s={access_token:r,version:zy};r&&n.updateJoinPayload(s),n.joinedOnce&&n._isJoined()&&n._push(dt.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(r=>{this.log("error",`error setting auth in ${e}`,r)})}_triggerStateCallbacks(e,r){try{this.stateChangeCallbacks[e].forEach(n=>{try{n(r)}catch(s){this.log("error",`error in ${e} callback`,s)}})}catch(n){this.log("error",`error triggering ${e} callbacks`,n)}}_setupReconnectionTimer(){this.reconnectTimer=new vp(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},Ks.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var r,n,s,i,o,l,c,u,d;if(this.transport=(r=e==null?void 0:e.transport)!==null&&r!==void 0?r:null,this.timeout=(n=e==null?void 0:e.timeout)!==null&&n!==void 0?n:Wo,this.heartbeatIntervalMs=(s=e==null?void 0:e.heartbeatIntervalMs)!==null&&s!==void 0?s:Ks.HEARTBEAT_INTERVAL,this.worker=(i=e==null?void 0:e.worker)!==null&&i!==void 0?i:!1,this.accessToken=(o=e==null?void 0:e.accessToken)!==null&&o!==void 0?o:null,this.heartbeatCallback=(l=e==null?void 0:e.heartbeatCallback)!==null&&l!==void 0?l:Aa,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(c=e==null?void 0:e.reconnectAfterMs)!==null&&c!==void 0?c:f=>Jy[f-1]||Qy,this.encode=(u=e==null?void 0:e.encode)!==null&&u!==void 0?u:(f,h)=>h(JSON.stringify(f)),this.decode=(d=e==null?void 0:e.decode)!==null&&d!==void 0?d:this.serializer.decode.bind(this.serializer),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}}class tc extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function ne(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}class Zy extends tc{constructor(e,r,n){super(e),this.name="StorageApiError",this.status=r,this.statusCode=n}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class qo extends tc{constructor(e,r){super(e),this.name="StorageUnknownError",this.originalError=r}}const rc=t=>{let e;return t?e=t:typeof fetch>"u"?e=(...r)=>yn(()=>Promise.resolve().then(()=>Er),void 0).then(({default:n})=>n(...r)):e=fetch,(...r)=>e(...r)},e0=()=>U(void 0,void 0,void 0,function*(){return typeof Response>"u"?(yield yn(()=>Promise.resolve().then(()=>Er),void 0)).Response:Response}),Ko=t=>{if(Array.isArray(t))return t.map(r=>Ko(r));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([r,n])=>{const s=r.replace(/([-_][a-z])/gi,i=>i.toUpperCase().replace(/[-_]/g,""));e[s]=Ko(n)}),e},t0=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Ia=t=>{var e;return t.msg||t.message||t.error_description||(typeof t.error=="string"?t.error:(e=t.error)===null||e===void 0?void 0:e.message)||JSON.stringify(t)},r0=(t,e,r)=>U(void 0,void 0,void 0,function*(){const n=yield e0();t instanceof n&&!(r!=null&&r.noResolveJson)?t.json().then(s=>{const i=t.status||500,o=(s==null?void 0:s.statusCode)||i+"";e(new Zy(Ia(s),i,o))}).catch(s=>{e(new qo(Ia(s),s))}):e(new qo(Ia(t),t))}),n0=(t,e,r,n)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"||!n?s:(t0(n)?(s.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),s.body=JSON.stringify(n)):s.body=n,e!=null&&e.duplex&&(s.duplex=e.duplex),Object.assign(Object.assign({},s),r))};function _s(t,e,r,n,s,i){return U(this,void 0,void 0,function*(){return new Promise((o,l)=>{t(r,n0(e,n,s,i)).then(c=>{if(!c.ok)throw c;return n!=null&&n.noResolveJson?c:c.json()}).then(c=>o(c)).catch(c=>r0(c,l,n))})})}function fs(t,e,r,n){return U(this,void 0,void 0,function*(){return _s(t,"GET",e,r,n)})}function ct(t,e,r,n,s){return U(this,void 0,void 0,function*(){return _s(t,"POST",e,n,s,r)})}function Go(t,e,r,n,s){return U(this,void 0,void 0,function*(){return _s(t,"PUT",e,n,s,r)})}function s0(t,e,r,n){return U(this,void 0,void 0,function*(){return _s(t,"HEAD",e,Object.assign(Object.assign({},r),{noResolveJson:!0}),n)})}function nc(t,e,r,n,s){return U(this,void 0,void 0,function*(){return _s(t,"DELETE",e,n,s,r)})}class i0{constructor(e,r){this.downloadFn=e,this.shouldThrowOnError=r}then(e,r){return this.execute().then(e,r)}execute(){return U(this,void 0,void 0,function*(){try{return{data:(yield this.downloadFn()).body,error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(ne(e))return{data:null,error:e};throw e}})}}var xp;class a0{constructor(e,r){this.downloadFn=e,this.shouldThrowOnError=r,this[xp]="BlobDownloadBuilder",this.promise=null}asStream(){return new i0(this.downloadFn,this.shouldThrowOnError)}then(e,r){return this.getPromise().then(e,r)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}execute(){return U(this,void 0,void 0,function*(){try{return{data:yield(yield this.downloadFn()).blob(),error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(ne(e))return{data:null,error:e};throw e}})}}xp=Symbol.toStringTag;const o0=a0,l0={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},zu={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class c0{constructor(e,r={},n,s){this.shouldThrowOnError=!1,this.url=e,this.headers=r,this.bucketId=n,this.fetch=rc(s)}throwOnError(){return this.shouldThrowOnError=!0,this}uploadOrUpdate(e,r,n,s){return U(this,void 0,void 0,function*(){try{let i;const o=Object.assign(Object.assign({},zu),s);let l=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(o.upsert)});const c=o.metadata;typeof Blob<"u"&&n instanceof Blob?(i=new FormData,i.append("cacheControl",o.cacheControl),c&&i.append("metadata",this.encodeMetadata(c)),i.append("",n)):typeof FormData<"u"&&n instanceof FormData?(i=n,i.append("cacheControl",o.cacheControl),c&&i.append("metadata",this.encodeMetadata(c))):(i=n,l["cache-control"]=`max-age=${o.cacheControl}`,l["content-type"]=o.contentType,c&&(l["x-metadata"]=this.toBase64(this.encodeMetadata(c)))),s!=null&&s.headers&&(l=Object.assign(Object.assign({},l),s.headers));const u=this._removeEmptyFolders(r),d=this._getFinalPath(u),f=yield(e=="PUT"?Go:ct)(this.fetch,`${this.url}/object/${d}`,i,Object.assign({headers:l},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{data:{path:u,id:f.Id,fullPath:f.Key},error:null}}catch(i){if(this.shouldThrowOnError)throw i;if(ne(i))return{data:null,error:i};throw i}})}upload(e,r,n){return U(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,r,n)})}uploadToSignedUrl(e,r,n,s){return U(this,void 0,void 0,function*(){const i=this._removeEmptyFolders(e),o=this._getFinalPath(i),l=new URL(this.url+`/object/upload/sign/${o}`);l.searchParams.set("token",r);try{let c;const u=Object.assign({upsert:zu.upsert},s),d=Object.assign(Object.assign({},this.headers),{"x-upsert":String(u.upsert)});typeof Blob<"u"&&n instanceof Blob?(c=new FormData,c.append("cacheControl",u.cacheControl),c.append("",n)):typeof FormData<"u"&&n instanceof FormData?(c=n,c.append("cacheControl",u.cacheControl)):(c=n,d["cache-control"]=`max-age=${u.cacheControl}`,d["content-type"]=u.contentType);const f=yield Go(this.fetch,l.toString(),c,{headers:d});return{data:{path:i,fullPath:f.Key},error:null}}catch(c){if(this.shouldThrowOnError)throw c;if(ne(c))return{data:null,error:c};throw c}})}createSignedUploadUrl(e,r){return U(this,void 0,void 0,function*(){try{let n=this._getFinalPath(e);const s=Object.assign({},this.headers);r!=null&&r.upsert&&(s["x-upsert"]="true");const i=yield ct(this.fetch,`${this.url}/object/upload/sign/${n}`,{},{headers:s}),o=new URL(this.url+i.url),l=o.searchParams.get("token");if(!l)throw new tc("No token returned by API");return{data:{signedUrl:o.toString(),path:e,token:l},error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(ne(n))return{data:null,error:n};throw n}})}update(e,r,n){return U(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,r,n)})}move(e,r,n){return U(this,void 0,void 0,function*(){try{return{data:yield ct(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:r,destinationBucket:n==null?void 0:n.destinationBucket},{headers:this.headers}),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(ne(s))return{data:null,error:s};throw s}})}copy(e,r,n){return U(this,void 0,void 0,function*(){try{return{data:{path:(yield ct(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:r,destinationBucket:n==null?void 0:n.destinationBucket},{headers:this.headers})).Key},error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(ne(s))return{data:null,error:s};throw s}})}createSignedUrl(e,r,n){return U(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e),i=yield ct(this.fetch,`${this.url}/object/sign/${s}`,Object.assign({expiresIn:r},n!=null&&n.transform?{transform:n.transform}:{}),{headers:this.headers});const o=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return i={signedUrl:encodeURI(`${this.url}${i.signedURL}${o}`)},{data:i,error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(ne(s))return{data:null,error:s};throw s}})}createSignedUrls(e,r,n){return U(this,void 0,void 0,function*(){try{const s=yield ct(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:r,paths:e},{headers:this.headers}),i=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return{data:s.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${i}`):null})),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(ne(s))return{data:null,error:s};throw s}})}download(e,r){const s=typeof(r==null?void 0:r.transform)<"u"?"render/image/authenticated":"object",i=this.transformOptsToQueryString((r==null?void 0:r.transform)||{}),o=i?`?${i}`:"",l=this._getFinalPath(e),c=()=>fs(this.fetch,`${this.url}/${s}/${l}${o}`,{headers:this.headers,noResolveJson:!0});return new o0(c,this.shouldThrowOnError)}info(e){return U(this,void 0,void 0,function*(){const r=this._getFinalPath(e);try{const n=yield fs(this.fetch,`${this.url}/object/info/${r}`,{headers:this.headers});return{data:Ko(n),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(ne(n))return{data:null,error:n};throw n}})}exists(e){return U(this,void 0,void 0,function*(){const r=this._getFinalPath(e);try{return yield s0(this.fetch,`${this.url}/object/${r}`,{headers:this.headers}),{data:!0,error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(ne(n)&&n instanceof qo){const s=n.originalError;if([400,404].includes(s==null?void 0:s.status))return{data:!1,error:n}}throw n}})}getPublicUrl(e,r){const n=this._getFinalPath(e),s=[],i=r!=null&&r.download?`download=${r.download===!0?"":r.download}`:"";i!==""&&s.push(i);const l=typeof(r==null?void 0:r.transform)<"u"?"render/image":"object",c=this.transformOptsToQueryString((r==null?void 0:r.transform)||{});c!==""&&s.push(c);let u=s.join("&");return u!==""&&(u=`?${u}`),{data:{publicUrl:encodeURI(`${this.url}/${l}/public/${n}${u}`)}}}remove(e){return U(this,void 0,void 0,function*(){try{return{data:yield nc(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(ne(r))return{data:null,error:r};throw r}})}list(e,r,n){return U(this,void 0,void 0,function*(){try{const s=Object.assign(Object.assign(Object.assign({},l0),r),{prefix:e||""});return{data:yield ct(this.fetch,`${this.url}/object/list/${this.bucketId}`,s,{headers:this.headers},n),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(ne(s))return{data:null,error:s};throw s}})}listV2(e,r){return U(this,void 0,void 0,function*(){try{const n=Object.assign({},e);return{data:yield ct(this.fetch,`${this.url}/object/list-v2/${this.bucketId}`,n,{headers:this.headers},r),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(ne(n))return{data:null,error:n};throw n}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const r=[];return e.width&&r.push(`width=${e.width}`),e.height&&r.push(`height=${e.height}`),e.resize&&r.push(`resize=${e.resize}`),e.format&&r.push(`format=${e.format}`),e.quality&&r.push(`quality=${e.quality}`),r.join("&")}}const bp="2.78.0",jp={"X-Client-Info":`storage-js/${bp}`};class u0{constructor(e,r={},n,s){this.shouldThrowOnError=!1;const i=new URL(e);s!=null&&s.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes("storage.supabase.")&&(i.hostname=i.hostname.replace("supabase.","storage.supabase.")),this.url=i.href.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},jp),r),this.fetch=rc(n)}throwOnError(){return this.shouldThrowOnError=!0,this}listBuckets(e){return U(this,void 0,void 0,function*(){try{const r=this.listBucketOptionsToQueryString(e);return{data:yield fs(this.fetch,`${this.url}/bucket${r}`,{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(ne(r))return{data:null,error:r};throw r}})}getBucket(e){return U(this,void 0,void 0,function*(){try{return{data:yield fs(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(ne(r))return{data:null,error:r};throw r}})}createBucket(e){return U(this,arguments,void 0,function*(r,n={public:!1}){try{return{data:yield ct(this.fetch,`${this.url}/bucket`,{id:r,name:r,type:n.type,public:n.public,file_size_limit:n.fileSizeLimit,allowed_mime_types:n.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(this.shouldThrowOnError)throw s;if(ne(s))return{data:null,error:s};throw s}})}updateBucket(e,r){return U(this,void 0,void 0,function*(){try{return{data:yield Go(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:r.public,file_size_limit:r.fileSizeLimit,allowed_mime_types:r.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(ne(n))return{data:null,error:n};throw n}})}emptyBucket(e){return U(this,void 0,void 0,function*(){try{return{data:yield ct(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(ne(r))return{data:null,error:r};throw r}})}deleteBucket(e){return U(this,void 0,void 0,function*(){try{return{data:yield nc(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(ne(r))return{data:null,error:r};throw r}})}listBucketOptionsToQueryString(e){const r={};return e&&("limit"in e&&(r.limit=String(e.limit)),"offset"in e&&(r.offset=String(e.offset)),e.search&&(r.search=e.search),e.sortColumn&&(r.sortColumn=e.sortColumn),e.sortOrder&&(r.sortOrder=e.sortOrder)),Object.keys(r).length>0?"?"+new URLSearchParams(r).toString():""}}class d0{constructor(e,r={},n){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},jp),r),this.fetch=rc(n)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return U(this,void 0,void 0,function*(){try{return{data:yield ct(this.fetch,`${this.url}/bucket`,{name:e},{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(ne(r))return{data:null,error:r};throw r}})}listBuckets(e){return U(this,void 0,void 0,function*(){try{const r=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&r.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&r.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&r.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&r.set("sortOrder",e.sortOrder),e!=null&&e.search&&r.set("search",e.search);const n=r.toString(),s=n?`${this.url}/bucket?${n}`:`${this.url}/bucket`;return{data:yield fs(this.fetch,s,{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(ne(r))return{data:null,error:r};throw r}})}deleteBucket(e){return U(this,void 0,void 0,function*(){try{return{data:yield nc(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(ne(r))return{data:null,error:r};throw r}})}}const sc={"X-Client-Info":`storage-js/${bp}`,"Content-Type":"application/json"};class _p extends Error{constructor(e){super(e),this.__isStorageVectorsError=!0,this.name="StorageVectorsError"}}function We(t){return typeof t=="object"&&t!==null&&"__isStorageVectorsError"in t}class $a extends _p{constructor(e,r,n){super(e),this.name="StorageVectorsApiError",this.status=r,this.statusCode=n}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class h0 extends _p{constructor(e,r){super(e),this.name="StorageVectorsUnknownError",this.originalError=r}}var Bu;(function(t){t.InternalError="InternalError",t.S3VectorConflictException="S3VectorConflictException",t.S3VectorNotFoundException="S3VectorNotFoundException",t.S3VectorBucketNotEmpty="S3VectorBucketNotEmpty",t.S3VectorMaxBucketsExceeded="S3VectorMaxBucketsExceeded",t.S3VectorMaxIndexesExceeded="S3VectorMaxIndexesExceeded"})(Bu||(Bu={}));const ic=t=>{let e;return t?e=t:typeof fetch>"u"?e=(...r)=>yn(()=>Promise.resolve().then(()=>Er),void 0).then(({default:n})=>n(...r)):e=fetch,(...r)=>e(...r)},f0=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Uu=t=>t.msg||t.message||t.error_description||t.error||JSON.stringify(t),p0=(t,e,r)=>U(void 0,void 0,void 0,function*(){if(t&&typeof t=="object"&&"status"in t&&"ok"in t&&typeof t.status=="number"&&!(r!=null&&r.noResolveJson)){const s=t.status||500,i=t;if(typeof i.json=="function")i.json().then(o=>{const l=(o==null?void 0:o.statusCode)||(o==null?void 0:o.code)||s+"";e(new $a(Uu(o),s,l))}).catch(()=>{const o=s+"",l=i.statusText||`HTTP ${s} error`;e(new $a(l,s,o))});else{const o=s+"",l=i.statusText||`HTTP ${s} error`;e(new $a(l,s,o))}}else e(new h0(Uu(t),t))}),m0=(t,e,r,n)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"||!n?s:(f0(n)?(s.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),s.body=JSON.stringify(n)):s.body=n,Object.assign(Object.assign({},s),r))};function g0(t,e,r,n,s,i){return U(this,void 0,void 0,function*(){return new Promise((o,l)=>{t(r,m0(e,n,s,i)).then(c=>{if(!c.ok)throw c;if(n!=null&&n.noResolveJson)return c;const u=c.headers.get("content-type");return!u||!u.includes("application/json")?{}:c.json()}).then(c=>o(c)).catch(c=>p0(c,l,n))})})}function Ve(t,e,r,n,s){return U(this,void 0,void 0,function*(){return g0(t,"POST",e,n,s,r)})}class v0{constructor(e,r={},n){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},sc),r),this.fetch=ic(n)}throwOnError(){return this.shouldThrowOnError=!0,this}createIndex(e){return U(this,void 0,void 0,function*(){try{return{data:(yield Ve(this.fetch,`${this.url}/CreateIndex`,e,{headers:this.headers}))||{},error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}getIndex(e,r){return U(this,void 0,void 0,function*(){try{return{data:yield Ve(this.fetch,`${this.url}/GetIndex`,{vectorBucketName:e,indexName:r},{headers:this.headers}),error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(We(n))return{data:null,error:n};throw n}})}listIndexes(e){return U(this,void 0,void 0,function*(){try{return{data:yield Ve(this.fetch,`${this.url}/ListIndexes`,e,{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}deleteIndex(e,r){return U(this,void 0,void 0,function*(){try{return{data:(yield Ve(this.fetch,`${this.url}/DeleteIndex`,{vectorBucketName:e,indexName:r},{headers:this.headers}))||{},error:null}}catch(n){if(this.shouldThrowOnError)throw n;if(We(n))return{data:null,error:n};throw n}})}}class y0{constructor(e,r={},n){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},sc),r),this.fetch=ic(n)}throwOnError(){return this.shouldThrowOnError=!0,this}putVectors(e){return U(this,void 0,void 0,function*(){try{if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return{data:(yield Ve(this.fetch,`${this.url}/PutVectors`,e,{headers:this.headers}))||{},error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}getVectors(e){return U(this,void 0,void 0,function*(){try{return{data:yield Ve(this.fetch,`${this.url}/GetVectors`,e,{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}listVectors(e){return U(this,void 0,void 0,function*(){try{if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return{data:yield Ve(this.fetch,`${this.url}/ListVectors`,e,{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}queryVectors(e){return U(this,void 0,void 0,function*(){try{return{data:yield Ve(this.fetch,`${this.url}/QueryVectors`,e,{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}deleteVectors(e){return U(this,void 0,void 0,function*(){try{if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return{data:(yield Ve(this.fetch,`${this.url}/DeleteVectors`,e,{headers:this.headers}))||{},error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}}class w0{constructor(e,r={},n){this.shouldThrowOnError=!1,this.url=e.replace(/\/$/,""),this.headers=Object.assign(Object.assign({},sc),r),this.fetch=ic(n)}throwOnError(){return this.shouldThrowOnError=!0,this}createBucket(e){return U(this,void 0,void 0,function*(){try{return{data:(yield Ve(this.fetch,`${this.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}getBucket(e){return U(this,void 0,void 0,function*(){try{return{data:yield Ve(this.fetch,`${this.url}/GetVectorBucket`,{vectorBucketName:e},{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}listBuckets(){return U(this,arguments,void 0,function*(e={}){try{return{data:yield Ve(this.fetch,`${this.url}/ListVectorBuckets`,e,{headers:this.headers}),error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}deleteBucket(e){return U(this,void 0,void 0,function*(){try{return{data:(yield Ve(this.fetch,`${this.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:this.headers}))||{},error:null}}catch(r){if(this.shouldThrowOnError)throw r;if(We(r))return{data:null,error:r};throw r}})}}class x0 extends w0{constructor(e,r={}){super(e,r.headers||{},r.fetch)}from(e){return new b0(this.url,this.headers,e,this.fetch)}}class b0 extends v0{constructor(e,r,n,s){super(e,r,s),this.vectorBucketName=n}createIndex(e){const r=Object.create(null,{createIndex:{get:()=>super.createIndex}});return U(this,void 0,void 0,function*(){return r.createIndex.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName}))})}listIndexes(){const e=Object.create(null,{listIndexes:{get:()=>super.listIndexes}});return U(this,arguments,void 0,function*(r={}){return e.listIndexes.call(this,Object.assign(Object.assign({},r),{vectorBucketName:this.vectorBucketName}))})}getIndex(e){const r=Object.create(null,{getIndex:{get:()=>super.getIndex}});return U(this,void 0,void 0,function*(){return r.getIndex.call(this,this.vectorBucketName,e)})}deleteIndex(e){const r=Object.create(null,{deleteIndex:{get:()=>super.deleteIndex}});return U(this,void 0,void 0,function*(){return r.deleteIndex.call(this,this.vectorBucketName,e)})}index(e){return new j0(this.url,this.headers,this.vectorBucketName,e,this.fetch)}}class j0 extends y0{constructor(e,r,n,s,i){super(e,r,i),this.vectorBucketName=n,this.indexName=s}putVectors(e){const r=Object.create(null,{putVectors:{get:()=>super.putVectors}});return U(this,void 0,void 0,function*(){return r.putVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}getVectors(e){const r=Object.create(null,{getVectors:{get:()=>super.getVectors}});return U(this,void 0,void 0,function*(){return r.getVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}listVectors(){const e=Object.create(null,{listVectors:{get:()=>super.listVectors}});return U(this,arguments,void 0,function*(r={}){return e.listVectors.call(this,Object.assign(Object.assign({},r),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}queryVectors(e){const r=Object.create(null,{queryVectors:{get:()=>super.queryVectors}});return U(this,void 0,void 0,function*(){return r.queryVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}deleteVectors(e){const r=Object.create(null,{deleteVectors:{get:()=>super.deleteVectors}});return U(this,void 0,void 0,function*(){return r.deleteVectors.call(this,Object.assign(Object.assign({},e),{vectorBucketName:this.vectorBucketName,indexName:this.indexName}))})}}class _0 extends u0{constructor(e,r={},n,s){super(e,r,n,s)}from(e){return new c0(this.url,this.headers,e,this.fetch)}get vectors(){return new x0(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new d0(this.url+"/iceberg",this.headers,this.fetch)}}const k0="2.78.0";let Rn="";typeof Deno<"u"?Rn="deno":typeof document<"u"?Rn="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Rn="react-native":Rn="node";const S0={"X-Client-Info":`supabase-js-${Rn}/${k0}`},N0={headers:S0},E0={schema:"public"},C0={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},T0={},P0=t=>{let e;return t?e=t:typeof fetch>"u"?e=Xf:e=fetch,(...r)=>e(...r)},O0=()=>typeof Headers>"u"?Zf:Headers,D0=(t,e,r)=>{const n=P0(r),s=O0();return async(i,o)=>{var l;const c=(l=await e())!==null&&l!==void 0?l:t;let u=new s(o==null?void 0:o.headers);return u.has("apikey")||u.set("apikey",t),u.has("Authorization")||u.set("Authorization",`Bearer ${c}`),n(i,Object.assign(Object.assign({},o),{headers:u}))}};function R0(t){return t.endsWith("/")?t:t+"/"}function A0(t,e){var r,n;const{db:s,auth:i,realtime:o,global:l}=t,{db:c,auth:u,realtime:d,global:f}=e,h={db:Object.assign(Object.assign({},c),s),auth:Object.assign(Object.assign({},u),i),realtime:Object.assign(Object.assign({},d),o),storage:{},global:Object.assign(Object.assign(Object.assign({},f),l),{headers:Object.assign(Object.assign({},(r=f==null?void 0:f.headers)!==null&&r!==void 0?r:{}),(n=l==null?void 0:l.headers)!==null&&n!==void 0?n:{})}),accessToken:async()=>""};return t.accessToken?h.accessToken=t.accessToken:delete h.accessToken,h}function I0(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(R0(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}const kp="2.78.0",Ar=30*1e3,Jo=3,La=Jo*Ar,$0="http://localhost:9999",L0="supabase.auth.token",z0={"X-Client-Info":`gotrue-js/${kp}`},Qo="X-Supabase-Api-Version",Sp={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},B0=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,U0=10*60*1e3;class ps extends Error{constructor(e,r,n){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=n}}function M(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class M0 extends ps{constructor(e,r,n){super(e,r,n),this.name="AuthApiError",this.status=r,this.code=n}}function F0(t){return M(t)&&t.name==="AuthApiError"}class dr extends ps{constructor(e,r){super(e),this.name="AuthUnknownError",this.originalError=r}}class nr extends ps{constructor(e,r,n,s){super(e,n,s),this.name=r,this.status=n}}class at extends nr{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function W0(t){return M(t)&&t.name==="AuthSessionMissingError"}class Tr extends nr{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Gs extends nr{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Js extends nr{constructor(e,r=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function V0(t){return M(t)&&t.name==="AuthImplicitGrantRedirectError"}class Mu extends nr{constructor(e,r=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Yo extends nr{constructor(e,r){super(e,"AuthRetryableFetchError",r,void 0)}}function za(t){return M(t)&&t.name==="AuthRetryableFetchError"}class Fu extends nr{constructor(e,r,n){super(e,"AuthWeakPasswordError",r,"weak_password"),this.reasons=n}}class Xo extends nr{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Li="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Wu=` 	
\r=`.split(""),H0=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<Wu.length;e+=1)t[Wu[e].charCodeAt(0)]=-2;for(let e=0;e<Li.length;e+=1)t[Li[e].charCodeAt(0)]=e;return t})();function Vu(t,e,r){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const n=e.queue>>e.queuedBits-6&63;r(Li[n]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const n=e.queue>>e.queuedBits-6&63;r(Li[n]),e.queuedBits-=6}}function Np(t,e,r){const n=H0[t];if(n>-1)for(e.queue=e.queue<<6|n,e.queuedBits+=6;e.queuedBits>=8;)r(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(n===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function Hu(t){const e=[],r=o=>{e.push(String.fromCodePoint(o))},n={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},i=o=>{G0(o,n,r)};for(let o=0;o<t.length;o+=1)Np(t.charCodeAt(o),s,i);return e.join("")}function q0(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function K0(t,e){for(let r=0;r<t.length;r+=1){let n=t.charCodeAt(r);if(n>55295&&n<=56319){const s=(n-55296)*1024&65535;n=(t.charCodeAt(r+1)-56320&65535|s)+65536,r+=1}q0(n,e)}}function G0(t,e,r){if(e.utf8seq===0){if(t<=127){r(t);return}for(let n=1;n<6;n+=1)if(!(t>>7-n&1)){e.utf8seq=n;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&r(e.codepoint)}}function tn(t){const e=[],r={queue:0,queuedBits:0},n=s=>{e.push(s)};for(let s=0;s<t.length;s+=1)Np(t.charCodeAt(s),r,n);return new Uint8Array(e)}function J0(t){const e=[];return K0(t,r=>e.push(r)),new Uint8Array(e)}function mr(t){const e=[],r={queue:0,queuedBits:0},n=s=>{e.push(s)};return t.forEach(s=>Vu(s,r,n)),Vu(null,r,n),e.join("")}function Q0(t){return Math.round(Date.now()/1e3)+t}function Y0(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const e=Math.random()*16|0;return(t=="x"?e:e&3|8).toString(16)})}const Ee=()=>typeof window<"u"&&typeof document<"u",ir={tested:!1,writable:!1},Ep=()=>{if(!Ee())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(ir.tested)return ir.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),ir.tested=!0,ir.writable=!0}catch{ir.tested=!0,ir.writable=!1}return ir.writable};function X0(t){const e={},r=new URL(t);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((s,i)=>{e[i]=s})}catch{}return r.searchParams.forEach((n,s)=>{e[s]=n}),e}const Cp=t=>{let e;return t?e=t:typeof fetch>"u"?e=(...r)=>yn(()=>Promise.resolve().then(()=>Er),void 0).then(({default:n})=>n(...r)):e=fetch,(...r)=>e(...r)},Z0=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",Ir=async(t,e,r)=>{await t.setItem(e,JSON.stringify(r))},ar=async(t,e)=>{const r=await t.getItem(e);if(!r)return null;try{return JSON.parse(r)}catch{return r}},At=async(t,e)=>{await t.removeItem(e)};class ia{constructor(){this.promise=new ia.promiseConstructor((e,r)=>{this.resolve=e,this.reject=r})}}ia.promiseConstructor=Promise;function Ba(t){const e=t.split(".");if(e.length!==3)throw new Xo("Invalid JWT structure");for(let n=0;n<e.length;n++)if(!B0.test(e[n]))throw new Xo("JWT not in base64url format");return{header:JSON.parse(Hu(e[0])),payload:JSON.parse(Hu(e[1])),signature:tn(e[2]),raw:{header:e[0],payload:e[1]}}}async function ew(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function tw(t,e){return new Promise((n,s)=>{(async()=>{for(let i=0;i<1/0;i++)try{const o=await t(i);if(!e(i,null,o)){n(o);return}}catch(o){if(!e(i,o)){s(o);return}}})()})}function rw(t){return("0"+t.toString(16)).substr(-2)}function nw(){const e=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=r.length;let s="";for(let i=0;i<56;i++)s+=r.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(e),Array.from(e,rw).join("")}async function sw(t){const r=new TextEncoder().encode(t),n=await crypto.subtle.digest("SHA-256",r),s=new Uint8Array(n);return Array.from(s).map(i=>String.fromCharCode(i)).join("")}async function iw(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const r=await sw(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Pr(t,e,r=!1){const n=nw();let s=n;r&&(s+="/PASSWORD_RECOVERY"),await Ir(t,`${e}-code-verifier`,s);const i=await iw(n);return[i,n===i?"plain":"s256"]}const aw=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function ow(t){const e=t.headers.get(Qo);if(!e||!e.match(aw))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function lw(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function cw(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const uw=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Or(t){if(!uw.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Ua(){const t={};return new Proxy(t,{get:(e,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const n=r.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function dw(t,e){return new Proxy(t,{get:(r,n,s)=>{if(n==="__isInsecureUserWarningProxy")return!0;if(typeof n=="symbol"){const i=n.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)"||i==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,n,s)}return!e.value&&typeof n=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(r,n,s)}})}function qu(t){return JSON.parse(JSON.stringify(t))}const cr=t=>t.msg||t.message||t.error_description||t.error||JSON.stringify(t),hw=[502,503,504];async function Ku(t){var e;if(!Z0(t))throw new Yo(cr(t),0);if(hw.includes(t.status))throw new Yo(cr(t),t.status);let r;try{r=await t.json()}catch(i){throw new dr(cr(i),i)}let n;const s=ow(t);if(s&&s.getTime()>=Sp["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?n=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(n=r.error_code),n){if(n==="weak_password")throw new Fu(cr(r),t.status,((e=r.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(n==="session_not_found")throw new at}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((i,o)=>i&&typeof o=="string",!0))throw new Fu(cr(r),t.status,r.weak_password.reasons);throw new M0(cr(r),t.status||500,n)}const fw=(t,e,r,n)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),r))};async function F(t,e,r,n){var s;const i=Object.assign({},n==null?void 0:n.headers);i[Qo]||(i[Qo]=Sp["2024-01-01"].name),n!=null&&n.jwt&&(i.Authorization=`Bearer ${n.jwt}`);const o=(s=n==null?void 0:n.query)!==null&&s!==void 0?s:{};n!=null&&n.redirectTo&&(o.redirect_to=n.redirectTo);const l=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",c=await pw(t,e,r+l,{headers:i,noResolveJson:n==null?void 0:n.noResolveJson},{},n==null?void 0:n.body);return n!=null&&n.xform?n==null?void 0:n.xform(c):{data:Object.assign({},c),error:null}}async function pw(t,e,r,n,s,i){const o=fw(e,n,s,i);let l;try{l=await t(r,Object.assign({},o))}catch(c){throw console.error(c),new Yo(cr(c),0)}if(l.ok||await Ku(l),n!=null&&n.noResolveJson)return l;try{return await l.json()}catch(c){await Ku(c)}}function ot(t){var e;let r=null;vw(t)&&(r=Object.assign({},t),t.expires_at||(r.expires_at=Q0(t.expires_in)));const n=(e=t.user)!==null&&e!==void 0?e:t;return{data:{session:r,user:n},error:null}}function Gu(t){const e=ot(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((r,n)=>r&&typeof n=="string",!0)&&(e.data.weak_password=t.weak_password),e}function Bt(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function mw(t){return{data:t,error:null}}function gw(t){const{action_link:e,email_otp:r,hashed_token:n,redirect_to:s,verification_type:i}=t,o=vn(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),l={action_link:e,email_otp:r,hashed_token:n,redirect_to:s,verification_type:i},c=Object.assign({},o);return{data:{properties:l,user:c},error:null}}function Ju(t){return t}function vw(t){return t.access_token&&t.refresh_token&&t.expires_in}const Ma=["global","local","others"];class yw{constructor({url:e="",headers:r={},fetch:n}){this.url=e,this.headers=r,this.fetch=Cp(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(e,r=Ma[0]){if(Ma.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Ma.join(", ")}`);try{return await F(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(n){if(M(n))return{data:null,error:n};throw n}}async inviteUserByEmail(e,r={}){try{return await F(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:Bt})}catch(n){if(M(n))return{data:{user:null},error:n};throw n}}async generateLink(e){try{const{options:r}=e,n=vn(e,["options"]),s=Object.assign(Object.assign({},n),r);return"newEmail"in n&&(s.new_email=n==null?void 0:n.newEmail,delete s.newEmail),await F(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:gw,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(M(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(e){try{return await F(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Bt})}catch(r){if(M(r))return{data:{user:null},error:r};throw r}}async listUsers(e){var r,n,s,i,o,l,c;try{const u={nextPage:null,lastPage:0,total:0},d=await F(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(i=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:""},xform:Ju});if(d.error)throw d.error;const f=await d.json(),h=(o=d.headers.get("x-total-count"))!==null&&o!==void 0?o:0,g=(c=(l=d.headers.get("link"))===null||l===void 0?void 0:l.split(","))!==null&&c!==void 0?c:[];return g.length>0&&(g.forEach(x=>{const b=parseInt(x.split(";")[0].split("=")[1].substring(0,1)),j=JSON.parse(x.split(";")[1].split("=")[1]);u[`${j}Page`]=b}),u.total=parseInt(h)),{data:Object.assign(Object.assign({},f),u),error:null}}catch(u){if(M(u))return{data:{users:[]},error:u};throw u}}async getUserById(e){Or(e);try{return await F(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Bt})}catch(r){if(M(r))return{data:{user:null},error:r};throw r}}async updateUserById(e,r){Or(e);try{return await F(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:r,headers:this.headers,xform:Bt})}catch(n){if(M(n))return{data:{user:null},error:n};throw n}}async deleteUser(e,r=!1){Or(e);try{return await F(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:r},xform:Bt})}catch(n){if(M(n))return{data:{user:null},error:n};throw n}}async _listFactors(e){Or(e.userId);try{const{data:r,error:n}=await F(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:r,error:n}}catch(r){if(M(r))return{data:null,error:r};throw r}}async _deleteFactor(e){Or(e.userId),Or(e.id);try{return{data:await F(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(r){if(M(r))return{data:null,error:r};throw r}}async _listOAuthClients(e){var r,n,s,i,o,l,c;try{const u={nextPage:null,lastPage:0,total:0},d=await F(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(i=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:""},xform:Ju});if(d.error)throw d.error;const f=await d.json(),h=(o=d.headers.get("x-total-count"))!==null&&o!==void 0?o:0,g=(c=(l=d.headers.get("link"))===null||l===void 0?void 0:l.split(","))!==null&&c!==void 0?c:[];return g.length>0&&(g.forEach(x=>{const b=parseInt(x.split(";")[0].split("=")[1].substring(0,1)),j=JSON.parse(x.split(";")[1].split("=")[1]);u[`${j}Page`]=b}),u.total=parseInt(h)),{data:Object.assign(Object.assign({},f),u),error:null}}catch(u){if(M(u))return{data:{clients:[]},error:u};throw u}}async _createOAuthClient(e){try{return await F(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(M(r))return{data:null,error:r};throw r}}async _getOAuthClient(e){try{return await F(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(M(r))return{data:null,error:r};throw r}}async _updateOAuthClient(e,r){try{return await F(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:r,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(M(n))return{data:null,error:n};throw n}}async _deleteOAuthClient(e){try{return await F(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(M(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(e){try{return await F(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(M(r))return{data:null,error:r};throw r}}}function Qu(t={}){return{getItem:e=>t[e]||null,setItem:(e,r)=>{t[e]=r},removeItem:e=>{delete t[e]}}}const Dr={debug:!!(globalThis&&Ep()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Tp extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class ww extends Tp{}async function xw(t,e,r){Dr.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",t,e);const n=new globalThis.AbortController;return e>0&&setTimeout(()=>{n.abort(),Dr.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",t)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(t,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async s=>{if(s){Dr.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",t,s.name);try{return await r()}finally{Dr.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",t,s.name)}}else{if(e===0)throw Dr.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",t),new ww(`Acquiring an exclusive Navigator LockManager lock "${t}" immediately failed`);if(Dr.debug)try{const i=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(i,null,"  "))}catch(i){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",i)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await r()}}))}function bw(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Pp(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function jw(t){return parseInt(t,16)}function _w(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,n=>n.toString(16).padStart(2,"0")).join("")}function kw(t){var e;const{chainId:r,domain:n,expirationTime:s,issuedAt:i=new Date,nonce:o,notBefore:l,requestId:c,resources:u,scheme:d,uri:f,version:h}=t;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!n)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(o&&o.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);if(!f)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(h!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const g=Pp(t.address),x=d?`${d}://${n}`:n,b=t.statement?`${t.statement}
`:"",j=`${x} wants you to sign in with your Ethereum account:
${g}

${b}`;let y=`URI: ${f}
Version: ${h}
Chain ID: ${r}${o?`
Nonce: ${o}`:""}
Issued At: ${i.toISOString()}`;if(s&&(y+=`
Expiration Time: ${s.toISOString()}`),l&&(y+=`
Not Before: ${l.toISOString()}`),c&&(y+=`
Request ID: ${c}`),u){let p=`
Resources:`;for(const m of u){if(!m||typeof m!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${m}`);p+=`
- ${m}`}y+=p}return`${j}
${y}`}class de extends Error{constructor({message:e,code:r,cause:n,name:s}){var i;super(e,{cause:n}),this.__isWebAuthnError=!0,this.name=(i=s??(n instanceof Error?n.name:void 0))!==null&&i!==void 0?i:"Unknown Error",this.code=r}}class zi extends de{constructor(e,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:e}),this.name="WebAuthnUnknownError",this.originalError=r}}function Sw({error:t,options:e}){var r,n,s;const{publicKey:i}=e;if(!i)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new de({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((r=i.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new de({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((n=i.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new de({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((s=i.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new de({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new de({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new de({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return i.pubKeyCredParams.filter(l=>l.type==="public-key").length===0?new de({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new de({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const o=window.location.hostname;if(Op(o)){if(i.rp.id!==o)return new de({message:`The RP ID "${i.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new de({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(i.user.id.byteLength<1||i.user.id.byteLength>64)return new de({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new de({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new de({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function Nw({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new de({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new de({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const n=window.location.hostname;if(Op(n)){if(r.rpId!==n)return new de({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new de({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new de({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new de({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class Ew{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Cw=new Ew;function Tw(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:r,excludeCredentials:n}=t,s=vn(t,["challenge","user","excludeCredentials"]),i=tn(e).buffer,o=Object.assign(Object.assign({},r),{id:tn(r.id).buffer}),l=Object.assign(Object.assign({},s),{challenge:i,user:o});if(n&&n.length>0){l.excludeCredentials=new Array(n.length);for(let c=0;c<n.length;c++){const u=n[c];l.excludeCredentials[c]=Object.assign(Object.assign({},u),{id:tn(u.id).buffer,type:u.type||"public-key",transports:u.transports})}}return l}function Pw(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:r}=t,n=vn(t,["challenge","allowCredentials"]),s=tn(e).buffer,i=Object.assign(Object.assign({},n),{challenge:s});if(r&&r.length>0){i.allowCredentials=new Array(r.length);for(let o=0;o<r.length;o++){const l=r[o];i.allowCredentials[o]=Object.assign(Object.assign({},l),{id:tn(l.id).buffer,type:l.type||"public-key",transports:l.transports})}}return i}function Ow(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t;return{id:t.id,rawId:t.id,response:{attestationObject:mr(new Uint8Array(t.response.attestationObject)),clientDataJSON:mr(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Dw(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t,n=t.getClientExtensionResults(),s=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:mr(new Uint8Array(s.authenticatorData)),clientDataJSON:mr(new Uint8Array(s.clientDataJSON)),signature:mr(new Uint8Array(s.signature)),userHandle:s.userHandle?mr(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:n,authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Op(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function Yu(){var t,e;return!!(Ee()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Rw(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new zi("Browser returned unexpected credential type",e)}:{data:null,error:new zi("Empty credential response",e)}}catch(e){return{data:null,error:Sw({error:e,options:t})}}}async function Aw(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new zi("Browser returned unexpected credential type",e)}:{data:null,error:new zi("Empty credential response",e)}}catch(e){return{data:null,error:Nw({error:e,options:t})}}}const Iw={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"none"},$w={userVerification:"preferred",hints:["security-key"]};function Bi(...t){const e=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),r=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),n={};for(const s of t)if(s)for(const i in s){const o=s[i];if(o!==void 0)if(Array.isArray(o))n[i]=o;else if(r(o))n[i]=o;else if(e(o)){const l=n[i];e(l)?n[i]=Bi(l,o):n[i]=Bi(o)}else n[i]=o}return n}function Lw(t,e){return Bi(Iw,t,e||{})}function zw(t,e){return Bi($w,t,e||{})}class Bw{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:r,friendlyName:n,signal:s},i){try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:r});if(!o)return{data:null,error:l};const c=s??Cw.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:u}=o.webauthn.credential_options.publicKey;u.name||(u.name=`${u.id}:${n}`),u.displayName||(u.displayName=u.name)}switch(o.webauthn.type){case"create":{const u=Lw(o.webauthn.credential_options.publicKey,i==null?void 0:i.create),{data:d,error:f}=await Rw({publicKey:u,signal:c});return d?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:d}},error:null}:{data:null,error:f}}case"request":{const u=zw(o.webauthn.credential_options.publicKey,i==null?void 0:i.request),{data:d,error:f}=await Aw(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:u,signal:c}));return d?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:d}},error:null}:{data:null,error:f}}}}catch(o){return M(o)?{data:null,error:o}:{data:null,error:new dr("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:r,webauthn:n}){return this.client.mfa.verify({factorId:r,challengeId:e,webauthn:n})}async _authenticate({factorId:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}},i){if(!r)return{data:null,error:new ps("rpId is required for WebAuthn authentication")};try{if(!Yu())return{data:null,error:new dr("Browser does not support WebAuthn",null)};const{data:o,error:l}=await this.challenge({factorId:e,webauthn:{rpId:r,rpOrigins:n},signal:s},{request:i});if(!o)return{data:null,error:l};const{webauthn:c}=o;return this._verify({factorId:e,challengeId:o.challengeId,webauthn:{type:c.type,rpId:r,rpOrigins:n,credential_response:c.credential_response}})}catch(o){return M(o)?{data:null,error:o}:{data:null,error:new dr("Unexpected error in authenticate",o)}}}async _register({friendlyName:e,rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s},i){if(!r)return{data:null,error:new ps("rpId is required for WebAuthn registration")};try{if(!Yu())return{data:null,error:new dr("Browser does not support WebAuthn",null)};const{data:o,error:l}=await this._enroll({friendlyName:e});if(!o)return await this.client.mfa.listFactors().then(d=>{var f;return(f=d.data)===null||f===void 0?void 0:f.all.find(h=>h.factor_type==="webauthn"&&h.friendly_name===e&&h.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:l};const{data:c,error:u}=await this._challenge({factorId:o.id,friendlyName:o.friendly_name,webauthn:{rpId:r,rpOrigins:n},signal:s},{create:i});return c?this._verify({factorId:o.id,challengeId:c.challengeId,webauthn:{rpId:r,rpOrigins:n,type:c.webauthn.type,credential_response:c.webauthn.credential_response}}):{data:null,error:u}}catch(o){return M(o)?{data:null,error:o}:{data:null,error:new dr("Unexpected error in register",o)}}}}bw();const Uw={url:$0,storageKey:L0,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:z0,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1};async function Xu(t,e,r){return await r()}const Rr={};class ms{get jwks(){var e,r;return(r=(e=Rr[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(e){Rr[this.storageKey]=Object.assign(Object.assign({},Rr[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,r;return(r=(e=Rr[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){Rr[this.storageKey]=Object.assign(Object.assign({},Rr[this.storageKey]),{cachedAt:e})}constructor(e){var r,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=ms.nextInstanceID,ms.nextInstanceID+=1,this.instanceID>0&&Ee()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");const s=Object.assign(Object.assign({},Uw),e);if(this.logDebugMessages=!!s.debug,typeof s.debug=="function"&&(this.logger=s.debug),this.persistSession=s.persistSession,this.storageKey=s.storageKey,this.autoRefreshToken=s.autoRefreshToken,this.admin=new yw({url:s.url,headers:s.headers,fetch:s.fetch}),this.url=s.url,this.headers=s.headers,this.fetch=Cp(s.fetch),this.lock=s.lock||Xu,this.detectSessionInUrl=s.detectSessionInUrl,this.flowType=s.flowType,this.hasCustomAuthorizationHeader=s.hasCustomAuthorizationHeader,s.lock?this.lock=s.lock:Ee()&&(!((r=globalThis==null?void 0:globalThis.navigator)===null||r===void 0)&&r.locks)?this.lock=xw:this.lock=Xu,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Bw(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this)},this.persistSession?(s.storage?this.storage=s.storage:Ep()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Qu(this.memoryStorage)),s.userStorage&&(this.userStorage=s.userStorage)):(this.memoryStorage={},this.storage=Qu(this.memoryStorage)),Ee()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",i)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i),await this._notifyAllSubscribers(i.data.event,i.data.session,!1)})}this.initialize()}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${kp}) ${new Date().toISOString()}`,...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{const r=X0(window.location.href);let n="none";if(this._isImplicitGrantCallback(r)?n="implicit":await this._isPKCECallback(r)&&(n="pkce"),Ee()&&this.detectSessionInUrl&&n!=="none"){const{data:s,error:i}=await this._getSessionFromURL(r,n);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),V0(i)){const c=(e=i.details)===null||e===void 0?void 0:e.code;if(c==="identity_already_exists"||c==="identity_not_found"||c==="single_identity_not_deletable")return{error:i}}return await this._removeSession(),{error:i}}const{session:o,redirectType:l}=s;return this._debug("#_initialize()","detected session in URL",o,"redirect type",l),await this._saveSession(o),setTimeout(async()=>{l==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return M(r)?{error:r}:{error:new dr("Unexpected error during initialization",r)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var r,n,s;try{const i=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}},xform:ot}),{data:o,error:l}=i;if(l||!o)return{data:{user:null,session:null},error:l};const c=o.session,u=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:u,session:c},error:null}}catch(i){if(M(i))return{data:{user:null,session:null},error:i};throw i}}async signUp(e){var r,n,s;try{let i;if("email"in e){const{email:d,password:f,options:h}=e;let g=null,x=null;this.flowType==="pkce"&&([g,x]=await Pr(this.storage,this.storageKey)),i=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:h==null?void 0:h.emailRedirectTo,body:{email:d,password:f,data:(r=h==null?void 0:h.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:g,code_challenge_method:x},xform:ot})}else if("phone"in e){const{phone:d,password:f,options:h}=e;i=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:d,password:f,data:(n=h==null?void 0:h.data)!==null&&n!==void 0?n:{},channel:(s=h==null?void 0:h.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:ot})}else throw new Gs("You must provide either an email or phone number and a password");const{data:o,error:l}=i;if(l||!o)return{data:{user:null,session:null},error:l};const c=o.session,u=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:u,session:c},error:null}}catch(i){if(M(i))return{data:{user:null,session:null},error:i};throw i}}async signInWithPassword(e){try{let r;if("email"in e){const{email:i,password:o,options:l}=e;r=await F(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:i,password:o,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken}},xform:Gu})}else if("phone"in e){const{phone:i,password:o,options:l}=e;r=await F(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:i,password:o,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken}},xform:Gu})}else throw new Gs("You must provide either an email or phone number and a password");const{data:n,error:s}=r;return s?{data:{user:null,session:null},error:s}:!n||!n.session||!n.user?{data:{user:null,session:null},error:new Tr}:(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),{data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(r){if(M(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithOAuth(e){var r,n,s,i;return await this._handleProviderSignIn(e.provider,{redirectTo:(r=e.options)===null||r===void 0?void 0:r.redirectTo,scopes:(n=e.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=e.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(i=e.options)===null||i===void 0?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:r}=e;switch(r){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(e){var r,n,s,i,o,l,c,u,d,f,h;let g,x;if("message"in e)g=e.message,x=e.signature;else{const{chain:b,wallet:j,statement:y,options:p}=e;let m;if(Ee())if(typeof j=="object")m=j;else{const A=window;if("ethereum"in A&&typeof A.ethereum=="object"&&"request"in A.ethereum&&typeof A.ethereum.request=="function")m=A.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof j!="object"||!(p!=null&&p.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");m=j}const N=new URL((r=p==null?void 0:p.url)!==null&&r!==void 0?r:window.location.href),v=await m.request({method:"eth_requestAccounts"}).then(A=>A).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!v||v.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const S=Pp(v[0]);let E=(n=p==null?void 0:p.signInWithEthereum)===null||n===void 0?void 0:n.chainId;if(!E){const A=await m.request({method:"eth_chainId"});E=jw(A)}const P={domain:N.host,address:S,statement:y,uri:N.href,version:"1",chainId:E,nonce:(s=p==null?void 0:p.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(o=(i=p==null?void 0:p.signInWithEthereum)===null||i===void 0?void 0:i.issuedAt)!==null&&o!==void 0?o:new Date,expirationTime:(l=p==null?void 0:p.signInWithEthereum)===null||l===void 0?void 0:l.expirationTime,notBefore:(c=p==null?void 0:p.signInWithEthereum)===null||c===void 0?void 0:c.notBefore,requestId:(u=p==null?void 0:p.signInWithEthereum)===null||u===void 0?void 0:u.requestId,resources:(d=p==null?void 0:p.signInWithEthereum)===null||d===void 0?void 0:d.resources};g=kw(P),x=await m.request({method:"personal_sign",params:[_w(g),S]})}try{const{data:b,error:j}=await F(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:g,signature:x},!((f=e.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:ot});if(j)throw j;return!b||!b.session||!b.user?{data:{user:null,session:null},error:new Tr}:(b.session&&(await this._saveSession(b.session),await this._notifyAllSubscribers("SIGNED_IN",b.session)),{data:Object.assign({},b),error:j})}catch(b){if(M(b))return{data:{user:null,session:null},error:b};throw b}}async signInWithSolana(e){var r,n,s,i,o,l,c,u,d,f,h,g;let x,b;if("message"in e)x=e.message,b=e.signature;else{const{chain:j,wallet:y,statement:p,options:m}=e;let N;if(Ee())if(typeof y=="object")N=y;else{const S=window;if("solana"in S&&typeof S.solana=="object"&&("signIn"in S.solana&&typeof S.solana.signIn=="function"||"signMessage"in S.solana&&typeof S.solana.signMessage=="function"))N=S.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(m!=null&&m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");N=y}const v=new URL((r=m==null?void 0:m.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in N&&N.signIn){const S=await N.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},m==null?void 0:m.signInWithSolana),{version:"1",domain:v.host,uri:v.href}),p?{statement:p}:null));let E;if(Array.isArray(S)&&S[0]&&typeof S[0]=="object")E=S[0];else if(S&&typeof S=="object"&&"signedMessage"in S&&"signature"in S)E=S;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in E&&"signature"in E&&(typeof E.signedMessage=="string"||E.signedMessage instanceof Uint8Array)&&E.signature instanceof Uint8Array)x=typeof E.signedMessage=="string"?E.signedMessage:new TextDecoder().decode(E.signedMessage),b=E.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in N)||typeof N.signMessage!="function"||!("publicKey"in N)||typeof N!="object"||!N.publicKey||!("toBase58"in N.publicKey)||typeof N.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");x=[`${v.host} wants you to sign in with your Solana account:`,N.publicKey.toBase58(),...p?["",p,""]:[""],"Version: 1",`URI: ${v.href}`,`Issued At: ${(s=(n=m==null?void 0:m.signInWithSolana)===null||n===void 0?void 0:n.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((i=m==null?void 0:m.signInWithSolana)===null||i===void 0)&&i.notBefore?[`Not Before: ${m.signInWithSolana.notBefore}`]:[],...!((o=m==null?void 0:m.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${m.signInWithSolana.expirationTime}`]:[],...!((l=m==null?void 0:m.signInWithSolana)===null||l===void 0)&&l.chainId?[`Chain ID: ${m.signInWithSolana.chainId}`]:[],...!((c=m==null?void 0:m.signInWithSolana)===null||c===void 0)&&c.nonce?[`Nonce: ${m.signInWithSolana.nonce}`]:[],...!((u=m==null?void 0:m.signInWithSolana)===null||u===void 0)&&u.requestId?[`Request ID: ${m.signInWithSolana.requestId}`]:[],...!((f=(d=m==null?void 0:m.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||f===void 0)&&f.length?["Resources",...m.signInWithSolana.resources.map(E=>`- ${E}`)]:[]].join(`
`);const S=await N.signMessage(new TextEncoder().encode(x),"utf8");if(!S||!(S instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");b=S}}try{const{data:j,error:y}=await F(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:x,signature:mr(b)},!((h=e.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(g=e.options)===null||g===void 0?void 0:g.captchaToken}}:null),xform:ot});if(y)throw y;return!j||!j.session||!j.user?{data:{user:null,session:null},error:new Tr}:(j.session&&(await this._saveSession(j.session),await this._notifyAllSubscribers("SIGNED_IN",j.session)),{data:Object.assign({},j),error:y})}catch(j){if(M(j))return{data:{user:null,session:null},error:j};throw j}}async _exchangeCodeForSession(e){const r=await ar(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(r??"").split("/");try{const{data:i,error:o}=await F(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:n},xform:ot});if(await At(this.storage,`${this.storageKey}-code-verifier`),o)throw o;return!i||!i.session||!i.user?{data:{user:null,session:null,redirectType:null},error:new Tr}:(i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),{data:Object.assign(Object.assign({},i),{redirectType:s??null}),error:o})}catch(i){if(M(i))return{data:{user:null,session:null,redirectType:null},error:i};throw i}}async signInWithIdToken(e){try{const{options:r,provider:n,token:s,access_token:i,nonce:o}=e,l=await F(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:i,nonce:o,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:ot}),{data:c,error:u}=l;return u?{data:{user:null,session:null},error:u}:!c||!c.session||!c.user?{data:{user:null,session:null},error:new Tr}:(c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers("SIGNED_IN",c.session)),{data:c,error:u})}catch(r){if(M(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithOtp(e){var r,n,s,i,o;try{if("email"in e){const{email:l,options:c}=e;let u=null,d=null;this.flowType==="pkce"&&([u,d]=await Pr(this.storage,this.storageKey));const{error:f}=await F(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(r=c==null?void 0:c.data)!==null&&r!==void 0?r:{},create_user:(n=c==null?void 0:c.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:u,code_challenge_method:d},redirectTo:c==null?void 0:c.emailRedirectTo});return{data:{user:null,session:null},error:f}}if("phone"in e){const{phone:l,options:c}=e,{data:u,error:d}=await F(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(s=c==null?void 0:c.data)!==null&&s!==void 0?s:{},create_user:(i=c==null?void 0:c.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(o=c==null?void 0:c.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:u==null?void 0:u.message_id},error:d}}throw new Gs("You must provide either an email or phone number.")}catch(l){if(M(l))return{data:{user:null,session:null},error:l};throw l}}async verifyOtp(e){var r,n;try{let s,i;"options"in e&&(s=(r=e.options)===null||r===void 0?void 0:r.redirectTo,i=(n=e.options)===null||n===void 0?void 0:n.captchaToken);const{data:o,error:l}=await F(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:i}}),redirectTo:s,xform:ot});if(l)throw l;if(!o)throw new Error("An error occurred on token verification.");const c=o.session,u=o.user;return c!=null&&c.access_token&&(await this._saveSession(c),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c)),{data:{user:u,session:c},error:null}}catch(s){if(M(s))return{data:{user:null,session:null},error:s};throw s}}async signInWithSSO(e){var r,n,s;try{let i=null,o=null;return this.flowType==="pkce"&&([i,o]=await Pr(this.storage,this.storageKey)),await F(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(n=(r=e.options)===null||r===void 0?void 0:r.redirectTo)!==null&&n!==void 0?n:void 0}),!((s=e==null?void 0:e.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:i,code_challenge_method:o}),headers:this.headers,xform:mw})}catch(i){if(M(i))return{data:null,error:i};throw i}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:r},error:n}=e;if(n)throw n;if(!r)throw new at;const{error:s}=await F(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return{data:{user:null,session:null},error:s}})}catch(e){if(M(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const r=`${this.url}/resend`;if("email"in e){const{email:n,type:s,options:i}=e,{error:o}=await F(this.fetch,"POST",r,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},redirectTo:i==null?void 0:i.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in e){const{phone:n,type:s,options:i}=e,{data:o,error:l}=await F(this.fetch,"POST",r,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}}});return{data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:l}}throw new Gs("You must provide either an email or phone number and a type")}catch(r){if(M(r))return{data:{user:null,session:null},error:r};throw r}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async r=>r))}async _acquireLock(e,r){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await r()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const n=r();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await e(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const r=await ar(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?e=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const n=e.expires_at?e.expires_at*1e3-Date.now()<La:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",e.expires_at),!n){if(this.userStorage){const o=await ar(this.userStorage,this.storageKey+"-user");o!=null&&o.user?e.user=o.user:e.user=Ua()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const o={value:this.suppressGetSessionWarning};e.user=dw(e.user,o),o.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:s,error:i}=await this._callRefreshToken(e.refresh_token);return i?{data:{session:null},error:i}:{data:{session:s},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(e){try{return e?await F(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Bt}):await this._useSession(async r=>{var n,s,i;const{data:o,error:l}=r;if(l)throw l;return!(!((n=o.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new at}:await F(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(i=(s=o.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0,xform:Bt})})}catch(r){if(M(r))return W0(r)&&(await this._removeSession(),await At(this.storage,`${this.storageKey}-code-verifier`)),{data:{user:null},error:r};throw r}}async updateUser(e,r={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,r))}async _updateUser(e,r={}){try{return await this._useSession(async n=>{const{data:s,error:i}=n;if(i)throw i;if(!s.session)throw new at;const o=s.session;let l=null,c=null;this.flowType==="pkce"&&e.email!=null&&([l,c]=await Pr(this.storage,this.storageKey));const{data:u,error:d}=await F(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:l,code_challenge_method:c}),jwt:o.access_token,xform:Bt});if(d)throw d;return o.user=u.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(n){if(M(n))return{data:{user:null},error:n};throw n}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new at;const r=Date.now()/1e3;let n=r,s=!0,i=null;const{payload:o}=Ba(e.access_token);if(o.exp&&(n=o.exp,s=n<=r),s){const{data:l,error:c}=await this._callRefreshToken(e.refresh_token);if(c)return{data:{user:null,session:null},error:c};if(!l)return{data:{user:null,session:null},error:null};i=l}else{const{data:l,error:c}=await this._getUser(e.access_token);if(c)throw c;i={access_token:e.access_token,refresh_token:e.refresh_token,user:l.user,token_type:"bearer",expires_in:n-r,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return{data:{user:i.user,session:i},error:null}}catch(r){if(M(r))return{data:{session:null,user:null},error:r};throw r}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async r=>{var n;if(!e){const{data:o,error:l}=r;if(l)throw l;e=(n=o.session)!==null&&n!==void 0?n:void 0}if(!(e!=null&&e.refresh_token))throw new at;const{data:s,error:i}=await this._callRefreshToken(e.refresh_token);return i?{data:{user:null,session:null},error:i}:s?{data:{user:s.user,session:s},error:null}:{data:{user:null,session:null},error:null}})}catch(r){if(M(r))return{data:{user:null,session:null},error:r};throw r}}async _getSessionFromURL(e,r){try{if(!Ee())throw new Js("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Js(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new Mu("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Js("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Mu("No code detected.");const{data:p,error:m}=await this._exchangeCodeForSession(e.code);if(m)throw m;const N=new URL(window.location.href);return N.searchParams.delete("code"),window.history.replaceState(window.history.state,"",N.toString()),{data:{session:p.session,redirectType:null},error:null}}const{provider_token:n,provider_refresh_token:s,access_token:i,refresh_token:o,expires_in:l,expires_at:c,token_type:u}=e;if(!i||!l||!o||!u)throw new Js("No session defined in URL");const d=Math.round(Date.now()/1e3),f=parseInt(l);let h=d+f;c&&(h=parseInt(c));const g=h-d;g*1e3<=Ar&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${f}s`);const x=h-f;d-x>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",x,h,d):d-x<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",x,h,d);const{data:b,error:j}=await this._getUser(i);if(j)throw j;const y={provider_token:n,provider_refresh_token:s,access_token:i,expires_in:f,expires_at:h,refresh_token:o,token_type:u,user:b.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:y,redirectType:e.type},error:null}}catch(n){if(M(n))return{data:{session:null,redirectType:null},error:n};throw n}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const r=await ar(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&r)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async r=>{var n;const{data:s,error:i}=r;if(i)return{error:i};const o=(n=s.session)===null||n===void 0?void 0:n.access_token;if(o){const{error:l}=await this.admin.signOut(o,e);if(l&&!(F0(l)&&(l.status===404||l.status===401||l.status===403)))return{error:l}}return e!=="others"&&(await this._removeSession(),await At(this.storage,`${this.storageKey}-code-verifier`)),{error:null}})}onAuthStateChange(e){const r=Y0(),n={id:r,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,n),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(r)})))(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async r=>{var n,s;try{const{data:{session:i},error:o}=r;if(o)throw o;await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",i)),this._debug("INITIAL_SESSION","callback id",e,"session",i)}catch(i){await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",i),console.error(i)}})}async resetPasswordForEmail(e,r={}){let n=null,s=null;this.flowType==="pkce"&&([n,s]=await Pr(this.storage,this.storageKey,!0));try{return await F(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(i){if(M(i))return{data:null,error:i};throw i}}async getUserIdentities(){var e;try{const{data:r,error:n}=await this.getUser();if(n)throw n;return{data:{identities:(e=r.user.identities)!==null&&e!==void 0?e:[]},error:null}}catch(r){if(M(r))return{data:null,error:r};throw r}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var r;try{const{data:n,error:s}=await this._useSession(async i=>{var o,l,c,u,d;const{data:f,error:h}=i;if(h)throw h;const g=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(l=e.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return await F(this.fetch,"GET",g,{headers:this.headers,jwt:(d=(u=f.session)===null||u===void 0?void 0:u.access_token)!==null&&d!==void 0?d:void 0})});if(s)throw s;return Ee()&&!(!((r=e.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),{data:{provider:e.provider,url:n==null?void 0:n.url},error:null}}catch(n){if(M(n))return{data:{provider:e.provider,url:null},error:n};throw n}}async linkIdentityIdToken(e){return await this._useSession(async r=>{var n;try{const{error:s,data:{session:i}}=r;if(s)throw s;const{options:o,provider:l,token:c,access_token:u,nonce:d}=e,f=await F(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(n=i==null?void 0:i.access_token)!==null&&n!==void 0?n:void 0,body:{provider:l,id_token:c,access_token:u,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:ot}),{data:h,error:g}=f;return g?{data:{user:null,session:null},error:g}:!h||!h.session||!h.user?{data:{user:null,session:null},error:new Tr}:(h.session&&(await this._saveSession(h.session),await this._notifyAllSubscribers("USER_UPDATED",h.session)),{data:h,error:g})}catch(s){if(M(s))return{data:{user:null,session:null},error:s};throw s}})}async unlinkIdentity(e){try{return await this._useSession(async r=>{var n,s;const{data:i,error:o}=r;if(o)throw o;return await F(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(s=(n=i.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(r){if(M(r))return{data:null,error:r};throw r}}async _refreshAccessToken(e){const r=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(r,"begin");try{const n=Date.now();return await tw(async s=>(s>0&&await ew(200*Math.pow(2,s-1)),this._debug(r,"refreshing attempt",s),await F(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:ot})),(s,i)=>{const o=200*Math.pow(2,s);return i&&za(i)&&Date.now()+o-n<Ar})}catch(n){if(this._debug(r,"error",n),M(n))return{data:{session:null,user:null},error:n};throw n}finally{this._debug(r,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,r){const n=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",r,"url",n),Ee()&&!r.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n},error:null}}async _recoverAndRefresh(){var e,r;const n="#_recoverAndRefresh()";this._debug(n,"begin");try{const s=await ar(this.storage,this.storageKey);if(s&&this.userStorage){let o=await ar(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:s.user},await Ir(this.userStorage,this.storageKey+"-user",o)),s.user=(e=o==null?void 0:o.user)!==null&&e!==void 0?e:Ua()}else if(s&&!s.user&&!s.user){const o=await ar(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(s.user=o.user,await At(this.storage,this.storageKey+"-user"),await Ir(this.storage,this.storageKey,s)):s.user=Ua()}if(this._debug(n,"session from storage",s),!this._isValidSession(s)){this._debug(n,"session is not valid"),s!==null&&await this._removeSession();return}const i=((r=s.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<La;if(this._debug(n,`session has${i?"":" not"} expired with margin of ${La}s`),i){if(this.autoRefreshToken&&s.refresh_token){const{error:o}=await this._callRefreshToken(s.refresh_token);o&&(console.error(o),za(o)||(this._debug(n,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:l}=await this._getUser(s.access_token);!l&&(o!=null&&o.user)?(s.user=o.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(n,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(n,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(n,"error",s),console.error(s);return}finally{this._debug(n,"end")}}async _callRefreshToken(e){var r,n;if(!e)throw new at;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new ia;const{data:i,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!i.session)throw new at;await this._saveSession(i.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",i.session);const l={data:i.session,error:null};return this.refreshingDeferred.resolve(l),l}catch(i){if(this._debug(s,"error",i),M(i)){const o={data:null,error:i};return za(i)||await this._removeSession(),(r=this.refreshingDeferred)===null||r===void 0||r.resolve(o),o}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(i),i}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,r,n=!0){const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",r,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:r});const i=[],o=Array.from(this.stateChangeEmitters.values()).map(async l=>{try{await l.callback(e,r)}catch(c){i.push(c)}});if(await Promise.all(o),i.length>0){for(let l=0;l<i.length;l+=1)console.error(i[l]);throw i[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const r=Object.assign({},e),n=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&r.user&&await Ir(this.userStorage,this.storageKey+"-user",{user:r.user});const s=Object.assign({},r);delete s.user;const i=qu(s);await Ir(this.storage,this.storageKey,i)}else{const s=qu(r);await Ir(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),await At(this.storage,this.storageKey),await At(this.storage,this.storageKey+"-code-verifier"),await At(this.storage,this.storageKey+"-user"),this.userStorage&&await At(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&Ee()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Ar);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async r=>{const{data:{session:n}}=r;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((n.expires_at*1e3-e)/Ar);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${Ar}ms, refresh threshold is ${Jo} ticks`),s<=Jo&&await this._callRefreshToken(n.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof Tp)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!Ee()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const r=`#_onVisibilityChanged(${e})`;this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,r,n){const s=[`provider=${encodeURIComponent(r)}`];if(n!=null&&n.redirectTo&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n!=null&&n.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){const[i,o]=await Pr(this.storage,this.storageKey),l=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(o)}`});s.push(l.toString())}if(n!=null&&n.queryParams){const i=new URLSearchParams(n.queryParams);s.push(i.toString())}return n!=null&&n.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession(async r=>{var n;const{data:s,error:i}=r;return i?{data:null,error:i}:await F(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(r){if(M(r))return{data:null,error:r};throw r}}async _enroll(e){try{return await this._useSession(async r=>{var n,s;const{data:i,error:o}=r;if(o)return{data:null,error:o};const l=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:c,error:u}=await F(this.fetch,"POST",`${this.url}/factors`,{body:l,headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token});return u?{data:null,error:u}:(e.factorType==="totp"&&c.type==="totp"&&(!((s=c==null?void 0:c.totp)===null||s===void 0)&&s.qr_code)&&(c.totp.qr_code=`data:image/svg+xml;utf-8,${c.totp.qr_code}`),{data:c,error:null})})}catch(r){if(M(r))return{data:null,error:r};throw r}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async r=>{var n;const{data:s,error:i}=r;if(i)return{data:null,error:i};const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Ow(e.webauthn.credential_response):Dw(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await F(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});return c?{data:null,error:c}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),{data:l,error:c})})}catch(r){if(M(r))return{data:null,error:r};throw r}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async r=>{var n;const{data:s,error:i}=r;if(i)return{data:null,error:i};const o=await F(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Tw(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Pw(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(M(r))return{data:null,error:r};throw r}})}async _challengeAndVerify(e){const{data:r,error:n}=await this._challenge({factorId:e.factorId});return n?{data:null,error:n}:await this._verify({factorId:e.factorId,challengeId:r.id,code:e.code})}async _listFactors(){var e;const{data:{user:r},error:n}=await this.getUser();if(n)return{data:null,error:n};const s={all:[],phone:[],totp:[],webauthn:[]};for(const i of(e=r==null?void 0:r.factors)!==null&&e!==void 0?e:[])s.all.push(i),i.status==="verified"&&s[i.factor_type].push(i);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(){var e,r;const{data:{session:n},error:s}=await this.getSession();if(s)return{data:null,error:s};if(!n)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:i}=Ba(n.access_token);let o=null;i.aal&&(o=i.aal);let l=o;((r=(e=n.user.factors)===null||e===void 0?void 0:e.filter(d=>d.status==="verified"))!==null&&r!==void 0?r:[]).length>0&&(l="aal2");const u=i.amr||[];return{data:{currentLevel:o,nextLevel:l,currentAuthenticationMethods:u},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?{data:null,error:s}:n?await F(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:n.access_token,xform:i=>({data:i,error:null})}):{data:null,error:new at}})}catch(r){if(M(r))return{data:null,error:r};throw r}}async _approveAuthorization(e,r){try{return await this._useSession(async n=>{const{data:{session:s},error:i}=n;if(i)return{data:null,error:i};if(!s)return{data:null,error:new at};const o=await F(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:l=>({data:l,error:null})});return o.data&&o.data.redirect_url&&Ee()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(n){if(M(n))return{data:null,error:n};throw n}}async _denyAuthorization(e,r){try{return await this._useSession(async n=>{const{data:{session:s},error:i}=n;if(i)return{data:null,error:i};if(!s)return{data:null,error:new at};const o=await F(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:l=>({data:l,error:null})});return o.data&&o.data.redirect_url&&Ee()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(n){if(M(n))return{data:null,error:n};throw n}}async fetchJwk(e,r={keys:[]}){let n=r.keys.find(l=>l.kid===e);if(n)return n;const s=Date.now();if(n=this.jwks.keys.find(l=>l.kid===e),n&&this.jwks_cached_at+U0>s)return n;const{data:i,error:o}=await F(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=s,n=i.keys.find(l=>l.kid===e),!n)?null:n}async getClaims(e,r={}){try{let n=e;if(!n){const{data:g,error:x}=await this.getSession();if(x||!g.session)return{data:null,error:x};n=g.session.access_token}const{header:s,payload:i,signature:o,raw:{header:l,payload:c}}=Ba(n);r!=null&&r.allowExpired||lw(i.exp);const u=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!u){const{error:g}=await this.getUser(n);if(g)throw g;return{data:{claims:i,header:s,signature:o},error:null}}const d=cw(s.alg),f=await crypto.subtle.importKey("jwk",u,d,!0,["verify"]);if(!await crypto.subtle.verify(d,f,o,J0(`${l}.${c}`)))throw new Xo("Invalid JWT signature");return{data:{claims:i,header:s,signature:o},error:null}}catch(n){if(M(n))return{data:null,error:n};throw n}}}ms.nextInstanceID=0;const Mw=ms;class Fw extends Mw{constructor(e){super(e)}}class Ww{constructor(e,r,n){var s,i,o;this.supabaseUrl=e,this.supabaseKey=r;const l=I0(e);if(!r)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",l),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",l),this.storageUrl=new URL("storage/v1",l),this.functionsUrl=new URL("functions/v1",l);const c=`sb-${l.hostname.split(".")[0]}-auth-token`,u={db:E0,realtime:T0,auth:Object.assign(Object.assign({},C0),{storageKey:c}),global:N0},d=A0(n??{},u);this.storageKey=(s=d.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(i=d.global.headers)!==null&&i!==void 0?i:{},d.accessToken?(this.accessToken=d.accessToken,this.auth=new Proxy({},{get:(f,h)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=d.auth)!==null&&o!==void 0?o:{},this.headers,d.global.fetch),this.fetch=D0(r,this._getAccessToken.bind(this),d.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},d.realtime)),this.rest=new Iy(new URL("rest/v1",l).href,{headers:this.headers,schema:d.db.schema,fetch:this.fetch}),this.storage=new _0(this.storageUrl.href,this.headers,this.fetch,n==null?void 0:n.storage),d.accessToken||this._listenForAuthEvents()}get functions(){return new Ey(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,r={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,r,n)}channel(e,r={config:{}}){return this.realtime.channel(e,r)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e,r;if(this.accessToken)return await this.accessToken();const{data:n}=await this.auth.getSession();return(r=(e=n.session)===null||e===void 0?void 0:e.access_token)!==null&&r!==void 0?r:this.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:r,detectSessionInUrl:n,storage:s,userStorage:i,storageKey:o,flowType:l,lock:c,debug:u},d,f){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Fw({url:this.authUrl.href,headers:Object.assign(Object.assign({},h),d),storageKey:o,autoRefreshToken:e,persistSession:r,detectSessionInUrl:n,storage:s,userStorage:i,flowType:l,lock:c,debug:u,fetch:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(g=>g.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new Xy(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((r,n)=>{this._handleTokenChanged(r,"CLIENT",n==null?void 0:n.access_token)})}_handleTokenChanged(e,r,n){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),r=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}}const Vw=(t,e,r)=>new Ww(t,e,r);function Hw(){if(typeof window<"u"||typeof process>"u")return!1;const t=process.version;if(t==null)return!1;const e=t.match(/^v(\d+)\./);return e?parseInt(e[1],10)<=18:!1}Hw()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const qw="https://dlbqvrsmvgjrynytmlsk.supabase.co",Kw="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsYnF2cnNtdmdqcnlueXRtbHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTk1ODAsImV4cCI6MjA3NzY3NTU4MH0.0crmxxtamB9eF16rro75UTVEqNzaRoNEjD85RpO3dGc";let Fa=null;const Gw=()=>(Fa||(Fa=Vw(qw,Kw),console.log("Supabase client initialized")),Fa);class Jw{constructor(){this.client=Gw()}isConfigured(){return this.client!==null}async getTeamMembers(){if(!this.client)throw new Error("Supabase not configured");const{data:e,error:r}=await this.client.from("team_members").select("*").order("order",{ascending:!0});if(r)throw r;return{teamMembers:e||[],lastUpdated:new Date().toISOString()}}async saveTeamMember(e){if(!this.client)throw new Error("Supabase not configured");if(e.id){const{data:r,error:n}=await this.client.from("team_members").upsert(e).select().single();if(n)throw n;return r}else{const{data:r,error:n}=await this.client.from("team_members").insert(e).select().single();if(n)throw n;return r}}async deleteTeamMember(e){if(!this.client)throw new Error("Supabase not configured");const{data:r}=await this.client.from("team_members").select("image").eq("id",e).single();if(r!=null&&r.image&&r.image.includes("supabase"))try{await this.deleteTeamMemberImage(r.image)}catch(s){console.warn("Failed to delete image from storage:",s)}const{error:n}=await this.client.from("team_members").delete().eq("id",e);if(n)throw n}async uploadTeamMemberImage(e,r){if(!this.client)throw new Error("Supabase not configured");if(!["image/jpeg","image/jpg","image/png","image/webp","image/gif"].includes(e.type))throw new Error("Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.");const s=5*1024*1024;if(e.size>s)throw new Error("File size too large. Maximum size is 5MB.");const i=e.name.split(".").pop(),o=Date.now(),c=`team-headshots/${`${r}-${o}.${i}`}`,{data:u,error:d}=await this.client.storage.from("team-images").upload(c,e,{cacheControl:"3600",upsert:!1});if(d)throw d;const{data:{publicUrl:f}}=this.client.storage.from("team-images").getPublicUrl(c);return f}async deleteTeamMemberImage(e){if(!this.client)throw new Error("Supabase not configured");const r=e.split("/team-images/");if(r.length<2){console.warn("Invalid image URL format:",e);return}const n=r[1],{error:s}=await this.client.storage.from("team-images").remove([n]);if(s)throw s}async getAlumni(){if(!this.client)throw new Error("Supabase not configured");const{data:e,error:r}=await this.client.from("alumni").select("*").order("order",{ascending:!1});if(r)throw r;return{alumniData:Array.isArray(e)?e:[],lastUpdated:new Date().toISOString()}}async saveAlumniSemester(e){if(!this.client)throw new Error("Supabase not configured");const{data:r,error:n}=await this.client.from("alumni").upsert(e).select().single();if(n)throw n;return r}async deleteAlumniSemester(e){if(!this.client)throw new Error("Supabase not configured");const r=typeof e=="string"?parseInt(e,10):e;if(!Number.isFinite(r))throw new Error("Invalid id for deletion");const{error:n}=await this.client.from("alumni").delete().eq("id",r);if(n)throw n}async deleteAlumniSemesterSafe(e){if(!this.client)throw new Error("Supabase not configured");if(!e||typeof e.id!="number"&&typeof e.id!="string"&&!e.semester)throw new Error("Invalid delete target");let r=e.id;if(typeof r=="string"){const s=parseInt(r,10);Number.isFinite(s)&&(r=s)}if(typeof r!="number"){const{data:s,error:i}=await this.client.from("alumni").select("id").eq("semester",e.semester).order("created_at",{ascending:!1}).limit(1).maybeSingle();if(i)throw i;if(!(s!=null&&s.id))throw new Error("Semester not found");r=s.id}const{error:n}=await this.client.from("alumni").delete().eq("id",r);if(n)throw n}async saveAlumniOrder(e){var o;if(!this.client)throw new Error("Supabase not configured");if(!Array.isArray(e)||e.length===0)return;const r=e.filter(l=>typeof l.id=="number"&&!Number.isNaN(l.id));if(r.length===0)return;const n=r.map(({id:l,order:c})=>this.client.from("alumni").update({order:c}).eq("id",l)),i=(o=(await Promise.all(n)).find(l=>l.error))==null?void 0:o.error;if(i)throw i}async getSponsors(){if(!this.client)throw new Error("Supabase not configured");const{data:e,error:r}=await this.client.from("sponsors").select("*").order("tier",{ascending:!0});if(r)throw r;return{sponsorTiers:e||[],lastUpdated:new Date().toISOString()}}async saveSponsor(e){if(!this.client)throw new Error("Supabase not configured");const{data:r,error:n}=await this.client.from("sponsors").upsert(e).select().single();if(n)throw n;return r}async deleteSponsor(e){if(!this.client)throw new Error("Supabase not configured");const{error:r}=await this.client.from("sponsors").delete().eq("id",e);if(r)throw r}async getSchedules(){if(!this.client)throw new Error("Supabase not configured");const{data:e,error:r}=await this.client.from("schedules").select("*").order("date",{ascending:!1});if(r)throw r;return{schedules:e||[],lastUpdated:new Date().toISOString()}}async saveSchedule(e){if(!this.client)throw new Error("Supabase not configured");const{data:r,error:n}=await this.client.from("schedules").upsert(e).select().single();if(n)throw n;return r}async deleteSchedule(e){if(!this.client)throw new Error("Supabase not configured");const{error:r}=await this.client.from("schedules").delete().eq("id",e);if(r)throw r}async getOrders(){if(!this.client)throw new Error("Supabase not configured");const{data:e,error:r}=await this.client.from("orders").select("*").order("created_at",{ascending:!1});if(r)throw r;return{orders:e||[],lastUpdated:new Date().toISOString()}}async saveOrder(e){if(!this.client)throw new Error("Supabase not configured");const{data:r,error:n}=await this.client.from("orders").upsert(e).select().single();if(n)throw n;return r}async deleteOrder(e){if(!this.client)throw new Error("Supabase not configured");const{error:r}=await this.client.from("orders").delete().eq("id",e);if(r)throw r}subscribeToTable(e,r){if(!this.client)throw new Error("Supabase not configured");return this.client.channel(`public:${e}`).on("postgres_changes",{event:"*",schema:"public",table:e},r).subscribe()}unsubscribe(e){e&&e.unsubscribe()}async signIn(e,r){if(!this.client)throw new Error("Supabase not configured");const{data:n,error:s}=await this.client.auth.signInWithPassword({email:e,password:r});if(s)throw s;return n}async signOut(){if(!this.client)throw new Error("Supabase not configured");const{error:e}=await this.client.auth.signOut();if(e)throw e}async getUser(){if(!this.client)throw new Error("Supabase not configured");const{data:{user:e}}=await this.client.auth.getUser();return e}}const Ie=new Jw,Qw=()=>{const[t,e]=_.useState([]),[r,n]=_.useState(!0),[s,i]=_.useState(null);_.useEffect(()=>{document.title="SolarPack · Alumni",o()},[]);const o=async()=>{try{const u=await Ie.getAlumni();e(u.alumniData||[]),console.log("✓ Loaded alumni data from Supabase:",u.alumniData.length,"semesters")}catch(u){console.error("Error loading alumni data from Supabase:",u),i(u.message),e([])}finally{n(!1)}},l=[],c=[];for(let u=0;u<t.length;u+=2){const d=t[u],f=t[u+1];d&&l.push(d),f&&c.push(f)}return r?a.jsx("div",{style:{textAlign:"center",padding:"4rem",color:"var(--subtxt)"},children:"Loading alumni data..."}):s?a.jsxs("div",{style:{textAlign:"center",padding:"4rem",color:"#dc3545"},children:["Error loading alumni data: ",s]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        /* Page-specific styles */
        h1 { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: clamp(2.5rem, 7vw, 4.5rem); 
          letter-spacing: 0.04em; 
          margin: 2.5rem 0 0.5rem; 
          text-align: center; 
        }
        
        .alumni-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
          gap: 2rem; 
          max-width: 900px; 
          margin: 2.5rem auto 0; 
        }
        
        .alumni-card { 
          background: var(--card); 
          border-radius: var(--radius); 
          box-shadow: 0 1px 6px #0003; 
          padding: 2rem 1.2rem 1.2rem; 
          text-align: center; 
        }
        
        .alumni-img { 
          width: 90px; 
          height: 90px; 
          border-radius: 50%; 
          background: #222; 
          object-fit: cover; 
          margin-bottom: 1rem; 
        }
        
        .alumni-name { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: 1.5rem; 
          color: var(--accent); 
          margin-bottom: 0.2rem; 
        }
        
        .alumni-role { 
          color: var(--subtxt); 
          font-size: 1.1rem; 
          margin-bottom: 0.7rem; 
        }
        
        .alumni-socials a { 
          color: var(--accent); 
          margin: 0 0.4rem; 
          font-size: 1.2rem; 
        }
        
        .alumni-socials a:hover { 
          color: #fff; 
        }
        
        .alumni-by-year {
          max-width: 900px;
          margin: 2.5rem auto 0;
        }
        
        .alumni-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        
        /* Responsive alumni layout: 1 column if screen < 850px */
        @media (max-width: 850px) {
          .alumni-columns {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 1.5rem;
          }
          .alumni-by-year {
            padding: 0 1rem;
          }
        }
        
        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 1rem; 
          margin: 3.5rem 0 1.5rem; 
        }

        .alumni-section {
          margin-bottom: 2.5rem;
        }

        .alumni-section h2 {
          color: var(--accent);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          margin-bottom: 0.7rem;
        }

        .alumni-section ul {
          color: var(--subtxt);
          font-size: 1.13rem;
          line-height: 1.7;
          list-style: none;
          padding: 0;
        }

        .alumni-section li {
          margin-bottom: 0.3rem;
        }

        .alumni-section b {
          color: var(--text);
        }
      `}),a.jsx("h1",{children:"Alumni"}),a.jsx("div",{className:"alumni-grid"}),a.jsx("div",{className:"alumni-by-year",children:a.jsxs("div",{className:"alumni-columns",children:[a.jsx("div",{children:l.map((u,d)=>{var f;return a.jsxs("section",{className:"alumni-section",children:[a.jsx("h2",{children:u.semester}),a.jsx("ul",{children:(f=u.leadership)==null?void 0:f.map((h,g)=>a.jsxs("li",{children:[a.jsxs("b",{children:[h.role,":"]})," ",h.name]},g))})]},d)})}),a.jsx("div",{children:c.map((u,d)=>{var f;return a.jsxs("section",{className:"alumni-section",children:[a.jsx("h2",{children:u.semester}),a.jsx("ul",{children:(f=u.leadership)==null?void 0:f.map((h,g)=>a.jsxs("li",{children:[a.jsxs("b",{children:[h.role,":"]})," ",h.name]},g))})]},d)})})]})})]})},Yw=()=>(_.useEffect(()=>{document.title="SolarPack · Contact"},[]),a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        /* Page-specific styles */
        h1 { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: clamp(2.5rem, 7vw, 4.5rem); 
          letter-spacing: 0.04em; 
          margin: 2.5rem 0 0.5rem; 
          text-align: center; 
        }
        
        .contact-section { 
          background: var(--card); 
          border-radius: var(--radius); 
          box-shadow: 0 1px 6px #0003; 
          padding: 2.5rem 1.5rem; 
          max-width: 600px; 
          margin: 2.5rem auto 0; 
          text-align: center; 
        }
        
        .contact-info { 
          color: var(--subtxt); 
          font-size: 1.1rem; 
          margin-bottom: 1.5rem; 
        }
        
        .contact-socials a { 
          color: var(--accent); 
          margin: 0 0.5rem; 
          font-size: 1.5rem; 
        }
        
        .contact-socials a:hover { 
          color: #fff; 
        }
        
        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 1rem; 
          margin: 3.5rem 0 1.5rem; 
        }
        
        .contact-info a[href^="mailto"] { 
          color: var(--accent); 
          text-decoration: underline; 
        }
        
        .contact-info a[href^="mailto"]:hover { 
          color: #fff; 
        }
      `}),a.jsx("h1",{children:"Contact Us"}),a.jsxs("div",{className:"contact-section",children:[a.jsxs("div",{className:"contact-info",children:[a.jsxs("p",{children:["Email us at ",a.jsx("a",{href:"mailto:solarpacknc@ncsu.edu",children:"solarpacknc@ncsu.edu"})]}),a.jsx("p",{children:"Or reach out on our socials below!"})]}),a.jsxs("div",{className:"contact-socials",children:[a.jsx("a",{href:"https://www.instagram.com/solarpacknc/",title:"Instagram",target:"_blank",rel:"noopener",children:a.jsx("i",{className:"fab fa-instagram"})}),a.jsx("a",{href:"https://www.linkedin.com/company/solarpack-nc-state/",title:"LinkedIn",target:"_blank",rel:"noopener",children:a.jsx("i",{className:"fab fa-linkedin"})}),a.jsx("a",{href:"https://www.facebook.com/SolarPackNC/",title:"Facebook",target:"_blank",rel:"noopener",children:a.jsx("i",{className:"fab fa-facebook"})})]})]})]})),Xw=()=>{const[t,e]=_.useState(null),[r,n]=_.useState(""),[s,i]=_.useState(!1);_.useEffect(()=>{document.title="SolarPack · Donate"},[]);const o=[5,50,100,200],l=d=>{e(d),n(d.toString()),i(!0)},c=d=>{const f=d.target.value;n(f),f&&parseFloat(f)>=1?(e(parseFloat(f)),i(!0)):i(!1)},u=()=>{t&&t>=1&&window.open("https://www.paypal.com/fundraiser/charity/3728956","_blank")};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        /* Page-specific styles */
        h1 { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: clamp(2.5rem, 7vw, 4.5rem); 
          letter-spacing: 0.04em; 
          margin: 2.5rem 0 0.5rem; 
          text-align: center; 
        }
        
        .donate-section { 
          background: var(--card); 
          border-radius: var(--radius); 
          box-shadow: 0 1px 6px #0003; 
          padding: 2.5rem 1.5rem; 
          max-width: 600px; 
          margin: 2.5rem auto 0; 
          text-align: center; 
        }
        
        .donate-btn { 
          display: inline-block; 
          background: var(--accent); 
          color: #fff; 
          font-size: 1.2rem; 
          font-weight: 600; 
          padding: 0.9rem 2.2rem; 
          border: none; 
          border-radius: var(--radius); 
          margin-top: 1.5rem; 
          cursor: pointer; 
          transition: background 0.15s; 
          text-decoration: none; 
        }
        
        .donate-btn:hover { 
          background: #b71c1c; 
        }

        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 1rem; 
          margin: 3.5rem 0 1.5rem; 
        }

        .donation-choices-group {
          display: flex;
          gap: 0.7rem;
          align-items: center;
          justify-content: center;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        
        .donation-choice {
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.08rem;
          font-weight: 600;
          padding: 0.6rem 1.3rem;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s;
          box-shadow: 0 1px 4px #0002;
          outline: none;
        }
        
        .donation-choice.active, .donation-choice:focus {
          background: #b71c1c;
          box-shadow: 0 2px 8px #0003;
        }
        
        .donation-choice:hover {
          background: #c0392b;
        }
        
        #donation-amount {
          border: 1.5px solid var(--accent);
          border-radius: 8px;
          padding: 0.6rem 1rem;
          font-size: 1.08rem;
          width: 160px;
          margin-left: 0.7rem;
          transition: border-color 0.18s;
          background: var(--surface);
          color: var(--text);
        }
        
        #donation-amount:focus {
          border-color: #b71c1c;
          outline: none;
        }
        
        .selected-amount-display {
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--accent);
          margin: 1.2rem auto 0.7rem auto;
          text-align: center;
          letter-spacing: 0.02em;
        }

        .donate-note { 
          margin-top: 1.5rem; 
          color: var(--subtxt); 
          font-size: 0.82rem; 
          line-height: 1.4; 
        }

        .donation-uses {
          text-align: left;
          max-width: 420px;
          margin: 1.5rem auto;
          color: var(--subtxt);
          font-size: 1.08rem;
          line-height: 1.7;
        }

        .donation-uses li {
          margin-bottom: 0.5rem;
        }

        .donation-uses b {
          color: var(--text);
        }
      `}),a.jsx("h1",{children:"Support Our Mission"}),a.jsxs("div",{className:"donate-section",children:[a.jsx("p",{children:"Your donation helps us build, innovate, and compete in solar car challenges. Every contribution makes a difference!"}),a.jsxs("form",{style:{margin:"2rem 0"},children:[a.jsxs("div",{style:{marginBottom:"1.2rem"},children:[a.jsx("label",{htmlFor:"donation-amount",style:{fontWeight:"600",marginBottom:"0.7rem",display:"block"},children:"Choose an amount:"}),a.jsxs("div",{className:"donation-choices-group",children:[o.map(d=>a.jsxs("button",{type:"button",className:`donation-choice ${t===d?"active":""}`,onClick:()=>l(d),children:["$",d]},d)),a.jsx("input",{type:"number",min:"1",step:"1",id:"donation-amount",placeholder:"Custom amount",value:r,onChange:c})]})]}),s&&t&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"selected-amount-display",children:["You are donating: $",parseFloat(t).toFixed(2)]}),a.jsxs("button",{type:"button",className:"donate-btn",onClick:u,children:[a.jsx("i",{className:"fab fa-paypal",style:{marginRight:"0.5rem"}}),"Donate with PayPal"]})]})]}),a.jsxs("ul",{className:"donation-uses",children:[a.jsxs("li",{children:[a.jsx("b",{children:"Aeroshell Construction:"})," The largest portion of your donation will go directly toward building our new carbon fiber aeroshell, which is essential for our car's performance and efficiency."]}),a.jsxs("li",{children:[a.jsx("b",{children:"Regulatory Components:"})," We need to purchase fasteners, wires, and other small accessories to meet strict race regulations—including the battery box, ballast boxes, and other required safety features."]}),a.jsxs("li",{children:[a.jsx("b",{children:"2026 Race Preparation:"})," Your support helps us meet all technical and safety requirements so we can compete in the 2026 solar car race and represent NC State on a national stage."]})]}),a.jsx("p",{className:"donate-note",children:"We are a 501(c)(3) charitable organization, EIN: 81-4817863. All the contributions are tax deductible. No goods or services will be provided for the contribution."})]})]})};const Zw=()=>{const[t,e]=_.useState({0:!0});_.useEffect(()=>{document.title="SolarPack · Privacy Policy"},[]);const r=s=>{e(i=>({...i,[s]:!i[s]}))},n=[{title:"Summary",content:a.jsxs("p",{children:["We collect a minimal set of data points ",a.jsx("strong",{children:"only"})," to make the app function and to help us understand and improve performance. We do",a.jsx("em",{children:" not"})," use your data for advertising, marketing, personalization, or tracking across other apps."]})},{title:"Data We Collect",content:a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"Precise Location"})," – Enables GPS-based features such as lap timing and detailed telemetry."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Coarse Location"})," – Provides general region information (e.g., for Bluetooth proximity) when precise GPS is unnecessary."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Device ID"})," – Helps differentiate hardware models and debug device-specific issues."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Product Interaction"})," – Anonymous aggregate data on how you navigate the app (e.g., tab switches) to improve user experience."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Crash Data"})," – Automatic crash reports allow us to diagnose bugs and improve stability."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Performance Data"})," – Metrics like launch time and connection latency help us monitor and optimize performance."]})]})},{title:"Data We Don't Collect",content:a.jsxs("ul",{children:[a.jsx("li",{children:"Contact information (name, email, phone, address)"}),a.jsx("li",{children:"User-generated content (photos, messages, files)"}),a.jsx("li",{children:"Payment or financial details"}),a.jsx("li",{children:"Advertising identifiers or usage for ad targeting"}),a.jsx("li",{children:"Health, biometric, or other sensitive personal data"})]})},{title:"Tracking",content:a.jsxs("p",{children:["Our app ",a.jsx("strong",{children:"does not"})," use any data for cross-app or cross-company tracking as defined by Apple. No data is shared with data brokers or ad networks."]})},{title:"Third-Party Services",content:a.jsx("p",{children:"We use trusted third-party services (e.g., Firebase) solely for analytics, crash reporting, and cloud data storage. Each provider is contractually bound to process data only on our behalf and not for their own marketing or advertising."})},{title:"Data Retention",content:a.jsx("p",{children:"Telemetry and analytics data are stored for the shortest duration necessary to fulfill the purposes outlined above, after which they are either deleted or fully anonymized."})},{title:"Contact Us",content:a.jsxs("p",{children:["Questions? Open an issue on"," ",a.jsx("a",{href:"https://github.com/NCSU-Solarpack",target:"_blank",rel:"noopener noreferrer",children:"GitHub"})," ","or email us at"," ",a.jsx("a",{href:"mailto:solarpacknc@ncsu.edu",children:"solarpacknc@ncsu.edu"}),"."]})}];return a.jsxs("div",{className:"privacy-container",children:[a.jsx("h1",{children:"SOLARPACK Privacy & Data"}),a.jsxs("div",{className:"effective-date",children:[a.jsx("strong",{children:"Effective Date:"})," July 8, 2025"]}),a.jsx("div",{id:"policy",children:n.map((s,i)=>a.jsxs("div",{className:"policy-section",children:[a.jsxs("button",{className:"policy-toggle",onClick:()=>r(i),children:[a.jsx("span",{className:"chevron",style:{transform:t[i]?"rotate(90deg)":"rotate(0deg)"},children:"›"}),s.title.includes("Don't")?a.jsxs(a.Fragment,{children:["Data We ",a.jsx("em",{children:"Don't"})," Collect"]}):s.title]}),a.jsx("div",{className:`policy-content ${t[i]?"open":""}`,children:s.content})]},i))}),a.jsx("div",{className:"footer-note",children:"— End of Policy —"})]})},ex=()=>{const[t,e]=_.useState([]),[r,n]=_.useState(!0);return _.useEffect(()=>{document.title="SolarPack · Sponsors",(async()=>{try{const o=`/data/sponsors.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,l=await fetch(o,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(l.status===304){const c=sessionStorage.getItem("json:/data/sponsors.json");if(c){const u=JSON.parse(c);e(u.sponsorTiers||[]);return}throw new Error("HTTP 304 with no cached copy")}if(l.ok){const c=await l.json();sessionStorage.setItem("json:/data/sponsors.json",JSON.stringify(c)),e(c.sponsorTiers||[])}else e([])}catch(i){console.error("Error loading sponsors.json",i);const o=sessionStorage.getItem("json:/data/sponsors.json");if(o){const l=JSON.parse(o);e(l.sponsorTiers||[])}else e([])}finally{n(!1)}})()},[]),a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        body {
          font-family: 'DM Sans', sans-serif;
          background: #0e0e0e;
          color: #fff;
        }
        
        main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          color: #e53935;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .tier {
          margin-bottom: 2.5rem;
        }
        
        .tier h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #e53935;
          text-align: left;
          margin-bottom: 1rem;
        }
        
        .sponsor-logos {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: left;
          align-items: center;
        }
        
        .sponsor-logos img {
          background: #222;
          border-radius: 10px;
          box-shadow: 0 2px 12px #0005;
          padding: 1.5rem;
          max-width: 320px;
          max-height: 180px;
          object-fit: contain;
        }
        
        .placeholder {
          color: #888;
          font-size: 1.1rem;
          padding: 2rem 0;
        }

        .sponsor-contact {
          text-align: center;
          color: #cecece;
          margin-top: 3rem;
        }

        .sponsor-contact a {
          color: #e53935;
          text-decoration: underline;
        }
      `}),a.jsxs("main",{children:[a.jsx("h1",{children:"Sponsors"}),t.map((s,i)=>a.jsxs("section",{className:"tier",children:[a.jsx("h2",{children:s.tier}),a.jsx("div",{className:"sponsor-logos",children:s.sponsors&&s.sponsors.length>0?s.sponsors.map((o,l)=>a.jsx("img",{src:o.image,alt:o.name,title:o.name},l)):a.jsx("span",{className:"placeholder",children:s.placeholder||`No ${s.tier.toLowerCase()} yet.`})})]},i)),a.jsxs("p",{className:"sponsor-contact",children:["Interested in sponsoring Fenrir or supporting our team?"," ",a.jsx("a",{href:"https://www.paypal.com/fundraiser/charity/3728956",target:"_blank",rel:"noopener",children:"Donate"})," ","or"," ",a.jsx("a",{href:"/contact",children:"Contact us"})," for more info!"]})]})]})},tx=()=>{const[t,e]=_.useState([]),[r,n]=_.useState(!0),[s,i]=_.useState(null);_.useEffect(()=>{document.title="SolarPack · Team",o()},[]);const o=async()=>{try{const c=((await Ie.getTeamMembers()).teamMembers||[]).sort((u,d)=>(u.order||0)-(d.order||0));e(c),console.log("✓ Loaded team data from Supabase:",c.length,"members")}catch(l){console.error("Error loading team data from Supabase:",l),i(l.message),e([])}finally{n(!1)}};return r?a.jsx("div",{style:{textAlign:"center",padding:"4rem",color:"var(--subtxt)"},children:"Loading team data..."}):s?a.jsxs("div",{style:{textAlign:"center",padding:"4rem",color:"#dc3545"},children:["Error loading team data: ",s]}):a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        /* Page-specific styles */
        h1 { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: clamp(2.5rem, 7vw, 4.5rem); 
          letter-spacing: 0.04em; 
          margin: 2.5rem 0 0.5rem; 
          text-align: center; 
        }
        
        .team-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
          gap: 2rem; 
          max-width: 900px; 
          margin: 2.5rem auto 0; 
        }
        
        .member-card { 
          background: var(--surface); 
          border-radius: var(--radius); 
          box-shadow: 0 4px 24px #0006; 
          padding: 2rem 1.2rem 1.2rem; 
          text-align: center; 
        }
        
        .member-img { 
          width: 90px; 
          height: 90px; 
          border-radius: 50%; 
          background: #222; 
          object-fit: cover; 
          margin-bottom: 1rem; 
        }
        
        .member-name { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: 1.5rem; 
          color: var(--accent); 
          margin-bottom: 0.2rem; 
        }
        
        .member-role { 
          color: var(--subtxt); 
          font-size: 1.1rem; 
          margin-bottom: 0.7rem; 
        }
        
        .member-socials a { 
          color: var(--accent); 
          margin: 0 0.4rem; 
          font-size: 1.2rem; 
        }
        
        .member-socials a:hover { 
          color: #fff; 
        }
        
        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 1rem; 
          margin: 3.5rem 0 1.5rem; 
        }

        .member-bio {
          color: var(--subtxt);
          font-size: 0.98rem;
          margin-bottom: 0.7rem;
        }
      `}),a.jsx("h1",{children:"Meet the Team"}),t.length===0?a.jsxs("div",{style:{textAlign:"center",padding:"4rem",color:"var(--subtxt)"},children:[a.jsx("p",{children:"No team members found."}),a.jsx("p",{style:{fontSize:"0.9rem",marginTop:"1rem"},children:"Check the browser console for more details."})]}):a.jsx("div",{className:"team-grid",children:t.map((l,c)=>a.jsxs("div",{className:"member-card",children:[a.jsx("img",{src:l.image,alt:l.name,className:"member-img"}),a.jsx("div",{className:"member-name",children:l.name}),a.jsx("div",{className:"member-role",children:l.role}),a.jsx("p",{className:"member-bio",children:l.bio})]},c))})]})};const rx=({projects:t=[],events:e=[],onItemClick:r,selectedTeam:n="all",teams:s=[]})=>{const[i,o]=_.useState(new Date),[l,c]=_.useState([]);_.useEffect(()=>{u()},[i,t,e,n]);const u=()=>{const m=i.getFullYear(),N=i.getMonth(),v=new Date(m,N,1),E=new Date(m,N+1,0).getDate(),P=v.getDay(),A=[];let I=1;for(let z=0;z<6;z++){const H=[];for(let k=0;k<7;k++)if(z*7+k<P||I>E)H.push(null);else{const T=new Date(m,N,I),$={date:I,fullDate:T,isToday:d(T),events:f(T),projects:h(T),isWeekend:k===0||k===6};H.push($),I++}if(A.push(H),I>E)break}c(A)},d=m=>{const N=new Date;return m.toDateString()===N.toDateString()},f=m=>e.filter(N=>{const S=new Date(N.date).toDateString()===m.toDateString(),E=n==="all"||N.team===n;return S&&E}),h=m=>{const N=[];return t.forEach(v=>{if(!(n==="all"||v.team===n))return;const E=new Date(v.startDate),P=new Date(v.dueDate);E.toDateString()===m.toDateString()&&N.push({...v,type:"project-start",displayType:"start"}),P.toDateString()===m.toDateString()&&N.push({...v,type:"project-due",displayType:"due"}),v.tasks.forEach(A=>{new Date(A.dueDate).toDateString()===m.toDateString()&&N.push({...A,type:"task-due",displayType:"task",projectTitle:v.title,projectTeam:v.team})})}),N},g=m=>{const N=s.find(v=>v.id===m);return N?N.color:"#6c757d"},x=(m,N)=>{if(N==="completed")return!1;const v=new Date;return new Date(m)<v},b=m=>{o(N=>{const v=new Date(N);return v.setMonth(N.getMonth()+m),v})},j=()=>{o(new Date)},y=["January","February","March","April","May","June","July","August","September","October","November","December"],p=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return a.jsxs("div",{className:"calendar-container",children:[a.jsxs("div",{className:"calendar-header",children:[a.jsxs("div",{className:"calendar-nav",children:[a.jsx("button",{onClick:()=>b(-1),className:"nav-btn",children:"← Previous"}),a.jsx("button",{onClick:j,className:"today-btn",children:"Today"}),a.jsx("button",{onClick:()=>b(1),className:"nav-btn",children:"Next →"})]}),a.jsxs("h2",{className:"calendar-title",children:[y[i.getMonth()]," ",i.getFullYear()]})]}),a.jsxs("div",{className:"calendar-grid",children:[a.jsx("div",{className:"calendar-header-row",children:p.map(m=>a.jsx("div",{className:"day-header",children:m},m))}),l.map((m,N)=>a.jsx("div",{className:"calendar-week",children:m.map((v,S)=>a.jsx("div",{className:`calendar-day ${v?"":"empty"} ${v!=null&&v.isToday?"today":""} ${v!=null&&v.isWeekend?"weekend":""}`,children:v&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"day-number",children:v.date}),a.jsxs("div",{className:"day-items",children:[v.events.map(E=>a.jsxs("div",{className:"calendar-item event-item",style:{backgroundColor:g(E.team)},onClick:()=>r(E,"event"),title:`${E.title} - ${E.startTime}`,children:[a.jsx("span",{className:"item-indicator",children:"📅"}),a.jsx("span",{className:"item-title",children:E.title})]},`event-${E.id}`)),v.projects.map((E,P)=>a.jsxs("div",{className:`calendar-item project-item ${E.displayType==="due"?"due-item":""} ${x(E.dueDate,E.status)?"overdue-item":""}`,style:{backgroundColor:E.displayType==="task"?g(E.projectTeam):g(E.team),opacity:E.displayType==="start"?.7:1},onClick:()=>r(E,E.type),title:E.displayType==="start"?`${E.title} - Starts`:E.displayType==="due"?`${E.title} - Due`:`${E.title} - Task Due`,children:[a.jsx("span",{className:"item-indicator",children:E.displayType==="start"?"🚀":E.displayType==="due"?"🎯":"✅"}),a.jsx("span",{className:"item-title",children:(E.displayType==="task",E.title)})]},`project-${E.id}-${P}`))]})]})},S))},N))]}),a.jsxs("div",{className:"calendar-legend",children:[a.jsx("h3",{children:"Legend"}),a.jsxs("div",{className:"legend-items",children:[a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-indicator",children:"📅"}),a.jsx("span",{children:"Events"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-indicator",children:"🚀"}),a.jsx("span",{children:"Project Start"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-indicator",children:"🎯"}),a.jsx("span",{children:"Project Due"})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-indicator",children:"✅"}),a.jsx("span",{children:"Task Due"})]})]})]})]})};const nx=()=>{const[t,e]=_.useState({teams:[],projects:[],events:[],lastUpdated:""}),[r,n]=_.useState(!0),[s,i]=_.useState("all"),[o,l]=_.useState("projects"),[c,u]=_.useState(null),[d,f]=_.useState(null);_.useEffect(()=>{h()},[]);const h=async()=>{try{const S=`/data/schedules.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,E=await fetch(S,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(E.status===304){const A=sessionStorage.getItem("json:/data/schedules.json");if(A){e(JSON.parse(A));return}throw new Error("HTTP 304 with no cached copy")}if(!E.ok)throw new Error(`HTTP ${E.status}: ${E.statusText}`);const P=await E.json();sessionStorage.setItem("json:/data/schedules.json",JSON.stringify(P)),e(P)}catch(v){console.error("Error loading schedule data:",v);const S=sessionStorage.getItem("json:/data/schedules.json");S&&e(JSON.parse(S))}finally{n(!1)}},g=v=>{const S=t.teams.find(E=>E.id===v);return S?S.name:v},x=v=>{const S=t.teams.find(E=>E.id===v);return S?S.color:"#6c757d"},b=(v,S)=>{if(S==="completed")return!1;const E=new Date;return new Date(v)<E},j=(v,S)=>{if(b(S,v))return"#dc3545";switch(v){case"completed":return"#28a745";case"in-progress":return"#007bff";case"pending":return"#ffc107";case"planning":return"#6c757d";case"critical":return"#dc3545";default:return"#6c757d"}},y=(v,S="team")=>s==="all"?v:v.filter(E=>E[S]===s),p=()=>{const v=new Date,S=new Date(v.getTime()+7*24*60*60*1e3);return t.events.filter(E=>{const P=new Date(E.date);return P>=v&&P<=S}).sort((E,P)=>new Date(E.date)-new Date(P.date))},m=(v,S)=>{if(S==="event")f(v);else if(S.includes("project")){const E=t.projects.find(P=>P.id===v.id);E&&u(E)}else if(S==="task-due"){const E=t.projects.find(P=>P.tasks.some(A=>A.id===v.id));E&&u(E)}},N=()=>{const v=[];return t.projects.forEach(S=>{b(S.dueDate,S.status)&&v.push({...S,type:"project"}),S.tasks.forEach(E=>{b(E.dueDate,E.status)&&v.push({...E,type:"task",projectTitle:S.title})})}),v.sort((S,E)=>new Date(S.dueDate)-new Date(E.dueDate))};return r?a.jsx("div",{className:"schedules-page",children:a.jsxs("div",{className:"loading",children:[a.jsx("div",{className:"loading-spinner"}),a.jsx("p",{children:"Loading schedules..."})]})}):a.jsxs("div",{className:"schedules-page",children:[a.jsxs("div",{className:"schedules-header",children:[a.jsx("h1",{children:"Project Schedules"}),a.jsx("p",{children:"Track progress across all teams and projects"})]}),a.jsxs("div",{className:"stats-grid",children:[a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-icon",children:"📊"}),a.jsxs("div",{className:"stat-content",children:[a.jsx("h3",{children:t.projects.length}),a.jsx("p",{children:"Active Projects"})]})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-icon",children:"⏰"}),a.jsxs("div",{className:"stat-content",children:[a.jsx("h3",{children:p().length}),a.jsx("p",{children:"Upcoming Events"})]})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-icon",children:"⚠️"}),a.jsxs("div",{className:"stat-content",children:[a.jsx("h3",{children:N().length}),a.jsx("p",{children:"Overdue Items"})]})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-icon",children:"👥"}),a.jsxs("div",{className:"stat-content",children:[a.jsx("h3",{children:t.teams.length}),a.jsx("p",{children:"Teams"})]})]})]}),a.jsxs("div",{className:"schedule-tabs",children:[a.jsx("button",{className:`tab ${o==="projects"?"active":""}`,onClick:()=>l("projects"),children:"Projects"}),a.jsx("button",{className:`tab ${o==="calendar"?"active":""}`,onClick:()=>l("calendar"),children:"Calendar"}),a.jsxs("button",{className:`tab ${o==="overdue"?"active":""}`,onClick:()=>l("overdue"),children:["Overdue (",N().length,")"]})]}),a.jsxs("div",{className:"filters",children:[a.jsx("label",{htmlFor:"team-select",children:"Filter by Team:"}),a.jsxs("select",{id:"team-select",value:s,onChange:v=>i(v.target.value),children:[a.jsx("option",{value:"all",children:"All Teams"}),t.teams.map(v=>a.jsx("option",{value:v.id,children:v.name},v.id))]})]}),o==="projects"&&a.jsx("div",{className:"projects-section",children:a.jsx("div",{className:"projects-grid",children:y(t.projects).map(v=>a.jsxs("div",{className:`project-card ${b(v.dueDate,v.status)?"overdue":""}`,onClick:()=>u(v),children:[a.jsxs("div",{className:"project-header",children:[a.jsxs("div",{children:[a.jsx("h3",{children:v.title}),a.jsx("div",{className:"team-badge",style:{backgroundColor:x(v.team)},children:g(v.team)})]}),a.jsx("div",{className:"status-badge",style:{backgroundColor:j(v.status,v.dueDate)},children:b(v.dueDate,v.status)?"OVERDUE":v.status.toUpperCase()})]}),a.jsx("p",{className:"project-description",children:v.description}),a.jsxs("div",{className:"progress-section",children:[a.jsxs("div",{className:"progress-header",children:[a.jsxs("span",{children:["Progress: ",v.progress,"%"]}),a.jsxs("span",{className:"hours",children:[v.actualHours,"/",v.estimatedHours,"h"]})]}),a.jsx("div",{className:"progress-bar",children:a.jsx("div",{className:"progress-fill",style:{width:`${v.progress}%`,backgroundColor:x(v.team)}})})]}),a.jsxs("div",{className:"project-meta",children:[a.jsxs("div",{className:"meta-item",children:[a.jsx("strong",{children:"Assigned:"})," ",v.assignedTo]}),a.jsxs("div",{className:"meta-item",children:[a.jsx("strong",{children:"Due:"})," ",new Date(v.dueDate).toLocaleDateString()]}),a.jsxs("div",{className:"meta-item",children:[a.jsx("strong",{children:"Priority:"}),a.jsx("span",{className:`priority ${v.priority}`,children:v.priority})]})]}),v.tasks.length>0&&a.jsxs("div",{className:"tasks-preview",children:[a.jsxs("h4",{children:["Tasks (",v.tasks.length,")"]}),a.jsxs("div",{className:"task-status-overview",children:[v.tasks.slice(0,3).map(S=>a.jsxs("div",{className:"mini-task",style:{borderLeft:`3px solid ${j(S.status,S.dueDate)}`},children:[a.jsx("span",{className:"task-name",children:S.title}),a.jsxs("span",{className:"task-progress",children:[S.progress,"%"]})]},S.id)),v.tasks.length>3&&a.jsxs("div",{className:"more-tasks",children:["+",v.tasks.length-3," more"]})]})]})]},v.id))})}),o==="calendar"&&a.jsxs("div",{className:"calendar-section",children:[a.jsx(rx,{projects:y(t.projects),events:y(t.events),teams:t.teams,selectedTeam:s,onItemClick:m}),a.jsxs("div",{className:"upcoming-events",children:[a.jsx("h2",{children:"Upcoming Events (Next 7 Days)"}),a.jsxs("div",{className:"events-list",children:[p().map(v=>a.jsxs("div",{className:"event-card",onClick:()=>f(v),style:{borderLeft:`4px solid ${x(v.team)}`},children:[a.jsx("div",{className:"event-date",children:new Date(v.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}),a.jsxs("div",{className:"event-content",children:[a.jsx("h3",{children:v.title}),a.jsx("p",{children:v.description}),a.jsxs("div",{className:"event-meta",children:[a.jsxs("span",{className:"time",children:[v.startTime," - ",v.endTime]}),a.jsx("span",{className:"team",children:g(v.team)}),a.jsx("span",{className:"location",children:v.location})]})]})]},v.id)),p().length===0&&a.jsx("div",{className:"no-events",children:a.jsx("p",{children:"No upcoming events in the next 7 days"})})]})]}),a.jsxs("div",{className:"all-events",children:[a.jsx("h2",{children:"All Events"}),a.jsx("div",{className:"events-grid",children:y(t.events).map(v=>a.jsxs("div",{className:"event-card-small",onClick:()=>f(v),children:[a.jsxs("div",{className:"event-header",children:[a.jsx("div",{className:"event-date-small",children:new Date(v.date).toLocaleDateString()}),a.jsx("div",{className:"event-type",style:{backgroundColor:x(v.team)},children:v.type})]}),a.jsx("h3",{children:v.title}),a.jsx("p",{children:v.description}),a.jsxs("div",{className:"event-meta-small",children:[a.jsx("span",{children:g(v.team)}),a.jsxs("span",{children:[v.startTime," - ",v.endTime]})]})]},v.id))})]})]}),o==="overdue"&&a.jsxs("div",{className:"overdue-section",children:[a.jsx("h2",{children:"Overdue Items"}),N().length===0?a.jsxs("div",{className:"no-overdue",children:[a.jsx("div",{className:"celebration-icon",children:"🎉"}),a.jsx("h3",{children:"All caught up!"}),a.jsx("p",{children:"No overdue items at the moment. Great work!"})]}):a.jsx("div",{className:"overdue-list",children:N().map((v,S)=>a.jsxs("div",{className:"overdue-item",children:[a.jsxs("div",{className:"overdue-priority",children:[a.jsx("div",{className:"overdue-icon",children:"⚠️"}),a.jsxs("div",{className:"days-overdue",children:[Math.floor((new Date-new Date(v.dueDate))/(1e3*60*60*24))," days overdue"]})]}),a.jsxs("div",{className:"overdue-content",children:[a.jsx("h3",{children:v.title}),v.type==="task"&&a.jsxs("p",{className:"parent-project",children:["Part of: ",v.projectTitle]}),a.jsx("p",{children:v.description}),a.jsxs("div",{className:"overdue-meta",children:[a.jsxs("span",{children:[a.jsx("strong",{children:"Due:"})," ",new Date(v.dueDate).toLocaleDateString()]}),a.jsxs("span",{children:[a.jsx("strong",{children:"Assigned:"})," ",v.assignedTo]}),a.jsxs("span",{children:[a.jsx("strong",{children:"Priority:"})," ",v.priority]})]})]}),a.jsx("div",{className:"overdue-status",children:a.jsx("div",{className:"status-badge overdue-badge",style:{backgroundColor:"#dc3545"},children:"OVERDUE"})})]},`${v.type}-${v.id}`))})]}),c&&a.jsx("div",{className:"modal-overlay",onClick:()=>u(null),children:a.jsxs("div",{className:"modal",onClick:v=>v.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{children:c.title}),a.jsx("button",{className:"close-btn",onClick:()=>u(null),children:"×"})]}),a.jsx("div",{className:"modal-content",children:a.jsxs("div",{className:"project-detail",children:[a.jsxs("div",{className:"detail-section",children:[a.jsx("h3",{children:"Project Overview"}),a.jsx("p",{children:c.description}),a.jsxs("div",{className:"detail-grid",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Team:"})," ",g(c.team)]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Status:"})," ",c.status]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Priority:"})," ",c.priority]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Assigned To:"})," ",c.assignedTo]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Start Date:"})," ",new Date(c.startDate).toLocaleDateString()]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Due Date:"})," ",new Date(c.dueDate).toLocaleDateString()]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Progress:"})," ",c.progress,"%"]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Hours:"})," ",c.actualHours,"/",c.estimatedHours]})]})]}),c.tasks.length>0&&a.jsxs("div",{className:"detail-section",children:[a.jsxs("h3",{children:["Tasks (",c.tasks.length,")"]}),a.jsx("div",{className:"tasks-detail",children:c.tasks.map(v=>a.jsxs("div",{className:"task-detail",children:[a.jsxs("div",{className:"task-header",children:[a.jsx("h4",{children:v.title}),a.jsx("div",{className:"status-badge",style:{backgroundColor:j(v.status,v.dueDate)},children:b(v.dueDate,v.status)?"OVERDUE":v.status.toUpperCase()})]}),a.jsx("p",{children:v.description}),a.jsxs("div",{className:"task-meta-detail",children:[a.jsxs("span",{children:[a.jsx("strong",{children:"Due:"})," ",new Date(v.dueDate).toLocaleDateString()]}),a.jsxs("span",{children:[a.jsx("strong",{children:"Assigned:"})," ",v.assignedTo]}),a.jsxs("span",{children:[a.jsx("strong",{children:"Progress:"})," ",v.progress,"%"]})]})]},v.id))})]})]})})]})}),d&&a.jsx("div",{className:"modal-overlay",onClick:()=>f(null),children:a.jsxs("div",{className:"modal",onClick:v=>v.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{children:d.title}),a.jsx("button",{className:"close-btn",onClick:()=>f(null),children:"×"})]}),a.jsx("div",{className:"modal-content",children:a.jsx("div",{className:"event-detail",children:a.jsxs("div",{className:"detail-section",children:[a.jsx("h3",{children:"Event Details"}),a.jsx("p",{children:d.description}),a.jsxs("div",{className:"detail-grid",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Date:"})," ",new Date(d.date).toLocaleDateString()]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Time:"})," ",d.startTime," - ",d.endTime]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Team:"})," ",g(d.team)]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Type:"})," ",d.type]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Location:"})," ",d.location]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Priority:"})," ",d.priority]})]}),d.attendees&&d.attendees.length>0&&a.jsxs("div",{className:"attendees-section",children:[a.jsx("h4",{children:"Attendees"}),a.jsx("ul",{children:d.attendees.map((v,S)=>a.jsx("li",{children:v},S))})]})]})})})]})})]})};const sx=()=>(_.useEffect(()=>{document.title="Page Not Found - SolarPack"},[]),a.jsx("div",{className:"not-found-container",children:a.jsxs("div",{className:"not-found-content",children:[a.jsx("h1",{children:"Page Not Found"}),a.jsx("div",{className:"error-code",children:"404"}),a.jsx("p",{children:"The page you're looking for doesn't exist or may have been moved."}),a.jsxs("div",{className:"error-actions",children:[a.jsx(Wn,{to:"/",className:"home-btn",children:"Back to Home"}),a.jsx(Wn,{to:"/contact",className:"contact-btn",children:"Contact Us"})]})]})})),ix=({onLogin:t})=>{const[e,r]=_.useState(""),[n,s]=_.useState(""),[i,o]=_.useState(!1),l=c=>{c.preventDefault(),o(!0),s(""),setTimeout(()=>{re.authenticate(e)?(t(),r("")):s("Invalid password. Please try again."),o(!1)},500)};return a.jsxs("div",{className:"login-container",children:[a.jsx("style",{children:`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: var(--bg);
          padding: 2rem 1rem;
        }

        .login-card {
          background: var(--surface);
          padding: 3rem 2.5rem;
          border-radius: var(--radius);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          max-width: 420px;
          width: 100%;
          border: 1px solid #333;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .login-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .login-logo img {
          height: 40px;
          width: auto;
        }

        .login-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--accent);
          margin: 0;
        }

        .login-subtitle {
          color: var(--subtxt);
          margin-top: 0.5rem;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          color: var(--text);
          margin-bottom: 0.75rem;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #333;
          border-radius: 8px;
          background: var(--bg);
          color: var(--text);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          background: var(--card);
        }

        .form-input::placeholder {
          color: var(--muted);
        }

        .login-button {
          width: 100%;
          padding: 1rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .login-button:hover {
          background: #c41820;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(227, 27, 35, 0.3);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .error-message {
          color: #ff6b6b;
          text-align: center;
          margin-top: 1rem;
          font-size: 0.9rem;
          padding: 0.75rem;
          background: rgba(255, 107, 107, 0.1);
          border-radius: 6px;
          border: 1px solid rgba(255, 107, 107, 0.2);
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 2rem 1.5rem;
          }
          
          .login-title {
            font-size: 1.75rem;
          }
        }
      `}),a.jsxs("div",{className:"login-card",children:[a.jsxs("div",{className:"login-header",children:[a.jsxs("div",{className:"login-logo",children:[a.jsx("img",{src:"/solarpack_logo.png",alt:"SolarPack logo"}),a.jsx("h1",{className:"login-title",children:"SolarPack"})]}),a.jsx("p",{className:"login-subtitle",children:"Admin Dashboard Access"})]}),a.jsxs("form",{onSubmit:l,children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{htmlFor:"password",className:"form-label",children:"Password"}),a.jsx("input",{type:"password",id:"password",className:"form-input",value:e,onChange:c=>r(c.target.value),placeholder:"Enter your dashboard password",disabled:i,autoFocus:!0})]}),a.jsx("button",{type:"submit",className:"login-button",disabled:i||!e.trim(),children:i?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"loading-spinner"}),"Signing In..."]}):"Access Dashboard"}),n&&a.jsx("div",{className:"error-message",children:n})]})]})]})},Dp=(t,e=2e3)=>{const[r,n]=_.useState("synced"),[s,i]=_.useState(null),o=_.useRef(null),l=_.useRef(null),c=_.useRef(null),u=_.useRef(!1),d=j=>{if(!j)return null;const y=j.teamMembers||j.alumni||j.sponsors||j.schedules||j.orders||[],p=JSON.stringify(y);let m=0;for(let N=0;N<p.length;N++){const v=p.charCodeAt(N);m=(m<<5)-m+v,m=m&m}return console.log("🔍 Hash calculated:",m,"for",y.length,"items"),m},f=async()=>{if(!u.current)try{const j=await t(),y=d(j);o.current=y,l.current===null?(console.log("📍 Initial load - displayed hash set:",y),l.current=y,n("synced"),i(new Date)):y!==l.current?(console.log("🔄 Data mismatch! Displayed:",l.current,"Supabase:",y),r!=="new-data"&&(console.log("📊 New data detected from Supabase - notifying user"),n("new-data")),i(new Date)):(r!=="saving"&&r!=="new-data"&&n("synced"),i(new Date))}catch(j){console.error("Error checking for updates:",j),r!=="saving"&&r!=="new-data"&&n("synced")}};return _.useEffect(()=>(f(),c.current=setInterval(f,e),()=>{c.current&&clearInterval(c.current)}),[e]),{status:r,lastSync:s,startSaving:()=>{u.current=!0,n("saving")},finishSaving:async()=>{u.current=!1;try{const j=await t(),y=d(j);o.current=y,l.current=y,console.log("💾 Save complete - hashes updated to:",y),n("synced"),i(new Date)}catch(j){console.error("Error after save:",j),n("synced")}},acknowledgeNewData:async()=>{try{const j=await t(),y=d(j);l.current=y,o.current=y,console.log("✅ User refreshed - displayed hash updated to:",y),n("synced"),i(new Date)}catch(j){console.error("Error acknowledging new data:",j)}},setDisplayedData:j=>{const y=d(j);console.log("📺 Component displaying data with hash:",y),l.current=y,o.current=y}}},Rp=({status:t,lastSync:e,onRefresh:r})=>{const[n,s]=_.useState(!1),i={synced:{icon:"✓",text:"Up to date",color:"#4CAF50",bgColor:"rgba(76, 175, 80, 0.1)",pulse:!1},saving:{icon:"💾",text:"Saving...",color:"#FF9800",bgColor:"rgba(255, 152, 0, 0.1)",pulse:!0},"new-data":{icon:"🔄",text:"Click to update",color:"#E31820",bgColor:"rgba(227, 24, 32, 0.1)",pulse:!0,clickable:!0}},o=i[t]||i.synced,l=()=>{if(!e)return"";const d=Date.now()-e.getTime();return d<3e3?"just now":d<6e4?`${Math.floor(d/1e3)}s ago`:d<36e5?`${Math.floor(d/6e4)}m ago`:e.toLocaleTimeString()},c=()=>{o.clickable&&r&&r()};return a.jsxs("div",{className:"sync-status-badge",onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),onClick:c,style:{cursor:o.clickable?"pointer":"default"},children:[a.jsx("style",{children:`
        .sync-status-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          background: ${o.bgColor};
          border: 1px solid ${o.color}40;
          transition: all 0.3s ease;
          user-select: none;
        }

        .sync-status-badge:hover {
          background: ${o.bgColor}cc;
          transform: translateY(-1px);
        }

        .sync-icon {
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: ${o.pulse?"pulse 2s ease-in-out infinite":"none"};
        }

        .sync-text {
          font-size: 0.85rem;
          color: ${o.color};
          font-weight: 500;
          white-space: nowrap;
        }

        .sync-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${o.color};
          animation: ${o.pulse?"pulse 2s ease-in-out infinite":"none"};
        }

        .sync-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: #2a2a2a;
          color: #fff;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .sync-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: #2a2a2a;
        }

        .sync-tooltip.visible {
          opacity: 1;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .sync-icon.checking {
          animation: spin 1s linear infinite;
        }
      `}),a.jsx("span",{className:`sync-icon ${t==="checking"?"checking":""}`,children:o.icon}),a.jsx("span",{className:"sync-text",children:o.text}),t==="synced"&&a.jsx("div",{className:"sync-dot"}),n&&a.jsx("div",{className:`sync-tooltip ${n?"visible":""}`,children:t==="new-data"?"Click to refresh and see updates":e?`Last checked: ${l()}`:"Real-time sync active"})]})},ax=({isOpen:t,onClose:e,onConfirm:r,title:n,message:s,type:i="info",confirmText:o="OK",cancelText:l="Cancel"})=>{if(_.useEffect(()=>(t?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[t]),!t)return null;const c=i==="confirm",u=()=>{r&&r(),e()},d=()=>{e()},f=()=>{switch(i){case"error":return a.jsxs("svg",{className:"alert-icon error",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),a.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]});case"warning":return a.jsxs("svg",{className:"alert-icon warning",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),a.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),a.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]});case"success":return a.jsxs("svg",{className:"alert-icon success",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),a.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]});case"confirm":return a.jsxs("svg",{className:"alert-icon confirm",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"}),a.jsx("line",{x1:"15",y1:"9",x2:"9",y2:"15"})]});default:return a.jsxs("svg",{className:"alert-icon info",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),a.jsx("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})]})}};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
        .alert-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .alert-box {
          background: var(--surface);
          border-radius: 12px;
          padding: 2rem;
          max-width: 450px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.3s ease-out;
        }

        .alert-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .alert-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }

        .alert-icon.error {
          color: #ef4444;
        }

        .alert-icon.warning {
          color: #f59e0b;
        }

        .alert-icon.success {
          color: #10b981;
        }

        .alert-icon.info {
          color: #3b82f6;
        }

        .alert-icon.confirm {
          color: #f59e0b;
        }

        .alert-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.5rem;
          color: var(--text);
          margin: 0;
          flex: 1;
        }

        .alert-message {
          color: var(--subtxt);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .alert-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .alert-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .alert-btn-primary {
          background: var(--accent);
          color: white;
        }

        .alert-btn-primary:hover {
          background: #c71821;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(227, 28, 35, 0.4);
        }

        .alert-btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--subtxt);
        }

        .alert-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--text);
        }

        .alert-btn-danger {
          background: #dc2626;
          color: white;
        }

        .alert-btn-danger:hover {
          background: #b91c1c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }
      `}),a.jsx("div",{className:"alert-overlay",onClick:d,children:a.jsxs("div",{className:"alert-box",onClick:h=>h.stopPropagation(),children:[a.jsxs("div",{className:"alert-header",children:[f(),a.jsx("h3",{className:"alert-title",children:n})]}),a.jsx("p",{className:"alert-message",children:s}),a.jsxs("div",{className:"alert-actions",children:[c&&a.jsx("button",{className:"alert-btn alert-btn-secondary",onClick:d,children:l}),a.jsx("button",{className:`alert-btn ${i==="confirm"?"alert-btn-danger":"alert-btn-primary"}`,onClick:u,autoFocus:!0,children:o})]})]})})]})},Ap=_.createContext(null),ox=({children:t})=>{const[e,r]=_.useState([]),[n,s]=_.useState(null),i=_.useCallback(g=>new Promise(x=>{const b={id:Date.now()+Math.random(),...g,resolve:x};n?r(j=>[...j,b]):s(b)}),[n]),o=_.useCallback(()=>{n!=null&&n.resolve&&(n.type==="confirm"&&!n.confirmed?n.resolve(!1):n.resolve(n.confirmed||!0)),r(g=>{const[x,...b]=g;return s(x||null),b})},[n]),l=_.useCallback(()=>{n&&s(g=>({...g,confirmed:!0})),o()},[n,o]),c=_.useCallback((g,x="Error")=>i({title:x,message:g,type:"error"}),[i]),u=_.useCallback((g,x="Warning")=>i({title:x,message:g,type:"warning"}),[i]),d=_.useCallback((g,x="Success")=>i({title:x,message:g,type:"success"}),[i]),f=_.useCallback((g,x="Confirm Action",b="Confirm",j="Cancel")=>i({title:x,message:g,type:"confirm",confirmText:b,cancelText:j}),[i]),h=_.useMemo(()=>({showAlert:i,showError:c,showWarning:u,showSuccess:d,showConfirm:f}),[i,c,u,d,f]);return a.jsxs(Ap.Provider,{value:h,children:[t,n&&a.jsx(ax,{isOpen:!0,onClose:o,onConfirm:l,title:n.title||"Alert",message:n.message||"",type:n.type||"info",confirmText:n.confirmText||"OK",cancelText:n.cancelText||"Cancel"},n.id)]})},Ip=()=>{const t=_.useContext(Ap);if(!t)throw new Error("useAlert must be used within an AlertProvider");return t},lx=()=>{const[t,e]=_.useState({teamMembers:[],lastUpdated:""}),[r,n]=_.useState(!1),[s,i]=_.useState(null),[o,l]=_.useState(!0),[c,u]=_.useState(null),[d,f]=_.useState(null),[h,g]=_.useState(null),[x,b]=_.useState(null),[j,y]=_.useState(!1),{showError:p,showConfirm:m}=Ip(),{status:N,lastSync:v,startSaving:S,finishSaving:E,acknowledgeNewData:P,setDisplayedData:A}=Dp(()=>Ie.getTeamMembers(),2e3);_.useEffect(()=>{I()},[]);const I=async()=>{console.log("Loading team data from Supabase..."),l(!0);try{const C=await Ie.getTeamMembers();if(console.log("Loaded team data:",C),!C||!C.teamMembers)throw console.error("Invalid data structure received:",C),new Error("Invalid team data structure");console.log(`✓ Successfully loaded ${C.teamMembers.length} team members from Supabase`),e(C),A(C)}catch(C){console.error("Error loading team data:",C),await p(`Failed to load team data: ${C.message}`,"Load Error"),e({teamMembers:[],lastUpdated:""})}finally{l(!1)}},z=C=>{i({...C}),g(null),b(C.image||null),n(!0)},H=()=>{i({id:Date.now(),name:"",role:"",image:"",bio:"",email:"",linkedin:"",order:t.teamMembers.length+1}),g(null),b(null),n(!0)},k=async C=>{if(!C)return;if(!["image/jpeg","image/jpg","image/png","image/webp","image/gif"].includes(C.type)){await p("Please upload a JPEG, PNG, WebP, or GIF image.","Invalid File Type");return}const q=5*1024*1024;if(C.size>q){await p("Maximum file size is 5MB. Please choose a smaller image.","File Too Large");return}g(C);const X=new FileReader;X.onloadend=()=>{b(X.result)},X.readAsDataURL(C)},w=C=>{C.preventDefault(),C.stopPropagation();const D=C.dataTransfer.files[0];D&&k(D)},T=C=>{C.preventDefault(),C.stopPropagation()},$=()=>{g(null),b(null),i({...s,image:""})},oe=async()=>{if(!s.name||!s.role){await p("Please fill in the Name and Role fields.","Missing Required Fields");return}if(!s.bio||s.bio.trim()===""){await p("Please add a bio for this team member.","Bio Required");return}if(!x&&!s.image){await p("Please upload a profile image for this team member.","Image Required");return}n(!1);const C={...s};i(null),S();try{if(h){y(!0);try{const D=await Ie.uploadTeamMemberImage(h,C.id);C.image=D,console.log("✓ Image uploaded successfully:",D)}catch(D){throw console.error("Error uploading image:",D),await p(`Failed to upload image: ${D.message}`,"Upload Error"),D}finally{y(!1)}}await Ie.saveTeamMember(C),await I(),g(null),b(null),console.log("✓ Team member saved successfully")}catch(D){console.error("Error saving team member:",D),await p(`Failed to save: ${D.message}`,"Save Error")}finally{E()}},R=async C=>{if(await m("This action cannot be undone. The team member and their associated image will be permanently deleted.","Delete Team Member?","Delete","Cancel")){S();try{await Ie.deleteTeamMember(C),await I(),console.log("✓ Team member deleted successfully")}catch(q){console.error("Error deleting team member:",q),await p(`Failed to delete: ${q.message}`,"Delete Error")}finally{E()}}},B=async()=>{await I(),P()},W=(C,D)=>{u(D),C.dataTransfer.effectAllowed="move"},Y=(C,D)=>{C.preventDefault(),C.dataTransfer.dropEffect="move",c&&D.id!==c.id&&f(D)},le=C=>{C.currentTarget===C.target&&f(null)},bt=async(C,D)=>{if(C.preventDefault(),!c||c.id===D.id){u(null),f(null);return}S();try{const q=[...t.teamMembers],X=q.findIndex(sr=>sr.id===c.id),Re=q.findIndex(sr=>sr.id===D.id),[we]=q.splice(X,1);q.splice(Re,0,we);const Ue=q.map((sr,zp)=>({...sr,order:zp+1}));for(const sr of Ue)await Ie.saveTeamMember(sr);await I(),console.log("✓ Team order updated successfully")}catch(q){console.error("Error updating team order:",q),await p(`Failed to update order: ${q.message}`,"Reorder Error")}finally{u(null),f(null),E()}},st=()=>{u(null),f(null)},Qe=re.hasPermission("edit_team");return o?a.jsx("div",{className:"loading",children:"Loading team data..."}):a.jsxs("div",{className:"team-manager",children:[a.jsx("style",{children:`
        .team-manager-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .team-manager-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .header-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .add-member-btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.3s ease;
        }

        .add-member-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .no-data-message {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--surface);
          border-radius: var(--radius);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          color: var(--text);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .member-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease, opacity 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 250px;
        }

        .member-card:hover {
          transform: translateY(-2px);
        }

        .member-card.dragging {
          opacity: 0.5;
          transform: scale(0.95);
        }

        .member-card.drag-over {
          border: 2px solid var(--accent);
          transform: translateY(-2px);
        }

        .drag-handle {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          cursor: grab;
          padding: 0.25rem;
          color: var(--subtxt);
          transition: color 0.3s ease;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .drag-handle:hover {
          color: var(--accent);
        }

        .drag-handle:active {
          cursor: grabbing;
        }

        .drag-handle svg {
          width: 20px;
          height: 20px;
        }

        .member-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .member-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #333;
          object-fit: cover;
        }

        .member-info h3 {
          color: var(--accent);
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }

        .member-role {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin: 0;
        }

        .member-bio {
          color: var(--text);
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .member-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
          margin-top: auto;
        }

        .action-btn {
          padding: 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
        }

        .action-btn svg {
          width: 18px;
          height: 18px;
        }

        .edit-btn {
          background: var(--accent);
          color: white;
        }

        .edit-btn:hover {
          background: #c71821;
          transform: translateY(-2px);
        }

        .delete-btn {
          background: #dc2626;
          color: white;
        }

        .delete-btn:hover {
          background: #b91c1c;
          transform: translateY(-2px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius);
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.5rem;
          color: var(--text);
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--subtxt);
          cursor: pointer;
          font-size: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          color: var(--text);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: #1a1a1a;
          color: var(--text);
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--accent);
        }

        .form-textarea {
          min-height: 100px;
        }

        .image-upload-area {
          width: 100%;
          min-height: 200px;
          border: 2px dashed #333;
          border-radius: 8px;
          background: #1a1a1a;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .image-upload-area:hover {
          border-color: var(--accent);
          background: #222;
        }

        .image-upload-area.has-image {
          min-height: 250px;
          border-style: solid;
        }

        .upload-placeholder {
          text-align: center;
          padding: 2rem;
          color: var(--subtxt);
        }

        .upload-placeholder svg {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          opacity: 0.6;
        }

        .upload-placeholder p {
          margin: 0.5rem 0;
        }

        .upload-hint {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .image-preview-container {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .image-preview {
          max-width: 100%;
          max-height: 300px;
          border-radius: 6px;
          object-fit: contain;
        }

        .remove-image-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(220, 38, 38, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .remove-image-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        .remove-image-btn svg {
          width: 16px;
          height: 16px;
        }

        .upload-status {
          color: var(--accent);
          font-size: 0.85rem;
          margin-top: 0.5rem;
          text-align: center;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .save-btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .save-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .cancel-btn {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--subtxt);
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: var(--surface);
          border-color: var(--text);
        }

        .loading {
          text-align: center;
          color: var(--subtxt);
          padding: 2rem;
        }

        .no-permission {
          text-align: center;
          color: var(--subtxt);
          padding: 2rem;
        }
      `}),a.jsxs("div",{className:"team-manager-header",children:[a.jsx("h2",{className:"team-manager-title",children:"Team Management"}),a.jsxs("div",{className:"header-buttons",children:[a.jsx(Rp,{status:N,lastSync:v,onRefresh:B}),Qe&&a.jsxs("button",{className:"add-member-btn",onClick:H,children:[a.jsx("span",{children:"+"}),"Add Member"]})]})]}),t.teamMembers.length===0?a.jsxs("div",{className:"no-data-message",children:[a.jsx("p",{style:{fontSize:"1.2rem",marginBottom:"1rem"},children:"No team members found"}),a.jsx("p",{style:{color:"var(--subtxt)",marginBottom:"1rem"},children:"The team data file is empty or couldn't be loaded."}),Qe&&a.jsx("button",{onClick:H,className:"add-member-btn",children:"Add Your First Team Member"})]}):a.jsx("div",{className:"team-grid",children:t.teamMembers.sort((C,D)=>(C.order||0)-(D.order||0)).map(C=>a.jsxs("div",{className:`member-card ${(c==null?void 0:c.id)===C.id?"dragging":""} ${(d==null?void 0:d.id)===C.id?"drag-over":""}`,draggable:Qe,onDragStart:D=>W(D,C),onDragOver:D=>Y(D,C),onDragLeave:le,onDrop:D=>bt(D,C),onDragEnd:st,children:[Qe&&a.jsx("div",{className:"drag-handle",title:"Drag to reorder",children:a.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),a.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),a.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),a.jsxs("div",{className:"member-header",children:[a.jsx("img",{src:C.image||"/images/headshots/default.jpg",alt:C.name,className:"member-avatar",onError:D=>D.target.src="/images/headshots/default.jpg"}),a.jsxs("div",{className:"member-info",children:[a.jsx("h3",{children:C.name}),a.jsx("p",{className:"member-role",children:C.role})]})]}),a.jsx("p",{className:"member-bio",children:C.bio&&C.bio.length>150?C.bio.substring(0,150)+"...":C.bio}),Qe&&a.jsxs("div",{className:"member-actions",children:[a.jsx("button",{className:"action-btn edit-btn",onClick:()=>z(C),title:"Edit member",children:a.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),a.jsx("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),a.jsx("button",{className:"action-btn delete-btn",onClick:()=>R(C.id),title:"Delete member",children:a.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("polyline",{points:"3 6 5 6 21 6"}),a.jsx("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}),a.jsx("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),a.jsx("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},C.id))}),r&&s&&a.jsx("div",{className:"modal-overlay",onClick:()=>n(!1),children:a.jsxs("div",{className:"modal-content",onClick:C=>C.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("h3",{className:"modal-title",children:[s.id&&t.teamMembers.find(C=>C.id===s.id)?"Edit":"Add"," Team Member"]}),a.jsx("button",{className:"close-btn",onClick:()=>n(!1),children:"×"})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Name *"}),a.jsx("input",{type:"text",className:"form-input",value:s.name,onChange:C=>i({...s,name:C.target.value}),placeholder:"Full name"})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Role *"}),a.jsx("input",{type:"text",className:"form-input",value:s.role,onChange:C=>i({...s,role:C.target.value}),placeholder:"e.g., Technical Director"})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Profile Image *"}),a.jsxs("div",{className:`image-upload-area ${x?"has-image":""}`,onDrop:w,onDragOver:T,onClick:()=>document.getElementById("image-file-input").click(),children:[x?a.jsxs("div",{className:"image-preview-container",children:[a.jsx("img",{src:x,alt:"Preview",className:"image-preview"}),a.jsx("button",{className:"remove-image-btn",onClick:C=>{C.stopPropagation(),$()},title:"Remove image",children:a.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}):a.jsxs("div",{className:"upload-placeholder",children:[a.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),a.jsx("polyline",{points:"17 8 12 3 7 8"}),a.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"15"})]}),a.jsx("p",{children:"Drop image here or click to upload"}),a.jsx("p",{className:"upload-hint",children:"JPG, PNG, WebP, or GIF • Max 5MB"})]}),a.jsx("input",{id:"image-file-input",type:"file",accept:"image/jpeg,image/jpg,image/png,image/webp,image/gif",onChange:C=>k(C.target.files[0]),style:{display:"none"}})]}),j&&a.jsx("p",{className:"upload-status",children:"Uploading image..."})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Bio *"}),a.jsx("textarea",{className:"form-textarea",value:s.bio,onChange:C=>i({...s,bio:C.target.value}),placeholder:"Brief description of role and background..."})]}),a.jsx("p",{style:{color:"var(--subtxt)",fontSize:"0.85rem",marginTop:"1rem"},children:"💡 Tip: Use drag and drop on the cards to reorder team members"}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{className:"cancel-btn",onClick:()=>n(!1),children:"Cancel"}),a.jsx("button",{className:"save-btn",onClick:oe,children:"Save Member"})]})]})})]})},cx=()=>{const[t,e]=_.useState({teams:[],projects:[],events:[],lastUpdated:""}),[r,n]=_.useState("projects"),[s,i]=_.useState(!1),[o,l]=_.useState(null),[c,u]=_.useState(!0),[d,f]=_.useState("all");_.useEffect(()=>{h()},[]);const h=async()=>{try{const w=`/data/schedules.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,T=await fetch(w,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(T.status===304){const oe=sessionStorage.getItem("json:/data/schedules.json");if(oe){e(JSON.parse(oe));return}throw new Error("HTTP 304 with no cached copy")}if(!T.ok)throw new Error(`HTTP ${T.status}: ${T.statusText}`);const $=await T.json();sessionStorage.setItem("json:/data/schedules.json",JSON.stringify($)),e($)}catch(k){console.error("Error loading schedule data:",k);const w=sessionStorage.getItem("json:/data/schedules.json");w&&e(JSON.parse(w))}finally{u(!1)}},g=k=>{const w=t.teams.find(T=>T.id===k);return w?w.name:k},x=k=>{const w=t.teams.find(T=>T.id===k);return w?w.color:"#6c757d"},b=(k,w)=>{if(w==="completed")return!1;const T=new Date;return new Date(k)<T},j=(k,w)=>{if(b(w,k))return"#dc3545";switch(k){case"completed":return"#28a745";case"in-progress":return"#007bff";case"pending":return"#ffc107";case"planning":return"#6c757d";case"critical":return"#dc3545";default:return"#6c757d"}},y=()=>{l({type:"project",id:Date.now(),title:"",description:"",team:"director",priority:"medium",status:"planning",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,progress:0,assignedTo:"",tasks:[]}),i(!0)},p=k=>{l({...k,type:"project"}),i(!0)},m=(k,w)=>{l({...k,type:"project",editingTaskId:w.id}),i(!0)},N=(k,w)=>{if(!window.confirm("Are you sure you want to delete this task?"))return;const T={...t},$=T.projects.findIndex(oe=>oe.id===k);$>=0&&(T.projects[$].tasks=T.projects[$].tasks.filter(oe=>oe.id!==w),T.lastUpdated=new Date().toISOString(),e(T),I(T))},v=k=>{const w=t.projects.find($=>$.id===k),T={id:Date.now(),title:"",description:"",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,status:"pending",priority:"medium",assignedTo:"",progress:0};l({...w,type:"project",tasks:[...w.tasks,T]}),i(!0)},S=()=>{l({type:"event",id:Date.now(),title:"",description:"",team:"director",date:"",startTime:"",endTime:"",eventType:"meeting",priority:"medium",attendees:[],location:""}),i(!0)},E=k=>{const w={...k};w.eventType=k.type,w.type="event",l(w),i(!0)},P=async()=>{try{const k={...t};if(o.type==="project"){const w=k.projects.findIndex($=>$.id===o.id),T={...o};delete T.type,w>=0?k.projects[w]=T:k.projects.push(T)}else if(o.type==="event"){const w=k.events.findIndex($=>$.id===o.id),T={...o};delete T.type,T.eventType&&(T.type=T.eventType,delete T.eventType),w>=0?k.events[w]=T:k.events.push(T)}k.lastUpdated=new Date().toISOString(),e(k),await I(k),i(!1),l(null)}catch(k){console.error("Error saving item:",k),alert("Failed to save changes. Please try again.")}},A=async(k,w)=>{if(window.confirm("Are you sure you want to delete this item?"))try{const T={...t};k==="project"?T.projects=T.projects.filter($=>$.id!==w):k==="event"&&(T.events=T.events.filter($=>$.id!==w)),T.lastUpdated=new Date().toISOString(),e(T),await I(T)}catch(T){console.error("Error deleting item:",T),alert("Failed to delete item. Please try again.")}},I=async k=>{try{console.log("Saving schedule data:",k),alert("✓ Schedule data saved locally! (Supabase integration pending)")}catch(w){throw console.error("Error saving schedule data:",w),w}},z=(k,w="team")=>d==="all"?k:k.filter(T=>T[w]===d),H=re.hasPermission("edit_schedules");return c?a.jsx("div",{className:"loading",children:"Loading schedule data..."}):a.jsxs("div",{className:"schedule-manager",children:[a.jsx("style",{children:`
        .schedule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .schedule-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .view-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .view-tab {
          padding: 0.5rem 1rem;
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--text);
        }

        .view-tab.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .team-filter {
          padding: 0.5rem;
          border: 2px solid var(--card-border);
          border-radius: 8px;
          background: var(--card-bg);
          color: var(--text);
        }

        .add-button {
          padding: 0.75rem 1.5rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .add-button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .projects-grid {
          display: grid;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .project-card {
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .project-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 0.5rem 0;
        }

        .project-team {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }

        .project-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }

        .project-progress {
          margin: 1rem 0;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .project-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 1rem 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .tasks-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--card-border);
        }

        .tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg);
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .task-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .task-buttons {
          display: flex;
          gap: 0.25rem;
        }

        .tasks-management-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid var(--card-border);
        }

        .tasks-management-section h3 {
          color: var(--text);
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }

        .task-edit-item {
          background: var(--bg);
          border: 2px solid var(--card-border);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .task-edit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--card-border);
        }

        .task-edit-header h4 {
          color: var(--text);
          margin: 0;
          font-size: 1rem;
        }

        .task-info {
          flex: 1;
        }

        .task-title {
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.25rem;
        }

        .task-meta {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .event-card {
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .event-date {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .event-time {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .edit-btn, .delete-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: var(--primary);
          color: white;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .edit-btn:hover {
          background: var(--primary-dark);
        }

        .delete-btn:hover {
          background: #c82333;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 2rem;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text);
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--card-border);
          border-radius: 8px;
          background: var(--bg);
          color: var(--text);
          font-size: 1rem;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--card-border);
        }

        .save-btn, .cancel-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .save-btn {
          background: var(--primary);
          color: white;
        }

        .cancel-btn {
          background: var(--card-border);
          color: var(--text);
        }

        .overdue {
          border-left: 4px solid #dc3545;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
      `}),a.jsxs("div",{className:"schedule-header",children:[a.jsx("h1",{className:"schedule-title",children:"Schedule Manager"}),H&&a.jsxs("button",{className:"add-button",onClick:r==="projects"?y:S,children:["+ Add ",r==="projects"?"Project":"Event"]})]}),a.jsxs("div",{className:"view-tabs",children:[a.jsx("button",{className:`view-tab ${r==="projects"?"active":""}`,onClick:()=>n("projects"),children:"Projects"}),a.jsx("button",{className:`view-tab ${r==="events"?"active":""}`,onClick:()=>n("events"),children:"Events"})]}),a.jsxs("div",{className:"filters",children:[a.jsx("label",{htmlFor:"team-filter",children:"Filter by Team:"}),a.jsxs("select",{id:"team-filter",className:"team-filter",value:d,onChange:k=>f(k.target.value),children:[a.jsx("option",{value:"all",children:"All Teams"}),t.teams.map(k=>a.jsx("option",{value:k.id,children:k.name},k.id))]})]}),r==="projects"&&a.jsx("div",{className:"projects-grid",children:z(t.projects).map(k=>a.jsxs("div",{className:`project-card ${b(k.dueDate,k.status)?"overdue":""}`,children:[a.jsxs("div",{className:"project-header",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"project-title",children:k.title}),a.jsx("div",{className:"project-team",style:{backgroundColor:x(k.team)},children:g(k.team)})]}),a.jsx("div",{className:"project-status",style:{backgroundColor:j(k.status,k.dueDate)},children:b(k.dueDate,k.status)?"OVERDUE":k.status.toUpperCase()})]}),a.jsx("p",{children:k.description}),a.jsxs("div",{className:"project-progress",children:[a.jsx("div",{className:"progress-bar",children:a.jsx("div",{className:"progress-fill",style:{width:`${k.progress}%`,backgroundColor:x(k.team)}})}),a.jsxs("div",{style:{marginTop:"0.5rem",fontSize:"0.9rem"},children:["Progress: ",k.progress,"%"]})]}),a.jsxs("div",{className:"project-meta",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Assigned:"})," ",k.assignedTo]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Due:"})," ",new Date(k.dueDate).toLocaleDateString()]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Priority:"})," ",k.priority]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Hours:"})," ",k.actualHours,"/",k.estimatedHours]})]}),k.tasks.length>0&&a.jsxs("div",{className:"tasks-section",children:[a.jsxs("div",{className:"tasks-header",children:[a.jsxs("h4",{children:["Tasks (",k.tasks.length,")"]}),H&&a.jsx("button",{className:"add-button",style:{fontSize:"0.8rem",padding:"0.5rem 1rem"},onClick:()=>v(k.id),children:"+ Task"})]}),k.tasks.map(w=>a.jsxs("div",{className:"task-item",children:[a.jsxs("div",{className:"task-info",children:[a.jsx("div",{className:"task-title",children:w.title}),a.jsxs("div",{className:"task-meta",children:["Due: ",new Date(w.dueDate).toLocaleDateString()," | Status: ",w.status," | Progress: ",w.progress,"%"]})]}),a.jsxs("div",{className:"task-actions",children:[a.jsx("div",{className:"project-status",style:{backgroundColor:j(w.status,w.dueDate),fontSize:"0.7rem",padding:"0.25rem 0.5rem"},children:b(w.dueDate,w.status)?"OVERDUE":w.status.toUpperCase()}),H&&a.jsxs("div",{className:"task-buttons",children:[a.jsx("button",{className:"edit-btn",style:{fontSize:"0.7rem",padding:"0.25rem 0.5rem"},onClick:T=>{T.stopPropagation(),m(k,w)},children:"Edit"}),a.jsx("button",{className:"delete-btn",style:{fontSize:"0.7rem",padding:"0.25rem 0.5rem"},onClick:T=>{T.stopPropagation(),N(k.id,w.id)},children:"Del"})]})]})]},w.id))]}),H&&a.jsxs("div",{className:"action-buttons",style:{marginTop:"1rem"},children:[a.jsx("button",{className:"edit-btn",onClick:()=>p(k),children:"Edit"}),a.jsx("button",{className:"delete-btn",onClick:()=>A("project",k.id),children:"Delete"})]})]},k.id))}),r==="events"&&a.jsx("div",{className:"events-grid",children:z(t.events).map(k=>a.jsxs("div",{className:"event-card",children:[a.jsx("div",{className:"event-date",children:new Date(k.date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),a.jsxs("div",{className:"event-time",children:[k.startTime," - ",k.endTime]}),a.jsx("h3",{className:"project-title",children:k.title}),a.jsx("p",{children:k.description}),a.jsxs("div",{className:"project-meta",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Team:"})," ",g(k.team)]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Type:"})," ",k.type]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Location:"})," ",k.location]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Priority:"})," ",k.priority]})]}),H&&a.jsxs("div",{className:"action-buttons",style:{marginTop:"1rem"},children:[a.jsx("button",{className:"edit-btn",onClick:()=>E(k),children:"Edit"}),a.jsx("button",{className:"delete-btn",onClick:()=>A("event",k.id),children:"Delete"})]})]},k.id))}),s&&o&&a.jsx("div",{className:"modal-overlay",onClick:k=>k.target===k.currentTarget&&i(!1),children:a.jsxs("div",{className:"modal",children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:o.type==="project"?t.projects.find(k=>k.id===o.id)?"Edit Project":"Add Project":t.events.find(k=>k.id===o.id)?"Edit Event":"Add Event"}),a.jsx("button",{className:"close-btn",onClick:()=>i(!1),children:"×"})]}),o.type==="project"?a.jsxs("div",{children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Title"}),a.jsx("input",{type:"text",className:"form-input",value:o.title,onChange:k=>l({...o,title:k.target.value})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Description"}),a.jsx("textarea",{className:"form-textarea",value:o.description,onChange:k=>l({...o,description:k.target.value})})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Team"}),a.jsx("select",{className:"form-select",value:o.team,onChange:k=>l({...o,team:k.target.value}),children:t.teams.map(k=>a.jsx("option",{value:k.id,children:k.name},k.id))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Priority"}),a.jsxs("select",{className:"form-select",value:o.priority,onChange:k=>l({...o,priority:k.target.value}),children:[a.jsx("option",{value:"low",children:"Low"}),a.jsx("option",{value:"medium",children:"Medium"}),a.jsx("option",{value:"high",children:"High"}),a.jsx("option",{value:"critical",children:"Critical"})]})]})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Status"}),a.jsxs("select",{className:"form-select",value:o.status,onChange:k=>l({...o,status:k.target.value}),children:[a.jsx("option",{value:"planning",children:"Planning"}),a.jsx("option",{value:"pending",children:"Pending"}),a.jsx("option",{value:"in-progress",children:"In Progress"}),a.jsx("option",{value:"completed",children:"Completed"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Assigned To"}),a.jsx("input",{type:"text",className:"form-input",value:o.assignedTo,onChange:k=>l({...o,assignedTo:k.target.value})})]})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Start Date"}),a.jsx("input",{type:"date",className:"form-input",value:o.startDate,onChange:k=>l({...o,startDate:k.target.value})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Due Date"}),a.jsx("input",{type:"date",className:"form-input",value:o.dueDate,onChange:k=>l({...o,dueDate:k.target.value})})]})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Estimated Hours"}),a.jsx("input",{type:"number",className:"form-input",value:o.estimatedHours,onChange:k=>l({...o,estimatedHours:parseInt(k.target.value)||0})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Progress (%)"}),a.jsx("input",{type:"number",className:"form-input",min:"0",max:"100",value:o.progress,onChange:k=>l({...o,progress:parseInt(k.target.value)||0})})]})]}),a.jsxs("div",{className:"tasks-management-section",children:[a.jsx("h3",{children:"Tasks Management"}),a.jsx("div",{className:"tasks-list",children:o.tasks.map((k,w)=>a.jsxs("div",{className:"task-edit-item",children:[a.jsxs("div",{className:"task-edit-header",children:[a.jsxs("h4",{children:["Task ",w+1]}),a.jsx("button",{type:"button",className:"delete-btn",onClick:()=>{const T=o.tasks.filter(($,oe)=>oe!==w);l({...o,tasks:T})},children:"Remove"})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Task Title"}),a.jsx("input",{type:"text",className:"form-input",value:k.title,onChange:T=>{const $=[...o.tasks];$[w]={...k,title:T.target.value},l({...o,tasks:$})}})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Task Description"}),a.jsx("textarea",{className:"form-textarea",style:{minHeight:"60px"},value:k.description,onChange:T=>{const $=[...o.tasks];$[w]={...k,description:T.target.value},l({...o,tasks:$})}})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Start Date"}),a.jsx("input",{type:"date",className:"form-input",value:k.startDate,onChange:T=>{const $=[...o.tasks];$[w]={...k,startDate:T.target.value},l({...o,tasks:$})}})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Due Date"}),a.jsx("input",{type:"date",className:"form-input",value:k.dueDate,onChange:T=>{const $=[...o.tasks];$[w]={...k,dueDate:T.target.value},l({...o,tasks:$})}})]})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Status"}),a.jsxs("select",{className:"form-select",value:k.status,onChange:T=>{const $=[...o.tasks];$[w]={...k,status:T.target.value},l({...o,tasks:$})},children:[a.jsx("option",{value:"pending",children:"Pending"}),a.jsx("option",{value:"in-progress",children:"In Progress"}),a.jsx("option",{value:"completed",children:"Completed"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Priority"}),a.jsxs("select",{className:"form-select",value:k.priority,onChange:T=>{const $=[...o.tasks];$[w]={...k,priority:T.target.value},l({...o,tasks:$})},children:[a.jsx("option",{value:"low",children:"Low"}),a.jsx("option",{value:"medium",children:"Medium"}),a.jsx("option",{value:"high",children:"High"}),a.jsx("option",{value:"critical",children:"Critical"})]})]})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Assigned To"}),a.jsx("input",{type:"text",className:"form-input",value:k.assignedTo,onChange:T=>{const $=[...o.tasks];$[w]={...k,assignedTo:T.target.value},l({...o,tasks:$})}})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Progress (%)"}),a.jsx("input",{type:"number",className:"form-input",min:"0",max:"100",value:k.progress,onChange:T=>{const $=[...o.tasks];$[w]={...k,progress:parseInt(T.target.value)||0},l({...o,tasks:$})}})]})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Estimated Hours"}),a.jsx("input",{type:"number",className:"form-input",value:k.estimatedHours,onChange:T=>{const $=[...o.tasks];$[w]={...k,estimatedHours:parseInt(T.target.value)||0},l({...o,tasks:$})}})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Actual Hours"}),a.jsx("input",{type:"number",className:"form-input",value:k.actualHours,onChange:T=>{const $=[...o.tasks];$[w]={...k,actualHours:parseInt(T.target.value)||0},l({...o,tasks:$})}})]})]})]},k.id||w))}),a.jsx("button",{type:"button",className:"add-button",onClick:()=>{const k={id:Date.now(),title:"",description:"",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,status:"pending",priority:"medium",assignedTo:"",progress:0};l({...o,tasks:[...o.tasks,k]})},children:"+ Add Task"})]})]}):a.jsxs("div",{children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Title"}),a.jsx("input",{type:"text",className:"form-input",value:o.title,onChange:k=>l({...o,title:k.target.value})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Description"}),a.jsx("textarea",{className:"form-textarea",value:o.description,onChange:k=>l({...o,description:k.target.value})})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Team"}),a.jsx("select",{className:"form-select",value:o.team,onChange:k=>l({...o,team:k.target.value}),children:t.teams.map(k=>a.jsx("option",{value:k.id,children:k.name},k.id))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Type"}),a.jsxs("select",{className:"form-select",value:o.eventType,onChange:k=>l({...o,eventType:k.target.value}),children:[a.jsx("option",{value:"meeting",children:"Meeting"}),a.jsx("option",{value:"testing",children:"Testing"}),a.jsx("option",{value:"presentation",children:"Presentation"}),a.jsx("option",{value:"deadline",children:"Deadline"}),a.jsx("option",{value:"milestone",children:"Milestone"})]})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Date"}),a.jsx("input",{type:"date",className:"form-input",value:o.date,onChange:k=>l({...o,date:k.target.value})})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Start Time"}),a.jsx("input",{type:"time",className:"form-input",value:o.startTime,onChange:k=>l({...o,startTime:k.target.value})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"End Time"}),a.jsx("input",{type:"time",className:"form-input",value:o.endTime,onChange:k=>l({...o,endTime:k.target.value})})]})]}),a.jsxs("div",{className:"form-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Location"}),a.jsx("input",{type:"text",className:"form-input",value:o.location,onChange:k=>l({...o,location:k.target.value})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Priority"}),a.jsxs("select",{className:"form-select",value:o.priority,onChange:k=>l({...o,priority:k.target.value}),children:[a.jsx("option",{value:"low",children:"Low"}),a.jsx("option",{value:"medium",children:"Medium"}),a.jsx("option",{value:"high",children:"High"}),a.jsx("option",{value:"critical",children:"Critical"})]})]})]})]}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{className:"cancel-btn",onClick:()=>i(!1),children:"Cancel"}),a.jsx("button",{className:"save-btn",onClick:P,children:"Save"})]})]})})]})};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),dx=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,n)=>n?n.toUpperCase():r.toLowerCase()),Zu=t=>{const e=dx(t);return e.charAt(0).toUpperCase()+e.slice(1)},$p=(...t)=>t.filter((e,r,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===r).join(" ").trim(),hx=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var fx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const px=_.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:s="",children:i,iconNode:o,...l},c)=>_.createElement("svg",{ref:c,...fx,width:e,height:e,stroke:t,strokeWidth:n?Number(r)*24/Number(e):r,className:$p("lucide",s),...!i&&!hx(l)&&{"aria-hidden":"true"},...l},[...o.map(([u,d])=>_.createElement(u,d)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=(t,e)=>{const r=_.forwardRef(({className:n,...s},i)=>_.createElement(px,{ref:i,iconNode:e,className:$p(`lucide-${ux(Zu(t))}`,`lucide-${t}`,n),...s}));return r.displayName=Zu(t),r};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mx=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],gx=nt("award",mx);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vx=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],yx=nt("calendar",vx);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wx=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],xx=nt("chart-column",wx);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bx=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],jx=nt("graduation-cap",bx);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _x=[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]],kx=nt("grip-vertical",_x);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Nx=nt("package",Sx);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],Lp=nt("pen",Ex);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],rn=nt("plus",Cx);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],Ui=nt("save",Tx);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Kn=nt("trash-2",Px);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Dx=nt("users",Ox);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Zo=nt("x",Rx),Ax=()=>{var Qe;const[t,e]=_.useState([]),[r,n]=_.useState(!0),[s,i]=_.useState(null),[o,l]=_.useState(null),[c,u]=_.useState({semester:"",leadership:[]}),[d,f]=_.useState(!1),[h,g]=_.useState(null),[x,b]=_.useState(null),{showError:j,showConfirm:y}=Ip(),{status:p,lastSync:m,startSaving:N,finishSaving:v,acknowledgeNewData:S,setDisplayedData:E}=Dp(()=>Ie.getAlumni(),2e3);_.useEffect(()=>{P()},[]);const P=async()=>{console.log("Loading alumni data from Supabase..."),n(!0);try{const C=await Ie.getAlumni();if(console.log("Loaded alumni data:",C),!C||!C.alumniData)throw console.error("Invalid data structure received:",C),new Error("Invalid alumni data structure");console.log(`✓ Successfully loaded ${C.alumniData.length} alumni semesters from Supabase`),e(C.alumniData),E(C)}catch(C){console.error("Error loading alumni data:",C),await j(`Failed to load alumni data: ${C.message}`,"Load Error"),e([])}finally{n(!1)}},A=(C,D)=>{l({...C}),i(D)},I=async()=>{if(!o.semester.trim()){await j("Please enter a semester name.","Missing Required Field");return}i(null);const C={...o};l(null),N();try{await Ie.saveAlumniSemester(C),await P(),console.log("✓ Alumni semester saved successfully")}catch(D){console.error("Error saving alumni semester:",D),await j(`Failed to save: ${D.message}`,"Save Error")}finally{v()}},z=C=>D=>{s===null&&(g(C),D.dataTransfer.effectAllowed="move")},H=C=>D=>{s!==null||h===null||b(C)},k=C=>{s!==null||h===null||C.preventDefault()},w=async C=>{if(s!==null||h===null||x===null)return;C.preventDefault();const D=[...t],[q]=D.splice(h,1);D.splice(x,0,q);const X=D.length,Re=D.map((we,Ue)=>({...we,order:X-Ue}));e(Re),g(null),b(null);try{N();const we=Re.map(Ue=>({id:Ue.id,order:Ue.order})).filter(Ue=>typeof Ue.id=="number"&&!Number.isNaN(Ue.id));await Ie.saveAlumniOrder(we)}catch(we){console.error("Failed to save new alumni order:",we),await j(`Failed to save new order: ${we.message}`,"Save Order Error")}finally{v()}},T=()=>{i(null),l(null)},$=async()=>{if(!c.semester.trim()){await j("Please enter a semester name.","Missing Required Field");return}f(!1);const C=t.length>0?Math.max(...t.map(q=>typeof q.order=="number"?q.order:0)):0,D={...c,leadership:c.leadership||[],order:C+1};u({semester:"",leadership:[]}),N();try{await Ie.saveAlumniSemester(D),await P(),console.log("✓ Alumni semester added successfully")}catch(q){console.error("Error adding alumni semester:",q),await j(`Failed to add semester: ${q.message}`,"Save Error")}finally{v()}},oe=async(C,D)=>{if(await y(`This action cannot be undone. The semester "${D}" and all its leadership data will be permanently deleted.`,"Delete Alumni Semester?","Delete","Cancel")){N();try{const X=typeof C=="number"?C:C??null;await Ie.deleteAlumniSemesterSafe({id:X,semester:D}),e(Re=>Re.filter(we=>we.id!==C)),await P(),console.log("✓ Alumni semester deleted successfully")}catch(X){console.error("Error deleting alumni semester:",X),await j(`Failed to delete: ${X.message}`,"Delete Error")}finally{v()}}},R=(C,D)=>{l({...o,[C]:D})},B=()=>{const C=[...o.leadership||[],{role:"",name:""}];l({...o,leadership:C})},W=(C,D,q)=>{const X=[...o.leadership];X[C][D]=q,l({...o,leadership:X})},Y=C=>{const D=o.leadership.filter((q,X)=>X!==C);l({...o,leadership:D})},le=()=>{const C=[...c.leadership||[],{role:"",name:""}];u({...c,leadership:C})},bt=(C,D,q)=>{const X=[...c.leadership];X[C][D]=q,u({...c,leadership:X})},st=C=>{const D=c.leadership.filter((q,X)=>X!==C);u({...c,leadership:D})};return r?a.jsxs("div",{className:"loading-container",children:[a.jsx("div",{className:"loading-spinner"}),a.jsx("p",{children:"Loading alumni data..."})]}):a.jsxs("div",{className:"alumni-manager",children:[a.jsx("style",{children:`
        .alumni-manager {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .alumni-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .alumni-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: var(--accent);
          margin: 0;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .btn:disabled {
          background: #666;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: #666;
        }

        .btn-secondary:hover {
          background: #777;
        }

        .semester-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: box-shadow .2s ease, transform .1s ease, border-color .2s ease;
        }

        .semester-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          gap: 0.75rem;
        }

        .semester-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0; /* allows children to shrink for ellipsis */
          flex: 1;
        }

        .semester-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--text);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .semester-actions {
          display: flex;
          gap: 0.5rem;
          padding-left: 0.5rem; /* breathing room between title/input and actions */
        }

        .btn-small {
          padding: 0.5rem;
          font-size: 0.8rem;
          min-width: auto;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text);
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #333;
          border-radius: 6px;
          background: var(--bg);
          color: var(--text);
          font-size: 0.9rem;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
        }

        .leadership-list {
          margin-top: 1rem;
        }

        .leadership-item {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 1rem;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg);
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .leadership-item input {
          margin-bottom: 0;
        }

        .leadership-item-readonly {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg);
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .leadership-role-name {
          color: var(--text);
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Grid layout for semesters */
        .semesters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          align-items: start;
        }

        /* Drag visual */
        .semester-card.drag-over {
          outline: 2px dashed var(--accent);
          outline-offset: -6px;
          transform: scale(0.995);
        }

        .leadership-role-name .role {
          font-weight: bold;
          color: var(--accent);
        }

        .add-semester-form {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          border: 2px dashed #333;
        }

        .loading-container {
          text-align: center;
          padding: 2rem;
          color: var(--text);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #333;
          border-top: 3px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--subtxt);
        }

        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .alumni-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .action-buttons {
            justify-content: center;
          }

          .leadership-item {
            grid-template-columns: 1fr;
          }

          .leadership-item-readonly {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}),a.jsxs("div",{className:"alumni-header",children:[a.jsx("h2",{className:"alumni-title",children:"Alumni Management"}),a.jsxs("div",{className:"action-buttons",style:{alignItems:"center"},children:[a.jsx(Rp,{status:p,lastSync:m,onAcknowledge:S}),a.jsxs("button",{className:"btn",onClick:()=>f(!d),children:[a.jsx(rn,{size:18}),"Add Semester"]})]})]}),d&&a.jsxs("div",{className:"add-semester-form",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Semester"}),a.jsx("input",{type:"text",className:"form-input",value:c.semester,onChange:C=>u({...c,semester:C.target.value}),placeholder:"e.g., Fall 2025"})]}),a.jsxs("div",{className:"leadership-list",children:[a.jsx("h4",{style:{color:"var(--text)",marginBottom:"1rem"},children:"Leadership"}),(Qe=c.leadership)==null?void 0:Qe.map((C,D)=>a.jsxs("div",{className:"leadership-item",children:[a.jsx("input",{type:"text",className:"form-input",value:C.role,onChange:q=>bt(D,"role",q.target.value),placeholder:"Role (e.g., Project Director)"}),a.jsx("input",{type:"text",className:"form-input",value:C.name,onChange:q=>bt(D,"name",q.target.value),placeholder:"Name"}),a.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>st(D),children:a.jsx(Kn,{size:16})})]},D)),a.jsxs("button",{className:"btn btn-small",onClick:le,style:{marginTop:"0.5rem"},children:[a.jsx(rn,{size:16}),"Add Leadership Role"]})]}),a.jsxs("div",{className:"action-buttons",style:{marginTop:"1rem"},children:[a.jsxs("button",{className:"btn",onClick:$,children:[a.jsx(Ui,{size:18}),"Save Semester"]}),a.jsxs("button",{className:"btn btn-secondary",onClick:()=>{f(!1),u({semester:"",leadership:[]})},children:[a.jsx(Zo,{size:18}),"Cancel"]})]})]}),t.length===0?a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-state-icon",children:"👥"}),a.jsx("h3",{children:"No Alumni Data"}),a.jsx("p",{children:"Start by adding your first semester of alumni data."})]}):a.jsx("div",{className:"semesters-grid",onDragOver:k,onDrop:w,children:t.map((C,D)=>{var q,X;return a.jsxs("div",{className:`semester-card${x===D?" drag-over":""}`,draggable:s===null,onDragStart:z(D),onDragEnter:H(D),children:[a.jsxs("div",{className:"semester-header",children:[s===D?a.jsx("input",{type:"text",className:"form-input",value:o.semester,onChange:Re=>R("semester",Re.target.value),style:{maxWidth:"420px"}}):a.jsxs("div",{className:"semester-title-row",children:[a.jsx("span",{title:"Drag to reorder",style:{cursor:"grab",color:"var(--subtxt)"},children:a.jsx(kx,{size:18})}),a.jsx("h3",{className:"semester-title",children:C.semester})]}),a.jsx("div",{className:"semester-actions",children:s===D?a.jsxs(a.Fragment,{children:[a.jsx("button",{className:"btn btn-small",onClick:I,children:a.jsx(Ui,{size:16})}),a.jsx("button",{className:"btn btn-small btn-secondary",onClick:T,children:a.jsx(Zo,{size:16})})]}):a.jsxs(a.Fragment,{children:[a.jsx("button",{className:"btn btn-small",onClick:()=>A(C,D),children:a.jsx(Lp,{size:16})}),a.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>oe(C.id,C.semester),children:a.jsx(Kn,{size:16})})]})})]}),a.jsxs("div",{className:"leadership-list",children:[a.jsx("h4",{style:{color:"var(--text)",marginBottom:"1rem"},children:"Leadership"}),s===D?a.jsxs(a.Fragment,{children:[(q=o.leadership)==null?void 0:q.map((Re,we)=>a.jsxs("div",{className:"leadership-item",children:[a.jsx("input",{type:"text",className:"form-input",value:Re.role,onChange:Ue=>W(we,"role",Ue.target.value),placeholder:"Role (e.g., Project Director)"}),a.jsx("input",{type:"text",className:"form-input",value:Re.name,onChange:Ue=>W(we,"name",Ue.target.value),placeholder:"Name"}),a.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>Y(we),children:a.jsx(Kn,{size:16})})]},we)),a.jsxs("button",{className:"btn btn-small",onClick:B,children:[a.jsx(rn,{size:16}),"Add Leadership Role"]})]}):(X=C.leadership)==null?void 0:X.map((Re,we)=>a.jsx("div",{className:"leadership-item-readonly",children:a.jsxs("div",{className:"leadership-role-name",children:[a.jsxs("span",{className:"role",children:[Re.role,":"]})," ",Re.name]})},we))]})]},C.id||D)})})]})},Ix=()=>{const[t,e]=_.useState([]),[r,n]=_.useState(!0),[s,i]=_.useState(null);_.useState(null);const[o,l]=_.useState({tier:"",sponsors:[]}),[c,u]=_.useState(!1),[d,f]=_.useState(!1),h=[{tier:"Platinum Sponsors",sponsors:[]},{tier:"Gold Sponsors",sponsors:[]},{tier:"Silver Sponsors",sponsors:[]},{tier:"Bronze Sponsors",sponsors:[]}];_.useEffect(()=>{g()},[]);const g=async()=>{try{n(!0);try{const E=`/data/sponsors.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,P=await fetch(E,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(P.status===304){const A=sessionStorage.getItem("json:/data/sponsors.json");if(A){const I=JSON.parse(A);e(I.sponsorTiers||h);return}throw new Error("HTTP 304 with no cached copy")}if(P.ok){const A=await P.json();sessionStorage.setItem("json:/data/sponsors.json",JSON.stringify(A)),e(A.sponsorTiers||h)}else e(h)}catch{const E=sessionStorage.getItem("json:/data/sponsors.json");if(E){const P=JSON.parse(E);e(P.sponsorTiers||h)}else e(h)}}catch(S){console.error("Error loading sponsor data:",S),e(h)}finally{n(!1)}},x=async()=>{if(!re.hasPermission("edit_content")){alert("You do not have permission to edit sponsor data");return}try{f(!0),console.log("Saving sponsor data:",{sponsorTiers:t}),alert("✓ Sponsor data saved locally! (Supabase integration pending)")}catch(S){console.error("Error saving sponsor data:",S),alert("Error saving sponsor data: "+S.message)}finally{f(!1)}},b=()=>{if(!o.tier.trim()){alert("Please enter a tier name");return}const S=[...t,{...o,sponsors:o.sponsors||[]}];e(S),l({tier:"",sponsors:[]}),u(!1)},j=S=>{if(confirm("Are you sure you want to delete this tier?")){const E=t.filter((P,A)=>A!==S);e(E)}},y=(S,E,P)=>{const A=[...t];A[S][E]=P,e(A)},p=S=>{const E=[...t];E[S].sponsors.push({name:"",image:""}),e(E)},m=(S,E,P,A)=>{const I=[...t];I[S].sponsors[E][P]=A,e(I)},N=(S,E)=>{const P=[...t];P[S].sponsors.splice(E,1),e(P)},v=S=>{const E=S.toLowerCase();return E.includes("platinum")?"🏆":E.includes("gold")?"🥇":E.includes("silver")?"🥈":E.includes("bronze")?"🥉":"⭐"};return r?a.jsxs("div",{className:"loading-container",children:[a.jsx("div",{className:"loading-spinner"}),a.jsx("p",{children:"Loading sponsor data..."})]}):a.jsxs("div",{className:"sponsors-manager",children:[a.jsx("style",{children:`
        .sponsors-manager {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sponsors-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .sponsors-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: var(--accent);
          margin: 0;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .btn:disabled {
          background: #666;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: #666;
        }

        .btn-secondary:hover {
          background: #777;
        }

        .tier-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .tier-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .tier-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--text);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tier-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-small {
          padding: 0.5rem;
          font-size: 0.8rem;
          min-width: auto;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text);
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #333;
          border-radius: 6px;
          background: var(--bg);
          color: var(--text);
          font-size: 0.9rem;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
        }

        .sponsors-list {
          margin-top: 1rem;
        }

        .sponsor-item {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 1rem;
          align-items: start;
          padding: 1rem;
          background: var(--bg);
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .sponsor-item-readonly {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg);
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .sponsor-info {
          flex: 1;
        }

        .sponsor-name {
          font-weight: bold;
          color: var(--text);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .sponsor-image-path {
          color: var(--subtxt);
          font-size: 0.9rem;
          font-family: monospace;
        }

        .sponsor-logo-preview {
          width: 60px;
          height: 40px;
          object-fit: contain;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
        }

        .sponsor-preview {
          grid-column: 1 / -1;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          text-align: center;
        }

        .sponsor-preview img {
          max-width: 200px;
          max-height: 100px;
          object-fit: contain;
          border-radius: 4px;
        }

        .sponsor-preview-text {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .add-tier-form {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          border: 2px dashed #333;
        }

        .loading-container {
          text-align: center;
          padding: 2rem;
          color: var(--text);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #333;
          border-top: 3px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-sponsors {
          text-align: center;
          padding: 2rem;
          color: var(--subtxt);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          margin-top: 1rem;
        }

        .file-input-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .file-input {
          position: absolute;
          left: -9999px;
        }

        .file-input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid #333;
          border-radius: 6px;
          background: var(--bg);
          color: var(--text);
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .file-input-label:hover {
          border-color: var(--accent);
        }

        @media (max-width: 768px) {
          .sponsors-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .action-buttons {
            justify-content: center;
          }

          .sponsor-item {
            grid-template-columns: 1fr;
          }

          .sponsor-item-readonly {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .sponsor-logo-preview {
            align-self: center;
          }
        }
      `}),a.jsxs("div",{className:"sponsors-header",children:[a.jsx("h2",{className:"sponsors-title",children:"Sponsors Management"}),a.jsxs("div",{className:"action-buttons",children:[a.jsxs("button",{className:"btn",onClick:()=>u(!c),children:[a.jsx(rn,{size:18}),"Add Tier"]}),a.jsxs("button",{className:"btn",onClick:x,disabled:d,children:[a.jsx(Ui,{size:18}),d?"Saving...":"Save Changes"]})]})]}),c&&a.jsxs("div",{className:"add-tier-form",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Tier Name"}),a.jsx("input",{type:"text",className:"form-input",value:o.tier,onChange:S=>l({...o,tier:S.target.value}),placeholder:"e.g., Diamond Sponsors"})]}),a.jsxs("div",{className:"action-buttons",children:[a.jsxs("button",{className:"btn",onClick:b,children:[a.jsx(rn,{size:18}),"Add Tier"]}),a.jsxs("button",{className:"btn btn-secondary",onClick:()=>{u(!1),l({tier:"",sponsors:[]})},children:[a.jsx(Zo,{size:18}),"Cancel"]})]})]}),t.map((S,E)=>{var P,A,I;return a.jsxs("div",{className:"tier-card",children:[a.jsxs("div",{className:"tier-header",children:[s===E?a.jsx("input",{type:"text",className:"form-input",value:S.tier,onChange:z=>y(E,"tier",z.target.value),style:{maxWidth:"300px"}}):a.jsxs("h3",{className:"tier-title",children:[a.jsx("span",{children:v(S.tier)}),S.tier]}),a.jsxs("div",{className:"tier-actions",children:[s===E?a.jsx("button",{className:"btn btn-small",onClick:()=>i(null),children:a.jsx(Ui,{size:16})}):a.jsx("button",{className:"btn btn-small",onClick:()=>i(E),children:a.jsx(Lp,{size:16})}),a.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>j(E),children:a.jsx(Kn,{size:16})})]})]}),a.jsxs("div",{className:"sponsors-list",children:[a.jsx("h4",{style:{color:"var(--text)",marginBottom:"1rem"},children:"Sponsors"}),((P=S.sponsors)==null?void 0:P.length)===0?a.jsx("div",{className:"empty-sponsors",children:a.jsx("p",{children:"No sponsors in this tier yet."})}):s===E?a.jsx(a.Fragment,{children:(A=S.sponsors)==null?void 0:A.map((z,H)=>a.jsxs("div",{className:"sponsor-item",children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Sponsor Name"}),a.jsx("input",{type:"text",className:"form-input",value:z.name,onChange:k=>m(E,H,"name",k.target.value),placeholder:"Sponsor name"})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Image Path"}),a.jsx("input",{type:"text",className:"form-input",value:z.image,onChange:k=>m(E,H,"image",k.target.value),placeholder:"/images/sponsors/logo.png"})]}),a.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>N(E,H),style:{alignSelf:"end"},children:a.jsx(Kn,{size:16})}),z.image&&a.jsxs("div",{className:"sponsor-preview",children:[a.jsx("img",{src:z.image,alt:z.name,onError:k=>{k.target.style.display="none",k.target.nextSibling.style.display="block"}}),a.jsxs("div",{className:"sponsor-preview-text",style:{display:"none"},children:["Image not found: ",z.image]})]})]},H))}):(I=S.sponsors)==null?void 0:I.map((z,H)=>a.jsxs("div",{className:"sponsor-item-readonly",children:[a.jsxs("div",{className:"sponsor-info",children:[a.jsx("div",{className:"sponsor-name",children:z.name}),a.jsx("div",{className:"sponsor-image-path",children:z.image})]}),z.image&&a.jsx("img",{src:z.image,alt:z.name,className:"sponsor-logo-preview",onError:k=>{k.target.style.display="none"}})]},H)),s===E&&a.jsxs("button",{className:"btn btn-small",onClick:()=>p(E),children:[a.jsx(rn,{size:16}),"Add Sponsor"]})]})]},E)})]})},$x=()=>{const[t,e]=_.useState([]),[r,n]=_.useState(!0),[s,i]=_.useState("all"),[o,l]=_.useState("all"),[c,u]=_.useState(!1);_.useState(null);const[d,f]=_.useState(null),[h,g]=_.useState({submissionDetails:{subteam:"",submitterName:"",submitterEmail:""},materialDetails:{materialName:"",specifications:"",materialLink:"",supplier:"",supplierContact:""},costBreakdown:{unitPrice:"",quantity:"",shippingCost:"",taxes:"",fees:""},projectDetails:{purpose:"",priority:"medium",urgency:"flexible",neededByDate:""},sponsorshipInfo:{canBeSponsored:!1,sponsorContactName:"",sponsorContactEmail:"",sponsorCompany:""}});_.useEffect(()=>{x()},[]);const x=async()=>{try{const T=await(await fetch("/data/orders.json")).json();e(T.orders||[])}catch(w){console.error("Error loading orders:",w)}finally{n(!1)}},b=async(w,T)=>{const $=t.map(oe=>{if(oe.id===w){const R=new Date().toISOString();let B={...oe,lastUpdated:R};return T.type==="technical_approval"?(B.approvalWorkflow.technicalDirectorApproval={...B.approvalWorkflow.technicalDirectorApproval,status:T.approved?"approved":"denied",approvedBy:T.approvedBy,approvalDate:R,comments:T.comments||"",denialReason:T.denialReason||""},B.status=T.approved?"pending_project_approval":"denied"):T.type==="project_approval"?(B.approvalWorkflow.projectDirectorPurchaseApproval={...B.approvalWorkflow.projectDirectorPurchaseApproval,status:T.approved?"approved":"denied",approvedBy:T.approvedBy,approvalDate:R,comments:T.comments||"",denialReason:T.denialReason||""},B.status=T.approved?"approved_for_purchase":"denied"):T.type==="purchase"?(B.purchaseStatus={...B.purchaseStatus,purchased:!0,purchaseDate:R,purchaseOrderNumber:T.purchaseOrderNumber||"",actualCost:T.actualCost||B.costBreakdown.totalCost,purchasedBy:T.purchasedBy||""},B.status="purchased"):T.type==="delivery"?(B.deliveryInfo={...B.deliveryInfo,actualArrivalDate:R,deliveredToSubteam:!0,deliveryConfirmedBy:T.confirmedBy||"",deliveryNotes:T.notes||"",trackingNumber:T.trackingNumber||""},B.status="delivered"):T.type==="sponsorship_response"&&(B.sponsorshipInfo={...B.sponsorshipInfo,sponsorshipSuccessful:T.successful,sponsorshipResponse:T.response||"",sponsorshipResponseDate:R}),B}return oe});e($),console.log("Updating order:",w,T)},j=async()=>{const w=new Date().toISOString(),T={id:`order-${Date.now()}`,submissionTimestamp:w,submissionDetails:h.submissionDetails,materialDetails:h.materialDetails,costBreakdown:{...h.costBreakdown,unitPrice:parseFloat(h.costBreakdown.unitPrice),quantity:parseInt(h.costBreakdown.quantity),shippingCost:parseFloat(h.costBreakdown.shippingCost||0),taxes:parseFloat(h.costBreakdown.taxes||0),fees:parseFloat(h.costBreakdown.fees||0),subtotal:parseFloat(h.costBreakdown.unitPrice)*parseInt(h.costBreakdown.quantity),totalCost:parseFloat(h.costBreakdown.unitPrice)*parseInt(h.costBreakdown.quantity)+parseFloat(h.costBreakdown.shippingCost||0)+parseFloat(h.costBreakdown.taxes||0)+parseFloat(h.costBreakdown.fees||0)},projectDetails:{...h.projectDetails,neededByDate:h.projectDetails.neededByDate?new Date(h.projectDetails.neededByDate).toISOString():null},approvalWorkflow:{technicalDirectorApproval:{status:"pending",approvedBy:null,approvalDate:null,comments:"",denialReason:""},projectDirectorPurchaseApproval:{status:"pending",approvedBy:null,approvalDate:null,comments:"",denialReason:""}},sponsorshipInfo:{...h.sponsorshipInfo,sponsorshipRequested:h.sponsorshipInfo.canBeSponsored&&h.sponsorshipInfo.sponsorContactName,sponsorshipRequestDate:h.sponsorshipInfo.canBeSponsored?w:null,sponsorshipSuccessful:!1,sponsorshipResponse:"",sponsorshipResponseDate:null},purchaseStatus:{purchased:!1,purchaseDate:null,purchaseOrderNumber:"",actualCost:null,purchasedBy:""},deliveryInfo:{expectedArrivalDate:null,actualArrivalDate:null,deliveredToSubteam:!1,deliveryConfirmedBy:"",deliveryNotes:"",trackingNumber:""},documentation:{receiptInvoice:{uploaded:!1,fileName:"",uploadDate:null,uploadedBy:""},additionalDocuments:[]},returnInfo:{returned:!1,returnDate:null,returnReason:"",returnAuthorizedBy:"",refundAmount:null,refundProcessed:!1},status:"pending_technical_approval",lastUpdated:w,createdBy:h.submissionDetails.submitterEmail};e([...t,T]),u(!1),y(),console.log("New order submitted:",T)},y=()=>{g({submissionDetails:{subteam:"",submitterName:"",submitterEmail:""},materialDetails:{materialName:"",specifications:"",materialLink:"",supplier:"",supplierContact:""},costBreakdown:{unitPrice:"",quantity:"",shippingCost:"",taxes:"",fees:""},projectDetails:{purpose:"",priority:"medium",urgency:"flexible",neededByDate:""},sponsorshipInfo:{canBeSponsored:!1,sponsorContactName:"",sponsorContactEmail:"",sponsorCompany:""}})},p=re.hasPermission("approve_orders"),m=re.hasPermission("submit_orders")||re.hasPermission("view_schedules"),N=re.hasPermission("submit_orders"),v=re.hasPermission("technical_director"),S=re.hasPermission("project_director"),E=t.filter(w=>!(s!=="all"&&w.status!==s||o!=="all"&&w.submissionDetails.subteam!==o)),P=w=>{switch(w){case"pending_technical_approval":return"#fd7e14";case"pending_project_approval":return"#17a2b8";case"approved_for_purchase":return"#007bff";case"purchased":return"#6f42c1";case"delivered":return"#28a745";case"denied":return"#dc3545";default:return"#6c757d"}},A=w=>{switch(w){case"pending_technical_approval":return"Pending Tech Approval";case"pending_project_approval":return"Pending Project Approval";case"approved_for_purchase":return"Approved for Purchase";case"purchased":return"Purchased";case"delivered":return"Delivered";case"denied":return"Denied";default:return w}},I=w=>{switch(w){case"high":return"#dc3545";case"medium":return"#ffc107";case"low":return"#28a745";default:return"#6c757d"}},z=[...new Set(t.map(w=>{var T;return(T=w.submissionDetails)==null?void 0:T.subteam}).filter(Boolean))],H=({order:w,onClose:T})=>{var $;return w?a.jsx("div",{className:"modal-overlay",onClick:T,children:a.jsxs("div",{className:"modal-content",onClick:oe=>oe.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:w.materialDetails.materialName}),a.jsx("button",{className:"modal-close",onClick:T,children:"×"})]}),a.jsxs("div",{className:"modal-body",children:[a.jsxs("div",{className:"detail-section",children:[a.jsx("h4",{children:"Submission Details"}),a.jsxs("div",{className:"detail-grid",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Subteam:"})," ",w.submissionDetails.subteam]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Submitted by:"})," ",w.submissionDetails.submitterName]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Email:"})," ",w.submissionDetails.submitterEmail]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Submitted:"})," ",new Date(w.submissionTimestamp).toLocaleString()]})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsx("h4",{children:"Material Specifications"}),a.jsxs("div",{className:"detail-grid",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Material:"})," ",w.materialDetails.materialName]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Supplier:"})," ",w.materialDetails.supplier]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Supplier Contact:"})," ",w.materialDetails.supplierContact]}),w.materialDetails.materialLink&&a.jsxs("div",{children:[a.jsx("strong",{children:"Link:"}),a.jsx("a",{href:w.materialDetails.materialLink,target:"_blank",rel:"noopener noreferrer",children:"View Material"})]})]}),a.jsxs("div",{className:"specifications",children:[a.jsx("strong",{children:"Specifications:"}),a.jsx("p",{children:w.materialDetails.specifications})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsx("h4",{children:"Cost Breakdown"}),a.jsxs("div",{className:"cost-table",children:[a.jsxs("div",{className:"cost-row",children:[a.jsx("span",{children:"Unit Price:"}),a.jsxs("span",{children:["$",w.costBreakdown.unitPrice.toFixed(2)]})]}),a.jsxs("div",{className:"cost-row",children:[a.jsx("span",{children:"Quantity:"}),a.jsx("span",{children:w.costBreakdown.quantity})]}),a.jsxs("div",{className:"cost-row",children:[a.jsx("span",{children:"Subtotal:"}),a.jsxs("span",{children:["$",w.costBreakdown.subtotal.toFixed(2)]})]}),a.jsxs("div",{className:"cost-row",children:[a.jsx("span",{children:"Shipping:"}),a.jsxs("span",{children:["$",w.costBreakdown.shippingCost.toFixed(2)]})]}),a.jsxs("div",{className:"cost-row",children:[a.jsx("span",{children:"Taxes:"}),a.jsxs("span",{children:["$",w.costBreakdown.taxes.toFixed(2)]})]}),a.jsxs("div",{className:"cost-row",children:[a.jsx("span",{children:"Fees:"}),a.jsxs("span",{children:["$",w.costBreakdown.fees.toFixed(2)]})]}),a.jsxs("div",{className:"cost-row total",children:[a.jsx("span",{children:a.jsx("strong",{children:"Total:"})}),a.jsx("span",{children:a.jsxs("strong",{children:["$",w.costBreakdown.totalCost.toFixed(2)]})})]})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsx("h4",{children:"Project Details"}),a.jsxs("div",{className:"detail-grid",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Priority:"})," ",w.projectDetails.priority]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Urgency:"})," ",w.projectDetails.urgency]}),w.projectDetails.neededByDate&&a.jsxs("div",{children:[a.jsx("strong",{children:"Needed by:"})," ",new Date(w.projectDetails.neededByDate).toLocaleDateString()]})]}),a.jsxs("div",{className:"purpose",children:[a.jsx("strong",{children:"Purpose:"}),a.jsx("p",{children:w.projectDetails.purpose})]})]}),w.sponsorshipInfo.canBeSponsored&&a.jsxs("div",{className:"detail-section",children:[a.jsx("h4",{children:"Sponsorship Information"}),a.jsxs("div",{className:"detail-grid",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Can be sponsored:"})," Yes"]}),w.sponsorshipInfo.sponsorContactName&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Sponsor Contact:"})," ",w.sponsorshipInfo.sponsorContactName]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Company:"})," ",w.sponsorshipInfo.sponsorCompany]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Email:"})," ",w.sponsorshipInfo.sponsorContactEmail]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Requested:"})," ",w.sponsorshipInfo.sponsorshipRequested?"Yes":"No"]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Successful:"})," ",w.sponsorshipInfo.sponsorshipSuccessful?"Yes":"No"]})]})]}),w.sponsorshipInfo.sponsorshipResponse&&a.jsxs("div",{className:"response",children:[a.jsx("strong",{children:"Sponsor Response:"}),a.jsx("p",{children:w.sponsorshipInfo.sponsorshipResponse})]})]}),a.jsxs("div",{className:"detail-section",children:[a.jsx("h4",{children:"Approval Status"}),a.jsxs("div",{className:"approval-grid",children:[a.jsxs("div",{className:"approval-item",children:[a.jsx("strong",{children:"Technical Director:"}),a.jsx("span",{className:`approval-status ${w.approvalWorkflow.technicalDirectorApproval.status}`,children:w.approvalWorkflow.technicalDirectorApproval.status}),w.approvalWorkflow.technicalDirectorApproval.comments&&a.jsx("p",{className:"approval-comment",children:w.approvalWorkflow.technicalDirectorApproval.comments}),w.approvalWorkflow.technicalDirectorApproval.denialReason&&a.jsx("p",{className:"denial-reason",children:w.approvalWorkflow.technicalDirectorApproval.denialReason})]}),a.jsxs("div",{className:"approval-item",children:[a.jsx("strong",{children:"Project Director:"}),a.jsx("span",{className:`approval-status ${w.approvalWorkflow.projectDirectorPurchaseApproval.status}`,children:w.approvalWorkflow.projectDirectorPurchaseApproval.status}),w.approvalWorkflow.projectDirectorPurchaseApproval.comments&&a.jsx("p",{className:"approval-comment",children:w.approvalWorkflow.projectDirectorPurchaseApproval.comments}),w.approvalWorkflow.projectDirectorPurchaseApproval.denialReason&&a.jsx("p",{className:"denial-reason",children:w.approvalWorkflow.projectDirectorPurchaseApproval.denialReason})]})]})]}),w.purchaseStatus.purchased&&a.jsxs("div",{className:"detail-section",children:[a.jsx("h4",{children:"Purchase Information"}),a.jsxs("div",{className:"detail-grid",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Purchase Date:"})," ",new Date(w.purchaseStatus.purchaseDate).toLocaleDateString()]}),a.jsxs("div",{children:[a.jsx("strong",{children:"PO Number:"})," ",w.purchaseStatus.purchaseOrderNumber]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Actual Cost:"})," $",($=w.purchaseStatus.actualCost)==null?void 0:$.toFixed(2)]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Purchased by:"})," ",w.purchaseStatus.purchasedBy]})]})]}),w.deliveryInfo.deliveredToSubteam&&a.jsxs("div",{className:"detail-section",children:[a.jsx("h4",{children:"Delivery Information"}),a.jsxs("div",{className:"detail-grid",children:[a.jsxs("div",{children:[a.jsx("strong",{children:"Delivered:"})," ",new Date(w.deliveryInfo.actualArrivalDate).toLocaleDateString()]}),a.jsxs("div",{children:[a.jsx("strong",{children:"Confirmed by:"})," ",w.deliveryInfo.deliveryConfirmedBy]}),w.deliveryInfo.trackingNumber&&a.jsxs("div",{children:[a.jsx("strong",{children:"Tracking:"})," ",w.deliveryInfo.trackingNumber]})]}),w.deliveryInfo.deliveryNotes&&a.jsxs("div",{className:"delivery-notes",children:[a.jsx("strong",{children:"Notes:"}),a.jsx("p",{children:w.deliveryInfo.deliveryNotes})]})]})]})]})}):null},k=()=>a.jsx("div",{className:"modal-overlay",onClick:()=>u(!1),children:a.jsxs("div",{className:"modal-content large",onClick:w=>w.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:"Submit New Order Request"}),a.jsx("button",{className:"modal-close",onClick:()=>u(!1),children:"×"})]}),a.jsx("div",{className:"modal-body",children:a.jsxs("form",{onSubmit:w=>{w.preventDefault(),j()},children:[a.jsxs("div",{className:"form-section",children:[a.jsx("h4",{children:"Submission Details"}),a.jsxs("div",{className:"form-grid",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Subteam *"}),a.jsxs("select",{value:h.submissionDetails.subteam,onChange:w=>g({...h,submissionDetails:{...h.submissionDetails,subteam:w.target.value}}),required:!0,children:[a.jsx("option",{value:"",children:"Select Subteam"}),a.jsx("option",{value:"Mechanical",children:"Mechanical"}),a.jsx("option",{value:"Electrical",children:"Electrical"}),a.jsx("option",{value:"Software",children:"Software"}),a.jsx("option",{value:"Business",children:"Business"}),a.jsx("option",{value:"Operations",children:"Operations"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Your Name *"}),a.jsx("input",{type:"text",value:h.submissionDetails.submitterName,onChange:w=>g({...h,submissionDetails:{...h.submissionDetails,submitterName:w.target.value}}),required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Your Email *"}),a.jsx("input",{type:"email",value:h.submissionDetails.submitterEmail,onChange:w=>g({...h,submissionDetails:{...h.submissionDetails,submitterEmail:w.target.value}}),required:!0})]})]})]}),a.jsxs("div",{className:"form-section",children:[a.jsx("h4",{children:"Material Details"}),a.jsxs("div",{className:"form-grid",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Material Name *"}),a.jsx("input",{type:"text",value:h.materialDetails.materialName,onChange:w=>g({...h,materialDetails:{...h.materialDetails,materialName:w.target.value}}),required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Supplier *"}),a.jsx("input",{type:"text",value:h.materialDetails.supplier,onChange:w=>g({...h,materialDetails:{...h.materialDetails,supplier:w.target.value}}),required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Supplier Contact"}),a.jsx("input",{type:"text",value:h.materialDetails.supplierContact,onChange:w=>g({...h,materialDetails:{...h.materialDetails,supplierContact:w.target.value}})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Material Link"}),a.jsx("input",{type:"url",value:h.materialDetails.materialLink,onChange:w=>g({...h,materialDetails:{...h.materialDetails,materialLink:w.target.value}})})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Detailed Specifications *"}),a.jsx("textarea",{value:h.materialDetails.specifications,onChange:w=>g({...h,materialDetails:{...h.materialDetails,specifications:w.target.value}}),rows:"4",placeholder:"Provide thorough specifications including dimensions, materials, performance characteristics, etc.",required:!0})]})]}),a.jsxs("div",{className:"form-section",children:[a.jsx("h4",{children:"Cost Information"}),a.jsxs("div",{className:"form-grid",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Unit Price ($) *"}),a.jsx("input",{type:"number",step:"0.01",value:h.costBreakdown.unitPrice,onChange:w=>g({...h,costBreakdown:{...h.costBreakdown,unitPrice:w.target.value}}),required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Quantity *"}),a.jsx("input",{type:"number",value:h.costBreakdown.quantity,onChange:w=>g({...h,costBreakdown:{...h.costBreakdown,quantity:w.target.value}}),required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Shipping Cost ($)"}),a.jsx("input",{type:"number",step:"0.01",value:h.costBreakdown.shippingCost,onChange:w=>g({...h,costBreakdown:{...h.costBreakdown,shippingCost:w.target.value}})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Estimated Taxes ($)"}),a.jsx("input",{type:"number",step:"0.01",value:h.costBreakdown.taxes,onChange:w=>g({...h,costBreakdown:{...h.costBreakdown,taxes:w.target.value}})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Additional Fees ($)"}),a.jsx("input",{type:"number",step:"0.01",value:h.costBreakdown.fees,onChange:w=>g({...h,costBreakdown:{...h.costBreakdown,fees:w.target.value}})})]})]}),h.costBreakdown.unitPrice&&h.costBreakdown.quantity&&a.jsx("div",{className:"cost-preview",children:a.jsxs("strong",{children:["Estimated Total: $",((parseFloat(h.costBreakdown.unitPrice)||0)*(parseInt(h.costBreakdown.quantity)||0)+(parseFloat(h.costBreakdown.shippingCost)||0)+(parseFloat(h.costBreakdown.taxes)||0)+(parseFloat(h.costBreakdown.fees)||0)).toFixed(2)]})})]}),a.jsxs("div",{className:"form-section",children:[a.jsx("h4",{children:"Project Details"}),a.jsxs("div",{className:"form-grid",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Priority *"}),a.jsxs("select",{value:h.projectDetails.priority,onChange:w=>g({...h,projectDetails:{...h.projectDetails,priority:w.target.value}}),required:!0,children:[a.jsx("option",{value:"low",children:"Low"}),a.jsx("option",{value:"medium",children:"Medium"}),a.jsx("option",{value:"high",children:"High"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Urgency *"}),a.jsxs("select",{value:h.projectDetails.urgency,onChange:w=>g({...h,projectDetails:{...h.projectDetails,urgency:w.target.value}}),required:!0,children:[a.jsx("option",{value:"flexible",children:"Flexible"}),a.jsx("option",{value:"needed_by_date",children:"Needed by specific date"}),a.jsx("option",{value:"asap",children:"ASAP"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Needed By Date"}),a.jsx("input",{type:"date",value:h.projectDetails.neededByDate,onChange:w=>g({...h,projectDetails:{...h.projectDetails,neededByDate:w.target.value}})})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Purpose for Project *"}),a.jsx("textarea",{value:h.projectDetails.purpose,onChange:w=>g({...h,projectDetails:{...h.projectDetails,purpose:w.target.value}}),rows:"3",placeholder:"Explain how this material will be used in the project and why it's needed",required:!0})]})]}),a.jsxs("div",{className:"form-section",children:[a.jsx("h4",{children:"Sponsorship Information"}),a.jsx("div",{className:"form-group",children:a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:h.sponsorshipInfo.canBeSponsored,onChange:w=>g({...h,sponsorshipInfo:{...h.sponsorshipInfo,canBeSponsored:w.target.checked}})}),"This material can be used for sponsorship opportunities"]})}),h.sponsorshipInfo.canBeSponsored&&a.jsxs("div",{className:"form-grid",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Sponsor Contact Name"}),a.jsx("input",{type:"text",value:h.sponsorshipInfo.sponsorContactName,onChange:w=>g({...h,sponsorshipInfo:{...h.sponsorshipInfo,sponsorContactName:w.target.value}})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Sponsor Company"}),a.jsx("input",{type:"text",value:h.sponsorshipInfo.sponsorCompany,onChange:w=>g({...h,sponsorshipInfo:{...h.sponsorshipInfo,sponsorCompany:w.target.value}})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Sponsor Contact Email"}),a.jsx("input",{type:"email",value:h.sponsorshipInfo.sponsorContactEmail,onChange:w=>g({...h,sponsorshipInfo:{...h.sponsorshipInfo,sponsorContactEmail:w.target.value}})})]})]})]}),a.jsxs("div",{className:"form-actions",children:[a.jsx("button",{type:"button",onClick:()=>u(!1),className:"btn-secondary",children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn-primary",children:"Submit Order Request"})]})]})})]})});return r?a.jsx("div",{className:"loading",children:"Loading orders..."}):m?a.jsxs("div",{className:"order-manager",children:[a.jsx("style",{children:`
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .order-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .btn-primary {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-right: 1rem;
        }

        .btn-secondary:hover {
          background: #545b62;
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          color: var(--text);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .filter-select {
          padding: 0.5rem 1rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: var(--surface);
          color: var(--text);
          font-size: 0.9rem;
          min-width: 150px;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--accent);
        }

        .orders-grid {
          display: grid;
          gap: 1.5rem;
        }

        .order-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .order-card:hover {
          transform: translateY(-2px);
        }

        .order-header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .order-title-section {
          flex: 1;
        }

        .order-part-name {
          color: var(--accent);
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .order-meta {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .order-badges {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
        }

        .priority-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
        }

        .order-details {
          background: rgba(0, 123, 255, 0.1);
          padding: 1rem;
          border-radius: 6px;
          margin: 1rem 0;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          color: var(--subtxt);
        }

        .detail-value {
          color: var(--text);
          font-weight: 500;
        }

        .order-notes {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 6px;
          margin: 1rem 0;
          font-style: italic;
          color: var(--subtxt);
        }

        .order-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .approve-btn {
          background: #28a745;
          color: white;
        }

        .approve-btn:hover {
          background: #218838;
        }

        .reject-btn {
          background: #dc3545;
          color: white;
        }

        .reject-btn:hover {
          background: #c82333;
        }

        .mark-ordered-btn {
          background: #17a2b8;
          color: white;
        }

        .mark-ordered-btn:hover {
          background: #138496;
        }

        .mark-delivered-btn {
          background: var(--accent);
          color: white;
        }

        .mark-delivered-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .stats-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--surface);
          padding: 1rem;
          border-radius: var(--radius);
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--accent);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: var(--subtxt);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .loading, .no-permission {
          text-align: center;
          color: var(--subtxt);
          padding: 2rem;
        }

        .no-orders {
          text-align: center;
          color: var(--subtxt);
          padding: 3rem;
          background: var(--surface);
          border-radius: var(--radius);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--surface);
          border-radius: var(--radius);
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .modal-content.large {
          max-width: 1000px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #333;
        }

        .modal-header h3 {
          color: var(--text);
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--subtxt);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
        }

        .modal-close:hover {
          color: var(--text);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .detail-section {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #333;
        }

        .detail-section:last-child {
          border-bottom: none;
        }

        .detail-section h4 {
          color: var(--accent);
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .detail-grid > div {
          color: var(--text);
          font-size: 0.9rem;
        }

        .specifications, .purpose, .response, .delivery-notes {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1rem;
        }

        .specifications p, .purpose p, .response p, .delivery-notes p {
          margin: 0.5rem 0 0 0;
          color: var(--text);
          line-height: 1.5;
        }

        .cost-table {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 6px;
        }

        .cost-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .cost-row.total {
          border-top: 1px solid #333;
          padding-top: 0.5rem;
          margin-top: 0.5rem;
        }

        .approval-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .approval-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 6px;
        }

        .approval-status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-left: 0.5rem;
        }

        .approval-status.pending {
          background: #fd7e14;
          color: white;
        }

        .approval-status.approved {
          background: #28a745;
          color: white;
        }

        .approval-status.denied {
          background: #dc3545;
          color: white;
        }

        .approval-comment, .denial-reason {
          margin: 0.5rem 0 0 0;
          font-size: 0.85rem;
          color: var(--subtxt);
          font-style: italic;
        }

        /* Form Styles */
        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #333;
        }

        .form-section:last-child {
          border-bottom: none;
        }

        .form-section h4 {
          color: var(--accent);
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: var(--text);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .form-group input, .form-group select, .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: var(--surface);
          color: var(--text);
          font-size: 0.9rem;
        }

        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--accent);
        }

        .form-group input[type="checkbox"] {
          width: auto;
          margin-right: 0.5rem;
        }

        .cost-preview {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(0, 123, 255, 0.1);
          border-radius: 6px;
          text-align: center;
          color: var(--text);
          font-size: 1.1rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #333;
        }

        @media (max-width: 768px) {
          .order-header {
            flex-direction: column;
            gap: 1rem;
          }

          .order-header-section {
            flex-direction: column;
            gap: 1rem;
          }

          .order-badges {
            align-items: flex-start;
            flex-direction: row;
          }

          .filters {
            flex-direction: column;
          }

          .filter-group {
            width: 100%;
          }

          .filter-select {
            width: 100%;
          }

          .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
          }

          .detail-grid, .form-grid {
            grid-template-columns: 1fr;
          }

          .approval-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}),a.jsxs("div",{className:"order-header",children:[a.jsx("h2",{className:"order-title",children:"Order Management"}),N&&a.jsx("button",{className:"btn-primary",onClick:()=>u(!0),children:"+ Submit New Order"})]}),a.jsxs("div",{className:"stats-summary",children:[a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:t.filter(w=>w.status==="pending_technical_approval").length}),a.jsx("div",{className:"stat-label",children:"Pending Tech Approval"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:t.filter(w=>w.status==="pending_project_approval").length}),a.jsx("div",{className:"stat-label",children:"Pending Project Approval"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:t.filter(w=>w.status==="purchased").length}),a.jsx("div",{className:"stat-label",children:"Purchased"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsxs("div",{className:"stat-number",children:["$",t.reduce((w,T)=>{var $;return w+((($=T.costBreakdown)==null?void 0:$.totalCost)||0)},0).toFixed(2)]}),a.jsx("div",{className:"stat-label",children:"Total Value"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:t.filter(w=>w.status==="delivered").length}),a.jsx("div",{className:"stat-label",children:"Delivered"})]})]}),a.jsxs("div",{className:"filters",children:[a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{className:"filter-label",children:"Status"}),a.jsxs("select",{className:"filter-select",value:s,onChange:w=>i(w.target.value),children:[a.jsx("option",{value:"all",children:"All Statuses"}),a.jsx("option",{value:"pending_technical_approval",children:"Pending Tech Approval"}),a.jsx("option",{value:"pending_project_approval",children:"Pending Project Approval"}),a.jsx("option",{value:"approved_for_purchase",children:"Approved for Purchase"}),a.jsx("option",{value:"purchased",children:"Purchased"}),a.jsx("option",{value:"delivered",children:"Delivered"}),a.jsx("option",{value:"denied",children:"Denied"})]})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{className:"filter-label",children:"Team"}),a.jsxs("select",{className:"filter-select",value:o,onChange:w=>l(w.target.value),children:[a.jsx("option",{value:"all",children:"All Teams"}),z.map(w=>a.jsx("option",{value:w,children:w},w))]})]})]}),E.length===0?a.jsxs("div",{className:"no-orders",children:[a.jsx("h3",{children:"No orders found"}),a.jsx("p",{children:"No orders match your current filters."})]}):a.jsx("div",{className:"orders-grid",children:E.map(w=>a.jsxs("div",{className:"order-card",onClick:()=>f(w),children:[a.jsxs("div",{className:"order-header-section",children:[a.jsxs("div",{className:"order-title-section",children:[a.jsx("h3",{className:"order-part-name",children:w.materialDetails.materialName}),a.jsxs("div",{className:"order-meta",children:[a.jsx("strong",{children:w.submissionDetails.subteam})," • Requested by ",w.submissionDetails.submitterName]}),a.jsxs("div",{className:"order-meta",children:["Submitted: ",new Date(w.submissionTimestamp).toLocaleDateString()]})]}),a.jsxs("div",{className:"order-badges",children:[a.jsx("span",{className:"status-badge",style:{backgroundColor:P(w.status)},children:A(w.status)}),a.jsxs("span",{className:"priority-badge",style:{backgroundColor:I(w.projectDetails.priority)},children:[w.projectDetails.priority," priority"]})]})]}),a.jsxs("div",{className:"order-details",children:[a.jsxs("div",{className:"detail-row",children:[a.jsx("span",{className:"detail-label",children:"Supplier:"}),a.jsx("span",{className:"detail-value",children:w.materialDetails.supplier})]}),a.jsxs("div",{className:"detail-row",children:[a.jsx("span",{className:"detail-label",children:"Quantity:"}),a.jsx("span",{className:"detail-value",children:w.costBreakdown.quantity})]}),a.jsxs("div",{className:"detail-row",children:[a.jsx("span",{className:"detail-label",children:"Unit Price:"}),a.jsxs("span",{className:"detail-value",children:["$",w.costBreakdown.unitPrice.toFixed(2)]})]}),a.jsxs("div",{className:"detail-row",children:[a.jsx("span",{className:"detail-label",children:"Total:"}),a.jsxs("span",{className:"detail-value",children:["$",w.costBreakdown.totalCost.toFixed(2)]})]}),w.deliveryInfo.expectedArrivalDate&&a.jsxs("div",{className:"detail-row",children:[a.jsx("span",{className:"detail-label",children:"Expected Delivery:"}),a.jsx("span",{className:"detail-value",children:new Date(w.deliveryInfo.expectedArrivalDate).toLocaleDateString()})]})]}),a.jsxs("div",{className:"order-notes",children:[a.jsx("strong",{children:"Purpose:"})," ",w.projectDetails.purpose.substring(0,150),w.projectDetails.purpose.length>150&&"..."]}),(p||v||S)&&a.jsxs("div",{className:"order-actions",onClick:T=>T.stopPropagation(),children:[v&&w.status==="pending_technical_approval"&&a.jsxs(a.Fragment,{children:[a.jsx("button",{className:"action-btn approve-btn",onClick:()=>b(w.id,{type:"technical_approval",approved:!0,approvedBy:"tech.director@solarpack.com",comments:"Approved by technical director"}),children:"✓ Tech Approve"}),a.jsx("button",{className:"action-btn reject-btn",onClick:()=>b(w.id,{type:"technical_approval",approved:!1,approvedBy:"tech.director@solarpack.com",denialReason:"Denied by technical director"}),children:"✗ Tech Deny"})]}),S&&w.status==="pending_project_approval"&&a.jsxs(a.Fragment,{children:[a.jsx("button",{className:"action-btn approve-btn",onClick:()=>b(w.id,{type:"project_approval",approved:!0,approvedBy:"project.director@solarpack.com",comments:"Purchase approved"}),children:"✓ Purchase Approve"}),a.jsx("button",{className:"action-btn reject-btn",onClick:()=>b(w.id,{type:"project_approval",approved:!1,approvedBy:"project.director@solarpack.com",denialReason:"Purchase denied"}),children:"✗ Purchase Deny"})]}),p&&w.status==="approved_for_purchase"&&a.jsx("button",{className:"action-btn mark-ordered-btn",onClick:()=>b(w.id,{type:"purchase",purchaseOrderNumber:`PO-${Date.now()}`,actualCost:w.costBreakdown.totalCost,purchasedBy:"purchasing@solarpack.com"}),children:"📦 Mark as Purchased"}),p&&w.status==="purchased"&&a.jsx("button",{className:"action-btn mark-delivered-btn",onClick:()=>b(w.id,{type:"delivery",confirmedBy:"warehouse@solarpack.com",notes:"Delivered to subteam"}),children:"✅ Mark as Delivered"})]})]},w.id))}),d&&a.jsx(H,{order:d,onClose:()=>f(null)}),c&&a.jsx(k,{})]}):a.jsx("div",{className:"no-permission",children:"You don't have permission to view orders. Contact a team leader for access."})},Lx=({onLogout:t})=>{const[e,r]=_.useState("overview"),[n,s]=_.useState(re.getLevel());_.useEffect(()=>(document.body.style.paddingTop="0",()=>{document.body.style.paddingTop="64px"}),[]),_.useEffect(()=>{const c=()=>re.extendSession();return window.addEventListener("click",c),window.addEventListener("keypress",c),()=>{window.removeEventListener("click",c),window.removeEventListener("keypress",c)}},[]);const o=[{id:"overview",label:"Overview",icon:xx,permission:"view_schedules"},{id:"team",label:"Team",icon:Dx,permission:"view_team"},{id:"schedules",label:"Schedules",icon:yx,permission:"view_schedules"},{id:"orders",label:"Orders",icon:Nx,permission:"submit_orders"},{id:"alumni",label:"Alumni",icon:jx,permission:"edit_announcements"},{id:"sponsors",label:"Sponsors",icon:gx,permission:"edit_announcements"}].filter(c=>re.hasPermission(c.permission)),l=()=>{switch(e){case"team":return a.jsx(lx,{});case"schedules":return a.jsx(cx,{});case"orders":return a.jsx($x,{});case"alumni":return a.jsx(Ax,{});case"sponsors":return a.jsx(Ix,{});default:return a.jsx(zx,{})}};return a.jsxs("div",{className:"admin-dashboard",children:[a.jsx("style",{children:`
        .admin-dashboard {
          min-height: 100vh;
          background: var(--bg);
          margin-top: px;
          padding-top: 0;
        }
        
        body:has(.admin-dashboard) {
          padding-top: 0;
        }

        .dashboard-header {
          background: var(--surface);
          border-bottom: 1px solid #333;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.8rem;
          color: var(--accent);
          margin: 0;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-level {
          color: var(--text);
          padding: 0.25rem 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: capitalize;
          border: 1px solid var(--subtxt);
          border-radius: 6px;
          background: transparent;
        }

        .logout-button {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .dashboard-nav {
          background: var(--surface);
          padding: 0 2rem;
          overflow-x: auto;
        }

        .nav-tabs {
          display: flex;
          gap: 0.5rem;
          min-width: max-content;
        }

        .nav-tab {
          background: transparent;
          border: none;
          padding: 1rem 1.5rem;
          color: var(--subtxt);
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .nav-tab:hover {
          color: var(--text);
          background: rgba(0, 123, 255, 0.1);
        }

        .nav-tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .dashboard-content {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: 1rem;
            flex-direction: column;
            gap: 1rem;
          }

          .dashboard-nav {
            padding: 0 1rem;
          }

          .dashboard-content {
            padding: 1rem;
          }
        }
      `}),a.jsxs("header",{className:"dashboard-header",children:[a.jsx("h1",{className:"dashboard-title",children:"Dashboard"}),a.jsxs("div",{className:"user-info",children:[a.jsx("span",{className:"user-level",children:n}),a.jsx("button",{className:"logout-button",onClick:t,children:"Logout"})]})]}),a.jsx("nav",{className:"dashboard-nav",children:a.jsx("div",{className:"nav-tabs",children:o.map(c=>{const u=c.icon;return a.jsxs("button",{className:`nav-tab ${e===c.id?"active":""}`,onClick:()=>r(c.id),children:[a.jsx(u,{size:18}),c.label]},c.id)})})}),a.jsx("main",{className:"dashboard-content",children:l()})]})},zx=()=>{const[t,e]=_.useState({teamMembers:0,activeSchedules:0,pendingOrders:0,totalAlumni:0});return _.useEffect(()=>{(async()=>{var n,s,i,o;try{const[l,c,u]=await Promise.all([fetch("/data/team.json"),fetch("/data/schedules.json"),fetch("/data/alumni.json")]),[d,f,h]=await Promise.all([l.json(),c.json(),u.ok?u.json():{alumniData:[]}]),g=((n=h.alumniData)==null?void 0:n.reduce((x,b)=>{var j;return x+(((j=b.leadership)==null?void 0:j.length)||0)},0))||0;e({teamMembers:((s=d.teamMembers)==null?void 0:s.length)||0,activeSchedules:((i=f.schedules)==null?void 0:i.filter(x=>x.status==="active"||x.status==="upcoming").length)||0,pendingOrders:((o=f.orders)==null?void 0:o.filter(x=>x.status==="pending_approval").length)||0,totalAlumni:g})}catch(l){console.error("Error loading stats:",l)}})()},[]),a.jsxs("div",{className:"overview",children:[a.jsx("style",{children:`
        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--subtxt);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .quick-actions {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .quick-actions h3 {
          color: var(--text);
          margin-bottom: 1rem;
        }

        .action-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .action-button {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.3s ease;
        }

        .action-button:hover {
          background: #0056b3;
        }
      `}),a.jsxs("div",{className:"overview-grid",children:[a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:t.teamMembers}),a.jsx("div",{className:"stat-label",children:"Team Members"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:t.activeSchedules}),a.jsx("div",{className:"stat-label",children:"Active Schedules"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:t.pendingOrders}),a.jsx("div",{className:"stat-label",children:"Pending Orders"})]}),a.jsxs("div",{className:"stat-card",children:[a.jsx("div",{className:"stat-number",children:t.totalAlumni}),a.jsx("div",{className:"stat-label",children:"Total Alumni"})]})]}),a.jsxs("div",{className:"quick-actions",children:[a.jsx("h3",{children:"Quick Actions"}),a.jsxs("div",{className:"action-buttons",children:[re.hasPermission("edit_team")&&a.jsx("button",{className:"action-button",children:"Add Team Member"}),re.hasPermission("edit_schedules")&&a.jsx("button",{className:"action-button",children:"Create Schedule"}),re.hasPermission("submit_orders")&&a.jsx("button",{className:"action-button",children:"Submit Order"}),re.hasPermission("edit_announcements")&&a.jsx("button",{className:"action-button",children:"Manage Alumni"}),re.hasPermission("edit_announcements")&&a.jsx("button",{className:"action-button",children:"Manage Sponsors"})]})]})]})},Bx=()=>{const[t,e]=_.useState(!1),[r,n]=_.useState(!0),s=Ql();_.useEffect(()=>{(()=>{const c=re.isAuthenticated();e(c),n(!1)})()},[]);const i=()=>{e(!0)},o=()=>{re.logout(),e(!1),s("/")};return r?a.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"#888"},children:"Loading..."}):a.jsx("div",{className:"admin-app",children:t?a.jsx(Lx,{onLogout:o}):a.jsx(ix,{onLogin:i})})};function Ux(){return a.jsx(ox,{children:a.jsxs(bu,{children:[a.jsx(Me,{path:"/admin",element:a.jsx(Bx,{})}),a.jsx(Me,{path:"/*",element:a.jsx(gy,{children:a.jsxs(bu,{children:[a.jsx(Me,{path:"/",element:a.jsx(vy,{})}),a.jsx(Me,{path:"/app",element:a.jsx(wy,{})}),a.jsx(Me,{path:"/alumni",element:a.jsx(Qw,{})}),a.jsx(Me,{path:"/contact",element:a.jsx(Yw,{})}),a.jsx(Me,{path:"/donate",element:a.jsx(Xw,{})}),a.jsx(Me,{path:"/privacy-policy",element:a.jsx(Zw,{})}),a.jsx(Me,{path:"/sponsors",element:a.jsx(ex,{})}),a.jsx(Me,{path:"/schedules",element:a.jsx(nx,{})}),a.jsx(Me,{path:"/team",element:a.jsx(tx,{})}),a.jsx(Me,{path:"*",element:a.jsx(sx,{})})]})})})]})})}Wa.createRoot(document.getElementById("root")).render(a.jsx(hd.StrictMode,{children:a.jsx(ly,{basename:"/",children:a.jsx(Ux,{})})}));
