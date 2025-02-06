(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Xe(n){const e=n.attributes.getNamedItem("title");if(!e)return;const t=document.createElement("mtext");t.textContent=e.value,t.className="description";const i=s=>{s.stopPropagation(),t.addEventListener("click",r=>{r.stopPropagation(),t.replaceWith(n);const o=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,a=>a.tagName==="MTEXT"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP),l=[];for(;o.nextNode();){const a=o.currentNode;l.push(a)}for(const a of l)a.click()}),n.replaceWith(t)};n.addEventListener("click",i)}document.addEventListener("DOMContentLoaded",n=>{for(const e of document.getElementsByTagName("math")){const t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT);for(;t.nextNode();)Xe(t.currentNode)}});document.addEventListener("DOMContentLoaded",()=>{for(const e of document.querySelectorAll("msub[data-event]")){const t=document.querySelectorAll("space-time"),i=e.dataset.event;e.addEventListener("mouseenter",s=>{for(const r of t)r.highlightEvent=[i],r.highlightMessage=[],r.highlightProcess=void 0,r.highlightSegment=[]}),e.addEventListener("mouseleave",s=>{for(const r of t)r.highlightEvent=[],r.highlightMessage=[],r.highlightProcess=void 0,r.highlightSegment=[]})}for(const e of document.querySelectorAll("span[data-process]")){const t=document.querySelectorAll("space-time");e.addEventListener("mouseenter",i=>{for(const s of t)s.highlightEvent=[],s.highlightMessage=[],s.highlightSegment=[],s.highlightProcess=e.dataset.process}),e.addEventListener("mouseout",i=>{for(const s of t)s.highlightEvent=[],s.highlightMessage=[],s.highlightSegment=[],s.highlightProcess=void 0})}function n(e,t,i){const s=new Set;(i.messages||[]).forEach(l=>{s.add(l[0]),s.add(l[1])}),(i.segments||[]).forEach(l=>{s.add(l[0]),s.add(l[1])});const r=document.querySelector(`mrow[data-event-from="${e}"][data-event-to="${t}"]`);if(!r)return;const o=document.querySelectorAll("space-time");r.addEventListener("mouseenter",l=>{for(const a of o)a.highlightEvent=[...s],a.highlightMessage=i.messages||[],a.highlightSegment=i.segments||[]}),r.addEventListener("mouseleave",l=>{for(const a of o)a.highlightEvent=[],a.highlightMessage=[],a.highlightSegment=[]});for(const l of r.querySelectorAll("[data-event]"))l.addEventListener("mouseleave",a=>{for(const m of o)m.highlightEvent=[...s],m.highlightMessage=i.messages||[],m.highlightSegment=i.segments||[]})}n("p1","r4",{messages:[["p1","q2"],["q4","r3"]],segments:[["q2","q3"],["q3","q4"],["r3","r4"]]}),n("p2","p3",{segments:[["p2","p3"]]})});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,fe=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$e=Symbol(),Ie=new WeakMap;let Oe=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==$e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(fe&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ie.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ie.set(t,e))}return e}toString(){return this.cssText}};const Ye=n=>new Oe(typeof n=="string"?n:n+"",void 0,$e),ve=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new Oe(t,n,$e)},Fe=(n,e)=>{if(fe)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=ne.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},Ee=fe?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Ye(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Qe,defineProperty:Ke,getOwnPropertyDescriptor:Ge,getOwnPropertyNames:Je,getOwnPropertySymbols:Ze,getPrototypeOf:et}=Object,N=globalThis,Ae=N.trustedTypes,tt=Ae?Ae.emptyScript:"",ce=N.reactiveElementPolyfillSupport,Q=(n,e)=>n,re={toAttribute(n,e){switch(e){case Boolean:n=n?tt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},xe=(n,e)=>!Qe(n,e),we={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:xe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),N.litPropertyMetadata??(N.litPropertyMetadata=new WeakMap);let W=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=we){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ke(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=Ge(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);r.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??we}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;const e=et(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){const t=this.properties,i=[...Je(t),...Ze(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Ee(s))}else e!==void 0&&t.push(Ee(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){var r;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const o=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:re).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var r;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const o=i.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:re;this._$Em=s,this[s]=l.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){if(i??(i=this.constructor.getPropertyOptions(e)),!(i.hasChanged??xe)(this[e],t))return;this.P(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],o)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(t)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[Q("elementProperties")]=new Map,W[Q("finalized")]=new Map,ce==null||ce({ReactiveElement:W}),(N.reactiveElementVersions??(N.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=globalThis,oe=K.trustedTypes,Pe=oe?oe.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ue="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,Le="?"+q,st=`<${Le}>`,H=document,G=()=>H.createComment(""),J=n=>n===null||typeof n!="object"&&typeof n!="function",be=Array.isArray,it=n=>be(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",de=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,Me=/>/g,U=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,Ce=/"/g,Be=/^(?:script|style|textarea|title)$/i,Re=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),h=Re(1),I=Re(2),j=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Te=new WeakMap,L=H.createTreeWalker(H,129);function He(n,e){if(!be(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pe!==void 0?Pe.createHTML(e):e}const nt=(n,e)=>{const t=n.length-1,i=[];let s,r=e===2?"<svg>":e===3?"<math>":"",o=F;for(let l=0;l<t;l++){const a=n[l];let m,g,d=-1,y=0;for(;y<a.length&&(o.lastIndex=y,g=o.exec(a),g!==null);)y=o.lastIndex,o===F?g[1]==="!--"?o=Se:g[1]!==void 0?o=Me:g[2]!==void 0?(Be.test(g[2])&&(s=RegExp("</"+g[2],"g")),o=U):g[3]!==void 0&&(o=U):o===U?g[0]===">"?(o=s??F,d=-1):g[1]===void 0?d=-2:(d=o.lastIndex-g[2].length,m=g[1],o=g[3]===void 0?U:g[3]==='"'?Ce:ke):o===Ce||o===ke?o=U:o===Se||o===Me?o=F:(o=U,s=void 0);const _=o===U&&n[l+1].startsWith("/>")?" ":"";r+=o===F?a+st:d>=0?(i.push(m),a.slice(0,d)+Ue+a.slice(d)+q+_):a+q+(d===-2?l:_)}return[He(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0;const l=e.length-1,a=this.parts,[m,g]=nt(e,t);if(this.el=Z.createElement(m,i),L.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=L.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(Ue)){const y=g[o++],_=s.getAttribute(d).split(q),c=/([.?@])?(.*)/.exec(y);a.push({type:1,index:r,name:c[2],strings:_,ctor:c[1]==="."?ot:c[1]==="?"?at:c[1]==="@"?ht:he}),s.removeAttribute(d)}else d.startsWith(q)&&(a.push({type:6,index:r}),s.removeAttribute(d));if(Be.test(s.tagName)){const d=s.textContent.split(q),y=d.length-1;if(y>0){s.textContent=oe?oe.emptyScript:"";for(let _=0;_<y;_++)s.append(d[_],G()),L.nextNode(),a.push({type:2,index:++r});s.append(d[y],G())}}}else if(s.nodeType===8)if(s.data===Le)a.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(q,d+1))!==-1;)a.push({type:7,index:r}),d+=q.length-1}r++}}static createElement(e,t){const i=H.createElement("template");return i.innerHTML=e,i}}function V(n,e,t=n,i){var o,l;if(e===j)return e;let s=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl;const r=J(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=V(n,s._$AS(n,e.values),s,i)),e}class rt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??H).importNode(t,!0);L.currentNode=s;let r=L.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let m;a.type===2?m=new ee(r,r.nextSibling,this,e):a.type===1?m=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(m=new lt(r,this,e)),this._$AV.push(m),a=i[++l]}o!==(a==null?void 0:a.index)&&(r=L.nextNode(),o++)}return L.currentNode=H,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=V(this,e,t),J(e)?e===$||e==null||e===""?(this._$AH!==$&&this._$AR(),this._$AH=$):e!==this._$AH&&e!==j&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):it(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$&&J(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Z.createElement(He(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(t);else{const o=new rt(s,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=Te.get(e.strings);return t===void 0&&Te.set(e.strings,t=new Z(e)),t}k(e){be(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new ee(this.O(G()),this.O(G()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class he{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=$,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}_$AI(e,t=this,i,s){const r=this.strings;let o=!1;if(r===void 0)e=V(this,e,t,0),o=!J(e)||e!==this._$AH&&e!==j,o&&(this._$AH=e);else{const l=e;let a,m;for(e=r[0],a=0;a<r.length-1;a++)m=V(this,l[i+a],t,a),m===j&&(m=this._$AH[a]),o||(o=!J(m)||m!==this._$AH[a]),m===$?e=$:e!==$&&(e+=(m??"")+r[a+1]),this._$AH[a]=m}o&&!s&&this.j(e)}j(e){e===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ot extends he{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$?void 0:e}}class at extends he{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$)}}class ht extends he{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=V(this,e,t,0)??$)===j)return;const i=this._$AH,s=e===$&&i!==$||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==$&&(i===$||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class lt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}}const ue=K.litHtmlPolyfillSupport;ue==null||ue(Z,ee),(K.litHtmlVersions??(K.litHtmlVersions=[])).push("3.2.1");const mt=(n,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const r=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new ee(e.insertBefore(G(),r),r,void 0,t??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let O=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=mt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return j}};var qe;O._$litElement$=!0,O.finalized=!0,(qe=globalThis.litElementHydrateSupport)==null||qe.call(globalThis,{LitElement:O});const pe=globalThis.litElementPolyfillSupport;pe==null||pe({LitElement:O});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const je=document.getElementById("physical-clock-directed-graph");je.vertices=[{x:0,y:0},{x:100,y:0},{x:50,y:50},{x:100,y:100},{x:50,y:100},{x:0,y:100}];je.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2},{fromIndex:2,toIndex:0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5},{fromIndex:5,toIndex:4}];const ye=document.getElementById("physical-clock-directed-graph-health");ye.vertices=[{x:0,y:0},{x:100,y:0},{x:50,y:50},{x:100,y:100},{x:50,y:100},{x:0,y:100}];ye.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2},{fromIndex:2,toIndex:0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5},{fromIndex:5,toIndex:4}];var Ne;(Ne=document.getElementById("physical-clock-directed-graph-health-period"))==null||Ne.addEventListener("change",n=>{const t=n.currentTarget.value;console.log(t),ye.healthPeriod=+t});const De=document.getElementById("diameter-graph");De.vertices=[{x:0,y:0},{x:100,y:0,highlight:!0},{x:50,y:50},{x:100,y:100,highlight:!0},{x:50,y:100},{x:0,y:100}];De.edges=[{fromIndex:0,toIndex:1},{fromIndex:1,toIndex:2,highlight:!0},{fromIndex:2,toIndex:0,highlight:!0},{fromIndex:3,toIndex:2},{fromIndex:4,toIndex:3,highlight:!0},{fromIndex:5,toIndex:2},{fromIndex:0,toIndex:5,highlight:!0},{fromIndex:5,toIndex:4,highlight:!0}];let p=document.getElementById("happened-before-condition-1-example-1");p.processes=[{label:"a process",events:[{time:0,label:h`<math><mi>a</mi></math>`},{time:10,label:h`<math><mi>b</mi></math>`}]}];p=document.getElementById("happened-before-condition-1-example-2");p.processes=[{label:"a process",events:[{time:0,label:h`<math><mi>a</mi></math>`},{time:10},{time:20},{time:30,label:h`<math><mi>b</mi></math>`}]}];p=document.getElementById("happened-before-condition-2-example");p.processes=[{label:"sender",events:[{time:0,label:h`<math><mi>a</mi></math>`}]},{label:"receiver",events:[{time:10,label:h`<math><mi>b</mi></math>`}]}];p.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:0}}];p=document.getElementById("happened-before-condition-3-example-1");p.processes=[{events:[{time:0,label:h`<math><mi>a</mi></math>`},{time:10,label:h`<math><mi>b</mi></math>`}]},{events:[{time:20,label:h`<math><mi>c</mi></math>`}]}];p.messages=[{from:{processIndex:0,eventIndex:1},to:{processIndex:1,eventIndex:0}}];p=document.getElementById("happened-before-condition-3-example-2");p.processes=[{events:[{time:0,label:h`<math><mi>a</mi></math>`}]},{events:[{time:10,label:h`<math><mi>b</mi></math>`},{time:20,label:h`<math><mi>c</mi></math>`}]}];p.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:0}}];p=document.getElementById("figure-1-diagram");p.processes=[{id:"P",label:"process P",events:[{time:0,id:"p1",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:20,id:"p2",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:40,id:"p3",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:60,id:"p4",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>4</mn>
                    </msub>
                </math>`}]},{id:"Q",label:"process Q",events:[{time:0,id:"q1",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:10,id:"q2",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:20,id:"q3",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:30,id:"q4",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>4</mn>
                    </msub>
                </math>`},{time:40,id:"q5",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>5</mn>
                    </msub>
                </math>`},{time:50,id:"q6",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>6</mn>
                    </msub>
                </math>`},{time:60,id:"q7",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>7</mn>
                    </msub>
                </math>`}]},{id:"R",label:"process R",events:[{time:0,id:"r1",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:20,id:"r2",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:40,id:"r3",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:60,id:"r4",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>4</mn>
                    </msub>
                </math>`}]}];p.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:0,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:2,eventIndex:3}},{from:{processIndex:1,eventIndex:3},to:{processIndex:2,eventIndex:2}},{from:{processIndex:1,eventIndex:4},to:{processIndex:0,eventIndex:3}},{from:{processIndex:2,eventIndex:1},to:{processIndex:1,eventIndex:6}}];p=document.getElementById("figure-2-diagram");p.processes=[{id:"P",label:"process P",events:[{time:0,id:"p1",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:20,id:"p2",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:40,id:"p3",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:60,id:"p4",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>4</mn>
                    </msub>
                </math>`}]},{id:"Q",label:"process Q",events:[{time:0,id:"q1",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:10,id:"q2",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:20,id:"q3",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:30,id:"q4",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>4</mn>
                    </msub>
                </math>`},{time:40,id:"q5",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>5</mn>
                    </msub>
                </math>`},{time:50,id:"q6",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>6</mn>
                    </msub>
                </math>`},{time:60,id:"q7",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>7</mn>
                    </msub>
                </math>`}]},{id:"R",label:"process R",events:[{time:0,id:"r1",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:20,id:"r2",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:40,id:"r3",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:60,id:"r4",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>4</mn>
                    </msub>
                </math>`}]}];p.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:0,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:2,eventIndex:3}},{from:{processIndex:1,eventIndex:3},to:{processIndex:2,eventIndex:2}},{from:{processIndex:1,eventIndex:4},to:{processIndex:0,eventIndex:3}},{from:{processIndex:2,eventIndex:1},to:{processIndex:1,eventIndex:6}}];p.ticks=[{times:[2,2,2]},{times:[7,7,7]},{times:[30,13,15]},{times:[44,16,22]},{times:[47,23,30]},{times:[50,33,37]},{times:[55,43,47]},{times:[70,53,57]}];p=document.getElementById("figure-3-diagram");p.processes=[{id:"P",label:"process P",events:[{time:0,id:"p1",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:20,id:"p2",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:30,id:"p3",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:70,id:"p4",label:h`<math>
                    <msub>
                        <mi>p</mi>
                        <mn>4</mn>
                    </msub>
                </math>`}]},{id:"Q",label:"process Q",events:[{time:0,id:"q1",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:20,id:"q2",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:40,id:"q3",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:50,id:"q4",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>4</mn>
                    </msub>
                </math>`},{time:60,id:"q5",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>5</mn>
                    </msub>
                </math>`},{time:70,id:"q6",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>6</mn>
                    </msub>
                </math>`},{time:80,id:"q7",label:h`<math>
                    <msub>
                        <mi>q</mi>
                        <mn>7</mn>
                    </msub>
                </math>`}]},{id:"R",label:"process R",events:[{time:0,id:"r1",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>1</mn>
                    </msub>
                </math>`},{time:30,id:"r2",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>2</mn>
                    </msub>
                </math>`},{time:60,id:"r3",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>3</mn>
                    </msub>
                </math>`},{time:80,id:"r4",label:h`<math>
                    <msub>
                        <mi>r</mi>
                        <mn>4</mn>
                    </msub>
                </math>`}]}];p.messages=[{from:{processIndex:0,eventIndex:0},to:{processIndex:1,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:0,eventIndex:1}},{from:{processIndex:1,eventIndex:0},to:{processIndex:2,eventIndex:3}},{from:{processIndex:1,eventIndex:3},to:{processIndex:2,eventIndex:2}},{from:{processIndex:1,eventIndex:4},to:{processIndex:0,eventIndex:3}},{from:{processIndex:2,eventIndex:1},to:{processIndex:1,eventIndex:6}}];p.ticks=[{times:[5,5,5]},{times:[15,15,15]},{times:[25,25,25]},{times:[35,35,35]},{times:[45,45,45]},{times:[55,55,55]},{times:[65,65,65]},{times:[75,75,75]}];/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const le=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:xe},dt=(n=ct,e,t)=>{const{kind:i,metadata:s}=t;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),r.set(t.name,n),i==="accessor"){const{name:o}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,a,n)},init(l){return l!==void 0&&this.P(o,void 0,n),l}}}if(i==="setter"){const{name:o}=t;return function(l){const a=this[o];e.call(this,l),this.requestUpdate(o,a,n)}}throw Error("Unsupported decorator location: "+i)};function b(n){return(e,t)=>typeof t=="object"?dt(n,e,t):((i,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,e,t)}var ut=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,ze=(n,e,t,i)=>{for(var s=i>1?void 0:i?pt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&ut(e,t,s),s};let ae=class extends O{constructor(){super(...arguments),this.open=!1}_toggle(){this.open=!this.open}_close(){this.open=!1}_open(){this.open=!0}render(){return this.open?h`<span class="open" @click=${this._close}>
                <slot name="summary"></slot></span>
            <div>
                <slot name="content"></slot>
            </div>`:h`<span class="closed" @click=${this._open}>
                <slot name="summary"></slot></span>`}};ae.styles=ve`
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
    `;ze([b({type:Boolean,attribute:"open",reflect:!0})],ae.prototype,"open",2);ae=ze([le("inline-details")],ae);var gt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,We=(n,e,t,i)=>{for(var s=i>1?void 0:i?ft(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&gt(e,t,s),s};let ge=class extends O{createRenderRoot(){return this}render(){if(!this.templateId)throw new Error("'template-use' requires setting 'template-id'");const n=document.getElementById(this.templateId);if(!n)throw new Error(`'template-use' could not find '#${this.templateId}'`);if(n.tagName!=="TEMPLATE")throw new Error(`'template-use': '#${this.templateId}' is not a template element`);const e=n;return document.importNode(e.content,!0)}};We([b({type:String,attribute:"template-id"})],ge.prototype,"templateId",2);ge=We([le("template-use")],ge);class R{constructor(e,t){this.x=e,this.y=t}minus(e){return new B(this.x-e.x,this.y-e.y)}add(e){return new R(this.x+e.dx,this.y+e.dy)}equals(e,t){const i=(s,r,o)=>Math.abs(s-r)<=o;return i(this.x,e.x,t)&&i(this.y,e.y,t)}asDirection(){return new B(this.x,this.y)}}class B{constructor(e,t){this.dx=e,this.dy=t}scale(e){return new B(e*this.dx,e*this.dy)}get length(){return Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2))}get angle(){return Math.atan2(this.dy,this.dx)}rotate(e){const t=this.dx*Math.cos(e)-this.dy*Math.sin(e),i=this.dx*Math.sin(e)+this.dy*Math.cos(e);return new B(t,i)}add(e){return new B(this.dx+e.dx,this.dy+e.dy)}negate(){return new B(-this.dx,-this.dy)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vt=n=>(...e)=>({_$litDirective$:n,values:e});class xt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=vt(class extends xt{constructor(n){var e;if(super(n),n.type!==$t.ATTRIBUTE||n.name!=="class"||((e=n.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(e=>n[e]).join(" ")+" "}update(n,[e]){var i,s;if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!((i=this.nt)!=null&&i.has(r))&&this.st.add(r);return this.render(e)}const t=n.element.classList;for(const r of this.st)r in e||(t.remove(r),this.st.delete(r));for(const r in e){const o=!!e[r];o===this.st.has(r)||(s=this.nt)!=null&&s.has(r)||(o?(t.add(r),this.st.add(r)):(t.remove(r),this.st.delete(r)))}return j}});var bt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,te=(n,e,t,i)=>{for(var s=i>1?void 0:i?yt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&bt(e,t,s),s};let S=class extends O{constructor(){super(...arguments),this.vertices=[],this.edges=[],this.nodeRadius=10}render(){const n={minX:this.vertices.reduce((r,o)=>Math.min(r,o.x),Number.MAX_VALUE),maxX:this.vertices.reduce((r,o)=>Math.max(r,o.x),Number.MIN_VALUE),minY:this.vertices.reduce((r,o)=>Math.min(r,o.y),Number.MAX_VALUE),maxY:this.vertices.reduce((r,o)=>Math.max(r,o.y),Number.MIN_VALUE)},e=this.nodeRadius+5;n.minX-=e,n.maxX+=e,n.minY-=e,n.maxY+=e;const t=this.vertices.map((r,o)=>{const l=T({vertex:!0,highlight:r.highlight??!1});return I`
                <g class=${l}>
                    <circle cx=${r.x} cy=${r.y} r=${this.nodeRadius} />
                    <text x=${r.x} y=${r.y} text-anchor="middle" dominant-baseline="middle">${o+1}</text>
                </g>
            `}),i=this.edges.map(r=>{const o=this.vertices[r.fromIndex],l=this.vertices[r.toIndex],a=new R(o.x,o.y),m=new R(l.x,l.y),g=m.minus(a),d=g.scale(1/g.length),y=a.add(d.scale(this.nodeRadius)),_=m.add(d.negate().scale(this.nodeRadius)),c=T({highlight:r.highlight??!1}),x=I`
                <line
                    class=${c}
                    x1=${y.x}
                    y1=${y.y}
                    x2=${_.x}
                    y2=${_.y}
                />
            `;if(this.healthPeriod){const u=Math.random()*this.healthPeriod,v=Math.random()*.8+.2,f=`${this.healthPeriod}s`,A=`${u}s`,w=`${a.x}; ${m.x}; ${m.x}`,P=`${a.y}; ${m.y}; ${m.y}`,k=`0; ${v}; 1`;return I`
                    ${x}
                    <line
                        class="message"
                        x1=${a.x}
                        y1=${a.y}
                        x2=${m.x}
                        y2=${m.x}
                    >
                        <animate attributeName="x2" calcMode="linear" values=${w} keyTimes=${k} dur=${f} begin=${A} repeatCount="indefinite" />
                        <animate attributeName="y2" calcMode="linear" values=${P} keyTimes=${k} dur=${f} begin=${A} repeatCount="indefinite" />
                    </line>
                `}else return x}),s=`${n.minX} ${n.minY} ${n.maxX-n.minX} ${n.maxY-n.minY}`;return h`
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
        </svg>`}};S.vertexThickness=2;S.lineThickness=2;S.styles=ve`
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
        stroke-width: ${S.vertexThickness};
    }

    svg g.vertex.highlight circle {
        stroke: var(--highlight-color);
    }

    svg line {
        stroke: var(--font-color);
        stroke-width: ${S.lineThickness};
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
    `;te([b({attribute:!1})],S.prototype,"vertices",2);te([b({attribute:!1})],S.prototype,"edges",2);te([b({type:Number,attribute:!0})],S.prototype,"nodeRadius",2);te([b({attribute:"health-period",type:Number,reflect:!0})],S.prototype,"healthPeriod",2);S=te([le("directed-graph")],S);class _t{constructor(){this.nodes=[],this._moveBuilder={absolute:e=>(this.nodes.push({type:"move-absolute",point:e}),this),relative:e=>(this.nodes.push({type:"move-relative",direction:e}),this)},this._lineBuilder={absolute:e=>(this.nodes.push({type:"line-absolute",point:e}),this),relative:e=>(this.nodes.push({type:"line-relative",direction:e}),this)},this._quadraticBuilder={absolute:(e,t)=>(this.nodes.push({type:"quadratic-absolute",control:e,end:t}),this)},this._cubicBuilder={absolute:(e,t,i)=>(this.nodes.push({type:"cubic-absolute",startControl:e,endControl:t,end:i}),this)}}get move(){return this._moveBuilder}get line(){return this._lineBuilder}get quadratic(){return this._quadraticBuilder}get cubic(){return this._cubicBuilder}toString(){return this.nodes.map(e=>{switch(e.type){case"line-absolute":return`L ${e.point.x} ${e.point.y}`;case"line-relative":return`l ${e.direction.dx} ${e.direction.dy}`;case"move-absolute":return`M ${e.point.x} ${e.point.y}`;case"move-relative":return`m ${e.direction.dx} ${e.direction.dy}`;case"quadratic-absolute":return`Q ${e.control.x}, ${e.control.x} ${e.end.x} ${e.end.y}`;case"cubic-absolute":return`C ${e.startControl.x}, ${e.startControl.y} ${e.endControl.x},${e.endControl.y} ${e.end.x},${e.end.y}`;default:throw new Error("Unknown node type")}}).join(" ")}}var It=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,M=(n,e,t,i)=>{for(var s=i>1?void 0:i?Et(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&It(e,t,s),s};function At(n,e){return n<1?[]:n===1?[e/2]:n===2?[0,e]:[...new Array(n).keys()].map((t,i)=>i*e/(n-1))}function wt(n,e,t){const i=e-n;return n+t*i}const Pt=(n,e)=>n===null?[]:n.split(" "),Ve=(n,e)=>n===null?[]:n.split(" ").map(t=>{const i=t.split("->");return[i[0],i[1]]});let E=class extends O{constructor(){super(...arguments),this.processes=[],this.messages=[],this.ticks=[],this.width=100,this.height=100,this.highlightEvent=[],this.highlightMessage=[],this.highlightSegment=[]}render(){var _;const n=this.width,e=this.height,t=this.processes.reduce((c,x)=>{const u=x.events.reduce((v,f)=>Math.max(v,f.time),0);return Math.max(c,u)},0),i=(_=this.ticks)==null?void 0:_.flatMap(c=>c.times).reduce((c,x)=>Math.max(c,x),0),s=Math.max(t,i??0),r=At(this.processes.length,n*.7).map(c=>c+n*.15),o=(c,x)=>{const u=r[c],v=wt(12,e-12,x/s),f=e-v;return new R(u,f)},l=this.processes.map((c,x)=>{const u=c.events,v=[],f=r[x],A=D=>o(x,D);let w=new R(f,e-7),P=new R(f,2);if(u.length<1)v.push(I`
                        <line
                            class="segment"
                            x1=${w.x}
                            y1=${w.y}
                            x2=${P.x}
                            y2=${P.y}
                        />
                    `);else{const D=A(u[0].time);v.push(I`
                        <line
                            class="segment"
                            x1=${w.x}
                            y1=${w.y}
                            x2=${D.x}
                            y2=${D.y}
                        />
                    `);for(let z=1;z<=u.length-1;z++){const se=u[z-1],C=u[z],Y=A(se.time),ie=A(C.time),me=T({segment:!0,highlight:this.highlightSegment.some(_e=>_e[0]===se.id&&_e[1]===C.id)});v.push(I`
                            <line
                                class=${me}
                                x1=${Y.x}
                                y1=${Y.y}
                                x2=${ie.x}
                                y2=${ie.y}
                            />
                        `)}const X=A(u[u.length-1].time);v.push(I`
                        <line
                            class="segment"
                            x1=${X.x}
                            y1=${X.y}
                            x2=${P.x}
                            y2=${P.y}
                        />
                    `)}const k=T({process:!0,highlight:!!this.highlightProcess&&this.highlightProcess===c.id});return I`
                    <g class=${k}>
                        <text
                            x=${f}
                            y=${e-2}
                            text-anchor="middle"
                        >
                            ${c.label}
                        </text>
                        ${v}
                    </g>
                `}),a=this.processes.flatMap((c,x)=>c.events.map((u,v)=>{const f=o(x,u.time),A=10,w=10,P=T({event:!0,highlight:this.highlightEvent.some(k=>k===u.id)});return I`
                <g class=${P} data-event=${u.id}>
                    <circle
                        cx=${f.x}
                        cy=${f.y}
                        r="2"
                    />
                    ${u.label?I`
                            <foreignObject
                                class="label"
                                x=${f.x+4}
                                y=${f.y-w/2-1}
                                width=${A}
                                height=${w}
                            >
                                ${u.label}
                            </foreignObject>
                        `:null}
                </g>
                `})),m=this.messages.map((c,x)=>{const u=C=>{const Y=C.processIndex,ie=C.eventIndex,me=this.processes[Y].events[ie].time;return o(Y,me)},v=u(c.from),f=u(c.to),A=this.processes[c.from.processIndex].events[c.from.eventIndex].id,w=this.processes[c.to.processIndex].events[c.to.eventIndex].id,P=new _t().move.absolute(v).line.absolute(f).toString(),k=2e3,D=f.x>v.x?"auto":"auto-reverse",X=this.highlightMessage.some(C=>C[0]===A&&C[1]===w),z=T({link:!0,highlight:X}),se=T({message:!0,highlight:X});return I`
                <path d=${P} class=${z} />
                <g class=${se}>
                    <path d="M -4,-3 h 8 v 6 h -8 v -6 l 4,3 l 4,-3" />
                    <animateMotion
                        dur=${`${k}ms`}
                        keyPoints="0.1; 0.9"
                        keyTimes="0; 1"
                        repeatCount="indefinite"
                        calcMode="linear"
                        fill="freeze"
                        rotate=${D}
                        path=${P}
                    />
                    <animate
                        attributeName="opacity"
                        values="0; 1; 1; 0"
                        keyTimes="0; 0.3; 0.7; 1"
                        dur=${`${k}ms`}
                        repeatCount="indefinite"
                    />
                </g>
            `}),g=this.ticks.map(c=>{const x=c.times.map((u,v)=>o(v,u)).map(u=>`${u.x},${u.y}`);return I`
                <polyline
                    class="tick"
                    points=${x.join(" ")}
                />
            `}),d=T({"space-time":!0}),y=`0 0 ${n} ${e}`;return h`
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
                ${m}
                ${l}
                ${a}
            </svg>
    `}};E.styles=ve`
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
    `;M([b({attribute:!1})],E.prototype,"processes",2);M([b({attribute:!1})],E.prototype,"messages",2);M([b({attribute:!1})],E.prototype,"ticks",2);M([b({type:Number,attribute:"width",reflect:!0})],E.prototype,"width",2);M([b({type:Number,attribute:"height",reflect:!0})],E.prototype,"height",2);M([b({converter:Pt,attribute:"highlight-event",reflect:!0})],E.prototype,"highlightEvent",2);M([b({attribute:"highlight-process",reflect:!0})],E.prototype,"highlightProcess",2);M([b({converter:Ve,attribute:"highlight-message",reflect:!0})],E.prototype,"highlightMessage",2);M([b({converter:Ve,attribute:"highlight-segment",reflect:!0})],E.prototype,"highlightSegment",2);E=M([le("space-time")],E);
