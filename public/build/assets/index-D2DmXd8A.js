<<<<<<<< HEAD:public/build/assets/index-DUCpiI1O.js
import{c as h}from"./createLucideIcon-Dylm4_dP.js";import{r as n}from"./app-DDnysqsQ.js";import{u}from"./index-BcfBzL9B.js";/**
========
import{c as h}from"./createLucideIcon-B-otO4Jy.js";import{r as n}from"./app-Cxe7GvPv.js";import{u}from"./index-bRkBN_k4.js";/**
>>>>>>>> 3c08e4efeb8cb9f53536fb9b92c41c9994fbf329:public/build/assets/index-D2DmXd8A.js
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],g=h("check",b);function p(r){const[d,e]=n.useState(void 0);return u(()=>{if(r){e({width:r.offsetWidth,height:r.offsetHeight});const c=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const f=o[0];let i,t;if("borderBoxSize"in f){const s=f.borderBoxSize,a=Array.isArray(s)?s[0]:s;i=a.inlineSize,t=a.blockSize}else i=r.offsetWidth,t=r.offsetHeight;e({width:i,height:t})});return c.observe(r,{box:"border-box"}),()=>c.unobserve(r)}else e(void 0)},[r]),d}export{g as C,p as u};
