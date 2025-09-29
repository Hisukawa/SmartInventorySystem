<<<<<<<< HEAD:public/build/assets/index-BGI7BN2Q.js
import{a as h}from"./utils-C4tYgYfe.js";import{r as n}from"./app-i2GBo_P0.js";import{u}from"./index-DURQXQd2.js";/**
========
import{a as h}from"./utils-BaUq1rAs.js";import{r as n}from"./app-BZNx1Op-.js";import{u}from"./index-R5fUdd4-.js";/**
>>>>>>>> upstream/main:public/build/assets/index-D6EBPQ4-.js
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],g=h("check",b);function p(r){const[d,e]=n.useState(void 0);return u(()=>{if(r){e({width:r.offsetWidth,height:r.offsetHeight});const c=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const f=o[0];let i,t;if("borderBoxSize"in f){const s=f.borderBoxSize,a=Array.isArray(s)?s[0]:s;i=a.inlineSize,t=a.blockSize}else i=r.offsetWidth,t=r.offsetHeight;e({width:i,height:t})});return c.observe(r,{box:"border-box"}),()=>c.unobserve(r)}else e(void 0)},[r]),d}export{g as C,p as u};
