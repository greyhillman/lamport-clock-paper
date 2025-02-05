(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();function Ue(i){const e=i.attributes.getNamedItem("title");if(!e)return;const t=document.createElement("mtext");t.textContent=e.value,t.className="description";const r=s=>{s.stopPropagation(),t.addEventListener("click",n=>{n.stopPropagation(),t.replaceWith(i);const o=document.createTreeWalker(i,NodeFilter.SHOW_ELEMENT,a=>a.tagName==="MTEXT"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP),h=[];for(;o.nextNode();){const a=o.currentNode;h.push(a)}for(const a of h)a.click()}),i.replaceWith(t)};i.addEventListener("click",r)}document.addEventListener("DOMContentLoaded",i=>{for(const e of document.getElementsByTagName("math")){const t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT);for(;t.nextNode();)Ue(t.currentNode)}});for(const i of document.querySelectorAll("msub[data-event]")){const e=i;console.log(e.dataset.event);const t=document.querySelectorAll(`figure svg g[data-event="${e.dataset.event}"]`);e.addEventListener("mouseenter",r=>{for(const s of t)s.classList.add("highlight")}),e.addEventListener("mouseleave",r=>{for(const s of t)s.classList.remove("highlight")})}for(const i of document.querySelectorAll("span[data-process]")){const e=i;console.log(e.dataset.process);const t=document.querySelectorAll(`figure svg g[data-process="${e.dataset.process}"]`);e.addEventListener("mouseenter",r=>{for(const s of t)s.classList.add("highlight")}),e.addEventListener("mouseleave",r=>{for(const s of t)s.classList.remove("highlight")})}function ye(i,e,t){const r=new Set;t.forEach(o=>{r.add(o[0]),r.add(o[1])});const n=document.querySelector(`mrow[data-event-from="${i}"][data-event-to="${e}"]`);n.addEventListener("mouseenter",o=>{for(const h of r)for(const a of document.querySelectorAll(`[data-event="${h}"]`))a.classList.add("highlight");for(const h of t)for(const a of document.querySelectorAll(`[data-event-from="${h[0]}"][data-event-to="${h[1]}"]`))a.classList.add("highlight")}),n.addEventListener("mouseleave",o=>{for(const h of r)for(const a of document.querySelectorAll(`[data-event="${h}"]`))a.classList.remove("highlight");for(const h of t)for(const a of document.querySelectorAll(`[data-event-from="${h[0]}"][data-event-to="${h[1]}"]`))a.classList.remove("highlight")})}ye("p1","r4",[["p1","q2"],["q2","q3"],["q3","q4"],["q4","r3"],["r3","r4"]]);ye("p2","p3",[["p2","p3"]]);const ve=document.getElementById("physical-clock-directed-graph");ve.vertices=[{x:0,y:0},{x:100,y:0},{x:50,y:50},{x:100,y:100},{x:50,y:100},{x:0,y:100}];ve.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2},{fromIndex:2,toIndex:0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5},{fromIndex:5,toIndex:4}];const K=document.getElementById("physical-clock-directed-graph-health");K.vertices=[{x:0,y:0},{x:100,y:0},{x:50,y:50},{x:100,y:100},{x:50,y:100},{x:0,y:100}];K.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2},{fromIndex:2,toIndex:0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5},{fromIndex:5,toIndex:4}];var $e;($e=document.getElementById("physical-clock-directed-graph-health-period"))==null||$e.addEventListener("change",i=>{const t=i.currentTarget.value;console.log(t),K.healthPeriod=+t});const _e=document.getElementById("diameter-graph");_e.vertices=[{x:0,y:0},{x:100,y:0,highlight:!0},{x:50,y:50},{x:100,y:100,highlight:!0},{x:50,y:100},{x:0,y:100}];_e.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2,highlight:!0},{fromIndex:2,toIndex:0,highlight:!0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3,highlight:!0},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5,highlight:!0},{fromIndex:5,toIndex:4,highlight:!0}];/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=globalThis,G=k.ShadowRoot&&(k.ShadyCSS===void 0||k.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),ne=new WeakMap;let xe=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(G&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&ne.set(t,e))}return e}toString(){return this.cssText}};const Le=i=>new xe(typeof i=="string"?i:i+"",void 0,J),Ae=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new xe(t,i,J)},ke=(i,e)=>{if(G)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),s=k.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}},oe=G?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return Le(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Re,defineProperty:He,getOwnPropertyDescriptor:Be,getOwnPropertyNames:qe,getOwnPropertySymbols:De,getPrototypeOf:je}=Object,g=globalThis,ae=g.trustedTypes,ze=ae?ae.emptyScript:"",j=g.reactiveElementPolyfillSupport,T=(i,e)=>i,R={toAttribute(i,e){switch(e){case Boolean:i=i?ze:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Z=(i,e)=>!Re(i,e),he={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&He(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){const{get:s,set:n}=Be(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const h=s==null?void 0:s.call(this);n.call(this,o),this.requestUpdate(e,h,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;const e=je(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){const t=this.properties,r=[...qe(t),...De(t)];for(const s of r)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const s of r)t.unshift(oe(s))}else e!==void 0&&t.push(oe(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ke(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EC(e,t){var n;const r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){const o=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:R).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var n;const r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const o=r.getPropertyOptions(s),h=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:R;this._$Em=s,this[s]=h.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,r){if(e!==void 0){if(r??(r=this.constructor.getPropertyOptions(e)),!(r.hasChanged??Z)(this[e],t))return;this.P(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,r){this._$AL.has(e)||this._$AL.set(e,t),r.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(t)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[T("elementProperties")]=new Map,w[T("finalized")]=new Map,j==null||j({ReactiveElement:w}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,H=C.trustedTypes,le=H?H.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ee="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,be="?"+$,Ve=`<${be}>`,A=document,N=()=>A.createComment(""),M=i=>i===null||typeof i!="object"&&typeof i!="function",Q=Array.isArray,We=i=>Q(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",z=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,de=/>/g,y=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,pe=/"/g,we=/^(?:script|style|textarea|title)$/i,Se=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),Y=Se(1),V=Se(2),E=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),me=new WeakMap,v=A.createTreeWalker(A,129);function Ie(i,e){if(!Q(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return le!==void 0?le.createHTML(e):e}const Xe=(i,e)=>{const t=i.length-1,r=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=P;for(let h=0;h<t;h++){const a=i[h];let l,d,c=-1,p=0;for(;p<a.length&&(o.lastIndex=p,d=o.exec(a),d!==null);)p=o.lastIndex,o===P?d[1]==="!--"?o=ce:d[1]!==void 0?o=de:d[2]!==void 0?(we.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=y):d[3]!==void 0&&(o=y):o===y?d[0]===">"?(o=s??P,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,l=d[1],o=d[3]===void 0?y:d[3]==='"'?pe:ue):o===pe||o===ue?o=y:o===ce||o===de?o=P:(o=y,s=void 0);const m=o===y&&i[h+1].startsWith("/>")?" ":"";n+=o===P?a+Ve:c>=0?(r.push(l),a.slice(0,c)+Ee+a.slice(c)+$+m):a+$+(c===-2?h:m)}return[Ie(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class O{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let n=0,o=0;const h=e.length-1,a=this.parts,[l,d]=Xe(e,t);if(this.el=O.createElement(l,r),v.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=v.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(Ee)){const p=d[o++],m=s.getAttribute(c).split($),b=/([.?@])?(.*)/.exec(p);a.push({type:1,index:n,name:b[2],strings:m,ctor:b[1]==="."?Fe:b[1]==="?"?Ke:b[1]==="@"?Ge:D}),s.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:n}),s.removeAttribute(c));if(we.test(s.tagName)){const c=s.textContent.split($),p=c.length-1;if(p>0){s.textContent=H?H.emptyScript:"";for(let m=0;m<p;m++)s.append(c[m],N()),v.nextNode(),a.push({type:2,index:++n});s.append(c[p],N())}}}else if(s.nodeType===8)if(s.data===be)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf($,c+1))!==-1;)a.push({type:7,index:n}),c+=$.length-1}n++}}static createElement(e,t){const r=A.createElement("template");return r.innerHTML=e,r}}function S(i,e,t=i,r){var o,h;if(e===E)return e;let s=r!==void 0?(o=t._$Co)==null?void 0:o[r]:t._$Cl;const n=M(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((h=s==null?void 0:s._$AO)==null||h.call(s,!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=s:t._$Cl=s),s!==void 0&&(e=S(i,s._$AS(i,e.values),s,r)),e}class Ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,s=((e==null?void 0:e.creationScope)??A).importNode(t,!0);v.currentNode=s;let n=v.nextNode(),o=0,h=0,a=r[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new U(n,n.nextSibling,this,e):a.type===1?l=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(l=new Je(n,this,e)),this._$AV.push(l),a=r[++h]}o!==(a==null?void 0:a.index)&&(n=v.nextNode(),o++)}return v.currentNode=A,s}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class U{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),M(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):We(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=O.createElement(Ie(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(t);else{const o=new Ye(s,this),h=o.u(this.options);o.p(t),this.T(h),this._$AH=o}}_$AC(e){let t=me.get(e.strings);return t===void 0&&me.set(e.strings,t=new O(e)),t}k(e){Q(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,s=0;for(const n of e)s===t.length?t.push(r=new U(this.O(N()),this.O(N()),this,this.options)):r=t[s],r._$AI(n),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class D{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=u}_$AI(e,t=this,r,s){const n=this.strings;let o=!1;if(n===void 0)e=S(this,e,t,0),o=!M(e)||e!==this._$AH&&e!==E,o&&(this._$AH=e);else{const h=e;let a,l;for(e=n[0],a=0;a<n.length-1;a++)l=S(this,h[r+a],t,a),l===E&&(l=this._$AH[a]),o||(o=!M(l)||l!==this._$AH[a]),l===u?e=u:e!==u&&(e+=(l??"")+n[a+1]),this._$AH[a]=l}o&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Fe extends D{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class Ke extends D{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class Ge extends D{constructor(e,t,r,s,n){super(e,t,r,s,n),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??u)===E)return;const r=this._$AH,s=e===u&&r!==u||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==u&&(r===u||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Je{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const W=C.litHtmlPolyfillSupport;W==null||W(O,U),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.2.1");const Ze=(i,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let s=r._$litPart$;if(s===void 0){const n=(t==null?void 0:t.renderBefore)??null;r._$litPart$=s=new U(e.insertBefore(N(),n),n,void 0,t??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let x=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}};var ge;x._$litElement$=!0,x.finalized=!0,(ge=globalThis.litElementHydrateSupport)==null||ge.call(globalThis,{LitElement:x});const X=globalThis.litElementPolyfillSupport;X==null||X({LitElement:x});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:Z},et=(i=Qe,e,t)=>{const{kind:r,metadata:s}=t;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(t.name,i),r==="accessor"){const{name:o}=t;return{set(h){const a=e.get.call(this);e.set.call(this,h),this.requestUpdate(o,a,i)},init(h){return h!==void 0&&this.P(o,void 0,i),h}}}if(r==="setter"){const{name:o}=t;return function(h){const a=this[o];e.call(this,h),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+r)};function I(i){return(e,t)=>typeof t=="object"?et(i,e,t):((r,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,o?{...r,wrapped:!0}:r),o?Object.getOwnPropertyDescriptor(s,n):void 0})(i,e,t)}var tt=Object.defineProperty,st=Object.getOwnPropertyDescriptor,Pe=(i,e,t,r)=>{for(var s=r>1?void 0:r?st(e,t):e,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=(r?o(e,t,s):o(s))||s);return r&&s&&tt(e,t,s),s};let B=class extends x{constructor(){super(...arguments),this.open=!1}_toggle(){this.open=!this.open}_close(){this.open=!1}_open(){this.open=!0}render(){return this.open?Y`<span class="open" @click=${this._close}>
                <slot name="summary"></slot></span>
            <div>
                <slot name="content"></slot>
            </div>`:Y`<span class="closed" @click=${this._open}>
                <slot name="summary"></slot></span>`}};B.styles=Ae`
    span {
        text-decoration: underline dotted;
        cursor: pointer;
    }
    span.open::before {
        content: "\u{25BE}";
    }
    span.closed::before {
        content: "\u{25B8}";
    }

    div {
        padding: 0em 1em;
        border: solid black 2px;
        border-radius: 0.5em;
    }
    `;Pe([I({type:Boolean,attribute:"open",reflect:!0})],B.prototype,"open",2);B=Pe([ee("inline-details")],B);var rt=Object.defineProperty,it=Object.getOwnPropertyDescriptor,Te=(i,e,t,r)=>{for(var s=r>1?void 0:r?it(e,t):e,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=(r?o(e,t,s):o(s))||s);return r&&s&&rt(e,t,s),s};let F=class extends x{createRenderRoot(){return this}render(){if(!this.templateId)throw new Error("'template-use' requires setting 'template-id'");const i=document.getElementById(this.templateId);if(!i)throw new Error(`'template-use' could not find '#${this.templateId}'`);if(i.tagName!=="TEMPLATE")throw new Error(`'template-use': '#${this.templateId}' is not a template element`);const e=i;return document.importNode(e.content,!0)}};Te([I({type:String,attribute:"template-id"})],F.prototype,"templateId",2);F=Te([ee("template-use")],F);class q{constructor(e,t){this.x=e,this.y=t}minus(e){return new _(this.x-e.x,this.y-e.y)}add(e){return new q(this.x+e.dx,this.y+e.dy)}equals(e,t){const r=(s,n,o)=>Math.abs(s-n)<=o;return r(this.x,e.x,t)&&r(this.y,e.y,t)}asDirection(){return new _(this.x,this.y)}}class _{constructor(e,t){this.dx=e,this.dy=t}scale(e){return new _(e*this.dx,e*this.dy)}get length(){return Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2))}get angle(){return Math.atan2(this.dy,this.dx)}rotate(e){const t=this.dx*Math.cos(e)-this.dy*Math.sin(e),r=this.dx*Math.sin(e)+this.dy*Math.cos(e);return new _(t,r)}add(e){return new _(this.dx+e.dx,this.dy+e.dy)}negate(){return new _(-this.dx,-this.dy)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ot=i=>(...e)=>({_$litDirective$:i,values:e});class at{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fe=ot(class extends at{constructor(i){var e;if(super(i),i.type!==nt.ATTRIBUTE||i.name!=="class"||((e=i.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(e=>i[e]).join(" ")+" "}update(i,[e]){var r,s;if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!((r=this.nt)!=null&&r.has(n))&&this.st.add(n);return this.render(e)}const t=i.element.classList;for(const n of this.st)n in e||(t.remove(n),this.st.delete(n));for(const n in e){const o=!!e[n];o===this.st.has(n)||(s=this.nt)!=null&&s.has(n)||(o?(t.add(n),this.st.add(n)):(t.remove(n),this.st.delete(n)))}return E}});var ht=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,L=(i,e,t,r)=>{for(var s=r>1?void 0:r?lt(e,t):e,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=(r?o(e,t,s):o(s))||s);return r&&s&&ht(e,t,s),s};let f=class extends x{constructor(){super(...arguments),this.vertices=[],this.edges=[],this.nodeRadius=10}render(){const i={minX:this.vertices.reduce((n,o)=>Math.min(n,o.x),Number.MAX_VALUE),maxX:this.vertices.reduce((n,o)=>Math.max(n,o.x),Number.MIN_VALUE),minY:this.vertices.reduce((n,o)=>Math.min(n,o.y),Number.MAX_VALUE),maxY:this.vertices.reduce((n,o)=>Math.max(n,o.y),Number.MIN_VALUE)},e=this.nodeRadius+5;i.minX-=e,i.maxX+=e,i.minY-=e,i.maxY+=e;const t=this.vertices.map((n,o)=>{const h=fe({vertex:!0,highlight:n.highlight??!1});return V`
                <g class=${h}>
                    <circle cx=${n.x} cy=${n.y} r=${this.nodeRadius} />
                    <text x=${n.x} y=${n.y} text-anchor="middle" dominant-baseline="middle">${o+1}</text>
                </g>
            `}),r=this.edges.map(n=>{const o=this.vertices[n.fromIndex],h=this.vertices[n.toIndex],a=new q(o.x,o.y),l=new q(h.x,h.y),d=l.minus(a),c=d.scale(1/d.length),p=a.add(c.scale(this.nodeRadius)),m=l.add(c.negate().scale(this.nodeRadius)),b=fe({highlight:n.highlight??!1}),te=V`
                <line
                    class=${b}
                    x1=${p.x}
                    y1=${p.y}
                    x2=${m.x}
                    y2=${m.y}
                />
            `;if(this.healthPeriod){const Ce=Math.random()*this.healthPeriod,Ne=Math.random()*.8+.2,se=`${this.healthPeriod}s`,re=`${Ce}s`,Me=`${a.x}; ${l.x}; ${l.x}`,Oe=`${a.y}; ${l.y}; ${l.y}`,ie=`0; ${Ne}; 1`;return V`
                    ${te}
                    <line
                        class="message"
                        x1=${a.x}
                        y1=${a.y}
                        x2=${l.x}
                        y2=${l.x}
                    >
                        <animate attributeName="x2" calcMode="linear" values=${Me} keyTimes=${ie} dur=${se} begin=${re} repeatCount="indefinite" />
                        <animate attributeName="y2" calcMode="linear" values=${Oe} keyTimes=${ie} dur=${se} begin=${re} repeatCount="indefinite" />
                    </line>
                `}else return te}),s=`${i.minX} ${i.minY} ${i.maxX-i.minX} ${i.maxY-i.minY}`;return Y`
        <svg viewBox=${s}>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" stroke="context-stroke" fill="context-stroke" />
                </marker>
                <marker
                    id="message"
                    viewBox="-5 -5 10 10"
                    refX="0"
                    refY="0"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto">
                    <path d="M -4,-3 h 8 v 6 h -8 v -6 l 4,3 l 4,-3" />
                </marker>
            </defs>
            ${r}
            ${t}
        </svg>`}};f.vertexThickness=2;f.lineThickness=2;f.styles=Ae`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    svg circle {
        fill: var(--background-color);

        stroke: var(--font-color);
        stroke-width: ${f.vertexThickness};
    }

    svg g.vertex.highlight circle {
        stroke: var(--highlight-color);
    }

    svg line {
        stroke: var(--font-color);
        stroke-width: ${f.lineThickness};
        fill: none;

        marker-end: url(#arrow);
    }

    svg line.highlight {
        stroke: var(--highlight-color);
    }

    svg g.vertex text {
        font-size: 0.6em;
    }

    svg #message {
        fill: var(--background-color);
        stroke: var(--font-color);
    }

    svg line.message {
        marker-end: url(#message);
    }
    `;L([I({attribute:!1})],f.prototype,"vertices",2);L([I({attribute:!1})],f.prototype,"edges",2);L([I({type:Number,attribute:!0})],f.prototype,"nodeRadius",2);L([I({attribute:"health-period",type:Number,reflect:!0})],f.prototype,"healthPeriod",2);f=L([ee("directed-graph")],f);
