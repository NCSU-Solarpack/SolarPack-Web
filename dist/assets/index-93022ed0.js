function ad(e,t){for(var n=0;n<t.length;n++){const s=t[n];if(typeof s!="string"&&!Array.isArray(s)){for(const a in s)if(a!=="default"&&!(a in e)){const i=Object.getOwnPropertyDescriptor(s,a);i&&Object.defineProperty(e,a,i.get?i:{enumerable:!0,get:()=>s[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function id(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var zl={exports:{}},Es={},Ll={exports:{}},F={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fr=Symbol.for("react.element"),od=Symbol.for("react.portal"),ld=Symbol.for("react.fragment"),cd=Symbol.for("react.strict_mode"),ud=Symbol.for("react.profiler"),dd=Symbol.for("react.provider"),md=Symbol.for("react.context"),pd=Symbol.for("react.forward_ref"),fd=Symbol.for("react.suspense"),hd=Symbol.for("react.memo"),gd=Symbol.for("react.lazy"),mo=Symbol.iterator;function vd(e){return e===null||typeof e!="object"?null:(e=mo&&e[mo]||e["@@iterator"],typeof e=="function"?e:null)}var Rl={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Il=Object.assign,Ml={};function Nn(e,t,n){this.props=e,this.context=t,this.refs=Ml,this.updater=n||Rl}Nn.prototype.isReactComponent={};Nn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Nn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ol(){}Ol.prototype=Nn.prototype;function fi(e,t,n){this.props=e,this.context=t,this.refs=Ml,this.updater=n||Rl}var hi=fi.prototype=new Ol;hi.constructor=fi;Il(hi,Nn.prototype);hi.isPureReactComponent=!0;var po=Array.isArray,Al=Object.prototype.hasOwnProperty,gi={current:null},Fl={key:!0,ref:!0,__self:!0,__source:!0};function Bl(e,t,n){var s,a={},i=null,o=null;if(t!=null)for(s in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)Al.call(t,s)&&!Fl.hasOwnProperty(s)&&(a[s]=t[s]);var l=arguments.length-2;if(l===1)a.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];a.children=c}if(e&&e.defaultProps)for(s in l=e.defaultProps,l)a[s]===void 0&&(a[s]=l[s]);return{$$typeof:fr,type:e,key:i,ref:o,props:a,_owner:gi.current}}function xd(e,t){return{$$typeof:fr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function vi(e){return typeof e=="object"&&e!==null&&e.$$typeof===fr}function yd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var fo=/\/+/g;function Vs(e,t){return typeof e=="object"&&e!==null&&e.key!=null?yd(""+e.key):t.toString(36)}function Br(e,t,n,s,a){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case fr:case od:o=!0}}if(o)return o=e,a=a(o),e=s===""?"."+Vs(o,0):s,po(a)?(n="",e!=null&&(n=e.replace(fo,"$&/")+"/"),Br(a,t,n,"",function(u){return u})):a!=null&&(vi(a)&&(a=xd(a,n+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(fo,"$&/")+"/")+e)),t.push(a)),1;if(o=0,s=s===""?".":s+":",po(e))for(var l=0;l<e.length;l++){i=e[l];var c=s+Vs(i,l);o+=Br(i,t,n,c,a)}else if(c=vd(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=s+Vs(i,l++),o+=Br(i,t,n,c,a);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Nr(e,t,n){if(e==null)return e;var s=[],a=0;return Br(e,s,"","",function(i){return t.call(n,i,a++)}),s}function jd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ve={current:null},$r={transition:null},wd={ReactCurrentDispatcher:ve,ReactCurrentBatchConfig:$r,ReactCurrentOwner:gi};function $l(){throw Error("act(...) is not supported in production builds of React.")}F.Children={map:Nr,forEach:function(e,t,n){Nr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Nr(e,function(){t++}),t},toArray:function(e){return Nr(e,function(t){return t})||[]},only:function(e){if(!vi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};F.Component=Nn;F.Fragment=ld;F.Profiler=ud;F.PureComponent=fi;F.StrictMode=cd;F.Suspense=fd;F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wd;F.act=$l;F.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=Il({},e.props),a=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=gi.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Al.call(t,c)&&!Fl.hasOwnProperty(c)&&(s[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];s.children=l}return{$$typeof:fr,type:e.type,key:a,ref:i,props:s,_owner:o}};F.createContext=function(e){return e={$$typeof:md,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:dd,_context:e},e.Consumer=e};F.createElement=Bl;F.createFactory=function(e){var t=Bl.bind(null,e);return t.type=e,t};F.createRef=function(){return{current:null}};F.forwardRef=function(e){return{$$typeof:pd,render:e}};F.isValidElement=vi;F.lazy=function(e){return{$$typeof:gd,_payload:{_status:-1,_result:e},_init:jd}};F.memo=function(e,t){return{$$typeof:hd,type:e,compare:t===void 0?null:t}};F.startTransition=function(e){var t=$r.transition;$r.transition={};try{e()}finally{$r.transition=t}};F.unstable_act=$l;F.useCallback=function(e,t){return ve.current.useCallback(e,t)};F.useContext=function(e){return ve.current.useContext(e)};F.useDebugValue=function(){};F.useDeferredValue=function(e){return ve.current.useDeferredValue(e)};F.useEffect=function(e,t){return ve.current.useEffect(e,t)};F.useId=function(){return ve.current.useId()};F.useImperativeHandle=function(e,t,n){return ve.current.useImperativeHandle(e,t,n)};F.useInsertionEffect=function(e,t){return ve.current.useInsertionEffect(e,t)};F.useLayoutEffect=function(e,t){return ve.current.useLayoutEffect(e,t)};F.useMemo=function(e,t){return ve.current.useMemo(e,t)};F.useReducer=function(e,t,n){return ve.current.useReducer(e,t,n)};F.useRef=function(e){return ve.current.useRef(e)};F.useState=function(e){return ve.current.useState(e)};F.useSyncExternalStore=function(e,t,n){return ve.current.useSyncExternalStore(e,t,n)};F.useTransition=function(){return ve.current.useTransition()};F.version="18.3.1";Ll.exports=F;var j=Ll.exports;const Ul=id(j),kd=ad({__proto__:null,default:Ul},[j]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nd=j,bd=Symbol.for("react.element"),Sd=Symbol.for("react.fragment"),Cd=Object.prototype.hasOwnProperty,Ed=Nd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Dd={key:!0,ref:!0,__self:!0,__source:!0};function Hl(e,t,n){var s,a={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(s in t)Cd.call(t,s)&&!Dd.hasOwnProperty(s)&&(a[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)a[s]===void 0&&(a[s]=t[s]);return{$$typeof:bd,type:e,key:i,ref:o,props:a,_owner:Ed.current}}Es.Fragment=Sd;Es.jsx=Hl;Es.jsxs=Hl;zl.exports=Es;var r=zl.exports,xa={},Wl={exports:{}},Te={},Vl={exports:{}},Ql={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,I){var A=z.length;z.push(I);e:for(;0<A;){var q=A-1>>>1,se=z[q];if(0<a(se,I))z[q]=I,z[A]=se,A=q;else break e}}function n(z){return z.length===0?null:z[0]}function s(z){if(z.length===0)return null;var I=z[0],A=z.pop();if(A!==I){z[0]=A;e:for(var q=0,se=z.length,wr=se>>>1;q<wr;){var Tt=2*(q+1)-1,Ws=z[Tt],_t=Tt+1,kr=z[_t];if(0>a(Ws,A))_t<se&&0>a(kr,Ws)?(z[q]=kr,z[_t]=A,q=_t):(z[q]=Ws,z[Tt]=A,q=Tt);else if(_t<se&&0>a(kr,A))z[q]=kr,z[_t]=A,q=_t;else break e}}return I}function a(z,I){var A=z.sortIndex-I.sortIndex;return A!==0?A:z.id-I.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var c=[],u=[],g=1,v=null,m=3,S=!1,C=!1,k=!1,D=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(z){for(var I=n(u);I!==null;){if(I.callback===null)s(u);else if(I.startTime<=z)s(u),I.sortIndex=I.expirationTime,t(c,I);else break;I=n(u)}}function w(z){if(k=!1,h(z),!C)if(n(c)!==null)C=!0,R(d);else{var I=n(u);I!==null&&fe(w,I.startTime-z)}}function d(z,I){C=!1,k&&(k=!1,x(P),P=-1),S=!0;var A=m;try{for(h(I),v=n(c);v!==null&&(!(v.expirationTime>I)||z&&!O());){var q=v.callback;if(typeof q=="function"){v.callback=null,m=v.priorityLevel;var se=q(v.expirationTime<=I);I=e.unstable_now(),typeof se=="function"?v.callback=se:v===n(c)&&s(c),h(I)}else s(c);v=n(c)}if(v!==null)var wr=!0;else{var Tt=n(u);Tt!==null&&fe(w,Tt.startTime-I),wr=!1}return wr}finally{v=null,m=A,S=!1}}var N=!1,b=null,P=-1,M=5,_=-1;function O(){return!(e.unstable_now()-_<M)}function Q(){if(b!==null){var z=e.unstable_now();_=z;var I=!0;try{I=b(!0,z)}finally{I?y():(N=!1,b=null)}}else N=!1}var y;if(typeof p=="function")y=function(){p(Q)};else if(typeof MessageChannel<"u"){var f=new MessageChannel,E=f.port2;f.port1.onmessage=Q,y=function(){E.postMessage(null)}}else y=function(){D(Q,0)};function R(z){b=z,N||(N=!0,y())}function fe(z,I){P=D(function(){z(e.unstable_now())},I)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){C||S||(C=!0,R(d))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(z){switch(m){case 1:case 2:case 3:var I=3;break;default:I=m}var A=m;m=I;try{return z()}finally{m=A}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,I){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var A=m;m=z;try{return I()}finally{m=A}},e.unstable_scheduleCallback=function(z,I,A){var q=e.unstable_now();switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?q+A:q):A=q,z){case 1:var se=-1;break;case 2:se=250;break;case 5:se=1073741823;break;case 4:se=1e4;break;default:se=5e3}return se=A+se,z={id:g++,callback:I,priorityLevel:z,startTime:A,expirationTime:se,sortIndex:-1},A>q?(z.sortIndex=A,t(u,z),n(c)===null&&z===n(u)&&(k?(x(P),P=-1):k=!0,fe(w,A-q))):(z.sortIndex=se,t(c,z),C||S||(C=!0,R(d))),z},e.unstable_shouldYield=O,e.unstable_wrapCallback=function(z){var I=m;return function(){var A=m;m=I;try{return z.apply(this,arguments)}finally{m=A}}}})(Ql);Vl.exports=Ql;var Pd=Vl.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Td=j,Pe=Pd;function T(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Gl=new Set,Kn={};function Wt(e,t){gn(e,t),gn(e+"Capture",t)}function gn(e,t){for(Kn[e]=t,e=0;e<t.length;e++)Gl.add(t[e])}var rt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ya=Object.prototype.hasOwnProperty,_d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ho={},go={};function zd(e){return ya.call(go,e)?!0:ya.call(ho,e)?!1:_d.test(e)?go[e]=!0:(ho[e]=!0,!1)}function Ld(e,t,n,s){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Rd(e,t,n,s){if(t===null||typeof t>"u"||Ld(e,t,n,s))return!0;if(s)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function xe(e,t,n,s,a,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var ce={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ce[e]=new xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ce[t]=new xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ce[e]=new xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ce[e]=new xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ce[e]=new xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ce[e]=new xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ce[e]=new xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ce[e]=new xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ce[e]=new xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var xi=/[\-:]([a-z])/g;function yi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(xi,yi);ce[t]=new xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(xi,yi);ce[t]=new xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(xi,yi);ce[t]=new xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ce[e]=new xe(e,1,!1,e.toLowerCase(),null,!1,!1)});ce.xlinkHref=new xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ce[e]=new xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ji(e,t,n,s){var a=ce.hasOwnProperty(t)?ce[t]:null;(a!==null?a.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Rd(t,n,a,s)&&(n=null),s||a===null?zd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,s=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,s?e.setAttributeNS(s,t,n):e.setAttribute(t,n))))}var ot=Td.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,br=Symbol.for("react.element"),Kt=Symbol.for("react.portal"),Xt=Symbol.for("react.fragment"),wi=Symbol.for("react.strict_mode"),ja=Symbol.for("react.profiler"),Yl=Symbol.for("react.provider"),Kl=Symbol.for("react.context"),ki=Symbol.for("react.forward_ref"),wa=Symbol.for("react.suspense"),ka=Symbol.for("react.suspense_list"),Ni=Symbol.for("react.memo"),ct=Symbol.for("react.lazy"),Xl=Symbol.for("react.offscreen"),vo=Symbol.iterator;function En(e){return e===null||typeof e!="object"?null:(e=vo&&e[vo]||e["@@iterator"],typeof e=="function"?e:null)}var X=Object.assign,Qs;function In(e){if(Qs===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Qs=t&&t[1]||""}return`
`+Qs+e}var Gs=!1;function Ys(e,t){if(!e||Gs)return"";Gs=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var s=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){s=u}e.call(t.prototype)}else{try{throw Error()}catch(u){s=u}e()}}catch(u){if(u&&s&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),i=s.stack.split(`
`),o=a.length-1,l=i.length-1;1<=o&&0<=l&&a[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(a[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||a[o]!==i[l]){var c=`
`+a[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=l);break}}}finally{Gs=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?In(e):""}function Id(e){switch(e.tag){case 5:return In(e.type);case 16:return In("Lazy");case 13:return In("Suspense");case 19:return In("SuspenseList");case 0:case 2:case 15:return e=Ys(e.type,!1),e;case 11:return e=Ys(e.type.render,!1),e;case 1:return e=Ys(e.type,!0),e;default:return""}}function Na(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Xt:return"Fragment";case Kt:return"Portal";case ja:return"Profiler";case wi:return"StrictMode";case wa:return"Suspense";case ka:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Kl:return(e.displayName||"Context")+".Consumer";case Yl:return(e._context.displayName||"Context")+".Provider";case ki:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ni:return t=e.displayName||null,t!==null?t:Na(e.type)||"Memo";case ct:t=e._payload,e=e._init;try{return Na(e(t))}catch{}}return null}function Md(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Na(t);case 8:return t===wi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function St(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Jl(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Od(e){var t=Jl(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){s=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return s},setValue:function(o){s=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Sr(e){e._valueTracker||(e._valueTracker=Od(e))}function ql(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),s="";return e&&(s=Jl(e)?e.checked?"true":"false":e.value),e=s,e!==n?(t.setValue(e),!0):!1}function Zr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ba(e,t){var n=t.checked;return X({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function xo(e,t){var n=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;n=St(t.value!=null?t.value:n),e._wrapperState={initialChecked:s,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Zl(e,t){t=t.checked,t!=null&&ji(e,"checked",t,!1)}function Sa(e,t){Zl(e,t);var n=St(t.value),s=t.type;if(n!=null)s==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ca(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ca(e,t.type,St(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function yo(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ca(e,t,n){(t!=="number"||Zr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Mn=Array.isArray;function ln(e,t,n,s){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&s&&(e[n].defaultSelected=!0)}else{for(n=""+St(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,s&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Ea(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(T(91));return X({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function jo(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(T(92));if(Mn(n)){if(1<n.length)throw Error(T(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:St(n)}}function ec(e,t){var n=St(t.value),s=St(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),s!=null&&(e.defaultValue=""+s)}function wo(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function tc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Da(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?tc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Cr,nc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,s,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,s,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Cr=Cr||document.createElement("div"),Cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Xn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Fn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ad=["Webkit","ms","Moz","O"];Object.keys(Fn).forEach(function(e){Ad.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Fn[t]=Fn[e]})});function rc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Fn.hasOwnProperty(e)&&Fn[e]?(""+t).trim():t+"px"}function sc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var s=n.indexOf("--")===0,a=rc(n,t[n],s);n==="float"&&(n="cssFloat"),s?e.setProperty(n,a):e[n]=a}}var Fd=X({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Pa(e,t){if(t){if(Fd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(T(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(T(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(T(61))}if(t.style!=null&&typeof t.style!="object")throw Error(T(62))}}function Ta(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _a=null;function bi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var za=null,cn=null,un=null;function ko(e){if(e=vr(e)){if(typeof za!="function")throw Error(T(280));var t=e.stateNode;t&&(t=zs(t),za(e.stateNode,e.type,t))}}function ac(e){cn?un?un.push(e):un=[e]:cn=e}function ic(){if(cn){var e=cn,t=un;if(un=cn=null,ko(e),t)for(e=0;e<t.length;e++)ko(t[e])}}function oc(e,t){return e(t)}function lc(){}var Ks=!1;function cc(e,t,n){if(Ks)return e(t,n);Ks=!0;try{return oc(e,t,n)}finally{Ks=!1,(cn!==null||un!==null)&&(lc(),ic())}}function Jn(e,t){var n=e.stateNode;if(n===null)return null;var s=zs(n);if(s===null)return null;n=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(T(231,t,typeof n));return n}var La=!1;if(rt)try{var Dn={};Object.defineProperty(Dn,"passive",{get:function(){La=!0}}),window.addEventListener("test",Dn,Dn),window.removeEventListener("test",Dn,Dn)}catch{La=!1}function Bd(e,t,n,s,a,i,o,l,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(g){this.onError(g)}}var Bn=!1,es=null,ts=!1,Ra=null,$d={onError:function(e){Bn=!0,es=e}};function Ud(e,t,n,s,a,i,o,l,c){Bn=!1,es=null,Bd.apply($d,arguments)}function Hd(e,t,n,s,a,i,o,l,c){if(Ud.apply(this,arguments),Bn){if(Bn){var u=es;Bn=!1,es=null}else throw Error(T(198));ts||(ts=!0,Ra=u)}}function Vt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function uc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function No(e){if(Vt(e)!==e)throw Error(T(188))}function Wd(e){var t=e.alternate;if(!t){if(t=Vt(e),t===null)throw Error(T(188));return t!==e?null:e}for(var n=e,s=t;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(s=a.return,s!==null){n=s;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return No(a),e;if(i===s)return No(a),t;i=i.sibling}throw Error(T(188))}if(n.return!==s.return)n=a,s=i;else{for(var o=!1,l=a.child;l;){if(l===n){o=!0,n=a,s=i;break}if(l===s){o=!0,s=a,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,s=a;break}if(l===s){o=!0,s=i,n=a;break}l=l.sibling}if(!o)throw Error(T(189))}}if(n.alternate!==s)throw Error(T(190))}if(n.tag!==3)throw Error(T(188));return n.stateNode.current===n?e:t}function dc(e){return e=Wd(e),e!==null?mc(e):null}function mc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=mc(e);if(t!==null)return t;e=e.sibling}return null}var pc=Pe.unstable_scheduleCallback,bo=Pe.unstable_cancelCallback,Vd=Pe.unstable_shouldYield,Qd=Pe.unstable_requestPaint,Z=Pe.unstable_now,Gd=Pe.unstable_getCurrentPriorityLevel,Si=Pe.unstable_ImmediatePriority,fc=Pe.unstable_UserBlockingPriority,ns=Pe.unstable_NormalPriority,Yd=Pe.unstable_LowPriority,hc=Pe.unstable_IdlePriority,Ds=null,Ke=null;function Kd(e){if(Ke&&typeof Ke.onCommitFiberRoot=="function")try{Ke.onCommitFiberRoot(Ds,e,void 0,(e.current.flags&128)===128)}catch{}}var He=Math.clz32?Math.clz32:qd,Xd=Math.log,Jd=Math.LN2;function qd(e){return e>>>=0,e===0?32:31-(Xd(e)/Jd|0)|0}var Er=64,Dr=4194304;function On(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function rs(e,t){var n=e.pendingLanes;if(n===0)return 0;var s=0,a=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~a;l!==0?s=On(l):(i&=o,i!==0&&(s=On(i)))}else o=n&~a,o!==0?s=On(o):i!==0&&(s=On(i));if(s===0)return 0;if(t!==0&&t!==s&&!(t&a)&&(a=s&-s,i=t&-t,a>=i||a===16&&(i&4194240)!==0))return t;if(s&4&&(s|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)n=31-He(t),a=1<<n,s|=e[n],t&=~a;return s}function Zd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function em(e,t){for(var n=e.suspendedLanes,s=e.pingedLanes,a=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-He(i),l=1<<o,c=a[o];c===-1?(!(l&n)||l&s)&&(a[o]=Zd(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function Ia(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function gc(){var e=Er;return Er<<=1,!(Er&4194240)&&(Er=64),e}function Xs(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function hr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-He(t),e[t]=n}function tm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-He(n),i=1<<a;t[a]=0,s[a]=-1,e[a]=-1,n&=~i}}function Ci(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var s=31-He(n),a=1<<s;a&t|e[s]&t&&(e[s]|=t),n&=~a}}var $=0;function vc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var xc,Ei,yc,jc,wc,Ma=!1,Pr=[],gt=null,vt=null,xt=null,qn=new Map,Zn=new Map,dt=[],nm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function So(e,t){switch(e){case"focusin":case"focusout":gt=null;break;case"dragenter":case"dragleave":vt=null;break;case"mouseover":case"mouseout":xt=null;break;case"pointerover":case"pointerout":qn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zn.delete(t.pointerId)}}function Pn(e,t,n,s,a,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:s,nativeEvent:i,targetContainers:[a]},t!==null&&(t=vr(t),t!==null&&Ei(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function rm(e,t,n,s,a){switch(t){case"focusin":return gt=Pn(gt,e,t,n,s,a),!0;case"dragenter":return vt=Pn(vt,e,t,n,s,a),!0;case"mouseover":return xt=Pn(xt,e,t,n,s,a),!0;case"pointerover":var i=a.pointerId;return qn.set(i,Pn(qn.get(i)||null,e,t,n,s,a)),!0;case"gotpointercapture":return i=a.pointerId,Zn.set(i,Pn(Zn.get(i)||null,e,t,n,s,a)),!0}return!1}function kc(e){var t=Rt(e.target);if(t!==null){var n=Vt(t);if(n!==null){if(t=n.tag,t===13){if(t=uc(n),t!==null){e.blockedOn=t,wc(e.priority,function(){yc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ur(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Oa(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var s=new n.constructor(n.type,n);_a=s,n.target.dispatchEvent(s),_a=null}else return t=vr(n),t!==null&&Ei(t),e.blockedOn=n,!1;t.shift()}return!0}function Co(e,t,n){Ur(e)&&n.delete(t)}function sm(){Ma=!1,gt!==null&&Ur(gt)&&(gt=null),vt!==null&&Ur(vt)&&(vt=null),xt!==null&&Ur(xt)&&(xt=null),qn.forEach(Co),Zn.forEach(Co)}function Tn(e,t){e.blockedOn===t&&(e.blockedOn=null,Ma||(Ma=!0,Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority,sm)))}function er(e){function t(a){return Tn(a,e)}if(0<Pr.length){Tn(Pr[0],e);for(var n=1;n<Pr.length;n++){var s=Pr[n];s.blockedOn===e&&(s.blockedOn=null)}}for(gt!==null&&Tn(gt,e),vt!==null&&Tn(vt,e),xt!==null&&Tn(xt,e),qn.forEach(t),Zn.forEach(t),n=0;n<dt.length;n++)s=dt[n],s.blockedOn===e&&(s.blockedOn=null);for(;0<dt.length&&(n=dt[0],n.blockedOn===null);)kc(n),n.blockedOn===null&&dt.shift()}var dn=ot.ReactCurrentBatchConfig,ss=!0;function am(e,t,n,s){var a=$,i=dn.transition;dn.transition=null;try{$=1,Di(e,t,n,s)}finally{$=a,dn.transition=i}}function im(e,t,n,s){var a=$,i=dn.transition;dn.transition=null;try{$=4,Di(e,t,n,s)}finally{$=a,dn.transition=i}}function Di(e,t,n,s){if(ss){var a=Oa(e,t,n,s);if(a===null)ia(e,t,s,as,n),So(e,s);else if(rm(a,e,t,n,s))s.stopPropagation();else if(So(e,s),t&4&&-1<nm.indexOf(e)){for(;a!==null;){var i=vr(a);if(i!==null&&xc(i),i=Oa(e,t,n,s),i===null&&ia(e,t,s,as,n),i===a)break;a=i}a!==null&&s.stopPropagation()}else ia(e,t,s,null,n)}}var as=null;function Oa(e,t,n,s){if(as=null,e=bi(s),e=Rt(e),e!==null)if(t=Vt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=uc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return as=e,null}function Nc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Gd()){case Si:return 1;case fc:return 4;case ns:case Yd:return 16;case hc:return 536870912;default:return 16}default:return 16}}var pt=null,Pi=null,Hr=null;function bc(){if(Hr)return Hr;var e,t=Pi,n=t.length,s,a="value"in pt?pt.value:pt.textContent,i=a.length;for(e=0;e<n&&t[e]===a[e];e++);var o=n-e;for(s=1;s<=o&&t[n-s]===a[i-s];s++);return Hr=a.slice(e,1<s?1-s:void 0)}function Wr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Tr(){return!0}function Eo(){return!1}function _e(e){function t(n,s,a,i,o){this._reactName=n,this._targetInst=a,this.type=s,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Tr:Eo,this.isPropagationStopped=Eo,this}return X(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Tr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Tr)},persist:function(){},isPersistent:Tr}),t}var bn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ti=_e(bn),gr=X({},bn,{view:0,detail:0}),om=_e(gr),Js,qs,_n,Ps=X({},gr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_i,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_n&&(_n&&e.type==="mousemove"?(Js=e.screenX-_n.screenX,qs=e.screenY-_n.screenY):qs=Js=0,_n=e),Js)},movementY:function(e){return"movementY"in e?e.movementY:qs}}),Do=_e(Ps),lm=X({},Ps,{dataTransfer:0}),cm=_e(lm),um=X({},gr,{relatedTarget:0}),Zs=_e(um),dm=X({},bn,{animationName:0,elapsedTime:0,pseudoElement:0}),mm=_e(dm),pm=X({},bn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),fm=_e(pm),hm=X({},bn,{data:0}),Po=_e(hm),gm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ym(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=xm[e])?!!t[e]:!1}function _i(){return ym}var jm=X({},gr,{key:function(e){if(e.key){var t=gm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?vm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_i,charCode:function(e){return e.type==="keypress"?Wr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),wm=_e(jm),km=X({},Ps,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),To=_e(km),Nm=X({},gr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_i}),bm=_e(Nm),Sm=X({},bn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cm=_e(Sm),Em=X({},Ps,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dm=_e(Em),Pm=[9,13,27,32],zi=rt&&"CompositionEvent"in window,$n=null;rt&&"documentMode"in document&&($n=document.documentMode);var Tm=rt&&"TextEvent"in window&&!$n,Sc=rt&&(!zi||$n&&8<$n&&11>=$n),_o=String.fromCharCode(32),zo=!1;function Cc(e,t){switch(e){case"keyup":return Pm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ec(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Jt=!1;function _m(e,t){switch(e){case"compositionend":return Ec(t);case"keypress":return t.which!==32?null:(zo=!0,_o);case"textInput":return e=t.data,e===_o&&zo?null:e;default:return null}}function zm(e,t){if(Jt)return e==="compositionend"||!zi&&Cc(e,t)?(e=bc(),Hr=Pi=pt=null,Jt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Sc&&t.locale!=="ko"?null:t.data;default:return null}}var Lm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Lo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Lm[e.type]:t==="textarea"}function Dc(e,t,n,s){ac(s),t=is(t,"onChange"),0<t.length&&(n=new Ti("onChange","change",null,n,s),e.push({event:n,listeners:t}))}var Un=null,tr=null;function Rm(e){Fc(e,0)}function Ts(e){var t=en(e);if(ql(t))return e}function Im(e,t){if(e==="change")return t}var Pc=!1;if(rt){var ea;if(rt){var ta="oninput"in document;if(!ta){var Ro=document.createElement("div");Ro.setAttribute("oninput","return;"),ta=typeof Ro.oninput=="function"}ea=ta}else ea=!1;Pc=ea&&(!document.documentMode||9<document.documentMode)}function Io(){Un&&(Un.detachEvent("onpropertychange",Tc),tr=Un=null)}function Tc(e){if(e.propertyName==="value"&&Ts(tr)){var t=[];Dc(t,tr,e,bi(e)),cc(Rm,t)}}function Mm(e,t,n){e==="focusin"?(Io(),Un=t,tr=n,Un.attachEvent("onpropertychange",Tc)):e==="focusout"&&Io()}function Om(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ts(tr)}function Am(e,t){if(e==="click")return Ts(t)}function Fm(e,t){if(e==="input"||e==="change")return Ts(t)}function Bm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ve=typeof Object.is=="function"?Object.is:Bm;function nr(e,t){if(Ve(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),s=Object.keys(t);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var a=n[s];if(!ya.call(t,a)||!Ve(e[a],t[a]))return!1}return!0}function Mo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Oo(e,t){var n=Mo(e);e=0;for(var s;n;){if(n.nodeType===3){if(s=e+n.textContent.length,e<=t&&s>=t)return{node:n,offset:t-e};e=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Mo(n)}}function _c(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?_c(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function zc(){for(var e=window,t=Zr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Zr(e.document)}return t}function Li(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function $m(e){var t=zc(),n=e.focusedElem,s=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&_c(n.ownerDocument.documentElement,n)){if(s!==null&&Li(n)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,i=Math.min(s.start,a);s=s.end===void 0?i:Math.min(s.end,a),!e.extend&&i>s&&(a=s,s=i,i=a),a=Oo(n,i);var o=Oo(n,s);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),i>s?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Um=rt&&"documentMode"in document&&11>=document.documentMode,qt=null,Aa=null,Hn=null,Fa=!1;function Ao(e,t,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Fa||qt==null||qt!==Zr(s)||(s=qt,"selectionStart"in s&&Li(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Hn&&nr(Hn,s)||(Hn=s,s=is(Aa,"onSelect"),0<s.length&&(t=new Ti("onSelect","select",null,t,n),e.push({event:t,listeners:s}),t.target=qt)))}function _r(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Zt={animationend:_r("Animation","AnimationEnd"),animationiteration:_r("Animation","AnimationIteration"),animationstart:_r("Animation","AnimationStart"),transitionend:_r("Transition","TransitionEnd")},na={},Lc={};rt&&(Lc=document.createElement("div").style,"AnimationEvent"in window||(delete Zt.animationend.animation,delete Zt.animationiteration.animation,delete Zt.animationstart.animation),"TransitionEvent"in window||delete Zt.transitionend.transition);function _s(e){if(na[e])return na[e];if(!Zt[e])return e;var t=Zt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Lc)return na[e]=t[n];return e}var Rc=_s("animationend"),Ic=_s("animationiteration"),Mc=_s("animationstart"),Oc=_s("transitionend"),Ac=new Map,Fo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Et(e,t){Ac.set(e,t),Wt(t,[e])}for(var ra=0;ra<Fo.length;ra++){var sa=Fo[ra],Hm=sa.toLowerCase(),Wm=sa[0].toUpperCase()+sa.slice(1);Et(Hm,"on"+Wm)}Et(Rc,"onAnimationEnd");Et(Ic,"onAnimationIteration");Et(Mc,"onAnimationStart");Et("dblclick","onDoubleClick");Et("focusin","onFocus");Et("focusout","onBlur");Et(Oc,"onTransitionEnd");gn("onMouseEnter",["mouseout","mouseover"]);gn("onMouseLeave",["mouseout","mouseover"]);gn("onPointerEnter",["pointerout","pointerover"]);gn("onPointerLeave",["pointerout","pointerover"]);Wt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var An="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vm=new Set("cancel close invalid load scroll toggle".split(" ").concat(An));function Bo(e,t,n){var s=e.type||"unknown-event";e.currentTarget=n,Hd(s,t,void 0,e),e.currentTarget=null}function Fc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var s=e[n],a=s.event;s=s.listeners;e:{var i=void 0;if(t)for(var o=s.length-1;0<=o;o--){var l=s[o],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==i&&a.isPropagationStopped())break e;Bo(a,l,u),i=c}else for(o=0;o<s.length;o++){if(l=s[o],c=l.instance,u=l.currentTarget,l=l.listener,c!==i&&a.isPropagationStopped())break e;Bo(a,l,u),i=c}}}if(ts)throw e=Ra,ts=!1,Ra=null,e}function H(e,t){var n=t[Wa];n===void 0&&(n=t[Wa]=new Set);var s=e+"__bubble";n.has(s)||(Bc(t,e,2,!1),n.add(s))}function aa(e,t,n){var s=0;t&&(s|=4),Bc(n,e,s,t)}var zr="_reactListening"+Math.random().toString(36).slice(2);function rr(e){if(!e[zr]){e[zr]=!0,Gl.forEach(function(n){n!=="selectionchange"&&(Vm.has(n)||aa(n,!1,e),aa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[zr]||(t[zr]=!0,aa("selectionchange",!1,t))}}function Bc(e,t,n,s){switch(Nc(t)){case 1:var a=am;break;case 4:a=im;break;default:a=Di}n=a.bind(null,t,n,e),a=void 0,!La||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),s?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function ia(e,t,n,s,a){var i=s;if(!(t&1)&&!(t&2)&&s!==null)e:for(;;){if(s===null)return;var o=s.tag;if(o===3||o===4){var l=s.stateNode.containerInfo;if(l===a||l.nodeType===8&&l.parentNode===a)break;if(o===4)for(o=s.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===a||c.nodeType===8&&c.parentNode===a))return;o=o.return}for(;l!==null;){if(o=Rt(l),o===null)return;if(c=o.tag,c===5||c===6){s=i=o;continue e}l=l.parentNode}}s=s.return}cc(function(){var u=i,g=bi(n),v=[];e:{var m=Ac.get(e);if(m!==void 0){var S=Ti,C=e;switch(e){case"keypress":if(Wr(n)===0)break e;case"keydown":case"keyup":S=wm;break;case"focusin":C="focus",S=Zs;break;case"focusout":C="blur",S=Zs;break;case"beforeblur":case"afterblur":S=Zs;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=Do;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=cm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=bm;break;case Rc:case Ic:case Mc:S=mm;break;case Oc:S=Cm;break;case"scroll":S=om;break;case"wheel":S=Dm;break;case"copy":case"cut":case"paste":S=fm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=To}var k=(t&4)!==0,D=!k&&e==="scroll",x=k?m!==null?m+"Capture":null:m;k=[];for(var p=u,h;p!==null;){h=p;var w=h.stateNode;if(h.tag===5&&w!==null&&(h=w,x!==null&&(w=Jn(p,x),w!=null&&k.push(sr(p,w,h)))),D)break;p=p.return}0<k.length&&(m=new S(m,C,null,n,g),v.push({event:m,listeners:k}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",S=e==="mouseout"||e==="pointerout",m&&n!==_a&&(C=n.relatedTarget||n.fromElement)&&(Rt(C)||C[st]))break e;if((S||m)&&(m=g.window===g?g:(m=g.ownerDocument)?m.defaultView||m.parentWindow:window,S?(C=n.relatedTarget||n.toElement,S=u,C=C?Rt(C):null,C!==null&&(D=Vt(C),C!==D||C.tag!==5&&C.tag!==6)&&(C=null)):(S=null,C=u),S!==C)){if(k=Do,w="onMouseLeave",x="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(k=To,w="onPointerLeave",x="onPointerEnter",p="pointer"),D=S==null?m:en(S),h=C==null?m:en(C),m=new k(w,p+"leave",S,n,g),m.target=D,m.relatedTarget=h,w=null,Rt(g)===u&&(k=new k(x,p+"enter",C,n,g),k.target=h,k.relatedTarget=D,w=k),D=w,S&&C)t:{for(k=S,x=C,p=0,h=k;h;h=Yt(h))p++;for(h=0,w=x;w;w=Yt(w))h++;for(;0<p-h;)k=Yt(k),p--;for(;0<h-p;)x=Yt(x),h--;for(;p--;){if(k===x||x!==null&&k===x.alternate)break t;k=Yt(k),x=Yt(x)}k=null}else k=null;S!==null&&$o(v,m,S,k,!1),C!==null&&D!==null&&$o(v,D,C,k,!0)}}e:{if(m=u?en(u):window,S=m.nodeName&&m.nodeName.toLowerCase(),S==="select"||S==="input"&&m.type==="file")var d=Im;else if(Lo(m))if(Pc)d=Fm;else{d=Om;var N=Mm}else(S=m.nodeName)&&S.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(d=Am);if(d&&(d=d(e,u))){Dc(v,d,n,g);break e}N&&N(e,m,u),e==="focusout"&&(N=m._wrapperState)&&N.controlled&&m.type==="number"&&Ca(m,"number",m.value)}switch(N=u?en(u):window,e){case"focusin":(Lo(N)||N.contentEditable==="true")&&(qt=N,Aa=u,Hn=null);break;case"focusout":Hn=Aa=qt=null;break;case"mousedown":Fa=!0;break;case"contextmenu":case"mouseup":case"dragend":Fa=!1,Ao(v,n,g);break;case"selectionchange":if(Um)break;case"keydown":case"keyup":Ao(v,n,g)}var b;if(zi)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Jt?Cc(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Sc&&n.locale!=="ko"&&(Jt||P!=="onCompositionStart"?P==="onCompositionEnd"&&Jt&&(b=bc()):(pt=g,Pi="value"in pt?pt.value:pt.textContent,Jt=!0)),N=is(u,P),0<N.length&&(P=new Po(P,e,null,n,g),v.push({event:P,listeners:N}),b?P.data=b:(b=Ec(n),b!==null&&(P.data=b)))),(b=Tm?_m(e,n):zm(e,n))&&(u=is(u,"onBeforeInput"),0<u.length&&(g=new Po("onBeforeInput","beforeinput",null,n,g),v.push({event:g,listeners:u}),g.data=b))}Fc(v,t)})}function sr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function is(e,t){for(var n=t+"Capture",s=[];e!==null;){var a=e,i=a.stateNode;a.tag===5&&i!==null&&(a=i,i=Jn(e,n),i!=null&&s.unshift(sr(e,i,a)),i=Jn(e,t),i!=null&&s.push(sr(e,i,a))),e=e.return}return s}function Yt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function $o(e,t,n,s,a){for(var i=t._reactName,o=[];n!==null&&n!==s;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===s)break;l.tag===5&&u!==null&&(l=u,a?(c=Jn(n,i),c!=null&&o.unshift(sr(n,c,l))):a||(c=Jn(n,i),c!=null&&o.push(sr(n,c,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Qm=/\r\n?/g,Gm=/\u0000|\uFFFD/g;function Uo(e){return(typeof e=="string"?e:""+e).replace(Qm,`
`).replace(Gm,"")}function Lr(e,t,n){if(t=Uo(t),Uo(e)!==t&&n)throw Error(T(425))}function os(){}var Ba=null,$a=null;function Ua(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ha=typeof setTimeout=="function"?setTimeout:void 0,Ym=typeof clearTimeout=="function"?clearTimeout:void 0,Ho=typeof Promise=="function"?Promise:void 0,Km=typeof queueMicrotask=="function"?queueMicrotask:typeof Ho<"u"?function(e){return Ho.resolve(null).then(e).catch(Xm)}:Ha;function Xm(e){setTimeout(function(){throw e})}function oa(e,t){var n=t,s=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(s===0){e.removeChild(a),er(t);return}s--}else n!=="$"&&n!=="$?"&&n!=="$!"||s++;n=a}while(n);er(t)}function yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Wo(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Sn=Math.random().toString(36).slice(2),Ye="__reactFiber$"+Sn,ar="__reactProps$"+Sn,st="__reactContainer$"+Sn,Wa="__reactEvents$"+Sn,Jm="__reactListeners$"+Sn,qm="__reactHandles$"+Sn;function Rt(e){var t=e[Ye];if(t)return t;for(var n=e.parentNode;n;){if(t=n[st]||n[Ye]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Wo(e);e!==null;){if(n=e[Ye])return n;e=Wo(e)}return t}e=n,n=e.parentNode}return null}function vr(e){return e=e[Ye]||e[st],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function en(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(T(33))}function zs(e){return e[ar]||null}var Va=[],tn=-1;function Dt(e){return{current:e}}function V(e){0>tn||(e.current=Va[tn],Va[tn]=null,tn--)}function U(e,t){tn++,Va[tn]=e.current,e.current=t}var Ct={},pe=Dt(Ct),we=Dt(!1),Ft=Ct;function vn(e,t){var n=e.type.contextTypes;if(!n)return Ct;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var a={},i;for(i in n)a[i]=t[i];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ke(e){return e=e.childContextTypes,e!=null}function ls(){V(we),V(pe)}function Vo(e,t,n){if(pe.current!==Ct)throw Error(T(168));U(pe,t),U(we,n)}function $c(e,t,n){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return n;s=s.getChildContext();for(var a in s)if(!(a in t))throw Error(T(108,Md(e)||"Unknown",a));return X({},n,s)}function cs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ct,Ft=pe.current,U(pe,e),U(we,we.current),!0}function Qo(e,t,n){var s=e.stateNode;if(!s)throw Error(T(169));n?(e=$c(e,t,Ft),s.__reactInternalMemoizedMergedChildContext=e,V(we),V(pe),U(pe,e)):V(we),U(we,n)}var Ze=null,Ls=!1,la=!1;function Uc(e){Ze===null?Ze=[e]:Ze.push(e)}function Zm(e){Ls=!0,Uc(e)}function Pt(){if(!la&&Ze!==null){la=!0;var e=0,t=$;try{var n=Ze;for($=1;e<n.length;e++){var s=n[e];do s=s(!0);while(s!==null)}Ze=null,Ls=!1}catch(a){throw Ze!==null&&(Ze=Ze.slice(e+1)),pc(Si,Pt),a}finally{$=t,la=!1}}return null}var nn=[],rn=0,us=null,ds=0,ze=[],Le=0,Bt=null,et=1,tt="";function zt(e,t){nn[rn++]=ds,nn[rn++]=us,us=e,ds=t}function Hc(e,t,n){ze[Le++]=et,ze[Le++]=tt,ze[Le++]=Bt,Bt=e;var s=et;e=tt;var a=32-He(s)-1;s&=~(1<<a),n+=1;var i=32-He(t)+a;if(30<i){var o=a-a%5;i=(s&(1<<o)-1).toString(32),s>>=o,a-=o,et=1<<32-He(t)+a|n<<a|s,tt=i+e}else et=1<<i|n<<a|s,tt=e}function Ri(e){e.return!==null&&(zt(e,1),Hc(e,1,0))}function Ii(e){for(;e===us;)us=nn[--rn],nn[rn]=null,ds=nn[--rn],nn[rn]=null;for(;e===Bt;)Bt=ze[--Le],ze[Le]=null,tt=ze[--Le],ze[Le]=null,et=ze[--Le],ze[Le]=null}var De=null,Ee=null,G=!1,Ue=null;function Wc(e,t){var n=Re(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Go(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,De=e,Ee=yt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,De=e,Ee=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Bt!==null?{id:et,overflow:tt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Re(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,De=e,Ee=null,!0):!1;default:return!1}}function Qa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ga(e){if(G){var t=Ee;if(t){var n=t;if(!Go(e,t)){if(Qa(e))throw Error(T(418));t=yt(n.nextSibling);var s=De;t&&Go(e,t)?Wc(s,n):(e.flags=e.flags&-4097|2,G=!1,De=e)}}else{if(Qa(e))throw Error(T(418));e.flags=e.flags&-4097|2,G=!1,De=e}}}function Yo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;De=e}function Rr(e){if(e!==De)return!1;if(!G)return Yo(e),G=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ua(e.type,e.memoizedProps)),t&&(t=Ee)){if(Qa(e))throw Vc(),Error(T(418));for(;t;)Wc(e,t),t=yt(t.nextSibling)}if(Yo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(T(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ee=yt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ee=null}}else Ee=De?yt(e.stateNode.nextSibling):null;return!0}function Vc(){for(var e=Ee;e;)e=yt(e.nextSibling)}function xn(){Ee=De=null,G=!1}function Mi(e){Ue===null?Ue=[e]:Ue.push(e)}var ep=ot.ReactCurrentBatchConfig;function zn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(T(309));var s=n.stateNode}if(!s)throw Error(T(147,e));var a=s,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var l=a.refs;o===null?delete l[i]:l[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(T(284));if(!n._owner)throw Error(T(290,e))}return e}function Ir(e,t){throw e=Object.prototype.toString.call(t),Error(T(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ko(e){var t=e._init;return t(e._payload)}function Qc(e){function t(x,p){if(e){var h=x.deletions;h===null?(x.deletions=[p],x.flags|=16):h.push(p)}}function n(x,p){if(!e)return null;for(;p!==null;)t(x,p),p=p.sibling;return null}function s(x,p){for(x=new Map;p!==null;)p.key!==null?x.set(p.key,p):x.set(p.index,p),p=p.sibling;return x}function a(x,p){return x=Nt(x,p),x.index=0,x.sibling=null,x}function i(x,p,h){return x.index=h,e?(h=x.alternate,h!==null?(h=h.index,h<p?(x.flags|=2,p):h):(x.flags|=2,p)):(x.flags|=1048576,p)}function o(x){return e&&x.alternate===null&&(x.flags|=2),x}function l(x,p,h,w){return p===null||p.tag!==6?(p=ha(h,x.mode,w),p.return=x,p):(p=a(p,h),p.return=x,p)}function c(x,p,h,w){var d=h.type;return d===Xt?g(x,p,h.props.children,w,h.key):p!==null&&(p.elementType===d||typeof d=="object"&&d!==null&&d.$$typeof===ct&&Ko(d)===p.type)?(w=a(p,h.props),w.ref=zn(x,p,h),w.return=x,w):(w=Jr(h.type,h.key,h.props,null,x.mode,w),w.ref=zn(x,p,h),w.return=x,w)}function u(x,p,h,w){return p===null||p.tag!==4||p.stateNode.containerInfo!==h.containerInfo||p.stateNode.implementation!==h.implementation?(p=ga(h,x.mode,w),p.return=x,p):(p=a(p,h.children||[]),p.return=x,p)}function g(x,p,h,w,d){return p===null||p.tag!==7?(p=At(h,x.mode,w,d),p.return=x,p):(p=a(p,h),p.return=x,p)}function v(x,p,h){if(typeof p=="string"&&p!==""||typeof p=="number")return p=ha(""+p,x.mode,h),p.return=x,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case br:return h=Jr(p.type,p.key,p.props,null,x.mode,h),h.ref=zn(x,null,p),h.return=x,h;case Kt:return p=ga(p,x.mode,h),p.return=x,p;case ct:var w=p._init;return v(x,w(p._payload),h)}if(Mn(p)||En(p))return p=At(p,x.mode,h,null),p.return=x,p;Ir(x,p)}return null}function m(x,p,h,w){var d=p!==null?p.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return d!==null?null:l(x,p,""+h,w);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case br:return h.key===d?c(x,p,h,w):null;case Kt:return h.key===d?u(x,p,h,w):null;case ct:return d=h._init,m(x,p,d(h._payload),w)}if(Mn(h)||En(h))return d!==null?null:g(x,p,h,w,null);Ir(x,h)}return null}function S(x,p,h,w,d){if(typeof w=="string"&&w!==""||typeof w=="number")return x=x.get(h)||null,l(p,x,""+w,d);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case br:return x=x.get(w.key===null?h:w.key)||null,c(p,x,w,d);case Kt:return x=x.get(w.key===null?h:w.key)||null,u(p,x,w,d);case ct:var N=w._init;return S(x,p,h,N(w._payload),d)}if(Mn(w)||En(w))return x=x.get(h)||null,g(p,x,w,d,null);Ir(p,w)}return null}function C(x,p,h,w){for(var d=null,N=null,b=p,P=p=0,M=null;b!==null&&P<h.length;P++){b.index>P?(M=b,b=null):M=b.sibling;var _=m(x,b,h[P],w);if(_===null){b===null&&(b=M);break}e&&b&&_.alternate===null&&t(x,b),p=i(_,p,P),N===null?d=_:N.sibling=_,N=_,b=M}if(P===h.length)return n(x,b),G&&zt(x,P),d;if(b===null){for(;P<h.length;P++)b=v(x,h[P],w),b!==null&&(p=i(b,p,P),N===null?d=b:N.sibling=b,N=b);return G&&zt(x,P),d}for(b=s(x,b);P<h.length;P++)M=S(b,x,P,h[P],w),M!==null&&(e&&M.alternate!==null&&b.delete(M.key===null?P:M.key),p=i(M,p,P),N===null?d=M:N.sibling=M,N=M);return e&&b.forEach(function(O){return t(x,O)}),G&&zt(x,P),d}function k(x,p,h,w){var d=En(h);if(typeof d!="function")throw Error(T(150));if(h=d.call(h),h==null)throw Error(T(151));for(var N=d=null,b=p,P=p=0,M=null,_=h.next();b!==null&&!_.done;P++,_=h.next()){b.index>P?(M=b,b=null):M=b.sibling;var O=m(x,b,_.value,w);if(O===null){b===null&&(b=M);break}e&&b&&O.alternate===null&&t(x,b),p=i(O,p,P),N===null?d=O:N.sibling=O,N=O,b=M}if(_.done)return n(x,b),G&&zt(x,P),d;if(b===null){for(;!_.done;P++,_=h.next())_=v(x,_.value,w),_!==null&&(p=i(_,p,P),N===null?d=_:N.sibling=_,N=_);return G&&zt(x,P),d}for(b=s(x,b);!_.done;P++,_=h.next())_=S(b,x,P,_.value,w),_!==null&&(e&&_.alternate!==null&&b.delete(_.key===null?P:_.key),p=i(_,p,P),N===null?d=_:N.sibling=_,N=_);return e&&b.forEach(function(Q){return t(x,Q)}),G&&zt(x,P),d}function D(x,p,h,w){if(typeof h=="object"&&h!==null&&h.type===Xt&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case br:e:{for(var d=h.key,N=p;N!==null;){if(N.key===d){if(d=h.type,d===Xt){if(N.tag===7){n(x,N.sibling),p=a(N,h.props.children),p.return=x,x=p;break e}}else if(N.elementType===d||typeof d=="object"&&d!==null&&d.$$typeof===ct&&Ko(d)===N.type){n(x,N.sibling),p=a(N,h.props),p.ref=zn(x,N,h),p.return=x,x=p;break e}n(x,N);break}else t(x,N);N=N.sibling}h.type===Xt?(p=At(h.props.children,x.mode,w,h.key),p.return=x,x=p):(w=Jr(h.type,h.key,h.props,null,x.mode,w),w.ref=zn(x,p,h),w.return=x,x=w)}return o(x);case Kt:e:{for(N=h.key;p!==null;){if(p.key===N)if(p.tag===4&&p.stateNode.containerInfo===h.containerInfo&&p.stateNode.implementation===h.implementation){n(x,p.sibling),p=a(p,h.children||[]),p.return=x,x=p;break e}else{n(x,p);break}else t(x,p);p=p.sibling}p=ga(h,x.mode,w),p.return=x,x=p}return o(x);case ct:return N=h._init,D(x,p,N(h._payload),w)}if(Mn(h))return C(x,p,h,w);if(En(h))return k(x,p,h,w);Ir(x,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,p!==null&&p.tag===6?(n(x,p.sibling),p=a(p,h),p.return=x,x=p):(n(x,p),p=ha(h,x.mode,w),p.return=x,x=p),o(x)):n(x,p)}return D}var yn=Qc(!0),Gc=Qc(!1),ms=Dt(null),ps=null,sn=null,Oi=null;function Ai(){Oi=sn=ps=null}function Fi(e){var t=ms.current;V(ms),e._currentValue=t}function Ya(e,t,n){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===n)break;e=e.return}}function mn(e,t){ps=e,Oi=sn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(je=!0),e.firstContext=null)}function Me(e){var t=e._currentValue;if(Oi!==e)if(e={context:e,memoizedValue:t,next:null},sn===null){if(ps===null)throw Error(T(308));sn=e,ps.dependencies={lanes:0,firstContext:e}}else sn=sn.next=e;return t}var It=null;function Bi(e){It===null?It=[e]:It.push(e)}function Yc(e,t,n,s){var a=t.interleaved;return a===null?(n.next=n,Bi(t)):(n.next=a.next,a.next=n),t.interleaved=n,at(e,s)}function at(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ut=!1;function $i(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Kc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function nt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function jt(e,t,n){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,B&2){var a=s.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),s.pending=t,at(e,n)}return a=s.interleaved,a===null?(t.next=t,Bi(s)):(t.next=a.next,a.next=t),s.interleaved=t,at(e,n)}function Vr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,Ci(e,n)}}function Xo(e,t){var n=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?a=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?a=i=t:i=i.next=t}else a=i=t;n={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:s.shared,effects:s.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function fs(e,t,n,s){var a=e.updateQueue;ut=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var c=l,u=c.next;c.next=null,o===null?i=u:o.next=u,o=c;var g=e.alternate;g!==null&&(g=g.updateQueue,l=g.lastBaseUpdate,l!==o&&(l===null?g.firstBaseUpdate=u:l.next=u,g.lastBaseUpdate=c))}if(i!==null){var v=a.baseState;o=0,g=u=c=null,l=i;do{var m=l.lane,S=l.eventTime;if((s&m)===m){g!==null&&(g=g.next={eventTime:S,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var C=e,k=l;switch(m=t,S=n,k.tag){case 1:if(C=k.payload,typeof C=="function"){v=C.call(S,v,m);break e}v=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=k.payload,m=typeof C=="function"?C.call(S,v,m):C,m==null)break e;v=X({},v,m);break e;case 2:ut=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=a.effects,m===null?a.effects=[l]:m.push(l))}else S={eventTime:S,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},g===null?(u=g=S,c=v):g=g.next=S,o|=m;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;m=l,l=m.next,m.next=null,a.lastBaseUpdate=m,a.shared.pending=null}}while(1);if(g===null&&(c=v),a.baseState=c,a.firstBaseUpdate=u,a.lastBaseUpdate=g,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else i===null&&(a.shared.lanes=0);Ut|=o,e.lanes=o,e.memoizedState=v}}function Jo(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],a=s.callback;if(a!==null){if(s.callback=null,s=n,typeof a!="function")throw Error(T(191,a));a.call(s)}}}var xr={},Xe=Dt(xr),ir=Dt(xr),or=Dt(xr);function Mt(e){if(e===xr)throw Error(T(174));return e}function Ui(e,t){switch(U(or,t),U(ir,e),U(Xe,xr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Da(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Da(t,e)}V(Xe),U(Xe,t)}function jn(){V(Xe),V(ir),V(or)}function Xc(e){Mt(or.current);var t=Mt(Xe.current),n=Da(t,e.type);t!==n&&(U(ir,e),U(Xe,n))}function Hi(e){ir.current===e&&(V(Xe),V(ir))}var Y=Dt(0);function hs(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ca=[];function Wi(){for(var e=0;e<ca.length;e++)ca[e]._workInProgressVersionPrimary=null;ca.length=0}var Qr=ot.ReactCurrentDispatcher,ua=ot.ReactCurrentBatchConfig,$t=0,K=null,ne=null,ae=null,gs=!1,Wn=!1,lr=0,tp=0;function ue(){throw Error(T(321))}function Vi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ve(e[n],t[n]))return!1;return!0}function Qi(e,t,n,s,a,i){if($t=i,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Qr.current=e===null||e.memoizedState===null?ap:ip,e=n(s,a),Wn){i=0;do{if(Wn=!1,lr=0,25<=i)throw Error(T(301));i+=1,ae=ne=null,t.updateQueue=null,Qr.current=op,e=n(s,a)}while(Wn)}if(Qr.current=vs,t=ne!==null&&ne.next!==null,$t=0,ae=ne=K=null,gs=!1,t)throw Error(T(300));return e}function Gi(){var e=lr!==0;return lr=0,e}function Ge(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ae===null?K.memoizedState=ae=e:ae=ae.next=e,ae}function Oe(){if(ne===null){var e=K.alternate;e=e!==null?e.memoizedState:null}else e=ne.next;var t=ae===null?K.memoizedState:ae.next;if(t!==null)ae=t,ne=e;else{if(e===null)throw Error(T(310));ne=e,e={memoizedState:ne.memoizedState,baseState:ne.baseState,baseQueue:ne.baseQueue,queue:ne.queue,next:null},ae===null?K.memoizedState=ae=e:ae=ae.next=e}return ae}function cr(e,t){return typeof t=="function"?t(e):t}function da(e){var t=Oe(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var s=ne,a=s.baseQueue,i=n.pending;if(i!==null){if(a!==null){var o=a.next;a.next=i.next,i.next=o}s.baseQueue=a=i,n.pending=null}if(a!==null){i=a.next,s=s.baseState;var l=o=null,c=null,u=i;do{var g=u.lane;if(($t&g)===g)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),s=u.hasEagerState?u.eagerState:e(s,u.action);else{var v={lane:g,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=v,o=s):c=c.next=v,K.lanes|=g,Ut|=g}u=u.next}while(u!==null&&u!==i);c===null?o=s:c.next=l,Ve(s,t.memoizedState)||(je=!0),t.memoizedState=s,t.baseState=o,t.baseQueue=c,n.lastRenderedState=s}if(e=n.interleaved,e!==null){a=e;do i=a.lane,K.lanes|=i,Ut|=i,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ma(e){var t=Oe(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var s=n.dispatch,a=n.pending,i=t.memoizedState;if(a!==null){n.pending=null;var o=a=a.next;do i=e(i,o.action),o=o.next;while(o!==a);Ve(i,t.memoizedState)||(je=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,s]}function Jc(){}function qc(e,t){var n=K,s=Oe(),a=t(),i=!Ve(s.memoizedState,a);if(i&&(s.memoizedState=a,je=!0),s=s.queue,Yi(tu.bind(null,n,s,e),[e]),s.getSnapshot!==t||i||ae!==null&&ae.memoizedState.tag&1){if(n.flags|=2048,ur(9,eu.bind(null,n,s,a,t),void 0,null),ie===null)throw Error(T(349));$t&30||Zc(n,t,a)}return a}function Zc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function eu(e,t,n,s){t.value=n,t.getSnapshot=s,nu(t)&&ru(e)}function tu(e,t,n){return n(function(){nu(t)&&ru(e)})}function nu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ve(e,n)}catch{return!0}}function ru(e){var t=at(e,1);t!==null&&We(t,e,1,-1)}function qo(e){var t=Ge();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:cr,lastRenderedState:e},t.queue=e,e=e.dispatch=sp.bind(null,K,e),[t.memoizedState,e]}function ur(e,t,n,s){return e={tag:e,create:t,destroy:n,deps:s,next:null},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(s=n.next,n.next=e,e.next=s,t.lastEffect=e)),e}function su(){return Oe().memoizedState}function Gr(e,t,n,s){var a=Ge();K.flags|=e,a.memoizedState=ur(1|t,n,void 0,s===void 0?null:s)}function Rs(e,t,n,s){var a=Oe();s=s===void 0?null:s;var i=void 0;if(ne!==null){var o=ne.memoizedState;if(i=o.destroy,s!==null&&Vi(s,o.deps)){a.memoizedState=ur(t,n,i,s);return}}K.flags|=e,a.memoizedState=ur(1|t,n,i,s)}function Zo(e,t){return Gr(8390656,8,e,t)}function Yi(e,t){return Rs(2048,8,e,t)}function au(e,t){return Rs(4,2,e,t)}function iu(e,t){return Rs(4,4,e,t)}function ou(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function lu(e,t,n){return n=n!=null?n.concat([e]):null,Rs(4,4,ou.bind(null,t,e),n)}function Ki(){}function cu(e,t){var n=Oe();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&Vi(t,s[1])?s[0]:(n.memoizedState=[e,t],e)}function uu(e,t){var n=Oe();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&Vi(t,s[1])?s[0]:(e=e(),n.memoizedState=[e,t],e)}function du(e,t,n){return $t&21?(Ve(n,t)||(n=gc(),K.lanes|=n,Ut|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,je=!0),e.memoizedState=n)}function np(e,t){var n=$;$=n!==0&&4>n?n:4,e(!0);var s=ua.transition;ua.transition={};try{e(!1),t()}finally{$=n,ua.transition=s}}function mu(){return Oe().memoizedState}function rp(e,t,n){var s=kt(e);if(n={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null},pu(e))fu(t,n);else if(n=Yc(e,t,n,s),n!==null){var a=ge();We(n,e,s,a),hu(n,t,s)}}function sp(e,t,n){var s=kt(e),a={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null};if(pu(e))fu(t,a);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,l=i(o,n);if(a.hasEagerState=!0,a.eagerState=l,Ve(l,o)){var c=t.interleaved;c===null?(a.next=a,Bi(t)):(a.next=c.next,c.next=a),t.interleaved=a;return}}catch{}finally{}n=Yc(e,t,a,s),n!==null&&(a=ge(),We(n,e,s,a),hu(n,t,s))}}function pu(e){var t=e.alternate;return e===K||t!==null&&t===K}function fu(e,t){Wn=gs=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function hu(e,t,n){if(n&4194240){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,Ci(e,n)}}var vs={readContext:Me,useCallback:ue,useContext:ue,useEffect:ue,useImperativeHandle:ue,useInsertionEffect:ue,useLayoutEffect:ue,useMemo:ue,useReducer:ue,useRef:ue,useState:ue,useDebugValue:ue,useDeferredValue:ue,useTransition:ue,useMutableSource:ue,useSyncExternalStore:ue,useId:ue,unstable_isNewReconciler:!1},ap={readContext:Me,useCallback:function(e,t){return Ge().memoizedState=[e,t===void 0?null:t],e},useContext:Me,useEffect:Zo,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Gr(4194308,4,ou.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Gr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Gr(4,2,e,t)},useMemo:function(e,t){var n=Ge();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var s=Ge();return t=n!==void 0?n(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=rp.bind(null,K,e),[s.memoizedState,e]},useRef:function(e){var t=Ge();return e={current:e},t.memoizedState=e},useState:qo,useDebugValue:Ki,useDeferredValue:function(e){return Ge().memoizedState=e},useTransition:function(){var e=qo(!1),t=e[0];return e=np.bind(null,e[1]),Ge().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var s=K,a=Ge();if(G){if(n===void 0)throw Error(T(407));n=n()}else{if(n=t(),ie===null)throw Error(T(349));$t&30||Zc(s,t,n)}a.memoizedState=n;var i={value:n,getSnapshot:t};return a.queue=i,Zo(tu.bind(null,s,i,e),[e]),s.flags|=2048,ur(9,eu.bind(null,s,i,n,t),void 0,null),n},useId:function(){var e=Ge(),t=ie.identifierPrefix;if(G){var n=tt,s=et;n=(s&~(1<<32-He(s)-1)).toString(32)+n,t=":"+t+"R"+n,n=lr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=tp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},ip={readContext:Me,useCallback:cu,useContext:Me,useEffect:Yi,useImperativeHandle:lu,useInsertionEffect:au,useLayoutEffect:iu,useMemo:uu,useReducer:da,useRef:su,useState:function(){return da(cr)},useDebugValue:Ki,useDeferredValue:function(e){var t=Oe();return du(t,ne.memoizedState,e)},useTransition:function(){var e=da(cr)[0],t=Oe().memoizedState;return[e,t]},useMutableSource:Jc,useSyncExternalStore:qc,useId:mu,unstable_isNewReconciler:!1},op={readContext:Me,useCallback:cu,useContext:Me,useEffect:Yi,useImperativeHandle:lu,useInsertionEffect:au,useLayoutEffect:iu,useMemo:uu,useReducer:ma,useRef:su,useState:function(){return ma(cr)},useDebugValue:Ki,useDeferredValue:function(e){var t=Oe();return ne===null?t.memoizedState=e:du(t,ne.memoizedState,e)},useTransition:function(){var e=ma(cr)[0],t=Oe().memoizedState;return[e,t]},useMutableSource:Jc,useSyncExternalStore:qc,useId:mu,unstable_isNewReconciler:!1};function Be(e,t){if(e&&e.defaultProps){t=X({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ka(e,t,n,s){t=e.memoizedState,n=n(s,t),n=n==null?t:X({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Is={isMounted:function(e){return(e=e._reactInternals)?Vt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var s=ge(),a=kt(e),i=nt(s,a);i.payload=t,n!=null&&(i.callback=n),t=jt(e,i,a),t!==null&&(We(t,e,a,s),Vr(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var s=ge(),a=kt(e),i=nt(s,a);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=jt(e,i,a),t!==null&&(We(t,e,a,s),Vr(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ge(),s=kt(e),a=nt(n,s);a.tag=2,t!=null&&(a.callback=t),t=jt(e,a,s),t!==null&&(We(t,e,s,n),Vr(t,e,s))}};function el(e,t,n,s,a,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,i,o):t.prototype&&t.prototype.isPureReactComponent?!nr(n,s)||!nr(a,i):!0}function gu(e,t,n){var s=!1,a=Ct,i=t.contextType;return typeof i=="object"&&i!==null?i=Me(i):(a=ke(t)?Ft:pe.current,s=t.contextTypes,i=(s=s!=null)?vn(e,a):Ct),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Is,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=i),t}function tl(e,t,n,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,s),t.state!==e&&Is.enqueueReplaceState(t,t.state,null)}function Xa(e,t,n,s){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},$i(e);var i=t.contextType;typeof i=="object"&&i!==null?a.context=Me(i):(i=ke(t)?Ft:pe.current,a.context=vn(e,i)),a.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Ka(e,t,i,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&Is.enqueueReplaceState(a,a.state,null),fs(e,n,a,s),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function wn(e,t){try{var n="",s=t;do n+=Id(s),s=s.return;while(s);var a=n}catch(i){a=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:a,digest:null}}function pa(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ja(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var lp=typeof WeakMap=="function"?WeakMap:Map;function vu(e,t,n){n=nt(-1,n),n.tag=3,n.payload={element:null};var s=t.value;return n.callback=function(){ys||(ys=!0,oi=s),Ja(e,t)},n}function xu(e,t,n){n=nt(-1,n),n.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var a=t.value;n.payload=function(){return s(a)},n.callback=function(){Ja(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ja(e,t),typeof s!="function"&&(wt===null?wt=new Set([this]):wt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function nl(e,t,n){var s=e.pingCache;if(s===null){s=e.pingCache=new lp;var a=new Set;s.set(t,a)}else a=s.get(t),a===void 0&&(a=new Set,s.set(t,a));a.has(n)||(a.add(n),e=kp.bind(null,e,t,n),t.then(e,e))}function rl(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function sl(e,t,n,s,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=nt(-1,1),t.tag=2,jt(n,t,1))),n.lanes|=1),e)}var cp=ot.ReactCurrentOwner,je=!1;function he(e,t,n,s){t.child=e===null?Gc(t,null,n,s):yn(t,e.child,n,s)}function al(e,t,n,s,a){n=n.render;var i=t.ref;return mn(t,a),s=Qi(e,t,n,s,i,a),n=Gi(),e!==null&&!je?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,it(e,t,a)):(G&&n&&Ri(t),t.flags|=1,he(e,t,s,a),t.child)}function il(e,t,n,s,a){if(e===null){var i=n.type;return typeof i=="function"&&!ro(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,yu(e,t,i,s,a)):(e=Jr(n.type,null,s,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&a)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:nr,n(o,s)&&e.ref===t.ref)return it(e,t,a)}return t.flags|=1,e=Nt(i,s),e.ref=t.ref,e.return=t,t.child=e}function yu(e,t,n,s,a){if(e!==null){var i=e.memoizedProps;if(nr(i,s)&&e.ref===t.ref)if(je=!1,t.pendingProps=s=i,(e.lanes&a)!==0)e.flags&131072&&(je=!0);else return t.lanes=e.lanes,it(e,t,a)}return qa(e,t,n,s,a)}function ju(e,t,n){var s=t.pendingProps,a=s.children,i=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},U(on,Se),Se|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,U(on,Se),Se|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=i!==null?i.baseLanes:n,U(on,Se),Se|=s}else i!==null?(s=i.baseLanes|n,t.memoizedState=null):s=n,U(on,Se),Se|=s;return he(e,t,a,n),t.child}function wu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function qa(e,t,n,s,a){var i=ke(n)?Ft:pe.current;return i=vn(t,i),mn(t,a),n=Qi(e,t,n,s,i,a),s=Gi(),e!==null&&!je?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,it(e,t,a)):(G&&s&&Ri(t),t.flags|=1,he(e,t,n,a),t.child)}function ol(e,t,n,s,a){if(ke(n)){var i=!0;cs(t)}else i=!1;if(mn(t,a),t.stateNode===null)Yr(e,t),gu(t,n,s),Xa(t,n,s,a),s=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var c=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Me(u):(u=ke(n)?Ft:pe.current,u=vn(t,u));var g=n.getDerivedStateFromProps,v=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function";v||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==s||c!==u)&&tl(t,o,s,u),ut=!1;var m=t.memoizedState;o.state=m,fs(t,s,o,a),c=t.memoizedState,l!==s||m!==c||we.current||ut?(typeof g=="function"&&(Ka(t,n,g,s),c=t.memoizedState),(l=ut||el(t,n,l,s,m,c,u))?(v||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=c),o.props=s,o.state=c,o.context=u,s=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{o=t.stateNode,Kc(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:Be(t.type,l),o.props=u,v=t.pendingProps,m=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Me(c):(c=ke(n)?Ft:pe.current,c=vn(t,c));var S=n.getDerivedStateFromProps;(g=typeof S=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==v||m!==c)&&tl(t,o,s,c),ut=!1,m=t.memoizedState,o.state=m,fs(t,s,o,a);var C=t.memoizedState;l!==v||m!==C||we.current||ut?(typeof S=="function"&&(Ka(t,n,S,s),C=t.memoizedState),(u=ut||el(t,n,u,s,m,C,c)||!1)?(g||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(s,C,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(s,C,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=C),o.props=s,o.state=C,o.context=c,s=u):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),s=!1)}return Za(e,t,n,s,i,a)}function Za(e,t,n,s,a,i){wu(e,t);var o=(t.flags&128)!==0;if(!s&&!o)return a&&Qo(t,n,!1),it(e,t,i);s=t.stateNode,cp.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&o?(t.child=yn(t,e.child,null,i),t.child=yn(t,null,l,i)):he(e,t,l,i),t.memoizedState=s.state,a&&Qo(t,n,!0),t.child}function ku(e){var t=e.stateNode;t.pendingContext?Vo(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Vo(e,t.context,!1),Ui(e,t.containerInfo)}function ll(e,t,n,s,a){return xn(),Mi(a),t.flags|=256,he(e,t,n,s),t.child}var ei={dehydrated:null,treeContext:null,retryLane:0};function ti(e){return{baseLanes:e,cachePool:null,transitions:null}}function Nu(e,t,n){var s=t.pendingProps,a=Y.current,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(a&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),U(Y,a&1),e===null)return Ga(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=s.children,e=s.fallback,i?(s=t.mode,i=t.child,o={mode:"hidden",children:o},!(s&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=As(o,s,0,null),e=At(e,s,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=ti(n),t.memoizedState=ei,e):Xi(t,o));if(a=e.memoizedState,a!==null&&(l=a.dehydrated,l!==null))return up(e,t,o,s,l,a,n);if(i){i=s.fallback,o=t.mode,a=e.child,l=a.sibling;var c={mode:"hidden",children:s.children};return!(o&1)&&t.child!==a?(s=t.child,s.childLanes=0,s.pendingProps=c,t.deletions=null):(s=Nt(a,c),s.subtreeFlags=a.subtreeFlags&14680064),l!==null?i=Nt(l,i):(i=At(i,o,n,null),i.flags|=2),i.return=t,s.return=t,s.sibling=i,t.child=s,s=i,i=t.child,o=e.child.memoizedState,o=o===null?ti(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=ei,s}return i=e.child,e=i.sibling,s=Nt(i,{mode:"visible",children:s.children}),!(t.mode&1)&&(s.lanes=n),s.return=t,s.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=s,t.memoizedState=null,s}function Xi(e,t){return t=As({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Mr(e,t,n,s){return s!==null&&Mi(s),yn(t,e.child,null,n),e=Xi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function up(e,t,n,s,a,i,o){if(n)return t.flags&256?(t.flags&=-257,s=pa(Error(T(422))),Mr(e,t,o,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=s.fallback,a=t.mode,s=As({mode:"visible",children:s.children},a,0,null),i=At(i,a,o,null),i.flags|=2,s.return=t,i.return=t,s.sibling=i,t.child=s,t.mode&1&&yn(t,e.child,null,o),t.child.memoizedState=ti(o),t.memoizedState=ei,i);if(!(t.mode&1))return Mr(e,t,o,null);if(a.data==="$!"){if(s=a.nextSibling&&a.nextSibling.dataset,s)var l=s.dgst;return s=l,i=Error(T(419)),s=pa(i,s,void 0),Mr(e,t,o,s)}if(l=(o&e.childLanes)!==0,je||l){if(s=ie,s!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(s.suspendedLanes|o)?0:a,a!==0&&a!==i.retryLane&&(i.retryLane=a,at(e,a),We(s,e,a,-1))}return no(),s=pa(Error(T(421))),Mr(e,t,o,s)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Np.bind(null,e),a._reactRetry=t,null):(e=i.treeContext,Ee=yt(a.nextSibling),De=t,G=!0,Ue=null,e!==null&&(ze[Le++]=et,ze[Le++]=tt,ze[Le++]=Bt,et=e.id,tt=e.overflow,Bt=t),t=Xi(t,s.children),t.flags|=4096,t)}function cl(e,t,n){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),Ya(e.return,t,n)}function fa(e,t,n,s,a){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:a}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=s,i.tail=n,i.tailMode=a)}function bu(e,t,n){var s=t.pendingProps,a=s.revealOrder,i=s.tail;if(he(e,t,s.children,n),s=Y.current,s&2)s=s&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&cl(e,n,t);else if(e.tag===19)cl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(U(Y,s),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&hs(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),fa(t,!1,a,n,i);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&hs(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}fa(t,!0,n,null,i);break;case"together":fa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Yr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function it(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ut|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(T(153));if(t.child!==null){for(e=t.child,n=Nt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Nt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function dp(e,t,n){switch(t.tag){case 3:ku(t),xn();break;case 5:Xc(t);break;case 1:ke(t.type)&&cs(t);break;case 4:Ui(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,a=t.memoizedProps.value;U(ms,s._currentValue),s._currentValue=a;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(U(Y,Y.current&1),t.flags|=128,null):n&t.child.childLanes?Nu(e,t,n):(U(Y,Y.current&1),e=it(e,t,n),e!==null?e.sibling:null);U(Y,Y.current&1);break;case 19:if(s=(n&t.childLanes)!==0,e.flags&128){if(s)return bu(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),U(Y,Y.current),s)break;return null;case 22:case 23:return t.lanes=0,ju(e,t,n)}return it(e,t,n)}var Su,ni,Cu,Eu;Su=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ni=function(){};Cu=function(e,t,n,s){var a=e.memoizedProps;if(a!==s){e=t.stateNode,Mt(Xe.current);var i=null;switch(n){case"input":a=ba(e,a),s=ba(e,s),i=[];break;case"select":a=X({},a,{value:void 0}),s=X({},s,{value:void 0}),i=[];break;case"textarea":a=Ea(e,a),s=Ea(e,s),i=[];break;default:typeof a.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=os)}Pa(n,s);var o;n=null;for(u in a)if(!s.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var l=a[u];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Kn.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in s){var c=s[u];if(l=a!=null?a[u]:void 0,s.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(i||(i=[]),i.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Kn.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&H("scroll",e),i||l===c||(i=[])):(i=i||[]).push(u,c))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};Eu=function(e,t,n,s){n!==s&&(t.flags|=4)};function Ln(e,t){if(!G)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function de(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,s=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags&14680064,s|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=s,e.childLanes=n,t}function mp(e,t,n){var s=t.pendingProps;switch(Ii(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return de(t),null;case 1:return ke(t.type)&&ls(),de(t),null;case 3:return s=t.stateNode,jn(),V(we),V(pe),Wi(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Rr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ue!==null&&(ui(Ue),Ue=null))),ni(e,t),de(t),null;case 5:Hi(t);var a=Mt(or.current);if(n=t.type,e!==null&&t.stateNode!=null)Cu(e,t,n,s,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(T(166));return de(t),null}if(e=Mt(Xe.current),Rr(t)){s=t.stateNode,n=t.type;var i=t.memoizedProps;switch(s[Ye]=t,s[ar]=i,e=(t.mode&1)!==0,n){case"dialog":H("cancel",s),H("close",s);break;case"iframe":case"object":case"embed":H("load",s);break;case"video":case"audio":for(a=0;a<An.length;a++)H(An[a],s);break;case"source":H("error",s);break;case"img":case"image":case"link":H("error",s),H("load",s);break;case"details":H("toggle",s);break;case"input":xo(s,i),H("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!i.multiple},H("invalid",s);break;case"textarea":jo(s,i),H("invalid",s)}Pa(n,i),a=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?s.textContent!==l&&(i.suppressHydrationWarning!==!0&&Lr(s.textContent,l,e),a=["children",l]):typeof l=="number"&&s.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Lr(s.textContent,l,e),a=["children",""+l]):Kn.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&H("scroll",s)}switch(n){case"input":Sr(s),yo(s,i,!0);break;case"textarea":Sr(s),wo(s);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(s.onclick=os)}s=a,t.updateQueue=s,s!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=tc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=o.createElement(n,{is:s.is}):(e=o.createElement(n),n==="select"&&(o=e,s.multiple?o.multiple=!0:s.size&&(o.size=s.size))):e=o.createElementNS(e,n),e[Ye]=t,e[ar]=s,Su(e,t,!1,!1),t.stateNode=e;e:{switch(o=Ta(n,s),n){case"dialog":H("cancel",e),H("close",e),a=s;break;case"iframe":case"object":case"embed":H("load",e),a=s;break;case"video":case"audio":for(a=0;a<An.length;a++)H(An[a],e);a=s;break;case"source":H("error",e),a=s;break;case"img":case"image":case"link":H("error",e),H("load",e),a=s;break;case"details":H("toggle",e),a=s;break;case"input":xo(e,s),a=ba(e,s),H("invalid",e);break;case"option":a=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},a=X({},s,{value:void 0}),H("invalid",e);break;case"textarea":jo(e,s),a=Ea(e,s),H("invalid",e);break;default:a=s}Pa(n,a),l=a;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?sc(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&nc(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Xn(e,c):typeof c=="number"&&Xn(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Kn.hasOwnProperty(i)?c!=null&&i==="onScroll"&&H("scroll",e):c!=null&&ji(e,i,c,o))}switch(n){case"input":Sr(e),yo(e,s,!1);break;case"textarea":Sr(e),wo(e);break;case"option":s.value!=null&&e.setAttribute("value",""+St(s.value));break;case"select":e.multiple=!!s.multiple,i=s.value,i!=null?ln(e,!!s.multiple,i,!1):s.defaultValue!=null&&ln(e,!!s.multiple,s.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=os)}switch(n){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return de(t),null;case 6:if(e&&t.stateNode!=null)Eu(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(T(166));if(n=Mt(or.current),Mt(Xe.current),Rr(t)){if(s=t.stateNode,n=t.memoizedProps,s[Ye]=t,(i=s.nodeValue!==n)&&(e=De,e!==null))switch(e.tag){case 3:Lr(s.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Lr(s.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else s=(n.nodeType===9?n:n.ownerDocument).createTextNode(s),s[Ye]=t,t.stateNode=s}return de(t),null;case 13:if(V(Y),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(G&&Ee!==null&&t.mode&1&&!(t.flags&128))Vc(),xn(),t.flags|=98560,i=!1;else if(i=Rr(t),s!==null&&s.dehydrated!==null){if(e===null){if(!i)throw Error(T(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(T(317));i[Ye]=t}else xn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;de(t),i=!1}else Ue!==null&&(ui(Ue),Ue=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,t.mode&1&&(e===null||Y.current&1?re===0&&(re=3):no())),t.updateQueue!==null&&(t.flags|=4),de(t),null);case 4:return jn(),ni(e,t),e===null&&rr(t.stateNode.containerInfo),de(t),null;case 10:return Fi(t.type._context),de(t),null;case 17:return ke(t.type)&&ls(),de(t),null;case 19:if(V(Y),i=t.memoizedState,i===null)return de(t),null;if(s=(t.flags&128)!==0,o=i.rendering,o===null)if(s)Ln(i,!1);else{if(re!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=hs(e),o!==null){for(t.flags|=128,Ln(i,!1),s=o.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=n,n=t.child;n!==null;)i=n,e=s,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return U(Y,Y.current&1|2),t.child}e=e.sibling}i.tail!==null&&Z()>kn&&(t.flags|=128,s=!0,Ln(i,!1),t.lanes=4194304)}else{if(!s)if(e=hs(o),e!==null){if(t.flags|=128,s=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ln(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!G)return de(t),null}else 2*Z()-i.renderingStartTime>kn&&n!==1073741824&&(t.flags|=128,s=!0,Ln(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Z(),t.sibling=null,n=Y.current,U(Y,s?n&1|2:n&1),t):(de(t),null);case 22:case 23:return to(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&t.mode&1?Se&1073741824&&(de(t),t.subtreeFlags&6&&(t.flags|=8192)):de(t),null;case 24:return null;case 25:return null}throw Error(T(156,t.tag))}function pp(e,t){switch(Ii(t),t.tag){case 1:return ke(t.type)&&ls(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return jn(),V(we),V(pe),Wi(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Hi(t),null;case 13:if(V(Y),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(T(340));xn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return V(Y),null;case 4:return jn(),null;case 10:return Fi(t.type._context),null;case 22:case 23:return to(),null;case 24:return null;default:return null}}var Or=!1,me=!1,fp=typeof WeakSet=="function"?WeakSet:Set,L=null;function an(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(s){J(e,t,s)}else n.current=null}function ri(e,t,n){try{n()}catch(s){J(e,t,s)}}var ul=!1;function hp(e,t){if(Ba=ss,e=zc(),Li(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var a=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,c=-1,u=0,g=0,v=e,m=null;t:for(;;){for(var S;v!==n||a!==0&&v.nodeType!==3||(l=o+a),v!==i||s!==0&&v.nodeType!==3||(c=o+s),v.nodeType===3&&(o+=v.nodeValue.length),(S=v.firstChild)!==null;)m=v,v=S;for(;;){if(v===e)break t;if(m===n&&++u===a&&(l=o),m===i&&++g===s&&(c=o),(S=v.nextSibling)!==null)break;v=m,m=v.parentNode}v=S}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for($a={focusedElem:e,selectionRange:n},ss=!1,L=t;L!==null;)if(t=L,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,L=e;else for(;L!==null;){t=L;try{var C=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var k=C.memoizedProps,D=C.memoizedState,x=t.stateNode,p=x.getSnapshotBeforeUpdate(t.elementType===t.type?k:Be(t.type,k),D);x.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(T(163))}}catch(w){J(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,L=e;break}L=t.return}return C=ul,ul=!1,C}function Vn(e,t,n){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&e)===e){var i=a.destroy;a.destroy=void 0,i!==void 0&&ri(t,n,i)}a=a.next}while(a!==s)}}function Ms(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var s=n.create;n.destroy=s()}n=n.next}while(n!==t)}}function si(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Du(e){var t=e.alternate;t!==null&&(e.alternate=null,Du(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ye],delete t[ar],delete t[Wa],delete t[Jm],delete t[qm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Pu(e){return e.tag===5||e.tag===3||e.tag===4}function dl(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Pu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ai(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=os));else if(s!==4&&(e=e.child,e!==null))for(ai(e,t,n),e=e.sibling;e!==null;)ai(e,t,n),e=e.sibling}function ii(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(ii(e,t,n),e=e.sibling;e!==null;)ii(e,t,n),e=e.sibling}var oe=null,$e=!1;function lt(e,t,n){for(n=n.child;n!==null;)Tu(e,t,n),n=n.sibling}function Tu(e,t,n){if(Ke&&typeof Ke.onCommitFiberUnmount=="function")try{Ke.onCommitFiberUnmount(Ds,n)}catch{}switch(n.tag){case 5:me||an(n,t);case 6:var s=oe,a=$e;oe=null,lt(e,t,n),oe=s,$e=a,oe!==null&&($e?(e=oe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):oe.removeChild(n.stateNode));break;case 18:oe!==null&&($e?(e=oe,n=n.stateNode,e.nodeType===8?oa(e.parentNode,n):e.nodeType===1&&oa(e,n),er(e)):oa(oe,n.stateNode));break;case 4:s=oe,a=$e,oe=n.stateNode.containerInfo,$e=!0,lt(e,t,n),oe=s,$e=a;break;case 0:case 11:case 14:case 15:if(!me&&(s=n.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){a=s=s.next;do{var i=a,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&ri(n,t,o),a=a.next}while(a!==s)}lt(e,t,n);break;case 1:if(!me&&(an(n,t),s=n.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=n.memoizedProps,s.state=n.memoizedState,s.componentWillUnmount()}catch(l){J(n,t,l)}lt(e,t,n);break;case 21:lt(e,t,n);break;case 22:n.mode&1?(me=(s=me)||n.memoizedState!==null,lt(e,t,n),me=s):lt(e,t,n);break;default:lt(e,t,n)}}function ml(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new fp),t.forEach(function(s){var a=bp.bind(null,e,s);n.has(s)||(n.add(s),s.then(a,a))})}}function Fe(e,t){var n=t.deletions;if(n!==null)for(var s=0;s<n.length;s++){var a=n[s];try{var i=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:oe=l.stateNode,$e=!1;break e;case 3:oe=l.stateNode.containerInfo,$e=!0;break e;case 4:oe=l.stateNode.containerInfo,$e=!0;break e}l=l.return}if(oe===null)throw Error(T(160));Tu(i,o,a),oe=null,$e=!1;var c=a.alternate;c!==null&&(c.return=null),a.return=null}catch(u){J(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)_u(t,e),t=t.sibling}function _u(e,t){var n=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Fe(t,e),Qe(e),s&4){try{Vn(3,e,e.return),Ms(3,e)}catch(k){J(e,e.return,k)}try{Vn(5,e,e.return)}catch(k){J(e,e.return,k)}}break;case 1:Fe(t,e),Qe(e),s&512&&n!==null&&an(n,n.return);break;case 5:if(Fe(t,e),Qe(e),s&512&&n!==null&&an(n,n.return),e.flags&32){var a=e.stateNode;try{Xn(a,"")}catch(k){J(e,e.return,k)}}if(s&4&&(a=e.stateNode,a!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Zl(a,i),Ta(l,o);var u=Ta(l,i);for(o=0;o<c.length;o+=2){var g=c[o],v=c[o+1];g==="style"?sc(a,v):g==="dangerouslySetInnerHTML"?nc(a,v):g==="children"?Xn(a,v):ji(a,g,v,u)}switch(l){case"input":Sa(a,i);break;case"textarea":ec(a,i);break;case"select":var m=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!i.multiple;var S=i.value;S!=null?ln(a,!!i.multiple,S,!1):m!==!!i.multiple&&(i.defaultValue!=null?ln(a,!!i.multiple,i.defaultValue,!0):ln(a,!!i.multiple,i.multiple?[]:"",!1))}a[ar]=i}catch(k){J(e,e.return,k)}}break;case 6:if(Fe(t,e),Qe(e),s&4){if(e.stateNode===null)throw Error(T(162));a=e.stateNode,i=e.memoizedProps;try{a.nodeValue=i}catch(k){J(e,e.return,k)}}break;case 3:if(Fe(t,e),Qe(e),s&4&&n!==null&&n.memoizedState.isDehydrated)try{er(t.containerInfo)}catch(k){J(e,e.return,k)}break;case 4:Fe(t,e),Qe(e);break;case 13:Fe(t,e),Qe(e),a=e.child,a.flags&8192&&(i=a.memoizedState!==null,a.stateNode.isHidden=i,!i||a.alternate!==null&&a.alternate.memoizedState!==null||(Zi=Z())),s&4&&ml(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(me=(u=me)||g,Fe(t,e),me=u):Fe(t,e),Qe(e),s&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!g&&e.mode&1)for(L=e,g=e.child;g!==null;){for(v=L=g;L!==null;){switch(m=L,S=m.child,m.tag){case 0:case 11:case 14:case 15:Vn(4,m,m.return);break;case 1:an(m,m.return);var C=m.stateNode;if(typeof C.componentWillUnmount=="function"){s=m,n=m.return;try{t=s,C.props=t.memoizedProps,C.state=t.memoizedState,C.componentWillUnmount()}catch(k){J(s,n,k)}}break;case 5:an(m,m.return);break;case 22:if(m.memoizedState!==null){fl(v);continue}}S!==null?(S.return=m,L=S):fl(v)}g=g.sibling}e:for(g=null,v=e;;){if(v.tag===5){if(g===null){g=v;try{a=v.stateNode,u?(i=a.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=v.stateNode,c=v.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=rc("display",o))}catch(k){J(e,e.return,k)}}}else if(v.tag===6){if(g===null)try{v.stateNode.nodeValue=u?"":v.memoizedProps}catch(k){J(e,e.return,k)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===e)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===e)break e;for(;v.sibling===null;){if(v.return===null||v.return===e)break e;g===v&&(g=null),v=v.return}g===v&&(g=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:Fe(t,e),Qe(e),s&4&&ml(e);break;case 21:break;default:Fe(t,e),Qe(e)}}function Qe(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Pu(n)){var s=n;break e}n=n.return}throw Error(T(160))}switch(s.tag){case 5:var a=s.stateNode;s.flags&32&&(Xn(a,""),s.flags&=-33);var i=dl(e);ii(e,i,a);break;case 3:case 4:var o=s.stateNode.containerInfo,l=dl(e);ai(e,l,o);break;default:throw Error(T(161))}}catch(c){J(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gp(e,t,n){L=e,zu(e)}function zu(e,t,n){for(var s=(e.mode&1)!==0;L!==null;){var a=L,i=a.child;if(a.tag===22&&s){var o=a.memoizedState!==null||Or;if(!o){var l=a.alternate,c=l!==null&&l.memoizedState!==null||me;l=Or;var u=me;if(Or=o,(me=c)&&!u)for(L=a;L!==null;)o=L,c=o.child,o.tag===22&&o.memoizedState!==null?hl(a):c!==null?(c.return=o,L=c):hl(a);for(;i!==null;)L=i,zu(i),i=i.sibling;L=a,Or=l,me=u}pl(e)}else a.subtreeFlags&8772&&i!==null?(i.return=a,L=i):pl(e)}}function pl(e){for(;L!==null;){var t=L;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:me||Ms(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!me)if(n===null)s.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:Be(t.type,n.memoizedProps);s.componentDidUpdate(a,n.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Jo(t,i,s);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Jo(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var g=u.memoizedState;if(g!==null){var v=g.dehydrated;v!==null&&er(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(T(163))}me||t.flags&512&&si(t)}catch(m){J(t,t.return,m)}}if(t===e){L=null;break}if(n=t.sibling,n!==null){n.return=t.return,L=n;break}L=t.return}}function fl(e){for(;L!==null;){var t=L;if(t===e){L=null;break}var n=t.sibling;if(n!==null){n.return=t.return,L=n;break}L=t.return}}function hl(e){for(;L!==null;){var t=L;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ms(4,t)}catch(c){J(t,n,c)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var a=t.return;try{s.componentDidMount()}catch(c){J(t,a,c)}}var i=t.return;try{si(t)}catch(c){J(t,i,c)}break;case 5:var o=t.return;try{si(t)}catch(c){J(t,o,c)}}}catch(c){J(t,t.return,c)}if(t===e){L=null;break}var l=t.sibling;if(l!==null){l.return=t.return,L=l;break}L=t.return}}var vp=Math.ceil,xs=ot.ReactCurrentDispatcher,Ji=ot.ReactCurrentOwner,Ie=ot.ReactCurrentBatchConfig,B=0,ie=null,ee=null,le=0,Se=0,on=Dt(0),re=0,dr=null,Ut=0,Os=0,qi=0,Qn=null,ye=null,Zi=0,kn=1/0,qe=null,ys=!1,oi=null,wt=null,Ar=!1,ft=null,js=0,Gn=0,li=null,Kr=-1,Xr=0;function ge(){return B&6?Z():Kr!==-1?Kr:Kr=Z()}function kt(e){return e.mode&1?B&2&&le!==0?le&-le:ep.transition!==null?(Xr===0&&(Xr=gc()),Xr):(e=$,e!==0||(e=window.event,e=e===void 0?16:Nc(e.type)),e):1}function We(e,t,n,s){if(50<Gn)throw Gn=0,li=null,Error(T(185));hr(e,n,s),(!(B&2)||e!==ie)&&(e===ie&&(!(B&2)&&(Os|=n),re===4&&mt(e,le)),Ne(e,s),n===1&&B===0&&!(t.mode&1)&&(kn=Z()+500,Ls&&Pt()))}function Ne(e,t){var n=e.callbackNode;em(e,t);var s=rs(e,e===ie?le:0);if(s===0)n!==null&&bo(n),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(n!=null&&bo(n),t===1)e.tag===0?Zm(gl.bind(null,e)):Uc(gl.bind(null,e)),Km(function(){!(B&6)&&Pt()}),n=null;else{switch(vc(s)){case 1:n=Si;break;case 4:n=fc;break;case 16:n=ns;break;case 536870912:n=hc;break;default:n=ns}n=Bu(n,Lu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Lu(e,t){if(Kr=-1,Xr=0,B&6)throw Error(T(327));var n=e.callbackNode;if(pn()&&e.callbackNode!==n)return null;var s=rs(e,e===ie?le:0);if(s===0)return null;if(s&30||s&e.expiredLanes||t)t=ws(e,s);else{t=s;var a=B;B|=2;var i=Iu();(ie!==e||le!==t)&&(qe=null,kn=Z()+500,Ot(e,t));do try{jp();break}catch(l){Ru(e,l)}while(1);Ai(),xs.current=i,B=a,ee!==null?t=0:(ie=null,le=0,t=re)}if(t!==0){if(t===2&&(a=Ia(e),a!==0&&(s=a,t=ci(e,a))),t===1)throw n=dr,Ot(e,0),mt(e,s),Ne(e,Z()),n;if(t===6)mt(e,s);else{if(a=e.current.alternate,!(s&30)&&!xp(a)&&(t=ws(e,s),t===2&&(i=Ia(e),i!==0&&(s=i,t=ci(e,i))),t===1))throw n=dr,Ot(e,0),mt(e,s),Ne(e,Z()),n;switch(e.finishedWork=a,e.finishedLanes=s,t){case 0:case 1:throw Error(T(345));case 2:Lt(e,ye,qe);break;case 3:if(mt(e,s),(s&130023424)===s&&(t=Zi+500-Z(),10<t)){if(rs(e,0)!==0)break;if(a=e.suspendedLanes,(a&s)!==s){ge(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Ha(Lt.bind(null,e,ye,qe),t);break}Lt(e,ye,qe);break;case 4:if(mt(e,s),(s&4194240)===s)break;for(t=e.eventTimes,a=-1;0<s;){var o=31-He(s);i=1<<o,o=t[o],o>a&&(a=o),s&=~i}if(s=a,s=Z()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*vp(s/1960))-s,10<s){e.timeoutHandle=Ha(Lt.bind(null,e,ye,qe),s);break}Lt(e,ye,qe);break;case 5:Lt(e,ye,qe);break;default:throw Error(T(329))}}}return Ne(e,Z()),e.callbackNode===n?Lu.bind(null,e):null}function ci(e,t){var n=Qn;return e.current.memoizedState.isDehydrated&&(Ot(e,t).flags|=256),e=ws(e,t),e!==2&&(t=ye,ye=n,t!==null&&ui(t)),e}function ui(e){ye===null?ye=e:ye.push.apply(ye,e)}function xp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var s=0;s<n.length;s++){var a=n[s],i=a.getSnapshot;a=a.value;try{if(!Ve(i(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function mt(e,t){for(t&=~qi,t&=~Os,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-He(t),s=1<<n;e[n]=-1,t&=~s}}function gl(e){if(B&6)throw Error(T(327));pn();var t=rs(e,0);if(!(t&1))return Ne(e,Z()),null;var n=ws(e,t);if(e.tag!==0&&n===2){var s=Ia(e);s!==0&&(t=s,n=ci(e,s))}if(n===1)throw n=dr,Ot(e,0),mt(e,t),Ne(e,Z()),n;if(n===6)throw Error(T(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Lt(e,ye,qe),Ne(e,Z()),null}function eo(e,t){var n=B;B|=1;try{return e(t)}finally{B=n,B===0&&(kn=Z()+500,Ls&&Pt())}}function Ht(e){ft!==null&&ft.tag===0&&!(B&6)&&pn();var t=B;B|=1;var n=Ie.transition,s=$;try{if(Ie.transition=null,$=1,e)return e()}finally{$=s,Ie.transition=n,B=t,!(B&6)&&Pt()}}function to(){Se=on.current,V(on)}function Ot(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Ym(n)),ee!==null)for(n=ee.return;n!==null;){var s=n;switch(Ii(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&ls();break;case 3:jn(),V(we),V(pe),Wi();break;case 5:Hi(s);break;case 4:jn();break;case 13:V(Y);break;case 19:V(Y);break;case 10:Fi(s.type._context);break;case 22:case 23:to()}n=n.return}if(ie=e,ee=e=Nt(e.current,null),le=Se=t,re=0,dr=null,qi=Os=Ut=0,ye=Qn=null,It!==null){for(t=0;t<It.length;t++)if(n=It[t],s=n.interleaved,s!==null){n.interleaved=null;var a=s.next,i=n.pending;if(i!==null){var o=i.next;i.next=a,s.next=o}n.pending=s}It=null}return e}function Ru(e,t){do{var n=ee;try{if(Ai(),Qr.current=vs,gs){for(var s=K.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}gs=!1}if($t=0,ae=ne=K=null,Wn=!1,lr=0,Ji.current=null,n===null||n.return===null){re=1,dr=t,ee=null;break}e:{var i=e,o=n.return,l=n,c=t;if(t=le,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,g=l,v=g.tag;if(!(g.mode&1)&&(v===0||v===11||v===15)){var m=g.alternate;m?(g.updateQueue=m.updateQueue,g.memoizedState=m.memoizedState,g.lanes=m.lanes):(g.updateQueue=null,g.memoizedState=null)}var S=rl(o);if(S!==null){S.flags&=-257,sl(S,o,l,i,t),S.mode&1&&nl(i,u,t),t=S,c=u;var C=t.updateQueue;if(C===null){var k=new Set;k.add(c),t.updateQueue=k}else C.add(c);break e}else{if(!(t&1)){nl(i,u,t),no();break e}c=Error(T(426))}}else if(G&&l.mode&1){var D=rl(o);if(D!==null){!(D.flags&65536)&&(D.flags|=256),sl(D,o,l,i,t),Mi(wn(c,l));break e}}i=c=wn(c,l),re!==4&&(re=2),Qn===null?Qn=[i]:Qn.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var x=vu(i,c,t);Xo(i,x);break e;case 1:l=c;var p=i.type,h=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(wt===null||!wt.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=xu(i,l,t);Xo(i,w);break e}}i=i.return}while(i!==null)}Ou(n)}catch(d){t=d,ee===n&&n!==null&&(ee=n=n.return);continue}break}while(1)}function Iu(){var e=xs.current;return xs.current=vs,e===null?vs:e}function no(){(re===0||re===3||re===2)&&(re=4),ie===null||!(Ut&268435455)&&!(Os&268435455)||mt(ie,le)}function ws(e,t){var n=B;B|=2;var s=Iu();(ie!==e||le!==t)&&(qe=null,Ot(e,t));do try{yp();break}catch(a){Ru(e,a)}while(1);if(Ai(),B=n,xs.current=s,ee!==null)throw Error(T(261));return ie=null,le=0,re}function yp(){for(;ee!==null;)Mu(ee)}function jp(){for(;ee!==null&&!Vd();)Mu(ee)}function Mu(e){var t=Fu(e.alternate,e,Se);e.memoizedProps=e.pendingProps,t===null?Ou(e):ee=t,Ji.current=null}function Ou(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=pp(n,t),n!==null){n.flags&=32767,ee=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{re=6,ee=null;return}}else if(n=mp(n,t,Se),n!==null){ee=n;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);re===0&&(re=5)}function Lt(e,t,n){var s=$,a=Ie.transition;try{Ie.transition=null,$=1,wp(e,t,n,s)}finally{Ie.transition=a,$=s}return null}function wp(e,t,n,s){do pn();while(ft!==null);if(B&6)throw Error(T(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(T(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(tm(e,i),e===ie&&(ee=ie=null,le=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ar||(Ar=!0,Bu(ns,function(){return pn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ie.transition,Ie.transition=null;var o=$;$=1;var l=B;B|=4,Ji.current=null,hp(e,n),_u(n,e),$m($a),ss=!!Ba,$a=Ba=null,e.current=n,gp(n),Qd(),B=l,$=o,Ie.transition=i}else e.current=n;if(Ar&&(Ar=!1,ft=e,js=a),i=e.pendingLanes,i===0&&(wt=null),Kd(n.stateNode),Ne(e,Z()),t!==null)for(s=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],s(a.value,{componentStack:a.stack,digest:a.digest});if(ys)throw ys=!1,e=oi,oi=null,e;return js&1&&e.tag!==0&&pn(),i=e.pendingLanes,i&1?e===li?Gn++:(Gn=0,li=e):Gn=0,Pt(),null}function pn(){if(ft!==null){var e=vc(js),t=Ie.transition,n=$;try{if(Ie.transition=null,$=16>e?16:e,ft===null)var s=!1;else{if(e=ft,ft=null,js=0,B&6)throw Error(T(331));var a=B;for(B|=4,L=e.current;L!==null;){var i=L,o=i.child;if(L.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(L=u;L!==null;){var g=L;switch(g.tag){case 0:case 11:case 15:Vn(8,g,i)}var v=g.child;if(v!==null)v.return=g,L=v;else for(;L!==null;){g=L;var m=g.sibling,S=g.return;if(Du(g),g===u){L=null;break}if(m!==null){m.return=S,L=m;break}L=S}}}var C=i.alternate;if(C!==null){var k=C.child;if(k!==null){C.child=null;do{var D=k.sibling;k.sibling=null,k=D}while(k!==null)}}L=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,L=o;else e:for(;L!==null;){if(i=L,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Vn(9,i,i.return)}var x=i.sibling;if(x!==null){x.return=i.return,L=x;break e}L=i.return}}var p=e.current;for(L=p;L!==null;){o=L;var h=o.child;if(o.subtreeFlags&2064&&h!==null)h.return=o,L=h;else e:for(o=p;L!==null;){if(l=L,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Ms(9,l)}}catch(d){J(l,l.return,d)}if(l===o){L=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,L=w;break e}L=l.return}}if(B=a,Pt(),Ke&&typeof Ke.onPostCommitFiberRoot=="function")try{Ke.onPostCommitFiberRoot(Ds,e)}catch{}s=!0}return s}finally{$=n,Ie.transition=t}}return!1}function vl(e,t,n){t=wn(n,t),t=vu(e,t,1),e=jt(e,t,1),t=ge(),e!==null&&(hr(e,1,t),Ne(e,t))}function J(e,t,n){if(e.tag===3)vl(e,e,n);else for(;t!==null;){if(t.tag===3){vl(t,e,n);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(wt===null||!wt.has(s))){e=wn(n,e),e=xu(t,e,1),t=jt(t,e,1),e=ge(),t!==null&&(hr(t,1,e),Ne(t,e));break}}t=t.return}}function kp(e,t,n){var s=e.pingCache;s!==null&&s.delete(t),t=ge(),e.pingedLanes|=e.suspendedLanes&n,ie===e&&(le&n)===n&&(re===4||re===3&&(le&130023424)===le&&500>Z()-Zi?Ot(e,0):qi|=n),Ne(e,t)}function Au(e,t){t===0&&(e.mode&1?(t=Dr,Dr<<=1,!(Dr&130023424)&&(Dr=4194304)):t=1);var n=ge();e=at(e,t),e!==null&&(hr(e,t,n),Ne(e,n))}function Np(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Au(e,n)}function bp(e,t){var n=0;switch(e.tag){case 13:var s=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(T(314))}s!==null&&s.delete(t),Au(e,n)}var Fu;Fu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||we.current)je=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return je=!1,dp(e,t,n);je=!!(e.flags&131072)}else je=!1,G&&t.flags&1048576&&Hc(t,ds,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;Yr(e,t),e=t.pendingProps;var a=vn(t,pe.current);mn(t,n),a=Qi(null,t,s,e,a,n);var i=Gi();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ke(s)?(i=!0,cs(t)):i=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,$i(t),a.updater=Is,t.stateNode=a,a._reactInternals=t,Xa(t,s,e,n),t=Za(null,t,s,!0,i,n)):(t.tag=0,G&&i&&Ri(t),he(null,t,a,n),t=t.child),t;case 16:s=t.elementType;e:{switch(Yr(e,t),e=t.pendingProps,a=s._init,s=a(s._payload),t.type=s,a=t.tag=Cp(s),e=Be(s,e),a){case 0:t=qa(null,t,s,e,n);break e;case 1:t=ol(null,t,s,e,n);break e;case 11:t=al(null,t,s,e,n);break e;case 14:t=il(null,t,s,Be(s.type,e),n);break e}throw Error(T(306,s,""))}return t;case 0:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:Be(s,a),qa(e,t,s,a,n);case 1:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:Be(s,a),ol(e,t,s,a,n);case 3:e:{if(ku(t),e===null)throw Error(T(387));s=t.pendingProps,i=t.memoizedState,a=i.element,Kc(e,t),fs(t,s,null,n);var o=t.memoizedState;if(s=o.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){a=wn(Error(T(423)),t),t=ll(e,t,s,n,a);break e}else if(s!==a){a=wn(Error(T(424)),t),t=ll(e,t,s,n,a);break e}else for(Ee=yt(t.stateNode.containerInfo.firstChild),De=t,G=!0,Ue=null,n=Gc(t,null,s,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(xn(),s===a){t=it(e,t,n);break e}he(e,t,s,n)}t=t.child}return t;case 5:return Xc(t),e===null&&Ga(t),s=t.type,a=t.pendingProps,i=e!==null?e.memoizedProps:null,o=a.children,Ua(s,a)?o=null:i!==null&&Ua(s,i)&&(t.flags|=32),wu(e,t),he(e,t,o,n),t.child;case 6:return e===null&&Ga(t),null;case 13:return Nu(e,t,n);case 4:return Ui(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=yn(t,null,s,n):he(e,t,s,n),t.child;case 11:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:Be(s,a),al(e,t,s,a,n);case 7:return he(e,t,t.pendingProps,n),t.child;case 8:return he(e,t,t.pendingProps.children,n),t.child;case 12:return he(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(s=t.type._context,a=t.pendingProps,i=t.memoizedProps,o=a.value,U(ms,s._currentValue),s._currentValue=o,i!==null)if(Ve(i.value,o)){if(i.children===a.children&&!we.current){t=it(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var c=l.firstContext;c!==null;){if(c.context===s){if(i.tag===1){c=nt(-1,n&-n),c.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var g=u.pending;g===null?c.next=c:(c.next=g.next,g.next=c),u.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Ya(i.return,n,t),l.lanes|=n;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(T(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Ya(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}he(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,s=t.pendingProps.children,mn(t,n),a=Me(a),s=s(a),t.flags|=1,he(e,t,s,n),t.child;case 14:return s=t.type,a=Be(s,t.pendingProps),a=Be(s.type,a),il(e,t,s,a,n);case 15:return yu(e,t,t.type,t.pendingProps,n);case 17:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:Be(s,a),Yr(e,t),t.tag=1,ke(s)?(e=!0,cs(t)):e=!1,mn(t,n),gu(t,s,a),Xa(t,s,a,n),Za(null,t,s,!0,e,n);case 19:return bu(e,t,n);case 22:return ju(e,t,n)}throw Error(T(156,t.tag))};function Bu(e,t){return pc(e,t)}function Sp(e,t,n,s){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Re(e,t,n,s){return new Sp(e,t,n,s)}function ro(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Cp(e){if(typeof e=="function")return ro(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ki)return 11;if(e===Ni)return 14}return 2}function Nt(e,t){var n=e.alternate;return n===null?(n=Re(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Jr(e,t,n,s,a,i){var o=2;if(s=e,typeof e=="function")ro(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Xt:return At(n.children,a,i,t);case wi:o=8,a|=8;break;case ja:return e=Re(12,n,t,a|2),e.elementType=ja,e.lanes=i,e;case wa:return e=Re(13,n,t,a),e.elementType=wa,e.lanes=i,e;case ka:return e=Re(19,n,t,a),e.elementType=ka,e.lanes=i,e;case Xl:return As(n,a,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Yl:o=10;break e;case Kl:o=9;break e;case ki:o=11;break e;case Ni:o=14;break e;case ct:o=16,s=null;break e}throw Error(T(130,e==null?e:typeof e,""))}return t=Re(o,n,t,a),t.elementType=e,t.type=s,t.lanes=i,t}function At(e,t,n,s){return e=Re(7,e,s,t),e.lanes=n,e}function As(e,t,n,s){return e=Re(22,e,s,t),e.elementType=Xl,e.lanes=n,e.stateNode={isHidden:!1},e}function ha(e,t,n){return e=Re(6,e,null,t),e.lanes=n,e}function ga(e,t,n){return t=Re(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ep(e,t,n,s,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xs(0),this.expirationTimes=Xs(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xs(0),this.identifierPrefix=s,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function so(e,t,n,s,a,i,o,l,c){return e=new Ep(e,t,n,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Re(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:s,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},$i(i),e}function Dp(e,t,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Kt,key:s==null?null:""+s,children:e,containerInfo:t,implementation:n}}function $u(e){if(!e)return Ct;e=e._reactInternals;e:{if(Vt(e)!==e||e.tag!==1)throw Error(T(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ke(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(T(171))}if(e.tag===1){var n=e.type;if(ke(n))return $c(e,n,t)}return t}function Uu(e,t,n,s,a,i,o,l,c){return e=so(n,s,!0,e,a,i,o,l,c),e.context=$u(null),n=e.current,s=ge(),a=kt(n),i=nt(s,a),i.callback=t??null,jt(n,i,a),e.current.lanes=a,hr(e,a,s),Ne(e,s),e}function Fs(e,t,n,s){var a=t.current,i=ge(),o=kt(a);return n=$u(n),t.context===null?t.context=n:t.pendingContext=n,t=nt(i,o),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=jt(a,t,o),e!==null&&(We(e,a,o,i),Vr(e,a,o)),o}function ks(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function xl(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ao(e,t){xl(e,t),(e=e.alternate)&&xl(e,t)}function Pp(){return null}var Hu=typeof reportError=="function"?reportError:function(e){console.error(e)};function io(e){this._internalRoot=e}Bs.prototype.render=io.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(T(409));Fs(e,t,null,null)};Bs.prototype.unmount=io.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ht(function(){Fs(null,e,null,null)}),t[st]=null}};function Bs(e){this._internalRoot=e}Bs.prototype.unstable_scheduleHydration=function(e){if(e){var t=jc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<dt.length&&t!==0&&t<dt[n].priority;n++);dt.splice(n,0,e),n===0&&kc(e)}};function oo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function $s(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function yl(){}function Tp(e,t,n,s,a){if(a){if(typeof s=="function"){var i=s;s=function(){var u=ks(o);i.call(u)}}var o=Uu(t,s,e,0,null,!1,!1,"",yl);return e._reactRootContainer=o,e[st]=o.current,rr(e.nodeType===8?e.parentNode:e),Ht(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof s=="function"){var l=s;s=function(){var u=ks(c);l.call(u)}}var c=so(e,0,!1,null,null,!1,!1,"",yl);return e._reactRootContainer=c,e[st]=c.current,rr(e.nodeType===8?e.parentNode:e),Ht(function(){Fs(t,c,n,s)}),c}function Us(e,t,n,s,a){var i=n._reactRootContainer;if(i){var o=i;if(typeof a=="function"){var l=a;a=function(){var c=ks(o);l.call(c)}}Fs(t,o,e,a)}else o=Tp(n,t,e,a,s);return ks(o)}xc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=On(t.pendingLanes);n!==0&&(Ci(t,n|1),Ne(t,Z()),!(B&6)&&(kn=Z()+500,Pt()))}break;case 13:Ht(function(){var s=at(e,1);if(s!==null){var a=ge();We(s,e,1,a)}}),ao(e,1)}};Ei=function(e){if(e.tag===13){var t=at(e,134217728);if(t!==null){var n=ge();We(t,e,134217728,n)}ao(e,134217728)}};yc=function(e){if(e.tag===13){var t=kt(e),n=at(e,t);if(n!==null){var s=ge();We(n,e,t,s)}ao(e,t)}};jc=function(){return $};wc=function(e,t){var n=$;try{return $=e,t()}finally{$=n}};za=function(e,t,n){switch(t){case"input":if(Sa(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var s=n[t];if(s!==e&&s.form===e.form){var a=zs(s);if(!a)throw Error(T(90));ql(s),Sa(s,a)}}}break;case"textarea":ec(e,n);break;case"select":t=n.value,t!=null&&ln(e,!!n.multiple,t,!1)}};oc=eo;lc=Ht;var _p={usingClientEntryPoint:!1,Events:[vr,en,zs,ac,ic,eo]},Rn={findFiberByHostInstance:Rt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},zp={bundleType:Rn.bundleType,version:Rn.version,rendererPackageName:Rn.rendererPackageName,rendererConfig:Rn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ot.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=dc(e),e===null?null:e.stateNode},findFiberByHostInstance:Rn.findFiberByHostInstance||Pp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fr.isDisabled&&Fr.supportsFiber)try{Ds=Fr.inject(zp),Ke=Fr}catch{}}Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_p;Te.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!oo(t))throw Error(T(200));return Dp(e,t,null,n)};Te.createRoot=function(e,t){if(!oo(e))throw Error(T(299));var n=!1,s="",a=Hu;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=so(e,1,!1,null,null,n,!1,s,a),e[st]=t.current,rr(e.nodeType===8?e.parentNode:e),new io(t)};Te.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(T(188)):(e=Object.keys(e).join(","),Error(T(268,e)));return e=dc(t),e=e===null?null:e.stateNode,e};Te.flushSync=function(e){return Ht(e)};Te.hydrate=function(e,t,n){if(!$s(t))throw Error(T(200));return Us(null,e,t,!0,n)};Te.hydrateRoot=function(e,t,n){if(!oo(e))throw Error(T(405));var s=n!=null&&n.hydratedSources||null,a=!1,i="",o=Hu;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Uu(t,null,e,1,n??null,a,!1,i,o),e[st]=t.current,rr(e),s)for(e=0;e<s.length;e++)n=s[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Bs(t)};Te.render=function(e,t,n){if(!$s(t))throw Error(T(200));return Us(null,e,t,!1,n)};Te.unmountComponentAtNode=function(e){if(!$s(e))throw Error(T(40));return e._reactRootContainer?(Ht(function(){Us(null,null,e,!1,function(){e._reactRootContainer=null,e[st]=null})}),!0):!1};Te.unstable_batchedUpdates=eo;Te.unstable_renderSubtreeIntoContainer=function(e,t,n,s){if(!$s(n))throw Error(T(200));if(e==null||e._reactInternals===void 0)throw Error(T(38));return Us(e,t,n,!1,s)};Te.version="18.3.1-next-f1338f8080-20240426";function Wu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Wu)}catch(e){console.error(e)}}Wu(),Wl.exports=Te;var Lp=Wl.exports,jl=Lp;xa.createRoot=jl.createRoot,xa.hydrateRoot=jl.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function mr(){return mr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},mr.apply(this,arguments)}var ht;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(ht||(ht={}));const wl="popstate";function Rp(e){e===void 0&&(e={});function t(s,a){let{pathname:i,search:o,hash:l}=s.location;return di("",{pathname:i,search:o,hash:l},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(s,a){return typeof a=="string"?a:Ns(a)}return Mp(t,n,null,e)}function te(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Vu(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ip(){return Math.random().toString(36).substr(2,8)}function kl(e,t){return{usr:e.state,key:e.key,idx:t}}function di(e,t,n,s){return n===void 0&&(n=null),mr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Cn(t):t,{state:n,key:t&&t.key||s||Ip()})}function Ns(e){let{pathname:t="/",search:n="",hash:s=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),s&&s!=="#"&&(t+=s.charAt(0)==="#"?s:"#"+s),t}function Cn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let s=e.indexOf("?");s>=0&&(t.search=e.substr(s),e=e.substr(0,s)),e&&(t.pathname=e)}return t}function Mp(e,t,n,s){s===void 0&&(s={});let{window:a=document.defaultView,v5Compat:i=!1}=s,o=a.history,l=ht.Pop,c=null,u=g();u==null&&(u=0,o.replaceState(mr({},o.state,{idx:u}),""));function g(){return(o.state||{idx:null}).idx}function v(){l=ht.Pop;let D=g(),x=D==null?null:D-u;u=D,c&&c({action:l,location:k.location,delta:x})}function m(D,x){l=ht.Push;let p=di(k.location,D,x);n&&n(p,D),u=g()+1;let h=kl(p,u),w=k.createHref(p);try{o.pushState(h,"",w)}catch(d){if(d instanceof DOMException&&d.name==="DataCloneError")throw d;a.location.assign(w)}i&&c&&c({action:l,location:k.location,delta:1})}function S(D,x){l=ht.Replace;let p=di(k.location,D,x);n&&n(p,D),u=g();let h=kl(p,u),w=k.createHref(p);o.replaceState(h,"",w),i&&c&&c({action:l,location:k.location,delta:0})}function C(D){let x=a.location.origin!=="null"?a.location.origin:a.location.href,p=typeof D=="string"?D:Ns(D);return p=p.replace(/ $/,"%20"),te(x,"No window.location.(origin|href) available to create URL for href: "+p),new URL(p,x)}let k={get action(){return l},get location(){return e(a,o)},listen(D){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(wl,v),c=D,()=>{a.removeEventListener(wl,v),c=null}},createHref(D){return t(a,D)},createURL:C,encodeLocation(D){let x=C(D);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:m,replace:S,go(D){return o.go(D)}};return k}var Nl;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Nl||(Nl={}));function Op(e,t,n){return n===void 0&&(n="/"),Ap(e,t,n,!1)}function Ap(e,t,n,s){let a=typeof t=="string"?Cn(t):t,i=lo(a.pathname||"/",n);if(i==null)return null;let o=Qu(e);Fp(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let u=Xp(i);l=Yp(o[c],u,s)}return l}function Qu(e,t,n,s){t===void 0&&(t=[]),n===void 0&&(n=[]),s===void 0&&(s="");let a=(i,o,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&(te(c.relativePath.startsWith(s),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(s.length));let u=bt([s,c.relativePath]),g=n.concat(c);i.children&&i.children.length>0&&(te(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Qu(i.children,t,g,u)),!(i.path==null&&!i.index)&&t.push({path:u,score:Qp(u,i.index),routesMeta:g})};return e.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))a(i,o);else for(let c of Gu(i.path))a(i,o,c)}),t}function Gu(e){let t=e.split("/");if(t.length===0)return[];let[n,...s]=t,a=n.endsWith("?"),i=n.replace(/\?$/,"");if(s.length===0)return a?[i,""]:[i];let o=Gu(s.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),a&&l.push(...o),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Fp(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Gp(t.routesMeta.map(s=>s.childrenIndex),n.routesMeta.map(s=>s.childrenIndex)))}const Bp=/^:[\w-]+$/,$p=3,Up=2,Hp=1,Wp=10,Vp=-2,bl=e=>e==="*";function Qp(e,t){let n=e.split("/"),s=n.length;return n.some(bl)&&(s+=Vp),t&&(s+=Up),n.filter(a=>!bl(a)).reduce((a,i)=>a+(Bp.test(i)?$p:i===""?Hp:Wp),s)}function Gp(e,t){return e.length===t.length&&e.slice(0,-1).every((s,a)=>s===t[a])?e[e.length-1]-t[t.length-1]:0}function Yp(e,t,n){n===void 0&&(n=!1);let{routesMeta:s}=e,a={},i="/",o=[];for(let l=0;l<s.length;++l){let c=s[l],u=l===s.length-1,g=i==="/"?t:t.slice(i.length)||"/",v=Sl({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},g),m=c.route;if(!v&&u&&n&&!s[s.length-1].route.index&&(v=Sl({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},g)),!v)return null;Object.assign(a,v.params),o.push({params:a,pathname:bt([i,v.pathname]),pathnameBase:ef(bt([i,v.pathnameBase])),route:m}),v.pathnameBase!=="/"&&(i=bt([i,v.pathnameBase]))}return o}function Sl(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,s]=Kp(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:s.reduce((u,g,v)=>{let{paramName:m,isOptional:S}=g;if(m==="*"){let k=l[v]||"";o=i.slice(0,i.length-k.length).replace(/(.)\/+$/,"$1")}const C=l[v];return S&&!C?u[m]=void 0:u[m]=(C||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:o,pattern:e}}function Kp(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Vu(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let s=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c)=>(s.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(s.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),s]}function Xp(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Vu(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function lo(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,s=e.charAt(n);return s&&s!=="/"?null:e.slice(n)||"/"}function Jp(e,t){t===void 0&&(t="/");let{pathname:n,search:s="",hash:a=""}=typeof e=="string"?Cn(e):e;return{pathname:n?n.startsWith("/")?n:qp(n,t):t,search:tf(s),hash:nf(a)}}function qp(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function va(e,t,n,s){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Zp(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Yu(e,t){let n=Zp(e);return t?n.map((s,a)=>a===n.length-1?s.pathname:s.pathnameBase):n.map(s=>s.pathnameBase)}function Ku(e,t,n,s){s===void 0&&(s=!1);let a;typeof e=="string"?a=Cn(e):(a=mr({},e),te(!a.pathname||!a.pathname.includes("?"),va("?","pathname","search",a)),te(!a.pathname||!a.pathname.includes("#"),va("#","pathname","hash",a)),te(!a.search||!a.search.includes("#"),va("#","search","hash",a)));let i=e===""||a.pathname==="",o=i?"/":a.pathname,l;if(o==null)l=n;else{let v=t.length-1;if(!s&&o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),v-=1;a.pathname=m.join("/")}l=v>=0?t[v]:"/"}let c=Jp(a,l),u=o&&o!=="/"&&o.endsWith("/"),g=(i||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||g)&&(c.pathname+="/"),c}const bt=e=>e.join("/").replace(/\/\/+/g,"/"),ef=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),tf=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,nf=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function rf(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Xu=["post","put","patch","delete"];new Set(Xu);const sf=["get",...Xu];new Set(sf);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function pr(){return pr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},pr.apply(this,arguments)}const co=j.createContext(null),af=j.createContext(null),Qt=j.createContext(null),Hs=j.createContext(null),Gt=j.createContext({outlet:null,matches:[],isDataRoute:!1}),Ju=j.createContext(null);function of(e,t){let{relative:n}=t===void 0?{}:t;yr()||te(!1);let{basename:s,navigator:a}=j.useContext(Qt),{hash:i,pathname:o,search:l}=Zu(e,{relative:n}),c=o;return s!=="/"&&(c=o==="/"?s:bt([s,o])),a.createHref({pathname:c,search:l,hash:i})}function yr(){return j.useContext(Hs)!=null}function jr(){return yr()||te(!1),j.useContext(Hs).location}function qu(e){j.useContext(Qt).static||j.useLayoutEffect(e)}function uo(){let{isDataRoute:e}=j.useContext(Gt);return e?jf():lf()}function lf(){yr()||te(!1);let e=j.useContext(co),{basename:t,future:n,navigator:s}=j.useContext(Qt),{matches:a}=j.useContext(Gt),{pathname:i}=jr(),o=JSON.stringify(Yu(a,n.v7_relativeSplatPath)),l=j.useRef(!1);return qu(()=>{l.current=!0}),j.useCallback(function(u,g){if(g===void 0&&(g={}),!l.current)return;if(typeof u=="number"){s.go(u);return}let v=Ku(u,JSON.parse(o),i,g.relative==="path");e==null&&t!=="/"&&(v.pathname=v.pathname==="/"?t:bt([t,v.pathname])),(g.replace?s.replace:s.push)(v,g.state,g)},[t,s,o,i,e])}function Zu(e,t){let{relative:n}=t===void 0?{}:t,{future:s}=j.useContext(Qt),{matches:a}=j.useContext(Gt),{pathname:i}=jr(),o=JSON.stringify(Yu(a,s.v7_relativeSplatPath));return j.useMemo(()=>Ku(e,JSON.parse(o),i,n==="path"),[e,o,i,n])}function cf(e,t){return uf(e,t)}function uf(e,t,n,s){yr()||te(!1);let{navigator:a}=j.useContext(Qt),{matches:i}=j.useContext(Gt),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let u=jr(),g;if(t){var v;let D=typeof t=="string"?Cn(t):t;c==="/"||(v=D.pathname)!=null&&v.startsWith(c)||te(!1),g=D}else g=u;let m=g.pathname||"/",S=m;if(c!=="/"){let D=c.replace(/^\//,"").split("/");S="/"+m.replace(/^\//,"").split("/").slice(D.length).join("/")}let C=Op(e,{pathname:S}),k=hf(C&&C.map(D=>Object.assign({},D,{params:Object.assign({},l,D.params),pathname:bt([c,a.encodeLocation?a.encodeLocation(D.pathname).pathname:D.pathname]),pathnameBase:D.pathnameBase==="/"?c:bt([c,a.encodeLocation?a.encodeLocation(D.pathnameBase).pathname:D.pathnameBase])})),i,n,s);return t&&k?j.createElement(Hs.Provider,{value:{location:pr({pathname:"/",search:"",hash:"",state:null,key:"default"},g),navigationType:ht.Pop}},k):k}function df(){let e=yf(),t=rf(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},i=null;return j.createElement(j.Fragment,null,j.createElement("h2",null,"Unexpected Application Error!"),j.createElement("h3",{style:{fontStyle:"italic"}},t),n?j.createElement("pre",{style:a},n):null,i)}const mf=j.createElement(df,null);class pf extends j.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?j.createElement(Gt.Provider,{value:this.props.routeContext},j.createElement(Ju.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ff(e){let{routeContext:t,match:n,children:s}=e,a=j.useContext(co);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),j.createElement(Gt.Provider,{value:t},s)}function hf(e,t,n,s){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),s===void 0&&(s=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=s)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,l=(a=n)==null?void 0:a.errors;if(l!=null){let g=o.findIndex(v=>v.route.id&&(l==null?void 0:l[v.route.id])!==void 0);g>=0||te(!1),o=o.slice(0,Math.min(o.length,g+1))}let c=!1,u=-1;if(n&&s&&s.v7_partialHydration)for(let g=0;g<o.length;g++){let v=o[g];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(u=g),v.route.id){let{loaderData:m,errors:S}=n,C=v.route.loader&&m[v.route.id]===void 0&&(!S||S[v.route.id]===void 0);if(v.route.lazy||C){c=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((g,v,m)=>{let S,C=!1,k=null,D=null;n&&(S=l&&v.route.id?l[v.route.id]:void 0,k=v.route.errorElement||mf,c&&(u<0&&m===0?(wf("route-fallback",!1),C=!0,D=null):u===m&&(C=!0,D=v.route.hydrateFallbackElement||null)));let x=t.concat(o.slice(0,m+1)),p=()=>{let h;return S?h=k:C?h=D:v.route.Component?h=j.createElement(v.route.Component,null):v.route.element?h=v.route.element:h=g,j.createElement(ff,{match:v,routeContext:{outlet:g,matches:x,isDataRoute:n!=null},children:h})};return n&&(v.route.ErrorBoundary||v.route.errorElement||m===0)?j.createElement(pf,{location:n.location,revalidation:n.revalidation,component:k,error:S,children:p(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):p()},null)}var ed=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ed||{}),bs=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(bs||{});function gf(e){let t=j.useContext(co);return t||te(!1),t}function vf(e){let t=j.useContext(af);return t||te(!1),t}function xf(e){let t=j.useContext(Gt);return t||te(!1),t}function td(e){let t=xf(),n=t.matches[t.matches.length-1];return n.route.id||te(!1),n.route.id}function yf(){var e;let t=j.useContext(Ju),n=vf(bs.UseRouteError),s=td(bs.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[s]}function jf(){let{router:e}=gf(ed.UseNavigateStable),t=td(bs.UseNavigateStable),n=j.useRef(!1);return qu(()=>{n.current=!0}),j.useCallback(function(a,i){i===void 0&&(i={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,pr({fromRouteId:t},i)))},[e,t])}const Cl={};function wf(e,t,n){!t&&!Cl[e]&&(Cl[e]=!0)}function kf(e,t){e==null||e.v7_startTransition,(e==null?void 0:e.v7_relativeSplatPath)===void 0&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}function be(e){te(!1)}function Nf(e){let{basename:t="/",children:n=null,location:s,navigationType:a=ht.Pop,navigator:i,static:o=!1,future:l}=e;yr()&&te(!1);let c=t.replace(/^\/*/,"/"),u=j.useMemo(()=>({basename:c,navigator:i,static:o,future:pr({v7_relativeSplatPath:!1},l)}),[c,l,i,o]);typeof s=="string"&&(s=Cn(s));let{pathname:g="/",search:v="",hash:m="",state:S=null,key:C="default"}=s,k=j.useMemo(()=>{let D=lo(g,c);return D==null?null:{location:{pathname:D,search:v,hash:m,state:S,key:C},navigationType:a}},[c,g,v,m,S,C,a]);return k==null?null:j.createElement(Qt.Provider,{value:u},j.createElement(Hs.Provider,{children:n,value:k}))}function El(e){let{children:t,location:n}=e;return cf(mi(t),n)}new Promise(()=>{});function mi(e,t){t===void 0&&(t=[]);let n=[];return j.Children.forEach(e,(s,a)=>{if(!j.isValidElement(s))return;let i=[...t,a];if(s.type===j.Fragment){n.push.apply(n,mi(s.props.children,i));return}s.type!==be&&te(!1),!s.props.index||!s.props.children||te(!1);let o={id:s.props.id||i.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(o.children=mi(s.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function pi(){return pi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},pi.apply(this,arguments)}function bf(e,t){if(e==null)return{};var n={},s=Object.keys(e),a,i;for(i=0;i<s.length;i++)a=s[i],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Sf(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Cf(e,t){return e.button===0&&(!t||t==="_self")&&!Sf(e)}const Ef=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Df="6";try{window.__reactRouterVersion=Df}catch{}const Pf="startTransition",Dl=kd[Pf];function Tf(e){let{basename:t,children:n,future:s,window:a}=e,i=j.useRef();i.current==null&&(i.current=Rp({window:a,v5Compat:!0}));let o=i.current,[l,c]=j.useState({action:o.action,location:o.location}),{v7_startTransition:u}=s||{},g=j.useCallback(v=>{u&&Dl?Dl(()=>c(v)):c(v)},[c,u]);return j.useLayoutEffect(()=>o.listen(g),[o,g]),j.useEffect(()=>kf(s),[s]),j.createElement(Nf,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:o,future:s})}const _f=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",zf=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Yn=j.forwardRef(function(t,n){let{onClick:s,relative:a,reloadDocument:i,replace:o,state:l,target:c,to:u,preventScrollReset:g,viewTransition:v}=t,m=bf(t,Ef),{basename:S}=j.useContext(Qt),C,k=!1;if(typeof u=="string"&&zf.test(u)&&(C=u,_f))try{let h=new URL(window.location.href),w=u.startsWith("//")?new URL(h.protocol+u):new URL(u),d=lo(w.pathname,S);w.origin===h.origin&&d!=null?u=d+w.search+w.hash:k=!0}catch{}let D=of(u,{relative:a}),x=Lf(u,{replace:o,state:l,target:c,preventScrollReset:g,relative:a,viewTransition:v});function p(h){s&&s(h),h.defaultPrevented||x(h)}return j.createElement("a",pi({},m,{href:C||D,onClick:k||i?s:p,ref:n,target:c}))});var Pl;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Pl||(Pl={}));var Tl;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Tl||(Tl={}));function Lf(e,t){let{target:n,replace:s,state:a,preventScrollReset:i,relative:o,viewTransition:l}=t===void 0?{}:t,c=uo(),u=jr(),g=Zu(e,{relative:o});return j.useCallback(v=>{if(Cf(v,n)){v.preventDefault();let m=s!==void 0?s:Ns(u)===Ns(g);c(e,{replace:m,state:a,preventScrollReset:i,relative:o,viewTransition:l})}},[u,c,g,s,a,n,e,i,o,l])}const fn={MEMBER:"member",LEADER:"leader",DIRECTOR:"director"},Rf={[fn.MEMBER]:["view_schedules","view_team","view_announcements"],[fn.LEADER]:["view_schedules","view_team","view_announcements","edit_schedules","submit_orders"],[fn.DIRECTOR]:["view_schedules","view_team","view_announcements","edit_schedules","submit_orders","edit_team","edit_announcements","approve_orders","manage_users"]},qr=(e,t="solarpack2024")=>btoa(e+t).replace(/[^a-zA-Z0-9]/g,""),If={[qr("director")]:fn.DIRECTOR,[qr("leader")]:fn.LEADER,[qr("member")]:fn.MEMBER};class Mf{constructor(){this.currentUser=this.loadFromStorage()}authenticate(t){const n=qr(t),s=If[n];return s?(this.currentUser={level:s,permissions:Rf[s],loginTime:Date.now(),expiresAt:Date.now()+24*60*60*1e3},this.saveToStorage(),!0):!1}logout(){this.currentUser=null,localStorage.removeItem("solarpack_auth")}isAuthenticated(){return this.currentUser?Date.now()>this.currentUser.expiresAt?(this.logout(),!1):!0:!1}hasPermission(t){return this.isAuthenticated()?this.currentUser.permissions.includes(t):!1}getLevel(){return this.isAuthenticated()?this.currentUser.level:null}saveToStorage(){localStorage.setItem("solarpack_auth",JSON.stringify(this.currentUser))}loadFromStorage(){try{const t=localStorage.getItem("solarpack_auth");return t?JSON.parse(t):null}catch{return null}}extendSession(){this.isAuthenticated()&&(this.currentUser.expiresAt=Date.now()+24*60*60*1e3,this.saveToStorage())}}const W=new Mf;const Of=()=>{const[e,t]=j.useState(!1),[n,s]=j.useState(!1),[a,i]=j.useState(!1),[o,l]=j.useState(!1),[c,u]=j.useState(""),[g,v]=j.useState(""),[m,S]=j.useState(!1),C=jr(),k=uo();j.useEffect(()=>{i(W.isAuthenticated())},[C]),j.useEffect(()=>{i(W.isAuthenticated())},[]),j.useEffect(()=>{const _=O=>{o&&!O.target.closest(".auth-dropdown")&&l(!1)};return document.addEventListener("mousedown",_),()=>{document.removeEventListener("mousedown",_)}},[o]);const D=()=>{t(!e)},x=()=>{t(!1)},p=()=>{a?l(!o):d()},h=()=>{l(!1),k("/admin")},w=()=>{W.logout(),i(!1),l(!1),k("/")},d=()=>{s(!0),u(""),v("")},N=()=>{s(!1),u(""),v("")},b=_=>{_.preventDefault(),S(!0),v(""),setTimeout(()=>{W.authenticate(c)?(i(!0),N(),k("/admin")):v("Invalid password. Please try again."),S(!1)},500)};j.useEffect(()=>{t(!1)},[C]),j.useEffect(()=>{const _=()=>{window.innerWidth>767&&e&&t(!1)};return window.addEventListener("resize",_),()=>window.removeEventListener("resize",_)},[e]),j.useEffect(()=>(document.body.style.overflow=e?"hidden":"",()=>{document.body.style.overflow=""}),[e]);const P=_=>!!(_==="/"&&C.pathname==="/"||_!=="/"&&C.pathname.startsWith(_)),M=[{path:"/",label:"Home"},{path:"/app",label:"App"},{path:"/team",label:"Team"},{path:"/alumni",label:"Alumni"},{path:"/sponsors",label:"Sponsors"},{path:"/schedules",label:"Schedules"},{path:"/donate",label:"Donate"},{path:"/contact",label:"Contact"}];return r.jsxs(r.Fragment,{children:[r.jsxs("header",{className:"header",children:[r.jsxs(Yn,{to:"/",className:"logo",children:[r.jsx("img",{src:"/solarpack_logo.png",alt:"SolarPack logo"}),"SolarPack"]}),r.jsx("nav",{className:"nav",children:M.map(({path:_,label:O})=>r.jsx(Yn,{to:_,className:P(_)?"active":"",children:O},_))}),r.jsx("div",{className:"auth-section",children:a?r.jsxs("div",{className:"auth-dropdown",children:[r.jsxs("button",{className:"account-btn authenticated",onClick:p,children:[r.jsx("i",{className:"fas fa-user-check","aria-hidden":"true"}),r.jsx("span",{className:"auth-text",children:"Account"}),r.jsx("i",{className:"fas fa-chevron-down dropdown-arrow","aria-hidden":"true"})]}),o&&r.jsxs("div",{className:"dropdown-menu",children:[r.jsxs("button",{onClick:h,className:"dropdown-item",children:[r.jsx("i",{className:"fas fa-tachometer-alt","aria-hidden":"true"}),"Dashboard"]}),r.jsxs("button",{onClick:w,className:"dropdown-item logout",children:[r.jsx("i",{className:"fas fa-sign-out-alt","aria-hidden":"true"}),"Logout"]})]})]}):r.jsxs("button",{className:"account-btn",onClick:p,children:[r.jsx("i",{className:"fas fa-user","aria-hidden":"true"}),r.jsx("span",{className:"auth-text",children:"Sign In"})]})}),r.jsx("button",{className:"burger",onClick:D,"aria-label":"Toggle navigation",children:r.jsx("i",{className:`fas ${e?"fa-times":"fa-bars"}`,"aria-hidden":"true"})})]}),r.jsx("div",{className:`mobile-panel ${e?"open":""}`,onClick:x,children:r.jsxs("nav",{className:"m-nav",onClick:_=>_.stopPropagation(),children:[M.map(({path:_,label:O})=>r.jsx(Yn,{to:_,className:P(_)?"active":"",onClick:x,children:O},_)),r.jsx("div",{className:"mobile-auth",children:a?r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"mobile-auth-btn authenticated",onClick:h,children:[r.jsx("i",{className:"fas fa-tachometer-alt","aria-hidden":"true"}),"Dashboard"]}),r.jsxs("button",{className:"mobile-auth-btn logout",onClick:w,children:[r.jsx("i",{className:"fas fa-sign-out-alt","aria-hidden":"true"}),"Logout"]})]}):r.jsxs("button",{className:"mobile-auth-btn",onClick:d,children:[r.jsx("i",{className:"fas fa-user","aria-hidden":"true"}),"Sign In"]})})]})}),n&&r.jsx("div",{className:"modal-overlay",onClick:N,children:r.jsxs("div",{className:"login-modal",onClick:_=>_.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h2",{children:"Dashboard Sign In"}),r.jsx("button",{className:"close-btn",onClick:N,children:r.jsx("i",{className:"fas fa-times","aria-hidden":"true"})})]}),r.jsxs("form",{onSubmit:b,className:"login-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"password",children:"Password"}),r.jsx("input",{type:"password",id:"password",value:c,onChange:_=>u(_.target.value),placeholder:"Enter dashboard password",disabled:m,autoFocus:!0})]}),g&&r.jsxs("div",{className:"error-message",children:[r.jsx("i",{className:"fas fa-exclamation-triangle","aria-hidden":"true"}),g]}),r.jsx("button",{type:"submit",className:`submit-btn ${m?"loading":""}`,disabled:m||!c.trim(),children:m?r.jsxs(r.Fragment,{children:[r.jsx("i",{className:"fas fa-spinner fa-spin","aria-hidden":"true"}),"Signing In..."]}):r.jsxs(r.Fragment,{children:[r.jsx("i",{className:"fas fa-sign-in-alt","aria-hidden":"true"}),"Sign In"]})})]})]})})]})},Af=({children:e})=>r.jsxs(r.Fragment,{children:[r.jsx(Of,{}),r.jsx("main",{children:e}),r.jsx("footer",{className:"footer",children:"© 2025 NC State SolarPack. All rights reserved."})]});const Ff=()=>(j.useEffect(()=>{document.title="SolarPack"},[]),r.jsxs(r.Fragment,{children:[r.jsxs("section",{className:"hero",children:[r.jsx("img",{src:"/solarpack_logo.gif",alt:"SolarPack Logo"}),r.jsxs("div",{className:"hero-content",children:[r.jsx("h1",{children:"SolarPack"}),r.jsx("div",{className:"subtitle",children:"Solar Vehicle Team at NC State"}),r.jsx("p",{children:"Striving to break barriers in the sustainable vehicle industry with a hardworking group of over 80 passionate students. Join us in our journey to a more sustainable future for transportation."}),r.jsxs("a",{className:"donate-btn",href:"https://www.paypal.com/fundraiser/charity/3728956",target:"_blank",rel:"noopener","aria-label":"Donate to SolarPack via PayPal",children:[r.jsx("i",{className:"fab fa-paypal","aria-hidden":"true"}),"Donate"]})]})]}),r.jsxs("section",{className:"section",children:[r.jsx("img",{src:"/hero_shot.jpg",alt:"SolarPack Team"}),r.jsx("h2",{children:"Sustainable, Efficient, and Powerful."}),r.jsx("p",{children:"As NC State's first solar vehicle team, we are aiming to show the world that solar energy can be used to power a car. Along the way, we are making a solar vehicle no other team has done before."})]}),r.jsxs("section",{className:"section features",children:[r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"earth-outline"}),r.jsx("h3",{children:"Global Impact"}),r.jsx("p",{children:"We're showing the world that solar energy can power a multi-occupancy car. By building a vehicle no one has seen before, we hope to prove that sustainability and power can go hand in hand."})]}),r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"cog-outline"}),r.jsx("h3",{children:"Engineering Excellence"}),r.jsx("p",{children:"Our team thrives on creative problem solving. Members develop real-world skills as they tackle unique engineering challenges throughout our build process."})]}),r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"bulb-outline"}),r.jsx("h3",{children:"Innovation"}),r.jsx("p",{children:"Pioneering new solutions, our members are always innovating—using every resource to bring big ideas to life and push the boundaries of solar vehicle technology."})]}),r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"hand-left-outline"}),r.jsx("h3",{children:"Collaboration"}),r.jsx("p",{children:"We partner with companies and alumni to guide our journey, building strong relationships as we promote the future of energy-efficient vehicles."})]}),r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"location-outline"}),r.jsx("h3",{children:"Rooted in the Triangle"}),r.jsx("p",{children:"Proudly representing the Research Triangle, we embody the spirit of innovation and excellence that defines our region—driving forward as leaders in sustainable technology."})]})]}),r.jsx(Bf,{}),r.jsxs("div",{className:"socials",children:[r.jsx("a",{href:"https://www.instagram.com/solarpacknc/",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-instagram"})}),r.jsx("a",{href:"https://www.linkedin.com/company/solarpack-nc-state/",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-linkedin"})}),r.jsx("a",{href:"https://www.facebook.com/SolarPackNC/",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-facebook"})})]})]})),Bf=()=>{const[e,t]=j.useState(0),n=j.useRef(null),s=j.useRef(null),[a,i]=j.useState(320),[o,l]=j.useState(0),[c,u]=j.useState(0),g=["/race2025/race2025_1.jpg","/race2025/race2025_2.jpg","/race2025/race2025_3.jpg","/race2025/race2025_4.jpg","/race2025/race2025_5.jpg","/race2025/race2025_6.jpg","/race2025/race2025_7.jpg","/race2025/race2025_8.jpg","/race2025/race2025_9.jpg"],v=()=>{if(n.current&&s.current){const d=n.current.querySelector(".carousel-slide");if(d){const N=d.getBoundingClientRect(),b=s.current.getBoundingClientRect();i(N.width),l(b.width),u(Math.round((b.width-N.width)/2))}}};j.useEffect(()=>{v();const d=new ResizeObserver(v);return s.current&&d.observe(s.current),()=>d.disconnect()},[]);const m=19.2,S=d=>{t(d)},C=()=>{t(d=>(d+1)%g.length)},k=()=>{t(d=>(d-1+g.length)%g.length)},D=-Math.round(e*(a+m))+c,[x,p]=j.useState(null),h=d=>{p(d)},w=d=>{if(x!==null){const N=d-x;N<-30?C():N>30&&k(),p(null)}};return r.jsxs("section",{className:"section race-carousel",children:[r.jsx("h2",{children:"2025 Race Highlights"}),r.jsxs("div",{className:"carousel-container",children:[r.jsx("button",{className:"carousel-arrow left",onClick:k,"aria-label":"Previous",children:r.jsx("i",{className:"fas fa-chevron-left"})}),r.jsx("div",{className:"carousel-viewport",ref:s,onMouseDown:d=>h(d.pageX),onMouseUp:d=>w(d.pageX),onTouchStart:d=>h(d.touches[0].pageX),onTouchEnd:d=>w(d.changedTouches[0].pageX),children:r.jsx("div",{className:"carousel-track",ref:n,style:{transform:`translateX(${D}px)`},children:g.map((d,N)=>r.jsx("div",{className:"carousel-slide",children:r.jsx("img",{src:d,alt:`Race 2025 Image ${N+1}`})},N))})}),r.jsx("button",{className:"carousel-arrow right",onClick:C,"aria-label":"Next",children:r.jsx("i",{className:"fas fa-chevron-right"})}),r.jsx("div",{className:"carousel-dots",children:g.map((d,N)=>r.jsx("span",{className:`dot ${N===e?"active":""}`,onClick:()=>S(N)},N))})]})]})},$f=()=>{const[e,t]=j.useState(null);j.useEffect(()=>{document.title="SolarPack · App"},[]);const n=i=>{t(i),document.body.style.overflow="hidden"},s=()=>{t(null),document.body.style.overflow=""};j.useEffect(()=>{const i=o=>{o.key==="Escape"&&s()};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[]);const a={ipad1:{image:"/images/ipad-app/Ipad 1.png",title:"Home Page",description:"The Home Page is the main dashboard for the app, providing a real-time overview of all critical vehicle and system stats. It is designed for quick-glance monitoring and immediate access to the most important data.",features:["Live Gauges: Speed, RPM, and current draw with animated arc gauges","Battery & Solar Info: Battery voltage, wattage, solar voltage, and solar power","Temperature Readouts: Motor and inverter temperatures","System Status Indicator: Animated status dot and label","Responsive Layout: Optimized for iPad with large, easy-to-read values"]},ipad2:{image:"/images/ipad-app/Ipad 2.png",title:"BMS Page",description:"The BMS (Battery Management System) Page provides a detailed, real-time overview of battery pack health, cell-level data, and system status. Essential for monitoring, diagnostics, and troubleshooting of the battery system.",features:["Pack Overview: Total battery voltage, current draw, wattage, and 12V battery voltage","State Badges: Charging/discharging status and enable signals","Cell Grid: 10×10 grid of all cell voltages and temperatures, labeled and color-coded","Fault Codes: Lists active BMS fault codes","Status Indicator: Animated status dot and label for BMS power state"]},ipad3:{image:"/images/ipad-app/Ipad 3.png",title:"Motor Controller Page",description:"The Motor Controller Page provides a comprehensive, real-time view of the traction motor and its controller, including RPM, temperatures, voltages, and cooling system status. Essential for monitoring drive performance and diagnosing issues.",features:["RPM Gauge: Large animated arc gauge for motor RPM","Temperature Readouts: Motor and controller (inverter) temperatures","Voltage Monitoring: High-voltage and 12V system voltages","Cooling System Status: Visual indicators for radiator and pump status","System Status Indicator: Header with animated status dot and label"]},ipad4:{image:"/images/ipad-app/Ipad 4.png",title:"Charging Page",description:"The Charging Page provides a comprehensive, real-time overview of battery pack and solar charging status, including charge rates, voltages, estimated time remaining, and solar-only mode controls. Essential for monitoring charging performance and managing energy sources.",features:["Charging Status: Charger plugged in, requested current, charge rate, and pack voltage","Solar Charging: Solar voltage, amps, power, and charger status","Battery Visualization: Large battery icon with animated fill","Estimated Time Remaining: Calculates time to full charge","Solar-Only Mode: Toggle switch for solar-only charging","Rolling Line Chart: Real-time chart of charge rates"]},ipad5:{image:"/images/ipad-app/Ipad 5.png",title:"Low Voltage Page",description:"The Low Voltage Page provides a real-time overview of board health and auxiliary systems, including a grid of board status indicators and ignition mode controls. Essential for monitoring the health of low-voltage electronics and managing ignition states.",features:["Board Health Grid: 2×3 grid of board cards showing status (OK, Fault, Offline)","Ignition Mode Control: View and adjust ignition mode (OFF, ACC, ON, START)","Status Indicators: Animated status dots for live feedback","Responsive Layout: Optimized for iPad with grid-based design and large icons"]}};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
          display: ${e?"flex":"none"};
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
      `}),r.jsxs("section",{className:"section",style:{textAlign:"center"},children:[r.jsx("h1",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"3rem",color:"var(--accent)",marginBottom:"1.2rem"},children:"SolarPack App"}),r.jsx("p",{style:{color:"var(--subtxt)",fontSize:"1.2rem",maxWidth:"600px",margin:"0 auto 2.2rem"},children:"Welcome to the SolarPack App page! Here you'll find information about our mobile and web applications, features, and how to get involved as a user or developer."}),r.jsxs("div",{className:"app-buttons-row",children:[r.jsx("a",{href:"https://apps.apple.com/us/app/solarpack/id6748289347",children:r.jsx("img",{src:"/images/app_store.png",alt:"Download on the App Store",style:{height:"60px",width:"auto",boxShadow:"none",background:"none"}})}),r.jsx("a",{href:"https://solarpack-app-server-alyv.onrender.com/#",style:{textDecoration:"none"},target:"_blank",rel:"noopener noreferrer",children:r.jsxs("button",{style:{background:"var(--accent)",color:"#fff",fontFamily:"'Bebas Neue', sans-serif",fontSize:"1.3rem",fontWeight:"bold",letterSpacing:"2px",padding:"1.0rem 2.2rem",display:"flex",alignItems:"center",gap:"0.7rem",border:"none",borderRadius:"10px",boxShadow:"0 2px 12px #0003",cursor:"pointer",transition:"background 0.2s",textTransform:"uppercase"},children:[r.jsx("i",{className:"fas fa-satellite-dish",style:{fontSize:"1.5rem"}}),"VIEW LIVE TELEMETRY"]})})]}),r.jsx("div",{className:"screenshots-container",children:r.jsx("div",{className:"screenshots-grid",children:Object.entries(a).map(([i,o])=>r.jsxs("div",{className:"screenshot-card",onClick:()=>n(i),children:[r.jsx("img",{src:o.image,alt:`iPad Screenshot ${i.slice(-1)}`}),r.jsxs("div",{className:"screenshot-overlay",children:[r.jsx("div",{className:"screenshot-title",children:o.title}),r.jsxs("div",{className:"screenshot-preview",children:["Click to learn more about the ",o.title.toLowerCase()," features..."]})]})]},i))})}),e&&a[e]&&r.jsx("div",{className:"modal-overlay",onClick:i=>i.target===i.currentTarget&&s(),children:r.jsxs("div",{className:"modal-content",children:[r.jsx("button",{className:"close-btn",onClick:s,children:"×"}),r.jsx("div",{className:"modal-image",children:r.jsx("img",{src:a[e].image,alt:a[e].title})}),r.jsxs("div",{className:"modal-details",children:[r.jsx("h2",{className:"modal-title",children:a[e].title}),r.jsx("p",{className:"modal-description",children:a[e].description}),r.jsx("ul",{className:"modal-features",children:a[e].features.map((i,o)=>r.jsx("li",{children:i},o))})]})]})})]}),r.jsx("div",{style:{textAlign:"center",margin:"2.5rem 0 0",fontSize:"0.98rem"},children:r.jsx("a",{href:"/privacy-policy",style:{color:"var(--accent)",textDecoration:"none",opacity:"0.8",transition:"opacity 0.2s"},children:"Privacy & Data Policy"})})]})},Uf=()=>{const[e,t]=j.useState([]),[n,s]=j.useState(!0);j.useEffect(()=>{document.title="SolarPack · Alumni",(async()=>{try{const l=await fetch("/data/alumni.json");if(l.ok){const c=await l.json();t(c.alumniData||[])}else t([])}catch(l){console.error("Error loading alumni.json",l),t([])}finally{s(!1)}})()},[]);const a=e.slice(0,Math.ceil(e.length/2)),i=e.slice(Math.ceil(e.length/2));return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsx("h1",{children:"Alumni"}),r.jsx("div",{className:"alumni-grid"}),r.jsx("div",{className:"alumni-by-year",children:r.jsxs("div",{className:"alumni-columns",children:[r.jsx("div",{children:a.map((o,l)=>{var c;return r.jsxs("section",{className:"alumni-section",children:[r.jsx("h2",{children:o.semester}),r.jsx("ul",{children:(c=o.leadership)==null?void 0:c.map((u,g)=>r.jsxs("li",{children:[r.jsxs("b",{children:[u.role,":"]})," ",u.name]},g))})]},l)})}),r.jsx("div",{children:i.map((o,l)=>{var c;return r.jsxs("section",{className:"alumni-section",children:[r.jsx("h2",{children:o.semester}),r.jsx("ul",{children:(c=o.leadership)==null?void 0:c.map((u,g)=>r.jsxs("li",{children:[r.jsxs("b",{children:[u.role,":"]})," ",u.name]},g))})]},l)})})]})})]})},Hf=()=>(j.useEffect(()=>{document.title="SolarPack · Contact"},[]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsx("h1",{children:"Contact Us"}),r.jsxs("div",{className:"contact-section",children:[r.jsxs("div",{className:"contact-info",children:[r.jsxs("p",{children:["Email us at ",r.jsx("a",{href:"mailto:solarpacknc@ncsu.edu",children:"solarpacknc@ncsu.edu"})]}),r.jsx("p",{children:"Or reach out on our socials below!"})]}),r.jsxs("div",{className:"contact-socials",children:[r.jsx("a",{href:"https://www.instagram.com/solarpacknc/",title:"Instagram",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-instagram"})}),r.jsx("a",{href:"https://www.linkedin.com/company/solarpack-nc-state/",title:"LinkedIn",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-linkedin"})}),r.jsx("a",{href:"https://www.facebook.com/SolarPackNC/",title:"Facebook",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-facebook"})})]})]})]})),Wf=()=>{const[e,t]=j.useState(null),[n,s]=j.useState(""),[a,i]=j.useState(!1);j.useEffect(()=>{document.title="SolarPack · Donate"},[]);const o=[5,50,100,200],l=g=>{t(g),s(g.toString()),i(!0)},c=g=>{const v=g.target.value;s(v),v&&parseFloat(v)>=1?(t(parseFloat(v)),i(!0)):i(!1)},u=()=>{e&&e>=1&&window.open("https://www.paypal.com/fundraiser/charity/3728956","_blank")};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsx("h1",{children:"Support Our Mission"}),r.jsxs("div",{className:"donate-section",children:[r.jsx("p",{children:"Your donation helps us build, innovate, and compete in solar car challenges. Every contribution makes a difference!"}),r.jsxs("form",{style:{margin:"2rem 0"},children:[r.jsxs("div",{style:{marginBottom:"1.2rem"},children:[r.jsx("label",{htmlFor:"donation-amount",style:{fontWeight:"600",marginBottom:"0.7rem",display:"block"},children:"Choose an amount:"}),r.jsxs("div",{className:"donation-choices-group",children:[o.map(g=>r.jsxs("button",{type:"button",className:`donation-choice ${e===g?"active":""}`,onClick:()=>l(g),children:["$",g]},g)),r.jsx("input",{type:"number",min:"1",step:"1",id:"donation-amount",placeholder:"Custom amount",value:n,onChange:c})]})]}),a&&e&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"selected-amount-display",children:["You are donating: $",parseFloat(e).toFixed(2)]}),r.jsxs("button",{type:"button",className:"donate-btn",onClick:u,children:[r.jsx("i",{className:"fab fa-paypal",style:{marginRight:"0.5rem"}}),"Donate with PayPal"]})]})]}),r.jsxs("ul",{className:"donation-uses",children:[r.jsxs("li",{children:[r.jsx("b",{children:"Aeroshell Construction:"})," The largest portion of your donation will go directly toward building our new carbon fiber aeroshell, which is essential for our car's performance and efficiency."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Regulatory Components:"})," We need to purchase fasteners, wires, and other small accessories to meet strict race regulations—including the battery box, ballast boxes, and other required safety features."]}),r.jsxs("li",{children:[r.jsx("b",{children:"2026 Race Preparation:"})," Your support helps us meet all technical and safety requirements so we can compete in the 2026 solar car race and represent NC State on a national stage."]})]}),r.jsx("p",{className:"donate-note",children:"We are a 501(c)(3) charitable organization, EIN: 81-4817863. All the contributions are tax deductible. No goods or services will be provided for the contribution."})]})]})};const Vf=()=>{const[e,t]=j.useState({0:!0});j.useEffect(()=>{document.title="SolarPack · Privacy Policy"},[]);const n=a=>{t(i=>({...i,[a]:!i[a]}))},s=[{title:"Summary",content:r.jsxs("p",{children:["We collect a minimal set of data points ",r.jsx("strong",{children:"only"})," to make the app function and to help us understand and improve performance. We do",r.jsx("em",{children:" not"})," use your data for advertising, marketing, personalization, or tracking across other apps."]})},{title:"Data We Collect",content:r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("strong",{children:"Precise Location"})," – Enables GPS-based features such as lap timing and detailed telemetry."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Coarse Location"})," – Provides general region information (e.g., for Bluetooth proximity) when precise GPS is unnecessary."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Device ID"})," – Helps differentiate hardware models and debug device-specific issues."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Product Interaction"})," – Anonymous aggregate data on how you navigate the app (e.g., tab switches) to improve user experience."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Crash Data"})," – Automatic crash reports allow us to diagnose bugs and improve stability."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Performance Data"})," – Metrics like launch time and connection latency help us monitor and optimize performance."]})]})},{title:"Data We Don't Collect",content:r.jsxs("ul",{children:[r.jsx("li",{children:"Contact information (name, email, phone, address)"}),r.jsx("li",{children:"User-generated content (photos, messages, files)"}),r.jsx("li",{children:"Payment or financial details"}),r.jsx("li",{children:"Advertising identifiers or usage for ad targeting"}),r.jsx("li",{children:"Health, biometric, or other sensitive personal data"})]})},{title:"Tracking",content:r.jsxs("p",{children:["Our app ",r.jsx("strong",{children:"does not"})," use any data for cross-app or cross-company tracking as defined by Apple. No data is shared with data brokers or ad networks."]})},{title:"Third-Party Services",content:r.jsx("p",{children:"We use trusted third-party services (e.g., Firebase) solely for analytics, crash reporting, and cloud data storage. Each provider is contractually bound to process data only on our behalf and not for their own marketing or advertising."})},{title:"Data Retention",content:r.jsx("p",{children:"Telemetry and analytics data are stored for the shortest duration necessary to fulfill the purposes outlined above, after which they are either deleted or fully anonymized."})},{title:"Contact Us",content:r.jsxs("p",{children:["Questions? Open an issue on"," ",r.jsx("a",{href:"https://github.com/NCSU-Solarpack",target:"_blank",rel:"noopener noreferrer",children:"GitHub"})," ","or email us at"," ",r.jsx("a",{href:"mailto:solarpacknc@ncsu.edu",children:"solarpacknc@ncsu.edu"}),"."]})}];return r.jsxs("div",{className:"privacy-container",children:[r.jsx("h1",{children:"SOLARPACK Privacy & Data"}),r.jsxs("div",{className:"effective-date",children:[r.jsx("strong",{children:"Effective Date:"})," July 8, 2025"]}),r.jsx("div",{id:"policy",children:s.map((a,i)=>r.jsxs("div",{className:"policy-section",children:[r.jsxs("button",{className:"policy-toggle",onClick:()=>n(i),children:[r.jsx("span",{className:"chevron",style:{transform:e[i]?"rotate(90deg)":"rotate(0deg)"},children:"›"}),a.title.includes("Don't")?r.jsxs(r.Fragment,{children:["Data We ",r.jsx("em",{children:"Don't"})," Collect"]}):a.title]}),r.jsx("div",{className:`policy-content ${e[i]?"open":""}`,children:a.content})]},i))}),r.jsx("div",{className:"footer-note",children:"— End of Policy —"})]})},Qf=()=>{const[e,t]=j.useState([]),[n,s]=j.useState(!0);return j.useEffect(()=>{document.title="SolarPack · Sponsors",(async()=>{try{const i=await fetch("/data/sponsors.json");if(i.ok){const o=await i.json();t(o.sponsorTiers||[])}else t([])}catch(i){console.error("Error loading sponsors.json",i),t([])}finally{s(!1)}})()},[]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsxs("main",{children:[r.jsx("h1",{children:"Sponsors"}),e.map((a,i)=>r.jsxs("section",{className:"tier",children:[r.jsx("h2",{children:a.tier}),r.jsx("div",{className:"sponsor-logos",children:a.sponsors&&a.sponsors.length>0?a.sponsors.map((o,l)=>r.jsx("img",{src:o.image,alt:o.name,title:o.name},l)):r.jsx("span",{className:"placeholder",children:a.placeholder||`No ${a.tier.toLowerCase()} yet.`})})]},i)),r.jsxs("p",{className:"sponsor-contact",children:["Interested in sponsoring Fenrir or supporting our team?"," ",r.jsx("a",{href:"https://www.paypal.com/fundraiser/charity/3728956",target:"_blank",rel:"noopener",children:"Donate"})," ","or"," ",r.jsx("a",{href:"/contact",children:"Contact us"})," for more info!"]})]})]})},Gf=()=>{const[e,t]=j.useState([]),[n,s]=j.useState(!0),[a,i]=j.useState(null);j.useEffect(()=>{document.title="SolarPack · Team",o()},[]);const o=async()=>{try{const l=await fetch("/data/team.json");if(!l.ok)throw new Error("Failed to load team data");const u=(await l.json()).teamMembers.sort((g,v)=>(g.order||0)-(v.order||0));t(u)}catch(l){console.error("Error loading team data:",l),i(l.message),t([])}finally{s(!1)}};return n?r.jsx("div",{style:{textAlign:"center",padding:"4rem",color:"var(--subtxt)"},children:"Loading team data..."}):a?r.jsxs("div",{style:{textAlign:"center",padding:"4rem",color:"#dc3545"},children:["Error loading team data: ",a]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsx("h1",{children:"Meet the Team"}),r.jsx("div",{className:"team-grid",children:e.map((l,c)=>r.jsxs("div",{className:"member-card",children:[r.jsx("img",{src:l.image,alt:l.name,className:"member-img"}),r.jsx("div",{className:"member-name",children:l.name}),r.jsx("div",{className:"member-role",children:l.role}),r.jsx("p",{className:"member-bio",children:l.bio})]},c))})]})};const Yf=({projects:e=[],events:t=[],onItemClick:n,selectedTeam:s="all",teams:a=[]})=>{const[i,o]=j.useState(new Date),[l,c]=j.useState([]);j.useEffect(()=>{u()},[i,e,t,s]);const u=()=>{const h=i.getFullYear(),w=i.getMonth(),d=new Date(h,w,1),b=new Date(h,w+1,0).getDate(),P=d.getDay(),M=[];let _=1;for(let O=0;O<6;O++){const Q=[];for(let y=0;y<7;y++)if(O*7+y<P||_>b)Q.push(null);else{const E=new Date(h,w,_),R={date:_,fullDate:E,isToday:g(E),events:v(E),projects:m(E),isWeekend:y===0||y===6};Q.push(R),_++}if(M.push(Q),_>b)break}c(M)},g=h=>{const w=new Date;return h.toDateString()===w.toDateString()},v=h=>t.filter(w=>{const N=new Date(w.date).toDateString()===h.toDateString(),b=s==="all"||w.team===s;return N&&b}),m=h=>{const w=[];return e.forEach(d=>{if(!(s==="all"||d.team===s))return;const b=new Date(d.startDate),P=new Date(d.dueDate);b.toDateString()===h.toDateString()&&w.push({...d,type:"project-start",displayType:"start"}),P.toDateString()===h.toDateString()&&w.push({...d,type:"project-due",displayType:"due"}),d.tasks.forEach(M=>{new Date(M.dueDate).toDateString()===h.toDateString()&&w.push({...M,type:"task-due",displayType:"task",projectTitle:d.title,projectTeam:d.team})})}),w},S=h=>{const w=a.find(d=>d.id===h);return w?w.color:"#6c757d"},C=(h,w)=>{if(w==="completed")return!1;const d=new Date;return new Date(h)<d},k=h=>{o(w=>{const d=new Date(w);return d.setMonth(w.getMonth()+h),d})},D=()=>{o(new Date)},x=["January","February","March","April","May","June","July","August","September","October","November","December"],p=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return r.jsxs("div",{className:"calendar-container",children:[r.jsxs("div",{className:"calendar-header",children:[r.jsxs("div",{className:"calendar-nav",children:[r.jsx("button",{onClick:()=>k(-1),className:"nav-btn",children:"← Previous"}),r.jsx("button",{onClick:D,className:"today-btn",children:"Today"}),r.jsx("button",{onClick:()=>k(1),className:"nav-btn",children:"Next →"})]}),r.jsxs("h2",{className:"calendar-title",children:[x[i.getMonth()]," ",i.getFullYear()]})]}),r.jsxs("div",{className:"calendar-grid",children:[r.jsx("div",{className:"calendar-header-row",children:p.map(h=>r.jsx("div",{className:"day-header",children:h},h))}),l.map((h,w)=>r.jsx("div",{className:"calendar-week",children:h.map((d,N)=>r.jsx("div",{className:`calendar-day ${d?"":"empty"} ${d!=null&&d.isToday?"today":""} ${d!=null&&d.isWeekend?"weekend":""}`,children:d&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"day-number",children:d.date}),r.jsxs("div",{className:"day-items",children:[d.events.map(b=>r.jsxs("div",{className:"calendar-item event-item",style:{backgroundColor:S(b.team)},onClick:()=>n(b,"event"),title:`${b.title} - ${b.startTime}`,children:[r.jsx("span",{className:"item-indicator",children:"📅"}),r.jsx("span",{className:"item-title",children:b.title})]},`event-${b.id}`)),d.projects.map((b,P)=>r.jsxs("div",{className:`calendar-item project-item ${b.displayType==="due"?"due-item":""} ${C(b.dueDate,b.status)?"overdue-item":""}`,style:{backgroundColor:b.displayType==="task"?S(b.projectTeam):S(b.team),opacity:b.displayType==="start"?.7:1},onClick:()=>n(b,b.type),title:b.displayType==="start"?`${b.title} - Starts`:b.displayType==="due"?`${b.title} - Due`:`${b.title} - Task Due`,children:[r.jsx("span",{className:"item-indicator",children:b.displayType==="start"?"🚀":b.displayType==="due"?"🎯":"✅"}),r.jsx("span",{className:"item-title",children:(b.displayType==="task",b.title)})]},`project-${b.id}-${P}`))]})]})},N))},w))]}),r.jsxs("div",{className:"calendar-legend",children:[r.jsx("h3",{children:"Legend"}),r.jsxs("div",{className:"legend-items",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-indicator",children:"📅"}),r.jsx("span",{children:"Events"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-indicator",children:"🚀"}),r.jsx("span",{children:"Project Start"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-indicator",children:"🎯"}),r.jsx("span",{children:"Project Due"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-indicator",children:"✅"}),r.jsx("span",{children:"Task Due"})]})]})]})]})};const Kf=()=>{const[e,t]=j.useState({teams:[],projects:[],events:[],lastUpdated:""}),[n,s]=j.useState(!0),[a,i]=j.useState("all"),[o,l]=j.useState("projects"),[c,u]=j.useState(null),[g,v]=j.useState(null);j.useEffect(()=>{m()},[]);const m=async()=>{try{const N=await(await fetch("/data/schedules.json")).json();t(N)}catch(d){console.error("Error loading schedule data:",d)}finally{s(!1)}},S=d=>{const N=e.teams.find(b=>b.id===d);return N?N.name:d},C=d=>{const N=e.teams.find(b=>b.id===d);return N?N.color:"#6c757d"},k=(d,N)=>{if(N==="completed")return!1;const b=new Date;return new Date(d)<b},D=(d,N)=>{if(k(N,d))return"#dc3545";switch(d){case"completed":return"#28a745";case"in-progress":return"#007bff";case"pending":return"#ffc107";case"planning":return"#6c757d";case"critical":return"#dc3545";default:return"#6c757d"}},x=(d,N="team")=>a==="all"?d:d.filter(b=>b[N]===a),p=()=>{const d=new Date,N=new Date(d.getTime()+7*24*60*60*1e3);return e.events.filter(b=>{const P=new Date(b.date);return P>=d&&P<=N}).sort((b,P)=>new Date(b.date)-new Date(P.date))},h=(d,N)=>{if(N==="event")v(d);else if(N.includes("project")){const b=e.projects.find(P=>P.id===d.id);b&&u(b)}else if(N==="task-due"){const b=e.projects.find(P=>P.tasks.some(M=>M.id===d.id));b&&u(b)}},w=()=>{const d=[];return e.projects.forEach(N=>{k(N.dueDate,N.status)&&d.push({...N,type:"project"}),N.tasks.forEach(b=>{k(b.dueDate,b.status)&&d.push({...b,type:"task",projectTitle:N.title})})}),d.sort((N,b)=>new Date(N.dueDate)-new Date(b.dueDate))};return n?r.jsx("div",{className:"schedules-page",children:r.jsxs("div",{className:"loading",children:[r.jsx("div",{className:"loading-spinner"}),r.jsx("p",{children:"Loading schedules..."})]})}):r.jsxs("div",{className:"schedules-page",children:[r.jsxs("div",{className:"schedules-header",children:[r.jsx("h1",{children:"Project Schedules"}),r.jsx("p",{children:"Track progress across all teams and projects"})]}),r.jsxs("div",{className:"stats-grid",children:[r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"📊"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("h3",{children:e.projects.length}),r.jsx("p",{children:"Active Projects"})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"⏰"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("h3",{children:p().length}),r.jsx("p",{children:"Upcoming Events"})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"⚠️"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("h3",{children:w().length}),r.jsx("p",{children:"Overdue Items"})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"👥"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("h3",{children:e.teams.length}),r.jsx("p",{children:"Teams"})]})]})]}),r.jsxs("div",{className:"schedule-tabs",children:[r.jsx("button",{className:`tab ${o==="projects"?"active":""}`,onClick:()=>l("projects"),children:"Projects"}),r.jsx("button",{className:`tab ${o==="calendar"?"active":""}`,onClick:()=>l("calendar"),children:"Calendar"}),r.jsxs("button",{className:`tab ${o==="overdue"?"active":""}`,onClick:()=>l("overdue"),children:["Overdue (",w().length,")"]})]}),r.jsxs("div",{className:"filters",children:[r.jsx("label",{htmlFor:"team-select",children:"Filter by Team:"}),r.jsxs("select",{id:"team-select",value:a,onChange:d=>i(d.target.value),children:[r.jsx("option",{value:"all",children:"All Teams"}),e.teams.map(d=>r.jsx("option",{value:d.id,children:d.name},d.id))]})]}),o==="projects"&&r.jsx("div",{className:"projects-section",children:r.jsx("div",{className:"projects-grid",children:x(e.projects).map(d=>r.jsxs("div",{className:`project-card ${k(d.dueDate,d.status)?"overdue":""}`,onClick:()=>u(d),children:[r.jsxs("div",{className:"project-header",children:[r.jsxs("div",{children:[r.jsx("h3",{children:d.title}),r.jsx("div",{className:"team-badge",style:{backgroundColor:C(d.team)},children:S(d.team)})]}),r.jsx("div",{className:"status-badge",style:{backgroundColor:D(d.status,d.dueDate)},children:k(d.dueDate,d.status)?"OVERDUE":d.status.toUpperCase()})]}),r.jsx("p",{className:"project-description",children:d.description}),r.jsxs("div",{className:"progress-section",children:[r.jsxs("div",{className:"progress-header",children:[r.jsxs("span",{children:["Progress: ",d.progress,"%"]}),r.jsxs("span",{className:"hours",children:[d.actualHours,"/",d.estimatedHours,"h"]})]}),r.jsx("div",{className:"progress-bar",children:r.jsx("div",{className:"progress-fill",style:{width:`${d.progress}%`,backgroundColor:C(d.team)}})})]}),r.jsxs("div",{className:"project-meta",children:[r.jsxs("div",{className:"meta-item",children:[r.jsx("strong",{children:"Assigned:"})," ",d.assignedTo]}),r.jsxs("div",{className:"meta-item",children:[r.jsx("strong",{children:"Due:"})," ",new Date(d.dueDate).toLocaleDateString()]}),r.jsxs("div",{className:"meta-item",children:[r.jsx("strong",{children:"Priority:"}),r.jsx("span",{className:`priority ${d.priority}`,children:d.priority})]})]}),d.tasks.length>0&&r.jsxs("div",{className:"tasks-preview",children:[r.jsxs("h4",{children:["Tasks (",d.tasks.length,")"]}),r.jsxs("div",{className:"task-status-overview",children:[d.tasks.slice(0,3).map(N=>r.jsxs("div",{className:"mini-task",style:{borderLeft:`3px solid ${D(N.status,N.dueDate)}`},children:[r.jsx("span",{className:"task-name",children:N.title}),r.jsxs("span",{className:"task-progress",children:[N.progress,"%"]})]},N.id)),d.tasks.length>3&&r.jsxs("div",{className:"more-tasks",children:["+",d.tasks.length-3," more"]})]})]})]},d.id))})}),o==="calendar"&&r.jsxs("div",{className:"calendar-section",children:[r.jsx(Yf,{projects:x(e.projects),events:x(e.events),teams:e.teams,selectedTeam:a,onItemClick:h}),r.jsxs("div",{className:"upcoming-events",children:[r.jsx("h2",{children:"Upcoming Events (Next 7 Days)"}),r.jsxs("div",{className:"events-list",children:[p().map(d=>r.jsxs("div",{className:"event-card",onClick:()=>v(d),style:{borderLeft:`4px solid ${C(d.team)}`},children:[r.jsx("div",{className:"event-date",children:new Date(d.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}),r.jsxs("div",{className:"event-content",children:[r.jsx("h3",{children:d.title}),r.jsx("p",{children:d.description}),r.jsxs("div",{className:"event-meta",children:[r.jsxs("span",{className:"time",children:[d.startTime," - ",d.endTime]}),r.jsx("span",{className:"team",children:S(d.team)}),r.jsx("span",{className:"location",children:d.location})]})]})]},d.id)),p().length===0&&r.jsx("div",{className:"no-events",children:r.jsx("p",{children:"No upcoming events in the next 7 days"})})]})]}),r.jsxs("div",{className:"all-events",children:[r.jsx("h2",{children:"All Events"}),r.jsx("div",{className:"events-grid",children:x(e.events).map(d=>r.jsxs("div",{className:"event-card-small",onClick:()=>v(d),children:[r.jsxs("div",{className:"event-header",children:[r.jsx("div",{className:"event-date-small",children:new Date(d.date).toLocaleDateString()}),r.jsx("div",{className:"event-type",style:{backgroundColor:C(d.team)},children:d.type})]}),r.jsx("h3",{children:d.title}),r.jsx("p",{children:d.description}),r.jsxs("div",{className:"event-meta-small",children:[r.jsx("span",{children:S(d.team)}),r.jsxs("span",{children:[d.startTime," - ",d.endTime]})]})]},d.id))})]})]}),o==="overdue"&&r.jsxs("div",{className:"overdue-section",children:[r.jsx("h2",{children:"Overdue Items"}),w().length===0?r.jsxs("div",{className:"no-overdue",children:[r.jsx("div",{className:"celebration-icon",children:"🎉"}),r.jsx("h3",{children:"All caught up!"}),r.jsx("p",{children:"No overdue items at the moment. Great work!"})]}):r.jsx("div",{className:"overdue-list",children:w().map((d,N)=>r.jsxs("div",{className:"overdue-item",children:[r.jsxs("div",{className:"overdue-priority",children:[r.jsx("div",{className:"overdue-icon",children:"⚠️"}),r.jsxs("div",{className:"days-overdue",children:[Math.floor((new Date-new Date(d.dueDate))/(1e3*60*60*24))," days overdue"]})]}),r.jsxs("div",{className:"overdue-content",children:[r.jsx("h3",{children:d.title}),d.type==="task"&&r.jsxs("p",{className:"parent-project",children:["Part of: ",d.projectTitle]}),r.jsx("p",{children:d.description}),r.jsxs("div",{className:"overdue-meta",children:[r.jsxs("span",{children:[r.jsx("strong",{children:"Due:"})," ",new Date(d.dueDate).toLocaleDateString()]}),r.jsxs("span",{children:[r.jsx("strong",{children:"Assigned:"})," ",d.assignedTo]}),r.jsxs("span",{children:[r.jsx("strong",{children:"Priority:"})," ",d.priority]})]})]}),r.jsx("div",{className:"overdue-status",children:r.jsx("div",{className:"status-badge overdue-badge",style:{backgroundColor:"#dc3545"},children:"OVERDUE"})})]},`${d.type}-${d.id}`))})]}),c&&r.jsx("div",{className:"modal-overlay",onClick:()=>u(null),children:r.jsxs("div",{className:"modal",onClick:d=>d.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h2",{children:c.title}),r.jsx("button",{className:"close-btn",onClick:()=>u(null),children:"×"})]}),r.jsx("div",{className:"modal-content",children:r.jsxs("div",{className:"project-detail",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{children:"Project Overview"}),r.jsx("p",{children:c.description}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Team:"})," ",S(c.team)]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Status:"})," ",c.status]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",c.priority]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Assigned To:"})," ",c.assignedTo]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Start Date:"})," ",new Date(c.startDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Due Date:"})," ",new Date(c.dueDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Progress:"})," ",c.progress,"%"]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Hours:"})," ",c.actualHours,"/",c.estimatedHours]})]})]}),c.tasks.length>0&&r.jsxs("div",{className:"detail-section",children:[r.jsxs("h3",{children:["Tasks (",c.tasks.length,")"]}),r.jsx("div",{className:"tasks-detail",children:c.tasks.map(d=>r.jsxs("div",{className:"task-detail",children:[r.jsxs("div",{className:"task-header",children:[r.jsx("h4",{children:d.title}),r.jsx("div",{className:"status-badge",style:{backgroundColor:D(d.status,d.dueDate)},children:k(d.dueDate,d.status)?"OVERDUE":d.status.toUpperCase()})]}),r.jsx("p",{children:d.description}),r.jsxs("div",{className:"task-meta-detail",children:[r.jsxs("span",{children:[r.jsx("strong",{children:"Due:"})," ",new Date(d.dueDate).toLocaleDateString()]}),r.jsxs("span",{children:[r.jsx("strong",{children:"Assigned:"})," ",d.assignedTo]}),r.jsxs("span",{children:[r.jsx("strong",{children:"Progress:"})," ",d.progress,"%"]})]})]},d.id))})]})]})})]})}),g&&r.jsx("div",{className:"modal-overlay",onClick:()=>v(null),children:r.jsxs("div",{className:"modal",onClick:d=>d.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h2",{children:g.title}),r.jsx("button",{className:"close-btn",onClick:()=>v(null),children:"×"})]}),r.jsx("div",{className:"modal-content",children:r.jsx("div",{className:"event-detail",children:r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{children:"Event Details"}),r.jsx("p",{children:g.description}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Date:"})," ",new Date(g.date).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Time:"})," ",g.startTime," - ",g.endTime]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Team:"})," ",S(g.team)]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Type:"})," ",g.type]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Location:"})," ",g.location]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",g.priority]})]}),g.attendees&&g.attendees.length>0&&r.jsxs("div",{className:"attendees-section",children:[r.jsx("h4",{children:"Attendees"}),r.jsx("ul",{children:g.attendees.map((d,N)=>r.jsx("li",{children:d},N))})]})]})})})]})})]})};const Xf=()=>(j.useEffect(()=>{document.title="Page Not Found - SolarPack"},[]),r.jsx("div",{className:"not-found-container",children:r.jsxs("div",{className:"not-found-content",children:[r.jsx("h1",{children:"Page Not Found"}),r.jsx("div",{className:"error-code",children:"404"}),r.jsx("p",{children:"The page you're looking for doesn't exist or may have been moved."}),r.jsxs("div",{className:"error-actions",children:[r.jsx(Yn,{to:"/",className:"home-btn",children:"Back to Home"}),r.jsx(Yn,{to:"/contact",className:"contact-btn",children:"Contact Us"})]})]})})),Jf=({onLogin:e})=>{const[t,n]=j.useState(""),[s,a]=j.useState(""),[i,o]=j.useState(!1),l=c=>{c.preventDefault(),o(!0),a(""),setTimeout(()=>{W.authenticate(t)?(e(),n("")):a("Invalid password. Please try again."),o(!1)},500)};return r.jsxs("div",{className:"login-container",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"login-card",children:[r.jsxs("div",{className:"login-header",children:[r.jsxs("div",{className:"login-logo",children:[r.jsx("img",{src:"/solarpack_logo.png",alt:"SolarPack logo"}),r.jsx("h1",{className:"login-title",children:"SolarPack"})]}),r.jsx("p",{className:"login-subtitle",children:"Admin Dashboard Access"})]}),r.jsxs("form",{onSubmit:l,children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"password",className:"form-label",children:"Password"}),r.jsx("input",{type:"password",id:"password",className:"form-input",value:t,onChange:c=>n(c.target.value),placeholder:"Enter your dashboard password",disabled:i,autoFocus:!0})]}),r.jsx("button",{type:"submit",className:"login-button",disabled:i||!t.trim(),children:i?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"loading-spinner"}),"Signing In..."]}):"Access Dashboard"}),s&&r.jsx("div",{className:"error-message",children:s})]})]})]})},Je={owner:"NCSU-Solarpack",repo:"SolarPack-Web",branch:"main"};class qf{constructor(){this.token=null,this.baseUrl="https://api.github.com"}setToken(t){this.token=t,localStorage.setItem("github_token",t)}loadToken(){return this.token=localStorage.getItem("github_token"),this.token}clearToken(){this.token=null,localStorage.removeItem("github_token")}hasToken(){return this.loadToken()!==null}async getFileSHA(t){if(!this.token)throw new Error("No GitHub token available");const n=`${this.baseUrl}/repos/${Je.owner}/${Je.repo}/contents/${t}`;try{const s=await fetch(n,{headers:{Authorization:`token ${this.token}`,Accept:"application/vnd.github.v3+json"}});if(!s.ok)throw new Error(`GitHub API error: ${s.status}`);return(await s.json()).sha}catch(s){throw console.error("Error getting file SHA:",s),s}}async updateFile(t,n,s){if(!this.token)throw new Error("No GitHub token available");try{const a=await this.getFileSHA(t),i=btoa(JSON.stringify(n,null,2)),o=`${this.baseUrl}/repos/${Je.owner}/${Je.repo}/contents/${t}`,l=await fetch(o,{method:"PUT",headers:{Authorization:`token ${this.token}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"},body:JSON.stringify({message:s||`Update ${t}`,content:i,sha:a,branch:Je.branch})});if(!l.ok){const u=await l.json();throw new Error(`GitHub API error: ${l.status} - ${u.message}`)}const c=await l.json();return console.log("File updated successfully:",c),c}catch(a){throw console.error("Error updating file:",a),a}}async saveTeamData(t){return this.updateFile("public/data/team.json",t,"Update team data via admin interface")}async saveScheduleData(t){return this.updateFile("public/data/schedules.json",t,"Update schedules and orders via admin interface")}async saveContentData(t){return this.updateFile("public/data/content.json",t,"Update announcements and events via admin interface")}async triggerRebuild(){if(!this.token)throw new Error("No GitHub token available");try{const t=`${this.baseUrl}/repos/${Je.owner}/${Je.repo}/dispatches`;(await fetch(t,{method:"POST",headers:{Authorization:`token ${this.token}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"},body:JSON.stringify({event_type:"rebuild"})})).ok||console.warn("Could not trigger rebuild, but file was updated")}catch(t){console.warn("Could not trigger rebuild:",t)}}async testConnection(){var t,n;if(!this.token)throw new Error("No GitHub token available");try{const s=`${this.baseUrl}/repos/${Je.owner}/${Je.repo}`,a=await fetch(s,{headers:{Authorization:`token ${this.token}`,Accept:"application/vnd.github.v3+json"}});if(!a.ok)throw new Error(`GitHub API error: ${a.status}`);const i=await a.json();return{success:!0,repo:i.name,owner:i.owner.login,permissions:{push:((t=i.permissions)==null?void 0:t.push)||!1,admin:((n=i.permissions)==null?void 0:n.admin)||!1}}}catch(s){return{success:!1,error:s.message}}}}const Ce=new qf,Zf=()=>{const[e,t]=j.useState({teamMembers:[],lastUpdated:""}),[n,s]=j.useState(!1),[a,i]=j.useState(null),[o,l]=j.useState(!0);j.useEffect(()=>{c()},[]);const c=async()=>{try{const D=await(await fetch("/data/team.json")).json();t(D)}catch(k){console.error("Error loading team data:",k)}finally{l(!1)}},u=k=>{i({...k}),s(!0)},g=()=>{i({id:Date.now(),name:"",role:"",image:"",bio:"",email:"",linkedin:"",order:e.teamMembers.length+1}),s(!0)},v=()=>{if(!a.name||!a.role){alert("Please fill in required fields (Name and Role)");return}const k=[...e.teamMembers],D=k.findIndex(p=>p.id===a.id);D>=0?k[D]=a:k.push(a),k.sort((p,h)=>p.order-h.order);const x={...e,teamMembers:k,lastUpdated:new Date().toISOString()};t(x),s(!1),i(null),S(x)},m=k=>{if(confirm("Are you sure you want to delete this team member?")){const D=e.teamMembers.filter(p=>p.id!==k),x={...e,teamMembers:D,lastUpdated:new Date().toISOString()};t(x),S(x)}},S=async k=>{if(!Ce.hasToken()){console.warn("No GitHub token available. Changes saved locally only.");return}try{await Ce.saveTeamData(k),console.log("Team data saved to GitHub successfully"),await Ce.triggerRebuild()}catch(D){console.error("Error saving to GitHub:",D),alert("Failed to save changes to GitHub. Please check your connection and try again.")}},C=W.hasPermission("edit_team");return o?r.jsx("div",{className:"loading",children:"Loading team data..."}):r.jsxs("div",{className:"team-manager",children:[r.jsx("style",{children:`
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
          transition: transform 0.3s ease;
        }

        .member-card:hover {
          transform: translateY(-2px);
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
        }

        .member-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: var(--accent);
          color: white;
        }

        .edit-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .delete-btn {
          background: #dc2626;
          color: white;
        }

        .delete-btn:hover {
          background: #b91c1c;
          transform: translateY(-1px);
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
      `}),r.jsxs("div",{className:"team-manager-header",children:[r.jsx("h2",{className:"team-manager-title",children:"Team Management"}),C&&r.jsxs("button",{className:"add-member-btn",onClick:g,children:[r.jsx("span",{children:"+"}),"Add Member"]})]}),!C&&r.jsx("div",{className:"no-permission",children:"You don't have permission to edit team members. Contact a director for access."}),r.jsx("div",{className:"team-grid",children:e.teamMembers.map(k=>r.jsxs("div",{className:"member-card",children:[r.jsxs("div",{className:"member-header",children:[r.jsx("img",{src:k.image||"/images/headshots/default.jpg",alt:k.name,className:"member-avatar",onError:D=>D.target.src="/images/headshots/default.jpg"}),r.jsxs("div",{className:"member-info",children:[r.jsx("h3",{children:k.name}),r.jsx("p",{className:"member-role",children:k.role})]})]}),r.jsx("p",{className:"member-bio",children:k.bio.length>150?k.bio.substring(0,150)+"...":k.bio}),C&&r.jsxs("div",{className:"member-actions",children:[r.jsx("button",{className:"action-btn edit-btn",onClick:()=>u(k),children:"Edit"}),r.jsx("button",{className:"action-btn delete-btn",onClick:()=>m(k.id),children:"Delete"})]})]},k.id))}),n&&a&&r.jsx("div",{className:"modal-overlay",onClick:()=>s(!1),children:r.jsxs("div",{className:"modal-content",onClick:k=>k.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsxs("h3",{className:"modal-title",children:[a.id&&e.teamMembers.find(k=>k.id===a.id)?"Edit":"Add"," Team Member"]}),r.jsx("button",{className:"close-btn",onClick:()=>s(!1),children:"×"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Name *"}),r.jsx("input",{type:"text",className:"form-input",value:a.name,onChange:k=>i({...a,name:k.target.value}),placeholder:"Full name"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Role *"}),r.jsx("input",{type:"text",className:"form-input",value:a.role,onChange:k=>i({...a,role:k.target.value}),placeholder:"e.g., Technical Director"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Image URL"}),r.jsx("input",{type:"text",className:"form-input",value:a.image,onChange:k=>i({...a,image:k.target.value}),placeholder:"/images/headshots/name.jpg"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Bio"}),r.jsx("textarea",{className:"form-textarea",value:a.bio,onChange:k=>i({...a,bio:k.target.value}),placeholder:"Brief description of role and background..."})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Display Order"}),r.jsx("input",{type:"number",className:"form-input",value:a.order,onChange:k=>i({...a,order:parseInt(k.target.value)||1}),min:"1"})]}),r.jsxs("div",{className:"modal-actions",children:[r.jsx("button",{className:"cancel-btn",onClick:()=>s(!1),children:"Cancel"}),r.jsx("button",{className:"save-btn",onClick:v,children:"Save Member"})]})]})})]})},eh=()=>{const[e,t]=j.useState({teams:[],projects:[],events:[],lastUpdated:""}),[n,s]=j.useState("projects"),[a,i]=j.useState(!1),[o,l]=j.useState(null),[c,u]=j.useState(!0),[g,v]=j.useState("all");j.useEffect(()=>{m()},[]);const m=async()=>{try{const f=await(await fetch("/data/schedules.json")).json();t(f)}catch(y){console.error("Error loading schedule data:",y)}finally{u(!1)}},S=y=>{const f=e.teams.find(E=>E.id===y);return f?f.name:y},C=y=>{const f=e.teams.find(E=>E.id===y);return f?f.color:"#6c757d"},k=(y,f)=>{if(f==="completed")return!1;const E=new Date;return new Date(y)<E},D=(y,f)=>{if(k(f,y))return"#dc3545";switch(y){case"completed":return"#28a745";case"in-progress":return"#007bff";case"pending":return"#ffc107";case"planning":return"#6c757d";case"critical":return"#dc3545";default:return"#6c757d"}},x=()=>{l({type:"project",id:Date.now(),title:"",description:"",team:"director",priority:"medium",status:"planning",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,progress:0,assignedTo:"",tasks:[]}),i(!0)},p=y=>{l({...y,type:"project"}),i(!0)},h=(y,f)=>{l({...y,type:"project",editingTaskId:f.id}),i(!0)},w=(y,f)=>{if(!window.confirm("Are you sure you want to delete this task?"))return;const E={...e},R=E.projects.findIndex(fe=>fe.id===y);R>=0&&(E.projects[R].tasks=E.projects[R].tasks.filter(fe=>fe.id!==f),E.lastUpdated=new Date().toISOString(),t(E),_(E))},d=y=>{const f=e.projects.find(R=>R.id===y),E={id:Date.now(),title:"",description:"",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,status:"pending",priority:"medium",assignedTo:"",progress:0};l({...f,type:"project",tasks:[...f.tasks,E]}),i(!0)},N=()=>{l({type:"event",id:Date.now(),title:"",description:"",team:"director",date:"",startTime:"",endTime:"",eventType:"meeting",priority:"medium",attendees:[],location:""}),i(!0)},b=y=>{const f={...y};f.eventType=y.type,f.type="event",l(f),i(!0)},P=async()=>{try{const y={...e};if(o.type==="project"){const f=y.projects.findIndex(R=>R.id===o.id),E={...o};delete E.type,f>=0?y.projects[f]=E:y.projects.push(E)}else if(o.type==="event"){const f=y.events.findIndex(R=>R.id===o.id),E={...o};delete E.type,E.eventType&&(E.type=E.eventType,delete E.eventType),f>=0?y.events[f]=E:y.events.push(E)}y.lastUpdated=new Date().toISOString(),t(y),await _(y),i(!1),l(null)}catch(y){console.error("Error saving item:",y),alert("Failed to save changes. Please try again.")}},M=async(y,f)=>{if(window.confirm("Are you sure you want to delete this item?"))try{const E={...e};y==="project"?E.projects=E.projects.filter(R=>R.id!==f):y==="event"&&(E.events=E.events.filter(R=>R.id!==f)),E.lastUpdated=new Date().toISOString(),t(E),await _(E)}catch(E){console.error("Error deleting item:",E),alert("Failed to delete item. Please try again.")}},_=async y=>{try{const f=JSON.stringify(y,null,2);await Ce.updateFile("public/data/schedules.json",f,`Update schedules data - ${new Date().toISOString()}`),await Ce.triggerRebuild()}catch(f){throw console.error("Error saving to GitHub:",f),f}},O=(y,f="team")=>g==="all"?y:y.filter(E=>E[f]===g),Q=W.hasPermission("edit_schedules");return c?r.jsx("div",{className:"loading",children:"Loading schedule data..."}):r.jsxs("div",{className:"schedule-manager",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"schedule-header",children:[r.jsx("h1",{className:"schedule-title",children:"Schedule Manager"}),Q&&r.jsxs("button",{className:"add-button",onClick:n==="projects"?x:N,children:["+ Add ",n==="projects"?"Project":"Event"]})]}),r.jsxs("div",{className:"view-tabs",children:[r.jsx("button",{className:`view-tab ${n==="projects"?"active":""}`,onClick:()=>s("projects"),children:"Projects"}),r.jsx("button",{className:`view-tab ${n==="events"?"active":""}`,onClick:()=>s("events"),children:"Events"})]}),r.jsxs("div",{className:"filters",children:[r.jsx("label",{htmlFor:"team-filter",children:"Filter by Team:"}),r.jsxs("select",{id:"team-filter",className:"team-filter",value:g,onChange:y=>v(y.target.value),children:[r.jsx("option",{value:"all",children:"All Teams"}),e.teams.map(y=>r.jsx("option",{value:y.id,children:y.name},y.id))]})]}),n==="projects"&&r.jsx("div",{className:"projects-grid",children:O(e.projects).map(y=>r.jsxs("div",{className:`project-card ${k(y.dueDate,y.status)?"overdue":""}`,children:[r.jsxs("div",{className:"project-header",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"project-title",children:y.title}),r.jsx("div",{className:"project-team",style:{backgroundColor:C(y.team)},children:S(y.team)})]}),r.jsx("div",{className:"project-status",style:{backgroundColor:D(y.status,y.dueDate)},children:k(y.dueDate,y.status)?"OVERDUE":y.status.toUpperCase()})]}),r.jsx("p",{children:y.description}),r.jsxs("div",{className:"project-progress",children:[r.jsx("div",{className:"progress-bar",children:r.jsx("div",{className:"progress-fill",style:{width:`${y.progress}%`,backgroundColor:C(y.team)}})}),r.jsxs("div",{style:{marginTop:"0.5rem",fontSize:"0.9rem"},children:["Progress: ",y.progress,"%"]})]}),r.jsxs("div",{className:"project-meta",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Assigned:"})," ",y.assignedTo]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Due:"})," ",new Date(y.dueDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",y.priority]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Hours:"})," ",y.actualHours,"/",y.estimatedHours]})]}),y.tasks.length>0&&r.jsxs("div",{className:"tasks-section",children:[r.jsxs("div",{className:"tasks-header",children:[r.jsxs("h4",{children:["Tasks (",y.tasks.length,")"]}),Q&&r.jsx("button",{className:"add-button",style:{fontSize:"0.8rem",padding:"0.5rem 1rem"},onClick:()=>d(y.id),children:"+ Task"})]}),y.tasks.map(f=>r.jsxs("div",{className:"task-item",children:[r.jsxs("div",{className:"task-info",children:[r.jsx("div",{className:"task-title",children:f.title}),r.jsxs("div",{className:"task-meta",children:["Due: ",new Date(f.dueDate).toLocaleDateString()," | Status: ",f.status," | Progress: ",f.progress,"%"]})]}),r.jsxs("div",{className:"task-actions",children:[r.jsx("div",{className:"project-status",style:{backgroundColor:D(f.status,f.dueDate),fontSize:"0.7rem",padding:"0.25rem 0.5rem"},children:k(f.dueDate,f.status)?"OVERDUE":f.status.toUpperCase()}),Q&&r.jsxs("div",{className:"task-buttons",children:[r.jsx("button",{className:"edit-btn",style:{fontSize:"0.7rem",padding:"0.25rem 0.5rem"},onClick:E=>{E.stopPropagation(),h(y,f)},children:"Edit"}),r.jsx("button",{className:"delete-btn",style:{fontSize:"0.7rem",padding:"0.25rem 0.5rem"},onClick:E=>{E.stopPropagation(),w(y.id,f.id)},children:"Del"})]})]})]},f.id))]}),Q&&r.jsxs("div",{className:"action-buttons",style:{marginTop:"1rem"},children:[r.jsx("button",{className:"edit-btn",onClick:()=>p(y),children:"Edit"}),r.jsx("button",{className:"delete-btn",onClick:()=>M("project",y.id),children:"Delete"})]})]},y.id))}),n==="events"&&r.jsx("div",{className:"events-grid",children:O(e.events).map(y=>r.jsxs("div",{className:"event-card",children:[r.jsx("div",{className:"event-date",children:new Date(y.date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),r.jsxs("div",{className:"event-time",children:[y.startTime," - ",y.endTime]}),r.jsx("h3",{className:"project-title",children:y.title}),r.jsx("p",{children:y.description}),r.jsxs("div",{className:"project-meta",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Team:"})," ",S(y.team)]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Type:"})," ",y.type]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Location:"})," ",y.location]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",y.priority]})]}),Q&&r.jsxs("div",{className:"action-buttons",style:{marginTop:"1rem"},children:[r.jsx("button",{className:"edit-btn",onClick:()=>b(y),children:"Edit"}),r.jsx("button",{className:"delete-btn",onClick:()=>M("event",y.id),children:"Delete"})]})]},y.id))}),a&&o&&r.jsx("div",{className:"modal-overlay",onClick:y=>y.target===y.currentTarget&&i(!1),children:r.jsxs("div",{className:"modal",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h2",{className:"modal-title",children:o.type==="project"?e.projects.find(y=>y.id===o.id)?"Edit Project":"Add Project":e.events.find(y=>y.id===o.id)?"Edit Event":"Add Event"}),r.jsx("button",{className:"close-btn",onClick:()=>i(!1),children:"×"})]}),o.type==="project"?r.jsxs("div",{children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Title"}),r.jsx("input",{type:"text",className:"form-input",value:o.title,onChange:y=>l({...o,title:y.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Description"}),r.jsx("textarea",{className:"form-textarea",value:o.description,onChange:y=>l({...o,description:y.target.value})})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Team"}),r.jsx("select",{className:"form-select",value:o.team,onChange:y=>l({...o,team:y.target.value}),children:e.teams.map(y=>r.jsx("option",{value:y.id,children:y.name},y.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Priority"}),r.jsxs("select",{className:"form-select",value:o.priority,onChange:y=>l({...o,priority:y.target.value}),children:[r.jsx("option",{value:"low",children:"Low"}),r.jsx("option",{value:"medium",children:"Medium"}),r.jsx("option",{value:"high",children:"High"}),r.jsx("option",{value:"critical",children:"Critical"})]})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Status"}),r.jsxs("select",{className:"form-select",value:o.status,onChange:y=>l({...o,status:y.target.value}),children:[r.jsx("option",{value:"planning",children:"Planning"}),r.jsx("option",{value:"pending",children:"Pending"}),r.jsx("option",{value:"in-progress",children:"In Progress"}),r.jsx("option",{value:"completed",children:"Completed"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Assigned To"}),r.jsx("input",{type:"text",className:"form-input",value:o.assignedTo,onChange:y=>l({...o,assignedTo:y.target.value})})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Start Date"}),r.jsx("input",{type:"date",className:"form-input",value:o.startDate,onChange:y=>l({...o,startDate:y.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Due Date"}),r.jsx("input",{type:"date",className:"form-input",value:o.dueDate,onChange:y=>l({...o,dueDate:y.target.value})})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Estimated Hours"}),r.jsx("input",{type:"number",className:"form-input",value:o.estimatedHours,onChange:y=>l({...o,estimatedHours:parseInt(y.target.value)||0})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Progress (%)"}),r.jsx("input",{type:"number",className:"form-input",min:"0",max:"100",value:o.progress,onChange:y=>l({...o,progress:parseInt(y.target.value)||0})})]})]}),r.jsxs("div",{className:"tasks-management-section",children:[r.jsx("h3",{children:"Tasks Management"}),r.jsx("div",{className:"tasks-list",children:o.tasks.map((y,f)=>r.jsxs("div",{className:"task-edit-item",children:[r.jsxs("div",{className:"task-edit-header",children:[r.jsxs("h4",{children:["Task ",f+1]}),r.jsx("button",{type:"button",className:"delete-btn",onClick:()=>{const E=o.tasks.filter((R,fe)=>fe!==f);l({...o,tasks:E})},children:"Remove"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Task Title"}),r.jsx("input",{type:"text",className:"form-input",value:y.title,onChange:E=>{const R=[...o.tasks];R[f]={...y,title:E.target.value},l({...o,tasks:R})}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Task Description"}),r.jsx("textarea",{className:"form-textarea",style:{minHeight:"60px"},value:y.description,onChange:E=>{const R=[...o.tasks];R[f]={...y,description:E.target.value},l({...o,tasks:R})}})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Start Date"}),r.jsx("input",{type:"date",className:"form-input",value:y.startDate,onChange:E=>{const R=[...o.tasks];R[f]={...y,startDate:E.target.value},l({...o,tasks:R})}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Due Date"}),r.jsx("input",{type:"date",className:"form-input",value:y.dueDate,onChange:E=>{const R=[...o.tasks];R[f]={...y,dueDate:E.target.value},l({...o,tasks:R})}})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Status"}),r.jsxs("select",{className:"form-select",value:y.status,onChange:E=>{const R=[...o.tasks];R[f]={...y,status:E.target.value},l({...o,tasks:R})},children:[r.jsx("option",{value:"pending",children:"Pending"}),r.jsx("option",{value:"in-progress",children:"In Progress"}),r.jsx("option",{value:"completed",children:"Completed"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Priority"}),r.jsxs("select",{className:"form-select",value:y.priority,onChange:E=>{const R=[...o.tasks];R[f]={...y,priority:E.target.value},l({...o,tasks:R})},children:[r.jsx("option",{value:"low",children:"Low"}),r.jsx("option",{value:"medium",children:"Medium"}),r.jsx("option",{value:"high",children:"High"}),r.jsx("option",{value:"critical",children:"Critical"})]})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Assigned To"}),r.jsx("input",{type:"text",className:"form-input",value:y.assignedTo,onChange:E=>{const R=[...o.tasks];R[f]={...y,assignedTo:E.target.value},l({...o,tasks:R})}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Progress (%)"}),r.jsx("input",{type:"number",className:"form-input",min:"0",max:"100",value:y.progress,onChange:E=>{const R=[...o.tasks];R[f]={...y,progress:parseInt(E.target.value)||0},l({...o,tasks:R})}})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Estimated Hours"}),r.jsx("input",{type:"number",className:"form-input",value:y.estimatedHours,onChange:E=>{const R=[...o.tasks];R[f]={...y,estimatedHours:parseInt(E.target.value)||0},l({...o,tasks:R})}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Actual Hours"}),r.jsx("input",{type:"number",className:"form-input",value:y.actualHours,onChange:E=>{const R=[...o.tasks];R[f]={...y,actualHours:parseInt(E.target.value)||0},l({...o,tasks:R})}})]})]})]},y.id||f))}),r.jsx("button",{type:"button",className:"add-button",onClick:()=>{const y={id:Date.now(),title:"",description:"",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,status:"pending",priority:"medium",assignedTo:"",progress:0};l({...o,tasks:[...o.tasks,y]})},children:"+ Add Task"})]})]}):r.jsxs("div",{children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Title"}),r.jsx("input",{type:"text",className:"form-input",value:o.title,onChange:y=>l({...o,title:y.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Description"}),r.jsx("textarea",{className:"form-textarea",value:o.description,onChange:y=>l({...o,description:y.target.value})})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Team"}),r.jsx("select",{className:"form-select",value:o.team,onChange:y=>l({...o,team:y.target.value}),children:e.teams.map(y=>r.jsx("option",{value:y.id,children:y.name},y.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Type"}),r.jsxs("select",{className:"form-select",value:o.eventType,onChange:y=>l({...o,eventType:y.target.value}),children:[r.jsx("option",{value:"meeting",children:"Meeting"}),r.jsx("option",{value:"testing",children:"Testing"}),r.jsx("option",{value:"presentation",children:"Presentation"}),r.jsx("option",{value:"deadline",children:"Deadline"}),r.jsx("option",{value:"milestone",children:"Milestone"})]})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Date"}),r.jsx("input",{type:"date",className:"form-input",value:o.date,onChange:y=>l({...o,date:y.target.value})})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Start Time"}),r.jsx("input",{type:"time",className:"form-input",value:o.startTime,onChange:y=>l({...o,startTime:y.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"End Time"}),r.jsx("input",{type:"time",className:"form-input",value:o.endTime,onChange:y=>l({...o,endTime:y.target.value})})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Location"}),r.jsx("input",{type:"text",className:"form-input",value:o.location,onChange:y=>l({...o,location:y.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Priority"}),r.jsxs("select",{className:"form-select",value:o.priority,onChange:y=>l({...o,priority:y.target.value}),children:[r.jsx("option",{value:"low",children:"Low"}),r.jsx("option",{value:"medium",children:"Medium"}),r.jsx("option",{value:"high",children:"High"}),r.jsx("option",{value:"critical",children:"Critical"})]})]})]})]}),r.jsxs("div",{className:"modal-actions",children:[r.jsx("button",{className:"cancel-btn",onClick:()=>i(!1),children:"Cancel"}),r.jsx("button",{className:"save-btn",onClick:P,children:"Save"})]})]})})]})};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const th=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),nh=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,s)=>s?s.toUpperCase():n.toLowerCase()),_l=e=>{const t=nh(e);return t.charAt(0).toUpperCase()+t.slice(1)},nd=(...e)=>e.filter((t,n,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===n).join(" ").trim(),rh=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var sh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ah=j.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:s,className:a="",children:i,iconNode:o,...l},c)=>j.createElement("svg",{ref:c,...sh,width:t,height:t,stroke:e,strokeWidth:s?Number(n)*24/Number(t):n,className:nd("lucide",a),...!i&&!rh(l)&&{"aria-hidden":"true"},...l},[...o.map(([u,g])=>j.createElement(u,g)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=(e,t)=>{const n=j.forwardRef(({className:s,...a},i)=>j.createElement(ah,{ref:i,iconNode:t,className:nd(`lucide-${th(_l(e))}`,`lucide-${e}`,s),...a}));return n.displayName=_l(e),n};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ih=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],oh=Ae("award",ih);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lh=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],ch=Ae("calendar",lh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uh=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],dh=Ae("chart-column",uh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mh=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],ph=Ae("graduation-cap",mh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fh=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],hh=Ae("package",fh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gh=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],rd=Ae("pen",gh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vh=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],hn=Ae("plus",vh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xh=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],Ss=Ae("save",xh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yh=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],jh=Ae("settings",yh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wh=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Cs=Ae("trash-2",wh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kh=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Nh=Ae("users",kh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bh=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],sd=Ae("x",bh),Sh=()=>{const[e,t]=j.useState([]),[n,s]=j.useState(!0),[a,i]=j.useState(null);j.useState(null);const[o,l]=j.useState({semester:"",leadership:[]}),[c,u]=j.useState(!1),[g,v]=j.useState(!1);j.useEffect(()=>{m()},[]);const m=async()=>{try{s(!0);try{const w=await fetch("/data/alumni.json");if(w.ok){const d=await w.json();t(d.alumniData||[])}else t([])}catch{t([])}}catch(w){console.error("Error loading alumni data:",w),t([])}finally{s(!1)}},S=async()=>{if(!W.hasPermission("edit_content")){alert("You do not have permission to edit alumni data");return}try{v(!0);const w={alumniData:e};await Ce.updateFile("public/data/alumni.json",w,"Update alumni data via admin interface"),alert("Alumni data saved successfully!")}catch(w){console.error("Error saving alumni data:",w),alert("Error saving alumni data: "+w.message)}finally{v(!1)}},C=()=>{if(!o.semester.trim()){alert("Please enter a semester name");return}const w=[...e,{...o,leadership:o.leadership||[]}];t(w),l({semester:"",leadership:[]}),u(!1)},k=w=>{if(confirm("Are you sure you want to delete this semester?")){const d=e.filter((N,b)=>b!==w);t(d)}},D=(w,d,N)=>{const b=[...e];b[w][d]=N,t(b)},x=w=>{const d=[...e];d[w].leadership.push({role:"",name:""}),t(d)},p=(w,d,N,b)=>{const P=[...e];P[w].leadership[d][N]=b,t(P)},h=(w,d)=>{const N=[...e];N[w].leadership.splice(d,1),t(N)};return n?r.jsxs("div",{className:"loading-container",children:[r.jsx("div",{className:"loading-spinner"}),r.jsx("p",{children:"Loading alumni data..."})]}):r.jsxs("div",{className:"alumni-manager",children:[r.jsx("style",{children:`
        .alumni-manager {
          max-width: 1200px;
          margin: 0 auto;
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
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .semester-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .semester-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--text);
          margin: 0;
        }

        .semester-actions {
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
      `}),r.jsxs("div",{className:"alumni-header",children:[r.jsx("h2",{className:"alumni-title",children:"Alumni Management"}),r.jsxs("div",{className:"action-buttons",children:[r.jsxs("button",{className:"btn",onClick:()=>u(!c),children:[r.jsx(hn,{size:18}),"Add Semester"]}),r.jsxs("button",{className:"btn",onClick:S,disabled:g,children:[r.jsx(Ss,{size:18}),g?"Saving...":"Save Changes"]})]})]}),c&&r.jsxs("div",{className:"add-semester-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Semester"}),r.jsx("input",{type:"text",className:"form-input",value:o.semester,onChange:w=>l({...o,semester:w.target.value}),placeholder:"e.g., Fall 2025"})]}),r.jsxs("div",{className:"action-buttons",children:[r.jsxs("button",{className:"btn",onClick:C,children:[r.jsx(hn,{size:18}),"Add Semester"]}),r.jsxs("button",{className:"btn btn-secondary",onClick:()=>{u(!1),l({semester:"",leadership:[]})},children:[r.jsx(sd,{size:18}),"Cancel"]})]})]}),e.length===0?r.jsxs("div",{className:"empty-state",children:[r.jsx("div",{className:"empty-state-icon",children:"👥"}),r.jsx("h3",{children:"No Alumni Data"}),r.jsx("p",{children:"Start by adding your first semester of alumni data."})]}):e.map((w,d)=>{var N,b;return r.jsxs("div",{className:"semester-card",children:[r.jsxs("div",{className:"semester-header",children:[a===d?r.jsx("input",{type:"text",className:"form-input",value:w.semester,onChange:P=>D(d,"semester",P.target.value),style:{maxWidth:"300px"}}):r.jsx("h3",{className:"semester-title",children:w.semester}),r.jsxs("div",{className:"semester-actions",children:[a===d?r.jsx("button",{className:"btn btn-small",onClick:()=>i(null),children:r.jsx(Ss,{size:16})}):r.jsx("button",{className:"btn btn-small",onClick:()=>i(d),children:r.jsx(rd,{size:16})}),r.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>k(d),children:r.jsx(Cs,{size:16})})]})]}),r.jsxs("div",{className:"leadership-list",children:[r.jsx("h4",{style:{color:"var(--text)",marginBottom:"1rem"},children:"Leadership"}),a===d?r.jsxs(r.Fragment,{children:[(N=w.leadership)==null?void 0:N.map((P,M)=>r.jsxs("div",{className:"leadership-item",children:[r.jsx("input",{type:"text",className:"form-input",value:P.role,onChange:_=>p(d,M,"role",_.target.value),placeholder:"Role (e.g., Project Director)"}),r.jsx("input",{type:"text",className:"form-input",value:P.name,onChange:_=>p(d,M,"name",_.target.value),placeholder:"Name"}),r.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>h(d,M),children:r.jsx(Cs,{size:16})})]},M)),r.jsxs("button",{className:"btn btn-small",onClick:()=>x(d),children:[r.jsx(hn,{size:16}),"Add Leadership Role"]})]}):(b=w.leadership)==null?void 0:b.map((P,M)=>r.jsx("div",{className:"leadership-item-readonly",children:r.jsxs("div",{className:"leadership-role-name",children:[r.jsxs("span",{className:"role",children:[P.role,":"]})," ",P.name]})},M))]})]},d)})]})},Ch=()=>{const[e,t]=j.useState([]),[n,s]=j.useState(!0),[a,i]=j.useState(null);j.useState(null);const[o,l]=j.useState({tier:"",sponsors:[]}),[c,u]=j.useState(!1),[g,v]=j.useState(!1),m=[{tier:"Platinum Sponsors",sponsors:[]},{tier:"Gold Sponsors",sponsors:[]},{tier:"Silver Sponsors",sponsors:[]},{tier:"Bronze Sponsors",sponsors:[]}];j.useEffect(()=>{S()},[]);const S=async()=>{try{s(!0);try{const N=await fetch("/data/sponsors.json");if(N.ok){const b=await N.json();t(b.sponsorTiers||m)}else t(m)}catch{t(m)}}catch(N){console.error("Error loading sponsor data:",N),t(m)}finally{s(!1)}},C=async()=>{if(!W.hasPermission("edit_content")){alert("You do not have permission to edit sponsor data");return}try{v(!0);const N={sponsorTiers:e};await Ce.updateFile("public/data/sponsors.json",N,"Update sponsors data via admin interface"),alert("Sponsor data saved successfully!")}catch(N){console.error("Error saving sponsor data:",N),alert("Error saving sponsor data: "+N.message)}finally{v(!1)}},k=()=>{if(!o.tier.trim()){alert("Please enter a tier name");return}const N=[...e,{...o,sponsors:o.sponsors||[]}];t(N),l({tier:"",sponsors:[]}),u(!1)},D=N=>{if(confirm("Are you sure you want to delete this tier?")){const b=e.filter((P,M)=>M!==N);t(b)}},x=(N,b,P)=>{const M=[...e];M[N][b]=P,t(M)},p=N=>{const b=[...e];b[N].sponsors.push({name:"",image:""}),t(b)},h=(N,b,P,M)=>{const _=[...e];_[N].sponsors[b][P]=M,t(_)},w=(N,b)=>{const P=[...e];P[N].sponsors.splice(b,1),t(P)},d=N=>{const b=N.toLowerCase();return b.includes("platinum")?"🏆":b.includes("gold")?"🥇":b.includes("silver")?"🥈":b.includes("bronze")?"🥉":"⭐"};return n?r.jsxs("div",{className:"loading-container",children:[r.jsx("div",{className:"loading-spinner"}),r.jsx("p",{children:"Loading sponsor data..."})]}):r.jsxs("div",{className:"sponsors-manager",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"sponsors-header",children:[r.jsx("h2",{className:"sponsors-title",children:"Sponsors Management"}),r.jsxs("div",{className:"action-buttons",children:[r.jsxs("button",{className:"btn",onClick:()=>u(!c),children:[r.jsx(hn,{size:18}),"Add Tier"]}),r.jsxs("button",{className:"btn",onClick:C,disabled:g,children:[r.jsx(Ss,{size:18}),g?"Saving...":"Save Changes"]})]})]}),c&&r.jsxs("div",{className:"add-tier-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Tier Name"}),r.jsx("input",{type:"text",className:"form-input",value:o.tier,onChange:N=>l({...o,tier:N.target.value}),placeholder:"e.g., Diamond Sponsors"})]}),r.jsxs("div",{className:"action-buttons",children:[r.jsxs("button",{className:"btn",onClick:k,children:[r.jsx(hn,{size:18}),"Add Tier"]}),r.jsxs("button",{className:"btn btn-secondary",onClick:()=>{u(!1),l({tier:"",sponsors:[]})},children:[r.jsx(sd,{size:18}),"Cancel"]})]})]}),e.map((N,b)=>{var P,M,_;return r.jsxs("div",{className:"tier-card",children:[r.jsxs("div",{className:"tier-header",children:[a===b?r.jsx("input",{type:"text",className:"form-input",value:N.tier,onChange:O=>x(b,"tier",O.target.value),style:{maxWidth:"300px"}}):r.jsxs("h3",{className:"tier-title",children:[r.jsx("span",{children:d(N.tier)}),N.tier]}),r.jsxs("div",{className:"tier-actions",children:[a===b?r.jsx("button",{className:"btn btn-small",onClick:()=>i(null),children:r.jsx(Ss,{size:16})}):r.jsx("button",{className:"btn btn-small",onClick:()=>i(b),children:r.jsx(rd,{size:16})}),r.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>D(b),children:r.jsx(Cs,{size:16})})]})]}),r.jsxs("div",{className:"sponsors-list",children:[r.jsx("h4",{style:{color:"var(--text)",marginBottom:"1rem"},children:"Sponsors"}),((P=N.sponsors)==null?void 0:P.length)===0?r.jsx("div",{className:"empty-sponsors",children:r.jsx("p",{children:"No sponsors in this tier yet."})}):a===b?r.jsx(r.Fragment,{children:(M=N.sponsors)==null?void 0:M.map((O,Q)=>r.jsxs("div",{className:"sponsor-item",children:[r.jsxs("div",{className:"form-group",style:{margin:0},children:[r.jsx("label",{className:"form-label",children:"Sponsor Name"}),r.jsx("input",{type:"text",className:"form-input",value:O.name,onChange:y=>h(b,Q,"name",y.target.value),placeholder:"Sponsor name"})]}),r.jsxs("div",{className:"form-group",style:{margin:0},children:[r.jsx("label",{className:"form-label",children:"Image Path"}),r.jsx("input",{type:"text",className:"form-input",value:O.image,onChange:y=>h(b,Q,"image",y.target.value),placeholder:"/images/sponsors/logo.png"})]}),r.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>w(b,Q),style:{alignSelf:"end"},children:r.jsx(Cs,{size:16})}),O.image&&r.jsxs("div",{className:"sponsor-preview",children:[r.jsx("img",{src:O.image,alt:O.name,onError:y=>{y.target.style.display="none",y.target.nextSibling.style.display="block"}}),r.jsxs("div",{className:"sponsor-preview-text",style:{display:"none"},children:["Image not found: ",O.image]})]})]},Q))}):(_=N.sponsors)==null?void 0:_.map((O,Q)=>r.jsxs("div",{className:"sponsor-item-readonly",children:[r.jsxs("div",{className:"sponsor-info",children:[r.jsx("div",{className:"sponsor-name",children:O.name}),r.jsx("div",{className:"sponsor-image-path",children:O.image})]}),O.image&&r.jsx("img",{src:O.image,alt:O.name,className:"sponsor-logo-preview",onError:y=>{y.target.style.display="none"}})]},Q)),a===b&&r.jsxs("button",{className:"btn btn-small",onClick:()=>p(b),children:[r.jsx(hn,{size:16}),"Add Sponsor"]})]})]},b)})]})},Eh=()=>{const[e,t]=j.useState([]),[n,s]=j.useState(!0),[a,i]=j.useState("all"),[o,l]=j.useState("all"),[c,u]=j.useState(!1);j.useState(null);const[g,v]=j.useState(null),[m,S]=j.useState({submissionDetails:{subteam:"",submitterName:"",submitterEmail:""},materialDetails:{materialName:"",specifications:"",materialLink:"",supplier:"",supplierContact:""},costBreakdown:{unitPrice:"",quantity:"",shippingCost:"",taxes:"",fees:""},projectDetails:{purpose:"",priority:"medium",urgency:"flexible",neededByDate:""},sponsorshipInfo:{canBeSponsored:!1,sponsorContactName:"",sponsorContactEmail:"",sponsorCompany:""}});j.useEffect(()=>{C()},[]);const C=async()=>{try{const E=await(await fetch("/data/orders.json")).json();t(E.orders||[])}catch(f){console.error("Error loading orders:",f)}finally{s(!1)}},k=async(f,E)=>{const R=e.map(fe=>{if(fe.id===f){const z=new Date().toISOString();let I={...fe,lastUpdated:z};return E.type==="technical_approval"?(I.approvalWorkflow.technicalDirectorApproval={...I.approvalWorkflow.technicalDirectorApproval,status:E.approved?"approved":"denied",approvedBy:E.approvedBy,approvalDate:z,comments:E.comments||"",denialReason:E.denialReason||""},I.status=E.approved?"pending_project_approval":"denied"):E.type==="project_approval"?(I.approvalWorkflow.projectDirectorPurchaseApproval={...I.approvalWorkflow.projectDirectorPurchaseApproval,status:E.approved?"approved":"denied",approvedBy:E.approvedBy,approvalDate:z,comments:E.comments||"",denialReason:E.denialReason||""},I.status=E.approved?"approved_for_purchase":"denied"):E.type==="purchase"?(I.purchaseStatus={...I.purchaseStatus,purchased:!0,purchaseDate:z,purchaseOrderNumber:E.purchaseOrderNumber||"",actualCost:E.actualCost||I.costBreakdown.totalCost,purchasedBy:E.purchasedBy||""},I.status="purchased"):E.type==="delivery"?(I.deliveryInfo={...I.deliveryInfo,actualArrivalDate:z,deliveredToSubteam:!0,deliveryConfirmedBy:E.confirmedBy||"",deliveryNotes:E.notes||"",trackingNumber:E.trackingNumber||""},I.status="delivered"):E.type==="sponsorship_response"&&(I.sponsorshipInfo={...I.sponsorshipInfo,sponsorshipSuccessful:E.successful,sponsorshipResponse:E.response||"",sponsorshipResponseDate:z}),I}return fe});t(R),console.log("Updating order:",f,E)},D=async()=>{const f=new Date().toISOString(),E={id:`order-${Date.now()}`,submissionTimestamp:f,submissionDetails:m.submissionDetails,materialDetails:m.materialDetails,costBreakdown:{...m.costBreakdown,unitPrice:parseFloat(m.costBreakdown.unitPrice),quantity:parseInt(m.costBreakdown.quantity),shippingCost:parseFloat(m.costBreakdown.shippingCost||0),taxes:parseFloat(m.costBreakdown.taxes||0),fees:parseFloat(m.costBreakdown.fees||0),subtotal:parseFloat(m.costBreakdown.unitPrice)*parseInt(m.costBreakdown.quantity),totalCost:parseFloat(m.costBreakdown.unitPrice)*parseInt(m.costBreakdown.quantity)+parseFloat(m.costBreakdown.shippingCost||0)+parseFloat(m.costBreakdown.taxes||0)+parseFloat(m.costBreakdown.fees||0)},projectDetails:{...m.projectDetails,neededByDate:m.projectDetails.neededByDate?new Date(m.projectDetails.neededByDate).toISOString():null},approvalWorkflow:{technicalDirectorApproval:{status:"pending",approvedBy:null,approvalDate:null,comments:"",denialReason:""},projectDirectorPurchaseApproval:{status:"pending",approvedBy:null,approvalDate:null,comments:"",denialReason:""}},sponsorshipInfo:{...m.sponsorshipInfo,sponsorshipRequested:m.sponsorshipInfo.canBeSponsored&&m.sponsorshipInfo.sponsorContactName,sponsorshipRequestDate:m.sponsorshipInfo.canBeSponsored?f:null,sponsorshipSuccessful:!1,sponsorshipResponse:"",sponsorshipResponseDate:null},purchaseStatus:{purchased:!1,purchaseDate:null,purchaseOrderNumber:"",actualCost:null,purchasedBy:""},deliveryInfo:{expectedArrivalDate:null,actualArrivalDate:null,deliveredToSubteam:!1,deliveryConfirmedBy:"",deliveryNotes:"",trackingNumber:""},documentation:{receiptInvoice:{uploaded:!1,fileName:"",uploadDate:null,uploadedBy:""},additionalDocuments:[]},returnInfo:{returned:!1,returnDate:null,returnReason:"",returnAuthorizedBy:"",refundAmount:null,refundProcessed:!1},status:"pending_technical_approval",lastUpdated:f,createdBy:m.submissionDetails.submitterEmail};t([...e,E]),u(!1),x(),console.log("New order submitted:",E)},x=()=>{S({submissionDetails:{subteam:"",submitterName:"",submitterEmail:""},materialDetails:{materialName:"",specifications:"",materialLink:"",supplier:"",supplierContact:""},costBreakdown:{unitPrice:"",quantity:"",shippingCost:"",taxes:"",fees:""},projectDetails:{purpose:"",priority:"medium",urgency:"flexible",neededByDate:""},sponsorshipInfo:{canBeSponsored:!1,sponsorContactName:"",sponsorContactEmail:"",sponsorCompany:""}})},p=W.hasPermission("approve_orders"),h=W.hasPermission("submit_orders")||W.hasPermission("view_schedules"),w=W.hasPermission("submit_orders"),d=W.hasPermission("technical_director"),N=W.hasPermission("project_director"),b=e.filter(f=>!(a!=="all"&&f.status!==a||o!=="all"&&f.submissionDetails.subteam!==o)),P=f=>{switch(f){case"pending_technical_approval":return"#fd7e14";case"pending_project_approval":return"#17a2b8";case"approved_for_purchase":return"#007bff";case"purchased":return"#6f42c1";case"delivered":return"#28a745";case"denied":return"#dc3545";default:return"#6c757d"}},M=f=>{switch(f){case"pending_technical_approval":return"Pending Tech Approval";case"pending_project_approval":return"Pending Project Approval";case"approved_for_purchase":return"Approved for Purchase";case"purchased":return"Purchased";case"delivered":return"Delivered";case"denied":return"Denied";default:return f}},_=f=>{switch(f){case"high":return"#dc3545";case"medium":return"#ffc107";case"low":return"#28a745";default:return"#6c757d"}},O=[...new Set(e.map(f=>{var E;return(E=f.submissionDetails)==null?void 0:E.subteam}).filter(Boolean))],Q=({order:f,onClose:E})=>{var R;return f?r.jsx("div",{className:"modal-overlay",onClick:E,children:r.jsxs("div",{className:"modal-content",onClick:fe=>fe.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{children:f.materialDetails.materialName}),r.jsx("button",{className:"modal-close",onClick:E,children:"×"})]}),r.jsxs("div",{className:"modal-body",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Submission Details"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Subteam:"})," ",f.submissionDetails.subteam]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Submitted by:"})," ",f.submissionDetails.submitterName]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Email:"})," ",f.submissionDetails.submitterEmail]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Submitted:"})," ",new Date(f.submissionTimestamp).toLocaleString()]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Material Specifications"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Material:"})," ",f.materialDetails.materialName]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Supplier:"})," ",f.materialDetails.supplier]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Supplier Contact:"})," ",f.materialDetails.supplierContact]}),f.materialDetails.materialLink&&r.jsxs("div",{children:[r.jsx("strong",{children:"Link:"}),r.jsx("a",{href:f.materialDetails.materialLink,target:"_blank",rel:"noopener noreferrer",children:"View Material"})]})]}),r.jsxs("div",{className:"specifications",children:[r.jsx("strong",{children:"Specifications:"}),r.jsx("p",{children:f.materialDetails.specifications})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Cost Breakdown"}),r.jsxs("div",{className:"cost-table",children:[r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Unit Price:"}),r.jsxs("span",{children:["$",f.costBreakdown.unitPrice.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Quantity:"}),r.jsx("span",{children:f.costBreakdown.quantity})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Subtotal:"}),r.jsxs("span",{children:["$",f.costBreakdown.subtotal.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Shipping:"}),r.jsxs("span",{children:["$",f.costBreakdown.shippingCost.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Taxes:"}),r.jsxs("span",{children:["$",f.costBreakdown.taxes.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Fees:"}),r.jsxs("span",{children:["$",f.costBreakdown.fees.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row total",children:[r.jsx("span",{children:r.jsx("strong",{children:"Total:"})}),r.jsx("span",{children:r.jsxs("strong",{children:["$",f.costBreakdown.totalCost.toFixed(2)]})})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Project Details"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",f.projectDetails.priority]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Urgency:"})," ",f.projectDetails.urgency]}),f.projectDetails.neededByDate&&r.jsxs("div",{children:[r.jsx("strong",{children:"Needed by:"})," ",new Date(f.projectDetails.neededByDate).toLocaleDateString()]})]}),r.jsxs("div",{className:"purpose",children:[r.jsx("strong",{children:"Purpose:"}),r.jsx("p",{children:f.projectDetails.purpose})]})]}),f.sponsorshipInfo.canBeSponsored&&r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Sponsorship Information"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Can be sponsored:"})," Yes"]}),f.sponsorshipInfo.sponsorContactName&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Sponsor Contact:"})," ",f.sponsorshipInfo.sponsorContactName]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Company:"})," ",f.sponsorshipInfo.sponsorCompany]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Email:"})," ",f.sponsorshipInfo.sponsorContactEmail]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Requested:"})," ",f.sponsorshipInfo.sponsorshipRequested?"Yes":"No"]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Successful:"})," ",f.sponsorshipInfo.sponsorshipSuccessful?"Yes":"No"]})]})]}),f.sponsorshipInfo.sponsorshipResponse&&r.jsxs("div",{className:"response",children:[r.jsx("strong",{children:"Sponsor Response:"}),r.jsx("p",{children:f.sponsorshipInfo.sponsorshipResponse})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Approval Status"}),r.jsxs("div",{className:"approval-grid",children:[r.jsxs("div",{className:"approval-item",children:[r.jsx("strong",{children:"Technical Director:"}),r.jsx("span",{className:`approval-status ${f.approvalWorkflow.technicalDirectorApproval.status}`,children:f.approvalWorkflow.technicalDirectorApproval.status}),f.approvalWorkflow.technicalDirectorApproval.comments&&r.jsx("p",{className:"approval-comment",children:f.approvalWorkflow.technicalDirectorApproval.comments}),f.approvalWorkflow.technicalDirectorApproval.denialReason&&r.jsx("p",{className:"denial-reason",children:f.approvalWorkflow.technicalDirectorApproval.denialReason})]}),r.jsxs("div",{className:"approval-item",children:[r.jsx("strong",{children:"Project Director:"}),r.jsx("span",{className:`approval-status ${f.approvalWorkflow.projectDirectorPurchaseApproval.status}`,children:f.approvalWorkflow.projectDirectorPurchaseApproval.status}),f.approvalWorkflow.projectDirectorPurchaseApproval.comments&&r.jsx("p",{className:"approval-comment",children:f.approvalWorkflow.projectDirectorPurchaseApproval.comments}),f.approvalWorkflow.projectDirectorPurchaseApproval.denialReason&&r.jsx("p",{className:"denial-reason",children:f.approvalWorkflow.projectDirectorPurchaseApproval.denialReason})]})]})]}),f.purchaseStatus.purchased&&r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Purchase Information"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Purchase Date:"})," ",new Date(f.purchaseStatus.purchaseDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"PO Number:"})," ",f.purchaseStatus.purchaseOrderNumber]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Actual Cost:"})," $",(R=f.purchaseStatus.actualCost)==null?void 0:R.toFixed(2)]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Purchased by:"})," ",f.purchaseStatus.purchasedBy]})]})]}),f.deliveryInfo.deliveredToSubteam&&r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Delivery Information"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Delivered:"})," ",new Date(f.deliveryInfo.actualArrivalDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Confirmed by:"})," ",f.deliveryInfo.deliveryConfirmedBy]}),f.deliveryInfo.trackingNumber&&r.jsxs("div",{children:[r.jsx("strong",{children:"Tracking:"})," ",f.deliveryInfo.trackingNumber]})]}),f.deliveryInfo.deliveryNotes&&r.jsxs("div",{className:"delivery-notes",children:[r.jsx("strong",{children:"Notes:"}),r.jsx("p",{children:f.deliveryInfo.deliveryNotes})]})]})]})]})}):null},y=()=>r.jsx("div",{className:"modal-overlay",onClick:()=>u(!1),children:r.jsxs("div",{className:"modal-content large",onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{children:"Submit New Order Request"}),r.jsx("button",{className:"modal-close",onClick:()=>u(!1),children:"×"})]}),r.jsx("div",{className:"modal-body",children:r.jsxs("form",{onSubmit:f=>{f.preventDefault(),D()},children:[r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Submission Details"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Subteam *"}),r.jsxs("select",{value:m.submissionDetails.subteam,onChange:f=>S({...m,submissionDetails:{...m.submissionDetails,subteam:f.target.value}}),required:!0,children:[r.jsx("option",{value:"",children:"Select Subteam"}),r.jsx("option",{value:"Mechanical",children:"Mechanical"}),r.jsx("option",{value:"Electrical",children:"Electrical"}),r.jsx("option",{value:"Software",children:"Software"}),r.jsx("option",{value:"Business",children:"Business"}),r.jsx("option",{value:"Operations",children:"Operations"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Your Name *"}),r.jsx("input",{type:"text",value:m.submissionDetails.submitterName,onChange:f=>S({...m,submissionDetails:{...m.submissionDetails,submitterName:f.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Your Email *"}),r.jsx("input",{type:"email",value:m.submissionDetails.submitterEmail,onChange:f=>S({...m,submissionDetails:{...m.submissionDetails,submitterEmail:f.target.value}}),required:!0})]})]})]}),r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Material Details"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Material Name *"}),r.jsx("input",{type:"text",value:m.materialDetails.materialName,onChange:f=>S({...m,materialDetails:{...m.materialDetails,materialName:f.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Supplier *"}),r.jsx("input",{type:"text",value:m.materialDetails.supplier,onChange:f=>S({...m,materialDetails:{...m.materialDetails,supplier:f.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Supplier Contact"}),r.jsx("input",{type:"text",value:m.materialDetails.supplierContact,onChange:f=>S({...m,materialDetails:{...m.materialDetails,supplierContact:f.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Material Link"}),r.jsx("input",{type:"url",value:m.materialDetails.materialLink,onChange:f=>S({...m,materialDetails:{...m.materialDetails,materialLink:f.target.value}})})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Detailed Specifications *"}),r.jsx("textarea",{value:m.materialDetails.specifications,onChange:f=>S({...m,materialDetails:{...m.materialDetails,specifications:f.target.value}}),rows:"4",placeholder:"Provide thorough specifications including dimensions, materials, performance characteristics, etc.",required:!0})]})]}),r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Cost Information"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Unit Price ($) *"}),r.jsx("input",{type:"number",step:"0.01",value:m.costBreakdown.unitPrice,onChange:f=>S({...m,costBreakdown:{...m.costBreakdown,unitPrice:f.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Quantity *"}),r.jsx("input",{type:"number",value:m.costBreakdown.quantity,onChange:f=>S({...m,costBreakdown:{...m.costBreakdown,quantity:f.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Shipping Cost ($)"}),r.jsx("input",{type:"number",step:"0.01",value:m.costBreakdown.shippingCost,onChange:f=>S({...m,costBreakdown:{...m.costBreakdown,shippingCost:f.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Estimated Taxes ($)"}),r.jsx("input",{type:"number",step:"0.01",value:m.costBreakdown.taxes,onChange:f=>S({...m,costBreakdown:{...m.costBreakdown,taxes:f.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Additional Fees ($)"}),r.jsx("input",{type:"number",step:"0.01",value:m.costBreakdown.fees,onChange:f=>S({...m,costBreakdown:{...m.costBreakdown,fees:f.target.value}})})]})]}),m.costBreakdown.unitPrice&&m.costBreakdown.quantity&&r.jsx("div",{className:"cost-preview",children:r.jsxs("strong",{children:["Estimated Total: $",((parseFloat(m.costBreakdown.unitPrice)||0)*(parseInt(m.costBreakdown.quantity)||0)+(parseFloat(m.costBreakdown.shippingCost)||0)+(parseFloat(m.costBreakdown.taxes)||0)+(parseFloat(m.costBreakdown.fees)||0)).toFixed(2)]})})]}),r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Project Details"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Priority *"}),r.jsxs("select",{value:m.projectDetails.priority,onChange:f=>S({...m,projectDetails:{...m.projectDetails,priority:f.target.value}}),required:!0,children:[r.jsx("option",{value:"low",children:"Low"}),r.jsx("option",{value:"medium",children:"Medium"}),r.jsx("option",{value:"high",children:"High"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Urgency *"}),r.jsxs("select",{value:m.projectDetails.urgency,onChange:f=>S({...m,projectDetails:{...m.projectDetails,urgency:f.target.value}}),required:!0,children:[r.jsx("option",{value:"flexible",children:"Flexible"}),r.jsx("option",{value:"needed_by_date",children:"Needed by specific date"}),r.jsx("option",{value:"asap",children:"ASAP"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Needed By Date"}),r.jsx("input",{type:"date",value:m.projectDetails.neededByDate,onChange:f=>S({...m,projectDetails:{...m.projectDetails,neededByDate:f.target.value}})})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Purpose for Project *"}),r.jsx("textarea",{value:m.projectDetails.purpose,onChange:f=>S({...m,projectDetails:{...m.projectDetails,purpose:f.target.value}}),rows:"3",placeholder:"Explain how this material will be used in the project and why it's needed",required:!0})]})]}),r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Sponsorship Information"}),r.jsx("div",{className:"form-group",children:r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",checked:m.sponsorshipInfo.canBeSponsored,onChange:f=>S({...m,sponsorshipInfo:{...m.sponsorshipInfo,canBeSponsored:f.target.checked}})}),"This material can be used for sponsorship opportunities"]})}),m.sponsorshipInfo.canBeSponsored&&r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Sponsor Contact Name"}),r.jsx("input",{type:"text",value:m.sponsorshipInfo.sponsorContactName,onChange:f=>S({...m,sponsorshipInfo:{...m.sponsorshipInfo,sponsorContactName:f.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Sponsor Company"}),r.jsx("input",{type:"text",value:m.sponsorshipInfo.sponsorCompany,onChange:f=>S({...m,sponsorshipInfo:{...m.sponsorshipInfo,sponsorCompany:f.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Sponsor Contact Email"}),r.jsx("input",{type:"email",value:m.sponsorshipInfo.sponsorContactEmail,onChange:f=>S({...m,sponsorshipInfo:{...m.sponsorshipInfo,sponsorContactEmail:f.target.value}})})]})]})]}),r.jsxs("div",{className:"form-actions",children:[r.jsx("button",{type:"button",onClick:()=>u(!1),className:"btn-secondary",children:"Cancel"}),r.jsx("button",{type:"submit",className:"btn-primary",children:"Submit Order Request"})]})]})})]})});return n?r.jsx("div",{className:"loading",children:"Loading orders..."}):h?r.jsxs("div",{className:"order-manager",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"order-header",children:[r.jsx("h2",{className:"order-title",children:"Order Management"}),w&&r.jsx("button",{className:"btn-primary",onClick:()=>u(!0),children:"+ Submit New Order"})]}),r.jsxs("div",{className:"stats-summary",children:[r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.filter(f=>f.status==="pending_technical_approval").length}),r.jsx("div",{className:"stat-label",children:"Pending Tech Approval"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.filter(f=>f.status==="pending_project_approval").length}),r.jsx("div",{className:"stat-label",children:"Pending Project Approval"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.filter(f=>f.status==="purchased").length}),r.jsx("div",{className:"stat-label",children:"Purchased"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsxs("div",{className:"stat-number",children:["$",e.reduce((f,E)=>{var R;return f+(((R=E.costBreakdown)==null?void 0:R.totalCost)||0)},0).toFixed(2)]}),r.jsx("div",{className:"stat-label",children:"Total Value"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.filter(f=>f.status==="delivered").length}),r.jsx("div",{className:"stat-label",children:"Delivered"})]})]}),r.jsxs("div",{className:"filters",children:[r.jsxs("div",{className:"filter-group",children:[r.jsx("label",{className:"filter-label",children:"Status"}),r.jsxs("select",{className:"filter-select",value:a,onChange:f=>i(f.target.value),children:[r.jsx("option",{value:"all",children:"All Statuses"}),r.jsx("option",{value:"pending_technical_approval",children:"Pending Tech Approval"}),r.jsx("option",{value:"pending_project_approval",children:"Pending Project Approval"}),r.jsx("option",{value:"approved_for_purchase",children:"Approved for Purchase"}),r.jsx("option",{value:"purchased",children:"Purchased"}),r.jsx("option",{value:"delivered",children:"Delivered"}),r.jsx("option",{value:"denied",children:"Denied"})]})]}),r.jsxs("div",{className:"filter-group",children:[r.jsx("label",{className:"filter-label",children:"Team"}),r.jsxs("select",{className:"filter-select",value:o,onChange:f=>l(f.target.value),children:[r.jsx("option",{value:"all",children:"All Teams"}),O.map(f=>r.jsx("option",{value:f,children:f},f))]})]})]}),b.length===0?r.jsxs("div",{className:"no-orders",children:[r.jsx("h3",{children:"No orders found"}),r.jsx("p",{children:"No orders match your current filters."})]}):r.jsx("div",{className:"orders-grid",children:b.map(f=>r.jsxs("div",{className:"order-card",onClick:()=>v(f),children:[r.jsxs("div",{className:"order-header-section",children:[r.jsxs("div",{className:"order-title-section",children:[r.jsx("h3",{className:"order-part-name",children:f.materialDetails.materialName}),r.jsxs("div",{className:"order-meta",children:[r.jsx("strong",{children:f.submissionDetails.subteam})," • Requested by ",f.submissionDetails.submitterName]}),r.jsxs("div",{className:"order-meta",children:["Submitted: ",new Date(f.submissionTimestamp).toLocaleDateString()]})]}),r.jsxs("div",{className:"order-badges",children:[r.jsx("span",{className:"status-badge",style:{backgroundColor:P(f.status)},children:M(f.status)}),r.jsxs("span",{className:"priority-badge",style:{backgroundColor:_(f.projectDetails.priority)},children:[f.projectDetails.priority," priority"]})]})]}),r.jsxs("div",{className:"order-details",children:[r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Supplier:"}),r.jsx("span",{className:"detail-value",children:f.materialDetails.supplier})]}),r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Quantity:"}),r.jsx("span",{className:"detail-value",children:f.costBreakdown.quantity})]}),r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Unit Price:"}),r.jsxs("span",{className:"detail-value",children:["$",f.costBreakdown.unitPrice.toFixed(2)]})]}),r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Total:"}),r.jsxs("span",{className:"detail-value",children:["$",f.costBreakdown.totalCost.toFixed(2)]})]}),f.deliveryInfo.expectedArrivalDate&&r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Expected Delivery:"}),r.jsx("span",{className:"detail-value",children:new Date(f.deliveryInfo.expectedArrivalDate).toLocaleDateString()})]})]}),r.jsxs("div",{className:"order-notes",children:[r.jsx("strong",{children:"Purpose:"})," ",f.projectDetails.purpose.substring(0,150),f.projectDetails.purpose.length>150&&"..."]}),(p||d||N)&&r.jsxs("div",{className:"order-actions",onClick:E=>E.stopPropagation(),children:[d&&f.status==="pending_technical_approval"&&r.jsxs(r.Fragment,{children:[r.jsx("button",{className:"action-btn approve-btn",onClick:()=>k(f.id,{type:"technical_approval",approved:!0,approvedBy:"tech.director@solarpack.com",comments:"Approved by technical director"}),children:"✓ Tech Approve"}),r.jsx("button",{className:"action-btn reject-btn",onClick:()=>k(f.id,{type:"technical_approval",approved:!1,approvedBy:"tech.director@solarpack.com",denialReason:"Denied by technical director"}),children:"✗ Tech Deny"})]}),N&&f.status==="pending_project_approval"&&r.jsxs(r.Fragment,{children:[r.jsx("button",{className:"action-btn approve-btn",onClick:()=>k(f.id,{type:"project_approval",approved:!0,approvedBy:"project.director@solarpack.com",comments:"Purchase approved"}),children:"✓ Purchase Approve"}),r.jsx("button",{className:"action-btn reject-btn",onClick:()=>k(f.id,{type:"project_approval",approved:!1,approvedBy:"project.director@solarpack.com",denialReason:"Purchase denied"}),children:"✗ Purchase Deny"})]}),p&&f.status==="approved_for_purchase"&&r.jsx("button",{className:"action-btn mark-ordered-btn",onClick:()=>k(f.id,{type:"purchase",purchaseOrderNumber:`PO-${Date.now()}`,actualCost:f.costBreakdown.totalCost,purchasedBy:"purchasing@solarpack.com"}),children:"📦 Mark as Purchased"}),p&&f.status==="purchased"&&r.jsx("button",{className:"action-btn mark-delivered-btn",onClick:()=>k(f.id,{type:"delivery",confirmedBy:"warehouse@solarpack.com",notes:"Delivered to subteam"}),children:"✅ Mark as Delivered"})]})]},f.id))}),g&&r.jsx(Q,{order:g,onClose:()=>v(null)}),c&&r.jsx(y,{})]}):r.jsx("div",{className:"no-permission",children:"You don't have permission to view orders. Contact a team leader for access."})},Dh=()=>{const[e,t]=j.useState(""),[n,s]=j.useState(null),[a,i]=j.useState(!1),[o,l]=j.useState(!1);j.useEffect(()=>{Ce.loadToken()&&(t("*".repeat(20)),g())},[]);const c=()=>{if(!e||e.startsWith("*")){alert("Please enter a valid GitHub token");return}Ce.setToken(e),g()},u=()=>{Ce.clearToken(),t(""),s(null)},g=async()=>{i(!0),s(null);try{const v=await Ce.testConnection();s(v)}catch(v){s({success:!1,error:v.message})}finally{i(!1)}};return r.jsxs("div",{className:"github-settings",children:[r.jsx("style",{children:`
        .github-settings {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          max-width: 600px;
          margin: 0 auto;
        }

        .settings-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.5rem;
          color: var(--text);
          margin: 0 0 1.5rem 0;
        }

        .settings-description {
          color: var(--subtxt);
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          color: var(--text);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .token-input-group {
          display: flex;
          gap: 0.5rem;
        }

        .form-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: #1a1a1a;
          color: var(--text);
          font-size: 0.9rem;
          font-family: monospace;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .toggle-btn {
          background: #666;
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          white-space: nowrap;
        }

        .toggle-btn:hover {
          background: #777;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .save-btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .save-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .test-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .test-btn:hover {
          background: #218838;
        }

        .test-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .clear-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .clear-btn:hover {
          background: #c82333;
        }

        .status-card {
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .status-success {
          background: rgba(40, 167, 69, 0.2);
          border: 1px solid #28a745;
          color: #28a745;
        }

        .status-error {
          background: rgba(220, 53, 69, 0.2);
          border: 1px solid #dc3545;
          color: #dc3545;
        }

        .status-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .status-details {
          font-size: 0.9rem;
          color: var(--subtxt);
        }

        .permissions {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .permission {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .permission-granted {
          background: #28a745;
          color: white;
        }

        .permission-denied {
          background: #dc3545;
          color: white;
        }

        .help-section {
          background: rgba(0, 123, 255, 0.1);
          padding: 1.5rem;
          border-radius: 6px;
          margin-top: 2rem;
        }

        .help-title {
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .help-steps {
          color: var(--text);
          line-height: 1.6;
        }

        .help-steps ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        .help-steps li {
          margin-bottom: 0.5rem;
        }

        .help-steps code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: monospace;
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
      `}),r.jsx("h3",{className:"settings-title",children:"GitHub Integration Settings"}),r.jsx("p",{className:"settings-description",children:"Configure GitHub integration to allow the admin interface to automatically update content files in your repository. This enables seamless content management without manual file editing."}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"GitHub Personal Access Token"}),r.jsxs("div",{className:"token-input-group",children:[r.jsx("input",{type:o?"text":"password",className:"form-input",value:e,onChange:v=>t(v.target.value),placeholder:"ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}),r.jsx("button",{className:"toggle-btn",onClick:()=>l(!o),children:o?"Hide":"Show"})]})]}),r.jsxs("div",{className:"action-buttons",children:[r.jsx("button",{className:"save-btn",onClick:c,children:"Save Token"}),r.jsx("button",{className:"test-btn",onClick:g,disabled:a||!Ce.hasToken(),children:a?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"loading-spinner"}),"Testing..."]}):"Test Connection"}),Ce.hasToken()&&r.jsx("button",{className:"clear-btn",onClick:u,children:"Clear Token"})]}),n&&r.jsxs("div",{className:`status-card ${n.success?"status-success":"status-error"}`,children:[r.jsx("div",{className:"status-title",children:n.success?"✅ Connection Successful":"❌ Connection Failed"}),n.success?r.jsxs("div",{className:"status-details",children:["Connected to repository: ",r.jsxs("strong",{children:[n.owner,"/",n.repo]}),r.jsxs("div",{className:"permissions",children:[r.jsxs("span",{className:`permission ${n.permissions.push?"permission-granted":"permission-denied"}`,children:["Push: ",n.permissions.push?"Granted":"Denied"]}),r.jsxs("span",{className:`permission ${n.permissions.admin?"permission-granted":"permission-denied"}`,children:["Admin: ",n.permissions.admin?"Granted":"Denied"]})]})]}):r.jsxs("div",{className:"status-details",children:["Error: ",n.error]})]}),r.jsxs("div",{className:"help-section",children:[r.jsx("div",{className:"help-title",children:"How to Create a GitHub Personal Access Token:"}),r.jsxs("div",{className:"help-steps",children:[r.jsxs("ol",{children:[r.jsx("li",{children:"Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)"}),r.jsx("li",{children:'Click "Generate new token" → "Generate new token (classic)"'}),r.jsxs("li",{children:["Set expiration and select these scopes:",r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("code",{children:"repo"})," - Full control of private repositories"]}),r.jsxs("li",{children:[r.jsx("code",{children:"workflow"})," - Update GitHub Action workflows (optional)"]})]})]}),r.jsx("li",{children:'Click "Generate token" and copy the token'}),r.jsx("li",{children:'Paste the token above and click "Save Token"'})]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Note:"})," Store this token securely. It provides access to your repository."]})]})]})]})},Ph=({onLogout:e})=>{const[t,n]=j.useState("overview"),[s,a]=j.useState(W.getLevel());j.useEffect(()=>(document.body.style.paddingTop="0",()=>{document.body.style.paddingTop="64px"}),[]),j.useEffect(()=>{const c=()=>W.extendSession();return window.addEventListener("click",c),window.addEventListener("keypress",c),()=>{window.removeEventListener("click",c),window.removeEventListener("keypress",c)}},[]);const o=[{id:"overview",label:"Overview",icon:dh,permission:"view_schedules"},{id:"team",label:"Team",icon:Nh,permission:"view_team"},{id:"schedules",label:"Schedules",icon:ch,permission:"view_schedules"},{id:"orders",label:"Orders",icon:hh,permission:"submit_orders"},{id:"alumni",label:"Alumni",icon:ph,permission:"edit_announcements"},{id:"sponsors",label:"Sponsors",icon:oh,permission:"edit_announcements"},{id:"settings",label:"Settings",icon:jh,permission:"manage_users"}].filter(c=>W.hasPermission(c.permission)),l=()=>{switch(t){case"team":return r.jsx(Zf,{});case"schedules":return r.jsx(eh,{});case"orders":return r.jsx(Eh,{});case"alumni":return r.jsx(Sh,{});case"sponsors":return r.jsx(Ch,{});case"settings":return r.jsx(Dh,{});default:return r.jsx(Th,{})}};return r.jsxs("div",{className:"admin-dashboard",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("header",{className:"dashboard-header",children:[r.jsx("h1",{className:"dashboard-title",children:"Dashboard"}),r.jsxs("div",{className:"user-info",children:[r.jsx("span",{className:"user-level",children:s}),r.jsx("button",{className:"logout-button",onClick:e,children:"Logout"})]})]}),r.jsx("nav",{className:"dashboard-nav",children:r.jsx("div",{className:"nav-tabs",children:o.map(c=>{const u=c.icon;return r.jsxs("button",{className:`nav-tab ${t===c.id?"active":""}`,onClick:()=>n(c.id),children:[r.jsx(u,{size:18}),c.label]},c.id)})})}),r.jsx("main",{className:"dashboard-content",children:l()})]})},Th=()=>{const[e,t]=j.useState({teamMembers:0,activeSchedules:0,pendingOrders:0,totalAlumni:0});return j.useEffect(()=>{(async()=>{var s,a,i,o;try{const[l,c,u]=await Promise.all([fetch("/data/team.json"),fetch("/data/schedules.json"),fetch("/data/alumni.json")]),[g,v,m]=await Promise.all([l.json(),c.json(),u.ok?u.json():{alumniData:[]}]),S=((s=m.alumniData)==null?void 0:s.reduce((C,k)=>{var D;return C+(((D=k.leadership)==null?void 0:D.length)||0)},0))||0;t({teamMembers:((a=g.teamMembers)==null?void 0:a.length)||0,activeSchedules:((i=v.schedules)==null?void 0:i.filter(C=>C.status==="active"||C.status==="upcoming").length)||0,pendingOrders:((o=v.orders)==null?void 0:o.filter(C=>C.status==="pending_approval").length)||0,totalAlumni:S})}catch(l){console.error("Error loading stats:",l)}})()},[]),r.jsxs("div",{className:"overview",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"overview-grid",children:[r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.teamMembers}),r.jsx("div",{className:"stat-label",children:"Team Members"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.activeSchedules}),r.jsx("div",{className:"stat-label",children:"Active Schedules"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.pendingOrders}),r.jsx("div",{className:"stat-label",children:"Pending Orders"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.totalAlumni}),r.jsx("div",{className:"stat-label",children:"Total Alumni"})]})]}),r.jsxs("div",{className:"quick-actions",children:[r.jsx("h3",{children:"Quick Actions"}),r.jsxs("div",{className:"action-buttons",children:[W.hasPermission("edit_team")&&r.jsx("button",{className:"action-button",children:"Add Team Member"}),W.hasPermission("edit_schedules")&&r.jsx("button",{className:"action-button",children:"Create Schedule"}),W.hasPermission("submit_orders")&&r.jsx("button",{className:"action-button",children:"Submit Order"}),W.hasPermission("edit_announcements")&&r.jsx("button",{className:"action-button",children:"Manage Alumni"}),W.hasPermission("edit_announcements")&&r.jsx("button",{className:"action-button",children:"Manage Sponsors"})]})]})]})},_h=()=>{const[e,t]=j.useState(!1),[n,s]=j.useState(!0),a=uo();j.useEffect(()=>{(()=>{const c=W.isAuthenticated();t(c),s(!1)})()},[]);const i=()=>{t(!0)},o=()=>{W.logout(),t(!1),a("/")};return n?r.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"#888"},children:"Loading..."}):r.jsx("div",{className:"admin-app",children:e?r.jsx(Ph,{onLogout:o}):r.jsx(Jf,{onLogin:i})})};function zh(){return r.jsxs(El,{children:[r.jsx(be,{path:"/admin",element:r.jsx(_h,{})}),r.jsx(be,{path:"/*",element:r.jsx(Af,{children:r.jsxs(El,{children:[r.jsx(be,{path:"/",element:r.jsx(Ff,{})}),r.jsx(be,{path:"/app",element:r.jsx($f,{})}),r.jsx(be,{path:"/alumni",element:r.jsx(Uf,{})}),r.jsx(be,{path:"/contact",element:r.jsx(Hf,{})}),r.jsx(be,{path:"/donate",element:r.jsx(Wf,{})}),r.jsx(be,{path:"/privacy-policy",element:r.jsx(Vf,{})}),r.jsx(be,{path:"/sponsors",element:r.jsx(Qf,{})}),r.jsx(be,{path:"/schedules",element:r.jsx(Kf,{})}),r.jsx(be,{path:"/team",element:r.jsx(Gf,{})}),r.jsx(be,{path:"*",element:r.jsx(Xf,{})})]})})})]})}xa.createRoot(document.getElementById("root")).render(r.jsx(Ul.StrictMode,{children:r.jsx(Tf,{basename:"/",children:r.jsx(zh,{})})}));
