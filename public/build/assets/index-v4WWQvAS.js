import{c as h}from"./createLucideIcon-Rh--qpmj.js";import{r as n}from"./app-CaoI1reZ.js";import{d as b}from"./index-Bmtdkwi5.js";/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],g=h("check",u);function p(r){const[a,e]=n.useState(void 0);return b(()=>{if(r){e({width:r.offsetWidth,height:r.offsetHeight});const c=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const f=o[0];let i,t;if("borderBoxSize"in f){const s=f.borderBoxSize,d=Array.isArray(s)?s[0]:s;i=d.inlineSize,t=d.blockSize}else i=r.offsetWidth,t=r.offsetHeight;e({width:i,height:t})});return c.observe(r,{box:"border-box"}),()=>c.unobserve(r)}else e(void 0)},[r]),a}export{g as C,p as u};
