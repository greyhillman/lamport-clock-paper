(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Ve(n){const e=n.attributes.getNamedItem("title");if(!e)return;const t=document.createElement("mtext");t.textContent=e.value,t.className="description";const i=s=>{s.stopPropagation(),t.addEventListener("click",r=>{r.stopPropagation(),t.replaceWith(n);const o=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,h=>h.tagName==="MTEXT"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP),l=[];for(;o.nextNode();){const h=o.currentNode;l.push(h)}for(const h of l)h.click()}),n.replaceWith(t)};n.addEventListener("click",i)}document.addEventListener("DOMContentLoaded",n=>{for(const e of document.getElementsByTagName("math")){const t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT);for(;t.nextNode();)Ve(t.currentNode)}});document.addEventListener("DOMContentLoaded",()=>{for(const e of document.querySelectorAll("msub[data-event]")){const t=document.querySelectorAll("space-time"),i=e.dataset.event;e.addEventListener("mouseenter",s=>{for(const r of t)r.highlightEvent=[i],r.highlightMessage=[],r.highlightProcess=void 0,r.highlightSegment=[]}),e.addEventListener("mouseleave",s=>{for(const r of t)r.highlightEvent=[],r.highlightMessage=[],r.highlightProcess=void 0,r.highlightSegment=[]})}for(const e of document.querySelectorAll("span[data-process]")){const t=document.querySelectorAll("space-time");e.addEventListener("mouseenter",i=>{for(const s of t)s.highlightEvent=[],s.highlightMessage=[],s.highlightSegment=[],s.highlightProcess=e.dataset.process}),e.addEventListener("mouseout",i=>{for(const s of t)s.highlightEvent=[],s.highlightMessage=[],s.highlightSegment=[],s.highlightProcess=void 0})}function n(e,t,i){const s=new Set;(i.messages||[]).forEach(l=>{s.add(l[0]),s.add(l[1])}),(i.segments||[]).forEach(l=>{s.add(l[0]),s.add(l[1])});const r=document.querySelector(`mrow[data-event-from="${e}"][data-event-to="${t}"]`);if(!r)return;const o=document.querySelectorAll("space-time");r.addEventListener("mouseenter",l=>{for(const h of o)h.highlightEvent=[...s],h.highlightMessage=i.messages||[],h.highlightSegment=i.segments||[]}),r.addEventListener("mouseleave",l=>{for(const h of o)h.highlightEvent=[],h.highlightMessage=[],h.highlightSegment=[]});for(const l of r.querySelectorAll("[data-event]"))l.addEventListener("mouseleave",h=>{for(const c of o)c.highlightEvent=[...s],c.highlightMessage=i.messages||[],c.highlightSegment=i.segments||[]})}n("p1","r4",{messages:[["p1","q2"],["q4","r3"]],segments:[["q2","q3"],["q3","q4"],["r3","r4"]]}),n("p2","p3",{segments:[["p2","p3"]]})});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ie=globalThis,ge=ie.ShadowRoot&&(ie.ShadyCSS===void 0||ie.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fe=Symbol(),_e=new WeakMap;let Oe=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ge&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=_e.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&_e.set(t,e))}return e}toString(){return this.cssText}};const Xe=n=>new Oe(typeof n=="string"?n:n+"",void 0,fe),ve=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new Oe(t,n,fe)},Ye=(n,e)=>{if(ge)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=ie.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},Ie=ge?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Xe(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Fe,defineProperty:Qe,getOwnPropertyDescriptor:Ge,getOwnPropertyNames:Ke,getOwnPropertySymbols:Je,getPrototypeOf:Ze}=Object,N=globalThis,Ae=N.trustedTypes,et=Ae?Ae.emptyScript:"",me=N.reactiveElementPolyfillSupport,F=(n,e)=>n,ne={toAttribute(n,e){switch(e){case Boolean:n=n?et:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},$e=(n,e)=>!Fe(n,e),Ee={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:$e};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),N.litPropertyMetadata??(N.litPropertyMetadata=new WeakMap);let z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Qe(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=Ge(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);r.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ee}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;const e=Ze(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){const t=this.properties,i=[...Ke(t),...Je(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Ie(s))}else e!==void 0&&t.push(Ie(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ye(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){var r;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const o=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:ne).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var r;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const o=i.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:ne;this._$Em=s,this[s]=l.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){if(i??(i=this.constructor.getPropertyOptions(e)),!(i.hasChanged??$e)(this[e],t))return;this.P(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],o)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(t)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[F("elementProperties")]=new Map,z[F("finalized")]=new Map,me==null||me({ReactiveElement:z}),(N.reactiveElementVersions??(N.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=globalThis,re=Q.trustedTypes,we=re?re.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ne="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,Le="?"+q,tt=`<${Le}>`,H=document,G=()=>H.createComment(""),K=n=>n===null||typeof n!="object"&&typeof n!="function",be=Array.isArray,st=n=>be(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",ce=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pe=/-->/g,Se=/>/g,U=RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Ce=/"/g,Ue=/^(?:script|style|textarea|title)$/i,Re=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),a=Re(1),I=Re(2),D=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),Te=new WeakMap,R=H.createTreeWalker(H,129);function Be(n,e){if(!be(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(e):e}const it=(n,e)=>{const t=n.length-1,i=[];let s,r=e===2?"<svg>":e===3?"<math>":"",o=Y;for(let l=0;l<t;l++){const h=n[l];let c,g,d=-1,y=0;for(;y<h.length&&(o.lastIndex=y,g=o.exec(h),g!==null);)y=o.lastIndex,o===Y?g[1]==="!--"?o=Pe:g[1]!==void 0?o=Se:g[2]!==void 0?(Ue.test(g[2])&&(s=RegExp("</"+g[2],"g")),o=U):g[3]!==void 0&&(o=U):o===U?g[0]===">"?(o=s??Y,d=-1):g[1]===void 0?d=-2:(d=o.lastIndex-g[2].length,c=g[1],o=g[3]===void 0?U:g[3]==='"'?Ce:Me):o===Ce||o===Me?o=U:o===Pe||o===Se?o=Y:(o=U,s=void 0);const m=o===U&&n[l+1].startsWith("/>")?" ":"";r+=o===Y?h+tt:d>=0?(i.push(c),h.slice(0,d)+Ne+h.slice(d)+q+m):h+q+(d===-2?l:m)}return[Be(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0;const l=e.length-1,h=this.parts,[c,g]=it(e,t);if(this.el=J.createElement(c,i),R.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=R.nextNode())!==null&&h.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(Ne)){const y=g[o++],m=s.getAttribute(d).split(q),p=/([.?@])?(.*)/.exec(y);h.push({type:1,index:r,name:p[2],strings:m,ctor:p[1]==="."?rt:p[1]==="?"?ot:p[1]==="@"?at:ae}),s.removeAttribute(d)}else d.startsWith(q)&&(h.push({type:6,index:r}),s.removeAttribute(d));if(Ue.test(s.tagName)){const d=s.textContent.split(q),y=d.length-1;if(y>0){s.textContent=re?re.emptyScript:"";for(let m=0;m<y;m++)s.append(d[m],G()),R.nextNode(),h.push({type:2,index:++r});s.append(d[y],G())}}}else if(s.nodeType===8)if(s.data===Le)h.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(q,d+1))!==-1;)h.push({type:7,index:r}),d+=q.length-1}r++}}static createElement(e,t){const i=H.createElement("template");return i.innerHTML=e,i}}function W(n,e,t=n,i){var o,l;if(e===D)return e;let s=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl;const r=K(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=W(n,s._$AS(n,e.values),s,i)),e}class nt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??H).importNode(t,!0);R.currentNode=s;let r=R.nextNode(),o=0,l=0,h=i[0];for(;h!==void 0;){if(o===h.index){let c;h.type===2?c=new Z(r,r.nextSibling,this,e):h.type===1?c=new h.ctor(r,h.name,h.strings,this,e):h.type===6&&(c=new ht(r,this,e)),this._$AV.push(c),h=i[++l]}o!==(h==null?void 0:h.index)&&(r=R.nextNode(),o++)}return R.currentNode=H,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Z{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),K(e)?e===f||e==null||e===""?(this._$AH!==f&&this._$AR(),this._$AH=f):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):st(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==f&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=J.createElement(Be(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(t);else{const o=new nt(s,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=Te.get(e.strings);return t===void 0&&Te.set(e.strings,t=new J(e)),t}k(e){be(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new Z(this.O(G()),this.O(G()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class ae{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=f,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=f}_$AI(e,t=this,i,s){const r=this.strings;let o=!1;if(r===void 0)e=W(this,e,t,0),o=!K(e)||e!==this._$AH&&e!==D,o&&(this._$AH=e);else{const l=e;let h,c;for(e=r[0],h=0;h<r.length-1;h++)c=W(this,l[i+h],t,h),c===D&&(c=this._$AH[h]),o||(o=!K(c)||c!==this._$AH[h]),c===f?e=f:e!==f&&(e+=(c??"")+r[h+1]),this._$AH[h]=c}o&&!s&&this.j(e)}j(e){e===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class rt extends ae{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===f?void 0:e}}class ot extends ae{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==f)}}class at extends ae{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=W(this,e,t,0)??f)===D)return;const i=this._$AH,s=e===f&&i!==f||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==f&&(i===f||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class ht{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const de=Q.litHtmlPolyfillSupport;de==null||de(J,Z),(Q.litHtmlVersions??(Q.litHtmlVersions=[])).push("3.2.1");const lt=(n,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const r=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new Z(e.insertBefore(G(),r),r,void 0,t??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let L=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=lt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return D}};var ke;L._$litElement$=!0,L.finalized=!0,(ke=globalThis.litElementHydrateSupport)==null||ke.call(globalThis,{LitElement:L});const ue=globalThis.litElementPolyfillSupport;ue==null||ue({LitElement:L});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const He=document.getElementById("physical-clock-directed-graph");He.vertices=[{x:0,y:0},{x:100,y:0},{x:50,y:50},{x:100,y:100},{x:50,y:100},{x:0,y:100}];He.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2},{fromIndex:2,toIndex:0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5},{fromIndex:5,toIndex:4}];const xe=document.getElementById("physical-clock-directed-graph-health");xe.vertices=[{x:0,y:0},{x:100,y:0},{x:50,y:50},{x:100,y:100},{x:50,y:100},{x:0,y:100}];xe.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2},{fromIndex:2,toIndex:0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5},{fromIndex:5,toIndex:4}];var qe;(qe=document.getElementById("physical-clock-directed-graph-health-period"))==null||qe.addEventListener("change",n=>{const t=n.currentTarget.value;console.log(t),xe.healthPeriod=+t});const De=document.getElementById("diameter-graph");De.vertices=[{x:0,y:0},{x:100,y:0,highlight:!0},{x:50,y:50},{x:100,y:100,highlight:!0},{x:50,y:100},{x:0,y:100}];De.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2,highlight:!0},{fromIndex:2,toIndex:0,highlight:!0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3,highlight:!0},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5,highlight:!0},{fromIndex:5,toIndex:4,highlight:!0}];let E=document.getElementById("happened-before-condition-1-example-1");E.processes=[{label:"a process",events:[{time:0,label:a`<math><mi>a</mi></math>`},{time:10,label:a`<math><mi>b</mi></math>`}]}];E=document.getElementById("happened-before-condition-1-example-2");E.processes=[{label:"a process",events:[{time:0,label:a`<math><mi>a</mi></math>`},{time:10},{time:20},{time:30,label:a`<math><mi>b</mi></math>`}]}];E=document.getElementById("happened-before-condition-2-example");E.processes=[{label:"sender",events:[{time:0,label:a`<math><mi>a</mi></math>`}]},{label:"receiver",events:[{time:10,label:a`<math><mi>b</mi></math>`}]}];E.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:0}}];E=document.getElementById("happened-before-condition-3-example-1");E.processes=[{events:[{time:0,label:a`<math><mi>a</mi></math>`},{time:10,label:a`<math><mi>b</mi></math>`}]},{events:[{time:20,label:a`<math><mi>c</mi></math>`}]}];E.messages=[{from:{processIndex:0,eventIndex:1},to:{processIndex:1,eventIndex:0}}];E=document.getElementById("happened-before-condition-3-example-2");E.processes=[{events:[{time:0,label:a`<math><mi>a</mi></math>`}]},{events:[{time:10,label:a`<math><mi>b</mi></math>`},{time:20,label:a`<math><mi>c</mi></math>`}]}];E.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:0}}];document.addEventListener("DOMContentLoaded",()=>{for(const n of document.querySelectorAll("space-time[data-id='figure-1-diagram']"))n.processes=[{id:"P",label:"process P",events:[{time:0,id:"p1",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:20,id:"p2",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:40,id:"p3",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:60,id:"p4",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`}]},{id:"Q",label:"process Q",events:[{time:0,id:"q1",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:10,id:"q2",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:20,id:"q3",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:30,id:"q4",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`},{time:40,id:"q5",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>5</mn>
                            </msub>
                        </math>`},{time:50,id:"q6",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>6</mn>
                            </msub>
                        </math>`},{time:60,id:"q7",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>7</mn>
                            </msub>
                        </math>`}]},{id:"R",label:"process R",events:[{time:0,id:"r1",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:20,id:"r2",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:40,id:"r3",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:60,id:"r4",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`}]}],n.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:0,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:2,eventIndex:3}},{from:{processIndex:1,eventIndex:3},to:{processIndex:2,eventIndex:2}},{from:{processIndex:1,eventIndex:4},to:{processIndex:0,eventIndex:3}},{from:{processIndex:2,eventIndex:1},to:{processIndex:1,eventIndex:6}}]});document.addEventListener("DOMContentLoaded",()=>{for(const n of document.querySelectorAll("space-time[data-id='figure-2-diagram']"))n.processes=[{id:"P",label:"process P",events:[{time:0,id:"p1",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:20,id:"p2",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:40,id:"p3",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:60,id:"p4",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`}]},{id:"Q",label:"process Q",events:[{time:0,id:"q1",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:10,id:"q2",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:20,id:"q3",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:30,id:"q4",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`},{time:40,id:"q5",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>5</mn>
                            </msub>
                        </math>`},{time:50,id:"q6",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>6</mn>
                            </msub>
                        </math>`},{time:60,id:"q7",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>7</mn>
                            </msub>
                        </math>`}]},{id:"R",label:"process R",events:[{time:0,id:"r1",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:20,id:"r2",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:40,id:"r3",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:60,id:"r4",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`}]}],n.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:0,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:2,eventIndex:3}},{from:{processIndex:1,eventIndex:3},to:{processIndex:2,eventIndex:2}},{from:{processIndex:1,eventIndex:4},to:{processIndex:0,eventIndex:3}},{from:{processIndex:2,eventIndex:1},to:{processIndex:1,eventIndex:6}}],n.ticks=[{times:[2,2,2]},{times:[7,7,7]},{times:[30,13,15]},{times:[44,16,22]},{times:[47,23,30]},{times:[50,33,37]},{times:[55,43,47]},{times:[70,53,57]}]});document.addEventListener("DOMContentLoaded",()=>{for(const n of document.querySelectorAll("space-time[data-id='figure-3-diagram']"))n.processes=[{id:"P",label:"process P",events:[{time:0,id:"p1",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:20,id:"p2",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:30,id:"p3",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:70,id:"p4",label:a`<math>
                            <msub>
                                <mi>p</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`}]},{id:"Q",label:"process Q",events:[{time:0,id:"q1",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:20,id:"q2",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:40,id:"q3",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:50,id:"q4",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`},{time:60,id:"q5",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>5</mn>
                            </msub>
                        </math>`},{time:70,id:"q6",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>6</mn>
                            </msub>
                        </math>`},{time:80,id:"q7",label:a`<math>
                            <msub>
                                <mi>q</mi>
                                <mn>7</mn>
                            </msub>
                        </math>`}]},{id:"R",label:"process R",events:[{time:0,id:"r1",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>1</mn>
                            </msub>
                        </math>`},{time:30,id:"r2",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>2</mn>
                            </msub>
                        </math>`},{time:60,id:"r3",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>3</mn>
                            </msub>
                        </math>`},{time:80,id:"r4",label:a`<math>
                            <msub>
                                <mi>r</mi>
                                <mn>4</mn>
                            </msub>
                        </math>`}]}],n.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:0,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:2,eventIndex:3}},{from:{processIndex:1,eventIndex:3},to:{processIndex:2,eventIndex:2}},{from:{processIndex:1,eventIndex:4},to:{processIndex:0,eventIndex:3}},{from:{processIndex:2,eventIndex:1},to:{processIndex:1,eventIndex:6}}],n.ticks=[{times:[5,5,5]},{times:[15,15,15]},{times:[25,25,25]},{times:[35,35,35]},{times:[45,45,45]},{times:[55,55,55]},{times:[65,65,65]},{times:[75,75,75]}]});{const e=document.getElementById("total-ordering-simulation").querySelector("space-time");e.processes=[{label:"P1",events:[{time:0,label:a`<math>
                        <mi>a</mi>
                    </math>`},{time:30,label:a`<math>
                        <mi>b</mi>
                    </math>`}]},{label:"P2",events:[{time:0,label:a`<math>
                        <mi>c</mi>
                    </math>`},{time:10,label:a`<math>
                        <mi>d</mi>
                    </math>`}]},{label:"P3",events:[{time:20,label:a`<math>
                    <mi>e</mi>
                </math>`}]}],e.messages=[{from:{processIndex:1,eventIndex:1},to:{processIndex:2,eventIndex:0}}],e.ticks=[{times:[5,5,5]},{times:[15,15,15]},{times:[25,25,25]}]}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:$e},ct=(n=mt,e,t)=>{const{kind:i,metadata:s}=t;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),r.set(t.name,n),i==="accessor"){const{name:o}=t;return{set(l){const h=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,h,n)},init(l){return l!==void 0&&this.P(o,void 0,n),l}}}if(i==="setter"){const{name:o}=t;return function(l){const h=this[o];e.call(this,l),this.requestUpdate(o,h,n)}}throw Error("Unsupported decorator location: "+i)};function x(n){return(e,t)=>typeof t=="object"?ct(n,e,t):((i,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,e,t)}var dt=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,je=(n,e,t,i)=>{for(var s=i>1?void 0:i?ut(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&dt(e,t,s),s};let oe=class extends L{constructor(){super(...arguments),this.open=!1}_toggle(){this.open=!this.open}_close(){this.open=!1}_open(){this.open=!0}render(){return this.open?a`<span class="open" @click=${this._close}>
                <slot name="summary"></slot></span>
            <div>
                <slot name="content"></slot>
            </div>`:a`<span class="closed" @click=${this._open}>
                <slot name="summary"></slot></span>`}};oe.styles=ve`
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
        border: solid var(--font-color) 2px;
        border-radius: 0.5em;
    }
    `;je([x({type:Boolean,attribute:"open",reflect:!0})],oe.prototype,"open",2);oe=je([he("inline-details")],oe);var pt=Object.defineProperty,gt=Object.getOwnPropertyDescriptor,ze=(n,e,t,i)=>{for(var s=i>1?void 0:i?gt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&pt(e,t,s),s};let pe=class extends L{createRenderRoot(){return this}render(){if(!this.templateId)throw new Error("'template-use' requires setting 'template-id'");const n=document.getElementById(this.templateId);if(!n)throw new Error(`'template-use' could not find '#${this.templateId}'`);if(n.tagName!=="TEMPLATE")throw new Error(`'template-use': '#${this.templateId}' is not a template element`);const e=n;return document.importNode(e.content,!0)}};ze([x({type:String,attribute:"template-id"})],pe.prototype,"templateId",2);pe=ze([he("template-use")],pe);class B{constructor(e,t){this.x=e,this.y=t}minus(e){return new O(this.x-e.x,this.y-e.y)}add(e){return new B(this.x+e.dx,this.y+e.dy)}equals(e,t){const i=(s,r,o)=>Math.abs(s-r)<=o;return i(this.x,e.x,t)&&i(this.y,e.y,t)}asDirection(){return new O(this.x,this.y)}}class O{constructor(e,t){this.dx=e,this.dy=t}scale(e){return new O(e*this.dx,e*this.dy)}get length(){return Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2))}get angle(){return Math.atan2(this.dy,this.dx)}rotate(e){const t=this.dx*Math.cos(e)-this.dy*Math.sin(e),i=this.dx*Math.sin(e)+this.dy*Math.cos(e);return new O(t,i)}add(e){return new O(this.dx+e.dx,this.dy+e.dy)}negate(){return new O(-this.dx,-this.dy)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vt=n=>(...e)=>({_$litDirective$:n,values:e});class $t{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=vt(class extends $t{constructor(n){var e;if(super(n),n.type!==ft.ATTRIBUTE||n.name!=="class"||((e=n.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(e=>n[e]).join(" ")+" "}update(n,[e]){var i,s;if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!((i=this.nt)!=null&&i.has(r))&&this.st.add(r);return this.render(e)}const t=n.element.classList;for(const r of this.st)r in e||(t.remove(r),this.st.delete(r));for(const r in e){const o=!!e[r];o===this.st.has(r)||(s=this.nt)!=null&&s.has(r)||(o?(t.add(r),this.st.add(r)):(t.remove(r),this.st.delete(r)))}return D}});var bt=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,ee=(n,e,t,i)=>{for(var s=i>1?void 0:i?xt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&bt(e,t,s),s};let P=class extends L{constructor(){super(...arguments),this.vertices=[],this.edges=[],this.nodeRadius=10}render(){const n={minX:this.vertices.reduce((r,o)=>Math.min(r,o.x),Number.MAX_VALUE),maxX:this.vertices.reduce((r,o)=>Math.max(r,o.x),Number.MIN_VALUE),minY:this.vertices.reduce((r,o)=>Math.min(r,o.y),Number.MAX_VALUE),maxY:this.vertices.reduce((r,o)=>Math.max(r,o.y),Number.MIN_VALUE)},e=this.nodeRadius+5;n.minX-=e,n.maxX+=e,n.minY-=e,n.maxY+=e;const t=this.vertices.map((r,o)=>{const l=k({vertex:!0,highlight:r.highlight??!1});return I`
                <g class=${l}>
                    <circle cx=${r.x} cy=${r.y} r=${this.nodeRadius} />
                    <text x=${r.x} y=${r.y} text-anchor="middle" dominant-baseline="middle">${o+1}</text>
                </g>
            `}),i=this.edges.map(r=>{const o=this.vertices[r.fromIndex],l=this.vertices[r.toIndex],h=new B(o.x,o.y),c=new B(l.x,l.y),g=c.minus(h),d=g.scale(1/g.length),y=h.add(d.scale(this.nodeRadius)),m=c.add(d.negate().scale(this.nodeRadius)),p=k({highlight:r.highlight??!1}),u=I`
                <line
                    class=${p}
                    x1=${y.x}
                    y1=${y.y}
                    x2=${m.x}
                    y2=${m.y}
                />
            `;if(this.healthPeriod){const v=Math.random()*this.healthPeriod,$=Math.random()*.8+.2,_=`${this.healthPeriod}s`,b=`${v}s`,w=`${h.x}; ${c.x}; ${c.x}`,C=`${h.y}; ${c.y}; ${c.y}`,M=`0; ${$}; 1`;return I`
                    ${u}
                    <line
                        class="message"
                        x1=${h.x}
                        y1=${h.y}
                        x2=${c.x}
                        y2=${c.x}
                    >
                        <animate attributeName="x2" calcMode="linear" values=${w} keyTimes=${M} dur=${_} begin=${b} repeatCount="indefinite" />
                        <animate attributeName="y2" calcMode="linear" values=${C} keyTimes=${M} dur=${_} begin=${b} repeatCount="indefinite" />
                    </line>
                `}else return u}),s=`${n.minX} ${n.minY} ${n.maxX-n.minX} ${n.maxY-n.minY}`;return a`
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
            ${i}
            ${t}
        </svg>`}};P.vertexThickness=2;P.lineThickness=2;P.styles=ve`
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
        stroke-width: ${P.vertexThickness};
    }

    svg g.vertex.highlight circle {
        stroke: var(--highlight-color);
    }

    svg line {
        stroke: var(--font-color);
        stroke-width: ${P.lineThickness};
        fill: none;

        marker-end: url(#arrow);
    }

    svg line.highlight {
        stroke: var(--highlight-color);
    }

    svg g.vertex text {
        font-size: 0.6em;
        fill: var(--font-color);
    }

    svg #message {
        fill: var(--background-color);
        stroke: var(--font-color);
    }

    svg line.message {
        marker-end: url(#message);
    }
    `;ee([x({attribute:!1})],P.prototype,"vertices",2);ee([x({attribute:!1})],P.prototype,"edges",2);ee([x({type:Number,attribute:!0})],P.prototype,"nodeRadius",2);ee([x({attribute:"health-period",type:Number,reflect:!0})],P.prototype,"healthPeriod",2);P=ee([he("directed-graph")],P);class yt{constructor(){this.nodes=[],this._moveBuilder={absolute:e=>(this.nodes.push({type:"move-absolute",point:e}),this),relative:e=>(this.nodes.push({type:"move-relative",direction:e}),this)},this._lineBuilder={absolute:e=>(this.nodes.push({type:"line-absolute",point:e}),this),relative:e=>(this.nodes.push({type:"line-relative",direction:e}),this)},this._quadraticBuilder={absolute:(e,t)=>(this.nodes.push({type:"quadratic-absolute",control:e,end:t}),this)},this._cubicBuilder={absolute:(e,t,i)=>(this.nodes.push({type:"cubic-absolute",startControl:e,endControl:t,end:i}),this)}}get move(){return this._moveBuilder}get line(){return this._lineBuilder}get quadratic(){return this._quadraticBuilder}get cubic(){return this._cubicBuilder}toString(){return this.nodes.map(e=>{switch(e.type){case"line-absolute":return`L ${e.point.x} ${e.point.y}`;case"line-relative":return`l ${e.direction.dx} ${e.direction.dy}`;case"move-absolute":return`M ${e.point.x} ${e.point.y}`;case"move-relative":return`m ${e.direction.dx} ${e.direction.dy}`;case"quadratic-absolute":return`Q ${e.control.x}, ${e.control.x} ${e.end.x} ${e.end.y}`;case"cubic-absolute":return`C ${e.startControl.x}, ${e.startControl.y} ${e.endControl.x},${e.endControl.y} ${e.end.x},${e.end.y}`;default:throw new Error("Unknown node type")}}).join(" ")}}var _t=Object.defineProperty,It=Object.getOwnPropertyDescriptor,S=(n,e,t,i)=>{for(var s=i>1?void 0:i?It(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&_t(e,t,s),s};function At(n,e){return n<1?[]:n===1?[e/2]:n===2?[0,e]:[...new Array(n).keys()].map((t,i)=>i*e/(n-1))}function Et(n,e,t){const i=e-n;return n+t*i}const wt=(n,e)=>n===null?[]:n.split(" "),We=(n,e)=>n===null?[]:n.split(" ").map(t=>{const i=t.split("->");return[i[0],i[1]]});let A=class extends L{constructor(){super(...arguments),this.processes=[],this.messages=[],this.ticks=[],this.width=100,this.height=100,this.highlightEvent=[],this.highlightMessage=[],this.highlightSegment=[]}render(){const n=this.width,e=this.height,t=this.processes.flatMap(m=>m.events.map(p=>p.time)).concat(this.ticks.flatMap(m=>m.times)),i=t.length>0?t.reduce((m,p)=>Math.max(m,p),0):10,s=t.length>0?t.reduce((m,p)=>Math.min(m,p),Number.MAX_SAFE_INTEGER):0,r=At(this.processes.length,n*.7).map(m=>m+n*.15),o=(m,p)=>{const u=r[m],v=i===s?0:(p-s)/(i-s),$=Et(10,e-10,1-v);return new B(u,$)},l=this.processes.map((m,p)=>{const u=m.events,v=[],$=r[p],_=M=>o(p,M);let b=new B($,e-7),w=new B($,2);if(u.length<1)v.push(I`
                        <line
                            class="segment"
                            x1=${b.x}
                            y1=${b.y}
                            x2=${w.x}
                            y2=${w.y}
                        />
                    `);else{const M=_(u[0].time);v.push(I`
                        <line
                            class="segment"
                            x1=${b.x}
                            y1=${b.y}
                            x2=${M.x}
                            y2=${M.y}
                        />
                    `);for(let j=1;j<=u.length-1;j++){const te=u[j-1],T=u[j],X=_(te.time),se=_(T.time),le=k({segment:!0,highlight:this.highlightSegment.some(ye=>ye[0]===te.id&&ye[1]===T.id)});v.push(I`
                            <line
                                class=${le}
                                x1=${X.x}
                                y1=${X.y}
                                x2=${se.x}
                                y2=${se.y}
                            />
                        `)}const V=_(u[u.length-1].time);v.push(I`
                        <line
                            class="segment"
                            x1=${V.x}
                            y1=${V.y}
                            x2=${w.x}
                            y2=${w.y}
                        />
                    `)}const C=k({process:!0,highlight:!!this.highlightProcess&&this.highlightProcess===m.id});return I`
                    <g class=${C}>
                        <text
                            x=${$}
                            y=${e-2}
                            text-anchor="middle"
                        >
                            ${m.label}
                        </text>
                        ${v}
                    </g>
                `}),h=this.processes.flatMap((m,p)=>m.events.map((u,v)=>{const $=o(p,u.time),_=10,b=10,w=k({event:!0,highlight:this.highlightEvent.some(C=>C===u.id)});return I`
                <g class=${w} data-event=${u.id}>
                    <circle
                        cx=${$.x}
                        cy=${$.y}
                        r="2"
                    />
                    ${u.label?I`
                            <foreignObject
                                class="label"
                                x=${$.x+4}
                                y=${$.y-b/2-1}
                                width=${_}
                                height=${b}
                            >
                                ${u.label}
                            </foreignObject>
                        `:null}
                </g>
                `})),c=this.messages.map((m,p)=>{const u=T=>{const X=T.processIndex,se=T.eventIndex,le=this.processes[X].events[se].time;return o(X,le)},v=u(m.from),$=u(m.to),_=this.processes[m.from.processIndex].events[m.from.eventIndex].id,b=this.processes[m.to.processIndex].events[m.to.eventIndex].id,w=new yt().move.absolute(v).line.absolute($).toString(),C=2e3,M=$.x>v.x?"auto":"auto-reverse",V=this.highlightMessage.some(T=>T[0]===_&&T[1]===b),j=k({link:!0,highlight:V}),te=k({message:!0,highlight:V});return I`
                <path d=${w} class=${j} />
                <g class=${te}>
                    <path d="M -4,-3 h 8 v 6 h -8 v -6 l 4,3 l 4,-3" />
                    <animateMotion
                        dur=${`${C}ms`}
                        keyPoints="0.1; 0.9"
                        keyTimes="0; 1"
                        repeatCount="indefinite"
                        calcMode="linear"
                        fill="freeze"
                        rotate=${M}
                        path=${w}
                    />
                    <animate
                        attributeName="opacity"
                        values="0; 1; 1; 0"
                        keyTimes="0; 0.3; 0.7; 1"
                        dur=${`${C}ms`}
                        repeatCount="indefinite"
                    />
                </g>
            `}),g=this.ticks.map(m=>{let p=[];if(m.times.length<=1){const u=new O(-5,0),v=u.negate();p=m.times.flatMap(($,_)=>{const b=o(_,$);return[b.add(u),b.add(v)]})}else p=m.times.map((u,v)=>o(v,u));return I`
                <polyline
                    class="tick"
                    points=${p.map(u=>`${u.x},${u.y}`).join(" ")}
                />
            `}),d=k({"space-time":!0}),y=`0 0 ${n} ${e}`;return a`
            <svg class=${d} viewBox=${y}>
                <defs>
                    <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
                    </marker>
                </defs>

                ${g}
                ${c}
                ${l}
                ${h}
            </svg>
    `}};A.styles=ve`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    #arrow path {
        stroke: none;
    }

    g.process line.segment {
        stroke: var(--font-color);
        stroke-width: 1;
        fill: none;
    }

    g.process line.segment.highlight {
        stroke: var(--highlight-color);
    }

    g.process.highlight line.segment {
        stroke: var(--highlight-color);
    }

    g.process line.segment:last-of-type {
        marker-end: url(#arrow);
    }

    g.process text {
        font-size: 0.3em;
        fill: var(--font-color);
    }

    g.event circle {
        fill: var(--font-color);
        stroke: none;
    }

    g.event.highlight circle {
        fill: var(--highlight-color);
    }

    g.event .label {
        font-size: 6px;
        font-family: var(--font-family);
    }

    g.event .label math {
        font-family: var(--math-font-family);
    }

    math msub > :not(:first-child) {
        font-size: 4px;
    }

    path.link {
        stroke: var(--font-color);
        stroke-width: 1;

        marker-end: url(#arrow);
    }
    path.link.highlight {
        stroke: var(--highlight-color);
    }

    g.message path {
        stroke: var(--font-color);
        fill: var(--background-color);
    }

    g.message.highlight path {
        stroke: var(--highlight-color);
    }

    polyline.tick {
        stroke: var(--font-color);
        stroke-width: 1;
        fill: none;
        stroke-dasharray: 2 2;
    }
    `;S([x({attribute:!1})],A.prototype,"processes",2);S([x({attribute:!1})],A.prototype,"messages",2);S([x({attribute:!1})],A.prototype,"ticks",2);S([x({type:Number,attribute:"width",reflect:!0})],A.prototype,"width",2);S([x({type:Number,attribute:"height",reflect:!0})],A.prototype,"height",2);S([x({converter:wt,attribute:"highlight-event",reflect:!0})],A.prototype,"highlightEvent",2);S([x({attribute:"highlight-process",reflect:!0})],A.prototype,"highlightProcess",2);S([x({converter:We,attribute:"highlight-message",reflect:!0})],A.prototype,"highlightMessage",2);S([x({converter:We,attribute:"highlight-segment",reflect:!0})],A.prototype,"highlightSegment",2);A=S([he("space-time")],A);
