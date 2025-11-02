function dd(e,t){for(var n=0;n<t.length;n++){const s=t[n];if(typeof s!="string"&&!Array.isArray(s)){for(const a in s)if(a!=="default"&&!(a in e)){const o=Object.getOwnPropertyDescriptor(s,a);o&&Object.defineProperty(e,a,o.get?o:{enumerable:!0,get:()=>s[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();function md(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ol={exports:{}},Ts={},Al={exports:{}},$={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fr=Symbol.for("react.element"),pd=Symbol.for("react.portal"),fd=Symbol.for("react.fragment"),hd=Symbol.for("react.strict_mode"),gd=Symbol.for("react.profiler"),vd=Symbol.for("react.provider"),xd=Symbol.for("react.context"),yd=Symbol.for("react.forward_ref"),jd=Symbol.for("react.suspense"),wd=Symbol.for("react.memo"),bd=Symbol.for("react.lazy"),gi=Symbol.iterator;function kd(e){return e===null||typeof e!="object"?null:(e=gi&&e[gi]||e["@@iterator"],typeof e=="function"?e:null)}var $l={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Fl=Object.assign,Bl={};function kn(e,t,n){this.props=e,this.context=t,this.refs=Bl,this.updater=n||$l}kn.prototype.isReactComponent={};kn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};kn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ul(){}Ul.prototype=kn.prototype;function yo(e,t,n){this.props=e,this.context=t,this.refs=Bl,this.updater=n||$l}var jo=yo.prototype=new Ul;jo.constructor=yo;Fl(jo,kn.prototype);jo.isPureReactComponent=!0;var vi=Array.isArray,Hl=Object.prototype.hasOwnProperty,wo={current:null},Wl={key:!0,ref:!0,__self:!0,__source:!0};function Vl(e,t,n){var s,a={},o=null,i=null;if(t!=null)for(s in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Hl.call(t,s)&&!Wl.hasOwnProperty(s)&&(a[s]=t[s]);var l=arguments.length-2;if(l===1)a.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}if(e&&e.defaultProps)for(s in l=e.defaultProps,l)a[s]===void 0&&(a[s]=l[s]);return{$$typeof:fr,type:e,key:o,ref:i,props:a,_owner:wo.current}}function Nd(e,t){return{$$typeof:fr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function bo(e){return typeof e=="object"&&e!==null&&e.$$typeof===fr}function Sd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var xi=/\/+/g;function Ys(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Sd(""+e.key):t.toString(36)}function Hr(e,t,n,s,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case fr:case pd:i=!0}}if(i)return i=e,a=a(i),e=s===""?"."+Ys(i,0):s,vi(a)?(n="",e!=null&&(n=e.replace(xi,"$&/")+"/"),Hr(a,t,n,"",function(d){return d})):a!=null&&(bo(a)&&(a=Nd(a,n+(!a.key||i&&i.key===a.key?"":(""+a.key).replace(xi,"$&/")+"/")+e)),t.push(a)),1;if(i=0,s=s===""?".":s+":",vi(e))for(var l=0;l<e.length;l++){o=e[l];var c=s+Ys(o,l);i+=Hr(o,t,n,c,a)}else if(c=kd(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=s+Ys(o,l++),i+=Hr(o,t,n,c,a);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function kr(e,t,n){if(e==null)return e;var s=[],a=0;return Hr(e,s,"","",function(o){return t.call(n,o,a++)}),s}function Cd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var xe={current:null},Wr={transition:null},Ed={ReactCurrentDispatcher:xe,ReactCurrentBatchConfig:Wr,ReactCurrentOwner:wo};function Gl(){throw Error("act(...) is not supported in production builds of React.")}$.Children={map:kr,forEach:function(e,t,n){kr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return kr(e,function(){t++}),t},toArray:function(e){return kr(e,function(t){return t})||[]},only:function(e){if(!bo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};$.Component=kn;$.Fragment=fd;$.Profiler=gd;$.PureComponent=yo;$.StrictMode=hd;$.Suspense=jd;$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ed;$.act=Gl;$.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=Fl({},e.props),a=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=wo.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Hl.call(t,c)&&!Wl.hasOwnProperty(c)&&(s[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}return{$$typeof:fr,type:e.type,key:a,ref:o,props:s,_owner:i}};$.createContext=function(e){return e={$$typeof:xd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:vd,_context:e},e.Consumer=e};$.createElement=Vl;$.createFactory=function(e){var t=Vl.bind(null,e);return t.type=e,t};$.createRef=function(){return{current:null}};$.forwardRef=function(e){return{$$typeof:yd,render:e}};$.isValidElement=bo;$.lazy=function(e){return{$$typeof:bd,_payload:{_status:-1,_result:e},_init:Cd}};$.memo=function(e,t){return{$$typeof:wd,type:e,compare:t===void 0?null:t}};$.startTransition=function(e){var t=Wr.transition;Wr.transition={};try{e()}finally{Wr.transition=t}};$.unstable_act=Gl;$.useCallback=function(e,t){return xe.current.useCallback(e,t)};$.useContext=function(e){return xe.current.useContext(e)};$.useDebugValue=function(){};$.useDeferredValue=function(e){return xe.current.useDeferredValue(e)};$.useEffect=function(e,t){return xe.current.useEffect(e,t)};$.useId=function(){return xe.current.useId()};$.useImperativeHandle=function(e,t,n){return xe.current.useImperativeHandle(e,t,n)};$.useInsertionEffect=function(e,t){return xe.current.useInsertionEffect(e,t)};$.useLayoutEffect=function(e,t){return xe.current.useLayoutEffect(e,t)};$.useMemo=function(e,t){return xe.current.useMemo(e,t)};$.useReducer=function(e,t,n){return xe.current.useReducer(e,t,n)};$.useRef=function(e){return xe.current.useRef(e)};$.useState=function(e){return xe.current.useState(e)};$.useSyncExternalStore=function(e,t,n){return xe.current.useSyncExternalStore(e,t,n)};$.useTransition=function(){return xe.current.useTransition()};$.version="18.3.1";Al.exports=$;var k=Al.exports;const Ql=md(k),Dd=dd({__proto__:null,default:Ql},[k]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pd=k,Td=Symbol.for("react.element"),_d=Symbol.for("react.fragment"),zd=Object.prototype.hasOwnProperty,Ld=Pd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Id={key:!0,ref:!0,__self:!0,__source:!0};function Yl(e,t,n){var s,a={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(s in t)zd.call(t,s)&&!Id.hasOwnProperty(s)&&(a[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)a[s]===void 0&&(a[s]=t[s]);return{$$typeof:Td,type:e,key:o,ref:i,props:a,_owner:Ld.current}}Ts.Fragment=_d;Ts.jsx=Yl;Ts.jsxs=Yl;Ol.exports=Ts;var r=Ol.exports,wa={},Kl={exports:{}},Te={},Jl={exports:{}},Xl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(_,O){var A=_.length;_.push(O);e:for(;0<A;){var q=A-1>>>1,ae=_[q];if(0<a(ae,O))_[q]=O,_[A]=ae,A=q;else break e}}function n(_){return _.length===0?null:_[0]}function s(_){if(_.length===0)return null;var O=_[0],A=_.pop();if(A!==O){_[0]=A;e:for(var q=0,ae=_.length,wr=ae>>>1;q<wr;){var Pt=2*(q+1)-1,Qs=_[Pt],Tt=Pt+1,br=_[Tt];if(0>a(Qs,A))Tt<ae&&0>a(br,Qs)?(_[q]=br,_[Tt]=A,q=Tt):(_[q]=Qs,_[Pt]=A,q=Pt);else if(Tt<ae&&0>a(br,A))_[q]=br,_[Tt]=A,q=Tt;else break e}}return O}function a(_,O){var A=_.sortIndex-O.sortIndex;return A!==0?A:_.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var c=[],d=[],g=1,v=null,p=3,N=!1,S=!1,C=!1,P=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(_){for(var O=n(d);O!==null;){if(O.callback===null)s(d);else if(O.startTime<=_)s(d),O.sortIndex=O.expirationTime,t(c,O);else break;O=n(d)}}function x(_){if(C=!1,m(_),!S)if(n(c)!==null)S=!0,M(u);else{var O=n(d);O!==null&&se(x,O.startTime-_)}}function u(_,O){S=!1,C&&(C=!1,y(E),E=-1),N=!0;var A=p;try{for(m(O),v=n(c);v!==null&&(!(v.expirationTime>O)||_&&!R());){var q=v.callback;if(typeof q=="function"){v.callback=null,p=v.priorityLevel;var ae=q(v.expirationTime<=O);O=e.unstable_now(),typeof ae=="function"?v.callback=ae:v===n(c)&&s(c),m(O)}else s(c);v=n(c)}if(v!==null)var wr=!0;else{var Pt=n(d);Pt!==null&&se(x,Pt.startTime-O),wr=!1}return wr}finally{v=null,p=A,N=!1}}var j=!1,w=null,E=-1,L=5,I=-1;function R(){return!(e.unstable_now()-I<L)}function B(){if(w!==null){var _=e.unstable_now();I=_;var O=!0;try{O=w(!0,_)}finally{O?b():(j=!1,w=null)}}else j=!1}var b;if(typeof f=="function")b=function(){f(B)};else if(typeof MessageChannel<"u"){var h=new MessageChannel,D=h.port2;h.port1.onmessage=B,b=function(){D.postMessage(null)}}else b=function(){P(B,0)};function M(_){w=_,j||(j=!0,b())}function se(_,O){E=P(function(){_(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(_){_.callback=null},e.unstable_continueExecution=function(){S||N||(S=!0,M(u))},e.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<_?Math.floor(1e3/_):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(_){switch(p){case 1:case 2:case 3:var O=3;break;default:O=p}var A=p;p=O;try{return _()}finally{p=A}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(_,O){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var A=p;p=_;try{return O()}finally{p=A}},e.unstable_scheduleCallback=function(_,O,A){var q=e.unstable_now();switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?q+A:q):A=q,_){case 1:var ae=-1;break;case 2:ae=250;break;case 5:ae=1073741823;break;case 4:ae=1e4;break;default:ae=5e3}return ae=A+ae,_={id:g++,callback:O,priorityLevel:_,startTime:A,expirationTime:ae,sortIndex:-1},A>q?(_.sortIndex=A,t(d,_),n(c)===null&&_===n(d)&&(C?(y(E),E=-1):C=!0,se(x,A-q))):(_.sortIndex=ae,t(c,_),S||N||(S=!0,M(u))),_},e.unstable_shouldYield=R,e.unstable_wrapCallback=function(_){var O=p;return function(){var A=p;p=O;try{return _.apply(this,arguments)}finally{p=A}}}})(Xl);Jl.exports=Xl;var Md=Jl.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rd=k,Pe=Md;function T(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ql=new Set,Kn={};function Wt(e,t){gn(e,t),gn(e+"Capture",t)}function gn(e,t){for(Kn[e]=t,e=0;e<t.length;e++)ql.add(t[e])}var nt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ba=Object.prototype.hasOwnProperty,Od=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,yi={},ji={};function Ad(e){return ba.call(ji,e)?!0:ba.call(yi,e)?!1:Od.test(e)?ji[e]=!0:(yi[e]=!0,!1)}function $d(e,t,n,s){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Fd(e,t,n,s){if(t===null||typeof t>"u"||$d(e,t,n,s))return!0;if(s)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ye(e,t,n,s,a,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var de={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){de[e]=new ye(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];de[t]=new ye(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){de[e]=new ye(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){de[e]=new ye(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){de[e]=new ye(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){de[e]=new ye(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){de[e]=new ye(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){de[e]=new ye(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){de[e]=new ye(e,5,!1,e.toLowerCase(),null,!1,!1)});var ko=/[\-:]([a-z])/g;function No(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ko,No);de[t]=new ye(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ko,No);de[t]=new ye(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ko,No);de[t]=new ye(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){de[e]=new ye(e,1,!1,e.toLowerCase(),null,!1,!1)});de.xlinkHref=new ye("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){de[e]=new ye(e,1,!1,e.toLowerCase(),null,!0,!0)});function So(e,t,n,s){var a=de.hasOwnProperty(t)?de[t]:null;(a!==null?a.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Fd(t,n,a,s)&&(n=null),s||a===null?Ad(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,s=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,s?e.setAttributeNS(s,t,n):e.setAttribute(t,n))))}var ot=Rd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Nr=Symbol.for("react.element"),Kt=Symbol.for("react.portal"),Jt=Symbol.for("react.fragment"),Co=Symbol.for("react.strict_mode"),ka=Symbol.for("react.profiler"),Zl=Symbol.for("react.provider"),ec=Symbol.for("react.context"),Eo=Symbol.for("react.forward_ref"),Na=Symbol.for("react.suspense"),Sa=Symbol.for("react.suspense_list"),Do=Symbol.for("react.memo"),lt=Symbol.for("react.lazy"),tc=Symbol.for("react.offscreen"),wi=Symbol.iterator;function En(e){return e===null||typeof e!="object"?null:(e=wi&&e[wi]||e["@@iterator"],typeof e=="function"?e:null)}var J=Object.assign,Ks;function Mn(e){if(Ks===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ks=t&&t[1]||""}return`
`+Ks+e}var Js=!1;function Xs(e,t){if(!e||Js)return"";Js=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var s=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){s=d}e.call(t.prototype)}else{try{throw Error()}catch(d){s=d}e()}}catch(d){if(d&&s&&typeof d.stack=="string"){for(var a=d.stack.split(`
`),o=s.stack.split(`
`),i=a.length-1,l=o.length-1;1<=i&&0<=l&&a[i]!==o[l];)l--;for(;1<=i&&0<=l;i--,l--)if(a[i]!==o[l]){if(i!==1||l!==1)do if(i--,l--,0>l||a[i]!==o[l]){var c=`
`+a[i].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=i&&0<=l);break}}}finally{Js=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Mn(e):""}function Bd(e){switch(e.tag){case 5:return Mn(e.type);case 16:return Mn("Lazy");case 13:return Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 2:case 15:return e=Xs(e.type,!1),e;case 11:return e=Xs(e.type.render,!1),e;case 1:return e=Xs(e.type,!0),e;default:return""}}function Ca(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Jt:return"Fragment";case Kt:return"Portal";case ka:return"Profiler";case Co:return"StrictMode";case Na:return"Suspense";case Sa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ec:return(e.displayName||"Context")+".Consumer";case Zl:return(e._context.displayName||"Context")+".Provider";case Eo:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Do:return t=e.displayName||null,t!==null?t:Ca(e.type)||"Memo";case lt:t=e._payload,e=e._init;try{return Ca(e(t))}catch{}}return null}function Ud(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ca(t);case 8:return t===Co?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Nt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function nc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Hd(e){var t=nc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(i){s=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return s},setValue:function(i){s=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Sr(e){e._valueTracker||(e._valueTracker=Hd(e))}function rc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),s="";return e&&(s=nc(e)?e.checked?"true":"false":e.value),e=s,e!==n?(t.setValue(e),!0):!1}function ns(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ea(e,t){var n=t.checked;return J({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function bi(e,t){var n=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;n=Nt(t.value!=null?t.value:n),e._wrapperState={initialChecked:s,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function sc(e,t){t=t.checked,t!=null&&So(e,"checked",t,!1)}function Da(e,t){sc(e,t);var n=Nt(t.value),s=t.type;if(n!=null)s==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Pa(e,t.type,n):t.hasOwnProperty("defaultValue")&&Pa(e,t.type,Nt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ki(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Pa(e,t,n){(t!=="number"||ns(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Rn=Array.isArray;function ln(e,t,n,s){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&s&&(e[n].defaultSelected=!0)}else{for(n=""+Nt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,s&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Ta(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(T(91));return J({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ni(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(T(92));if(Rn(n)){if(1<n.length)throw Error(T(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Nt(n)}}function ac(e,t){var n=Nt(t.value),s=Nt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),s!=null&&(e.defaultValue=""+s)}function Si(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function oc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _a(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?oc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Cr,ic=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,s,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,s,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Cr=Cr||document.createElement("div"),Cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Jn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $n={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Wd=["Webkit","ms","Moz","O"];Object.keys($n).forEach(function(e){Wd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),$n[t]=$n[e]})});function lc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||$n.hasOwnProperty(e)&&$n[e]?(""+t).trim():t+"px"}function cc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var s=n.indexOf("--")===0,a=lc(n,t[n],s);n==="float"&&(n="cssFloat"),s?e.setProperty(n,a):e[n]=a}}var Vd=J({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function za(e,t){if(t){if(Vd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(T(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(T(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(T(61))}if(t.style!=null&&typeof t.style!="object")throw Error(T(62))}}function La(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ia=null;function Po(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ma=null,cn=null,un=null;function Ci(e){if(e=vr(e)){if(typeof Ma!="function")throw Error(T(280));var t=e.stateNode;t&&(t=Ms(t),Ma(e.stateNode,e.type,t))}}function uc(e){cn?un?un.push(e):un=[e]:cn=e}function dc(){if(cn){var e=cn,t=un;if(un=cn=null,Ci(e),t)for(e=0;e<t.length;e++)Ci(t[e])}}function mc(e,t){return e(t)}function pc(){}var qs=!1;function fc(e,t,n){if(qs)return e(t,n);qs=!0;try{return mc(e,t,n)}finally{qs=!1,(cn!==null||un!==null)&&(pc(),dc())}}function Xn(e,t){var n=e.stateNode;if(n===null)return null;var s=Ms(n);if(s===null)return null;n=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(T(231,t,typeof n));return n}var Ra=!1;if(nt)try{var Dn={};Object.defineProperty(Dn,"passive",{get:function(){Ra=!0}}),window.addEventListener("test",Dn,Dn),window.removeEventListener("test",Dn,Dn)}catch{Ra=!1}function Gd(e,t,n,s,a,o,i,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(g){this.onError(g)}}var Fn=!1,rs=null,ss=!1,Oa=null,Qd={onError:function(e){Fn=!0,rs=e}};function Yd(e,t,n,s,a,o,i,l,c){Fn=!1,rs=null,Gd.apply(Qd,arguments)}function Kd(e,t,n,s,a,o,i,l,c){if(Yd.apply(this,arguments),Fn){if(Fn){var d=rs;Fn=!1,rs=null}else throw Error(T(198));ss||(ss=!0,Oa=d)}}function Vt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function hc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ei(e){if(Vt(e)!==e)throw Error(T(188))}function Jd(e){var t=e.alternate;if(!t){if(t=Vt(e),t===null)throw Error(T(188));return t!==e?null:e}for(var n=e,s=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(s=a.return,s!==null){n=s;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return Ei(a),e;if(o===s)return Ei(a),t;o=o.sibling}throw Error(T(188))}if(n.return!==s.return)n=a,s=o;else{for(var i=!1,l=a.child;l;){if(l===n){i=!0,n=a,s=o;break}if(l===s){i=!0,s=a,n=o;break}l=l.sibling}if(!i){for(l=o.child;l;){if(l===n){i=!0,n=o,s=a;break}if(l===s){i=!0,s=o,n=a;break}l=l.sibling}if(!i)throw Error(T(189))}}if(n.alternate!==s)throw Error(T(190))}if(n.tag!==3)throw Error(T(188));return n.stateNode.current===n?e:t}function gc(e){return e=Jd(e),e!==null?vc(e):null}function vc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=vc(e);if(t!==null)return t;e=e.sibling}return null}var xc=Pe.unstable_scheduleCallback,Di=Pe.unstable_cancelCallback,Xd=Pe.unstable_shouldYield,qd=Pe.unstable_requestPaint,Z=Pe.unstable_now,Zd=Pe.unstable_getCurrentPriorityLevel,To=Pe.unstable_ImmediatePriority,yc=Pe.unstable_UserBlockingPriority,as=Pe.unstable_NormalPriority,em=Pe.unstable_LowPriority,jc=Pe.unstable_IdlePriority,_s=null,Ke=null;function tm(e){if(Ke&&typeof Ke.onCommitFiberRoot=="function")try{Ke.onCommitFiberRoot(_s,e,void 0,(e.current.flags&128)===128)}catch{}}var He=Math.clz32?Math.clz32:sm,nm=Math.log,rm=Math.LN2;function sm(e){return e>>>=0,e===0?32:31-(nm(e)/rm|0)|0}var Er=64,Dr=4194304;function On(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function os(e,t){var n=e.pendingLanes;if(n===0)return 0;var s=0,a=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var l=i&~a;l!==0?s=On(l):(o&=i,o!==0&&(s=On(o)))}else i=n&~a,i!==0?s=On(i):o!==0&&(s=On(o));if(s===0)return 0;if(t!==0&&t!==s&&!(t&a)&&(a=s&-s,o=t&-t,a>=o||a===16&&(o&4194240)!==0))return t;if(s&4&&(s|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)n=31-He(t),a=1<<n,s|=e[n],t&=~a;return s}function am(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function om(e,t){for(var n=e.suspendedLanes,s=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-He(o),l=1<<i,c=a[i];c===-1?(!(l&n)||l&s)&&(a[i]=am(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function Aa(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function wc(){var e=Er;return Er<<=1,!(Er&4194240)&&(Er=64),e}function Zs(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function hr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-He(t),e[t]=n}function im(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-He(n),o=1<<a;t[a]=0,s[a]=-1,e[a]=-1,n&=~o}}function _o(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var s=31-He(n),a=1<<s;a&t|e[s]&t&&(e[s]|=t),n&=~a}}var U=0;function bc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var kc,zo,Nc,Sc,Cc,$a=!1,Pr=[],ht=null,gt=null,vt=null,qn=new Map,Zn=new Map,ut=[],lm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Pi(e,t){switch(e){case"focusin":case"focusout":ht=null;break;case"dragenter":case"dragleave":gt=null;break;case"mouseover":case"mouseout":vt=null;break;case"pointerover":case"pointerout":qn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zn.delete(t.pointerId)}}function Pn(e,t,n,s,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:s,nativeEvent:o,targetContainers:[a]},t!==null&&(t=vr(t),t!==null&&zo(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function cm(e,t,n,s,a){switch(t){case"focusin":return ht=Pn(ht,e,t,n,s,a),!0;case"dragenter":return gt=Pn(gt,e,t,n,s,a),!0;case"mouseover":return vt=Pn(vt,e,t,n,s,a),!0;case"pointerover":var o=a.pointerId;return qn.set(o,Pn(qn.get(o)||null,e,t,n,s,a)),!0;case"gotpointercapture":return o=a.pointerId,Zn.set(o,Pn(Zn.get(o)||null,e,t,n,s,a)),!0}return!1}function Ec(e){var t=It(e.target);if(t!==null){var n=Vt(t);if(n!==null){if(t=n.tag,t===13){if(t=hc(n),t!==null){e.blockedOn=t,Cc(e.priority,function(){Nc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Vr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Fa(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var s=new n.constructor(n.type,n);Ia=s,n.target.dispatchEvent(s),Ia=null}else return t=vr(n),t!==null&&zo(t),e.blockedOn=n,!1;t.shift()}return!0}function Ti(e,t,n){Vr(e)&&n.delete(t)}function um(){$a=!1,ht!==null&&Vr(ht)&&(ht=null),gt!==null&&Vr(gt)&&(gt=null),vt!==null&&Vr(vt)&&(vt=null),qn.forEach(Ti),Zn.forEach(Ti)}function Tn(e,t){e.blockedOn===t&&(e.blockedOn=null,$a||($a=!0,Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority,um)))}function er(e){function t(a){return Tn(a,e)}if(0<Pr.length){Tn(Pr[0],e);for(var n=1;n<Pr.length;n++){var s=Pr[n];s.blockedOn===e&&(s.blockedOn=null)}}for(ht!==null&&Tn(ht,e),gt!==null&&Tn(gt,e),vt!==null&&Tn(vt,e),qn.forEach(t),Zn.forEach(t),n=0;n<ut.length;n++)s=ut[n],s.blockedOn===e&&(s.blockedOn=null);for(;0<ut.length&&(n=ut[0],n.blockedOn===null);)Ec(n),n.blockedOn===null&&ut.shift()}var dn=ot.ReactCurrentBatchConfig,is=!0;function dm(e,t,n,s){var a=U,o=dn.transition;dn.transition=null;try{U=1,Lo(e,t,n,s)}finally{U=a,dn.transition=o}}function mm(e,t,n,s){var a=U,o=dn.transition;dn.transition=null;try{U=4,Lo(e,t,n,s)}finally{U=a,dn.transition=o}}function Lo(e,t,n,s){if(is){var a=Fa(e,t,n,s);if(a===null)ca(e,t,s,ls,n),Pi(e,s);else if(cm(a,e,t,n,s))s.stopPropagation();else if(Pi(e,s),t&4&&-1<lm.indexOf(e)){for(;a!==null;){var o=vr(a);if(o!==null&&kc(o),o=Fa(e,t,n,s),o===null&&ca(e,t,s,ls,n),o===a)break;a=o}a!==null&&s.stopPropagation()}else ca(e,t,s,null,n)}}var ls=null;function Fa(e,t,n,s){if(ls=null,e=Po(s),e=It(e),e!==null)if(t=Vt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=hc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ls=e,null}function Dc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Zd()){case To:return 1;case yc:return 4;case as:case em:return 16;case jc:return 536870912;default:return 16}default:return 16}}var mt=null,Io=null,Gr=null;function Pc(){if(Gr)return Gr;var e,t=Io,n=t.length,s,a="value"in mt?mt.value:mt.textContent,o=a.length;for(e=0;e<n&&t[e]===a[e];e++);var i=n-e;for(s=1;s<=i&&t[n-s]===a[o-s];s++);return Gr=a.slice(e,1<s?1-s:void 0)}function Qr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Tr(){return!0}function _i(){return!1}function _e(e){function t(n,s,a,o,i){this._reactName=n,this._targetInst=a,this.type=s,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Tr:_i,this.isPropagationStopped=_i,this}return J(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Tr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Tr)},persist:function(){},isPersistent:Tr}),t}var Nn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Mo=_e(Nn),gr=J({},Nn,{view:0,detail:0}),pm=_e(gr),ea,ta,_n,zs=J({},gr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ro,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_n&&(_n&&e.type==="mousemove"?(ea=e.screenX-_n.screenX,ta=e.screenY-_n.screenY):ta=ea=0,_n=e),ea)},movementY:function(e){return"movementY"in e?e.movementY:ta}}),zi=_e(zs),fm=J({},zs,{dataTransfer:0}),hm=_e(fm),gm=J({},gr,{relatedTarget:0}),na=_e(gm),vm=J({},Nn,{animationName:0,elapsedTime:0,pseudoElement:0}),xm=_e(vm),ym=J({},Nn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jm=_e(ym),wm=J({},Nn,{data:0}),Li=_e(wm),bm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},km={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Nm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Nm[e])?!!t[e]:!1}function Ro(){return Sm}var Cm=J({},gr,{key:function(e){if(e.key){var t=bm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?km[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ro,charCode:function(e){return e.type==="keypress"?Qr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Em=_e(Cm),Dm=J({},zs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ii=_e(Dm),Pm=J({},gr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ro}),Tm=_e(Pm),_m=J({},Nn,{propertyName:0,elapsedTime:0,pseudoElement:0}),zm=_e(_m),Lm=J({},zs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Im=_e(Lm),Mm=[9,13,27,32],Oo=nt&&"CompositionEvent"in window,Bn=null;nt&&"documentMode"in document&&(Bn=document.documentMode);var Rm=nt&&"TextEvent"in window&&!Bn,Tc=nt&&(!Oo||Bn&&8<Bn&&11>=Bn),Mi=String.fromCharCode(32),Ri=!1;function _c(e,t){switch(e){case"keyup":return Mm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xt=!1;function Om(e,t){switch(e){case"compositionend":return zc(t);case"keypress":return t.which!==32?null:(Ri=!0,Mi);case"textInput":return e=t.data,e===Mi&&Ri?null:e;default:return null}}function Am(e,t){if(Xt)return e==="compositionend"||!Oo&&_c(e,t)?(e=Pc(),Gr=Io=mt=null,Xt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Tc&&t.locale!=="ko"?null:t.data;default:return null}}var $m={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Oi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!$m[e.type]:t==="textarea"}function Lc(e,t,n,s){uc(s),t=cs(t,"onChange"),0<t.length&&(n=new Mo("onChange","change",null,n,s),e.push({event:n,listeners:t}))}var Un=null,tr=null;function Fm(e){Wc(e,0)}function Ls(e){var t=en(e);if(rc(t))return e}function Bm(e,t){if(e==="change")return t}var Ic=!1;if(nt){var ra;if(nt){var sa="oninput"in document;if(!sa){var Ai=document.createElement("div");Ai.setAttribute("oninput","return;"),sa=typeof Ai.oninput=="function"}ra=sa}else ra=!1;Ic=ra&&(!document.documentMode||9<document.documentMode)}function $i(){Un&&(Un.detachEvent("onpropertychange",Mc),tr=Un=null)}function Mc(e){if(e.propertyName==="value"&&Ls(tr)){var t=[];Lc(t,tr,e,Po(e)),fc(Fm,t)}}function Um(e,t,n){e==="focusin"?($i(),Un=t,tr=n,Un.attachEvent("onpropertychange",Mc)):e==="focusout"&&$i()}function Hm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ls(tr)}function Wm(e,t){if(e==="click")return Ls(t)}function Vm(e,t){if(e==="input"||e==="change")return Ls(t)}function Gm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ve=typeof Object.is=="function"?Object.is:Gm;function nr(e,t){if(Ve(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),s=Object.keys(t);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var a=n[s];if(!ba.call(t,a)||!Ve(e[a],t[a]))return!1}return!0}function Fi(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Bi(e,t){var n=Fi(e);e=0;for(var s;n;){if(n.nodeType===3){if(s=e+n.textContent.length,e<=t&&s>=t)return{node:n,offset:t-e};e=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Fi(n)}}function Rc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Rc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Oc(){for(var e=window,t=ns();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ns(e.document)}return t}function Ao(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Qm(e){var t=Oc(),n=e.focusedElem,s=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Rc(n.ownerDocument.documentElement,n)){if(s!==null&&Ao(n)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,o=Math.min(s.start,a);s=s.end===void 0?o:Math.min(s.end,a),!e.extend&&o>s&&(a=s,s=o,o=a),a=Bi(n,o);var i=Bi(n,s);a&&i&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),o>s?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Ym=nt&&"documentMode"in document&&11>=document.documentMode,qt=null,Ba=null,Hn=null,Ua=!1;function Ui(e,t,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ua||qt==null||qt!==ns(s)||(s=qt,"selectionStart"in s&&Ao(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Hn&&nr(Hn,s)||(Hn=s,s=cs(Ba,"onSelect"),0<s.length&&(t=new Mo("onSelect","select",null,t,n),e.push({event:t,listeners:s}),t.target=qt)))}function _r(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Zt={animationend:_r("Animation","AnimationEnd"),animationiteration:_r("Animation","AnimationIteration"),animationstart:_r("Animation","AnimationStart"),transitionend:_r("Transition","TransitionEnd")},aa={},Ac={};nt&&(Ac=document.createElement("div").style,"AnimationEvent"in window||(delete Zt.animationend.animation,delete Zt.animationiteration.animation,delete Zt.animationstart.animation),"TransitionEvent"in window||delete Zt.transitionend.transition);function Is(e){if(aa[e])return aa[e];if(!Zt[e])return e;var t=Zt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ac)return aa[e]=t[n];return e}var $c=Is("animationend"),Fc=Is("animationiteration"),Bc=Is("animationstart"),Uc=Is("transitionend"),Hc=new Map,Hi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ct(e,t){Hc.set(e,t),Wt(t,[e])}for(var oa=0;oa<Hi.length;oa++){var ia=Hi[oa],Km=ia.toLowerCase(),Jm=ia[0].toUpperCase()+ia.slice(1);Ct(Km,"on"+Jm)}Ct($c,"onAnimationEnd");Ct(Fc,"onAnimationIteration");Ct(Bc,"onAnimationStart");Ct("dblclick","onDoubleClick");Ct("focusin","onFocus");Ct("focusout","onBlur");Ct(Uc,"onTransitionEnd");gn("onMouseEnter",["mouseout","mouseover"]);gn("onMouseLeave",["mouseout","mouseover"]);gn("onPointerEnter",["pointerout","pointerover"]);gn("onPointerLeave",["pointerout","pointerover"]);Wt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var An="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xm=new Set("cancel close invalid load scroll toggle".split(" ").concat(An));function Wi(e,t,n){var s=e.type||"unknown-event";e.currentTarget=n,Kd(s,t,void 0,e),e.currentTarget=null}function Wc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var s=e[n],a=s.event;s=s.listeners;e:{var o=void 0;if(t)for(var i=s.length-1;0<=i;i--){var l=s[i],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==o&&a.isPropagationStopped())break e;Wi(a,l,d),o=c}else for(i=0;i<s.length;i++){if(l=s[i],c=l.instance,d=l.currentTarget,l=l.listener,c!==o&&a.isPropagationStopped())break e;Wi(a,l,d),o=c}}}if(ss)throw e=Oa,ss=!1,Oa=null,e}function W(e,t){var n=t[Qa];n===void 0&&(n=t[Qa]=new Set);var s=e+"__bubble";n.has(s)||(Vc(t,e,2,!1),n.add(s))}function la(e,t,n){var s=0;t&&(s|=4),Vc(n,e,s,t)}var zr="_reactListening"+Math.random().toString(36).slice(2);function rr(e){if(!e[zr]){e[zr]=!0,ql.forEach(function(n){n!=="selectionchange"&&(Xm.has(n)||la(n,!1,e),la(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[zr]||(t[zr]=!0,la("selectionchange",!1,t))}}function Vc(e,t,n,s){switch(Dc(t)){case 1:var a=dm;break;case 4:a=mm;break;default:a=Lo}n=a.bind(null,t,n,e),a=void 0,!Ra||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),s?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function ca(e,t,n,s,a){var o=s;if(!(t&1)&&!(t&2)&&s!==null)e:for(;;){if(s===null)return;var i=s.tag;if(i===3||i===4){var l=s.stateNode.containerInfo;if(l===a||l.nodeType===8&&l.parentNode===a)break;if(i===4)for(i=s.return;i!==null;){var c=i.tag;if((c===3||c===4)&&(c=i.stateNode.containerInfo,c===a||c.nodeType===8&&c.parentNode===a))return;i=i.return}for(;l!==null;){if(i=It(l),i===null)return;if(c=i.tag,c===5||c===6){s=o=i;continue e}l=l.parentNode}}s=s.return}fc(function(){var d=o,g=Po(n),v=[];e:{var p=Hc.get(e);if(p!==void 0){var N=Mo,S=e;switch(e){case"keypress":if(Qr(n)===0)break e;case"keydown":case"keyup":N=Em;break;case"focusin":S="focus",N=na;break;case"focusout":S="blur",N=na;break;case"beforeblur":case"afterblur":N=na;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=zi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=hm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=Tm;break;case $c:case Fc:case Bc:N=xm;break;case Uc:N=zm;break;case"scroll":N=pm;break;case"wheel":N=Im;break;case"copy":case"cut":case"paste":N=jm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=Ii}var C=(t&4)!==0,P=!C&&e==="scroll",y=C?p!==null?p+"Capture":null:p;C=[];for(var f=d,m;f!==null;){m=f;var x=m.stateNode;if(m.tag===5&&x!==null&&(m=x,y!==null&&(x=Xn(f,y),x!=null&&C.push(sr(f,x,m)))),P)break;f=f.return}0<C.length&&(p=new N(p,S,null,n,g),v.push({event:p,listeners:C}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",p&&n!==Ia&&(S=n.relatedTarget||n.fromElement)&&(It(S)||S[rt]))break e;if((N||p)&&(p=g.window===g?g:(p=g.ownerDocument)?p.defaultView||p.parentWindow:window,N?(S=n.relatedTarget||n.toElement,N=d,S=S?It(S):null,S!==null&&(P=Vt(S),S!==P||S.tag!==5&&S.tag!==6)&&(S=null)):(N=null,S=d),N!==S)){if(C=zi,x="onMouseLeave",y="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(C=Ii,x="onPointerLeave",y="onPointerEnter",f="pointer"),P=N==null?p:en(N),m=S==null?p:en(S),p=new C(x,f+"leave",N,n,g),p.target=P,p.relatedTarget=m,x=null,It(g)===d&&(C=new C(y,f+"enter",S,n,g),C.target=m,C.relatedTarget=P,x=C),P=x,N&&S)t:{for(C=N,y=S,f=0,m=C;m;m=Yt(m))f++;for(m=0,x=y;x;x=Yt(x))m++;for(;0<f-m;)C=Yt(C),f--;for(;0<m-f;)y=Yt(y),m--;for(;f--;){if(C===y||y!==null&&C===y.alternate)break t;C=Yt(C),y=Yt(y)}C=null}else C=null;N!==null&&Vi(v,p,N,C,!1),S!==null&&P!==null&&Vi(v,P,S,C,!0)}}e:{if(p=d?en(d):window,N=p.nodeName&&p.nodeName.toLowerCase(),N==="select"||N==="input"&&p.type==="file")var u=Bm;else if(Oi(p))if(Ic)u=Vm;else{u=Hm;var j=Um}else(N=p.nodeName)&&N.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(u=Wm);if(u&&(u=u(e,d))){Lc(v,u,n,g);break e}j&&j(e,p,d),e==="focusout"&&(j=p._wrapperState)&&j.controlled&&p.type==="number"&&Pa(p,"number",p.value)}switch(j=d?en(d):window,e){case"focusin":(Oi(j)||j.contentEditable==="true")&&(qt=j,Ba=d,Hn=null);break;case"focusout":Hn=Ba=qt=null;break;case"mousedown":Ua=!0;break;case"contextmenu":case"mouseup":case"dragend":Ua=!1,Ui(v,n,g);break;case"selectionchange":if(Ym)break;case"keydown":case"keyup":Ui(v,n,g)}var w;if(Oo)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else Xt?_c(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(Tc&&n.locale!=="ko"&&(Xt||E!=="onCompositionStart"?E==="onCompositionEnd"&&Xt&&(w=Pc()):(mt=g,Io="value"in mt?mt.value:mt.textContent,Xt=!0)),j=cs(d,E),0<j.length&&(E=new Li(E,e,null,n,g),v.push({event:E,listeners:j}),w?E.data=w:(w=zc(n),w!==null&&(E.data=w)))),(w=Rm?Om(e,n):Am(e,n))&&(d=cs(d,"onBeforeInput"),0<d.length&&(g=new Li("onBeforeInput","beforeinput",null,n,g),v.push({event:g,listeners:d}),g.data=w))}Wc(v,t)})}function sr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function cs(e,t){for(var n=t+"Capture",s=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=Xn(e,n),o!=null&&s.unshift(sr(e,o,a)),o=Xn(e,t),o!=null&&s.push(sr(e,o,a))),e=e.return}return s}function Yt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Vi(e,t,n,s,a){for(var o=t._reactName,i=[];n!==null&&n!==s;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===s)break;l.tag===5&&d!==null&&(l=d,a?(c=Xn(n,o),c!=null&&i.unshift(sr(n,c,l))):a||(c=Xn(n,o),c!=null&&i.push(sr(n,c,l)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var qm=/\r\n?/g,Zm=/\u0000|\uFFFD/g;function Gi(e){return(typeof e=="string"?e:""+e).replace(qm,`
`).replace(Zm,"")}function Lr(e,t,n){if(t=Gi(t),Gi(e)!==t&&n)throw Error(T(425))}function us(){}var Ha=null,Wa=null;function Va(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ga=typeof setTimeout=="function"?setTimeout:void 0,ep=typeof clearTimeout=="function"?clearTimeout:void 0,Qi=typeof Promise=="function"?Promise:void 0,tp=typeof queueMicrotask=="function"?queueMicrotask:typeof Qi<"u"?function(e){return Qi.resolve(null).then(e).catch(np)}:Ga;function np(e){setTimeout(function(){throw e})}function ua(e,t){var n=t,s=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(s===0){e.removeChild(a),er(t);return}s--}else n!=="$"&&n!=="$?"&&n!=="$!"||s++;n=a}while(n);er(t)}function xt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Yi(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Sn=Math.random().toString(36).slice(2),Ye="__reactFiber$"+Sn,ar="__reactProps$"+Sn,rt="__reactContainer$"+Sn,Qa="__reactEvents$"+Sn,rp="__reactListeners$"+Sn,sp="__reactHandles$"+Sn;function It(e){var t=e[Ye];if(t)return t;for(var n=e.parentNode;n;){if(t=n[rt]||n[Ye]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Yi(e);e!==null;){if(n=e[Ye])return n;e=Yi(e)}return t}e=n,n=e.parentNode}return null}function vr(e){return e=e[Ye]||e[rt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function en(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(T(33))}function Ms(e){return e[ar]||null}var Ya=[],tn=-1;function Et(e){return{current:e}}function G(e){0>tn||(e.current=Ya[tn],Ya[tn]=null,tn--)}function H(e,t){tn++,Ya[tn]=e.current,e.current=t}var St={},he=Et(St),be=Et(!1),$t=St;function vn(e,t){var n=e.type.contextTypes;if(!n)return St;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in n)a[o]=t[o];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ke(e){return e=e.childContextTypes,e!=null}function ds(){G(be),G(he)}function Ki(e,t,n){if(he.current!==St)throw Error(T(168));H(he,t),H(be,n)}function Gc(e,t,n){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return n;s=s.getChildContext();for(var a in s)if(!(a in t))throw Error(T(108,Ud(e)||"Unknown",a));return J({},n,s)}function ms(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||St,$t=he.current,H(he,e),H(be,be.current),!0}function Ji(e,t,n){var s=e.stateNode;if(!s)throw Error(T(169));n?(e=Gc(e,t,$t),s.__reactInternalMemoizedMergedChildContext=e,G(be),G(he),H(he,e)):G(be),H(be,n)}var qe=null,Rs=!1,da=!1;function Qc(e){qe===null?qe=[e]:qe.push(e)}function ap(e){Rs=!0,Qc(e)}function Dt(){if(!da&&qe!==null){da=!0;var e=0,t=U;try{var n=qe;for(U=1;e<n.length;e++){var s=n[e];do s=s(!0);while(s!==null)}qe=null,Rs=!1}catch(a){throw qe!==null&&(qe=qe.slice(e+1)),xc(To,Dt),a}finally{U=t,da=!1}}return null}var nn=[],rn=0,ps=null,fs=0,ze=[],Le=0,Ft=null,Ze=1,et="";function zt(e,t){nn[rn++]=fs,nn[rn++]=ps,ps=e,fs=t}function Yc(e,t,n){ze[Le++]=Ze,ze[Le++]=et,ze[Le++]=Ft,Ft=e;var s=Ze;e=et;var a=32-He(s)-1;s&=~(1<<a),n+=1;var o=32-He(t)+a;if(30<o){var i=a-a%5;o=(s&(1<<i)-1).toString(32),s>>=i,a-=i,Ze=1<<32-He(t)+a|n<<a|s,et=o+e}else Ze=1<<o|n<<a|s,et=e}function $o(e){e.return!==null&&(zt(e,1),Yc(e,1,0))}function Fo(e){for(;e===ps;)ps=nn[--rn],nn[rn]=null,fs=nn[--rn],nn[rn]=null;for(;e===Ft;)Ft=ze[--Le],ze[Le]=null,et=ze[--Le],ze[Le]=null,Ze=ze[--Le],ze[Le]=null}var De=null,Ee=null,Q=!1,Be=null;function Kc(e,t){var n=Ie(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Xi(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,De=e,Ee=xt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,De=e,Ee=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ft!==null?{id:Ze,overflow:et}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ie(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,De=e,Ee=null,!0):!1;default:return!1}}function Ka(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ja(e){if(Q){var t=Ee;if(t){var n=t;if(!Xi(e,t)){if(Ka(e))throw Error(T(418));t=xt(n.nextSibling);var s=De;t&&Xi(e,t)?Kc(s,n):(e.flags=e.flags&-4097|2,Q=!1,De=e)}}else{if(Ka(e))throw Error(T(418));e.flags=e.flags&-4097|2,Q=!1,De=e}}}function qi(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;De=e}function Ir(e){if(e!==De)return!1;if(!Q)return qi(e),Q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Va(e.type,e.memoizedProps)),t&&(t=Ee)){if(Ka(e))throw Jc(),Error(T(418));for(;t;)Kc(e,t),t=xt(t.nextSibling)}if(qi(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(T(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ee=xt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ee=null}}else Ee=De?xt(e.stateNode.nextSibling):null;return!0}function Jc(){for(var e=Ee;e;)e=xt(e.nextSibling)}function xn(){Ee=De=null,Q=!1}function Bo(e){Be===null?Be=[e]:Be.push(e)}var op=ot.ReactCurrentBatchConfig;function zn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(T(309));var s=n.stateNode}if(!s)throw Error(T(147,e));var a=s,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var l=a.refs;i===null?delete l[o]:l[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(T(284));if(!n._owner)throw Error(T(290,e))}return e}function Mr(e,t){throw e=Object.prototype.toString.call(t),Error(T(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Zi(e){var t=e._init;return t(e._payload)}function Xc(e){function t(y,f){if(e){var m=y.deletions;m===null?(y.deletions=[f],y.flags|=16):m.push(f)}}function n(y,f){if(!e)return null;for(;f!==null;)t(y,f),f=f.sibling;return null}function s(y,f){for(y=new Map;f!==null;)f.key!==null?y.set(f.key,f):y.set(f.index,f),f=f.sibling;return y}function a(y,f){return y=bt(y,f),y.index=0,y.sibling=null,y}function o(y,f,m){return y.index=m,e?(m=y.alternate,m!==null?(m=m.index,m<f?(y.flags|=2,f):m):(y.flags|=2,f)):(y.flags|=1048576,f)}function i(y){return e&&y.alternate===null&&(y.flags|=2),y}function l(y,f,m,x){return f===null||f.tag!==6?(f=xa(m,y.mode,x),f.return=y,f):(f=a(f,m),f.return=y,f)}function c(y,f,m,x){var u=m.type;return u===Jt?g(y,f,m.props.children,x,m.key):f!==null&&(f.elementType===u||typeof u=="object"&&u!==null&&u.$$typeof===lt&&Zi(u)===f.type)?(x=a(f,m.props),x.ref=zn(y,f,m),x.return=y,x):(x=es(m.type,m.key,m.props,null,y.mode,x),x.ref=zn(y,f,m),x.return=y,x)}function d(y,f,m,x){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=ya(m,y.mode,x),f.return=y,f):(f=a(f,m.children||[]),f.return=y,f)}function g(y,f,m,x,u){return f===null||f.tag!==7?(f=At(m,y.mode,x,u),f.return=y,f):(f=a(f,m),f.return=y,f)}function v(y,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=xa(""+f,y.mode,m),f.return=y,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Nr:return m=es(f.type,f.key,f.props,null,y.mode,m),m.ref=zn(y,null,f),m.return=y,m;case Kt:return f=ya(f,y.mode,m),f.return=y,f;case lt:var x=f._init;return v(y,x(f._payload),m)}if(Rn(f)||En(f))return f=At(f,y.mode,m,null),f.return=y,f;Mr(y,f)}return null}function p(y,f,m,x){var u=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return u!==null?null:l(y,f,""+m,x);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Nr:return m.key===u?c(y,f,m,x):null;case Kt:return m.key===u?d(y,f,m,x):null;case lt:return u=m._init,p(y,f,u(m._payload),x)}if(Rn(m)||En(m))return u!==null?null:g(y,f,m,x,null);Mr(y,m)}return null}function N(y,f,m,x,u){if(typeof x=="string"&&x!==""||typeof x=="number")return y=y.get(m)||null,l(f,y,""+x,u);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Nr:return y=y.get(x.key===null?m:x.key)||null,c(f,y,x,u);case Kt:return y=y.get(x.key===null?m:x.key)||null,d(f,y,x,u);case lt:var j=x._init;return N(y,f,m,j(x._payload),u)}if(Rn(x)||En(x))return y=y.get(m)||null,g(f,y,x,u,null);Mr(f,x)}return null}function S(y,f,m,x){for(var u=null,j=null,w=f,E=f=0,L=null;w!==null&&E<m.length;E++){w.index>E?(L=w,w=null):L=w.sibling;var I=p(y,w,m[E],x);if(I===null){w===null&&(w=L);break}e&&w&&I.alternate===null&&t(y,w),f=o(I,f,E),j===null?u=I:j.sibling=I,j=I,w=L}if(E===m.length)return n(y,w),Q&&zt(y,E),u;if(w===null){for(;E<m.length;E++)w=v(y,m[E],x),w!==null&&(f=o(w,f,E),j===null?u=w:j.sibling=w,j=w);return Q&&zt(y,E),u}for(w=s(y,w);E<m.length;E++)L=N(w,y,E,m[E],x),L!==null&&(e&&L.alternate!==null&&w.delete(L.key===null?E:L.key),f=o(L,f,E),j===null?u=L:j.sibling=L,j=L);return e&&w.forEach(function(R){return t(y,R)}),Q&&zt(y,E),u}function C(y,f,m,x){var u=En(m);if(typeof u!="function")throw Error(T(150));if(m=u.call(m),m==null)throw Error(T(151));for(var j=u=null,w=f,E=f=0,L=null,I=m.next();w!==null&&!I.done;E++,I=m.next()){w.index>E?(L=w,w=null):L=w.sibling;var R=p(y,w,I.value,x);if(R===null){w===null&&(w=L);break}e&&w&&R.alternate===null&&t(y,w),f=o(R,f,E),j===null?u=R:j.sibling=R,j=R,w=L}if(I.done)return n(y,w),Q&&zt(y,E),u;if(w===null){for(;!I.done;E++,I=m.next())I=v(y,I.value,x),I!==null&&(f=o(I,f,E),j===null?u=I:j.sibling=I,j=I);return Q&&zt(y,E),u}for(w=s(y,w);!I.done;E++,I=m.next())I=N(w,y,E,I.value,x),I!==null&&(e&&I.alternate!==null&&w.delete(I.key===null?E:I.key),f=o(I,f,E),j===null?u=I:j.sibling=I,j=I);return e&&w.forEach(function(B){return t(y,B)}),Q&&zt(y,E),u}function P(y,f,m,x){if(typeof m=="object"&&m!==null&&m.type===Jt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Nr:e:{for(var u=m.key,j=f;j!==null;){if(j.key===u){if(u=m.type,u===Jt){if(j.tag===7){n(y,j.sibling),f=a(j,m.props.children),f.return=y,y=f;break e}}else if(j.elementType===u||typeof u=="object"&&u!==null&&u.$$typeof===lt&&Zi(u)===j.type){n(y,j.sibling),f=a(j,m.props),f.ref=zn(y,j,m),f.return=y,y=f;break e}n(y,j);break}else t(y,j);j=j.sibling}m.type===Jt?(f=At(m.props.children,y.mode,x,m.key),f.return=y,y=f):(x=es(m.type,m.key,m.props,null,y.mode,x),x.ref=zn(y,f,m),x.return=y,y=x)}return i(y);case Kt:e:{for(j=m.key;f!==null;){if(f.key===j)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(y,f.sibling),f=a(f,m.children||[]),f.return=y,y=f;break e}else{n(y,f);break}else t(y,f);f=f.sibling}f=ya(m,y.mode,x),f.return=y,y=f}return i(y);case lt:return j=m._init,P(y,f,j(m._payload),x)}if(Rn(m))return S(y,f,m,x);if(En(m))return C(y,f,m,x);Mr(y,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(y,f.sibling),f=a(f,m),f.return=y,y=f):(n(y,f),f=xa(m,y.mode,x),f.return=y,y=f),i(y)):n(y,f)}return P}var yn=Xc(!0),qc=Xc(!1),hs=Et(null),gs=null,sn=null,Uo=null;function Ho(){Uo=sn=gs=null}function Wo(e){var t=hs.current;G(hs),e._currentValue=t}function Xa(e,t,n){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===n)break;e=e.return}}function mn(e,t){gs=e,Uo=sn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(we=!0),e.firstContext=null)}function Re(e){var t=e._currentValue;if(Uo!==e)if(e={context:e,memoizedValue:t,next:null},sn===null){if(gs===null)throw Error(T(308));sn=e,gs.dependencies={lanes:0,firstContext:e}}else sn=sn.next=e;return t}var Mt=null;function Vo(e){Mt===null?Mt=[e]:Mt.push(e)}function Zc(e,t,n,s){var a=t.interleaved;return a===null?(n.next=n,Vo(t)):(n.next=a.next,a.next=n),t.interleaved=n,st(e,s)}function st(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ct=!1;function Go(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function eu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function tt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function yt(e,t,n){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,F&2){var a=s.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),s.pending=t,st(e,n)}return a=s.interleaved,a===null?(t.next=t,Vo(s)):(t.next=a.next,a.next=t),s.interleaved=t,st(e,n)}function Yr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,_o(e,n)}}function el(e,t){var n=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var a=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?a=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?a=o=t:o=o.next=t}else a=o=t;n={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:s.shared,effects:s.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function vs(e,t,n,s){var a=e.updateQueue;ct=!1;var o=a.firstBaseUpdate,i=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var c=l,d=c.next;c.next=null,i===null?o=d:i.next=d,i=c;var g=e.alternate;g!==null&&(g=g.updateQueue,l=g.lastBaseUpdate,l!==i&&(l===null?g.firstBaseUpdate=d:l.next=d,g.lastBaseUpdate=c))}if(o!==null){var v=a.baseState;i=0,g=d=c=null,l=o;do{var p=l.lane,N=l.eventTime;if((s&p)===p){g!==null&&(g=g.next={eventTime:N,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var S=e,C=l;switch(p=t,N=n,C.tag){case 1:if(S=C.payload,typeof S=="function"){v=S.call(N,v,p);break e}v=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=C.payload,p=typeof S=="function"?S.call(N,v,p):S,p==null)break e;v=J({},v,p);break e;case 2:ct=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,p=a.effects,p===null?a.effects=[l]:p.push(l))}else N={eventTime:N,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},g===null?(d=g=N,c=v):g=g.next=N,i|=p;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;p=l,l=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(1);if(g===null&&(c=v),a.baseState=c,a.firstBaseUpdate=d,a.lastBaseUpdate=g,t=a.shared.interleaved,t!==null){a=t;do i|=a.lane,a=a.next;while(a!==t)}else o===null&&(a.shared.lanes=0);Ut|=i,e.lanes=i,e.memoizedState=v}}function tl(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],a=s.callback;if(a!==null){if(s.callback=null,s=n,typeof a!="function")throw Error(T(191,a));a.call(s)}}}var xr={},Je=Et(xr),or=Et(xr),ir=Et(xr);function Rt(e){if(e===xr)throw Error(T(174));return e}function Qo(e,t){switch(H(ir,t),H(or,e),H(Je,xr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:_a(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=_a(t,e)}G(Je),H(Je,t)}function jn(){G(Je),G(or),G(ir)}function tu(e){Rt(ir.current);var t=Rt(Je.current),n=_a(t,e.type);t!==n&&(H(or,e),H(Je,n))}function Yo(e){or.current===e&&(G(Je),G(or))}var Y=Et(0);function xs(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ma=[];function Ko(){for(var e=0;e<ma.length;e++)ma[e]._workInProgressVersionPrimary=null;ma.length=0}var Kr=ot.ReactCurrentDispatcher,pa=ot.ReactCurrentBatchConfig,Bt=0,K=null,ne=null,oe=null,ys=!1,Wn=!1,lr=0,ip=0;function me(){throw Error(T(321))}function Jo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ve(e[n],t[n]))return!1;return!0}function Xo(e,t,n,s,a,o){if(Bt=o,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Kr.current=e===null||e.memoizedState===null?dp:mp,e=n(s,a),Wn){o=0;do{if(Wn=!1,lr=0,25<=o)throw Error(T(301));o+=1,oe=ne=null,t.updateQueue=null,Kr.current=pp,e=n(s,a)}while(Wn)}if(Kr.current=js,t=ne!==null&&ne.next!==null,Bt=0,oe=ne=K=null,ys=!1,t)throw Error(T(300));return e}function qo(){var e=lr!==0;return lr=0,e}function Qe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return oe===null?K.memoizedState=oe=e:oe=oe.next=e,oe}function Oe(){if(ne===null){var e=K.alternate;e=e!==null?e.memoizedState:null}else e=ne.next;var t=oe===null?K.memoizedState:oe.next;if(t!==null)oe=t,ne=e;else{if(e===null)throw Error(T(310));ne=e,e={memoizedState:ne.memoizedState,baseState:ne.baseState,baseQueue:ne.baseQueue,queue:ne.queue,next:null},oe===null?K.memoizedState=oe=e:oe=oe.next=e}return oe}function cr(e,t){return typeof t=="function"?t(e):t}function fa(e){var t=Oe(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var s=ne,a=s.baseQueue,o=n.pending;if(o!==null){if(a!==null){var i=a.next;a.next=o.next,o.next=i}s.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,s=s.baseState;var l=i=null,c=null,d=o;do{var g=d.lane;if((Bt&g)===g)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),s=d.hasEagerState?d.eagerState:e(s,d.action);else{var v={lane:g,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=v,i=s):c=c.next=v,K.lanes|=g,Ut|=g}d=d.next}while(d!==null&&d!==o);c===null?i=s:c.next=l,Ve(s,t.memoizedState)||(we=!0),t.memoizedState=s,t.baseState=i,t.baseQueue=c,n.lastRenderedState=s}if(e=n.interleaved,e!==null){a=e;do o=a.lane,K.lanes|=o,Ut|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ha(e){var t=Oe(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var s=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var i=a=a.next;do o=e(o,i.action),i=i.next;while(i!==a);Ve(o,t.memoizedState)||(we=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,s]}function nu(){}function ru(e,t){var n=K,s=Oe(),a=t(),o=!Ve(s.memoizedState,a);if(o&&(s.memoizedState=a,we=!0),s=s.queue,Zo(ou.bind(null,n,s,e),[e]),s.getSnapshot!==t||o||oe!==null&&oe.memoizedState.tag&1){if(n.flags|=2048,ur(9,au.bind(null,n,s,a,t),void 0,null),ie===null)throw Error(T(349));Bt&30||su(n,t,a)}return a}function su(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function au(e,t,n,s){t.value=n,t.getSnapshot=s,iu(t)&&lu(e)}function ou(e,t,n){return n(function(){iu(t)&&lu(e)})}function iu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ve(e,n)}catch{return!0}}function lu(e){var t=st(e,1);t!==null&&We(t,e,1,-1)}function nl(e){var t=Qe();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:cr,lastRenderedState:e},t.queue=e,e=e.dispatch=up.bind(null,K,e),[t.memoizedState,e]}function ur(e,t,n,s){return e={tag:e,create:t,destroy:n,deps:s,next:null},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(s=n.next,n.next=e,e.next=s,t.lastEffect=e)),e}function cu(){return Oe().memoizedState}function Jr(e,t,n,s){var a=Qe();K.flags|=e,a.memoizedState=ur(1|t,n,void 0,s===void 0?null:s)}function Os(e,t,n,s){var a=Oe();s=s===void 0?null:s;var o=void 0;if(ne!==null){var i=ne.memoizedState;if(o=i.destroy,s!==null&&Jo(s,i.deps)){a.memoizedState=ur(t,n,o,s);return}}K.flags|=e,a.memoizedState=ur(1|t,n,o,s)}function rl(e,t){return Jr(8390656,8,e,t)}function Zo(e,t){return Os(2048,8,e,t)}function uu(e,t){return Os(4,2,e,t)}function du(e,t){return Os(4,4,e,t)}function mu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function pu(e,t,n){return n=n!=null?n.concat([e]):null,Os(4,4,mu.bind(null,t,e),n)}function ei(){}function fu(e,t){var n=Oe();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&Jo(t,s[1])?s[0]:(n.memoizedState=[e,t],e)}function hu(e,t){var n=Oe();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&Jo(t,s[1])?s[0]:(e=e(),n.memoizedState=[e,t],e)}function gu(e,t,n){return Bt&21?(Ve(n,t)||(n=wc(),K.lanes|=n,Ut|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,we=!0),e.memoizedState=n)}function lp(e,t){var n=U;U=n!==0&&4>n?n:4,e(!0);var s=pa.transition;pa.transition={};try{e(!1),t()}finally{U=n,pa.transition=s}}function vu(){return Oe().memoizedState}function cp(e,t,n){var s=wt(e);if(n={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null},xu(e))yu(t,n);else if(n=Zc(e,t,n,s),n!==null){var a=ve();We(n,e,s,a),ju(n,t,s)}}function up(e,t,n){var s=wt(e),a={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null};if(xu(e))yu(t,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,l=o(i,n);if(a.hasEagerState=!0,a.eagerState=l,Ve(l,i)){var c=t.interleaved;c===null?(a.next=a,Vo(t)):(a.next=c.next,c.next=a),t.interleaved=a;return}}catch{}finally{}n=Zc(e,t,a,s),n!==null&&(a=ve(),We(n,e,s,a),ju(n,t,s))}}function xu(e){var t=e.alternate;return e===K||t!==null&&t===K}function yu(e,t){Wn=ys=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ju(e,t,n){if(n&4194240){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,_o(e,n)}}var js={readContext:Re,useCallback:me,useContext:me,useEffect:me,useImperativeHandle:me,useInsertionEffect:me,useLayoutEffect:me,useMemo:me,useReducer:me,useRef:me,useState:me,useDebugValue:me,useDeferredValue:me,useTransition:me,useMutableSource:me,useSyncExternalStore:me,useId:me,unstable_isNewReconciler:!1},dp={readContext:Re,useCallback:function(e,t){return Qe().memoizedState=[e,t===void 0?null:t],e},useContext:Re,useEffect:rl,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Jr(4194308,4,mu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Jr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Jr(4,2,e,t)},useMemo:function(e,t){var n=Qe();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var s=Qe();return t=n!==void 0?n(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=cp.bind(null,K,e),[s.memoizedState,e]},useRef:function(e){var t=Qe();return e={current:e},t.memoizedState=e},useState:nl,useDebugValue:ei,useDeferredValue:function(e){return Qe().memoizedState=e},useTransition:function(){var e=nl(!1),t=e[0];return e=lp.bind(null,e[1]),Qe().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var s=K,a=Qe();if(Q){if(n===void 0)throw Error(T(407));n=n()}else{if(n=t(),ie===null)throw Error(T(349));Bt&30||su(s,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,rl(ou.bind(null,s,o,e),[e]),s.flags|=2048,ur(9,au.bind(null,s,o,n,t),void 0,null),n},useId:function(){var e=Qe(),t=ie.identifierPrefix;if(Q){var n=et,s=Ze;n=(s&~(1<<32-He(s)-1)).toString(32)+n,t=":"+t+"R"+n,n=lr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=ip++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},mp={readContext:Re,useCallback:fu,useContext:Re,useEffect:Zo,useImperativeHandle:pu,useInsertionEffect:uu,useLayoutEffect:du,useMemo:hu,useReducer:fa,useRef:cu,useState:function(){return fa(cr)},useDebugValue:ei,useDeferredValue:function(e){var t=Oe();return gu(t,ne.memoizedState,e)},useTransition:function(){var e=fa(cr)[0],t=Oe().memoizedState;return[e,t]},useMutableSource:nu,useSyncExternalStore:ru,useId:vu,unstable_isNewReconciler:!1},pp={readContext:Re,useCallback:fu,useContext:Re,useEffect:Zo,useImperativeHandle:pu,useInsertionEffect:uu,useLayoutEffect:du,useMemo:hu,useReducer:ha,useRef:cu,useState:function(){return ha(cr)},useDebugValue:ei,useDeferredValue:function(e){var t=Oe();return ne===null?t.memoizedState=e:gu(t,ne.memoizedState,e)},useTransition:function(){var e=ha(cr)[0],t=Oe().memoizedState;return[e,t]},useMutableSource:nu,useSyncExternalStore:ru,useId:vu,unstable_isNewReconciler:!1};function $e(e,t){if(e&&e.defaultProps){t=J({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function qa(e,t,n,s){t=e.memoizedState,n=n(s,t),n=n==null?t:J({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var As={isMounted:function(e){return(e=e._reactInternals)?Vt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var s=ve(),a=wt(e),o=tt(s,a);o.payload=t,n!=null&&(o.callback=n),t=yt(e,o,a),t!==null&&(We(t,e,a,s),Yr(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var s=ve(),a=wt(e),o=tt(s,a);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=yt(e,o,a),t!==null&&(We(t,e,a,s),Yr(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ve(),s=wt(e),a=tt(n,s);a.tag=2,t!=null&&(a.callback=t),t=yt(e,a,s),t!==null&&(We(t,e,s,n),Yr(t,e,s))}};function sl(e,t,n,s,a,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,o,i):t.prototype&&t.prototype.isPureReactComponent?!nr(n,s)||!nr(a,o):!0}function wu(e,t,n){var s=!1,a=St,o=t.contextType;return typeof o=="object"&&o!==null?o=Re(o):(a=ke(t)?$t:he.current,s=t.contextTypes,o=(s=s!=null)?vn(e,a):St),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=As,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function al(e,t,n,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,s),t.state!==e&&As.enqueueReplaceState(t,t.state,null)}function Za(e,t,n,s){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Go(e);var o=t.contextType;typeof o=="object"&&o!==null?a.context=Re(o):(o=ke(t)?$t:he.current,a.context=vn(e,o)),a.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(qa(e,t,o,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&As.enqueueReplaceState(a,a.state,null),vs(e,n,a,s),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function wn(e,t){try{var n="",s=t;do n+=Bd(s),s=s.return;while(s);var a=n}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:a,digest:null}}function ga(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function eo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var fp=typeof WeakMap=="function"?WeakMap:Map;function bu(e,t,n){n=tt(-1,n),n.tag=3,n.payload={element:null};var s=t.value;return n.callback=function(){bs||(bs=!0,uo=s),eo(e,t)},n}function ku(e,t,n){n=tt(-1,n),n.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var a=t.value;n.payload=function(){return s(a)},n.callback=function(){eo(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){eo(e,t),typeof s!="function"&&(jt===null?jt=new Set([this]):jt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function ol(e,t,n){var s=e.pingCache;if(s===null){s=e.pingCache=new fp;var a=new Set;s.set(t,a)}else a=s.get(t),a===void 0&&(a=new Set,s.set(t,a));a.has(n)||(a.add(n),e=Dp.bind(null,e,t,n),t.then(e,e))}function il(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ll(e,t,n,s,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=tt(-1,1),t.tag=2,yt(n,t,1))),n.lanes|=1),e)}var hp=ot.ReactCurrentOwner,we=!1;function ge(e,t,n,s){t.child=e===null?qc(t,null,n,s):yn(t,e.child,n,s)}function cl(e,t,n,s,a){n=n.render;var o=t.ref;return mn(t,a),s=Xo(e,t,n,s,o,a),n=qo(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,at(e,t,a)):(Q&&n&&$o(t),t.flags|=1,ge(e,t,s,a),t.child)}function ul(e,t,n,s,a){if(e===null){var o=n.type;return typeof o=="function"&&!li(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Nu(e,t,o,s,a)):(e=es(n.type,null,s,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&a)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:nr,n(i,s)&&e.ref===t.ref)return at(e,t,a)}return t.flags|=1,e=bt(o,s),e.ref=t.ref,e.return=t,t.child=e}function Nu(e,t,n,s,a){if(e!==null){var o=e.memoizedProps;if(nr(o,s)&&e.ref===t.ref)if(we=!1,t.pendingProps=s=o,(e.lanes&a)!==0)e.flags&131072&&(we=!0);else return t.lanes=e.lanes,at(e,t,a)}return to(e,t,n,s,a)}function Su(e,t,n){var s=t.pendingProps,a=s.children,o=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(on,Ce),Ce|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,H(on,Ce),Ce|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=o!==null?o.baseLanes:n,H(on,Ce),Ce|=s}else o!==null?(s=o.baseLanes|n,t.memoizedState=null):s=n,H(on,Ce),Ce|=s;return ge(e,t,a,n),t.child}function Cu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function to(e,t,n,s,a){var o=ke(n)?$t:he.current;return o=vn(t,o),mn(t,a),n=Xo(e,t,n,s,o,a),s=qo(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,at(e,t,a)):(Q&&s&&$o(t),t.flags|=1,ge(e,t,n,a),t.child)}function dl(e,t,n,s,a){if(ke(n)){var o=!0;ms(t)}else o=!1;if(mn(t,a),t.stateNode===null)Xr(e,t),wu(t,n,s),Za(t,n,s,a),s=!0;else if(e===null){var i=t.stateNode,l=t.memoizedProps;i.props=l;var c=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=Re(d):(d=ke(n)?$t:he.current,d=vn(t,d));var g=n.getDerivedStateFromProps,v=typeof g=="function"||typeof i.getSnapshotBeforeUpdate=="function";v||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==s||c!==d)&&al(t,i,s,d),ct=!1;var p=t.memoizedState;i.state=p,vs(t,s,i,a),c=t.memoizedState,l!==s||p!==c||be.current||ct?(typeof g=="function"&&(qa(t,n,g,s),c=t.memoizedState),(l=ct||sl(t,n,l,s,p,c,d))?(v||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=c),i.props=s,i.state=c,i.context=d,s=l):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{i=t.stateNode,eu(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:$e(t.type,l),i.props=d,v=t.pendingProps,p=i.context,c=n.contextType,typeof c=="object"&&c!==null?c=Re(c):(c=ke(n)?$t:he.current,c=vn(t,c));var N=n.getDerivedStateFromProps;(g=typeof N=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==v||p!==c)&&al(t,i,s,c),ct=!1,p=t.memoizedState,i.state=p,vs(t,s,i,a);var S=t.memoizedState;l!==v||p!==S||be.current||ct?(typeof N=="function"&&(qa(t,n,N,s),S=t.memoizedState),(d=ct||sl(t,n,d,s,p,S,c)||!1)?(g||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(s,S,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(s,S,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=S),i.props=s,i.state=S,i.context=c,s=d):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),s=!1)}return no(e,t,n,s,o,a)}function no(e,t,n,s,a,o){Cu(e,t);var i=(t.flags&128)!==0;if(!s&&!i)return a&&Ji(t,n,!1),at(e,t,o);s=t.stateNode,hp.current=t;var l=i&&typeof n.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&i?(t.child=yn(t,e.child,null,o),t.child=yn(t,null,l,o)):ge(e,t,l,o),t.memoizedState=s.state,a&&Ji(t,n,!0),t.child}function Eu(e){var t=e.stateNode;t.pendingContext?Ki(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ki(e,t.context,!1),Qo(e,t.containerInfo)}function ml(e,t,n,s,a){return xn(),Bo(a),t.flags|=256,ge(e,t,n,s),t.child}var ro={dehydrated:null,treeContext:null,retryLane:0};function so(e){return{baseLanes:e,cachePool:null,transitions:null}}function Du(e,t,n){var s=t.pendingProps,a=Y.current,o=!1,i=(t.flags&128)!==0,l;if((l=i)||(l=e!==null&&e.memoizedState===null?!1:(a&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),H(Y,a&1),e===null)return Ja(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=s.children,e=s.fallback,o?(s=t.mode,o=t.child,i={mode:"hidden",children:i},!(s&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Bs(i,s,0,null),e=At(e,s,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=so(n),t.memoizedState=ro,e):ti(t,i));if(a=e.memoizedState,a!==null&&(l=a.dehydrated,l!==null))return gp(e,t,i,s,l,a,n);if(o){o=s.fallback,i=t.mode,a=e.child,l=a.sibling;var c={mode:"hidden",children:s.children};return!(i&1)&&t.child!==a?(s=t.child,s.childLanes=0,s.pendingProps=c,t.deletions=null):(s=bt(a,c),s.subtreeFlags=a.subtreeFlags&14680064),l!==null?o=bt(l,o):(o=At(o,i,n,null),o.flags|=2),o.return=t,s.return=t,s.sibling=o,t.child=s,s=o,o=t.child,i=e.child.memoizedState,i=i===null?so(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=ro,s}return o=e.child,e=o.sibling,s=bt(o,{mode:"visible",children:s.children}),!(t.mode&1)&&(s.lanes=n),s.return=t,s.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=s,t.memoizedState=null,s}function ti(e,t){return t=Bs({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Rr(e,t,n,s){return s!==null&&Bo(s),yn(t,e.child,null,n),e=ti(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function gp(e,t,n,s,a,o,i){if(n)return t.flags&256?(t.flags&=-257,s=ga(Error(T(422))),Rr(e,t,i,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=s.fallback,a=t.mode,s=Bs({mode:"visible",children:s.children},a,0,null),o=At(o,a,i,null),o.flags|=2,s.return=t,o.return=t,s.sibling=o,t.child=s,t.mode&1&&yn(t,e.child,null,i),t.child.memoizedState=so(i),t.memoizedState=ro,o);if(!(t.mode&1))return Rr(e,t,i,null);if(a.data==="$!"){if(s=a.nextSibling&&a.nextSibling.dataset,s)var l=s.dgst;return s=l,o=Error(T(419)),s=ga(o,s,void 0),Rr(e,t,i,s)}if(l=(i&e.childLanes)!==0,we||l){if(s=ie,s!==null){switch(i&-i){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(s.suspendedLanes|i)?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,st(e,a),We(s,e,a,-1))}return ii(),s=ga(Error(T(421))),Rr(e,t,i,s)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Pp.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,Ee=xt(a.nextSibling),De=t,Q=!0,Be=null,e!==null&&(ze[Le++]=Ze,ze[Le++]=et,ze[Le++]=Ft,Ze=e.id,et=e.overflow,Ft=t),t=ti(t,s.children),t.flags|=4096,t)}function pl(e,t,n){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),Xa(e.return,t,n)}function va(e,t,n,s,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=s,o.tail=n,o.tailMode=a)}function Pu(e,t,n){var s=t.pendingProps,a=s.revealOrder,o=s.tail;if(ge(e,t,s.children,n),s=Y.current,s&2)s=s&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&pl(e,n,t);else if(e.tag===19)pl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(H(Y,s),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&xs(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),va(t,!1,a,n,o);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&xs(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}va(t,!0,n,null,o);break;case"together":va(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Xr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function at(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ut|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(T(153));if(t.child!==null){for(e=t.child,n=bt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=bt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function vp(e,t,n){switch(t.tag){case 3:Eu(t),xn();break;case 5:tu(t);break;case 1:ke(t.type)&&ms(t);break;case 4:Qo(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,a=t.memoizedProps.value;H(hs,s._currentValue),s._currentValue=a;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(H(Y,Y.current&1),t.flags|=128,null):n&t.child.childLanes?Du(e,t,n):(H(Y,Y.current&1),e=at(e,t,n),e!==null?e.sibling:null);H(Y,Y.current&1);break;case 19:if(s=(n&t.childLanes)!==0,e.flags&128){if(s)return Pu(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),H(Y,Y.current),s)break;return null;case 22:case 23:return t.lanes=0,Su(e,t,n)}return at(e,t,n)}var Tu,ao,_u,zu;Tu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ao=function(){};_u=function(e,t,n,s){var a=e.memoizedProps;if(a!==s){e=t.stateNode,Rt(Je.current);var o=null;switch(n){case"input":a=Ea(e,a),s=Ea(e,s),o=[];break;case"select":a=J({},a,{value:void 0}),s=J({},s,{value:void 0}),o=[];break;case"textarea":a=Ta(e,a),s=Ta(e,s),o=[];break;default:typeof a.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=us)}za(n,s);var i;n=null;for(d in a)if(!s.hasOwnProperty(d)&&a.hasOwnProperty(d)&&a[d]!=null)if(d==="style"){var l=a[d];for(i in l)l.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Kn.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in s){var c=s[d];if(l=a!=null?a[d]:void 0,s.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(i in l)!l.hasOwnProperty(i)||c&&c.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in c)c.hasOwnProperty(i)&&l[i]!==c[i]&&(n||(n={}),n[i]=c[i])}else n||(o||(o=[]),o.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Kn.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&W("scroll",e),o||l===c||(o=[])):(o=o||[]).push(d,c))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};zu=function(e,t,n,s){n!==s&&(t.flags|=4)};function Ln(e,t){if(!Q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function pe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,s=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags&14680064,s|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=s,e.childLanes=n,t}function xp(e,t,n){var s=t.pendingProps;switch(Fo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pe(t),null;case 1:return ke(t.type)&&ds(),pe(t),null;case 3:return s=t.stateNode,jn(),G(be),G(he),Ko(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Ir(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Be!==null&&(fo(Be),Be=null))),ao(e,t),pe(t),null;case 5:Yo(t);var a=Rt(ir.current);if(n=t.type,e!==null&&t.stateNode!=null)_u(e,t,n,s,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(T(166));return pe(t),null}if(e=Rt(Je.current),Ir(t)){s=t.stateNode,n=t.type;var o=t.memoizedProps;switch(s[Ye]=t,s[ar]=o,e=(t.mode&1)!==0,n){case"dialog":W("cancel",s),W("close",s);break;case"iframe":case"object":case"embed":W("load",s);break;case"video":case"audio":for(a=0;a<An.length;a++)W(An[a],s);break;case"source":W("error",s);break;case"img":case"image":case"link":W("error",s),W("load",s);break;case"details":W("toggle",s);break;case"input":bi(s,o),W("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!o.multiple},W("invalid",s);break;case"textarea":Ni(s,o),W("invalid",s)}za(n,o),a=null;for(var i in o)if(o.hasOwnProperty(i)){var l=o[i];i==="children"?typeof l=="string"?s.textContent!==l&&(o.suppressHydrationWarning!==!0&&Lr(s.textContent,l,e),a=["children",l]):typeof l=="number"&&s.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Lr(s.textContent,l,e),a=["children",""+l]):Kn.hasOwnProperty(i)&&l!=null&&i==="onScroll"&&W("scroll",s)}switch(n){case"input":Sr(s),ki(s,o,!0);break;case"textarea":Sr(s),Si(s);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(s.onclick=us)}s=a,t.updateQueue=s,s!==null&&(t.flags|=4)}else{i=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=oc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=i.createElement(n,{is:s.is}):(e=i.createElement(n),n==="select"&&(i=e,s.multiple?i.multiple=!0:s.size&&(i.size=s.size))):e=i.createElementNS(e,n),e[Ye]=t,e[ar]=s,Tu(e,t,!1,!1),t.stateNode=e;e:{switch(i=La(n,s),n){case"dialog":W("cancel",e),W("close",e),a=s;break;case"iframe":case"object":case"embed":W("load",e),a=s;break;case"video":case"audio":for(a=0;a<An.length;a++)W(An[a],e);a=s;break;case"source":W("error",e),a=s;break;case"img":case"image":case"link":W("error",e),W("load",e),a=s;break;case"details":W("toggle",e),a=s;break;case"input":bi(e,s),a=Ea(e,s),W("invalid",e);break;case"option":a=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},a=J({},s,{value:void 0}),W("invalid",e);break;case"textarea":Ni(e,s),a=Ta(e,s),W("invalid",e);break;default:a=s}za(n,a),l=a;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?cc(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&ic(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Jn(e,c):typeof c=="number"&&Jn(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Kn.hasOwnProperty(o)?c!=null&&o==="onScroll"&&W("scroll",e):c!=null&&So(e,o,c,i))}switch(n){case"input":Sr(e),ki(e,s,!1);break;case"textarea":Sr(e),Si(e);break;case"option":s.value!=null&&e.setAttribute("value",""+Nt(s.value));break;case"select":e.multiple=!!s.multiple,o=s.value,o!=null?ln(e,!!s.multiple,o,!1):s.defaultValue!=null&&ln(e,!!s.multiple,s.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=us)}switch(n){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return pe(t),null;case 6:if(e&&t.stateNode!=null)zu(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(T(166));if(n=Rt(ir.current),Rt(Je.current),Ir(t)){if(s=t.stateNode,n=t.memoizedProps,s[Ye]=t,(o=s.nodeValue!==n)&&(e=De,e!==null))switch(e.tag){case 3:Lr(s.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Lr(s.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else s=(n.nodeType===9?n:n.ownerDocument).createTextNode(s),s[Ye]=t,t.stateNode=s}return pe(t),null;case 13:if(G(Y),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Q&&Ee!==null&&t.mode&1&&!(t.flags&128))Jc(),xn(),t.flags|=98560,o=!1;else if(o=Ir(t),s!==null&&s.dehydrated!==null){if(e===null){if(!o)throw Error(T(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(T(317));o[Ye]=t}else xn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;pe(t),o=!1}else Be!==null&&(fo(Be),Be=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,t.mode&1&&(e===null||Y.current&1?re===0&&(re=3):ii())),t.updateQueue!==null&&(t.flags|=4),pe(t),null);case 4:return jn(),ao(e,t),e===null&&rr(t.stateNode.containerInfo),pe(t),null;case 10:return Wo(t.type._context),pe(t),null;case 17:return ke(t.type)&&ds(),pe(t),null;case 19:if(G(Y),o=t.memoizedState,o===null)return pe(t),null;if(s=(t.flags&128)!==0,i=o.rendering,i===null)if(s)Ln(o,!1);else{if(re!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=xs(e),i!==null){for(t.flags|=128,Ln(o,!1),s=i.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=n,n=t.child;n!==null;)o=n,e=s,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return H(Y,Y.current&1|2),t.child}e=e.sibling}o.tail!==null&&Z()>bn&&(t.flags|=128,s=!0,Ln(o,!1),t.lanes=4194304)}else{if(!s)if(e=xs(i),e!==null){if(t.flags|=128,s=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ln(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!Q)return pe(t),null}else 2*Z()-o.renderingStartTime>bn&&n!==1073741824&&(t.flags|=128,s=!0,Ln(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Z(),t.sibling=null,n=Y.current,H(Y,s?n&1|2:n&1),t):(pe(t),null);case 22:case 23:return oi(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&t.mode&1?Ce&1073741824&&(pe(t),t.subtreeFlags&6&&(t.flags|=8192)):pe(t),null;case 24:return null;case 25:return null}throw Error(T(156,t.tag))}function yp(e,t){switch(Fo(t),t.tag){case 1:return ke(t.type)&&ds(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return jn(),G(be),G(he),Ko(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Yo(t),null;case 13:if(G(Y),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(T(340));xn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return G(Y),null;case 4:return jn(),null;case 10:return Wo(t.type._context),null;case 22:case 23:return oi(),null;case 24:return null;default:return null}}var Or=!1,fe=!1,jp=typeof WeakSet=="function"?WeakSet:Set,z=null;function an(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(s){X(e,t,s)}else n.current=null}function oo(e,t,n){try{n()}catch(s){X(e,t,s)}}var fl=!1;function wp(e,t){if(Ha=is,e=Oc(),Ao(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var a=s.anchorOffset,o=s.focusNode;s=s.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,l=-1,c=-1,d=0,g=0,v=e,p=null;t:for(;;){for(var N;v!==n||a!==0&&v.nodeType!==3||(l=i+a),v!==o||s!==0&&v.nodeType!==3||(c=i+s),v.nodeType===3&&(i+=v.nodeValue.length),(N=v.firstChild)!==null;)p=v,v=N;for(;;){if(v===e)break t;if(p===n&&++d===a&&(l=i),p===o&&++g===s&&(c=i),(N=v.nextSibling)!==null)break;v=p,p=v.parentNode}v=N}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Wa={focusedElem:e,selectionRange:n},is=!1,z=t;z!==null;)if(t=z,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,z=e;else for(;z!==null;){t=z;try{var S=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var C=S.memoizedProps,P=S.memoizedState,y=t.stateNode,f=y.getSnapshotBeforeUpdate(t.elementType===t.type?C:$e(t.type,C),P);y.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(T(163))}}catch(x){X(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,z=e;break}z=t.return}return S=fl,fl=!1,S}function Vn(e,t,n){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&oo(t,n,o)}a=a.next}while(a!==s)}}function $s(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var s=n.create;n.destroy=s()}n=n.next}while(n!==t)}}function io(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Lu(e){var t=e.alternate;t!==null&&(e.alternate=null,Lu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ye],delete t[ar],delete t[Qa],delete t[rp],delete t[sp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Iu(e){return e.tag===5||e.tag===3||e.tag===4}function hl(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Iu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function lo(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=us));else if(s!==4&&(e=e.child,e!==null))for(lo(e,t,n),e=e.sibling;e!==null;)lo(e,t,n),e=e.sibling}function co(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(co(e,t,n),e=e.sibling;e!==null;)co(e,t,n),e=e.sibling}var ce=null,Fe=!1;function it(e,t,n){for(n=n.child;n!==null;)Mu(e,t,n),n=n.sibling}function Mu(e,t,n){if(Ke&&typeof Ke.onCommitFiberUnmount=="function")try{Ke.onCommitFiberUnmount(_s,n)}catch{}switch(n.tag){case 5:fe||an(n,t);case 6:var s=ce,a=Fe;ce=null,it(e,t,n),ce=s,Fe=a,ce!==null&&(Fe?(e=ce,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ce.removeChild(n.stateNode));break;case 18:ce!==null&&(Fe?(e=ce,n=n.stateNode,e.nodeType===8?ua(e.parentNode,n):e.nodeType===1&&ua(e,n),er(e)):ua(ce,n.stateNode));break;case 4:s=ce,a=Fe,ce=n.stateNode.containerInfo,Fe=!0,it(e,t,n),ce=s,Fe=a;break;case 0:case 11:case 14:case 15:if(!fe&&(s=n.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){a=s=s.next;do{var o=a,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&oo(n,t,i),a=a.next}while(a!==s)}it(e,t,n);break;case 1:if(!fe&&(an(n,t),s=n.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=n.memoizedProps,s.state=n.memoizedState,s.componentWillUnmount()}catch(l){X(n,t,l)}it(e,t,n);break;case 21:it(e,t,n);break;case 22:n.mode&1?(fe=(s=fe)||n.memoizedState!==null,it(e,t,n),fe=s):it(e,t,n);break;default:it(e,t,n)}}function gl(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new jp),t.forEach(function(s){var a=Tp.bind(null,e,s);n.has(s)||(n.add(s),s.then(a,a))})}}function Ae(e,t){var n=t.deletions;if(n!==null)for(var s=0;s<n.length;s++){var a=n[s];try{var o=e,i=t,l=i;e:for(;l!==null;){switch(l.tag){case 5:ce=l.stateNode,Fe=!1;break e;case 3:ce=l.stateNode.containerInfo,Fe=!0;break e;case 4:ce=l.stateNode.containerInfo,Fe=!0;break e}l=l.return}if(ce===null)throw Error(T(160));Mu(o,i,a),ce=null,Fe=!1;var c=a.alternate;c!==null&&(c.return=null),a.return=null}catch(d){X(a,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ru(t,e),t=t.sibling}function Ru(e,t){var n=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ae(t,e),Ge(e),s&4){try{Vn(3,e,e.return),$s(3,e)}catch(C){X(e,e.return,C)}try{Vn(5,e,e.return)}catch(C){X(e,e.return,C)}}break;case 1:Ae(t,e),Ge(e),s&512&&n!==null&&an(n,n.return);break;case 5:if(Ae(t,e),Ge(e),s&512&&n!==null&&an(n,n.return),e.flags&32){var a=e.stateNode;try{Jn(a,"")}catch(C){X(e,e.return,C)}}if(s&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&sc(a,o),La(l,i);var d=La(l,o);for(i=0;i<c.length;i+=2){var g=c[i],v=c[i+1];g==="style"?cc(a,v):g==="dangerouslySetInnerHTML"?ic(a,v):g==="children"?Jn(a,v):So(a,g,v,d)}switch(l){case"input":Da(a,o);break;case"textarea":ac(a,o);break;case"select":var p=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var N=o.value;N!=null?ln(a,!!o.multiple,N,!1):p!==!!o.multiple&&(o.defaultValue!=null?ln(a,!!o.multiple,o.defaultValue,!0):ln(a,!!o.multiple,o.multiple?[]:"",!1))}a[ar]=o}catch(C){X(e,e.return,C)}}break;case 6:if(Ae(t,e),Ge(e),s&4){if(e.stateNode===null)throw Error(T(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(C){X(e,e.return,C)}}break;case 3:if(Ae(t,e),Ge(e),s&4&&n!==null&&n.memoizedState.isDehydrated)try{er(t.containerInfo)}catch(C){X(e,e.return,C)}break;case 4:Ae(t,e),Ge(e);break;case 13:Ae(t,e),Ge(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(si=Z())),s&4&&gl(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(fe=(d=fe)||g,Ae(t,e),fe=d):Ae(t,e),Ge(e),s&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!g&&e.mode&1)for(z=e,g=e.child;g!==null;){for(v=z=g;z!==null;){switch(p=z,N=p.child,p.tag){case 0:case 11:case 14:case 15:Vn(4,p,p.return);break;case 1:an(p,p.return);var S=p.stateNode;if(typeof S.componentWillUnmount=="function"){s=p,n=p.return;try{t=s,S.props=t.memoizedProps,S.state=t.memoizedState,S.componentWillUnmount()}catch(C){X(s,n,C)}}break;case 5:an(p,p.return);break;case 22:if(p.memoizedState!==null){xl(v);continue}}N!==null?(N.return=p,z=N):xl(v)}g=g.sibling}e:for(g=null,v=e;;){if(v.tag===5){if(g===null){g=v;try{a=v.stateNode,d?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=v.stateNode,c=v.memoizedProps.style,i=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=lc("display",i))}catch(C){X(e,e.return,C)}}}else if(v.tag===6){if(g===null)try{v.stateNode.nodeValue=d?"":v.memoizedProps}catch(C){X(e,e.return,C)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===e)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===e)break e;for(;v.sibling===null;){if(v.return===null||v.return===e)break e;g===v&&(g=null),v=v.return}g===v&&(g=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:Ae(t,e),Ge(e),s&4&&gl(e);break;case 21:break;default:Ae(t,e),Ge(e)}}function Ge(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Iu(n)){var s=n;break e}n=n.return}throw Error(T(160))}switch(s.tag){case 5:var a=s.stateNode;s.flags&32&&(Jn(a,""),s.flags&=-33);var o=hl(e);co(e,o,a);break;case 3:case 4:var i=s.stateNode.containerInfo,l=hl(e);lo(e,l,i);break;default:throw Error(T(161))}}catch(c){X(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function bp(e,t,n){z=e,Ou(e)}function Ou(e,t,n){for(var s=(e.mode&1)!==0;z!==null;){var a=z,o=a.child;if(a.tag===22&&s){var i=a.memoizedState!==null||Or;if(!i){var l=a.alternate,c=l!==null&&l.memoizedState!==null||fe;l=Or;var d=fe;if(Or=i,(fe=c)&&!d)for(z=a;z!==null;)i=z,c=i.child,i.tag===22&&i.memoizedState!==null?yl(a):c!==null?(c.return=i,z=c):yl(a);for(;o!==null;)z=o,Ou(o),o=o.sibling;z=a,Or=l,fe=d}vl(e)}else a.subtreeFlags&8772&&o!==null?(o.return=a,z=o):vl(e)}}function vl(e){for(;z!==null;){var t=z;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:fe||$s(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!fe)if(n===null)s.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:$e(t.type,n.memoizedProps);s.componentDidUpdate(a,n.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&tl(t,o,s);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}tl(t,i,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var g=d.memoizedState;if(g!==null){var v=g.dehydrated;v!==null&&er(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(T(163))}fe||t.flags&512&&io(t)}catch(p){X(t,t.return,p)}}if(t===e){z=null;break}if(n=t.sibling,n!==null){n.return=t.return,z=n;break}z=t.return}}function xl(e){for(;z!==null;){var t=z;if(t===e){z=null;break}var n=t.sibling;if(n!==null){n.return=t.return,z=n;break}z=t.return}}function yl(e){for(;z!==null;){var t=z;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{$s(4,t)}catch(c){X(t,n,c)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var a=t.return;try{s.componentDidMount()}catch(c){X(t,a,c)}}var o=t.return;try{io(t)}catch(c){X(t,o,c)}break;case 5:var i=t.return;try{io(t)}catch(c){X(t,i,c)}}}catch(c){X(t,t.return,c)}if(t===e){z=null;break}var l=t.sibling;if(l!==null){l.return=t.return,z=l;break}z=t.return}}var kp=Math.ceil,ws=ot.ReactCurrentDispatcher,ni=ot.ReactCurrentOwner,Me=ot.ReactCurrentBatchConfig,F=0,ie=null,ee=null,ue=0,Ce=0,on=Et(0),re=0,dr=null,Ut=0,Fs=0,ri=0,Gn=null,je=null,si=0,bn=1/0,Xe=null,bs=!1,uo=null,jt=null,Ar=!1,pt=null,ks=0,Qn=0,mo=null,qr=-1,Zr=0;function ve(){return F&6?Z():qr!==-1?qr:qr=Z()}function wt(e){return e.mode&1?F&2&&ue!==0?ue&-ue:op.transition!==null?(Zr===0&&(Zr=wc()),Zr):(e=U,e!==0||(e=window.event,e=e===void 0?16:Dc(e.type)),e):1}function We(e,t,n,s){if(50<Qn)throw Qn=0,mo=null,Error(T(185));hr(e,n,s),(!(F&2)||e!==ie)&&(e===ie&&(!(F&2)&&(Fs|=n),re===4&&dt(e,ue)),Ne(e,s),n===1&&F===0&&!(t.mode&1)&&(bn=Z()+500,Rs&&Dt()))}function Ne(e,t){var n=e.callbackNode;om(e,t);var s=os(e,e===ie?ue:0);if(s===0)n!==null&&Di(n),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(n!=null&&Di(n),t===1)e.tag===0?ap(jl.bind(null,e)):Qc(jl.bind(null,e)),tp(function(){!(F&6)&&Dt()}),n=null;else{switch(bc(s)){case 1:n=To;break;case 4:n=yc;break;case 16:n=as;break;case 536870912:n=jc;break;default:n=as}n=Vu(n,Au.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Au(e,t){if(qr=-1,Zr=0,F&6)throw Error(T(327));var n=e.callbackNode;if(pn()&&e.callbackNode!==n)return null;var s=os(e,e===ie?ue:0);if(s===0)return null;if(s&30||s&e.expiredLanes||t)t=Ns(e,s);else{t=s;var a=F;F|=2;var o=Fu();(ie!==e||ue!==t)&&(Xe=null,bn=Z()+500,Ot(e,t));do try{Cp();break}catch(l){$u(e,l)}while(1);Ho(),ws.current=o,F=a,ee!==null?t=0:(ie=null,ue=0,t=re)}if(t!==0){if(t===2&&(a=Aa(e),a!==0&&(s=a,t=po(e,a))),t===1)throw n=dr,Ot(e,0),dt(e,s),Ne(e,Z()),n;if(t===6)dt(e,s);else{if(a=e.current.alternate,!(s&30)&&!Np(a)&&(t=Ns(e,s),t===2&&(o=Aa(e),o!==0&&(s=o,t=po(e,o))),t===1))throw n=dr,Ot(e,0),dt(e,s),Ne(e,Z()),n;switch(e.finishedWork=a,e.finishedLanes=s,t){case 0:case 1:throw Error(T(345));case 2:Lt(e,je,Xe);break;case 3:if(dt(e,s),(s&130023424)===s&&(t=si+500-Z(),10<t)){if(os(e,0)!==0)break;if(a=e.suspendedLanes,(a&s)!==s){ve(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Ga(Lt.bind(null,e,je,Xe),t);break}Lt(e,je,Xe);break;case 4:if(dt(e,s),(s&4194240)===s)break;for(t=e.eventTimes,a=-1;0<s;){var i=31-He(s);o=1<<i,i=t[i],i>a&&(a=i),s&=~o}if(s=a,s=Z()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*kp(s/1960))-s,10<s){e.timeoutHandle=Ga(Lt.bind(null,e,je,Xe),s);break}Lt(e,je,Xe);break;case 5:Lt(e,je,Xe);break;default:throw Error(T(329))}}}return Ne(e,Z()),e.callbackNode===n?Au.bind(null,e):null}function po(e,t){var n=Gn;return e.current.memoizedState.isDehydrated&&(Ot(e,t).flags|=256),e=Ns(e,t),e!==2&&(t=je,je=n,t!==null&&fo(t)),e}function fo(e){je===null?je=e:je.push.apply(je,e)}function Np(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var s=0;s<n.length;s++){var a=n[s],o=a.getSnapshot;a=a.value;try{if(!Ve(o(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dt(e,t){for(t&=~ri,t&=~Fs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-He(t),s=1<<n;e[n]=-1,t&=~s}}function jl(e){if(F&6)throw Error(T(327));pn();var t=os(e,0);if(!(t&1))return Ne(e,Z()),null;var n=Ns(e,t);if(e.tag!==0&&n===2){var s=Aa(e);s!==0&&(t=s,n=po(e,s))}if(n===1)throw n=dr,Ot(e,0),dt(e,t),Ne(e,Z()),n;if(n===6)throw Error(T(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Lt(e,je,Xe),Ne(e,Z()),null}function ai(e,t){var n=F;F|=1;try{return e(t)}finally{F=n,F===0&&(bn=Z()+500,Rs&&Dt())}}function Ht(e){pt!==null&&pt.tag===0&&!(F&6)&&pn();var t=F;F|=1;var n=Me.transition,s=U;try{if(Me.transition=null,U=1,e)return e()}finally{U=s,Me.transition=n,F=t,!(F&6)&&Dt()}}function oi(){Ce=on.current,G(on)}function Ot(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ep(n)),ee!==null)for(n=ee.return;n!==null;){var s=n;switch(Fo(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&ds();break;case 3:jn(),G(be),G(he),Ko();break;case 5:Yo(s);break;case 4:jn();break;case 13:G(Y);break;case 19:G(Y);break;case 10:Wo(s.type._context);break;case 22:case 23:oi()}n=n.return}if(ie=e,ee=e=bt(e.current,null),ue=Ce=t,re=0,dr=null,ri=Fs=Ut=0,je=Gn=null,Mt!==null){for(t=0;t<Mt.length;t++)if(n=Mt[t],s=n.interleaved,s!==null){n.interleaved=null;var a=s.next,o=n.pending;if(o!==null){var i=o.next;o.next=a,s.next=i}n.pending=s}Mt=null}return e}function $u(e,t){do{var n=ee;try{if(Ho(),Kr.current=js,ys){for(var s=K.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}ys=!1}if(Bt=0,oe=ne=K=null,Wn=!1,lr=0,ni.current=null,n===null||n.return===null){re=1,dr=t,ee=null;break}e:{var o=e,i=n.return,l=n,c=t;if(t=ue,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,g=l,v=g.tag;if(!(g.mode&1)&&(v===0||v===11||v===15)){var p=g.alternate;p?(g.updateQueue=p.updateQueue,g.memoizedState=p.memoizedState,g.lanes=p.lanes):(g.updateQueue=null,g.memoizedState=null)}var N=il(i);if(N!==null){N.flags&=-257,ll(N,i,l,o,t),N.mode&1&&ol(o,d,t),t=N,c=d;var S=t.updateQueue;if(S===null){var C=new Set;C.add(c),t.updateQueue=C}else S.add(c);break e}else{if(!(t&1)){ol(o,d,t),ii();break e}c=Error(T(426))}}else if(Q&&l.mode&1){var P=il(i);if(P!==null){!(P.flags&65536)&&(P.flags|=256),ll(P,i,l,o,t),Bo(wn(c,l));break e}}o=c=wn(c,l),re!==4&&(re=2),Gn===null?Gn=[o]:Gn.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var y=bu(o,c,t);el(o,y);break e;case 1:l=c;var f=o.type,m=o.stateNode;if(!(o.flags&128)&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(jt===null||!jt.has(m)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=ku(o,l,t);el(o,x);break e}}o=o.return}while(o!==null)}Uu(n)}catch(u){t=u,ee===n&&n!==null&&(ee=n=n.return);continue}break}while(1)}function Fu(){var e=ws.current;return ws.current=js,e===null?js:e}function ii(){(re===0||re===3||re===2)&&(re=4),ie===null||!(Ut&268435455)&&!(Fs&268435455)||dt(ie,ue)}function Ns(e,t){var n=F;F|=2;var s=Fu();(ie!==e||ue!==t)&&(Xe=null,Ot(e,t));do try{Sp();break}catch(a){$u(e,a)}while(1);if(Ho(),F=n,ws.current=s,ee!==null)throw Error(T(261));return ie=null,ue=0,re}function Sp(){for(;ee!==null;)Bu(ee)}function Cp(){for(;ee!==null&&!Xd();)Bu(ee)}function Bu(e){var t=Wu(e.alternate,e,Ce);e.memoizedProps=e.pendingProps,t===null?Uu(e):ee=t,ni.current=null}function Uu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=yp(n,t),n!==null){n.flags&=32767,ee=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{re=6,ee=null;return}}else if(n=xp(n,t,Ce),n!==null){ee=n;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);re===0&&(re=5)}function Lt(e,t,n){var s=U,a=Me.transition;try{Me.transition=null,U=1,Ep(e,t,n,s)}finally{Me.transition=a,U=s}return null}function Ep(e,t,n,s){do pn();while(pt!==null);if(F&6)throw Error(T(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(T(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(im(e,o),e===ie&&(ee=ie=null,ue=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ar||(Ar=!0,Vu(as,function(){return pn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Me.transition,Me.transition=null;var i=U;U=1;var l=F;F|=4,ni.current=null,wp(e,n),Ru(n,e),Qm(Wa),is=!!Ha,Wa=Ha=null,e.current=n,bp(n),qd(),F=l,U=i,Me.transition=o}else e.current=n;if(Ar&&(Ar=!1,pt=e,ks=a),o=e.pendingLanes,o===0&&(jt=null),tm(n.stateNode),Ne(e,Z()),t!==null)for(s=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],s(a.value,{componentStack:a.stack,digest:a.digest});if(bs)throw bs=!1,e=uo,uo=null,e;return ks&1&&e.tag!==0&&pn(),o=e.pendingLanes,o&1?e===mo?Qn++:(Qn=0,mo=e):Qn=0,Dt(),null}function pn(){if(pt!==null){var e=bc(ks),t=Me.transition,n=U;try{if(Me.transition=null,U=16>e?16:e,pt===null)var s=!1;else{if(e=pt,pt=null,ks=0,F&6)throw Error(T(331));var a=F;for(F|=4,z=e.current;z!==null;){var o=z,i=o.child;if(z.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(z=d;z!==null;){var g=z;switch(g.tag){case 0:case 11:case 15:Vn(8,g,o)}var v=g.child;if(v!==null)v.return=g,z=v;else for(;z!==null;){g=z;var p=g.sibling,N=g.return;if(Lu(g),g===d){z=null;break}if(p!==null){p.return=N,z=p;break}z=N}}}var S=o.alternate;if(S!==null){var C=S.child;if(C!==null){S.child=null;do{var P=C.sibling;C.sibling=null,C=P}while(C!==null)}}z=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,z=i;else e:for(;z!==null;){if(o=z,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Vn(9,o,o.return)}var y=o.sibling;if(y!==null){y.return=o.return,z=y;break e}z=o.return}}var f=e.current;for(z=f;z!==null;){i=z;var m=i.child;if(i.subtreeFlags&2064&&m!==null)m.return=i,z=m;else e:for(i=f;z!==null;){if(l=z,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:$s(9,l)}}catch(u){X(l,l.return,u)}if(l===i){z=null;break e}var x=l.sibling;if(x!==null){x.return=l.return,z=x;break e}z=l.return}}if(F=a,Dt(),Ke&&typeof Ke.onPostCommitFiberRoot=="function")try{Ke.onPostCommitFiberRoot(_s,e)}catch{}s=!0}return s}finally{U=n,Me.transition=t}}return!1}function wl(e,t,n){t=wn(n,t),t=bu(e,t,1),e=yt(e,t,1),t=ve(),e!==null&&(hr(e,1,t),Ne(e,t))}function X(e,t,n){if(e.tag===3)wl(e,e,n);else for(;t!==null;){if(t.tag===3){wl(t,e,n);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(jt===null||!jt.has(s))){e=wn(n,e),e=ku(t,e,1),t=yt(t,e,1),e=ve(),t!==null&&(hr(t,1,e),Ne(t,e));break}}t=t.return}}function Dp(e,t,n){var s=e.pingCache;s!==null&&s.delete(t),t=ve(),e.pingedLanes|=e.suspendedLanes&n,ie===e&&(ue&n)===n&&(re===4||re===3&&(ue&130023424)===ue&&500>Z()-si?Ot(e,0):ri|=n),Ne(e,t)}function Hu(e,t){t===0&&(e.mode&1?(t=Dr,Dr<<=1,!(Dr&130023424)&&(Dr=4194304)):t=1);var n=ve();e=st(e,t),e!==null&&(hr(e,t,n),Ne(e,n))}function Pp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Hu(e,n)}function Tp(e,t){var n=0;switch(e.tag){case 13:var s=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(T(314))}s!==null&&s.delete(t),Hu(e,n)}var Wu;Wu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||be.current)we=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return we=!1,vp(e,t,n);we=!!(e.flags&131072)}else we=!1,Q&&t.flags&1048576&&Yc(t,fs,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;Xr(e,t),e=t.pendingProps;var a=vn(t,he.current);mn(t,n),a=Xo(null,t,s,e,a,n);var o=qo();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ke(s)?(o=!0,ms(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Go(t),a.updater=As,t.stateNode=a,a._reactInternals=t,Za(t,s,e,n),t=no(null,t,s,!0,o,n)):(t.tag=0,Q&&o&&$o(t),ge(null,t,a,n),t=t.child),t;case 16:s=t.elementType;e:{switch(Xr(e,t),e=t.pendingProps,a=s._init,s=a(s._payload),t.type=s,a=t.tag=zp(s),e=$e(s,e),a){case 0:t=to(null,t,s,e,n);break e;case 1:t=dl(null,t,s,e,n);break e;case 11:t=cl(null,t,s,e,n);break e;case 14:t=ul(null,t,s,$e(s.type,e),n);break e}throw Error(T(306,s,""))}return t;case 0:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:$e(s,a),to(e,t,s,a,n);case 1:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:$e(s,a),dl(e,t,s,a,n);case 3:e:{if(Eu(t),e===null)throw Error(T(387));s=t.pendingProps,o=t.memoizedState,a=o.element,eu(e,t),vs(t,s,null,n);var i=t.memoizedState;if(s=i.element,o.isDehydrated)if(o={element:s,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=wn(Error(T(423)),t),t=ml(e,t,s,n,a);break e}else if(s!==a){a=wn(Error(T(424)),t),t=ml(e,t,s,n,a);break e}else for(Ee=xt(t.stateNode.containerInfo.firstChild),De=t,Q=!0,Be=null,n=qc(t,null,s,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(xn(),s===a){t=at(e,t,n);break e}ge(e,t,s,n)}t=t.child}return t;case 5:return tu(t),e===null&&Ja(t),s=t.type,a=t.pendingProps,o=e!==null?e.memoizedProps:null,i=a.children,Va(s,a)?i=null:o!==null&&Va(s,o)&&(t.flags|=32),Cu(e,t),ge(e,t,i,n),t.child;case 6:return e===null&&Ja(t),null;case 13:return Du(e,t,n);case 4:return Qo(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=yn(t,null,s,n):ge(e,t,s,n),t.child;case 11:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:$e(s,a),cl(e,t,s,a,n);case 7:return ge(e,t,t.pendingProps,n),t.child;case 8:return ge(e,t,t.pendingProps.children,n),t.child;case 12:return ge(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(s=t.type._context,a=t.pendingProps,o=t.memoizedProps,i=a.value,H(hs,s._currentValue),s._currentValue=i,o!==null)if(Ve(o.value,i)){if(o.children===a.children&&!be.current){t=at(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){i=o.child;for(var c=l.firstContext;c!==null;){if(c.context===s){if(o.tag===1){c=tt(-1,n&-n),c.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var g=d.pending;g===null?c.next=c:(c.next=g.next,g.next=c),d.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Xa(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(T(341));i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),Xa(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}ge(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,s=t.pendingProps.children,mn(t,n),a=Re(a),s=s(a),t.flags|=1,ge(e,t,s,n),t.child;case 14:return s=t.type,a=$e(s,t.pendingProps),a=$e(s.type,a),ul(e,t,s,a,n);case 15:return Nu(e,t,t.type,t.pendingProps,n);case 17:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:$e(s,a),Xr(e,t),t.tag=1,ke(s)?(e=!0,ms(t)):e=!1,mn(t,n),wu(t,s,a),Za(t,s,a,n),no(null,t,s,!0,e,n);case 19:return Pu(e,t,n);case 22:return Su(e,t,n)}throw Error(T(156,t.tag))};function Vu(e,t){return xc(e,t)}function _p(e,t,n,s){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ie(e,t,n,s){return new _p(e,t,n,s)}function li(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zp(e){if(typeof e=="function")return li(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Eo)return 11;if(e===Do)return 14}return 2}function bt(e,t){var n=e.alternate;return n===null?(n=Ie(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function es(e,t,n,s,a,o){var i=2;if(s=e,typeof e=="function")li(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Jt:return At(n.children,a,o,t);case Co:i=8,a|=8;break;case ka:return e=Ie(12,n,t,a|2),e.elementType=ka,e.lanes=o,e;case Na:return e=Ie(13,n,t,a),e.elementType=Na,e.lanes=o,e;case Sa:return e=Ie(19,n,t,a),e.elementType=Sa,e.lanes=o,e;case tc:return Bs(n,a,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Zl:i=10;break e;case ec:i=9;break e;case Eo:i=11;break e;case Do:i=14;break e;case lt:i=16,s=null;break e}throw Error(T(130,e==null?e:typeof e,""))}return t=Ie(i,n,t,a),t.elementType=e,t.type=s,t.lanes=o,t}function At(e,t,n,s){return e=Ie(7,e,s,t),e.lanes=n,e}function Bs(e,t,n,s){return e=Ie(22,e,s,t),e.elementType=tc,e.lanes=n,e.stateNode={isHidden:!1},e}function xa(e,t,n){return e=Ie(6,e,null,t),e.lanes=n,e}function ya(e,t,n){return t=Ie(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Lp(e,t,n,s,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Zs(0),this.expirationTimes=Zs(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zs(0),this.identifierPrefix=s,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function ci(e,t,n,s,a,o,i,l,c){return e=new Lp(e,t,n,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Ie(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:s,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Go(o),e}function Ip(e,t,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Kt,key:s==null?null:""+s,children:e,containerInfo:t,implementation:n}}function Gu(e){if(!e)return St;e=e._reactInternals;e:{if(Vt(e)!==e||e.tag!==1)throw Error(T(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ke(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(T(171))}if(e.tag===1){var n=e.type;if(ke(n))return Gc(e,n,t)}return t}function Qu(e,t,n,s,a,o,i,l,c){return e=ci(n,s,!0,e,a,o,i,l,c),e.context=Gu(null),n=e.current,s=ve(),a=wt(n),o=tt(s,a),o.callback=t??null,yt(n,o,a),e.current.lanes=a,hr(e,a,s),Ne(e,s),e}function Us(e,t,n,s){var a=t.current,o=ve(),i=wt(a);return n=Gu(n),t.context===null?t.context=n:t.pendingContext=n,t=tt(o,i),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=yt(a,t,i),e!==null&&(We(e,a,i,o),Yr(e,a,i)),i}function Ss(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function bl(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ui(e,t){bl(e,t),(e=e.alternate)&&bl(e,t)}function Mp(){return null}var Yu=typeof reportError=="function"?reportError:function(e){console.error(e)};function di(e){this._internalRoot=e}Hs.prototype.render=di.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(T(409));Us(e,t,null,null)};Hs.prototype.unmount=di.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ht(function(){Us(null,e,null,null)}),t[rt]=null}};function Hs(e){this._internalRoot=e}Hs.prototype.unstable_scheduleHydration=function(e){if(e){var t=Sc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ut.length&&t!==0&&t<ut[n].priority;n++);ut.splice(n,0,e),n===0&&Ec(e)}};function mi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ws(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function kl(){}function Rp(e,t,n,s,a){if(a){if(typeof s=="function"){var o=s;s=function(){var d=Ss(i);o.call(d)}}var i=Qu(t,s,e,0,null,!1,!1,"",kl);return e._reactRootContainer=i,e[rt]=i.current,rr(e.nodeType===8?e.parentNode:e),Ht(),i}for(;a=e.lastChild;)e.removeChild(a);if(typeof s=="function"){var l=s;s=function(){var d=Ss(c);l.call(d)}}var c=ci(e,0,!1,null,null,!1,!1,"",kl);return e._reactRootContainer=c,e[rt]=c.current,rr(e.nodeType===8?e.parentNode:e),Ht(function(){Us(t,c,n,s)}),c}function Vs(e,t,n,s,a){var o=n._reactRootContainer;if(o){var i=o;if(typeof a=="function"){var l=a;a=function(){var c=Ss(i);l.call(c)}}Us(t,i,e,a)}else i=Rp(n,t,e,a,s);return Ss(i)}kc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=On(t.pendingLanes);n!==0&&(_o(t,n|1),Ne(t,Z()),!(F&6)&&(bn=Z()+500,Dt()))}break;case 13:Ht(function(){var s=st(e,1);if(s!==null){var a=ve();We(s,e,1,a)}}),ui(e,1)}};zo=function(e){if(e.tag===13){var t=st(e,134217728);if(t!==null){var n=ve();We(t,e,134217728,n)}ui(e,134217728)}};Nc=function(e){if(e.tag===13){var t=wt(e),n=st(e,t);if(n!==null){var s=ve();We(n,e,t,s)}ui(e,t)}};Sc=function(){return U};Cc=function(e,t){var n=U;try{return U=e,t()}finally{U=n}};Ma=function(e,t,n){switch(t){case"input":if(Da(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var s=n[t];if(s!==e&&s.form===e.form){var a=Ms(s);if(!a)throw Error(T(90));rc(s),Da(s,a)}}}break;case"textarea":ac(e,n);break;case"select":t=n.value,t!=null&&ln(e,!!n.multiple,t,!1)}};mc=ai;pc=Ht;var Op={usingClientEntryPoint:!1,Events:[vr,en,Ms,uc,dc,ai]},In={findFiberByHostInstance:It,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ap={bundleType:In.bundleType,version:In.version,rendererPackageName:In.rendererPackageName,rendererConfig:In.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ot.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=gc(e),e===null?null:e.stateNode},findFiberByHostInstance:In.findFiberByHostInstance||Mp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var $r=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!$r.isDisabled&&$r.supportsFiber)try{_s=$r.inject(Ap),Ke=$r}catch{}}Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Op;Te.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!mi(t))throw Error(T(200));return Ip(e,t,null,n)};Te.createRoot=function(e,t){if(!mi(e))throw Error(T(299));var n=!1,s="",a=Yu;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=ci(e,1,!1,null,null,n,!1,s,a),e[rt]=t.current,rr(e.nodeType===8?e.parentNode:e),new di(t)};Te.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(T(188)):(e=Object.keys(e).join(","),Error(T(268,e)));return e=gc(t),e=e===null?null:e.stateNode,e};Te.flushSync=function(e){return Ht(e)};Te.hydrate=function(e,t,n){if(!Ws(t))throw Error(T(200));return Vs(null,e,t,!0,n)};Te.hydrateRoot=function(e,t,n){if(!mi(e))throw Error(T(405));var s=n!=null&&n.hydratedSources||null,a=!1,o="",i=Yu;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Qu(t,null,e,1,n??null,a,!1,o,i),e[rt]=t.current,rr(e),s)for(e=0;e<s.length;e++)n=s[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Hs(t)};Te.render=function(e,t,n){if(!Ws(t))throw Error(T(200));return Vs(null,e,t,!1,n)};Te.unmountComponentAtNode=function(e){if(!Ws(e))throw Error(T(40));return e._reactRootContainer?(Ht(function(){Vs(null,null,e,!1,function(){e._reactRootContainer=null,e[rt]=null})}),!0):!1};Te.unstable_batchedUpdates=ai;Te.unstable_renderSubtreeIntoContainer=function(e,t,n,s){if(!Ws(n))throw Error(T(200));if(e==null||e._reactInternals===void 0)throw Error(T(38));return Vs(e,t,n,!1,s)};Te.version="18.3.1-next-f1338f8080-20240426";function Ku(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ku)}catch(e){console.error(e)}}Ku(),Kl.exports=Te;var $p=Kl.exports,Nl=$p;wa.createRoot=Nl.createRoot,wa.hydrateRoot=Nl.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function mr(){return mr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},mr.apply(this,arguments)}var ft;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(ft||(ft={}));const Sl="popstate";function Fp(e){e===void 0&&(e={});function t(s,a){let{pathname:o,search:i,hash:l}=s.location;return ho("",{pathname:o,search:i,hash:l},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(s,a){return typeof a=="string"?a:Cs(a)}return Up(t,n,null,e)}function te(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ju(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Bp(){return Math.random().toString(36).substr(2,8)}function Cl(e,t){return{usr:e.state,key:e.key,idx:t}}function ho(e,t,n,s){return n===void 0&&(n=null),mr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Cn(t):t,{state:n,key:t&&t.key||s||Bp()})}function Cs(e){let{pathname:t="/",search:n="",hash:s=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),s&&s!=="#"&&(t+=s.charAt(0)==="#"?s:"#"+s),t}function Cn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let s=e.indexOf("?");s>=0&&(t.search=e.substr(s),e=e.substr(0,s)),e&&(t.pathname=e)}return t}function Up(e,t,n,s){s===void 0&&(s={});let{window:a=document.defaultView,v5Compat:o=!1}=s,i=a.history,l=ft.Pop,c=null,d=g();d==null&&(d=0,i.replaceState(mr({},i.state,{idx:d}),""));function g(){return(i.state||{idx:null}).idx}function v(){l=ft.Pop;let P=g(),y=P==null?null:P-d;d=P,c&&c({action:l,location:C.location,delta:y})}function p(P,y){l=ft.Push;let f=ho(C.location,P,y);n&&n(f,P),d=g()+1;let m=Cl(f,d),x=C.createHref(f);try{i.pushState(m,"",x)}catch(u){if(u instanceof DOMException&&u.name==="DataCloneError")throw u;a.location.assign(x)}o&&c&&c({action:l,location:C.location,delta:1})}function N(P,y){l=ft.Replace;let f=ho(C.location,P,y);n&&n(f,P),d=g();let m=Cl(f,d),x=C.createHref(f);i.replaceState(m,"",x),o&&c&&c({action:l,location:C.location,delta:0})}function S(P){let y=a.location.origin!=="null"?a.location.origin:a.location.href,f=typeof P=="string"?P:Cs(P);return f=f.replace(/ $/,"%20"),te(y,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,y)}let C={get action(){return l},get location(){return e(a,i)},listen(P){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(Sl,v),c=P,()=>{a.removeEventListener(Sl,v),c=null}},createHref(P){return t(a,P)},createURL:S,encodeLocation(P){let y=S(P);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:p,replace:N,go(P){return i.go(P)}};return C}var El;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(El||(El={}));function Hp(e,t,n){return n===void 0&&(n="/"),Wp(e,t,n,!1)}function Wp(e,t,n,s){let a=typeof t=="string"?Cn(t):t,o=pi(a.pathname||"/",n);if(o==null)return null;let i=Xu(e);Vp(i);let l=null;for(let c=0;l==null&&c<i.length;++c){let d=nf(o);l=ef(i[c],d,s)}return l}function Xu(e,t,n,s){t===void 0&&(t=[]),n===void 0&&(n=[]),s===void 0&&(s="");let a=(o,i,l)=>{let c={relativePath:l===void 0?o.path||"":l,caseSensitive:o.caseSensitive===!0,childrenIndex:i,route:o};c.relativePath.startsWith("/")&&(te(c.relativePath.startsWith(s),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(s.length));let d=kt([s,c.relativePath]),g=n.concat(c);o.children&&o.children.length>0&&(te(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Xu(o.children,t,g,d)),!(o.path==null&&!o.index)&&t.push({path:d,score:qp(d,o.index),routesMeta:g})};return e.forEach((o,i)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))a(o,i);else for(let c of qu(o.path))a(o,i,c)}),t}function qu(e){let t=e.split("/");if(t.length===0)return[];let[n,...s]=t,a=n.endsWith("?"),o=n.replace(/\?$/,"");if(s.length===0)return a?[o,""]:[o];let i=qu(s.join("/")),l=[];return l.push(...i.map(c=>c===""?o:[o,c].join("/"))),a&&l.push(...i),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Vp(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Zp(t.routesMeta.map(s=>s.childrenIndex),n.routesMeta.map(s=>s.childrenIndex)))}const Gp=/^:[\w-]+$/,Qp=3,Yp=2,Kp=1,Jp=10,Xp=-2,Dl=e=>e==="*";function qp(e,t){let n=e.split("/"),s=n.length;return n.some(Dl)&&(s+=Xp),t&&(s+=Yp),n.filter(a=>!Dl(a)).reduce((a,o)=>a+(Gp.test(o)?Qp:o===""?Kp:Jp),s)}function Zp(e,t){return e.length===t.length&&e.slice(0,-1).every((s,a)=>s===t[a])?e[e.length-1]-t[t.length-1]:0}function ef(e,t,n){n===void 0&&(n=!1);let{routesMeta:s}=e,a={},o="/",i=[];for(let l=0;l<s.length;++l){let c=s[l],d=l===s.length-1,g=o==="/"?t:t.slice(o.length)||"/",v=Pl({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},g),p=c.route;if(!v&&d&&n&&!s[s.length-1].route.index&&(v=Pl({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},g)),!v)return null;Object.assign(a,v.params),i.push({params:a,pathname:kt([o,v.pathname]),pathnameBase:of(kt([o,v.pathnameBase])),route:p}),v.pathnameBase!=="/"&&(o=kt([o,v.pathnameBase]))}return i}function Pl(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,s]=tf(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let o=a[0],i=o.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:s.reduce((d,g,v)=>{let{paramName:p,isOptional:N}=g;if(p==="*"){let C=l[v]||"";i=o.slice(0,o.length-C.length).replace(/(.)\/+$/,"$1")}const S=l[v];return N&&!S?d[p]=void 0:d[p]=(S||"").replace(/%2F/g,"/"),d},{}),pathname:o,pathnameBase:i,pattern:e}}function tf(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Ju(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let s=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,l,c)=>(s.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(s.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),s]}function nf(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ju(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function pi(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,s=e.charAt(n);return s&&s!=="/"?null:e.slice(n)||"/"}function rf(e,t){t===void 0&&(t="/");let{pathname:n,search:s="",hash:a=""}=typeof e=="string"?Cn(e):e;return{pathname:n?n.startsWith("/")?n:sf(n,t):t,search:lf(s),hash:cf(a)}}function sf(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function ja(e,t,n,s){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function af(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Zu(e,t){let n=af(e);return t?n.map((s,a)=>a===n.length-1?s.pathname:s.pathnameBase):n.map(s=>s.pathnameBase)}function ed(e,t,n,s){s===void 0&&(s=!1);let a;typeof e=="string"?a=Cn(e):(a=mr({},e),te(!a.pathname||!a.pathname.includes("?"),ja("?","pathname","search",a)),te(!a.pathname||!a.pathname.includes("#"),ja("#","pathname","hash",a)),te(!a.search||!a.search.includes("#"),ja("#","search","hash",a)));let o=e===""||a.pathname==="",i=o?"/":a.pathname,l;if(i==null)l=n;else{let v=t.length-1;if(!s&&i.startsWith("..")){let p=i.split("/");for(;p[0]==="..";)p.shift(),v-=1;a.pathname=p.join("/")}l=v>=0?t[v]:"/"}let c=rf(a,l),d=i&&i!=="/"&&i.endsWith("/"),g=(o||i===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||g)&&(c.pathname+="/"),c}const kt=e=>e.join("/").replace(/\/\/+/g,"/"),of=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),lf=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,cf=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function uf(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const td=["post","put","patch","delete"];new Set(td);const df=["get",...td];new Set(df);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function pr(){return pr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},pr.apply(this,arguments)}const fi=k.createContext(null),mf=k.createContext(null),Gt=k.createContext(null),Gs=k.createContext(null),Qt=k.createContext({outlet:null,matches:[],isDataRoute:!1}),nd=k.createContext(null);function pf(e,t){let{relative:n}=t===void 0?{}:t;yr()||te(!1);let{basename:s,navigator:a}=k.useContext(Gt),{hash:o,pathname:i,search:l}=sd(e,{relative:n}),c=i;return s!=="/"&&(c=i==="/"?s:kt([s,i])),a.createHref({pathname:c,search:l,hash:o})}function yr(){return k.useContext(Gs)!=null}function jr(){return yr()||te(!1),k.useContext(Gs).location}function rd(e){k.useContext(Gt).static||k.useLayoutEffect(e)}function hi(){let{isDataRoute:e}=k.useContext(Qt);return e?Cf():ff()}function ff(){yr()||te(!1);let e=k.useContext(fi),{basename:t,future:n,navigator:s}=k.useContext(Gt),{matches:a}=k.useContext(Qt),{pathname:o}=jr(),i=JSON.stringify(Zu(a,n.v7_relativeSplatPath)),l=k.useRef(!1);return rd(()=>{l.current=!0}),k.useCallback(function(d,g){if(g===void 0&&(g={}),!l.current)return;if(typeof d=="number"){s.go(d);return}let v=ed(d,JSON.parse(i),o,g.relative==="path");e==null&&t!=="/"&&(v.pathname=v.pathname==="/"?t:kt([t,v.pathname])),(g.replace?s.replace:s.push)(v,g.state,g)},[t,s,i,o,e])}function sd(e,t){let{relative:n}=t===void 0?{}:t,{future:s}=k.useContext(Gt),{matches:a}=k.useContext(Qt),{pathname:o}=jr(),i=JSON.stringify(Zu(a,s.v7_relativeSplatPath));return k.useMemo(()=>ed(e,JSON.parse(i),o,n==="path"),[e,i,o,n])}function hf(e,t){return gf(e,t)}function gf(e,t,n,s){yr()||te(!1);let{navigator:a}=k.useContext(Gt),{matches:o}=k.useContext(Qt),i=o[o.length-1],l=i?i.params:{};i&&i.pathname;let c=i?i.pathnameBase:"/";i&&i.route;let d=jr(),g;if(t){var v;let P=typeof t=="string"?Cn(t):t;c==="/"||(v=P.pathname)!=null&&v.startsWith(c)||te(!1),g=P}else g=d;let p=g.pathname||"/",N=p;if(c!=="/"){let P=c.replace(/^\//,"").split("/");N="/"+p.replace(/^\//,"").split("/").slice(P.length).join("/")}let S=Hp(e,{pathname:N}),C=wf(S&&S.map(P=>Object.assign({},P,{params:Object.assign({},l,P.params),pathname:kt([c,a.encodeLocation?a.encodeLocation(P.pathname).pathname:P.pathname]),pathnameBase:P.pathnameBase==="/"?c:kt([c,a.encodeLocation?a.encodeLocation(P.pathnameBase).pathname:P.pathnameBase])})),o,n,s);return t&&C?k.createElement(Gs.Provider,{value:{location:pr({pathname:"/",search:"",hash:"",state:null,key:"default"},g),navigationType:ft.Pop}},C):C}function vf(){let e=Sf(),t=uf(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},o=null;return k.createElement(k.Fragment,null,k.createElement("h2",null,"Unexpected Application Error!"),k.createElement("h3",{style:{fontStyle:"italic"}},t),n?k.createElement("pre",{style:a},n):null,o)}const xf=k.createElement(vf,null);class yf extends k.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?k.createElement(Qt.Provider,{value:this.props.routeContext},k.createElement(nd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function jf(e){let{routeContext:t,match:n,children:s}=e,a=k.useContext(fi);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),k.createElement(Qt.Provider,{value:t},s)}function wf(e,t,n,s){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),s===void 0&&(s=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=s)!=null&&o.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,l=(a=n)==null?void 0:a.errors;if(l!=null){let g=i.findIndex(v=>v.route.id&&(l==null?void 0:l[v.route.id])!==void 0);g>=0||te(!1),i=i.slice(0,Math.min(i.length,g+1))}let c=!1,d=-1;if(n&&s&&s.v7_partialHydration)for(let g=0;g<i.length;g++){let v=i[g];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(d=g),v.route.id){let{loaderData:p,errors:N}=n,S=v.route.loader&&p[v.route.id]===void 0&&(!N||N[v.route.id]===void 0);if(v.route.lazy||S){c=!0,d>=0?i=i.slice(0,d+1):i=[i[0]];break}}}return i.reduceRight((g,v,p)=>{let N,S=!1,C=null,P=null;n&&(N=l&&v.route.id?l[v.route.id]:void 0,C=v.route.errorElement||xf,c&&(d<0&&p===0?(Ef("route-fallback",!1),S=!0,P=null):d===p&&(S=!0,P=v.route.hydrateFallbackElement||null)));let y=t.concat(i.slice(0,p+1)),f=()=>{let m;return N?m=C:S?m=P:v.route.Component?m=k.createElement(v.route.Component,null):v.route.element?m=v.route.element:m=g,k.createElement(jf,{match:v,routeContext:{outlet:g,matches:y,isDataRoute:n!=null},children:m})};return n&&(v.route.ErrorBoundary||v.route.errorElement||p===0)?k.createElement(yf,{location:n.location,revalidation:n.revalidation,component:C,error:N,children:f(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):f()},null)}var ad=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ad||{}),Es=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Es||{});function bf(e){let t=k.useContext(fi);return t||te(!1),t}function kf(e){let t=k.useContext(mf);return t||te(!1),t}function Nf(e){let t=k.useContext(Qt);return t||te(!1),t}function od(e){let t=Nf(),n=t.matches[t.matches.length-1];return n.route.id||te(!1),n.route.id}function Sf(){var e;let t=k.useContext(nd),n=kf(Es.UseRouteError),s=od(Es.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[s]}function Cf(){let{router:e}=bf(ad.UseNavigateStable),t=od(Es.UseNavigateStable),n=k.useRef(!1);return rd(()=>{n.current=!0}),k.useCallback(function(a,o){o===void 0&&(o={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,pr({fromRouteId:t},o)))},[e,t])}const Tl={};function Ef(e,t,n){!t&&!Tl[e]&&(Tl[e]=!0)}function Df(e,t){e==null||e.v7_startTransition,(e==null?void 0:e.v7_relativeSplatPath)===void 0&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}function Se(e){te(!1)}function Pf(e){let{basename:t="/",children:n=null,location:s,navigationType:a=ft.Pop,navigator:o,static:i=!1,future:l}=e;yr()&&te(!1);let c=t.replace(/^\/*/,"/"),d=k.useMemo(()=>({basename:c,navigator:o,static:i,future:pr({v7_relativeSplatPath:!1},l)}),[c,l,o,i]);typeof s=="string"&&(s=Cn(s));let{pathname:g="/",search:v="",hash:p="",state:N=null,key:S="default"}=s,C=k.useMemo(()=>{let P=pi(g,c);return P==null?null:{location:{pathname:P,search:v,hash:p,state:N,key:S},navigationType:a}},[c,g,v,p,N,S,a]);return C==null?null:k.createElement(Gt.Provider,{value:d},k.createElement(Gs.Provider,{children:n,value:C}))}function _l(e){let{children:t,location:n}=e;return hf(go(t),n)}new Promise(()=>{});function go(e,t){t===void 0&&(t=[]);let n=[];return k.Children.forEach(e,(s,a)=>{if(!k.isValidElement(s))return;let o=[...t,a];if(s.type===k.Fragment){n.push.apply(n,go(s.props.children,o));return}s.type!==Se&&te(!1),!s.props.index||!s.props.children||te(!1);let i={id:s.props.id||o.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(i.children=go(s.props.children,o)),n.push(i)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vo(){return vo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},vo.apply(this,arguments)}function Tf(e,t){if(e==null)return{};var n={},s=Object.keys(e),a,o;for(o=0;o<s.length;o++)a=s[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function _f(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function zf(e,t){return e.button===0&&(!t||t==="_self")&&!_f(e)}const Lf=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],If="6";try{window.__reactRouterVersion=If}catch{}const Mf="startTransition",zl=Dd[Mf];function Rf(e){let{basename:t,children:n,future:s,window:a}=e,o=k.useRef();o.current==null&&(o.current=Fp({window:a,v5Compat:!0}));let i=o.current,[l,c]=k.useState({action:i.action,location:i.location}),{v7_startTransition:d}=s||{},g=k.useCallback(v=>{d&&zl?zl(()=>c(v)):c(v)},[c,d]);return k.useLayoutEffect(()=>i.listen(g),[i,g]),k.useEffect(()=>Df(s),[s]),k.createElement(Pf,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:i,future:s})}const Of=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Af=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Yn=k.forwardRef(function(t,n){let{onClick:s,relative:a,reloadDocument:o,replace:i,state:l,target:c,to:d,preventScrollReset:g,viewTransition:v}=t,p=Tf(t,Lf),{basename:N}=k.useContext(Gt),S,C=!1;if(typeof d=="string"&&Af.test(d)&&(S=d,Of))try{let m=new URL(window.location.href),x=d.startsWith("//")?new URL(m.protocol+d):new URL(d),u=pi(x.pathname,N);x.origin===m.origin&&u!=null?d=u+x.search+x.hash:C=!0}catch{}let P=pf(d,{relative:a}),y=$f(d,{replace:i,state:l,target:c,preventScrollReset:g,relative:a,viewTransition:v});function f(m){s&&s(m),m.defaultPrevented||y(m)}return k.createElement("a",vo({},p,{href:S||P,onClick:C||o?s:f,ref:n,target:c}))});var Ll;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ll||(Ll={}));var Il;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Il||(Il={}));function $f(e,t){let{target:n,replace:s,state:a,preventScrollReset:o,relative:i,viewTransition:l}=t===void 0?{}:t,c=hi(),d=jr(),g=sd(e,{relative:i});return k.useCallback(v=>{if(zf(v,n)){v.preventDefault();let p=s!==void 0?s:Cs(d)===Cs(g);c(e,{replace:p,state:a,preventScrollReset:o,relative:i,viewTransition:l})}},[d,c,g,s,a,n,e,o,i,l])}const fn={MEMBER:"member",LEADER:"leader",DIRECTOR:"director"},Ff={[fn.MEMBER]:["view_schedules","view_team","view_announcements"],[fn.LEADER]:["view_schedules","view_team","view_announcements","edit_schedules","submit_orders"],[fn.DIRECTOR]:["view_schedules","view_team","view_announcements","edit_schedules","submit_orders","edit_team","edit_announcements","approve_orders","manage_users"]},ts=(e,t="solarpack2024")=>btoa(e+t).replace(/[^a-zA-Z0-9]/g,""),Bf={[ts("director")]:fn.DIRECTOR,[ts("leader")]:fn.LEADER,[ts("member")]:fn.MEMBER};class Uf{constructor(){this.currentUser=this.loadFromStorage()}authenticate(t){const n=ts(t),s=Bf[n];return s?(this.currentUser={level:s,permissions:Ff[s],loginTime:Date.now(),expiresAt:Date.now()+24*60*60*1e3},this.saveToStorage(),!0):!1}logout(){this.currentUser=null,localStorage.removeItem("solarpack_auth")}isAuthenticated(){return this.currentUser?Date.now()>this.currentUser.expiresAt?(this.logout(),!1):!0:!1}hasPermission(t){return this.isAuthenticated()?this.currentUser.permissions.includes(t):!1}getLevel(){return this.isAuthenticated()?this.currentUser.level:null}saveToStorage(){localStorage.setItem("solarpack_auth",JSON.stringify(this.currentUser))}loadFromStorage(){try{const t=localStorage.getItem("solarpack_auth");return t?JSON.parse(t):null}catch{return null}}extendSession(){this.isAuthenticated()&&(this.currentUser.expiresAt=Date.now()+24*60*60*1e3,this.saveToStorage())}}const V=new Uf;const Hf=()=>{const[e,t]=k.useState(!1),[n,s]=k.useState(!1),[a,o]=k.useState(!1),[i,l]=k.useState(!1),[c,d]=k.useState(""),[g,v]=k.useState(""),[p,N]=k.useState(!1),S=jr(),C=hi();k.useEffect(()=>{o(V.isAuthenticated())},[S]),k.useEffect(()=>{o(V.isAuthenticated())},[]),k.useEffect(()=>{const R=B=>{i&&!B.target.closest(".auth-dropdown")&&l(!1)};return document.addEventListener("mousedown",R),()=>{document.removeEventListener("mousedown",R)}},[i]);const P=()=>{t(!e)},y=()=>{t(!1)},f=()=>{a?l(!i):u()},m=()=>{l(!1),C("/admin")},x=()=>{V.logout(),o(!1),l(!1),C("/")},u=()=>{s(!0),d(""),v("")},j=()=>{s(!1),d(""),v("")},w=R=>{R.preventDefault(),N(!0),v(""),setTimeout(()=>{V.authenticate(c)?(o(!0),j(),C("/admin")):v("Invalid password. Please try again."),N(!1)},500)};k.useEffect(()=>{t(!1)},[S]),k.useEffect(()=>{const R=()=>{window.innerWidth>767&&e&&t(!1)};return window.addEventListener("resize",R),()=>window.removeEventListener("resize",R)},[e]),k.useEffect(()=>(document.body.style.overflow=e?"hidden":"",()=>{document.body.style.overflow=""}),[e]);const E=R=>!!(R==="/"&&S.pathname==="/"||R!=="/"&&S.pathname.startsWith(R)),L=[{path:"/",label:"Home"},{path:"/app",label:"App"},{path:"/team",label:"Team"},{path:"/alumni",label:"Alumni"},{path:"/sponsors",label:"Sponsors"},{path:"/donate",label:"Donate"},{path:"/contact",label:"Contact"}],I=a?[...L.slice(0,5),{path:"/schedules",label:"Schedules"},...L.slice(5)]:L;return r.jsxs(r.Fragment,{children:[r.jsxs("header",{className:"header",children:[r.jsxs(Yn,{to:"/",className:"logo",children:[r.jsx("img",{src:"/solarpack_logo.png",alt:"SolarPack logo"}),"SolarPack"]}),r.jsx("nav",{className:"nav",children:I.map(({path:R,label:B})=>r.jsx(Yn,{to:R,className:E(R)?"active":"",children:B},R))}),r.jsx("div",{className:"auth-section",children:a?r.jsxs("div",{className:"auth-dropdown",children:[r.jsxs("button",{className:"account-btn authenticated",onClick:f,children:[r.jsx("i",{className:"fas fa-user-check","aria-hidden":"true"}),r.jsx("span",{className:"auth-text",children:"Account"}),r.jsx("i",{className:"fas fa-chevron-down dropdown-arrow","aria-hidden":"true"})]}),i&&r.jsxs("div",{className:"dropdown-menu",children:[r.jsxs("button",{onClick:m,className:"dropdown-item",children:[r.jsx("i",{className:"fas fa-tachometer-alt","aria-hidden":"true"}),"Dashboard"]}),r.jsxs("button",{onClick:x,className:"dropdown-item logout",children:[r.jsx("i",{className:"fas fa-sign-out-alt","aria-hidden":"true"}),"Logout"]})]})]}):r.jsxs("button",{className:"account-btn",onClick:f,children:[r.jsx("i",{className:"fas fa-user","aria-hidden":"true"}),r.jsx("span",{className:"auth-text",children:"Sign In"})]})}),r.jsx("button",{className:"burger",onClick:P,"aria-label":"Toggle navigation",children:r.jsx("i",{className:`fas ${e?"fa-times":"fa-bars"}`,"aria-hidden":"true"})})]}),r.jsx("div",{className:`mobile-panel ${e?"open":""}`,onClick:y,children:r.jsxs("nav",{className:"m-nav",onClick:R=>R.stopPropagation(),children:[I.map(({path:R,label:B})=>r.jsx(Yn,{to:R,className:E(R)?"active":"",onClick:y,children:B},R)),r.jsx("div",{className:"mobile-auth",children:a?r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"mobile-auth-btn authenticated",onClick:m,children:[r.jsx("i",{className:"fas fa-tachometer-alt","aria-hidden":"true"}),"Dashboard"]}),r.jsxs("button",{className:"mobile-auth-btn logout",onClick:x,children:[r.jsx("i",{className:"fas fa-sign-out-alt","aria-hidden":"true"}),"Logout"]})]}):r.jsxs("button",{className:"mobile-auth-btn",onClick:u,children:[r.jsx("i",{className:"fas fa-user","aria-hidden":"true"}),"Sign In"]})})]})}),n&&r.jsx("div",{className:"modal-overlay",onClick:j,children:r.jsxs("div",{className:"login-modal",onClick:R=>R.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h2",{children:"Dashboard Sign In"}),r.jsx("button",{className:"close-btn",onClick:j,children:r.jsx("i",{className:"fas fa-times","aria-hidden":"true"})})]}),r.jsxs("form",{onSubmit:w,className:"login-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"password",children:"Password"}),r.jsx("input",{type:"password",id:"password",value:c,onChange:R=>d(R.target.value),placeholder:"Enter dashboard password",disabled:p,autoFocus:!0})]}),g&&r.jsxs("div",{className:"error-message",children:[r.jsx("i",{className:"fas fa-exclamation-triangle","aria-hidden":"true"}),g]}),r.jsx("button",{type:"submit",className:`submit-btn ${p?"loading":""}`,disabled:p||!c.trim(),children:p?r.jsxs(r.Fragment,{children:[r.jsx("i",{className:"fas fa-spinner fa-spin","aria-hidden":"true"}),"Signing In..."]}):r.jsxs(r.Fragment,{children:[r.jsx("i",{className:"fas fa-sign-in-alt","aria-hidden":"true"}),"Sign In"]})})]})]})})]})},Wf=({children:e})=>r.jsxs(r.Fragment,{children:[r.jsx(Hf,{}),r.jsx("main",{children:e}),r.jsx("footer",{className:"footer",children:"© 2025 NC State SolarPack. All rights reserved."})]});const Vf=()=>(k.useEffect(()=>{document.title="SolarPack"},[]),r.jsxs(r.Fragment,{children:[r.jsxs("section",{className:"hero",children:[r.jsx("img",{src:"/solarpack_logo.gif",alt:"SolarPack Logo"}),r.jsxs("div",{className:"hero-content",children:[r.jsx("h1",{children:"SolarPack"}),r.jsx("div",{className:"subtitle",children:"Solar Vehicle Team at NC State"}),r.jsx("p",{children:"Striving to break barriers in the sustainable vehicle industry with a hardworking group of over 80 passionate students. Join us in our journey to a more sustainable future for transportation."}),r.jsxs("a",{className:"donate-btn",href:"https://www.paypal.com/fundraiser/charity/3728956",target:"_blank",rel:"noopener","aria-label":"Donate to SolarPack via PayPal",children:[r.jsx("i",{className:"fab fa-paypal","aria-hidden":"true"}),"Donate"]})]})]}),r.jsxs("section",{className:"section",children:[r.jsx("img",{src:"/hero_shot.jpg",alt:"SolarPack Team"}),r.jsx("h2",{children:"Sustainable, Efficient, and Powerful."}),r.jsx("p",{children:"As NC State's first solar vehicle team, we are aiming to show the world that solar energy can be used to power a car. Along the way, we are making a solar vehicle no other team has done before."})]}),r.jsxs("section",{className:"section features",children:[r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"earth-outline"}),r.jsx("h3",{children:"Global Impact"}),r.jsx("p",{children:"We're showing the world that solar energy can power a multi-occupancy car. By building a vehicle no one has seen before, we hope to prove that sustainability and power can go hand in hand."})]}),r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"cog-outline"}),r.jsx("h3",{children:"Engineering Excellence"}),r.jsx("p",{children:"Our team thrives on creative problem solving. Members develop real-world skills as they tackle unique engineering challenges throughout our build process."})]}),r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"bulb-outline"}),r.jsx("h3",{children:"Innovation"}),r.jsx("p",{children:"Pioneering new solutions, our members are always innovating—using every resource to bring big ideas to life and push the boundaries of solar vehicle technology."})]}),r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"hand-left-outline"}),r.jsx("h3",{children:"Collaboration"}),r.jsx("p",{children:"We partner with companies and alumni to guide our journey, building strong relationships as we promote the future of energy-efficient vehicles."})]}),r.jsxs("div",{className:"feature",children:[r.jsx("ion-icon",{name:"location-outline"}),r.jsx("h3",{children:"Rooted in the Triangle"}),r.jsx("p",{children:"Proudly representing the Research Triangle, we embody the spirit of innovation and excellence that defines our region—driving forward as leaders in sustainable technology."})]})]}),r.jsx(Gf,{}),r.jsxs("div",{className:"socials",children:[r.jsx("a",{href:"https://www.instagram.com/solarpacknc/",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-instagram"})}),r.jsx("a",{href:"https://www.linkedin.com/company/solarpack-nc-state/",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-linkedin"})}),r.jsx("a",{href:"https://www.facebook.com/SolarPackNC/",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-facebook"})})]})]})),Gf=()=>{const[e,t]=k.useState(0),n=k.useRef(null),s=k.useRef(null),[a,o]=k.useState(320),[i,l]=k.useState(0),[c,d]=k.useState(0),g=["/race2025/race2025_1.jpg","/race2025/race2025_2.jpg","/race2025/race2025_3.jpg","/race2025/race2025_4.jpg","/race2025/race2025_5.jpg","/race2025/race2025_6.jpg","/race2025/race2025_7.jpg","/race2025/race2025_8.jpg","/race2025/race2025_9.jpg"],v=()=>{if(n.current&&s.current){const u=n.current.querySelector(".carousel-slide");if(u){const j=u.getBoundingClientRect(),w=s.current.getBoundingClientRect();o(j.width),l(w.width),d(Math.round((w.width-j.width)/2))}}};k.useEffect(()=>{v();const u=new ResizeObserver(v);return s.current&&u.observe(s.current),()=>u.disconnect()},[]);const p=19.2,N=u=>{t(u)},S=()=>{t(u=>(u+1)%g.length)},C=()=>{t(u=>(u-1+g.length)%g.length)},P=-Math.round(e*(a+p))+c,[y,f]=k.useState(null),m=u=>{f(u)},x=u=>{if(y!==null){const j=u-y;j<-30?S():j>30&&C(),f(null)}};return r.jsxs("section",{className:"section race-carousel",children:[r.jsx("h2",{children:"2025 Race Highlights"}),r.jsxs("div",{className:"carousel-container",children:[r.jsx("button",{className:"carousel-arrow left",onClick:C,"aria-label":"Previous",children:r.jsx("i",{className:"fas fa-chevron-left"})}),r.jsx("div",{className:"carousel-viewport",ref:s,onMouseDown:u=>m(u.pageX),onMouseUp:u=>x(u.pageX),onTouchStart:u=>m(u.touches[0].pageX),onTouchEnd:u=>x(u.changedTouches[0].pageX),children:r.jsx("div",{className:"carousel-track",ref:n,style:{transform:`translateX(${P}px)`},children:g.map((u,j)=>r.jsx("div",{className:"carousel-slide",children:r.jsx("img",{src:u,alt:`Race 2025 Image ${j+1}`})},j))})}),r.jsx("button",{className:"carousel-arrow right",onClick:S,"aria-label":"Next",children:r.jsx("i",{className:"fas fa-chevron-right"})}),r.jsx("div",{className:"carousel-dots",children:g.map((u,j)=>r.jsx("span",{className:`dot ${j===e?"active":""}`,onClick:()=>N(j)},j))})]})]})},Qf=()=>{const[e,t]=k.useState(null);k.useEffect(()=>{document.title="SolarPack · App"},[]);const n=o=>{t(o),document.body.style.overflow="hidden"},s=()=>{t(null),document.body.style.overflow=""};k.useEffect(()=>{const o=i=>{i.key==="Escape"&&s()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[]);const a={ipad1:{image:"/images/ipad-app/Ipad 1.png",title:"Home Page",description:"The Home Page is the main dashboard for the app, providing a real-time overview of all critical vehicle and system stats. It is designed for quick-glance monitoring and immediate access to the most important data.",features:["Live Gauges: Speed, RPM, and current draw with animated arc gauges","Battery & Solar Info: Battery voltage, wattage, solar voltage, and solar power","Temperature Readouts: Motor and inverter temperatures","System Status Indicator: Animated status dot and label","Responsive Layout: Optimized for iPad with large, easy-to-read values"]},ipad2:{image:"/images/ipad-app/Ipad 2.png",title:"BMS Page",description:"The BMS (Battery Management System) Page provides a detailed, real-time overview of battery pack health, cell-level data, and system status. Essential for monitoring, diagnostics, and troubleshooting of the battery system.",features:["Pack Overview: Total battery voltage, current draw, wattage, and 12V battery voltage","State Badges: Charging/discharging status and enable signals","Cell Grid: 10×10 grid of all cell voltages and temperatures, labeled and color-coded","Fault Codes: Lists active BMS fault codes","Status Indicator: Animated status dot and label for BMS power state"]},ipad3:{image:"/images/ipad-app/Ipad 3.png",title:"Motor Controller Page",description:"The Motor Controller Page provides a comprehensive, real-time view of the traction motor and its controller, including RPM, temperatures, voltages, and cooling system status. Essential for monitoring drive performance and diagnosing issues.",features:["RPM Gauge: Large animated arc gauge for motor RPM","Temperature Readouts: Motor and controller (inverter) temperatures","Voltage Monitoring: High-voltage and 12V system voltages","Cooling System Status: Visual indicators for radiator and pump status","System Status Indicator: Header with animated status dot and label"]},ipad4:{image:"/images/ipad-app/Ipad 4.png",title:"Charging Page",description:"The Charging Page provides a comprehensive, real-time overview of battery pack and solar charging status, including charge rates, voltages, estimated time remaining, and solar-only mode controls. Essential for monitoring charging performance and managing energy sources.",features:["Charging Status: Charger plugged in, requested current, charge rate, and pack voltage","Solar Charging: Solar voltage, amps, power, and charger status","Battery Visualization: Large battery icon with animated fill","Estimated Time Remaining: Calculates time to full charge","Solar-Only Mode: Toggle switch for solar-only charging","Rolling Line Chart: Real-time chart of charge rates"]},ipad5:{image:"/images/ipad-app/Ipad 5.png",title:"Low Voltage Page",description:"The Low Voltage Page provides a real-time overview of board health and auxiliary systems, including a grid of board status indicators and ignition mode controls. Essential for monitoring the health of low-voltage electronics and managing ignition states.",features:["Board Health Grid: 2×3 grid of board cards showing status (OK, Fault, Offline)","Ignition Mode Control: View and adjust ignition mode (OFF, ACC, ON, START)","Status Indicators: Animated status dots for live feedback","Responsive Layout: Optimized for iPad with grid-based design and large icons"]}};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsxs("section",{className:"section",style:{textAlign:"center"},children:[r.jsx("h1",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"3rem",color:"var(--accent)",marginBottom:"1.2rem"},children:"SolarPack App"}),r.jsx("p",{style:{color:"var(--subtxt)",fontSize:"1.2rem",maxWidth:"600px",margin:"0 auto 2.2rem"},children:"Welcome to the SolarPack App page! Here you'll find information about our mobile and web applications, features, and how to get involved as a user or developer."}),r.jsxs("div",{className:"app-buttons-row",children:[r.jsx("a",{href:"https://apps.apple.com/us/app/solarpack/id6748289347",children:r.jsx("img",{src:"/images/app_store.png",alt:"Download on the App Store",style:{height:"60px",width:"auto",boxShadow:"none",background:"none"}})}),r.jsx("a",{href:"https://solarpack-app-server-alyv.onrender.com/#",style:{textDecoration:"none"},target:"_blank",rel:"noopener noreferrer",children:r.jsxs("button",{style:{background:"var(--accent)",color:"#fff",fontFamily:"'Bebas Neue', sans-serif",fontSize:"1.3rem",fontWeight:"bold",letterSpacing:"2px",padding:"1.0rem 2.2rem",display:"flex",alignItems:"center",gap:"0.7rem",border:"none",borderRadius:"10px",boxShadow:"0 2px 12px #0003",cursor:"pointer",transition:"background 0.2s",textTransform:"uppercase"},children:[r.jsx("i",{className:"fas fa-satellite-dish",style:{fontSize:"1.5rem"}}),"VIEW LIVE TELEMETRY"]})})]}),r.jsx("div",{className:"screenshots-container",children:r.jsx("div",{className:"screenshots-grid",children:Object.entries(a).map(([o,i])=>r.jsxs("div",{className:"screenshot-card",onClick:()=>n(o),children:[r.jsx("img",{src:i.image,alt:`iPad Screenshot ${o.slice(-1)}`}),r.jsxs("div",{className:"screenshot-overlay",children:[r.jsx("div",{className:"screenshot-title",children:i.title}),r.jsxs("div",{className:"screenshot-preview",children:["Click to learn more about the ",i.title.toLowerCase()," features..."]})]})]},o))})}),e&&a[e]&&r.jsx("div",{className:"modal-overlay",onClick:o=>o.target===o.currentTarget&&s(),children:r.jsxs("div",{className:"modal-content",children:[r.jsx("button",{className:"close-btn",onClick:s,children:"×"}),r.jsx("div",{className:"modal-image",children:r.jsx("img",{src:a[e].image,alt:a[e].title})}),r.jsxs("div",{className:"modal-details",children:[r.jsx("h2",{className:"modal-title",children:a[e].title}),r.jsx("p",{className:"modal-description",children:a[e].description}),r.jsx("ul",{className:"modal-features",children:a[e].features.map((o,i)=>r.jsx("li",{children:o},i))})]})]})})]}),r.jsx("div",{style:{textAlign:"center",margin:"2.5rem 0 0",fontSize:"0.98rem"},children:r.jsx("a",{href:"/privacy-policy",style:{color:"var(--accent)",textDecoration:"none",opacity:"0.8",transition:"opacity 0.2s"},children:"Privacy & Data Policy"})})]})},Yf=()=>{const[e,t]=k.useState([]),[n,s]=k.useState(!0);k.useEffect(()=>{document.title="SolarPack · Alumni",(async()=>{try{const c=`/data/alumni.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,d=await fetch(c,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(d.status===304){const g=sessionStorage.getItem("json:/data/alumni.json");if(g){const v=JSON.parse(g);t(v.alumniData||[]);return}throw new Error("HTTP 304 with no cached copy")}if(d.ok){const g=await d.json();sessionStorage.setItem("json:/data/alumni.json",JSON.stringify(g)),t(g.alumniData||[])}else t([])}catch(l){console.error("Error loading alumni.json",l);const c=sessionStorage.getItem("json:/data/alumni.json");if(c){const d=JSON.parse(c);t(d.alumniData||[])}else t([])}finally{s(!1)}})()},[]);const a=e.slice(0,Math.ceil(e.length/2)),o=e.slice(Math.ceil(e.length/2));return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsx("h1",{children:"Alumni"}),r.jsx("div",{className:"alumni-grid"}),r.jsx("div",{className:"alumni-by-year",children:r.jsxs("div",{className:"alumni-columns",children:[r.jsx("div",{children:a.map((i,l)=>{var c;return r.jsxs("section",{className:"alumni-section",children:[r.jsx("h2",{children:i.semester}),r.jsx("ul",{children:(c=i.leadership)==null?void 0:c.map((d,g)=>r.jsxs("li",{children:[r.jsxs("b",{children:[d.role,":"]})," ",d.name]},g))})]},l)})}),r.jsx("div",{children:o.map((i,l)=>{var c;return r.jsxs("section",{className:"alumni-section",children:[r.jsx("h2",{children:i.semester}),r.jsx("ul",{children:(c=i.leadership)==null?void 0:c.map((d,g)=>r.jsxs("li",{children:[r.jsxs("b",{children:[d.role,":"]})," ",d.name]},g))})]},l)})})]})})]})},Kf=()=>(k.useEffect(()=>{document.title="SolarPack · Contact"},[]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsx("h1",{children:"Contact Us"}),r.jsxs("div",{className:"contact-section",children:[r.jsxs("div",{className:"contact-info",children:[r.jsxs("p",{children:["Email us at ",r.jsx("a",{href:"mailto:solarpacknc@ncsu.edu",children:"solarpacknc@ncsu.edu"})]}),r.jsx("p",{children:"Or reach out on our socials below!"})]}),r.jsxs("div",{className:"contact-socials",children:[r.jsx("a",{href:"https://www.instagram.com/solarpacknc/",title:"Instagram",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-instagram"})}),r.jsx("a",{href:"https://www.linkedin.com/company/solarpack-nc-state/",title:"LinkedIn",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-linkedin"})}),r.jsx("a",{href:"https://www.facebook.com/SolarPackNC/",title:"Facebook",target:"_blank",rel:"noopener",children:r.jsx("i",{className:"fab fa-facebook"})})]})]})]})),Jf=()=>{const[e,t]=k.useState(null),[n,s]=k.useState(""),[a,o]=k.useState(!1);k.useEffect(()=>{document.title="SolarPack · Donate"},[]);const i=[5,50,100,200],l=g=>{t(g),s(g.toString()),o(!0)},c=g=>{const v=g.target.value;s(v),v&&parseFloat(v)>=1?(t(parseFloat(v)),o(!0)):o(!1)},d=()=>{e&&e>=1&&window.open("https://www.paypal.com/fundraiser/charity/3728956","_blank")};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsx("h1",{children:"Support Our Mission"}),r.jsxs("div",{className:"donate-section",children:[r.jsx("p",{children:"Your donation helps us build, innovate, and compete in solar car challenges. Every contribution makes a difference!"}),r.jsxs("form",{style:{margin:"2rem 0"},children:[r.jsxs("div",{style:{marginBottom:"1.2rem"},children:[r.jsx("label",{htmlFor:"donation-amount",style:{fontWeight:"600",marginBottom:"0.7rem",display:"block"},children:"Choose an amount:"}),r.jsxs("div",{className:"donation-choices-group",children:[i.map(g=>r.jsxs("button",{type:"button",className:`donation-choice ${e===g?"active":""}`,onClick:()=>l(g),children:["$",g]},g)),r.jsx("input",{type:"number",min:"1",step:"1",id:"donation-amount",placeholder:"Custom amount",value:n,onChange:c})]})]}),a&&e&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"selected-amount-display",children:["You are donating: $",parseFloat(e).toFixed(2)]}),r.jsxs("button",{type:"button",className:"donate-btn",onClick:d,children:[r.jsx("i",{className:"fab fa-paypal",style:{marginRight:"0.5rem"}}),"Donate with PayPal"]})]})]}),r.jsxs("ul",{className:"donation-uses",children:[r.jsxs("li",{children:[r.jsx("b",{children:"Aeroshell Construction:"})," The largest portion of your donation will go directly toward building our new carbon fiber aeroshell, which is essential for our car's performance and efficiency."]}),r.jsxs("li",{children:[r.jsx("b",{children:"Regulatory Components:"})," We need to purchase fasteners, wires, and other small accessories to meet strict race regulations—including the battery box, ballast boxes, and other required safety features."]}),r.jsxs("li",{children:[r.jsx("b",{children:"2026 Race Preparation:"})," Your support helps us meet all technical and safety requirements so we can compete in the 2026 solar car race and represent NC State on a national stage."]})]}),r.jsx("p",{className:"donate-note",children:"We are a 501(c)(3) charitable organization, EIN: 81-4817863. All the contributions are tax deductible. No goods or services will be provided for the contribution."})]})]})};const Xf=()=>{const[e,t]=k.useState({0:!0});k.useEffect(()=>{document.title="SolarPack · Privacy Policy"},[]);const n=a=>{t(o=>({...o,[a]:!o[a]}))},s=[{title:"Summary",content:r.jsxs("p",{children:["We collect a minimal set of data points ",r.jsx("strong",{children:"only"})," to make the app function and to help us understand and improve performance. We do",r.jsx("em",{children:" not"})," use your data for advertising, marketing, personalization, or tracking across other apps."]})},{title:"Data We Collect",content:r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("strong",{children:"Precise Location"})," – Enables GPS-based features such as lap timing and detailed telemetry."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Coarse Location"})," – Provides general region information (e.g., for Bluetooth proximity) when precise GPS is unnecessary."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Device ID"})," – Helps differentiate hardware models and debug device-specific issues."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Product Interaction"})," – Anonymous aggregate data on how you navigate the app (e.g., tab switches) to improve user experience."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Crash Data"})," – Automatic crash reports allow us to diagnose bugs and improve stability."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Performance Data"})," – Metrics like launch time and connection latency help us monitor and optimize performance."]})]})},{title:"Data We Don't Collect",content:r.jsxs("ul",{children:[r.jsx("li",{children:"Contact information (name, email, phone, address)"}),r.jsx("li",{children:"User-generated content (photos, messages, files)"}),r.jsx("li",{children:"Payment or financial details"}),r.jsx("li",{children:"Advertising identifiers or usage for ad targeting"}),r.jsx("li",{children:"Health, biometric, or other sensitive personal data"})]})},{title:"Tracking",content:r.jsxs("p",{children:["Our app ",r.jsx("strong",{children:"does not"})," use any data for cross-app or cross-company tracking as defined by Apple. No data is shared with data brokers or ad networks."]})},{title:"Third-Party Services",content:r.jsx("p",{children:"We use trusted third-party services (e.g., Firebase) solely for analytics, crash reporting, and cloud data storage. Each provider is contractually bound to process data only on our behalf and not for their own marketing or advertising."})},{title:"Data Retention",content:r.jsx("p",{children:"Telemetry and analytics data are stored for the shortest duration necessary to fulfill the purposes outlined above, after which they are either deleted or fully anonymized."})},{title:"Contact Us",content:r.jsxs("p",{children:["Questions? Open an issue on"," ",r.jsx("a",{href:"https://github.com/NCSU-Solarpack",target:"_blank",rel:"noopener noreferrer",children:"GitHub"})," ","or email us at"," ",r.jsx("a",{href:"mailto:solarpacknc@ncsu.edu",children:"solarpacknc@ncsu.edu"}),"."]})}];return r.jsxs("div",{className:"privacy-container",children:[r.jsx("h1",{children:"SOLARPACK Privacy & Data"}),r.jsxs("div",{className:"effective-date",children:[r.jsx("strong",{children:"Effective Date:"})," July 8, 2025"]}),r.jsx("div",{id:"policy",children:s.map((a,o)=>r.jsxs("div",{className:"policy-section",children:[r.jsxs("button",{className:"policy-toggle",onClick:()=>n(o),children:[r.jsx("span",{className:"chevron",style:{transform:e[o]?"rotate(90deg)":"rotate(0deg)"},children:"›"}),a.title.includes("Don't")?r.jsxs(r.Fragment,{children:["Data We ",r.jsx("em",{children:"Don't"})," Collect"]}):a.title]}),r.jsx("div",{className:`policy-content ${e[o]?"open":""}`,children:a.content})]},o))}),r.jsx("div",{className:"footer-note",children:"— End of Policy —"})]})},qf=()=>{const[e,t]=k.useState([]),[n,s]=k.useState(!0);return k.useEffect(()=>{document.title="SolarPack · Sponsors",(async()=>{try{const i=`/data/sponsors.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,l=await fetch(i,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(l.status===304){const c=sessionStorage.getItem("json:/data/sponsors.json");if(c){const d=JSON.parse(c);t(d.sponsorTiers||[]);return}throw new Error("HTTP 304 with no cached copy")}if(l.ok){const c=await l.json();sessionStorage.setItem("json:/data/sponsors.json",JSON.stringify(c)),t(c.sponsorTiers||[])}else t([])}catch(o){console.error("Error loading sponsors.json",o);const i=sessionStorage.getItem("json:/data/sponsors.json");if(i){const l=JSON.parse(i);t(l.sponsorTiers||[])}else t([])}finally{s(!1)}})()},[]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsxs("main",{children:[r.jsx("h1",{children:"Sponsors"}),e.map((a,o)=>r.jsxs("section",{className:"tier",children:[r.jsx("h2",{children:a.tier}),r.jsx("div",{className:"sponsor-logos",children:a.sponsors&&a.sponsors.length>0?a.sponsors.map((i,l)=>r.jsx("img",{src:i.image,alt:i.name,title:i.name},l)):r.jsx("span",{className:"placeholder",children:a.placeholder||`No ${a.tier.toLowerCase()} yet.`})})]},o)),r.jsxs("p",{className:"sponsor-contact",children:["Interested in sponsoring Fenrir or supporting our team?"," ",r.jsx("a",{href:"https://www.paypal.com/fundraiser/charity/3728956",target:"_blank",rel:"noopener",children:"Donate"})," ","or"," ",r.jsx("a",{href:"/contact",children:"Contact us"})," for more info!"]})]})]})},Fr={useGitHubApi:!0,useGitHubRaw:!1,owner:"NCSU-Solarpack",repo:"SolarPack-Web",branch:"main",dataPath:"public",timing:{refreshDelay:{development:500,githubApi:1e3,githubRaw:1500,githubPages:3e3},polling:{githubApi:{maxAttempts:6,delayMs:500},githubRaw:{maxAttempts:10,delayMs:500},githubPages:{maxAttempts:30,delayMs:2e3}}}},Zf=()=>"",eh=async()=>{try{if("caches"in window){const e=await caches.keys();await Promise.all(e.map(t=>caches.delete(t))),console.log("Cleared all browser caches")}Object.keys(sessionStorage).forEach(e=>{(e.includes("team")||e.includes("data"))&&sessionStorage.removeItem(e)}),Object.keys(localStorage).forEach(e=>{(e.includes("team")||e.includes("data"))&&localStorage.removeItem(e)})}catch(e){console.warn("Could not clear all caches:",e)}},th=()=>{const e=Zf();return console.log(`Data base URL: ${e||"(relative / Pages)"}`),e},xo=async(e,t=!1)=>{const n=th(),s=e;try{const a=`https://api.github.com/repos/${Fr.owner}/${Fr.repo}/contents${Fr.dataPath}${e}?ref=${Fr.branch}`,o=`etag:${s}`,i=sessionStorage.getItem(o),l={Accept:"application/vnd.github.v3.raw","Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"};i&&(l["If-None-Match"]=i);const c=await fetch(a,{cache:"no-store",headers:l});if(c.status===304){const p=sessionStorage.getItem(`json:${s}`);if(p)return JSON.parse(p);throw new Error("HTTP 304 with no previously cached copy available")}if(!c.ok)throw new Error(`HTTP ${c.status}: ${c.statusText}`);const d=await c.text(),g=JSON.parse(d);sessionStorage.setItem(`json:${s}`,JSON.stringify(g));const v=c.headers.get("etag");return v&&sessionStorage.setItem(o,v),g}catch(a){console.warn("GitHub API fetch failed, falling back...",a)}try{const a=t?`?_t=${Date.now()}&_cb=${Math.random()}`:"",o=`${n}${e}${a}`;console.log(`Fetching data from: ${o}`);const i=await fetch(o,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(i.status===304){const c=sessionStorage.getItem(`json:${s}`);if(c)return JSON.parse(c);throw new Error("HTTP 304 with no previously cached copy available")}if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);const l=await i.json();return sessionStorage.setItem(`json:${s}`,JSON.stringify(l)),l}catch(a){if(console.warn("Primary fetch failed, trying fallback...",a),n&&n.startsWith("https://raw.githubusercontent.com"))try{const i=t?`?_t=${Date.now()}&_cb=${Math.random()}`:"",l=`${e}${i}`;console.log(`Trying fallback: ${l}`);const c=await fetch(l,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(c.ok){const d=await c.json();return sessionStorage.setItem(`json:${s}`,JSON.stringify(d)),d}}catch(i){console.warn("Fallback also failed:",i)}const o=sessionStorage.getItem(`json:${s}`);if(o)return console.log("Using cached data as final fallback"),JSON.parse(o);throw new Error(`Failed to load data: ${a.message}`)}},nh=()=>{const[e,t]=k.useState([]),[n,s]=k.useState(!0),[a,o]=k.useState(null);k.useEffect(()=>{document.title="SolarPack · Team",i()},[]);const i=async()=>{try{const c=((await xo("/data/team.json",!0)).teamMembers||[]).sort((d,g)=>(d.order||0)-(g.order||0));t(c)}catch(l){o(l.message),t([])}finally{s(!1)}};return n?r.jsx("div",{style:{textAlign:"center",padding:"4rem",color:"var(--subtxt)"},children:"Loading team data..."}):a?r.jsxs("div",{style:{textAlign:"center",padding:"4rem",color:"#dc3545"},children:["Error loading team data: ",a]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
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
      `}),r.jsx("h1",{children:"Meet the Team"}),e.length===0?r.jsxs("div",{style:{textAlign:"center",padding:"4rem",color:"var(--subtxt)"},children:[r.jsx("p",{children:"No team members found."}),r.jsx("p",{style:{fontSize:"0.9rem",marginTop:"1rem"},children:"Check the browser console for more details."})]}):r.jsx("div",{className:"team-grid",children:e.map((l,c)=>r.jsxs("div",{className:"member-card",children:[r.jsx("img",{src:l.image,alt:l.name,className:"member-img"}),r.jsx("div",{className:"member-name",children:l.name}),r.jsx("div",{className:"member-role",children:l.role}),r.jsx("p",{className:"member-bio",children:l.bio})]},c))})]})};const rh=({projects:e=[],events:t=[],onItemClick:n,selectedTeam:s="all",teams:a=[]})=>{const[o,i]=k.useState(new Date),[l,c]=k.useState([]);k.useEffect(()=>{d()},[o,e,t,s]);const d=()=>{const m=o.getFullYear(),x=o.getMonth(),u=new Date(m,x,1),w=new Date(m,x+1,0).getDate(),E=u.getDay(),L=[];let I=1;for(let R=0;R<6;R++){const B=[];for(let b=0;b<7;b++)if(R*7+b<E||I>w)B.push(null);else{const D=new Date(m,x,I),M={date:I,fullDate:D,isToday:g(D),events:v(D),projects:p(D),isWeekend:b===0||b===6};B.push(M),I++}if(L.push(B),I>w)break}c(L)},g=m=>{const x=new Date;return m.toDateString()===x.toDateString()},v=m=>t.filter(x=>{const j=new Date(x.date).toDateString()===m.toDateString(),w=s==="all"||x.team===s;return j&&w}),p=m=>{const x=[];return e.forEach(u=>{if(!(s==="all"||u.team===s))return;const w=new Date(u.startDate),E=new Date(u.dueDate);w.toDateString()===m.toDateString()&&x.push({...u,type:"project-start",displayType:"start"}),E.toDateString()===m.toDateString()&&x.push({...u,type:"project-due",displayType:"due"}),u.tasks.forEach(L=>{new Date(L.dueDate).toDateString()===m.toDateString()&&x.push({...L,type:"task-due",displayType:"task",projectTitle:u.title,projectTeam:u.team})})}),x},N=m=>{const x=a.find(u=>u.id===m);return x?x.color:"#6c757d"},S=(m,x)=>{if(x==="completed")return!1;const u=new Date;return new Date(m)<u},C=m=>{i(x=>{const u=new Date(x);return u.setMonth(x.getMonth()+m),u})},P=()=>{i(new Date)},y=["January","February","March","April","May","June","July","August","September","October","November","December"],f=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return r.jsxs("div",{className:"calendar-container",children:[r.jsxs("div",{className:"calendar-header",children:[r.jsxs("div",{className:"calendar-nav",children:[r.jsx("button",{onClick:()=>C(-1),className:"nav-btn",children:"← Previous"}),r.jsx("button",{onClick:P,className:"today-btn",children:"Today"}),r.jsx("button",{onClick:()=>C(1),className:"nav-btn",children:"Next →"})]}),r.jsxs("h2",{className:"calendar-title",children:[y[o.getMonth()]," ",o.getFullYear()]})]}),r.jsxs("div",{className:"calendar-grid",children:[r.jsx("div",{className:"calendar-header-row",children:f.map(m=>r.jsx("div",{className:"day-header",children:m},m))}),l.map((m,x)=>r.jsx("div",{className:"calendar-week",children:m.map((u,j)=>r.jsx("div",{className:`calendar-day ${u?"":"empty"} ${u!=null&&u.isToday?"today":""} ${u!=null&&u.isWeekend?"weekend":""}`,children:u&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"day-number",children:u.date}),r.jsxs("div",{className:"day-items",children:[u.events.map(w=>r.jsxs("div",{className:"calendar-item event-item",style:{backgroundColor:N(w.team)},onClick:()=>n(w,"event"),title:`${w.title} - ${w.startTime}`,children:[r.jsx("span",{className:"item-indicator",children:"📅"}),r.jsx("span",{className:"item-title",children:w.title})]},`event-${w.id}`)),u.projects.map((w,E)=>r.jsxs("div",{className:`calendar-item project-item ${w.displayType==="due"?"due-item":""} ${S(w.dueDate,w.status)?"overdue-item":""}`,style:{backgroundColor:w.displayType==="task"?N(w.projectTeam):N(w.team),opacity:w.displayType==="start"?.7:1},onClick:()=>n(w,w.type),title:w.displayType==="start"?`${w.title} - Starts`:w.displayType==="due"?`${w.title} - Due`:`${w.title} - Task Due`,children:[r.jsx("span",{className:"item-indicator",children:w.displayType==="start"?"🚀":w.displayType==="due"?"🎯":"✅"}),r.jsx("span",{className:"item-title",children:(w.displayType==="task",w.title)})]},`project-${w.id}-${E}`))]})]})},j))},x))]}),r.jsxs("div",{className:"calendar-legend",children:[r.jsx("h3",{children:"Legend"}),r.jsxs("div",{className:"legend-items",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-indicator",children:"📅"}),r.jsx("span",{children:"Events"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-indicator",children:"🚀"}),r.jsx("span",{children:"Project Start"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-indicator",children:"🎯"}),r.jsx("span",{children:"Project Due"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-indicator",children:"✅"}),r.jsx("span",{children:"Task Due"})]})]})]})]})};const sh=()=>{const[e,t]=k.useState({teams:[],projects:[],events:[],lastUpdated:""}),[n,s]=k.useState(!0),[a,o]=k.useState("all"),[i,l]=k.useState("projects"),[c,d]=k.useState(null),[g,v]=k.useState(null);k.useEffect(()=>{p()},[]);const p=async()=>{try{const j=`/data/schedules.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,w=await fetch(j,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(w.status===304){const L=sessionStorage.getItem("json:/data/schedules.json");if(L){t(JSON.parse(L));return}throw new Error("HTTP 304 with no cached copy")}if(!w.ok)throw new Error(`HTTP ${w.status}: ${w.statusText}`);const E=await w.json();sessionStorage.setItem("json:/data/schedules.json",JSON.stringify(E)),t(E)}catch(u){console.error("Error loading schedule data:",u);const j=sessionStorage.getItem("json:/data/schedules.json");j&&t(JSON.parse(j))}finally{s(!1)}},N=u=>{const j=e.teams.find(w=>w.id===u);return j?j.name:u},S=u=>{const j=e.teams.find(w=>w.id===u);return j?j.color:"#6c757d"},C=(u,j)=>{if(j==="completed")return!1;const w=new Date;return new Date(u)<w},P=(u,j)=>{if(C(j,u))return"#dc3545";switch(u){case"completed":return"#28a745";case"in-progress":return"#007bff";case"pending":return"#ffc107";case"planning":return"#6c757d";case"critical":return"#dc3545";default:return"#6c757d"}},y=(u,j="team")=>a==="all"?u:u.filter(w=>w[j]===a),f=()=>{const u=new Date,j=new Date(u.getTime()+7*24*60*60*1e3);return e.events.filter(w=>{const E=new Date(w.date);return E>=u&&E<=j}).sort((w,E)=>new Date(w.date)-new Date(E.date))},m=(u,j)=>{if(j==="event")v(u);else if(j.includes("project")){const w=e.projects.find(E=>E.id===u.id);w&&d(w)}else if(j==="task-due"){const w=e.projects.find(E=>E.tasks.some(L=>L.id===u.id));w&&d(w)}},x=()=>{const u=[];return e.projects.forEach(j=>{C(j.dueDate,j.status)&&u.push({...j,type:"project"}),j.tasks.forEach(w=>{C(w.dueDate,w.status)&&u.push({...w,type:"task",projectTitle:j.title})})}),u.sort((j,w)=>new Date(j.dueDate)-new Date(w.dueDate))};return n?r.jsx("div",{className:"schedules-page",children:r.jsxs("div",{className:"loading",children:[r.jsx("div",{className:"loading-spinner"}),r.jsx("p",{children:"Loading schedules..."})]})}):r.jsxs("div",{className:"schedules-page",children:[r.jsxs("div",{className:"schedules-header",children:[r.jsx("h1",{children:"Project Schedules"}),r.jsx("p",{children:"Track progress across all teams and projects"})]}),r.jsxs("div",{className:"stats-grid",children:[r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"📊"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("h3",{children:e.projects.length}),r.jsx("p",{children:"Active Projects"})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"⏰"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("h3",{children:f().length}),r.jsx("p",{children:"Upcoming Events"})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"⚠️"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("h3",{children:x().length}),r.jsx("p",{children:"Overdue Items"})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"👥"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("h3",{children:e.teams.length}),r.jsx("p",{children:"Teams"})]})]})]}),r.jsxs("div",{className:"schedule-tabs",children:[r.jsx("button",{className:`tab ${i==="projects"?"active":""}`,onClick:()=>l("projects"),children:"Projects"}),r.jsx("button",{className:`tab ${i==="calendar"?"active":""}`,onClick:()=>l("calendar"),children:"Calendar"}),r.jsxs("button",{className:`tab ${i==="overdue"?"active":""}`,onClick:()=>l("overdue"),children:["Overdue (",x().length,")"]})]}),r.jsxs("div",{className:"filters",children:[r.jsx("label",{htmlFor:"team-select",children:"Filter by Team:"}),r.jsxs("select",{id:"team-select",value:a,onChange:u=>o(u.target.value),children:[r.jsx("option",{value:"all",children:"All Teams"}),e.teams.map(u=>r.jsx("option",{value:u.id,children:u.name},u.id))]})]}),i==="projects"&&r.jsx("div",{className:"projects-section",children:r.jsx("div",{className:"projects-grid",children:y(e.projects).map(u=>r.jsxs("div",{className:`project-card ${C(u.dueDate,u.status)?"overdue":""}`,onClick:()=>d(u),children:[r.jsxs("div",{className:"project-header",children:[r.jsxs("div",{children:[r.jsx("h3",{children:u.title}),r.jsx("div",{className:"team-badge",style:{backgroundColor:S(u.team)},children:N(u.team)})]}),r.jsx("div",{className:"status-badge",style:{backgroundColor:P(u.status,u.dueDate)},children:C(u.dueDate,u.status)?"OVERDUE":u.status.toUpperCase()})]}),r.jsx("p",{className:"project-description",children:u.description}),r.jsxs("div",{className:"progress-section",children:[r.jsxs("div",{className:"progress-header",children:[r.jsxs("span",{children:["Progress: ",u.progress,"%"]}),r.jsxs("span",{className:"hours",children:[u.actualHours,"/",u.estimatedHours,"h"]})]}),r.jsx("div",{className:"progress-bar",children:r.jsx("div",{className:"progress-fill",style:{width:`${u.progress}%`,backgroundColor:S(u.team)}})})]}),r.jsxs("div",{className:"project-meta",children:[r.jsxs("div",{className:"meta-item",children:[r.jsx("strong",{children:"Assigned:"})," ",u.assignedTo]}),r.jsxs("div",{className:"meta-item",children:[r.jsx("strong",{children:"Due:"})," ",new Date(u.dueDate).toLocaleDateString()]}),r.jsxs("div",{className:"meta-item",children:[r.jsx("strong",{children:"Priority:"}),r.jsx("span",{className:`priority ${u.priority}`,children:u.priority})]})]}),u.tasks.length>0&&r.jsxs("div",{className:"tasks-preview",children:[r.jsxs("h4",{children:["Tasks (",u.tasks.length,")"]}),r.jsxs("div",{className:"task-status-overview",children:[u.tasks.slice(0,3).map(j=>r.jsxs("div",{className:"mini-task",style:{borderLeft:`3px solid ${P(j.status,j.dueDate)}`},children:[r.jsx("span",{className:"task-name",children:j.title}),r.jsxs("span",{className:"task-progress",children:[j.progress,"%"]})]},j.id)),u.tasks.length>3&&r.jsxs("div",{className:"more-tasks",children:["+",u.tasks.length-3," more"]})]})]})]},u.id))})}),i==="calendar"&&r.jsxs("div",{className:"calendar-section",children:[r.jsx(rh,{projects:y(e.projects),events:y(e.events),teams:e.teams,selectedTeam:a,onItemClick:m}),r.jsxs("div",{className:"upcoming-events",children:[r.jsx("h2",{children:"Upcoming Events (Next 7 Days)"}),r.jsxs("div",{className:"events-list",children:[f().map(u=>r.jsxs("div",{className:"event-card",onClick:()=>v(u),style:{borderLeft:`4px solid ${S(u.team)}`},children:[r.jsx("div",{className:"event-date",children:new Date(u.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}),r.jsxs("div",{className:"event-content",children:[r.jsx("h3",{children:u.title}),r.jsx("p",{children:u.description}),r.jsxs("div",{className:"event-meta",children:[r.jsxs("span",{className:"time",children:[u.startTime," - ",u.endTime]}),r.jsx("span",{className:"team",children:N(u.team)}),r.jsx("span",{className:"location",children:u.location})]})]})]},u.id)),f().length===0&&r.jsx("div",{className:"no-events",children:r.jsx("p",{children:"No upcoming events in the next 7 days"})})]})]}),r.jsxs("div",{className:"all-events",children:[r.jsx("h2",{children:"All Events"}),r.jsx("div",{className:"events-grid",children:y(e.events).map(u=>r.jsxs("div",{className:"event-card-small",onClick:()=>v(u),children:[r.jsxs("div",{className:"event-header",children:[r.jsx("div",{className:"event-date-small",children:new Date(u.date).toLocaleDateString()}),r.jsx("div",{className:"event-type",style:{backgroundColor:S(u.team)},children:u.type})]}),r.jsx("h3",{children:u.title}),r.jsx("p",{children:u.description}),r.jsxs("div",{className:"event-meta-small",children:[r.jsx("span",{children:N(u.team)}),r.jsxs("span",{children:[u.startTime," - ",u.endTime]})]})]},u.id))})]})]}),i==="overdue"&&r.jsxs("div",{className:"overdue-section",children:[r.jsx("h2",{children:"Overdue Items"}),x().length===0?r.jsxs("div",{className:"no-overdue",children:[r.jsx("div",{className:"celebration-icon",children:"🎉"}),r.jsx("h3",{children:"All caught up!"}),r.jsx("p",{children:"No overdue items at the moment. Great work!"})]}):r.jsx("div",{className:"overdue-list",children:x().map((u,j)=>r.jsxs("div",{className:"overdue-item",children:[r.jsxs("div",{className:"overdue-priority",children:[r.jsx("div",{className:"overdue-icon",children:"⚠️"}),r.jsxs("div",{className:"days-overdue",children:[Math.floor((new Date-new Date(u.dueDate))/(1e3*60*60*24))," days overdue"]})]}),r.jsxs("div",{className:"overdue-content",children:[r.jsx("h3",{children:u.title}),u.type==="task"&&r.jsxs("p",{className:"parent-project",children:["Part of: ",u.projectTitle]}),r.jsx("p",{children:u.description}),r.jsxs("div",{className:"overdue-meta",children:[r.jsxs("span",{children:[r.jsx("strong",{children:"Due:"})," ",new Date(u.dueDate).toLocaleDateString()]}),r.jsxs("span",{children:[r.jsx("strong",{children:"Assigned:"})," ",u.assignedTo]}),r.jsxs("span",{children:[r.jsx("strong",{children:"Priority:"})," ",u.priority]})]})]}),r.jsx("div",{className:"overdue-status",children:r.jsx("div",{className:"status-badge overdue-badge",style:{backgroundColor:"#dc3545"},children:"OVERDUE"})})]},`${u.type}-${u.id}`))})]}),c&&r.jsx("div",{className:"modal-overlay",onClick:()=>d(null),children:r.jsxs("div",{className:"modal",onClick:u=>u.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h2",{children:c.title}),r.jsx("button",{className:"close-btn",onClick:()=>d(null),children:"×"})]}),r.jsx("div",{className:"modal-content",children:r.jsxs("div",{className:"project-detail",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{children:"Project Overview"}),r.jsx("p",{children:c.description}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Team:"})," ",N(c.team)]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Status:"})," ",c.status]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",c.priority]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Assigned To:"})," ",c.assignedTo]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Start Date:"})," ",new Date(c.startDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Due Date:"})," ",new Date(c.dueDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Progress:"})," ",c.progress,"%"]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Hours:"})," ",c.actualHours,"/",c.estimatedHours]})]})]}),c.tasks.length>0&&r.jsxs("div",{className:"detail-section",children:[r.jsxs("h3",{children:["Tasks (",c.tasks.length,")"]}),r.jsx("div",{className:"tasks-detail",children:c.tasks.map(u=>r.jsxs("div",{className:"task-detail",children:[r.jsxs("div",{className:"task-header",children:[r.jsx("h4",{children:u.title}),r.jsx("div",{className:"status-badge",style:{backgroundColor:P(u.status,u.dueDate)},children:C(u.dueDate,u.status)?"OVERDUE":u.status.toUpperCase()})]}),r.jsx("p",{children:u.description}),r.jsxs("div",{className:"task-meta-detail",children:[r.jsxs("span",{children:[r.jsx("strong",{children:"Due:"})," ",new Date(u.dueDate).toLocaleDateString()]}),r.jsxs("span",{children:[r.jsx("strong",{children:"Assigned:"})," ",u.assignedTo]}),r.jsxs("span",{children:[r.jsx("strong",{children:"Progress:"})," ",u.progress,"%"]})]})]},u.id))})]})]})})]})}),g&&r.jsx("div",{className:"modal-overlay",onClick:()=>v(null),children:r.jsxs("div",{className:"modal",onClick:u=>u.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h2",{children:g.title}),r.jsx("button",{className:"close-btn",onClick:()=>v(null),children:"×"})]}),r.jsx("div",{className:"modal-content",children:r.jsx("div",{className:"event-detail",children:r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{children:"Event Details"}),r.jsx("p",{children:g.description}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Date:"})," ",new Date(g.date).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Time:"})," ",g.startTime," - ",g.endTime]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Team:"})," ",N(g.team)]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Type:"})," ",g.type]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Location:"})," ",g.location]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",g.priority]})]}),g.attendees&&g.attendees.length>0&&r.jsxs("div",{className:"attendees-section",children:[r.jsx("h4",{children:"Attendees"}),r.jsx("ul",{children:g.attendees.map((u,j)=>r.jsx("li",{children:u},j))})]})]})})})]})})]})};const ah=()=>(k.useEffect(()=>{document.title="Page Not Found - SolarPack"},[]),r.jsx("div",{className:"not-found-container",children:r.jsxs("div",{className:"not-found-content",children:[r.jsx("h1",{children:"Page Not Found"}),r.jsx("div",{className:"error-code",children:"404"}),r.jsx("p",{children:"The page you're looking for doesn't exist or may have been moved."}),r.jsxs("div",{className:"error-actions",children:[r.jsx(Yn,{to:"/",className:"home-btn",children:"Back to Home"}),r.jsx(Yn,{to:"/contact",className:"contact-btn",children:"Contact Us"})]})]})})),oh=({onLogin:e})=>{const[t,n]=k.useState(""),[s,a]=k.useState(""),[o,i]=k.useState(!1),l=c=>{c.preventDefault(),i(!0),a(""),setTimeout(()=>{V.authenticate(t)?(e(),n("")):a("Invalid password. Please try again."),i(!1)},500)};return r.jsxs("div",{className:"login-container",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"login-card",children:[r.jsxs("div",{className:"login-header",children:[r.jsxs("div",{className:"login-logo",children:[r.jsx("img",{src:"/solarpack_logo.png",alt:"SolarPack logo"}),r.jsx("h1",{className:"login-title",children:"SolarPack"})]}),r.jsx("p",{className:"login-subtitle",children:"Admin Dashboard Access"})]}),r.jsxs("form",{onSubmit:l,children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"password",className:"form-label",children:"Password"}),r.jsx("input",{type:"password",id:"password",className:"form-input",value:t,onChange:c=>n(c.target.value),placeholder:"Enter your dashboard password",disabled:o,autoFocus:!0})]}),r.jsx("button",{type:"submit",className:"login-button",disabled:o||!t.trim(),children:o?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"loading-spinner"}),"Signing In..."]}):"Access Dashboard"}),s&&r.jsx("div",{className:"error-message",children:s})]})]})]})},_t={owner:"NCSU-Solarpack",repo:"SolarPack-Web",branch:"main"};class ih{constructor(){this.token="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",this.baseUrl="https://api.github.com",console.log("GitHub Service initialized"),console.log("Environment token available:","Yes"),this.loadToken()}setToken(t){this.token=t,localStorage.setItem("github_token",t)}loadToken(){return this.token="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",console.log("Using environment token"),this.token}clearToken(){this.token=null,localStorage.removeItem("github_token")}hasToken(){return this.loadToken()!==null}async getFileSHA(t){if(!this.token)throw new Error("No GitHub token available");const n=`${this.baseUrl}/repos/${_t.owner}/${_t.repo}/contents/${t}`;try{const s=await fetch(n,{headers:{Authorization:`Bearer ${this.token}`,Accept:"application/vnd.github.v3+json","X-GitHub-Api-Version":"2022-11-28"}});if(!s.ok){const o=await s.text();throw console.error("GitHub API error getting SHA:",s.status,o),new Error(`GitHub API error: ${s.status} - ${o}`)}return(await s.json()).sha}catch(s){throw console.error("Error getting file SHA:",s),s}}async updateFile(t,n,s){if(!this.token)throw new Error("No GitHub token available");try{console.log("Updating file:",t),console.log("Using token:",this.token?`${this.token.substring(0,8)}...`:"No token");const a=await this.getFileSHA(t);console.log("Got SHA:",a);const o=JSON.stringify(n,null,2),l=new TextEncoder().encode(o);let c="";l.forEach(S=>{c+=String.fromCharCode(S)});const d=btoa(c),g=`${this.baseUrl}/repos/${_t.owner}/${_t.repo}/contents/${t}`,v={message:s||`Update ${t}`,content:d,sha:a,branch:_t.branch};console.log("Request body:",v);const p=await fetch(g,{method:"PUT",headers:{Authorization:`Bearer ${this.token}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json","X-GitHub-Api-Version":"2022-11-28"},body:JSON.stringify(v)});if(console.log("Update response status:",p.status),!p.ok){const S=await p.text();throw console.error("GitHub API error updating file:",p.status,S),new Error(`GitHub API error: ${p.status} - ${S}`)}const N=await p.json();return console.log("File updated successfully:",N),N}catch(a){throw console.error("Error updating file:",a),a}}async saveTeamData(t){return this.updateFile("public/data/team.json",t,"Update team data via admin interface")}async saveScheduleData(t){return this.updateFile("public/data/schedules.json",t,"Update schedules and orders via admin interface")}async saveContentData(t){return this.updateFile("public/data/content.json",t,"Update announcements and events via admin interface")}async triggerRebuild(){return console.log("Skipping rebuild - data is served from GitHub raw content"),Promise.resolve()}async testConnection(){var t,n;if(!this.token)throw new Error("No GitHub token available");try{const s=`${this.baseUrl}/repos/${_t.owner}/${_t.repo}`;console.log("Testing connection to:",s),console.log("Using token:",this.token?`${this.token.substring(0,8)}...`:"No token");const a=await fetch(s,{headers:{Authorization:`Bearer ${this.token}`,Accept:"application/vnd.github.v3+json","X-GitHub-Api-Version":"2022-11-28"}});if(console.log("Response status:",a.status),!a.ok){const i=await a.text();throw console.error("GitHub API error:",i),new Error(`GitHub API error: ${a.status} - ${i}`)}const o=await a.json();return{success:!0,repo:o.name,owner:o.owner.login,branch:o.default_branch,permissions:{push:((t=o.permissions)==null?void 0:t.push)||!1,admin:((n=o.permissions)==null?void 0:n.admin)||!1}}}catch(s){return console.error("Connection test failed:",s),{success:!1,error:s.message}}}}const Ue=new ih,id=(e,t,n=1e3)=>{const[s,a]=k.useState("up-to-date"),[o,i]=k.useState(Date.now()),[l,c]=k.useState(null),[d,g]=k.useState(!1),[v,p]=k.useState(null),N=k.useRef(null),S=k.useRef(null),C=async()=>{try{const m=new AbortController,x=setTimeout(()=>m.abort(),1e4),u=`?_t=${Date.now()}&_cb=${Math.random()}&_check=1`,j=await fetch(e+u,{cache:"no-store",signal:m.signal,headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(clearTimeout(x),!j.ok&&j.status!==304)throw new Error(`HTTP error! status: ${j.status} - ${j.statusText}`);if(j.status===304){console.log("Server returned 304 - data unchanged"),i(Date.now()),p(null),a("up-to-date");return}const E=(await j.json()).lastUpdated;console.log("Sync check successful:",{fullPath:e+u,currentServerTime:E,lastUpdated:t,serverLastUpdated:l,timestamp:new Date().toISOString()}),i(Date.now()),p(null),l===null?(c(E),console.log("First sync check - storing server time:",E),a("up-to-date")):E!==t?(console.log("Data mismatch detected!",{currentServerTime:E,lastUpdated:t,serverLastUpdated:l,shouldRefresh:!0}),a("changes-detected"),c(E)):a("up-to-date")}catch(m){console.error("Error checking for changes:",m);const x={message:m.message,name:m.name,timestamp:new Date().toISOString(),url:e,type:m.name==="AbortError"?"timeout":m.message.includes("Failed to fetch")?"network":m.message.includes("HTTP error")?"http":"unknown"};if(m.name==="AbortError")console.log("Request timed out"),x.userMessage="Request timed out after 10 seconds",x.suggestion="Check your network connection or try again later";else if(m.message.includes("Failed to fetch"))x.userMessage="Network connection failed",x.suggestion="Check your internet connection and firewall settings";else if(m.message.includes("HTTP error")){const u=m.message.match(/status: (\d+)/),j=u?parseInt(u[1]):null;j===404?(x.userMessage="Data file not found (404)",x.suggestion="The team.json file may not exist yet. Try adding team members in the admin panel first."):j===403?(x.userMessage="Access denied (403)",x.suggestion="You may not have permission to access this file. Check your GitHub token permissions."):j===500||j>=500?(x.userMessage=`Server error (${j})`,x.suggestion="The server is experiencing issues. Please try again later."):(x.userMessage=m.message,x.suggestion="An unexpected HTTP error occurred. Check the browser console for more details.")}else x.userMessage=m.message,x.suggestion="An unexpected error occurred. Check the browser console for more details.";p(x),a("error")}};return k.useEffect(()=>{if(!e)return;C(),N.current=setInterval(C,n);const m=()=>{document.hidden||(console.log("Page became visible - checking for updates"),C())};return document.addEventListener("visibilitychange",m),()=>{N.current&&clearInterval(N.current),S.current&&clearTimeout(S.current),document.removeEventListener("visibilitychange",m)}},[e,n,t]),{status:d?"saving":s,lastCheck:o,isSaving:d,errorDetails:v,startSaving:()=>g(!0),stopSaving:()=>{g(!1),S.current=setTimeout(()=>{C()},1e3)},refresh:()=>{a("checking"),c(null),C()},checkForChanges:C}},lh=({dataUrl:e="/data/team.json",onRefresh:t,lastUpdated:n,isSaving:s=!1,checkInterval:a=1e3})=>{const{status:o,lastCheck:i,errorDetails:l,refresh:c}=id(e,n,a),[d,g]=k.useState(!1),v=s?"saving":o,p={"up-to-date":{icon:"✓",text:"Everything up to date",color:"#4CAF50",bgColor:"rgba(76, 175, 80, 0.1)",borderColor:"#4CAF50"},"changes-detected":{icon:"🔄",text:"Updates available - Click to refresh",color:"#FF9800",bgColor:"rgba(255, 152, 0, 0.1)",borderColor:"#FF9800"},saving:{icon:"💾",text:"Saving changes...",color:"#9C27B0",bgColor:"rgba(156, 39, 176, 0.1)",borderColor:"#9C27B0"},error:{icon:"⚠",text:"Connection error - Click to retry",color:"#F44336",bgColor:"rgba(244, 67, 54, 0.1)",borderColor:"#F44336"}},N=()=>{(v==="changes-detected"||v==="error")&&(console.log("Sync indicator clicked - refreshing data"),p[v].text,p[v].text="Refreshing data...",t&&t().then(()=>{console.log("Data refresh completed")}).catch(f=>{console.error("Error during refresh:",f),confirm("Data refresh failed. Would you like to reload the page to ensure you have the latest data?")&&window.location.reload()}),c())},S=p[v],C=v==="changes-detected"||v==="error",P=f=>{const x=Date.now()-f;return x<1e3?"just now":x<6e4?`${Math.floor(x/1e3)}s ago`:x<36e5?`${Math.floor(x/6e4)}m ago`:`${Math.floor(x/36e5)}h ago`},y=f=>{f.stopPropagation(),g(!d)};return r.jsxs(r.Fragment,{children:[d&&l&&r.jsx("div",{className:"error-details-modal",onClick:()=>g(!1),children:r.jsxs("div",{className:"error-details-content",onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"error-details-header",children:[r.jsx("h3",{children:"🔍 Error Details"}),r.jsx("button",{className:"close-btn",onClick:()=>g(!1),children:"×"})]}),r.jsxs("div",{className:"error-details-body",children:[r.jsxs("div",{className:"error-field",children:[r.jsx("strong",{children:"Error Type:"}),r.jsx("span",{className:"error-type",children:l.type})]}),r.jsxs("div",{className:"error-field",children:[r.jsx("strong",{children:"Message:"}),r.jsx("span",{children:l.userMessage||l.message})]}),r.jsxs("div",{className:"error-field",children:[r.jsx("strong",{children:"Data URL:"}),r.jsx("code",{children:l.url})]}),r.jsxs("div",{className:"error-field",children:[r.jsx("strong",{children:"Timestamp:"}),r.jsx("span",{children:new Date(l.timestamp).toLocaleString()})]}),l.suggestion&&r.jsxs("div",{className:"error-suggestion",children:[r.jsx("strong",{children:"💡 Suggestion:"}),r.jsx("p",{children:l.suggestion})]}),r.jsxs("div",{className:"error-technical",children:[r.jsx("strong",{children:"Technical Details:"}),r.jsx("pre",{children:JSON.stringify(l,null,2)})]})]})]})}),r.jsxs("div",{className:`sync-status-indicator ${C?"clickable":""}`,onClick:N,title:C?"Click to refresh":`Last checked: ${P(i)}`,style:{backgroundColor:S.bgColor,borderColor:S.borderColor,color:S.color},children:[r.jsx("style",{children:`
        .sync-status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid;
          user-select: none;
          min-width: 180px;
          justify-content: center;
        }
        
        .sync-status-indicator.clickable {
          cursor: pointer;
          transform: scale(1);
        }
        
        .sync-status-indicator.clickable:hover {
          transform: scale(1.02);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .sync-status-indicator.clickable:active {
          transform: scale(0.98);
        }
        
        .status-icon {
          font-size: 1rem;
          animation: ${v==="saving"?"spin 1s linear infinite":"none"};
        }
        
        .status-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .error-details-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.2s ease;
        }
        
        .error-details-content {
          background: var(--surface, #1e1e1e);
          border-radius: 12px;
          padding: 0;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }
        
        .error-details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(244, 67, 54, 0.1);
        }
        
        .error-details-header h3 {
          margin: 0;
          color: #F44336;
          font-size: 1.25rem;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: var(--text, #fff);
          font-size: 2rem;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .error-details-body {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: calc(80vh - 80px);
        }
        
        .error-field {
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .error-field strong {
          color: var(--accent, #cc0000);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .error-field span,
        .error-field code {
          color: var(--text, #fff);
          font-size: 0.95rem;
        }
        
        .error-field code {
          background: rgba(0, 0, 0, 0.3);
          padding: 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          word-break: break-all;
        }
        
        .error-type {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          background: rgba(244, 67, 54, 0.2);
          color: #F44336;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
        }
        
        .error-suggestion {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(76, 175, 80, 0.1);
          border-left: 3px solid #4CAF50;
          border-radius: 4px;
        }
        
        .error-suggestion strong {
          color: #4CAF50;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .error-suggestion p {
          margin: 0;
          color: var(--text, #fff);
          line-height: 1.5;
        }
        
        .error-technical {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .error-technical strong {
          color: var(--subtxt, #999);
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
        }
        
        .error-technical pre {
          margin: 0;
          color: var(--subtxt, #999);
          font-size: 0.8rem;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
        }
        
        .info-btn {
          background: none;
          border: none;
          color: inherit;
          font-size: 1rem;
          cursor: pointer;
          padding: 0 4px;
          margin-left: 4px;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        
        .info-btn:hover {
          opacity: 1;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}),r.jsx("span",{className:"status-icon",style:{color:S.color},children:S.icon}),r.jsx("span",{className:"status-text",style:{color:S.color},children:S.text}),v==="error"&&l&&r.jsx("button",{className:"info-btn",onClick:y,title:"View error details",children:"ℹ️"})]})]})},ch=()=>{const[e,t]=k.useState({teamMembers:[],lastUpdated:""}),[n,s]=k.useState(!1),[a,o]=k.useState(null),[i,l]=k.useState(!0),{startSaving:c,stopSaving:d,isSaving:g}=id("/data/team.json",e.lastUpdated);k.useEffect(()=>{v()},[]);const v=async()=>{console.log("Loading team data from GitHub..."),l(!0);try{await eh();const m=await xo("/data/team.json",!0);if(console.log("Loaded team data:",m),!m||!m.teamMembers)throw console.error("Invalid data structure received:",m),new Error("Invalid team data structure - missing teamMembers array");console.log(`Successfully loaded ${m.teamMembers.length} team members`),t(m)}catch(m){console.error("Error loading team data:",m),alert(`Failed to load team data: ${m.message}

Please check the browser console for more details.`),t({teamMembers:[],lastUpdated:""})}finally{l(!1)}},p=m=>{o({...m}),s(!0)},N=()=>{o({id:Date.now(),name:"",role:"",image:"",bio:"",email:"",linkedin:"",order:e.teamMembers.length+1}),s(!0)},S=()=>{if(!a.name||!a.role){alert("Please fill in required fields (Name and Role)");return}const m=[...e.teamMembers],x=m.findIndex(j=>j.id===a.id);x>=0?m[x]=a:m.push(a),m.sort((j,w)=>j.order-w.order);const u={...e,teamMembers:m,lastUpdated:new Date().toISOString()};s(!1),o(null),y(u)},C=m=>{if(confirm("Are you sure you want to delete this team member?")){const x=e.teamMembers.filter(j=>j.id!==m),u={...e,teamMembers:x,lastUpdated:new Date().toISOString()};y(u)}},P=async(m,x=10,u=500)=>{console.log("Polling for updates...",{expectedLastUpdated:m});for(let j=1;j<=x;j++)try{console.log(`Polling attempt ${j}/${x}...`);const w=await xo("/data/team.json",!0);if(w.lastUpdated===m)return console.log("✓ Changes successfully updated on GitHub!"),w;console.log(`Current version: ${w.lastUpdated}, Expected: ${m}`),j<x&&await new Promise(E=>setTimeout(E,u))}catch(w){console.error(`Polling attempt ${j} failed:`,w),j<x&&await new Promise(E=>setTimeout(E,u))}throw new Error("Update verification timed out. Changes may still be processing.")},y=async m=>{if(!Ue.hasToken()){console.warn("No GitHub token available. Changes saved locally only."),alert("No GitHub token available. Changes are saved locally but not synced to GitHub. Please configure your GitHub token in Settings.");return}c();try{console.log("Attempting to save team data to GitHub..."),await Ue.saveTeamData(m),console.log("Team data committed to GitHub repository"),await Ue.triggerRebuild(),console.log("GitHub Pages rebuild triggered");const x=await P(m.lastUpdated);console.log("Updating local state with deployed data"),t(x),console.log("✓ Save complete! Everything is up to date.")}catch(x){console.error("Error saving to GitHub:",x);let u="Failed to save changes to GitHub. ";x.message.includes("401")?u+="Authentication failed - please check your GitHub token permissions.":x.message.includes("403")?u+="Permission denied - your token may not have write access to this repository.":x.message.includes("404")?u+="Repository or file not found - please check your repository configuration.":x.message.includes("422")?u+="Invalid request - the file may have been modified by someone else. Please refresh and try again.":x.message.includes("timed out")?u+="Changes saved but deployment verification timed out. Please refresh manually to see your changes.":u+=`Error: ${x.message}`,alert(u),await v()}finally{d()}},f=V.hasPermission("edit_team");return i?r.jsx("div",{className:"loading",children:"Loading team data..."}):r.jsxs("div",{className:"team-manager",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"team-manager-header",children:[r.jsx("h2",{className:"team-manager-title",children:"Team Management"}),r.jsxs("div",{className:"header-buttons",children:[r.jsx(lh,{dataUrl:"/data/team.json",onRefresh:v,lastUpdated:e.lastUpdated,isSaving:g}),f&&r.jsxs("button",{className:"add-member-btn",onClick:N,children:[r.jsx("span",{children:"+"}),"Add Member"]})]})]}),!f&&r.jsx("div",{className:"no-permission",children:"You don't have permission to edit team members. Contact a director for access."}),e.teamMembers.length===0?r.jsxs("div",{className:"no-data-message",children:[r.jsx("p",{style:{fontSize:"1.2rem",marginBottom:"1rem"},children:"No team members found"}),r.jsx("p",{style:{color:"var(--subtxt)",marginBottom:"1rem"},children:"The team data file is empty or couldn't be loaded."}),f&&r.jsx("button",{onClick:N,className:"add-member-btn",children:"Add Your First Team Member"})]}):r.jsx("div",{className:"team-grid",children:e.teamMembers.map(m=>r.jsxs("div",{className:"member-card",children:[r.jsxs("div",{className:"member-header",children:[r.jsx("img",{src:m.image||"/images/headshots/default.jpg",alt:m.name,className:"member-avatar",onError:x=>x.target.src="/images/headshots/default.jpg"}),r.jsxs("div",{className:"member-info",children:[r.jsx("h3",{children:m.name}),r.jsx("p",{className:"member-role",children:m.role})]})]}),r.jsx("p",{className:"member-bio",children:m.bio.length>150?m.bio.substring(0,150)+"...":m.bio}),f&&r.jsxs("div",{className:"member-actions",children:[r.jsx("button",{className:"action-btn edit-btn",onClick:()=>p(m),children:"Edit"}),r.jsx("button",{className:"action-btn delete-btn",onClick:()=>C(m.id),children:"Delete"})]})]},m.id))}),n&&a&&r.jsx("div",{className:"modal-overlay",onClick:()=>s(!1),children:r.jsxs("div",{className:"modal-content",onClick:m=>m.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsxs("h3",{className:"modal-title",children:[a.id&&e.teamMembers.find(m=>m.id===a.id)?"Edit":"Add"," Team Member"]}),r.jsx("button",{className:"close-btn",onClick:()=>s(!1),children:"×"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Name *"}),r.jsx("input",{type:"text",className:"form-input",value:a.name,onChange:m=>o({...a,name:m.target.value}),placeholder:"Full name"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Role *"}),r.jsx("input",{type:"text",className:"form-input",value:a.role,onChange:m=>o({...a,role:m.target.value}),placeholder:"e.g., Technical Director"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Image URL"}),r.jsx("input",{type:"text",className:"form-input",value:a.image,onChange:m=>o({...a,image:m.target.value}),placeholder:"/images/headshots/name.jpg"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Bio"}),r.jsx("textarea",{className:"form-textarea",value:a.bio,onChange:m=>o({...a,bio:m.target.value}),placeholder:"Brief description of role and background..."})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Display Order"}),r.jsx("input",{type:"number",className:"form-input",value:a.order,onChange:m=>o({...a,order:parseInt(m.target.value)||1}),min:"1"})]}),r.jsxs("div",{className:"modal-actions",children:[r.jsx("button",{className:"cancel-btn",onClick:()=>s(!1),children:"Cancel"}),r.jsx("button",{className:"save-btn",onClick:S,children:"Save Member"})]})]})})]})},uh=()=>{const[e,t]=k.useState({teams:[],projects:[],events:[],lastUpdated:""}),[n,s]=k.useState("projects"),[a,o]=k.useState(!1),[i,l]=k.useState(null),[c,d]=k.useState(!0),[g,v]=k.useState("all");k.useEffect(()=>{p()},[]);const p=async()=>{try{const h=`/data/schedules.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,D=await fetch(h,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(D.status===304){const se=sessionStorage.getItem("json:/data/schedules.json");if(se){t(JSON.parse(se));return}throw new Error("HTTP 304 with no cached copy")}if(!D.ok)throw new Error(`HTTP ${D.status}: ${D.statusText}`);const M=await D.json();sessionStorage.setItem("json:/data/schedules.json",JSON.stringify(M)),t(M)}catch(b){console.error("Error loading schedule data:",b);const h=sessionStorage.getItem("json:/data/schedules.json");h&&t(JSON.parse(h))}finally{d(!1)}},N=b=>{const h=e.teams.find(D=>D.id===b);return h?h.name:b},S=b=>{const h=e.teams.find(D=>D.id===b);return h?h.color:"#6c757d"},C=(b,h)=>{if(h==="completed")return!1;const D=new Date;return new Date(b)<D},P=(b,h)=>{if(C(h,b))return"#dc3545";switch(b){case"completed":return"#28a745";case"in-progress":return"#007bff";case"pending":return"#ffc107";case"planning":return"#6c757d";case"critical":return"#dc3545";default:return"#6c757d"}},y=()=>{l({type:"project",id:Date.now(),title:"",description:"",team:"director",priority:"medium",status:"planning",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,progress:0,assignedTo:"",tasks:[]}),o(!0)},f=b=>{l({...b,type:"project"}),o(!0)},m=(b,h)=>{l({...b,type:"project",editingTaskId:h.id}),o(!0)},x=(b,h)=>{if(!window.confirm("Are you sure you want to delete this task?"))return;const D={...e},M=D.projects.findIndex(se=>se.id===b);M>=0&&(D.projects[M].tasks=D.projects[M].tasks.filter(se=>se.id!==h),D.lastUpdated=new Date().toISOString(),t(D),I(D))},u=b=>{const h=e.projects.find(M=>M.id===b),D={id:Date.now(),title:"",description:"",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,status:"pending",priority:"medium",assignedTo:"",progress:0};l({...h,type:"project",tasks:[...h.tasks,D]}),o(!0)},j=()=>{l({type:"event",id:Date.now(),title:"",description:"",team:"director",date:"",startTime:"",endTime:"",eventType:"meeting",priority:"medium",attendees:[],location:""}),o(!0)},w=b=>{const h={...b};h.eventType=b.type,h.type="event",l(h),o(!0)},E=async()=>{try{const b={...e};if(i.type==="project"){const h=b.projects.findIndex(M=>M.id===i.id),D={...i};delete D.type,h>=0?b.projects[h]=D:b.projects.push(D)}else if(i.type==="event"){const h=b.events.findIndex(M=>M.id===i.id),D={...i};delete D.type,D.eventType&&(D.type=D.eventType,delete D.eventType),h>=0?b.events[h]=D:b.events.push(D)}b.lastUpdated=new Date().toISOString(),t(b),await I(b),o(!1),l(null)}catch(b){console.error("Error saving item:",b),alert("Failed to save changes. Please try again.")}},L=async(b,h)=>{if(window.confirm("Are you sure you want to delete this item?"))try{const D={...e};b==="project"?D.projects=D.projects.filter(M=>M.id!==h):b==="event"&&(D.events=D.events.filter(M=>M.id!==h)),D.lastUpdated=new Date().toISOString(),t(D),await I(D)}catch(D){console.error("Error deleting item:",D),alert("Failed to delete item. Please try again.")}},I=async b=>{try{const h=JSON.stringify(b,null,2);await Ue.updateFile("public/data/schedules.json",h,`Update schedules data - ${new Date().toISOString()}`),await Ue.triggerRebuild()}catch(h){throw console.error("Error saving to GitHub:",h),h}},R=(b,h="team")=>g==="all"?b:b.filter(D=>D[h]===g),B=V.hasPermission("edit_schedules");return c?r.jsx("div",{className:"loading",children:"Loading schedule data..."}):r.jsxs("div",{className:"schedule-manager",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"schedule-header",children:[r.jsx("h1",{className:"schedule-title",children:"Schedule Manager"}),B&&r.jsxs("button",{className:"add-button",onClick:n==="projects"?y:j,children:["+ Add ",n==="projects"?"Project":"Event"]})]}),r.jsxs("div",{className:"view-tabs",children:[r.jsx("button",{className:`view-tab ${n==="projects"?"active":""}`,onClick:()=>s("projects"),children:"Projects"}),r.jsx("button",{className:`view-tab ${n==="events"?"active":""}`,onClick:()=>s("events"),children:"Events"})]}),r.jsxs("div",{className:"filters",children:[r.jsx("label",{htmlFor:"team-filter",children:"Filter by Team:"}),r.jsxs("select",{id:"team-filter",className:"team-filter",value:g,onChange:b=>v(b.target.value),children:[r.jsx("option",{value:"all",children:"All Teams"}),e.teams.map(b=>r.jsx("option",{value:b.id,children:b.name},b.id))]})]}),n==="projects"&&r.jsx("div",{className:"projects-grid",children:R(e.projects).map(b=>r.jsxs("div",{className:`project-card ${C(b.dueDate,b.status)?"overdue":""}`,children:[r.jsxs("div",{className:"project-header",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"project-title",children:b.title}),r.jsx("div",{className:"project-team",style:{backgroundColor:S(b.team)},children:N(b.team)})]}),r.jsx("div",{className:"project-status",style:{backgroundColor:P(b.status,b.dueDate)},children:C(b.dueDate,b.status)?"OVERDUE":b.status.toUpperCase()})]}),r.jsx("p",{children:b.description}),r.jsxs("div",{className:"project-progress",children:[r.jsx("div",{className:"progress-bar",children:r.jsx("div",{className:"progress-fill",style:{width:`${b.progress}%`,backgroundColor:S(b.team)}})}),r.jsxs("div",{style:{marginTop:"0.5rem",fontSize:"0.9rem"},children:["Progress: ",b.progress,"%"]})]}),r.jsxs("div",{className:"project-meta",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Assigned:"})," ",b.assignedTo]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Due:"})," ",new Date(b.dueDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",b.priority]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Hours:"})," ",b.actualHours,"/",b.estimatedHours]})]}),b.tasks.length>0&&r.jsxs("div",{className:"tasks-section",children:[r.jsxs("div",{className:"tasks-header",children:[r.jsxs("h4",{children:["Tasks (",b.tasks.length,")"]}),B&&r.jsx("button",{className:"add-button",style:{fontSize:"0.8rem",padding:"0.5rem 1rem"},onClick:()=>u(b.id),children:"+ Task"})]}),b.tasks.map(h=>r.jsxs("div",{className:"task-item",children:[r.jsxs("div",{className:"task-info",children:[r.jsx("div",{className:"task-title",children:h.title}),r.jsxs("div",{className:"task-meta",children:["Due: ",new Date(h.dueDate).toLocaleDateString()," | Status: ",h.status," | Progress: ",h.progress,"%"]})]}),r.jsxs("div",{className:"task-actions",children:[r.jsx("div",{className:"project-status",style:{backgroundColor:P(h.status,h.dueDate),fontSize:"0.7rem",padding:"0.25rem 0.5rem"},children:C(h.dueDate,h.status)?"OVERDUE":h.status.toUpperCase()}),B&&r.jsxs("div",{className:"task-buttons",children:[r.jsx("button",{className:"edit-btn",style:{fontSize:"0.7rem",padding:"0.25rem 0.5rem"},onClick:D=>{D.stopPropagation(),m(b,h)},children:"Edit"}),r.jsx("button",{className:"delete-btn",style:{fontSize:"0.7rem",padding:"0.25rem 0.5rem"},onClick:D=>{D.stopPropagation(),x(b.id,h.id)},children:"Del"})]})]})]},h.id))]}),B&&r.jsxs("div",{className:"action-buttons",style:{marginTop:"1rem"},children:[r.jsx("button",{className:"edit-btn",onClick:()=>f(b),children:"Edit"}),r.jsx("button",{className:"delete-btn",onClick:()=>L("project",b.id),children:"Delete"})]})]},b.id))}),n==="events"&&r.jsx("div",{className:"events-grid",children:R(e.events).map(b=>r.jsxs("div",{className:"event-card",children:[r.jsx("div",{className:"event-date",children:new Date(b.date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),r.jsxs("div",{className:"event-time",children:[b.startTime," - ",b.endTime]}),r.jsx("h3",{className:"project-title",children:b.title}),r.jsx("p",{children:b.description}),r.jsxs("div",{className:"project-meta",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Team:"})," ",N(b.team)]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Type:"})," ",b.type]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Location:"})," ",b.location]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",b.priority]})]}),B&&r.jsxs("div",{className:"action-buttons",style:{marginTop:"1rem"},children:[r.jsx("button",{className:"edit-btn",onClick:()=>w(b),children:"Edit"}),r.jsx("button",{className:"delete-btn",onClick:()=>L("event",b.id),children:"Delete"})]})]},b.id))}),a&&i&&r.jsx("div",{className:"modal-overlay",onClick:b=>b.target===b.currentTarget&&o(!1),children:r.jsxs("div",{className:"modal",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h2",{className:"modal-title",children:i.type==="project"?e.projects.find(b=>b.id===i.id)?"Edit Project":"Add Project":e.events.find(b=>b.id===i.id)?"Edit Event":"Add Event"}),r.jsx("button",{className:"close-btn",onClick:()=>o(!1),children:"×"})]}),i.type==="project"?r.jsxs("div",{children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Title"}),r.jsx("input",{type:"text",className:"form-input",value:i.title,onChange:b=>l({...i,title:b.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Description"}),r.jsx("textarea",{className:"form-textarea",value:i.description,onChange:b=>l({...i,description:b.target.value})})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Team"}),r.jsx("select",{className:"form-select",value:i.team,onChange:b=>l({...i,team:b.target.value}),children:e.teams.map(b=>r.jsx("option",{value:b.id,children:b.name},b.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Priority"}),r.jsxs("select",{className:"form-select",value:i.priority,onChange:b=>l({...i,priority:b.target.value}),children:[r.jsx("option",{value:"low",children:"Low"}),r.jsx("option",{value:"medium",children:"Medium"}),r.jsx("option",{value:"high",children:"High"}),r.jsx("option",{value:"critical",children:"Critical"})]})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Status"}),r.jsxs("select",{className:"form-select",value:i.status,onChange:b=>l({...i,status:b.target.value}),children:[r.jsx("option",{value:"planning",children:"Planning"}),r.jsx("option",{value:"pending",children:"Pending"}),r.jsx("option",{value:"in-progress",children:"In Progress"}),r.jsx("option",{value:"completed",children:"Completed"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Assigned To"}),r.jsx("input",{type:"text",className:"form-input",value:i.assignedTo,onChange:b=>l({...i,assignedTo:b.target.value})})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Start Date"}),r.jsx("input",{type:"date",className:"form-input",value:i.startDate,onChange:b=>l({...i,startDate:b.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Due Date"}),r.jsx("input",{type:"date",className:"form-input",value:i.dueDate,onChange:b=>l({...i,dueDate:b.target.value})})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Estimated Hours"}),r.jsx("input",{type:"number",className:"form-input",value:i.estimatedHours,onChange:b=>l({...i,estimatedHours:parseInt(b.target.value)||0})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Progress (%)"}),r.jsx("input",{type:"number",className:"form-input",min:"0",max:"100",value:i.progress,onChange:b=>l({...i,progress:parseInt(b.target.value)||0})})]})]}),r.jsxs("div",{className:"tasks-management-section",children:[r.jsx("h3",{children:"Tasks Management"}),r.jsx("div",{className:"tasks-list",children:i.tasks.map((b,h)=>r.jsxs("div",{className:"task-edit-item",children:[r.jsxs("div",{className:"task-edit-header",children:[r.jsxs("h4",{children:["Task ",h+1]}),r.jsx("button",{type:"button",className:"delete-btn",onClick:()=>{const D=i.tasks.filter((M,se)=>se!==h);l({...i,tasks:D})},children:"Remove"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Task Title"}),r.jsx("input",{type:"text",className:"form-input",value:b.title,onChange:D=>{const M=[...i.tasks];M[h]={...b,title:D.target.value},l({...i,tasks:M})}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Task Description"}),r.jsx("textarea",{className:"form-textarea",style:{minHeight:"60px"},value:b.description,onChange:D=>{const M=[...i.tasks];M[h]={...b,description:D.target.value},l({...i,tasks:M})}})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Start Date"}),r.jsx("input",{type:"date",className:"form-input",value:b.startDate,onChange:D=>{const M=[...i.tasks];M[h]={...b,startDate:D.target.value},l({...i,tasks:M})}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Due Date"}),r.jsx("input",{type:"date",className:"form-input",value:b.dueDate,onChange:D=>{const M=[...i.tasks];M[h]={...b,dueDate:D.target.value},l({...i,tasks:M})}})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Status"}),r.jsxs("select",{className:"form-select",value:b.status,onChange:D=>{const M=[...i.tasks];M[h]={...b,status:D.target.value},l({...i,tasks:M})},children:[r.jsx("option",{value:"pending",children:"Pending"}),r.jsx("option",{value:"in-progress",children:"In Progress"}),r.jsx("option",{value:"completed",children:"Completed"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Priority"}),r.jsxs("select",{className:"form-select",value:b.priority,onChange:D=>{const M=[...i.tasks];M[h]={...b,priority:D.target.value},l({...i,tasks:M})},children:[r.jsx("option",{value:"low",children:"Low"}),r.jsx("option",{value:"medium",children:"Medium"}),r.jsx("option",{value:"high",children:"High"}),r.jsx("option",{value:"critical",children:"Critical"})]})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Assigned To"}),r.jsx("input",{type:"text",className:"form-input",value:b.assignedTo,onChange:D=>{const M=[...i.tasks];M[h]={...b,assignedTo:D.target.value},l({...i,tasks:M})}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Progress (%)"}),r.jsx("input",{type:"number",className:"form-input",min:"0",max:"100",value:b.progress,onChange:D=>{const M=[...i.tasks];M[h]={...b,progress:parseInt(D.target.value)||0},l({...i,tasks:M})}})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Estimated Hours"}),r.jsx("input",{type:"number",className:"form-input",value:b.estimatedHours,onChange:D=>{const M=[...i.tasks];M[h]={...b,estimatedHours:parseInt(D.target.value)||0},l({...i,tasks:M})}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Actual Hours"}),r.jsx("input",{type:"number",className:"form-input",value:b.actualHours,onChange:D=>{const M=[...i.tasks];M[h]={...b,actualHours:parseInt(D.target.value)||0},l({...i,tasks:M})}})]})]})]},b.id||h))}),r.jsx("button",{type:"button",className:"add-button",onClick:()=>{const b={id:Date.now(),title:"",description:"",startDate:"",dueDate:"",estimatedHours:0,actualHours:0,status:"pending",priority:"medium",assignedTo:"",progress:0};l({...i,tasks:[...i.tasks,b]})},children:"+ Add Task"})]})]}):r.jsxs("div",{children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Title"}),r.jsx("input",{type:"text",className:"form-input",value:i.title,onChange:b=>l({...i,title:b.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Description"}),r.jsx("textarea",{className:"form-textarea",value:i.description,onChange:b=>l({...i,description:b.target.value})})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Team"}),r.jsx("select",{className:"form-select",value:i.team,onChange:b=>l({...i,team:b.target.value}),children:e.teams.map(b=>r.jsx("option",{value:b.id,children:b.name},b.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Type"}),r.jsxs("select",{className:"form-select",value:i.eventType,onChange:b=>l({...i,eventType:b.target.value}),children:[r.jsx("option",{value:"meeting",children:"Meeting"}),r.jsx("option",{value:"testing",children:"Testing"}),r.jsx("option",{value:"presentation",children:"Presentation"}),r.jsx("option",{value:"deadline",children:"Deadline"}),r.jsx("option",{value:"milestone",children:"Milestone"})]})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Date"}),r.jsx("input",{type:"date",className:"form-input",value:i.date,onChange:b=>l({...i,date:b.target.value})})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Start Time"}),r.jsx("input",{type:"time",className:"form-input",value:i.startTime,onChange:b=>l({...i,startTime:b.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"End Time"}),r.jsx("input",{type:"time",className:"form-input",value:i.endTime,onChange:b=>l({...i,endTime:b.target.value})})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Location"}),r.jsx("input",{type:"text",className:"form-input",value:i.location,onChange:b=>l({...i,location:b.target.value})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Priority"}),r.jsxs("select",{className:"form-select",value:i.priority,onChange:b=>l({...i,priority:b.target.value}),children:[r.jsx("option",{value:"low",children:"Low"}),r.jsx("option",{value:"medium",children:"Medium"}),r.jsx("option",{value:"high",children:"High"}),r.jsx("option",{value:"critical",children:"Critical"})]})]})]})]}),r.jsxs("div",{className:"modal-actions",children:[r.jsx("button",{className:"cancel-btn",onClick:()=>o(!1),children:"Cancel"}),r.jsx("button",{className:"save-btn",onClick:E,children:"Save"})]})]})})]})};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dh=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),mh=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,s)=>s?s.toUpperCase():n.toLowerCase()),Ml=e=>{const t=mh(e);return t.charAt(0).toUpperCase()+t.slice(1)},ld=(...e)=>e.filter((t,n,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===n).join(" ").trim(),ph=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var fh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hh=k.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:s,className:a="",children:o,iconNode:i,...l},c)=>k.createElement("svg",{ref:c,...fh,width:t,height:t,stroke:e,strokeWidth:s?Number(n)*24/Number(t):n,className:ld("lucide",a),...!o&&!ph(l)&&{"aria-hidden":"true"},...l},[...i.map(([d,g])=>k.createElement(d,g)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=(e,t)=>{const n=k.forwardRef(({className:s,...a},o)=>k.createElement(hh,{ref:o,iconNode:t,className:ld(`lucide-${dh(Ml(e))}`,`lucide-${e}`,s),...a}));return n.displayName=Ml(e),n};/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gh=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],vh=le("award",gh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xh=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],yh=le("calendar",xh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jh=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],wh=le("chart-column",jh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bh=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],kh=le("circle-alert",bh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nh=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Br=le("circle-check-big",Nh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sh=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],Ur=le("circle-x",Sh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ch=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],Eh=le("eye-off",Ch);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dh=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Ph=le("eye",Dh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Th=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],_h=le("graduation-cap",Th);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zh=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Lh=le("package",zh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ih=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],cd=le("pen",Ih);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mh=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],hn=le("plus",Mh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rh=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Rl=le("refresh-cw",Rh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oh=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],Ds=le("save",Oh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ah=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],$h=le("settings",Ah);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fh=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Ps=le("trash-2",Fh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bh=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Uh=le("users",Bh);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hh=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ud=le("x",Hh),Wh=()=>{const[e,t]=k.useState([]),[n,s]=k.useState(!0),[a,o]=k.useState(null);k.useState(null);const[i,l]=k.useState({semester:"",leadership:[]}),[c,d]=k.useState(!1),[g,v]=k.useState(!1);k.useEffect(()=>{p()},[]);const p=async()=>{try{s(!0);try{const u=`/data/alumni.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,j=await fetch(u,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(j.status===304){const w=sessionStorage.getItem("json:/data/alumni.json");if(w){const E=JSON.parse(w);t(E.alumniData||[]);return}throw new Error("HTTP 304 with no cached copy")}if(j.ok){const w=await j.json();sessionStorage.setItem("json:/data/alumni.json",JSON.stringify(w)),t(w.alumniData||[])}else t([])}catch{const u=sessionStorage.getItem("json:/data/alumni.json");if(u){const j=JSON.parse(u);t(j.alumniData||[])}else t([])}}catch(x){console.error("Error loading alumni data:",x),t([])}finally{s(!1)}},N=async()=>{if(!V.hasPermission("edit_content")){alert("You do not have permission to edit alumni data");return}try{v(!0);const x={alumniData:e};await Ue.updateFile("public/data/alumni.json",x,"Update alumni data via admin interface"),alert("Alumni data saved successfully!")}catch(x){console.error("Error saving alumni data:",x),alert("Error saving alumni data: "+x.message)}finally{v(!1)}},S=()=>{if(!i.semester.trim()){alert("Please enter a semester name");return}const x=[...e,{...i,leadership:i.leadership||[]}];t(x),l({semester:"",leadership:[]}),d(!1)},C=x=>{if(confirm("Are you sure you want to delete this semester?")){const u=e.filter((j,w)=>w!==x);t(u)}},P=(x,u,j)=>{const w=[...e];w[x][u]=j,t(w)},y=x=>{const u=[...e];u[x].leadership.push({role:"",name:""}),t(u)},f=(x,u,j,w)=>{const E=[...e];E[x].leadership[u][j]=w,t(E)},m=(x,u)=>{const j=[...e];j[x].leadership.splice(u,1),t(j)};return n?r.jsxs("div",{className:"loading-container",children:[r.jsx("div",{className:"loading-spinner"}),r.jsx("p",{children:"Loading alumni data..."})]}):r.jsxs("div",{className:"alumni-manager",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"alumni-header",children:[r.jsx("h2",{className:"alumni-title",children:"Alumni Management"}),r.jsxs("div",{className:"action-buttons",children:[r.jsxs("button",{className:"btn",onClick:()=>d(!c),children:[r.jsx(hn,{size:18}),"Add Semester"]}),r.jsxs("button",{className:"btn",onClick:N,disabled:g,children:[r.jsx(Ds,{size:18}),g?"Saving...":"Save Changes"]})]})]}),c&&r.jsxs("div",{className:"add-semester-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Semester"}),r.jsx("input",{type:"text",className:"form-input",value:i.semester,onChange:x=>l({...i,semester:x.target.value}),placeholder:"e.g., Fall 2025"})]}),r.jsxs("div",{className:"action-buttons",children:[r.jsxs("button",{className:"btn",onClick:S,children:[r.jsx(hn,{size:18}),"Add Semester"]}),r.jsxs("button",{className:"btn btn-secondary",onClick:()=>{d(!1),l({semester:"",leadership:[]})},children:[r.jsx(ud,{size:18}),"Cancel"]})]})]}),e.length===0?r.jsxs("div",{className:"empty-state",children:[r.jsx("div",{className:"empty-state-icon",children:"👥"}),r.jsx("h3",{children:"No Alumni Data"}),r.jsx("p",{children:"Start by adding your first semester of alumni data."})]}):e.map((x,u)=>{var j,w;return r.jsxs("div",{className:"semester-card",children:[r.jsxs("div",{className:"semester-header",children:[a===u?r.jsx("input",{type:"text",className:"form-input",value:x.semester,onChange:E=>P(u,"semester",E.target.value),style:{maxWidth:"300px"}}):r.jsx("h3",{className:"semester-title",children:x.semester}),r.jsxs("div",{className:"semester-actions",children:[a===u?r.jsx("button",{className:"btn btn-small",onClick:()=>o(null),children:r.jsx(Ds,{size:16})}):r.jsx("button",{className:"btn btn-small",onClick:()=>o(u),children:r.jsx(cd,{size:16})}),r.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>C(u),children:r.jsx(Ps,{size:16})})]})]}),r.jsxs("div",{className:"leadership-list",children:[r.jsx("h4",{style:{color:"var(--text)",marginBottom:"1rem"},children:"Leadership"}),a===u?r.jsxs(r.Fragment,{children:[(j=x.leadership)==null?void 0:j.map((E,L)=>r.jsxs("div",{className:"leadership-item",children:[r.jsx("input",{type:"text",className:"form-input",value:E.role,onChange:I=>f(u,L,"role",I.target.value),placeholder:"Role (e.g., Project Director)"}),r.jsx("input",{type:"text",className:"form-input",value:E.name,onChange:I=>f(u,L,"name",I.target.value),placeholder:"Name"}),r.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>m(u,L),children:r.jsx(Ps,{size:16})})]},L)),r.jsxs("button",{className:"btn btn-small",onClick:()=>y(u),children:[r.jsx(hn,{size:16}),"Add Leadership Role"]})]}):(w=x.leadership)==null?void 0:w.map((E,L)=>r.jsx("div",{className:"leadership-item-readonly",children:r.jsxs("div",{className:"leadership-role-name",children:[r.jsxs("span",{className:"role",children:[E.role,":"]})," ",E.name]})},L))]})]},u)})]})},Vh=()=>{const[e,t]=k.useState([]),[n,s]=k.useState(!0),[a,o]=k.useState(null);k.useState(null);const[i,l]=k.useState({tier:"",sponsors:[]}),[c,d]=k.useState(!1),[g,v]=k.useState(!1),p=[{tier:"Platinum Sponsors",sponsors:[]},{tier:"Gold Sponsors",sponsors:[]},{tier:"Silver Sponsors",sponsors:[]},{tier:"Bronze Sponsors",sponsors:[]}];k.useEffect(()=>{N()},[]);const N=async()=>{try{s(!0);try{const w=`/data/sponsors.json${`?_t=${Date.now()}&_cb=${Math.random()}`}`,E=await fetch(w,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}});if(E.status===304){const L=sessionStorage.getItem("json:/data/sponsors.json");if(L){const I=JSON.parse(L);t(I.sponsorTiers||p);return}throw new Error("HTTP 304 with no cached copy")}if(E.ok){const L=await E.json();sessionStorage.setItem("json:/data/sponsors.json",JSON.stringify(L)),t(L.sponsorTiers||p)}else t(p)}catch{const w=sessionStorage.getItem("json:/data/sponsors.json");if(w){const E=JSON.parse(w);t(E.sponsorTiers||p)}else t(p)}}catch(j){console.error("Error loading sponsor data:",j),t(p)}finally{s(!1)}},S=async()=>{if(!V.hasPermission("edit_content")){alert("You do not have permission to edit sponsor data");return}try{v(!0);const j={sponsorTiers:e};await Ue.updateFile("public/data/sponsors.json",j,"Update sponsors data via admin interface"),alert("Sponsor data saved successfully!")}catch(j){console.error("Error saving sponsor data:",j),alert("Error saving sponsor data: "+j.message)}finally{v(!1)}},C=()=>{if(!i.tier.trim()){alert("Please enter a tier name");return}const j=[...e,{...i,sponsors:i.sponsors||[]}];t(j),l({tier:"",sponsors:[]}),d(!1)},P=j=>{if(confirm("Are you sure you want to delete this tier?")){const w=e.filter((E,L)=>L!==j);t(w)}},y=(j,w,E)=>{const L=[...e];L[j][w]=E,t(L)},f=j=>{const w=[...e];w[j].sponsors.push({name:"",image:""}),t(w)},m=(j,w,E,L)=>{const I=[...e];I[j].sponsors[w][E]=L,t(I)},x=(j,w)=>{const E=[...e];E[j].sponsors.splice(w,1),t(E)},u=j=>{const w=j.toLowerCase();return w.includes("platinum")?"🏆":w.includes("gold")?"🥇":w.includes("silver")?"🥈":w.includes("bronze")?"🥉":"⭐"};return n?r.jsxs("div",{className:"loading-container",children:[r.jsx("div",{className:"loading-spinner"}),r.jsx("p",{children:"Loading sponsor data..."})]}):r.jsxs("div",{className:"sponsors-manager",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"sponsors-header",children:[r.jsx("h2",{className:"sponsors-title",children:"Sponsors Management"}),r.jsxs("div",{className:"action-buttons",children:[r.jsxs("button",{className:"btn",onClick:()=>d(!c),children:[r.jsx(hn,{size:18}),"Add Tier"]}),r.jsxs("button",{className:"btn",onClick:S,disabled:g,children:[r.jsx(Ds,{size:18}),g?"Saving...":"Save Changes"]})]})]}),c&&r.jsxs("div",{className:"add-tier-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Tier Name"}),r.jsx("input",{type:"text",className:"form-input",value:i.tier,onChange:j=>l({...i,tier:j.target.value}),placeholder:"e.g., Diamond Sponsors"})]}),r.jsxs("div",{className:"action-buttons",children:[r.jsxs("button",{className:"btn",onClick:C,children:[r.jsx(hn,{size:18}),"Add Tier"]}),r.jsxs("button",{className:"btn btn-secondary",onClick:()=>{d(!1),l({tier:"",sponsors:[]})},children:[r.jsx(ud,{size:18}),"Cancel"]})]})]}),e.map((j,w)=>{var E,L,I;return r.jsxs("div",{className:"tier-card",children:[r.jsxs("div",{className:"tier-header",children:[a===w?r.jsx("input",{type:"text",className:"form-input",value:j.tier,onChange:R=>y(w,"tier",R.target.value),style:{maxWidth:"300px"}}):r.jsxs("h3",{className:"tier-title",children:[r.jsx("span",{children:u(j.tier)}),j.tier]}),r.jsxs("div",{className:"tier-actions",children:[a===w?r.jsx("button",{className:"btn btn-small",onClick:()=>o(null),children:r.jsx(Ds,{size:16})}):r.jsx("button",{className:"btn btn-small",onClick:()=>o(w),children:r.jsx(cd,{size:16})}),r.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>P(w),children:r.jsx(Ps,{size:16})})]})]}),r.jsxs("div",{className:"sponsors-list",children:[r.jsx("h4",{style:{color:"var(--text)",marginBottom:"1rem"},children:"Sponsors"}),((E=j.sponsors)==null?void 0:E.length)===0?r.jsx("div",{className:"empty-sponsors",children:r.jsx("p",{children:"No sponsors in this tier yet."})}):a===w?r.jsx(r.Fragment,{children:(L=j.sponsors)==null?void 0:L.map((R,B)=>r.jsxs("div",{className:"sponsor-item",children:[r.jsxs("div",{className:"form-group",style:{margin:0},children:[r.jsx("label",{className:"form-label",children:"Sponsor Name"}),r.jsx("input",{type:"text",className:"form-input",value:R.name,onChange:b=>m(w,B,"name",b.target.value),placeholder:"Sponsor name"})]}),r.jsxs("div",{className:"form-group",style:{margin:0},children:[r.jsx("label",{className:"form-label",children:"Image Path"}),r.jsx("input",{type:"text",className:"form-input",value:R.image,onChange:b=>m(w,B,"image",b.target.value),placeholder:"/images/sponsors/logo.png"})]}),r.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>x(w,B),style:{alignSelf:"end"},children:r.jsx(Ps,{size:16})}),R.image&&r.jsxs("div",{className:"sponsor-preview",children:[r.jsx("img",{src:R.image,alt:R.name,onError:b=>{b.target.style.display="none",b.target.nextSibling.style.display="block"}}),r.jsxs("div",{className:"sponsor-preview-text",style:{display:"none"},children:["Image not found: ",R.image]})]})]},B))}):(I=j.sponsors)==null?void 0:I.map((R,B)=>r.jsxs("div",{className:"sponsor-item-readonly",children:[r.jsxs("div",{className:"sponsor-info",children:[r.jsx("div",{className:"sponsor-name",children:R.name}),r.jsx("div",{className:"sponsor-image-path",children:R.image})]}),R.image&&r.jsx("img",{src:R.image,alt:R.name,className:"sponsor-logo-preview",onError:b=>{b.target.style.display="none"}})]},B)),a===w&&r.jsxs("button",{className:"btn btn-small",onClick:()=>f(w),children:[r.jsx(hn,{size:16}),"Add Sponsor"]})]})]},w)})]})},Gh=()=>{const[e,t]=k.useState([]),[n,s]=k.useState(!0),[a,o]=k.useState("all"),[i,l]=k.useState("all"),[c,d]=k.useState(!1);k.useState(null);const[g,v]=k.useState(null),[p,N]=k.useState({submissionDetails:{subteam:"",submitterName:"",submitterEmail:""},materialDetails:{materialName:"",specifications:"",materialLink:"",supplier:"",supplierContact:""},costBreakdown:{unitPrice:"",quantity:"",shippingCost:"",taxes:"",fees:""},projectDetails:{purpose:"",priority:"medium",urgency:"flexible",neededByDate:""},sponsorshipInfo:{canBeSponsored:!1,sponsorContactName:"",sponsorContactEmail:"",sponsorCompany:""}});k.useEffect(()=>{S()},[]);const S=async()=>{try{const D=await(await fetch("/data/orders.json")).json();t(D.orders||[])}catch(h){console.error("Error loading orders:",h)}finally{s(!1)}},C=async(h,D)=>{const M=e.map(se=>{if(se.id===h){const _=new Date().toISOString();let O={...se,lastUpdated:_};return D.type==="technical_approval"?(O.approvalWorkflow.technicalDirectorApproval={...O.approvalWorkflow.technicalDirectorApproval,status:D.approved?"approved":"denied",approvedBy:D.approvedBy,approvalDate:_,comments:D.comments||"",denialReason:D.denialReason||""},O.status=D.approved?"pending_project_approval":"denied"):D.type==="project_approval"?(O.approvalWorkflow.projectDirectorPurchaseApproval={...O.approvalWorkflow.projectDirectorPurchaseApproval,status:D.approved?"approved":"denied",approvedBy:D.approvedBy,approvalDate:_,comments:D.comments||"",denialReason:D.denialReason||""},O.status=D.approved?"approved_for_purchase":"denied"):D.type==="purchase"?(O.purchaseStatus={...O.purchaseStatus,purchased:!0,purchaseDate:_,purchaseOrderNumber:D.purchaseOrderNumber||"",actualCost:D.actualCost||O.costBreakdown.totalCost,purchasedBy:D.purchasedBy||""},O.status="purchased"):D.type==="delivery"?(O.deliveryInfo={...O.deliveryInfo,actualArrivalDate:_,deliveredToSubteam:!0,deliveryConfirmedBy:D.confirmedBy||"",deliveryNotes:D.notes||"",trackingNumber:D.trackingNumber||""},O.status="delivered"):D.type==="sponsorship_response"&&(O.sponsorshipInfo={...O.sponsorshipInfo,sponsorshipSuccessful:D.successful,sponsorshipResponse:D.response||"",sponsorshipResponseDate:_}),O}return se});t(M),console.log("Updating order:",h,D)},P=async()=>{const h=new Date().toISOString(),D={id:`order-${Date.now()}`,submissionTimestamp:h,submissionDetails:p.submissionDetails,materialDetails:p.materialDetails,costBreakdown:{...p.costBreakdown,unitPrice:parseFloat(p.costBreakdown.unitPrice),quantity:parseInt(p.costBreakdown.quantity),shippingCost:parseFloat(p.costBreakdown.shippingCost||0),taxes:parseFloat(p.costBreakdown.taxes||0),fees:parseFloat(p.costBreakdown.fees||0),subtotal:parseFloat(p.costBreakdown.unitPrice)*parseInt(p.costBreakdown.quantity),totalCost:parseFloat(p.costBreakdown.unitPrice)*parseInt(p.costBreakdown.quantity)+parseFloat(p.costBreakdown.shippingCost||0)+parseFloat(p.costBreakdown.taxes||0)+parseFloat(p.costBreakdown.fees||0)},projectDetails:{...p.projectDetails,neededByDate:p.projectDetails.neededByDate?new Date(p.projectDetails.neededByDate).toISOString():null},approvalWorkflow:{technicalDirectorApproval:{status:"pending",approvedBy:null,approvalDate:null,comments:"",denialReason:""},projectDirectorPurchaseApproval:{status:"pending",approvedBy:null,approvalDate:null,comments:"",denialReason:""}},sponsorshipInfo:{...p.sponsorshipInfo,sponsorshipRequested:p.sponsorshipInfo.canBeSponsored&&p.sponsorshipInfo.sponsorContactName,sponsorshipRequestDate:p.sponsorshipInfo.canBeSponsored?h:null,sponsorshipSuccessful:!1,sponsorshipResponse:"",sponsorshipResponseDate:null},purchaseStatus:{purchased:!1,purchaseDate:null,purchaseOrderNumber:"",actualCost:null,purchasedBy:""},deliveryInfo:{expectedArrivalDate:null,actualArrivalDate:null,deliveredToSubteam:!1,deliveryConfirmedBy:"",deliveryNotes:"",trackingNumber:""},documentation:{receiptInvoice:{uploaded:!1,fileName:"",uploadDate:null,uploadedBy:""},additionalDocuments:[]},returnInfo:{returned:!1,returnDate:null,returnReason:"",returnAuthorizedBy:"",refundAmount:null,refundProcessed:!1},status:"pending_technical_approval",lastUpdated:h,createdBy:p.submissionDetails.submitterEmail};t([...e,D]),d(!1),y(),console.log("New order submitted:",D)},y=()=>{N({submissionDetails:{subteam:"",submitterName:"",submitterEmail:""},materialDetails:{materialName:"",specifications:"",materialLink:"",supplier:"",supplierContact:""},costBreakdown:{unitPrice:"",quantity:"",shippingCost:"",taxes:"",fees:""},projectDetails:{purpose:"",priority:"medium",urgency:"flexible",neededByDate:""},sponsorshipInfo:{canBeSponsored:!1,sponsorContactName:"",sponsorContactEmail:"",sponsorCompany:""}})},f=V.hasPermission("approve_orders"),m=V.hasPermission("submit_orders")||V.hasPermission("view_schedules"),x=V.hasPermission("submit_orders"),u=V.hasPermission("technical_director"),j=V.hasPermission("project_director"),w=e.filter(h=>!(a!=="all"&&h.status!==a||i!=="all"&&h.submissionDetails.subteam!==i)),E=h=>{switch(h){case"pending_technical_approval":return"#fd7e14";case"pending_project_approval":return"#17a2b8";case"approved_for_purchase":return"#007bff";case"purchased":return"#6f42c1";case"delivered":return"#28a745";case"denied":return"#dc3545";default:return"#6c757d"}},L=h=>{switch(h){case"pending_technical_approval":return"Pending Tech Approval";case"pending_project_approval":return"Pending Project Approval";case"approved_for_purchase":return"Approved for Purchase";case"purchased":return"Purchased";case"delivered":return"Delivered";case"denied":return"Denied";default:return h}},I=h=>{switch(h){case"high":return"#dc3545";case"medium":return"#ffc107";case"low":return"#28a745";default:return"#6c757d"}},R=[...new Set(e.map(h=>{var D;return(D=h.submissionDetails)==null?void 0:D.subteam}).filter(Boolean))],B=({order:h,onClose:D})=>{var M;return h?r.jsx("div",{className:"modal-overlay",onClick:D,children:r.jsxs("div",{className:"modal-content",onClick:se=>se.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{children:h.materialDetails.materialName}),r.jsx("button",{className:"modal-close",onClick:D,children:"×"})]}),r.jsxs("div",{className:"modal-body",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Submission Details"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Subteam:"})," ",h.submissionDetails.subteam]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Submitted by:"})," ",h.submissionDetails.submitterName]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Email:"})," ",h.submissionDetails.submitterEmail]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Submitted:"})," ",new Date(h.submissionTimestamp).toLocaleString()]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Material Specifications"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Material:"})," ",h.materialDetails.materialName]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Supplier:"})," ",h.materialDetails.supplier]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Supplier Contact:"})," ",h.materialDetails.supplierContact]}),h.materialDetails.materialLink&&r.jsxs("div",{children:[r.jsx("strong",{children:"Link:"}),r.jsx("a",{href:h.materialDetails.materialLink,target:"_blank",rel:"noopener noreferrer",children:"View Material"})]})]}),r.jsxs("div",{className:"specifications",children:[r.jsx("strong",{children:"Specifications:"}),r.jsx("p",{children:h.materialDetails.specifications})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Cost Breakdown"}),r.jsxs("div",{className:"cost-table",children:[r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Unit Price:"}),r.jsxs("span",{children:["$",h.costBreakdown.unitPrice.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Quantity:"}),r.jsx("span",{children:h.costBreakdown.quantity})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Subtotal:"}),r.jsxs("span",{children:["$",h.costBreakdown.subtotal.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Shipping:"}),r.jsxs("span",{children:["$",h.costBreakdown.shippingCost.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Taxes:"}),r.jsxs("span",{children:["$",h.costBreakdown.taxes.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row",children:[r.jsx("span",{children:"Fees:"}),r.jsxs("span",{children:["$",h.costBreakdown.fees.toFixed(2)]})]}),r.jsxs("div",{className:"cost-row total",children:[r.jsx("span",{children:r.jsx("strong",{children:"Total:"})}),r.jsx("span",{children:r.jsxs("strong",{children:["$",h.costBreakdown.totalCost.toFixed(2)]})})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Project Details"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Priority:"})," ",h.projectDetails.priority]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Urgency:"})," ",h.projectDetails.urgency]}),h.projectDetails.neededByDate&&r.jsxs("div",{children:[r.jsx("strong",{children:"Needed by:"})," ",new Date(h.projectDetails.neededByDate).toLocaleDateString()]})]}),r.jsxs("div",{className:"purpose",children:[r.jsx("strong",{children:"Purpose:"}),r.jsx("p",{children:h.projectDetails.purpose})]})]}),h.sponsorshipInfo.canBeSponsored&&r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Sponsorship Information"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Can be sponsored:"})," Yes"]}),h.sponsorshipInfo.sponsorContactName&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Sponsor Contact:"})," ",h.sponsorshipInfo.sponsorContactName]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Company:"})," ",h.sponsorshipInfo.sponsorCompany]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Email:"})," ",h.sponsorshipInfo.sponsorContactEmail]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Requested:"})," ",h.sponsorshipInfo.sponsorshipRequested?"Yes":"No"]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Successful:"})," ",h.sponsorshipInfo.sponsorshipSuccessful?"Yes":"No"]})]})]}),h.sponsorshipInfo.sponsorshipResponse&&r.jsxs("div",{className:"response",children:[r.jsx("strong",{children:"Sponsor Response:"}),r.jsx("p",{children:h.sponsorshipInfo.sponsorshipResponse})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Approval Status"}),r.jsxs("div",{className:"approval-grid",children:[r.jsxs("div",{className:"approval-item",children:[r.jsx("strong",{children:"Technical Director:"}),r.jsx("span",{className:`approval-status ${h.approvalWorkflow.technicalDirectorApproval.status}`,children:h.approvalWorkflow.technicalDirectorApproval.status}),h.approvalWorkflow.technicalDirectorApproval.comments&&r.jsx("p",{className:"approval-comment",children:h.approvalWorkflow.technicalDirectorApproval.comments}),h.approvalWorkflow.technicalDirectorApproval.denialReason&&r.jsx("p",{className:"denial-reason",children:h.approvalWorkflow.technicalDirectorApproval.denialReason})]}),r.jsxs("div",{className:"approval-item",children:[r.jsx("strong",{children:"Project Director:"}),r.jsx("span",{className:`approval-status ${h.approvalWorkflow.projectDirectorPurchaseApproval.status}`,children:h.approvalWorkflow.projectDirectorPurchaseApproval.status}),h.approvalWorkflow.projectDirectorPurchaseApproval.comments&&r.jsx("p",{className:"approval-comment",children:h.approvalWorkflow.projectDirectorPurchaseApproval.comments}),h.approvalWorkflow.projectDirectorPurchaseApproval.denialReason&&r.jsx("p",{className:"denial-reason",children:h.approvalWorkflow.projectDirectorPurchaseApproval.denialReason})]})]})]}),h.purchaseStatus.purchased&&r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Purchase Information"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Purchase Date:"})," ",new Date(h.purchaseStatus.purchaseDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"PO Number:"})," ",h.purchaseStatus.purchaseOrderNumber]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Actual Cost:"})," $",(M=h.purchaseStatus.actualCost)==null?void 0:M.toFixed(2)]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Purchased by:"})," ",h.purchaseStatus.purchasedBy]})]})]}),h.deliveryInfo.deliveredToSubteam&&r.jsxs("div",{className:"detail-section",children:[r.jsx("h4",{children:"Delivery Information"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{children:[r.jsx("strong",{children:"Delivered:"})," ",new Date(h.deliveryInfo.actualArrivalDate).toLocaleDateString()]}),r.jsxs("div",{children:[r.jsx("strong",{children:"Confirmed by:"})," ",h.deliveryInfo.deliveryConfirmedBy]}),h.deliveryInfo.trackingNumber&&r.jsxs("div",{children:[r.jsx("strong",{children:"Tracking:"})," ",h.deliveryInfo.trackingNumber]})]}),h.deliveryInfo.deliveryNotes&&r.jsxs("div",{className:"delivery-notes",children:[r.jsx("strong",{children:"Notes:"}),r.jsx("p",{children:h.deliveryInfo.deliveryNotes})]})]})]})]})}):null},b=()=>r.jsx("div",{className:"modal-overlay",onClick:()=>d(!1),children:r.jsxs("div",{className:"modal-content large",onClick:h=>h.stopPropagation(),children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{children:"Submit New Order Request"}),r.jsx("button",{className:"modal-close",onClick:()=>d(!1),children:"×"})]}),r.jsx("div",{className:"modal-body",children:r.jsxs("form",{onSubmit:h=>{h.preventDefault(),P()},children:[r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Submission Details"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Subteam *"}),r.jsxs("select",{value:p.submissionDetails.subteam,onChange:h=>N({...p,submissionDetails:{...p.submissionDetails,subteam:h.target.value}}),required:!0,children:[r.jsx("option",{value:"",children:"Select Subteam"}),r.jsx("option",{value:"Mechanical",children:"Mechanical"}),r.jsx("option",{value:"Electrical",children:"Electrical"}),r.jsx("option",{value:"Software",children:"Software"}),r.jsx("option",{value:"Business",children:"Business"}),r.jsx("option",{value:"Operations",children:"Operations"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Your Name *"}),r.jsx("input",{type:"text",value:p.submissionDetails.submitterName,onChange:h=>N({...p,submissionDetails:{...p.submissionDetails,submitterName:h.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Your Email *"}),r.jsx("input",{type:"email",value:p.submissionDetails.submitterEmail,onChange:h=>N({...p,submissionDetails:{...p.submissionDetails,submitterEmail:h.target.value}}),required:!0})]})]})]}),r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Material Details"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Material Name *"}),r.jsx("input",{type:"text",value:p.materialDetails.materialName,onChange:h=>N({...p,materialDetails:{...p.materialDetails,materialName:h.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Supplier *"}),r.jsx("input",{type:"text",value:p.materialDetails.supplier,onChange:h=>N({...p,materialDetails:{...p.materialDetails,supplier:h.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Supplier Contact"}),r.jsx("input",{type:"text",value:p.materialDetails.supplierContact,onChange:h=>N({...p,materialDetails:{...p.materialDetails,supplierContact:h.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Material Link"}),r.jsx("input",{type:"url",value:p.materialDetails.materialLink,onChange:h=>N({...p,materialDetails:{...p.materialDetails,materialLink:h.target.value}})})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Detailed Specifications *"}),r.jsx("textarea",{value:p.materialDetails.specifications,onChange:h=>N({...p,materialDetails:{...p.materialDetails,specifications:h.target.value}}),rows:"4",placeholder:"Provide thorough specifications including dimensions, materials, performance characteristics, etc.",required:!0})]})]}),r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Cost Information"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Unit Price ($) *"}),r.jsx("input",{type:"number",step:"0.01",value:p.costBreakdown.unitPrice,onChange:h=>N({...p,costBreakdown:{...p.costBreakdown,unitPrice:h.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Quantity *"}),r.jsx("input",{type:"number",value:p.costBreakdown.quantity,onChange:h=>N({...p,costBreakdown:{...p.costBreakdown,quantity:h.target.value}}),required:!0})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Shipping Cost ($)"}),r.jsx("input",{type:"number",step:"0.01",value:p.costBreakdown.shippingCost,onChange:h=>N({...p,costBreakdown:{...p.costBreakdown,shippingCost:h.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Estimated Taxes ($)"}),r.jsx("input",{type:"number",step:"0.01",value:p.costBreakdown.taxes,onChange:h=>N({...p,costBreakdown:{...p.costBreakdown,taxes:h.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Additional Fees ($)"}),r.jsx("input",{type:"number",step:"0.01",value:p.costBreakdown.fees,onChange:h=>N({...p,costBreakdown:{...p.costBreakdown,fees:h.target.value}})})]})]}),p.costBreakdown.unitPrice&&p.costBreakdown.quantity&&r.jsx("div",{className:"cost-preview",children:r.jsxs("strong",{children:["Estimated Total: $",((parseFloat(p.costBreakdown.unitPrice)||0)*(parseInt(p.costBreakdown.quantity)||0)+(parseFloat(p.costBreakdown.shippingCost)||0)+(parseFloat(p.costBreakdown.taxes)||0)+(parseFloat(p.costBreakdown.fees)||0)).toFixed(2)]})})]}),r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Project Details"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Priority *"}),r.jsxs("select",{value:p.projectDetails.priority,onChange:h=>N({...p,projectDetails:{...p.projectDetails,priority:h.target.value}}),required:!0,children:[r.jsx("option",{value:"low",children:"Low"}),r.jsx("option",{value:"medium",children:"Medium"}),r.jsx("option",{value:"high",children:"High"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Urgency *"}),r.jsxs("select",{value:p.projectDetails.urgency,onChange:h=>N({...p,projectDetails:{...p.projectDetails,urgency:h.target.value}}),required:!0,children:[r.jsx("option",{value:"flexible",children:"Flexible"}),r.jsx("option",{value:"needed_by_date",children:"Needed by specific date"}),r.jsx("option",{value:"asap",children:"ASAP"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Needed By Date"}),r.jsx("input",{type:"date",value:p.projectDetails.neededByDate,onChange:h=>N({...p,projectDetails:{...p.projectDetails,neededByDate:h.target.value}})})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Purpose for Project *"}),r.jsx("textarea",{value:p.projectDetails.purpose,onChange:h=>N({...p,projectDetails:{...p.projectDetails,purpose:h.target.value}}),rows:"3",placeholder:"Explain how this material will be used in the project and why it's needed",required:!0})]})]}),r.jsxs("div",{className:"form-section",children:[r.jsx("h4",{children:"Sponsorship Information"}),r.jsx("div",{className:"form-group",children:r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",checked:p.sponsorshipInfo.canBeSponsored,onChange:h=>N({...p,sponsorshipInfo:{...p.sponsorshipInfo,canBeSponsored:h.target.checked}})}),"This material can be used for sponsorship opportunities"]})}),p.sponsorshipInfo.canBeSponsored&&r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Sponsor Contact Name"}),r.jsx("input",{type:"text",value:p.sponsorshipInfo.sponsorContactName,onChange:h=>N({...p,sponsorshipInfo:{...p.sponsorshipInfo,sponsorContactName:h.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Sponsor Company"}),r.jsx("input",{type:"text",value:p.sponsorshipInfo.sponsorCompany,onChange:h=>N({...p,sponsorshipInfo:{...p.sponsorshipInfo,sponsorCompany:h.target.value}})})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"Sponsor Contact Email"}),r.jsx("input",{type:"email",value:p.sponsorshipInfo.sponsorContactEmail,onChange:h=>N({...p,sponsorshipInfo:{...p.sponsorshipInfo,sponsorContactEmail:h.target.value}})})]})]})]}),r.jsxs("div",{className:"form-actions",children:[r.jsx("button",{type:"button",onClick:()=>d(!1),className:"btn-secondary",children:"Cancel"}),r.jsx("button",{type:"submit",className:"btn-primary",children:"Submit Order Request"})]})]})})]})});return n?r.jsx("div",{className:"loading",children:"Loading orders..."}):m?r.jsxs("div",{className:"order-manager",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"order-header",children:[r.jsx("h2",{className:"order-title",children:"Order Management"}),x&&r.jsx("button",{className:"btn-primary",onClick:()=>d(!0),children:"+ Submit New Order"})]}),r.jsxs("div",{className:"stats-summary",children:[r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.filter(h=>h.status==="pending_technical_approval").length}),r.jsx("div",{className:"stat-label",children:"Pending Tech Approval"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.filter(h=>h.status==="pending_project_approval").length}),r.jsx("div",{className:"stat-label",children:"Pending Project Approval"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.filter(h=>h.status==="purchased").length}),r.jsx("div",{className:"stat-label",children:"Purchased"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsxs("div",{className:"stat-number",children:["$",e.reduce((h,D)=>{var M;return h+(((M=D.costBreakdown)==null?void 0:M.totalCost)||0)},0).toFixed(2)]}),r.jsx("div",{className:"stat-label",children:"Total Value"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.filter(h=>h.status==="delivered").length}),r.jsx("div",{className:"stat-label",children:"Delivered"})]})]}),r.jsxs("div",{className:"filters",children:[r.jsxs("div",{className:"filter-group",children:[r.jsx("label",{className:"filter-label",children:"Status"}),r.jsxs("select",{className:"filter-select",value:a,onChange:h=>o(h.target.value),children:[r.jsx("option",{value:"all",children:"All Statuses"}),r.jsx("option",{value:"pending_technical_approval",children:"Pending Tech Approval"}),r.jsx("option",{value:"pending_project_approval",children:"Pending Project Approval"}),r.jsx("option",{value:"approved_for_purchase",children:"Approved for Purchase"}),r.jsx("option",{value:"purchased",children:"Purchased"}),r.jsx("option",{value:"delivered",children:"Delivered"}),r.jsx("option",{value:"denied",children:"Denied"})]})]}),r.jsxs("div",{className:"filter-group",children:[r.jsx("label",{className:"filter-label",children:"Team"}),r.jsxs("select",{className:"filter-select",value:i,onChange:h=>l(h.target.value),children:[r.jsx("option",{value:"all",children:"All Teams"}),R.map(h=>r.jsx("option",{value:h,children:h},h))]})]})]}),w.length===0?r.jsxs("div",{className:"no-orders",children:[r.jsx("h3",{children:"No orders found"}),r.jsx("p",{children:"No orders match your current filters."})]}):r.jsx("div",{className:"orders-grid",children:w.map(h=>r.jsxs("div",{className:"order-card",onClick:()=>v(h),children:[r.jsxs("div",{className:"order-header-section",children:[r.jsxs("div",{className:"order-title-section",children:[r.jsx("h3",{className:"order-part-name",children:h.materialDetails.materialName}),r.jsxs("div",{className:"order-meta",children:[r.jsx("strong",{children:h.submissionDetails.subteam})," • Requested by ",h.submissionDetails.submitterName]}),r.jsxs("div",{className:"order-meta",children:["Submitted: ",new Date(h.submissionTimestamp).toLocaleDateString()]})]}),r.jsxs("div",{className:"order-badges",children:[r.jsx("span",{className:"status-badge",style:{backgroundColor:E(h.status)},children:L(h.status)}),r.jsxs("span",{className:"priority-badge",style:{backgroundColor:I(h.projectDetails.priority)},children:[h.projectDetails.priority," priority"]})]})]}),r.jsxs("div",{className:"order-details",children:[r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Supplier:"}),r.jsx("span",{className:"detail-value",children:h.materialDetails.supplier})]}),r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Quantity:"}),r.jsx("span",{className:"detail-value",children:h.costBreakdown.quantity})]}),r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Unit Price:"}),r.jsxs("span",{className:"detail-value",children:["$",h.costBreakdown.unitPrice.toFixed(2)]})]}),r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Total:"}),r.jsxs("span",{className:"detail-value",children:["$",h.costBreakdown.totalCost.toFixed(2)]})]}),h.deliveryInfo.expectedArrivalDate&&r.jsxs("div",{className:"detail-row",children:[r.jsx("span",{className:"detail-label",children:"Expected Delivery:"}),r.jsx("span",{className:"detail-value",children:new Date(h.deliveryInfo.expectedArrivalDate).toLocaleDateString()})]})]}),r.jsxs("div",{className:"order-notes",children:[r.jsx("strong",{children:"Purpose:"})," ",h.projectDetails.purpose.substring(0,150),h.projectDetails.purpose.length>150&&"..."]}),(f||u||j)&&r.jsxs("div",{className:"order-actions",onClick:D=>D.stopPropagation(),children:[u&&h.status==="pending_technical_approval"&&r.jsxs(r.Fragment,{children:[r.jsx("button",{className:"action-btn approve-btn",onClick:()=>C(h.id,{type:"technical_approval",approved:!0,approvedBy:"tech.director@solarpack.com",comments:"Approved by technical director"}),children:"✓ Tech Approve"}),r.jsx("button",{className:"action-btn reject-btn",onClick:()=>C(h.id,{type:"technical_approval",approved:!1,approvedBy:"tech.director@solarpack.com",denialReason:"Denied by technical director"}),children:"✗ Tech Deny"})]}),j&&h.status==="pending_project_approval"&&r.jsxs(r.Fragment,{children:[r.jsx("button",{className:"action-btn approve-btn",onClick:()=>C(h.id,{type:"project_approval",approved:!0,approvedBy:"project.director@solarpack.com",comments:"Purchase approved"}),children:"✓ Purchase Approve"}),r.jsx("button",{className:"action-btn reject-btn",onClick:()=>C(h.id,{type:"project_approval",approved:!1,approvedBy:"project.director@solarpack.com",denialReason:"Purchase denied"}),children:"✗ Purchase Deny"})]}),f&&h.status==="approved_for_purchase"&&r.jsx("button",{className:"action-btn mark-ordered-btn",onClick:()=>C(h.id,{type:"purchase",purchaseOrderNumber:`PO-${Date.now()}`,actualCost:h.costBreakdown.totalCost,purchasedBy:"purchasing@solarpack.com"}),children:"📦 Mark as Purchased"}),f&&h.status==="purchased"&&r.jsx("button",{className:"action-btn mark-delivered-btn",onClick:()=>C(h.id,{type:"delivery",confirmedBy:"warehouse@solarpack.com",notes:"Delivered to subteam"}),children:"✅ Mark as Delivered"})]})]},h.id))}),g&&r.jsx(B,{order:g,onClose:()=>v(null)}),c&&r.jsx(b,{})]}):r.jsx("div",{className:"no-permission",children:"You don't have permission to view orders. Contact a team leader for access."})},Qh=()=>{const[e,t]=k.useState(""),[n,s]=k.useState(null),[a,o]=k.useState(!1),[i,l]=k.useState(!1),[c,d]=k.useState("none");k.useEffect(()=>{g(),N()},[]);const g=()=>{Ue.loadToken()?(d("environment"),t("[Environment Variable]")):(d("none"),t(""))},v=()=>{if(!e||e.startsWith("*")||e.startsWith("[")){alert("Please enter a valid GitHub token");return}Ue.setToken(e),g(),N()},p=()=>{Ue.clearToken(),g(),s(null)},N=async()=>{o(!0),s(null);try{const S=await Ue.testConnection();s(S)}catch(S){s({success:!1,error:S.message})}finally{o(!1)}};return r.jsxs("div",{className:"github-settings",children:[r.jsx("style",{children:`
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
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .save-btn, .test-btn, .clear-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .save-btn {
          background: var(--accent);
          color: white;
        }

        .save-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .test-btn {
          background: #0066cc;
          color: white;
        }

        .test-btn:hover:not(:disabled) {
          background: #0052a3;
          transform: translateY(-1px);
        }

        .test-btn:disabled {
          background: #666;
          cursor: not-allowed;
        }

        .clear-btn {
          background: #666;
          color: white;
        }

        .clear-btn:hover {
          background: #777;
        }

        /* New Token Status Styles */
        .token-status {
          background: rgba(0, 123, 255, 0.1);
          border: 1px solid rgba(0, 123, 255, 0.3);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .status-header h4 {
          margin: 0;
          color: var(--text);
          font-size: 1.1rem;
        }

        .test-btn-small {
          background: #0066cc;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .test-btn-small:hover:not(:disabled) {
          background: #0052a3;
        }

        .test-btn-small:disabled {
          background: #666;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        .token-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .token-source, .token-display {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-success {
          background: rgba(40, 167, 69, 0.2);
          color: #28a745;
          border: 1px solid rgba(40, 167, 69, 0.3);
        }

        .status-warning {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
          border: 1px solid rgba(255, 193, 7, 0.3);
        }

        .status-error {
          background: rgba(220, 53, 69, 0.2);
          color: #dc3545;
          border: 1px solid rgba(220, 53, 69, 0.3);
        }

        .token-value {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85rem;
        }

        .manual-token-section {
          border-top: 1px solid #333;
          padding-top: 2rem;
          margin-top: 2rem;
        }

        .manual-token-section h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text);
          font-size: 1.1rem;
        }

        .section-description {
          color: var(--subtxt);
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
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
      `}),r.jsx("h3",{className:"settings-title",children:"GitHub Integration Settings"}),r.jsx("p",{className:"settings-description",children:"GitHub integration allows the admin interface to automatically update content files in your repository. Current token status is shown below."}),r.jsxs("div",{className:"token-status",children:[r.jsxs("div",{className:"status-header",children:[r.jsx("h4",{children:"Token Status"}),r.jsx("button",{className:"test-btn-small",onClick:N,disabled:a,children:a?r.jsxs(r.Fragment,{children:[r.jsx(Rl,{size:14,className:"spinning"}),"Testing..."]}):r.jsxs(r.Fragment,{children:[r.jsx(Rl,{size:14}),"Test Connection"]})})]}),r.jsxs("div",{className:"token-info",children:[r.jsxs("div",{className:"token-source",children:[r.jsx("strong",{children:"Source:"}),c==="environment"&&r.jsxs("span",{className:"status-badge status-success",children:[r.jsx(Br,{size:16}),"Environment Variable"]}),c==="localstorage"&&r.jsxs("span",{className:"status-badge status-warning",children:[r.jsx(kh,{size:16}),"User Input (Local)"]}),c==="none"&&r.jsxs("span",{className:"status-badge status-error",children:[r.jsx(Ur,{size:16}),"No Token Available"]})]}),r.jsxs("div",{className:"token-display",children:[r.jsx("strong",{children:"Token:"}),r.jsx("code",{className:"token-value",children:e||"Not configured"})]})]})]}),n&&r.jsxs("div",{className:`status-card ${n.success?"status-success":"status-error"}`,children:[r.jsx("div",{className:"status-title",children:n.success?r.jsxs(r.Fragment,{children:[r.jsx(Br,{size:20}),"Connection Successful"]}):r.jsxs(r.Fragment,{children:[r.jsx(Ur,{size:20}),"Connection Failed"]})}),n.success?r.jsxs("div",{className:"status-details",children:[r.jsxs("p",{children:[r.jsx("strong",{children:"Repository:"})," ",n.owner,"/",n.repo]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Branch:"})," ",n.branch||"main"]}),r.jsxs("div",{className:"permissions",children:[r.jsxs("span",{className:`permission ${n.permissions.push?"permission-granted":"permission-denied"}`,children:[n.permissions.push?r.jsx(Br,{size:14}):r.jsx(Ur,{size:14}),"Push Access"]}),r.jsxs("span",{className:`permission ${n.permissions.admin?"permission-granted":"permission-denied"}`,children:[n.permissions.admin?r.jsx(Br,{size:14}):r.jsx(Ur,{size:14}),"Admin Access"]})]})]}):r.jsx("div",{className:"status-details",children:r.jsxs("p",{children:[r.jsx("strong",{children:"Error:"})," ",n.error]})})]}),r.jsxs("div",{className:"manual-token-section",children:[r.jsx("h4",{children:"Manual Token Entry"}),r.jsx("p",{className:"section-description",children:"Enter a GitHub Personal Access Token if you want to override the current configuration."}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"GitHub Personal Access Token"}),r.jsxs("div",{className:"token-input-group",children:[r.jsx("input",{type:i?"text":"password",className:"form-input",value:c==="none"?e:"",onChange:S=>t(S.target.value),placeholder:"ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}),r.jsxs("button",{className:"toggle-btn",onClick:()=>l(!i),children:[i?r.jsx(Eh,{size:16}):r.jsx(Ph,{size:16}),i?"Hide":"Show"]})]})]}),r.jsxs("div",{className:"action-buttons",children:[r.jsx("button",{className:"save-btn",onClick:v,children:"Save Token"}),c==="localstorage"&&r.jsx("button",{className:"clear-btn",onClick:p,children:"Clear Token"})]})]}),r.jsxs("div",{className:"help-section",children:[r.jsx("div",{className:"help-title",children:"How to Create a GitHub Personal Access Token:"}),r.jsxs("div",{className:"help-steps",children:[r.jsxs("ol",{children:[r.jsx("li",{children:"Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)"}),r.jsx("li",{children:'Click "Generate new token" → "Generate new token (classic)"'}),r.jsxs("li",{children:["Set expiration and select these scopes:",r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("code",{children:"repo"})," - Full control of private repositories"]}),r.jsxs("li",{children:[r.jsx("code",{children:"workflow"})," - Update GitHub Action workflows (optional)"]})]})]}),r.jsx("li",{children:'Click "Generate token" and copy the token'}),r.jsx("li",{children:'Paste the token above and click "Save Token"'})]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Note:"})," Store this token securely. It provides access to your repository."]})]})]})]})},Yh=({onLogout:e})=>{const[t,n]=k.useState("overview"),[s,a]=k.useState(V.getLevel());k.useEffect(()=>(document.body.style.paddingTop="0",()=>{document.body.style.paddingTop="64px"}),[]),k.useEffect(()=>{const c=()=>V.extendSession();return window.addEventListener("click",c),window.addEventListener("keypress",c),()=>{window.removeEventListener("click",c),window.removeEventListener("keypress",c)}},[]);const i=[{id:"overview",label:"Overview",icon:wh,permission:"view_schedules"},{id:"team",label:"Team",icon:Uh,permission:"view_team"},{id:"schedules",label:"Schedules",icon:yh,permission:"view_schedules"},{id:"orders",label:"Orders",icon:Lh,permission:"submit_orders"},{id:"alumni",label:"Alumni",icon:_h,permission:"edit_announcements"},{id:"sponsors",label:"Sponsors",icon:vh,permission:"edit_announcements"},{id:"settings",label:"Settings",icon:$h,permission:"manage_users"}].filter(c=>V.hasPermission(c.permission)),l=()=>{switch(t){case"team":return r.jsx(ch,{});case"schedules":return r.jsx(uh,{});case"orders":return r.jsx(Gh,{});case"alumni":return r.jsx(Wh,{});case"sponsors":return r.jsx(Vh,{});case"settings":return r.jsx(Qh,{});default:return r.jsx(Kh,{})}};return r.jsxs("div",{className:"admin-dashboard",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("header",{className:"dashboard-header",children:[r.jsx("h1",{className:"dashboard-title",children:"Dashboard"}),r.jsxs("div",{className:"user-info",children:[r.jsx("span",{className:"user-level",children:s}),r.jsx("button",{className:"logout-button",onClick:e,children:"Logout"})]})]}),r.jsx("nav",{className:"dashboard-nav",children:r.jsx("div",{className:"nav-tabs",children:i.map(c=>{const d=c.icon;return r.jsxs("button",{className:`nav-tab ${t===c.id?"active":""}`,onClick:()=>n(c.id),children:[r.jsx(d,{size:18}),c.label]},c.id)})})}),r.jsx("main",{className:"dashboard-content",children:l()})]})},Kh=()=>{const[e,t]=k.useState({teamMembers:0,activeSchedules:0,pendingOrders:0,totalAlumni:0});return k.useEffect(()=>{(async()=>{var s,a,o,i;try{const[l,c,d]=await Promise.all([fetch("/data/team.json"),fetch("/data/schedules.json"),fetch("/data/alumni.json")]),[g,v,p]=await Promise.all([l.json(),c.json(),d.ok?d.json():{alumniData:[]}]),N=((s=p.alumniData)==null?void 0:s.reduce((S,C)=>{var P;return S+(((P=C.leadership)==null?void 0:P.length)||0)},0))||0;t({teamMembers:((a=g.teamMembers)==null?void 0:a.length)||0,activeSchedules:((o=v.schedules)==null?void 0:o.filter(S=>S.status==="active"||S.status==="upcoming").length)||0,pendingOrders:((i=v.orders)==null?void 0:i.filter(S=>S.status==="pending_approval").length)||0,totalAlumni:N})}catch(l){console.error("Error loading stats:",l)}})()},[]),r.jsxs("div",{className:"overview",children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:"overview-grid",children:[r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.teamMembers}),r.jsx("div",{className:"stat-label",children:"Team Members"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.activeSchedules}),r.jsx("div",{className:"stat-label",children:"Active Schedules"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.pendingOrders}),r.jsx("div",{className:"stat-label",children:"Pending Orders"})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-number",children:e.totalAlumni}),r.jsx("div",{className:"stat-label",children:"Total Alumni"})]})]}),r.jsxs("div",{className:"quick-actions",children:[r.jsx("h3",{children:"Quick Actions"}),r.jsxs("div",{className:"action-buttons",children:[V.hasPermission("edit_team")&&r.jsx("button",{className:"action-button",children:"Add Team Member"}),V.hasPermission("edit_schedules")&&r.jsx("button",{className:"action-button",children:"Create Schedule"}),V.hasPermission("submit_orders")&&r.jsx("button",{className:"action-button",children:"Submit Order"}),V.hasPermission("edit_announcements")&&r.jsx("button",{className:"action-button",children:"Manage Alumni"}),V.hasPermission("edit_announcements")&&r.jsx("button",{className:"action-button",children:"Manage Sponsors"})]})]})]})},Jh=()=>{const[e,t]=k.useState(!1),[n,s]=k.useState(!0),a=hi();k.useEffect(()=>{(()=>{const c=V.isAuthenticated();t(c),s(!1)})()},[]);const o=()=>{t(!0)},i=()=>{V.logout(),t(!1),a("/")};return n?r.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"#888"},children:"Loading..."}):r.jsx("div",{className:"admin-app",children:e?r.jsx(Yh,{onLogout:i}):r.jsx(oh,{onLogin:o})})};function Xh(){return r.jsxs(_l,{children:[r.jsx(Se,{path:"/admin",element:r.jsx(Jh,{})}),r.jsx(Se,{path:"/*",element:r.jsx(Wf,{children:r.jsxs(_l,{children:[r.jsx(Se,{path:"/",element:r.jsx(Vf,{})}),r.jsx(Se,{path:"/app",element:r.jsx(Qf,{})}),r.jsx(Se,{path:"/alumni",element:r.jsx(Yf,{})}),r.jsx(Se,{path:"/contact",element:r.jsx(Kf,{})}),r.jsx(Se,{path:"/donate",element:r.jsx(Jf,{})}),r.jsx(Se,{path:"/privacy-policy",element:r.jsx(Xf,{})}),r.jsx(Se,{path:"/sponsors",element:r.jsx(qf,{})}),r.jsx(Se,{path:"/schedules",element:r.jsx(sh,{})}),r.jsx(Se,{path:"/team",element:r.jsx(nh,{})}),r.jsx(Se,{path:"*",element:r.jsx(ah,{})})]})})})]})}wa.createRoot(document.getElementById("root")).render(r.jsx(Ql.StrictMode,{children:r.jsx(Rf,{basename:"/",children:r.jsx(Xh,{})})}));
